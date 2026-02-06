import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from "file-saver";
import Swal from 'sweetalert2';


interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface FieldConfig {
  required?: any;
  label: string;
  key: string;
  formFieldType: string;
  data?: any[];
  value?: any;
  validations?: Validator[];
  showAsterisk: boolean;
  options?: any[];
  optionName?: string;
  readonly: boolean;
}

@Injectable({
  providedIn: "root"
})
export class UtilityService {
  constructor() { }

  jsonToFormData(jsonObj, ignoreKeys: string[], formData: FormData): FormData {
    // let formData: FormData = new FormData();
    const keys = Object.keys(jsonObj);
    for (let i = 0; i < keys.length; i++) {
      if (ignoreKeys.indexOf(keys[i]) > -1) {
        continue;
      }
      formData.append(keys[i], jsonObj[keys[i]]);
    }
    return formData;
  }

  debounce(func, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  public swalPopup(title: string, text: string, icon: any = 'success'): void {
    const timer = icon == 'error' ? 5000 : 2000;
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer,
      customClass: {
        container: 'swal-container-on-top'  // Custom class for the container
      }
    });
  }

  public fetchAndSaveFile(target_file_url: string, fileName: string): void {
    // Show a popup to indicate that the file is being downloaded
    const swalInstance = this.swalLoader();

    // Extract extension safely (handles query params)
    const cleanUrl = target_file_url.split('?')[0];
    const extension = cleanUrl.substring(cleanUrl.lastIndexOf('.')) || '';

    fetch(target_file_url)
      .then((response) => {
        if (!response.ok) { throw new Error("Response was not ok.") }
        return response.blob();
      })
      .then((blob) => {
        FileSaver.saveAs(blob, `${fileName}${extension}`);
        swalInstance.close(); // Close the "Downloading..." popup
        this.swalPopup('File Downloaded', 'File has been downloaded successfully!', 'success');
      })
      .catch((error) => {
        console.error("Error in fetching file: ", error);
        swalInstance.close(); // Close the "Downloading..." popup
        this.swalPopup('Validation Failed!', 'Failed to download file!', 'error');
      });
  }

  public swalLoader(): any {
    return Swal.fire({
      title: 'Downloading...',
      text: 'Please wait while the file is being downloaded.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timerProgressBar: true,
      timer: 0, // No timer here, we'll control when to close the popup manually
      customClass: {
        container: 'swal-container-on-top'  // Custom class for the container
      }
    });
  }

  public toFormGroup(questions: FieldConfig[]): FormGroup {
    const group: any = {};
    questions.forEach((question: FieldConfig) => {
      const control = new FormControl(question.value || '', this.bindValidations(question.validations));
      // Disable if readonly is true;
      if (question.readonly) control.disable();

      group[question.key] = control;
    });
    return new FormGroup(group);
  }

  private bindValidations(validations: any) {
    if (validations && validations.length > 0) {
      const validators: any = [];
      validations.forEach((row: any) => {
        switch (row.name) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'nullValidator':
            validators.push(Validators.nullValidator);
            break;
          case 'pattern':
            validators.push(Validators.pattern(row.validator));
            break;
          case 'min':
            validators.push(Validators.min(row.validator));
            break;
          case 'max':
            validators.push(Validators.max(row.validator));
            break;
          case 'minlength':
            validators.push(Validators.minLength(row.validator));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(row.validator));
            break;
          case 'email':
            validators.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'));
            break;
        }
      });

      return Validators.compose(validators);
    }
    return null;
  }

}
