import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { ulbType } from '../../../dashboard/report/report/ulbTypes';
import { FormUtil } from '../../../util/formUtil';
import { IULBProfileData } from '../model/ulb-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-ulb-profile",
  templateUrl: "./ulb-profile.component.html",
  styleUrls: ["./ulb-profile.component.scss"],
})
export class UlbProfileComponent implements OnInit, OnChanges {
  @Input() profileData: IULBProfileData;
  @Input() editable = false;
  profile: FormGroup;
  formUtil = new FormUtil();
  jsonUtil = new JSONUtility();

  typesOfULB = ulbType;

  ulbTypeList: any[];

  formSubmitted = false;

  formErrorMessage: string[];
  respone = { successMessage: null, errorMessage: null };
  canSubmitForm = false;
  loggedInUserType: USER_TYPE;
  USER_TYPE = USER_TYPE;
  window = window;

  constructor(private _profileService: ProfileService) {
    this.fetchDatas();
  }

  ngOnChanges(changes) {}

  fetchDatas() {
    this._profileService.getULBTypeList().subscribe((res) => {
      this.ulbTypeList = res["data"];
    });
  }

  ngOnInit() {
    this.initializeAccess();
    this.initializeForm();
    this.initializeLogginUserType();
  }

  submitForm(form: FormGroup) {
    if (!this.canSubmitForm) {
      return;
    }
    this.resetResponseMessage();

    this.formSubmitted = true;

    const errors = this.checkFieldsForError(form);
    this.formErrorMessage = errors;
    if (errors) {
      console.error(`errors`, errors);
      return;

      // show error and return
    }

    // upload files and their value
    const updatedFields = this.getUpdatedFieldsOnly(form);
    if (!updatedFields || !Object.keys(updatedFields).length) {
      return;
    }

    const flatten = this.jsonUtil.convertToFlatJSON(updatedFields);
    if (flatten["_id"]) {
      flatten["ulbType"] = flatten["_id"];
      delete flatten["_id"];
    }
    if (this.loggedInUserType !== USER_TYPE.ULB) {
      flatten["ulb"] = this.profileData.ulb._id;
    }
    this.profile.disable({ onlySelf: true, emitEvent: false });

    this._profileService.createULBUpdateRequest(flatten).subscribe(
      (res) => this.onUpdatingProfileSuccess(res),
      (err) => this.onUpdatingProfileError(err)
    );
  }

  updateFormStatus(status: { status: IULBProfileData["status"]; _id: string }) {
    this.resetResponseMessage();
    this._profileService.updateULBSingUPStatus(status).subscribe(
      (res) => {
        this.canSubmitForm = true;
        this.profileData.status = status.status;
        this.respone.successMessage = "ULB Singup updated successfully.";
      },
      (err) => {
        this.respone.errorMessage = err.error.message || "Server Error";
      }
    );
  }

  public enableProfileEdit() {
    this.profile.enable();
    this.disableNonEditableFields();
  }
  public disableProfileEdit() {
    this.profile.disable({ emitEvent: false });
    this.disableNonEditableFields();
  }

  private onUpdatingProfileSuccess(res) {
    this.respone.successMessage = res.message || "Profile Updated Successfully";
  }

  private onUpdatingProfileError(err: HttpErrorResponse) {
    this.respone.errorMessage =
      err.error.message || "Failed to updated profile.";
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }

  private checkFieldsForError(form: FormGroup) {
    let errors: string[] = [];
    Object.keys(form.controls).forEach((Name) => {
      const control = form.controls[Name];
      if (control.disabled) {
        return;
      }
      if (control instanceof FormGroup) {
        const nestedErrors = this.checkFieldsForError(control);
        if (!nestedErrors || !nestedErrors.length) {
          return;
        }
        errors = [...errors, ...nestedErrors];
        return;
      }

      if (!control.valid) {
        errors.push(`${Name} is invalid`);
        return;
      }
    });

    return errors.length === 0 ? null : errors;
  }

  private getUpdatedFieldsOnly(form: FormGroup): {} | null {
    let updateObject: { [key: string]: any };
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      if (!control.dirty) {
        return;
      }
      if (control instanceof FormGroup) {
        const nestedValue = this.getUpdatedFieldsOnly(control);

        if (nestedValue && Object.keys(nestedValue).length) {
          if (updateObject) {
            updateObject[controlName] = nestedValue;
          } else {
            updateObject = { [controlName]: nestedValue };
          }
        }
        return;
      }

      if (updateObject) {
        updateObject[controlName] = control.value;
      } else {
        updateObject = { [controlName]: control.value };
      }
    });
    return updateObject;
  }

  private initializeForm() {
    this.profile = this.formUtil.getULBForm("EDIT");
    if (this.profileData) {
      this.profile.patchValue({
        ...{ ...this.profileData },
        name: this.profileData.ulb.name,
        state: this.profileData.ulb.state.name,
      });

      if (this.profileData.status !== "APPROVED") {
        this.canSubmitForm = false;
      } else {
        this.initializeAccess();
      }
      if (!this.editable) {
        this.profile.disable({ emitEvent: false });
      }

      this.disableNonEditableFields();
    }
  }

  private initializeAccess() {
    const accessCheck = new AccessChecker();
    this.canSubmitForm = accessCheck.hasAccess({
      action: ACTIONS.EDIT,
      moduleName: MODULES_NAME.ULB_PROFILE,
    });
    console.log(this.canSubmitForm);
  }

  private initializeLogginUserType() {
    this.loggedInUserType = this._profileService.getLoggedInUserType();
  }

  private disableNonEditableFields() {
    (<FormGroup>this.profile.controls.ulb).controls.code.disable();
    this.profile.controls.state.disable();
  }
}
