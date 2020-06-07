import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

const QuestionsIdMapping = {
  Act_Linking_PT_A:
    "1. Does your Municipality/Municipal Corporation Act  link property tax to prevailing guideline values/circle rates?",
  Existing_Status_PT_A:
    "1.a) What is the current status regarding aligning property tax with prevailing guideline values/circle rates of all Municipalities/Municipal Corporations? ",

  Relevent_Sections_Yes_PT_A:
    "1.b) Mention the relevant section/provision/clause number of gazette notification/rules/relevant provision in the Act <i>(Upload relevant documents in Upload Documents section)</i>",
  Legislative_Changes_PT_A:
    "1.a) Would you be seeking legislative changes/state government approval/issue executive order to provide for such linkage of property tax to guideline values/circle rates?",
  Action_Date_PT_A: "1.b) Date by which it will be completed",
  Relevent_Sections_No_PT_A:
    "2.a) What is the existing status regarding aligning property tax with prevailing circle rates of all Municipalities/Municipal Corporations?",
  Adoption_Plan_PT_A:
    "2.b) What is the plan for adoption of property tax linking with prevailing guideline values/circle rates for 1) Municipal Corporations, 2) Municipalities, and  3) Town Panchayats? <i>(Upload relevant documents in Upload Documents section)</i>",
  Implement_Date_PT_A: "2.c) Date by which it will be completed",
  Periodic_Increase_PT_B:
    "3. Does your Municipality/ Municipal Corporation Act provide for periodic increase of floor rates of property tax?",
  Existing_Status_Yes_PT_B:
    "3.a) What is the existing status of periodic increase in property tax in line with the increase in guideline values/circle rates for all Municipalities and Municipal Corporations?",
  Relevent_Sections_PT_B:
    "3.b) Mention the relevant section/provision/clause number of gazette notification/rules/relevant provision in the Act <i>(Upload relevant documents in Upload Documents section)</i>",
  Legislative_Changes_PT_B:
    "3.a) Would you be seeking legislative changes/state government approval/issue executive order to provide for periodic increase of floor rates of property tax?",
  Action_Date_PT_B: "3.b) Date by which it will be completed",
  Existing_Status_No_PT_B:
    "4.a) What is the existing status of periodic increase in property tax in line with the increase in guideline values/circle rates for all Municipalities and Municipal Corporations?",
  Implement_Plan_PT_B:
    "4.b) What is the plan for implementing above for property tax for 1) Municipal Corporations, 2) Municipalities, and 3) Town Panchayats? <i>(Upload relevant documents in Upload Documents section)</i>",
  Implement_Date_PT_B: "4.c) Date by which it will be completed",
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
