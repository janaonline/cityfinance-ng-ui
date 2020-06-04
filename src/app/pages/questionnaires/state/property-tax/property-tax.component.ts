import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: "app-property-tax",
  templateUrl: "./property-tax.component.html",
  styleUrls: ["./property-tax.component.scss"],
})
export class PropertyTaxComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() editable: boolean;
  @Output()
  answer: EventEmitter<{
    [key: string]: string;
  }> = new EventEmitter();
  @Output() previous: EventEmitter<{
    [key: string]: string;
  }> = new EventEmitter();
  questionForm: FormGroup;

  todayDate = new Date();
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

  ngOnInit() {
    this.questionForm.valueChanges
      .pipe(debounceTime(1111))
      .subscribe((value) => console.log(this.questionForm));
  }

  private initializeForm() {
    this.questionForm = this._fb.group({
      Act_Linking_PT_A: ["", [Validators.required]],
      Existing_Status_PT_A: ["", [this.Existing_Status_PT_A_Validator]],
      Relevent_Sections_PT_A: ["", [this.Relevent_Sections_PT_A_Validator]],
      Legislative_Changes_PT_A: ["", [this.Legislative_Changes_PT_A_Validator]],
      Action_Date_PT_A: [null, [this.Action_Date_PT_A_Validator]],
      Relevent_Sections_No_PT_A: [
        "",
        [this.Relevent_Sections_No_PT_A_Validator],
      ],
      Adoption_Plan_PT_A: ["", [this.Adoption_Plan_PT_A_Validator]],
      Implement_Date_PT_A: [null, [this.Implement_Date_PT_A_Validator]],
      Periodic_Increase_PT_B: ["", [Validators.required]],
      Existing_Status_Yes_PT_B: ["", [this.Existing_Status_Yes_PT_B_Validator]],
      Relevent_Sections_PT_B: ["", [this.Relevent_Sections_PT_B_Validator]],
      Legislative_Changes_PT_B: ["", [this.Legislative_Changes_PT_B_Validator]],
      Action_Date_PT_B: ["", [this.Action_Date_PT_B_Validator]],
      Existing_Status_No_PT_B: ["", [this.Existing_Status_No_PT_B_Validator]],
      Implement_Plan_PT_B: ["", [this.Implement_Plan_PT_B_Validator]],
      Implement_Date_PT_B: [null, [this.Implement_Date_PT_B_Validator]],
    });
  }

  private Existing_Status_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Relevent_Sections_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Legislative_Changes_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Action_Date_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }

    if (control.value) {
      return null;
    }

    return { required: true };
  };

  private Relevent_Sections_No_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Adoption_Plan_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Date_PT_A_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Act_Linking_PT_A;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }

    if (control.value) {
      return null;
    }

    return { required: true };
  };

  private Existing_Status_Yes_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Relevent_Sections_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "Yes") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Legislative_Changes_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Action_Date_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    console.log(`Action_Date_PT_B `, control.value);

    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Existing_Status_No_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Plan_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };

  private Implement_Date_PT_B_Validator = (control: AbstractControl) => {
    if (!this.questionForm) {
      return null;
    }

    const dependentControl = this.questionForm.controls.Periodic_Increase_PT_B;

    if (!dependentControl || dependentControl.value !== "No") {
      return null;
    }
    if (control.value && control.value.trim()) {
      return null;
    }

    return { required: true };
  };
}
