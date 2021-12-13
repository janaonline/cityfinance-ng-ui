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
    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    console.log("#####",canvas);
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
              {
                  label: 'Availability',
                  data: [75],
                  backgroundColor: [
                      'rgba(51, 96, 219, 1)'
                  ],
                  borderWidth: 2
              }
          ]
        },
        options: {
          rotation: 1 * Math.PI,
                   circumference: 1 * Math.PI,
                   legend: {
                       display: false
                   },
                   cutoutPercentage: 90
         }
    });
  }

}



