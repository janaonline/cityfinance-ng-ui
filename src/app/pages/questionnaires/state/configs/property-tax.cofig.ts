import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

const QuestionsIdMapping = {
  Act_Linking_PT_A:
    "Does your Municipality/ Municipal Corporation Act  links property tax to prevailing guideline value/ circle rate?",
  Existing_Status_PT_A:
    "What is the existing status regarding aligning Property tax with prevailing circle rates of all Municipalities/Municipal Corporations?",

  Relevent_Sections_Yes_PT_A:
    " Mention the relevant section/provision/clause number of gazette notification/rules/relevant provision in the Act (Upload relevant documents in upload section)",
  Legislative_Changes_PT_A:
    "Would you be seeking legislative changes/ state government approval/ issue executive order to provide for such linkage of property tax to guideline value/ circle rate?",
  Action_Date_PT_A: "Date by which it will be completed",
  Relevent_Sections_No_PT_A:
    "What is the existing status regarding aligning Property tax with prevailing circle rates of all Municipalities/Municipal Corporations?",
  Adoption_Plan_PT_A:
    "What is the plan for adoption of property tax linking to prevailing circle rates for 1) Municipal Corporations, 2) Municipalities, and  3) Town Panchayats",
  Implement_Date_PT_A: "Date by which it will be completed",
  Periodic_Increase_PT_B:
    "Does your Municipality/ Municipal Corporation Act provide for periodic increase of floor rates of property tax?",
  Existing_Status_Yes_PT_B:
    "What is the existing status of periodic increase in property tax in line with the increase in circle rates for all Municipalities and Municipal Corporations.",
  Relevent_Sections_PT_B:
    "Mention the relevant section/provision/clause number of gazette notification/rules/relevant provision in the Act (Upload relevant doc in upload section)",
  Legislative_Changes_PT_B:
    "Would you be seeking legislative changes/ state government approval/ issue executive order to provide for periodic increase of floor rates of property tax?",
  Action_Date_PT_B: "Date by which it will be completed",
  Existing_Status_No_PT_B:
    "What is the existing status of periodic increase in property tax in line with the increase in circle rates for all Municipalities and Municipal Corporations.",
  Implement_Plan_PT_B:
    "What are the plans for implementing above for property tax for 1) Municipal Corporations, 2) Municipalities, and 3) Town Panchayats",
  Implement_Date_PT_B: "Date by which it will be completed?",
};

let propertyTaxForm: FormGroup;
const _fb = new FormBuilder();

const Existing_Status_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Relevent_Sections_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Legislative_Changes_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Action_Date_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }

  if (control.value) {
    return null;
  }

  return { required: true };
};

const Relevent_Sections_No_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Adoption_Plan_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Date_PT_A_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Act_Linking_PT_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }

  if (control.value) {
    return null;
  }

  return { required: true };
};

const Existing_Status_Yes_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Relevent_Sections_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Legislative_Changes_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Action_Date_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }

  if (control.value) {
    return null;
  }

  return { required: true };
};

const Existing_Status_No_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Plan_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Date_PT_B_Validator = (control: AbstractControl) => {
  if (!propertyTaxForm) {
    return null;
  }

  const dependentControl = propertyTaxForm.controls.Periodic_Increase_PT_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value) {
    return null;
  }

  return { required: true };
};

propertyTaxForm = _fb.group({
  Act_Linking_PT_A: ["", [Validators.required]],
  Existing_Status_PT_A: ["", [Existing_Status_PT_A_Validator]],
  Relevent_Sections_PT_A: ["", [Relevent_Sections_PT_A_Validator]],
  Legislative_Changes_PT_A: ["", [Legislative_Changes_PT_A_Validator]],
  Action_Date_PT_A: [null, [Action_Date_PT_A_Validator]],
  Relevent_Sections_No_PT_A: ["", [Relevent_Sections_No_PT_A_Validator]],
  Adoption_Plan_PT_A: ["", [Adoption_Plan_PT_A_Validator]],
  Implement_Date_PT_A: [null, [Implement_Date_PT_A_Validator]],
  Periodic_Increase_PT_B: ["", [Validators.required]],
  Existing_Status_Yes_PT_B: ["", [Existing_Status_Yes_PT_B_Validator]],
  Relevent_Sections_PT_B: ["", [Relevent_Sections_PT_B_Validator]],
  Legislative_Changes_PT_B: ["", [Legislative_Changes_PT_B_Validator]],
  Action_Date_PT_B: ["", [Action_Date_PT_B_Validator]],
  Existing_Status_No_PT_B: ["", [Existing_Status_No_PT_B_Validator]],
  Implement_Plan_PT_B: ["", [Implement_Plan_PT_B_Validator]],
  Implement_Date_PT_B: [null, [Implement_Date_PT_B_Validator]],
});

export { propertyTaxForm, QuestionsIdMapping };
