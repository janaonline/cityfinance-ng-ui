import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class StateDashboardService {

    constructor(private http: HttpClient) { }

    getCardData() {
        return this.http.get(`${environment.api.url}dashboard/state`);
    }
    getFormData() {
        return this.http.get(`${environment.api.url}masterForm/state-dashboard/606aaf854dff55e6c075d219`);
    }
    getPlansData() {
        return this.http.get(`${environment.api.url}masterForm/dashboard-plansData/606aaf854dff55e6c075d219`);
    }



}
