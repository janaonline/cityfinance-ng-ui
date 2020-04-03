import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

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
  public isCheckingULBCode = true;

  constructor(
    private fb: FormBuilder,
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
    console.log(errors);
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
      combineLatest([
        this.registrationForm.controls.ulb.valueChanges,
        this.registrationForm.controls.ulb_name.valueChanges
      ]).subscribe(
        res => {
          this.isCheckingULBCode = true;
          this.ulbCodeError = "ULB Code and Name does not match.";
          this.disableImportantULBFields(this.registrationForm);
        },
        err => {
          this.ulbCodeError =
            err.error.msg || "ULB Code and Name does not match.";
          this.disableImportantULBFields(this.registrationForm);
        }
      );

      // this.registrationForm.controls.ulb.valueChanges
      //   .pipe(debounceTime(2000))
      //   .subscribe(value => {
      //     this.registrationForm.disable();

      //     // check for ulb code and match.
      //   });
      this.disableImportantULBFields(this.registrationForm);
    }
  }

  private disableImportantULBFields(form: FormGroup) {
    form.controls.commissionerName.disable();
    form.controls.commissionerConatactNumber.disable();
    form.controls.commissionerEmail.disable();
    form.controls.accountantName.disable();
    form.controls.accountantConatactNumber.disable();
    form.controls.accountantEmail.disable();
  }

  private resetResponseMessage() {
    this.respone.successMessage = null;
    this.respone.errorMessage = null;
  }
}
