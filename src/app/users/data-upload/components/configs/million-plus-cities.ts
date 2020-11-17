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

/**
 * @description  Each file group will have the following controls.
 */
const cityPlan = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);
const waterBalancePlan = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);
const serviceLevelPlan = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);
const solidWastePlan = _fb.array([
  _fb.group({
    name: [null, [Validators.required]],
    url: [null, [Validators.required]],
    status: [null],
    rejectReason: [null],
  }),
]);

milliomPlusCitiesForm = _fb.group({
  cityPlan: cityPlan,
  waterBalancePlan: waterBalancePlan,
  serviceLevelPlan: serviceLevelPlan,
  solidWastePlan: solidWastePlan,
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
    question: "Water Balance Plan",
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
