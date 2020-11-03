import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MillionPlusCitiesDocuments } from '../../models/financial-data.interface';
import { FinancialUploadQuestion } from '../../models/financial-upload-question';

type fileKeys = keyof MillionPlusCitiesDocuments;

/**
 * @description his form is not meant to be used directly.
 * Instead use it through UploadDataUtility class.
 */
let milliomPlusCitiesForm: FormGroup;
const _fb = new FormBuilder();

milliomPlusCitiesForm = _fb.group({
  cityPlan: [null, [Validators.required]],
  waterBalancePlan: [null, [Validators.required]],
  serviceLevelPlan: [null, [Validators.required]],
  solidWastePlan: [null, [Validators.required]],
});

const millionPlusCitiesQuestions: FinancialUploadQuestion<
  MillionPlusCitiesDocuments
>[] = [
  {
    key: "cityPlan",
    question: "City Plan DPR",
  },
  {
    key: "waterBalancePlan",
    question: "Water Balance Plan.",
  },
  {
    key: "serviceLevelPlan",
    question: "Service Level Improvement Plan",
  },
  {
    key: "solidWastePlan",
    question: "Solid Waste Management Plan",
  },
];

export { milliomPlusCitiesForm, millionPlusCitiesQuestions };
