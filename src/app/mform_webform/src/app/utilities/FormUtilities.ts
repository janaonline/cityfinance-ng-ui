import { FormGroup } from '@angular/forms';

export class FormUtilities {
    public static resetForm(form: FormGroup) {
        Object.keys(form.controls).forEach(controlName => {
            form.controls[controlName].reset();
            form.controls[controlName].setErrors(null);
        });
    }
}