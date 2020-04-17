import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

export interface IFinancialDataUploadInputComponent {
  formGroupName: string,
  // status?: 'completeness' | 'correctness',
  // messageFormControlKey?: string,
  title: string,
  required: boolean,
  formGroup: FormGroup,

}

@Component({
  selector: 'app-finance-data-upload-input',
  templateUrl: './finance-data-upload-input.component.html',
  styleUrls: ['./finance-data-upload-input.component.scss']
})
export class FinanceDataUploadInputComponent implements OnInit {
  @Input('config') config: IFinancialDataUploadInputComponent;
  @Output('fileButtonClicked') fileButtonClicked: EventEmitter<string[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log(this.config.formGroup.get(this.config.formGroupName).value);
  }


  handleFileChange(strings: string[], file: File) {
    this.config.formGroup.get(strings).setValue(file);
    if (strings[1] == 'file_pdf') {
      const formControl = this.config.formGroup.get(strings);
      if (!file.type.includes('pdf')) {
        return formControl.setErrors(['Invalid File Type']);
      } else {
        formControl.setErrors(null);
      }
    }
    if (strings[1] == 'file_excel') {
      const formControl = this.config.formGroup.get(strings);
      if (!new RegExp(/.*\.(xlsx|xls|csv)/g).test(file.name)) {
        return formControl.setErrors(['Invalid File Type']);
      } else {
        formControl.setErrors(null);
      }
    }
  }

}
