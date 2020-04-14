import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { CommonService } from 'src/app/shared/services/common.service';

import { FormUtil } from '../../../util/formUtil';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-mohua-profile",
  templateUrl: "./mohua-profile.component.html",
  styleUrls: ["./mohua-profile.component.scss"]
})
export class MohuaProfileComponent implements OnInit, OnChanges {
  @Input()
  profileData: any;
  profileForm: FormGroup;

  formUtil = new FormUtil();
  formErrors: string[];

  respone = { successMessage: null, errorMessage: null };
  formSubmitted = false;
  window = window;
  USER_TYPE = USER_TYPE;

  constructor(
    private _commonService: CommonService,
    private _profileService: ProfileService
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    this.initializeForm();
  }

  public onFormSubmit(form: FormGroup) {
    this.resetResponseMessage();
    this.formSubmitted = true;
    this.formErrors = this.formUtil.validateStateForm(form);
    if (this.formErrors) {
      return;
    }

    if (this.profileData) {
      return this.updateProfile(form);
    }

    this.createProfile(form);
  }

  private createProfile(form: FormGroup) {
    // this.formSubmitted = true;
    // this.formErrors = this.formUtil.validateStateForm(form);
    // if (this.formErrors && this.formErrors.length) {
    //   return;
    // }
    const body = form.value;
    body.role = USER_TYPE.MoHUA;
    body.password = "";

    this._profileService.createUser(body).subscribe(
      res => {
        form.reset();
        this.formSubmitted = false;

        this.respone.successMessage = "Profile created successfully";
      },
      (err: HttpErrorResponse) =>
        (this.respone.errorMessage = err.error.message || "Server Error")
    );
  }

  private updateProfile(form: FormGroup) {
    return this._profileService.updateUserProfileData(form.value).subscribe(
      res => {
        this.respone.successMessage = "Profile Updated successfully";
      },
      (err: HttpErrorResponse) =>
        (this.respone.errorMessage = err.error.message || "Server Error")
    );
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getPartnerForm();

    if (this.profileData) {
      console.log(this.profileData);
      console.log(this.profileForm);
      if (this.profileData.role !== USER_TYPE.PARTNER) {
        this.profileData = null;
        return;
      }
      this.profileForm.patchValue(this.profileData);
    }
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
