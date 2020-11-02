import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

const maxValidator = (control: AbstractControl) => {
  if (!control.value) return;
  const value = +control.value;
  if (value > 100) return { max: "Value cannot be greater than 100" };
  return null;
};

const services: {
  key: keyof WaterManagement;
  name: string;
  benchmark: string;
  customValidator?: (control: AbstractControl) => any;
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
    customValidator: maxValidator,
  },
  {
    key: "houseHoldCoveredWithSewerage",
    name: "Household Covered with sewerage/septage services",
    benchmark: "100%",
    customValidator: maxValidator,
  },
  {
    key: "houseHoldCoveredPipedSupply",
    name: "Household Covered Piped Water Supply",
    benchmark: "100%",
    customValidator: maxValidator,
  },
];

// Dynamically create and map all the controls for earch service.
services.forEach((service) => {
  // Dynamically create controls for each target.
  const targetControls = _fb.group({});
  targets.forEach((tg) => {
    if (service.customValidator) {
      targetControls.addControl(
        tg.key,
        new FormControl("", [
          Validators.required,
          Validators.pattern("^\\d*(.{0,1}\\d{2,2}){0,1}$"),
          service.customValidator,
        ])
      );
    } else {
      targetControls.addControl(
        tg.key,
        new FormControl("", [
          Validators.required,
          Validators.pattern("^\\d*(.{0,1}\\d{2,2}){0,1}$"),
        ])
      );
    }
  });
  let baselineControl: FormGroup;
  if (service.customValidator) {
    // Create Baseline control.
    baselineControl = _fb.group({
      "2021": [
        "",
        [
          Validators.required,
          Validators.pattern("^\\d*(.{0,1}\\d{2,2}){0,1}$"),
          service.customValidator,
        ], // Add this for limiting decimal points (.{0,1}\\d+){0,1}
      ],
    });
  } else {
    // Create Baseline control.
    baselineControl = _fb.group({
      "2021": [
        "",
        [
          Validators.required,
          Validators.pattern("^\\d*(.{0,1}\\d{2,2}){0,1}$"),
        ], // Add this for limiting decimal points (.{0,1}\\d+){0,1}
      ],
    });
  }

  const serviceLevelGroup = _fb.group(
    {
      target: targetControls,
      baseline: baselineControl,
      status: [null],
      rejectReason: [null],
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
