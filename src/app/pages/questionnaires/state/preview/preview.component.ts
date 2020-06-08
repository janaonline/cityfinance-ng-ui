import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
