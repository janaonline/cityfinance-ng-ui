import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WaterManagement, WaterManagementDocuments } from '../../models/financial-data.interface';
import { FinancialUploadQuestion } from '../../models/financial-upload-question';

const _fb = new FormBuilder();
const waterWasteManagementForm: FormGroup = _fb.group({});

const targets = [
  { key: "2122", name: "Target 2021-22" },
  { key: "2223", name: "Target 2022-23" },
  { key: "2324", name: "Target 2023-24" },
  { key: "2425", name: "Target 2024-25" },
];

const services: {
  key: keyof WaterManagement;
  name: string;
  benchmark: string;
}[] = [
  {
    key: "waterSuppliedPerDay",
    name: "Water Supplied in litre per day(lpcd)",
    benchmark: "135 LPCD",
  },
  {
    key: "reduction",
    name: "Reduction in non-water revenue",
    benchmark: "20%",
  },
  {
    key: "houseHoldCoveredWithSewerage",
    name: "Household Covered with sewerage/septage services",
    benchmark: "100%",
  },
  {
    key: "houseHoldCoveredPipedSupply",
    name: "Household Covered Piped Water Supply",
    benchmark: "100%",
  },
];

// Dynamically create and map all the controls for earch service.
services.forEach((service) => {
  // Dynamically create controls for each target.
  const targetControls = _fb.group({});
  targets.forEach((tg) =>
    targetControls.addControl(
      tg.key,
      new FormControl("", [Validators.required, Validators.pattern("^\\d*$")])
    )
  );
  // Create Baseline control.
  const baselineControl = _fb.group({
    "2021": [
      "",
      [Validators.required, Validators.pattern("^\\d*$")], // Add this for limiting decimal points (.{0,1}\\d+){0,1}
    ],
  });
  const serviceLevelGroup = _fb.group(
    {
      target: targetControls,
      baseline: baselineControl,
    },
    {
      validator: [Validators.required],
    }
  );

  waterWasteManagementForm.addControl(service.key, serviceLevelGroup);
});

const documents = _fb.group({
  wasteWaterPlan: ["", Validators.required],
});

waterWasteManagementForm.addControl("documents", documents);

const wasteWaterDucmentQuestions: FinancialUploadQuestion<
  WaterManagementDocuments
>[] = [
  {
    key: "wasteWaterPlan",
    question: "Waste Water Managemnet Plan",
  },
];

export {
  waterWasteManagementForm,
  services,
  targets,
  wasteWaterDucmentQuestions,
};
