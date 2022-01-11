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

  getSingleUlbList(_id: any) {
    return this.http.get(`${environment.api.url}/ulb/${_id}`);
  }
}
