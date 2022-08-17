import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
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
  // getGtaTemplate(ins, type, yr) {
  //   return this.http.get(
  //     `${environment.api.url}grantDistribution/template?type=${type}&year=${yr}&installment=${ins}`
  //   );
  // }
  getGtaTemplate(ins, type, yr): Observable<any> {
    // return this.http.get(environment.api.url + 'grantDistribution/template', { responseType: 'blob' });
    return this.http.get(
      `${environment.api.url}grantDistribution/template?type=${type}&year=${yr}&installment=${ins}`,
      { responseType: "blob" }
    );
  }
}
