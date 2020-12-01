import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatHorizontalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { IQuestionnaireResponse } from '../../model/questionnaireResponse.interface';
import { QuestionnaireService } from '../../service/questionnaire.service';
import { documentForm } from '../configs/document.config';
import { userChargesForm } from '../configs/user-charges.config';

@Component({
  selector: "app-questionnaire",
  templateUrl: "./questionnaire.component.html",
  styleUrls: ["./questionnaire.component.scss"],
})
export class ULBQuestionnaireComponent implements OnInit, OnDestroy {
  constructor(
    private _questionnaireService: QuestionnaireService,
    private activatedRoute: ActivatedRoute,
    private _profileService: ProfileService,
    private router: Router,
    private _matDialog: MatDialog
  ) {}
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

  userData: { state: string; role: USER_TYPE; name: string; ulb: string };
  USER_TYPE = USER_TYPE;
  // stateList: any[];
  showLoader = true;
  userHasAlreadyFilledForm = false;

  accessValidator = new AccessChecker();

  currentULBId;

  window = window;

  ulbName: string;
  state: { [key: string]: any };

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

  saveAsDraftFailMessge: string;
  isULBProfileCompleted: boolean;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      try {
        this.userData = JSON.parse(localStorage.getItem("userData"));
        if (!this.userData) {
          return this.router.navigate(["/login"]);
        }

        const id = params && params.ulbId ? params.ulbId : this.userData.ulb;
        this.currentULBId = id;
        this.checkULBProfileCompleteStatus();
      } catch (error) {
        console.error(error);
      }
    });
  }

  checkULBProfileCompleteStatus() {
    this._profileService.isULBProfileCompleted().subscribe((res) => {
      console.log("isULBProfileCompleted", res);
      this.isULBProfileCompleted = res;
      if (!res) return;
      this.validateUserAccess({ ulbId: this.currentULBId });
    });
  }

  fetchQuestionnaireData(ulbId: string) {
    this._questionnaireService
      .getULBQuestionnaireData({ ulb: ulbId })
      .subscribe(
        (res) => {
          this.ulbName = res ? res.ulbName : this.userData.name;
          this.userHasAlreadyFilledForm = this.hasUserAlreadyFilledForm(res);

          if (this.userHasAlreadyFilledForm) {
            this.setComponentStateToAlreadyFilled(res, true);
          } else {
            this.UserChargesData = res ? res.userCharges : null;
            this.documentData = res ? res.documents : null;
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

  // onCompletingPropertyTax(value: { [key: string]: string }, isValid: boolean) {
  //   this.finalData.propertyTax = value;
  //   this.stepper.next();
  // }

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
    this.saveAsDraftFailMessge = null;
    this.draftSavingInProgess = true;
    if (this.userHasAlreadyFilledForm) return false;
    const obj = {
      documents: documentForm.value,
      userCharges: userChargesForm.value,
      isCompleted: false,
    };

    if (this.userData.role !== USER_TYPE.ULB) {
      obj["ulb"] = this.currentULBId;
    }
    this._matDialog.open(this.savingAsDraftPopup, {
      width: "35vw",
      height: "fit-content",
    });
    this._questionnaireService.saveULBQuestionnaireData(obj).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        setTimeout(() => {
          this._matDialog.closeAll();
        }, 3000);
      },
      (err) => {
        this.draftSavingInProgess = false;
        this.saveAsDraftFailMessge = err;
      }
    );
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
      userCharges: userChargesForm.value,
      isCompleted: true,
    };
    if (this.userData.role !== USER_TYPE.STATE) {
      obj["ulb"] = this.currentULBId;
    }
    this.userHasAlreadyFilledForm = true;
    this.editable = false;
    this.setComponentStateToAlreadyFilled(
      {
        ...obj,
        ulbName: this.ulbName,
      },
      false
    );
    this._questionnaireService.saveULBQuestionnaireData(obj).subscribe(
      (res) => {},
      (err) => console.error("sdadssad", err)
    );
  }

  validatorQuestionnaireForms() {
    let message = "";
    if (userChargesForm.valid && documentForm.valid) {
      return true;
    }

    if (!userChargesForm.valid) {
      message += message
        ? " and User Charges sections."
        : "All questions must be answered in answered in User Charges section";
      this.expandUserChargesQuestion = true;
      this.stepper.selectedIndex = 1;
    }

    if (documentForm.invalid) {
      message += message
        ? " And mandatory documents must be uploaded in Upload Documents section."
        : "All mandatory documents must be uploaded in Upload Document section.";
      if (userChargesForm.valid) {
        this.stepper.selectedIndex = 2;
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

  private validateUserAccess(params: { ulbId: string }) {
    const userRole: USER_TYPE = this.userData.role;

    const canUserFillQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.ULB_LEVEL_PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.FORM_FILL,
    });

    const canUserViewFilledQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.ULB_LEVEL_PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.VIEW,
    });

    if (userRole !== USER_TYPE.ULB && (!params || !params.ulbId)) {
      if (canUserViewFilledQuestionnaireForm) {
        // return this.router.navigate(["/questionnaires/states"]);
      }
      console.error(`access denied!`);

      return this.router.navigate(["/home"]);
    }

    if (canUserFillQuestionnaireForm || canUserViewFilledQuestionnaireForm) {
      const param = { id: params.ulbId };
      this._profileService.getULBGeneralData(param).subscribe((res) => {
        this.state = res["data"][0].state;
        console.log(this.state);
        return this.fetchQuestionnaireData(params.ulbId);
      });
    }
  }

  private validateQuestionnaireFillAccess() {
    const canUserFillQuestionnaireForm = this.accessValidator.hasAccess({
      moduleName: MODULES_NAME.ULB_LEVEL_PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.FORM_FILL,
    });

    if (!canUserFillQuestionnaireForm) {
      const canUserViewQuestionnaireForm = this.accessValidator.hasAccess({
        moduleName: MODULES_NAME.ULB_LEVEL_PROPERTY_TAX_QUESTIONNAIRE,
        action: ACTIONS.VIEW,
      });
      if (!canUserViewQuestionnaireForm) {
        console.error(`access denied!`);
        return this.router.navigate(["/home"]);
      }
      this.editable = false;
      userChargesForm.disable();
      documentForm.disable();
      return;
    }
    this.editable = true;
    userChargesForm.enable();
    documentForm.enable();
  }

  private setComponentStateToAlreadyFilled(
    res: IQuestionnaireResponse["data"][0],
    showPreviw?: boolean
  ) {
    console.log(`setComponentStateToAlreadyFilled`, res, showPreviw);
    this.userHasAlreadyFilledForm = true;
    // this.propertyTaxData = res.propertyTax;
    this.UserChargesData = res.userCharges;
    this.documentData = res.documents;
    // propertyTaxForm.patchValue({ ...this.propertyTaxData });
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
  }

  ngOnDestroy(): void {
    documentForm.reset();
    userChargesForm.reset();
  }
}
