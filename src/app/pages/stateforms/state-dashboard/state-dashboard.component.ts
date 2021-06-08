import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-state-dashboard',
  templateUrl: './state-dashboard.component.html',
  styleUrls: ['./state-dashboard.component.scss']
})
export class StateDashboardComponent implements OnInit {



  constructor(

  ) { }

  ngOnInit(): void {

    this.mainDonughtChart();
    this.gaugeChart1();
    this.gaugeChart2();
    this.pfmsDonughtChart();
    this.utilReportDonughtChart();
    this.slbDonughtChart();

  }

  pfmsDonughtChart() {
    const data = {
      labels: [
        'Registered',
        'Not Registered',
        'Pending Response                                                '
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('pfms');
    const ctx = canvas.getContext('2d');
    let pfms = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 25,
          }
        }
      }

    });
  }
  utilReportDonughtChart() {
    const data = {
      labels: [
        '103 - Pending Completion',
        '213 - Completed and Pending Submission',
        '213 - Completed and Pending Submission',
        '213 - Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 120],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 215, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('utilReport');
    const ctx = canvas.getContext('2d');
    let utilReport = new Chart(ctx, {
      type: 'doughnut',
      data: data,

      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 15,
          }
        }
      }

    });
  }
  slbDonughtChart() {
    const data = {
      labels: [
        '103 - Pending Completion',
        '213 - Completed and Pending Submission',
        '213 - Completed and Pending Submission',
        '213 - Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 120],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 215, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('slb');
    const ctx = canvas.getContext('2d');
    let slb = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        legend: {

          position: 'left',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'black',
            usePointStyle: true,
            padding: 15,
          }
        }
      }

    });
  }
  gaugeChart1() {
    const canvas = <HTMLCanvasElement>document.getElementById('gauge1');
    const ctx = canvas.getContext('2d');
    let gauge1 = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            data: [45, 55],
            backgroundColor: ["#09C266", "#C6FBE0"],
            borderColor: ["#09C266"],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 64,

        onClick(...args) {
          console.log(args);
        }
      }
    });

  }
  gaugeChart2() {
    const canvas = <HTMLCanvasElement>document.getElementById('gauge2');
    const ctx = canvas.getContext('2d');
    let gauge2 = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            data: [45, 55],
            backgroundColor: ["#09C266", "#C6FBE0"],
            borderColor: ["#09C266"],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        circumference: Math.PI + 1,
        rotation: -Math.PI - 0.5,
        cutoutPercentage: 64,

        onClick(...args) {
          console.log(args);
        }
      }
    });

  }
  mainDonughtChart() {
    const data = {
      labels: [
        'Pending for Submission',
        'Pending Review by State',
        'Approved by State'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            fontSize: 13,
            fontColor: 'white',
            usePointStyle: true,
            padding: 30,
          }
        }
      }

    });
  }


}
