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
        return this.http.get('https://60b5e300fe923b0017c84d35.mockapi.io/masterData');
    }
    getPlansData() {
        return this.http.get('https://60b5e300fe923b0017c84d35.mockapi.io/plansData');
    }



}
