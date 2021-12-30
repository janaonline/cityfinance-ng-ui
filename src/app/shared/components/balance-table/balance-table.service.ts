import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BalanceTableService {
  constructor(private http: HttpClient) {}

  sendRequest(val) {
    let sendUrl = environment.api.url + "ledger/getIE";
    return this.http.post(sendUrl, val);
  }
}
