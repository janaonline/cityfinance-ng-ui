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
      return this.httpClient.post(
        `${environment.api.url}data-available`, body
    )
  }

  
  displayBarChartData(body: any){
    return this.httpClient.get(
      `${environment.api.url}LineItem`, body
  )
}

}

// {{url}}/LineItem

