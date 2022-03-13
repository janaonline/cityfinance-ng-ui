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
        this.createGuageChart(
          `${this.data["chartId"]}chartjs-gauge`,
          ["#29CFD6", "#D6F2EB","#1067DE", "#E9E9E9","#FFC80F","#E9E9E9"],
          70,
        );
      }, 10);
    }
  }
  guageChart;
  createGuageChart(
    type,
    backgroundColor,
    getCutoutPercentage,
  ) {
    let canvas = <HTMLCanvasElement>document.getElementById(type);
    let chartData = {
      datasets: [
        {
          data: [this.data["value"], 100 - this.data["value"]],
          backgroundColor: [backgroundColor[0],backgroundColor[1]],
        },
        {
          data: [this.data["percentage"], 100 - this.data["percentage"]],
          backgroundColor: [backgroundColor[2],backgroundColor[3]],
        },
      ],
    }
    debugger
    if(this.data.hasOwnProperty("compPercentage")){
      chartData.datasets.push({
        data: [this.data["compPercentage"], 100 - this.data["compPercentage"]],
        backgroundColor: [backgroundColor[4],backgroundColor[5]],
      })
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
          enabled: false,
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
