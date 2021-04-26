import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
// import { e } from "@angular/core/src/render3";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { PasswordValidator } from "src/app/util/passwordValidator";
import { environment } from "./../../../environments/environment";
import { timer, Subscription } from "rxjs";
import { PasswordService } from "./service/password.service";
import { Pipe, PipeTransform } from "@angular/core";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"],
})
export class PasswordComponent implements OnInit {
  public passwordRequestForm: FormGroup;
  public otpPasswordRequestForm: FormGroup;
  public passwordResetForm: FormGroup;
  public badCredentials: boolean;
  public submitted = false;
  public formError: boolean;
  public creditRatingReportUrl =
    environment.api.url + "assets/credit_rating.xlsx";

  countDown: Subscription;
  counter = 60;
  counterTimer = false;
  tick = 1000;
  public window = window;
  public uiType: "request" | "reset" | "forgot";
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
  otpCreads: any = {};
  USER_TYPE = USER_TYPE;
  verified = false;
  userTypeSelected: USER_TYPE;

  mainPassword = true;
  confirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _passwordService: PasswordService,
    private commonService: CommonService

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

  onSelectingUserType(value: USER_TYPE) {
    this.userTypeSelected = value;
    switch (value) {
      case USER_TYPE.ULB:
        return this.passwordRequestForm.controls["email"].setValidators([
          Validators.required,
          Validators.pattern("(?!.*@).*"),
        ]);

      default:
        this.passwordRequestForm.controls["email"].setValidators([
          Validators.required,
          Validators.email,
        ]);

        break;
    }
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
    if (
      !form["controls"]["password"]["valid"] ||
      !form["controls"]["confirmPassword"]["valid"]
    ) {
      this.errorMessage =
        "Password should be alphanumeric with at least one Uppercase/Lowercase and special character with min length 8";
      return;
    }
    if (!form.valid) {
      this.errorMessage = form.controls.email.value
        ? "Email ID is incorrect."
        : "Please enter an email.";
      return;
    }
    form.disable();

    // this._passwordService.requestPasswordReset(form.value).subscribe(
    //   (res) => {
    //     form.patchValue({ email: null });
    //     const message =
    //       "Password reset has been initiated. Check You email for further instruction. ";
    //     this.successMessage = res["message"] || message;
    //     form.enable();
    //   },
    //   (error) => this.onGettingResponseError(error, form)
    // );
    if (this.verified) {
      form.value["token"] = this.otpCreads["token"];
      this.resetPass(form);
    }
    form.value["requestId"] = this.otpCreads["requestId"];
    this.authService.otpVerify(form.value).subscribe(
      (res) => {
        this.otpCreads = res;
        console.log(res);

        form.value["token"] = res["token"];
        this.verified = true;
        this.resetPass(form);
      },
      (error) => {
        this.onGettingResponseError(error, form);
        this.verified = false;
      }
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
    this.successMessage = "";
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

    this.otpPasswordRequestForm = this.fb.group({
      otp: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
          Validators.minLength(8),
        ],
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
          Validators.minLength(8),
        ],
      ],
      token: [""],
      requestId: [""],
    });
  }

  resetPass(form) {
    this._passwordService
      .resetPassword({ ...form.value, token: form.value["token"] })
      .subscribe(
        (res) => {
          form.patchValue({
            otp: "",
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

  sendOtp(form) {
    this.uiType = "forgot";
    this.authService.otpSignIn(form.value).subscribe(
      (res) => {
        this.otpCreads = res;
        this.otpCreads.ulbCode = form.value?.email
        form.enable();
        this.errorMessage = "";
        this.successMessage = res["message"];
        this.counterTimer = true;
        this.countDown = timer(0, this.tick).subscribe(() => {
          if (this.counter != 0 && this.counterTimer) {
            --this.counter;
          } else {
            this.countDown = null;
            this.counterTimer = false;
            this.counter = 60;
          }
        });
      },
      (error) => this.onGettingResponseError(error, form)
    );
  }

  startCountDown(form) {
    if (this.countDown) {
      return true;
    }
    this.sendOtp(form);
  }

  changePasswordRequest() {
    this.errorMessage = "";
    this.successMessage = "";
    this.uiType = "request";
    this.countDown.unsubscribe();
    this.countDown = null;
    this.counter = 60;
    this.counterTimer = false;
  }

  onChangeNumber(){
    this.commonService.setGetStateRegister(true,this.otpCreads);
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
