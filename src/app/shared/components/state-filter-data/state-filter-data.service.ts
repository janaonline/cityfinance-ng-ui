import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StateFilterDataService {
  constructor(private http: HttpClient) {}

  getScatterdData(payload) {
    return this.http.post(
      environment.api.url + "/state-revenue",
      payload
    );
  }

  getRevID() {
    return this.http.get(environment.api.url + "LineItem");
  }
}
