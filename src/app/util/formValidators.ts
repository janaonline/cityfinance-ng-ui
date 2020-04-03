import { AbstractControl } from '@angular/forms';

export const mobileNoValidator = (control: AbstractControl) => {
  const pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/g;
  const mobileNo = false;
  if (!control.value || !control.value.trim()) {
    return { mobileNo };
  }
  if (!control.value.match(pattern)) {
    return { mobileNo };
  }
  return null;
};
