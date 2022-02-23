import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren } from '@angular/core';
import  { Chart } from "chart.js";
import html2canvas from 'html2canvas';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
@Component({
  selector: 'app-common-charts-graphs',
  templateUrl: './common-charts-graphs.component.html',
  styleUrls: ['./common-charts-graphs.component.scss']
})
export class CommonChartsGraphsComponent implements OnInit, OnChanges {

  constructor(
    public _loaderService: GlobalLoaderService
  ) { }
  public chart: Chart;
  public doughnut: Chart;
  public stateDoughnut : Chart;

  headerActionsBtn = [
    {
      name: "Share",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Layer 51.svg",
     },
     {
      name: "Embed",
      svg: "../../../../assets/CIty_detail_dashboard – 3/925895_embed_development_code_coding_dev_icon.svg",
     },
     {
      name: "Download",
      svg: "../../../../assets/CIty_detail_dashboard – 3/2867888_download_icon.svg",
    },
    {
      name: "Expand",
      svg: "../../../../assets/CIty_detail_dashboard – 3/Icon awesome-expand-arrows-alt.svg",
    }


];
@Input() chartData;
@Output()
  actionClicked = new EventEmitter();
@ViewChildren('mycharts') allMyCanvas: any;
doughnutLabels = [
  {
   name: 'Own Revenue',
   color: '#1E44AD',
  },
  {
   name: 'Assigned Revenue',
   color: '#25C7CE',
  },
  {
   name: 'Grants',
   color: '#585FFF',
  },
  {
   name: 'Interest Income',
   color: '#FFD72E',
  },
  {
   name: 'Other Income',
   color: '#22A2FF',
  },
  {
   name: 'State & Hire Charges',
   color: '#FF608B'
  },

];
doughnutArray:any = [
  {
    id: 't1',
    title: 'Municipal Corporation',
    data: [40, 20, 15],
    chart: []
  },
  {
    id: 't2',
    title: 'Municipality',
    data: [40, 20, 15],
    chart: []
  },
];
isCompareState = true;
chartDataArray = [];
chartLabels =[];
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
     console.log('changes common charts', this.chartData);
     this.chartDataArray = [];
     this.chartLabels =[];
     this.chartData?.ulbData.forEach(el => {
       console.log('ele', el);
       this.chartDataArray.push(el?.amount)
       this.chartLabels.push(el?.name)
     });
     console.log('Array',this.chartDataArray);
     this.doughnutChartInit();
     this.stateDoughnutChartInit();
  }

  doughnutChartInit(){
    this.doughnut = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        // labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
        labels: this.chartLabels,
        datasets: [
          {
            // data: [40, 20, 15, 10, 10, 5],
            data: this.chartDataArray,
            backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
         // position: 'bottom'
         display: false
        },
      }
    });
}
stateDoughnutChartInit(){
  this.stateDoughnut = new Chart('stateDoughnut', {
    type: 'doughnut',
    data: {
      labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
      datasets: [
        {
          data: [40, 40, 5, 10, 0, 5],
          backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
          fill: false
        },
      ]
    },
    options: {
      legend: {
       // position: 'bottom'
       display: false
      },
    }
  });
}
openModal() {
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.width = "39rem";
  // this.dialogRef = this.dialog.open(this.template, dialogConfig);
  // this.dialogRef.afterClosed().subscribe((result) => {
  //   console.log("result", result);
  // });
}
actionClick(value) {
  this._loaderService.showLoader()
  console.log(value, "In revenue");
  if (value.name == "Expand" || value.name == "collapse") {
    this.headerActionsBtn.map((innerVal) => {
      if (innerVal.name === value.name) {
        if (value.name == "Expand") innerVal.name = "collapse";
        else value.name = "Expand";
      }
    });
 //   this.myChart.destroy();
 //   this.createChart();
  }else if (value.name == "Download") {
    this.getImage();
  return;
  }
  this.actionClicked.emit(value);
}
getImage() {
  let id = 'doughnutCharts';
  let html = document.getElementById(id);
  html2canvas(html).then((canvas) => {
   let image = canvas
  .toDataURL("image/png")
  .replace("image/png", "image/octet-stream");
  // window.open(image)
var link = document.createElement("a");
link.href = image;
link.download = `Chart.png`;
link.click();
this._loaderService.stopLoader()
});
}

}
