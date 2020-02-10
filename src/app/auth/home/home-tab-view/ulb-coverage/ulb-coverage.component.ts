import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../shared/services/dashboard/dashboard.service';
import {Chart} from 'chart.js';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
        maxBarThickness: 20,
        label: this.ulbCoverageHeader[dataset],
        data: this.ulbCoverageData.map(ulb => ulb.data[dataset]),
        ...this.getColors(index),
      };
      return obj;
    });
    new Chart('canvas--ulb-coverage', {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: dataSets.reverse()
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'ULB Coverage',
        },

        tooltips: {
          enabled: true,
          mode: 'nearest',
          position: 'average',
          callbacks: {
            title: function (tooltipItem, data) {
              const {datasets} = data;
              const {datasetIndex, index} = tooltipItem[0];
              let currentData = datasets[datasetIndex].data[index], totalData = 0;
              totalData = datasets.reduce((acc, curr, i) => acc + curr.data[index], 0);
              return `${datasets[datasetIndex].label}s: ${currentData}\nTotal ULBs :${totalData} `;
            },
            label: function (tooltipItem, data) {
              const {datasets} = data;
              const {datasetIndex, index} = tooltipItem;
              let currentData = datasets[datasetIndex].data[index], totalData = 0;
              totalData = datasets.reduce((acc, curr, i) => acc + curr.data[index], 0);
              let percentage = (((currentData) / (totalData)) * 100).toFixed(2);
              return `${percentage} % `;
            },
          }
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
        },

        legend: {
          display: true,
          position: 'bottom',
        },


        // animation: {
        //   duration: 1000,
        //   onComplete: function () {
        //     var chartInstance = this.chart,
        //       ctx = chartInstance.ctx;
        //     ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        //     ctx.textAlign = 'center';
        //     ctx.textBaseline = 'bottom';
        //     this.data.datasets.forEach(function (dataset, i) {
        //       var meta = chartInstance.controller.getDatasetMeta(i);
        //       meta.data.forEach(function (bar, index) {
        //         var data = dataset.data[index];
        //         ctx.fillText(data, bar._model.x, bar._model.y - 5);
        //       });
        //     });
        //   }
        // },
      },
    });
  };


  ngOnInit() {
    this.dashboardService.fetchUlbCoverage('').subscribe(this.fetchCoverageSuccess);

  }

}
