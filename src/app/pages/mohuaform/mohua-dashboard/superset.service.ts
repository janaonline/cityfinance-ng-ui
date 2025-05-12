// superset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SupersetService {
    private supersetApiUrl = 'https://janaagraha.dalgo.in/api/v1';

    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        console.error('API request error:', error);
        return throwError(() => new Error("Couldn't connect to Superset"));
    }

    // Step 1: Get Access Token
    getAccessToken(credentials: { username: string; password: string }) {
        const url = `${this.supersetApiUrl}/security/login`;
        console.log(url);
        return this.http
            .post<any>(url, {
                username: credentials.username,
                password: credentials.password,
                provider: 'db',
                refresh: true
            })
            .pipe(
                map(response => response.access_token),
                catchError(this.handleError)
            );
    }

    // Step 2: Get CSRF Token
    getCsrfToken(accessToken: string) {
        const url = `${this.supersetApiUrl}/security/csrf_token`;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http
            .get<any>(url, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    const csrfToken = response.body.result;
                    const cookies = response.headers.get('Set-Cookie') || '';
                    return { csrfToken, cookies };
                }),
                catchError(this.handleError)
            );
    }

    // Step 3: Get Embed Token
    getEmbedToken(accessToken: string, csrfToken: string, cookies: string, dashboardUuid: string, credentials: any, orgSlug: string) {
        const url = `${this.supersetApiUrl}/security/guest_token/`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
            'Referer': this.supersetApiUrl
        });
        const body = {
            user: {
                username: credentials.username,
                first_name: credentials.first_name,
                last_name: credentials.last_name
            },
            resources: [
                {
                    type: 'dashboard',
                    id: dashboardUuid
                }
            ],
            rls: [
                // { clause: `org='${orgSlug.replace('-', '_')}'` }
            ]
        };
        return this.http
            .post<any>(url, body, {
                headers,
                withCredentials: true
            })
            .pipe(
                map(response => response.token),
                catchError(this.handleError)
            );
    }

    // Full function to fetch the embed token
    fetchEmbedToken(dashboardUuid: string, credentials: any, orgSlug: string) {
        console.log("Dalgo check");
        return this.getAccessToken(credentials).pipe(
            switchMap(accessToken =>
                this.getCsrfToken(accessToken).pipe(
                    switchMap(({ csrfToken, cookies }) =>
                        this.getEmbedToken(accessToken, csrfToken, cookies, dashboardUuid, credentials, orgSlug)
                    )
                )
            )
        );
    }
}