import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ulbTypes } from '../../../dashboard/report/report/ulbTypes';

@Component({
  selector: "app-ulb-profile",
  templateUrl: "./ulb-profile.component.html",
  styleUrls: ["./ulb-profile.component.scss"]
})
export class UlbProfileComponent implements OnInit {
  profile: FormGroup;

  typesOfULB = ulbTypes;

  fileTracker = {};

  constructor(private _fb: FormBuilder) {
    this.initializeForm();
    console.log(this.profile);
  }

  ngOnInit() {}

  private initializeForm() {
    const commissioner = this._fb.group({
      name: [""],
      emailId: [""],
      contantNo: [""]
    });
    const accountant = this._fb.group({
      name: [""],
      emailId: [""],
      contantNo: [""]
    });

    const state = this._fb.group({
      name: [""]
    });
    this.profile = this._fb.group({
      commissioner,
      accountant,
      noOfWards: [""],
      population: [""],
      area: [""],
      code: [""],
      type: [""],
      name: [""],
      state
    });
    this.profile.controls.code.disable();
    state.disable();
  }
}
