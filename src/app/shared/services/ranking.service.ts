import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  loadRankinModuleData() {
    return this.http.get(environment.api.url + "api/admin/v1/report/ulb-ranking");
  }

  heatMapFilter(params){
    return this.http.post(environment.api.url + "api/admin/v1/report/ulb-ranking", params);
  }

  rankReportData(){
    return this.http.get(environment.api.url + "api/admin/v1/ulblist");
  }

}
