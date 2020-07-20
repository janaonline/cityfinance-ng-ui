import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface IFinancialDataUploadInputComponent {
  formGroupName: string;
  // status?: 'completeness' | 'correctness',
  // messageFormControlKey?: string,
  title: string;
  required: boolean;
  formGroup: FormGroup;
  disabled?: boolean;
  canRemoveFile?: boolean;
}

@Component({
  selector: "app-finance-data-upload-input",
  templateUrl: "./finance-data-upload-input.component.html",
  styleUrls: ["./finance-data-upload-input.component.scss"],
})
export class FinanceDataUploadInputComponent implements OnInit, OnChanges {
  @Input("config") config: IFinancialDataUploadInputComponent;
  @Output("fileButtonClicked") fileButtonClicked: EventEmitter<
    string[]
  > = new EventEmitter();

  @ViewChild("balanceSheetCSV") balanceSheetCSV: ElementRef;
  @ViewChild("balanceSheetPdf") balanceSheetPdf: ElementRef;

  canDeleteNonMandatoryFile = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (
      !this.config.required &&
      !this.config.disabled &&
      this.config.canRemoveFile
    ) {
      this.canDeleteNonMandatoryFile = true;
    }
  }

  handleFileChange(strings: string[], file: File) {
    this.config.formGroup.get(strings).setValue(file);
    if (strings[1] == "file_pdf") {
      const formControl = this.config.formGroup.get(strings);
      if (!file.type.includes("pdf")) {
        return formControl.setErrors(["Invalid File Type"]);
      } else {
        formControl.setErrors(null);
      }
    }
    if (strings[1] == "file_excel") {
      const formControl = this.config.formGroup.get(strings);
      if (!new RegExp(/.*\.(xlsx|xls|csv)/g).test(file.name)) {
        return formControl.setErrors(["Invalid File Type"]);
      } else {
        formControl.setErrors(null);
      }
    }
  }

  removeFiles(strings: string[], type: "pdf" | "excel") {
    this.config.formGroup.get(strings).setValue(null);
    this.config.formGroup.get(strings).updateValueAndValidity();
    if (type == "pdf") {
      this.balanceSheetPdf.nativeElement.value = null;
    } else {
      this.balanceSheetCSV.nativeElement.value = null;
    }
  }
}
