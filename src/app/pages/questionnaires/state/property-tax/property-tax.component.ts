import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-property-tax",
  templateUrl: "./property-tax.component.html",
  styleUrls: ["./property-tax.component.scss"],
})
export class PropertyTaxComponent implements OnInit {
  @Output()
  answer: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  @Output()
  previous: EventEmitter<{ [key: string]: string }> = new EventEmitter();
  questionForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {}

  private initializeForm() {
    this.questionForm = this._fb.group({
      Act_Linking_PT_A: [""],
      Existing_Status_PT_A: [""],
      Relevent_Sections_PT_A: [""],
      Legislative_Changes_PT_A: [""],
      Action_Date_PT_A: [""],
      Relevent_Sections_No_PT_A: [""],
      Adoption_Plan_PT_A: [""],
      Implement_Date_PT_A: [""],
      Periodic_Increase_PT_B: [""],
      Existing_Status_Yes_PT_B: [""],
      Relevent_Sections_PT_B: [""],
      Legislative_Changes_PT_B: [""],
      Action_Date_PT_B: [""],
      Existing_Status_No_PT_B: [""],
      Implement_Plan_PT_B: [""],
      Implement_Date_PT_B: [""],
    });
  }
}
