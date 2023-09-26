import { Component, EventEmitter, forwardRef, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PmuRejectionPopupComponent } from '../pmu-rejection-popup/pmu-rejection-popup.component';

@Component({
  selector: 'app-common-action-radio',
  templateUrl: './common-action-radio.component.html',
  styleUrls: ['./common-action-radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CommonActionRadioComponent)
  }]
})
export class CommonActionRadioComponent implements ControlValueAccessor {
  @Output() onRejectReasonChange = new EventEmitter<any>();
  @Output() onReject = new EventEmitter<any>();

  @Input() formFieldType: string;
  @Input() disabled: boolean = false;
  @Input() rejectReason: FormControl;
  @Input() suggestedValue: FormControl;
  @Input() isInvalid: boolean;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() canSuggestValue: boolean = false;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(
    private matDialog: MatDialog
  ) { }

  status: '' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING';

  get canShow() {
    if (this.disabled) return ['APPROVED', 'REJECTED'].includes(this.status)
    return !!this.status;
  }

  writeValue(value: any): void {
    this.status = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateStatus(value: '' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING'): void {
    if (this.disabled) return;
    if (value == 'REJECTED') return this.openRejectionDialog();
    this.status = value;
    this.onChange(value);
    this.onTouched();
  }

  openRejectionDialog() {
    const dialog = this.matDialog.open(PmuRejectionPopupComponent, {
      data: {
        title: this.title,
        subTitle: this.subTitle,
        canSuggestValue: this.canSuggestValue,
        suggestedValue: this.suggestedValue?.value,
        rejectReason: this.rejectReason?.value,
        formFieldType: this.formFieldType
      },
      width: '500px'
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.onReject.emit(res);
      } 
    })
  }

}
