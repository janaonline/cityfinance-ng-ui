import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class StateDashboardService {

  constructor(private http: HttpClient) { }

  getUasList(){
    return this.http.get(`${environment.api.url}dashboard/state`);
  }
}
