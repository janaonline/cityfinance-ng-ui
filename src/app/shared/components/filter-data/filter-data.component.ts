import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import Chart from "chart.js";

@Component({
  selector: "app-filter-data",
  templateUrl: "./filter-data.component.html",
  styleUrls: ["./filter-data.component.scss"],
})
export class FilterDataComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private commonService: CommonService,
    private _activatedRoute: ActivatedRoute
  ) {}
  multiPie = false;
  multipleDoughnutCharts = [];
  multiChartLabel = [];
  @Input()
  currentUlb;
  scatterData = JSON.parse(JSON.stringify(scatterData));
  barChart = JSON.parse(JSON.stringify(barChartStatic));
  btnSelected = false;
  aboutIndicators;
  lastSelectedId;
  expand = false;
  @Input()
  data = incomingData;
  headOfAccount;
  filterName;
  selectedTab;
  headerActions = headerActions;
  lastSelectedUlbs;
  chartId = `cityCharts-${Math.random()}`;
  isPerCapita = false;
  @Input()
  mySelectedYears = ["2015-16", "2014-15", "2013-14"];
  @Input()
  yearListForDropDown;
  loading = false;
  tabName;
  CAGR = "";
  positiveCAGR;
  chartTitle = "total revenues vs State";
  chartOptions;
  notFound = false;
  ulbMapping = JSON.parse(localStorage.getItem("ulbMapping"));
  hideElements = false;
  compareType;
  btnListInAboutIndicator;
  ngOnInit(): void {}

  stateUlbMapping = JSON.parse(localStorage.getItem("stateUlbMapping"));
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;

  ngAfterViewInit(): void {}

  changeActiveBtn(i) {
    this.hideElements = false;
    console.log(this.data.btnLabels[i], "activeBTN");
    this.btnListInAboutIndicator = this.data.btnLabels.filter(
      (val, index) => i != index
    );
    let key = this.data.btnLabels[i].toLowerCase().split(" ").join("_");
    this.aboutIndicators = this.data["static"].indicators.map((value) => {
      Object.assign(value, { desc: value[key] });
      return value;
    });
    let id = `btn-${i}`;
    if (this.lastSelectedId) {
      document
        .getElementById(this.lastSelectedId)
        ?.classList.remove("selected");
      document.getElementById(this.lastSelectedId)?.classList.add("deSelected");
    }
    document.getElementById(id).classList?.remove("deSelected");
    document.getElementById(id).classList?.add("selected");
    this.lastSelectedId = id;

    this.isPerCapita = this.data.btnLabels[i]
      .toLocaleLowerCase()
      .split(" ")
      .join("")
      .includes("percapita");
    this.selectedTab = this.data.btnLabels[i];
    let newName = this.data.btnLabels[i].toLocaleLowerCase();
    if (newName.includes("mix"))
      this.filterName = this.data.btnLabels[i].toLocaleLowerCase();
    else if (newName.includes("revenue") && !newName.includes("own"))
      this.filterName = "revenue";
    else if (newName.includes("own") && newName.includes("revenue"))
      this.filterName = newName;
    else this.filterName = this.data.btnLabels[i].toLocaleLowerCase();
    if (this.selectedTab.toLowerCase() == "own revenue mix") this.resetCAGR();
    this.getChartData({});
  }

  actionFromChart(value) {
    console.log(value, "in filter");
    if (value.name === "Expand" || value.name === "Collapse")
      this.expand = !this.expand;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.tabName = this.data.name.toLocaleLowerCase();
      this.data = {
        ...this.data["mainContent"][0],
        filterName: this.data.name,
      };
      this.aboutIndicators = this.data["static"].indicators;
      setTimeout(() => {
        if (this.data.btnLabels.length) this.changeActiveBtn(0);
        this.getChartData({});
      }, 0);
      this.setHeadOfAccount();
    }
    console.log("this.barChart", this.barChart);
  }

  setHeadOfAccount() {
    let name = this.data["filterName"].toLocaleLowerCase().split(" ");
    this.headOfAccount = name.includes("revenue")
      ? "Revenue"
      : name.includes("expenditure")
      ? "Expense"
      : "Tax";
  }
  apiCall;

  getChartData(data = {}) {
    if (this.headOfAccount == "") {
      this.headOfAccount = "Tax";
    }
    let body = {
      ulb: [],
      financialYear: [],
      headOfAccount: this.headOfAccount,
      filterName: this.filterName,
      isPerCapita: this.isPerCapita,
      compareType: "State Average",
    };
    body.filterName = body.filterName?.toLocaleLowerCase().split(" ").join("_");
    if (body.filterName == "total_property_tax_collection")
      body.filterName = "property_tax";

    let ulbsToCompare = data["ulbs"]?.map((value) => value._id) ?? [];
    body.ulb = [...ulbsToCompare, this.currentUlb];
    if (data["compareType"]) {
      body.compareType = data["compareType"];
    }
    this.lastSelectedUlbs = body.ulb;
    body.financialYear = data["year"] ?? this.mySelectedYears;
    this.loading = true;
    if (this.apiCall) {
      this.apiCall.unsubscribe();
    }
    this.compareType = body["compareType"];
    this.chartTitle = `${this.ulbMapping[this.currentUlb].name} ${
      this.selectedTab
    } vs ${body["compareType"]} ${
      this.ulbMapping[this.currentUlb].type
    } Average`;
    this.apiCall = this.commonService.getChartDataByIndicator(body).subscribe(
      (res) => {
        if (body.filterName.includes("mix")) {
          this.createPieChart(JSON.parse(JSON.stringify(res["data"])), body);
          // this.calculateRevenue(res["data"]);
        } else {
          this.multiPie = false;
          console.log(JSON.stringify(res["data"]), body.ulb);
          if (body.ulb.length == 1) this.createBarChart(res);
          else
            this.createDataForUlbs(res["data"]["ulbData"], [
              ...new Set(body.ulb),
            ]);
          if (showCagrIn.includes(this.selectedTab.toLowerCase()))
            this.calculateCagr(res["data"], this.hideElements);
          if (showPerCapita.includes(this.selectedTab.toLowerCase()))
            this.calculatePerCapita(res["data"]);
          if(this.selectedTab.toLowerCase() == "total surplus/deficit")
          this.calculateCagrOfDeficit(res["data"])
        }
        this.loading = false;
      },
      (error) => {
        // let preArray = [];
        // let newData = JSON.parse(JSON.stringify(barChartStatic));
        // newData.data.labels = this.mySelectedYears;
        // newData.data.datasets[0].label = this.lastSelectedUlbs.map((value) => {
        //   this.ulbList[this.stateUlbMapping[value]].ulbs.find(
        //     (value) => value._id == value
        //   )?.name;
        // });
        // newData.data.datasets[0].data = preArray.fill(
        //   0,
        //   0,
        //   this.mySelectedYears.length
        // );
        // this.barChart = newData;
        this.notFound = true;
        this.loading = false;
      }
    );
  }
  calculateCagrOfDeficit(res){
    console.log(res);
    let total = res["ulbData"].reduce((sum,val)=>sum+val.amount,0)
    this.CAGR = `Rs. ${convertToCr(total,this.isPerCapita)} Cr. Total Surplus/Deficit of the FY'${this.mySelectedYears[0]}`
    this.positiveCAGR = total > 0
  }

  createDataForUlbs(res, ulbs) {
    let obj = {
      type: "bar",
      data: {
        labels: this.mySelectedYears,
        datasets: [
          ...new Set(
            ulbs.map((ulb, i) => {
              let innerObj = {
                label: this.ulbMapping[ulb].name,
                data: [],
                borderWidth: 1,
                barThickness: 50,
                borderRadius: 8,
                backgroundColor: backgroundColor[i],
                borderColor: borderColor[i],
              };
              this.mySelectedYears.forEach((year) => {
                let foundUlb = res.find(
                  (val) => val._id.financialYear == year && val._id.ulb == ulb
                );
                if (foundUlb)
                  innerObj.data.push(
                    convertToCr(foundUlb.amount, this.isPerCapita)
                  );
                else innerObj.data.push(0);
              });
              return innerObj;
            })
          ),
        ],
      },
    };
    this.barChart = obj;
    this.chartOptions = barChartStaticOptions;
  }

  calculateRevenueMix(data) {
    let totalRevenue = 0,
      totalRevenueState = 0,
      ownRevenue = 0,
      ownRevenueState = 0;
    for (const key in data) {
      const element = data[key];
      element.forEach((val) => {
        if (val._id.lineItem == "Own Revenue") {
          ownRevenue += val.amount;
          if (key == "compData") ownRevenueState += val.amount;
        }
        totalRevenue += val.amount;
        if (key == "compData") totalRevenueState += val.amount;
      });
    }

    let c = (ownRevenue / totalRevenue) * 100;
    let f = (ownRevenueState / totalRevenueState) * 100;
    let x = c - f;

    this.CAGR = `Share of Own Revenue to Total Revenue is  ${x.toFixed(2)}% ${
      c > f ? "higher" : "lower"
    } than state average for FY${this.mySelectedYears[0]}
    (ULB Own Revenue to Total Revenue is  ${c.toFixed(2)}% ;
    State Average Own Revenue to Total Revenue is  ${f.toFixed(2)}%)`;
    this.positiveCAGR = c > f;
  }

  calculateRevenue(data) {
    let totalRevenue = data.ulbData.reduce(
      (amount, value) => (amount += Number(value.amount)),
      0
    );
    this.CAGR = `Total revenue is Rs ${(totalRevenue / 10000000).toFixed(
      2
    )} Crore`;
    this.positiveCAGR = true;
  }

  calculatePerCapita(data) {
    let totalState = data.compData.reduce((sum, val) => sum + val.amount, 0);
    let totalUlb = data.ulbData.reduce((sum, val) => sum + val.amount, 0);
    this.CAGR = `Rs ${(totalState - totalUlb).toFixed(2)} ${
      totalUlb > totalState ? "higher" : "lower"
    } than the state average between FY${
      data.ulbData[0]._id.financialYear
    } and FY${data.ulbData[data.ulbData.length - 1]._id.financialYear}

    (Avg. ULB ${this.selectedTab} is Rs.${totalUlb.toFixed(2)} ;
    State Average Total Revenue per capita is Rs.${totalState.toFixed(2)})`;
    this.positiveCAGR = totalUlb > totalState;
  }

  calculateCagr(data, hideCAGR) {
    let yearData = data.ulbData,
      intialYear = yearData[0].amount,
      finalYear = yearData[yearData.length - 1].amount,
      time = yearData.length;
    if (yearData.length > 1 && !hideCAGR) {
      let CAGR = (Math.pow(finalYear / intialYear, 1 / time) - 1) * 100;
      this.CAGR = `CAGR of ${CAGR.toFixed(2)}% between ${
        yearData[0]._id.financialYear +
        " and " +
        yearData[yearData.length - 1]._id.financialYear
      } years (ULB ${this.selectedTab} for FY' ${
        yearData[0]._id.financialYear
      } is Rs.${convertToCr(yearData[0].amount, this.isPerCapita)} ${
        this.isPerCapita ? "" : "Cr"
      }.
ULB ${this.selectedTab} for FY' ${
        yearData[1]._id.financialYear
      } is Rs. ${convertToCr(
        yearData[yearData.length - 1].amount,
        this.isPerCapita
      )} ${this.isPerCapita ? "" : "Cr"}.)`;
      this.positiveCAGR = CAGR > 0;
    } else this.CAGR = "";
  }

  createBarChart(res) {
    if (
      this.filterName.includes("capital") &&
      this.filterName.includes("expenditure")
    ) {
      for (const key in res["data"]) {
        res["data"][key] = this.createExpenditureData(res["data"][key]);
      }
    }

    let newData = JSON.parse(JSON.stringify(barChartStatic));
    newData.data.labels = res["data"].ulbData.map(
      (value) => value._id.financialYear
    );
    newData.data.labels = [...new Set(newData.data.labels)];
    let temp = {},
      index = 0;
    for (const key in res["data"]) {
      const element = res["data"][key];
      element.map((value) => {
        let dataInner = JSON.parse(JSON.stringify(innerDataset));
        if (this.compareType == "National Average" && key == "compData") {
          value.ulbName = "National";
        }
        if (this.compareType == "ULB Type Average" && key == "compData") {
          value.ulbName = this.ulbMapping[this.currentUlb].type;
        }
        if (this.compareType == "ULB category Average" && key == "compData") {
          value.ulbName = getPopulationType(
            this.ulbMapping[this.currentUlb].population
          );
        }

        if (!temp[value.ulbName]) {
          dataInner.backgroundColor = backgroundColor[index];
          dataInner.borderColor = borderColor[index++];
          dataInner.label = value.ulbName;
          dataInner.data = [convertToCr(value.amount, this.isPerCapita)];
          temp[value.ulbName] = dataInner;
        } else {
          dataInner = temp[value.ulbName];
          dataInner.data.push(convertToCr(value.amount, this.isPerCapita));
          temp[value.ulbName] = dataInner;
        }
      });
    }
    newData.data.datasets = [];
    let newlineDataset = JSON.parse(JSON.stringify(lineDataset));
    newlineDataset.label = `Y-o-Y Growth in ${this.selectedTab} (%)`;
    newlineDataset.data = [];
    for (const key in temp) {
      const element = temp[key];
      if (newlineDataset.data.length == 0) newlineDataset.data = element.data;
      newData.data.datasets.push(element);
    }
    if (!this.hideElements && !this.isPerCapita)
      newData.data.datasets.push(newlineDataset);

    this.barChart = newData;
    barChartStaticOptions.scales.yAxes[0].scaleLabel.labelString = `Amount in ${
      this.isPerCapita ? "Rs" : "Cr"
    }`;
    this.chartOptions = barChartStaticOptions;
  }

  createExpenditureData(data) {
    let newData = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let year1 = data[index - 1],
        year2 = data[index];
      if (!year1) {
        newData.push({
          _id: { financialYear: data[0]._id },
          amount: data[0].yearData[0].amount + data[0].yearData[1].amount,
          ulbName: data[0].yearData[0].ulbName,
        });
        continue;
      }
      let amount1 =
          year2.yearData.find((value) => value.code == "410").amount -
          year1.yearData.find((value) => value.code == "410").amount,
        amount2 =
          year2.yearData.find((value) => value.code == "412").amount -
          year1.yearData.find((value) => value.code == "412").amount;
      newData.push({
        _id: { financialYear: year1._id },
        amount: amount1 + amount2,
        ulbName: year1.yearData[0].ulbName,
      });
    }
    return newData;
  }

  createPieChart(data, body) {
    if (this.filterName == "revenue mix") {
      for (const key in data) {
        data[key] = this.createRevenueData(data[key]);
      }
      this.calculateRevenueMix(data);
    }
    if (this.filterName == "own revenue mix")
      data["ulbData"] = this.createOwnRevenueData(data);
    this.multipleDoughnutCharts = [];
    this.multiChartLabel = [];
    for (const key in data) {
      const doughnutChartData = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: [],
          },
        ],
      };
      data[key].forEach((value, index) => {
        doughnutChartData.datasets[0].backgroundColor.push(
          pieBackGroundColor[index]
        );
        doughnutChartData.datasets[0].data.push(
          value.amount == 0 ? "0.1" : value.amount
        );
        if (key == "ulbData")
          this.multiChartLabel.push({
            text: value._id.lineItem,
            color: pieBackGroundColor[index],
          });
        doughnutChartData.datasets[0].label = value._id.lineItem;
        // return value._id.lineItem;
      });
      doughnutChartData.labels = this.multiChartLabel.map(
        (value) => value.text
      );
      let config = {
        type: "doughnut",
        data: doughnutChartData,
      };

      let val = {
        id: `${Math.random()}-multi`,
        ...config,
        multipleChartOptions: {
          legend: {
            display: false,
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
                  return Number(previousValue) + Number(currentValue);
                });
                var currentValue = Number(dataset.data[tooltipItem.index]);
                var percentage = ((currentValue / total) * 100).toFixed(2);
                return percentage + "%" + data.labels[tooltipItem.index];
              },
            },
          },
        },
        title:
          key == "ulbData"
            ? this.ulbMapping[this.currentUlb].name
            : body.compareType,
      };
      this.multipleDoughnutCharts.push(val);
    }
    console.log(this.multipleDoughnutCharts, "this.multipleDoughnutCharts");
    this.multiPie = true;
  }

  createOwnRevenueData(data) {
    return data["ulbData"];
  }

  createRevenueData(data) {
    let own = {
      _id: { lineItem: "Own Revenue" },
      amount: 0,
    };
    let other_receipt = {
      _id: { lineItem: "Other Receipts" },
      amount: 0,
    };
    let assigned_revenues_compensations = {
      _id: { lineItem: "Assigned Revenues Compensation" },
      amount: 0,
    };
    let grant = {
      _id: { lineItem: "Grants" },
      amount: 0,
    };
    let interest_incomes = {
      _id: { lineItem: "Interest Income" },
      amount: 0,
    };
    let newdata = [
      own,
      other_receipt,
      assigned_revenues_compensations,
      grant,
      interest_incomes,
    ];

    data.map((value) => {
      if (ownRevenues.includes(value.code)) {
        own.amount += value.amount;
      }
      if (other_receipts.includes(value.code)) {
        other_receipt.amount += value.amount;
      }
      if (assigned_revenues_compensation.includes(value.code)) {
        assigned_revenues_compensations.amount += value.amount;
      }
      if (grants.includes(value.code)) {
        grant.amount += value.amount;
      }
      if (interest_income.includes(value.code)) {
        interest_incomes.amount += value.amount;
      }
    });
    return newdata;
  }

  filterChangeInChart(value) {
    if (value.compareType == "ULBs..") this.hideElements = true;
    else this.hideElements = false;
    this.mySelectedYears = value.year;
    if (this.yearListForDropDown[0] == value.year[0]) {
      this.notFound = true;
    } else {
      this.notFound = false;
    }
    this.getChartData(value);
    console.log("filterChangeInChart", value);
  }

  btnClickInAboutIndicator(val) {
    console.log(val, "btn val in filterData");
    this.changeActiveBtn(this.data.btnLabels.indexOf(val));
  }

  resetCAGR() {
    this.CAGR = "";
  }
}

const pieBackGroundColor = [
  "#25C7CE",
  "#FF608B",
  "#1E44AD",
  "#585FFF",
  "#FFD72E",
  "#22A2FF",
];

const barChartStatic = {
  type: "bar",
  data: {
    labels: ["first", "second"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderWidth: 1,
        barThickness: 50,
        borderRadius: 8,
      },
    ],
  },
};

const backgroundColor = [
  "#1EBFC6",
  "#1E44AD",
  "#F56184",
  "#3C3C3C",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];
const borderColor = [
  "#1EBFC6",
  "#1E44AD",
  "#F56184",
  "#3C3C3C",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

const lineDataset = {
  type: "line",
  label: "Y-o-Y Comparison",
  data: [],
  fill: false,
  borderColor: "#F56184",
};

const innerDataset = {
  label: "My First Dataset",
  data: [65, 59, 80, 81, 56, 55, 40],
  borderWidth: 1,
  barThickness: 50,
  borderRadius: 8,
};

function convertToCr(value, isPerCapita) {
  if (isPerCapita) return value.toFixed(2);
  if (value == 0) return 0;
  value /= 10000000;
  return value.toFixed(2);
}

const scatterData = {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Line one",
        data: [
          { x: 0, y: 12 },
          { x: 50, y: 12 },
        ],
        showLine: true,
        fill: false,
        borderColor: "rgba(0, 200, 0, 1)",
      },
      {
        label: "Line Two",
        data: [
          { x: 0, y: 8 },
          { x: 50, y: 8 },
        ],
        showLine: true,
        fill: false,
        borderColor: "red",
      },
      {
        label: "Muncipality",
        data: [
          { x: 12, y: 12 },
          { x: 12, y: 4 },
          { x: 4, y: 6 },
          { x: 6, y: 9 },
          {
            x: 50,
            y: 20,
          },
          {
            x: 10,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#1EBFC6",
        backgroundColor: "#1EBFC6",
      },
      {
        label: "Muncipal Corporation",
        data: [
          { x: 9, y: 12 },
          { x: 8, y: 4 },
          { x: 24, y: 6 },
          { x: 8, y: 9 },
          {
            x: 30,
            y: 20,
          },
          {
            x: 15,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#3E5DB1",
        backgroundColor: "#3E5DB1",
      },
      {
        label: "Town Panchayat",
        data: [
          { x: 21, y: 12 },
          { x: 10, y: 4 },
          { x: 18, y: 6 },
          { x: 16, y: 9 },
          {
            x: 30,
            y: 20,
          },
          {
            x: 15,
            y: 10,
          },
        ],
        showLine: false,
        fill: true,
        borderColor: "#F5B742",
        backgroundColor: "#F5B742",
      },
    ],
  },
};

const incomingData = {
  about: "",
  btnLabels: [],
  name: "Financial Indicators",
  subHeaders: [
    {
      mainContent: [
        {
          static: {
            indicators: [
              {
                desc: [
                  {
                    links: [
                      {
                        label: "",
                        url: "",
                      },
                    ],
                    text: "Expenditure mix refers to the combination of establishment, administrative, interest & finance expenses, etc., all of which constitute the total expenditure of the ULB",
                  },
                ],
                name: "About this indicator",
              },
            ],
          },
          btnLabels: [],
          about:
            "Expenditure mix refers to the combination of establishment, administrative, interest & finance expenses, etc., all of which constitute the total expenditure of the ULB",
          aggregateInfo:
            "Total revenue: 2000 Cr CAGR trend of 8% for last 3 years",
        },
      ],
      name: "Revenue Expenditure Mix",
    },
  ],
};

const headerActions = [
  {
    name: "Expand",
    svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
  },
  {
    name: "Download",
    svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
  },
  {
    name: "Share/Embed",
    svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
  },
];

const ownRevenue = [
  {
    code: "180",
    name: "Other Income",
  },
  {
    code: "140",
    name: "Fee & User Charges",
  },
  {
    code: "110",
    name: "Tax Revenue",
  },

  {
    code: "170",
    name: "Income from Investment",
  },

  {
    code: "130",
    name: "Rental Income from Municipal Properties",
  },
  {
    code: "100",
    name: "Others",
  },
];

const ownRevenues = ["110", "130", "140", "150", "180"];
const assigned_revenues_compensation = ["120"];
const grants = ["160"];
const interest_income = ["171"];
const other_receipts = ["170", "100"];
const barChartStaticOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Amount in Cr.",
        },
        gridLines: {
          offsetGridLines: true,
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
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
          ctx.fillText("₹ " + data, bar._model.x, bar._model.y - 5);
        });
      });
      console.log(animation, "animation");
    },
  },
};

function getPopulationType(population) {
  if (population < 100000) {
    return "<100 Thousand";
  } else if (100000 < population && population < 500000) {
    return "100 Thousand - 500 Thousand";
  } else if (500000 < population && population < 1000000) {
    return "500 Thousand - 1 Million";
  } else if (1000000 < population && population < 4000000) {
    return "1 Million - 4 Million";
  } else {
    return "4 Million+";
  }
}
let showCagrIn = ["total revenue", "total own revenue"];
let showPerCapita = ["revenue per capita", "own revenue per capita"];
