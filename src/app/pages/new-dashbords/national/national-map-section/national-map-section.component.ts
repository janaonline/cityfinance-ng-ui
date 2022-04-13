import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { FeatureCollection, Geometry } from "geojson";
import * as L from "leaflet";
import { IState } from "src/app/models/state/state";
import { ILeafletStateClickEvent } from "src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent";
import { ReUseableHeatMapComponent } from "src/app/shared/components/re-useable-heat-map/re-useable-heat-map.component";
import { IStateULBCovered } from "src/app/shared/models/stateUlbConvered";
import { ULBWithMapData } from "src/app/shared/models/ulbsForMapResponse";
import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { CommonService } from "src/app/shared/services/common.service";
import { GeographicalService } from "src/app/shared/services/geographical/geographical.service";
import { MapUtil } from "src/app/util/map/mapUtil";
import { IMapCreationConfig } from "src/app/util/map/models/mapCreationConfig";
import { ICreditRatingData } from "src/app/models/creditRating/creditRatingResponse";
import { NationalHeatMapComponent } from "src/app/shared/components/re-useable-heat-map/national-heat-map/national-heat-map.component";
import { NationalMapSectionService } from "./national-map-section.service";
// import { EventEmitter } from "stream";
// const districtJson = require("../../../../assets/jsonFile/state_boundries.json");
const districtJson = require("../../../../../assets/jsonFile/state_boundries.json");
@Component({
  selector: "app-national-map-section",
  templateUrl: "./national-map-section.component.html",
  styleUrls: ["./national-map-section.component.scss"],
})
export class NationalMapSectionComponent
  extends NationalHeatMapComponent
  implements OnInit
{
  constructor(
    protected _commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected _geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private assetService: AssetsService,
    private router: Router,
    private nationalMapService: NationalMapSectionService
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

  nationalLevelMap: any;
  selected_state = "India";
  stateselected: IState;
  creditRating: { [stateName: string]: number; total?: number } = {};
  stateList: IState[];
  statesLayer: L.GeoJSON<any>;
  districtMarkerMap = {};
  dataForVisualization: {
    financialStatements?: number;
    totalMunicipalBonds?: number;
    totalULB?: number;
    coveredUlbCount?: number;
    loading: boolean;
  } = { loading: true };
  previousStateLayer: ILeafletStateClickEvent["sourceTarget"] | L.Layer = null;
  totalUsersVisit: number;
  StyleForSelectedState = {
    weight: 2,
    color: "#a6b9b4",
    fillOpacity: 1,
  };
  defaultStateLayerColorOption = {
    fillColor: "#efefef",
    // fillColor: this.getColor(540),
    weight: 1,
    opacity: 1,
    color: "#a6b9b4",
    fillOpacity: 1,
  };
  mapLabels = [
    {
      name: "0%",
      color: "#a6b9b4",
    },
    {
      name: "25%",
      color: "#fcda4a",
    },
    {
      name: "60%",
      color: "#4a6ccb",
    },
    {
      name: "Above 80%",
      color: "#12a6dd",
    },
  ];
  popBtn = true;
  tableData;
  myForm: FormGroup;
  DropdownSettings = {
    singleSelection: true,
    text: "India",
    enableSearchFilter: false,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "homepage-stateList custom-class",
  };
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
    nationalZoomOnWeb: 3.9, // will fit map in container
    stateZoomOnMobile: 4, // will fit map in container
    stateZoomOnWeb: 4, // will fit map in container
    stateBlockHeight: "23.5rem", // will fit map in container
  };

  currentStateId: any = "";
  colorCoding: any = [];
  financialYearList: any = [];

  StatesJSONForMapCreation: any;
  national: any = { _id: "", name: "India" };
  ngOnInit(): void {
    this.getFinancialYearList();
    this.getNationalLevelMapData("2020-21");
    this.getNationalTableData();
    this.loadData();
    this.subFilterFn("popCat");
    this.createNationalMapJson();
  }

  createNationalMapJson() {
    const prmsArr = [];
    const prms1 = this._geoService.loadConvertedIndiaGeoData().toPromise();
    prmsArr.push(prms1);

    prms1.then((data) => (this.StatesJSONForMapCreation = data));

    return Promise.all(prmsArr);
  }

  getNationalLevelMapData(year) {
    let randomNumber = Math.round(Math.random());
    this.nationalMapService.getNationalMapData(year).subscribe((res: any) => {
      this.colorCoding = res?.data;
      if (res) {
        // this.createNationalLevelMap(
        //   this.StatesJSONForMapCreation,
        //   "mapidd" + Math.random()
        // );
        this.createNationalLevelMap(
          this.StatesJSONForMapCreation,
          "mapidd" + randomNumber
        );
        // this.initializeNationalLevelMapLayer(this.StatesJSONForMapCreation);
      }
    });
  }

  getColor(d) {
    let color;
    if (d >= 80) {
      color = "#12a6dd";
    } else if (d >= 60 && d < 80) {
      color = "#4a6ccb";
    } else if (d >= 25 && d < 60) {
      color = "#fcda4a";
    } else if (d < 25) {
      color = "#a6b9b4";
    } else {
      color = "#a6b9b4";
    }
    return color;
  }

  selectFinancialYear(event) {
    this.nationalInput.financialYear = event.target.value;
    this.getNationalTableData();
    this.nationalMapService.setCurrentSelectYear({
      data: event.target.value,
    });
    this.getNationalLevelMapData(event.target.value);
  }

  viewDashboard() {
    this.router.navigateByUrl(
      `/dashboard/state?stateId=${this.currentStateId}`
    );
  }
  getNationalTableData() {
    this.showLoader = true;
    this.nationalMapService.getNationalData(this.nationalInput).subscribe(
      (res: any) => {
        this.showLoader = false;
        this.tableData = res?.data;
        this.dataAvailabilityvalue = res?.dataAvailability;
        this.nationalMapService.setDataAvailabilityValue({
          data: res.dataAvailability,
        });
      },

      (err) => {
        this.showLoader = false;
      }
    );
  }
  private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
  changeInDropdown(e) {
    console.log("Data sets", e);
    this.onStateLayerClick(e);
    //  this.changeInStateOrCity.emit(e);
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
    
    this.isLoading = true;
    this.isProcessingCompleted.emit(false);
    let zoom;
    if (window.innerWidth > 1050) zoom = this.mapConfig.nationalZoomOnWeb;
    else zoom = this.mapConfig.nationalZoomOnMobile;
    // let vw = Math.max(document.documentElement.clientWidth);
    // vw = (vw - 1366) / 1366;
    // let zoom = 4 + vw;
    // if (this.userUtil.isUserOnMobile()) {
    //   zoom = 3.5 + (window.devicePixelRatio - 2) / 10;
    //   if (window.innerHeight < 600) zoom = 3.6;
    //   const valueOf1vh = this.calculateVH(1);
    //   if (valueOf1vh < 5) zoom = 3;
    //   else if (valueOf1vh < 7) zoom = zoom - 0.2;
    //   // return zoom;
    // }

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
      MapUtil.createDefaultNationalMap(configuration));

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
        click: (args: ILeafletStateClickEvent) => {
          this.selectedStateCode = args.sourceTarget.feature.properties.ST_CODE;
          this.onStateLayerClick(args, false, false);
        },
        mouseout: () => (this.mouseHoverOnState = null),
      });
    });

    /**
     * @description If the map is already on mini mode, then it means the state is already selected, and its state map
     * is in the view.
     */

    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
      this.isLoading = false;
    }
    this.hideMapLegends();

    if (this.isMapOnMiniMapMode) {
      this.hideMapLegends();
      this.showStateLayerOnlyFor(
        this.nationalLevelMap,
        this.currentStateInView
      );
    }

    this.isProcessingCompleted.emit(true);
  }

  showMapLegends() {
    console.warn("show legends hidden");
  }

  clearDistrictMapContainer() {
    const height = this.userUtil.isUserOnMobile() ? `100%` : "80vh";
    console.log(height);
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #F8F9FF;
    display: inline-block; width: 100%;height: ${height};"
  >
  </div>`;
  }

  createDistrictMap(
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
    
    console.log("selectedStateCode", this.selectedStateCode);

    console.log("json", districtGeoJSON, options);
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

      zoom = 5.5;

      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        minZoom: zoom,
        maxZoom: zoom + 5,
        zoomControl: true,
        keyboard: true,
        attributionControl: true,
        doubleClickZoom: true,
        dragging: true,
        tap: true,
      }).setView([options.center.lat, options.center.lng], 4);
      // districtMap.touchZoom.disable();
      // districtMap.doubleClickZoom.disable();
      districtMap.scrollWheelZoom.disable();
      // districtMap.boxZoom.disable();
      // districtMap.keyboard.disable();
      // districtMap.dragging.disable();

      const districtLayer = L.geoJSON(districtGeoJSON, {
        style: {
          fill: true,
          fillColor: "red",
        },
        // style: this.newDashboardstateColorStyle,
        // style: {
        //   color: "#0000",
        // },
      }).addTo(districtMap);
      console.log("districtLayer", districtLayer);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

      let color;
      if (this.colorCoding) {
        this.colorCoding.forEach((elem) => {
          if (elem?.code == this.selectedStateCode) {
            color = this.getColor(elem?.percentage);
          }
          // return;
          MapUtil.colorStateLayer(districtLayer, color);
        });
      }
      // console.log("this.districtMap", this.districtMap);

      // options.dataPoints.forEach((dataPoint: any) => {
      //   const marker = this.createDistrictMarker({
      //     ...dataPoint,
      //     icon: this.blueIcon,
      //   }).addTo(districtMap);
      //   marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
      //   marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
      //   marker.on("click", (values) => {
      //     let city;
      //     // if (values["latlng"])
      //     //   city = this.stateUlbData.data[this.selectedStateCode].ulbs.find(
      //     //     (value) =>
      //     //       +value.location.lat === values["latlng"].lat &&
      //     //       +value.location.lng === values["latlng"].lng
      //     //   );
      //     // if (city) {
      //     //   this.selectedDistrictCode = city.code;
      //     //   this.selectCity(city.code, false);
      //     // }
      //     this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker);
      //   });
      //   this.districtMarkerMap[dataPoint.code] = marker;
      // });
    }, 0.5);
  }
  loadData() {
    this._commonService.fetchStateList().subscribe(
      (res: any) => {
        this.stateList = res;
      },
      (error) => {
        console.log(error);
      }
    );
    this._commonService.state_name_data.subscribe((res) => {
      console.log("sub....", res, res.name, res?.code);
      this.onSelectingStateFromDropDown(res);
      this.updateDropdownStateSelection(res);
    });
  }
  subFilterFn(type) {
    if (type == "popCat") {
      this.popBtn = true;
      this.nationalInput.populationCat = true;
      this.nationalInput.ulbType = "";
      this.getNationalTableData();
    }
    if (type == "ulbType") {
      this.popBtn = false;
      this.nationalInput.populationCat = "";
      this.nationalInput.ulbType = true;
      this.getNationalTableData();
    }
  }

  getFinancialYearList() {
    this.nationalMapService.getNationalFinancialYear().subscribe((res: any) => {
      this.financialYearList = res?.data?.FYs;
    });
  }

  onSelectingStateFromDropDown(state: any | null) {
    this.nationalMapService.setCurrentSelectedId({
      data: state?._id,
    });
    this.currentStateId = state?._id;
    this.AvailabilityTitle = state?.name;
    this.nationalInput.stateId = state._id;
    this.getNationalTableData();
    this.selectedStateCode = state?.code;
    this.selected_state = state ? state?.name : "India";
    if (this.selected_state === "India" && this.isMapOnMiniMapMode) {
      // this.stateList = [];
      this._commonService.fetchStateList().subscribe((res) => {
        this.stateList = [{ _id: "", name: "India" }].concat(res);
      });
      this.updateDropdownStateSelection(state);
      //  {
      //   console.log(state);
      //   this.stateselected = state;
      //   this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
      // }
      // this.stateAndULBDataMerged
      const element = document.getElementById(this.createdDomMinId);
      element.style.display = "block";

      this.resetMapToNationalLevel();
      this.initializeNationalLevelMapLayer(this.stateLayers);
    }
    console.log("sdc 2", state, this.stateselected, this.selected_state);
    this.stateselected = state;
    //   this.fetchDataForVisualization(state ? state._id : null);
    //   this.fetchBondIssueAmout(
    //    this.stateselected ? this.stateselected._id : null
    //  );
    console.log("mini mode", this.isMapOnMiniMapMode);
    this.selectStateOnMap(state);
    this._commonService
      .getUlbByState(state ? state?.code : null)
      .subscribe((res) => {
        console.log("ulb data", res);
        let ulbsData: any = res;
        //   this.cityData = ulbsData?.data?.ulbs;
        //console.log('city data', this.cityData)
      });
  }

  initializeNationalLevelMapLayer(map: L.GeoJSON<any>) {
    
    map.eachLayer((layer: any) => {
      const stateCode = MapUtil.getStateCode(layer);
      if (!stateCode) {
        return;
      }

      const stateFound = this.stateData.find(
        (state) => state.code === stateCode
      );
      const count = stateFound ? stateFound.coveredUlbPercentage : 0;
      // this.colorCoding = [
      // const color = this.getColorBasedOnPercentage(count);
      let color;
      if (this.colorCoding) {
        this.colorCoding.forEach((elem) => {
          if (elem?.code == layer?.feature?.properties?.ST_CODE) {
            color = this.getColor(elem?.percentage);
          }
          // return;
          MapUtil.colorStateLayer(layer, color);
        });
      }
    });
  }

  private selectStateOnMap(state?: IState) {
    if (this.previousStateLayer) {
      // this.resetStateLayer(this.previousStateLayer);
      this.previousStateLayer = null;
    }
    if (!state) {
      return;
    }
    console.log("state layers", this.stateLayers);

    this.stateLayers?.eachLayer((layer) => {
      const layerName = MapUtil.getStateName(layer);
      if (layerName !== state.name) {
        return;
      }
      this.previousStateLayer = layer;
      this.higlightClickedState(layer);
    });
  }

  private higlightClickedState(stateLayer) {
    
    console.log(
      "clicked state==>",
      stateLayer,
      stateLayer?.feature?.properties?.ST_CODE
    );
    const colorCoding = [
      {
        code: "BR",
        percent: 20,
      },
      {
        code: "AP",
        percent: 50,
      },
      {
        code: "PB",
        percent: 90,
      },
      {
        code: "OD",
        percent: 70,
      },
      {
        code: "HR",
        percent: 70,
      },
    ];
    let color;
    let selectedCode = stateLayer?.feature?.properties?.ST_CODE;
    colorCoding.forEach((elem) => {
      if (elem?.code == selectedCode) {
        color = this.getColor(elem?.percent);
      }
      // return;
    });
    let obj: any = {
      containerPoint: {},
      latlng: {
        // lat: 23.48789594497792,
        // lng: 78.2647891998273
      },
      layerPoint: {},
      originalEvent: {},
      sourceTarget: stateLayer,
      target: stateLayer,
      type: "click",
    };
    this.onStateLayerClick(obj);
    
    console.log("lastColor==>", color);
    stateLayer.setStyle({
      fillColor: "#3E5DB1",
      color: color,
      // fillColor: this.getColor(540),
      fillOpacity: 1,
    });
    stateLayer.options.style.color = color;
    // stateLayer.setStyle(this.StyleForSelectedState);
    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //   stateLayer.bringToFront();
    // }
  }
  private resetStateLayer(layer) {
    layer.setStyle({
      color: this.defaultStateLayerColorOption.color,
      weight: this.defaultStateLayerColorOption.weight,
    });
    layer.closeTooltip();
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.stateList = [{ _id: null, name: "India" }].concat(res);
    });
  }
  private updateDropdownStateSelection(state: IState) {
    console.log(state);
    this.stateselected = state;
    this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
  }
  resetNationalMap() {
    this.onSelectingStateFromDropDown(null);
    let obj = {
      _id: "null",
      name: "India",
    };
    this.updateDropdownStateSelection(obj);
  }
}
