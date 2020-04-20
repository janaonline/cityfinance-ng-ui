import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {

  public selectedFinancialRequest = null;
  public financialYears = null;

  constructor(private httpClient: HttpClient) {
  }

  fetchFinancialDataList(params = {}, body = {}) {
    let queryParams = new HttpParams(params);
    for (let key in params) {
      queryParams = queryParams.set(key, params[key]);
    }
    for (let key in body) {
      queryParams = queryParams.set(key, JSON.stringify(body[key]));
    }
    return this.httpClient.get(`${environment.api.url}ulb-financial-data/all`, {params: queryParams});
  }

  getFinancialDataListApi(body = {}) {
    body['token'] = localStorage
      .getItem('id_token')
      .replace('"', '')
      .replace('"', '');
    body['csv'] = true;
    let params = new HttpParams();
    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'object') {
        const value = JSON.stringify(body[key]);
        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });
    return `${environment.api.url}ulb-financial-data/all?${params}`;
  }

  fetFinancialData(id: string) {
    return this.httpClient.get(`${environment.api.url}ulb-financial-data/details/${id}`);
  }

  fetchFinancialDataHistory(id) {
    return this.httpClient.get(`${environment.api.url}ulb-financial-data/history/${id}`);
  }

  uploadFinancialData(data) {
    return this.httpClient.post(`${environment.api.url}ulb-financial-data`, JSON.stringify(data));
  }

  upDateFinancialData(id, data) {
    return this.httpClient.put(`${environment.api.url}ulb-financial-data/${id}`, JSON.stringify(data));
  }

  updateCompletenessStatus(id, data) {
    return this.httpClient.put(`${environment.api.url}ulb-financial-data/completeness/${id}`, JSON.stringify(data));
  }

  updateCorrectnessStatus(id, data) {
    return this.httpClient.put(`${environment.api.url}ulb-financial-data/correctness/${id}`, JSON.stringify(data));
  }

  getFinancialYears() {
    return this.httpClient.get(`${environment.api.url}financial-year`);
  }

  getOverAllReportData(financialYear: string = '2015-16') {
    return this.httpClient.get(`${environment.api.url}report/financial-data/overall?financialYear=${financialYear}`);
  }

  getStateWiseReportData(financialYear: string = '2015-16') {
    return this.httpClient.get(`${environment.api.url}report/financial-data/statewise?financialYear=${financialYear}`);
  }
}
