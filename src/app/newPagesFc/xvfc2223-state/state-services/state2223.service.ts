import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
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
<<<<<<< HEAD
  getDashboardFormData(params) {
    return this.http.get(
      `${environment.api.url}dashboard?formType=${params.formType}&design_year=${params.design_year}&stateId=${params.stateId}&installment=${params.installment}`
=======
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
  checkFile(val, ins, yr, type) {
    let url =
      environment.api.url +
      `grantDistribution/upload?url=${val}&design_year=${yr}&type=${type}&installment=${ins}`;
    return this.http.get(url, { responseType: "blob" });
  }
  postGTAFile(body) {
    return this.http.post(`${environment.api.url}grantDistribution/save`, body);
  }
  getGTAFiles(state_id) {
    let getFilesUrl =
      environment.api.url +
      `grantDistribution/get/606aaf854dff55e6c075d219?state_id=${state_id}`;
    return this.http.get(getFilesUrl).pipe(
      catchError((error) => {
        let errMes = "An error occured.";
        console.log(error);
        if (error.status == "404") {
          errMes = "No records found.";
          return throwError(errMes);
        } else {
          return throwError(errMes);
        }
      })
>>>>>>> 4cac3c14761af74071e05008111a56f9613d5abf
    );
  }
}
