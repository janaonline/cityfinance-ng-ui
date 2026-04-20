import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AnnualAccountsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createAnnualAccounts = (body: {}) => {
    return this.http.post(`${environment.api.url}dataCollectionForm`, body);
  };

  getAnnualAccounts = (body: { filter?: {} }) => {
    if (!body.filter) {
      body.filter = {};
    }

    let params = new HttpParams();
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);

        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });

    return this.http.get(`${environment.api.url}dataCollectionForm?${params}`);
  };

  // getAnnualAccountsApi(body = {}) {
  //   body["token"] = this.authService.getAccessToken() || "";
  //   body["csv"] = true;
  //   let params = new HttpParams();
  //   Object.keys(body).forEach((key) => {
  //     if (typeof body[key] === "object") {
  //       const value = JSON.stringify(body[key]);
  //       params = params.append(key, value);
  //     } else {
  //       params = params.append(key, body[key]);
  //     }
  //   });
  //   return `${environment.api.url}dataCollectionForm?${params}`;
  // }

  private buildParams(body: any = {}): HttpParams {
    let params = new HttpParams();

    Object.keys(body).forEach((key) => {
      const value = body[key];

      if (value === undefined || value === null || value === '') return;

      if (typeof value === 'object') {
        params = params.append(key, JSON.stringify(value));
      } else {
        params = params.append(key, String(value));
      }
    });

    return params;
  }

  downloadAnnualAccounts(body: any = {}): Observable<HttpResponse<Blob>> {
    const params = this.buildParams({
      ...body,
      csv: true,
      download: true,
    });

    return this.http.get(`${environment.api.url}dataCollectionForm`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }

  getYearHistory(params) {
    let url = `${environment.api.url}dataCollectionForm/check?`;
    for (const key in params) {
      url = url + `${key}=${params[key]}&`;
    }
    return this.http.get(url);
  }
}
