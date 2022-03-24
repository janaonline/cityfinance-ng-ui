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
  ElementRef,
} from "@angular/core";
import Chart from "chart.js";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import html2canvas from "html2canvas";
import { GlobalLoaderService } from "../../../../app/shared/services/loaders/global-loader.service";

@Component({
  selector: "app-revenuechart",
  templateUrl: "./revenuechart.component.html",
  styleUrls: ["./revenuechart.component.scss"],
})
export class RevenuechartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  chartDialogues = false;
  chartOptions;
  @Input()
  btnBesideText = false;
  constructor(
    public dialog: MatDialog,
    public _loaderService: GlobalLoaderService
  ) {}

  @ViewChild("template") template;
  @Input()
  chartTitle = "ULB_NAME total revenues vs State ULB_TYPE Average";
  @Input()
  chartData = {
    // type: "bar",
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Municipality",
          data: [
           
          ],
          showLine: false,
          fill: true,
          borderColor: "#1EBFC6",
          backgroundColor: "#1EBFC6",
        },
        {
          label: "Municipal Corporation",
          data: [
            
          ],
          showLine: false,
          fill: true,
          borderColor: "#3E5DB1",
          backgroundColor: "#3E5DB1",
        },
        {
          label: "Town Panchayat",
          data: [
           
          ],
          showLine: false,
          fill: true,
          borderColor: "#F5B742",
          backgroundColor: "#F5B742",
        },
        {
          label: "National Average",
          data: [
            { x: 0, y: 12 },
            { x: 50, y: 12 },
          ],
          showLine: true,
          fill: false,
          borderColor: "rgba(0, 200, 0, 1)",
        },
        {
          label: "State Average",
          data: [
            { x: 0, y: 8 },
            { x: 50, y: 8 },
          ],
          showLine: true,
          fill: false,
          borderColor: "red",
        },
      ],
    },
  };
  @Input()
  chartId;

  @Input()
  own;

  @Input()
  notFound;
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
         
          offset: true,
        },
      ],
    },
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
              var label = data.datasets[tooltipItem.datasetIndex]['labels'][tooltipItem.index];
              var rev = data.datasets[tooltipItem.datasetIndex]['rev'][tooltipItem.index];
              return datasetLabel + ': ' + label + `(${rev.toFixed(2)})`;
          }
      }
  },
    legendCallback: function (chart) {
      var text = [];
      text.push('<ul class="' + this.chartId + '-legend">');
      for (var i = 0; i < chart.data.datasets.length; i++) {
        text.push(
          '<li><div class="legendValue"><span style="background-color:' +
            chart.data.datasets[i].backgroundColor +
            '">&nbsp;&nbsp;&nbsp;&nbsp;</span>'
        );

        if (chart.data.datasets[i].label) {
          text.push(
            '<span class="label">' + chart.data.datasets[i].label + "</span>"
          );
        }

        text.push('</div></li><div class="clear"></div>');
      }

      text.push("</ul>");

      return text.join("");
    },
  };

  @Input()
  ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            offsetGridLines: true,
            display: false,
          },
          beginAtZero: true,
        },
      ],
    },
    legend: {
      position: "bottom",
      labels: {
        padding: 35,
        boxWidth: 24,
        boxHeight: 18,
      },
    },
  };

  @Input()
  headerActions = [
    // {
    //   name: "expand",
    //   svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
    // },
    {
      name: "Download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    // {
    //   name: "share/embed",
    //   svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
    // },
  ];
  @Input()
  compareDialogType = 1;

  @Output()
  actionClicked = new EventEmitter();
  @Output()
  compareChange = new EventEmitter();
  myChart;
  @Input()
  yearList = ["2017-18", "2018-19", "2019-20", "2020-21"];
  @Input()
  mySelectedYears = ["2019-20", "2020-21"];
  @Input()
  year;
  compareType = "";

  ngOnInit(): void {
    console.log("chartTitle", this.chartTitle);
    console.log("chartData===>", this.chartData);
    window.onload = () => {
      this.createChart();
    };
  }

  // let legendDiv = document.getElementById('legend')

  // $('#legend').prepend(mybarChart.generateLegend());
  ngAfterViewInit(): void {
    this.createChart();
  }

  yearValueChange(value) {
    this.year = value;
    this.sendValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.chartData) {
      if (!changes.chartData.firstChange) {
        this.createChart();
      }
    }
    if (changes.mySelectedYears && changes.mySelectedYears.currentValue) {
      this.year = this.mySelectedYears[0];
    }
  }

  createChart() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    if (this.chartData.type == "scatter")
      Object.assign(this.chartData, { options: this.scatterOption });
    else if (this.ChartOptions) {
      Object.assign(this.chartData, { options: this.ChartOptions });
    }

    //dom is fully loaded, but maybe waiting on images & css files
    console.log("chartId==>", this.chartId, this.chartData);
    if (this.chartData?.data?.datasets[0].data[0]) {
  
      let canvas = <HTMLCanvasElement>document.getElementById(this.chartId);
      let ctx = canvas.getContext("2d");
      this.myChart = new Chart(ctx, this.chartData);

      // chartLegendEL.innerHTML = this.myChart.generateLegend();
      // bindChartEvents(myChart, document);

      // let legendDiv = document.getElementById('legend')

      // $('#legend').prepend(mybarChart.generateLegend());
    }
  }

  actionClick(value) {
    this._loaderService.showLoader();
    console.log(value, "In revenue");
    if (value.name == "Expand" || value.name == "Collapse") {
      this.headerActions.map((innerVal) => {
        if (innerVal.name === value.name) {
          if (value.name == "Expand") innerVal.name = "Collapse";
          else value.name = "Expand";
        }
        this._loaderService.stopLoader();
      });

      this.createChart();
    } else if (value.name == "Download") {
      this.getImage();

      return;
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

  ownRevenueCompValue(value) {
    this.compareChange.emit(value);
  }

  ulbList: any;
  getCompareCompValues(value) {
    console.log("compare ulbs", value);
    if (Array.isArray(value)) {
      this.ulbList = value;
      this.compareType = "ULBs..";
      return this?.sendValue(value);
    } else this.compareType = value;
    this.sendValue();
  }

  sendValue(ulbs = []) {
    let newYears = [this.year],
      numYear = 2,
      newValue = this.year;
    while (numYear--) {
      newValue = newValue
        ?.split("-")
        ?.map((value) =>
          !isNaN(Number(value)) ? (value = Number(value) - 1) : value
        )
        .join("-");
      newYears.push(newValue);
    }
    let data = {
      year: newYears,
      ulbs: this.ulbList,
      compareType: this.compareType,
    };
    this.compareChange.emit(data);
  }
  showLoader = false;

  getImage() {
    let id = "canvasDiv" + this.chartId;
    let html = document.getElementById(id);
    html2canvas(html).then((canvas) => {
      let image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      // window.open(image)
      var link = document.createElement("a");
      link.href = image;
      link.download = `Chart ${this.chartId}.png`;
      link.click();
      this._loaderService.stopLoader();
    });
  }
}
