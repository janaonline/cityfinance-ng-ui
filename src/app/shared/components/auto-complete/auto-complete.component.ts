import { Component, Input, OnInit, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => AutoCompleteComponent)
  }]
})
export class AutoCompleteComponent implements ControlValueAccessor {

  @Input() list: any[];
  @Input() displayName: string = 'name';
  searchControl = new FormControl();

  @Output() onSelect = new EventEmitter();

  private onChange: (value: any) => void;
  private onTouched: () => void;

  value: any;
  
  constructor() {
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

  updateValue(value: any): void {
    this.value = value;
    this.onSelect.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  filteredList = this.searchControl.valueChanges.pipe(
    // debounceTime(300),
    distinctUntilChanged(),
    map((searchTerm: string) => {
      if (!searchTerm) {
        return this.list;
      }
      return this.list.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    })
  );
}
