
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
      return this.http.get(`${environment.api.url}mohua/cards?state_id=${state_id}&design_year=606aaf854dff55e6c075d219`);
    } else {
      return this.http.get(`${environment.api.url}mohua/cards?design_year=606aaf854dff55e6c075d219`);
    }

  }
  getFormData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}masterForm/state-dashboard/606aaf854dff55e6c075d219?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}mohua/forms/606aaf854dff55e6c075d219`);
    }
  }
  getFullUAList() {
    return this.http.get(`${environment.api.url}/UA/getAll`);
  }
  getPlansData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}masterForm/dashboard-plansData/606aaf854dff55e6c075d219?state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}masterForm/dashboard-plansData/606aaf854dff55e6c075d219`);
    }
  }

  getTableData(state_id, csv) {
    if (csv) {
      if (state_id) {
        return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219&state_id=${state_id}&csv=true`,
          { responseType: 'blob' });
      } else {
        return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219&csv=true`,
          { responseType: 'blob' });
      }
    } else {
      if (state_id) {
        return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219&state_id=${state_id}`);
      } else {
        return this.http.get(`${environment.api.url}masterForm/stateUlb?design_year=606aaf854dff55e6c075d219`);
      }
    }

  }


  getWaterRejCardData(state_id) {
    if (state_id) {
      return this.http.get(`${environment.api.url}stateMasterForm/waterRej-action-card?design_year=606aaf854dff55e6c075d219&state_id=${state_id}`);
    } else {
      return this.http.get(`${environment.api.url}stateMasterForm/waterRej-action-card?design_year=606aaf854dff55e6c075d219`);
    }
  }

  getGrantTransfer(params, csv = null) {
    if (csv)
      return this.http.get(`${environment.api.url}template?csv=${params.csv}&design_year=606aaf854dff55e6c075d219&state_id=${params.state_id ? params.state_id : ""}&year_id=${params.year ? params.year : ""}&installment=${params.installment ? params.installment : ""}`, { responseType: 'blob' });
    return this.http.get(`${environment.api.url}template?csv=${params.csv}&design_year=606aaf854dff55e6c075d219&state_id=${params.state_id ? params.state_id : ""}&year_id=${params.year ? params.year : ""}&installment=${params.installment ? params.installment : ""}`);
  }

}
