import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class StateDashboardService {

    constructor(private http: HttpClient) { }

    getCardData(state_id) {
        return this.http.get(`${environment.api.url}dashboard/state?state_id=${state_id}`);
    }
    getFormData(state_id) {
        return this.http.get(`${environment.api.url}masterForm/state-dashboard/606aaf854dff55e6c075d219?state_id=${state_id}`);
    }
    getPlansData(state_id) {
        return this.http.get(`${environment.api.url}masterForm/dashboard-plansData/606aaf854dff55e6c075d219?state_id=${state_id}`);
    }



}
