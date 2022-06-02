import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { CommonService } from "src/app/shared/services/common.service";

@Injectable({
  providedIn: 'root'
})
export class SlbDashboardService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) { }

  getUlbTypeDataForTable(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.commonService.getHttpClientParams(paramContent);
    return this.http.get(`${environment.api.url}national-dashboard/data-availability`, {params: bodyParams});
    // return this.http.get(environment.api.url + `${apiEndPoint}`, {
    //   params: bodyParams,
    // });
  }
}
