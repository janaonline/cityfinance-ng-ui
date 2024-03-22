import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {
  transform(control: FormControl): string | null {
    if (control.errors) {
      const errorKeys = Object.keys(control.errors);
      if (errorKeys.length > 0) {
        const errorKey = errorKeys[0];
        switch (errorKey) {
          case 'required':
            return 'This field is required';
          case 'minlength':
            return `Minimum length is ${control.errors.minlength.requiredLength}`;
          case 'maxlength':
            return `Maximum length is ${control.errors.maxlength.requiredLength}`;
          case 'max':
            return `The maximum value allowed is ${control.errors.max.max}`;
          case 'min':
            return `The minimum value allowed is ${control.errors.min.min}`;
          // Add more cases for other error types as needed
          default:
            return `Please provide a valid input. ${errorKey}`;
        }
      }
    }
    return null;
  }
}