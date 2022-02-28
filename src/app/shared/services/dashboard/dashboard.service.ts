import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chart } from "chart.js";

import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  fetchDependencyOwnRevenueData(
    year: string,
    state = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/own-revenue-dependency?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchSourceOfRevenue(
    year: string,
    state: string = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/source-revenue?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchRevenueExpenditure(
    year: string,
    state: string = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/revenue-expenditure?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchFinancialRevenueExpenditure(
    year: string,
    state: string = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/source-financial-revenue-expenditure?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchCashAndBankBalance(
    year: string,
    state: string = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/cash-and-bank?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchOutStandingDebt(
    year: string,
    state: string = "",
    ulb: any = "",
    populationCategory = "",
    ulbList = "1"
  ) {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/outstanding-debt?years=${year}&state=${state}&ulb=${ulb}&populationCategory=${populationCategory}&ulbList=${ulbList}`
    );
  }

  fetchULBData(id: string) {
    return this.httpClient.get(`${environment.api.url}/ulblist`);
  }

  fetchUlbCoverage(id: string) {
    return this.httpClient.get(
      `${environment.api.url}/report/dashboard/ulb-coverage`
    );
  }

  fetchULBDataPopulationWise(range: string) {
    return this.httpClient.get(`${environment.api.url}/`);
  }

  renderPieChart({
    type = "pie",
    labels,
    data,
    chartTitle,
    elementId,
    options = {},
  }) {
    new Chart(elementId, {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: chartTitle,
        },
        legend: {
          display: true,
          position: "bottom",
        },
        responsive: true,
      },
      ...options,
    });
  }

  fetchCitySlbChartData(queryParams) {
    const { type, compUlb, ulb, year } = queryParams;

    return this.httpClient.get(
      `${environment.api.url}indicators?type=${type}&compUlb=${compUlb}&ulb=${ulb}&year=${year}`
    );
  }
  fetchStateSlbChartData(id, tab, indicator) {
    return this.httpClient.get(
      `${environment.api.url}indicators?compUlb=&ulb=${id}&type=${tab}&indicatorName=${indicator}`
    );
  }

  // indicators?compUlb=&ulb=5dd24b8d91344e2300876c8b&type=water supply&indicatorName=coverage of water supply connections
}
