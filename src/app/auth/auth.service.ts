import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
  public badCredentials: Subject<boolean> = new Subject<boolean>();

  public helper = new JwtHelperService();
  // public decodedToken = this.helper.decodeToken(myRawToken);
  // public expirationDate = this.helper.getTokenExpirationDate(myRawToken);
  // public isExpired = this.helper.isTokenExpired(myRawToken);

  constructor(private http: HttpClient) { }

  loginLogoutCheck = new Subject<any>();
  authenticateUser(user) {
    this.http.post(environment.api.url + "users/signin", user);
  }

  getLastUpdated(params?) {
    return this.http.get(
      environment.api.url +
      `ledger/lastUpdated?ulb=${params?.ulb ?? ""}&state=${params?.state ?? ""
      }`
    );
  }

  getCityData(ulbId) {
    return this.http.get(
      environment.api.url +
      `all-dashboard/people-information?type=ulb&ulb=${ulbId}`
    );
  }
  signin(user) {
    return this.http.post(environment.api.url + "login", user);
  }

  signup(newUser) {
    return this.http.post(environment.api.url + "register", newUser);
  }

  decodeToken() {
    return this.helper.decodeToken(this.getToken());
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  /**
   * @description Checks if user is logged in or not.
   */
  loggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }

  verifyCaptcha(recaptcha: string) {
    return this.http.post(`${environment.api.url}captcha_validate`, {
      recaptcha,
    });
  }

  logout() {
    // localStorage.clear();
    this.clearLocalStorage();
  }
  otpSignIn(body) {
    return this.http.post(`${environment.api.url}sendOtp`, body);
  }
  otpVerify(body) {
    return this.http.post(`${environment.api.url}verifyOtp`, body);
  }

  // Ensure "excludekeys" are preserved in local storage and not removed.
  clearLocalStorage(excludeKeys = ['userInfo']) {
    // Get all keys from localStorage
    const allKeys = Object.keys(localStorage);

    // Iterate over each key
    allKeys.forEach(key => {
      // Check if the key matches any exclusion criteria
      const shouldExclude = excludeKeys.some(exclude => {
        return key === exclude;
      });

      // If the key doesn't match any exclusion criteria, remove it
      if (!shouldExclude) localStorage.removeItem(key);
    });
  }

  // Remove specific key from local storage.
  clearLocalStorageKey(key: string) {
    localStorage.removeItem(key);
  }
}
