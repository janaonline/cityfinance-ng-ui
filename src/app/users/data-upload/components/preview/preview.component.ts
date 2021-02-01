import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IState } from 'src/app/models/state/state';
import { USER_TYPE } from 'src/app/models/user/userType';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from 'src/app/pages/questionnaires/ulb/configs/common.config';
import { CommonService } from 'src/app/shared/services/common.service';
import { UPLOAD_STATUS } from 'src/app/util/enums';
import { UserUtility } from 'src/app/util/user/user';

import { IFinancialData, WaterManagement } from '../../models/financial-data.interface';
import {
  APPROVAL_COMPLETED,
  REJECT_BY_MoHUA,
  REJECT_BY_STATE,
  SAVED_AS_DRAFT,
  UNDER_REVIEW_BY_MoHUA,
  UNDER_REVIEW_BY_STATE,
} from '../../util/request-status';
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
  data: any;

  @Input()
  isULBMillionPlus = false;
  @ViewChild("preview") _html: ElementRef;

  targets = targets;
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;

  uploadSTATUS = UPLOAD_STATUS;

  // wasteWaterDucmentQuestions = wasteWaterDucmentQuestions;
  solidWasteQuestions = solidWasterQuestions;
  millionPlusCitiesQuestions = millionPlusCitiesQuestions;

  showLoader = false;

  USER_TYPES = USER_TYPE;

  userDetails = new UserUtility().getLoggedInUserDetails();

  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
  table tbody tr {
    border: 100px solid black;
  }
    table tbody tr:nth-child(even) {
    background: #d7ebeb;
  }
   table tbody tr:nth-child(even) td {
    border:1px solid #d7ebeb;
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
       h5 {
      font-size: .5rem;
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

  .form-status {
    font-size: 10px;
    margin-top: 10px;


  }

  .fa-times {
    display: none;
  }


</style>`;

  states: { [stateId: string]: IState };

  constructor(
    private _questionnaireService: QuestionnaireService,
    private _commonService: CommonService,
    public _matDialog: MatDialog
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    this.data = this.formatResponse(this.data);
  }

  replaceAllOccurence(
    originalText: string,
    textToSearch: string,
    newText: string
  ) {
    const text = originalText.replace(textToSearch, newText);
    if (text.includes(textToSearch)) {
      return this.replaceAllOccurence(text, textToSearch, newText);
    }
    return text;
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;

    let html = this.styleForPDF + elementToAddPDFInString;
    html = this.replaceAllOccurence(html, 'width="15.932"', 'width="7.932"');
    html = this.replaceAllOccurence(html, 'height="15.932"', 'height="7.932"');
    this.showLoader = true;
    console.log(html);
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

  private formatResponse(req: IFinancialData, history = false) {
    if (!req._id) {
      return {
        ...req,
        customStatusText: "Not Submitted",
      };
    }
    if (!req.isCompleted) {
      let customStatusText;
      if (req.actionTakenByUserRole === USER_TYPE.ULB) {
        customStatusText = SAVED_AS_DRAFT.itemName;
      } else if (req.actionTakenByUserRole === USER_TYPE.STATE) {
        customStatusText = UNDER_REVIEW_BY_STATE.itemName;
      } else {
        customStatusText = UNDER_REVIEW_BY_MoHUA.itemName;
      }
      return {
        ...req,
        customStatusText,
      };
    }

    let customStatusText;
    switch (req.actionTakenByUserRole) {
      case USER_TYPE.ULB:
        customStatusText = history
          ? "Submitted By ULB"
          : UNDER_REVIEW_BY_STATE.itemName;
        break;
      case USER_TYPE.STATE:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_STATE.itemName;
        } else {
          customStatusText = history
            ? "Approved by STATE"
            : UNDER_REVIEW_BY_MoHUA.itemName;
        }

        break;
      case USER_TYPE.MoHUA:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_MoHUA.itemName;
        } else {
          customStatusText = APPROVAL_COMPLETED.itemName;
        }
        break;
      default:
        customStatusText = "N/A";
    }

    return {
      ...req,
      customStatusText,
    };
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
