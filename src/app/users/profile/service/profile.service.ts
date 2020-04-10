import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtility } from 'src/app/util/httpUtil';

import { environment } from '../../../../environments/environment';
import { USER_TYPE } from '../../../models/user/userType';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  httpUtil = new HttpUtility();
  constructor(private _htttp: HttpClient) {}

  public getUserLoggedInId() {
    const id = localStorage.getItem("id_token");
    return id;
  }

  public getUserProfile(queryParams: {}) {
    const params = this.httpUtil.convertToHttpParams(queryParams);
    return this._htttp.get(`${environment.api.url}user/profile`, { params });
  }

  getLoggedInUserType(): USER_TYPE {
    let userData = localStorage.getItem("userData");
    if (!userData) {
      return null;
    }
    userData = JSON.parse(userData);
    return userData["role"] ? userData["role"] : null;
  }

  getULBTypeList() {
    return this._htttp.get(`${environment.api.url}UlbType`);
  }

  createUser(body: { [key: string]: string }) {
    return this._htttp.post(`${environment.api.url}user/create`, {
      body
    });
  }

  updateUserProfileData(data: {}) {
    return this._htttp.put(`${environment.api.url}user/profile`, {
      body: data
    });
  }

  createULBUpdateRequest(body: {}) {
    return this._htttp.post(`${environment.api.url}ulb-update-request`, body);
  }
}
