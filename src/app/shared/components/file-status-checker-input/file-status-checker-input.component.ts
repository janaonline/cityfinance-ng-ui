import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { FinancialDataService } from '../../../users/services/financial-data.service';
import { UPLOAD_STATUS } from '../../../util/enums';

export interface IFileStatusCheckerInputComponent {
  formGroupName: string;
  status: "completeness" | "correctness";
  messageFormControlKey: string;
  formGroup: FormGroup;
}

@Component({
  selector: "app-file-status-checker-input",
  templateUrl: "./file-status-checker-input.component.html",
  styleUrls: ["./file-status-checker-input.component.scss"],
})
export class FileStatusCheckerInputComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input("config") config: IFileStatusCheckerInputComponent;
  @Output("fileButtonClicked") fileButtonClicked: EventEmitter<
    string[]
  > = new EventEmitter();
  showMessageInput = false;
  disableButton = false;
  buttonTextSuffix = "View";
  pdfLink: string;
  excelLink: string;

  constructor(private financialDataService: FinancialDataService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    const value = this.config.formGroup.get([
      this.config.formGroupName,
      this.config.status,
    ]).value;
    const fileValue = this.financialDataService.selectedFinancialRequest[
      this.config.formGroupName
    ];
    if (fileValue) {
      const { pdfUrl, excelUrl } = fileValue;
      this.pdfLink = pdfUrl && pdfUrl.trim() ? pdfUrl : null;
      this.excelLink = excelUrl && excelUrl.trim() ? excelUrl : null;
      if (!(pdfUrl || excelUrl)) {
        this.disableButton = true;
        this.buttonTextSuffix = "";
      }
    }

    if (value) {
      this.showMessageInput = value.toUpperCase() === UPLOAD_STATUS.REJECTED;
      this.config.formGroup.updateValueAndValidity();
    }
    const formControlValueObserver = this.config.formGroup.get([
      this.config.formGroupName,
      this.config.status,
    ]).valueChanges;
    formControlValueObserver.subscribe((value) => {
      if (value) {
        this.showMessageInput = value.toUpperCase() === UPLOAD_STATUS.REJECTED;
        this.config.formGroup.updateValueAndValidity();
      }
    });
  }

  fileButtonClickHandler(formGroupNameKey: string, fileUrl: string) {
    this.fileButtonClicked.emit([formGroupNameKey, fileUrl]);
  }

  radioButtonClickHandler(event: Event) {
    const formControlValue = this.config.formGroup.get([
      this.config.formGroupName,
      this.config.status,
    ]).value;
    this.showMessageInput =
      formControlValue &&
      formControlValue.toUpperCase() === UPLOAD_STATUS.REJECTED;
    this.setMessageInputValidators(formControlValue);
    this.config.formGroup.updateValueAndValidity();
  }

  setMessageInputValidators(radioFormControlValue: UPLOAD_STATUS) {
    this.config.formGroup
      .get([this.config.formGroupName, this.config.messageFormControlKey])
      .reset();
    if (radioFormControlValue === UPLOAD_STATUS.REJECTED) {
      this.config.formGroup
        .get([this.config.formGroupName, this.config.messageFormControlKey])
        .setValidators([Validators.required]);
      this.config.formGroup
        .get([this.config.formGroupName, this.config.messageFormControlKey])
        .updateValueAndValidity();
      return;
    }
    this.config.formGroup
      .get([this.config.formGroupName, this.config.messageFormControlKey])
      .clearValidators();
    this.config.formGroup
      .get([this.config.formGroupName, this.config.messageFormControlKey])
      .updateValueAndValidity();
  }

  ngAfterViewInit(): void {}
}
