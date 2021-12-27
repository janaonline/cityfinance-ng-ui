import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-shared-card",
  templateUrl: "./shared-card.component.html",
  styleUrls: ["./shared-card.component.scss"],
})
export class SharedCardComponent implements OnInit, AfterViewInit {
  constructor() {}

  @Input()
  cardStyle = {
    // width: "20em",
    borderRadius: "0.7500em",
    height: "8rem",
  };
  @Input()
  data = {
    type: 6,
    title: "title",
    subTitle: "subTitle",
    svg: `../../../../assets/7340549_e-commerce_online_shopping_ui_receipt_icon.svg`,
    img: "",
    para: "",
    actionButtons: [
      {
        name: "btn1",
        function: "",
      },
      {
        name: "btn2",
        function: "",
      },
    ],
    number: 230,
    amount: "567 Cr",
    projectId: 123,
    text: "",
    id: 1,
  };

  showButtons = false;
  ngOnInit(): void {
    console.log("resources", this.data);
    if (this.data)
      this.showButtons = this.data?.actionButtons
        ? this.data.actionButtons.length > 0
        : false;
  }

  ngAfterViewInit() {
    if (this.data.type === 6) {
      this.createGuageChart("chartjs-gauge");
      this.createGuageChart("chartjs-gauge2");
      this.createGuageChart("chartjs-gauge3");
    }
  }

  guageChart;
  createGuageChart(type) {
    // Create chart
    let canvas = <HTMLCanvasElement>document.getElementById(type);
    let chart1, chart2;
    switch (type) {
      case "chartjs-gauge2":
        chart1 = document.getElementById("chartjs-gauge").style;
        chart2 = document.getElementById("chart2").style;
        console.log(chart1, chart2, "charts");

        chart2.height =
          (parseInt(chart1.height.split("px")[0]) - 8).toString() + "px";
        chart2.width =
          (parseInt(chart1.width.split("px")[0]) - 12).toString() + "px";
        chart2.zIndex = "9";
        chart2.marginTop = "-" + chart2.height;
        chart2.marginLeft = "6px";
        break;

      case "chartjs-gauge3":
        chart1 = document.getElementById("chart2").style;
        chart2 = document.getElementById("chart3").style;
        chart2.height =
          (parseInt(chart1.height.split("px")[0]) - 8).toString() + "px";
        chart2.width =
          (parseInt(chart1.width.split("px")[0]) - 12).toString() + "px";
        chart2.zIndex = "10";
        chart2.marginTop = "-" + chart2.height;
        chart2.marginLeft = "12px";
        break;
    }
    const ctx = canvas.getContext("2d");
    this.guageChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue"],
        datasets: [
          {
            label: "Gauge",
            data: [10, 190],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
          },
        ],
      },
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: 90, // precent
        plugins: {
          datalabels: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderColor: "#ffffff",
            color: function (context) {
              return context.dataset.backgroundColor;
            },
            font: function (context) {
              var w = context.chart.width;
              return {
                size: w < 512 ? 18 : 20,
              };
            },
            align: "start",
            anchor: "start",
            offset: 10,
            borderRadius: 4,
            borderWidth: 1,
            formatter: function (value, context) {
              var i = context.dataIndex;
              var len = context.dataset.data.length - 1;
              if (i == len) {
                return null;
              }
              return value + " mph";
            },
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }
  // DEMO Code: not relevant to example
  change_gauge(chart, label, data) {
    chart.data.datasets.forEach((dataset) => {
      if (dataset.label == label) {
        dataset.data = data;
      }
    });
    chart.update();
  }
}
