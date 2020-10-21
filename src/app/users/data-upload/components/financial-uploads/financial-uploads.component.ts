import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatHorizontalStepper } from '@angular/material';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IQuestionnaireResponse } from 'src/app/pages/questionnaires/model/questionnaireResponse.interface';
import { documentForm } from 'src/app/pages/questionnaires/state/configs/document.config';
import { propertyTaxForm } from 'src/app/pages/questionnaires/state/configs/property-tax.cofig';
import { userChargesForm } from 'src/app/pages/questionnaires/state/configs/user-charges.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from 'src/app/shared/components/dialog/models/dialogConfiguration';

import { IFinancialData, MillionPlusCitiesDocuments } from '../../models/financial-data.interface';
import { SolidWasteEmitValue } from '../../models/solid-waste-questions.interface';
import { milliomPlusCitiesForm, millionPlusCitiesQuestions } from '../configs/million-plus-cities';
import { solidWasteForm, solidWasterQuestions } from '../configs/solid-waste-management';

@Component({
  selector: "app-financial-uploads",
  templateUrl: "./financial-uploads.component.html",
  styleUrls: ["./financial-uploads.component.scss"],
})
export class FinancialUploadsComponent implements OnInit {
  constructor(private _matDialog: MatDialog) {}
  USER_TYPE = USER_TYPE;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  documentData: IQuestionnaireResponse["data"][0]["documents"];

  financialData: IFinancialData;

  millionPlusCitiesQuestions = millionPlusCitiesQuestions;
  solidWasteQuestions = solidWasterQuestions;

  solidWasteForm = solidWasteForm;
  millionPlusCitiesForm = milliomPlusCitiesForm;
  userHasAlreadyFilledForm = false;

  defaultDailogConfiuration: IDialogConfiguration = {
    message: "",
    buttons: {
      cancel: { text: "OK" },
    },
  };

  saveAsDraftFailMessge;

  ngOnInit() {}

  saveAsDraft() {}

  onFileUploaded(event) {
    console.log(event);
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
}
