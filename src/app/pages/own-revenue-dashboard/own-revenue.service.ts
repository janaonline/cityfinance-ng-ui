import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OwnRevenueService {

  constructor(private httpClient: HttpClient) {

  }

  displayDataAvailable(body: any){
    if (!body.hasOwnProperty("csv")) {
      return this.httpClient.post(`${environment.api.url}data-available`, body);
    }
    return this.httpClient.post(`${environment.api.url}data-available`, body, {
      responseType: "blob",
    });
  }

  
  displayBarChartData(body: any){
    if (!body.hasOwnProperty("csv")){
      return this.httpClient.post(`${environment.api.url}topPerformance`, body);
    }
    return this.httpClient.post(`${environment.api.url}topPerformance`, body, {
      responseType: "blob",
    });
}

getULBTypeList() {
  return this.httpClient.get(
    `${environment.api.url}UlbType`
  );
}

getPieChartData(body){
  return this.httpClient.post(`${environment.api.url}chart-data`, body);
}
getCardsData(body){
  return this.httpClient.post(`${environment.api.url}cards-data`, body);
}
getTableData(body){
  return this.httpClient.post(`${environment.api.url}table-data`, body);
}

getYearList(body){
  return this.httpClient.post(`${environment.api.url}yearList`, body)
}

}

// {{url}}/LineItem

