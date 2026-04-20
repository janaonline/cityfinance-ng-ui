import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUtility } from 'src/app/util/httpUtil';

import { UserProfile } from '../../users/profile/model/user-profile';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpUtil = new HttpUtility();
  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile() {
    return this.http.get(environment.api.url + "users/profile");
  }

  update(userInfo) {
    return this.http.put(environment.api.url + "users/update", userInfo);
  }

  onboard(newUser) {
    return this.http.post(environment.api.url + "users/onboard", newUser);
  }

  signUp(data) {
    return this.http.post(environment.api.url + "bulk/signUpNew", data);
  }

  getUsers(body: { filter?: {}; sort?: {} }) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
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

    return this.http.get<UserProfile[]>(
      environment.api.url + `user/all?${params}`
    );
  }

  // public getURLForUserList(body: { filter?: {}; sort?: {} }) {
  //   if (!body.filter) {
  //     // body.filter = {};
  //   }
  //   if (!body.sort) {
  //     // body.sort = {};
  //   }
  //   delete body["skip"];

  //   body["token"] = this.authService.getAccessToken() || "";
  //   body["csv"] = true;
  //   let params = new HttpParams();
  //   console.log('csv params', body, params);

  //   Object.keys(body).forEach((key) => {
  //     if (typeof body[key] === "object") {
  //       const value = JSON.stringify(body[key]);

  //       params = params.append(key, value);
  //     } else {
  //       params = params.append(key, body[key]);
  //     }
  //   });
  //   console.log('csv params', body, params);
  //   console.log('csv params url', environment.api.url + `user/all?${params}`);
  //   return environment.api.url + `user/all?${params}`;
  // }

  
  private buildQueryParams(body: Record<string, any> = {}): HttpParams {
    const payload = { ...body };
    delete payload['skip'];

    let params = new HttpParams();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value === undefined || value === null || value === '') return;

      params = params.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      );
    });

    return params;
  }

  downloadUserList(body: { filter?: {}; sort?: {} } = {}): Observable<HttpResponse<Blob>> {
    const params = this.buildQueryParams({
      ...body,
      csv: true,
    });

    return this.http.get(`${environment.api.url}user/all`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
