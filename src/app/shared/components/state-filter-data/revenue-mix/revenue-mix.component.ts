import { Component,  Input, Output ,OnInit, SimpleChanges, EventEmitter } from "@angular/core";

@Component({
  selector: "app-revenue-mix",
  templateUrl: "./revenue-mix.component.html",
  styleUrls: ["./revenue-mix.component.scss"],
})
export class RevenueMixComponent implements OnInit {


@Input() chartData;
@Input() chartId;
@Input() chartTitle;
@Input() chartOptions;

@Output()
compType = new EventEmitter();

  doughnutArray: any = [
    {
      id: "p1",
      title: "Maharashtra",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },

      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p2",
      title: "Municipality",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p3",
      title: "Municipal Corporation",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p4",
      title: "Town Panchayat",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
  ];

  newDoughnutArray: any = [
    {
      id: "p5",
      title: "Maharashtra",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },

      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p6",
      title: "<100K",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p7",
      title: "100K-500K",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p8",
      title: "500k - 1M",
      data: {
        type: "doughnut",
        labels: [
          "Own Revenue",
          "Assigned Revenue",
          "Grants",
          "Interest Income",
          "Other Income",
          "State & Hire Charges",
        ],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100, 90, 75, 64],
            backgroundColor: [
              "#1E44AD",
              "#25C7CE",
              "#585FFF",
              "#FFD72E",
              "#22A2FF",
              "#FF608B",
            ],
            hoverOffset: 4,
          },
        ],
      },
      multipleChartOptions: {
        legend: {
          display: false,
        },
      },
    },
  ];

  doughnutArray1 = [
    {
      type: "doughnut",
      id: "p1",
      title: "4M+",
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
      id: "p2",
      title: "4M+",
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
      id: "p3",
      title: "4M+",
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
      id: "p4",
      title: "4M+",
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
      id: "p5",
      title: "4M+",
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

  doughnutChartData = {
    type: "doughnut",
    data: {
      type: "doughnut",
      labels: [
        "Own Revenue",
        "Assigned Revenue",
        "Grants",
        "Interest Income",
        "Other Income",
        "State & Hire Charges",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100, 90, 75, 64],
          backgroundColor: [
            "#1E44AD",
            "#25C7CE",
            "#585FFF",
            "#FFD72E",
            "#22A2FF",
            "#FF608B",
          ],
          hoverOffset: 4,
        },
      ],
    },
    // data: {
    //   labels: ["Red", "Blue", "Yellow"],
    //   datasets: [
    //     {
    //       label: "My First Dataset",
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         "rgb(255, 99, 132)",
    //         "rgb(54, 162, 235)",
    //         "rgb(255, 205, 86)",
    //       ],
    //       hoverOffset: 4,
    //     },
    //   ],
    // },
  };

  doughnutChartOptions = {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
  };
  constructor() {}

  ulbTab = false;
  populationTab = false;
  finalMultipleDoughnut = [];

  getMultipleDoughnutCharts() {
    if (this.ulbTab) {
      this.finalMultipleDoughnut = this.doughnutArray;
    }
    if (this.populationTab) {
      this.finalMultipleDoughnut = this.newDoughnutArray;
    }
    console.log(this.finalMultipleDoughnut);
  }

  ulbFunction(value) {
    console.log(value);
    if (value == 1) {
      this.ulbTab = true;
      this.populationTab = false;
    }
    if (value == 2) {
      this.ulbTab = false;
      this.populationTab = true;
    }
    if (value == 3) {
      this.ulbTab = false;
      this.populationTab = false;
    }

    console.log("this.ulbTab", this.ulbTab, this.populationTab);
  }

  ngOnInit(): void {
    this.getMultipleDoughnutCharts();
    console.log("doughnutArray", this.doughnutArray1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("revenue chages", changes);
  }
}
