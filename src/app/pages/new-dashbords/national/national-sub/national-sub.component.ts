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
  barChartsLabels;
  doughnutLabels = [
    {
      name: "Revenue Grants, Contributions & Subsidies",
      color: "#1E44AD",
    },
    {
      name: "Interest earned",
      color: "#25C7CE",
    },
    {
      name: "Fee & User Charges",
      color: "#585FFF",
    },
    {
      name: "Income from Investment",
      color: "#FFD72E",
    },
    {
      name: "Sale & Hire charges",
      color: "#22A2FF",
    },
    {
      name: "Others",
      color: "#FF608B",
    },
    {
      name: "Tax Revenue",
      color: "#FF608B",
    },
    {
      name: "Other Income",
      color: "#FF608B",
    },
    {
      name: "Rental Income from Municipal Properties",
      color: "#FF608B",
    },
    {
      name: "Assigned Revenues & Compensation",
      color: "#a572b5",
    },
  ];
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
      data: [40, 20, 15],
      chart: [],
    },
    {
      id: "t2",
      title: "Municipality",
      data: [40, 20, 15],
      chart: [],
    },
    {
      id: "t3",
      title: "Town Panchayat",
      data: [10, 10, 5],
      chart: [],
    },
  ];
  revnueData: any;

  showLoader: boolean = false;
  revnueChartData: any;
  financialYearList: any = [];
  nationalDoughnutChart: any = [];
  nationalDoughnutChartLabel: any = [];
  colorArray = [
    "#FFD72E",
    "black",
    "red",
    "#a572b5",
    "#1E44AD",
    "#25C7CE",
    "#a572b5",
    "#585FFF",
    "#0c302f",
    "#22A2FF",
    "#FF608B",
  ];

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

  getCurrentTabValue() {
    console.log(this.activetab);
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
      if (this.popBtn) {
        this.RevenueMixInput.formType = "populationCategory";
      }
      if (!this.popBtn) {
        this.RevenueMixInput.formType = "ulbType";
      }
    }
    if (this.activetab == "Total Revenue") {
      this.nationalInput.type = "totalRevenue";

      this.getNationalTableData("revenue");
    } else if (this.activetab == "Revenue Mix ") {
      this.RevenueMixInput.type = "revenueMix";
      this.getRevenueMixData(this.RevenueMixInput, "revenue");
    } else if (this.activetab == "Total Expenditure") {
      this.nationalInput.type = "totalExpenditure";
      this.getNationalTableData("expenditure");
    } else if (this.activetab == "Expenditure Mix") {
      this.RevenueMixInput.type = "expenditureMix";
      this.getRevenueMixData(this.RevenueMixInput, "expenditure");
    } else if (this.activetab == "Deficit or Surplus") {
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
      // this.RevenueMixInput.type = "deficitOrSurplus";
      this.nationalInput.type = "deficitOrSurplus";

      this.getNationalTableData("expenditure");
      // this.getRevenueMixData(this.RevenueMixInput, "expenditure");
    } else if (this.activetab == "Total Own Revenue") {
      this.nationalInput.type = "totalOwnRevenue";
      this.getNationalTableData("own-revenue");
    } else if (this.activetab == "Own Revenue Mix ") {
      this.RevenueMixInput.type = "OwnrevenueMix";
      this.getRevenueMixData(this.RevenueMixInput, "own-revenue");
    } else if (this.activetab == "Capital Expenditure") {
      this.totalRevenue = true;
      this.mixRevenue = false;
      this.tableView = true;
      this.graphView = false;
      this.nationalInput.type = "totalCapexpense";
      this.getNationalTableData("capital-expenditure");
    }
  }

  // getActiveTab(value) {}

  destroyMultipleCharts() {
    // debugger;
    for (const chartData of this.chartArray) {
      if (chartData?.chart) {
        chartData?.chart.destroy();
      }
    }
  }
  selectFinancialYear(event) {
    console.log("this.currntHeadTab==>", this.CurrentHeadTab);
    this.nationalInput.financialYear = event.target.value;
    this.destroyMultipleCharts();
    // this.getNationalTableData(this.CurrentHeadTab);
    this.RevenueMixInput.financialYear = event.target.value;
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
    this.nationalService
      .getNationalRevenueMixData(revenueMixInput, endPoint)
      .subscribe((res: any) => {
        // debugger;
        this._loaderService.stopLoader();

        if (res?.data) {
          if (revenueMixInput.formType == "populationCategory") {
            this.createDoughnutChartOptions(res?.data);
            this.nationalDoughnutChart = Object.values(res?.data?.national);
            this.nationalDoughnutChartLabel = Object.keys(res?.data?.national);
            this.multipleDoughnutChartLabel = Object.keys(
              res?.data?.individual["1M-4M"]
            );
            this.mixRDoughnutPopulationCategory.forEach((elem) => {
              let particularObject = res?.data?.individual[elem?.title];
              if (particularObject) {
                elem.data = Object.values(particularObject);
              }
            });

            this.dynamicDoughnutChartInit(this.mixRDoughnutPopulationCategory);
            this.doughnutChartInit();
          }
          if (revenueMixInput.formType == "ulbType") {
            this.createDoughnutChartOptions(res?.data);
            this.nationalDoughnutChart = Object.values(res?.data?.national);
            this.nationalDoughnutChartLabel = Object.keys(res?.data?.national);
            this.multipleDoughnutChartLabel = Object.keys(
              res?.data?.individual["Municipal Corporation"]
            );
            this.mixRDoughnutUlbType.forEach((elem) => {
              let particularObject = res?.data?.individual[elem?.title];
              if (particularObject) {
                elem.data = Object.values(particularObject);
              }
            });
            this.dynamicDoughnutChartInit(this.mixRDoughnutUlbType);
            this.doughnutChartInit();
          }

          this.doughnutLabels.forEach((elem, i) => {
            elem.name = this.nationalDoughnutChartLabel[i];
            elem.color = this.colorArray[i];
          });
        }
      });
  }
  getNationalTableData(endPoint) {
    this.showLoader = true;
    try {
      this.nationalService
        .getNationalRevenueData(this.nationalInput, endPoint)
        .subscribe((res: any) => {
          this.showLoader = false;
          this.tableData = res?.data;
          // this.dataAvailabilityvalue = res?.dataAvailability;

          this.creatBarChartData(this.selectedGraphValue);
        });
    } catch (err) {
      this.showLoader = false;
    }
  }

  ngOnChanges(changes: SimpleChange) {
    console.log("currentUrl===>", this.router.url);
  }
  ngOnInit(): void {
    this.nationalMapService.currentSubTab.subscribe((res) => {
      this.activetab = res?.data;
      this.CurrentHeadTab = res?.HeadTab
        ? res?.HeadTab
        : this.barGraphDropdown[0].code;
      this.barChartOptions = this.barGraphDropdown.filter(
        (item) => item.code == this.CurrentHeadTab
      );
      this.selectedGraphValue = this.barChartOptions[0]?.value;
      this.getCurrentTabValue();
    });
    this.getCurrentTabValue();
    this.getFinancialYearList();
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
    this.subFilterFn("popCat");
  }

  activeTabFn(item) {
    this.aboutTab = item?.subHeaders[0]?.mainContent[0]?.about;
    // this.router.navigate([`dashboard/national/${item._id}`]);
  }

  getFinancialYearList() {
    this.nationalMapService.getNationalFinancialYear().subscribe((res: any) => {
      this.financialYearList = res?.data?.FYs;
    });
  }

  creatBarChartData(value) {
    // let newValue;
    if (this.CurrentHeadTab.toLowerCase() == "revenue") {
      this.newValue =
        value.toLowerCase() == "revenue" ? "revenue" : "revenuePerCapita";
    } else if (this.CurrentHeadTab.toLowerCase() == "expenditure") {
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
      this.newValue =
        value.toLowerCase() == "capexpense"
          ? "Capexpense"
          : "CapexpensePerCapita";
    }
    console.log("newValue==>", this.newValue);
    // this.yAxesLabel = this.newValue;

    if (this.tableData)
      this.revnueChartData = this.tableData?.rows?.map((elem) => {
        return parseInt(elem[this.newValue]);
      });

    this.revnueChartData = this.revnueChartData.slice(1);
    console.log("this.revenueChartData", this.revnueChartData, this.newValue);
    this.barChartInit();
  }

  selectGraphMode(event) {
    this.selectedGraphValue = event.target.value;

    this.creatBarChartData(this.selectedGraphValue);
  }

  getSelectedvalue(value) {
    this.nationalInput.stateId = value?._id;
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

      if (this.totalRevenue) {
        this.barChartsLabels = [
          "<100k",
          "100K-500K",
          "500K-1M",
          "1M-4M",
          "4M+",
        ];
        if (this.graphView) {
          this.barChartInit();
        }
      }
    }
    if (type == "ulbType") {
      this.popBtn = false;
      // debugger;
      this.nationalInput.formType = "ulbType";
      this.RevenueMixInput.formType = "ulbType";

      this.doughnutArray = this.mixRDoughnutUlbType;
      // if (!this.totalRevenue) {
      //   this.getRevenueMixData(this.RevenueMixInput);
      //   this.dynamicDoughnutChartInit(this.doughnutArray);
      // }
      if (this.totalRevenue) {
        this.barChartsLabels = [
          "Municipal Corporation",
          "Municipality",
          "Town Panchayat",
        ];
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
    let newLabel =
      this.newValue.charAt(0).toUpperCase() +
      this.newValue
        .slice(1)
        .split(/(?=[A-Z])/)
        .join(" ");
    this.yAxesLabel = newLabel;
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.yAxesLabel)
      this.chart = new Chart("canvas", {
        type: "bar",
        data: {
          labels: this.barChartsLabels,
          datasets: [
            {
              // label: "Average",
              data: this.revnueChartData,
              backgroundColor: "#456EDE",
              borderWidth: 1,
              barThickness: 40,
            },
            {
              type: "line",
              label: "Average",
              data: [80, 80, 80, 80, 80, 80],
              fill: false,
              borderColor: "rgb(54, 162, 235)",
            },
          ],
        },
        options: {
          legend: {
            position: "bottom",
            display: false,
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
      options: this.doughnutChartOptions,
    });
  }

  dynamicDoughnutChartInit(chartArray) {
    let canvasCharts = this.allMyCanvas._results; // Get array with all canvas
    canvasCharts.map((myCanvas, i) => {
      // For each canvas, save the chart on the charts array
      chartArray[i].chart = new Chart(myCanvas.nativeElement.getContext("2d"), {
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
        options: this.doughnutChartOptions,
      });
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
}
