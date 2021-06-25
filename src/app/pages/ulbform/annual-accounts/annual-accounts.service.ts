import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnnualAccountsService {
  constructor(private http: HttpClient) {}
  OpenModalTrigger = new Subject<any>();

  getData(params) {
      return this.http.get(
        `${environment.api.url}annual-accounts/get`,
        {
          params,
        }
      );
  }

  postData(body) {
    return this.http.post(`${environment.api.url}annual-accounts/create`, body);
  }

  processData(body) {
    return this.http.post(`${environment.api.url}processData`, body);
  }

  getProcessStatus(id) {
    return this.http.get(`${environment.api.url}getProcessStatus/${id}`);
  }
}
