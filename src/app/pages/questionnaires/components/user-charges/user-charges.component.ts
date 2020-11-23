import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { USER_TYPE } from 'src/app/models/user/userType';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

import {
  QuestionsIdMapping as StateQuestionsIdMapping,
  userChargesForm as StateuserChargesForm
} from '../../state/configs/user-charges.config';
import {
  QuestionsIdMapping as ULBQuestionsIdMapping,
  userChargesForm as ULBuserChargesForm
} from '../../ulb/configs/user-charges.config';

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

  @Input()
  userType: USER_TYPE;

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
  QuestionsIdMapping;

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {}

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
    this.initializeForm();
    console.log(changes);

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
  }
  private initializeForm() {
    switch (this.userType) {
      case USER_TYPE.STATE:
        this.QuestionsIdMapping = StateQuestionsIdMapping;
        this.questionForm = StateuserChargesForm;
        return;
      case USER_TYPE.ULB:
        this.QuestionsIdMapping = ULBQuestionsIdMapping;
        this.questionForm = ULBuserChargesForm;
    }
  }

  ngOnDestroy(): void {
    // this.questionForm.reset();
    // this.questionForm.enable();
    // console.log(`ngOnDestroy`);
  }
}
