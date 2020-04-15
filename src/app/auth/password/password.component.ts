import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PasswordValidator } from 'src/app/util/passwordValidator';

import { environment } from './../../../environments/environment';
import { PasswordService } from './service/password.service';

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
  public successMessage: string;
  public token: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _passwordService: PasswordService
  ) {
    this.initializeForms();
    this.validateUrl();
  }

  ngOnInit() {
    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    });
  }

  get lf() {
    return this.passwordRequestForm.controls;
  }

  submitPasswordResetRequest(form: FormGroup) {
    this.errorMessage = null;
    console.log(`submitPasswordResetRequest `);
    if (!form.valid) {
      this.errorMessage = "Email ID is incorrect.";
      return;
    }

    this._passwordService.requestPasswordReset(form.value).subscribe(
      res => {
        form.patchValue({ email: "" });
        const message =
          "Password reset has been initiated. Check You email for further instruction. ";
        this.successMessage = res["message"] || message;
        // this.router.navigate(["/home"]);
      },
      error => this.onGettingResponseError(error, form)
    );
  }

  submitPasswordReset(form: FormGroup) {
    const validator = new PasswordValidator();
    try {
      validator.validate(
        form.controls.password.value,
        form.controls.confirmPassword.value
      );
    } catch (error) {
      this.errorMessage = error.message;
      console.log(error);
      return;
    }

    this._passwordService
      .resetPassword({ ...form.value, token: this.token })
      .subscribe(
        res => {
          form.patchValue({
            password: "",
            confirmPassword: ""
          });
          this.router.navigate(["login"], {
            queryParams: { message: "Password Successfully Updated." }
          });
          // const message =
          //   "Password has been reset sucessfully.You can login with new your Password. ";
          // this.successMessage = res["message"] || message;
        },
        error => this.onGettingResponseError(error, form)
      );
  }

  private onGettingResponseError(error: HttpErrorResponse, form: FormGroup) {
    this.errorMessage = error.error.message;
    form.enable();
  }

  private validateUrl() {
    this._activatedRoute.params.subscribe(res => {
      if (res.id !== "request" && res.id !== "reset") {
        return this.router.navigate(["/home"]);
      }

      if (res.id === "request") {
        this._activatedRoute.queryParams.subscribe(params => {
          this.token = params.token;
          if (params.token) {
            this.uiType = "reset";
          } else {
            this.uiType = res.id;
          }
        });
      }
    });
  }

  private initializeForms() {
    this.passwordRequestForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });

    this.passwordResetForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }
}
