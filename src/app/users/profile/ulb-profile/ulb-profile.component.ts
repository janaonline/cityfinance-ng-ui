import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataEntryService } from '../../../dashboard/data-entry/data-entry.service';
import { ulbType } from '../../../dashboard/report/report/ulbTypes';
import { fieldNameWithFileRequirement, FieldsWithFile, ULBProfile } from '../model/ulb-profile';

// import { keys } from "ts-transformer-keys";

@Component({
  selector: "app-ulb-profile",
  templateUrl: "./ulb-profile.component.html",
  styleUrls: ["./ulb-profile.component.scss"]
})
export class UlbProfileComponent implements OnInit {
  profile: FormGroup;

  // isFormSubmitted

  currentULBData: ULBProfile;

  typesOfULB = ulbType;

  fileTracker: FieldsWithFile;
  formSubmitted = false;

  formErrorMessage;

  constructor(
    private _fb: FormBuilder,
    private dataEntryService: DataEntryService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // this.profile.disable();
    // setTimeout(() => {
    //   this.disableNonEditableFields();
    // }, 5000);
  }

  onSelectingFile(option: { file: File; key: keyof FieldsWithFile }) {
    console.log(option);
    if (!this.fileTracker) {
      this.fileTracker = { [option.key]: { file: option.file } };
    } else {
      this.fileTracker[option.key] = { file: option.file };
    }
  }

  submitForm(form: FormGroup) {
    this.formSubmitted = true;
    console.log(form.value);

    const errors = this.checkFieldsForError(form);
    this.formErrorMessage = errors;
    if (errors) {
      console.log(`errors`, errors);
      return;

      // show error and return
    }

    this.profile.disable({ onlySelf: true });

    // upload files and their value
    const fieldWithoutFile = this.getUpdadtedFields(form);
    if (fieldWithoutFile) {
      // send the request.
      // updateField
      // Enable form.
    }

    // const fieldWithFileRequirement: {
    //   [key in fieldNameWithFileRequirement]?: string;
    // } = this.getUpdadtedFieldWithOnlyFileRequirement(form);
    // console.log({ fieldWithoutFile, fieldWithFileRequirement });
    // if (fieldWithFileRequirement) {
    //   this.updateFieldWithFileRequirement(fieldWithFileRequirement);
    // }
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

      if (!this.doesFieldRequireFile(Name) && !control.valid) {
        errors.push(`${Name} is invalid`);
        return;
      }

      if (!this.fileTracker || !this.fileTracker[Name]) {
        control.setErrors({ fileRequired: true });
        errors.push(`You need to attach a file with edited field.`);
      } else {
        control.setErrors(null);
      }
    });

    return errors.length === 0 ? null : errors;
  }

  private doesFieldRequireFile(fieldName: string) {
    console.log(fieldName);
    for (const key in fieldNameWithFileRequirement) {
      if (fieldNameWithFileRequirement[key] === fieldName) {
        return true;
      }
    }
    return false;
  }

  private getUpdadtedFields(form: FormGroup) {
    let updateObject;
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.dirty) {
        return;
      }
      // if (this.doesFieldRequireFile(controlName)) {
      //   return;
      // }
      if (updateObject) {
        updateObject[controlName] = control.value;
      } else {
        updateObject = { [controlName]: control.value };
      }
    });
    return updateObject;
  }

  private getUpdadtedFieldWithOnlyFileRequirement(form: FormGroup) {
    let updateObject;
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.dirty) {
        return;
      }
      if (!this.doesFieldRequireFile(controlName)) {
        return;
      }
      console.log(controlName);
      if (updateObject) {
        updateObject[controlName] = control.value;
      } else {
        updateObject = { [controlName]: control.value };
      }
    });
    return updateObject;
  }

  private initializeForm() {
    const commissioner = this._fb.group({
      name: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      contantNo: ["", [Validators.required]]
    });
    const accountant = this._fb.group({
      name: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      contantNo: ["", [Validators.required]]
    });

    const state = this._fb.group({
      name: [""]
    });
    this.profile = this._fb.group({
      commissioner,
      accountant,
      noOfWards: ["", [Validators.required]],
      population: ["", [Validators.required]],
      area: ["", [Validators.required]],
      code: ["", [Validators.required]],
      type: ["", [Validators.required]],
      name: ["", [Validators.required]],
      state
    });
    this.disableNonEditableFields();
  }

  private disableNonEditableFields() {
    this.profile.controls.code.disable();
    this.profile.controls.state.disable();
  }
}
