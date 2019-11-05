import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cf-charts',
  templateUrl: './cf-charts.component.html',
  styleUrls: ['./cf-charts.component.scss']
})
export class CfChartsComponent implements OnInit {
  @Input() chartData: any;


  public barChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
    scales: {
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return (value/100000);
        }
        },
        scaleLabel: {
          display: true,
          labelString: 'Rs in Lakhs'
        }
      }],
      xAxes:[{
        gridLines: {
          display: false
        }
      }]
    }
  };
  public barChartType = 'bar';
  public barChartLegend = true;


  // public barChart;
  public barChart: any;



  constructor() { }

  ngOnChanges(){
    if(this.chartData){
      this.barChart = this.chartData
      // console.log(this.chartData)
    } 
  }

  ngOnInit(): void {
  }


}
