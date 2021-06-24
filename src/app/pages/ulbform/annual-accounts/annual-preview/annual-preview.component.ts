import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { QuestionnaireService } from "../../../questionnaires/service/questionnaire.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { AnnualAccountsService } from "../annual-accounts.service";
import { UlbformService } from "../../ulbform.service";
import { SweetAlert } from "sweetalert/typings/core";
import { Router, Event } from "@angular/router";
import { AnnualAccountsComponent } from "../annual-accounts.component";
const swal: SweetAlert = require("sweetalert");
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";

@Component({
  selector: "app-annual-preview",
  templateUrl: "./annual-preview.component.html",
  styleUrls: ["./annual-preview.component.scss"],
})
export class AnnualPreviewComponent implements OnInit {
  @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateAnnual") template;
  showLoader;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataEntryService: DataEntryService,
    private _questionnaireService: QuestionnaireService,
    private annualAccountsService: AnnualAccountsService,
    public _ulbformService: UlbformService,
    public _router: Router,
    private _matDialog: MatDialog
  ) {}
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
font-weight: 600 !important;
font-size: 14px;
}

.form-h {
font-size: 18px;
font-weight: 700;
margin-bottom: 1rem;
text-align: center;
}

.card {
    padding: 5px 10px;
    background-color: #EBF5F5;
}

.qus-h-an {
    margin-bottom: .5rem;
    margin-top: 1rem;
    font-size: 10px;
}

.ans-h-an {
    margin-bottom: .5rem;
    margin-top: .5rem;
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
.f-r {
  margin-left: 30px;
}
.ans-h-an{
  margin-left : .5rem !important;
}
.ans-h-na{
  margin-left : 1rem !important;
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px !important;
}
.hi{
  display:none
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
.form-status {
  font-size: 10px;
  margin-top: 10px;
}
  </style>`;

  Years = JSON.parse(localStorage.getItem("Years"));
  @Input() parentData;
  @Input()
  changeFromOutSide: any;

  fromParent = true;
  dialogRef;
  download;
  previewStatus;
  totalStatus;
  subParentForModal;
  ulbName='';
  stateName =''
  async ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.ulbName = userData['name'];
    this.stateName = userData['stateName'];
    this.subParentForModal =
      this.annualAccountsService.OpenModalTrigger.subscribe((change) => {
        if (this.changeFromOutSide) {
          this.openDialog(this.template);
        }
      });

    this.download = false;
    if (this.data && this.parentData === undefined) {
      this.fromParent = false;
    }
    console.log(this.data, "456789");

    this.previewStatuSet();
  }
  closeMat(){
    this._matDialog.closeAll();
  }

  ngOnDestroy(): void {
    this.subParentForModal.unsubscribe();
  }

  clickedDownloadAsPDF(template) {
    this.download = true;
    let changeHappen = sessionStorage.getItem("changeInAnnual");
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
    await this.submit();
    sessionStorage.setItem("changeInAnnual", "false");
    if (this.changeFromOutSide)
      this._ulbformService.initiateDownload.next(true);
    else await this.downloadAsPDF();
  }

  async submit() {
    return new Promise((resolve, rej) => {
      this.annualAccountsService.postData(this.data).subscribe(
        (res) => {
          sessionStorage.setItem("changeInAnnual", "false");
          console.log(res);
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.annualAccounts.isSubmit = res["isCompleted"];
          this._ulbformService.allStatus.next(status);
          swal("Record submitted successfully!");
          resolve("sucess");
        },
        (err) => {
          swal("Failed To Save");
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
  statusArray = [
    "Not Started",
    "In Progress",
    "Completed but Not Submitted",
    "Under Review By State",
  ];

  async previewStatuSet() {
    if (
      this.data.audited.submit_annual_accounts == null &&
      this.data.audited.submit_standardized_data == null
    ) {
      this.formStatusCheck = this.statusArray[0];
    } else {
      if (this.data.isDraft) {
        this.formStatusCheck = this.statusArray[1];
      } else {
        this.formStatusCheck = this.statusArray[2];
      }
    }

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
}
