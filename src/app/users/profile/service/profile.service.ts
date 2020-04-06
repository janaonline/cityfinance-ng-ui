import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { USER_TYPE } from '../../../models/user/userType';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private _htttp: HttpClient) {}

  public getUserProfile() {
    return this._htttp.get(`${environment.api.url}user/profile`);
  }

  getUserType(): USER_TYPE {
    let userData = localStorage.getItem("userData");
    if (!userData) {
      return null;
    }
    userData = JSON.parse(userData);
    return userData["role"] ? userData["role"] : null;
  }

  createUser(body: { [key: string]: string }) {
    return this._htttp.post(`${environment.api.url}user/create`, {
      body
    });
  }

  updateProfileData(data: {}) {
    return this._htttp.put(`${environment.api.url}user/profile`, {
      body: data
    });
  }
}
