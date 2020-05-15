/**
 * @description These validators are to be used in the Reactive Forms. All the custom validators
 * that need to be implemented for any form, must be implemented here.
 */
import { AbstractControl } from '@angular/forms';

import { PasswordValidator } from './passwordValidator';

const validator = new PasswordValidator();

export const mobileNoValidator = (control: AbstractControl) => {
  const pattern = /^[6-9]\d{9}$/g;
  if (!control.value || !control.value.trim()) {
    return { required: true };
  }
  if (!control.value.match(pattern)) {
    return { pattern: false };
  }
  return null;
};

export const customEmailValidator = (control: AbstractControl) => {
  const pattern = /^.*\.[a-z]{2,3}/g;
  const email = false;
  if (!control.value || !control.value.trim()) {
    return { email };
  }
  if (!control.value.match(pattern)) {
    return { email };
  }
  return null;
};

export const customPasswordValidator = (control: AbstractControl) => {
  try {
    validator.validate(control.value);
  } catch (error) {
    return { password: error.message };
  }
  return null;
};
