import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as L from 'leaflet';
import { debounceTime } from 'rxjs/operators';

import { IStateULBCovered, IStateULBCoveredResponse } from '../../models/stateUlbConvered';
import { IULBWithPopulationResponse, ULBWithMapData } from '../../models/ulbsForMapResponse';
import { CommonService } from '../../services/common.service';
import { IDistrictGeoJson } from './models/districtGeoJSON';
import { ILeafletStateClickEvent } from './models/leafletStateClickEvent';

@Component({
  selector: "app-re-useable-heat-map",
  templateUrl: "./re-useable-heat-map.component.html",
  styleUrls: ["./re-useable-heat-map.component.scss"]
})
export class ReUseableHeatMapComponent implements OnInit, OnChanges {
  constructor(
    private _commonService: CommonService,
    private _snackbar: MatSnackBar
  ) {
    this._commonService
      .getStateUlbCovered()
      .subscribe(res => this.onGettingStateULBCoveredSuccess(res));

    this._commonService
      .getULBSWithPopulationAndCoordinates()
      .subscribe(res => this.onGettingULBWithPopulationSuccess(res));

    this.listenToFormControls();
  }
  @Output() ulbsClicked = new EventEmitter<string[]>();
  @Output() stateId = new EventEmitter<string>();
  @Input() ulbSelected: string;

  ulbsSelected = new FormControl([]);
  ulbFilterControl = new FormControl();

  stateData: IStateULBCovered[];
  allULBSList: IULBWithPopulationResponse["data"];
  stateAndULBDataMerged: {
    [stateId: string]: IStateULBCovered & { ulbs: ULBWithMapData[] };
  };

  filteredULBStateAndULBDataMerged: {
    [stateId: string]: IStateULBCovered & { ulbs: ULBWithMapData[] };
  };

  ulbsOfSelectedState: IULBWithPopulationResponse["data"];
  ulbListForAutoCompletion: IULBWithPopulationResponse["data"];

  nationalLevelMap: L.Map;
  StatesJSONForMapCreation: any;
  DistrictsJSONForMapCreation: IDistrictGeoJson;

  blueIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_blue_dot.png",
    iconSize: [6, 6],
    iconAnchor: [3, 3]
  });

  yellowIcon = L.icon({
    iconUrl: "./assets/images/maps/simple_yellow_dot.png",
    iconSize: [10, 10],
    iconAnchor: [5, 5]
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

  ngOnInit() {}

  ngOnChanges(changes: { ulbSelected: SimpleChange }) {
    if (changes.ulbSelected && changes.ulbSelected.currentValue) {
      this.onSelectingULBFromDropdown(changes.ulbSelected.currentValue);
    }
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
      this.convertDomToMiniMap("mapid");
      this.createStateLevelMap(stateOfULB.name);
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
      verticalPosition: "bottom"
    });
  }

  selectULBById(ulbId: string) {
    const ulbFound = this.ulbsOfSelectedState.find(ulb => ulb._id === ulbId);
    if (!ulbFound) {
      return false;
    }
    const ulbsAlreadySelect = <string[]>this.ulbsSelected.value;
    ulbsAlreadySelect.push(ulbFound._id);
    this.ulbsSelected.setValue(ulbsAlreadySelect);
    const marker = this.getDistrictMarkerOfULB(ulbFound);
    this.currentULBClicked = ulbFound;
    this.changeMarkerToSelected(marker);
  }

  private getDistrictMarkerOfULB(ulb: ULBWithMapData) {
    let markerFound;
    try {
      this.districtMap.eachLayer(layer => {
        if (
          (layer as any).options &&
          (layer as any).options.pane === "markerPane" &&
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
    const prms1 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/state_boundries.json")
        .done(response => {
          this.StatesJSONForMapCreation = response;
          resolve();
        })
        .fail(failed => {
          console.error("State Boundries getJSON request failed!", failed);
        });
    });
    prmsArr.push(prms1);

    // All District JSON Data
    const prms2 = new Promise((resolve, reject) => {
      $.getJSON("../assets/jsonFile/updated_district_9_July.json")
        .done(resp => {
          this.DistrictsJSONForMapCreation = resp;
          resolve();
        })
        .fail(failed => {
          console.error("District Boundries getJSON request failed!", failed);
        });
    });
    // prmsArr.push(prms2);

    return Promise.all(prmsArr);
  }

  createNationalLevelMap() {
    this.nationalLevelMap = L.map("mapid", {
      scrollWheelZoom: false,
      fadeAnimation: true,
      dragging: false,
      minZoom: 4.2,
      maxZoom: 8,
      zoomControl: false,
      doubleClickZoom: false
    }).setView([20.59, 78.96], 0.1);

    const stateLayer = L.geoJSON(this.StatesJSONForMapCreation, {
      style: this.stateColorStyle
    }).addTo(this.nationalLevelMap);
    this.createLegendsForNationalLevelMap();
    this.createControls(this.nationalLevelMap);

    if (stateLayer) {
      this.nationalLevelMap.fitBounds(stateLayer.getBounds(), {
        paddingBottomRight: [0, 0],
        padding: [0, 0],
        maxZoom: 8
      });
    }

    this.initializeNationalLevelMapLayer(this.nationalLevelMap);

    stateLayer.eachLayer(layer => {
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => this.createTooltip(layer, stateLayer),
        click: (args: ILeafletStateClickEvent) => this.onClickingState(args),
        mouseout: () => (this.mouseHoverOnState = null)
      });
    });
  }

  private initializeNationalLevelMapLayer(map: L.Map) {
    map.eachLayer((layer: any) => {
      if (!layer.feature || !layer.feature.properties) {
        return;
      }
      let count: number;
      const stateName = (<ILeafletStateClickEvent["sourceTarget"]>(
        (layer as any)
      )).feature.properties.ST_NM;
      const stateFound = this.stateData.find(state => state.name === stateName);
      count = stateFound ? stateFound.coveredUlbPercentage : 0;

      (layer as any).setStyle(
        {
          fillOpacity: 1,
          fillColor: this.getColorBasedOnPercentage(count),
          weight: -1
        },
        true
      );
    });
  }

  private listenToFormControls() {
    this.ulbsSelected.valueChanges.subscribe(newValue => {
      this.ulbsClicked.emit(newValue);
    });

    this.ulbFilterControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(textToSearch => {
        this.filteredULBStateAndULBDataMerged = this.filterMergedStateDataBy({
          ulbName: textToSearch
        });
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
    } = {};

    if (options.stateId) {
      filteredULBAndState[options.stateId] = {
        ...this.stateAndULBDataMerged[options.stateId]
      };
    }

    if (options.ulbName && !options.ulbName.trim()) {
      filteredULBAndState = { ...this.stateAndULBDataMerged };
    } else {
      Object.keys(this.stateAndULBDataMerged).forEach(stateId => {
        const stateFound = { ...this.stateAndULBDataMerged[stateId] };
        const ulbList = this.filteredULBBy(
          { ulbName: options.ulbName },
          stateFound.ulbs
        );
        if (!ulbList.length) {
          return;
        }
        stateFound.ulbs = ulbList;
        filteredULBAndState[stateId] = stateFound;
      });
    }

    return filteredULBAndState;
  }

  private filteredULBBy(
    options: { ulbName?: string },
    ulbList: ULBWithMapData[]
  ) {
    let filteredULBS: ULBWithMapData[] = [];
    if (options.ulbName) {
      filteredULBS = filteredULBS.concat(
        ulbList.filter(ulb => ulb.name.includes(options.ulbName))
      );
    }

    return filteredULBS;
  }

  private getStateOfULB(ulbId: string) {
    const ulbFound = this.ulbsOfSelectedState.find(ulb => ulb._id === ulbId);
    if (!ulbFound) {
      return false;
    }
    const stateFound = this.stateData.find(
      state => state._id === ulbFound.state
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
    this.filteredULBStateAndULBDataMerged = { ...this.stateAndULBDataMerged };
  }

  private CombineStateAndULBData(
    states: IStateULBCovered[],
    ulbStates: ULBWithMapData[]
  ) {
    const newStateObj: {
      [stateId: string]: IStateULBCovered & { ulbs: ULBWithMapData[] };
    } = {};
    ulbStates.forEach(ulb => {
      if (!newStateObj[ulb.state]) {
        const stateFound = states.find(state => state._id === ulb.state);
        if (!stateFound) {
          return;
        }
        newStateObj[stateFound._id] = { ...stateFound, ulbs: [{ ...ulb }] };
      } else {
        newStateObj[ulb.state].ulbs.push({ ...ulb });
      }
    });

    states.forEach(state => {
      if (newStateObj[state._id]) {
        return;
      }
      newStateObj[state._id] = { ...state, ulbs: [] };
    });

    return newStateObj;
  }

  private onGettingStateULBCoveredSuccess(res: IStateULBCoveredResponse) {
    this.stateData = res.data;
    if (this.allULBSList) {
      this.stateAndULBDataMerged = this.CombineStateAndULBData(
        this.stateData,
        this.allULBSList
      );
    }
    this.loadMapGeoJson().then(res => {
      this.createNationalLevelMap();
    });
  }

  private createTooltip(layer, stateLayer) {
    if (this.isMapOnMiniMapMode) {
      return false;
    }

    let obj: IStateULBCovered = null;
    const stateId = (<ILeafletStateClickEvent["sourceTarget"]>layer).feature
      .properties.ST_NM;
    const stateFound = this.stateData.find(state => state.name === stateId);

    obj = stateFound;
    if (obj != undefined) {
      this.mouseHoverOnState = obj;
      const text =
        "<p>State : <b>" + layer.feature.properties.ST_NM + "</b></p> <p> <b>";
    } else {
      stateLayer.bindTooltip("<b>" + layer.feature.properties.ST_NM + "</b>");
    }
  }

  private createLegendsForNationalLevelMap() {
    const arr = [
      { color: "#019CDF", text: "75-100%" },
      { color: "#46B7E7", text: "50-75%" },
      { color: "#8BD2F0", text: "25-50%" },
      { color: "#D0EDF9", text: "0-25%" }
    ];
    const legend = new L.Control({ position: "bottomright" });
    const labels = [
      `<span style="width: 100%; display: block;" class="text-center">% of Data Availability on Cityfinance.in</span>`
    ];
    legend.onAdd = function(map) {
      const div = L.DomUtil.create("div", "info legend");
      div.id = "legendContainer";
      div.style.width = "100%";
      arr.forEach(value => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 45%; margin: 1% auto; "><i class="circle" style="background: ${value.color}; padding:10%; display: inline-block; margin-right: 5%;"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
    // this.nationalLevelMap.leg;
  }

  private createControls(map: L.Map) {
    const info = new L.Control({ position: "topright" });
    info.onAdd = function(map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };
  }

  private onClickingState(mapClickEvent: ILeafletStateClickEvent) {
    if (!this.DistrictsJSONForMapCreation) {
      this.showDistrictMapNotLaodedWarning();
      return false;
    }

    if (this.isMapOnMiniMapMode) {
      this.resetMapToNationalLevel();
      this.convertMiniMapToOriginal("mapid");
      this.initializeNationalLevelMapLayer(this.nationalLevelMap);
      this.clearDistrictMapContainer();
      this.showMapLegends();
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
    this.convertDomToMiniMap("mapid");

    if (!status) {
      return false;
    }
    // this.convertDomToMiniMap("mapid");
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
        fillColor = "#019CDF";
      } else {
        fillColor = "#E8E8E8";
      }
      layer.setStyle(
        {
          fillOpacity: 1,
          fillColor,
          weight: -1
        },
        true
      );
    });
  }

  private convertMiniMapToOriginal(domId: string) {
    const element = document.getElementById(domId);
    element.classList.remove("miniMap");
    this.isMapOnMiniMapMode = false;
    return true;
  }

  private createStateLevelMap(stateName: string) {
    const stateFound = Object.values(this.stateAndULBDataMerged).find(
      state => state.name === stateName
    );
    if (!stateFound) {
      return false;
    }
    this.stateId.emit(stateFound._id);
    this.filteredULBStateAndULBDataMerged = this.filterMergedStateDataBy({
      stateId: stateFound._id
    });

    this.ulbsOfSelectedState = [...stateFound.ulbs];
    if (!this.ulbsOfSelectedState.length) {
      const message = `${stateFound.name} does not conains any ULB.`;
      this.showSnacbarMessage(message);
      return false;
    }

    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
    const ulbsWithCoordinates = this.ulbsOfSelectedState.filter(
      ulb =>
        parseFloat(ulb.location.lat) !== NaN &&
        parseFloat(ulb.location.lng) !== NaN
    );
    if (!ulbsWithCoordinates.length) {
      const message = `${stateFound.name} does not conains any ULB with geo co-ordinates.`;
      this.showSnacbarMessage(message);
      return false;
    }

    const filteredDistricts = this.DistrictsJSONForMapCreation.features.filter(
      districts => districts.properties.ST_NM === stateFound.name
    );
    const newObj: IDistrictGeoJson = {
      type: "FeatureCollection",
      features: filteredDistricts
    };

    const dataPointsForMarker = ulbsWithCoordinates.map(ulb => ({
      ...ulb.location,
      name: ulb.name,
      area: ulb.area,
      population: ulb.population,
      ...ulb
    }));

    const centerLatLngOfState = this.getCentroid(
      ulbsWithCoordinates.map(ulb => [+ulb.location.lat, +ulb.location.lng])
    );

    const stateCenter = <any>{
      lat: centerLatLngOfState[0],
      lng: centerLatLngOfState[1]
    };
    this.createDistrictMap(newObj, {
      center: stateCenter,
      dataPoints: [...dataPointsForMarker]
    });
    this.currentStateInView = { ...stateFound };

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
      }[];
    }
  ) {
    this.clearDistrictMapContainer();

    setTimeout(() => {
      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        dragging: false,
        minZoom: 4.2,
        maxZoom: 5.7,
        zoomControl: false,
        doubleClickZoom: false
      }).setView([options.center.lat, options.center.lng], 5.7);

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: this.stateColorStyle
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

      options.dataPoints.forEach(dataPoint => {
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon
        }).addTo(districtMap);
        marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on(
          "click",
          values =>
            this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker),
          this
        );
      });
    }, 0);
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
    icon: L.Icon<L.IconOptions>;
  }) {
    const marker = L.marker([+dataPoint.lat, +dataPoint.lng], {
      icon: dataPoint.icon,
      interactive: true,
      bubblingMouseEvents: true
    });
    return marker;
  }

  private onDistrictMarkerClick = (
    values: L.LeafletMouseEvent,
    marker: L.Marker
  ) => {
    const ulbFound = this.allULBSList.find(
      ulb =>
        +ulb.location.lat === values.latlng.lat &&
        +ulb.location.lng === values.latlng.lng
    );

    if (!ulbFound) {
      return false;
    }
    this.currentULBClicked = ulbFound;
    console.log("setting ulb clicked", ulbFound);
    const ulbAlreadySelect = !!this.ulbsSelected.value.find(
      id => id === ulbFound._id
    );
    let newValues: string[];

    // this.getDistrictMarkerOfULB(ulb)

    if (ulbAlreadySelect) {
      newValues = this.ulbsSelected.value.filter(id => id !== ulbFound._id);
      this.changeMarkerToUnselected(marker);
    } else {
      newValues = [ulbFound._id];
      this.unselectAllDistrictMarker();
      // newValues = <string[]>this.ulbsSelected.value;
      this.changeMarkerToSelected(marker);
      // newValues.push(ulbFound._id);
    }
    this.ulbsSelected.setValue(newValues);
  };

  private unselectAllDistrictMarker() {
    this.districtMap.eachLayer((layer: any) => {
      if (
        (layer as any).options &&
        (layer as any).options.pane === "markerPane"
      ) {
        this.changeMarkerToUnselected(layer);
      }
    });
  }

  private changeMarkerToSelected(marker: L.Marker) {
    marker.setIcon(this.yellowIcon);
  }

  private changeMarkerToUnselected(marker: L.Marker) {
    marker.setIcon(this.blueIcon);
  }

  private getColorBasedOnPercentage(value: number) {
    if (value >= 75) {
      return "#019CDF";
    }
    if (value >= 50) {
      return "#46B7E7";
    }
    if (value >= 25) {
      return "#8BD2F0";
    }
    if (value >= 0) {
      return `#D0EDF9`;
    }
    return "gray";
  }

  /**
   * @param arr 0th index = Latitude, 1st Index = Longitude
   * @returns [latitude, longitude]
   */
  private getCentroid(arr: number[][]) {
    return arr.reduce(
      function(x, y) {
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
      color: "#ece5e5",
      fillOpacity: 0.7
    };
  }

  private resetMapToNationalLevel() {
    this.resetULBsSelected();
    this.resetulbsOfSelectedState();
    this.resetULBForAutoCompletion();
    this.resetDropdownListToNationalLevel();
    this.resetCurrentSelectState();
    this.resetCurrentULBClicked();
  }

  private resetulbsOfSelectedState() {
    this.ulbsOfSelectedState = [...this.allULBSList];
  }

  private resetULBForAutoCompletion() {
    this.ulbListForAutoCompletion = this.ulbsOfSelectedState;
  }

  private resetDropdownListToNationalLevel() {
    this.filteredULBStateAndULBDataMerged = { ...this.stateAndULBDataMerged };
  }

  private resetCurrentSelectState() {
    this.currentStateInView = null;
    this.stateId.emit(null);
  }

  private resetCurrentULBClicked() {
    this.currentULBClicked = null;
  }

  private clearDistrictMapContainer() {
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="h-60 col-sm-12"
    style="background: white;z-index: 8; display: inline-block; width: 100%;height: 60vh;"
  ></div>`;
  }
}
