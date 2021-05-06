import {
  Component,
  OnInit,
  Inject,
  Input,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { QuestionnaireService } from "../../../questionnaires/service/questionnaire.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { defaultDailogConfiuration } from "../../../questionnaires/state/configs/common.config";

// import * as jspdf from 'jspdf';
@Component({
  selector: "app-preview-uti-form",
  templateUrl: "./preview-uti-form.component.html",
  styleUrls: ["./preview-uti-form.component.scss"],
})
export class PreviewUtiFormComponent implements OnInit {
  @Input() parentData: any;
  @ViewChild("previewUti") _html: ElementRef;
  showLoader;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog
  ) {}
  styleForPDF = `<style>
  .cont {
    width: 794px;
    background-color: #FFFFFF;
    display: inline-block;
}

.container {
    padding-left: 0;
    padding-right: 0;
}

.header {
    height: 90px;
    text-align: center;
    background-color: #047474;
}
.header{
  word-break: break-all;
}

td, th{
  word-break: break-all;
  font-size: 9px !important;
  padding: 5px 1px !important;
}

.header {
  background-color: #047474;
  height: 50px;
  display: inline-block;
  color: #FFFFFF;
  text-align: center;
  font-weight:
}
.mat-dialog-content {
  padding: 0 0 0 0;
  max-width: 100vw;
  max-height: 100vw;
}
.listitem_head {
  padding: 2px 2px;
  font-size: 12px !important;
  font-family: Roboto;
  font-weight: normal;
  display: inline-block;
}
.listitem_grantYear {
  display: inline-block;
  font-weight: normal;
  width: 50px !important;
  height: 10px !important;
  color: #3D3D3D;
  margin-left: 10px;
  background-color: #E5E6E6;
  border-radius: 3px;
  padding: 4px;
}
.listitem_subHead {
  margin-top: 5px;
  font-size: 16px;
  font-weight: normal;
  font-family: Roboto;
  padding: 2px 2px;
  display: inline-block;
}
.dnDiv {
  margin-top: 10px;
  margin-right: 5%;
}
.dnldBtn {
  background-color: #26A1A1;
  color: #FFFFFF;
  font-weight: normal;
}
.card2Div {
  margin-top: 5px;
  padding: 2px 2px;
}
.mat-dialog-container {
  padding: 0;
}
.mat-card2 {
  padding: 5px 2px;
  margin-top: 10px;
  // margin: 10px 40px;
  background-color: #EBF5F5;
  display: block;
}
.card2 {
  width: 50%;
  font-weight: normal;
  padding: 2px 5px;
}
.crd-ls-div {
  margin-bottom: 15px;
}
.c-2-d {
  margin-left: 15px;
}
.card3 {
  width: 50%;
  font-weight: 500;
  padding: 2px 5px;
}
label {
  font-weight: normal;
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
  color: #51504F;
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
.font-9{
  font-size: 9px !important;
}
.pdf-hide{
  display: none;
}
.w-5{
width: 5% !important;
}
.w-10{
  width: 10% !important;
}
.w-11{
  width: 11% !important;
}
.w-12{
  width: 12% !important;
}
.w-15{
  width: 15% !important;
}

  </style>`;
  ngOnInit(): void {
    console.log(this.data);
    if (this.parentData) {
      this.data = this.parentData;
    }
  }

  // makePdf() {
  //   let showMagicDisplay = document.querySelectorAll('[class*="pdf-hide"]');
  // showMagicDisplay.forEach((item) => {
  // item.classList.add("d-none");
  // });

  // let doc = new jspdf('1' , 'mm' , 'a4');
  //   const content = this._html.nativeElement;
  // doc.fromHTML(content.innerHTML, 15, 15, {
  // width: 190
  // });
  //doc.save("obrz.pdf");
  //  doc.addHTML(this._html.nativeElement, function() {
  //   doc.save("utilization-report.pdf");
  //   showMagicDisplay.forEach((item) => {
  //     item.classList.remove("d-none");
  //      });
  //   });

  //  doc.addHTML(this._html.nativeElement, function() {
  //   doc.save("utilization-report.pdf");
  //   showMagicDisplay.forEach((item) => {
  //     item.classList.remove("d-none");
  //      });
  //   });

  //   }

  downloadForm() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "utilization-report.pdf");
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
}
