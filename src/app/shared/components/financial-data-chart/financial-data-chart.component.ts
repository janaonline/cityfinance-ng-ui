import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-financial-data-chart',
  templateUrl: './financial-data-chart.component.html',
  styleUrls: ['./financial-data-chart.component.scss']
})
export class FinancialDataChartComponent implements OnInit {

  @Input() financialYears: any[];

  constructor() {
  }

  ngOnInit() {
    this.renderChart();
  }

  renderChart() {
    var barChartData = {
      labels: ['Delhi', 'Uttrakhand', 'Punjab',],
      datasets: [
        {
          barThickness: 15,
          label: 'Request Under Review',
          backgroundColor: ['rgb(252,131,228)', 'rgb(252,131,228)', 'rgb(252,131,228)'],
          data: [12, 21, 13]
        },
        {
          barThickness: 15,
          backgroundColor: ['rgb(131,252,131)', 'rgb(131,252,131)', 'rgb(131,252,131)'],
          label: ' Approved By Admin',
          data: [10, 15, 46]

        }, {
          barThickness: 15,
          backgroundColor: ['rgb(131,201,252)', 'rgb(131,201,252)', 'rgb(131,201,252)'],
          label: ' Rejected By Admin',
          data: [11, 75, 26]
        }]
    };
    let id = <HTMLCanvasElement>document.getElementById('chart');
    new Chart(id, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'ULB DATA UPLOAD'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'bottom'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }
}
