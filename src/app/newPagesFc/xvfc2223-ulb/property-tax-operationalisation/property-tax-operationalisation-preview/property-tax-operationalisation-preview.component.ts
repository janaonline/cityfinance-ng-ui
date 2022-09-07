import { Component, ElementRef, OnInit, ViewChild, Inject, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { USER_TYPE } from "src/app/models/user/userType";
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";
//import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from "src/app/pages/questionnaires/ulb/configs/common.config";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-property-tax-operationalisation-preview',
  templateUrl: './property-tax-operationalisation-preview.component.html',
  styleUrls: ['./property-tax-operationalisation-preview.component.scss']
})
export class PropertyTaxOperationalisationPreviewComponent implements OnInit {

  constructor(private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: NewCommonService) { }
  @ViewChild("gtcpre") _html: ElementRef;
  // @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateSave") template;
  dialogRef;
  download;
  showLoader;
  ulbName = "";
  stateName = "";
  fileUrl: any;
  fileName: any;
  hideUnderline:boolean = false;
  formStatus:any;

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
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
.m-d{
  margin-top: 10px !important;
}
.form-status {
  font-size: 10px;
}
.h-cls{
  display: none;
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
      td, th{
        word-break: break-all;
        font-size: 9px !important;
        padding: 5px 1px !important;
      }
      .na-cls {
        text-decoration: none;
        color: black;
        pointer-events: none;
    }

    </style>`
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.data)
    if (!this.data?.dataPreview.hasOwnProperty('isDraft')) {
      this.formStatus = "Not Started"
    } else {
      if(this.data?.dataPreview?.isDraft){
        this.formStatus = "In Progress"
      } else if(!this.data?.dataPreview?.isDraft){
        this.formStatus = "Completed"
      }
    }
    this.data?.dataPreview?.rateCard?.url == '' ? this.hideUnderline = true : false
    this.data?.dataPreview?.ptCollection?.url == '' ? this.hideUnderline = true : false
    this.data?.dataPreview?.proof?.url == '' ? this.hideUnderline = true : false

    if (userData.role !== USER_TYPE.ULB) {
      this.ulbName = sessionStorage.getItem("ulbName");
    } else {
      this.ulbName = userData["name"];
    }
    this.stateName = userData["stateName"];

  }
  clickedDownloadAsPDF(template) {
    this.download = true;
    let changeHappen;

      changeHappen = sessionStorage.getItem("changeInPropertyTaxOp");

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
    let downloadFileName = this.fileName ? this.fileName : "propertyTaxOperationalisation.pdf";
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
    //  if (this.changeFromOutSide)
    // this._ulbformService.initiateDownload.next(true);
    //  else await this.downloadAsPDF();
  }

  async submit() {
    console.log("propertytaxop save", this.data?.formData);
    let body = { ...this.data?.dataPreview, isDraft: true };
    return new Promise((resolve, rej) => {
      this.commonService.postPropertyTaxUlb(body).subscribe(
        (res) => {
            sessionStorage.setItem("changeInPropertyTaxOp", "false");
          console.log(res);
          // const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.annualAccounts.isSubmit = res["isCompleted"];
          // this._ulbformService.allStatus.next(status);
          swal("Saved", "Data saved as draft successfully", "success");
          resolve("sucess");
        },
        (err) => {

         
          sessionStorage.setItem("changeInPropertyTaxOp", "false");


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
}
