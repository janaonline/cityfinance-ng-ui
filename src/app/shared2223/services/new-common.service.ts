import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { BehaviorSubject, Subject } from "rxjs";

interface FrFormsParamsInterface {
  year: string,
  formId: string,
  stateId: string
}

@Injectable({
  providedIn: "root",
})
export class NewCommonService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  annualFinalSubmit = new Subject<any>();
  setFormStatus2223: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  setStateFormStatus2223: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  setULBRouter: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  setStateRouter: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  multiAction = new Subject<any>();
  reviewStatus: BehaviorSubject<any> = new BehaviorSubject<any>(false);

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
  getOdfRatings(yr) {
    return this.http.get(`${environment.api.url}ratings?formName=odf&financialYear=${yr}`);
  }

  odfSubmitForm(body: any) {
    return this.http.post(
      `${environment.api.url}gfc-odf-form-collection`,
      body
    );
  }
  getPtData(param) {
    return this.http.get(
      `${environment.api.url}property-tax-floor-rate?state=${param.state}&design_year=${param.design_year}`
    );
  }
  submitPtForm(body) {
    return this.http.post(
      `${environment.api.url}property-tax-floor-rate`,
      body
    );
  }
  submitStateFinance(body) {
    return this.http.post(
      `${environment.api.url}state-finance-commission-formation`,
      body
    );
  }
  getStateFinance(param) {
    return this.http.get(
      `${environment.api.url}state-finance-commission-formation?state=${param.state}&design_year=${param.design_year}`
    );
  }
  pfmsSubmitForm(body: any) {
    return this.http.post(`${environment.api.url}link-pfms`, body);
  }
  getGfcFormData(param, yr) {
    return this.http.get(`${environment.api.url}ratings?formName=${param}&financialYear=${yr}`);
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

  getReviewForms(params, endpoint="review") {
    return this.http.get(`${environment.api.url}${endpoint}`, { params });
  }
  getFormList(params) {
    return this.http.get(`${environment.api.url}menulist`, { params });
  }

  getFrUlbs(params: FrFormsParamsInterface) {
    return this.http.get(`${environment.api.url}fiscal-ranking/get-fr-ulbs`, { params: params as any });
  }

  getUtiData(ulbId) {
    return this.http.get(
      `${environment.api.url}utilReport?ulb=${ulbId}&design_year=606aafb14dff55e6c075d3ae`
    );
  }

  postTableApproveRejectData(body) {
    return this.http.patch(`${environment.api.url}common-action`, body);
  }
  getTableApproveRejectData(body) {
    return this.http.patch(`${environment.api.url}common-action`, body);
  }

  get28SlbsData(ulbId) {
    return this.http.get(
      `${environment.api.url}28-slbs?design_year=606aafb14dff55e6c075d3ae&ulb=${ulbId}`
    );
  }

  post28SlbsData(data) {
    return this.http.post(`${environment.api.url}28-slbs`, data);
  }

  postCommonAction(body) {
    return this.http.patch(`${environment.api.url}common-action`, body);
  }

  postPropertyTaxUlb(body) {
    return this.http.post(`${environment.api.url}propTaxOp`, body);
  }

  getPropertyTaxUlbData(param) {
    return this.http.get(
      `${environment.api.url}propTaxOp?ulb=${param.ulb}&design_year=${param.design_year}`
   ) }
  //property tax open form
  getPropertyTaxOpenData(params){
    return this.http.get(
      `${environment.api.url}pTaxOpen?design_year=606aafb14dff55e6c075d3ae&ulb=${params.ulb}`
    );
  }
  postPropertyTaxOpenData(body){
    return this.http.post(
      `${environment.api.url}pTaxOpen`, body
    );
  }

  getPropertyTaxDropdownList() {
    return this.http.get(
      `${environment.api.url}propTaxOpDropDown`
    );
  }
  postActionDataAA(body) {
    return this.http.post(`${environment.api.url}annual-accounts/action`, body);
  }
}
