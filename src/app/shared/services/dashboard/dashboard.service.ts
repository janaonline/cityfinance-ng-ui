import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {


  }

  fetchDependencyOwnRevenueData(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/own-revenue-dependency`);
  }

  fetchSourceOfRevenue(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/source-revenue`);
  }

  fetchRevenueExpenditure(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/revenue-expenditure`);
  }

  fetchFinancialRevenueExpenditure(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/source-financial-revenue-expenditure`);
  }

  fetchCashAndBankBalance(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/cash-and-bank`);
  }

  fetchOutStandingDebt(year: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/report/dashboard/outstanding-bank`);
  }

  fetchULBData(id: string) {
    return this.httpClient.get(`${environment.api.url}api/admin/v1/ulblist`);
  }
}
