import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';

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

  private onGettingQueryParams(queryParams: IQueryParamOption) {
    this.profileType = queryParams.role;
    this.editable = queryParams.edit === "true" ? true : false;
    let hasAccess: boolean;
    if (this.profileMode === "create") {
      const hasAllParameters = this.validateRoleCreationParameters(queryParams);
      hasAccess = this.validateRoleCreationAccess(queryParams);
      if (!hasAllParameters || !hasAccess) {
        return window.history.back();
      }
      return;
    } else {
      hasAccess = this.validateProfileViewAccess(queryParams);
      if (!hasAccess) {
        return window.history.back();
      }
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
      return false;
    }
    return true;
  }

  private validateRoleCreationAccess(queryParams: IQueryParamOption) {
    const accessValidator = new AccessChecker();
    const canCreate = accessValidator.hasAccess({
      moduleName: <any>queryParams.role,
      action: ACTIONS.CREATE,
    });
    if (!canCreate) {
      console.error("ACCESS DENIED");
    }
    return canCreate;
  }

  private validateProfileViewAccess(queryParams: IQueryParamOption) {
    const accessValidator = new AccessChecker();

    /**
     * If there is no id in the queryParam that means we are looking at our own profile.
     */
    const moduleName: any = queryParams.id
      ? queryParams.role
      : MODULES_NAME.SELF_PROFILE;
    const action = queryParams.edit === "true" ? ACTIONS.EDIT : ACTIONS.VIEW;
    const hasAccess = accessValidator.hasAccess({
      moduleName,
      action,
    });

    if (!hasAccess) {
      console.error(`Accesss DENIED.`);
    }
    return hasAccess;
  }
}
