import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChildren,
} from "@angular/core";
import Chart from "chart.js";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import html2canvas from "html2canvas";
import { GlobalLoaderService } from "../../../../app/shared/services/loaders/global-loader.service";
import { BaseComponent } from "src/app/util/baseComponent";
import { ActivatedRoute, Router } from "@angular/router";
import { ShareDialogComponent } from "../share-dialog/share-dialog.component";
import { CommonService } from "../../services/common.service";
import { StateFilterDataService } from "../state-filter-data/state-filter-data.service";
import { stateDashboardSubTabsList } from "../state-filter-data/constant";

@Component({
  selector: "app-revenuechart",
  templateUrl: "./revenuechart.component.html",
  styleUrls: ["./revenuechart.component.scss"],
})
export class RevenuechartComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input()
  chartDialogues = false;
  @Input()
  chartOptions;
  @Input()
  btnBesideText = false;
  @Input()
  multiChartLabel = [];

  stateId;
  stateName;
  @Input()
  disableFirstYear = true;

  stateMap = JSON.parse(localStorage.getItem("stateIdsMap"));
  @Input() nestedChartFilterOption: any = {
    showFinancialYear: true,
    showResetButton: true,
  };
  constructor(
    public dialog: MatDialog,
    public _loaderService: GlobalLoaderService,
    public activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private commonService: CommonService,
    private stateFilterDataService: StateFilterDataService
  ) {
    super();
    this.activatedRoute.queryParams.subscribe((val) => {
      console.log("val", val);
      const { stateId } = val;
      if (stateId) {
        console.log("stid", this.stateId);
        this.stateId = stateId;
        sessionStorage.setItem("row_id", this.stateId);
      } else {
        this.stateId = sessionStorage.getItem("row_id");
      }
    });
  }

  @ViewChild("template") template;
  @Input()
  chartTitle = "ULB_NAME total revenues vs State ULB_TYPE Average";
  @Input()
  chartData: any = {
    // type: "bar",
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Municipality",
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          label: "Municipal Corporation",
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          data: [],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
        {
          label: "State Average",
          data: [],
          showLine: true,
          fill: false,
          borderColor: "red",
        },
      ],
    },
  };
  @Input()
  chartId;

  @Input()
  own;

  @Input()
  notFound;
  @Input()
  notFoundMessage = "Please try again with other filter options";
  // options in case of sactter plot
  @Input()
  scatterOption = {
    legend: {
      itemStyle: {
        cursor: "default",
      },
      labels: {
        padding: 20,
        color: "#000000",
        usePointStyle: true,
        pointStyle: "circle",
      },
      position: "bottom",
      onHover: function (event, legendItem) {
        event.target.style.cursor = "pointer";
      },
      onClick: function (e, legendItem) {
        var index = legendItem.datasetIndex;
        var ci = this.chart;
        var alreadyHidden =
          ci.getDatasetMeta(index).hidden === null
            ? false
            : ci.getDatasetMeta(index).hidden;

        ci.data.datasets.forEach(function (e, i) {
          var meta = ci.getDatasetMeta(i);

          if (i !== index) {
            if (!alreadyHidden) {
              meta.hidden = meta.hidden === null ? !meta.hidden : null;
            } else if (meta.hidden === null) {
              meta.hidden = true;
            }
          } else if (i === index) {
            meta.hidden = null;
          }
        });

        ci.update();
      },
    },
    elements: {
      point: {
        radius: 7,
      },
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Population",
            fontStyle: "bold",
          },

          offset: true,
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Total Revenue",
            fontStyle: "bold",
          },
          gridLines: {
            offsetGridLines: true,
            display: false,
          },

          offset: true,
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "Other";
          var label =
            data.datasets[tooltipItem.datasetIndex]["labels"][
              tooltipItem.index
            ];
          var rev =
            data.datasets[tooltipItem.datasetIndex]["rev"][tooltipItem.index];

          return (
            datasetLabel + ": " + label + `(${(rev / 10000000).toFixed(2)} Cr)`
          );
        },
      },
    },
    legendCallback: function (chart) {
      var text = [];
      text.push('<ul class="' + this.chartId + '-legend">');
      for (var i = 0; i < chart.data.datasets.length; i++) {
        text.push(
          '<li><div class="legendValue"><span style="background-color:' +
            chart.data.datasets[i].backgroundColor +
            '">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
        );

        if (chart.data.datasets[i].label) {
          text.push(
            '<span class="label">' + chart.data.datasets[i].label + "</span>"
          );
        }

        text.push('</div></li><div class="clear"></div>');
      }

      text.push("</ul>");

      return text.join("");
    },
  };

  @Input()
  ChartOptions = {
    maintainAspectRatio: false,

    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            offsetGridLines: true,
            display: false,
          },
          beginAtZero: true,
        },
      ],
    },
    legend: {
      position: "bottom",
      labels: {
        padding: 35,
        boxWidth: 24,
        boxHeight: 18,
      },
    },
  };

  @Input()
  headerActions = [
    // {
    //   name: "expand",
    //   svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
    // },
    {
      name: "Download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    // {
    //   name: "share/embed",
    //   svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    // },
  ];
  @Input()
  compareDialogType = 1;

  @Output()
  actionClicked = new EventEmitter();
  @Output()
  compareChange = new EventEmitter();

  @Output()
  dounghnuChartLabels = new EventEmitter();
  myChart;
  showMultipleCharts;
  @Input()
  yearList = ["2017-18", "2018-19", "2019-20", "2020-21"];
  @Input()
  mySelectedYears = ["2019-20", "2020-21"];
  @Input()
  year;
  @Input()
  compareType = "";

  @Input()
  state = "";
  staticYearList = [
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
  ];

  @Input() multipleCharts: boolean = false;

  @Input()
  singleDoughnutChart;

  @Input()
  multipleDoughnutCharts;

  widgetMode: boolean = false;
  apiParamData: any;

  @Input() getChartPayload: any = {};
  multiChart: boolean = false;
  scatterData: any;
  iFrameApiPayload: any;

  ngOnInit(): void {
    this.stateName = this.stateMap[this.stateId];
    // window.onload = () => {
    //   if (this.multipleCharts) {
    //     this.createMultipleChart();
    //   } else this.createChart();
    // };

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("param", params);
      this.widgetMode = params?.widgetMode;
      this.apiParamData = params;
      this.commonService.isEmbedModeEnable.next(this.widgetMode);
      // this.decodeIframeUrl(params.data);
    });
  }

  // let legendDiv = document.getElementById('legend')

  // $('#legend').prepend(mybarChart.generateLegend());
  ngAfterViewInit(): void {
    if (this.widgetMode) {
      console.log("apiParamData", this.apiParamData);
      let stateServiceLabel = this.apiParamData?.stateServiceLabel
        ? JSON.parse(this.apiParamData?.stateServiceLabel)
        : false;
      if (this.apiParamData.chartType == "scatter") {
        this.getScatterData();
      } else if (this.apiParamData.chartType == "bar") {
        if (stateServiceLabel) {
          this.getServiceLevelBenchmarkBarChartData();
        } else {
          this.getStateRevenue();
        }
        // this.getStateRevenue()
      }
    } else {
      if (this.multipleCharts) {
        this.createMultipleChart();
      } else this.createChart();
    }
  }

  yearValueChange(value) {
    this.year = value;
    this.sendValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);
    if (
      changes &&
      changes.getChartPayload &&
      changes.getChartPayload.currentValue
    ) {
      this.getChartPayload = changes.getChartPayload.currentValue;
      // this.iFrameApiPayload = changes.getChartPayload.currentValue;
      // this.openDialog();
    }
    if (changes?.chartData) {
      if (!changes.chartData.firstChange) {
        this.createChart();
      }
    }
    if (changes.mySelectedYears && changes.mySelectedYears.currentValue) {
      this.year = this.mySelectedYears[0];
    }
    if (!changes.multipleDoughnutCharts?.firstChange && this.multipleCharts) {
      if (this.lastMultipleCharts.length) {
        this.lastMultipleCharts.forEach((val) => val.destroy());
      }
      setTimeout(() => {
        this.createMultipleChart();
      }, 100);
    }
  }

  createChart() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    if (this.chartData.type == "scatter") {
      Object.assign(this.chartData, { options: this.scatterOption });
    } else if (this.ChartOptions) {
      Object.assign(this.chartData, { options: this.ChartOptions });
    }

    if (this.chartData.type == "doughnut") {
      let data = [];
      this.dounghnuChartLabels.emit(this.chartData.data["labels"]);
    }
    //dom is fully loaded, but maybe waiting on images & css files
    console.log("chartId==>", this.chartId, this.chartData);
    if (this.chartData?.data?.datasets.length) {
      let canvas = <HTMLCanvasElement>document.getElementById(this.chartId);
      if (!canvas) {
        console.error("no Canvas");
        return;
      }
      let ctx = canvas.getContext("2d");
      this.myChart = new Chart(ctx, this.chartData);

      // chartLegendEL.innerHTML = this.myChart.generateLegend();
      // bindChartEvents(myChart, document);

      // let legendDiv = document.getElementById('legend')

      // $('#legend').prepend(mybarChart.generateLegend());
    }
  }

  lastMultipleCharts = [];

  createMultipleChart() {
    let id;
    let newChartData = {};
    if (this.multipleDoughnutCharts) {
      for (let index = 0; index < this.multipleDoughnutCharts.length; index++) {
        const element = this.multipleDoughnutCharts[index];
        id = element?.id + index;
        newChartData = element;
        let colors = element.data.datasets[0].backgroundColor;
        if (index == 0 && this.multiChartLabel.length == 0)
          element.data["labels"].forEach((element, i) => {
            this.multiChartLabel.push({
              text: element,
              color: colors[i],
            });
          });
        console.log(this.multiChartLabel);
        this.dounghnuChartLabels.emit(this.multiChartLabel);
        if (element?.multipleChartOptions)
          Object.assign(newChartData, {
            options: element?.multipleChartOptions,
          });
        let canvas = <HTMLCanvasElement>document.getElementById(id);
        let ctx = canvas.getContext("2d");
        let tempChart = new Chart(ctx, newChartData);
        this.lastMultipleCharts.push(tempChart);
      }
    }
  }

  actionClick(value) {
    this._loaderService.showLoader();
    console.log(value);
    if (value.name == "Expand" || value.name == "Collapse") {
      this.headerActions.map((innerVal) => {
        if (innerVal.name === value.name) {
          if (value.name == "Expand") innerVal.name = "Collapse";
          else value.name = "Expand";
        }
        this._loaderService.stopLoader();
      });

      this.createChart();
    } else if (value.name == "Download") {
      this.getImage();
      return;
    } else if (value.name == "Share/Embed") {
      console.log("getChartPayload", this.getChartPayload);
      this.iFrameApiPayload = this.commonService.createEmbedUrl(
        this.getChartPayload
      );
      this._loaderService.stopLoader();
      this.openDialog();
    }
    this.actionClicked.emit({ ...value, chartType: this.chartData.type });

    // this._loaderService.stopLoader();
  }

  dialogRef: any;
  openDialog() {
    console.log("openDialog", this.iFrameApiPayload);
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: "700px",
      data: {
        iFrameSrc: this.iFrameApiPayload,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "39rem";
    this.dialogRef = this.dialog.open(this.template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  ownRevenueCompValue(value) {
    this.compareChange.emit(value);
  }

  ulbList: any;
  getCompareCompValues(value) {
    if (Array.isArray(value)) {
      this.ulbList = value;
      this.compareType = "ULBs..";
      return this?.sendValue(value);
    } else this.compareType = value;
    this.sendValue();
  }

  sendValue(ulbs = []) {
    let newYears = [this.year],
      numYear = 2,
      newValue = this.year;
    while (numYear--) {
      newValue = newValue
        ?.split("-")
        ?.map((value) =>
          !isNaN(Number(value)) ? (value = Number(value) - 1) : value
        )
        .join("-");
      newYears.push(newValue);
    }
    let data = {
      year: newYears,
      ulbs: this.ulbList,
      compareType: this.compareType,
    };
    this.compareChange.emit(data);
  }
  showLoader = false;

  getImage() {
    let id = "canvasDiv" + this.chartId;
    let html = document.getElementById(id);
    html2canvas(html).then((canvas) => {
      let image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      // window.open(image)
      var link = document.createElement("a");
      link.href = image;
      link.download = `Chart ${this.chartId}.png`;
      link.click();
      this._loaderService.stopLoader();
    });
  }

  resetState() {
    this.compareType = "State Average";
    this.sendValue();
  }

  activeButtonList: any = stateDashboardSubTabsList;

  getTabType() {
    const defaultOption = {
      yAxisLabel: "Count",
      countAccessKey: "count",
      chartAnimation: "defaultBarChartOptions",
    };
    let findTabType = this.activeButtonList.find(
      (tabName) => tabName.name == this.apiParamData?.activeButton
    );
    return findTabType ? findTabType : defaultOption;
  }

  getStateRevenue() {
    const tabType = this.getTabType();
    this._loaderService.showLoader();

    const paramContent: any = {
      tabType: this.apiParamData?.tabType,
      financialYear: this.apiParamData?.financialYear,
      stateId: this.apiParamData?.stateId
        ? this.apiParamData?.stateId
        : this.apiParamData?.state,
      sortBy: this.apiParamData?.sortBy,
    };

    if (tabType?.isCodeRequired) {
      paramContent["code"] = this.apiParamData?.code;
    }
    console.log("paramContent", paramContent);
    this.stateFilterDataService
      .getStateRevenueForDifferentTabs(paramContent)
      .subscribe(
        (response) => {
          if (response && response["success"]) {
            console.log("getStateRevenue", response);
            if (response["data"] && response["data"].length) {
              for (const data of response["data"]) {
                data["count"] = this.commonService.changeCountFormat(data?.sum);
              }
              this.filterCityRankingChartData(
                response["data"],
                paramContent?.tabType,
                tabType?.yAxisLabel
              );
              // this.filterCityRankingChartData(response['data'], paramContent?.tabType, 'Amount (in Cr.)');
              this._loaderService.stopLoader();
              this.notFound = false;
            } else {
              this.notFound = false;
            }
          } else {
            this.notFound = true;
          }
        },
        (error) => {
          this.notFound = true;
          console.log(error);
        }
      );
  }

  filterCityRankingChartData(
    responseData: any,
    tabType: string,
    yAxisLabel: string
  ) {
    console.log("filterCityRankingChartData", responseData, tabType);
    let barData = {
      type: "bar",
      data: {
        labels: responseData.map((item: { ulbName: any }) => item.ulbName),
        datasets: [
          {
            label: "City Ranking",
            displayLabel: false,
            data: this.getChartData(responseData, tabType, yAxisLabel),
            backgroundColor: [
              "#1E44AD",
              "#224CC0",
              "#2553D3",
              "#3360DB",
              "#456EDE",
              "#587DE1",
              "#6A8BE5",
              "#86A2ED",
              "#93AAEA",
              "#A8BCF0",
            ],
            borderColor: ["#1E44AD"],
            borderWidth: 1,
          },
        ],
      },
    };
    this.chartData = {};
    this.chartData = barData;
    console.log("this.barData", this.chartData);
    this.createChart();
  }

  getChartData(responseData: any, tabType: string, yAxisLabel: string) {
    this.setChartAnimation(tabType, yAxisLabel);
    let mappedCountList = responseData.map(
      (item: { count: any }) => item.count
    );
    return mappedCountList;
  }

  setChartAnimation(tabType: string, yAxisLabel: string) {
    let animationConfig: any;
    // let animationConfigAccessKey: any = this.stateServiceLabel ? 'serviceLevelBenchmarkBarChartOptions' : this.getTabType().chartAnimation;
    let animationConfigAccessKey: any = "croreBarChartOptions";

    animationConfig = this.stateFilterDataService[animationConfigAccessKey];
    Object.assign(animationConfig);
    this.ChartOptions = animationConfig;
    // let yAxesLabelName = tabType == 'TotalRevenue' ? 'Amount (in Cr.)' : 'Amount (in INR)';
    this.ChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] =
      yAxisLabel;

    console.log("barChartOptions", this.ChartOptions);
  }

  initializeScatterData() {
    this.scatterData = {
      type: "scatter",
      data: {
        datasets: [
          {
            labels: [],
            rev: [],
            label: "Municipality",
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#1EBFC6",
            backgroundColor: "#1EBFC6",
          },
          {
            labels: [],
            rev: [],
            label: "Municipal Corporation",
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#3E5DB1",
            backgroundColor: "#3E5DB1",
          },
          {
            label: "Town Panchayat",
            labels: [],
            rev: [],
            data: [],
            showLine: false,
            fill: true,
            borderColor: "#F5B742",
            backgroundColor: "#F5B742",
          },
          {
            label: "State Average",
            data: [],
            labels: ["State Average"],
            showLine: true,
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      },
    };
  }

  getScatterData() {
    // debugger;
    this.multiChart = false;
    this._loaderService.showLoader();
    this.initializeScatterData();
    console.log("getScatterData", this.apiParamData);
    let stateServiceLabel = JSON.parse(this.apiParamData?.stateServiceLabel);
    console.log("parsestateServiceLabel", stateServiceLabel);
    let payload = {
      [stateServiceLabel ? "stateId" : "state"]: this.apiParamData?.stateId
        ? this.apiParamData?.stateId
        : this.apiParamData?.state,
      financialYear: this.apiParamData?.financialYear,
      headOfAccount: stateServiceLabel
        ? undefined
        : this.apiParamData?.headOfAccount,
      filterName: this.apiParamData?.filterName,
      isPerCapita: this.apiParamData?.isPerCapita,
      compareType: stateServiceLabel ? undefined : "",
      compareCategory: this.apiParamData?.compareCategory,
      ulb: this.apiParamData?.ulb,
    };
    let apiEndPoint = stateServiceLabel ? "state-slb" : "state-revenue";

    console.log(payload);
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService.getScatterdData(payload, apiEndPoint).subscribe(
      (res) => {
        this.notFound = false;
        console.log("response data", res);
        //scatter plots center
        if (!this.apiParamData?.filterName.includes("mix")) {
          this._loaderService.stopLoader();
          let mCorporation: any;
          let tp_data: any;
          let m_data: any;
          let stateData: any;
          if (stateServiceLabel) {
            // this.setServiceLevelBenchmarkScatteredChartOption('Population', this.apiParamData?.filterName);
            m_data =
              res["data"] &&
              res["data"]["scatterData"] &&
              res["data"]["scatterData"]["m_data"];
            mCorporation =
              res["data"] &&
              res["data"]["scatterData"] &&
              res["data"]["scatterData"]["mc_data"];
            tp_data =
              res["data"] &&
              res["data"]["scatterData"] &&
              res["data"]["scatterData"]["tp_data"];
            // stateData = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["stateAvg"][0]["average"];
            stateData =
              res["data"] &&
              res["data"]["scatterData"] &&
              res["data"]["scatterData"]["stateAvg"] &&
              res["data"]["scatterData"]["stateAvg"][0] &&
              res["data"]["scatterData"]["stateAvg"][0]["average"];
            // let natData = res["natAvg"][0]["average"];
          } else {
            mCorporation = res["mCorporation"];
            tp_data = res["townPanchayat"];
            m_data = res["municipality"];
            // let natData = res["natAvg"][0]["average"];
            stateData = res["stateAvg"][0]["average"];
          }

          this.scatterData.data.datasets.forEach((el) => {
            let obj = { x: 0, y: 0 };
            if (el.label == "Town Panchayat") {
              obj = { x: 0, y: 0 };
              tp_data.forEach((el2, index) => {
                obj.x = el2.population;
                obj.y = stateServiceLabel
                  ? el2.value.toFixed(2)
                  : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(
                  stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue
                );
                el.data.push(obj);
                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipal Corporation") {
              mCorporation.forEach((el2, index) => {
                obj.x = el2.population;
                obj.y = stateServiceLabel
                  ? el2.value.toFixed(2)
                  : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(
                  stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue
                );
                el.data.push(obj);

                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipality") {
              m_data.forEach((el2, index) => {
                obj = { x: 0, y: 0 };
                obj.x = el2.population;
                obj.y = stateServiceLabel
                  ? el2.value.toFixed(2)
                  : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(
                  stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue
                );
                el.data.push(obj);
                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "National Average") {
              // el["data"]["y"] = natData;
            } else if (el.label == "State Average") {
              let obje = [
                { x: 0, y: 0 },
                { x: 1200000, y: 0 },
              ];
              obje.forEach((el2) => {
                el2["y"] = stateData;

                el["data"].push(el2);
              });
            }
          });
          console.log(this.scatterData);
          // this.generateRandomId("scatterChartId123");
          this.scatterData = { ...this.scatterData };
          this.chartData = {};
          this.chartData = this.scatterData;
        } //donught charts center
        // else if (this.apiParamData?.filterName.includes("mix")) {
        //   this._loaderService.stopLoader();
        //   let data = res["data"];
        //   // this.chartDropdownList = data;
        //   // if (this.chartDropdownList?.length > 0) {
        //   //   this.getStateRevenue();
        //   // }
        //   // console.log('chartDropdownList', this.chartDropdownList)
        //   this.initializeDonughtData();
        //   if (payload.compareType == "") {
        //     if (data.length) {
        //       data.forEach((el) => {
        //         this.doughnutData.data.labels.push(el._id);
        //         this.doughnutData.data.datasets[0].data.push(el.amount);
        //       });
        //       console.log(this.doughnutData);

        //       this.doughnutData = { ...this.doughnutData };
        //     }
        //   } else if (payload.compareType == "ulbType") {
        //     let mData = res["mData"];
        //     let mcData = res["mcData"];
        //     let tpData = res["tpData"];
        //     this.multiChart = true;
        //     this.doughnutDataArr = [
        //       { mData: mData },
        //       { mcData: mcData },
        //       { tpData: tpData },
        //     ];
        //     this.doughnutDataArr = [...this.doughnutDataArr];
        //   }
        // }

        this.createChart();
      },
      (err) => {
        this._loaderService.stopLoader();
        this.notFound = true;
        console.log(err.message);
      }
    );
  }

  serviceLevelBenchmarkScatterOption: any;
  setServiceLevelBenchmarkScatteredChartOption(
    xAxisLabel: string = "Population",
    yAxisLabel: string = "Total Revenue"
  ) {
    let scatterOption = {
      legend: {
        itemStyle: {
          cursor: "default",
        },
        labels: {
          padding: 20,
          color: "#000000",
          usePointStyle: true,
          pointStyle: "circle",
        },
        position: "bottom",
        onHover: function (event, legendItem) {
          event.target.style.cursor = "pointer";
        },
        onClick: function (e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          var alreadyHidden =
            ci.getDatasetMeta(index).hidden === null
              ? false
              : ci.getDatasetMeta(index).hidden;

          ci.data.datasets.forEach(function (e, i) {
            var meta = ci.getDatasetMeta(i);

            if (i !== index) {
              if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
              } else if (meta.hidden === null) {
                meta.hidden = true;
              }
            } else if (i === index) {
              meta.hidden = null;
            }
          });

          ci.update();
        },
      },
      elements: {
        point: {
          radius: 7,
        },
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.commonService.toTitleCase(xAxisLabel),
              fontStyle: "bold",
            },

            offset: true,
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: `${this.commonService.toTitleCase(yAxisLabel)} (%)`,
              fontStyle: "bold",
            },
            gridLines: {
              offsetGridLines: true,
              display: false,
            },

            offset: true,
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            console.log("tooltipItem", tooltipItem.index);
            var datasetLabel =
              data.datasets[tooltipItem.datasetIndex].label || "Other";
            var label =
              data.datasets[tooltipItem.datasetIndex]["labels"][
                tooltipItem.index
              ];
            console.log("tooltipItem", data.datasets[tooltipItem.datasetIndex]);
            var rev =
              data.datasets[tooltipItem.datasetIndex]["rev"][tooltipItem.index];

            return datasetLabel + ": " + label + " " + `(${rev} %)`;
          },
        },
      },
      legendCallback: function (chart) {
        var text = [];
        text.push('<ul class="' + this.chartId + '-legend">');
        for (var i = 0; i < chart.data.datasets.length; i++) {
          text.push(
            '<li><div class="legendValue"><span style="background-color:' +
              chart.data.datasets[i].backgroundColor +
              '">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
          );

          if (chart.data.datasets[i].label) {
            text.push(
              '<span class="label">' + chart.data.datasets[i].label + "</span>"
            );
          }

          text.push('</div></li><div class="clear"></div>');
        }

        text.push("</ul>");

        return text.join("");
      },
    };

    this.serviceLevelBenchmarkScatterOption = scatterOption;
  }

  getServiceLevelBenchmarkBarChartData() {
    const barChartPayload = {
      financialYear: this.apiParamData?.financialYear,
      stateId: this.apiParamData?.stateId,
      sortBy: this.apiParamData?.sortBy,
      filterName: this.apiParamData?.filterName,
      ulb: this.apiParamData?.ulbId,
    };

    console.log("payload", barChartPayload);

    this.stateFilterDataService
      .getScatterdData(barChartPayload, this.apiParamData?.apiEndPoint)
      .subscribe(
        (response) => {
          if (response && response["success"] && response["data"]) {
            console.log("getStateRevenue", response);
            if (
              response["data"]["scatterData"] &&
              response["data"]["scatterData"]["tenData"] &&
              response["data"]["scatterData"]["tenData"].length
            ) {
              let chartData = response["data"]["scatterData"]["tenData"];
              for (const data of chartData) {
                data["count"] = data?.value;
              }
              this.filterCityRankingChartData(chartData, "", "Percentage");
              this.notFound = false;
            } else {
              this.notFound = false;
            }
          } else {
            this.notFound = true;
          }
        },
        (error) => {
          this.notFound = true;
          console.log(error);
        }
      );
  }
}

const temp = [
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
  {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  },
];
