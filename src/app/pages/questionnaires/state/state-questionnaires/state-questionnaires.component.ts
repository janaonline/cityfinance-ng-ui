import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
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
  canGoToDonePage = true;
  canSeeIntroduction = true;

  userData: { state: string; role: USER_TYPE };
  stateList: any[];
  showLoader = true;
  userHasAlreadyFilledForm = false;

  accessValidator = new AccessChecker();

  constructor(
    private _questionnaireService: QuestionnaireService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      try {
        this.userData = JSON.parse(localStorage.getItem("userData"));
        const id =
          params && params.stateId ? params.stateId : this.userData.state;
        this.validateUserAccess({ stateId: id });
      } catch (error) {
        console.error(error);
      }
    });
  }

  fetchQuestionnaireData(stateId: string) {
    this._questionnaireService
      .getQuestionnaireData(stateId)
      .subscribe((res) => {
        this.userHasAlreadyFilledForm = this.hasUserAlreadyFilledForm(res);

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

  private validateUserAccess(params: { stateId: string }) {
    const userRole: USER_TYPE = this.userData.role;

    const canUserFillQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.FORM_FILL,
    });
    const canUserViewFilledQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.VIEW,
    });
    if (userRole !== USER_TYPE.STATE && (!params || !params.stateId)) {
      if (canUserViewFilledQuestionnaireForm) {
        return this.router.navigate(["/questionnaires/states"]);
      }
      return this.router.navigate(["/home"]);
    }

    if (canUserFillQuestionnaireForm || canUserViewFilledQuestionnaireForm) {
      return this.fetchQuestionnaireData(params.stateId);
    }
  }

  private setComponentStateToAlreadyFilled(
    res: IQuestionnaireResponse["data"][0]
  ) {
    this.userHasAlreadyFilledForm = true;
    this.propertyTaxData = res.propertyTax;
    this.UserChargesData = res.userCharges;
    this.editable = false;
    this.canGoToDonePage = false;
    this.canSeeIntroduction = false;
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
