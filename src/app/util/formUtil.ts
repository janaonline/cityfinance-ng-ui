import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { mobileNoValidator } from './formValidators';
import { PasswordValidator } from './passwordValidator';

export class FormUtil {
  private fb: FormBuilder;
  constructor() {
    this.fb = new FormBuilder();
  }

  public getUserForm(purpose: "CREATION" | "EDIT" = "CREATION") {
    let form = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/[a-zA-z]+/g)]],
      mobile: ["", [Validators.required, Validators.minLength(10)]],
      email: ["", [Validators.required]],
      designation: [
        "",
        [Validators.required, Validators.pattern(/[a-zA-z]+/g)]
      ],
      organization: [
        "",
        [Validators.required, Validators.pattern(/[a-zA-z]+/g)]
      ]
    });
    if (purpose === "CREATION") {
      form = this.fb.group({
        ...form.controls,
        password: ["", [Validators.required]],
        confirmPassword: ["", Validators.required]
      });
      return form;
    }

    return form;
  }

  public getULBForm(purpose: "CREATION" | "EDIT" = "CREATION") {
    const baseForm = this.fb.group({
      state: ["", [Validators.required]],
      ulb: ["", [Validators.required]],
      commissionerName: ["", [Validators.required]],
      commissionerConatactNumber: [
        "",
        [Validators.required, mobileNoValidator]
      ],
      type: ["", [Validators.required]],
      name: ["", Validators.required],

      commissionerEmail: ["", [Validators.required, Validators.email]],
      accountantName: ["", [Validators.required]],
      accountantConatactNumber: ["", [Validators.required, mobileNoValidator]],
      accountantEmail: ["", [Validators.required, Validators.email]]
    });
    if (purpose === "EDIT") {
      return this.fb.group({
        ...baseForm.controls,
        noOfWards: ["", [Validators.required]],
        population: ["", [Validators.required]],
        area: ["", [Validators.required]]
      });
    }

    return this.fb.group({
      ...baseForm.controls,
      ulb_name: ["", [Validators.required]]
    });
  }

  public getStateForm() {
    const form = this.fb.group({
      state: ["", Validators.required],
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      address: ["", [Validators.required]],
      departmentName: ["", Validators.required],
      departmentEmail: ["", [Validators.required, Validators.email]],
      departmentContactNumber: ["", Validators.required]
    });

    return form;
  }

  public getMoHUAForm() {
    const form = this.getStateForm();
    form.controls.departmentName.setValue("MoHUA");
    return form;
  }

  public validadteUserForm(
    form: FormGroup,
    options: { validationType: "CREATION" | "EDIT" } = {
      validationType: "CREATION"
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
        passwordControl.setErrors({ error: true });
        errors.push(error.message);
      }
    }

    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.valid) {
        const newControlName = controlName.split(/(?=[A-Z])/).join(" ");
        if (control.errors && control.errors.required) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} should alphabetic only`
          );
        }
        errors.push(
          `${newControlName.charAt(0).toUpperCase() +
            newControlName.substr(1)} is invalid`
        );
      }
    });

    return errors.length ? errors : null;
  }

  public validadteULBForm(form: FormGroup) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.valid) {
        const newControlName = controlName.split(/(?=[A-Z])/).join(" ");
        if (control.errors && control.errors.required) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} should alphabetic only`
          );
        }
        errors.push(
          `${newControlName.charAt(0).toUpperCase() +
            newControlName.substr(1)} is invalid`
        );
      }
    });
    return errors.length ? errors : null;
  }

  public validateStateForm(form: FormGroup) {
    const errors: string[] = [];
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      if (!control.valid) {
        const newControlName = controlName.split(/(?=[A-Z])/).join(" ");
        if (control.errors && control.errors.required) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} is required`
          );
        }
        if (control.errors && control.errors.pattern) {
          return errors.push(
            `${newControlName.charAt(0).toUpperCase() +
              newControlName.substr(1)} should alphabetic only`
          );
        }
        errors.push(
          `${newControlName.charAt(0).toUpperCase() +
            newControlName.substr(1)} is invalid`
        );
      }
    });
    return errors.length ? errors : null;
  }

  public validateMoHUAForm(form: FormGroup) {
    return this.validateStateForm(form);
  }
}
