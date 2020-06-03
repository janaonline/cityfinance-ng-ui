import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';

import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: "app-state-questionnaires",
  templateUrl: "./state-questionnaires.component.html",
  styleUrls: ["./state-questionnaires.component.scss"],
})
export class StateQuestionnairesComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  introductionCompleted = false;
  propertyTaxData: { [key: string]: string };
  UserChargesData: { [key: string]: string };

  constructor(private _questionnaireService: QuestionnaireService) {}

  ngOnInit() {}

  setIntroductionCompleted(value: boolean) {
    this.introductionCompleted = value;
    this.stepper.next();
  }

  onCompletingPropertyTax(value: { [key: string]: string }) {
    console.log(`property tax completed`, value);

    this.propertyTaxData = value;
    this.stepper.next();
  }

  onCompletingUserCharges(value: { [key: string]: string }) {
    console.log(`user charges completed`, value);
    this.UserChargesData = value;
    this.stepper.next();
  }
}
