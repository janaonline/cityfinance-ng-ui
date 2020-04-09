import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IStateULBCovered } from '../../../shared/models/stateUlbConvered';
import { CommonService } from '../../../shared/services/common.service';
import { FormUtil } from '../../../util/formUtil';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-state-profile",
  templateUrl: "./state-profile.component.html",
  styleUrls: ["./state-profile.component.scss"]
})
export class StateProfileComponent implements OnInit {
  @Input()
  profileData: any;
  profileForm: FormGroup;

  formUtil = new FormUtil();
  stateList: IStateULBCovered[];
  formErrors: string[];

  respone = { successMessage: null, errorMessage: null };
  formSubmitted = true;

  constructor(
    private _commonService: CommonService,
    private _profileService: ProfileService
  ) {
    this.fetchStateList();
    this.initializeForm();
  }

  ngOnInit() {}

  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe(res => {
      console.log(res.data[0]);
      this.stateList = res.data;
    });
  }

  private onFormSubmit(form: FormGroup) {
    this.resetResponseMessage();
    if (this.profileData) {
      return this.updateProfile(form);
    }
    this.createProfile(form);
  }

  private createProfile(form: FormGroup) {
    this.formSubmitted = true;
    this.formErrors = this.formUtil.validateStateForm(form);
    if (this.formErrors && this.formErrors.length) {
      return;
    }

    this._profileService.createUser(form.value).subscribe(
      res => {
        this.respone.successMessage = "State created successfully";
      },
      (err: HttpErrorResponse) =>
        (this.respone.errorMessage = err.error.msg || "Server Error")
    );
  }

  private updateProfile(form: FormGroup) {
    return this._profileService.updateProfileData(form.value).subscribe(
      res => {
        this.respone.successMessage = "Profile Updated successfully";
      },
      (err: HttpErrorResponse) =>
        (this.respone.errorMessage = err.error.msg || "Server Error")
    );
  }

  private initializeForm() {
    this.profileForm = this.formUtil.getStateForm();
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
