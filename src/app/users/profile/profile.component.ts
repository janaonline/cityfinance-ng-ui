import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { USER_TYPE } from '../../models/user/userType';
import { IBaseProfileData } from './model/base-profile';
import { ProfileService } from './service/profile.service';

interface IQueryParamOption {
  role: USER_TYPE;
  id?: string;
  edit: "true" | "false";
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  USER_TYPE = USER_TYPE;
  // userType: USER_TYPE;

  profileData: IBaseProfileData = null;
  // showProfileComponent = false;
  profileType: USER_TYPE;

  profileMode: "view" | "create";

  editable = false;

  constructor(
    private _profileService: ProfileService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.profileMode = params.type;
      // this.setFormView();

      this._activatedRoute.queryParams.subscribe(
        (queryParams: IQueryParamOption) =>
          this.onGettingQueryParams(queryParams)
      );
    });
  }

  ngOnInit() {}

  fetchProfileData(params: {}) {
    this._profileService.getUserProfile(params).subscribe((res) => {
      this.profileData = res["data"];
    });
  }

  // private setFormView() {
  //   this.userType = this._profileService.getLoggedInUserType();
  // }

  private onGettingQueryParams(queryParams: IQueryParamOption) {
    this.profileType = queryParams.role;
    this.editable = queryParams.edit === "true" ? true : false;

    if (this.profileMode === "create") {
      this.validateRoleCreationParameters(queryParams);
      return;
    }
    const param = this.createQueryParamsForDataFetch(queryParams);
    this.fetchProfileData(param);
  }

  private createQueryParamsForDataFetch(queryParams: IQueryParamOption) {
    const param = { _id: null, role: null };

    if (queryParams && queryParams.id && queryParams.role) {
      param._id = queryParams.id;
      param.role = queryParams.role;
    }
    return param;
  }

  /**
   * @description Validate if all the required paramaters are available or not for
   * creating a role. If not, then return to previous page;
   */
  private validateRoleCreationParameters(queryParams: IQueryParamOption) {
    if (!queryParams || !queryParams.role) {
      console.error(`No role defined for creation.`);
      window.history.back();
    }
  }
}
