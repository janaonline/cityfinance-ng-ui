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
  }

}



const canvas = <HTMLCanvasElement> document.getElementById('myChart');
const ctx = canvas.getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue'],
        datasets: [
          {
              label: 'Availability',
              data: [75],
              backgroundColor: [
                  
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }
      ]
    },
    options: {
      cutoutPercentage: 90
    }
});