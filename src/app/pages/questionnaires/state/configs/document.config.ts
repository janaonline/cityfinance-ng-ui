import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IQuestionnaireDocumentsCollection } from '../../model/document-collection.interface';

const QuestionsIdMapping = {
  State_Acts_Doc:
    "Latest copies of the State Municipal Corporation Act and State Municipalities Act along with copies of amendments pertaining to provisions of the property tax and/or user charges (Please highlight the sections relevant to property tax and user charges if possible)",
  State_Rules_Doc:
    "Latest copies of the Notified Rules and any amendments therein that pertain to property tax and/or user charges",
  Admin_Doc:
    "Other Acts/bye-laws/Rules that govern the administration of property tax and/or user charges",
  Implement_Doc:
    "PPT/Word file/PDF doc containing the implementation plan for meeting the conditions of the scheme",
  Other_Doc: "Other documents relevant to the questionnaire",
};

type fileKeys = keyof IQuestionnaireDocumentsCollection;

let documentForm: FormGroup;
const _fb = new FormBuilder();

documentForm = _fb.group({
  State_Acts_Doc: [null, [Validators.required]],
  State_Amendments_Doc: [null],
  City_Acts_Doc: [null],
  State_Rules_Doc: [null],
  City_Amendments_Doc: [null],
  City_Rules_Doc: [null],
  Admin_Doc: [null],
  Implement_Doc: [null],
  Other_Doc: [null],
});

export { QuestionsIdMapping, documentForm };
