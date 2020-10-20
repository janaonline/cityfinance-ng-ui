import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IQuestionnaireResponse } from 'src/app/pages/questionnaires/model/questionnaireResponse.interface';

import { IFinancialData } from '../../models/financial-data.interface';
import { SolidWasteEmitValue } from '../../models/solid-waste-questions.interface';

@Component({
  selector: "app-financial-uploads",
  templateUrl: "./financial-uploads.component.html",
  styleUrls: ["./financial-uploads.component.scss"],
})
export class FinancialUploadsComponent implements OnInit {
  USER_TYPE = USER_TYPE;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  documentData: IQuestionnaireResponse["data"][0]["documents"];

  financialData: IFinancialData;

  constructor() {}

  ngOnInit() {}

  saveAsDraft() {}

  onFileUploaded(event) {
    console.log(event);
  }

  onSolidWasteEmit(event: SolidWasteEmitValue) {
    if (!this.financialData) this.financialData = {} as IFinancialData;
    this.financialData.solidWasteManagement = {
      documents: event as Required<SolidWasteEmitValue>,
    };
    this.stepper.next();
  }
}
