import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { PasswordValidator } from 'src/app/util/passwordValidator';

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
  public badCredentials: boolean;
  public formError: string[];
  public formSubmitted = false;
  public stateList: IStateULBCovered[] = [];
  public ulbCodeError;

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

  signup(form: FormGroup) {
    let errors: string[];
    const body = form.value;
    if (this.registrationType === "user") {
      errors = this.validadteUserForm(form);
      body.role = USER_TYPE.USER;
    } else {
      errors = this.validadteULBForm(form);
      body.role = USER_TYPE.ULB;
    }
    this.formError = errors;
    if (errors) {
      return;
    }

    this.authService.signup(body).subscribe(res => {
      if (!res["success"]) {
        this.formError = [res["msg"]];
        return;
      }
      // alert("Registered Successfully");
      // this.router.navigate(["/"]);
    });
  }

  private fetchStateList() {
    this._coomonService.getStateUlbCovered().subscribe(res => {
      console.log(res.data[0]);
      this.stateList = res.data;
    });
  }

  private validadteUserForm(form: FormGroup) {
    const errors: string[] = [];
    const passwordControl = form.controls.password;
    try {
      const validator = new PasswordValidator();
      validator.validate(
        passwordControl.value,
        form.controls.confirmPassword.value
      );
    } catch (error) {
      passwordControl.setErrors({ error: true });
      errors.push(error.message);
    }

    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.valid) {
        if (control.errors.required) {
          return errors.push(
            `${controlName.charAt(0).toUpperCase() +
              controlName.substr(1)} is required`
          );
        }
        if (control.errors.pattern) {
          return errors.push(
            `${controlName.charAt(0).toUpperCase() +
              controlName.substr(1)} should alphabetic only`
          );
        }
        errors.push(
          `${controlName.charAt(0).toUpperCase() +
            controlName.substr(1)} is invalid`
        );
      }
    });

    return errors.length ? errors : null;
  }

  private validadteULBForm(form) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.valid) {
        if (control.errors.required) {
          return errors.push(
            `${controlName.charAt(0).toUpperCase() +
              controlName.substr(1)} is required`
          );
        }
        if (control.errors.pattern) {
          return errors.push(
            `${controlName.charAt(0).toUpperCase() +
              controlName.substr(1)} should alphabetic only`
          );
        }
        errors.push(
          `${controlName.charAt(0).toUpperCase() +
            controlName.substr(1)} is invalid`
        );
      }
    });
    return errors.length ? errors : null;
  }

  private initializeForm() {
    const formUtility = new FormUtil();
    if (this.registrationType === "user") {
      this.registrationForm = formUtility.getUserForm();
    } else if (this.registrationType === "ulb") {
      this.registrationForm = formUtility.getULBForm();
      this.registrationForm.controls.ulb_code.valueChanges
        .pipe(debounceTime(2000))
        .subscribe(value => {
          this.registrationForm.disable();

          // check for ulb code and match.
        });
      this.disableImportantULBFields(this.registrationForm);
    }
  }

  private disableImportantULBFields(form: FormGroup) {
    form.controls.commisioner_name.disable();
    form.controls.commisioner_contact_no.disable();
    form.controls.commisioner_email_id.disable();
    form.controls.accountant_name.disable();
    form.controls.accountant_contact_no.disable();
    form.controls.accountant_email_id.disable();
  }
}
