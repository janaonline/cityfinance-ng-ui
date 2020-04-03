import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {

  selectedFinancialRequest = null;

  constructor(private httpClient: HttpClient) {
  }

  fetchFinancialData() {
    return this.httpClient.get(`${environment.api.url}ulb-financial-data?_id=5e85ac5c96b49706324e3d08`);
  }

  uploadFinancialData(data) {
    return this.httpClient.post(`${environment.api.url}ulb-financial-data`, JSON.stringify(data));
  }
}
