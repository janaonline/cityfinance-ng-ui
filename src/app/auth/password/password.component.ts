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
  styleUrls: ["./password.component.scss"],
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
  public ulrMessage: string;
  public isApiInProcess = false;
  public reCaptcha = {
    show: true,
    siteKey: environment.reCaptcha.siteKey,
    userGeneratedKey: null,
  };
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
    this.authService.badCredentials.subscribe((res) => {
      this.badCredentials = res;
    });
  }

  get lf() {
    return this.passwordRequestForm.controls;
  }

  private resetCaptcha() {
    this.reCaptcha.show = false;
    this.reCaptcha.userGeneratedKey = null;
    this.passwordRequestForm.controls.captcha.reset();
    setTimeout(() => {
      this.reCaptcha.show = true;
    }, 500);
  }

  resolveCaptcha(keyGenerated: string) {
    this.reCaptcha.userGeneratedKey = keyGenerated;
    this.authService.verifyCaptcha(keyGenerated).subscribe((res) => {
      if (!res["success"]) {
        this.resetCaptcha();
      }

      this.passwordRequestForm.controls.captcha.setValue(keyGenerated);
    });
  }

  submitPasswordResetRequest(form: FormGroup) {
    this.errorMessage = null;
    this.successMessage = null;
    if (!form.valid) {
      this.errorMessage = form.controls.email.value
        ? "Email ID is incorrect."
        : "Please enter an email.";
      return;
    }
    form.disable();
    this._passwordService.requestPasswordReset(form.value).subscribe(
      (res) => {
        form.patchValue({ email: null });
        const message =
          "Password reset has been initiated. Check You email for further instruction. ";
        this.successMessage = res["message"] || message;
        form.enable();
      },
      (error) => this.onGettingResponseError(error, form)
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
      console.error(error);
      return;
    }
    form.disable();

    this._passwordService
      .resetPassword({ ...form.value, token: this.token })
      .subscribe(
        (res) => {
          form.patchValue({
            password: "",
            confirmPassword: "",
          });
          form.enable();

          this.router.navigate(["login"], {
            queryParams: { message: "Password Successfully Updated." },
          });
        },
        (error) => this.onGettingResponseError(error, form)
      );
  }

  private onGettingResponseError(error: HttpErrorResponse, form: FormGroup) {
    this.errorMessage = error.error.message;
    form.enable();
    this.resetCaptcha();
  }

  private validateUrl() {
    this._activatedRoute.params.subscribe((res) => {
      if (res.id !== "request" && res.id !== "reset") {
        return this.router.navigate(["/home"]);
      }

      if (res.id === "request") {
        this._activatedRoute.queryParams.subscribe((params) => {
          this.token = params.token;
          if (params["email"]) {
            this.passwordRequestForm.patchValue({ email: params["email"] });
          }

          if (params["message"]) {
            this.ulrMessage = params["message"];
          }
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
      email: ["", [Validators.required, Validators.email]],
      captcha: ["", [Validators.required]],
    });

    this.passwordResetForm = this.fb.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }
}
