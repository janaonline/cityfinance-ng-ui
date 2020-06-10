import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatHorizontalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IQuestionnaireResponse } from '../../model/questionnaireResponse.interface';
import { QuestionnaireService } from '../../service/questionnaire.service';
import { documentForm } from '../configs/document.config';
import { propertyTaxForm } from '../configs/property-tax.cofig';
import { userChargesForm } from '../configs/user-charges.config';

@Component({
  selector: "app-state-questionnaires",
  templateUrl: "./state-questionnaires.component.html",
  styleUrls: ["./state-questionnaires.component.scss"],
})
export class StateQuestionnairesComponent implements OnInit, OnDestroy {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  @ViewChild("savingAsDraft") savingAsDraftPopup: TemplateRef<any>;
  draftSavingInProgess = false;
  introductionCompleted = false;
  propertyTaxData: IQuestionnaireResponse["data"][0]["propertyTax"];
  UserChargesData: IQuestionnaireResponse["data"][0]["userCharges"];
  documentData: IQuestionnaireResponse["data"][0]["documents"];

  finalData = {
    propertyTax: null,
    userCharges: null,
    documents: null,
    isCompleted: true,
  };
  editable = true;
  canGoToDonePage = true;
  canSeeIntroduction = true;

  userData: { state: string; role: USER_TYPE; name: string };
  USER_TYPE = USER_TYPE;
  // stateList: any[];
  showLoader = true;
  userHasAlreadyFilledForm = false;

  accessValidator = new AccessChecker();

  currentStateId;

  window = window;

  stateName: string;

  expandPropertyTaxQuestion = false;
  expandUserChargesQuestion = false;
  showPreview = false;

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "",
    buttons: {
      cancel: { text: "OK" },
    },
  };

  previewConfig: MatDialogConfig = {
    width: "65vw",
    height: "70vh",
  };

  constructor(
    private _questionnaireService: QuestionnaireService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      try {
        this.userData = JSON.parse(localStorage.getItem("userData"));
        const id =
          params && params.stateId ? params.stateId : this.userData.state;
        this.currentStateId = id;
        this.validateUserAccess({ stateId: id });
      } catch (error) {
        console.error(error);
      }
    });
  }

  fetchQuestionnaireData(stateId: string) {
    this._questionnaireService.getQuestionnaireData(stateId).subscribe(
      (res) => {
        this.stateName = res ? res.stateName : "Not Available";
        this.userHasAlreadyFilledForm = this.hasUserAlreadyFilledForm(res);

        if (this.userHasAlreadyFilledForm) {
          this.setComponentStateToAlreadyFilled(res, true);
        } else {
          this.propertyTaxData = res.propertyTax;
          this.UserChargesData = res.userCharges;
          this.documentData = res.documents;
        }

        this.validateQuestionnaireFillAccess();
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
        setTimeout(() => {
          this.stepper.selectedIndex = 3;
        }, 222);
      }
    );
  }

  setIntroductionCompleted(value: boolean) {
    this.introductionCompleted = value;
    this.stepper.next();
  }

  onCompletingPropertyTax(value: { [key: string]: string }, isValid: boolean) {
    this.finalData.propertyTax = value;
    this.stepper.next();
  }

  onCompletingUserCharges(value: { [key: string]: string }) {
    this.finalData.userCharges = value;
    this.stepper.next();
  }

  onFileUploaded(value: { [key: string]: string }) {
    this.stepper.next();

    if (this.userHasAlreadyFilledForm) {
      return;
    }
    this.finalData.documents = { ...value };
  }

  saveAsDraft() {
    this.draftSavingInProgess = true;
    if (this.userHasAlreadyFilledForm) return false;
    const obj = {
      documents: documentForm.value,
      propertyTax: propertyTaxForm.value,
      userCharges: userChargesForm.value,
      isCompleted: false,
    };

    if (this.userData.role !== USER_TYPE.STATE) {
      obj["state"] = this.currentStateId;
    }
    this._matDialog.open(this.savingAsDraftPopup, {
      width: "35vw",
      height: "fit-content",
    });
    this._questionnaireService.saveQuestionnaireData(obj).subscribe((res) => {
      this.draftSavingInProgess = false;
      setTimeout(() => {
        this._matDialog.closeAll();
      }, 3000);
    });
  }

  uploadCompletedQuestionnaireData() {
    if (this.userHasAlreadyFilledForm) {
      return;
    }
    try {
      this.validatorQuestionnaireForms();
    } catch (error) {
      return;
    }

    const obj = {
      documents: documentForm.value,
      propertyTax: propertyTaxForm.value,
      userCharges: userChargesForm.value,
      isCompleted: true,
    };
    if (this.userData.role !== USER_TYPE.STATE) {
      obj["state"] = this.currentStateId;
    }
    this.userHasAlreadyFilledForm = true;
    this.editable = false;
    this.setComponentStateToAlreadyFilled(
      {
        ...obj,
        stateName: this.stateName,
      },
      false
    );
    this._questionnaireService
      .saveQuestionnaireData(obj)
      .subscribe((res) => {}, console.error);
  }

  validatorQuestionnaireForms() {
    let message = "";
    if (propertyTaxForm.valid && userChargesForm.valid && documentForm.valid) {
      return true;
    }
    if (!propertyTaxForm.valid) {
      message = "All questions must be answered in Property Tax";
      this.expandPropertyTaxQuestion = true;
      this.stepper.selectedIndex = 1;
    }

    if (!userChargesForm.valid) {
      message += message
        ? " and User Charges sections."
        : "All questions must be answered in answered in User Charges section";
      this.expandUserChargesQuestion = true;
      if (propertyTaxForm.valid) {
        this.stepper.selectedIndex = 2;
      }
    }

    if (documentForm.invalid) {
      message += message
        ? " And mandatory documents must be uploaded in Upload Documents section."
        : "All mandatory documents must be uploaded in Upload Document section.";
      if (propertyTaxForm.valid && userChargesForm.valid) {
        this.stepper.selectedIndex = 3;
      }
    }
    message += " Kindly submit the form once completed.";
    this._matDialog.open(DialogComponent, {
      data: { ...this.defaultDailogConfiuration, message },
      width: "25vw",
    });
    throw message;
  }

  showPropertyTax() {
    this.stepper.selectedIndex = 1;
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
      console.error(`access denied!`);

      return this.router.navigate(["/home"]);
    }

    if (canUserFillQuestionnaireForm || canUserViewFilledQuestionnaireForm) {
      return this.fetchQuestionnaireData(params.stateId);
    }
  }

  private validateQuestionnaireFillAccess() {
    const canUserFillQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.FORM_FILL,
    });

    if (!canUserFillQuestionnaireForm) {
      console.error(`access denied!`);
      return this.router.navigate(["/home"]);
    }
  }

  private setComponentStateToAlreadyFilled(
    res: IQuestionnaireResponse["data"][0],
    showPreviw?: boolean
  ) {
    this.userHasAlreadyFilledForm = true;
    this.propertyTaxData = res.propertyTax;
    this.UserChargesData = res.userCharges;
    this.documentData = res.documents;
    propertyTaxForm.patchValue({ ...this.propertyTaxData });
    userChargesForm.patchValue({ ...this.UserChargesData });
    documentForm.patchValue({ ...this.documentData });
    this.editable = false;
    this.canGoToDonePage = false;
    this.canSeeIntroduction = false;
    this.showPreview =
      showPreviw !== null && showPreviw !== undefined
        ? showPreviw
        : this.showPreview;
  }

  private hasUserAlreadyFilledForm(res: IQuestionnaireResponse["data"][0]) {
    const util = new JSONUtility();
    return res && res.isCompleted;
    // return res &&
    //   (util.filterEmptyValue(res.propertyTax) ||
    //     util.filterEmptyValue(res.userCharges))
    //   ? true
    //   : false;
  }

  ngOnDestroy(): void {}
}
