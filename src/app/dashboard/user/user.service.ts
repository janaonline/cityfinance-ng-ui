import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtility } from 'src/app/util/httpUtil';

import { UserProfile } from '../../users/profile/model/user-profile';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private httpUtil = new HttpUtility();
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(environment.api.url + "users/profile");
  }

  update(userInfo) {
    return this.http.put(environment.api.url + "users/update", userInfo);
  }

  onboard(newUser) {
    return this.http.post(environment.api.url + "users/onboard", newUser);
  }

  getUsers(body: { filter?: {}; sort?: {} }) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
    }
    let params = new HttpParams();
    Object.keys(body).forEach(key => {
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

  public getURLForUserList(body: { filter?: {}; sort?: {} }) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
    }
    delete body["skip"];
    body["token"] = localStorage.getItem("id_token").valueOf();
    body["csv"] = true;
    let params = new HttpParams();
    Object.keys(body).forEach(key => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);

        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });
    return environment.api.url + `user/all?${params}`;
  }
}
