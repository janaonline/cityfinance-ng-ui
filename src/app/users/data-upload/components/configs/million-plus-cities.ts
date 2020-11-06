import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MillionPlusCitiesDocuments } from '../../models/financial-data.interface';
import { FinancialUploadQuestion } from '../../models/financial-upload-question';

type fileKeys = keyof MillionPlusCitiesDocuments;

// const QuestionsIdMapping: { [key in fileKeys]: string } = {
//   cityPlan: "Garbage free star rating of the cities",
//   waterBalancePlan: "",
//   serviceLevelPlan: "",
//   solidWastePlan: "",
// };

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

// export type TT = {
//   key: fileKeys
//   question: string
// }[];

// let bb:TT;

// bb = [{key: 'cityPlan', question: 'adsas'}];

export { milliomPlusCitiesForm, millionPlusCitiesQuestions };
