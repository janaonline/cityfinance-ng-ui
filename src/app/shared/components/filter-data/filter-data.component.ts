import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from "@angular/core";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-filter-data",
  templateUrl: "./filter-data.component.html",
  styleUrls: ["./filter-data.component.scss"],
})
export class FilterDataComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(private commonService: CommonService) {}

  scatterData = scatterData;
  barChart = barChart;
  btnSelected = false;
  aboutIndicators;
  lastSelectedId;
  expand = false;
  @Input()
  data = incomingData;

  ngOnInit(): void {
    this.data = this.data["mainContent"][0];
    this.aboutIndicators = this.data["static"].indicators;
    console.log(this.data, "data in app-filter");
  }

  ngAfterViewInit(): void {
    if (this.data.btnLabels.length) this.changeActiveBtn(0);
  }

  changeActiveBtn(i) {
    let id = `btn-${i}`;
    if (this.lastSelectedId) {
      document.getElementById(this.lastSelectedId).classList.remove("selected");
      document.getElementById(this.lastSelectedId).classList.add("deSelected");
    }
    document.getElementById(id).classList.remove("deSelected");
    document.getElementById(id).classList.add("selected");
    this.lastSelectedId = id;

    this.getChartData();
  }

  actionFromChart(value) {
    console.log(value, "in filter");
    if (value.name === "expand" || value.name === "collapse")
      this.expand = !this.expand;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data.firstChange)
      this.data = changes.data.currentValue["mainContent"][0];
  }

  getChartData() {
    let body = {
      ulb: ["5dd24728437ba31f7eb42e7a"],
      financialYear: ["2015-16", "2017-18", "2018-19", "2019-20", "2020-21"],
      headOfAccount: "Revenue",
      filterName: "property_tax",
      isPerCapita: true,
      compareType: "ulb",
    };
    body.filterName = body.filterName.toLocaleLowerCase().split(" ").join("_");
    this.commonService.getChartDataByIndicator(body).subscribe(
      (res) => {
        console.log(res, "getChartDataByIndicator");
      },
      (error) => {}
    );
  }
}

const barChart = {
  type: "bar",
  data: {
    labels: ["first", "second"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Line Dataset",
        data: [12, 22, 32, 42],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

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