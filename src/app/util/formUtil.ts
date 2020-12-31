import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { PasswordValidator } from './passwordValidator';
import {
  atLeast1AplhabetRequired,
  CommisionormobileNoValidator,
  CommissionercustomEmailValidator,
  customEmailValidator,
  customPasswordValidator,
  mobileNoValidator,
  nonEmptyValidator,
  PartnerFormEmailValidations as setPartnerFormEmailValidations,
} from './reactiveFormValidators';

export class FormUtil {
  private fb: FormBuilder;

  private regexForUserName = "[A-Z]+[a-zA-Z]*[\\s*[a-zA-Z]*";
  private regexForAtleast1AplhabetWithSpecialCharacter = "\\w+.?\\s*\\w*\\D";
  private regexForOnlyNumberWithoutDecimalAccept = `\\d*$`;

  /**
   * @description This will validate  decimal point till only 9 precision point only.
   */
  private regexForOnlyNumbericWithDecimalAccept = `\\d*\\.?\\d{1,9}`;

  constructor() {
    this.fb = new FormBuilder();
  }

  public getUserForm(purpose: "CREATION" | "EDIT" = "CREATION") {
    let form = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern(this.regexForUserName),
          atLeast1AplhabetRequired,
        ],
      ],
      mobile: ["", [Validators.required, mobileNoValidator]],
      email: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      designation: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      organization: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
    });
    if (purpose === "CREATION") {
      form = this.fb.group({
        ...form.controls,
        password: ["", [customPasswordValidator]],
        confirmPassword: [
          "",
          Validators.required,
          (control: AbstractControl) => {
            if (!control.value) return of(null);
            if (control.value !== form.controls.password.value) {
              return of({
                passwordMisMatch:
                  "Password and Confirm Password does not match",
              });
            }
            return of(null);
          },
        ],
        captcha: [null, [Validators.required]],
      });
      return form;
    }

    return form;
  }

  public getULBForm(purpose: "CREATION" | "EDIT" = "CREATION") {
    const baseForm = this.fb.group({
      state: ["", [Validators.required]],
      ulb: ["", [Validators.required]],
      commissionerName: ["", [Validators.pattern(this.regexForUserName)]],
      commissionerConatactNumber: ["", [CommisionormobileNoValidator]],
      name: ["", [Validators.required, nonEmptyValidator]],

      commissionerEmail: [
        "",
        [Validators.email, CommissionercustomEmailValidator],
      ],
      accountantName: [
        "",
        [Validators.required, Validators.pattern(this.regexForUserName)],
      ],
      accountantConatactNumber: ["", [Validators.required, mobileNoValidator]],
      accountantEmail: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
    });
    if (purpose === "CREATION") {
      return this.fb.group({
        ...baseForm.controls,
        password: [""],
        captcha: [null, [Validators.required]],
      });
    }

    const updationForm = this.fb.group({
      ...baseForm.controls,
      ulb: this.fb.group({
        censusCode: [""],
        sbCode: [""],
        wards: [
          "",
          [
            Validators.required,
            Validators.pattern(this.regexForOnlyNumberWithoutDecimalAccept),
          ],
        ],
        population: [
          "",
          [
            Validators.required,
            Validators.pattern(this.regexForOnlyNumberWithoutDecimalAccept),
          ], /// ^[0-9]\d*$/
        ],
        area: [
          "",
          [
            Validators.required,
            Validators.pattern(this.regexForOnlyNumbericWithDecimalAccept),
          ],
        ],
        ulbType: this.fb.group({
          _id: ["", [Validators.required]],
        }),
        name: ["", [Validators.required, atLeast1AplhabetRequired]],
      }),
    });

    (updationForm.controls.ulb as FormGroup).controls.censusCode.setValidators([
      (control) => {
        const censusCode = control.value ? control.value.trim() : null;
        let sbCode = (updationForm.controls.ulb as FormGroup).controls.sbCode
          .value;
        sbCode = sbCode ? sbCode.trim() : null;
        if (!sbCode && !censusCode) return { required: "ERRRRRRR" };
        return null;
      },
    ]);
    (updationForm.controls.ulb as FormGroup).controls.sbCode.setValidators([
      (control) => {
        const sbCode = control.value ? control.value.trim() : null;
        let censusCode = (updationForm.controls.ulb as FormGroup).controls
          .censusCode.value;
        censusCode = censusCode ? censusCode.trim() : null;
        if (!sbCode && !censusCode) return { required: "sbCode" };
        return null;
      },
    ]);

    (updationForm.controls.ulb as FormGroup).controls.censusCode.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((newValue) => {
        (updationForm.controls
          .ulb as FormGroup).controls.censusCode.updateValueAndValidity({
          onlySelf: true,
        });
        (updationForm.controls
          .ulb as FormGroup).controls.sbCode.updateValueAndValidity({
          onlySelf: true,
        });
      });
    (updationForm.controls.ulb as FormGroup).controls.sbCode.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((newValue) => {
        (updationForm.controls
          .ulb as FormGroup).controls.sbCode.updateValueAndValidity({
          onlySelf: true,
        });
        (updationForm.controls
          .ulb as FormGroup).controls.censusCode.updateValueAndValidity({
          onlySelf: true,
        });
      });

    return updationForm;
  }

  public getStateForm() {
    const form = this.fb.group({
      state: ["", Validators.required],
      name: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      email: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      mobile: ["", [Validators.required, mobileNoValidator]],
      designation: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      address: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentName: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentEmail: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      departmentContactNumber: ["", [Validators.required, mobileNoValidator]],
    });

    form.controls.email.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((newValue) => {
        form.controls.departmentEmail.updateValueAndValidity();
      });

    form.controls.departmentEmail.valueChanges.subscribe((newValue) => {
      form.controls.email.updateValueAndValidity();
    });

    return form;
  }

  public getMoHUAForm() {
    const form = this.fb.group({
      name: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      email: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      mobile: ["", [Validators.required, mobileNoValidator]],
      designation: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      address: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentName: [
        "MoHUA",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentEmail: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      departmentContactNumber: ["", [Validators.required, mobileNoValidator]],
    });
    form.controls.email.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newValue) => {
        form.controls.departmentEmail.updateValueAndValidity();
      });
    form.controls.departmentEmail.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newValue) => {
        form.controls.email.updateValueAndValidity();
      });

    return form;
  }

  public getPartnerForm() {
    const form = this.fb.group({
      name: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      email: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      mobile: ["", [Validators.required, mobileNoValidator]],
      designation: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      address: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentName: [
        "",
        [Validators.required, nonEmptyValidator, atLeast1AplhabetRequired],
      ],
      departmentEmail: [
        "",
        [Validators.required, Validators.email, customEmailValidator],
      ],
      departmentContactNumber: ["", [Validators.required, mobileNoValidator]],
    });

    setPartnerFormEmailValidations(
      form.controls.email,
      form.controls.departmentEmail
    );
    return form;
  }

  public validadteUserForm(
    form: FormGroup,
    options: { validationType: "CREATION" | "EDIT" } = {
      validationType: "CREATION",
    }
  ) {
    const errors: string[] = [];
    if (options.validationType === "CREATION") {
      const passwordControl = form.controls.password;
      try {
        const validator = new PasswordValidator();
        validator.validate(
          passwordControl.value,
          form.controls.confirmPassword.value
        );
      } catch (error) {
        errors.push(error.message);
      }
    }

    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      /**
       * We dont need to check for password here as we have already validated it earlier.
       */
      if (controlName === "password") {
        return;
      }
      if (!control.valid) {
        const newControlName = controlName.split(/(?=[A-Z])/).join(" ");

        if (control.errors && control.errors.required) {
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          if (controlName == "accountant Name") {
            return errors.push(
              `ULB Nodal Officer Name should be alphabetic only`
            );
          }
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } should be alphabetic only`
          );
        }
        errors.push(
          `${
            newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
          } is invalid`
        );
      }
    });

    return errors.length ? errors : null;
  }

  /**
   *
   * @description This validation method for ULB is called only at the time
   * of ULB Sign up only.
   */
  public validateULBSignUPForm(form: FormGroup) {
    const errors: string[] = [];
    // let commissionerEmail: string = form.controls.commissionerEmail.value;
    let accountantEmail: string = form.controls.accountantEmail.value;

    // commissionerEmail = commissionerEmail
    //   ? commissionerEmail.trim()
    //   : commissionerEmail;
    accountantEmail = accountantEmail
      ? accountantEmail.trim()
      : accountantEmail;

    // if (
    //   accountantEmail.trim() &&
    //   commissionerEmail.trim() &&
    //   accountantEmail == commissionerEmail
    // ) {
    //   errors.push(
    //     "Commisionar Email ID and ULB Nodal Officer Email ID cannot be same"
    //   );
    // }
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      if (!control.valid) {
        let newControlName = controlName.split(/(?=[A-Z])/).join(" ");
        if (newControlName.includes("accountant")) {
          newControlName = newControlName.replace(
            "accountant",
            "ULB Nodal Officer"
          );
        }
        if (control.errors && control.errors.required) {
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } should be alphabetic only`
          );
        }
        errors.push(
          `${
            newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
          } is invalid`
        );
      }
    });
    return errors.length ? errors : null;
  }

  /**
   * @description ULB has different keys during signup and updating, therefore we
   * need 2 different method to validate it.
   */
  public validationULBProfileUpdateForm(form: FormGroup) {
    let errors: string[] = [];
    if (form.controls.ulb) {
      let censusCode = (form.controls.ulb as FormGroup).controls.censusCode
        .value;
      censusCode = censusCode ? censusCode.trim() : null;
      let ulbCode = (form.controls.ulb as FormGroup).controls.sbCode.value;
      ulbCode = ulbCode ? ulbCode.trim() : null;
      if (!censusCode && !ulbCode) {
        errors.push("Either Census Code or ULB Code must be entered.");
      }
    }

    if (form.controls.commissionerEmail && form.controls.accountantEmail) {
      let commissionerEmail: string = form.controls.commissionerEmail.value;
      let accountantEmail: string = form.controls.accountantEmail.value;

      commissionerEmail = commissionerEmail
        ? commissionerEmail.trim()
        : commissionerEmail;
      accountantEmail = accountantEmail
        ? accountantEmail.trim()
        : accountantEmail;

      // if (accountantEmail == commissionerEmail) {
      //   errors.push(
      //     "Commisionar Email ID and ULB Nodal Officer Email ID cannot be same"
      //   );
      // }
    }

    Object.keys(form.controls).forEach((Name) => {
      const control = form.controls[Name];
      if (control.disabled) {
        return;
      }
      if (control instanceof FormGroup) {
        const nestedErrors = this.validationULBProfileUpdateForm(control);
        if (!nestedErrors || !nestedErrors.length) {
          return;
        }
        errors = [...errors, ...nestedErrors];
        return;
      }

      if (!control.valid) {
        errors.push(`${Name} is invalid`);
        return;
      }
    });
    return errors.length === 0 ? null : errors;
  }

  public validateStateForm(form: FormGroup) {
    const errors: string[] = [];
    let stateEmailID: string = form.controls.email.value;
    let departmentEmailID: string = form.controls.departmentEmail.value;

    stateEmailID = stateEmailID ? stateEmailID.trim() : stateEmailID;
    departmentEmailID = departmentEmailID
      ? departmentEmailID.trim()
      : departmentEmailID;

    if (departmentEmailID == stateEmailID) {
      errors.push("State Email ID and Department Email ID cannot be same");
      form.controls.email.setErrors({ sameEmail: true });
      form.controls.departmentEmail.setErrors({ sameEmail: true });
    }

    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      if (!control.valid) {
        const newControlName = controlName.split(/(?=[A-Z])/).join(" ");
        if (control.errors && control.errors.required) {
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          return errors.push(
            `${
              newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
            } should be alphabetic only`
          );
        }

        console.warn(newControlName);
        if (
          newControlName === "email" ||
          newControlName === "department Email"
        ) {
          if (
            form.controls.email.value == form.controls.departmentEmail.value
          ) {
            return;
          }
        }
        errors.push(
          `${
            newControlName.charAt(0).toUpperCase() + newControlName.substr(1)
          } is invalid`
        );
      }
    });
    return errors.length ? errors : null;
  }

  public validatePartnerForm(form: FormGroup) {
    // const errors: string[] = [];
    // let stateEmailID: string = form.controls.email.value;
    // let departmentEmailID: string = form.controls.departmentEmail.value;
    // stateEmailID = stateEmailID ? stateEmailID.trim() : stateEmailID;
    // departmentEmailID = departmentEmailID
    //   ? departmentEmailID.trim()
    //   : departmentEmailID;
    // if (departmentEmailID == stateEmailID) {
    //   errors.push("State Email ID and Department Email ID cannot be same");
    //   form.controls.email.setErrors({ sameEmail: true });
    //   form.controls.departmentEmail.setErrors({ sameEmail: true });
    // }
    // return ["false"];
  }

  public validateMoHUAForm(form: FormGroup) {
    return this.validateStateForm(form);
  }
}
