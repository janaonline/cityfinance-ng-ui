import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IState } from 'src/app/models/state/state';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from 'src/app/pages/questionnaires/ulb/configs/common.config';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserUtility } from 'src/app/util/user/user';

import { IFinancialData, WaterManagement } from '../../models/financial-data.interface';
import { millionPlusCitiesQuestions } from '../configs/million-plus-cities';
import { solidWasterQuestions } from '../configs/solid-waste-management';
import { services, targets } from '../configs/water-waste-management';

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  @Input()
  data: IFinancialData;

  @Input()
  isULBMillionPlus = false;
  @ViewChild("preview") _html: ElementRef;

  targets = targets;
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  // wasteWaterDucmentQuestions = wasteWaterDucmentQuestions;
  solidWasteQuestions = solidWasterQuestions;
  millionPlusCitiesQuestions = millionPlusCitiesQuestions;

  showLoader = false;

  userDetails = new UserUtility().getLoggedInUserDetails();

  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: .9rem;
    }

     h4 {
      font-size: .7rem;
    }

    table thead th {
      font-size: .5rem
    }

    table tbody td, li {
      font-size: .5rem
    }

    .td-width {
      width: 25%;
    }

    button {
      display: none;
    }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }
</style>`;

  states: { [stateId: string]: IState };

  constructor(
    private _questionnaireService: QuestionnaireService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    console.log("data", this.data);
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;

    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(
          res.slice(0),
          "pdf",
          `XV_FC_Grant ${
            this.data ? this.data.ulbName : this.userDetails.name
          }.pdf`
        );
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }

  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    // this._matDialog.open(DialogComponent, { data: option });
  }

  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
}
