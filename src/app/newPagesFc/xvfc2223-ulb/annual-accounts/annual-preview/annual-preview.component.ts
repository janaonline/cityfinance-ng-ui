import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { USER_TYPE } from "src/app/models/user/userType";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
@Component({
  selector: "app-annual-preview",
  templateUrl: "./annual-preview.component.html",
  styleUrls: ["./annual-preview.component.scss"],
})
export class AnnualPreviewComponent implements OnInit {
  constructor(
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    @Inject(MAT_DIALOG_DATA) public preData: any
  ) {}
  @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateAnnual") template;
  showLoader;
  ulbName = "";
  stateName = "";
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
.optionalText{
  padding-left: 2.5rem;
          margin-top: .5rem;
          margin-bottom: 1.5rem;
          font-size:7px;
}

  </style>`;
  ngOnInit(): void {
    console.log("pre data", this.preData);

    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = userData["name"];
    }
    this.stateName = userData["stateName"];
  }
  closeMat() {
    this._matDialog.closeAll();
  }
  annualDownload() {
    this.downloadAsPDF();
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
}
