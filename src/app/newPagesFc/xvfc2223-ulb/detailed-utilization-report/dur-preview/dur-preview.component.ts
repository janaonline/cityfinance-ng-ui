import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { USER_TYPE } from "src/app/models/user/userType";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { UlbformService } from "src/app/pages/ulbform/ulbform.service";
import { UtiReportService } from "src/app/pages/ulbform/utilisation-report/uti-report.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { UserUtility } from "src/app/util/user/user";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-dur-preview",
  templateUrl: "./dur-preview.component.html",
  styleUrls: ["./dur-preview.component.scss"],
})
export class DurPreviewComponent implements OnInit {
  @Input() parentData: any;
  @ViewChild("previewUti") _html: ElementRef;
  @ViewChild("templateSave") template;
  showLoader;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    private UtiReportService: UtiReportService,
    public _ulbformService: UlbformService,
    public _router: Router,
    private newCommonService: NewCommonService
  ) {}
  styleForPDF = `<style>

  .f-table {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 12px;
  }
  .header-p {
    background-color: #047474;
    text-align: center;
    padding: 10px;
}

.heading-p {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 1rem;
    font-weight: 700;
}

.header-u-p {
    background-color: #047474;
    text-align: center;
    padding: 10px;
}

.heading-u-p {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
    padding-top: .5rem;
}

.h-uti-p {
    font-size: 14px;
    font-weight: 700;
    margin-top: 1rem;
    color: #FFFFFF;
}

.s-h-uti {
    font-size: 13px;
    font-weight: 500;
    color: #FFFFFF;
}

.se-r {
    margin-top: 2%;
}

.st-n {
    font-size: 12px;
    font-weight: 600;
}

.m-top {
    margin-top: 1%;
    margin-bottom: 2%;
}

tr {
    text-align: center;
}


.f-text {
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    padding-top: 2rem;

}

.sig-text {
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}

.m-b {
    margin-top: .5rem !important;
    margin-bottom: 5%;
}

.pd-row {
    padding-left: 1% !important;
    padding-right: 2% !important;
}

.pd-row-n {
    padding-left: 2%;
    padding-right: 2%;
}
.name-row {
    margin-top: 4rem !important;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}
.pdf-hide{
  display : none;
}


.ff-table>table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
      padding: 4px 0px;
      line-height: 1.42857143;
      vertical-align: middle;


}
.pj-tb{
  margin-top: 3rem;
}
.pd-r {
  padding-left : 6px !important;
}
.se-tb{
  padding-top : 1rem !important;
}
.pd-th {
  padding-left: 2px !important;
  padding-right: 2px !important;
}
  </style>`;

  @Input()
  changeFromOutSide: any;

  subParentForModal;

  formStatusCheck = "";
  statusArray = [
    "Not Started",
    "Under Review By State",
    "Completed",
    "In Progress",
  ];
  totalStatus;
  analytics = [];
  swm = [];
  wm = [];
  categories;
  totalWmAmount = 0;
  totalSwmAmount = 0;
  USER_TYPES = USER_TYPE;
  userDetails = new UserUtility().getLoggedInUserDetails();
  userData = JSON.parse(localStorage.getItem("userData"));
  state;
  ulb;
  ngOnInit() {
    console.log("details.....", this.userDetails);

    if (this.userDetails.role == USER_TYPE.ULB) {
      this.state = this.userData.stateName;
      this.ulb = this.userData.name;
    } else {
      this.state = sessionStorage.getItem("stateName");
      this.ulb = sessionStorage.getItem("ulbName");
    }
    this.state = this.data?.ulbDetails?.stateName;
    this.ulb = this.data?.ulbDetails?.ulbName;
    this.categories = this.data?.categories;

    console.log("preview data", this.data, this.categories);
    this.data?.projects.forEach((el) => {
      let cName = this.categories.find((item) => item?._id == el?.category);
      if (cName) {
        el.categoryName = cName?.name;
      }
      console.log("ccc", cName);
    });
    // this.subParentForModal = this.UtiReportService.OpenModalTrigger.subscribe(
    //   (change) => {
    //     if (this.changeFromOutSide) {
    //       this.openDialog(this.template);
    //     }
    //   }
    // );

    if (this.parentData) {
      this.genrateParentData();
    }

    let getData = JSON.parse(sessionStorage.getItem("utilReport"));
    console.log("getData", getData);
    console.log("Data", this.data);
    if (!getData?.["blankForm"]) {
      let canNavigate = sessionStorage.getItem("canNavigate");
      if (canNavigate == "false") {
        if (this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (!this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      } else if (canNavigate == "true") {
        if (this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (!this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      }
    } else {
      let canNavigate = sessionStorage.getItem("canNavigate");
      if (canNavigate == "false") {
        if (this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (!this.data["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      } else if (canNavigate == "true") {
        this.formStatusCheck = this.statusArray[0];
      }
    }

    this.setTotalStatus();
    this.calculateAmt();
  }
  calculateAmt() {
    this.data?.categoryWiseData_wm?.forEach((el) => {
      this.totalWmAmount =
        Number(this.totalWmAmount) + Number(el?.grantUtilised);
    });
    this.data?.categoryWiseData_swm?.forEach((el) => {
      this.totalSwmAmount =
        Number(this.totalSwmAmount) + Number(el?.grantUtilised);
    });
  }
  ngOnDestroy(): void {
    //  this.subParentForModal.unsubscribe();
  }

  setTotalStatus() {
    if (!this.parentData) {
      this.totalStatus = sessionStorage.getItem("masterForm");
      if (this.totalStatus) {
        this.totalStatus = JSON.parse(this.totalStatus);
        if (this.totalStatus["isSubmit"]) {
          this.totalStatus = "Completed but Not Submitted";
        } else {
          this.totalStatus = "In Progress";
        }
      } else {
        this.totalStatus = "Not Started";
      }
    }
  }
  clickedDownloadAsPDF(template) {
    // this.downloadForm();
    let canNavigate = sessionStorage.getItem("changeInUti");
    if (canNavigate == "true") {
      this.openDialog(template);
      return;
    } else {
      this.downloadForm();
    }
  }

  genrateParentData() {
    this.parentData.totalProCost = 0;
    this.parentData.totalExpCost = 0;
    this.parentData.projects.forEach((element) => {
      this.parentData.totalProCost += parseFloat(
        element.cost == "" ? 0 : element.cost
      );
      this.parentData.totalExpCost += parseFloat(
        element.expenditure == "" ? 0 : element.expenditure
      );
    });
    this.data = this.parentData;
  }

  Years = JSON.parse(localStorage.getItem("Years"));
  downloadForm() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;

    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        console.log("vishu", res);
       // StateName_ULBCode_ULBName_FyYear_FormStatus 
        let fileName = `${this.state}_${this.data?.ulbDetails?.ulbCode}_${this.data?.ulbDetails?.ulbName}_2022-23_${this.data?.ulbDetails?.status}`;
        fileName = fileName.replace(/\s/g, "");
        this.downloadFile(res.slice(0), "pdf", `${fileName}.pdf`);
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
    this._matDialog.open(DialogComponent, { data: option });
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

  dialogRef;
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
  errMessage = "";
  copyData;
  async proceed(uploadedFiles) {
    // await this.modalRef.hide();
    this.dialogRef.close();
    sessionStorage.setItem("canNavigate", "true");
    console.log("preview Data", this.data);
    this.copyData = this.data;
    delete this.copyData["categories"];
    this.data?.projects.forEach((el) => {
      if (el?.categoryName) {
        delete el.categoryName;
      }
    });

    console.log("copy Data", this.copyData);
    this.newCommonService.postUtiData(this.copyData).subscribe(
      (res) => {
        swal("Saved", "Data save as draft successfully.", "success");
        console.log("post uti mess", res);
        sessionStorage.setItem("changeInUti", "false");
        this.newCommonService.setFormStatus2223.next(true);
        // this.isSubmitted = false;
        // this.copyData['projects'] = this.data['projects']
      },
      (error) => {
        swal("An error occured!");
        sessionStorage.setItem("changeInUti", "false");
        this.errMessage = error.message;
        console.log(this.errMessage);
      }
    );

    if (this.changeFromOutSide) {
      this._ulbformService.initiateDownload.next(true);
    } else this.downloadForm();
  }
  dialogClose() {
    this._matDialog.closeAll();
  }
}
