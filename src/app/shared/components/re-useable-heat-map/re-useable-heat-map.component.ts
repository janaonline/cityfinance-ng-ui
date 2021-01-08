import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { forkJoin } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';
import { UserUtility } from 'src/app/util/user/user';

import { IStateULBCovered, IStateULBCoveredResponse } from '../../models/stateUlbConvered';
import { IULBWithPopulationResponse, ULBWithMapData } from '../../models/ulbsForMapResponse';
import { CommonService } from '../../services/common.service';
import { GeographicalService } from '../../services/geographical/geographical.service';
import { IDistrictGeoJson } from './models/districtGeoJSON';
import { ILeafletStateClickEvent } from './models/leafletStateClickEvent';
import { IStateWithULBS } from './models/stateWithULBS';

@Component({
  selector: "app-re-useable-heat-map",
  templateUrl: "./re-useable-heat-map.component.html",
  styleUrls: ["./re-useable-heat-map.component.scss"],
})
export class ReUseableHeatMapComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    protected _commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected _geoService: GeographicalService,
    private _activateRoute: ActivatedRoute
  ) {
    this._activateRoute.queryParams.subscribe(
      (params) => (this.queryParams = params)
    );
    this.listenToFormControls();
    this.addListener();
    this.addCustomStyleTag();
    this.isProcessingCompleted.emit(false);
  }

  @Output() ulbsClicked = new EventEmitter<string[]>();
  @Output() stateSelected = new EventEmitter<IStateWithULBS>();
  @Output() isProcessingCompleted = new EventEmitter<boolean>(false);
  @Input() ulbSelected: string;
  @Input() yearSelected: string[] = ["2017"];

  @ViewChild("autoCompleteInput", { read: MatAutocompleteTrigger })
  ulbSearchAutoComplete: MatAutocompleteTrigger;

  ulbsSelected = new FormControl([]);
  ulbFilterControl = new FormControl();

  stateData: IStateULBCovered[];
  allULBSList: IULBWithPopulationResponse["data"];
  stateAndULBDataMerged: {
    [stateId: string]: IStateWithULBS;
  };

  filteredULBStateAndULBDataMerged: {
    [stateId: string]: IStateWithULBS;
  };

  ulbsOfSelectedState: IULBWithPopulationResponse["data"];
  ulbListForAutoCompletion: IULBWithPopulationResponse["data"];

  nationalLevelMap: L.Map;
  StatesJSONForMapCreation: any;
  DistrictsJSONForMapCreation: IDistrictGeoJson;

  blueIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_blue_dot.png",
    iconSize: [6, 6],
    iconAnchor: [3, 3],
  });

  yellowIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_yellow_dot.png",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  mouseHoverOnState: IStateULBCovered;
  mouseHoveredOnULB: any;

  currentStateInView: IStateULBCovered & {
    ulbs: ULBWithMapData[];
  };

  object = Object;

  isMapOnMiniMapMode = false;

  districtMap: L.Map;

  currentULBClicked: ULBWithMapData;

  isNationalMapToDistroctMapInProcess;

  stateLayers: L.GeoJSON<any>;

  queryParams: { state?: string } = {};

  randomNumber = Math.random();

  userUtil = new UserUtility();

  ngOnInit() {}

  ngOnChanges(changes: {
    ulbSelected: SimpleChange;
    yearSelected: SimpleChange;
  }) {
    if (changes.ulbSelected && changes.ulbSelected.currentValue) {
      const newULBId =
        typeof changes.ulbSelected.currentValue === "object"
          ? changes.ulbSelected.currentValue._id
          : changes.ulbSelected.currentValue;

      if (!this.currentULBClicked || newULBId !== this.currentULBClicked._id) {
        this.onSelectingULBFromDropdown(newULBId);
      }
    }
    if (changes.yearSelected) {
      this.stateAndULBDataMerged = {};
      this.clearNationalMapContainer();
      if (this.districtMap) {
        this.clearDistrictMapContainer();
        this.districtMap.remove();
        this.districtMap = null;
      }

      setTimeout(() => {
        this.initiatedDataFetchingProcess().subscribe((res) => {
          this.onGettingStateULBCoveredSuccess(
            res[0] as IStateULBCoveredResponse
          );
          this.onGettingULBWithPopulationSuccess(
            res[1] as IULBWithPopulationResponse
          );

          if (this.isMapOnMiniMapMode) {
            this.createStateLevelMap(this.currentStateInView.name);

            if (this.currentULBClicked) {
              setTimeout(() => {
                this.selectULBById(this.currentULBClicked._id);
              }, 100);
            }
            this.isProcessingCompleted.emit(true);
            setTimeout(() => {
              this.hideMapLegends();
            }, 1000);
          }
        });
      }, 0);
    }
  }

  protected initiatedDataFetchingProcess() {
    const body = { year: this.yearSelected || [] };
    const subscriptions: any[] = [];
    subscriptions.push(
      this._commonService.getStateUlbCovered(body)
      // .pipe(map((res) => this.onGettingStateULBCoveredSuccess(res)))
    );

    subscriptions.push(
      this._commonService.getULBSWithPopulationAndCoordinates(body)
      // .pipe(map((res) => this.onGettingULBWithPopulationSuccess(res)))
    );
    return forkJoin(subscriptions);
  }

  onSelectingULBFromDropdown(ulbId: string) {
    const stateOfULB = this.getStateOfULB(ulbId);
    if (!stateOfULB) {
      return false;
    }

    if (!this.DistrictsJSONForMapCreation) {
      this.showDistrictMapNotLaodedWarning();
      return;
    }
    if (stateOfULB) {
      this.convertDomToMiniMap("mapidd" + this.randomNumber);
      this.clearUlbFilterControl();
      this.hideMapLegends();
      this.showStateLayerOnlyFor(this.nationalLevelMap, stateOfULB);
      this.unselectAllDistrictMarker();
      // this.reset
      this.createStateLevelMap(stateOfULB.name, { emitState: false });
      setTimeout(() => {
        this.selectULBById(ulbId);
      }, 0);
    }
  }

  private showDistrictMapNotLaodedWarning() {
    this.showSnacbarMessage(
      `District map is still being loaded. Please try after some time.`
    );
  }

  private showSnacbarMessage(message: string) {
    this._snackbar.open(message, null, {
      duration: 5000,
      verticalPosition: "bottom",
    });
  }

  selectULBById(ulbId: string) {
    const ulbFound = this.ulbsOfSelectedState.find((ulb) => ulb._id === ulbId);

    if (!ulbFound) {
      console.error(`ulb ${ulbId} not found`);
      return false;
    }
    const ulbsAlreadySelect = <string[]>this.ulbsSelected.value;
    ulbsAlreadySelect[0] = ulbFound._id;
    if (ulbsAlreadySelect[0] !== ulbFound._id) {
      this.ulbsSelected.setValue(ulbsAlreadySelect);
    }
    this.currentULBClicked = ulbFound;
    if (
      !ulbFound.location ||
      !ulbFound.location.lat ||
      ulbFound.location.lat === "0.0"
    ) {
      const message = `${ulbFound.name} does not contain a valid geo-location.`;
      this.showSnacbarMessage(message);
      return false;
    }

    const marker = this.getDistrictMarkerOfULB(ulbFound);
    return this.changeMarkerToSelected(marker);
  }

  private getDistrictMarkerOfULB(ulb: ULBWithMapData) {
    let markerFound;
    try {
      this.districtMap.eachLayer((layer) => {
        if (
          (layer as any).options &&
          (layer as any).options.pane === "markerPane" &&
          ulb.location &&
          (layer as any)._latlng.lat === +ulb.location.lat &&
          (layer as any)._latlng.lng === +ulb.location.lng
        ) {
          markerFound = layer as any;
          throw new Error("ULBFound");
        }
      });
    } catch (error) {}
    return markerFound;
  }

  loadMapGeoJson() {
    const prmsArr = [];

    const prms1 = this._geoService.loadConvertedIndiaGeoData().toPromise();
    prmsArr.push(prms1);

    prms1.then((data) => (this.StatesJSONForMapCreation = data));

    // All District JSON Data
    // const prms2 = new Promise((resolve, reject) => {
    //   $.getJSON("../assets/jsonFile/updated_district_9_July.json")
    //     .done((resp) => {
    //       this.DistrictsJSONForMapCreation = resp;
    //       resolve();
    //     })
    //     .fail((failed) => {
    //       console.error("District Boundries getJSON request failed!", failed);
    //     });
    // });
    // prmsArr.push(prms2);

    return Promise.all(prmsArr);
  }

  calculateVH(vh: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (vh * h) / 100;
  }

  createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    this.isProcessingCompleted.emit(false);
    let vw = Math.max(document.documentElement.clientWidth);
    vw = (vw - 1366) / 1366;
    let zoom = 4 + vw;
    if (this.userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      // return zoom;
    }
    const configuration: IMapCreationConfig = {
      containerId,
      geoData,
      options: {
        zoom,
        maxZoom: zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      },
    };
    let map: L.Map;

    ({ stateLayers: this.stateLayers, map } = MapUtil.createDefaultNationalMap(
      configuration
    ));

    this.nationalLevelMap = map;

    this.createLegendsForNationalLevelMap();
    this.createControls(this.nationalLevelMap);

    this.initializeNationalLevelMapLayer(this.stateLayers);

    // Prepare to auto select state from query Params.
    let stateToAutoSelect: IStateULBCovered;
    let layerToAutoSelect;
    if (this.queryParams.state) {
      const stateFound = this.stateData.find(
        (state) => state._id === this.queryParams.state
      );
      if (stateFound) stateToAutoSelect = stateFound;
    }

    this.stateLayers.eachLayer((layer) => {
      if (stateToAutoSelect) {
        if (MapUtil.getStateName(layer) === stateToAutoSelect.name) {
          layerToAutoSelect = { sourceTarget: layer };
        }
      }
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => this.createTooltip(layer, this.stateLayers),
        click: (args: ILeafletStateClickEvent) => this.onStateLayerClick(args),
        mouseout: () => (this.mouseHoverOnState = null),
      });
    });

    /**
     * @description If the map is already on mini mode, then it means the state is already selected, and its state map
     * is in the view.
     */
    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
    }
    if (this.isMapOnMiniMapMode) {
      this.hideMapLegends();
      this.showStateLayerOnlyFor(
        this.nationalLevelMap,
        this.currentStateInView
      );
    }
    this.isProcessingCompleted.emit(true);
  }

  private onStateLayerClick(args: ILeafletStateClickEvent) {
    this.isProcessingCompleted.emit(false);
    if (this.isNationalMapToDistroctMapInProcess) {
      return;
    }
    this.isNationalMapToDistroctMapInProcess = setTimeout(() => {
      try {
        this.onClickingState(args);
      } catch (error) {
        this.mouseHoverOnState = null;
        /**
         * This error will generally occur when you change the year (dont close the year dropdown) and then click on the state.
         */
        console.error(error);
      }
      setTimeout(() => {
        this.isNationalMapToDistroctMapInProcess = null;
        this.isProcessingCompleted.emit(true);
      }, 0);
    }, 1);
  }

  private initializeNationalLevelMapLayer(map: L.GeoJSON<any>) {
    map.eachLayer((layer: any) => {
      const stateCode = MapUtil.getStateCode(layer);
      if (!stateCode) {
        return;
      }

      const stateFound = this.stateData.find(
        (state) => state.code === stateCode
      );
      const count = stateFound ? stateFound.coveredUlbPercentage : 0;
      const color = this.getColorBasedOnPercentage(count);
      MapUtil.colorStateLayer(layer, color);
    });
  }

  private listenToFormControls() {
    this.ulbsSelected.valueChanges.subscribe((newValue) => {
      this.ulbsClicked.emit(newValue);
    });

    this.ulbFilterControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((textToSearch) => {
        this.filteredULBStateAndULBDataMerged = this.filterMergedStateDataBy({
          ulbName: textToSearch,
          stateId: this.currentStateInView ? this.currentStateInView._id : null,
        });
      });
  }

  private addListener() {
    window.addEventListener("scroll", (ev) => {
      if (
        this.ulbSearchAutoComplete &&
        this.ulbSearchAutoComplete.autocomplete.isOpen
      ) {
        this.ulbSearchAutoComplete.closePanel();
      }
    });
  }

  private filterMergedStateDataBy(options: {
    ulbName?: string;
    stateId?: string;
  }) {
    let filteredULBAndState: {
      [stateId: string]: IStateULBCovered & {
        ulbs: ULBWithMapData[];
      };
    };

    if (options.stateId) {
      if (this.stateAndULBDataMerged[options.stateId].ulbs.length) {
        filteredULBAndState = {
          [options.stateId]: { ...this.stateAndULBDataMerged[options.stateId] },
        };
      }
    }

    if (options.ulbName && !options.ulbName.trim()) {
      filteredULBAndState = filteredULBAndState
        ? filteredULBAndState
        : { ...this.stateAndULBDataMerged };
    } else {
      Object.keys(filteredULBAndState || this.stateAndULBDataMerged).forEach(
        (stateId) => {
          const stateFound = { ...this.stateAndULBDataMerged[stateId] };
          const ulbList = this.filteredULBBy(
            { ulbName: options.ulbName },
            stateFound.ulbs
          );
          if (!ulbList.length && !options.stateId) {
            return;
          }
          stateFound.ulbs = ulbList;
          if (!filteredULBAndState) {
            filteredULBAndState = {};
          }
          filteredULBAndState[stateId] = stateFound;
        }
      );
    }
    return this.filterOutEmptyULBStates(filteredULBAndState);
    // return filteredULBAndState;
  }

  protected filterOutEmptyULBStates(data: {
    [stateId: string]: IStateULBCovered & {
      ulbs: ULBWithMapData[];
    };
  }) {
    if (!data || !Object.keys(data).length) {
      return null;
      return null;
    }

    const newObj = {};
    Object.keys(data).forEach((stateKey) => {
      if (data[stateKey].ulbs && data[stateKey].ulbs.length) {
        newObj[stateKey] = { ...data[stateKey] };
      }
    });
    return newObj;
  }

  private filteredULBBy(
    options: { ulbName?: string },
    ulbList: ULBWithMapData[]
  ) {
    let filteredULBS: ULBWithMapData[] = [];
    if (options.ulbName && options.ulbName.trim()) {
      filteredULBS = filteredULBS.concat(
        ulbList.filter((ulb) =>
          ulb.name.toLowerCase().includes(options.ulbName.toLowerCase())
        )
      );
    } else {
      filteredULBS = ulbList;
    }

    return filteredULBS;
  }

  private getStateOfULB(ulbId: string) {
    const ulbFound = this.ulbsOfSelectedState.find((ulb) => ulb._id === ulbId);
    if (!ulbFound) {
      return false;
    }
    const stateFound = this.stateData.find(
      (state) => state._id === ulbFound.state
    );
    return stateFound;
  }

  private onGettingULBWithPopulationSuccess(res: IULBWithPopulationResponse) {
    this.allULBSList = res.data;

    this.ulbsOfSelectedState = res.data;
    this.ulbListForAutoCompletion = res.data;
    if (this.stateData) {
      this.stateAndULBDataMerged = this.CombineStateAndULBData(
        this.stateData,
        res.data
      );
    }

    if (!this.filteredULBStateAndULBDataMerged && this.stateAndULBDataMerged) {
      this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
        this.stateAndULBDataMerged
      );
    }
    return res;
  }

  private onGettingStateULBCoveredSuccess(res: IStateULBCoveredResponse) {
    this.stateData = res.data;

    if (this.allULBSList) {
      this.stateAndULBDataMerged = this.CombineStateAndULBData(
        this.stateData,
        this.allULBSList
      );
    }

    if (!this.filteredULBStateAndULBDataMerged && this.stateAndULBDataMerged) {
      this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
        this.stateAndULBDataMerged
      );
    }

    if (this.nationalLevelMap) {
      this.initializeNationalLevelMapLayer(this.stateLayers);
    }

    this.loadMapGeoJson()
      .then((res) => {
        this.DistrictsJSONForMapCreation = { ...this.StatesJSONForMapCreation };
        this.createNationalLevelMap(
          this.StatesJSONForMapCreation,
          "mapidd" + this.randomNumber
        );
      })
      .catch((err) => {});

    return res;
  }

  private CombineStateAndULBData(
    states: IStateULBCovered[],
    ulbStates: ULBWithMapData[]
  ) {
    const newStateObj: {
      [stateId: string]: IStateULBCovered & { ulbs: ULBWithMapData[] };
    } = {};
    states
      .map((state) => ({
        ...state,
        ulbs: ulbStates.filter((ulb) => ulb.state === state._id),
      }))
      .forEach((merged) => (newStateObj[merged._id] = merged));

    return newStateObj;
  }

  private createTooltip(layer, stateLayer) {
    if (this.isMapOnMiniMapMode) {
      return false;
    }

    let obj: IStateULBCovered = null;
    const stateCode = MapUtil.getStateCode(layer);

    const stateFound = this.stateData.find((state) => state.code === stateCode);

    obj = stateFound;
    if (obj != undefined) {
      this.mouseHoverOnState = obj;
      const text =
        "<p>State : <b>" + layer.feature.properties.ST_NM + "</b></p> <p> <b>";
    } else {
      // stateLayer.bindTooltip("<b>" + layer.feature.properties.ST_NM + "</b>");
    }
  }

  private createLegendsForNationalLevelMap() {
    const arr = [
      { color: "#216278", text: "76%-100%" },
      { color: "#059b9a", text: "51%-75%" },
      { color: "#8BD2F0", text: "26%-50%" },
      { color: "#D0EDF9", text: "1%-25%" },
      { color: "#E5E5E5", text: "0%" },
    ];
    const legend = new L.Control({ position: "bottomleft" });
    const labels = [
      `<span style="width: 100%; display: block;" class="text-center">% of Data Availability on Cityfinance.in</span>`,
    ];
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.id = "legendContainer";
      // div.style.width = "100%";
      arr.forEach((value) => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 45%;margin: 1% auto; "><i class="circle" style="background: ${value.color}; padding:.3vw; display: inline-block; margin-right: 12%;"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
  }

  private createControls(map: L.Map) {
    const info = new L.Control({ position: "topright" });
    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };
  }

  private onClickingState(mapClickEvent: ILeafletStateClickEvent) {
    if (!this.DistrictsJSONForMapCreation) {
      console.error(`district json not loaded`);
      this.showDistrictMapNotLaodedWarning();
      return false;
    }
    this.clearUlbFilterControl();

    if (this.isMapOnMiniMapMode) {
      this.resetMapToNationalLevel();
      this.initializeNationalLevelMapLayer(this.stateLayers);
      return false;
    }

    if (
      this.currentStateInView &&
      this.currentStateInView.name !==
        mapClickEvent.sourceTarget.feature.properties.ST_NM
    ) {
      this.resetULBsSelected();
    }

    if (
      this.currentStateInView &&
      this.currentStateInView.name ===
        mapClickEvent.sourceTarget.feature.properties.ST_NM
    ) {
      return;
    }
    const status = this.createStateLevelMap(
      mapClickEvent.sourceTarget.feature.properties.ST_NM
    );
    if (!status) {
      return false;
    }
    this.convertDomToMiniMap("mapidd" + this.randomNumber);
    if (!status) {
      return false;
    }
    this.hideMapLegends();

    this.showStateLayerOnlyFor(this.nationalLevelMap, this.currentStateInView);
  }

  private showMapLegends() {
    const element = document.getElementById("legendContainer");
    if (element) {
      element.style.visibility = "visible";
    }
  }

  private hideMapLegends() {
    const element = document.getElementById("legendContainer");
    if (element) {
      element.style.visibility = "hidden";
    }
  }

  private showStateLayerOnlyFor(map: L.Map, state: IStateULBCovered) {
    map.eachLayer((layer: any) => {
      if (!layer.setStyle || !layer.feature || !layer.feature.properties) {
        return;
      }
      let fillColor: string = this.getColorBasedOnPercentage(-1);
      if (layer.feature.properties.ST_NM === state.name) {
        fillColor = "#216278";
      } else {
        fillColor = "#E8E8E8";
      }
      layer.setStyle(
        {
          fillOpacity: 1,
          fillColor,
          weight: -1,
        },
        true
      );
    });
    this.isProcessingCompleted.emit(true);
  }

  private convertMiniMapToOriginal(domId: string) {
    const element = document.getElementById(domId);
    element.classList.remove("miniMap");
    this.isMapOnMiniMapMode = false;
    return true;
  }

  private createStateLevelMap(
    stateName: string,
    options: { emitState: boolean } = { emitState: true }
  ) {
    const stateFound = Object.values(this.stateAndULBDataMerged).find(
      (state) => state.name === stateName
    );

    if (!stateFound) {
      console.error(`state not found for given name`);
      return false;
    }

    this.filteredULBStateAndULBDataMerged = this.filterMergedStateDataBy({
      stateId: stateFound._id,
    });
    this.ulbsOfSelectedState = [...stateFound.ulbs];
    if (!this.ulbsOfSelectedState.length) {
      const message = `${stateFound.name} does not contains any ULB.`;
      this.showSnacbarMessage(message);
      return false;
    }

    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
    const ulbsWithCoordinates = this.ulbsOfSelectedState.filter(
      (ulb) =>
        ulb.location &&
        parseFloat(ulb.location.lat) !== NaN &&
        parseFloat(ulb.location.lng) !== NaN
    );

    const filteredDistricts = this.DistrictsJSONForMapCreation.features.filter(
      (districts) => districts.properties.ST_NM === stateFound.name
    );
    const newObj: IDistrictGeoJson = {
      type: "FeatureCollection",
      features: filteredDistricts,
    };

    const dataPointsForMarker = ulbsWithCoordinates.map((ulb) => ({
      ...ulb.location,
      name: ulb.name,
      area: ulb.area,
      population: ulb.population,
      ...ulb,
    }));

    const centerLatLngOfState = this.getCentroid(
      ulbsWithCoordinates.map((ulb) => [+ulb.location.lat, +ulb.location.lng])
    );

    const stateCenter = <any>{
      lat: centerLatLngOfState[0],
      lng: centerLatLngOfState[1],
    };

    if (this.districtMap) {
      this.unselectAllDistrictMarker();
    }
    if (!ulbsWithCoordinates.length) {
      const message = `${stateFound.name} does not contains any ULB with geo co-ordinates.`;
      this.showSnacbarMessage(message);
      return false;
    }

    this.createDistrictMap(newObj, {
      center: stateCenter,
      dataPoints: [...dataPointsForMarker],
    });
    this.currentStateInView = { ...stateFound };
    if (options.emitState) {
      this.stateSelected.emit(stateFound);
    }

    return true;
  }

  private convertDomToMiniMap(domId: string) {
    this.isMapOnMiniMapMode = true;
    const element = document.getElementById(domId);
    if (element.classList.contains("miniMap")) {
      return false;
    }
    element.classList.add("miniMap");

    // const newElement = document.createElement("div");
    // newElement.classList.add("miniMapOverlay");
    // element.appendChild(newElement);
    return true;
  }

  private createDistrictMap(
    districtGeoJSON,
    options: {
      center: ILeafletStateClickEvent["latlng"];
      dataPoints: {
        lat: string;
        lng: string;
        name: string;
        area: number;
        population: number;
        auditStatus: ULBWithMapData["auditStatus"];
      }[];
    }
  ) {
    if (this.districtMap) {
      return;
    }
    this.clearDistrictMapContainer();

    setTimeout(() => {
      let vw = Math.max(document.documentElement.clientWidth);
      vw = (vw - 1366) / 1366;
      let zoom = 5.5 + vw;
      if (this.userUtil.isUserOnMobile()) {
        zoom = 5.5;
      }

      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        minZoom: zoom,
        maxZoom: zoom,
        zoomControl: false,
        keyboard: false,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      }).setView([options.center.lat, options.center.lng], 4);
      districtMap.touchZoom.disable();
      districtMap.doubleClickZoom.disable();
      districtMap.scrollWheelZoom.disable();
      districtMap.boxZoom.disable();
      districtMap.keyboard.disable();
      districtMap.dragging.disable();

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.stateColorStyle,
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

      options.dataPoints.forEach((dataPoint) => {
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon,
        }).addTo(districtMap);
        marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on("click", (values) =>
          this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker)
        );
      });
    }, 0.5);
  }

  private resetULBsSelected() {
    this.ulbsSelected.setValue([]);
  }

  private createDistrictMarker(dataPoint: {
    lat: string;
    lng: string;
    name: string;
    area: number;
    population: number;
    auditStatus: ULBWithMapData["auditStatus"];
    icon: L.Icon<L.IconOptions>;
  }) {
    const marker = L.marker([+dataPoint.lat, +dataPoint.lng], {
      icon: dataPoint.icon,
      interactive: true,
      bubblingMouseEvents: true,
    });
    return marker;
  }

  private onDistrictMarkerClick = (
    values: L.LeafletMouseEvent,
    marker: L.Marker
  ) => {
    const ulbFound = this.allULBSList.find(
      (ulb) =>
        ulb.location &&
        +ulb.location.lat === values.latlng.lat &&
        +ulb.location.lng === values.latlng.lng
    );

    if (!ulbFound) {
      return false;
    }
    this.clearUlbFilterControl();
    this.currentULBClicked = ulbFound;
    const ulbAlreadySelect = !!this.ulbsSelected.value.find(
      (id) => id === ulbFound._id
    );
    let newValues: string[];

    if (ulbAlreadySelect) {
      this.currentULBClicked = null;
      newValues = [];
      this.changeMarkerToUnselected(marker);
    } else {
      newValues = [ulbFound._id];
      this.unselectAllDistrictMarker();
      this.changeMarkerToSelected(marker);
    }
    this.ulbsSelected.setValue(newValues);
  };

  private unselectAllDistrictMarker() {
    if (this.districtMap) {
      this.districtMap.eachLayer((layer: any) => {
        if (
          (layer as any).options &&
          (layer as any).options.pane === "markerPane"
        ) {
          this.changeMarkerToUnselected(layer);
        }
      });
    }
  }

  private changeMarkerToSelected(marker: L.Marker) {
    marker.setIcon(this.yellowIcon);
  }

  private changeMarkerToUnselected(marker: L.Marker) {
    marker.setIcon(this.blueIcon);
  }

  private getColorBasedOnPercentage(value: number) {
    if (value > 75) {
      return "#216278";
    }
    if (value > 50) {
      return "#059b9a";
    }
    if (value > 25) {
      return "#8BD2F0";
    }
    if (value > 0) {
      return `#D0EDF9`;
    }
    return "#E5E5E5";
  }

  /**
   * @param arr 0th index = Latitude, 1st Index = Longitude
   * @returns [latitude, longitude]
   */
  private getCentroid(arr: number[][]) {
    return arr.reduce(
      function (x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );
  }

  private stateColorStyle(feature) {
    return {
      fillColor: "#E5E5E5",
      weight: 1,
      opacity: 1,
      color: "#403f3f",
      fillOpacity: 1,
    };
  }

  private resetMapToNationalLevel() {
    this.resetULBsSelected();
    this.resetulbsOfSelectedState();
    this.resetULBForAutoCompletion();
    this.resetDropdownListToNationalLevel();
    this.resetCurrentSelectState();
    this.resetCurrentULBClicked();
    this.convertMiniMapToOriginal("mapidd" + this.randomNumber);
    this.resetDistrictMap();
    this.clearDistrictMapContainer();
    this.showMapLegends();
  }

  private clearUlbFilterControl() {
    this.ulbFilterControl.reset();
  }

  private resetulbsOfSelectedState() {
    this.ulbsOfSelectedState = [...this.allULBSList];
  }

  private resetULBForAutoCompletion() {
    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
  }

  private resetDropdownListToNationalLevel() {
    this.filteredULBStateAndULBDataMerged = this.filterOutEmptyULBStates(
      this.stateAndULBDataMerged
    );
  }

  private resetCurrentSelectState() {
    this.currentStateInView = null;
    this.stateSelected.emit(null);
  }

  private resetCurrentULBClicked() {
    this.currentULBClicked = null;
  }

  private resetDistrictMap() {
    this.districtMap = null;
  }

  private clearDistrictMapContainer() {
    const height = this.userUtil.isUserOnMobile() ? `100%` : "57vh";
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class=" col-sm-12"
    style="background: transparent;z-index: 8; display: inline-block; width: 99%;height: ${height};"
  > <p class="text-center state-map-click-guide" >
    Click on any ULB to view it's data or click on India map to go back
  </p>
  </div>`;
  }

  private clearNationalMapContainer() {
    if (this.nationalLevelMap) {
      this.nationalLevelMap.remove();
      this.nationalLevelMap = null;
    }
  }

  private addCustomStyleTag() {
    const newStyle = document.createElement("style");
    newStyle.id = "customReuseable";
    const styling =
      " .mat-form-field-appearance-outline .mat-form-field-infix { padding: 9px 0 !important;}";
    newStyle.appendChild(document.createTextNode(styling));
    document.head.appendChild(newStyle);
  }

  ngOnDestroy() {
    this.removeCustomStyleTag();
  }

  private removeCustomStyleTag() {
    const element = document.getElementById("customReuseable");
    element.remove();
  }
}
