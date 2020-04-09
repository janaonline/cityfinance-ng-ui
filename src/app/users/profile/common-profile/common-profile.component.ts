import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-common-profile",
  templateUrl: "./common-profile.component.html",
  styleUrls: ["./common-profile.component.scss"]
})
export class CommonProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this._initializeForm();
  }

  ngOnInit() {}

  private _initializeForm() {
    //  NOTE department field needed to be implemented here.
    this.profileForm = this._fb.group({
      username: ["", [Validators.required]],
      emailId: ["", [Validators.required, Validators.email]],
      mobileNo: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      address: ["", [Validators.required]]
    });
  }
}
