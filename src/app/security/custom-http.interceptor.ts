import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

import { Login_Logout } from '../util/logout.util';
import { SweetAlert } from "sweetalert/typings/core";
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const swal: SweetAlert = require("sweetalert");
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshedAccessToken$ = new BehaviorSubject<string | null>(null);
  routerNavigationSuccess = new Subject<any>();

  constructor(private router: Router, private _router: Router, private authService: AuthService,
    private matSnackBar: MatSnackBar,
  ) {
    this.initializeRequestCancelProccess();
    // matSnackBar.openFromTemplate( );
    // this.showError();
  }

  showError(message?: string) {
    this.matSnackBar.open(message ? message : 'Something went wrong', '', {
      duration: 10000,
      panelClass: ['snack-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body instanceof File && req.method === "PUT") {
      return next.handle(req);
    }

    const authReq = this.addDefaultHeaders(req);
    return next.handle(authReq).pipe(
      // takeUntil(this.routerNavigationSuccess),
      catchError((err: HttpErrorResponse) =>
        this.handleAuthError(err, authReq, next)
      )
    );
  }

  private addDefaultHeaders(req: HttpRequest<any>, token?: string) {
    const sessionID = sessionStorage.getItem("sessionID");
    const accessToken = token ?? this.authService.getAccessToken();
    let headers = req.headers;

    if (!req.headers.has("Accept")) {
      headers = req.headers.set("Content-Type", "application/json");
    }
    if (sessionID) {
      headers = headers.set("sessionId", sessionID);
    }
    if (accessToken) {
      headers = headers.set("x-access-token", accessToken);
    }

    return req.clone({ headers });
  }

  private handleAuthError(
    err: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = this.authService.getRefreshToken();

    if (
      err.status === 401 &&
      refreshToken &&
      !this.authService.isRefreshRequest(req.url)
    ) {
      return this.handle401Error(req, next);
    }

    return this.handleError(err);
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshedAccessToken$.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap((response: any) => {
          const accessToken = this.authService.extractAccessToken(response);

          if (!accessToken) {
            return this.handleError(
              new HttpErrorResponse({
                status: 401,
                error: { message: "Session Expired. Kindly login again." },
              })
            );
          }

          this.authService.storeTokens(response);
          this.refreshedAccessToken$.next(accessToken);
          return next.handle(this.addDefaultHeaders(req, accessToken));
        }),
        catchError((refreshError: HttpErrorResponse) => this.handleError(refreshError)),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }

    return this.refreshedAccessToken$.pipe(
      filter((token) => !!token),
      take(1),
      switchMap((token) => next.handle(this.addDefaultHeaders(req, token)))
    );
  }

  initializeRequestCancelProccess() {
    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof ResolveEnd || event instanceof NavigationEnd
        ),
        filter((event: ResolveEnd | NavigationEnd) => {
          return (
            event.url.split("?")[0] !== event.urlAfterRedirects.split("?")[0]
          );
        }),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(this.routerNavigationSuccess);
  }

  logoutRedirection() {
    this.clearLocalStorage();
    if (localStorage.getItem("loginType") === "state-dashboard") {
      this.router.navigate(["login/state-dashboard"]);
    } else if (localStorage.getItem("loginType") === "XVIFC") {
      this.router.navigate(["login/xvi-fc"]);
    } else {
      this.router.navigate(["fc_grant"]);
    }
  }

  private handleError = (err: HttpErrorResponse) => {
    /**
     * @description 401 means usre need to be logged in to access this api. Therefore, redirect the user
     * to login page
     */

    switch (err.status) {
      case 401:
        this.showError(err.error?.message);
        this.logoutRedirection();
        break;
      case 403:
        swal('Error', err.error?.message ?? 'Something went wrong', 'error');
        this.logoutRedirection();
        break;
      case 503:
        this.clearLocalStorage();
        // swal('Error', err.error?.message ?? 'Something went wrong', 'error');
        this.router.navigate(["maintenance"]);
        break;
      case 440:
        this.clearLocalStorage();
        const url = !["/", ""].includes(this.router.url)
          ? this.router.url
          : location.pathname + location.search + location.hash;
        if (!url.includes("login")) {
          sessionStorage.setItem("postLoginNavigation", url);
        }
        this.router.navigate(["login"], {
          queryParams: { message: "Session Expired. Kindly login again." },
        });
        break;
      case 441:
        this.clearLocalStorage();
        this.router.navigate(["login"], {
          queryParams: {
            message: "Password Expired. Kindly reset your password.",
          },
        });
        break;
      case 0:
        return throwError({
          error: { message: "Failed to connect with Server" },
        });
    }
    return throwError(err);
  };

  private clearLocalStorage() {
    // localStorage.clear();
    this.authService.clearLocalStorage();
    Login_Logout.logout();
  }
}
