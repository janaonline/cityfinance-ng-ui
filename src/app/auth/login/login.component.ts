import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";

import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "./../../../environments/environment";
import { CommonService } from "src/app/shared/services/common.service";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { SweetAlert } from "sweetalert/typings/core";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { IUserLoggedInDetails } from "src/app/models/login/userLoggedInDetails";
import { RecaptchaComponent } from "ng-recaptcha";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly otpLength = 4;
  private readonly otpValidators = [
    Validators.required,
    Validators.minLength(this.otpLength),
    Validators.maxLength(this.otpLength),
    Validators.pattern(new RegExp(`^\\d{${this.otpLength}}$`)),
  ];
  loginDetails = [
    {
      role: "ULB",
      loginName: "Census Code/ULB Code",
      loginPlaceHolder: "Census Code/ULB Code",
      loginValidation: "censusValidation",
    },
    {
      role: "USER",
      loginName: "Email",
      loginPlaceHolder: "Email",
      loginValidation: "emailValidation",
    },
    {
      role: "ALL",
      loginName: "Census Code/ULB Code/Email",
      loginPlaceHolder: "Census Code/ULB Code/Email",
      loginValidation: "censuscodeOremailValidation",
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
  otpVerificationMessage: boolean = false;
  public reCaptcha = {
    show: true,
    siteKey: environment.reCaptcha.siteKey,
    userGeneratedKey: null,
  };
  public hide = true;
  directLogin = false;
  loginType: string;
  fcEmail: string;

  @ViewChild(RecaptchaComponent) captchaRef!: RecaptchaComponent;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private newCommonService: NewCommonService,
    private gaService: GoogleAnalyticsService,
  ) {
    if (this.authService.loggedIn()) {
      this.router.navigate(["/home"]);
      return;
    }
    //  this.alertForload();
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param.user && param.user == "USER") {
        this.directLogin = true;
      }
      if (param.message) {
        this.otpVerificationMessage = true;
        setTimeout(() => {
          this.otpVerificationMessage = false;
        }, 3000);
        this.emailVerificationMessage = param.message;
      }
    });
  }

  ngOnInit() {
    window.location.replace("/fc/auth/login/15thFC");
    // this.loginForm = this.fb.group({
    //   email: ["", Validators.required],
    //   password: [""],
    //   otp: [""],
    //   captcha: ["", Validators.required],
    // });
    // this.enablePasswordMode();
    // this.authService.badCredentials.subscribe((res) => {
    //   this.badCredentials = res;
    // });
    // this.perFillUser = this.commonService.setUser(true);
    // if (this.perFillUser !== null) {
    //   this.onSelectingUserType(this.perFillUser);
    // }

    // this.loginType = localStorage.getItem('loginType') || '15thFC';
    // this.fcEmail = '15fcgrant@cityfinance.in';
    // if (['XVIFC', 'state-dashboard'].includes(this.loginType)) {
    //   if (this.loginType === 'XVIFC') this.fcEmail = '16fcgrant@cityfinance.in';
    //   // this.onSelectingUserType(USER_TYPE.ULB);
    //   this.onSelectingUserType('ALL');
    // }
  }

  get lf() {
    return this.loginForm.controls;
  }

  login() {
    this.loginError = null;
    this.submitted = true;
    this.enablePasswordMode();
    if (!this.reCaptcha.userGeneratedKey) {
      this.loginError = "Login Failed. You must validate that you are human.";
      this.loginForm.controls.captcha.markAsTouched();
      return;
    }

    if (this.loginForm.valid) {
      const type = this.loginType;
      const body = { ...this.loginForm.value, type };
      body["email"] = body["email"].trim();
      this.loginForm.disable();
      this.authService.login(body).subscribe(
        (res) => this.onSuccessfullLogin(res),
        (error) => {
          this.onLoginError(error);
        }
      );
    } else {
      this.formError = true;
    }
  }

  private onSuccessfullLogin(res) {
    const gData = {
      user_role: res?.user?.role,
      user_id: res?.user?._id,
      ...res?.user
    };
    this.gaService.set(gData);
    this.gaService.gtag('event', 'login', gData);
    this.authService.loginLogoutCheck.next(true);
    if (res && res["token"]) {
      this.authService.storeTokens(res);
      this.authService.setCurrentUser(res["user"] || null);
      localStorage.setItem("Years", JSON.stringify(res["allYears"]));

      if (res["user"]?.role == "STATE") {
        this.getStateSideBar(res["user"]);
      } else {
        this.getSideBar(res["user"]);
      }
      if (res["user"]?.role == "MoHUA" || res["user"]?.role == "ADMIN") {
        this.getMohuaSideBar(res["user"]);
      }
      const userUtil = new UserUtility();
      userUtil.updateUserDataInRealTime(res["user"]);

      this.routeToProperLocation(res["user"]);
    } else {
      this.authService.clearLocalStorage();
    }
  }

  /**
   * @description Route to appropiate location post login.
   * NOTE: This method must be called only post login.
   */
  routeToProperLocation(user: IUserLoggedInDetails) {
    if (this.loginType === 'XVIFC') {
      if ([USER_TYPE.XVIFC_STATE, USER_TYPE.XVIFC].includes(user.role)) {
        window.location.href = window.location.origin + '/fc/admin/xvi-fc-review';
        // window.location.href = 'http://localhost:4300/admin/xvi-fc-review';
      } else if (user.role === USER_TYPE.ULB) {
        window.location.href = window.location.origin + '/fc/xvifc-form';
        // window.location.href = 'http://localhost:4300/xvifc-form';
      }
    } else if (this.loginType === 'state-dashboard') {
      this.router.navigate(['/state-dashboard']);
    } else {
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
    this.resetCaptcha();
  }

  resolveCaptcha(keyGenerated: string | null) {
    if (!keyGenerated) {
      this.resetCaptcha();
      return;
    }

    this.loginError = null;
    this.reCaptcha.userGeneratedKey = keyGenerated;
    this.loginForm.controls.captcha.setValue(keyGenerated);
    // this.authService.verifyCaptcha(keyGenerated).subscribe({
    //   next: (res) => {
    //     if (!res["success"]) {
    //       this.loginError = "Captcha verification failed. Please try again.";
    //       this.resetCaptcha();
    //       return;
    //     }

    //     this.loginForm.controls.captcha.setValue(keyGenerated);
    //   },
    //   error: () => {
    //     this.loginError = "Captcha verification failed. Please try again.";
    //     this.resetCaptcha();
    //   },
    // });
  }

  ngOnDestroy() {
    this.clearCountDown();
    sessionStorage.removeItem("postLoginNavigation");
  }

  onSelectingUserType(value) {
    if (this.directLogin) {
      value = "USER";
    }
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
          Validators.maxLength(6),
        ]);
      case 'ALL':
        const censusOrEmailRegex = /^(\d{6}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8}))$/;
        return this.loginForm.controls["email"].setValidators([
          Validators.required,
          Validators.pattern(censusOrEmailRegex),
        ]);
      default:
        this.loginForm.controls["email"].setValidators([
          Validators.required,
          Validators.email,
        ]);
        break;
    }
    this.loginForm.controls["email"].updateValueAndValidity();
  }

  otpLogin() {
    this.loginError = null;
    this.enableOtpMode();
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
        this.clearCountDown();
      }
    );
  }

  otpLoginSubmit() {
    this.loginError = null;
    this.enableOtpMode();
    const body = { ...this.loginForm.value };
    this.otpCreads.otp = body["otp"];
    this.authService.otpVerify(this.otpCreads).subscribe(
      (res) => this.onSuccessfullLogin(res),
      (error) => this.onLoginError(error)
    );
  }

  change() {
    this.isOtpLogin = false;
    this.clearCountDown();
    this.enablePasswordMode();
  }

  startCountDown(form = null) {
    if (this.countDown) {
      return true;
    }

    if (form?.controls.email.value === "") {
      this.loginError = null;
      this.noCodeError = true;
      setTimeout(() => {
        this.noCodeError = false;
      }, 1500);

      return true;
    }

    if (!this.reCaptcha.userGeneratedKey) {
      this.loginError = "Please complete the captcha verification first.";
      this.loginForm.controls.captcha.markAsTouched();
      return true;
    }

    this.counterTimer = true;
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter != 0) {
        --this.counter;
      } else {
        this.clearCountDown();
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
  getSideBar(userData) {
    let ulbId = userData?.ulb;
    let role = userData?.role;
    let isUA = false;
    if (userData?.isUA == "Yes") {
      isUA = true;
    } else {
      isUA = false;
    }
    this.newCommonService
      .getLeftMenu(ulbId, role, isUA)
      .subscribe((res: any) => {
        console.log("left responces..", res);
        localStorage.setItem("leftMenuRes", JSON.stringify(res?.data));
        //  this.leftMenu = res;
      });
  }
  getStateSideBar(userData) {
    let id = userData?.state;
    let role = userData?.role;
    let isUA = false;
    if (userData?.isUA == "Yes") {
      isUA = true;
    } else {
      isUA = false;
    }
    this.newCommonService.getLeftMenu(id, role, isUA).subscribe((res: any) => {
      console.log("left state responces..", res);
      localStorage.setItem("leftStateMenuRes", JSON.stringify(res?.data));
      //  this.leftMenu = res;
    });
  }
  getMohuaSideBar(userData) {
    // let role = userData?.role;
    let role = "MoHUA";
    this.newCommonService.getLeftMenu("", role, null).subscribe((res: any) => {
      console.log("left responces..", res);
      localStorage.setItem("MohuaLeftMenu", JSON.stringify(res?.data));
      //  this.leftMenu = res;
    });
  }
  // alertForload(){
  //   swal("IMPORTANT", `Due to the sudden surge in usage, users can experience portal access issues. We are working to resolve this issue and appreciate your cooperation in this regard. For any queries related to 15th FC reach out to 15fcgrant@cityfinance.in.`, 'warning')
  // }

  private enablePasswordMode() {
    this.loginForm.controls["password"].setValidators([Validators.required]);
    this.loginForm.controls["otp"].clearValidators();
    this.loginForm.controls["otp"].setValue("", { emitEvent: false });
    this.loginForm.controls["password"].updateValueAndValidity();
    this.loginForm.controls["otp"].updateValueAndValidity();
  }

  private enableOtpMode() {
    this.loginForm.controls["password"].clearValidators();
    this.loginForm.controls["otp"].setValidators(this.otpValidators);
    this.loginForm.controls["password"].updateValueAndValidity();
    this.loginForm.controls["otp"].updateValueAndValidity();
  }

  private resetCaptcha() {
    console.log("resetting captcha");
    this.reCaptcha.userGeneratedKey = null;
    this.loginForm?.controls?.captcha.reset();

    this.reCaptcha.show = false;
    setTimeout(() => {
      this.reCaptcha.show = true;
    }, 500);
  }

  private clearCountDown() {
    this.countDown?.unsubscribe();
    this.countDown = null;
    this.counterTimer = false;
    this.counter = 60;
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
