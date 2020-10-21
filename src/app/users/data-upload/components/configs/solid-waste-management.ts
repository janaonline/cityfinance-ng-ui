import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SolidWasteManagementDocuments } from '../../models/financial-data.interface';
import { FinancialUploadQuestion } from '../../models/financial-upload-question';

type fileKeys = keyof SolidWasteManagementDocuments;

const QuestionsIdMapping: { [key in fileKeys]: string } = {
  garbageFreeCities: "",
  waterSupplyCoverage: "",
};

let solidWasteForm: FormGroup;
const _fb = new FormBuilder();

solidWasteForm = _fb.group({
  garbageFreeCities: [null, [Validators.required]],
  waterSupplyCoverage: [null, [Validators.required]],
});

const solidWasterQuestions: FinancialUploadQuestion<
  SolidWasteManagementDocuments
>[] = [
  {
    key: "garbageFreeCities",
    question: "Garbage free star rating of the cities",
  },
  {
    key: "waterSupplyCoverage",
    question: "Coverage of water supply for public/community toilets.",
  },
];

export { QuestionsIdMapping, solidWasteForm, solidWasterQuestions };
