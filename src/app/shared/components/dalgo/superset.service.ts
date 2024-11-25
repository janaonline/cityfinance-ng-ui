import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupersetService {

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.error('API request error:', error);
        return throwError(() => new Error("Couldn't connect to Superset"));
    }

    getGuestToken(body: any) {
        return this.http.post(
            `${environment.api.url}dalgo/auth`, body
        ).pipe(
            map((response: any) => response.token),
            catchError(this.handleError)
        );
    }


}