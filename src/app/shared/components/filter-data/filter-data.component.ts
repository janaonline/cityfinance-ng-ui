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
  headerActions = headerActions;
  lastSelectedUlbs;
  chartId = `cityCharts-${Math.random()}`;
  isPerCapita = false;
  @Input()
  mySelectedYears = ["2015-16", "2014-15", "2013-14"];
  loading = false;
  tabName;
  CAGR = "";
  positiveCAGR;
  chartOptions;
  ngOnInit(): void {}

  stateUlbMapping = JSON.parse(localStorage.getItem("stateUlbMapping"));
  ulbList = JSON.parse(localStorage.getItem("ulbList")).data;

  ngAfterViewInit(): void {}

  changeActiveBtn(i) {
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
    let newName = this.data.btnLabels[i].toLocaleLowerCase();

    if (newName.includes("mix"))
      this.filterName = this.data.btnLabels[i].toLocaleLowerCase();
    else if (newName.includes("revenue") && !newName.includes("own"))
      this.filterName = "revenue";
    else if (newName.includes("own") && newName.includes("revenue"))
      this.filterName = newName;
    else this.filterName = this.data.btnLabels[i].toLocaleLowerCase();

    this.getChartData({});
  }

  actionFromChart(value) {
    console.log(value, "in filter");
    if (value.name === "expand" || value.name === "collapse")
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
    this.apiCall = this.commonService.getChartDataByIndicator(body).subscribe(
      (res) => {
        if (body.filterName.includes("mix")) {
          this.createPieChart(res["data"]);
          this.calculateRevenue(res["data"]);
        } else {
          this.createBarChart(res);
          this.calculateCagr(res["data"]);
        }
        this.loading = false;
      },
      (error) => {
        let preArray = [];
        let newData = JSON.parse(JSON.stringify(barChartStatic));
        newData.data.labels = this.mySelectedYears;
        newData.data.datasets[0].label = this.lastSelectedUlbs.map((value) => {
          this.ulbList[this.stateUlbMapping[value]].ulbs.find(
            (value) => value._id == value
          )?.name;
        });
        newData.data.datasets[0].data = preArray.fill(
          0,
          0,
          this.mySelectedYears.length
        );
        this.barChart = newData;
        this.loading = false;
      }
    );
  }

  calculateRevenue(data) {
    let totalRevenue = data.ulbData.reduce(
      (amount, value) => (amount += value.amount),
      0
    );
    this.CAGR = `Total revenue is Rs ${(totalRevenue / 10000000).toFixed(
      2
    )} Crore`;
    this.positiveCAGR = true;
  }

  calculateCagr(data) {
    let yearData = data.ulbData,
      intialYear = yearData[0].amount,
      finalYear = yearData[yearData.length - 1].amount,
      time = yearData.length;
    if (yearData.length > 1 && this.tabName == "revenue") {
      let CAGR = (Math.pow(finalYear / intialYear, 1 / time) - 1) * 100;
      this.CAGR = `CAGR of ${CAGR.toFixed(2)}% for last ${
        yearData.length
      } years`;
      this.positiveCAGR = CAGR > 0;
    }
  }

  createBarChart(res) {
    if (
      this.filterName.includes("capital") &&
      this.filterName.includes("expenditure")
    ) {
      res["data"]["ulbData"] = this.createExpenditureData(
        res["data"]["ulbData"]
      );
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
        if (!value.hasOwnProperty("ulbName")) {
          value.ulbName = "National";
        }
        if (!temp[value.ulbName]) {
          dataInner.backgroundColor = backgroundColor[index];
          dataInner.borderColor = borderColor[index++];
          dataInner.label = value.ulbName;
          dataInner.data = [convertToCr(value.amount)];
          temp[value.ulbName] = dataInner;
        } else {
          dataInner = temp[value.ulbName];
          dataInner.data.push(convertToCr(value.amount));
          temp[value.ulbName] = dataInner;
        }
      });
    }
    newData.data.datasets = [];
    let newlineDataset = JSON.parse(JSON.stringify(lineDataset));
    newlineDataset.data = [];
    for (const key in temp) {
      const element = temp[key];
      if (newlineDataset.data.length == 0) newlineDataset.data = element.data;
      newData.data.datasets.push(element);
    }
    newData.data.datasets.push(newlineDataset);

    this.mySelectedYears.map((value) => {
      if (!newData.data.labels.includes(value)) {
        newData.data.labels.push(value);
      }
    });
    this.barChart = newData;
    this.chartOptions = barChartStaticOptions;
  }

  createExpenditureData(data) {
    let newData = {};
    if (data.length != 2) {
      Object.assign(newData, {
        _id: { financialYear: data[0]._id },
        amount: data[0].yearData[0].amount + data[0].yearData[1].amount,
        ulbName: data[0].yearData[0].ulbName,
      });
    } else {
      let year1 = data[0],
        year2 = data[1],
        amount1 =
          year2.yearData.find((value) => value.code == "410") -
          year1.yearData.find((value) => value.code == "410"),
        amount2 =
          year2.yearData.find((value) => value.code == "412") -
          year1.yearData.find((value) => value.code == "412");
      Object.assign(newData, {
        _id: { financialYear: year1._id },
        amount: amount1 + amount2,
        ulbName: year1.yearData[0].ulbName,
      });
    }

    return [newData];
  }

  createPieChart(data) {
    if (this.filterName == "revenue mix")
      data["ulbData"] = this.createRevenueData(data);
    if (this.filterName == "own revenue mix")
      data["ulbData"] = this.createOwnRevenueData(data);

    const doughnutChartData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        },
      ],
    };
    doughnutChartData.labels = data["ulbData"].map((value, index) => {
      doughnutChartData.datasets[0].backgroundColor.push(
        pieBackGroundColor[index]
      );
      doughnutChartData.datasets[0].data.push(value.amount);
      return value._id.lineItem;
    });
    let config = {
      type: "doughnut",
      data: doughnutChartData,
    };

    this.barChart = config;
  }

  createOwnRevenueData(data) {
    return data["ulbData"];
  }

  createRevenueData(data) {
    let newdata = [];
    let othersAmount = 0;
    data["ulbData"].map((value) => {
      if (!showTotalRevenue.includes(value.code)) {
        othersAmount += value.amount;
      } else {
        newdata.push(value);
      }
    });

    newdata.push({ amount: othersAmount, _id: { lineItem: "Others" } });

    return newdata;
  }

  filterChangeInChart(value) {
    this.mySelectedYears = value.year;
    this.getChartData(value);
    console.log("filterChangeInChart", value);
  }
}

const pieBackGroundColor = [
  "#FF608B",
  "#FFD72E",
  "#22A2FF",
  "#1E44AD",
  "#585FFF",
  "#25C7CE",
  "#25C7CE",
  "#3C3C3C",
  "#E5FFF1",
  "#0FA755",
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
  label: "Line Dataset",
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

function convertToCr(value) {
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
                name: "About This indicator",
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
    name: "expand",
    svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
  },
  {
    name: "download",
    svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
  },
  {
    name: "share/embed",
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

const showTotalRevenue = ["160", "120", "171", "150"];

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
};