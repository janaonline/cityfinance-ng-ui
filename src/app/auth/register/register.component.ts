import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  public registrationType: "user" | "ulb";
  public badCredentials: boolean;
  public formError: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(param => {
      if (param.type) {
        this.registrationType = param.type;
      }
    });
  }

  ngOnInit() {
    this.initializeForm();

    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    });
  }

  signup() {
    this.authService.signup(this.registrationForm.value).subscribe(res => {
      alert("Registered Successfully");
      this.router.navigate(["/"]);
      console.log(res);
    });
  }

  private initializeForm() {
    if (this.registrationType === "user") {
      this.registrationForm = this.fb.group({
        name: ["", [Validators.required]],
        mobile: ["", [Validators.required]],
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
        designation: [""],
        organisation: [""]
      });
    } else if (this.registrationType === "ulb") {
      this.registrationForm = this.fb.group({
        state_name: ["", [Validators.required]],
        ulb_name: ["", [Validators.required]],
        ulb_code: ["", [Validators.required]],
        commisioner_name: ["", [Validators.required]],
        commisioner_contact_no: ["", [Validators.required]],
        commisioner_email_id: ["", [Validators.required]],
        accountant_name: ["", [Validators.required]],
        accountant_contact_no: ["", [Validators.required]],
        accountant_email_id: ["", [Validators.required]]
      });
    }
  }
}
