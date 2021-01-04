import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { environment } from './../../../environments/environment';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public badCredentials: boolean;
  public submitted = false;
  public formError: boolean;
  public creditRatingReportUrl =
    environment.api.url + "assets/credit_rating.xlsx";

  public loginError: string;
  public emailVerificationMessage: string;
  public reCaptcha = {
    show: false,
    siteKey: environment.reCaptcha.siteKey,
    userGeneratedKey: null,
  };
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authService.loggedIn()) {
      this.router.navigate(["/home"]);
      return;
    }
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.message) {
        this.emailVerificationMessage = param.message;
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.authService.badCredentials.subscribe((res) => {
      this.badCredentials = res;
    });

    // this.router.
  }

  get lf() {
    return this.loginForm.controls;
  }

  login() {
    this.loginError = null;
    this.submitted = true;
    if (this.reCaptcha.show && !this.reCaptcha.userGeneratedKey) {
      this.loginError = "Login Failed. You must validate that you are human.";
      return;
    }

    if (this.loginForm.valid) {
      const body = { ...this.loginForm.value };
      body["email"] = body["email"].trim();
      this.loginForm.disable();
      // setTimeout(() => {
      //   // this.loginForm.enable();
      // }, 3000);
      // return;
      this.authService.signin(body).subscribe(
        (res) => this.onSuccessfullLogin(res),
        (error) => this.onLoginError(error)
      );
    } else {
      this.formError = true;
    }
  }

  private onSuccessfullLogin(res) {
    if (res && res["token"]) {
      localStorage.setItem("id_token", JSON.stringify(res["token"]));
      localStorage.setItem("userData", JSON.stringify(res["user"]));
      const postLoginRoute =
        sessionStorage.getItem("postLoginNavigation") || "home";
      this.router.navigate([postLoginRoute]);
    } else {
      localStorage.removeItem("id_token");
    }
  }

  private onLoginError(error) {
    this.loginForm.enable();
    this.loginError = error.error["message"] || "Server Error";
    if (error.error.errors && error.error.errors.loginAttempts >= 3) {
      this.reCaptcha.show = true;
    }
  }

  resolveCaptcha(keyGenerated: string) {
    this.reCaptcha.userGeneratedKey = keyGenerated;
    this.authService.verifyCaptcha(keyGenerated).subscribe((res) => {
      if (!res["success"]) {
        this.reCaptcha.show = false;
        this.reCaptcha.userGeneratedKey = null;
        setTimeout(() => {
          this.reCaptcha.show = true;
        }, 500);
      }
    });
  }

  ngOnDestroy() {
    sessionStorage.removeItem("postLoginNavigation");
  }
}
