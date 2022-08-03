import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class State2223Service {
  constructor(private http: HttpClient) {}

  postGtcForm(body) {
    return this.http.post(
      `${environment.api.url}grant-transfer-certificate`,
      body
    );
  }
  getGtcData(stateId) {
    return this.http.get(
      `${environment.api.url}grant-transfer-certificate?state=${stateId}&design_year=606aafb14dff55e6c075d3ae`
    );
  }
}
