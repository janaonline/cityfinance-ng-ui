import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { CommonService } from 'src/app/shared/services/common.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { FormUtil } from 'src/app/util/formUtil';

import { UserProfile } from '../model/user-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-common-profile",
  templateUrl: "./common-profile.component.html",
  styleUrls: ["./common-profile.component.scss"],
})
export class CommonProfileComponent
  extends BaseComponent
  implements OnInit, OnChanges {
  /***************************
   *
   *
   *      This is Partner Profile Update / Create.
   *
   *
   *******************************/

  @Input()
  profileData: any;
  @Input() editable = false;

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
  ) {
    super();
  }

  ngOnInit() {}
  ngOnChanges() {
    this.initializeForm();
  }

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.profileForm.controls[controlName].dirty &&
      this.profileForm.controls[controlName].errors
    )
      ? this.profileForm.controls[controlName].errors
      : null;
  }

  public onFormSubmit(form: FormGroup) {
    this.resetResponseMessage();
    this.formSubmitted = true;

    if (this.profileData) {
      return this.updateProfile(form);
    }

    this.createProfile(form);
  }

  private createProfile(form: FormGroup) {
    const body = form.value;
    body.role = USER_TYPE.PARTNER;
    body.password = "";
    if (form.disabled) {
      return;
    }
    form.disable();

    this._profileService.createUser(body).subscribe(
      (res) => {
        form.reset();
        form.enable();
        this.formSubmitted = false;

        this.respone.successMessage = "Profile created successfully";
      },
      (err: HttpErrorResponse) => {
        this.respone.errorMessage = err.error.message || "Server Error";
        form.enable();
      }
    );
  }

  private updateProfile(form: FormGroup) {
    const body = {
      ...form.value,
      _id: this.profileData._id,
    };
    if (form.disabled) {
      return;
    }

    form.disable({ emitEvent: false });
    return this._profileService.updateUserProfileData(body).subscribe(
      (res) => {
        // form.enable({ emitEvent: false });
        this.respone.successMessage = "Profile Updated successfully";
        this.updateLoggedInLocalData(body);
      },
      (err: HttpErrorResponse) => {
        form.enable({ emitEvent: false });

        this.respone.errorMessage = err.error.message || "Server Error";
      }
    );
  }

  private updateLoggedInLocalData(newData: UserProfile) {
    if (this.userUtil.getUserType() !== USER_TYPE.PARTNER) return;
    const newValues = { email: newData.email, name: newData.name };
    this.userUtil.updateUserDataInRealTime(newValues);
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getPartnerForm();

    if (this.profileData) {
      if (this.profileData.role !== USER_TYPE.PARTNER) {
        this.profileData = null;
        return;
      }
      this.profileForm.patchValue(this.profileData);
      if (!this.editable) {
        this.profileForm.disable({ emitEvent: false });
      }
      // this.profileForm.disable({ emitEvent: false });
    }
  }

  public enableProfileEdit() {
    this.resetResponseMessage();
    this.profileForm.enable();
  }
  public disableProfileEdit() {
    this.profileForm.disable({ emitEvent: false });
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
