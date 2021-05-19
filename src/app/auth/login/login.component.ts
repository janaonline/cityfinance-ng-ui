import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";

import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "./../../../environments/environment";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginDetails = [
    {
      role: "ULB",
      loginName: "Please Enter Census Code/ULB Code",
      loginPlaceHolder: "Please Enter Census Code/ULB Code",
      loginValidation: "censusValidation",
    },
    {
      role: "USER",
      loginName: "Please Enter Email",
      loginPlaceHolder: "Please Enter Email",
      loginValidation: "emailValidation",
    },
  ];

  countDown: Subscription;
  counter = 60;
  tick = 1000;
  counterTimer = false;
  help = false;
  noCodeError = false;
  otpCreads: any = {};
  loginSet: any = {};
  ulbCode = "";
  perFillUser;
  public isOtpLogin = false;
  selectedUserType = "";
  public loginForm: FormGroup;
  public badCredentials: boolean;
  public submitted = false;
  public formError: boolean;

  public loginError: string;
  public emailVerificationMessage: string;
  otpVerificationMessage:boolean = false
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
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) {
    if (this.authService.loggedIn()) {
      this.router.navigate(["/home"]);
      return;
    }
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.message) {
        this.otpVerificationMessage = true
        setTimeout(() => {
          this.otpVerificationMessage = false
        }, 3000);
        this.emailVerificationMessage = param.message;
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      otp: [""],
    });
    this.authService.badCredentials.subscribe((res) => {
      this.badCredentials = res;
    });
    this.perFillUser = this.commonService.setUser(true);
    if (this.perFillUser !== null) {
      this.onSelectingUserType(this.perFillUser);
    }
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

      this.authService.signin(body).subscribe(
        (res) => this.onSuccessfullLogin(res),
        (error) =>{
          this.onLoginError(error)
        }
      );
    } else {
      this.formError = true;
    }
  }

  private onSuccessfullLogin(res) {
    if (res && res["token"]) {
      localStorage.setItem("id_token", JSON.stringify(res["token"]));
      localStorage.setItem("Years", JSON.stringify(res["allYears"]));

      const userUtil = new UserUtility();
      userUtil.updateUserDataInRealTime(res["user"]);

      this.routeToProperLocation();
    } else {
      localStorage.removeItem("id_token");
    }
  }

  /**
   * @description Route to appropiate location post login.
   * NOTE: This method must be called only post login.
   */
  routeToProperLocation() {
    const rawPostLoginRoute =
      sessionStorage.getItem("postLoginNavigation") || "home";
    const formattedUrl = this.formatURL(rawPostLoginRoute);
    if (typeof formattedUrl === "string") {
      this.router.navigate([formattedUrl]);
    } else {
      this.router.navigate([formattedUrl.url], {
        queryParams: { ...formattedUrl.queryParams },
      });
    }
  }

  /**
   * @description Format string url into proper url that can be used with `Router`.
   *
   * @example
   *
   * 1. url = '/some/details'; return '/some/details'
   * 2. url = '/some/details?param=1'
   *          return {url: '/some/details', queryParams: {param: 1}}
   */
  private formatURL(url: string) {
    if (!url.includes(`?`)) return url;
    const [ulrPart, queryParamsInString] = url.split("?");
    const queryParams = {};
    queryParamsInString
      .split("&")
      .map(
        (keyValue) =>
          (queryParams[keyValue.split("=")[0]] = keyValue.split("=")[1])
      );
    return {
      url: ulrPart,
      queryParams,
    };
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
  onSelectingUserType(value: USER_TYPE) {
    this.selectedUserType = value;
    this.loginSet = this.loginDetails.find(
      (item) => item.role == this.selectedUserType
    );
    switch (value) {
      case USER_TYPE.ULB:
        return this.loginForm.controls["email"].setValidators([
          Validators.required,
          Validators.pattern("^\\d+\\.{0,1}\\d*$"),
          Validators.minLength(6),
          Validators.maxLength(6)
        ]);
      default:
        this.loginForm.controls["email"].setValidators([
          Validators.required,
          Validators.email,
        ]);
        break;
    }
  }

  otpLogin() {
    this.loginError = null;
    const body = { ...this.loginForm.value };
    body["email"] = body["email"].trim();
    this.ulbCode = body["email"];
    this.authService.otpSignIn(body).subscribe(
      (res) => {
        this.otpCreads = res;
        this.isOtpLogin = true;
      },
      (error) => {
        this.onLoginError(error);
        this.countDown = null;
      }
    );
  }

  otpLoginSubmit() {
    this.loginError = null;
    if (this.reCaptcha.show && !this.reCaptcha.userGeneratedKey) {
      this.loginError = "Login Failed. You must validate that you are human.";
      return;
    }
    const body = { ...this.loginForm.value };
    this.otpCreads.otp = body["otp"];
    this.authService.otpVerify(this.otpCreads).subscribe(
      (res) => this.onSuccessfullLogin(res),
      (error) => this.onLoginError(error)
    );
  }

  change() {
    this.isOtpLogin = false;
    this.countDown = null;
  }

  startCountDown(form = null) {
    if (this.countDown) {
      return true;
    }

    if (form?.controls.email.value === "") {
      this.loginError = null
      this.noCodeError = true;
      setTimeout(() => {
        this.noCodeError = false;
      }, 1500);

      return true;
    }

    this.counterTimer = true;
    this.countDown = timer(0, this.tick).subscribe(() => {
      console.log(this.tick);

      if (this.counter != 0) {
        --this.counter;
      } else {
        this.countDown = null;
        this.counterTimer = false;
        this.counter = 60;
      }
    });
    this.otpLogin();
  }

  onChangeNumber() {
    this.commonService.setGetStateRegister(true, this.otpCreads);
  }

  passwordUser(user) {
    this.commonService.setUser(false, user);
  }
}

@Pipe({
  name: "formatTime",
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
