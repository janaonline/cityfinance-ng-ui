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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
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

    console.log(window.history.state);

    // this.router.
  }

  get lf() {
    return this.loginForm.controls;
  }

  login() {
    this.loginError = null;
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe(
        (res) => {
          if (res && res["token"]) {
            localStorage.setItem("id_token", JSON.stringify(res["token"]));
            localStorage.setItem("userData", JSON.stringify(res["user"]));
            const postLoginRoute =
              sessionStorage.getItem("postLoginNavigation") || "home";
            this.router.navigate([postLoginRoute]);
          } else {
            localStorage.removeItem("id_token");
          }
        },
        (error) => {
          this.loginError = error.error["message"] || "Server Error";
        }
      );
    } else {
      this.formError = true;
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("postLoginNavigation");
  }
}
