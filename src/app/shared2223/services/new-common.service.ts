import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class NewCommonService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getULBLeftMenu() {
    return this.http.get(
      // `${environment.api.url}?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      `https://democityfinanceapi.dhwaniris.in/api/v1?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
    );
  }
}
