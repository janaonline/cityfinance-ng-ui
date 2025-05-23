import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { Login_Logout } from '../util/logout.util';
import { SweetAlert } from "sweetalert/typings/core";
import { AuthService } from '../auth/auth.service';

const swal: SweetAlert = require("sweetalert");
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  routerNavigationSuccess = new Subject<any>();

  constructor(private router: Router, private _router: Router, private authService: AuthService) {
    this.initializeRequestCancelProccess();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body instanceof File && req.method === "PUT") {
      return next.handle(req);
    }

    const token = JSON.parse(localStorage.getItem("id_token"));
    const sessionID = sessionStorage.getItem("sessionID");
    let headers = req.headers;
    if (!req.headers.has("Accept")) {
      headers = req.headers.set("Content-Type", "application/json");
    }
    if (sessionID) {
      headers = headers.set("sessionId", sessionID);
    }
    if (token) {
      headers = headers.set("x-access-token", token);
    }
    //headers =  headers.set("x-ms-blob-type", "BlockBlob")
    const authReq = req.clone({ headers });
    return next.handle(authReq).pipe(
      // takeUntil(this.routerNavigationSuccess),
      catchError(this.handleError)
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

  private handleError = (err: HttpErrorResponse) => {
    /**
     * @description 401 means usre need to be logged in to access this api. Therefore, redirect the user
     * to login page
     */

    switch (err.status) {
      case 401:
      case 403:
        this.clearLocalStorage();
        swal('Error', err.error?.message ?? 'Something went wrong', 'error');
        this.router.navigate(["fc_grant"]);
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
