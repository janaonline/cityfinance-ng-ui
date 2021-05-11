import { Component, OnInit, Inject, Input, ElementRef, ViewChild} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionnaireService } from '../../../questionnaires/service/questionnaire.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';

@Component({
  selector: "app-water-sanitation-preview",
  templateUrl: "./water-sanitation-preview.component.html",
  styleUrls: ["./water-sanitation-preview.component.scss"],
})
export class WaterSanitationPreviewComponent implements OnInit {

  @ViewChild("planPre") _html: ElementRef;
  showLoader;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
  private _questionnaireService: QuestionnaireService,private _matDialog: MatDialog) { }
  styleForPDF=`<style>
  .header {
    background-color: #047474;
    height: 100px;
    text-align: center;
}

.heading {
    color: #FFFFFF;
    font-size: 22px;
    padding: 2rem;
    margin-top: 3rem !importent;
}

.card {
    padding: 5px 10px;
    // margin: 10px 40px;
    background-color: #EBF5F5;
}

.qus-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.ans-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
}
.h-cls{
      display: none;
    }

  </style>`

ngOnInit(): void {
  console.log(this.data)
}

downloadAsPDF() {
  const elementToAddPDFInString = this._html.nativeElement.outerHTML;
  const html = this.styleForPDF + elementToAddPDFInString;
  this.showLoader = true;
  this._questionnaireService.downloadPDF({ html }).subscribe(
    (res) => {
      this.downloadFile(res.slice(0), "pdf", "water-sanitation.pdf");
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
