import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js';
import { ComparisionFiltersComponent } from '../comparision-filters/comparision-filters.component';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  public chart: any;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createChart();

  }


  createChart() {
    this.chart = new Chart("bar-chart-with-line", {
      type: 'bar',
      data: {
        labels: ['Navi Mumbai', 'Chennai', 'Hyderabad', 'Bangalore'],
        datasets: [
          {
            label: 'State Average',
            data: [110, 60, 243, 580], // Example values within the range 600 to 1100
            fill: false,
            borderColor: 'orange',
            type: 'line',
            lineTension: 0
          },
          // Add similar datasets for Line Dataset 2 and Line Dataset 3 with values within the range 600 to 1100
          {
            label: 'National Average',
            data: [180, 160, 330, 280],
            fill: false,
            borderColor: 'gray',
            type: 'line',
            lineTension: 0
          },
          {
            label: 'Population Average',
            data: [540, 260, 403, 600],
            fill: false,
            borderColor: 'yellow',
            type: 'line',
            lineTension: 0
          },
          {
            label: 'Overall',
            data: [1080, 760, 803, 680],
            backgroundColor: '#0B5ACF',
            borderWidth: 1,
            type: 'bar',
            barPercentage: 0.5, // Set maximum bar width to 40% of the available space
            categoryPercentage: 1.0
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 100
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
        },
        legend: {
          position: 'bottom',
          display: true,
          labels: {
            boxWidth: 10
          },
        }
      }
    } as any);

    this.chart.canvas.style.height = '55vh';
  }

  openFilter() {
    this.matDialog.open(ComparisionFiltersComponent, {
      minWidth: '400px',
      maxWidth: '500px'
    });
  }

}
