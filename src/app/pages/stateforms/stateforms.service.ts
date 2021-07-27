import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateformsService {
  allStatus = new Subject<any>();
  allStatusStateForms = new Subject<any>();
  allStateFormsData = new Subject<any>()
  disableAllFormsAfterStateFinalSubmit = new Subject<any>();
  disableAllFormsAfterMoHUAReview = new Subject<any>();
  getObservedStatus() {
    return this.allStatus;
  }
  getObservedStatusState() {
    return this.allStatusStateForms;
  }

  constructor(private http: HttpClient) { }

  getStatus(design_year) {
    return this.http.get(`${environment.api.url}masterForm/get/${design_year}`);
  }
  finalSubmitbyState(data) {
    return this.http.post(`${environment.api.url}stateMasterForm/finalSubmit`, data);
  }


  getAllStateForms(design_year, state) {
    return this.http.get(`${environment.api.url}stateMasterForm/getAllForms/${design_year}/${state}`)
  }


  getStateForm(design_year, rowId) {
    if (rowId != null) {
      return this.http.get(`${environment.api.url}stateMasterForm/get/${design_year}/${rowId}`);
    } else {
      return this.http.get(`${environment.api.url}stateMasterForm/get/${design_year}`);
    }
  }

  getulbDetails() {
    return this.http.get(`${environment.api.url}user/all?role=ULB`);
  }
  getUlbReview() {
    return this.http.get(`${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219`);
  }
  updateRequest(body) {
    return this.http.post(`${environment.api.url}ulb-update-request`, body);

  }

  finalReviewSubmitByMoHUA(body, state_id) {
    return this.http.post(`${environment.api.url}stateMasterForm/finalAction?state_id=${state_id}`, body);
  }
  allStateFormData(state_id) {

    return this.http.get(`${environment.api.url}stateMasterForm/getAllForms/606aaf854dff55e6c075d219/${state_id}`);
  }

}
