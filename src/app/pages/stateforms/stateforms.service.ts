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
  disableAllFormsAfterStateFinalSubmit = new Subject<any>();
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

  getStateForm(design_year, rowId) {
    return this.http.get(`${environment.api.url}stateMasterForm/get/${design_year}`);
  }

  getulbDetails() {
    // return this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/user/profile')

    //https://democityfinanceapi.dhwaniris.in/api/v1/user/all?role=ULB&filter=%7B%7D&sort=%7B%7D&skip=0&limit=10
    return this.http.get(`${environment.api.url}user/all?role=ULB`);
  }
  getUlbReview() {
    return this.http.get(`${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219`);
  }
  updateRequest(body) {
    return this.http.post(`${environment.api.url}ulb-update-request`, body);

  }

}
