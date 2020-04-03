import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      organisation: [
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

  public getULBForm() {
    return this.fb.group({
      state: ["", [Validators.required]],
      ulb_name: ["", [Validators.required]],
      ulb_code: ["", [Validators.required]],
      commisioner_name: ["", [Validators.required]],
      commisioner_contact_no: ["", [Validators.required]],
      commisioner_email_id: ["", [Validators.required]],
      accountant_name: ["", [Validators.required]],
      accountant_contact_no: ["", [Validators.required]],
      accountant_email_id: ["", [Validators.required]]
    });
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
}
