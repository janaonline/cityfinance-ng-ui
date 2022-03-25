import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chart } from "chart.js";

import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AboutService {
  constructor(private httpClient: HttpClient) {}

  avgRevenue(param) {
    let params = new HttpParams();
    for (const key in param) {
      const element = param[key];
      params = params.append(key, element);
    }
    return this.httpClient.get(
      `${environment.api.url}about-indicator?${params}`
    );
  }
  compPeer(id: string, year) {
    return this.httpClient.get(
      `${environment.api.url}about-indicator-comp?ulb=${id}&financialYear=${year}`
    );
  }
}
