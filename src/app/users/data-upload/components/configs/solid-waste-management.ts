import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SolidWasteManagementDocuments } from '../../models/financial-data.interface';
import { FinancialUploadQuestion } from '../../models/financial-upload-question';

type fileKeys = keyof SolidWasteManagementDocuments;

const QuestionsIdMapping: { [key in fileKeys]: string } = {
  garbageFreeCities: "",
  waterSupplyCoverage: "",
};

/**
 * @description his form is not meant to be used directly.
 * Instead use it through UploadDataUtility class.
 */
let solidWasteForm: FormGroup;
const _fb = new FormBuilder();

/**
 * @description  Each file group will have the following controls.
 */
const constrolgarbageFreeCitiesArray = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);
const constrolwaterSupplyCoverageArray = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);

solidWasteForm = _fb.group({
  garbageFreeCities: constrolgarbageFreeCitiesArray,
  waterSupplyCoverage: constrolwaterSupplyCoverageArray,
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
    question: "Coverage of water supply for public/community toilets",
  },
];

export { QuestionsIdMapping, solidWasteForm, solidWasterQuestions };
