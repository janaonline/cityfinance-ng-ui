import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class StateDashboardService {

    constructor(private http: HttpClient) { }
    totalUaS = new Subject<any>();

    getCardData(state_id) {
        return this.http.get(`${environment.api.url}dashboard/state?state_id=${state_id}`);
    }
    getFormData(state_id) {
        return this.http.get(`${environment.api.url}masterForm/state-dashboard/606aaf854dff55e6c075d219?state_id=${state_id}`);
    }
    getSlbData(ua_id, state_id) {
        return this.http.get(`${environment.api.url}masterForm/dashboard-slbWS/state/606aaf854dff55e6c075d219?ua_id=${ua_id}&state_id=${state_id}`);
    }
    getUAList(state_id) {
        return this.http.get(`${environment.api.url}masterForm/UAList?state_id=${state_id}`);
    }

    getGrantTransfer(params, csv = null) {
        if (csv)
            return this.http.get(`${environment.api.url}template?csv=${params.csv}&design_year=606aaf854dff55e6c075d219&state_id=${params.state_id ? params.state_id : ""}&year_id=${params.year ? params.year : ""}&installment=${params.installment ? params.installment : ""}`, { responseType: 'blob' });
        return this.http.get(`${environment.api.url}template?csv=${params.csv}&design_year=606aaf854dff55e6c075d219&state_id=${params.state_id ? params.state_id : ""}&year_id=${params.year ? params.year : ""}&installment=${params.installment ? params.installment : ""}`);
    }

}
