import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";
import { Router, Event } from "@angular/router";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import { ActionplanserviceService } from "../actionplanservice.service";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
@Component({
  selector: "app-actionplanspreview",
  templateUrl: "./actionplanspreview.component.html",
  styleUrls: ["./actionplanspreview.component.scss"],
})
export class ActionplanspreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    public _router: Router,
    private _questionnaireService: QuestionnaireService,
    public actionplanserviceService: ActionplanserviceService
  ) {}
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 70px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1.6rem !important;
    font-weight: 700;

}

.card {
    margin-top: 10px !important;
    padding: 5px 10px;
    background-color: #EBF5F5;
}

.qus-h {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px !important;
}

.ans-h {
    margin-bottom: .5rem;
    margin-left: 1.2rem;
    margin-top: .5rem;
    font-size: 10px !important;
}
.m-r{
margin-bottom: 1.5rem !important;
}

.h-cls{
      display: none;
    }
.form-status {
      font-size: 10px;
      margin-top: 10px;
    }

  </style>`;
  @ViewChild("waterRe") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
  dialogRef;
  err = "";
  status;

  ngOnInit(): void {
    this.setStatus();
    console.log(this.data);
  }

  clickedDownloadAsPDF() {
    let change = sessionStorage.getItem("changeInActionPlans");
    if (change == "true") {
      this.openModal(this.template);
    } else {
      this.downloadAsPDF();
    }
  }

  close() {
    this._matDialog.closeAll();
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "gtcertificate.pdf");
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

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
  }

  stay() {
    this.dialogRef.close(true);
  }

  proceed(uploadedFiles) {
    this._matDialog.closeAll();
    this.postsDataCall(uploadedFiles);
    this.downloadAsPDF();
    return;
  }
  postsDataCall(uploadedFiles) {
    return new Promise((resolve, reject) => {
      this.actionplanserviceService.postFormData(this.data).subscribe(
        async (res) => {
          sessionStorage.setItem("changeInActionPlans", "false");
          swal("Record Submitted Successfully!");
          resolve(res);
        },
        (error) => {
          this.err = error.message;
          console.log(this.err);
          swal(`Error- ${this.err}`);
          resolve(error);
        }
      );
    });
  }

  alertClose() {
    this.stay();
  }

  setStatus() {
    if (this.data.isDraft == null) {
      this.status = "Not Started";
    } else if (this.data.isDraft) {
      this.status = "In Progress";
    } else if (!this.data.isDraft) {
      this.status = "Completed but Not Submitted";
    }
  }
}
