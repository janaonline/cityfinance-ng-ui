import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

import { QuestionnaireService } from '../../service/questionnaire.service';
import { defaultDailogConfiuration } from '../configs/common.config';
import { documentForm, QuestionsIdMapping as documentQuestions } from '../configs/document.config';
import { propertyTaxForm, QuestionsIdMapping as propertyTaxQuestion } from '../configs/property-tax.cofig';
import { QuestionsIdMapping as userChargesQuestion, userChargesForm } from '../configs/user-charges.config';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  @ViewChild("preview") _html: ElementRef;
  propertyTaxQuestion = propertyTaxQuestion;
  propertyTaxForm = propertyTaxForm;
  userChargesQuestion = userChargesQuestion;
  userChargesForm = userChargesForm;
  documentQuestions = documentQuestions;
  documentForm = documentForm;
  showLoader = false;
  baseValue = 1;

  /**
   * IMPORTANT  For the pdf format donwload of form, we need to maintain a sperate style for it or we have to
   * inline the styling. Currently, it is kept seperate. Any style changes done to the html part needs to be
   * manually applied for it to work on pdf version also.
   */

  styleForPDF = `<style>
    table tbody tr td:nth-child(1) {
        width: 3%;
        position: relative;
    }
    table {
        font-size: 0.5em !important;
    }
    table td {
        padding-top: 1%;
    }
    #preview {
        position: relative;
        display: block;
        font-size: 15px;
    }

    #preview .tab-heading {
        font-size: 1em;
    }
    .main-section-header {
        font-size: 0.7em;
        margin-top: 1em;
    }
    .question-number {
        position: absolute;
        top: 5px;
    }
    .question {
        position: relative;
    }
    .action-plan,
    .implementation-plan {
        font-size: 0.5em;
        margin-bottom: 0px;
        margin-top: 1%;
    }
    .download-link {
        margin-right: 5px;
    }

    .text-center,
    .header {
        text-align: center;
    }
</style>`;

  constructor(
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {}

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
