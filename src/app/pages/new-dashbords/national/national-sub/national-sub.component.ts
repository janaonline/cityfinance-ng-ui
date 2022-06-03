import {
  Component,
  OnInit,
  Renderer2,
  SimpleChange,
  ViewChildren,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "src/app/shared/services/common.service";
import { Chart } from "chart.js";
import { I } from "@angular/cdk/keycodes";
import { NationalService } from "../national.service";
import { NationalMapSectionService } from "../national-map-section/national-map-section.service";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import * as fileSaver from "file-saver";
import { throttleTime } from "rxjs/operators";

@Component({
  selector: "app-national-sub",
  templateUrl: "./national-sub.component.html",
  styleUrls: ["./national-sub.component.scss"],
})
export class NationalSubComponent implements OnInit {
  constructor(
    protected router: Router,
    private activateRoute: ActivatedRoute,
    private _commonServices: CommonService,
    private nationalService: NationalService,
    private nationalMapService: NationalMapSectionService,
    private _loaderService: GlobalLoaderService
  ) {}
  public chart: Chart;
  public doughnut: Chart;
  public dynamicDoughnut: Chart;

  tabData;
  aboutTab;
  nationalFilter = new FormControl();
  globalOptions = [];
  filteredOptions: Observable<any[]>;
  tableData;
  popBtn = true;
  tableView = true;
  graphView = false;
  barChartsLabels = ["<100k", "100K-500K", "500K-1M", "1M-4M", "4M+"];

  doughnutLabels = [];
  // doughnutLabels = [
  //   {
  //     name: "Revenue Grants, Contributions & Subsidies",
  //     color: "#1E44AD",
  //   },
  //   {
  //     name: "Interest earned",
  //     color: "#25C7CE",
  //   },
  //   {
  //     name: "Fee & User Charges",
  //     color: "#585FFF",
  //   },
  //   {
  //     name: "Income from Investment",
  //     color: "#FFD72E",
  //   },
  //   {
  //     name: "Sale & Hire charges",
  //     color: "#22A2FF",
  //   },
  //   {
  //     name: "Others",
  //     color: "#FF608B",
  //   },
  //   {
  //     name: "Tax Revenue",
  //     color: "#FF608B",
  //   },
  //   {
  //     name: "Other Income",
  //     color: "#FF608B",
  //   },
  //   {
  //     name: "Rental Income from Municipal Properties",
  //     color: "#FF608B",
  //   },
  //   {
  //     name: "Assigned Revenues & Compensation",
  //     color: "#a572b5",
  //   },
  // ];
  yearLookup = [
    { id: "2018-19", itemName: "2018-19" },
    { id: "2019-20", itemName: "2019-20" },
    { id: "2020-21", itemName: "2020-21" },
    { id: "2021-22", itemName: "2021-22" },
  ];
  totalRevenue = true;
  mixRevenue = false;

  nationalInput: any = {
    type: "totalRevenue",
    financialYear: "2020-21",
    stateId: "",
    formType: "populationCategory",
  };
  downloadInput: any = {
    type: "totalRevenue",
    financialYear: "2020-21",
    stateId: "",
    formType: "populationCategory",
    csv: false,
  };

  downloadInputEndPoint: string = "";
  doughnutArray;

  RevenueMixInput: any = {
    financialYear: "2020-21",
    formType: "populationCategory",
    stateId: "",
    type: "revenueMix",
  };

  multipleDoughnutChartLabel: any = [];
  @ViewChildren("mycharts") allMyCanvas: any;
  mixRDoughnutPopulationCategory: any = [
    {
      id: "p1",
      title: "4M+",
      data: [],
      chart: [],
    },
    {
      id: "p2",
      title: "1M-4M",
      data: [],
      chart: [],
    },
    {
      id: "p3",
      title: "500K-1M",
      data: [],
      chart: [],
    },
    {
      id: "p4",
      title: "100K-500K",
      data: [],
      chart: [],
    },
    {
      id: "p5",
      title: "<100K",
      data: [],
      chart: [],
    },
  ];
  mixRDoughnutUlbType: any = [
    {
      id: "t1",
      title: "Municipal Corporation",
      data: [],
      chart: [],
    },
    {
      id: "t2",
      title: "Municipality",
      data: [],
      chart: [],
    },
    {
      id: "t3",
      title: "Town Panchayat",
      data: [],
      chart: [],
    },
  ];
  revnueData: any;

  revnueChartData: any;
  financialYearList: any = [];
  nationalDoughnutChart: any = [];
  nationalDoughnutChartLabel: any = [];
  // colorArray = [
  //   "#FFD72E",
  //   "black",
  //   "red",
  //   "#a572b5",
  //   "#1E44AD",
  //   "#25C7CE",
  //   "#a572b5",
  //   "#585FFF",
  //   "#0c302f",
  //   "#22A2FF",
  //   "#FF608B",
  // ];
  colorArray = [];
  mainDoughnutArray = [];
  tempObj = {};

  chartArray: any = [];
  activetab: any = "Total Revenue";
  CurrentHeadTab: any = "Revenue";
  barGraphDropdown: any = [
    { name: "Revenue", value: "revenue", code: "Revenue" },
    { name: "Revenue Per Capita", value: "revenuePerCapita", code: "Revenue" },

    { name: "Expenditure", value: "expenditure", code: "Expenditure" },
    {
      name: "Expenditure Per Capita",
      value: "expenditurePerCapita",
      code: "Expenditure",
    },

    { name: "Own Revenue", value: "ownRevenue", code: "Own Revenue" },
    {
      name: "Own Revenue Per Capita",
      value: "ownRevenuePerCapita",
      code: "Own Revenue",
    },

    {
      name: "Capital Expenditure",
      value: "capitalExpenditure",
      code: "Capital Expenditure",
    },
    {
      name: "Capital Expenditure Per Capita",
      value: "capitalExpenditurePerCapita",
      code: "Capital Expenditure",
    },
  ];
  barChartOptions: any = [];
  selectedGraphValue: any = "";
  yAxesLabel: string = "Total Revenue";
  xAxesLabel: string = "--Average";
  newValue: string = "";

  doughnutChartOptions: any = {};

  barChartData: any = [
    {
      type: "line",
      label: "National Average",
      data: [80, 80, 80, 80, 80, 80],
      fill: false,
      borderColor: "#fc4185",
      option: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              console.log("function", tooltipItem, data);
              var dataset = data.datasets[tooltipItem.datasetIndex];
              console.log("dataset", dataset);
              var currentValue = dataset.data[tooltipItem.index];
              console.log("currentValue", currentValue);
              // currentValue = currentValue > 0 ? (currentValue / 10000000).toFixed(2) : 0;
              // return new Intl.NumberFormat("en-IN").format(currentValue);
              return currentValue;
            },
          },
        },
      },
    },
    {
      data: [],
      backgroundColor: "#456EDE",
      borderWidth: 1,
      barThickness: 40,
    },
  ];

  deficitBarChartData: any = [
    {
      type: "line",
      label: "National Revenue Average",
      data: [80, 80, 80, 80, 80, 80],
      fill: false,
      borderColor: "#fc4185",
    },
    {
      type: "line",
      label: "National Expense Average",
      data: [80, 80, 80, 80, 80, 80],
      fill: false,
      borderColor: "red",
    },
    {
      data: [],
      label: "Revenue",
      backgroundColor: "#456EDE",
      borderWidth: 1,
      barThickness: 40,
    },
    {
      data: [],

      label: "Expense",
      backgroundColor: "#000",
      borderWidth: 1,
      barThickness: 40,
    },
  ];

  getCurrentTabValue() {
    if (this.activetab)
      if (this.doughnut) {
        this.doughnut.destroy();
      }
    console.log("280", this.activetab, this.popBtn);

    this.nationalInput.stateId = this.selectedState;

    if (this.popBtn) {
      this.downloadInput.formType = "populationCategory";
    }
    if (!this.popBtn) {
      this.downloadInput.formType = "ulbType";
    }

    this.nationalInput.financialYear = this.selectedYear;
    if (this.activetab.includes("Total")) {
      this.totalRevenue = true;
      this.mixRevenue = false;
      this.tableView = true;
      this.graphView = false;
      if (this.popBtn) {
        this.nationalInput.formType = "populationCategory";
      }
      if (!this.popBtn) {
        this.nationalInput.formType = "ulbType";
      }
    }
    if (this.activetab.includes("Mix")) {
      this.totalRevenue = false;
      this.mixRevenue = true;
      this.RevenueMixInput.stateId = this.selectedState;
      if (this.popBtn) {
        this.RevenueMixInput.formType = "populationCategory";
      }
      if (!this.popBtn) {
        this.RevenueMixInput.formType = "ulbType";
      }
    }
    if (this.activetab == "Total Revenue") {
      this.nationalInput.type = "totalRevenue";
      this.downloadInput.type = "totalRevenue";

      this.getNationalTableData("revenue");
      this.downloadInputEndPoint = "revenue";
    } else if (this.activetab == "Revenue Mix ") {
      this.RevenueMixInput.type = "revenueMix";

      this.downloadInput.type = "revenueMix";
      this.getRevenueMixData(this.RevenueMixInput, "revenue");
    } else if (this.activetab == "Total Expenditure") {
      this.nationalInput.type = "totalExpenditure";
      this.downloadInput.type = "totalExpenditure";
      this.getNationalTableData("expenditure");
      this.downloadInputEndPoint = "expenditure";
    } else if (this.activetab == "Expenditure Mix") {
      this.RevenueMixInput.type = "expenditureMix";
      this.downloadInput.type = "expenditureMix";
      this.getRevenueMixData(this.RevenueMixInput, "expenditure");
    } else if (this.activetab == "Deficit or Surplus") {
      this.totalRevenue = true;
      this.mixRevenue = false;
      this.tableView = true;
      this.graphView = false;
      if (this.popBtn) {
        this.nationalInput.formType = "populationCategory";

        this.downloadInput.formType = "populationCategory";
      }
      if (!this.popBtn) {
        this.nationalInput.formType = "ulbType";

        this.downloadInput.formType = "ulbType";
      }
      this.nationalInput.type = "deficitOrSurplus";
      this.downloadInput.type = "deficitOrSurplus";

      this.getNationalTableData("expenditure");
      this.downloadInputEndPoint = "expenditure";
    } else if (this.activetab == "Total Own Revenue") {
      this.nationalInput.type = "totalOwnRevenue";

      this.downloadInput.type = "totalOwnRevenue";
      this.getNationalTableData("own-revenue");

      this.downloadInputEndPoint = "own-revenue";
    } else if (this.activetab == "Own Revenue Mix ") {
      this.RevenueMixInput.type = "OwnrevenueMix";
      this.downloadInput.type = "OwnrevenueMix";
      this.getRevenueMixData(this.RevenueMixInput, "own-revenue");
    } else if (this.activetab == "Capital Expenditure") {
      this.totalRevenue = true;
      this.mixRevenue = false;
      this.tableView = true;
      this.graphView = false;
      if (this.popBtn) {
        this.nationalInput.formType = "populationCategory";
        this.downloadInput.formType = "populationCategory";
      }
      if (!this.popBtn) {
        this.nationalInput.formType = "ulbType";
        this.downloadInput.formType = "ulbType";
      }
      this.nationalInput.type = "totalCapexpense";
      this.downloadInput.type = "totalCapexpense";
      this.getNationalTableData("capital-expenditure");

      this.downloadInputEndPoint = "capital-expenditure";
    }
  }

  resetFilter() {
    let emptyArr: any = [];
    this.selectedYear = "2020-21";
    this.selectedState = "";

    this.filteredOptions = emptyArr;
    this.nationalFilter.patchValue("");
    this.subFilterFn("popCat");
    // this.getCurrentTabValue();
  }

  // getActiveTab(value) {}

  destroyMultipleCharts() {
    for (const chartData of this.chartArray) {
      if (chartData?.chart) {
        chartData?.chart.destroy();
      }
    }
  }
  selectedYear = "2020-21";
  selectFinancialYear(event) {
    // console.log("this.currntHeadTab==>", this.CurrentHeadTab);
    this.selectedYear = event.target.value;
    this.destroyMultipleCharts();
    // this.getNationalTableData(this.CurrentHeadTab);
    this.RevenueMixInput.financialYear = this.selectedYear;
    // this.getRevenueMixData(this.RevenueMixInput);
    this.getCurrentTabValue();
  }

  createDoughnutChartOptions(data: any) {
    let tempObject = {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data: any) => {
            console.log("optionsData", data, tooltipItem);
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function (
              previousValue,
              currentValue
            ) {
              return Number(previousValue) + Number(currentValue);
            });
            console.log("total Ammount==>", total);

            var currentValue = Number(dataset.data[tooltipItem.index]);
            var percentage = ((currentValue / total) * 100).toFixed(2);
            return percentage + "%" + data.labels[tooltipItem.index];
          },
        },
      },
    };
    this.doughnutChartOptions = tempObject;
  }

  getRevenueMixData(revenueMixInput, endPoint) {
    this.destroyMultipleCharts();
    this._loaderService.showLoader();
    try {
      this.nationalService
        .getNationalRevenueMixData(revenueMixInput, endPoint)
        .subscribe((res: any) => {
          this._loaderService.stopLoader();

          if (res?.data) {
            this.colorArray = [];
            this.nationalDoughnutChartLabel = [];
            this.multipleDoughnutChartLabel = [];
            this.createDoughnutChartOptions(res?.data);
            this.doughnutLabels = res?.data?.colourArray;
            console.log("doughnutLabels", this.doughnutLabels);
            if (this.doughnutLabels.length)
              this.doughnutLabels.forEach((elem, i) => {
                this.colorArray.push(elem?.colour);
                this.nationalDoughnutChartLabel.push(elem?.lineitem);
                this.multipleDoughnutChartLabel.push(elem?.lineitem);
              });
            this.nationalDoughnutChart = Object.values(res?.data?.national);
            this.doughnutChartInit();
            if (revenueMixInput.formType == "populationCategory") {
              this.mixRDoughnutPopulationCategory.map((elem) => {
                let particularObject = res?.data?.individual[elem?.title];
                if (particularObject) {
                  elem.data = Object.values(particularObject);
                }
              });
              this.dynamicDoughnutChartInit(
                this.mixRDoughnutPopulationCategory
              );
            }
            if (revenueMixInput.formType == "ulbType") {
              // this.doughnutLabels = res?.data?.colourArray;
              // this.doughnutLabels.forEach((elem, i) => {
              //   this.colorArray.push(elem?.colour);
              // });
              // this.createDoughnutChartOptions(res?.data);
              // this.nationalDoughnutChart = Object.values(res?.data?.national);
              // this.nationalDoughnutChartLabel = Object.keys(
              //   res?.data?.national
              // );
              // this.multipleDoughnutChartLabel = Object.keys(
              //   res?.data?.individual["Municipal Corporation"]
              // );
              this.mixRDoughnutUlbType.forEach((elem) => {
                let particularObject = res?.data?.individual[elem?.title];
                if (particularObject) {
                  elem.data = [];
                  this.multipleDoughnutChartLabel.forEach((val) => {
                    if (val == "Own Revenues") {
                      elem.data.push(particularObject["Owen Revenue"]);
                    } else elem.data.push(particularObject[val]);
                  });
                }
              });
              this.dynamicDoughnutChartInit(this.mixRDoughnutUlbType);
            }
          }
        });
    } catch (err) {
      this._loaderService.stopLoader();
    }
  }

  tableLoader: boolean = false;
  getNationalTableData(endPoint) {
    this.tableLoader = true;
    this._loaderService.showLoader();
    try {
      this.nationalService
        .getNationalRevenueData(this.nationalInput, endPoint)
        .subscribe((res: any) => {
          // console.log("")
          this.tableLoader = false;
          this._loaderService.stopLoader();
          this.tableData = res?.data;
          // this.dataAvailabilityvalue = res?.dataAvailability;

          this.creatBarChartData(this.selectedGraphValue);
        });
    } catch (err) {
      this.tableLoader = false;
      this._loaderService.stopLoader();
    }
  }

  ngOnChanges(changes: SimpleChange) {
    console.log("currentUrl===>", this.router.url);
  }
  ngOnInit(): void {
    this.getFinancialYearList();

    this.nationalMapService.currentSubTab.subscribe((res) => {
      this.popBtn = true;
      this.activetab = res?.data;
      this.CurrentHeadTab = res?.HeadTab
        ? res?.HeadTab
        : this.barGraphDropdown[0].code;
      this.barChartOptions = this.barGraphDropdown.filter(
        (item) => item.code == this.CurrentHeadTab
      );
      this.selectedGraphValue = this.barChartOptions[0]?.value;
      this.doughnutArray = this.mixRDoughnutPopulationCategory;
      this.getCurrentTabValue();
    });
    // this.getCurrentTabValue();
    // this.getNationalTableData("revenue");
    this.nationalFilter.valueChanges.subscribe((value) => {
      if (value?.length >= 1) {
        this._commonServices
          .postGlobalSearchData(value, "state", "")
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
    // this.subFilterFn("popCat");
  }

  activeTabFn(item) {
    this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
    // this.router.navigate([`dashboard/national/${item._id}`]);
  }

  getFinancialYearList() {
    this._loaderService.showLoader();
    this.nationalMapService.getNationalFinancialYear().subscribe((res: any) => {
      this._loaderService.stopLoader();
      this.financialYearList = res?.data?.FYs;
    });
  }

  barLineData: any = [];

  creatBarChartData(value) {
    console.log({ value });
    // let newValue;
    if (this.CurrentHeadTab.toLowerCase() == "revenue") {
      this.newValue =
        value.toLowerCase() == "revenue" ? "revenue" : "revenuePerCapita";
    } else if (this.CurrentHeadTab.toLowerCase() == "expenditure") {
      if (this.activetab == "Deficit or Surplus") {
        console.log("this....tableData", this.tableData);
        let deficitData = this.tableData.rows.map((elem) => {
          return parseInt(elem.revenue);
        });
        let expenseData = this.tableData.rows.map((elem) => {
          return parseInt(elem.expense);
        });

        this.deficitBarChartData[2].data = deficitData.slice(1);
        this.deficitBarChartData[3].data = expenseData.slice(1);

        let calculatedData = deficitData;
        let newCalcualtesData = expenseData;
        let firstLine = [];
        let secondLine = [];
        for (let index = 0; index < deficitData.length - 1; index++) {
          firstLine.push(...calculatedData.slice(0, 1));
        }
        for (let index = 0; index < expenseData.length - 1; index++) {
          secondLine.push(...newCalcualtesData.slice(0, 1));
        }
        this.deficitBarChartData[0].data = firstLine;
        this.deficitBarChartData[1].data = secondLine;

        console.log("deficitData==>", this.barChartData);
      }
      this.newValue =
        value.toLowerCase() == "expenditure"
          ? "expenditure"
          : "expenditurePerCapita";
    } else if (this.CurrentHeadTab.toLowerCase() == "own revenue") {
      this.newValue =
        value.toLowerCase() == "ownrevenue"
          ? "Ownrevenue"
          : "OwnrevenuePerCapita";
    } else if (this.CurrentHeadTab.toLowerCase() == "capital expenditure") {
      this.newValue = value == "capitalExpenditure" ? "amount" : "perCapita";
    }
    console.log("newValue==>", this.newValue);

    // this.yAxesLabel = this.newValue;

    if (this.tableData)
      this.revnueChartData = this.tableData?.rows?.map((elem) => {
        return parseInt(elem[this.newValue]);
      });

    let calculatedData = this.revnueChartData;
    if (this.barLineData) {
      this.barLineData = [];
    }
    for (let index = 0; index < this.revnueChartData?.length - 1; index++) {
      this.barLineData.push(...calculatedData.slice(0, 1));
    }

    this.revnueChartData = this.revnueChartData.slice(1);

    this.barChartData[1].data = this.revnueChartData;
    this.barChartData[0].data = this.barLineData;
    console.log(
      "this.revenueChartData",
      this.revnueChartData,
      this.newValue,
      this.barChartData
    );
    this.barChartInit();
  }

  selectGraphMode(event) {
    this.selectedGraphValue = event.target.value;

    this.creatBarChartData(this.selectedGraphValue);
  }

  selectedState: any = "";
  getSelectedvalue(value) {
    this.selectedState = value?._id;
    this.getCurrentTabValue();
    // this.getNationalTableData(this.CurrentHeadTab);
  }

  subFilterFn(type) {
    this.doughnutArray = [];
    if (type == "popCat") {
      this.popBtn = true;
      this.nationalInput.formType = "populationCategory";
      this.RevenueMixInput.formType = "populationCategory";
      this.doughnutArray = this.mixRDoughnutPopulationCategory;

      this.barChartsLabels = ["<100k", "100K-500K", "500K-1M", "1M-4M", "4M+"];
      if (this.totalRevenue) {
        if (this.graphView) {
          this.barChartInit();
        }
      }
    }
    if (type == "ulbType") {
      this.popBtn = false;
      this.nationalInput.formType = "ulbType";
      this.RevenueMixInput.formType = "ulbType";

      this.doughnutArray = this.mixRDoughnutUlbType;
      // if (!this.totalRevenue) {
      //   this.getRevenueMixData(this.RevenueMixInput);
      //   this.dynamicDoughnutChartInit(this.doughnutArray);
      // }
      this.barChartsLabels = [
        "Municipal Corporation",
        "Municipality",
        "Town Panchayat",
      ];
      if (this.totalRevenue) {
        if (this.graphView) {
          this.barChartInit();
        }
      }
    }
    this.getCurrentTabValue();
  }

  graphViewFn() {
    this.tableView = false;
    this.graphView = true;
    this.barChartInit();
  }
  tableViewFn() {
    this.tableView = true;
    this.graphView = false;
  }

  barChartInit() {
    console.log("barLineData", this.barLineData);
    console.log(
      "this.deficitdata",
      this.deficitBarChartData,
      this.activetab,
      this.revnueChartData,
      this.barChartData,
      this.barChartsLabels
    );

    let finalObj: any = {};
    if (this.activetab == "Deficit or Surplus") {
      finalObj = this.deficitBarChartData;
    } else {
      finalObj = this.barChartData;
    }

    console.log("finalObj", this.barChartData, this.deficitBarChartData);
    let newLabel =
      this.newValue.charAt(0).toUpperCase() +
      this.newValue
        .slice(1)
        .split(/(?=[A-Z])/)
        .join(" ");

    console.log({ newLabel });
    this.barChartData[1]["label"] = newLabel;
    this.yAxesLabel = newLabel;
    if (this.activetab == "Deficit or Surplus") {
      this.yAxesLabel = "Revenu and Expenditure";
    }
    if (this.yAxesLabel.includes("Per Capita")) {
      this.yAxesLabel = this.yAxesLabel + " in Rs.";
    } else {
      this.yAxesLabel = this.yAxesLabel + " in Cr.";
    }
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.yAxesLabel)
      this.chart = new Chart("canvas", {
        type: "bar",
        data: {
          labels: this.barChartsLabels,
          datasets: finalObj,
        },
        options: {
          legend: {
            position: "bottom",
            display: true,
          },
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                  // drawOnChartArea: false
                },
                scaleLabel: {
                  display: true,
                  labelString: this.yAxesLabel,
                },
                afterDataLimits: function (axis) {
                  axis.max += 20;
                },
              },
            ],
            xAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  //  display:false
                  drawOnChartArea: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: this.xAxesLabel,
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem[0].datasetIndex];
                if (dataset && dataset.type == "line") {
                  return "";
                } else {
                  return `${tooltipItem[0]?.label}`;
                }
              },
              /**
               * uncomment the below code if you want custom label
               */
              // label: function (tooltipItem, data) {
              //   var dataset = data.datasets[tooltipItem.datasetIndex];
              //   if (dataset && dataset.type == 'line') {
              //     return `${dataset?.label ? dataset?.label : 'Average'}: ${tooltipItem?.yLabel}`
              //   } else {
              //     return `${tooltipItem?.label} ${dataset?.label}: ${tooltipItem?.yLabel}`
              //   }
              // },
            },
          },
          animation: {
            onComplete: function (animation) {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;
              ctx.fillStyle = "#6E7281";
              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                if (meta.type == "line") return true;
                meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  // data = data > 0 ? (data / 1000000).toFixed(2) : 0;
                  ctx.fillText("₹ " + data, bar._model.x, bar._model.y - 5);
                });
              });
              console.log("animation", animation);
            },
          },
        },
      });
  }

  doughnutChartInit() {
    if (this.doughnut) {
      this.doughnut.destroy();
    }
    this.doughnut = new Chart("doughnut", {
      type: "doughnut",
      data: {
        labels: this.nationalDoughnutChartLabel,
        datasets: [
          {
            data: this.nationalDoughnutChart,
            backgroundColor: this.colorArray,
            fill: false,
          },
        ],
      },
      options: {
        ...this.doughnutChartOptions,
        animation: {
          duration: 500,
          easing: "easeOutQuart",
          onComplete() {
            var localThis = this;
            const thisCtx = this.chart.ctx;
            thisCtx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontFamily,
              "normal",
              Chart.defaults.global.defaultFontFamily
            );
            thisCtx.textAlign = "center";
            thisCtx.textBaseline = "bottom";
            this.data.datasets.forEach((dataset, index) => {
              for (let i = 0; i < dataset.data.length; i += 1) {
                const textSize = 14;
                // thisCtx.font = `${textSize}px Verdana`;
                const model =
                  dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                const total =
                  dataset._meta[Object.keys(dataset._meta)[0]].total;
                const midRadius =
                  model.innerRadius +
                  (model.outerRadius - model.innerRadius) / 2;
                const startAngle = model.startAngle;
                const endAngle = model.endAngle;
                const midAngle = startAngle + (endAngle - startAngle) / 2;

                const x = midRadius * Math.cos(midAngle);
                const y = midRadius * Math.sin(midAngle);

                /* Calculating the area of the doughnut sector. */
                let angle = endAngle - startAngle;
                let doughnutSectorArea =
                  (angle / 2) *
                  (model.outerRadius - model.innerRadius) *
                  (model.outerRadius + model.innerRadius);

                /* Checking if the doughnutSectorArea is greater than 1200. If it is, it sets the fillStyle to white.
                If it is not, it sets the fillStyle to black. Darker text color for lighter background*/
                // thisCtx.fillStyle = doughnutSectorArea > 1200 ? '#fff' : '#000';
                var isBGColorDarkOrLight = lightOrDark(model?.backgroundColor);
                thisCtx.fillStyle = isBGColorDarkOrLight
                  ? isBGColorDarkOrLight == "light"
                    ? "#000000"
                    : "#ffffff"
                  : "#000000";
                var fontSize = 14;
                var fontStyle = "normal";
                var fontFamily = "sans-serif";
                thisCtx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );

                const percent = `${String(
                  Math.round((dataset.data[i] / total) * 100)
                )}%`;
                /* if need to add the percentage with absolute value uncomment the below line. */
                // thisCtx.fillText(model.label, model.x + x, model.y + y);
                // thisCtx.fillText(dataset.data[i] + percent, model.x + x,
                //   model.y + y + (textSize * 1.3));

                if (dataset.data[i] != 0 && doughnutSectorArea > 1200) {
                  thisCtx.fillText(
                    percent,
                    model.x + x,
                    model.y + y + textSize * 1.3
                  );
                }
              }
            });
          },
        },
      },
    });
  }

  dynamicDoughnutChartInit(chartArray) {
    console.log("multiple Chart Array", chartArray);
    let canvasCharts = this.allMyCanvas._results; // Get array with all canvas
    if (chartArray)
      canvasCharts.map((myCanvas, i) => {
        // For each canvas, save the chart on the charts array
        chartArray[i].chart = new Chart(
          myCanvas.nativeElement.getContext("2d"),
          {
            type: "doughnut",
            data: {
              labels: this.multipleDoughnutChartLabel,
              datasets: [
                {
                  data: chartArray[i].data,
                  backgroundColor: this.colorArray,
                  fill: false,
                },
              ],
            },
            options: {
              ...this.doughnutChartOptions,
              animation: {
                duration: 500,
                easing: "easeOutQuart",
                onComplete() {
                  var localThis = this;
                  const thisCtx = this.chart.ctx;
                  thisCtx.font = Chart.helpers.fontString(
                    Chart.defaults.global.defaultFontFamily,
                    "normal",
                    Chart.defaults.global.defaultFontFamily
                  );
                  thisCtx.textAlign = "center";
                  thisCtx.textBaseline = "bottom";
                  this.data.datasets.forEach((dataset, index) => {
                    for (let i = 0; i < dataset.data.length; i += 1) {
                      const textSize = myCanvas.nativeElement.width / 100;
                      // const textSize = '14px Verdana';
                      // thisCtx.font = `${textSize}px Verdana`;
                      const model =
                        dataset._meta[Object.keys(dataset._meta)[0]].data[i]
                          ._model;

                      const total =
                        dataset._meta[Object.keys(dataset._meta)[0]].total;
                      const midRadius =
                        model.innerRadius +
                        (model.outerRadius - model.innerRadius) / 2;
                      const startAngle = model.startAngle;
                      const endAngle = model.endAngle;
                      const midAngle = startAngle + (endAngle - startAngle) / 2;

                      const x = midRadius * Math.cos(midAngle);
                      const y = midRadius * Math.sin(midAngle);

                      /* Calculating the area of the doughnut sector. */
                      let angle = endAngle - startAngle;
                      let doughnutSectorArea =
                        (angle / 2) *
                        (model.outerRadius - model.innerRadius) *
                        (model.outerRadius + model.innerRadius);

                      /* Checking if the doughnutSectorArea is greater than 1200. If it is, it sets the fillStyle to white.
                  If it is not, it sets the fillStyle to black. Darker text color for lighter background*/
                      // thisCtx.fillStyle = doughnutSectorArea > 1200 ? '#fff' : '#000';
                      var isBGColorDarkOrLight = lightOrDark(
                        model?.backgroundColor
                      );
                      thisCtx.fillStyle = isBGColorDarkOrLight
                        ? isBGColorDarkOrLight == "light"
                          ? "#000000"
                          : "#ffffff"
                        : "#000000";
                      var fontSize = 14;
                      var fontStyle = "normal";
                      var fontFamily = "sans-serif";
                      thisCtx.font = Chart.helpers.fontString(
                        fontSize,
                        fontStyle,
                        fontFamily
                      );

                      const percent = `${String(
                        Math.round((dataset.data[i] / total) * 100)
                      )}%`;
                      /* if need to add the percentage with absolute value uncomment the below line. */
                      // thisCtx.fillText(model.label, model.x + x, model.y + y);
                      // thisCtx.fillText(dataset.data[i] + percent, model.x + x,
                      //   model.y + y + (textSize * 1.3));

                      if (dataset.data[i] != 0 && doughnutSectorArea > 800) {
                        thisCtx.fillText(
                          percent,
                          model.x + x,
                          model.y + y + textSize * 1.3
                        );
                      }
                    }
                  });
                },
              },
            },
          }
        );
      });

    this.chartArray = chartArray;

    // let dynamicDoughnut: Chart;
    // dynamicDoughnut  = new Chart(`${val.id}`, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
    //     datasets: [
    //       {
    //         data: val.data,
    //         backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
    //         fill: false
    //       },
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //   }
    // });
  }

  downloadTableData() {
    this.downloadInput.csv = true;
    this._loaderService.showLoader();
    try {
      this.nationalService
        .DownloadNationalTableData(
          this.downloadInput,
          this.downloadInputEndPoint
        )
        .subscribe((res: any) => {
          this._loaderService.stopLoader();
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(
            blob,
            `${this.downloadInputEndPoint.toLocaleUpperCase()} Data.xlsx`
          );
        });
    } catch (err) {
      this._loaderService.stopLoader();
    }
  }
}

function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
}
