import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import Chart from "chart.js";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-revenuechart",
  templateUrl: "./revenuechart.component.html",
  styleUrls: ["./revenuechart.component.scss"],
})
export class RevenuechartComponent implements OnInit, AfterViewInit, OnChanges {

  chartDialogues =false;
  chartOptions;
  @Input()
  btnBesideText= false;
  constructor(public dialog: MatDialog) {}

  @ViewChild("template") template;
  @Input()
   chartTitle='Total revenue of MCGM for last 3 years compared with state average';
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
    },
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
    // legend: {
    //   position: "bottom",
    //   align: "center",
    //   labels: {
    //     fontSize: 10,
    //     fontColor: "black",
    //     // usePointStyle: true,
    //     padding: 0
    //   },
    // },
  };

  @Input()
  ChartOptions: {
    maintainAspectRatio: false,
    responsive: true,
  legend: {
              position: "bottom",
    labels: {
              // usePointStyle: false,
              padding: 35,
              boxWidth: 24,
              boxHeight:18
        }
    },
  }

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
  @Output()
  compareChange = new EventEmitter();
  myChart;
  yearList = ["2015-16", "2016-17", "2017-18", "2018-19", "2019-20", "2020-21"];
  @Input()
  mySelectedYears = ["2019-20", "2020-21"];
  year;
  compareType = "";

  ngOnInit(): void {
    this.year = new FormControl(this.mySelectedYears, { updateOn: "blur" });
    console.log('chartTitle', this.chartTitle)
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.year.valueChanges.subscribe((change) => this.sendValue());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.chartData) {
      if (!changes.chartData.firstChange) {
        this.myChart.destroy();
        this.createChart();
      }
    }
    if (changes?.mySelectedYears) {
      this.year = new FormControl(this.mySelectedYears);
    }
  }

  createChart() {
  //  debugger
    // let option = this.ChartOptions;
    let option = {
      maintainAspectRatio: false,
      responsive:true,
      // borderRadius: 12,
    legend: {
                position: "bottom",
      labels: {
                usePointStyle: false,
                padding: 35,
                boxWidth: 13,
                boxHeight:15
          }
      },

    }
    if (this.chartData.type == "scatter")
      Object.assign(this.chartData, { options: this.scatterOption });
      Object.assign(this.chartData, { options: this.ChartOptions });
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

  getCompareCompValues(value) {
    if (Array.isArray(value)) {
      this.compareType = "ULBs..";
      return this.sendValue(value);
    } else this.compareType = value;
    this.sendValue();
  }

  sendValue(ulbs = []) {
    let data = {
      year: this.year.value,
      ulbs: ulbs,
      compareType: this.compareType,
    };
    this.compareChange.emit(data);
  }
}
