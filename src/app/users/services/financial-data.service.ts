import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialDataService {

  constructor(private httpClient: HttpClient) {
  }

  fetchFinancialData() {
   return  this.httpClient.get(`${environment.api.url}ulb-financial-data`);
  }
}
