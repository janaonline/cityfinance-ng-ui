import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body instanceof File && req.method === 'PUT') {
      return next.handle(req);
    }

    const token = JSON.parse(localStorage.getItem('id_token'));
    const sessionID = sessionStorage.getItem('sessionID');
    let headers = req.headers;
    if (!req.headers.has('Accept')) {
      headers = req.headers.set('Content-Type', 'application/json');
    }
    if(sessionID) {
      headers = headers.set('sessionId', sessionID);
    }
    if (token) {
      headers = headers.set('x-access-token', token);
      const authReq = req.clone({headers});
      return next.handle(authReq).pipe(
        catchError(this.handleError)
      );
    }

    return next.handle(req).pipe(
        catchError(this.handleError)
      );
  }


  private handleError = (err: HttpErrorResponse) => {
     if( err.status === 401) {
            this.router.navigate(['login'])
      }          
        return throwError(err);
  }
}
