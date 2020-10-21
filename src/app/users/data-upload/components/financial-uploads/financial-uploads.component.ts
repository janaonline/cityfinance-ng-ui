import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatHorizontalStepper } from '@angular/material';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IQuestionnaireResponse } from 'src/app/pages/questionnaires/model/questionnaireResponse.interface';
import { documentForm } from 'src/app/pages/questionnaires/state/configs/document.config';
import { propertyTaxForm } from 'src/app/pages/questionnaires/state/configs/property-tax.cofig';
import { userChargesForm } from 'src/app/pages/questionnaires/state/configs/user-charges.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';
import { FinancialDataService } from 'src/app/users/services/financial-data.service';
import { UserUtility } from 'src/app/util/user/user';

import {
  IFinancialData,
  MillionPlusCitiesDocuments,
  SolidWasteManagementDocuments,
} from '../../models/financial-data.interface';
import { SolidWasteEmitValue } from '../../models/solid-waste-questions.interface';
import { milliomPlusCitiesForm, millionPlusCitiesQuestions } from '../configs/million-plus-cities';
import { solidWasteForm, solidWasterQuestions } from '../configs/solid-waste-management';

@Component({
  selector: "app-financial-uploads",
  templateUrl: "./financial-uploads.component.html",
  styleUrls: ["./financial-uploads.component.scss"],
})
export class FinancialUploadsComponent implements OnInit, OnDestroy {
  constructor(
    private _matDialog: MatDialog,
    private financialDataService: FinancialDataService
  ) {}

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

  ngOnInit() {}

  ngOnChanges() {
    if (this.financialData) this.populateFormDatas(this.financialData);
  }

  private populateFormDatas(data: IFinancialData) {
    console.log({ ...this.financialData });

    solidWasteForm.patchValue({ ...data.solidWasteManagement.documents });
    this.solidWasteProfilledAnswers = {
      ...data.solidWasteManagement.documents,
    };
    milliomPlusCitiesForm.patchValue({ ...data.millionPlusCities.documents });
    this.millionPlusCitiesAnswers = {
      ...data.millionPlusCities.documents,
    };

    console.log(solidWasteForm);
  }

  saveAsDraft() {
    this.saveAsDraftFailMessge = null;
    this.draftSavingInProgess = true;

    const body = {
      ulb: this.loggedInUserDetails.ulb,
      ...this.financialData,
      isCompleted: false,
    };
    console.log(body);
    this._matDialog.open(this.savingPopup, {
      width: "35vw",
      height: "fit-content",
      disableClose: true,
    });
    this.financialDataService.uploadFinancialData(body).subscribe(
      (res) => {
        this.draftSavingInProgess = false;
        setTimeout(() => this._matDialog.closeAll(), 3000);
      },
      (err) => {
        this.saveAsDraftFailMessge =
          err.error.message ||
          err.error.msg ||
          "Fail to save data. Please try after some time.";
        setTimeout(() => this._matDialog.closeAll(), 3000);
      }
    );
  }

  onSolidWasteEmit(event: SolidWasteEmitValue) {
    console.log(`onSolidWasteEmit`, event);
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.solidWasteManagement = {
      documents: event as Required<SolidWasteEmitValue>,
    };
    console.log(this.solidWasteForm);
  }

  onMilionPlusCitiesEmitValue(values: MillionPlusCitiesDocuments) {
    console.log(`onMilionPlusCitiesEmitValue`, values);
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.millionPlusCities = {
      documents: values,
    };
    console.log(this.millionPlusCitiesForm);
  }

  uploadCompletedQuestionnaireData() {
    this.saveAsDraftFailMessge = null;
    if (this.userHasAlreadyFilledForm) {
      return;
    }
    try {
      this.validatorQuestionnaireForms();
    } catch (error) {
      console.error(error);
      return;
    }

    const obj = {
      documents: documentForm.value,
      propertyTax: propertyTaxForm.value,
      userCharges: userChargesForm.value,
      isCompleted: true,
    };

    // if (this.userData.role !== USER_TYPE.STATE) {
    //   obj["state"] = this.currentStateId;
    // }
    // this._matDialog.open(this.savingPopup, {
    //   width: "35vw",
    //   height: "fit-content",
    //   disableClose: true,
    // });

    // this._questionnaireService.saveStateQuestionnaireData(obj).subscribe(
    //   (res) => {
    //     this._matDialog.closeAll();
    //     this.userHasAlreadyFilledForm = true;
    //     this.editable = false;
    //     this.setComponentStateToAlreadyFilled(
    //       {
    //         ...obj,
    //         stateName: this.stateName,
    //       },
    //       false
    //     );
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.saveAsDraftFailMessge =
    //       err.error.message ||
    //       "Failed to save data. Please try after some time";
    //     console.error(err);
    //   }
    // );
  }

  validatorQuestionnaireForms() {
    let message = "";
    if (solidWasteForm.valid && milliomPlusCitiesForm.valid) {
      return true;
    }
    if (!solidWasteForm.valid) {
      message = "All questions must be answered in Solid Waste Management";
      this.stepper.selectedIndex = 1;
    }

    if (!milliomPlusCitiesForm.valid) {
      message += message
        ? " and Million Plus Cities sections."
        : "All questions must be answered in Million Plus Cities section.";
      if (solidWasteForm.valid) {
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

  ngOnDestroy() {
    this._matDialog.closeAll();
  }
}
