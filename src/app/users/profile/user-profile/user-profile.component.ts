import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../service/profile.service';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;

  window = window;

  constructor(
    private _profileService: ProfileService,
    private _fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit() {}

  private initializeForm() {
    this.profileForm = this._fb.group({
      username: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      mobileNo: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      organisation: ["", [Validators.required]]
    });
  }
}
