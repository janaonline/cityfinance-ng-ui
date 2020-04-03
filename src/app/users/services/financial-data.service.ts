import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {

  selectedFinancialRequest = null;

  constructor(private httpClient: HttpClient) {
  }

  fetchFinancialData(params = {}) {
    let queryParams = new HttpParams(params);
    return this.httpClient.get(`${environment.api.url}ulb-financial-data`, {params: queryParams});
  }

  uploadFinancialData(data) {
    return this.httpClient.post(`${environment.api.url}ulb-financial-data`, JSON.stringify(data));
  }
}
