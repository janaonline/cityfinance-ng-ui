import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { retry } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class StateFilterDataService {
  constructor(private http: HttpClient) {}

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
}
