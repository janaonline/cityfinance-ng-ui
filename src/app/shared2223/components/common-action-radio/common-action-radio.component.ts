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
  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor() { }

  value: '' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING';

  get canShow() {
    return !!this.value;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(value: '' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING'): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
