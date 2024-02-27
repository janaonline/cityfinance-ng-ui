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
import { AnnualAccountsService } from "src/app/pages/ulbform/annual-accounts/annual-accounts.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { environment } from "src/environments/environment";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-annual-preview",
  templateUrl: "./annual-preview.component.html",
  styleUrls: ["./annual-preview.component.scss"],
})
export class AnnualPreviewComponent implements OnInit {
  constructor(
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private annualAccountsService: AnnualAccountsService,
    public _router: Router,
    private newCommonService: NewCommonService,
    @Inject(MAT_DIALOG_DATA) public preData: any
  ) {}
  @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateAnnual") template;
  showLoader;
  ulbName = "";
  stateName = "";
  @Input()
  changeFromOutSide: any;
  fromParent = true;
  dialogRef;
  download;
  previewStatus;
  totalStatus;
  subParentForModal;
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 75px;
    text-align: center;
}
.heading-p {
  color: #FFFFFF;
  font-size: 18px;
  padding-top: 1rem !important;
  font-weight: 700;

}
.sub-h {
font-weight: 700 !important;
font-size: 14px;
}

.form-h {
font-size: 18px;
font-weight: 700;
text-align: center;
}

.card {
    padding: 5px 10px;
    background-color: #EBF5F5;
}


.dec-h {
  font-weight: 600 !important;
  margin-bottom: 0 !important;
    font-size: 10px;
}
@media print {
  .page-break {
      page-break-before: always;
  }
}
.h-font {
  display: inline-block;
  font-size: 12px !important;
}

.hi{
  display:none
}

.form-status {
  font-size: 10px;
  margin-top: 10px;
}
.ot-text {
  padding-left: .5rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size:9px;
}
.f-l {
  background-color: #124A55;
  color: #FFFFFF;
  padding: 7px;
}
.h-h {
    display: inline-block;
    font-size: 12px !important;

}
.ques {
  margin-bottom: .5rem;
  margin-top: 1rem;
  font-size: 10px;
}

.ans {
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px;
}
.dec-h {
font-weight: 600 !important;
margin-bottom: 0 !important;
  font-size: 10px;
}
.ans-h-an{
  margin-left : .5rem !important;
}
.qus-h-an-ex {
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px;
  margin-left : .5rem !important;
}
.ans-h-an-b {
    margin-bottom: .5rem;
    margin-top: .5rem;
    margin-left : 1rem !important;
    font-size: 10px;
}
.f-r {
  margin-left: 30px;
}
.f-l {
  margin-bottom : 1rem;
}
.m-r-t {
  margin-top : 1rem !important;
}
.dec-h-h {
  font-size: 10px;
}
.ans-h-na {
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px !important;
}
  </style>`;

  storageBaseUrl:string = environment?.STORAGE_BASEURL;

  ngOnInit(): void {
    console.log("pre data", this.preData);

    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = userData["name"];
    }
    this.stateName = userData["stateName"];
    if (this.preData?.body["isDraft"]) {
      this.formStatusCheck = this.statusArray[3];
    } else if (this.preData?.body["isDraft"] == false) {
      this.formStatusCheck = this.statusArray[1];
    } else if (
      this.preData?.body["isDraft"] == null ||
      this.preData?.body["isDraft"] == undefined
    ) {
      this.formStatusCheck = this.statusArray[0];
    }
  }
  closeMat() {
    this._matDialog.closeAll();
  }
  annualDownload(template) {
    this.download = true;
    let changeHappen = sessionStorage.getItem("changeInAnnualAcc");
    if (changeHappen === "true") {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }
  }
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }
  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "annualAccounts.pdf");
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
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
  async proceed(uploadedFiles) {
    this.dialogRef.close();
    this._matDialog.closeAll();
    this.preData.body["isDraft"] = true;
    await this.submit();
    sessionStorage.setItem("changeInAnnualAcc", "false");
    await this.downloadAsPDF();
    //  if (this.changeFromOutSide)
    // this._ulbformService.initiateDownload.next(true);
    //  else await this.downloadAsPDF();
  }

  async submit() {
    return new Promise((resolve, rej) => {
      this.newCommonService.postAnnualData(this.preData?.body).subscribe(
        (res) => {
          sessionStorage.setItem("changeInAnnualAcc", "false");
          console.log(res);
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.annualAccounts.isSubmit = res["isCompleted"];
          // this._ulbformService.allStatus.next(status);
          this.newCommonService.setFormStatus2223.next(true);
          swal("Saved", "Data saved as draft successfully", "success");
          resolve("sucess");
        },
        (err) => {
          swal("Error", "Failed To Save", "error");
          resolve(err);
        }
      );
    });
  }

  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }

  formStatusCheck = "";
  statusArray = ["Not Started", "Completed", "Completed", "In Progress"];

  previewStatuSet() {
    console.log(this.preData?.body);
    let allFormsData = JSON.parse(sessionStorage.getItem("allFormsData"));
    if (allFormsData["annualAccountData"].length > 0) {
      let change = sessionStorage.getItem("changeInAnnualAcc");
      if (change == "true") {
        if (this.preData["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (!this.preData?.body["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      } else if (change == "false") {
        if (this.preData?.body["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (this.preData?.body["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      }
    } else {
      let change = sessionStorage.getItem("changeInAnnualAcc");
      if (change == "true") {
        if (this.preData?.body["isDraft"]) {
          this.formStatusCheck = this.statusArray[3];
        } else if (!this.preData?.body["isDraft"]) {
          this.formStatusCheck = this.statusArray[2];
        }
      } else if (change == "false") {
        this.formStatusCheck = this.statusArray[0];
      }
    }
  }
}
