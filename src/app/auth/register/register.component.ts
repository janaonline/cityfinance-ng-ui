import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { USER_TYPE } from '../../models/user/userType';
import { IStateULBCovered } from '../../shared/models/stateUlbConvered';
import { CommonService } from '../../shared/services/common.service';
import { FormUtil } from '../../util/formUtil';
import { AuthService } from './../auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  public registrationType: "user" | "ulb";
  private formUtility = new FormUtil();
  public badCredentials: boolean;
  public formError: string[];
  public formSubmitted = false;
  public stateList: IStateULBCovered[] = [];

  public respone = { successMessage: null, errorMessage: null };

  public ulbCodeError;
  public isCheckingULBCode = false;
  private ulb;
  public ulbList: any[];
  public reCaptcha = {
    show: true,
    siteKey: environment.reCaptcha.siteKey,
    userGeneratedKey: null,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _coomonService: CommonService
  ) {
    this._activatedRoute.params.subscribe((param) => {
      console.log(param);
      if (param.type.trim()) {
        this.registrationType = param.type;
        this.initializeForm();

        this.authService.badCredentials.subscribe((res) => {
          this.badCredentials = res;
        });
      } else this.registrationType = null;
    });
    this.fetchStateList();
  }

  ngOnInit() {}

  canSubmitForm() {
    if (this.registrationType === "user") {
      return true;
    }
    if (
      !this.registrationForm ||
      this.registrationForm.controls.commissionerName.disabled
    ) {
      return false;
    }

    if (!this.reCaptcha.userGeneratedKey) {
      return false;
    }
    return true;
  }

  signup(form: FormGroup) {
    let errors: string[];
    this.resetResponseMessage();
    const body = form.value;
    if (this.registrationType === "user") {
      errors = this.formUtility.validadteUserForm(form);
      body.role = USER_TYPE.USER;
    } else {
      errors = this.formUtility.validateULBSignUPForm(form);

      body.role = USER_TYPE.ULB;
      body.ulb = this.ulb._id;
    }
    this.formError = errors;
    if (errors) {
      return;
    }
    this.authService.signup(body).subscribe(
      (res) => {
        if (!res["success"]) {
          this.formError = [res["msg"]];
          return;
        }
        form.reset();

        if (this.registrationType === "user") {
          this.respone.successMessage =
            "User Registration successful. Kindly check your email for further information.";
        } else {
          this.respone.successMessage =
            "ULB registered successfully. Kindly check your email for further information";
        }
      },
      (err) => {
        console.log(err);

        this.respone.errorMessage = err.error.message || "Server Error";
      }
    );
  }

  onSelectionUserType(userTypeSelect: USER_TYPE) {
    switch (userTypeSelect) {
      case USER_TYPE.ULB:
        return this.router.navigate(["../ulb"], {
          relativeTo: this._activatedRoute,
        });
      // return (this.registrationType = "ulb");
      default:
        this.router.navigate(["../user"], { relativeTo: this._activatedRoute });
    }
  }

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.registrationForm.controls[controlName].dirty &&
      this.registrationForm.controls[controlName].errors
    )
      ? this.registrationForm.controls[controlName].errors
      : null;
  }

  private fetchStateList() {
    this._coomonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
    });
  }

  private initializeForm() {
    if (this.registrationType === "user") {
      this.registrationForm = this.formUtility.getUserForm();
    } else if (this.registrationType === "ulb") {
      this.registrationForm = this.formUtility.getULBForm();
      this.listenToULBControls();
      this.disableImportantULBFields(this.registrationForm);
    }
  }

  private listenToULBControls() {
    this.registrationForm.controls.state.valueChanges.subscribe((stateId) => {
      this.ulbList = null;
      this._coomonService.getULBByStateCode(stateId).subscribe((res) => {
        if (res["data"]) {
          res["data"] = res["data"].sort((stateA, stateB) =>
            stateA.name > stateB.name ? 1 : -1
          );
        }
        this.ulbList = res["data"];
      });
    });

    combineLatest([
      this.registrationForm.controls.ulb.valueChanges,
      this.registrationForm.controls.name.valueChanges,
    ])
      .pipe(
        debounceTime(1000),
        filter((values: string[]) => values.every((tt) => !!(tt && tt.trim()))),
        switchMap((res: string[]) => {
          const code = res[0];

          const ulbId = res[1];
          const response = { isValid: false, ulb: null };
          const ulbFound = this.ulbList.find((ulb) => ulb.name === ulbId);

          if (!ulbFound) {
            return of(response);
          }

          if (ulbFound.code !== code && ulbFound.sbCode !== code) {
            return of(response);
          }
          response.isValid = true;
          response.ulb = ulbFound;
          return of(response);
        })
      )
      .subscribe(
        (res) => {
          this.registrationForm.enable({ emitEvent: false });
          this.isCheckingULBCode = false;
          if (!res.isValid) {
            this.ulbCodeError = "ULB Code and Name does not match.";
            this.disableImportantULBFields(this.registrationForm);
            return;
          }
          this.ulb = res.ulb;
          this.ulbCodeError = null;
        },
        (err) => this.onGettingULBValidationError(err)
      );
  }

  private onGettingULBValidationError(err: HttpErrorResponse) {
    this.ulbCodeError = err.error.msg || "ULB Code and Name does not match.";
    this.registrationForm.enable({ emitEvent: false });
    this.disableImportantULBFields(this.registrationForm);
    this.isCheckingULBCode = false;
  }

  private disableImportantULBFields(form: FormGroup) {
    form.controls.commissionerName.disable({ emitEvent: false });
    form.controls.commissionerConatactNumber.disable({ emitEvent: false });
    form.controls.commissionerEmail.disable({ emitEvent: false });
    form.controls.accountantName.disable({ emitEvent: false });
    form.controls.accountantConatactNumber.disable({ emitEvent: false });
    form.controls.accountantEmail.disable({ emitEvent: false });
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
        return;
      }

      this.registrationForm.controls.captcha.setValue(keyGenerated);
    });
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
