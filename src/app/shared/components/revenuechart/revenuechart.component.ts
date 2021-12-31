import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import Chart from "chart.js";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
@Component({
  selector: "app-revenuechart",
  templateUrl: "./revenuechart.component.html",
  styleUrls: ["./revenuechart.component.scss"],
})
export class RevenuechartComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog) {}

  @ViewChild("template") template;
<<<<<<< HEAD
 //add your data and type when calling this comp
=======

  //Full Doughnut Chart Data of OwnRevenueDashboard Starts
  @Input()
  ownRevenueDoughnut = {
    type: "doughnut",
    data: {
      labels: [
        "Property Tax",
        "Advertisement Tax",
        "Total License Fee",
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
    options: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltips: {
        enabled: true,
      },
      cutoutPercentage: 45,
      responsive: true,
    },
  }; //Full Doughnut Chart Data of OwnRevenueDashboard Ends

  //Full Bar Chart Data of OwnRevenueDashboard Starts
  @Input()
  ownRevenueBarChart = {
    type: "bar",
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
  }; //Full Bar Chart Data of OwnRevenueDashboard Ends

>>>>>>> 80d45f5addb03e74e9f153194dfc64d7774adf96
  @Input()
  chartData = {
    // type: "bar",
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
    }
  };

@Input()
chartId;



  // options in case of sactter plot
  @Input()
  scatterOption = {
    elements: {
      point: {
        radius: 7,
      },
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Population",
          },
          ticks: {
            min: 0,
            max: 50,
          },
          offset: true,
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Total Revenue",
          },
          gridLines: {
            offsetGridLines: true,
            display: false,
          },
          ticks: {
            min: 0,
            max: 30,
          },
          offset: true,
        },
      ],
    },
    legend: {
      position: "bottom",
      align: "center",
      labels: {
        fontSize: 10,
        fontColor: "black",
        // usePointStyle: true,
        padding: 28,
      },
    },
  };


  @Input()
  headerActions = [
    {
      name: "expand",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
    },
    {
      name: "download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    {
      name: "embed",
      svg: "../../../../assets/CIty_detail_dashboard – 3/925895_embed_development_code_coding_dev_icon.svg",
    },
    {
      name: "share",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    },
  ];

  @Output()
  actionClicked = new EventEmitter();

  myChart;
  ngOnInit(): void {
<<<<<<< HEAD
  }
  ngAfterViewInit(): void {
    this.createChart()
=======
    this.createChart()
    // this.renderChart()
>>>>>>> 80d45f5addb03e74e9f153194dfc64d7774adf96
  }

  createChart() {
    if (this.chartData.type == "scatter")
      Object.assign(this.chartData, { options: this.scatterOption });
    const canvas = <HTMLCanvasElement>document.getElementById(this.chartId);
    const ctx = canvas.getContext("2d");
    this.myChart = new Chart(ctx, this.chartData);
  }

  actionClick(value) {
    console.log(value, "In revenue");
    if (value.name == "expand" || value.name == "collapse") {
      this.headerActions.map((innerVal) => {
        if (innerVal.name === value.name) {
          if (value.name == "expand") innerVal.name = "collapse";
          else value.name = "expand";
        }
      });
      this.myChart.destroy();
      this.createChart();
    }
    this.actionClicked.emit(value);
  }

  dialogRef;

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "39rem";
    this.dialogRef = this.dialog.open(this.template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
