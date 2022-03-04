import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chart } from "chart.js";

import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AboutService {
  constructor(private httpClient: HttpClient) {}

  avgRevenue(id: string, year, compare = "") {
    return this.httpClient.get(
      `${environment.api.url}/about-indicator?ulb=${id}&financialYear=${year}&compare=${compare}`
    );
  }
}
