import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class NewCommonService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getULBLeftMenu(ulbId, role, isUA) {
    return this.http.get(
      // `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&_id=${ulbId}`
    );
  }
  getAnnualData(params) {
    return this.http.get(
      `${environment.api.url}annual-accounts/get`,
      {
        params,
      }
    );
}

postAnnualData(body) {
  return this.http.post(`${environment.api.url}annual-accounts/create`, body);
}
}
