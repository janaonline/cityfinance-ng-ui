import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

import { QuestionsIdMapping, userChargesForm } from '../configs/user-charges.config';

@Component({
  selector: "app-user-charges",
  templateUrl: "./user-charges.component.html",
  styleUrls: ["./user-charges.component.scss"],
})
export class UserChargesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any;
  @Input() editable: boolean;
  @Input() shouldGoToNext = true;
  @Input() showErroredQuestions = false;

  @Output()
  answer: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  @Output()
  previous: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  questionForm: FormGroup;
  todayDate = new Date();

  defaultDailogConfiuration: IDialogConfiguration = {
    message:
      "This is the last step. After submitting, You will not be allowed to change any answer. <br>Do you want to continue?",
    buttons: {
      confirm: {
        text: "Yes",
        callback: () => {
          this.answer.emit(this.questionForm.value);
          this._dialog.closeAll();
        },
      },
      cancel: { text: "NO" },
    },
  };

  clickedonNext = false;
  QuestionsIdMapping = QuestionsIdMapping;

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit() {
    this.questionForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        Object.keys(this.questionForm.controls).forEach((key) => {
          const control = this.questionForm.controls[key];
          control.updateValueAndValidity();
        });
      });
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

  onClickNext() {
    // this.clickedonNext = true;
    // if (this.questionForm.invalid) {
    //   this.showErroredQuestions = true;
    //   return;
    // }
    // // if (this.editable) {
    // //   return this.showconfirmationDialog();
    // // }
    return this.answer.emit(this.questionForm.value);
  }

  public GetFormControlErrors(controlName: string) {
    return !!(
      this.showErroredQuestions &&
      this.questionForm.controls[controlName].errors
    )
      ? this.questionForm.controls[controlName].errors
      : null;
  }

  showconfirmationDialog() {
    const dailogboxx = this._dialog.open(DialogComponent, {
      data: this.defaultDailogConfiuration,
    });
    // dailogboxx.afterClose;d()
  }
  private initializeForm() {
    this.questionForm = userChargesForm;
  }

  ngOnDestroy(): void {
    // this.questionForm.reset();
    // this.questionForm.enable();
    // console.log(`ngOnDestroy`);
  }
}
