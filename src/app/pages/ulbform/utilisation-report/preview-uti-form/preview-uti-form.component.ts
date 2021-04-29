import { Component, OnInit, Inject, Input, ElementRef, ViewChild} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionnaireService } from '../../../questionnaires/service/questionnaire.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';

// import * as jspdf from 'jspdf';
@Component({
  selector: 'app-preview-uti-form',
  templateUrl: './preview-uti-form.component.html',
  styleUrls: ['./preview-uti-form.component.scss']
})
export class PreviewUtiFormComponent implements OnInit {


  @ViewChild("previewUti") _html: ElementRef;
  showLoader;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private _questionnaireService: QuestionnaireService,private _matDialog: MatDialog) { }
  styleForPDF=`<style>
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

.listitem_head {
    color: #FFFFFF;
    font-size: 14px !important:
    font-family: Roboto;
    font-weight: normal;
    text-align: center;
    display: inline-block;
    margin-top: 26px;
}
.qus-i{
  font-size: 12px !important;
}
.qus-div{
  width: 40%;
  font-size:12px;
}
.ans-div{
  width: 50% !important;
}
.q-h-fc{
  font-size: 12px !important;
}
  .listitem_grantYear {
    display: inline-block;
    font-weight: normal;
    width: 90px;
    height: 28px;
    color: #3D3D3D;
    margin-left: 10px;
    background-color: #E5E6E6;
    border-radius: 3px;

}

.card {
    margin-bottom: 10px;
    padding: 1rem;
    background-color: #EBF5F5;
}

.card .div {
    display: inline-block;
}

.i-d {
    display: inline-block;
    margin-left: 15px;
}

.i-d-m {
    display: inline-block;
    margin-left: 40%;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    vertical-align: middle;
    padding: 4px 0px;
    font-size: 12px
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
tr{
  font-size:12px;

}
th{
  font-size:12px;
}
td{
  font-size: 12px
}




.d-none {
    display: none;
}
  </style>`
  ngOnInit(): void {
console.log(this.data)
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
          this.downloadFile(res.slice(0), "pdf", "Questionnaire.pdf");
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
