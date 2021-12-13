import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-own-revenue-dashboard',
  templateUrl: './own-revenue-dashboard.component.html',
  styleUrls: ['./own-revenue-dashboard.component.scss']
})
export class OwnRevenueDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Half Doughnut Data
    const canvas = <HTMLCanvasElement> document.getElementById('myChart1');
    console.log("#####",canvas);
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
              {
                  label: 'Availability',
                  data: [75,25],
                  backgroundColor: [
                      'rgba(51, 96, 219, 1)',
                      'rgba(218, 226, 253, 1)',
                    ],
              }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
                   circumference: 1 * Math.PI,
                   legend: {
                       display: false
                   },
                   cutoutPercentage: 80
         }
    });

      // Full Doughnut Data
      const myChart1 = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: [
                'Property Tax',
                'Advertisement Tax',
                'Total License Fee',
                'Water Charges',
                'Sewerage Charges',
                'Rental Income',
                'Other Income'
            ],
          datasets: [
            { 
              data: [68,22,19,7,5,,15,20],
              backgroundColor: [
                'rgba(30, 68, 173, 1)',
                'rgba(37, 199, 206, 1)',
                'rgba(88, 95, 255, 1)',
                'rgba(255, 215, 46, 1)',
                'rgba(34, 162, 255, 1)',
                'rgba(255, 96, 139, 1)',
                'rgba(25, 229, 158, 1)'
              ],
              fill: false
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltips:{
            enabled:true
          },
          cutoutPercentage: 45
        }
      });
  }
  
}



