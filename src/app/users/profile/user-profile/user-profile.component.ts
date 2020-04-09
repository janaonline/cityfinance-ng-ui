import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormUtil } from '../../../util/formUtil';
import { UserProfile } from '../model/user-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileData: UserProfile;

  window = window;
  formUtil = new FormUtil();
  formErrors: string[];
  response = {
    successMessage: null,
    errorMessage: null
  };

  constructor(
    private _profileService: ProfileService,
    private _fb: FormBuilder
  ) {
    this.initializeForm();
    this.fetchUserProfile();
  }

  ngOnInit() {}

  private onFormSubmit(form: FormGroup) {
    this.resetResponseMessages();
    this.formErrors = this.formUtil.validadteUserForm(form, {
      validationType: "EDIT"
    });
    if (this.formErrors) {
      return;
    }

    this._profileService.updateProfileData(form.value).subscribe(
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

  private fetchUserProfile() {
    this._profileService.getUserProfile().subscribe(res => {
      console.log(`res `, res);
      this.profileData = res["data"];
      this.profileForm.patchValue({ ...this.profileData });
      console.log(this.profileForm.controls);
    });
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getUserForm("EDIT");
  }
}
