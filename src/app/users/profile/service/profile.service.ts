import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IULBProfileRequest, IULBProfileRequestResponse } from 'src/app/models/ulbs/ulb-request-update';

import { environment } from '../../../../environments/environment';
import { IULBTypeListResponse } from '../../../models/ulbs/type';
import { USER_TYPE } from '../../../models/user/userType';
import { HttpUtility } from '../../../util/httpUtil';

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
    return this._htttp.get<IULBTypeListResponse>(
      `${environment.api.url}UlbType`
    );
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

  getULBProfileUpdateRequestList() {
    return this._htttp.get<IULBProfileRequestResponse>(
      `${environment.api.url}ulb-update-request`
    );
  }

  getULBProfileUpdateRequest(requestId: string) {
    return this._htttp
      .get<IULBProfileRequest>(
        `${environment.api.url}ulb-update-request/${requestId}`
      )
      .pipe(map(res => <IULBProfileRequest>res["data"]));
  }

  updateULBProfileRequest(params: { status: string; id: string }) {
    return this._htttp.put(
      `${environment.api.url}ulb-update-request/${params.id}`,
      { body: { status: params.status } }
    );
  }
}
