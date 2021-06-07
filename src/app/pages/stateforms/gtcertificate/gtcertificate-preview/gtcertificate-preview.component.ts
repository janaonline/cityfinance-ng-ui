import { Component, ElementRef, Inject, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { GTCertificateService } from '../gtcertificate.service'
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtcertificate-preview',
  templateUrl: './gtcertificate-preview.component.html',
  styleUrls: ['./gtcertificate-preview.component.scss']
})
export class GtcertificatePreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _questionnaireService: QuestionnaireService,
    private gtcService: GTCertificateService,


  ) { }
  @ViewChild("gtcpre") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
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

    </style>`

  ngOnInit() {
    console.log('preData', this.data)
  }

  clickedDownloadAsPDF() {
    let change = sessionStorage.getItem("changeInGTC");
    if (change == "true") {
      this.openModal(this.template)
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
  clicked = 0
  routerNavigate = null
  dialogRef
  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result)
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  async stay() {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null
    }

  }


  async proceed(uploadedFiles) {
    await this._matDialog.closeAll();

    this.postsDataCall(uploadedFiles);
    sessionStorage.setItem("changeInGTC", "false")
    this.downloadAsPDF();
    return;
  }
  err = ''
  postsDataCall(uploadedFiles) {
    return new Promise((resolve, reject) => {

      this.gtcService.sendRequest(this.data)
        .subscribe(async (res) => {
          // const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.isCompleted = res['data']["isCompleted"];
          // this._stateformsService.allStatus.next(status);
          sessionStorage.setItem("changeInGTC", "false")
          swal('Record Submitted Successfully!')
          resolve(res)
        },
          error => {
            this.err = error.message;
            console.log(this.err);
            swal(`Error- ${this.err}`)
            resolve(error)
          });
    })

  }

  alertClose() {
    this.stay();
  }


}





