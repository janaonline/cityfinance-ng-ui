import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Chart} from 'chart.js';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {


  }

  fetchDependencyOwnRevenueData(year: string, state = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/own-revenue-dependency?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchSourceOfRevenue(year: string, state: string = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/source-revenue?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchRevenueExpenditure(year: string, state: string = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/revenue-expenditure?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchFinancialRevenueExpenditure(year: string, state: string = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/source-financial-revenue-expenditure?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchCashAndBankBalance(year: string, state: string = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/cash-and-bank?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchOutStandingDebt(year: string, state: string = '', ulb: any = '') {
    if (ulb && ulb._id) {
      ulb = ulb._id;
    }
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/outstanding-debt?years=${year}&state=${state}&ulb=${ulb}`);
  }

  fetchULBData(id: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/ulblist`);
  }

  fetchUlbCoverage(id: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/ulb-coverage`);
  }

  fetchULBDataPopulationWise(range: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/`);
  }

  renderPieChart({type = 'pie', labels, data, chartTitle, elementId, options = {}}) {
    new Chart(elementId, {
      type,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: chartTitle,
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        responsive: true,
      },
      ...options
    });

  }

}
