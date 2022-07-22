import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class NewCommonService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  annualFinalSubmit = new Subject<any>();
  setFormStatus2223 = new Subject<any>();
  getLeftMenu(ulbId, role, isUA) {
    return this.http.get(
      // `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      `${environment.api.url}menu?role=${role}&year=606aafb14dff55e6c075d3ae&_id=${ulbId}`
    );
  }
  submittedFormData(params) {
    return this.http.get(
      `${environment.api.url}link-pfms?ulb=${params.ulb}&design_year=${params.design_year}`
    );
  }
  getOdfRatings() {
    return this.http.get(`${environment.api.url}ratings?formName=odf`);
  }

  odfSubmitForm(body: any) {
    return this.http.post(
      `${environment.api.url}gfc-odf-form-collection`,
      body
    );
  }
  getPtoData(param) {
    return this.http.get(`${environment.api.url}property-tax-floor-rate?state=${param.state}&design_year=${param.design_year}`);
  }
  submitPtoForm(body){
    return this.http.post(
      `${environment.api.url}property-tax-floor-rate`,
      body
    );
  }
  pfmsSubmitForm(body: any) {
    return this.http.post(`${environment.api.url}link-pfms`, body);
  }
  getGfcFormData(param) {
    return this.http.get(`${environment.api.url}ratings?formName=${param}`);
  }
  getOdfFormData(params) {
    return this.http.get(
      `${environment.api.url}gfc-odf-form-collection?ulb=${params.ulb}&design_year=${params.design_year}&isGfc=${params.isGfc}`
    );
  }
  getAnnualData(params) {
    return this.http.get(`${environment.api.url}annual-accounts/get`, {
      params,
    });
  }

  postAnnualData(body) {
    return this.http.post(`${environment.api.url}annual-accounts/create`, body);
  }
  postUtiData(body) {
    return this.http.post(`${environment.api.url}utilization-report`, body);
  }
  getUtiData(ulbId) {
    return this.http.get(
      `${environment.api.url}utilReport?ulb=${ulbId}&design_year=606aafb14dff55e6c075d3ae`
    );
  }
}
