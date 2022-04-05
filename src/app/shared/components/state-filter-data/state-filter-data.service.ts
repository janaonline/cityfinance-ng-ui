import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { retry, catchError, map, filter, switchMap, tap } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { CommonService } from "../../services/common.service";
// ./shared/services/common.service
@Injectable({
  providedIn: "root",
})
export class StateFilterDataService {
  constructor(private http: HttpClient,
    private commonService: CommonService) {}

  getScatterdData(payload) {
    return this.http.post(environment.api.url + "/state-revenue", payload);
  }

  getRevID() {
    return this.http.get(environment.api.url + "LineItem");
  }

  getServiceDropDown(type) {
    return this.http.get(
      environment.api.url + `state-list-of-indics?type=${type}`
    );
  }

  getStateUlbsGroupedByPopulation(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}state-ulbs-grouped-by-population`, {
        params: bodyParams,
      }
    );
  }

  getStateRevenueForDifferentTabs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(
      `${environment.api.url}state-revenue-tabs`, {
        params: bodyParams,
      }
    );
  }

  handleError(error: any) {
    console.log("error", error);
    return throwError(error.message || "SERVER ERROR");
  }
}
