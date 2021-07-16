import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { pipe } from "rxjs";
import { StateDashboardService } from "../../stateforms/state-dashboard/state-dashboard.service";
import { MohuaDashboardService } from "./mohua-dashboard.service";
import { OverallListComponent } from "../../stateforms/state-dashboard/overall-list/overall-list.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";
import { PfmsListComponent } from "../../stateforms/state-dashboard/pfms-list/pfms-list.component";
import { PlansListComponent } from "../../stateforms/state-dashboard/plans-list/plans-list.component";
import { SlbListComponent } from "../../stateforms/state-dashboard/slb-list/slb-list.component";
import { UtilreportListComponent } from "../../stateforms/state-dashboard/utilreport-list/utilreport-list.component";
import { AnnualaccListComponent } from "../../stateforms/state-dashboard/annualacc-list/annualacc-list.component";
import { ReUseableHeatMapComponent } from "../../../shared/components/re-useable-heat-map/re-useable-heat-map.component";
import * as $ from "jquery";
import { constants } from "buffer";
import * as JSC from "jscharting";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { FeatureCollection, Geometry } from "geojson";
import * as L from "leaflet";
import { ILeafletStateClickEvent } from "src/app/shared/components/re-useable-heat-map/models/leafletStateClickEvent";
import { IStateULBCovered } from "src/app/shared/models/stateUlbConvered";
import { ULBWithMapData } from "src/app/shared/models/ulbsForMapResponse";
import { CommonService } from "src/app/shared/services/common.service";
import { GeographicalService } from "src/app/shared/services/geographical/geographical.service";
import { MapUtil } from "src/app/util/map/mapUtil";
import { IMapCreationConfig } from "src/app/util/map/models/mapCreationConfig";
import { UserUtility } from "src/app/util/user/user";

@Component({
  selector: "app-mohua-dashboard",
  templateUrl: "./mohua-dashboard.component.html",
  styleUrls: ["./mohua-dashboard.component.scss"],
})
export class MohuaDashboardComponent implements OnInit {
  constructor(
    public stateDashboardService: StateDashboardService,
    public dialog: MatDialog,
    protected commonService: CommonService,
    protected _snackbar: MatSnackBar,
    protected geoService: GeographicalService,
    protected _activateRoute: ActivatedRoute,
    public mohuaDashboardService: MohuaDashboardService
  ) {}
  @ViewChild("stateTable") stateTable;

  ngOnInit(): void {
    this.geoService.loadConvertedIndiaGeoData().subscribe((data) => {
      try {
        this.mapGeoData = data;
        setTimeout(async () => {
          await this.getTableData();

          this.createNationalLevelMap(data, "finance-law-map");
          // this.loadSlides();
        }, 1);
      } catch (error) {
        console.error(error);
      }
    });
    this.commonService.states.subscribe((res) => {
      this.states = res;
    });
    this.commonService.loadStates(true);
    this.onLoad();
  }
  mapGeoData: FeatureCollection<
    Geometry,
    {
      [name: string]: any;
    }
  >;
  states: any;
  list = [];
  selectedStates = ["criteria"];
  stateName = "";
  stateSelected;
  previousStateLayer;
  stateColors = {
    unselected: "#E5E5E5",
    selected: "#059b9a",
  };
  nationalLevelMap: L.Map;
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
  stateDatasForMapColoring = [];
  statesLayer: L.GeoJSON<any>;
  tabelData;
  currentSort = 1;

  takeStateAction = "false";
  loading = false;
  filterObject;
  // fcFormListSubscription: Subscription;
  nodataFound = false;
  errMessage = "";
  values = {
    overall_approvedByState: 0,
    overall_pendingForSubmission: 0,
    overall_underReviewByState: 0,
    pfms_notRegistered: 0,
    pfms_pendingResponse: 0,
    pfms_registered: 0,
    slb_approvedbyState: 0,
    slb_completedAndPendingSubmission: 0,
    slb_pendingCompletion: 0,
    slb_underStateReview: 0,
    util_approvedbyState: 0,
    util_completedAndPendingSubmission: 0,
    util_pendingCompletion: 0,
    util_underStateReview: 0,
    annualAcc_audited: 0,
    annualAcc_provisional: 0,
    plans_approvedbyState: 0,
    plans_completedAndPendingSubmission: 0,
    plans_pendingCompletion: 0,
    plans_underStateReview: 0,
  };
  // errMessage = "";
  totalUlbs = 0;
  nonMillionCities = 0;
  millionPlusUAs = 0;
  UlbInMillionPlusUA = 0;
  formDataApiRes;
  selectedLevel;
  selectUa = "";
  plansDataApiRes;
  rejuvenationPlans;
  plans = 0;
  ulbs = 0;
  width1 = "";
  width2 = "";
  width3 = "";
  width4 = "";
  UANames = [];
  maindonughtChart;
  pfmsdonughtChart;
  utilreportDonughtChart;
  slbdonughtChart;
  piechart;

  onLoad() {
    this.getCardData();
    this.getFormData();
    this.getPlansData();
    this.mainDonughtChart();
    this.gaugeChart1();
    this.constChart();
    this.constChart1();
    this.gaugeChart2();
    this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    this.slbDonughtChart();
    this.pieChart();
  }
  selected() {
    // this.maindonughtChart?.destroy();
    // this.utilreportDonughtChart?.destroy();
    // this.slbdonughtChart?.destroy();
    // this.pfmsdonughtChart?.destroy();
    // this.piechart?.destroy();

    console.log(this.formDataApiRes);
    let data = this.formDataApiRes;

    this.mapValues(data[0]);
    this.updateCharts();
  }
  getTableData() {
    return new Promise((resolve, rej) => {
      this.mohuaDashboardService.getTableData("").subscribe(
        (res) => {
          this.tabelData = res["data"];
          this.stateDatasForMapColoring = res["data"];
          console.log(this.tabelData);
          resolve("success");
        },
        (err) => {}
      );
    });
  }
  calculateVH(vh: number) {
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (vh * h) / 100;
  }

  calculateMapZoomLevel() {
    let zoom: number;
    const userUtil = new UserUtility();
    if (userUtil.isUserOnMobile()) {
      zoom = 3.8 + (window.devicePixelRatio - 2) / 10;
      if (window.innerHeight < 600) zoom = 3.6;
      const valueOf1vh = this.calculateVH(1);
      if (valueOf1vh < 5) zoom = 3;
      else if (valueOf1vh < 7) zoom = zoom - 0.2;
      return zoom;
    }

    const defaultZoomLevel =
      (Math.max(document.documentElement.clientWidth) - 1366) / 1366 + 4;
    try {
      zoom = localStorage.getItem("mapZoomLevel")
        ? +localStorage.getItem("mapZoomLevel")
        : defaultZoomLevel;
    } catch (error) {
      zoom = defaultZoomLevel;
    }

    return zoom;
  }

  addIdInGeoData(data) {
    return new Promise((res, rej) => {});
  }

  async createNationalLevelMap(
    geoData: FeatureCollection<
      Geometry,
      {
        [name: string]: any;
      }
    >,
    containerId: string
  ) {
    const zoom = this.calculateMapZoomLevel();
    // geoData = await this.addIdInGeoData(geoData);
    const configuration = {
      containerId,
      geoData,
      options: {
        zoom,
        minZoom: zoom,
        attributionControl: false,
        doubleClickZoom: false,
        dragging: false,
        tap: false,
      },
    };
    let map;

    ({ stateLayers: this.statesLayer, map } =
      MapUtil.createDefaultNationalMap(configuration));

    this.nationalLevelMap = map;
    this.createLegendsForNationalLevelMap();

    this.statesLayer.eachLayer((layer) => {
      const stateCode = MapUtil.getStateCode(layer);

      if (!stateCode) {
        return;
      }

      const stateFound = this.stateDatasForMapColoring.find(
        (state) => state.code === stateCode
      );

      if (!stateFound) {
        return;
      }

      const color = this.getColorBasedOnPercentage(
        stateFound
          ? parseInt(
              ((stateFound.withState / stateFound.totalULBs) * 100).toFixed(2)
            )
          : 0
      );
      MapUtil.colorStateLayer(layer, color);
      (layer as any).bringToBack();
      (layer as any).on({
        mouseover: () => {
          this.createTooltip(layer);
        },
        click: (args: ILeafletStateClickEvent) => {
          this.onClickingStateOnMap(args);
        },
      });
    });
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
      `<span style="width: 100%; display: block;" class="text-center">% of Data Availability <br> on Cityfinance.in</span>`,
    ];
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend ml-0");
      div.id = "legendContainer";
      div.style.width = "100%";
      arr.forEach((value) => {
        labels.push(
          `<span style="display: flex; align-items: center; width: 45%;margin: 1% auto; "><i class="circle" style="background: ${value.color}; padding:10%; display: inline-block; margin-right: 12%;"> </i> ${value.text}</span>`
        );
      });
      div.innerHTML = labels.join(``);
      return div;
    };

    legend.addTo(this.nationalLevelMap);
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

  private createTooltip(layer: L.Layer) {
    const stateCode = MapUtil.getStateCode(layer);
    const stateFound = this.states.find((state) => state.code === stateCode);
    if (!stateFound) {
      return;
    }

    const option: L.TooltipOptions = {
      sticky: true,
      offset: new L.Point(15, -8),
      zoomAnimation: true,
    };

    layer.bindTooltip("<b>" + stateFound.name + "</b>", option);
    layer.toggleTooltip();
  }

  onClickingStateOnMap(stateLayer: ILeafletStateClickEvent) {
    console.log("stateLayer", stateLayer);
    const stateCode = MapUtil.getStateCode(stateLayer);
    console.log(this.stateTable.nativeElement.rows);
    for (
      let index = 0;
      index < this.stateTable.nativeElement.rows.length;
      index++
    ) {
      const element = this.stateTable.nativeElement.rows[index];
      let tableState = element.children[7]?.textContent.toLowerCase().trim();
      let mapState = stateCode.toLowerCase().trim();
      if (tableState == mapState) {
        this.stateSelected = mapState;
        element.focus();
        break;
      }
    }
    this.selectStateOnMap(stateCode);
  }

  private resetStateLayer(layer) {
    layer.setStyle({
      color: this.defaultStateLayerColorOption.color,
      weight: this.defaultStateLayerColorOption.weight,
    });
    layer.closeTooltip();
  }

  private selectStateOnMap(code) {
    if (this.previousStateLayer) {
      this.resetStateLayer(this.previousStateLayer);
      this.previousStateLayer = null;
    }
    if (!code) {
      return;
    }

    this.statesLayer.eachLayer((layer) => {
      const layerCode = MapUtil.getStateCode(layer);
      if (layerCode !== code) {
        return;
      }
      this.higlightClickedState(layer);
      this.previousStateLayer = layer;
    });
  }

  private higlightClickedState(stateLayer) {
    stateLayer.setStyle(this.StyleForSelectedState);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      stateLayer.bringToFront();
    }
  }

  onClickingStateTab(event) {
    const stateCode = event.target.value;
    for (
      let index = 0;
      index < this.stateTable.nativeElement.rows.length;
      index++
    ) {
      const element = this.stateTable.nativeElement.rows[index];
      let tableState = element.children[7]?.textContent.toLowerCase().trim();
      let mapState = stateCode.toLowerCase().trim();
      if (tableState == mapState) {
        this.stateSelected = mapState;
        element.focus();
        break;
      }
    }
    this.selectStateOnMap(stateCode);
  }

  openDialogAnnual() {
    const dialogRef = this.dialog.open(AnnualaccListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSlb() {
    const dialogRef = this.dialog.open(SlbListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPlans() {
    const dialogRef = this.dialog.open(PlansListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPfms() {
    const dialogRef = this.dialog.open(PfmsListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogUtil() {
    const dialogRef = this.dialog.open(UtilreportListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(OverallListComponent, {
      height: "1000px",
      width: "1600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getPlansData() {
    this.stateDashboardService.getPlansData("").subscribe(
      (res) => {
        console.log(res);
        this.plansDataApiRes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  pfmsDonughtChart() {
    const data = {
      labels: ["Registered", "Not Registered", "Pending Response"],
    };
    const canvas = <HTMLCanvasElement>document.getElementById("pfms");
    const ctx = canvas.getContext("2d");
    this.pfmsdonughtChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: "left",
          align: "start",
          labels: {
            fontSize: 13,
            fontColor: "black",
            usePointStyle: true,
            padding: 25,
          },
        },
      },
    });
  }

  utilReportDonughtChart() {
    const data = {
      labels: [
        "103 - Pending Completion",
        "213 - Completed and Pending Submission",
        "213 - Under State Review",
        "213 - Approved by State",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            this.values.util_pendingCompletion,
            this.values.util_completedAndPendingSubmission,
            this.values.util_underStateReview,
            this.values.util_approvedbyState,
          ],
          backgroundColor: ["#F95151", "#FF9E30", "#DBDBDB", "#67DF7B"],
          hoverOffset: 4,
        },
      ],
    };
    const canvas = <HTMLCanvasElement>document.getElementById("utilReport");
    const ctx = canvas.getContext("2d");
    this.utilreportDonughtChart = new Chart(ctx, {
      type: "doughnut",
      data: data,

      options: {
        maintainAspectRatio: false,
        legend: {
          position: "left",
          align: "start",
          labels: {
            fontSize: 13,
            fontColor: "black",
            usePointStyle: true,
            padding: 22,
          },
        },
      },
    });
  }
  slbDonughtChart() {
    const data = {
      labels: [
        "103 - Pending Completion",
        "213 - Completed and Pending Submission",
        "213 - Under State Review",
        "213 - Approved by State",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            this.values.slb_pendingCompletion,
            this.values.slb_completedAndPendingSubmission,
            this.values.slb_underStateReview,
            this.values.slb_approvedbyState,
          ],
          backgroundColor: ["#F95151", "#FF9E30", "#DBDBDB", "#67DF7B"],
          hoverOffset: 4,
        },
      ],
    };
    const canvas = <HTMLCanvasElement>document.getElementById("slb");
    const ctx = canvas.getContext("2d");
    this.slbdonughtChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: "left",
          align: "start",
          labels: {
            fontSize: 13,
            fontColor: "black",
            usePointStyle: true,
            padding: 22,
          },
        },
      },
    });
  }
  gaugeChart1() {
    this.values.annualAcc_provisional = 28;
    let mainColor = "",
      complimentColor = "",
      borderColor = "";
    if (this.values.annualAcc_provisional < 25) {
      mainColor = "#FF7154";
      complimentColor = "#ffcabf";
      borderColor = "#FF7154";
    } else {
      mainColor = "#09C266";
      complimentColor = "#C6FBE0";
      borderColor = "#09C266";
    }
    const canvas = <HTMLCanvasElement>document.getElementById("chartDiv");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [
              this.values.annualAcc_provisional,
              100 - this.values.annualAcc_provisional,
            ],
            backgroundColor: [mainColor, complimentColor],
            borderColor: [borderColor],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 68,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  constChart() {
    const canvas = <HTMLCanvasElement>document.getElementById("meter");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [25, 75],
            backgroundColor: ["#FF7154", "#67DF7B"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 94,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  constChart1() {
    const canvas = <HTMLCanvasElement>document.getElementById("meter1");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [25, 75],
            backgroundColor: ["#FF7154", "#67DF7B"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 94,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  gaugeChart2() {
    let mainColor = "",
      complimentColor = "",
      borderColor = "";
    this.values.annualAcc_audited = 20;
    if (this.values.annualAcc_audited < 25) {
      mainColor = "#FF7154";
      complimentColor = "#ffcabf";
      borderColor = "#FF7154";
    } else {
      mainColor = "#09C266";
      complimentColor = "#C6FBE0";
      borderColor = "#09C266";
    }
    const canvas = <HTMLCanvasElement>document.getElementById("chartDiv2");
    const ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [
              this.values.annualAcc_audited,
              100 - this.values.annualAcc_audited,
            ],
            backgroundColor: [mainColor, complimentColor],
            borderColor: [borderColor],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 68,

        onClick(...args) {
          console.log(args);
        },
      },
    });
  }
  mainDonughtChart() {
    const data = {
      labels: [
        "Pending for Submission",
        "Pending Review by State",
        "Approved by State",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            this.values.overall_pendingForSubmission,
            this.values.overall_underReviewByState,
            this.values.overall_approvedByState,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const canvas = <HTMLCanvasElement>document.getElementById("myChart");
    const ctx = canvas.getContext("2d");
    this.maindonughtChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            fontSize: 13,
            fontColor: "white",
            usePointStyle: true,
            padding: 30,
          },
        },
      },
    });
  }
  pieChart() {
    const data = {
      labels: [
        "103 - Pending Completion",
        "213 - Completed and Pending Submission",
        "76 - Under State Review",
        "213 - Approved by State",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            this.values.plans_pendingCompletion,
            this.values.plans_completedAndPendingSubmission,
            this.values.plans_underStateReview,
            this.values.plans_approvedbyState,
          ],
          backgroundColor: ["#F95151", "#FF9E30", "#DBDBDB", "#67DF7B"],
          hoverOffset: 4,
        },
      ],
    };

    const canvas = <HTMLCanvasElement>document.getElementById("pfm");
    const ctx = canvas.getContext("2d");
    this.piechart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "left",
          align: "start",
          labels: {
            fontSize: 13,
            fontColor: "black",
            usePointStyle: true,

            padding: 22,
          },
        },
      },
    });
  }
  submitted_totalUlbs = 0;
  submitted_nonMillion = 0;
  nonMillion = 0;
  submitted_millionPlusUA = 0;
  millionPlusUA = 0;
  submitted_ulbsInMillionPlusUlbs = 0;
  ulbsInMillionPlusUlbs = 0;
  getCardData() {
    this.mohuaDashboardService.getCardData("").subscribe(
      (res) => {
        console.log(res["data"]);
        let data = res["data"];

        this.submitted_totalUlbs = data["submitted_totalUlbs"];
        this.totalUlbs = data["totalUlbs"];
        this.submitted_nonMillion = data["submitted_nonMillion"];
        this.nonMillion = data["nonMillion"];
        this.submitted_millionPlusUA = data["submitted_millionPlusUA"];
        this.millionPlusUA = data["millionPlusUA"];
        this.submitted_ulbsInMillionPlusUlbs =
          data["submitted_ulbsInMillionPlusUlbs"];
        this.ulbsInMillionPlusUlbs = data["ulbsInMillionPlusUlbs"];

        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name);
          newList[element._id] = element;
        });
        console.log(this.UANames);
        sessionStorage.setItem("UasList", JSON.stringify(newList));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFormData() {
    this.mohuaDashboardService.getFormData("").subscribe(
      (res) => {
        console.log(res);
        this.formDataApiRes = res["data"];
        this.selected();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCharts() {
    this.mainDonughtChart();
    this.gaugeChart1();
    this.gaugeChart2();
    this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    this.slbDonughtChart();
    this.pieChart();
  }

  selectedUA() {
    console.log("selectedUA", this.selectUa);
    this.ulbs = 0;
    this.plans = 0;
    this.plansDataApiRes["data"].forEach((element) => {
      if (element.UA === this.selectUa) {
        this.ulbs = element.ulbs;
        this.plans = element.ulbCount;
        this.rejuvenationPlans = element.submissionOfPlans;
      }
    });
    this.calculateValue();
  }

  calculateValue() {
    if (this.plans <= 25) {
      this.width1 = String(33 - (16 / 12.5) * this.plans) + "px";
      this.width2 = "33px";
      this.width3 = "33px";
      this.width4 = "33px";
    } else if (this.plans <= 50 && this.plans > 25) {
      this.width1 = "0px";
      this.width2 = String(33 - (16 / 12.5) * (this.plans - 25)) + "px";
      this.width3 = "33px";
      this.width4 = "33px";
    } else if (this.plans <= 75 && this.plans > 50) {
      this.width1 = "0px";
      this.width2 = "0px";
      this.width3 = String(33 - (16 / 12.5) * (this.plans - 50)) + "px";
      this.width4 = "33px";
    } else if (this.plans <= 100 && this.plans > 75) {
      this.width1 = "0px";
      this.width2 = "0px";
      this.width3 = "0px";
      this.width4 = String(33 - (16 / 12.5) * (this.plans - 75)) + "px";
    }
  }
  mapValues(data) {
    (this.values.overall_approvedByState =
      data["overallFormStatus"]["approvedByState"]),
      (this.values.overall_pendingForSubmission =
        data["overallFormStatus"]["pendingForSubmission"]),
      (this.values.overall_underReviewByState =
        data["overallFormStatus"]["underReviewByState"]),
      (this.values.pfms_notRegistered = data["pfms"]["notRegistered"]),
      (this.values.pfms_pendingResponse = data["pfms"]["pendingResponse"]),
      (this.values.pfms_registered = data["pfms"]["registered"]),
      (this.values.slb_approvedbyState = data["slb"]["approvedbyState"]),
      (this.values.slb_completedAndPendingSubmission =
        data["slb"]["completedAndPendingSubmission"]),
      (this.values.slb_pendingCompletion = data["slb"]["pendingCompletion"]),
      (this.values.slb_underStateReview = data["slb"]["underStateReview"]),
      (this.values.util_approvedbyState =
        data["utilReport"]["approvedbyState"]),
      (this.values.util_completedAndPendingSubmission =
        data["utilReport"]["completedAndPendingSubmission"]),
      (this.values.util_pendingCompletion =
        data["utilReport"]["pendingCompletion"]),
      (this.values.util_underStateReview =
        data["utilReport"]["underStateReview"]),
      (this.values.plans_approvedbyState = data["plans"]["approvedbyState"]),
      (this.values.plans_completedAndPendingSubmission =
        data["plans"]["completedAndPendingSubmission"]),
      (this.values.plans_pendingCompletion =
        data["plans"]["pendingCompletion"]),
      (this.values.plans_underStateReview = data["plans"]["underStateReview"]),
      (this.values.annualAcc_audited = data["annualAccounts"]["audited"]),
      (this.values.annualAcc_provisional =
        data["annualAccounts"]["provisional"]);
  }
}
