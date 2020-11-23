import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { element } from 'protractor';

import { FinancialDataService } from '../../../users/services/financial-data.service';

@Component({
  selector: "app-financial-data-chart",
  templateUrl: "./financial-data-chart.component.html",
  styleUrls: ["./financial-data-chart.component.scss"],
})
export class FinancialDataChartComponent implements OnInit, OnChanges {
  @Input() financialYears: any[];
  chart = null;
  financialYearFormControl: FormControl = new FormControl("2015-16");

  constructor(private financialDataService: FinancialDataService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    this.fetchData();
  }

  renderChart(data) {
    let labels = data.map((element) => element.name);
    let barChartData = {
      labels,
      datasets: this.prepareDatasets(data),
    };
    if (!this.chart) {
      this.initializeChart(barChartData);
    } else {
      this.updateChart(this.chart, labels, barChartData.datasets);
      this.chart.data.labels = labels;
      this.chart.data.datasets = barChartData.datasets;
      this.chart.update();
    }
  }

  prepareDatasets(data) {
    let underReview = {
      barThickness: 15,
      label: "Request Under Review",
      backgroundColor: data.map((element) => "rgb(252,131,228)"),
      data: data.map((element) => element.pending),
    };
    let rejected = {
      ...underReview,
      label: " Rejected By Admin",
      backgroundColor: data.map((element) => "rgb(131,201,252)"),

      data: data.map((element) => element.rejected),
    };
    let approved = {
      ...rejected,
      label: " Approved By Admin",
      backgroundColor: data.map((element) => "rgb(131,252,131)"),
      data: data.map((element) => element.approved),
    };
    return [underReview, approved, rejected];
  }

  updateChart(chart, labels, datasets) {
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  }

  private fetchData() {
    this.financialDataService
      .getChartData(this.financialYearFormControl.value)
      .subscribe(
        (response) => {
          if (response["success"]) {
            this.renderChart(response["data"]);
          }
        },
        (error) => {}
      );
  }

  private initializeChart(data) {
    let id = <HTMLCanvasElement>document.getElementById("chart");
    this.chart = new Chart(id, {
      type: "bar",
      data: data,
      options: {
        title: {
          display: true,
          text: "ULB DATA UPLOAD",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          position: "bottom",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }
}
