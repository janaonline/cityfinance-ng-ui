import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import Chart from "chart.js";
import { FilterModelBoxComponent } from "../resources-dashboard/filter-model-box/filter-model-box.component";
import { OwnRevenueService } from "./own-revenue.service";

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
  changeTab(type) {
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

  @ViewChild("ownRevenueFiltersPopup")
  private ownRevenueFiltersPopup: TemplateRef<any>;

  ToggleString: string = "";
  showButton: boolean = true;

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
    { id: 2, title: "Average Own Revenue Collections (In Crore Rs.)" },
    { id: 3, title: "Median Own Revenue Per Capita" },
    {
      id: 4,
      title: "Percentage Of Cities Where Own Revenues Meet Revenue Expenditure",
    },
    {
      id: 5,
      title: "Average Own Revenues As Percentage Of Revenue Expenditure",
    },
  ];

  columnAttributeProperty = [
    { id: 1, title: "ULB Population Category" },
    { id: 2, title: "Average Property Tax Revenue Collections (In Crore Rs.)" },
    { id: 3, title: "Median Property Tax Revenue Per Capita" },
    {
      id: 4,
      title: "Average Property Tax Revenue As Percentage Of Own Revenu",
    },
  ];

  users = [
    {
      id: 1,
      name: "4M+",
      averageRevenue: "50",
      perCapita: "30",
      meetsRevenue: "30",
      avgRevenueMeet: "30",
    },
    {
      id: 2,
      name: "1M-4M",
      averageRevenue: "50",
      perCapita: "30",
      meetsRevenue: "30",
      avgRevenueMeet: "30",
    },
    {
      id: 3,
      name: "500K-1M",
      averageRevenue: "50",
      perCapita: "30",
      meetsRevenue: "30",
      avgRevenueMeet: "30",
    },
    {
      id: 4,
      name: "100K-500K",
      averageRevenue: "50",
      perCapita: "30",
      meetsRevenue: "30",
      avgRevenueMeet: "30",
    },
    {
      id: 5,
      name: "<100K",
      averageRevenue: "50",
      perCapita: "30",
      meetsRevenue: "30",
      avgRevenueMeet: "30",
    },
  ];

  doughnutChartId = `ownRevenue-doughnutChart-${Math.random()}`;
  barChartId = `ownRevenue-barChart-${Math.random()}`;

  doughnutChartData = {
    type: "doughnut",
    data: {
      labels: [
        "Property Tax",
        "Advertisement Tax",
        "Trade License Fee",
        "Water Charges",
        "Sewerage Charges",
        "Rental Income",
        "Other Income",
      ],
      datasets: [
        {
          data: [68, 22, 19, 7, 5, , 15, 20],
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
    responsive: true,
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: false,
        padding: 35,
        boxWidth: 13,
        boxHeight: 15,
      },
    },
  };
  doughnutChartTitle =
    "The following pie chart provides the split of the contribution various own revenue streams to the total own revenue.";

  barChartData = barChart;
  barChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  allUlbData = JSON.parse(localStorage.getItem("ulbList")).data;
  stateIds = JSON.parse(localStorage.getItem("stateIdsMap"));

  filterGroup = new FormGroup({
    stateId: new FormControl("State Name"),
    ulb: new FormControl("Ulb Name"),
    ulbType: new FormControl("Ulb Type"),
    populationCategory: new FormControl(""),
    financialYear: new FormControl("2018-19"),
  });

  ulbList = [];
  ulbTypeList = [];
  populationCategoryList = [
    "4M+",
    "500K - 1M",
    "100K - 500K",
    "1M - 4M",
    "200K - 500K",
  ];
  yearList = ["2018-19", "2019-20", "2020-21", "2021-22"];
  //Table Data Ends

  @Input()
  cardData = [
    revenueCollection,
    revenuePerCapita,
    revenueExpenditure,
    revenuePercentage,
  ];

  body: any;
  financialYear: any;
  constructor(
    private ownRevenueService: OwnRevenueService,
    private dialog: MatDialog
  ) {}

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

    this.createDataForFilter();
    this.getBarChartData();
    this.barChartTitle =
      "You can compare states on various financial indicators/parameters";

    this.allCalls();
  }

  allCalls() {
    this.getPieChartData();
    this.cardsData();
    this.tableData();
    this.getAvailableData();
  }

  clearFilter() {
    this.filterGroup.setValue({
      stateId: "State Name",
      ulb: "Ulb Name",
      ulbType: "Ulb Type",
      populationCategory: "Ulb Population Category",
      financialYear: "2018-19",
    });
  }

  getPieChartData() {
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
          res["data"].map((value) => {
            temp.data.labels.push(value._id["revenueName"]);
            temp.data.datasets[0].data.push(value.amount);
          });
          this.doughnutChartData = temp;
        },
        (err) => {}
      );
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
  getAvailableData() {
    this.body = {
      ...this.filterGroup.value,
      propertyTax: !this.ownTab,
    };
    this.ownRevenueService.displayDataAvailable(this.body).subscribe(
      (res) => {
        res["data"].percent = parseFloat(res["data"].percent.toFixed(2));
        this.financialYear = res;
        this.halfDoughnutChart(res["data"]?.percent ?? 0);
        console.log("ordResponse", res);
      },
      (err) => {
        console.log("error", err);
      }
    );
  }

  barChartCompValues(value) {
    console.log(value, "barChartCompValues");

    this.getBarChartData(value);
  }

  getBarChartData(
    body = {
      revenueId: "5dd10c2285c951b54ec1d737",
      stateIds: [],
      revenueName: "Property Tax",
    }
  ) {
    this.ownRevenueService.displayBarChartData(body).subscribe(
      (res) => {
        console.log("barChartBody", res);
        let tempData = {
          type: "bar",
          data: {
            labels: [],
            datasets: [
              {
                label: body.revenueName,
                data: [],
                borderRadius: 10,
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
        res["data"].map((value) => {
          let stateName = this.stateIds[value._id];
          tempData.data.labels.push(stateName);
          tempData.data.datasets[0].data.push(value.amount);
        });
        body.stateIds.map((value) => {
          if (!res["data"].find((innerValue) => innerValue._id == value)) {
            let stateName = this.stateIds[value];
            tempData.data.labels.push(stateName);
            tempData.data.datasets[0].data.push(0);
          }
        });
        this.barChartData = tempData;
      },
      (err) => {
        console.log("error", err);
      }
    );
  }

  halfDoughnutChart(valueFromApi = null) {
    const canvas = <HTMLCanvasElement>document.getElementById("myChart1");
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "Availability",
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
        cutoutPercentage: 80,
      },
    });
  }

  cardsData() {
    let body = {
      ...this.filterGroup.value,
      property: this.proTab,
    };
    this.ownRevenueService.getCardsData(body).subscribe(
      (res) => {
        console.log(res);
        if (this.ownTab) {
          this.ownTabCardsFormant(res["data"]);
        } else {
          this.proTabCardsFormat(res["data"]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ownTabCardsFormant(data) {
    let revenueCollectionCopy = deepCopy(revenueCollection),
      revenuePerCapitaCopy = deepCopy(revenuePerCapita),
      revenueExpenditureCopy = deepCopy(revenueExpenditure),
      revenuePercentageCopy = deepCopy(revenuePercentage),
      value = data[this.filterGroup.value.financialYear];

    revenueCollectionCopy.title = valueConvert(value.totalRevenue) ?? 0;
    revenuePerCapitaCopy.title = value.perCapita.toFixed(2) ?? 0;
    revenuePercentageCopy.title = value.percentage.toFixed(2) ?? 0;
    revenueExpenditureCopy.title =
      value.totalUlbMeetExpense.toFixed(2) ?? 0 + "%";

    this.cardData = [
      revenueCollectionCopy,
      revenuePerCapitaCopy,
      revenueExpenditureCopy,
      revenuePercentageCopy,
    ];
  }

  proTabCardsFormat(data) {
    let value = data[this.filterGroup.value.financialYear];
    let cards = deepCopy(porpertyCards);
    cards[0].title = valueConvert(value.totalProperty) ?? 0;
    cards[1].title = (value.totalProperty / value.population).toFixed(2) ?? 0;
    cards[2].title =
      (
        (value.totalProperty / (value.totalRevenue - value.totalProperty)) *
        100
      ).toFixed(2) + "%";
    this.cardData = cards;
  }

  tableData() {
    this.ownRevenueService.getTableData(this.filterGroup.value).subscribe(
      (res) => {
        if (this.proTab) this.columnAttribute = this.columnAttributeProperty;
        this.users = this.users.map((value) => {
          let data = res["data"][value.name];
          if (this.ownTab) {
            value.meetsRevenue = numCheck(
              (data.numOfUlb / data.numOfUlbMeetRevenue) * 100
            );
            if (data.totalExpense > 0) {
              value.avgRevenueMeet = numCheck(
                (parseInt(value.averageRevenue) / data.totalExpense) * 100
              );
            } else {
              value.avgRevenueMeet = "0";
            }
            if (data.numOfUlb > 0) {
              value.averageRevenue = numCheck(
                data.totalRevenue / data.numOfUlb
              );
            } else {
              value.averageRevenue = "0";
            }
            if (data.population > 0) {
              value.perCapita = numCheck(
                parseInt(value.averageRevenue) / data.population
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
      (error) => {}
    );
  }
}

function valueConvert(value) {
  return (value / 1000000).toFixed(2) + "Cr";
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
  title: "1000 Cr",
  subTitle: "Own Revenue Collections",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "5%",
  color: "#22C667",
};

const revenuePerCapita = {
  type: "5",
  title: "1000",
  subTitle: "Own Revenue Per Capita",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "3%",
  color: "#22C667",
};

const revenueExpenditure = {
  type: "5",
  title: "120",
  subTitle: "Cities Where Own Revenue Meet Revenue Expenditure",
  svg: "../../../assets/resources-das/south_west_red_24dp.svg",
  percentage: "2%",
  color: "#E64E4E",
};

const revenuePercentage = {
  type: "5",
  title: "72%",
  subTitle: "Own Revenue As A Percentage Of Revenue Expenditure",
  svg: "../../../assets/resources-das/north_east_green_24dp.svg",
  percentage: "3%",
  color: "#22C667",
};

function openOwnRevenuePopup() {
  throw new Error("Function not implemented.");
}

const barChart = {
  type: "bar",
  data: {
    labels: [
      "Jalandhar",
      "Chennai",
      "Pune",
      "Amhedabad",
      "Mumbai",
      "Jaipur",
      "Rohtak",
      "Nashik",
      "Nagpur",
      "Thane",
    ],
    datasets: [
      {
        data: [160, 140, 120, 100, 80, 60, 40, 20, 10, 5],
        borderRadius: 10,
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
    title: "1000",
    subTitle: "Property Tax Revenue",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "3%",
    color: "#22C667",
  },
  {
    type: "5",
    title: "1000",
    subTitle: "Property Tax Revenue Per Capita",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "3%",
    color: "#22C667",
  },
  {
    type: "5",
    title: "1000",
    subTitle: "Property Tax To Own Revenue Percentage",
    svg: "../../../assets/resources-das/north_east_green_24dp.svg",
    percentage: "3%",
    color: "#22C667",
  },
];
