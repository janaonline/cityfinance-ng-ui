import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { FiscalRankingService } from '../../fiscal-ranking.service';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-ulb-fis-preview',
  templateUrl: './ulb-fis-preview.component.html',
  styleUrls: ['./ulb-fis-preview.component.scss']
})
export class UlbFisPreviewComponent implements OnInit {

  @ViewChild("preData") _html: ElementRef;
  @ViewChild("templateSave") template;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router,
    private _questionnaireService: QuestionnaireService,
    private fiscalService: FiscalRankingService,
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    console.log({ html: this._html});
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
    this.stateName = this.userData?.stateName;
   }

  userData;
  ulbName = '';
  stateName = '';
  yearIdArr;
  ulbId = "";
  styleForPDF = `<style>
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
.pdf-hide{
  display : none;
}
.m-hed {
    font-size: 12px;
    margin-top: 1rem;
    font-weight: 500;
    margin-bottom: .5rem;
    text-align: center;
}
.f-label {
  font-size: 11px;
  margin-bottom: .5rem;
}
.yr-l {
  display : inline-block;
  width: 50%;
  font-size: 9px;
}
.yr-ans {
  display : inline-block;
  width: 50%;
  font-size: 9px;
}
.form-l {
  font-size: 11px;
  margin-bottom: .5rem;
}
.mb-1 {
  margin-bottom: .5rem;
}
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 6px;
  padding: 6px;
  margin-bottom: 1rem;
  margin-left: .5rem;
}
  </style>`;
  ngOnInit(): void {
    //preview data
    console.log('preview data', this.data)
  }
  returnZero() {
    return 0;
  }
  closeMat(){
    this.dialog.closeAll();
  }

  clickedDownloadAsPDF(template) {
    let canNavigate = sessionStorage.getItem("changeInFR");
    if (canNavigate == "true") {
      this.openDialog(template);
      return;
    } else {
      this.downloadAsPdf();
    }
   // this.downloadAsPdf();
  }
  downloadAsPdf(){
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
   // this.showLoader = true;

    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "fiscalRanking_2022-23.pdf");
     //   this.showLoader = false;
      },
      (err) => {
     //   this.showLoader = false;
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
 //   this.showLoader = false;
    this.dialog.open(DialogComponent, { data: option });
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
    this.dialogRef = this.dialog.open(template, dialogConfig);
  }
  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
  async proceed(uploadedFiles) {
    this.dialogRef.close();
    this.dialog.closeAll();
   // this.preData.body["isDraft"] = true;
    await this.submit();
    sessionStorage.setItem("changeInFr", "false");
    await this.downloadAsPdf();
  }

  async submit() {
    return new Promise((resolve, rej) => {
      this.fiscalService.postFiscalRankingData(this.data?.preData).subscribe((res) => {
        console.log('post res', res);
          swal('Saved', "Data save as draft successfully!", 'success');
          sessionStorage.setItem("changeInFR", "false");
          resolve('success');
      },
        (error) => {
          console.log('post error', error);
          resolve(error);
        }
      )

    });
  }

}
