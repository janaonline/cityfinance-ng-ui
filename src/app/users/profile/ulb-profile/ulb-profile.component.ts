import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { ulbType } from '../../../dashboard/report/report/ulbTypes';
import { FormUtil } from '../../../util/formUtil';
import { FieldsWithFile, IULBProfileData } from '../model/ulb-profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-ulb-profile",
  templateUrl: "./ulb-profile.component.html",
  styleUrls: ["./ulb-profile.component.scss"]
})
export class UlbProfileComponent implements OnInit, OnChanges {
  @Input() profileData: IULBProfileData;
  profile: FormGroup;
  formUtil = new FormUtil();
  jsonUtil = new JSONUtility();

  typesOfULB = ulbType;

  ulbTypeList: any[];

  fileTracker: FieldsWithFile;
  formSubmitted = false;

  formErrorMessage: string[];
  respone = { successMessage: null, errorMessage: null };

  constructor(private _profileService: ProfileService) {
    this.fetchDatas();
  }

  ngOnChanges(changes) {}

  fetchDatas() {
    this._profileService.getULBTypeList().subscribe(res => {
      this.ulbTypeList = res["data"];
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  submitForm(form: FormGroup) {
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

    this.profile.disable({ onlySelf: true, emitEvent: false });

    this._profileService.createULBUpdateRequest(flatten).subscribe(
      res => this.onUpdatingProfileSuccess(res),
      err => this.onUpdatingProfileError(err)
    );
  }

  private onUpdatingProfileSuccess(res) {
    this.respone.successMessage = "Profile Updated Successfully";
  }

  private onUpdatingProfileError(err: HttpErrorResponse) {
    this.respone.errorMessage = err.error.msg || "Failed to updated profile.";
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }

  private checkFieldsForError(form: FormGroup) {
    let errors: string[] = [];
    Object.keys(form.controls).forEach(Name => {
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
    Object.keys(form.controls).forEach(controlName => {
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
        state: this.profileData.ulb.state.name
      });

      this.disableNonEditableFields();
    }
  }

  private disableNonEditableFields() {
    (<FormGroup>this.profile.controls.ulb).controls.code.disable();
    this.profile.controls.state.disable();
  }
}
