import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('id_token'));
        let headers = req.headers;
        if (!req.headers.has('Accept')) {
            headers = req.headers.set('Content-Type', 'application/json' );
        }
        // let headers = req.headers.set('Content-Type', 'application/json' );
        if(token){
            headers = headers.set('Authorization', token);
            const authReq = req.clone({ headers });
            return next.handle(authReq);
        }
        
        return next.handle(req);
    }
}