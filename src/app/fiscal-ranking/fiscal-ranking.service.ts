import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { KeyValue } from "@angular/common";
import { FormGroup } from "@angular/forms";
import { TableResponse } from "./common-table/common-table.component";

import { map } from "rxjs/operators";

export enum StatusType {
  "notStarted" = 1,
  "inProgress" = 2,
  "verificationNotStarted" = 8,
  "verificationInProgress" = 9,
  "returnedByPMU" = 10,
  "ackByPMU" = 11
}
export interface Table {
  id: string;
  endpoint: string;
  response: TableResponse;
}


export interface MapData {
  _id: string;
  heatMap: HeatMap;
  ulbWiseData: UlbWiseData;
  formWiseData: FormWiseData;
  stateName: string;
  totalUlbs: number;
}
export interface HeatMap {
  _id: string;
  stateId: string;
  code: string;
  percentage: number;
}
export interface UlbWiseData {
  totalUlbs: number;
  inProgress: number;
  submitted: number;
}
export interface FormWiseData {
  totalForms: number;
  verificationInProgress: number;
  approved: number;
  rejected: number;
}



@Injectable({
  providedIn: 'root'
})
export class FiscalRankingService {

  public badCredentials: Subject<boolean> = new Subject<boolean>();
  public helper = new JwtHelperService();
  loginLogoutCheck = new Subject<any>();
  constructor(private http: HttpClient,) { }
  getfiscalUlbForm(dYr, id) {
    return this.http.get(
      `${environment.api.url}fiscal-ranking/view?design_year=${dYr}&ulb=${id}`
    );
  }
  // cardApi : any="https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent";
  // getHeroes() {
  //   return this.http.get ("https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent")
  //   }
  getLandingPageCard() {
    return this.http.get(
      // `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      `${environment.api.url}FRHomePageContent`
    );
  }

  sortPosition(itemA: KeyValue<number, FormGroup>, itemB: KeyValue<number, FormGroup>) {
    const a = +itemA.value.controls.position?.value;
    const b = +itemB.value.controls.position?.value;
    return a > b ? 1 : (b > a ? -1 : 0);;
  }

  signin(user) {
    return this.http.post(environment.api.url + "login", user);
  }

  verifyCaptcha(recaptcha: string) {
    return this.http.post(`${environment.api.url}captcha_validate`, {
      recaptcha,
    });
  }
  postFiscalRankingData(body) {
    return this.http.post(`${environment.api.url}fiscal-ranking/create-form`, body);
  }

  actionByMohua(body) {
    return this.http.post(`${environment.api.url}fiscal-ranking/action-by-mohua`, body)
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  loggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }

  downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  getTableResponse(endpoint: string, queryParams: string, columns) {
    return this.http.get<TableResponse>(`${environment.api.url}/${endpoint}?${queryParams}`).pipe(
      map((response) => {
        response.columns = columns || response.columns.map(column => ({
          ...column,
          sort: 0,
        }));
        return response;
      })
    );
  }

  getStateWiseForm() {
    return this.http.get<{data: MapData}>(`${environment.api.url}/fiscal-ranking/getStateWiseForm?state=all`);
  }
}
