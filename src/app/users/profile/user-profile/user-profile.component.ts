import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';

import { FormUtil } from '../../../util/formUtil';
import { UserProfile } from '../model/user-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  @Input() profileData: UserProfile;
  profileForm: FormGroup;

  window = window;
  formUtil = new FormUtil();
  formErrors: string[];
  response = {
    successMessage: null,
    errorMessage: null
  };

  canEditProfile = false;

  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this.checkProfileAccess();
    this.initializeForm();
  }

  private onFormSubmit(form: FormGroup) {
    if (!this.canEditProfile) {
      return;
    }
    this.resetResponseMessages();
    this.formErrors = this.formUtil.validadteUserForm(form, {
      validationType: "EDIT"
    });
    if (this.formErrors) {
      return;
    }

    this._profileService.updateUserProfileData(form.value).subscribe(
      res => {
        this.response.successMessage = "Profile Updated successfully";
      },
      error => this.onGettingResponseError
    );
  }

  private resetResponseMessages() {
    this.response.successMessage = null;
    this.response.errorMessage = null;
  }

  private onGettingResponseError(error: HttpErrorResponse) {
    this.response.errorMessage = error.error.msg || "Profile Update Failed.";
  }

  private checkProfileAccess() {
    const accessChecker = new AccessChecker();
    const moduleName = MODULES_NAME.ULB_PROFILE;
    const action = ACTIONS.EDIT;
    this.canEditProfile = accessChecker.hasAccess({ moduleName, action });
  }

  // private fetchUserProfile() {
  //   this._profileService.getUserProfile().subscribe(res => {
  //     console.log(`res `, res);
  //     this.profileData = res["data"];
  //     this.profileForm.patchValue({ ...this.profileData });
  //     console.log(this.profileForm.controls);
  //   });
  // }

  private initializeForm() {
    this.profileForm = this.formUtil.getUserForm("EDIT");
    console.log(this.profileData);
    this.profileForm.patchValue({ ...this.profileData });
    if (!this.canEditProfile) {
      this.profileForm.disable();
    }
  }
}
