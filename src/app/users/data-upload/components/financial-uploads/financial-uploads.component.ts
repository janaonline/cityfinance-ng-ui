import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatHorizontalStepper } from '@angular/material';
import { Router } from '@angular/router';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IQuestionnaireResponse } from 'src/app/pages/questionnaires/model/questionnaireResponse.interface';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { FinancialDataService } from 'src/app/users/services/financial-data.service';
import { AccessChecker } from 'src/app/util/access/accessChecker';
import { ACTIONS } from 'src/app/util/access/actions';
import { MODULES_NAME } from 'src/app/util/access/modules';
import { UserUtility } from 'src/app/util/user/user';

import {
  IFinancialData,
  MillionPlusCitiesDocuments,
  SolidWasteManagementDocuments,
  WaterManagement,
} from '../../models/financial-data.interface';
import { SolidWasteEmitValue } from '../../models/solid-waste-questions.interface';
import { milliomPlusCitiesForm, millionPlusCitiesQuestions } from '../configs/million-plus-cities';
import { solidWasteForm, solidWasterQuestions } from '../configs/solid-waste-management';
import { waterWasteManagementForm } from '../configs/water-waste-management';

@Component({
  selector: "app-financial-uploads",
  templateUrl: "./financial-uploads.component.html",
  styleUrls: ["./financial-uploads.component.scss"],
})
export class FinancialUploadsComponent implements OnInit, OnDestroy {
  constructor(
    private _matDialog: MatDialog,
    private financialDataService: FinancialDataService,
    public accessUtil: AccessChecker,
    private _router: Router,
    private _profileService: ProfileService
  ) {}

  isULBMillionPlus = undefined;

  @Input()
  financialData: IFinancialData;

  @ViewChild("savingPopup") savingPopup: TemplateRef<any>;

  USER_TYPE = USER_TYPE;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  documentData: IQuestionnaireResponse["data"][0]["documents"];

  millionPlusCitiesQuestions = millionPlusCitiesQuestions;
  solidWasteQuestions = solidWasterQuestions;
  solidWasteProfilledAnswers: SolidWasteManagementDocuments;
  millionPlusCitiesAnswers: MillionPlusCitiesDocuments;

  solidWasteForm = solidWasteForm;
  millionPlusCitiesForm = milliomPlusCitiesForm;
  userHasAlreadyFilledForm = false;

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "",
    buttons: {
      cancel: { text: "OK" },
    },
  };

  saveAsDraftFailMessge: string;

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  draftSavingInProgess = false;

  canUploadFile = true;

  hasAccessToUploadData = false;
  hasAccessToViewData = false;

  successMessage: string;
  isSubmitButtonClicked = false;

  ngOnInit() {}

  private initializeAccessCheck() {
    this.hasAccessToUploadData = this.accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.UPLOAD,
    });

    this.hasAccessToViewData = this.accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.VIEW,
    });

    if (!this.hasAccessToViewData) return this._router.navigate(["/home"]);
    if (!this.hasAccessToUploadData) this.setStateToReadMode();
  }

  private setStateToReadMode() {
    waterWasteManagementForm.disable();
    this.canUploadFile = false;
  }

  ngOnChanges() {
    if (this.financialData) this.populateFormDatas(this.financialData);
    this.initializeAccessCheck();
    this.checkULBMilionPlusStatus();
  }

  checkULBMilionPlusStatus() {
    let ulbId: string;
    if (this.financialData) ulbId = this.financialData.ulb;
    else {
      ulbId = this.loggedInUserDetails.ulb;
    }
    this._profileService.getULBGeneralData({ id: ulbId }).subscribe((res) => {
      try {
        this.isULBMillionPlus = res["data"][0].isMillionPlus;
      } catch (error) {
        console.error(error);
        this.isULBMillionPlus = false;
      }
    });
  }

  private populateFormDatas(data: IFinancialData) {
    solidWasteForm.patchValue({ ...data.solidWasteManagement.documents });
    this.solidWasteProfilledAnswers = {
      ...data.solidWasteManagement.documents,
    };
    milliomPlusCitiesForm.patchValue({ ...data.millionPlusCities.documents });
    this.millionPlusCitiesAnswers = {
      ...data.millionPlusCities.documents,
    };

    waterWasteManagementForm.patchValue({ ...data.waterManagement });
    // this.financialData.isCompleted = false;

    if (this.financialData.isCompleted) this.setStateToReadMode();
  }

  saveAsDraft() {
    this.resetMessages();

    const body = {
      ulb: this.loggedInUserDetails.ulb,
      ...this.financialData,
      isCompleted: false,
    };
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",

      disableClose: true,
    });

    this.financialDataService.uploadFinancialData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        this.successMessage = "Saved as Draft";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      },
      (err) => {
        this.draftSavingInProgess = false;

        this.saveAsDraftFailMessge =
          err.error.message ||
          err.error.msg ||
          "Fail to save data. Please try after some time.";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      }
    );
  }

  onSolidWasteEmit(event: SolidWasteEmitValue) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.solidWasteManagement = {
      documents: event as Required<SolidWasteEmitValue>,
    };
  }

  onMilionPlusCitiesEmitValue(values: MillionPlusCitiesDocuments) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.millionPlusCities = {
      documents: values,
    };
  }

  onWaterWasteManagementEmitValue(value: WaterManagement) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.waterManagement = { ...value };
  }

  private resetMessages() {
    this.saveAsDraftFailMessge = null;
    this.draftSavingInProgess = true;
    this.successMessage = null;
  }
  uploadCompletedQuestionnaireData() {
    this.saveAsDraftFailMessge = null;
    this.isSubmitButtonClicked = true;
    if (this.userHasAlreadyFilledForm) {
      return;
    }
    try {
      this.validatorQuestionnaireForms();
    } catch (error) {
      console.error(error);
      return;
    }
    this.resetMessages();

    const body = {
      ulb: this.loggedInUserDetails.ulb,
      ...this.financialData,
      isCompleted: true,
    };
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      panelClass: "custom-warning-popup",
      disableClose: true,
    });

    this.financialDataService.uploadFinancialData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        this.successMessage = "Data Upload Complete.";
        this._router.navigate(["user/data-upload/list"]);
        setTimeout(() => this._matDialog.closeAll(), 3000);
      },
      (err) => {
        this.draftSavingInProgess = false;
        this.saveAsDraftFailMessge =
          err.error.message ||
          err.error.msg ||
          "Fail to save data. Please try after some time.";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      }
    );
  }

  validatorQuestionnaireForms() {
    let message = "";
    if (
      solidWasteForm.valid &&
      (this.isULBMillionPlus ? milliomPlusCitiesForm.valid : true) &&
      waterWasteManagementForm.valid
    ) {
      return true;
    }

    if (!waterWasteManagementForm.valid) {
      message = "All questions must be answered in Water Waste Management";
      this.stepper.selectedIndex = 0;
    }

    if (!solidWasteForm.valid) {
      message += message
        ? ", Solid Waste Management"
        : "All questions must be answered in Solid Waste Management";
      // this.stepper.selectedIndex = 1;
    }

    if (this.isULBMillionPlus && !milliomPlusCitiesForm.valid) {
      message += message
        ? " and Million Plus Cities sections."
        : "All questions must be answered in Million Plus Cities section.";
    }
    if (!waterWasteManagementForm.valid) {
      this.stepper.selectedIndex = 1;
    } else if (!solidWasteForm.valid) {
      this.stepper.selectedIndex = 2;
    } else if (this.isULBMillionPlus && !milliomPlusCitiesForm.valid) {
      this.stepper.selectedIndex = 3;
    }

    message += " Kindly submit the form once completed.";
    this._matDialog.open(DialogComponent, {
      data: { ...this.defaultDailogConfiuration, message },
      width: "45vw",
      panelClass: "custom-warning-popup",
    });
    throw message;
  }

  ngOnDestroy() {
    this._matDialog.closeAll();
    waterWasteManagementForm.enable();
    waterWasteManagementForm.reset();
    solidWasteForm.reset();
    solidWasteForm.enable();
    milliomPlusCitiesForm.reset();
    milliomPlusCitiesForm.enable();
  }
}
