import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { catchError, finalize, map, shareReplay, tap } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { IUserLoggedInDetails } from "../models/login/userLoggedInDetails";

export interface AuthSessionState {
  isAuthenticated: boolean;
  isRefreshing: boolean;
  hasAccessToken: boolean;
  user: IUserLoggedInDetails | null;
}

@Injectable()
export class AuthService {
  private readonly accessTokenStorageKey = "id_token";
  private readonly refreshTokenStorageKey = "refresh_token";
  private readonly loginUrl = `${environment.api.url}login`;
  private readonly logoutUrl = `${environment.api.url}logout`;
  private readonly refreshTokenUrl = `${environment.api.url}refresh`;

  private accessToken: string | null = null;
  private refreshRequest$: Observable<any> | null = null;

  public badCredentials: Subject<boolean> = new Subject<boolean>();
  public helper = new JwtHelperService();
  public loginLogoutCheck = new Subject<any>();

  private readonly currentUserSubject =
    new BehaviorSubject<IUserLoggedInDetails | null>(this.readStoredUser());
  private readonly sessionStateSubject = new BehaviorSubject<AuthSessionState>(
    this.buildSessionState(false)
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();
  readonly sessionState$ = this.sessionStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.removeLegacyTokenStorage();
    this.publishSessionState();
  }

  authenticateUser(user) {
    return this.login(user);
  }

  getLastUpdated(params?) {
    return this.http.get(
      environment.api.url +
      `ledger/lastUpdated?ulb=${params?.ulb ?? ""}&state=${params?.state ?? ""}`
    );
  }

  getCityData(ulbId) {
    return this.http.get(
      environment.api.url + `all-dashboard/people-information?type=ulb&ulb=${ulbId}`
    );
  }

  login(user) {
    return this.http
      .post(this.loginUrl, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          this.storeTokens(response);
          if (response?.user) {
            this.setCurrentUser(response.user);
          }
        })
      );
  }

  signin(user) {
    return this.login(user);
  }

  refreshToken() {
    if (this.refreshRequest$) {
      return this.refreshRequest$;
    }

    this.publishSessionState(true);
    this.refreshRequest$ = this.http
      .post(this.refreshTokenUrl, {}, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          this.storeTokens(response);
          if (response?.user) {
            this.setCurrentUser(response.user);
          }
        }),
        catchError((error) => {
          if ([401, 403, 440, 441].includes(error?.status)) {
            this.clearLocalStorage();
          } else {
            this.clearAccessToken();
          }

          return throwError(error);
        }),
        finalize(() => {
          this.refreshRequest$ = null;
          this.publishSessionState(false);
        }),
        shareReplay(1)
      );

    return this.refreshRequest$;
  }

  refreshAccessToken() {
    return this.refreshToken();
  }

  initializeSession() {
    if (this.loggedIn()) {
      return of(true);
    }

    if (!this.getCurrentUserSnapshot()) {
      this.publishSessionState();
      return of(false);
    }

    return this.refreshToken().pipe(
      map(() => this.loggedIn()),
      catchError(() => of(false))
    );
  }

  ensureAuthenticated() {
    if (this.loggedIn()) {
      return of(true);
    }

    if (!this.canAttemptSilentRefresh()) {
      return of(false);
    }

    return this.refreshToken().pipe(
      map(() => this.loggedIn()),
      catchError(() => of(false))
    );
  }

  signup(newUser) {
    return this.http.post(environment.api.url + "register", newUser);
  }

  decodeToken() {
    const token = this.getToken();
    return token ? this.helper.decodeToken(token) : null;
  }

  getToken() {
    return this.getAccessToken();
  }

  getAccessToken() {
    return this.accessToken;
  }

  hasAccessToken() {
    return !!this.accessToken;
  }

  loggedIn() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    return !this.helper.isTokenExpired(token);
  }

  canAttemptSilentRefresh() {
    return !!this.getCurrentUserSnapshot() || this.hasAccessToken();
  }

  storeTokens(authResponse: any) {
    const accessToken = this.extractAccessToken(authResponse);
    this.accessToken = accessToken || null;
    this.removeLegacyTokenStorage();
    this.publishSessionState();
  }

  extractAccessToken(authResponse: any) {
    return (
      authResponse?.token ??
      authResponse?.accessToken ??
      authResponse?.access_token ??
      authResponse?.data?.token ??
      authResponse?.data?.accessToken ??
      authResponse?.data?.access_token ??
      null
    );
  }

  extractRefreshToken(authResponse: any) {
    return (
      authResponse?.refreshToken ??
      authResponse?.refresh_token ??
      authResponse?.data?.refreshToken ??
      authResponse?.data?.refresh_token
    );
  }

  isRefreshRequest(url: string) {
    return this.isUrlMatch(url, this.refreshTokenUrl);
  }

  isLoginRequest(url: string) {
    return this.isUrlMatch(url, this.loginUrl);
  }

  isLogoutRequest(url: string) {
    return this.isUrlMatch(url, this.logoutUrl);
  }

  isAuthRequest(url: string) {
    return (
      this.isLoginRequest(url) ||
      this.isRefreshRequest(url) ||
      this.isLogoutRequest(url)
    );
  }

  verifyCaptcha(recaptcha: string) {
    return this.http.post(`${environment.api.url}captcha_validate`, {
      recaptcha,
    });
  }

  logout() {
    const request$ = this.http
      .post(this.logoutUrl, {}, { withCredentials: true })
      .pipe(catchError(() => of(null)), shareReplay(1));

    request$.subscribe({
      next: () => { },
      error: () => { },
    });

    this.clearLocalStorage();
    return request$;
  }

  otpSignIn(body) {
    return this.http.post(`${environment.api.url}sendOtp`, body, {
      withCredentials: true,
    });
  }

  otpVerify(body) {
    return this.http.post(`${environment.api.url}verifyOtp`, body, {
      withCredentials: true,
    });
  }

  clearLocalStorage(excludeKeys = ["userInfo"]) {
    this.clearAccessToken();

    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      const shouldExclude = excludeKeys.some((exclude) => key === exclude);
      if (!shouldExclude) {
        localStorage.removeItem(key);
      }
    });

    localStorage.removeItem(this.accessTokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
    this.currentUserSubject.next(null);
    this.publishSessionState();
  }

  clearLocalStorageKey(key: string) {
    localStorage.removeItem(key);
    if (key === "userData") {
      this.currentUserSubject.next(null);
      this.publishSessionState();
    }
  }

  setCurrentUser(user: IUserLoggedInDetails | null) {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }

    this.currentUserSubject.next(user);
    this.publishSessionState();
  }

  getCurrentUserSnapshot() {
    return this.currentUserSubject.getValue();
  }

  public sendOtp(email: string) {
    if (!email) throw new Error("Email is mandatory!");

    return this.http.post(`${environment.api.urlV2}email/sendOtp`, { email });
  }

  public verifyOtp(email: string, otp: string) {
    if (!email || !otp) throw new Error("Email or OTP is missing!");

    return this.http.post(`${environment.api.urlV2}email/verifyOtp`, {
      email,
      otp,
    });
  }

  private readStoredUser(): IUserLoggedInDetails | null {
    try {
      const user = localStorage.getItem("userData");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  private buildSessionState(isRefreshing: boolean): AuthSessionState {
    return {
      isAuthenticated: this.loggedIn(),
      isRefreshing,
      hasAccessToken: this.hasAccessToken(),
      user: this.getCurrentUserSnapshot(),
    };
  }

  private publishSessionState(isRefreshing = false) {
    this.sessionStateSubject.next(this.buildSessionState(isRefreshing));
  }

  private clearAccessToken() {
    this.accessToken = null;
    this.removeLegacyTokenStorage();
    this.publishSessionState();
  }

  private removeLegacyTokenStorage() {
    localStorage.removeItem(this.accessTokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
    sessionStorage.removeItem(this.accessTokenStorageKey);
    sessionStorage.removeItem(this.refreshTokenStorageKey);
  }

  private isUrlMatch(url: string, targetUrl: string) {
    return url === targetUrl || url.endsWith(targetUrl.replace(environment.api.url, ""));
  }
}
