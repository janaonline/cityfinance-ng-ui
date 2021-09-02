import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { DashboardService } from '../../../../shared/services/dashboard/dashboard.service';

@Component({
  selector: "app-ulb-coverage",
  templateUrl: "./ulb-coverage.component.html",
  styleUrls: ["./ulb-coverage.component.scss"],
})
export class UlbCoverageComponent implements OnInit {
  ulbCoverageData = [];
  ulbCoverageHeader = {
    totalUlb: "Uncovered ULB",
    coveredUlbs: "Covered ULB",
  };

  constructor(private dashboardService: DashboardService) {}

  getColors(index) {
    const borderColors = [
      "rgba(255, 206, 86, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
    ];
    const backgroundColors = [
      "rgba(255, 206, 86, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
    ];
    return {
      borderColor: borderColors[index],
      backgroundColor: backgroundColors[index],
    };
  }

  fetchCoverageSuccess = (response) => {
    this.ulbCoverageData = response.data;
    this.ulbCoverageData = this.ulbCoverageData.reduce((acc = [], curr) => {
      const obj = {};
      obj["label"] = curr.year;
      delete curr.year;
      obj["data"] = curr;
      acc = [...acc, obj];
      return acc;
    }, []);
    const labels = this.ulbCoverageData.map((item) => item.label);
    let dataSets = [];
    const datasets = Object.keys(this.ulbCoverageData[0].data);
    this.ulbCoverageData = this.ulbCoverageData.map((ulb) => {
      return {
        ...ulb,
        data: {
          ...ulb.data,
          totalUlb: ulb.data.totalUlb - ulb.data.coveredUlbs,
        },
      };
    });
    dataSets = datasets.map((dataset, index) => {
      const obj = {
        maxBarThickness: 80,
        label: this.ulbCoverageHeader[dataset],
        data: this.ulbCoverageData.map((ulb) => ulb.data[dataset]),
        ...this.getColors(index),
      };
      return obj;
    });
    new Chart("canvas--ulb-coverage", {
      type: "bar",
      data: {
        labels,
        datasets: dataSets.reverse(),
      },
      options: {
        title: {
          display: true,
          text: "ULB Coverage",
        },
        tooltips: {
          enabled: true,
          mode: "nearest",
          position: "average",
          callbacks: {
            title: function (tooltipItem, data) {
              const { datasets } = data;
              const { datasetIndex, index } = tooltipItem[0];
              const currentData = datasets[datasetIndex].data[index],
                totalData = 0;
              return `${datasets[datasetIndex].label}: ${currentData} `;
            },
            label: function (tooltipItem, data) {
              const { datasets } = data;
              const { datasetIndex, index } = tooltipItem;
              let currentData = datasets[datasetIndex].data[index],
                totalData = 0;
              totalData = datasets.reduce(
                (acc, curr, i) => acc + (curr.data[index] as number),
                0
              );
              const percentage = (
                ((currentData as number) / totalData) *
                100
              ).toFixed(2);
              return `${percentage} % `;
            },
          },
        },

        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              stacked: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              stacked: true,
            },
          ],
        },

        legend: {
          display: true,
          position: "bottom",
        },

        responsive: false,
      },
    });
  };

  ngOnInit() {
    this.dashboardService
      .fetchUlbCoverage("")
      .subscribe(this.fetchCoverageSuccess);
  }
}
