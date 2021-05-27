import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { QuestionnaireService } from '../../../questionnaires/service/questionnaire.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { AnnualAccountsService } from '../annual-accounts.service'
import { UlbformService } from "../../ulbform.service";
import { SweetAlert } from "sweetalert/typings/core";
import { Router, Event } from "@angular/router";
import {AnnualAccountsComponent} from "../annual-accounts.component"
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dataEntryService: DataEntryService,
    private _questionnaireService: QuestionnaireService,
    private annualAccountsService: AnnualAccountsService,
    public _ulbformService: UlbformService,
    public _router: Router,
    private _matDialog: MatDialog) { }
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 70px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1.5rem !important;
    font-weight: 700;

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
  </style>`

  Years = JSON.parse(localStorage.getItem("Years"));
  @Input() parentData;

  fromParent = true
  year2021;
  year2019;
  dialogRef
  download
  previewStatus;


  ngOnInit(): void {
    this.download = false;
    if (this.data) {
      this.parentData = this.data;
      this.fromParent = false
    }
    this.setData();
    this.previewStatuSet();
  }

  setData() {
    if (this.Years["2020-21"] == this.parentData[0].year) {
      this.year2021 = this.parentData[0];
      this.year2019 = this.parentData[1];
    } else {
      this.year2021 = this.parentData[1];
      this.year2019 = this.parentData[0];
    }
  }
  clickedDownloadAsPDF(template) {
    this.download = true
    let changeHappen = sessionStorage.getItem("changeInAnnual");
    if (changeHappen === 'true') {
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

  async proceed(uploadedFiles) {
    this._matDialog.closeAll();
    debugger
    await this.submit()
    await this.downloadAsPDF();
    sessionStorage.setItem("changeInAnnual", "false");
  }


  async submit() {
    this.setData();
    console.log(this.year2021)
    console.log(this.year2019)
    await this.checkForm(this.year2021);
    await this.checkForm(this.year2019);
    await this.save(this.year2021);
    await this.save(this.year2019);

    sessionStorage.setItem("changeInAnnual", "false");
  }

  async save(form) {
    let AnnualAccounts = new AnnualAccountsComponent(this.dataEntryService,this.annualAccountsService,this._matDialog,this._ulbformService,this._router,this._matDialog);
    await AnnualAccounts.save(form)
  }
  async checkForm(form) {
    let AnnualAccounts = new AnnualAccountsComponent(this.dataEntryService,this.annualAccountsService,this._matDialog,this._ulbformService,this._router,this._matDialog);
    await AnnualAccounts.checkForm(form)
  }

  errorHandler(form, key, key2, key3 = null) {
    let AnnualAccounts = new AnnualAccountsComponent(this.dataEntryService,this.annualAccountsService,this._matDialog,this._ulbformService,this._router,this._matDialog);
    AnnualAccounts.errorHandler(form, key, key2, key3)
  }

  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }

  previewStatuSet(){
    const annualData = JSON.parse(sessionStorage.getItem("annualAccounts"))
    if(annualData[0]['isCompleted'] == null && annualData[1]['isCompleted'] == null){
      this.previewStatus = "Not Started"
    }else{
      this.previewStatus = "In progress"
    }
    if(annualData[0]['isCompleted'] && annualData[1]['isCompleted']){
      this.previewStatus = "Completed"
    }
  }
}
