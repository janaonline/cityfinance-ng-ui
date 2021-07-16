
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class MohuaDashboardService {

  constructor(private http: HttpClient) { }

  getCardData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}mohua/cards?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}mohua/cards`);
    }

  }
  getFormData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}mohua/forms/606aaf854dff55e6c075d219?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}mohua/forms/606aaf854dff55e6c075d219`);
    }
  }
  getPlansData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}mohua/plans/606aaf854dff55e6c075d219&state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}mohua/plans/606aaf854dff55e6c075d219`);
    }
  }

  getTableData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219&state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219`);
    }
  }



}
