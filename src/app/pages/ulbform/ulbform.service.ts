import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UlbformService {
  allStatus = new Subject<any>();

  allFormsData = new Subject<any>();

  initiateDownload = new Subject<any>();

  setForms = new Subject<any>();

  disableAllFormsAfterStateReview = new Subject<any>();
  disableAllFormsAfterMohuaReview = new Subject<any>();

  getObservedStatus() {
    return this.allStatus;
  }

  constructor(private http: HttpClient) { }

  getStatus(design_year, rowId) {
    if (rowId != null) {
      return this.http.get(
        `${environment.api.url}masterForm/get/${design_year}/${rowId}`
      );
    } else {
      return this.http.get(
        `${environment.api.url}masterForm/get/${design_year}`
      );
    }
  }

  getAllForms(ulb, design_year, financialYear) {
    return this.http.get(
      `${environment.api.url}masterForm/getAllForms?ulb=${ulb}&&design_year=${design_year}&&financialYear=${financialYear}`
    );
  }
  getEligibleULBForm(ulb_id) {
    return this.http.get(`${environment.api.url}eligibleULBForms?ulb_id=${ulb_id}`);
  }
  postMasterForm(data) {
    return this.http.post(`${environment.api.url}masterForm/finalSubmit`, data);
  }
  postFinalActionByState(actionData) {
    return this.http.post(
      `${environment.api.url}masterForm/finalAction`,
      actionData
    );
  }

  postStateSlbActionSlb(data) {
    return this.http.post(`${environment.api.url}xv-fc-form/newAction`, data);
  }
}
