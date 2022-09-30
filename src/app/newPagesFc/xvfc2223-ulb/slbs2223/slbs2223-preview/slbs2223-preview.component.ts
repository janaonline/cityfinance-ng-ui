import { Component, ElementRef, Inject, Input, OnInit, SimpleChange, ViewChild } from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { IState } from "src/app/models/state/state";
import { USER_TYPE } from "src/app/models/user/userType";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { CommonService } from "src/app/shared/services/common.service";
import { UPLOAD_STATUS } from "src/app/util/enums";
import { UserUtility } from "src/app/util/user/user";

import {
  IFinancialData,
  WaterManagement,
} from "src/app/users/data-upload/models/financial-data.interface";
import {
  APPROVAL_COMPLETED,
  REJECT_BY_MoHUA,
  REJECT_BY_STATE,
  SAVED_AS_DRAFT,
  UNDER_REVIEW_BY_MoHUA,
  UNDER_REVIEW_BY_STATE,
} from "src/app/users/data-upload/util/request-status";
import { millionPlusCitiesQuestions } from "src/app/users/data-upload/components/configs/million-plus-cities";
import { solidWasterQuestions } from "src/app/users/data-upload/components/configs/solid-waste-management";
import {
  services,
  targets,
  achieved,
  score
} from "src/app/users/data-upload/components/configs/slb2223";
import { SweetAlert } from "sweetalert/typings/core";
import { UlbformService } from "src/app/pages/ulbform/ulbform.service";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-slbs2223-preview',
  templateUrl: './slbs2223-preview.component.html',
  styleUrls: ['./slbs2223-preview.component.scss']
})
export class Slbs2223PreviewComponent implements OnInit {
  @Input()
  data: any;
  slbTitleText: string = "SLBs for Water Supply and Sanitation";
  @Input()
  isULBMillionPlus = false;
  @ViewChild("previewSlb") _html: ElementRef;
  @ViewChild("template") template;
  targets = targets;
  achieved = achieved;
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  uploadSTATUS = UPLOAD_STATUS;
  showLoader = false;
  dialogRef;
  errMessage = "";
  res;
  USER_TYPES = USER_TYPE;
  Years = JSON.parse(localStorage.getItem("Years"));
  userDetails = new UserUtility().getLoggedInUserDetails();
  userData = JSON.parse(localStorage.getItem("userData"));
  styleForPDF = `<style>
  :root {
    font-size: 14px;
  }
  .sub-h-font{
    font-size: 14px !important;
    font-weight: 600;
  }
  .heading-font{
    font-size: 18px !important;
    font-weight: 700;

  }
  .slb-pd {
    padding: 2% 0% 2.5% 0%;
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
      padding-top: 5px !important;
      padding-bottom: 5px !important;
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
  .qus-slb {
    margin-left: 2%;
    font-weight: normal;
    font-size: 12px;
}

.ans-slb {
    margin-left: 1rem;
    font-weight: normal;
    font-size: 12px;
}
.ans-slb-a {
  margin-left: 5.8rem;
  font-weight: normal !important;
  font-size: 10px !important;
}




  </style>`;

  @Input()
  changeFromOutSide: any;

  subParentForModal;

  states: { [stateId: string]: IState };

  fileUrl = "";
  fileName = "";
  constructor(
    private _questionnaireService: QuestionnaireService,
    private _commonService: CommonService,
    public _ulbformService: UlbformService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public preData: any
  ) { }

  ngOnChanges(changes: SimpleChange) {
    console.log("changes=============//>", changes);
  }
  formStatusCheck = "";
  statusArray = [
    "Not Started",
    "Under Review By State",
    "Completed",
    "In Progress",
  ];
  ulbName = '';
  stateName = '';

  ngOnInit() {
    console.log('preData2223', this.preData)
    let getData = JSON.parse(sessionStorage.getItem("slbData"));
    if (this.data && this.data?.history) this.data["history"] = null;
    if (this.userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = this.userData["name"];
    }
    this.stateName = this.userData["stateName"];
  }
  clicked = false;
  clickedDownloadAsPDF(template) {
    this.clicked = true;
      this.downloadAsPDF();
    // this.openModal(template)
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;

    let html = this.styleForPDF + elementToAddPDFInString;

    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(
          res.slice(0),
          "pdf",
          `slb ${this.data ? this.data.ulbName : this.userDetails.name
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
