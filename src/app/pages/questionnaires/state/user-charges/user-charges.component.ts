import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

@Component({
  selector: "app-user-charges",
  templateUrl: "./user-charges.component.html",
  styleUrls: ["./user-charges.component.scss"],
})
export class UserChargesComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() editable: boolean;

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

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit() {
    this.questionForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => console.log(this.questionForm));
  }

  ngOnChanges(changes: { data: SimpleChange; editable: SimpleChange }) {
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
    if (this.editable) {
      return this.showconfirmationDialog();
    }
    return this.answer.emit(this.questionForm.value);
  }

  showconfirmationDialog() {
    const dailogboxx = this._dialog.open(DialogComponent, {
      data: this.defaultDailogConfiuration,
    });
    // dailogboxx.afterClose;d()
  }
  private initializeForm() {
    this.questionForm = this._fb.group({
      Byelaws_UC_A: ["", [Validators.required]],
      Existing_Status_Yes_UC_A: ["", [this.Existing_Status_Yes_UC_A_Validator]],
      Relevant_Section_UC_A: ["", [this.Relevant_Section_UC_A_Validator]],
      State_Approval_UC_A: ["", [this.State_Approval_UC_A_Validator]],
      Action_Date_UC_A: [null, [this.Action_Date_UC_A_Validator]],
      Existing_Status_No_UC_A: ["", [this.Existing_Status_No_UC_A_Validator]],
      Implement_Plan_UC_A: ["", [this.Implement_Plan_UC_A_Validator]],
      Implement_Date_UC_A: [null, [this.Implement_Date_UC_A_Validator]],
      Periodic_Increase_UC_B: ["", [this.Periodic_Increase_UC_B_Validator]],
      Existing_Status_Yes_UC_B: ["", [this.Existing_Status_Yes_UC_B_Validator]],
      Relevant_Section_UC_B: ["", [this.Relevant_Section_UC_B_Validator]],
      State_Approval_UC_B: ["", [this.State_Approval_UC_B_Validator]],
      Action_Date_UC_B: [null, [this.Action_Date_UC_B_Validator]],
      Existing_Status_No_UC_B: ["", [this.Existing_Status_No_UC_B_Validator]],
      Implement_Plan_UC_B: ["", [this.Implement_Plan_UC_B_Validator]],
      Implement_Date_UC_B: [null, [this.Implement_Date_UC_B_Validator]],
    });
  }

  private Existing_Status_Yes_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Relevant_Section_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private State_Approval_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Action_Date_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value) {
      return null;
    }

    return { required: true };
  };

  private Existing_Status_No_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Plan_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Date_UC_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value) {
      return null;
    }

    return { required: true };
  };

  private Periodic_Increase_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Byelaws_UC_A;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Existing_Status_Yes_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Relevant_Section_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private State_Approval_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Action_Date_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value) {
      return null;
    }

    return { required: true };
  };

  private Existing_Status_No_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Plan_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Date_UC_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_UC_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value) {
      return null;
    }

    return { required: true };
  };
}
