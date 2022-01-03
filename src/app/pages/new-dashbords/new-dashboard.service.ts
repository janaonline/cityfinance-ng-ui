import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NewDashboardService {
  constructor(private http: HttpClient) {}

  dashboardInformation(ifPeople = true, ulbOrStateid, type) {
    let headers = new HttpHeaders();
    headers = headers.append("type", type);
    let request = "";
    if (ifPeople)
      request = `${environment.api.url}all-dashboard/people-information?`;
    else request = `${environment.api.url}all-dashboard/money-information?`;
    if (type == "ulb") {
      request += `ulb=${ulbOrStateid}`;
    } else request += `state=${ulbOrStateid}`;
    return this.http.get(request, { headers });
  }

  getDashboardTabData(dashboardId) {
    return this.http.get(
      `${environment.api.url}dashboardHeaders/${dashboardId}`
    );
  }
}
