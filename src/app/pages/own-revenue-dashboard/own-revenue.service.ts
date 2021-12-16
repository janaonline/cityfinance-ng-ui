import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OwnRevenueService {

  constructor(private httpClient: HttpClient) { 

  }

  test(){
    
  }
}
