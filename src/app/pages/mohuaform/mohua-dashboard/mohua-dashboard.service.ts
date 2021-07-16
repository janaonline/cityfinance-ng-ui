
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
      return this.http.get(`${environment.api.url}mohua/forms?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}mohua/forms`);
    }
  }
  getTableData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}masterForm/stateUlb?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}masterForm/stateUlb`);
    }
  }



}
