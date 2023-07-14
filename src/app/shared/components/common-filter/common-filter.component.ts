import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export interface FormField {
  id: string;
  type: 'select' | 'text' | 'number';
  label: string;
  value: string;
  placeholder: string;
  options?: {
    label: string;
    id: string;
    disabled?: boolean;
  }[]
}

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss']
})
export class CommonFilterComponent implements OnInit {

  @Input() fields: FormField[] = [];
  @Output() onUpdate = new EventEmitter();

  form: FormArray;

  constructor(
    private fb: FormBuilder,
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.array(this.fields.map(field => this.fb.group({
      ...field,
      ...(field.options && { options: this.fb.array(field.options.map(option => this.fb.group({ ...option }))) })
    })));
  }

  onSubmit() {
    const payload = this.form.value.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {})
    this.onUpdate.emit(payload);
  }
  
  onReset() {
    this.onUpdate.emit();
  }
}
