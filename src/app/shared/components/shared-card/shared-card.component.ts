import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-shared-card",
  templateUrl: "./shared-card.component.html",
  styleUrls: ["./shared-card.component.scss"],
})
export class SharedCardComponent implements OnInit, AfterViewInit, OnChanges {
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
    //   console.log("resources", this.data);
    if (this.data)
      this.showButtons = this.data?.actionButtons
        ? this.data.actionButtons.length > 0
        : false;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {
    if (this.data.type === 6) {
      setTimeout(() => {
        this.createGuageChart(`${this.data["chartId"]}chartjs-gauge`, [], 65);
      }, 10);
    }
  }
  showThumb;
  guageChart;
  createGuageChart(type, backgroundColor, getCutoutPercentage) {
    let canvas = <HTMLCanvasElement>document.getElementById(type);
    let chartData = {
      datasets: [
        {
          label: "National avg",
          data: [
            this.data["nationalValue"],
            this.data["benchMarkValue"] - this.data["nationalValue"],
          ],

          hoverOffset: 4,
          backgroundColor: ["#FFC80F", "#E9E9E9"],
        },
        {
          label: this.data["ulbName"],
          data: [
            this.data["value"],
            this.data["benchMarkValue"] - this.data["value"],
          ],

          hoverOffset: 4,
          backgroundColor: ["#224BD5", "#E9E9E9"],
        },
      ],
    };
    addInLabel(this.data["ulbName"], "#224BD5");
    if (this.data.hasOwnProperty("compPercentage")) {
      addInLabel(this.data["compUlb"], "#04D30C");
      chartData.datasets.unshift({
        label: this.data["compUlb"],
        data: [
          this.data["compPercentage"],
          this.data["benchMarkValue"] - this.data["compPercentage"],
        ],
        hoverOffset: 4,
        backgroundColor: ["#04D30C", "#E9E9E9"],
      });
      this.showThumb = false;
    } else {
      this.showThumb = true;
      chartData.datasets.unshift({
        label: "Benchmark value",
        data: [this.data["benchMarkValue"], 0],
        hoverOffset: 4,
        backgroundColor: ["#29CFD6", "#E9E9E9"],
      });
    }

    const ctx = canvas.getContext("2d");
    this.guageChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        circumference: Math.PI,
        rotation: Math.PI,
        cutoutPercentage: getCutoutPercentage, // precent
        legend: {
          display: false,
        },
        tooltips: {
          mode: "index",
          callbacks: {
            label: function (tooltipItem, data) {
              console.log(tooltipItem, data);
              let tempVal = isNaN(
                Number(data.datasets[tooltipItem.datasetIndex].data[0])
              )
                ? 0
                : Number(
                    data.datasets[tooltipItem.datasetIndex].data[0]
                  ).toFixed(2);
              return (
                data.datasets[tooltipItem.datasetIndex].label + " " + tempVal
              );
            },
            labelColor: function (tooltipItem, chart) {
              return {
                borderColor: getLabelColor(
                  chart.data.datasets[tooltipItem.datasetIndex].label
                ),
                backgroundColor: getLabelColor(
                  chart.data.datasets[tooltipItem.datasetIndex].label
                ),
              };
            },
          },
        },
      },
    });
  }
  // DEMO Code: not relevant to example
  change_gauge(chart, data, key) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data = data[key];
    });
    chart.update();
  }
}

let labelColor = {
  ["Benchmark value"]: "#29CFD6",
  ["National avg"]: "#FFC80F",
};

function addInLabel(name, color) {
  Object.assign(labelColor, { [name]: color });
}

function getLabelColor(name) {
  return labelColor[name];
}