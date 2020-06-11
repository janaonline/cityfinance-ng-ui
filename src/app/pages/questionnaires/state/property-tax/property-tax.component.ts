import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { propertyTaxForm, QuestionsIdMapping } from '../configs/property-tax.cofig';

@Component({
  selector: "app-property-tax",
  templateUrl: "./property-tax.component.html",
  styleUrls: ["./property-tax.component.scss"],
})
export class PropertyTaxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any;
  @Input() editable: boolean;
  @Input() shouldGoToPrevious = true;
  @Input() showErroredQuestions = false;

  @Output()
  answer: EventEmitter<{
    [key: string]: string;
  }> = new EventEmitter();
  @Output() previous: EventEmitter<{
    [key: string]: string;
  }> = new EventEmitter();
  questionForm: FormGroup;

  todayDate = new Date();

  clickedonNext = false;

  QuestionsIdMapping = QuestionsIdMapping;

  constructor(private _fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnChanges(changes: { data: SimpleChange; editable: SimpleChange }) {
    if (changes.data && changes.data.currentValue) {
      this.questionForm.patchValue({ ...changes.data.currentValue });
    }

    if (changes.editable && !changes.editable.currentValue) {
      if (changes.data) {
        this.questionForm.patchValue({ ...this.data });
      }
      this.questionForm.disable();
    }
  }

  ngOnInit() {}

  onClickNext() {
    this.answer.emit(this.questionForm.value);
  }

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.showErroredQuestions &&
      this.questionForm.controls[controlName].errors
    )
      ? this.questionForm.controls[controlName].errors
      : null;
  }

  private initializeForm() {
    this.questionForm = propertyTaxForm;
  }

  ngOnDestroy(): void {
    // this.questionForm.reset();
    // this.questionForm.enable();
  }
}
