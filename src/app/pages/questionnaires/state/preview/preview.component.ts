import { Component, OnInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
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

  constructor() {}

  ngOnInit() {}

  async downloadasPDF() {
    this.showLoader = true;
    // const doc = new jsPDF();
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
}
