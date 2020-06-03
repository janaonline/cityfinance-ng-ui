import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

@Component({
  selector: "app-user-charges",
  templateUrl: "./user-charges.component.html",
  styleUrls: ["./user-charges.component.scss"],
})
export class UserChargesComponent implements OnInit {
  @Output()
  answer: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  @Output()
  previous: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  questionForm: FormGroup;

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

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit() {}

  showconfirmationDialog() {
    const dailogboxx = this._dialog.open(DialogComponent, {
      data: this.defaultDailogConfiuration,
    });
    // dailogboxx.afterClose;d()
  }
  private initializeForm() {
    this.questionForm = this._fb.group({
      Byelaws_UC_A: [""],
      Existing_Status_Yes_UC_A: [""],
      Relevant_Section_UC_A: [""],
      State_Approval_UC_A: [""],
      Action_Date_UC_A: [""],
      Existing_Status_No_UC_A: [""],
      Implement_Plan_UC_A: [""],
      Implement_Date_UC_A: [""],
      Periodic_Increase_UC_B: [""],
      Existing_Status_Yes_UC_B: [""],
      Relevant_Section_UC_B: [""],
      State_Approval_UC_B: [""],
      Action_Date_UC_B: [""],
      Existing_Status_No_UC_B: [""],
      Implement_Plan_UC_B: [""],
      Implement_Date_UC_B: [""],
    });
  }
}
