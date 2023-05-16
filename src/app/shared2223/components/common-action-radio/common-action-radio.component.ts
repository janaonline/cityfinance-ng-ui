import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() disabled: boolean = false;
  @Input() rejectReason: string;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor() { }

  status: '' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING';

  get canShow() {
    if(this.disabled) return ['APPROVED', 'REJECTED'].includes(this.status)
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
    if(this.disabled) return;
    this.status = value;
    this.onChange(value);
    this.onTouched();
  }

  rejectReasonChange({ target: { value }}) {
    this.onRejectReasonChange.emit(value);
  }

}
