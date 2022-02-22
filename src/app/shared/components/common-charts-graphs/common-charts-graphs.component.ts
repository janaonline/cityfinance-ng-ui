import { Component, OnChanges, OnInit, SimpleChanges, ViewChildren } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'app-common-charts-graphs',
  templateUrl: './common-charts-graphs.component.html',
  styleUrls: ['./common-charts-graphs.component.scss']
})
export class CommonChartsGraphsComponent implements OnInit, OnChanges {

  constructor() { }
  public chart: Chart;
  public doughnut: Chart;
  public dynamicDoughnut: Chart;
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

  ngOnInit(): void {
    this.dynamicDoughnutChartInit(this.doughnutArray);
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  dynamicDoughnutChartInit(chartArray){
    console.log('loop val', this.allMyCanvas._results)
    let canvasCharts = this.allMyCanvas._results;  // Get array with all canvas
    canvasCharts.map((myCanvas, i) => {   // For each canvas, save the chart on the charts array
      if(chartArray[i].chart) {
       // chartArray[i].chart.destroy();
      }
       chartArray[i].chart = new Chart(myCanvas.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
          datasets: [
            {
              data: chartArray[i].data,
              backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
        }
       })
    });
    // let dynamicDoughnut: Chart;
    // dynamicDoughnut  = new Chart(`${val.id}`, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Own Revenue','Assigned Revenue', 'Grants', 'Interest Income', 'Other Income', 'State & Hire Charges'],
    //     datasets: [
    //       {
    //         data: val.data,
    //         backgroundColor: ['#1E44AD','#25C7CE', '#585FFF', '#FFD72E', '#22A2FF', '#FF608B'],
    //         fill: false
    //       },
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //   }
    // });
  }


}
