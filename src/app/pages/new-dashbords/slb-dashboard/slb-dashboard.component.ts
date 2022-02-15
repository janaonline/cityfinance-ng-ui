import { Component, Input, NgZone, OnInit, Output } from "@angular/core";
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
// const districtJson = require("../../../../assets/jsonFile/state_boundries.json");
const districtJson = require("../../../../assets/jsonFile/state_boundries.json");

@Component({
  selector: 'app-slb-dashboard',
  templateUrl: './slb-dashboard.component.html',
  styleUrls: ['./slb-dashboard.component.scss']
})

export class SlbDashboardComponent extends 
NationalHeatMapComponent implements OnInit {

  constructor(
    protected _commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected _geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _ngZone: NgZone,
    private assetService: AssetsService,
    private router: Router
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
    color: "black",
    fillOpacity: 1,
  };
  defaultStateLayerColorOption = {
    fillColor: "#efefef",
    weight: 1,
    opacity: 1,
    color: "#403f3f",
    fillOpacity: 1,
  };
  mapLabels = [
    {
     name: '0%',
     color: '#A6B9B4',
    },
    {
     name: '25%',
     color: '#FCDA4A',
    },
    {
     name: '60%',
     color: '#4A6CCB',
    },
    {
     name: 'Above 80%',
     color: '#12A6DD',
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
  ngOnInit(): void {
    this.loadData();
    this.subFilterFn('popCat');
  }
 private initializeform() {
    this.myForm = this.fb.group({
      stateId: [""],
    });
  }
  changeInDropdown(e){
    console.log('Data sets', e);
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
    this.isProcessingCompleted.emit(false);
    let vw = Math.max(document.documentElement.clientWidth);
    vw = (vw - 1366) / 1366;
    let zoom = 4 + vw;
    if (this.userUtil.isUserOnMobile()) {
      zoom = 3.5 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      // return zoom;
    }
    zoom = 4.2;
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
        //  this.selectedStateCode = args.sourceTarget.feature.properties.ST_CODE;
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
    const height = this.userUtil.isUserOnMobile() ? `100%` : "90vh";
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #F8F9FF; background-image: url('../../../../assets/Layer\ 1.png');
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
    console.log("json", districtGeoJSON);
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
        style: this.newDashboardstateColorStyle,
      }).addTo(districtMap);

      if (districtLayer) {
        districtMap.fitBounds(districtLayer.getBounds());
      }
      this.districtMap = districtMap;

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
  loadData(){
    this._commonService.fetchStateList().subscribe((res: any)=>{
      console.log('res', res);
      this.stateList = res;
     },
     (error)=>{
       console.log(error)
     });
     this._commonService.state_name_data.subscribe((res) => {
      console.log('sub....', res, res.name);
      this.onSelectingStateFromDropDown(res);
      this.updateDropdownStateSelection(res);
    });
  }
  subFilterFn(type){
    if(type == 'popCat'){
    this.popBtn = true;
    this.tableData = {
      timeStamp : 12332323434,
      success:true,
      message: 'success',
      data: [
        {
          tableId:1,
          name:"Revenue Table",
          tableClass: 'revenue_tb',
          border:"1",
          bgColor: '#9D84B7',
          columns : [
            {
            key: 'ulbType',
            display_name: "ULB Type",
            },
          {
            key: 'numberOfULBs',
            display_name: "Number Of ULBs",
          },
          {
            key: 'ulbsWithData',
            display_name: "ULBs With Data",
          },
           {
              key : 'DataAvailPercentage',
              display_name: 'Data Availability Percentage'
           },
           {
            key : 'urbanPopulationPercentage',
            display_name: 'Urban population percentage'
         },

          ],
          rows: [
            {
             // lineItem: 'Average',
              ulbType:'Average',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
              // lineItem: 'Average',
               ulbType:'4M+',
               numberOfULBs: '1500',
               ulbsWithData: '111',
               DataAvailPercentage: '30%',
               urbanPopulationPercentage: '20%'
             },
            {
             // lineItem: 'Municipal Corporation',
               ulbType:'1M-4M',
               numberOfULBs: '1500',
               ulbsWithData: '111',
               DataAvailPercentage: '30%',
               urbanPopulationPercentage: '20%'
            },
            {
             // lineItem: 'Municipality',
              ulbType:'500K-1M',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
             // lineItem: 'Town Panchayat',
              ulbType:'100K-500K',
              numberOfULBs: '1500',
              ulbsWithData: '111',
              DataAvailPercentage: '30%',
              urbanPopulationPercentage: '20%'
            },
            {
              // lineItem: 'Town Panchayat',
                ulbType:'<100K',
                numberOfULBs: '1500',
                ulbsWithData: '111',
                DataAvailPercentage: '30%',
                urbanPopulationPercentage: '20%'
             },

          ]
        },

      ]
  }
    }
    if(type == 'ulbType'){
      this.popBtn = false;
      this.tableData = {
        timeStamp : 12332323434,
        success:true,
        message: 'success',
        data: [
          {
            tableId:1,
            name:"Data availability table",
            tableClass: 'revenue_tb',
            border:"1",
            bgColor: '#9D84B7',
            columns : [
              {
              key: 'ulbType',
              display_name: "ULB Type",
              },
            {
              key: 'numberOfULBs',
              display_name: "Number Of ULBs",
            },
            {
              key: 'ulbsWithData',
              display_name: "ULBs With Data",
            },
             {
                key : 'DataAvailPercentage',
                display_name: 'Data Availability Percentage'
             },
             {
              key : 'urbanPopulationPercentage',
              display_name: 'Urban population percentage'
           },

            ],
            rows: [
              {
               // lineItem: 'Average',
               ulbType:'Average',
               numberOfULBs: '12000',
               ulbsWithData: '12000',
                DataAvailPercentage: '75%',
                urbanPopulationPercentage: '50%'
              },
              {
               // lineItem: 'Municipal Corporation',
               ulbType:'Municipal Corporation',
               numberOfULBs: '501',
               ulbsWithData: '121',
                DataAvailPercentage: '50%',
                urbanPopulationPercentage: '30%'
              },
              {
               // lineItem: 'Municipality',
               ulbType:'Municipality',
               numberOfULBs: '1500',
               ulbsWithData: '111',
                DataAvailPercentage: '30%',
                urbanPopulationPercentage: '20%'
              },
              {
               // lineItem: 'Town Panchayat',
               ulbType:'Town Panchayat',
               numberOfULBs: '1200',
               ulbsWithData: '600',
                DataAvailPercentage: '10%',
                urbanPopulationPercentage: '8%'
              },

            ]
          },

        ]
      }
    }
  }
  onSelectingStateFromDropDown(state: any | null) {
    console.log("sttts", state);
    this.selectedStateCode = state?.code;
    this.selected_state = state ? state?.name : "India";
    if (this.selected_state === "India" && this.isMapOnMiniMapMode) {
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

  private selectStateOnMap(state?: IState) {
    if (this.previousStateLayer) {
      this.resetStateLayer(this.previousStateLayer);
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
    console.log(stateLayer);
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
    stateLayer.setStyle({
      fillColor: "#3E5DB1",
      fillOpacity: 1,
    });
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
  resetNationalMap(){
    this.onSelectingStateFromDropDown(null);
    let obj = {
      _id : 'null',
      name: 'India'
    }
    this.updateDropdownStateSelection(obj);

  }

}

