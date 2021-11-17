import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GrantClaimsService {
  constructor(private http: HttpClient) { }

  getData(financialYear, stateId) {
    let catUrl = environment.api.url + `grant-claim/get?financialYear=${financialYear}&stateId=${stateId}`;
    return this.http.get(catUrl);
  }


}
