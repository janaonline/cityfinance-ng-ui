import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  routerNavigationSuccess = new Subject<any>();

  constructor(private router: Router, private _router: Router) {
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
    const authReq = req.clone({ headers });
    return next
      .handle(authReq)
      .pipe(
        takeUntil(this.routerNavigationSuccess),
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
    if (err.status === 401) {
      this.router.navigate(["login"]);
    }
    return throwError(err);
  };
}
