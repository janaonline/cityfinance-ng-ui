import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';

import { FormUtil } from '../../../util/formUtil';
import { UserProfile } from '../model/user-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @Input() profileData: UserProfile;
  profileForm: FormGroup;

  window = window;
  formUtil = new FormUtil();
  formErrors: string[];
  response = {
    successMessage: null,
    errorMessage: null,
  };

  canEditProfile = false;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;

  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this.checkProfileAccess();
    this.initializeForm();
    this.initializeUserType();
  }

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.profileForm.controls[controlName].dirty &&
      this.profileForm.controls[controlName].errors
    )
      ? this.profileForm.controls[controlName].errors
      : null;
  }

  private initializeUserType() {
    this.loggedInUserType = this._profileService.getLoggedInUserType();
  }

  private onFormSubmit(form: FormGroup) {
    if (!this.canEditProfile) {
      return;
    }
    this.resetResponseMessages();
    this.formErrors = this.formUtil.validadteUserForm(form, {
      validationType: "EDIT",
    });
    if (this.formErrors) {
      return;
    }

    this._profileService.updateUserProfileData(form.value).subscribe(
      (res) => {
        this.response.successMessage = "Profile Updated successfully";
      },
      (error) => this.onGettingResponseError(error)
    );
  }

  private resetResponseMessages() {
    this.response.successMessage = null;
    this.response.errorMessage = null;
  }

  private onGettingResponseError(error: HttpErrorResponse) {
    this.response.errorMessage =
      error.error.message || "Profile Update Failed.";
  }

  private checkProfileAccess() {
    const accessChecker = new AccessChecker();
    const moduleName = MODULES_NAME.USER;
    const action = ACTIONS.EDIT;
    this.canEditProfile = accessChecker.hasAccess({ moduleName, action });
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getUserForm("EDIT");
    this.profileForm.patchValue({ ...this.profileData });
    if (!this.canEditProfile) {
      this.profileForm.disable();
    }
  }
}
