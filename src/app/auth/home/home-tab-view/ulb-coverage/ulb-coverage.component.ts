import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../shared/services/dashboard/dashboard.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-ulb-coverage',
  templateUrl: './ulb-coverage.component.html',
  styleUrls: ['./ulb-coverage.component.scss']
})
export class UlbCoverageComponent implements OnInit {


  ulbCoverageData = [];
  ulbCoverageHeader = {
    'totalUlb': 'Uncovered ULB',
    'coveredUlbs': 'Covered ULB'
  };


  constructor(private  dashboardService: DashboardService) {
  }

  getColors(index) {
    const borderColors = [
      'rgba(255, 206, 86, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ];
    const backgroundColors = [
      'rgba(255, 206, 86, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ];
    return {
      borderColor: borderColors[index],
      backgroundColor: backgroundColors[index]
    };
  };


  fetchCoverageSuccess = (response) => {
    this.ulbCoverageData = response.data;
    this.ulbCoverageData = this.ulbCoverageData.reduce((acc = [], curr) => {
      let obj = {};
      obj['label'] = curr.year;
      delete curr.year;
      obj['data'] = curr;
      acc = [...acc, obj];
      return acc;
    }, []);
    const labels = this.ulbCoverageData.map(item => item.label);
    let dataSets = [];
    let datasets = Object.keys(this.ulbCoverageData[0].data);
    this.ulbCoverageData = this.ulbCoverageData.map(ulb => {
      return {
        ...ulb,
        data: {
          ...ulb.data,
          totalUlb: ulb.data.totalUlb - ulb.data.coveredUlbs
        }
      };
    });
    dataSets = datasets.map((dataset, index) => {
      let obj = {
        maxBarThickness: 80,
        label: this.ulbCoverageHeader[dataset],
        data: this.ulbCoverageData.map(ulb => ulb.data[dataset]),
        ...this.getColors(index),
      };
      return obj;
    });
    new Chart('canvas--ulb-coverage', {
      type: 'bar',
      data: {
        labels,
        datasets: dataSets
      },
      options: {
        title: {
          display: true,
          text: 'chart title',
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: false,
            },
            stacked: true,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false,
            },
            stacked: true
          }]
        }
        ,
        legend: {
          display: true,
          position: 'bottom',
        },
        responsive: false,
      },
    });
  };


  ngOnInit() {
    this.dashboardService.fetchUlbCoverage('').subscribe(this.fetchCoverageSuccess);

  }

}
