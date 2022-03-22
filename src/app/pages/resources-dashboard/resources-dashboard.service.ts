import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Chart } from 'chart.js';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResourcesDashboardService {

  constructor(
    private https: HttpClient
  ) { }


  getDataSets(year,type,category, state, ulb){
   return this.https.get(`${environment.api.url}annual-accounts/datasets?year=${year}&type=${type}&category=${category}&state=${state}&ulb=${ulb}`)
  }
}

