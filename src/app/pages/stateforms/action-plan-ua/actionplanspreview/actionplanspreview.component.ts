import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
  TemplateRef,
  OnDestroy,
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
import { StateformsService } from "../../stateforms.service";
@Component({
  selector: "app-actionplanspreview",
  templateUrl: "./actionplanspreview.component.html",
  styleUrls: ["./actionplanspreview.component.scss"],
})
export class ActionplanspreviewComponent implements OnInit, OnDestroy{
  @Input() parentData: any;
  @Input()
  changeFromOutSide: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    public _router: Router,
    private _questionnaireService: QuestionnaireService,
    public actionplanserviceService: ActionplanserviceService,
    public stateformsService: StateformsService
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
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}
.d-m {
  margin-bottom: .7rem;
}
.form-status {
  font-size: 10px;
}
.st-d {
  margin-top: 7px !important;
  margin-bottom: 7px !important;
}
.sub-m-h{
    font-size: 17px;
    font-weight: 600;
    text-align: center;
}
.header-u-p {
  background-color: #047474;
  text-align: center;
  height: 60px;
}

.heading-u-p {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
  padding-top: 1.3rem !important;
}
.slb-pd-t {
  background-color: #047474;
  text-align: center;
  height: 60px;
}
.slb-h{
  font-size: 18px;
  padding-top: 1.3rem !important;
  font-weight: 700;
}
.card {
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

.h-cls{
      display: none;
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

.m-h{
  text-align: center;
}
.cont {
  width: 794px;
  background-color: #FFFFFF;
  display: inline-block;
}

.container {
  padding-left: 0;
  padding-right: 0;
}
.header-p{
  word-break: break-all;
}

td, th{
  word-break: break-all;
  font-size: 9px !important;
  padding: 5px 1px !important;
}


.thHeader {
  background-color: #E9E9E9;
  color: #047474;
  font-size: 15px;
  font-weight: normal;
}
th {
  font-weight: normal;
  vertical-align: middle;
  text-align: center;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  vertical-align: middle;
  padding: 10px 6px;
}
.bor-in-l {
  word-break: break-all;
}
.tableFooterDiv {
  background-color: #E7E7E7;
  color: #000000;
  font-size: 16px;
}
.f-d-n {
  background-color: #CFCFCF;
  width: 235px;
  height: 35px;
  padding: 7px 8px;
  height: 15px !important;
}
.d-none {
  display: none;
}
label{
  font-size: 9px !important;
}

@media print {
  .page-break {page-break-before: always;}
}
:root {
  font-size: 14px;
}
table tbody tr {
  border: 100px solid black;
}
  table tbody tr:nth-child(even) {
  background: #d7ebeb;
}
 table tbody tr:nth-child(even) td {
  border:1px solid #d7ebeb;
}
  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: .9rem;
  }

   h4 {
    font-size: .7rem;
  }
     h5 {
    font-size: .5rem;
  }

  table thead th {
    font-size: .5rem
  }

  table tbody td, li {
    font-size: .5rem
  }

  .td-width {
    width: 25%;
  }

  button {
    display: none;
  }
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.form-status {
  font-size: 10px;
  margin-top: 10px;

}

.fa-times {
  display: none;
}
.qus-slb {
  margin-left: 2%;
  font-weight: normal;
  font-size: 12px;
}

.ans-slb {
  margin-left: 1rem;
  font-weight: normal;
  font-size: 12px;
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

.ans-slb-a {
  margin-left: 5.8rem;
  font-weight: normal !important;
  font-size: 10px !important;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  vertical-align: inherit;
  text-align: center;
}

.fa-times {
  display: none;
}
.qus-slb {
  margin-left: 2%;
  font-weight: normal;
  font-size: 12px;
}

#donwloadButton{
display: none;
}
h5{
display: inline-flex;
}
.d-i{
display: inline-flex;
width : 33.33%;
}
.mr-l{
margin-left: 22%;
}
  </style>`;
  @ViewChild("actionP") _html: ElementRef;
  @ViewChild("template") template;
  showLoader;
  dialogRef;
  err = "";
  status;
  stateName;
  ulbName;
  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  subParentForModal;
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.ulbName = userData["name"];
    this.stateName = userData["stateName"];
    if(this.parentData){
    this.data = this.parentData;
  }
  this.subParentForModal = this.actionplanserviceService.OpenModalTrigger.subscribe(
    (change) => {
      if (this.changeFromOutSide) {
        this.openModal(this.template);
      }
    }
  );
    this.setStatus();
    console.log(this.data);

  }
  ngOnDestroy(): void {
    if (this.subParentForModal) this.subParentForModal.unsubscribe();
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
        this.downloadFile(res.slice(0), "pdf", "actionPlan.pdf");
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
    sessionStorage.setItem("changeInActionPlans", "false")
    if (this.changeFromOutSide) {
      this.stateformsService.initiateDownload.next(true);
    } else this.downloadAsPDF();
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

  includeParaAgency(data) {
    for (let index = 0; index < data.projectExecute.length; index++) {
      const element = data.projectExecute[index];
      if (element.paraAgency != "") {
        return true;
      }
    }
    return false;
  }
}
