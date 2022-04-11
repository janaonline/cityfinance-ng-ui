import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { ActivatedRoute } from "@angular/router";
import { StateFilterDataService } from "./state-filter-data.service";
import { FormControl } from "@angular/forms";
import { CommonService } from "../../services/common.service";
import { Observable } from "rxjs";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { OwnRevenueService } from "src/app/pages/own-revenue-dashboard/own-revenue.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import Chart from "chart.js";
@Component({
  selector: "app-state-filter-data",
  templateUrl: "./state-filter-data.component.html",
  styleUrls: ["./state-filter-data.component.scss"],
})

export class StateFilterDataComponent extends BaseComponent implements OnInit {

  stateId: any;
  revenueId: any;
  stateCode = JSON.parse(localStorage.getItem("ulbList")).data;
  ulbStateMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));

  nationalFilter = new FormControl();

  filteredOptions: Observable<any[]>;
  lastSelectedId: number = 0;
  ActiveButton: any;
  filterName = "revenue";
  tabName: any;
  headOfAccount = "Revenue";
  chartId = `stateSCharts-${Math.random()}`;
  financialYear: string = "";
  stateName: string;
  statesList: any;
  compareDialogType = 3;
  serviceTab;
  isPerCapita = false;

  serviceTabList:any = [];

  @Input() data;

  @Input() dounghnuChartLabels;

  @Input() stateServiceLabel;

  chartLabels = [];

  scatterData = {
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
          labels:['State Average'],
          showLine: true,
          fill: true,
          backgroundColor:"red",
          borderColor: "red",
        },
      ],
    },
  };

  doughnutData = {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#76d12c",
            "#ed8e3b",
            "#15c3eb",
            "#eb15e3",
            "#e6e21c",
            "#fc3d83",
          ],
          hoverOffset: 2,
        },
      ],
    },
  };
  doughnutChartOptions = {
    maintainAspectRatio: false,
    cutoutPercentage: 50,
    responsive: true,

    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "rect",
        padding: 35,
        boxWidth: 20,
        boxHeight: 23,
        fontSize: 15,
      },
      onClick: (e) => e.stopPropagation(),
    },

    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return percentage + "%";
        },
      },
    },
  };
  barData: any;
  // barData = {
  //   type: "bar",
  //   data: {
  //     labels: [
  //       "Nasik",
  //       "Mumbai",
  //       "Pune",
  //       "Nagpur",
  //       "Aurangabad",
  //       "Solapur",
  //       "Amravati",
  //       "Navi Mumbai",
  //       "Nagpur",
  //       "Thane",
  //     ],
  //     datasets: [
  //       {
  //         label: "City Ranking",
  //         data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 11],
  //         backgroundColor: [
  //           "#1E44AD",
  //           "#224CC0",
  //           "#2553D3",
  //           "#3360DB",
  //           "#456EDE",
  //           "#587DE1",
  //           "#6A8BE5",
  //           "#86A2ED",
  //           "#93AAEA",
  //           "#A8BCF0",
  //         ],
  //         borderColor: ["#1E44AD"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  // };
  bottomBarData = {
    type: "bar",
    data: {
      labels: [
        "Nasik",
        "Mumbai",
        "Pune",
        "Nagpur",
        "Aurangabad",
        "Solapur",
        "Amravati",
        "Navi Mumbai",
        "Nagpur",
        "Thane",
      ],
      datasets: [
        {
          label: "City Ranking",
          data: [13, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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

  BarGraphValue = true;

  headerActions = [
    {
      name: "Download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    {
      name: "Share/Embed",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    },
  ];

  checkBoxArray = [
    { value: 'national', title: "National Avg", isDisabled: false },
    { value: 'ulbType', title: "ULB Type Avg", isDisabled: false },
    { value: 'popCat', title: "Population Category Avg", isDisabled: false },
  ];

  stateUlbsPopulation: any = {
    "tableHeading": [],
    "tableDataSource": []
  };

  barChartOptions: any;
  barChartNotFound: boolean = false;
  // chartDropdownList = [
  //   {'name': 'Own Revenues', value: ["110", "130", "140", "150", "180"]},
  //   {'name': 'Assigned Revenue', value: ["120"]},
  //   {'name': 'Grants', value: ["160"]},
  //   {'name': 'Interest Income', value: ["171"]},
  //   {'name': 'Other Receipts', value: ["170", "100"]}
  // ];
  chartDropdownList: any;
  chartDropdownValue: any;
  chartTitle: string= 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
  selectedServiceLevelBenchmark: any; 
  nestedChartFilterOption: any = {
    showFinancialYear: false,
    showResetButton: false
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public stateFilterDataService: StateFilterDataService,
    private _commonServices: CommonService,
    public _loaderService: GlobalLoaderService,
    private ownRevenueService: OwnRevenueService,
    private snackbar: MatSnackBar,
  ) {
    super();
    this.getYears();
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

  showBarGraph() {
    this.BarGraphValue = true;
    console.log("this.BarGraphValue", this.BarGraphValue);
    if (this.stateServiceLabel) {
      this.getServiceLevelBenchmarkBarChartData();
    } else {
      this.getStateRevenue();
    }
  }

  showBottomGraph() {
    this.BarGraphValue = false;
    if (this.stateServiceLabel) {
      this.getServiceLevelBenchmarkBarChartData();
    } else {
      this.getStateRevenue();
    }
  }

  selectedRadioBtnValue: any;
  getCheckBoxValue(event: any) {
    console.log("checked Value", event);
    if (event && event.target && event.target.value) {
      this.selectedRadioBtnValue = event.target.value;
      // for (const item of this.checkBoxArray) {
      //   if (item.value != event.target.value) {
      //     item["isDisabled"] = true;
      //   }
      // }
      this.getScatterData();
    }
  }

  reset() {
    this.checkBoxArray = [
      { value: '', title: "Select an Option", isDisabled: true },
      { value: 'national', title: "National Avg", isDisabled: false },
      { value: 'ulbType', title: "ULB Type Avg", isDisabled: false },
      { value: 'popCat', title: "Population Category Avg", isDisabled: false },
    ];
    this.nationalFilter.patchValue("");
    let emptyArr: any = [];
    this.filteredOptions = emptyArr;
    this.ulbId = "";
    this.selectedRadioBtnValue = '';
    this.getYears();
    this.getScatterData();
    if (this.stateServiceLabel) {
      this.getServiceLevelBenchmarkBarChartData();
    } else {
      this.getStateRevenue();
    }
  }

  yearList: any;

  getYears() {
    if(this.stateServiceLabel){
this.stateFilterDataService.getYearListSLB().subscribe((res)=> {

  this.yearList = res['data']
}, (err)=> {
console.log(err.message)
})
    }else{
   // debugger;
    /**
     * below api was previously used but now new api is used to get the data of state wise FYs
     */
    // let body = {};
    // this.ownRevenueService.getYearList(body).subscribe((res) => {
    //   console.log("yearsResponse", res);
    //   this.yearList = res["data"];
    //   // this.financialYear = this.yearList[0];
    //   console.log("this.yearList", this.yearList);
    // });
    this.yearList = sessionStorage.getItem('financialYearList') ? JSON.parse(sessionStorage.getItem('financialYearList')) : [];
    console.log('sessionFY', this.yearList);
    if (this.yearList?.length) {
      this.financialYear = this.yearList[0];
      console.log('financial Year', this.financialYear);
    } else {
      this.showSnackbarMessage('No Financial year data found');
      return false;
    }
    }
 
  
  }

  getDropDownValue() {
    this.stateFilterDataService
      .getServiceDropDown(this.serviceTab)
      .subscribe((res: any) => {
        console.log("service dropdown data", res);
        this.serviceTabList = res?.data?.names;
        this.filterName = this.serviceTabList[0];
        this.getScatterData();
        this.getServiceLevelBenchmarkBarChartData();
      });
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
          labels:['State Average'],
          showLine: true,
          fill: false,
          backgroundColor:"red",
          borderColor: "red",
          },
        ],
      },
    };
  }

  initializeDonughtData() {
    this.doughnutData = {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#76d12c",
              "#ed8e3b",
              "#15c3eb",
              "#eb15e3",
              "#e6e21c",
              "#fc3d83",
            ],
            hoverOffset: 2,
          },
        ],
      },
    };
  }

  compType: any;
  multiChart = false;
  doughnutDataArr = [];
  getScatterData() {
    // debugger;
    this.multiChart = false;
    this._loaderService.showLoader();
    this.initializeScatterData();

    let payload = {
      [this.stateServiceLabel ? 'stateId' : 'state']: this.stateId,
      financialYear: this.financialYear,
      headOfAccount: this.stateServiceLabel ? undefined : this.headOfAccount,
      filterName: this.filterName,
      isPerCapita: this.isPerCapita,
      compareType: this.stateServiceLabel ? undefined : '',
      compareCategory: this.selectedRadioBtnValue, 
      ulb: this.ulbId,
    };
    let apiEndPoint = this.stateServiceLabel ? 'state-slb' : 'state-revenue';
    if (this.stateServiceLabel) {
      // payload = {...payload, "sortBy": this.BarGraphValue ? 'top10' : 'bottom10'}
      // apiEndPoint = 'state-slb';
    }
    console.log(payload);
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService.getScatterdData(payload, apiEndPoint).subscribe(
      (res) => {
        this.notfound = false;
        console.log("response data", res);
        //scatter plots center
        if (!this.filterName.includes("mix")) {
          this._loaderService.stopLoader();
          let mCorporation: any;
          let tp_data: any;
          let m_data: any;
          let stateData: any;
          if (this.stateServiceLabel) {
            this.setServiceLevelBenchmarkScatteredChartOption('Population', this.filterName);
            m_data = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["m_data"];
            mCorporation = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["mc_data"];
            tp_data = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["tp_data"];
            // stateData = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["stateAvg"][0]["average"];
            stateData = res['data'] && res['data']['scatterData'] && res['data']['scatterData']["stateAvg"] && res['data']['scatterData']["stateAvg"][0]&& res['data']['scatterData']["stateAvg"][0]["average"];
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
                obj.y = this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue);
                el.data.push(obj);
                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipal Corporation") {
              mCorporation.forEach((el2, index) => {
                obj.x = el2.population;
                obj.y = this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue);
                el.data.push(obj);

                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipality") {
              m_data.forEach((el2, index) => {
                obj = { x: 0, y: 0 };
                obj.x = el2.population;
                obj.y = this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(this.stateServiceLabel ? el2.value.toFixed(2) : el2.totalRevenue);
                el.data.push(obj);
                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "National Average") {
              // el["data"]["y"] = natData;
            

            } else if (el.label == "State Average") {
              let obje = [{ x: 0, y: 0 },{ x: 1200000, y: 0 }]
              obje.forEach(el2=>{
                el2['y'] = stateData

                el["data"].push(el2)
              })
       
             
            }
          });
          console.log(this.scatterData);
          this.generateRandomId("scatterChartId123");
          this.scatterData = { ...this.scatterData };
        } //donught charts center
        else if (this.filterName.includes("mix")) {
          this._loaderService.stopLoader();
          let data = res["data"];
          this.chartDropdownList = data;
          if (this.chartDropdownList?.length > 0) {
            this.getStateRevenue();
          }
          console.log('chartDropdownList', this.chartDropdownList)
          this.initializeDonughtData();
          if (payload.compareType == "") {
            if (data.length) {
              data.forEach((el) => {
                this.doughnutData.data.labels.push(el._id);
                this.doughnutData.data.datasets[0].data.push(el.amount);
              });
              console.log(this.doughnutData);

              this.doughnutData = { ...this.doughnutData };
            }
          } else if (payload.compareType == "ulbType") {
            let mData = res["mData"];
            let mcData = res["mcData"];
            let tpData = res["tpData"];
            this.multiChart = true;
            this.doughnutDataArr = [
              { mData: mData },
              { mcData: mcData },
              { tpData: tpData },
            ];
            this.doughnutDataArr = [...this.doughnutDataArr];
          }
        }
      },
      (err) => {
        this._loaderService.stopLoader();
        this.notfound = true;
        console.log(err.message);
      }
    );
  }

  generateRandomId(name) {
    let number = Math.floor(Math.random() * 100);
    let newId = number + name;
    return newId;
  }
  
  getSelectedFinancialYear(event) {
    this.financialYear = event.target.value;
    console.log("state financial year", this.financialYear);
    this.getScatterData();
    if (this.stateServiceLabel) {
      this.getServiceLevelBenchmarkBarChartData();
    } else {
      this.getStateRevenue();
    }
  }

  getServiceLevelBenchmark(event: any) {
    console.log('getServiceLevelBenchmark', event.target.value);
    if (event && event.target && event.target.value) {
      this.selectedServiceLevelBenchmark = event.target.value;
      this.filterName = this.selectedServiceLevelBenchmark;
      this.getScatterData();
      this.getServiceLevelBenchmarkBarChartData();
    }
  }

  filterChangeInChart(value) {
    // this.mySelectedYears = value.year;
    // this.getChartData(value);
    console.log("filterChangeInChart", value);
  }
  getCompType(e) {
    console.log(e);
    this.compType = e;
    if (e) this.getScatterData();
  }
  changeActiveBtn(i) {
    console.log(this.data.btnLabels[i], "activeBTN", this.financialYear);
    this.ActiveButton = this.data.btnLabels[i];
    this.lastSelectedId = i;

    // let id = `btn-${i}`;
    // if (this.lastSelectedId) {
    //   document
    //     .getElementById(this.lastSelectedId)
    //     ?.classList.remove("selected");
    //   document.getElementById(this.lastSelectedId)?.classList.add("deSelected");
    // }
    // document.getElementById(id)?.classList?.add("selected");
    // document.getElementById(id)?.classList?.remove("deSelected");

    this.isPerCapita = this.data.btnLabels[i]
      ?.toLocaleLowerCase()
      .split(" ")
      .join("")
      .includes("percapita");
    let newName = this.data.btnLabels[i]?.toLocaleLowerCase();

    if (newName?.includes("mix"))
      this.filterName = this.data?.btnLabels[i]?.toLocaleLowerCase();
    else if (newName?.includes("revenue") && !newName?.includes("own"))
      this.filterName = "revenue";
    else if (newName?.includes("own") && newName?.includes("revenue"))
      this.filterName = newName;
    else this.filterName = this.data.btnLabels[i]?.toLocaleLowerCase();

    if (this.stateServiceLabel) {
      this.getDropDownValue();
    } else {
      this.getScatterData();
      this.getStateRevenue();
    }
    // this.getScatterData();
    // this.getStateRevenue();
  }

  getRevenueId() {
    this.stateFilterDataService
      .getRevID()
      .subscribe((res) => console.log("revenue ==>", res));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("state filter data changes", changes, this.data);
    // if (changes && changes.stateServiceLabel && changes.stateServiceLabel.currentValue) {
    //   this.stateServiceLabel = changes.stateServiceLabel.currentValue;
    // }
    this.stateServiceLabel = false;
    if (changes.data) {
      console.log("dounghnuChartLabels", this.dounghnuChartLabels);
      this.tabName = this.data.name.toLocaleLowerCase();
      this.data = {
        ...this.data["mainContent"][0],
        filterName: this.data.name,
      };
      // if (!changes.data.firstChange) this.changeActiveBtn(0);
      this.setHeadOfAccount();
    }

    if ((changes && changes.stateServiceLabel) || changes.data) {
   if(changes.stateServiceLabel){
    this.stateFilterDataService.getYearListSLB().subscribe((res)=> {
        
      this.yearList = res['data']
    }, (err)=> {
    console.log(err.message)
    })
   }
     
      console.log('this.data.filterName', this.data.filterName)
      if (this.data.filterName == "Water Supply") {
        this.serviceTab = "water supply";
        this.stateServiceLabel = true;
      } else if (this.data.filterName == "Waste Water Management") {
        this.serviceTab = "sanitation";
        this.stateServiceLabel = true;
      } else if (this.data.filterName == "Solid Waste Management") {
        this.serviceTab = "solid waste";
        this.stateServiceLabel = true;
      } else if (this.data.filterName == "Storm Water Drainage") {
        this.serviceTab = "storm water";
        this.stateServiceLabel = true;
      }

      console.log("serviceTab", this.serviceTab?.toLocaleLowerCase());
      // this.getDropDownValue();
      this.changeActiveBtn(0);

    }
  }

  setHeadOfAccount() {
    let name = this.data["filterName"]?.toLocaleLowerCase().split(" ");
    this.headOfAccount = name.includes("revenue")
      ? "Revenue"
      : name.includes("expenditure")
      ? "Expense"
      : name.includes("surplus")
      ? "Expense"
      : "Tax";
  }
  
  notfound = true;
  
  ngOnInit(): void {
    this.statesList = localStorage.getItem('stateIdsMap') ? JSON.parse(localStorage.getItem('stateIdsMap')) : null;
    if (this.statesList) {
      this.stateName = this.statesList[this.stateId]
    }
    console.log("this.innertabData", this.data);
  
    this.nationalFilter.valueChanges.subscribe((value) => {
      if (value?.length >= 1) {
        this._commonServices
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

    this.getRevenueId();
    // this.changeActiveBtn(0);

    this.getStateUlbsPopulation();
    // this.getStateRevenue();
  }

  ulbId: any;
  getUlbData(event) {
    console.log(event);
    this.ulbId = event._id
    this.getScatterData();
    if (this.stateServiceLabel) {
      this.getServiceLevelBenchmarkBarChartData();
    }
  }

  labels(data) {
    this.chartLabels = data;
    console.log(this.chartLabels)
  }

  getChartDropdownValue(event: any) {
    console.log('getChartDropdownValue', event);
    this.chartDropdownValue = event && event.target && event.target.value;
    this.getStateRevenue();
  }

  getStateUlbsPopulation() {
    const paramContent: any = {
      "stateId": this.stateId
    };
    this.stateFilterDataService.getStateUlbsGroupedByPopulation(paramContent)
    .subscribe(
      (response) => {
        if (response && response["success"]) {
          console.log("getStateUlbsGroupedByPopulation", response);
          if (response && response['data'] && response['data']?.length) {
            this.stateUlbsPopulation.tableHeading = Object.keys(response['data'][0]);
            this.stateUlbsPopulation.tableDataSource = response['data'][0];
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  activeButtonList: any = [
    // Revenue Tab -> Sub Tabs
    {name: "Total Revenue", code: "TotalRevenue", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Revenue Per Capita", code: "RevenuePerCapita", yAxisLabel: 'Amount (in INR)', countAccessKey: "revenuePerCapita", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Revenue Mix", code: "RevenueMix", yAxisLabel: 'Amount (in INR)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},
    
    // Expenditure Tab -> Sub Tabs
    
    {name: "Total Surplus/Deficit", code: "DeficitOrSurplus", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "deficitOrSurplus", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Expenditure Mix", code: "ExpenditureMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},
    {name: "Revenue Expenditure Mix", code: "RevenueExpenditureMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Revenue Expenditure", code: "RevenueTotalExpenditure", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},

    // Own Revenue Tab -> Sub Tabs

    {name: "Total Own Revenue", code: "TotalOwnRevenue", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Own Revenue per Capita", code: "OwnRevenuePerCapita", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
    {name: "Own Revenue Mix", code: "OwnRevenueMix", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'defaultBarChartOptions', isCodeRequired: true},

    // Capital Expenditure Tab -> Sub Tabs

    {name: "Capital Expenditure", code: "CapitalTotalExpenditure", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "sum", chartAnimation: 'croreBarChartOptions', isCodeRequired: false},
    {name: "Capital Expenditure Per Capita", code: "CapitalExpenditurePerCapita", yAxisLabel: 'Amount (in Cr.)', countAccessKey: "revenueExpendPerCapita", chartAnimation: 'defaultBarChartOptions', isCodeRequired: false},
  ];
  
  getTabType() {
    const defaultOption = {yAxisLabel: 'Count', countAccessKey: "count", chartAnimation: 'defaultBarChartOptions'};
    let findTabType = this.activeButtonList.find(tabName => tabName.name == this.ActiveButton);
    return findTabType ? findTabType : defaultOption;
  };

  getStateRevenue() {
    const tabType = this.getTabType();
    const paramContent: any = {
      // "tabType": this.ActiveButton?.split(' ').join(''),
      "tabType": tabType ? tabType?.code : '',
      "financialYear": this.financialYear,
      "stateId": this.stateId,
      "sortBy": this.BarGraphValue ? 'top' : 'bottom'
    };
    this.chartDropdownValue = '';
    if (tabType?.isCodeRequired) {
      paramContent['code'] = this.chartDropdownValue ? this.chartDropdownValue : this.chartDropdownList[0].code
    }
    console.log('paramContent', paramContent);
    this.stateFilterDataService.getStateRevenueForDifferentTabs(paramContent)
    .subscribe(
      (response) => {
        if (response && response["success"]) {
          console.log("getStateRevenue", response, this.barData,tabType?.countAccessKey);
          if (response['data'] && response['data'].length) {
            for (const data of response['data']) {
              data['count'] = this._commonServices.changeCountFormat(data[tabType?.countAccessKey]);
            }
            this.filterCityRankingChartData(response['data'], paramContent?.tabType, tabType?.yAxisLabel);
            this.barChartNotFound = false;
          } else {
            this.barChartNotFound = false;
          }
        } else {
          this.barChartNotFound = true;
        }
      },
      (error) => {
        this.barChartNotFound = true;
        console.log(error);
      }
    );
  }

  filterCityRankingChartData(responseData: any, tabType: string, yAxisLabel: string) {
    console.log('filterCityRankingChartData', responseData, tabType);
    let barData = {
      type: "bar",
      data: {
        labels: responseData.map((item: { ulbName: any; }) => item.ulbName),
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
    this.barData = {};
    this.barData = barData;
    console.log('this.barData', this.barData);
  }

  getChartData(responseData: any, tabType: string, yAxisLabel: string) {
    this.setChartAnimation(tabType, yAxisLabel);
    let mappedCountList = responseData.map((item: { count: any; }) => item.count)
    return mappedCountList;
    // switch(tabType) {
    //   case 'TotalRevenue':
    //   case 'RevenueMix':
    //     return responseData.map((item: { sum: any; }) => item.sum);
    //   case 'RevenuePerCapita':
    //     return responseData.map((item: { revenuePerCapita: any; }) => item.revenuePerCapita);
    //   default:
    //     break;
    // }
  }

  setChartAnimation(tabType: string, yAxisLabel: string) {
    let animationConfig: any;
    let animationConfigAccessKey: any = this.stateServiceLabel ? 'serviceLevelBenchmarkBarChartOptions' : this.getTabType().chartAnimation;
    animationConfig = this.stateFilterDataService[animationConfigAccessKey];
    Object.assign(animationConfig);
    this.barChartOptions = animationConfig;
    // let yAxesLabelName = tabType == 'TotalRevenue' ? 'Amount (in Cr.)' : 'Amount (in INR)';
    this.barChartOptions['scales']['yAxes'][0]['scaleLabel']['labelString'] = yAxisLabel;

    console.log('barChartOptions', this.barChartOptions)
  }

  showSnackbarMessage(message: string) {
    this.snackbar.open(message, null, {
      duration: 5000,
      verticalPosition: "bottom",
    });
  }
  
  serviceLevelBenchmarkScatterOption: any;
  setServiceLevelBenchmarkScatteredChartOption(xAxisLabel: string = 'Population', yAxisLabel: string = 'Total Revenue') {
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
              labelString: this._commonServices.toTitleCase(xAxisLabel),
              fontStyle: 'bold'
            },
  
            offset: true,
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: `${this._commonServices.toTitleCase(yAxisLabel)} (%)`,
              fontStyle: 'bold'
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
            console.log('tooltipItem', tooltipItem.index)
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || "Other";
            var label = data.datasets[tooltipItem.datasetIndex]["labels"][tooltipItem.index];
            console.log('tooltipItem', data.datasets[tooltipItem.datasetIndex]);
            var rev = data.datasets[tooltipItem.datasetIndex]["rev"][tooltipItem.index];
  
            return (datasetLabel + ": " + label + " " + `(${rev} %)`);
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
    let apiEndPoint = 'state-slb';
    const payload: any = {
      "financialYear": this.financialYear,
      "stateId": this.stateId,
      "sortBy": this.BarGraphValue ? 'top10' : 'bottom10',
      "filterName": this.filterName,
      "ulb": this.ulbId,
    };
    console.log('payload', payload);

    this.stateFilterDataService.getScatterdData(payload, apiEndPoint)
    .subscribe(
      (response) => {
        if (response && response["success"] && response['data']) {
          console.log("getStateRevenue", response,);
          if (response['data']['scatterData'] && response['data']['scatterData']['tenData'] && response['data']['scatterData']['tenData'].length) {
            let chartData = response['data']['scatterData']['tenData'];
            for (const data of chartData) {
              data['count'] = data?.value;
            }
            this.filterCityRankingChartData(chartData, '', 'Percentage');
            this.barChartNotFound = false;
          } else {
            this.barChartNotFound = false;
          }
        } else {
          this.barChartNotFound = true;
        }
      },
      (error) => {
        this.barChartNotFound = true;
        console.log(error);
      }
    );
  }
}