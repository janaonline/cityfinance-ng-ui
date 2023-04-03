import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { USER_TYPE } from 'src/app/models/user/userType';
import { QuestionnaireService } from 'src/app/pages/questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from 'src/app/pages/questionnaires/ulb/configs/common.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-twenty-eight-slb-preview',
  templateUrl: './twenty-eight-slb-preview.component.html',
  styleUrls: ['./twenty-eight-slb-preview.component.scss']
})
export class TwentyEightSlbPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _matDialog: MatDialog,
  private _questionnaireService: QuestionnaireService,
  private newCommonService: NewCommonService,
  ) {
    console.log(data)
  }
  ulbName = "";
  stateName = "";
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 75px;
    text-align: center;
}
.fieldHeading{
  background-color: #047474;
  color: #FFFFFF;
}
.heading-p {
  color: #FFFFFF;
  font-size: 18px;
  padding-top: 1rem !important;
  font-weight: 500;

}
.sub-h {
font-weight: 500 !important;
font-size: 13px;
}
.headingClass{
  font-weight: 500 !important;
  font-size: 12px;
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
.hi{
  display:none
}

.form-status {
  font-size: 10px;
  margin-top: 10px;
}

.h-h {
  align-items: left;
  font-size: 10px !important;
  font-weight: 400;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 3px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.pop-t {
  font-size: 10px;
  margin-top: 12px;
}
.d-i {
  display: inline-block !important;
}
.d-m{
  margin-left: 4px;
}
.th-h{
  padding-top : 5px !important;
  padding-bottom : 5px !important;
  font-size : 11px !important;
}
  </style>`;
  ngOnInit(): void {
    this.getUserData();
    if(this.data?.isDraft == true){
      this.formStatus = "In Progress";
    }else if(this.data?.isDraft == false){
      this.formStatus = "Completed";
    }else{
      this.formStatus = "Not Started";
    }
  }
  getUserData() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = userData["name"];
    }
    this.stateName = userData["stateName"];
  }
  returnZero() {
    return 0;
  }
  dialogRef;
  download;
  showLoader;
  formStatus= "";
  @ViewChild("gtcpre") _html: ElementRef;
  clickedDownloadAsPDF(template) {
    this.download = true;
    let changeHappen = sessionStorage.getItem("changeIn28SLB");
    console.log(changeHappen)
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
    let downloadFileName =  "slb28.pdf";
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", downloadFileName);
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
  closeMat() {
    this._matDialog.closeAll();
  }
  async proceed(uploadedFiles) {
    this.dialogRef.close();
    this._matDialog.closeAll();
    await this.submit();

    await this.downloadAsPDF();
  }

  async submit() {
    delete this.data?.saveDataJson["isDraft"];
    let body = { ...this.data?.saveDataJson, isDraft: true };
    return new Promise((resolve, rej) => {
      this.newCommonService.post28SlbsData(body).subscribe(
        (res) => {
          swal("Saved", "Data saved as draft successfully", "success");
          sessionStorage.setItem("changeIn28SLB", "false");
          this.newCommonService.setFormStatus2223.next(true);
          resolve("sucess");
        },
        (err) => {
          swal("Error", "Failed To Save", "error");
          sessionStorage.setItem("changeIn28SLB", "false");
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
}
