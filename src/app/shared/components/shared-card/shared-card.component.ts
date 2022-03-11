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
          "benchMark",
          `${this.data["chartId"]}chartjs-gauge`,
          ["#29CFD6", "#D6F2EB"],
          90,
          "value"
        );
        this.createGuageChart(
          "percentage",
          `${this.data["chartId"]}chartjs-gauge2`,
          ["#1067DE", "#E9E9E9"],
          80,
          "percentage"
        );
        if (this.data.hasOwnProperty("compare") && this.data["compare"])
          this.createGuageChart(
            "compare",
            `${this.data["chartId"]}chartjs-gauge3`,
            "#FFC80F",
            70,
            "some"
          );
      }, 100);
    }
  }
  guageChart;
  createGuageChart(
    chartName,
    type,
    backgroundColor,
    getCutoutPercentage,
    dataKey
  ) {
    // Create chart
    let canvas = <HTMLCanvasElement>document.getElementById(type);
    let chart1, chart2;
    switch (type) {
      case `${this.data["chartId"]}chartjs-gauge2`:
        chart1 = document.getElementById(
          `${this.data["chartId"]}chartjs-gauge`
        ).style;
        chart2 = document.getElementById(`${this.data["chartId"]}chart2`).style;
        console.log(chart1, chart2, "charts");

        chart2.height = parseInt(chart1.height.split("px")[0]) - 15 + "px";
        chart2.width = parseInt(chart1.width.split("px")[0]) - 30 + "px";
        chart2.zIndex = "9";
        chart2.marginTop = "-" + chart2.height;
        chart2.marginLeft = "12px";
        break;

      case `${this.data["chartId"]}chartjs-gauge3`:
        chart1 = document.getElementById(`${this.data["chartId"]}chart2`).style;
        chart2 = document.getElementById(`${this.data["chartId"]}chart3`).style;
        chart2.height = parseInt(chart1.height.split("px")[0]) - 8 + "px";
        chart2.width = parseInt(chart1.width.split("px")[0]) - 12 + "px";
        chart2.zIndex = "10";
        chart2.marginTop = "-" + chart2.height;
        chart2.marginLeft = "12px";
        break;
    }

    if (chart2) {
      let num = document.getElementById(
        `${this.data["chartId"]}chartNum`
      ).style;
      num.marginTop =
        "-" + (parseInt(chart2.height.split("px")[0]) / 2 - 2) + "px";
      num.fontSize = parseInt(chart2.height.split("px")[0]) / 4 + "px";
    }

    const ctx = canvas.getContext("2d");
    this.guageChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "Gauge",
            data: [this.data[dataKey], 100 - this.data[dataKey]],
            backgroundColor: [...backgroundColor],
          },
        ],
      },
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
    console.log(this.guageChart);
  }
  // DEMO Code: not relevant to example
  change_gauge(chart, data, key) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data = data[key];
    });
    chart.update();
  }
}
