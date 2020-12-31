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
  styleUrls: ["./mohua-profile.component.scss"],
})
export class MohuaProfileComponent implements OnInit, OnChanges {
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

  isApiInProcess = false;

  constructor(
    private _commonService: CommonService,
    private _profileService: ProfileService
  ) {}

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
    this.formErrors = this.formUtil.validateStateForm(form);
    console.log(this.formErrors);
    console.log(form);

    if (this.formErrors) {
      return;
    }

    if (this.profileData) {
      return this.updateProfile(form);
    }

    this.createProfile(form);
  }

  private createProfile(form: FormGroup) {
    if (this.isApiInProcess) return;
    const body = form.value;
    body.role = USER_TYPE.MoHUA;
    body.password = "";
    if (form.disabled) {
      return;
    }
    form.disable();
    this.isApiInProcess = true;

    this._profileService.createUser(body).subscribe(
      (res) => {
        form.reset();
        this.formSubmitted = false;
        form.enable();
        this.isApiInProcess = false;

        this.respone.successMessage = "Profile created successfully";
      },
      (err: HttpErrorResponse) => {
        this.respone.errorMessage = err.error.message || "Server Error";
        form.enable();
        this.isApiInProcess = false;
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
    form.disable();
    return this._profileService.updateUserProfileData(body).subscribe(
      (res) => {
        form.enable();
        this.respone.successMessage = "Profile Updated successfully";
      },
      (err: HttpErrorResponse) => {
        form.enable();
        this.respone.errorMessage = err.error.message || "Server Error";
      }
    );
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getMoHUAForm();

    if (this.profileData) {
      if (this.profileData.role !== USER_TYPE.MoHUA) {
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
