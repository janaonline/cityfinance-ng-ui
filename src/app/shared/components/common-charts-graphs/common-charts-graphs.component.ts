import { Component, OnChanges, OnInit, SimpleChanges, ViewChildren } from '@angular/core';
import  { Chart } from "chart.js";
@Component({
  selector: 'app-common-charts-graphs',
  templateUrl: './common-charts-graphs.component.html',
  styleUrls: ['./common-charts-graphs.component.scss']
})
export class CommonChartsGraphsComponent implements OnInit, OnChanges {

  constructor() { }
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
public barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  // cornerRadius: 50,
  // border:50,
  //  borderRadius: 20,
  //  borderSkipped: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
  },
};
public barChartLabels: string[];
public barChartType: string = 'bar';
public barChartLegend: boolean = true;

public barChartData: any[] = [
  { data: [], label: 'Volume Sales' },
  { data: [], label: 'Value Sales' },
  { data: [], label: 'Value Sales2' },
];
  ngOnInit(): void {
    this.doughnutChartInit();
    this.stateDoughnutChartInit();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  doughnutChartInit(){
    this.doughnut = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
        datasets: [
          {
            data: [40, 20, 15, 10, 10, 5],
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

}
