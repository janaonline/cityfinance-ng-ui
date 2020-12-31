/**
 * @description These validators are to be used in the Reactive Forms. All the custom validators
 * that need to be implemented for any form, must be implemented here.
 */
import { AbstractControl } from '@angular/forms';
import { control } from 'leaflet';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PasswordValidator } from './passwordValidator';

const validator = new PasswordValidator();

/**
 *
 * @description This Validator will only accept 10 digit number only with starting number 6 / 7 / 8 / 9.
 *
 * @example
 *  6767676767 = valid
 *  5767676767 = invalid since number is starting with digit 5.
 */
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

export const CommisionormobileNoValidator = (control: AbstractControl) => {
  const pattern = /^[6-9]\d{9}$/g;
  if (!control.value || !control.value.trim()) {
    return null;
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
    return { required: true };
  }
  if (!control.value.match(pattern)) {
    return { email };
  }
  return null;
};

export const CommissionercustomEmailValidator = (control: AbstractControl) => {
  const pattern = /^.*\.[a-z]{2,3}/g;
  const email = false;
  if (!control.value || !control.value.trim()) {
    return null;
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

/**
 * @description This Validator must be used for string inputs only.
 * The in-built <code> Validators.required </code> accepts empty string as valid,
 * but this validator will in-validate it. It can be used along side Validators.required also.
 * @example
 *  'asdas' = valid
 *  '    '  = invalid
 */
export const nonEmptyValidator = (control: AbstractControl) => {
  const value = control.value;
  if (!value || !value.trim()) {
    return { required: true };
  }

  return null;
};

export const atLeast1AplhabetRequired = (control: AbstractControl) => {
  const value = <string>control.value;
  if (!value || !value.trim()) {
    return null;
  }

  if (value.search(/[a-zA-Z]/) < 0) {
    return { alphabet_required: "Atleast 1 alphabet is required" };
  }

  return null;
};

export const PartnerFormEmailValidations = (
  emailControl: AbstractControl,
  departmentEmailControl: AbstractControl
) => {
  const emailObserver = emailControl.valueChanges;
  const departmentEmailObserver = departmentEmailControl.valueChanges;
  combineLatest(emailObserver, departmentEmailObserver)
    .pipe(debounceTime(500))
    .subscribe((value: string[]) => {
      const email = value[0] ? value[0].trim() : null;
      const departmentEmail = value[1] ? value[1].trim() : null;

      if (!email || !departmentEmail) {
        console.log(emailControl);
        return false;
      }

      if (email.toLocaleLowerCase() !== departmentEmail.toLocaleLowerCase()) {
        emailControl.updateValueAndValidity({ emitEvent: false });
        departmentEmailControl.updateValueAndValidity({ emitEvent: false });
        return;
      }
      emailControl.setErrors({ sameEmail: true });
    });
};
