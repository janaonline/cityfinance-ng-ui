import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/auth.service";
import { UtilityService } from "../../services/utility.service";
import { OtpDialogComponent } from "../otp-dialog/otp-dialog.component";
import { DownloadUserInfoService } from "./download-user-info.service";

interface Validator {
  name: string;
  validator: any;
  message: string;
}
interface FieldConfig {
  required?: any;
  label: string;
  key: string;
  formFieldType: string;
  data?: any[];
  value?: any;
  validations?: Validator[];
  showAsterisk?: boolean;
}

export interface EmailVerification {
  isOtpSent: boolean;
  isOtpVerified: boolean;
  isEmailVerified: boolean;
  isUnsubscribed: boolean;
  message: string;
}

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {
  @ViewChild('checkbox') checkbox: HTMLElement;

  constructor(
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private downloadUserService: DownloadUserInfoService,
    private dialogRef: MatDialogRef<UserInfoDialogComponent>,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private authService: AuthService,
  ) { }

  title: string = "Download";
  downloadInfoTitle: string = "Your personal information is safe.";
  downloadInfoDese: string = "We request these details to understand our user base and shape future improvements. You might hear from us a few times a year with product updates or invitations to give feedback.";
  desc: string = "Please enter your information below to download the file(s).";
  isLoading: boolean = false;
  fields: FieldConfig[] = [];
  userInfo: FormGroup = new FormGroup({});
  checkboxMsg: string = '';
  isChecked: boolean = false;
  module: string = '';
  message: string = '';

  // public reCaptcha = {
  //   show: true,
  //   siteKey: environment.reCaptcha.siteKey,
  //   userGeneratedKey: null,
  // };

  ngOnInit(): void {
    this.getFields();
    this.module = this.matDialogData?.downloadInfo?.module;
  }

  private getFields(): void {
    this.isLoading = true;
    this.downloadUserService
      .getUserInfoQuestions(this.matDialogData?.moduleInfo?.endPoint)
      .subscribe((res: any) => {
        this.fields = res.data.data;
        this.title = res.data.title || this.title;
        this.desc = res.data.desc || this.desc;
        this.checkboxMsg = res.data.checkboxMsg || this.checkboxMsg;
        this.userInfo = this.toFormGroup(this.fields);
        this.isLoading = false;
      });
  }

  public submit() {
    this.message = '';

    if (this.userInfo.valid) {
      let payload = { ...this.userInfo.value };

      this.authService.sendOtp(payload.email).subscribe({
        next: (res: EmailVerification) => {
          if (res.isEmailVerified) {
            this.submitUserInfo(res.isEmailVerified);
          } else {
            const data = { email: payload.email };
            const otpDialog = this.dialog.open(OtpDialogComponent, { data, minWidth: 500 });
            otpDialog.afterClosed().subscribe((data) => {
              // console.log("After dialog closed data: ", data);
              this.message = data.message;

              // OTP is verified.
              if (data.isOtpVerified) {
                this.submitUserInfo(true);
              } else {
                this.authService.clearLocalStorageKey('userInfo');
              }
            })
          }
        },
        error: (error) => {
          console.error('Failed to validate OTP!');
          this.message = error.message;
          this.utilityService.swalPopup('Error', error.message, 'error');
        }
      })
    }
  }

  public submitUserInfo(isEmailVerified: boolean = false): void {

    if (this.userInfo.valid) {
      let payload = { ...this.userInfo.value, isEmailVerified };
      // console.log({ payload })

      // If saveToLocalStorage is true then store data in localStorage.
      if (this.matDialogData?.moduleInfo?.saveToLocalStorage) {
        localStorage.setItem("userInfo", JSON.stringify(payload));

        payload = {
          ...this.userInfo.value,
          ...this.matDialogData.downloadInfo,
        };
      }

      this.dialogRef.close(payload);
    } else {
      this.utilityService.swalPopup('Validation Failed!', 'Failed to download file!', 'error');
      console.error("Invalid user info.");
    }

  }

  private toFormGroup(questions: FieldConfig[]): FormGroup {
    const group: any = {};
    questions.forEach((question: FieldConfig) => {
      group[question.key] = new FormControl(question.value || '', this.bindValidations(question.validations))
    });
    return new FormGroup(group);
  }

  private bindValidations(validations: any) {
    if (validations && validations.length > 0) {
      const validators: any = [];
      validations.forEach((row: any) => {
        switch (row.name) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'nullValidator':
            validators.push(Validators.nullValidator);
            break;
          case 'pattern':
            validators.push(Validators.pattern(row.validator));
            break;
          case 'min':
            validators.push(Validators.min(row.validator));
            break;
          case 'max':
            validators.push(Validators.max(row.validator));
            break;
          case 'minlength':
            validators.push(Validators.minLength(row.validator));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(row.validator));
            break;
          case 'email':
            validators.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'));
            break;
        }
      });

      return Validators.compose(validators);
    }
    return null;
  }

  public hasError(key: string, name: string) {
    if (name === 'email') name = 'pattern';
    return (this.userInfo.get(key) as FormControl).hasError(name);
  }

  // TODO: ON HOLD.
  // private resetCaptcha() {
  //   this.reCaptcha.show = false;
  //   this.reCaptcha.userGeneratedKey = null;
  //   // this.passwordRequestForm.controls.captcha.reset();
  //   setTimeout(() => {
  //     this.reCaptcha.show = true;
  //   }, 500);
  // }

  // resolveCaptcha(keyGenerated: string) {
  //   this.reCaptcha.userGeneratedKey = keyGenerated;
  //   this.authService.verifyCaptcha(keyGenerated).subscribe((res) => {

  //     if (!res["success"]) {
  //       this.resetCaptcha();
  //     }

  //   });
  // }
}
