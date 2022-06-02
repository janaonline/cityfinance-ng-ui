import {
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
import { NewDashboardService } from "../new-dashboard.service";
import { data } from "jquery";
import { Observable } from "rxjs";
import { StateFilterDataService } from "src/app/shared/components/state-filter-data/state-filter-data.service";
import { SlbDashboardService } from "./slb-dashboard.service";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { NationalMapSectionService } from "../national/national-map-section/national-map-section.service";
import { AuthService } from "src/app/auth/auth.service";
// const districtJson = require("../../../../assets/jsonFile/state_boundries.json");
const districtJson = require("../../../../assets/jsonFile/state_boundries.json");

@Component({
  selector: "app-slb-dashboard",
  templateUrl: "./slb-dashboard.component.html",
  styleUrls: ["./slb-dashboard.component.scss"],
})
export class SlbDashboardComponent
  extends NationalHeatMapComponent
  implements OnInit, OnDestroy
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
    private newDashboardService: NewDashboardService,
    private stateFilterDataService: StateFilterDataService,
    private slbDashboardService: SlbDashboardService,
    private _loaderService: GlobalLoaderService,
    private nationalMapService: NationalMapSectionService,
    private authService: AuthService
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
  // frontPanelData = data2;
  frontPanelData = {
    showMap: false,
    name: "Service Level Benchmark Performance",
    desc: "The PAS Project's aim is to create a performance measurement and monitoring system for urban water and sanitation services, which can be used for policy formulation and resource allocation at state and local level. PAS measures performance of each sector (water, sanitation, solid waste and storm water drainage) across five themes and 32 key performance indicators. These indicators are monitored by state and local governments. Around 100 ‘drill-down’ indicators are also developed for better understanding of key issues in service delivery and preparation of performance improvement plans.",
    dataIndicators: [
      {
        value: "",
        title: "ULBs With Financial Data",
        key: "coveredUlbCount",
      },
      {
        value: "",
        title: "Financial Statements ",
        // key: "Municipal_Corporation",
        key: "financialStatements",
      },
      {
        value: "",
        title: "ULBs Credit Rating Reports",
        key: "ULBCreditRating",
      },
      {
        value: "",
        title: "ULBs With Investment Grade Rating",
        key: "UlbsWithBBB",
      },
      {
        value: " ",
        title: "ULBs With Rating A & Above",
        key: "ulbsWithA",
      },
      {
        value: "",
        title: "",
        key: "totalMunicipalBonds",
      },
    ],
    footer: `Data shown is from audited/provisional financial statements for FY 20-21
    and data was last updated on 21st August 2021`,
  };
  revenueData = [];
  tabAboutData: any;
  tabId: any="61e150439ed0e8575c881028";
  component_name;
  tabIndex;

  nationalDataAvailability: Number;
  stateId: any;
  yearValue: any = "2020-21";
  type: String = "national";
  cardInput = {
    ifPeople: false,
    state: "",
    type: "national",
    year: this.yearValue,
  };

  // creditRating: { [stateName: string]: number; total?: number } = {};

  creditRatingList: any[];
  absCreditInfo: any = {
    title: "",
    ulbs: 0,
    creditRatingUlbs: 0,
    ratings: {
      "AAA+": 0,
      AAA: 0,
      "AAA-": 0,
      "AA+": 0,
      AA: 0,
      "AA-": 0,
      "A+": 0,
      A: 0,
      "A-": 0,
      "BBB+": 0,
      BBB: 0,
      "BBB-": 0,
      BB: 0,
      "BB+": 0,
      "BB-": 0,
      "B+": 0,
      B: 0,
      "B-": 0,
      "C+": 0,
      C: 0,
      "C-": 0,
      "D+": 0,
      D: 0,
      "D-": 0,
    },
  };

  // Including A
  creditRatingAboveA;

  // Including BBB-
  creditRatingAboveBBB_Minus;

  cords: any;
  checkStickyValue: boolean = false;
  financialYearTexts: {
    min: string;
    max: string;
  };

  isBondIssueAmountInProgress = false;

  bondIssueAmount: number = 0;
  selected_state = "India";
  selectedState: IState;
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
      name: "0% ",
      color: "#A6B9B4",
    },
    {
      name: "  25%",
      color: "#FCDA4A",
    },
    {
      name: "60%",
      color: "#4A6CCB",
    },
    {
      name: "Above 80%",
      color: "#12A6DD",
    },
  ];
  popBtn = true;
  tableData: any = [];
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

  yearList = [
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
  ];
  selectedYear: any;
  isStateServiceLabel: boolean = true;
  allDashboardTabList: any;
  slbDashboardData: any;
  selectedSlbSubTab: any;
  // stateId: string = "";
  cityId: string = "";
  cityName: string = "";
  isStateSlbActive: boolean = false;
  isCitySlbActive: boolean = false;
  nationalFilter = new FormControl();
  filteredOptions: Observable<any[]>;
  showLoader: boolean = true;
  colorCoding: any = [];

  stateUlbData = JSON.parse(localStorage.getItem("ulbList"));
  showDataAvailable: boolean = true;
  ngOnInit(): void {
    this.dashboardLastUpdatedYear();
    this.getNationalLevelMapData("2020-21");
    this.yearList = this.yearList.reverse();
    this.selectedYear = this.yearList[1];
    this.frontPanelData['year'] = this.selectedYear;
    console.log('selectedYear',this.frontPanelData)

    this.getYears();
    this.dashboardDataCall();
    this.loadData();
    // this.subFilterFn("popCat");
    this.getTableData(this.tableType);
    this.getIndicatorData(this.stateId);
    this.fetchMinMaxFinancialYears();
    this.fetchCreditRatingTotalCount();
    this.fetchBondIssueAmout("");

    this.nationalFilter.valueChanges.subscribe((value) => {
      if (value?.length >= 1) {
        this._commonService
          .postGlobalSearchData(value, "ulb", this.stateId)
          .subscribe((res: any) => {
            console.log(res?.data);
            let emptyArr: any = [];
            this.filteredOptions = emptyArr;
            if (res?.data.length > 0) {
              this.filteredOptions = res?.data;
              //this.noDataFound = false;
            } else {
              let emptyArr: any = [];
              this.filteredOptions = emptyArr;
              // this.noDataFound = true;
              console.log("no data found");
            }
          });
      } else {
        return null;
      }
    });
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
  private fetchCreditRatingTotalCount() {
    this.assetService
      .fetchCreditRatingReport()
      .subscribe((res) => this.computeStatesTotalRatings(res));
  }
  private computeStatesTotalRatings(res: ICreditRatingData[]) {
    this.creditRatingList = res;

    const computedData = { total: 0, India: 0 };
    res.forEach((data) => {
      if (computedData[data.state] || computedData[data.state] === 0) {
        computedData[data.state] += 1;
      } else {
        computedData[data.state] = 1;
      }
      computedData.total += 1;
      computedData["India"] += 1;
    });

    this.creditRating = computedData;
    this.frontPanelData.dataIndicators.map((elem) => {
      if (elem.key == "ULBCreditRating") {
        elem.value = computedData?.total.toString();
      }
    });
    this.showCreditInfoByState();
  }
  dashboardLastUpdatedYear() {
    console.log('dashboardLastUpdatedYear called')
    this.authService.getLastUpdated().subscribe((res) => {
      if (res && res['success']) {
        Object.assign(this.frontPanelData, {
          year: res["year"],
          date: res["data"],
        });
        this._commonService.lastUpdatedYear.next(res["year"]);
      }
    });
  }
  showCreditInfoByState() {
    const ulbList = [];

    for (let i = 0; i < this.creditRatingList?.length; i++) {
      const ulb = this.creditRatingList[i];
      ulbList.push(ulb["ulb"]);
      const rating = ulb.creditrating.trim();
      this.calculateRatings(this.absCreditInfo, rating);
    }

    this.creditRatingAboveA =
      this.absCreditInfo["ratings"]["A"] +
      this.absCreditInfo["ratings"]["A+"] +
      this.absCreditInfo["ratings"]["AA"] +
      this.absCreditInfo["ratings"]["AA+"] +
      this.absCreditInfo["ratings"]["AA-"] +
      this.absCreditInfo["ratings"]["AAA"] +
      this.absCreditInfo["ratings"]["AAA+"] +
      this.absCreditInfo["ratings"]["AAA-"];

    this.creditRatingAboveBBB_Minus =
      this.creditRatingAboveA +
      this.absCreditInfo["ratings"]["A-"] +
      this.absCreditInfo["ratings"]["BBB"] +
      this.absCreditInfo["ratings"]["BBB+"] +
      this.absCreditInfo["ratings"]["BBB-"];

    this.absCreditInfo["title"] = "India";
    this.absCreditInfo["ulbs"] = ulbList;

    console.log("creditRating==>", this.creditRatingAboveA, this.creditRatingAboveBBB_Minus)

    this.frontPanelData.dataIndicators.map((elem) => {
      if (elem.key == "ulbsWithA") {
        elem.value = this.creditRatingAboveA;
      } else if (elem.key == "UlbsWithBBB") {
        elem.value = this.creditRatingAboveBBB_Minus;
      }
    });
  }
  calculateRatings(dataObject, ratingValue) {
    if (!dataObject["ratings"][ratingValue]) {
      dataObject["ratings"][ratingValue] = 0;
    }
    dataObject["ratings"][ratingValue] = dataObject["ratings"][ratingValue] + 1;
    dataObject["creditRatingUlbs"] = dataObject["creditRatingUlbs"] + 1;
  }
  getIndicatorData(state) {
    this._commonService.fetchDataForHomepageMap(state).subscribe((res: any) => {
      this.frontPanelData.dataIndicators.map((elem) => {
        switch (elem.key) {
          case "coveredUlbCount":
            elem.value = this._commonService.formatNumber(res?.coveredUlbCount);
            break;
          case "financialStatements":
            elem.value = this._commonService.formatNumber(
              res?.financialStatements
            );
            break;
          case "totalMunicipalBonds":
            elem.value = this._commonService.formatNumber(
              res?.totalMunicipalBonds
            );
            break;
        }
        return elem;
      });
    });
  }
  private fetchMinMaxFinancialYears() {
    this._commonService.getFinancialYearBasedOnData().subscribe((res) => {
      this.financialYearTexts = {
        min: res.data[0],
        max: res.data[res.data.length - 1].slice(2),
      };
      console.log('financialYearTexts', this.financialYearTexts)

      this.frontPanelData.dataIndicators.map((elem) => {
        if (elem?.key == "financialStatements") {
          elem.title = "Financial Statements ";
          elem.title =
            elem.title +
            "( " +
            this.financialYearTexts.min +
            " to " +
            this.financialYearTexts.max +
            " )";
        }
      });

      // console.log(this.financialYearTexts);
    });
  }
  private fetchBondIssueAmout(stateId?: string) {
    this.isBondIssueAmountInProgress = true;
    this._commonService.getBondIssuerItemAmount(stateId).subscribe((res) => {
      try {
        this.bondIssueAmount = Math.round(res["data"][0]["totalAmount"]);
      } catch (error) {
        this.bondIssueAmount = 0;
      }
      console.log("this.bondIssueAmount",this.bondIssueAmount)
      this.isBondIssueAmountInProgress = false;
      this.frontPanelData.dataIndicators.map((elem) => {
        if (elem?.key == "totalMunicipalBonds") {
          elem.title = `Municipal Bond Issuances Of Rs. ${
            this.bondIssueAmount || 0
          }  Cr With Details`;
        }
      });
    });
  }
  getNationalLevelMapData(year) {
    this.nationalMapService.getNationalMapData(year).subscribe((res: any) => {
      this.colorCoding = res?.data;

      this.initializeNationalLevelMapLayer(this.stateLayers);
      console.log("colorCoding", this.colorCoding);
      if (res) {
        this.createNationalLevelMap(
          this.StatesJSONForMapCreation,
          "mapidd" + Math.random()
        );
        // this.createNationalLevelMap(
        //   this.StatesJSONForMapCreation,
        //   "mapidd" + this.randomNumber
        // );
        // this.initializeNationalLevelMapLayer(this.StatesJSONForMapCreation);
      }
    });
  }

  getColor(d) {
    let color;
    if (d > 80) {
      color = "#12a6dd";
    } else if (d > 60 && d < 80) {
      color = "#4a6ccb";
    } else if (d > 25 && d < 60) {
      color = "#fcda4a";
    } else if (d > 0 && d < 25) {
      color = "#fc5e03";
    } else if (d == 0) {
      color = "#a6b9b4";
    }
    return color;
  }

  createLegends() {
    const arr = [
      { color: "#12a6dd", text: "81%-100%" },
      { color: "#4a6ccb", text: "61%-80%" },
      { color: "#fcda4a", text: "26%-60%" },
      { color: "#fc5e03", text: "1%-25%" },
      { color: "#a6b9b4", text: "0%" },
    ];
    const legend = new L.Control({ position: "bottomright" });
    const labels = [
      `<span style="width: 100%; display: block; font-size: 12px" class="text-center">% of Data Availability on Cityfinance.in</span>`,
    ];
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.id = "legendContainer";
      // div.style.width = "100%";
      arr.forEach((value) => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 45%;margin: 1% auto; font-size: 12px; "><i class="circle" style="background: ${value.color}; padding:6px; display: inline-block; margin-right: 12% ;"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
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

    console.log("nationalLevelMap", this.nationalLevelMap);

    this.createControls(this.nationalLevelMap);

    this.initializeNationalLevelMapLayer(this.stateLayers);

    this.createLegends();

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

    // this.stateLayers.eachLayer((layer: any) => {
    //   console.log("layers", layer);
    //   const stateCode = MapUtil.getStateCode(layer);
    //   if (!stateCode) {
    //     return;
    //   }

    //   const stateFound = this.stateData?.find(
    //     (state) => state?.code === stateCode
    //   );
    //   const count = stateFound ? stateFound.coveredUlbPercentage : 0;

    //   console.log("colorCoding", this.colorCoding);

    //   let color;
    //   let stateCodes = this.colorCoding.map((el) => el.code);
    //   if (this.colorCoding && stateFound) {
    //     this.colorCoding.forEach((elem) => {
    //       if (elem?.code == stateFound?.code) {
    //         color = this.getColor(elem?.percentage);
    //       } else if (
    //         !stateCodes.includes(layer?.feature?.properties?.ST_CODE)
    //       ) {
    //         color = this.getColor(0);
    //       }
    //       MapUtil.colorStateLayer(layer, color);
    //     });
    //   }
    // });

    /**
     * @description If the map is already on mini mode, then it means the state is already selected, and its state map
     * is in the view.
     */

    if (layerToAutoSelect && !this.isMapOnMiniMapMode) {
      this.onStateLayerClick(layerToAutoSelect);
    }
    // this.hideMapLegends();

    if (this.isMapOnMiniMapMode) {
      // this.hideMapLegends();
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
    // const height = this.userUtil.isUserOnMobile() ? `100%` : "33rem";
    const height = this.userUtil.isUserOnMobile() ? `100%` : "inherit";
    console.log("selectedStateCode", this.selectedStateCode);
    console.log("currentStateInView", this.currentStateInView);
    // [ngStyle]="{ visibility: selectedStateCode ? 'visible' : 'hidden' }"
    // [ngStyle]="{ visibility: currentStateInView ? 'visible' : 'hidden' }"
    document.getElementById("districtMapContainer").innerHTML = `
      <div
    id="districtMapId"
    class="col-sm-12"
    style="background-color: #F8F9FF; background-image: url('../../../../assets/Layer\ 1.png');
    display: inline-block; width: 100%;height: ${height};"
  >
  </div>`;
  }

  globalOptions: any;
  clickedCityData: any;

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

      // zoom = 5.5;

      const districtMap = L.map("districtMapId", {
        scrollWheelZoom: false,
        fadeAnimation: true,
        // minZoom: zoom,
        // maxZoom: zoom + 5,
        minZoom: 6,
        maxZoom: 6,
        zoomControl: false,
        keyboard: true,
        attributionControl: true,
        doubleClickZoom: false,
        dragging: false,
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
      console.log("selectedCode", this.selectedStateCode);

      this.globalOptions = options.dataPoints;

      options.dataPoints.forEach((dataPoint: any) => {
        /* Creating a popup without a close button.
         * available option are {closeOnClick: false, closeButton: true, autoClose: true }
         * if you know other option too please add into this object for future reference
         */
        var popup = L.popup({ closeButton: false, autoClose: true }).setContent(
          `${this._commonService.createCityTooltip(dataPoint)}`
        );
        const marker = this.createDistrictMarker({
          ...dataPoint,
          icon: this.blueIcon,
        })
          .addTo(districtMap)
          .bindPopup(popup);

        /* Adding a mouseover and mouseout event to the marker. */
        marker.on({
          mouseover: () => {
            this.mouseHoveredOnULB = dataPoint;
            marker.openPopup();
          },
        });
        marker.on({
          mouseout: () => {
            this.mouseHoveredOnULB = null;
            marker.closePopup();
          },
        });
        // marker.on("mouseover", () => (this.mouseHoveredOnULB = dataPoint));
        // marker.on("mouseout", () => (this.mouseHoveredOnULB = null));
        marker.on("click", (values) => {
          let city;
          if (values["latlng"]) {
            this.clickedCityData = this.stateUlbData.data[
              this.selectedStateCode
            ].ulbs.find(
              (value) =>
                +value.location.lat === values["latlng"].lat &&
                +value.location.lng === values["latlng"].lng
            );
            console.log("mainCityid", city, this.clickedCityData);
            // setTimeout(() => {
            this.getUlbData(this.clickedCityData, true);
            // }, 500);
          }

          // if (city) {
          //   this.selectedDistrictCode = city.code;
          //   this.selectCity(city.code, false);
          // }

          this.onDistrictMarkerClick(<L.LeafletMouseEvent>values, marker);
        });
        this.districtMarkerMap[dataPoint.code] = marker;
      });
    }, 0.5);

    // setTimeout(() => {
    //   this.createMarker(this.globalOptions);
    // }, 100);
  }

  createMarker(options) {
    console.log("499", options, this.stateId);
    // let id = this.router.url.split("=")[1];
    let newObject = options.filter((elem) => {
      if (elem._id == this.stateId) {
        console.log("final element", elem);
        return elem;
      }
    });
    let marker = this.districtMarkerMap[newObject[0].code];

    if (marker) marker.fireEvent("click");
  }

  loadData() {
    this._commonService.fetchStateList().subscribe(
      (res: any) => {
        console.log("res", res);
        // this.stateList = res;
        this.stateList = this._commonService.sortDataSource(res, "name");
      },
      (error) => {
        console.log(error);
      }
    );
    this._commonService.state_name_data.subscribe((res) => {
      console.log("sub....", res, res.name);
      this.onSelectingStateFromDropDown(res);
      this.updateDropdownStateSelection(res);
    });
  }

  tableType: any = "ulbType";
  subFilterFn(type) {
    if (type == "popCat") {
      this.popBtn = false;
      this.tableType = "population";
      this.tableData = {
        timeStamp: 12332323434,
        success: true,
        message: "success",
        data: [
          {
            tableId: 1,
            name: "Revenue Table",
            tableClass: "revenue_tb",
            border: "1",
            bgColor: "#9D84B7",
            columns: [
              {
                key: "ulbType",
                display_name: "ULB Type",
              },
              {
                key: "numberOfULBs",
                display_name: "Number Of ULBs",
              },
              {
                key: "ulbsWithData",
                display_name: "ULBs With Data",
              },
              {
                key: "DataAvailPercentage",
                display_name: "Data Availability Percentage",
              },
              {
                key: "urbanPopulationPercentage",
                display_name: "Urban population percentage",
              },
            ],
            rows: [
              {
                // lineItem: 'Average',
                ulbType: "Average",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Average',
                ulbType: "4M+",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Municipal Corporation',
                ulbType: "1M-4M",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Municipality',
                ulbType: "500K-1M",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Town Panchayat',
                ulbType: "100K-500K",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Town Panchayat',
                ulbType: "<100K",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
            ],
          },
        ],
      };
    }
    if (type == "ulbType") {
      this.tableType = "ulbType";
      this.popBtn = true;
      this.tableData = {
        timeStamp: 12332323434,
        success: true,
        message: "success",
        data: [
          {
            tableId: 1,
            name: "Data availability table",
            tableClass: "revenue_tb",
            border: "1",
            bgColor: "#9D84B7",
            columns: [
              {
                key: "ulbType",
                display_name: "ULB Type",
              },
              {
                key: "numberOfULBs",
                display_name: "Number Of ULBs",
              },
              {
                key: "ulbsWithData",
                display_name: "ULBs With Data",
              },
              {
                key: "DataAvailPercentage",
                display_name: "Data Availability Percentage",
              },
              {
                key: "urbanPopulationPercentage",
                display_name: "Urban population percentage",
              },
            ],
            rows: [
              {
                // lineItem: 'Average',
                ulbType: "Average",
                numberOfULBs: "12000",
                ulbsWithData: "12000",
                DataAvailPercentage: "75%",
                urbanPopulationPercentage: "50%",
              },
              {
                // lineItem: 'Municipal Corporation',
                ulbType: "Municipal Corporation",
                numberOfULBs: "501",
                ulbsWithData: "121",
                DataAvailPercentage: "50%",
                urbanPopulationPercentage: "30%",
              },
              {
                // lineItem: 'Municipality',
                ulbType: "Municipality",
                numberOfULBs: "1500",
                ulbsWithData: "111",
                DataAvailPercentage: "30%",
                urbanPopulationPercentage: "20%",
              },
              {
                // lineItem: 'Town Panchayat',
                ulbType: "Town Panchayat",
                numberOfULBs: "1200",
                ulbsWithData: "600",
                DataAvailPercentage: "10%",
                urbanPopulationPercentage: "8%",
              },
            ],
          },
        ],
      };
    }
    this.getTableData(this.tableType);
  }

  initializeNationalLevelMapLayer(map: L.GeoJSON<any>) {
    this.createLegends();
    map.eachLayer((layer: any) => {
      const stateCode = MapUtil.getStateCode(layer);
      if (!stateCode) {
        return;
      }

      const stateFound = this.stateData?.find(
        (state) => state?.code === stateCode
      );
      const count = stateFound ? stateFound.coveredUlbPercentage : 0;

      // this.colorCoding = [
      // const color = this.getColorBasedOnPercentage(count);
      let color;
      let stateCodes = this.colorCoding.map((el) => el.code);
      if (this.colorCoding && stateFound) {
        this.colorCoding.forEach((elem) => {
          if (elem?.code == layer?.feature?.properties?.ST_CODE) {
            color = this.getColor(elem?.percentage);
          } else if (
            !stateCodes.includes(layer?.feature?.properties?.ST_CODE)
          ) {
            color = this.getColor(0);
          }
          // return;
          MapUtil.colorStateLayer(layer, color);
        });
      }
    });
  }

  isFirstChangeCount: number = 0;
  cityData: any;
  onSelectingStateFromDropDown(state: any | null) {
    console.log("sttts", state);
    this.selectedStateCode = state?.code;
    this.selected_state = state ? state?.name : "India";
    this._commonService
      .getUlbByState(state ? state?.code : null)
      .subscribe((res) => {
        let ulbsData: any = res;
        this.cityData = ulbsData?.data?.ulbs;
        console.log("AllCity", this.cityData);
      });
    if (this.selected_state === "India" && this.isMapOnMiniMapMode) {
      const element = document.getElementById(this.createdDomMinId);
      element.style.display = "block";

      this.resetMapToNationalLevel();
      this.initializeNationalLevelMapLayer(this.stateLayers);
      // this.createNationalLevelMap(
      //   this.StatesJSONForMapCreation,
      //   "mapidd" + Math.random()
      // );
    }
    console.log("sdc 2", state, this.selectedState, this.selected_state);

    this.selectedState = state;
    if (
      this.selectedState &&
      this.selectedState?._id &&
      this.stateId != this.selectedState?._id
    ) {
      sessionStorage.setItem("row_id", this.selectedState?._id);
      this.stateId = this.selectedState?._id;
      this.isFirstChangeCount += 1;
      this.stateFilterDataService.selectedStateFromSlbDashboard.next({
        stateId: this.stateId,
        isNotFirstChange: this.isFirstChangeCount == 1 ? false : true,
      });
      !this.isStateSlbActive ? this.loadSLBComponent("state") : "";
      this.getTableData(this.tableType);
    }
    //   this.fetchDataForVisualization(state ? state._id : null);
    //   this.fetchBondIssueAmout(
    //    this.selectedState ? this.selectedState._id : null
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
    this.selectedState = state;
    this.myForm.controls.stateId.setValue(state ? [{ ...state }] : []);
  }

  resetNationalMap() {
    this.onSelectingStateFromDropDown("");
    let obj = {
      _id: "null",
      name: "India",
    };
    this.stateId = '';
    this.updateDropdownStateSelection(obj);
    this.loadSLBComponent();
  }

  dashboardDataCall() {
    this.newDashboardService
      .getDashboardTabData("619cc08a6abe7f5b80e45c67")
      .subscribe(
        (res) => {
          console.log("dashboardTabData", res);
          this.allDashboardTabList = res["data"];
          let findCityLevelSlb = this.allDashboardTabList.find(
            (tabName) => tabName.name == "Service Level Benchmark"
          );
          if (findCityLevelSlb) {
            this.slbDashboardData = findCityLevelSlb;
            this.selectedSlbSubTab = { ...this.slbDashboardData.subHeaders[0] };
          }
          console.log("allDashboardTabList", this.allDashboardTabList);
          console.log("selectedSlbSubTab", this.selectedSlbSubTab);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ulbId: any;
  getUlbData(event, fromMap?) {
    console.log("getUlbData", event);
    let filterCity = this.cityData.find((e) => {
      return e.code == event?.code;
    });
    console.log(
      "selectedCity==>",
      event,
      this.cityData,
      filterCity,
      this.districtMarkerMap
    );
    if (!fromMap) this.districtMarkerMap[filterCity.code].fireEvent("click");
    else this.nationalFilter.patchValue(event.name);
    this.ulbId = event._id;
    console.log("this.ulbId", this.ulbId);
    this.cityId = this.ulbId;
    this.loadSLBComponent("city");

    // this.createMarker(this.globalOptions);
  }

  createNationalMapJson() {
    const prmsArr = [];
    const prms1 = this._geoService.loadConvertedIndiaGeoData().toPromise();
    prmsArr.push(prms1);

    prms1.then((data) => (this.StatesJSONForMapCreation = data));

    return Promise.all(prmsArr);
  }

  getSelectedYear(selectedYear: any) {
    console.log("getSelectedYear", selectedYear);
    this.selectedYear = selectedYear ? selectedYear : this.yearList[1];
    this.getNationalLevelMapData(this.selectedYear);

    // MapUtil.destroy(this.nationalLevelMap);
    this.getTableData(this.tableType);
  }

  loadSLBComponent(slbLevelType: string = "") {
    console.log("loadSLBComponent", slbLevelType);

    switch (slbLevelType) {
      case "state":
        this.isStateSlbActive = true;
        this.resetCityLevelData();
        this.selectedSlbSubTab = { ...this.slbDashboardData.subHeaders[0] };
        break;
      case "city":
        this.isCitySlbActive = true;
        this.isStateSlbActive = false;
        break;
      default:
        this.isCitySlbActive = false;
        this.isStateSlbActive = false;
        break;
    }
    console.log(
      "isStateSlbActive",
      this.isStateSlbActive,
      "isCitySlbActive",
      this.isCitySlbActive
    );
  }

  changeTab(event, fromInner = false) {
    // console.log('changeTab', event, fromInner)
    let value = event?.target?.value ? JSON.parse(event.target.value) : event;
    // console.log("value ==>", value);
    this.cityName = value?.ulbName;
    this.selectedSlbSubTab = value;
  }

  backToPreviousMode() {
    if (this.isStateSlbActive) {
      this.stateId = "";
      this.isCitySlbActive = false;
      this.isStateSlbActive = false;
      this.resetNationalMap();
      this.getTableData(this.tableType);
    }
    if (this.isCitySlbActive) {
      this.loadSLBComponent("state");
    }
  }

  resetCityLevelData() {
    this.isCitySlbActive = false;
    let emptyArr: any = [];
    this.filteredOptions = emptyArr;
    this.nationalFilter.patchValue("");
    this.cityId = "";
    this.ulbId = "";
  }

  getYears() {
    this.stateFilterDataService.getYearListSLB().subscribe(
      (res) => {
        let yearList = res["data"];
        sessionStorage.setItem("financialYearList", JSON.stringify(yearList));
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  getTableData(type: string = "ulbType") {
    this._loaderService.showLoader();
    this.showLoader = true;
    const apiRequest: any = {
      financialYear: this.selectedYear,
      stateId: this.stateId,
      [type]: true,
    };
    this.slbDashboardService.getUlbTypeDataForTable(apiRequest).subscribe(
      (res: any) => {
        console.log('getTableData called', res)
        if (res && res.success) {
          this.showLoader = false;
          this._loaderService.stopLoader();
          this.tableData = res?.data;
        } else {
          this.showLoader = false;
          this._loaderService.stopLoader();
        }
      },
      (err) => {
        this.showLoader = false;
        this._loaderService.stopLoader();
      }
    );
  }

  ngOnDestroy(): void {
    // let mapReferenceList = ['nationalLevelMap', 'districtMap'];
    // for (const item of mapReferenceList) {
    //   MapUtil.destroy(this[item]);
    // };
  }
}
const data2 = {
  showMap: false,
  name: "Service Level Benchmark Performance",
  desc: "The PAS Project's aim is to create a performance measurement and monitoring system for urban water and sanitation services, which can be used for policy formulation and resource allocation at state and local level. PAS measures performance of each sector (water, sanitation, solid waste and storm water drainage) across five themes and 32 key performance indicators. These indicators are monitored by state and local governments. Around 100 ‘drill-down’ indicators are also developed for better understanding of key issues in service delivery and preparation of performance improvement plans.",
  dataIndicators: [
    {
      value: "",
      title: "ULBs With Financial Data",
      key: "coveredUlbCount",
    },
    {
      value: "",
      title: "Financial Statements ",
      // key: "Municipal_Corporation",
      key: "financialStatements",
    },
    {
      value: "",
      title: "ULBs Credit Rating Reports",
      key: "ULBCreditRating",
    },
    {
      value: "",
      title: "ULBs With Investment Grade Rating",
      key: "UlbsWithBBB",
    },
    {
      value: " ",
      title: "ULBs With Rating A & Above",
      key: "ulbsWithA",
    },
    {
      value: "",
      title: "",
      key: "totalMunicipalBonds",
    },
  ],
  footer: `Data shown is from audited/provisional financial statements for FY 20-21
  and data was last updated on 21st August 2021`,
  year: ''
};

