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
    hint:
      "City plan/DPR including year wise targets for 2020-26 to be prepared by each city in consultation with respective States.",
  },
  {
    key: "waterBalancePlan",
    question: "Water Balance Plan",
  },
  {
    key: "serviceLevelPlan",
    question: "Service Level Improvement Plan",
    hint:
      "Service Level Improvement Plans (SLIPs), with reference to baseline year 2020-21 for water supply including universal coverage, water security by means of water conservation, recovery of user charges, decrease in non-revenue water, and reuse of treated water.",
  },
  {
    key: "solidWastePlan",
    question: "Solid Waste Management Plan",
    hint:
      "Solid Waste Management, the cities shall prepare a plan for environmentally sustainable 100% collection with segregation and recycling of solid waste to achieve garbage free cities.",
  },
];

export { milliomPlusCitiesForm, millionPlusCitiesQuestions };
