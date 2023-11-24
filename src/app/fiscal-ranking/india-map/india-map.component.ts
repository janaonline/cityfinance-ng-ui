import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';
import * as L from 'leaflet';
import { IState } from 'src/app/models/state/state';
import { USER_TYPE } from 'src/app/models/user/userType';
import { NationalMapSectionService } from 'src/app/pages/new-dashbords/national/national-map-section/national-map-section.service';
import { ILeafletStateClickEvent } from 'src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent';
import { NationalHeatMapComponent } from 'src/app/shared/components/re-useable-heat-map/national-heat-map/national-heat-map.component';
import { IStateULBCovered } from 'src/app/shared/models/stateUlbConvered';
import { CommonService } from 'src/app/shared/services/common.service';
import { GeographicalService } from 'src/app/shared/services/geographical/geographical.service';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { MapUtil } from 'src/app/util/map/mapUtil';
import { IMapCreationConfig } from 'src/app/util/map/models/mapCreationConfig';
import { FiscalRankingService, MapData } from '../fiscal-ranking.service';

export interface ColorDetails {
  color: string,
  text: string,
  min: number,
  max: number
}

export interface Marker{
  lat: number,
  lng: number,
  name: string
}

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss']
})
export class IndiaMapComponent extends NationalHeatMapComponent implements OnInit, AfterViewInit {
  @Output() onStateChange = new EventEmitter();
  @Input() mapData: MapData;
  @Input() markers: Marker[] = [];
  @Input() colorCoding: any = [];
  @Input() colorDetails: ColorDetails[];
  randomNumber = 0;

  nationalLevelMap: any;
  selected_state = "India";
  stateselected: IState;
  stateList: IState[];
  previousStateLayer: ILeafletStateClickEvent["sourceTarget"] | L.Layer = null;
  tableData;
  myForm: FormGroup;
  selectedStateCode;
  nationalInput: any = {
    financialYear: "2020-21",
    stateId: "",
    populationCat: true,
    ulbType: "",
  };
  AvailabilityTitle: String = "India";
  showLoader: boolean = true;
  dataAvailabilityvalue: Number;
  isLoading: boolean = true;
  mapConfig = {
    code: {
      state: "",
      city: "",
    },
    showStateList: false,
    showDistrictList: false,
    stateMapContainerHeight: "23rem",
    nationalZoomOnMobile: 3.9, // will fit map in container
    nationalZoomOnWeb: 4.2, // will fit map in container
    stateZoomOnMobile: 4, // will fit map in container
    stateZoomOnWeb: 4, // will fit map in container
    stateBlockHeight: "23.5rem", // will fit map in container
  };
  currentStateId: any = "";
  financialYearList: any = [];
  StatesJSONForMapCreation: any;
  national: any = { _id: "", name: "India" };
  currentId: any;

  constructor(
    protected _commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected _geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nationalMapService: NationalMapSectionService,
    private fiscalRankingService: FiscalRankingService,
    private _loaderService: GlobalLoaderService
  ) {
    super(_commonService, _snackbar, _geoService, _activateRoute);
    setTimeout(() => {
      this.ngOnChanges({
        yearSelected: {
          currentValue: ["2016-17"],
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });
    }, 1000);
    this.initializeform();
    this.fetchStateList();
  }

  ngOnInit(): void {
    this.initializeNationalLevelMapLayer(this.stateLayers);
    this.createNationalLevelMap(
      this.StatesJSONForMapCreation,
      this.currentId
    );
    this.clearDistrictMapContainer();
    this.randomNumber = Math.round(Math.random());
    this.getFinancialYearList();
    this.getNationalTableData();
    this.loadData();
    this.createNationalMapJson();
  }

  createLegends() {
    const legend = new L.Control({ position: "bottomright" });
    const labels = [
      `<span style="width: 100%; display: block; font-size: 12px" class="text-center">% of Data Availability on Cityfinance.in</span>`,
    ];
    const colorDetails = this.colorDetails;
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.id = "legendContainer";
      div.style.width = "100%";
      colorDetails?.forEach((value) => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 75%;margin: 1% auto; font-size: 12px; "><i class="circle" style="background: ${value.color}; padding:6px; display: inline-block; margin-right: 12%; "> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };
    legend.addTo(this.nationalLevelMap);
  }

  createNationalMapJson() {
    const promise = this._geoService.loadConvertedIndiaGeoData().toPromise();
    promise.then((data) => (this.StatesJSONForMapCreation = data));
    return Promise.all([promise]);
  }

  getNationalLevelMapData(year) {
    this.nationalMapService.getNationalMapData(year).subscribe((res: any) => {
      if (!res) return;
      this.colorCoding = res?.data;
      this.initializeNationalLevelMapLayer(this.stateLayers);
      this.createNationalLevelMap(
        this.StatesJSONForMapCreation,
        this.currentId
      );
    });
  }

  getColor(value: any) {
    return this.colorDetails?.find(item => value >= item.min && value <= item.max)?.color || "#F3FAFF";
  }

  ngAfterViewInit(): void {

  }

  getNationalTableData() {
    this.showLoader = true;
    this._loaderService.showLoader();
    this.nationalMapService.getNationalData(this.nationalInput).subscribe((res: any) => {
      this._loaderService.stopLoader();
      this.showLoader = false;
      this.tableData = res?.data;
      this.dataAvailabilityvalue = Math.round(res?.dataAvailability);
      sessionStorage.setItem("dataAvail", res.dataAvailability);
      this.nationalMapService.setDataAvailabilityValue({
        data: res.dataAvailability,
      });
    }, err => {
      this.showLoader = false;
    });
  }
  private initializeform() {
    this.myForm = this.fb.group({ stateId: [""] });
  }

  get isState() {
    return this.userUtil.getUserType() == USER_TYPE.STATE;
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
    if (containerId && this.userUtil.getUserType() == USER_TYPE.STATE) {
      const preSelectedState = this.stateList?.find(state => state._id == this.userUtil.getLoggedInUserDetails()?.state);
      if (preSelectedState) {
        this.onSelectingStateFromDropDown(preSelectedState);
      }
    }


    this.currentId = containerId;
    this.isLoading = true;
    let zoom;
    if (window.innerWidth > 1050) zoom = this.mapConfig.nationalZoomOnWeb;
    else zoom = this.mapConfig.nationalZoomOnMobile;
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
    ({ stateLayers: this.stateLayers, map } =
      MapUtil?.createDefaultNationalMap(configuration));

    this.nationalLevelMap = map;
    this.createControls(this.nationalLevelMap);
    this.createLegends();

    let stateToAutoSelect: IStateULBCovered;
    let layerToAutoSelect;
    const stateFound = this.stateData.find(state => state._id === this.queryParams?.state);
    if (this.queryParams.state && stateFound) stateToAutoSelect = stateFound;

    this.stateLayers.eachLayer((layer) => {
      if (stateToAutoSelect) {
        if (MapUtil.getStateName(layer) === stateToAutoSelect.name) {
          layerToAutoSelect = { sourceTarget: layer };
        }
      }
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => this.createTooltip(layer, this.stateLayers),
        click: (args: ILeafletStateClickEvent) => {
          this.selectedStateCode = args.sourceTarget.feature.properties.ST_CODE;
          this.onStateLayerClick(args, false, false);
        },
        mouseout: () => (this.mouseHoverOnState = null),
      });
    });

    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
      this.isLoading = false;
    }

    if (this.isMapOnMiniMapMode) {
      this.showStateLayerOnlyFor(
        this.nationalLevelMap,
        this.currentStateInView
      );
    }
    this.initializeNationalLevelMapLayer(this.stateLayers);
  }

  showMapLegends() {
    const element = document.getElementById("legendContainer");
    if (element) {
      element.style.visibility = "visible";
    }
  }
  clearDistrictMapContainer() {
    const height = this.userUtil.isUserOnMobile() ? `100%` : "530px";

    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #F8F9FF;
    display: inline-block; width: 100%;height: ${height};  z-index: 100"

  >
  </div>`;
  }

  loadData() {
    this._commonService.fetchStateList().subscribe((res: any) => {
      this.stateList = [{ _id: "", name: "India" }].concat(this._commonService.sortDataSource(res, "name"));
    });
    this._commonService.state_name_data.subscribe((res) => {
      this.onSelectingStateFromDropDown(res);
      this.updateDropdownStateSelection(res);
    });
  }

  getFinancialYearList() {
    this.nationalMapService.getNationalFinancialYear().subscribe((res: any) => {
      this.financialYearList = res?.data?.FYs;
    });
  }

  onSelectingStateFromDropDown(state: any | null) {
    this.nationalMapService.setCurrentSelectedId({ data: state?._id });
    this.currentStateId = state?._id;
    this.onStateChange.emit({ state: this.currentStateId })
    this.AvailabilityTitle = state?.name;
    this.nationalInput.stateId = state?._id || '';
    this.getNationalTableData();
    this.selectedStateCode = state?.code;
    this.selected_state = state?.name || "India";
    if (this.selected_state === "India" && this.isMapOnMiniMapMode) {
      this.createLegends();
      this._commonService.fetchStateList().subscribe((res) => {
        this.stateList = [{ _id: "", name: "India" }].concat(res);
      });
      this.updateDropdownStateSelection(state);
      const element = document.getElementById(this.createdDomMinId);
      element.style.display = "block";
      this.resetMapToNationalLevel();
      this.initializeNationalLevelMapLayer(this.stateLayers);
    }
    this.stateselected = state;
    this.selectStateOnMap(state);
  }

  initializeNationalLevelMapLayer(map: L.GeoJSON<any>) {
    this.showMapLegends();
    this.markers.forEach(marker => {
      L.marker([marker.lat, marker.lng], {
        icon: new L.Icon({
          iconUrl: 'assets/fiscal-rankings/map-marker.png',
        }), title: marker.name
      }).addTo(this.nationalLevelMap);
    });

    map?.eachLayer((layer: any) => {
      const stateCode = MapUtil.getStateCode(layer);
      if (!stateCode) return;

      let color;
      let stateCodes = this.colorCoding.map(el => el.code);
      const state = this.stateData?.find(state => state?.code === stateCode);

      if (state) {
        this.colorCoding?.forEach((elem) => {
          if (elem?.code == layer?.feature?.properties?.ST_CODE) {
            if (elem.color) {
              color = elem.color;
            } else {
              color = this.getColor(elem?.percentage);
            }
          } else if (
            !stateCodes.includes(layer?.feature?.properties?.ST_CODE)
          ) {
            color = this.getColor(0);
          }

          MapUtil.colorStateLayer(layer, color);
        });
      }
    });
  }

  private selectStateOnMap(state?: IState) {
    if (this.previousStateLayer) {
      this.previousStateLayer = null;
    }
    if (!state) return;
    this.stateLayers?.eachLayer((layer) => {
      const layerName = MapUtil.getStateName(layer);
      if (layerName !== state.name) return;
      this.previousStateLayer = layer;
    });
  }

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.stateList = this._commonService.sortDataSource(res, "name");
      this.stateList = [{ _id: null, name: "India" }].concat(res);
    });
  }
  private updateDropdownStateSelection(state: IState) {
    this.stateselected = state;
    this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
  }
}