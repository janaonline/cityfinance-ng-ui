import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PasswordValidator } from 'src/app/util/passwordValidator';

import { environment } from './../../../environments/environment';

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"]
})
export class PasswordComponent implements OnInit {
  public passwordRequestForm: FormGroup;
  public passwordResetForm: FormGroup;
  public badCredentials: boolean;
  public submitted = false;
  public formError: boolean;
  public creditRatingReportUrl =
    environment.api.url + "assets/credit_rating.xlsx";

  public window = window;

  public uiType: "request" | "reset";
  public errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initializeForms();
    this._activatedRoute.params.subscribe(res => {
      if (res.id === "request" || res.id === "reset") {
        this.uiType = res.id;
      }
    });
  }

  ngOnInit() {
    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    });
  }
  get lf() {
    return this.passwordRequestForm.controls;
  }

  submitPasswordResetRequest(form: FormGroup) {}

  submitPasswordReset(form: FormGroup) {
    if (form.invalid) {
      // Form is invalid.
    }

    const validator = new PasswordValidator();
    try {
      validator.validate(
        form.controls.password.value,
        form.controls.confirmPassword.value
      );
    } catch (error) {
      console.error(error);
    }
  }

  private initializeForms() {
    this.passwordRequestForm = this.fb.group({
      emailId: ["", Validators.required, Validators.email]
    });

    this.passwordResetForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }
}
