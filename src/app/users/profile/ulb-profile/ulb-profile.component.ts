import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataEntryService } from '../../../dashboard/data-entry/data-entry.service';
import { ulbType } from '../../../dashboard/report/report/ulbTypes';
import { FormUtil } from '../../../util/formUtil';
import { fieldNameWithFileRequirement, FieldsWithFile, ULBProfile } from '../model/ulb-profile';
import { ProfileService } from '../service/profile.service';

// import { keys } from "ts-transformer-keys";

@Component({
  selector: "app-ulb-profile",
  templateUrl: "./ulb-profile.component.html",
  styleUrls: ["./ulb-profile.component.scss"]
})
export class UlbProfileComponent implements OnInit {
  @Input() profileData;
  profile: FormGroup;
  formUtil = new FormUtil();

  // isFormSubmitted

  currentULBData: ULBProfile;

  typesOfULB = ulbType;

  fileTracker: FieldsWithFile;
  formSubmitted = false;

  formErrorMessage;
  respone = { successMessage: null, errorMessage: null };

  constructor(
    private _fb: FormBuilder,
    private dataEntryService: DataEntryService,
    private _profileService: ProfileService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // this.profile.disable();
    // setTimeout(() => {
    //   this.disableNonEditableFields();
    // }, 5000);
  }

  // onSelectingFile(option: { file: File; key: keyof FieldsWithFile }) {
  //   console.log(option);
  //   if (!this.fileTracker) {
  //     this.fileTracker = { [option.key]: { file: option.file } };
  //   } else {
  //     this.fileTracker[option.key] = { file: option.file };
  //   }
  // }

  submitForm(form: FormGroup) {
    this.resetResponseMessage();
    this.formSubmitted = true;
    console.log(form.value);

    const errors = this.checkFieldsForError(form);
    this.formErrorMessage = errors;
    if (errors) {
      console.log(`errors`, errors);
      return;

      // show error and return
    }

    this.profile.disable({ onlySelf: true, emitEvent: false });

    // upload files and their value
    const updatedFields = this.getUpdadtedFields(form);
    if (!updatedFields || !Object.keys(updatedFields).length) {
      return;
    }

    this._profileService.updateProfileData(updatedFields).subscribe(
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

  private updateField(fields: {}) {}

  private updateFieldWithFileRequirement(
    fields: {
      [key in fieldNameWithFileRequirement]?: string;
    }
  ) {
    console.log(fields);
    console.log(this.fileTracker);
    Object.keys(fields).forEach(key => {
      const file = this.fileTracker[key].file;
      this.dataEntryService
        .getURLForFileUpload(file.name, file.type)
        .subscribe(res => {
          this.dataEntryService
            .uploadFileToS3(file, res.data[0].url, { reportProgress: false })
            .subscribe(res2 => console.log(`res2`, res2));
        });
    });
  }

  private checkFieldsForError(form: FormGroup) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach(Name => {
      const control = form.controls[Name];
      if (!control.dirty) {
        return;
      }

      if (!control.valid) {
        errors.push(`${Name} is invalid`);
        return;
      }
    });

    return errors.length === 0 ? null : errors;
  }

  // private doesFieldRequireFile(fieldName: string) {
  //   console.log(fieldName);
  //   for (const key in fieldNameWithFileRequirement) {
  //     if (fieldNameWithFileRequirement[key] === fieldName) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  private getUpdadtedFields(form: FormGroup): {} | null {
    let updateObject: { [key: string]: string };
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.dirty) {
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

  // private getUpdadtedFieldWithOnlyFileRequirement(form: FormGroup) {
  //   let updateObject;
  //   Object.keys(form.controls).forEach(controlName => {
  //     const control = form.controls[controlName];
  //     if (!control.dirty) {
  //       return;
  //     }
  //     if (!this.doesFieldRequireFile(controlName)) {
  //       return;
  //     }
  //     console.log(controlName);
  //     if (updateObject) {
  //       updateObject[controlName] = control.value;
  //     } else {
  //       updateObject = { [controlName]: control.value };
  //     }
  //   });
  //   return updateObject;
  // }

  private initializeForm() {
    this.profile = this.formUtil.getULBForm("EDIT");
    console.log(this.profile.controls);
    this.disableNonEditableFields();
  }

  private disableNonEditableFields() {
    this.profile.controls.ulb.disable();
    this.profile.controls.state.disable();
  }
}
