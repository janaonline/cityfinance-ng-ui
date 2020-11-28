import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';

import { environment } from '../../../../environments/environment';
import { IULBTypeListResponse } from '../../../models/ulbs/type';
import { IFullULBProfileRequest, IULBProfileRequestResponse } from '../../../models/ulbs/ulb-request-update';
import { USER_TYPE } from '../../../models/user/userType';
import { HttpUtility } from '../../../util/httpUtil';
import { IULBProfileData } from '../model/ulb-profile';

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  httpUtil = new HttpUtility();
  constructor(private _htttp: HttpClient) {}

  public getUserLoggedInId() {
    const id = localStorage.getItem("id_token");
    return id;
  }

  public getUserProfile(queryParams: {}) {
    console.log("params", queryParams);
    const params = this.httpUtil.convertToHttpParams(queryParams);
    return this._htttp.get(`${environment.api.url}user/profile`, { params });
  }

  isULBProfileCompleted() {
    return this.getUserProfile({}).pipe(
      map((res) => {
        const profile = res["data"];
        console.log("profile", profile);
        if (!profile.ulb) return false;
        const ulb = profile.ulb;
        if (ulb.area === null || ulb.area === undefined) return false;
        if (ulb.population === null || ulb.population === undefined) {
          return false;
        }
        if (ulb.wards === null || ulb.wards === undefined) return false;

        // Either sbCode or censusCode must exits since they are used for login.
        if (!ulb.censusCode && !ulb.sbCode) return false;

        if (ulb.wards === null || ulb.wards === undefined) return false;
        if (
          !profile.accountantConatactNumber ||
          !profile.accountantConatactNumber.trim()
        ) {
          return false;
        }
        if (!profile.accountantName || !profile.accountantName.trim()) {
          return false;
        }
        if (!profile.accountantEmail || !profile.accountantEmail.trim()) {
          return false;
        }
        return true;
      })
    );
  }

  getLoggedInUserType(): USER_TYPE {
    let userData = localStorage.getItem("userData");
    if (!userData) {
      return null;
    }
    userData = JSON.parse(userData);
    return userData["role"] ? userData["role"] : null;
  }

  getUserLoggedInDetails(): IUserLoggedInDetails {
    let userData: any = localStorage.getItem("userData");
    if (!userData) return null;
    try {
      userData = <IUserLoggedInDetails>JSON.parse(userData);
    } catch (error) {
      console.error(`FAiled to parse userData from  localStorage.\n`, error);
      return null;
    }
    return userData;
  }

  getULBTypeList() {
    return this._htttp.get<IULBTypeListResponse>(
      `${environment.api.url}UlbType`
    );
  }

  createUser(body: { [key: string]: string }) {
    return this._htttp.post(`${environment.api.url}user/create`, body);
  }

  updateULBSingUPStatus(body: {
    _id: string;
    status: IULBProfileData["status"];
    rejectReason?: string;
  }) {
    return this._htttp.put(
      `${environment.api.url}user/ulb-status/${body._id}`,
      body
    );
  }

  updateUserProfileData(body: { _id?: string }) {
    if (body._id) {
      const value = { ...body };
      delete value._id;
      return this._htttp.put(
        `${environment.api.url}user/profile/${body._id}`,
        value
      );
    }
    return this._htttp.put(`${environment.api.url}user/profile`, body);
  }

  deleteUser(param: { userId: string }) {
    // const params = this.httpUtil.convertToHttpParams(param);
    return this._htttp.delete(`${environment.api.url}user/${param.userId}`);
  }

  getULBProfileUpdateRequestList(body) {
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
    // return this._htttp.post<IULBProfileRequestResponse>(
    //   `${environment.api.url}ulb-update-request/all`,
    //   body
    // );
    return this._htttp.get<IULBProfileRequestResponse>(
      `${environment.api.url}ulb-update-request/all?${params}`
    );
  }

  public getURLForUlbUpdateRequestList(body: any) {
    if (!body.filter) {
      body.filter = {};
    }
    if (!body.sort) {
      body.sort = {};
    }
    delete body["skip"];

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

    return `${environment.api.url}ulb-update-request/all?${params}`;
  }

  createULBUpdateRequest(body: {}) {
    return this._htttp.post(`${environment.api.url}ulb-update-request`, body);
  }

  getULBProfileUpdateRequest(requestId: string) {
    return this._htttp
      .get<IFullULBProfileRequest>(
        `${environment.api.url}ulb-update-request/${requestId}`
      )
      .pipe(map((res) => <IFullULBProfileRequest>res["data"]));
  }

  updateULBProfileRequest(params: { status: string; id: string }) {
    return this._htttp.put<{ message: string; success: boolean }>(
      `${environment.api.url}ulb-update-request/action/${params.id}`,
      { status: params.status }
    );
  }

  public getULBGeneralData(param: { [key: string]: any }) {
    return this._htttp.get(`${environment.api.url}ulb/${param.id}`);
  }
}
