import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { USER_TYPE } from 'src/app/models/user/userType';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IQuestionnaireResponse } from '../../model/questionnaireResponse.interface';
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

  finalData = {
    propertyTax: null,
    userCharges: null,
  };
  editable = true;

  userData: { state: string; role: USER_TYPE };
  stateList: any[];
  showLoader = true;
  userHasAlreadyFilledForm = false;

  constructor(private _questionnaireService: QuestionnaireService) {}

  ngOnInit() {
    try {
      this.userData = JSON.parse(localStorage.getItem("userData"));
      const userRole: USER_TYPE = this.userData.role;
      console.log(userRole);
      switch (userRole) {
        case USER_TYPE.STATE:
          this.fetchQuestionnaireData();
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchQuestionnaireData() {
    this._questionnaireService
      .getQuestionnaireData(this.userData.state)
      .subscribe((res) => {
        this.userHasAlreadyFilledForm = this.hasUserAlreadyFilledForm(res);
        console.log(
          `userHasAlreadyFilledForms: ${this.userHasAlreadyFilledForm}`
        );

        if (this.userHasAlreadyFilledForm) {
          this.setComponentStateToAlreadyFilled(res);
        }
        this.showLoader = false;
      });
  }

  setIntroductionCompleted(value: boolean) {
    this.introductionCompleted = value;
    this.stepper.next();
  }

  onCompletingPropertyTax(value: { [key: string]: string }) {
    console.log(`property tax completed`, value);
    this.finalData.propertyTax = value;
    this.stepper.next();
  }

  onCompletingUserCharges(value: { [key: string]: string }) {
    this.finalData.userCharges = value;
    this.stepper.next();
    this.editable = false;
    if (this.userHasAlreadyFilledForm) {
      return;
    }
    this._questionnaireService
      .saveQuestionnaireData(this.finalData)
      .subscribe((res) => {
        this.userHasAlreadyFilledForm = true;
        console.log(res);
      });
  }

  showPropertyTax() {
    this.stepper.selectedIndex = 1;
    console.log(`showPropertyTax`);
  }

  private setComponentStateToAlreadyFilled(
    res: IQuestionnaireResponse["data"][0]
  ) {
    this.userHasAlreadyFilledForm = true;
    this.propertyTaxData = res.propertyTax;
    this.UserChargesData = res.userCharges;
    this.editable = false;
  }

  private hasUserAlreadyFilledForm(res: IQuestionnaireResponse["data"][0]) {
    const util = new JSONUtility();
    return res &&
      (util.filterEmptyValue(res.propertyTax) ||
        util.filterEmptyValue(res.userCharges))
      ? true
      : false;
  }
}
