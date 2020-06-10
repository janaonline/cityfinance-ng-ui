import { Component, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf';

import { documentForm, QuestionsIdMapping as documentQuestions } from '../configs/document.config';
import { propertyTaxForm, QuestionsIdMapping as propertyTaxQuestion } from '../configs/property-tax.cofig';
import { QuestionsIdMapping as userChargesQuestion, userChargesForm } from '../configs/user-charges.config';

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"],
})
export class PreviewComponent implements OnInit {
  propertyTaxQuestion = propertyTaxQuestion;
  propertyTaxForm = propertyTaxForm;
  userChargesQuestion = userChargesQuestion;
  userChargesForm = userChargesForm;
  documentQuestions = documentQuestions;
  documentForm = documentForm;
  showLoader = false;
  baseValue = 1;

  pdfDownloadConfig = {
    margin: 0.5,
    filename: "questionnaire.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
  };

  constructor() {}

  ngOnInit() {}

  async downloadAsPDFWithjsPDF() {
    this.showLoader = true;

    const canvasDimensions = document
      .getElementById("preview")
      .getBoundingClientRect();
    const height =
      canvasDimensions.height > 2048 ? canvasDimensions.height : 2048;
    // console.log(height);
    // const width = canvasDimensions.width > 1614 ? canvasDimensions.width : 1614;
    const option: Partial<html2canvas.Options> = {
      scale: 1,
      height: height * this.baseValue,
      width: 1614 * this.baseValue,
      logging: false,
    };
    const clonedElement = document.getElementById("preview");
    // clonedElement.style.fontSize = "55px";
    const canvas = await html2canvas.default(clonedElement, option);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png", 1.0);
    /**
     * IMPORTANT A4 Specs = 210mm * 297mm
     */
    pdf.addImage(imgData, "PNG", 5, 0, 201, 290);
    pdf.save(`Questionnaire.pdf`);
    this.showLoader = false;
  }

  async downloadasPDF() {
    $("section").css("font-size", "24px");

    this.showLoader = true;
    const element = document.getElementById("preview");

    // New Promise-based usage:
    // const sometinh = html2pdf().set(this.pdfDownloadConfig).from(element);

    await html2pdf().set(this.pdfDownloadConfig).from(element).save();
    console.log(`downloaded`);
    $("section").css("font-size", "38px");

    // pdf.save(`Questionnaire.pdf`);

    this.showLoader = false;
  }

  printHtmldiv() {
    const pdf = new jsPDF("p", "pt", "letter");

    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    const source = document.getElementById("preview");

    // we support special element handlers. Register them with jQuery-style
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors
    // (class, of compound) at this time.
    const specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      "#bypassme": function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      },
    };

    const margins = {
      top: 0,
      bottom: 0,
      left: 0,
      width: 522,
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, // y coord
      {
        width: margins.width, // max width of content on PDF
        elementHandlers: specialElementHandlers,
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save("Mypdf.pdf");
      },
      margins
    );
  }
}
