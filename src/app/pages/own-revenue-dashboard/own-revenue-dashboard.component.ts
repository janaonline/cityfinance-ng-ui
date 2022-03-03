import { I } from "@angular/cdk/keycodes";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  HostListener,
  AfterContentInit,
  AfterViewInit,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import * as fileSaver from "file-saver";

import Chart from "chart.js";
import { FilterModelBoxComponent } from "../resources-dashboard/filter-model-box/filter-model-box.component";
import { OwnRevenueService } from "./own-revenue.service";
import { GlobalLoaderService } from "../../../app/shared/services/loaders/global-loader.service";
@Component({
  selector: "app-own-revenue-dashboard",
  templateUrl: "./own-revenue-dashboard.component.html",
  styleUrls: ["./own-revenue-dashboard.component.scss"],
})
export class OwnRevenueDashboardComponent implements OnInit {
  barChartCmpBtn = true;
  displayDoughnut: boolean = true;
  displayButtons: boolean = false;
  ownTab = true;
  proTab = false;
  barChartTitle = "";
  dataAvailable = 0;
  lastBarChartValue;
  compareDialogType = 2;
  changeTab(type) {
    this._loaderService.showLoader();
    if (type == "own") {
      this.displayDoughnut = true;
      this.displayButtons = false;
      this.ownTab = true;
      this.proTab = false;
    }
    if (type == "pro") {
      this.displayDoughnut = false;
      this.displayButtons = true;
      this.ownTab = false;
      this.proTab = true;
    }
    this.allCalls();
  }

  isLoading: any = false;

  @ViewChild("ownRevenueFiltersPopup")
  private ownRevenueFiltersPopup: TemplateRef<any>;
  sticky: boolean = false;
  ToggleString: string = "";
  showButton: boolean = true;
  @HostListener("window:scroll", ["$event"])
  doSomething(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    // console.log("Scroll Event", window.pageYOffset);
    if (window.pageYOffset > 354) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  close() {
    this.ToggleString = "";
    this.showButton = true;
  }
  open() {
    this.ToggleString =
      "the year YY. Data is not available for AA, BB and CC Municipal Corporation. For more details, download thecomplete set of ULBs for which the data is available for the year YY.";
    this.showButton = false;
  }

  // Dummy data for table
  columnAttribute = [
    { id: 1, title: "ULB Population Category" },
    { id: 2, title: "Weighted average Own Revenue (In Crore Rs.)" },
    { id: 3, title: "Median Own Revenue per Capita (INR)" },
    {
      id: 4,
      title: "Weighted average Own Revenues as percentage of Revenue Expenditure",
    },
    {
      id: 5,
      title: "Percentage of cities where Own Revenues meet Revenue Expenditure",
    },
 
  ];

  columnAttributeProperty = [
    { id: 1, title: "ULB Population Category" },
    { id: 2, title: "Weighted average Property Tax Revenue Collections (In Crore Rs.)" },
    { id: 3, title: "Median Property Tax Revenue per Capita" },
    {
      id: 4,
      title: "Weighted average Property Tax Revenue as percentage of Own Revenu",
    },
  ];

  users = [
    {
      id: 1,
      name: "4 Million+",
      averageRevenue: "0",
      perCapita: "0",
      meetsRevenue: "0",
      avgRevenueMeet: "0",
    },
    {
      id: 2,
      name: "1 Million - 4 Million",
      averageRevenue: "0",
      perCapita: "0",
      meetsRevenue: "0",
      avgRevenueMeet: "0",
    },
    {
      id: 3,
      name: "500 Thousand - 1 Million",
      averageRevenue: "0",
      perCapita: "0",
      meetsRevenue: "0",
      avgRevenueMeet: "0",
    },
    {
      id: 4,
      name: "100 Thousand-500 Thousand",
      averageRevenue: "0",
      perCapita: "0",
      meetsRevenue: "0",
      avgRevenueMeet: "0",
    },
    {
      id: 5,
      name: "<100 Thousand",
      averageRevenue: "0",
      perCapita: "0",
      meetsRevenue: "0",
      avgRevenueMeet: "0",
    },
  ];

  doughnutChartId = `ownRevenue-doughnutChart`;
  barChartId = `ownRevenue-barChart`;

  doughnutChartData = {
    type: "doughnut",
    data: {
      labels: [
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "rgba(30, 68, 173, 1)",
            "rgba(37, 199, 206, 1)",
            "rgba(88, 95, 255, 1)",
            "rgba(255, 215, 46, 1)",
            "rgba(34, 162, 255, 1)",
            "rgba(255, 96, 139, 1)",
            "rgba(25, 229, 158, 1)",
          ],
          fill: false,
        },
      ],
    },
  };
  doughnutChartOptions = {
    maintainAspectRatio: false,
    cutoutPercentage:50,
    responsive: true,
   
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle:'rect',
        padding: 35,
        boxWidth: 20,
        boxHeight: 23,
        fontSize: 15,

      },
      onClick: (e) => e.stopPropagation()
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
        	var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
          return percentage + "%";
        }
      }
    }
  };
  doughnutChartTitle =
    "The following pie chart provides the split of the contribution of various own revenue per capita streams to the total own revenue.";



  barChartData = barChart;
  barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        maxBarThickness: 60,
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
         labelString:"Amount in crores"
        },
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          }   
      }]
  },
  
      legend: {
        display: false,
      }
  };

  allUlbData = JSON.parse(localStorage.getItem("ulbList")).data;
  stateIds = JSON.parse(localStorage.getItem("stateIdsMap"));

  filterGroup = new FormGroup({
    stateId: new FormControl("State Name"),
    ulb: new FormControl("ULB Name"),
    ulbType: new FormControl("ULB Type"),
    populationCategory: new FormControl(""),
    financialYear: new FormControl("2020-21"),
  });

  ulbList = [];
  ulbTypeList = [];
  populationCategoryList = [
    "4 Million+",
    "500 Thousand - 1 Million",
    "100 Thousand - 500 Thousand",
    "1 Million - 4 Million",
    "200 Thousand - 500 Thousand",
  ];

  yearList = ["2018-19", "2019-20", "2020-21", "2021-22"];
  //Table Data Ends

  @Input()
  cardData = [
    revenueCollection,
    revenuePerCapita,
    revenuePercentage,
    revenueExpenditure,
    
  ];

  body: any;
  financialYear: any;
  constructor(
    private ownRevenueService: OwnRevenueService,
    private dialog: MatDialog,
    public _loaderService: GlobalLoaderService
  ) {
    this.isLoading = true;
    console.log("loader", this.isLoading);
    // if(this.isLoading)(document.activeElement as HTMLElement).blur();
  }

  ngOnInit(): void {
    this.filterGroup.valueChanges.subscribe((value) => {
      console.log(value);
      if (value.stateId) {
        for (const key in this.allUlbData) {
          const element = this.allUlbData[key];
          if (element._id == value.stateId) {
            this.ulbList = element.ulbs;
            break;
          }
        }
      }
      this.allCalls();
    });
    window.scrollTo(0, 0);
this.getYearList();
    this.createDataForFilter();
    this.getBarChartData();
    this.barChartTitle =
      "You can compare states on various financial indicators";

    this.allCalls();
    window.onload = () => {
      this.createBarChart()
    }
  }

  allCalls() {
    this.getPieChartData();
    this.cardsData();
    this.tableData();
    this.getAvailableData();
    this.getYearList();
    this.getBarChartData()
  }

  getYearList(){
    this.body = {
      ...this.filterGroup.value,
      propertyTax: !this.ownTab,
    };

    this.ownRevenueService.getYearList(this.body).subscribe(
      (res) => {
        // this._loaderService.stopLoader()
      let data = res['data']
      this.yearList =[]
      data.forEach(el=>{
       this.yearList.push(el._id) 
      })
      },
      (err) => {
        console.log("error", err);
      }
    );
  }
  clearFilter() {
    this.filterGroup.setValue({
      stateId: "State Name",
      ulb: "ULB Name",
      ulbType: "ULB Type",
      populationCategory: "ULB Population Category",
      financialYear: "2020-21",
    });
  }
  pieChartLoading = true;
  chartDataNotFound = false
  getPieChartData() {
    this.pieChartLoading = true;
    let temp = {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
      
            data: [],
            backgroundColor: [
              "rgba(30, 68, 173, 1)",
              "rgba(37, 199, 206, 1)",
              "rgba(88, 95, 255, 1)",
              "rgba(255, 215, 46, 1)",
              "rgba(34, 162, 255, 1)",
              "rgba(255, 96, 139, 1)",
              "rgba(25, 229, 158, 1)",
            ],
            fill: false,
          },
        ],
      },
    };
    this.ownRevenueService
      .getPieChartData(this.filterGroup.getRawValue())
      .subscribe(
        (res) => {
          if(res['data'][0]['amount'] == null && !res['data'][1]  ){
            this.chartDataNotFound = true
          }
          res["data"].map((value) => {
            temp.data.labels.push(value._id["revenueName"]);
            temp.data.datasets[0].data.push(value.amount);
            this.isLoading = false;
            this.pieChartLoading = false;
          });
          this.doughnutChartData = temp;
        },
        (err) => {
          this.pieChartLoading = false;
          this.isLoading = false;
        }
      );
  }
  myBarChart
  createBarChart(){
if(this.myBarChart){
 this.myBarChart.destroy();
}
      //dom is fully loaded, but maybe waiting on images & css files
      window.onload = function() {
      const canvas = <HTMLCanvasElement>document.getElementById("ownRevenue-barChart");
      const ctx = canvas.getContext("2d");
      let data: any = this.barChartData
        this.myBarChart = new Chart(ctx, {
          type: "bar",
          data: data,
        });
      }
   
 


 
   
  
  
   
  }

  createDataForFilter() {
    for (const key in this.allUlbData) {
      const element = this.allUlbData[key];
      element.ulbs.map((value) => {
        this.ulbList.push(value);
      });
    }

    this.ownRevenueService.getULBTypeList().subscribe(
      (res) => {
        console.log(res, "getULBTypeList");
        this.ulbTypeList = res["data"];
      },
      (error) => {}
    );
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterModelBoxComponent, {
      width: "100%",
      height: "100%",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
  notFoundNames = [];
  getAvailableData() {
    this.body = {
      ...this.filterGroup.value,
      propertyTax: !this.ownTab,
    };

    this.ownRevenueService.displayDataAvailable(this.body).subscribe(
      (res) => {
        // this._loaderService.stopLoader()
        res["data"].percent = parseFloat(res["data"].percent.toFixed(2));
        this.financialYear = res;
        this.halfDoughnutChart(res["data"]?.percent ?? 0);
        this.notFoundNames = res["data"]?.names;
        console.log("ordResponse", res);
      },
      (err) => {
        console.log("error", err);
      }
    );
  }
tempDataHolder: any
  barChartCompValues(value) {
    this.tempDataHolder = value
    console.log(value, "barChartCompValues");
    this.getBarChartData(value);
  }
  barChartNotFound = false
  getBarChartData(
    bodyD = {
      list: [],
      param: "Own Revenue per Capita",
      type:"state"
    }
  ) {
    this.body = {
      ...this.filterGroup.value,
      propertyTax: !this.ownTab,
    };
    Object.assign(bodyD, this.body)
    this.lastBarChartValue = bodyD;
    let labelStr=""
   
      this.ownRevenueService.displayBarChartData(bodyD).subscribe(
        (res) => {
         
          this.barChartNotFound = false
          let tempData = {
            type: "bar",
            data: {
  
              labels: [],
              datasets: [
                {
                  label: bodyD.param,
                  data: [],
                  borderRadius: 15,
                  borderWidth: 1,
                  backgroundColor: [
                    "rgba(30, 68, 173, 1)",
                    "rgba(34, 76, 192, 1)",
                    "rgba(37, 83, 211, 1)",
                    "rgba(51, 96, 219, 1)",
                    "rgba(69, 110, 222, 1)",
                    "rgba(88, 125, 225, 1)",
                    "rgba(106, 139, 229, 1)",
                    "rgba(134, 162, 237, 1)",
                    "rgba(147, 170, 234, 1)",
                    "rgba(168, 188, 240, 1)",
                    "rgba(79, 223, 76, 1)",
                  ],
                },
              ],
            },
            options:{
              interaction:{
                mode:'nearest'
              },
              scales: {
                xAxes: [{
                  maxBarThickness: 60,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "Amount"
                  },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }   
                }]
            },
            }
          };
          tempData.options.scales.yAxes[0].scaleLabel.display = true
          tempData.options.scales.yAxes[0].scaleLabel.labelString = "Percentage (%)"
          res["data"].map((value) => {
            // let stateName = this.stateIds[value._id];
            tempData.data.labels.push(value.name);
            // if(this.tempDataHolder){
            //   if(this.tempDataHolder['param'] == 'Own Revenue as a percentage of Revenue Expenditure' ){
            //     tempData.data.datasets[0].data.push((Number(value.amount).toFixed(2)));
            //     tempData.options.scales.yAxes[0].scaleLabel.labelString ="Percentage (%)"
            //   }  else if(this.tempDataHolder['param'] == "Own Revenue"){
            //     tempData.data.datasets[0].data.push((Number(value.amount/10000000).toFixed(2)));
            //     tempData.options.scales.yAxes[0].scaleLabel.labelString ="Amount in Crores"
            //   }else if(this.tempDataHolder['param'] == 'Own Revenue per Capita' ){
            //     tempData.data.datasets[0].data.push((Number(value.amount).toFixed(2)));
            //     tempData.options.scales.yAxes[0].scaleLabel.labelString ="Amount in INR"
            //   }else{
            //     tempData.data.datasets[0].data.push((Number(value.amount).toFixed(2)));
            //     tempData.options.scales.yAxes[0].scaleLabel.labelString ="Amount in INR"

            //   }
           
            // }

                tempData.data.datasets[0].data.push((Number(value.amount).toFixed(2)));
               
            
          });
          // bodyD.list.map((value) => {
          //   if (!res["data"].find((innerValue) => innerValue._id == value)) {
          //     let stateName = this.stateIds[value];
          //     tempData.data.labels.push(stateName);
          //     tempData.data.datasets[0].data.push(0);
          //   }
          // });
          console.log(tempData)
          this.barChartData = tempData;
        
          
            
       
          
        },
        (err) => {
          this.barChartNotFound = true
        }
      );
 
   
  }

  halfDoughnutChart(valueFromApi = null) {
    this.dataAvailable = valueFromApi;
    const canvas = <HTMLCanvasElement>document.getElementById("myChart1");
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "Availability",
            borderWidth: 0,
            data: [valueFromApi, 100 - valueFromApi],
            backgroundColor: ["rgba(51, 96, 219, 1)", "rgba(218, 226, 253, 1)"],
          },
        ],
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
          display: false,
        },
        cutoutPercentage: 75,
      },
    });
  }
  cardsDataLoading = true;
  cardsData() {
    this.cardsDataLoading = true;
    let body = {
      ...this.filterGroup.value,
      property: this.proTab,
    };
    this.ownRevenueService.getCardsData(body).subscribe(
      (res) => {
        this._loaderService.stopLoader();
        this.cardsDataLoading = false;
        console.log(res);
        if (this.ownTab) {
          this.ownTabCardsFormant(res["data"]);
        } else {
          this.proTabCardsFormat(res["data"]);
        }
      },
      (err) => {
        this._loaderService.stopLoader();
        this.cardsDataLoading = false;
        console.log(err);
      }
    );
  }

  ownTabCardsFormant(data) {
    let yearInData = Object.keys(data);
    let revenueCollectionCopy = deepCopy(revenueCollection),
      revenuePerCapitaCopy = deepCopy(revenuePerCapita),
      revenueExpenditureCopy = deepCopy(revenueExpenditure),
      revenuePercentageCopy = deepCopy(revenuePercentage),
      value = data[this.filterGroup.value.financialYear];

    revenueCollectionCopy.isLoading = this.cardsDataLoading;
    revenuePerCapitaCopy.isLoading = this.cardsDataLoading;
    revenueExpenditureCopy.isLoading = this.cardsDataLoading;
    revenuePercentageCopy.isLoading = this.cardsDataLoading;

    revenueCollectionCopy.title = valueConvert(value.totalRevenue) ?? 0;
    revenuePerCapitaCopy.title = "INR " + value.perCapita.toFixed(2) ?? 0;
    revenuePercentageCopy.title = (value.percentage.toFixed(2) ?? "0") + " %";
    revenueExpenditureCopy.title = value.totalUlbMeetExpense ?? 0;

    if (yearInData[1]) {
      let oldYearValue =
        data[
          this.filterGroup.value.financialYear
            .split("-")
            .map((value) => Number(value) - 1)
            .join("-")
        ];

      let t = this.compareValues(oldYearValue.totalRevenue, value.totalRevenue);
      revenueCollectionCopy.percentage = t.num.toFixed(2);
      revenueCollectionCopy.svg = t.inc ? upArrow : downArrow;
      revenueCollectionCopy.color = t.inc ? green : red;

      t = this.compareValues(oldYearValue.perCapita, value.perCapita);
      revenuePerCapitaCopy.percentage = t.num.toFixed(2);
      revenuePerCapitaCopy.svg = t.inc ? upArrow : downArrow;
      revenuePerCapitaCopy.color = t.inc ? green : red;

      t = this.compareValues(oldYearValue.percentage, value.percentage);
      revenuePercentageCopy.percentage = t.num.toFixed(2);
      revenuePercentageCopy.svg = t.inc ? upArrow : downArrow;
      revenuePercentageCopy.color = t.inc ? green : red;

      t = this.compareValues(
        oldYearValue.totalUlbMeetExpense,
        value.totalUlbMeetExpense
      );
      revenueExpenditureCopy.percentage = t.num.toFixed(2);
      revenueExpenditureCopy.svg = t.inc ? upArrow : downArrow;
      revenueExpenditureCopy.color = t.inc ? green : red;
    }

    this.cardData = [
      revenueCollectionCopy,
      revenuePerCapitaCopy,
      revenuePercentageCopy,
      revenueExpenditureCopy,
  
    ];
  }

  compareValues(oldValue, newValue, inc = true) {
    inc = newValue >= oldValue;

    return { num: ((newValue - oldValue) / oldValue) * 100, inc };
  }

  proTabCardsFormat(data) {
    let value = data[this.filterGroup.value.financialYear];
    let cards = deepCopy(porpertyCards);
    cards[0].title = valueConvert(value.totalProperty) ?? 0;
    cards[1].title =
      "INR " + (value.totalProperty / value.population).toFixed(2) ?? 0;
    cards[2].title =
      (
        (value.totalProperty / (value.totalRevenue - value.totalProperty)) *
        100
      ).toFixed(2) + "%";
    let yearInData = Object.keys(data);
    if (yearInData[1]) {
      let oldYearValue =
        data[
          this.filterGroup.value.financialYear
            .split("-")
            .map((value) => Number(value) - 1)
            .join("-")
        ];

      let t = this.compareValues(
        oldYearValue.totalProperty,
        value.totalProperty
      );
      cards[0].percentage = t.num.toFixed(2);
      cards[0].svg = t.inc ? upArrow : downArrow;
      cards[0].color = t.inc ? green : red;

      t = this.compareValues(
        oldYearValue.totalProperty / oldYearValue.population,
        value.totalProperty / value.population
      );
      cards[1].percentage = t.num.toFixed(2);
      cards[1].svg = t.inc ? upArrow : downArrow;
      cards[1].color = t.inc ? green : red;

      t["num"] =
        (value.totalProperty / (value.totalRevenue - value.totalProperty)) *
          100 -
        (oldYearValue.totalProperty /
          (oldYearValue.totalRevenue - oldYearValue.totalProperty)) *
          100;

      let newr =
        (value.totalProperty / (value.totalRevenue - value.totalProperty)) *
        100;
      let old =
        (oldYearValue.totalProperty /
          (oldYearValue.totalRevenue - oldYearValue.totalProperty)) *
        100;
      t["inc"] = newr >= old;
      cards[2].percentage = t.num.toFixed(2);
      cards[2].svg = t.inc ? upArrow : downArrow;
      cards[2].color = t.inc ? green : red;
    }

    this.cardData = cards;
  }
  tableDataLoading = true;
  tableData() {
    this.tableDataLoading = true;
    this.ownRevenueService.getTableData(this.filterGroup.value).subscribe(
      (res) => {
        this.tableDataLoading = false;
        if (this.proTab) this.columnAttribute = this.columnAttributeProperty;
        this.users = this.users.map((value) => {
          let data = res["data"][value.name];
          if (this.ownTab) {
            value.meetsRevenue = numCheck(
              (data.numOfUlbMeetRevenue)
            );
            if (data.totalExpense > 0) {
              value.avgRevenueMeet = numCheck(
                (data.percentage)
              );
            } else {
              value.avgRevenueMeet = "0";
            }
            if (data.totalRevenue > 0) {
              value.averageRevenue = numCheck(
                data.totalRevenue
              );
            } else {
              value.averageRevenue = "0";
            }
            if (data.population > 0) {
              value.perCapita = numCheck(
                (data.perCapita)
              );
            } else {
              value.perCapita = "0";
            }
          } else {
            value.averageRevenue = data.totalProperty.toFixed(2);
            if (data.population > 0) {
              value.perCapita = (data.totalProperty / data.population).toFixed(
                2
              );
            } else {
              value.perCapita = "0";
            }
            if (data.totalRevenue > 0) {
              value.avgRevenueMeet = (
                (data.totalProperty /
                  (data.totalRevenue - data.totalProperty)) *
                100
              ).toFixed(2);
            } else {
              value.avgRevenueMeet = "0";
            }
            delete value.meetsRevenue;
          }
          return value;
        });
      },
      (error) => {
        this.tableDataLoading = false;
      }
    );
  }

  headerActions = [
    {
      name: "download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    // {
    //   name: "share/embed",
    //   svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    // },
  ];

  downloadCSV(from) {
    if (from == "topPerformance") {
      let body = {
        csv: true,
        ...this.lastBarChartValue,
      };
      this.ownRevenueService.displayBarChartData(body).subscribe(
        (res: any) => {
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);

          fileSaver.saveAs(blob, "dataAvaliable.xlsx");
        },
        (err) => {}
      );
    } else {
      let body = {
        csv: true,
        ...this.filterGroup.value,
      };
      this.ownRevenueService.displayDataAvailable(body).subscribe(
        (res: any) => {
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);

          fileSaver.saveAs(blob, "dataAvaliable.xlsx");
        },
        (error) => {}
      );
    }
  }
}

function valueConvert(value) {
  return (value / 10000000).toFixed(2) + " Cr";
}

function numCheck(value) {
  if (isNaN(value)) return "0";
  return value.toFixed(2);
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

const revenueCollection = {
  type: "5",
  title: "0 Cr",
  isLoading: true,
  subTitle: "Own Revenue",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "0%",
  color: "#22C667",
};

const revenuePerCapita = {
  type: "5",
  title: "0 Cr",
  isLoading: true,
  subTitle: "Own Revenue per Capita",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "0%",
  color: "#22C667",
};

const revenueExpenditure = {
  type: "5",
  title: "0",
  isLoading: true,
  subTitle: "Cities where Own Revenue meet Revenue Expenditure",
  svg: "../../../assets/resources-das/south_west_red_24dp.svg",
  percentage: "0%",
  color: "#E64E4E",
};

const revenuePercentage = {
  type: "5",
  title: "0%",
  isLoading: true,
  subTitle: "Own Revenue as a percentage of Revenue Expenditure",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "0%",
  color: "#22C667",
};

function openOwnRevenuePopup() {
  throw new Error("Function not implemented.");
}

let barChart = {
  type: "bar",
  data: {
    labels: [
      
    ],
    datasets: [
      {
        data: [],
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: [
          "rgba(30, 68, 173, 1)",
          "rgba(34, 76, 192, 1)",
          "rgba(37, 83, 211, 1)",
          "rgba(51, 96, 219, 1)",
          "rgba(69, 110, 222, 1)",
          "rgba(88, 125, 225, 1)",
          "rgba(106, 139, 229, 1)",
          "rgba(134, 162, 237, 1)",
          "rgba(147, 170, 234, 1)",
          "rgba(168, 188, 240, 1)",
        ],
      },
    ],
  },
};

const porpertyCards = [
  {
    type: "5",
    title: "0",
    subTitle: "Property Tax Revenue",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "0%",
    color: "#22C667",
  },
  {
    type: "5",
    title: "0",
    subTitle: "Property Tax Revenue per Capita",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "0%",
    color: "#22C667",
  },
  {
    type: "5",
    title: "0",
    subTitle: "Property Tax to Own Revenue percentage",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "0%",
    color: "#22C667",
  },
];

const green = "#22C667";
const red = "#E64E4E";
const upArrow = "../../../assets/resources-das/north_east_green_24dp.svg";
const downArrow = "../../../assets/resources-das/south_west_red_24dp.svg";
