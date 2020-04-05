import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { USER_TYPE } from '../../models/user/userType';
import { IStateULBCovered } from '../../shared/models/stateUlbConvered';
import { CommonService } from '../../shared/services/common.service';
import { FormUtil } from '../../util/formUtil';
import { AuthService } from './../auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _coomonService: CommonService
  ) {
    this._activatedRoute.params.subscribe(param => {
      if (param.type) {
        this.registrationType = param.type;
      }
    });
    this.fetchStateList();
  }

  ngOnInit() {
    this.initializeForm();

    this.authService.badCredentials.subscribe(res => {
      this.badCredentials = res;
    });
  }

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
      errors = this.formUtility.validadteULBForm(form);

      body.role = USER_TYPE.ULB;
    }
    this.formError = errors;
    console.log(body);
    if (errors) {
      return;
    }

    this.authService.signup(body).subscribe(
      res => {
        if (!res["success"]) {
          this.formError = [res["msg"]];
          return;
        }
        if (this.registrationType === "user") {
          this.respone.successMessage =
            "User Registration succssfull. Kindly check your email for further information.";
        } else {
          this.respone.successMessage =
            "ULB registered successfully. Kindly check your email for further information";
        }
      },
      err => {
        this.respone.errorMessage = err.error.msg || "Server Error";
      }
    );
  }

  private fetchStateList() {
    this._coomonService.getStateUlbCovered().subscribe(res => {
      console.log(res.data[0]);
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
    combineLatest([
      this.registrationForm.controls.ulb.valueChanges,
      this.registrationForm.controls.ulb_name.valueChanges
    ])
      .pipe(
        debounceTime(2000),
        switchMap((res: string[]) => {
          this.isCheckingULBCode = true;
          this.registrationForm.disable({ onlySelf: true, emitEvent: false });
          return this._coomonService.verifyULBCodeAndName({
            code: res[0],
            name: res[1]
          });
        })
      )
      .subscribe(
        res => {
          this.registrationForm.enable({ emitEvent: false });
          console.log(res);
          this.isCheckingULBCode = false;
          if (!res.isValid) {
            this.ulbCodeError = "ULB Code and Name does not match.";
            this.disableImportantULBFields(this.registrationForm);
            return;
          }
          this.ulbCodeError = null;
        },
        err => this.onGettingULBValidationError(err)
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

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
