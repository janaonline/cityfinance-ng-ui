import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
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
import { UlbformService } from "../ulbform.service";
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
} from "src/app/users/data-upload/components/configs/water-waste-management";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-preview-slb-component",
  templateUrl: "./preview-slb-component.component.html",
  styleUrls: ["./preview-slb-component.component.scss"],
})
export class PreviewSlbComponentComponent implements OnInit {
  @Input()
  data: any;
  slbTitleText: string = "SLB's for Water Supply and Sanitation";
  @Input()
  isULBMillionPlus = false;
  @ViewChild("previewSlb") _html: ElementRef;
  @ViewChild("template") template;
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
  water_index_qus = "";
  fileUrl = "";
  fileName = "";
  constructor(
    private _questionnaireService: QuestionnaireService,
    private _commonService: CommonService,
    public _ulbformService: UlbformService,
    public _matDialog: MatDialog
  ) {}

  ngOnChanges() {}
  formStatusCheck = "";
  statusArray = [
    "Not Started",
    "Under Review By State",
    "Completed",
    "In Progress",
  ];
  ngOnInit() {
    this.subParentForModal = this._commonService.OpenModalTrigger.subscribe(
      (change) => {
        if (this.changeFromOutSide) {
          this.openDialog(this.template);
        }
      }
    );

    let getData = JSON.parse(sessionStorage.getItem("slbData"));
    this.data = this.formatResponse(this.data);
    this.data.history = null;
    console.log("getData", getData);
    console.log("this.data", this.data);

    if (getData?.data.length > 0) {
      let change = sessionStorage.getItem("changeInSLB");
      if (change == "true") {
        if (this.data["isCompleted"]) {
          this.formStatusCheck = this.statusArray[2];
        } else if (!this.data["isCompleted"]) {
          this.formStatusCheck = this.statusArray[3];
        }
      } else if (change == "false") {
        if (getData["data"][0]["isCompleted"]) {
          this.formStatusCheck = this.statusArray[2];
        } else if (!getData["data"][0]["isCompleted"]) {
          this.formStatusCheck = this.statusArray[3];
        }
      }
    } else {
      let change = sessionStorage.getItem("changeInSLB");
      if (change == "true") {
        if (this.data["isCompleted"]) {
          this.formStatusCheck = this.statusArray[2];
        } else if (!this.data["isCompleted"]) {
          this.formStatusCheck = this.statusArray[3];
        }
      } else if (change == "false") {
        this.formStatusCheck = this.statusArray[0];
      }
    }

    console.log("hi", JSON.stringify(this.data));
    if (this.data.preWater?.index != undefined) {
      this.fileName = this.data.preWater.plan.name;
      this.fileUrl = this.data.preWater.plan.url;
      if (this.data.preWater.index) {
        this.water_index_qus = "Yes";
      } else {
        this.water_index_qus = "No";
      }
    } else {
      this.fileName = this.data.waterPotability.name;
      this.fileUrl = this.data.waterPotability.url;
      if (this.data.water_index) {
        this.water_index_qus = "Yes";
      } else {
        this.water_index_qus = "No";
      }
    }
  }

  ngOnDestroy(): void {
    this.subParentForModal.unsubscribe();
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
  clicked = false;
  clickedDownloadAsPDF(template) {
    let changeHappen = sessionStorage.getItem("changeInSLB");
    this.clicked = true;

    //use dialog instead of Modal
    if (changeHappen === "true") {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }

    // this.openModal(template)
  }
  dialogRef;
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }

  errMessage = "";
  res;
  async proceed(uploadedFiles) {
    this.dialogRef.close();

    console.log("Check this value", this.data);

    console.log(this.data);
    let obj = {
      waterManagement: this.data["waterManagement"],
      waterPotability: this.data["waterPotability"],
      water_index: this.data["water_index"],
      saveData: true,
      isCompleted: this.data["isCompleted"],
    };
    this.onWaterWasteManagementEmitValue(obj);
    sessionStorage.setItem("changeInSLB", "false");
    if (this.changeFromOutSide) {
      this._ulbformService.initiateDownload.next(true);
    } else this.downloadAsPDF();
  }

  onWaterWasteManagementEmitValue(value) {
    console.log("value1", value);
    this.data = value;
    console.log("onWaterWasteManagementEmitValue", value);
    sessionStorage.setItem("changeInSLB", "true");
    if (value.saveData) this.postSlbData(value);
  }

  postSlbData(value) {
    let data = {
      design_year: this.Years["2021-22"],
      waterManagement: { ...value.waterManagement },
      water_index: value.water_index,
      waterPotability: {
        documents: {
          waterPotabilityPlan: [value.waterPotability],
        },
      },
      isCompleted: value.isCompleted,
      // completeness: 'APPROVED', correctness: 'APPROVED',
    };
    console.log(data);
    this._commonService.postSlbData(data).subscribe((res) => {
      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      status.slbForWaterSupplyAndSanitation.isSubmit = res["isCompleted"];
      this._ulbformService.allStatus.next(status);
      console.log("response");
      console.log(res);
      swal("Record submitted successfully!");
    });
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;

    let html = this.styleForPDF + elementToAddPDFInString;
    html = this.replaceAllOccurence(html, 'width="15.932"', 'width="7.932"');
    html = this.replaceAllOccurence(html, 'height="15.932"', 'height="7.932"');
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
