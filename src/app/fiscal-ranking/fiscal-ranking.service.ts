import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class FiscalRankingService {

  public badCredentials: Subject<boolean> = new Subject<boolean>();
  public helper = new JwtHelperService();
  loginLogoutCheck = new Subject<any>();
  constructor(private http: HttpClient,) { }
  getfiscalUlbForm(dYr, id) {
    return this.http.get(
      `${environment.api.url}fiscal-ranking/view?design_year=${dYr}&ulb=${id}`
    );
  }
  // cardApi : any="https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent";
  // getHeroes() {
  //   return this.http.get ("https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent")
  //   }
  getLandingPageCard() {
    return this.http.get(
      // `${environment.api.url}menu?role=ULB&year=606aafb14dff55e6c075d3ae&isUa=false`
      `${environment.api.url}FRHomePageContent`
    );
  }

  signin(user) {
    return this.http.post(environment.api.url + "login", user);
  }

  verifyCaptcha(recaptcha: string) {
    return this.http.post(`${environment.api.url}captcha_validate`, {
      recaptcha,
    });
  }
  postFiscalRankingData(body) {
    return this.http.post(`${environment.api.url}fiscal-ranking/create`, body);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  loggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }



}
