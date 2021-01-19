import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';

import { IStateULBCovered } from '../../../shared/models/stateUlbConvered';
import { CommonService } from '../../../shared/services/common.service';
import { FormUtil } from '../../../util/formUtil';
import { UserProfile } from '../model/user-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-state-profile",
  templateUrl: "./state-profile.component.html",
  styleUrls: ["./state-profile.component.scss"],
})
export class StateProfileComponent implements OnInit, OnChanges {
  constructor(
    private _commonService: CommonService,
    private _profileService: ProfileService
  ) {
    this.fetchStateList();
  }
  @Input()
  profileData: any;
  @Input() editable = false;

  profileForm: FormGroup;

  formUtil = new FormUtil();
  stateList: IStateULBCovered[];
  formErrors: string[];

  respone = { successMessage: null, errorMessage: null };
  formSubmitted = false;
  window = window;
  isApiInProgress = false;

  userUtil = new UserUtility();

  ngOnInit() {}
  ngOnChanges() {
    this.initializeForm();
  }

  public enableProfileEdit() {
    this.resetResponseMessage();
    this.profileForm.enable();
  }
  public disableProfileEdit() {
    this.profileForm.disable({ emitEvent: false });
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

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.profileForm.controls[controlName].dirty &&
      this.profileForm.controls[controlName].errors
    )
      ? this.profileForm.controls[controlName].errors
      : null;
  }

  private createProfile(form: FormGroup) {
    if (this.isApiInProgress) return;
    const body = form.value;
    body.role = USER_TYPE.STATE;
    body.password = "";
    if (form.disabled) {
      return;
    }
    form.disable();
    this.isApiInProgress = true;

    this._profileService.createUser(body).subscribe(
      (res) => {
        form.reset();
        form.enable();
        this.isApiInProgress = false;

        this.formSubmitted = false;

        this.respone.successMessage = "Profile created successfully";
      },
      (err: HttpErrorResponse) => {
        this.respone.errorMessage = err.error.message || "Server Error";
        form.enable();
        this.isApiInProgress = false;
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
        this.updateLoggedInLocalData(body);
        this.respone.successMessage = "Profile Updated successfully";
      },
      (err: HttpErrorResponse) => {
        form.enable();
        this.respone.errorMessage = err.error.message || "Server Error";
      }
    );
  }

  private updateLoggedInLocalData(newData: UserProfile) {
    if (this.userUtil.getUserType() !== USER_TYPE.STATE) return;
    const newValues = { email: newData.email, name: newData.name };
    this.userUtil.updateUserDataInRealTime(newValues);
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getStateForm();

    if (this.profileData) {
      if (this.profileData.role !== USER_TYPE.STATE) {
        this.profileData = null;
        return;
      }
      this.profileForm.patchValue(this.profileData);
      if (!this.editable) {
        this.profileForm.disable({ emitEvent: false });
      }
      this.profileForm.controls.state.setValue(this.profileData.state._id);
    }
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }

  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }
}
