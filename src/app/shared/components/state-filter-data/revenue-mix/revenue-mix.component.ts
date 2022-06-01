import {
  Component,
  Input,
  Output,
  OnInit,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-revenue-mix",
  templateUrl: "./revenue-mix.component.html",
  styleUrls: ["./revenue-mix.component.scss"],
})
export class RevenueMixComponent implements OnInit {
  @Input() SelecetedUlb;
  @Input() chartData;
  @Input() chartId;
  @Input() chartTitle;
  @Input() multipleTitle;
  @Input() chartOptions;
  @Input() multiChart: boolean = false;
  @Input() returnCompType: boolean = false;
  @Output() dounghnuChartLabels = new EventEmitter<any>();

  @Output()
  compType = new EventEmitter();

  ulbStateMapping = JSON.parse(localStorage.getItem("ulbMapping"));
  stateIdsMap = JSON.parse(localStorage.getItem("stateIdsMap"));

  doughnutBackgroundColor = [
    "#76d12c",
    "#ed8e3b",
    "#15c3eb",
    "#eb15e3",
    "#e6e21c",
    "#fc3d83",
    // picked from mockup
    "#1E44AD",
    "#25C7CE",
    "#585FFF",
    "#FFD72E",
    "#22A2FF",
    "#FF608B",
  ];

  mainDoughnutArray: any = [
    {
      type: "doughnut",
      id: "s1",
      title: "state",
      data: {
        labels: [],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
        legend: {
          display: false,
        },
      },
    },
    {
      type: "doughnut",
      id: "s2",
      title: "Ulb",
      data: {
        labels: [],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
        legend: {
          display: false,
        },
      },
    },
  ];

  doughnutArray: any = [
    {
      id: "p1",
      title: "State Average",
      type: "doughnut",
      data: {
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
            // data: [0,0,0,0,0,0],
            data: [],
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },

      options: {
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
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p2",
      title: "Municipality",
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: [],
            // backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p3",
      title: "Municipal Corporation",
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
        legend: {
          display: false,
        },
      },
    },
    {
      id: "p4",
      title: "Town Panchayat",
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "My First Dataset",
            data: [],
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
        legend: {
          display: false,
        },
      },
    },
  ];
  //population based
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
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },

      options: {
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
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
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
            // backgroundColor: [
            //   "#76d12c",
            //   "#ed8e3b",
            //   "#15c3eb",
            //   "#eb15e3",
            //   "#e6e21c",
            //   "#fc3d83",
            // ],
            backgroundColor: this.doughnutBackgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    },
  ];
  //population based again
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
  //single dounught
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
  };
  //options
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

  multipleChartLabelArray = [
    { text: "test", color: "#FF608B" },
    { text: "test", color: "#FF608B" },
    { text: "test", color: "#FF608B" },
  ];
  constructor() {}

  ulbTab: boolean = false;
  populationTab: boolean = false;

  finalMultipleDoughnut = [];
  stateName: string = "";
  getChartLabel(event) {
    console.log(event);
    let data = [];
    event.forEach((element) => {
      data.push(element.text);
    });
    console.log("labels", data);
    this.dounghnuChartLabels.emit(data);
  }

  ulbValVar: boolean = false;

  getMultipleDoughnutCharts() {
    this.ulbValVar = false;
    if (this.ulbTab || this.populationTab) {
      this.finalMultipleDoughnut = this.doughnutArray;
    }
    if (!this.ulbTab && !this.populationTab && this.SelecetedUlb) {
      this.ulbValVar = true;
      this.finalMultipleDoughnut = this.mainDoughnutArray;
    }
    this.finalMultipleDoughnut = [...this.finalMultipleDoughnut];
    console.log(this.finalMultipleDoughnut);
  }

  multipleChartShow = false;

  ulbFunction(value) {
    console.log(value);
    if (value == 1) {
      this.ulbTab = true;
      this.populationTab = false;

      this.multipleChartShow = true;
      this.compType.emit("ulbType");
    }
    if (value == 2) {
      this.ulbTab = false;
      this.populationTab = true;

      this.multipleChartShow = true;
      this.compType.emit("popType");
    }
    if (value == 3) {
      this.ulbTab = false;
      this.populationTab = false;

      this.multipleChartShow = false;
      this.compType.emit("default");
    }

    console.log("this.ulbTab", this.ulbTab, this.populationTab);
  }

  ngOnInit(): void {
    this.getMultipleDoughnutCharts();
    console.log(
      "doughnutArray====>",
      this.doughnutArray1,
      this.multipleTitle,
      this.chartData
    );
  }

  defaultUlbData = {
    id: "p5",
    title: "Ulb",
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          label: "My First Dataset",
          data: [],
          backgroundColor: this.doughnutBackgroundColor,
          hoverOffset: 4,
        },
      ],
    },
    options: {
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
      legend: {
        display: false,
      },
    },
  };

  initializeDounughtArry() {
    console.log("ulbTab initialzation==>", this.chartData);
    let labels = this.fetchLabels(this.chartData[0]?.mData);
    this.doughnutArray = [
      {
        id: "p1",
        title: `${this.stateName ? this.stateName : "State Average"}`,
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "My First Dataset",
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: this.doughnutBackgroundColor,
              // backgroundColor: [
              //   "#76d12c",
              //   "#ed8e3b",
              //   "#15c3eb",
              //   "#eb15e3",
              //   "#e6e21c",
              //   "#fc3d83",
              // ],
              hoverOffset: 4,
            },
          ],
        },

        options: {
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                // console.log('tooltip', tooltipItem, data);
                var dataset = data.datasets[tooltipItem.datasetIndex];
                // console.log('dataset', dataset);
                // console.log('label', data.labels[tooltipItem.index]);

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
                var labelName = data.labels[tooltipItem.index];
                return percentage + "%";
                // return `${labelName ? labelName : ''} - ${percentage} %`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p2",
        title: "Municipality",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p3",
        title: "Municipal Corporation",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p4",
        title: "Town Panchayat",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
    ];
  }

  fetchLabels(data) {
    let arr = [];
    data.forEach((element) => {
      arr.push(element?._id);
    });
    return arr;
  }
  initializePopulationDoughnutArray() {
    console.log("ulbTab initialzation==>", this.chartData);
    let labels = this.fetchLabels(this.chartData[0]["<100k"]);
    this.doughnutArray = [
      {
        id: "p1",
        title: `${this.stateName ? this.stateName : "State Average"}`,
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "My First Dataset",
              data: [0, 0, 0, 0, 0, 0],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p2",
        title: "<100k",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p3",
        title: "100k-500k",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p4",
        title: "500k-1M",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p4",
        title: "1m-4m",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
      {
        id: "p4",
        title: "4m+",
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              label: "My First Dataset",
              data: [],
              backgroundColor: this.doughnutBackgroundColor,
              hoverOffset: 4,
            },
          ],
        },
        options: {
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
          legend: {
            display: false,
          },
        },
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("revenue chages", changes);
    const statesList = localStorage.getItem("stateIdsMap")
      ? JSON.parse(localStorage.getItem("stateIdsMap"))
      : null;
    const stateId = sessionStorage.getItem("row_id")
      ? sessionStorage.getItem("row_id")
      : null;
    if (statesList) {
      this.stateName = statesList[stateId];
    }
    if (
      changes &&
      changes.returnCompType &&
      changes.returnCompType.currentValue
    ) {
      // this.ulbTab
      //   ? this.initializeDounughtArry()
      //   : this.populationTab
      //   ? this.initializePopulationDoughnutArray()
      //   : "";
      if (changes.returnCompType.currentValue == "ulbType") {
        this.ulbTab = true;
        this.populationTab = false;
        this.multipleChartShow = true;
      } else if (changes.returnCompType.currentValue == "popType") {
        this.ulbTab = false;
        this.populationTab = true;
        this.multipleChartShow = true;
      } else {
        this.ulbTab = false;
        this.populationTab = false;
        this.multipleChartShow = false;
      }
    }

    if (!changes.chartData?.firstChange) {
      console.log(
        "revenueMix changes",
        this.chartData,
        this.multipleChartShow,
        changes
      );
      this.ulbTab
        ? this.initializeDounughtArry()
        : this.populationTab
        ? this.initializePopulationDoughnutArray()
        : "";

      if (Array.isArray(this.chartData)) {
        console.log("Main Chart data", this.chartData);

        this.chartData.forEach((el) => {
          console.log(
            "chartData",
            el,
            "keys",
            Object.keys(el)[0],
            "value",
            Object.values(el)[0]
          );
          if (this.ulbTab) {
            if (Object.keys(el)[0] == "mData") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[1].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[1].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[1].data.labels.push(
                  el2["code"] ? el2["code"] : el2["code"]
                );
                this.doughnutArray[1].data.datasets[0].data.push(el2["amount"]);
              });
              console.log("mData==>", this.doughnutArray[1].data);
            }
            if (Object.keys(el)[0] == "mcData") {
              let val: any = Object.values(el)[0];

              this.doughnutArray[2].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[2].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[2].data.labels.push(el2["code"]);
                this.doughnutArray[2].data.datasets[0].data.push(el2["amount"]);
              });

              console.log("mData==>", this.doughnutArray[2].data);
            }
            if (Object.keys(el)[0] == "tpData") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[3].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[3].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[3].data.labels.push(el2["code"]);
                this.doughnutArray[3].data.datasets[0].data.push(el2["amount"]);
              });
            }
            if (Object.keys(el)[0] == "ulbStateData") {
              let val: any = Object.values(el)[0];
              console.log("state val", val);
              this.doughnutArray[0].data.datasets[0].backgroundColor = [];
              this.doughnutArray[0].data.labels = [];
              this.doughnutArray[0].data.datasets[0].data = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[0].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[0].data.labels.push(el2["_id"]);
                this.doughnutArray[0].data.datasets[0].data.push(el2["amount"]);
              });
              console.log(" this.doughnutArray[0]", this.doughnutArray[0]);
            }
            if (Object.keys(el)[0] == "ulb") {
              let tempUlbData = Object.assign(this.defaultUlbData);
              console.log("tempUlbData", tempUlbData);

              let val: any = Object.values(el)[0];
              tempUlbData.data.labels = [];
              tempUlbData.title = this.ulbStateMapping[this.SelecetedUlb].name;
              tempUlbData.data.datasets[0].data = [];
              tempUlbData.data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  tempUlbData.data.datasets[0].backgroundColor.push(el2.colour);
                }
                tempUlbData.data.labels.push(el2["_id"]);

                tempUlbData.data.datasets[0].data.push(el2["amount"]);
              });

              // tempUlbData.tite = this.ulbStateMapping[this.]

              this.doughnutArray.splice(1, 0, tempUlbData);
            }
          }

          console.log("chhcchchhchch", this.chartData);

          if (this.populationTab) {
            if (Object.keys(el)[0] == "<100k") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[1].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[1].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[1].data.labels.push(el2["code"]);
                this.doughnutArray[1].data.datasets[0].data.push(el2["amount"]);
              });
            }
            if (Object.keys(el)[0] == "100k-500k") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[2].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[2].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[2].data.labels.push(el2["code"]);
                this.doughnutArray[2].data.datasets[0].data.push(el2["amount"]);
              });
            }
            if (Object.keys(el)[0] == "500k-1M") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[3].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[3].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[3].data.labels.push(el2["code"]);
                this.doughnutArray[3].data.datasets[0].data.push(el2["amount"]);
              });
            }
            if (Object.keys(el)[0] == "1m-4m") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[4].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[4].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[4].data.labels.push(el2["code"]);
                this.doughnutArray[4].data.datasets[0].data.push(el2["amount"]);
              });
            }
            if (Object.keys(el)[0] == "4m+") {
              let val: any = Object.values(el)[0];
              this.doughnutArray[5].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[5].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[5].data.labels.push(el2["code"]);
                this.doughnutArray[5].data.datasets[0].data.push(el2["amount"]);
              });
            }
            console.log("Object.keys(el)[0]", Object.keys(el)[0]);
            if (Object.keys(el)[0] == "popStateData") {
              let val: any = Object.values(el)[0];
              console.log("state val", val);
              this.doughnutArray[0].data.datasets[0].backgroundColor = [];

              this.doughnutArray[0].data.labels = [];
              this.doughnutArray[0].data.datasets[0].data = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.doughnutArray[0].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.doughnutArray[0].data.labels.push(el2["_id"]);
                this.doughnutArray[0].data.datasets[0].data.push(el2["amount"]);
              });
              console.log("this.doughnutArray[0]==>", this.doughnutArray[0]);
            }
            if (Object.keys(el)[0] == "ulb") {
              let tempUlbData = Object.assign(this.defaultUlbData);
              let val: any = Object.values(el)[0];

              tempUlbData.data.labels = [];
              tempUlbData.data.datasets[0].data = [];
              tempUlbData.title = this.ulbStateMapping[this.SelecetedUlb].name;

              tempUlbData.data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  tempUlbData.data.datasets[0].backgroundColor.push(el2.colour);
                }
                tempUlbData.data.labels.push(el2["_id"]);

                tempUlbData.data.datasets[0].data.push(el2["amount"]);
              });

              this.doughnutArray.splice(1, 0, tempUlbData);
            }
          }
          if (!this.ulbTab && !this.populationTab && this.SelecetedUlb) {
            if (Object.keys(el)[0] == "state") {
              let val: any = Object.values(el)[0];
              console.log(val);
              this.mainDoughnutArray[0].title = this.stateName;
              this.mainDoughnutArray[0].data.labels = [];
              this.mainDoughnutArray[0].data.datasets[0].data = [];
              this.mainDoughnutArray[0].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.mainDoughnutArray[0].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.mainDoughnutArray[0].data.labels.push(el2["_id"]);
                this.mainDoughnutArray[0].data.datasets[0].data.push(
                  el2["amount"]
                );
              });
            }
            if (Object.keys(el)[0] == "ulb") {
              // let val : any = Object.values(el)[0][0]
              let val: any = Object.values(el)[0];
              console.log(
                "this.ulbStateMapping",
                this.ulbStateMapping,
                this.SelecetedUlb,
                this.ulbStateMapping[this.SelecetedUlb]
              );
              this.mainDoughnutArray[1].title =
                this.ulbStateMapping[this.SelecetedUlb].name;

              this.mainDoughnutArray[1].data.labels = [];
              this.mainDoughnutArray[1].data.datasets[0].data = [];

              this.mainDoughnutArray[0].data.datasets[0].backgroundColor = [];
              val.forEach((el2) => {
                if (el2.hasOwnProperty("colour")) {
                  this.mainDoughnutArray[1].data.datasets[0].backgroundColor.push(
                    el2.colour
                  );
                }
                this.mainDoughnutArray[1].data.labels.push(el2["_id"]);
                this.mainDoughnutArray[1].data.datasets[0].data.push(
                  el2["amount"]
                );
              });

              console.log("mainDoughnutArr", this.mainDoughnutArray);
            }
          }
        });

        /* Adding the values of the arrays together to get the state level data */
        // this.doughnutArray[0].data.datasets[0].data = [
        //   this.doughnutArray[1].data.datasets[0].data,
        //   this.doughnutArray[2].data.datasets[0].data,
        //   this.doughnutArray[3].data.datasets[0].data]
        //   .reduce(function (a, b) {
        //       return a.map(function (v, i) {
        //           return v + b[i];
        //       });
        //   });

        if (this.populationTab) {
          // let totalDataSet = [];
          // for (let i = 0; i < this.doughnutArray.length; i++) {
          //   totalDataSet.push(this.doughnutArray[i].data.datasets[0].data);
          // }
          // let totalDataSet = [
          //   this.doughnutArray[1].data.datasets[0].data,
          //   this.doughnutArray[2].data.datasets[0].data,
          //   this.doughnutArray[3].data.datasets[0].data,
          //   this.doughnutArray[4].data.datasets[0].data,
          //   this.doughnutArray[5].data.datasets[0].data,
          // ];
          // console.log("populationTabSumTotal", this.getSumTotal(totalDataSet));
          // this.doughnutArray[0].data.datasets[0].backgroundColor =
          //   this.doughnutArray[1].data.datasets[0].backgroundColor;
          // this.doughnutArray[0].data.datasets[0].data = totalDataSet.reduce(
          //   function (a, b) {
          //     return a.map(function (v, i) {
          //       return v + b[i];
          //     });
          //   }
          // );
        } else if (this.ulbTab) {
          // let totalDataSet = [];
          // for (let i = 0; i < this.doughnutArray.length; i++) {
          //   totalDataSet.push(this.doughnutArray[i].data.datasets[0].data);
          // }
          // let totalDataSet = [
          //   this.doughnutArray[1].data.datasets[0].data,
          //   this.doughnutArray[2].data.datasets[0].data,
          //   this.doughnutArray[3].data.datasets[0].data,
          // ];
          // this.doughnutArray[0].data.datasets[0].backgroundColor =
          //   this.doughnutArray[1].data.datasets[0].backgroundColor;
          // console.log("ulbTabSumTotal", this.getSumTotal(totalDataSet));
          // this.doughnutArray[0].data.datasets[0].data = totalDataSet.reduce(
          //   function (a, b) {
          //     return a.map(function (v, i) {
          //       return v + b[i];
          //     });
          //   }
          // );
        } else if (!this.ulbTab && !this.populationTab && this.SelecetedUlb) {
          // let totalDataSet = [];
          // for (let i = 0; i < this.mainDoughnutArray.length; i++) {
          //   totalDataSet.push(this.mainDoughnutArray[i].data.datasets[0].data);
          // }
          // let totalDataSet = [
          //   this.mainDoughnutArray[0].data.datasets[0].data,
          //   this.mainDoughnutArray[1].data.datasets[0].data,
          // ];
          // this.mainDoughnutArray[0].data.datasets[0].backgroundColor =
          //   this.mainDoughnutArray[1].data.datasets[0].backgroundColor;
          // console.log("ulbTabSumTotal", this.getSumTotal(totalDataSet));
          // this.mainDoughnutArray[0].data.datasets[0].data = totalDataSet.reduce(
          //   function (a, b) {
          //     return a.map(function (v, i) {
          //       return v + b[i];
          //     });
          //   }
          // );
        }
      }
      console.log(this.doughnutArray);
      this.getMultipleDoughnutCharts();
    }
  }

  getSumTotal(dataSet: any) {
    return dataSet.reduce(function (a, b) {
      return a.map(function (v, i) {
        return v + b[i];
      });
    });
  }
}
