import { AbstractControl } from '@angular/forms';

export const mobileNoValidator = (control: AbstractControl) => {
  const pattern = /^[6-9]\d{9}$/g;
  const mobileNo = false;
  if (!control.value || !control.value.trim()) {
    return { mobileNo };
  }
  if (!control.value.match(pattern)) {
    return { mobileNo };
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
