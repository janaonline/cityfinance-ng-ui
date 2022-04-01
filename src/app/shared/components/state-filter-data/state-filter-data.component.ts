import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { ActivatedRoute } from "@angular/router";
import { StateFilterDataService } from "./state-filter-data.service";
import { FormControl } from "@angular/forms";
import { CommonService } from "../../services/common.service";
import { Observable } from "rxjs";
import { GlobalLoaderService } from "src/app/shared/services/loaders/global-loader.service";
import { OwnRevenueService } from "src/app/pages/own-revenue-dashboard/own-revenue.service";
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
  financialYear = "2016-17";
  stateName;
  compareDialogType = 3;
  serviceTab;
  isPerCapita = false;

  serviceTabList: [];

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
  barData = {
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
          data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 11],
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
    { value: 1, title: "National Avg", isDisabled: false },
    { value: 2, title: "ULB Type avg", isDisabled: false },
    { value: 3, title: "Population Category avg", isDisabled: false },
  ];

  constructor(
    public activatedRoute: ActivatedRoute,
    public stateFilterDataService: StateFilterDataService,
    private _commonServices: CommonService,
    public _loaderService: GlobalLoaderService,

    private ownRevenueService: OwnRevenueService
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

  showBarGraph() {
    this.BarGraphValue = true;
    console.log("this.BarGraphValue", this.BarGraphValue);
  }

  showBottomGraph() {
    this.BarGraphValue = false;
  }

  getCheckBoxValue(event: any) {
    console.log("checked Value", event);
    if (event && event.target && event.target.value) {
      for (const item of this.checkBoxArray) {
        if (item.value != event.target.value) {
          item["isDisabled"] = true;
        }
      }
    }
  }

  reset() {
    this.checkBoxArray = [
      { value: 1, title: "National Avg", isDisabled: false },
      { value: 2, title: "ULB Type Avg", isDisabled: false },
      { value: 3, title: "Population Category Avg", isDisabled: false },
    ];
    this.nationalFilter.patchValue("")
    this.ulbId=""
  }

  yearList;

  getyears() {
    // debugger;
    let body = {};
    this.ownRevenueService.getYearList(body).subscribe((res) => {
      console.log("yearsResponse", res);
      this.yearList = res["data"];
      console.log("this.yearList", this.yearList);
    });
  }

  getDropDownValue() {
    this.stateFilterDataService
      .getServiceDropDown(this.serviceTab)
      .subscribe((res: any) => {
        console.log("service dropdown data", res);
        this.serviceTabList = res?.data?.[0]?.names;
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
  compType;
  multiChart = false;
  doughnutDataArr = [];
  getScatterData() {
    // debugger;
    this.multiChart = false;
    this._loaderService.showLoader();
    this.initializeScatterData();
    let payload = {
      state: this.stateId,
      financialYear: this.financialYear,
      headOfAccount: this.headOfAccount,
      filterName: this.filterName,
      isPerCapita: this.isPerCapita,
      compareType: this.compType ? this.compType : "",
      ulb: this.ulbId
    };
    console.log(payload);
    let inputVal: any = {};
    inputVal.stateIds = this.stateId;
    this.stateFilterDataService.getScatterdData(payload).subscribe(
      (res) => {
        this.notfound = false;
        console.log("response data", res);
        //scatter plots center
        if (!this.filterName.includes("mix")) {
          this._loaderService.stopLoader();
          let mCorporation = res["mCorporation"];
          let tp_data = res["townPanchayat"];
          let m_data = res["municipality"];
          // let natData = res["natAvg"][0]["average"];
          let stateData = res["stateAvg"][0]["average"];

          this.scatterData.data.datasets.forEach((el) => {
            let obj = { x: 0, y: 0 };
            if (el.label == "Town Panchayat") {
              obj = { x: 0, y: 0 };
              tp_data.forEach((el2, index) => {
                obj.x = el2.population;
                obj.y = el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(el2.totalRevenue);
                el.data.push(obj);
                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipal Corporation") {
              mCorporation.forEach((el2, index) => {
                obj.x = el2.population;
                obj.y = el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(el2.totalRevenue);
                el.data.push(obj);

                obj = { x: 0, y: 0 };
              });
            } else if (el.label == "Municipality") {
              m_data.forEach((el2, index) => {
                obj = { x: 0, y: 0 };
                obj.x = el2.population;
                obj.y = el2.totalRevenue;
                el["labels"].push(el2.ulbName);
                el["rev"].push(el2.totalRevenue);
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
        // this._loaderService.stopLoader();
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
  }

  getServiceLableValue(event) {
    console.log(event.target.value);
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
    console.log(this.data.btnLabels[i], "activeBTN");
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
    this.getScatterData();
  }

  getRevenueId() {
    this.stateFilterDataService
      .getRevID()
      .subscribe((res) => console.log("revenue ==>", res));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("state filter data changes", changes);
    if (changes.data) {
      console.log("dounghnuChartLabels", this.dounghnuChartLabels);
      this.tabName = this.data.name.toLocaleLowerCase();
      this.data = {
        ...this.data["mainContent"][0],
        filterName: this.data.name,
      };
      if (!changes.data.firstChange) this.changeActiveBtn(0);
      this.setHeadOfAccount();
    }

    if ((changes && changes.stateServiceLabel) || changes.data) {
      if (this.data.filterName == "Water Supply")
        this.serviceTab = "water supply";
      if (this.data.filterName == "Waste Water Management")
        this.serviceTab = "sanitation";
      if (this.data.filterName == "Solid Waste Management")
        this.serviceTab = "solid waste";
      if (this.data.filterName == "Storm Water Drainage")
        this.serviceTab = "storm water";

      console.log("serviceTab", this.serviceTab?.toLocaleLowerCase());
      this.getDropDownValue();
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
    console.log("this.innertabData", this.data);
    this.getyears();
  
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
    this.changeActiveBtn(0);
  }
  ulbId
  getUlbData(event) {
    console.log(event);
    this.ulbId = event._id
    this.getScatterData();
  }
  labels(data) {
    this.chartLabels = data;
    console.log(this.chartLabels)
  }
}
