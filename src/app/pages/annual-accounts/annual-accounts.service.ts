import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AnnualAccountsService {
  constructor(private http: HttpClient) {}

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

  getAnnualAccountsApi(body = {}) {
    body["token"] = localStorage
      .getItem("id_token")
      .replace('"', "")
      .replace('"', "");
    body["csv"] = true;
    let params = new HttpParams();
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);
        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });
    return `${environment.api.url}dataCollectionForm?${params}`;
  }

  getYearHistory(params) {
    let url = `${environment.api.url}dataCollectionForm/check?`;
    for (const key in params) {
      url = url + `${key}=${params[key]}&`;
    }
    return this.http.get(url);
  }
}
