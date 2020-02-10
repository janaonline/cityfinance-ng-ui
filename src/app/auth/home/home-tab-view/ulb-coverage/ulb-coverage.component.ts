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

  constructor(private  dashboardService: DashboardService) {
  }

  fetchCoverageSuccess(response) {
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
    let item = this.ulbCoverageData[0];
    let dataSets = [];
    this.ulbCoverageData.forEach((item) => {
      let dataItem = {};
      dataItem['label'] = item.label;
      let data = [];
      Object.keys(item.data).forEach(key => {
        data.push(item.data[key]);
      });
      dataItem['data'] = data;
      dataSets.push(dataItem);
    });
    new Chart('canvas--ulb-coverage', {
      type: 'bar',
      data: {
        labels: ['A', 'b', 'C'],
        datasets: dataSets
      },
      options: {
        title: {
          display: true,
          text: 'chart title',
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        responsive: true,
      },
    });


    console.log(dataSets);
    /*    Object.keys(item.data).forEach((key) => {
          dataItem['label'] = key;
          dataItem['data'] = this.ulbCoverageData.map(item => item.data[key]);

          dataSets.push(dataItem);
        });
        console.log(dataSets);*/
  }

  ngOnInit() {
    this.dashboardService.fetchUlbCoverage('').subscribe(this.fetchCoverageSuccess);

  }

  fetchCoverage() {

  }

}
