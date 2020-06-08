import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

const QuestionsIdMapping = {
  Byelaws_UC_A: {
    number: "1.",
    question:
      "Do your byelaws/executive orders provide for levying user charges in line with current costs?",
  },
  Existing_Status_Yes_UC_A: {
    number: "1.a)",
    question:
      "What is the existing legal framework for levying user charges in line with current costs in all the Municipalities and Municipal Corporations?",
  },
  Relevant_Section_UC_A: {
    number: "1.b)",
    question:
      "Mention the relevant section/clause number of  byelaws/executive order <i>(Upload relevant documents in Upload Documents section)</i>",
  },
  State_Approval_UC_A: {
    number: "1.a)",
    question:
      "Would you be seeking state government approval/issue executive order to provide for levying user charges in line with current costs?",
  },
  Action_Date_UC_A: {
    number: "1.b)",
    question: "Date by which it will be completed",
  },
  Existing_Status_No_UC_A: {
    number: "2.a)",
    question:
      "What is the existing legal framework of levying of user charges in line with current costs in all the Municipalities and Municipal Corporations?",
  },
  Implement_Plan_UC_A: {
    number: "2.b)",
    question:
      " What is the plan for implementing above for 1) AMRUT cities & towns and 2) Other cities & towns?  <i>(Upload relevant documents in Upload Documents section)</i>",
  },
  Implement_Date_UC_A: {
    number: "2.c)",
    question: "Date by which it will be completed",
  },
  Periodic_Increase_UC_B: {
    number: "3.",
    question:
      "Is there a provision for periodic increase in user charges for water, drainage and sewerage in line with price increase?",
  },
  Existing_Status_Yes_UC_B: {
    number: "3.a)",
    question:
      "What is the existing status of byelaws/executive orders for periodic increase in user charges for water, drainage and sewerage in Municipalities and Municipal Corporations?",
  },
  Relevant_Section_UC_B: {
    number: "3.b)",
    question:
      "Mention the relevant section/clause number of relevant byelaws/executive orders <i>(Upload relevant documents in Upload Documents section)</i>",
  },
  State_Approval_UC_B: {
    number: "3.a)",
    question:
      "Would you be seeking state government approval/issue executive order to provide for periodic increase in user charges in line with price increase?",
  },
  Action_Date_UC_B: {
    number: "3.b)",
    question: "Date by which it will be completed",
  },
  Existing_Status_No_UC_B: {
    number: "4.a)",
    question:
      "What is the existing status of byelaws/executive orders for periodic increase in user charges for water, drainage and sewerage in Municipalities and Municipal Corporations?",
  },
  Implement_Plan_UC_B: {
    number: "4.b)",
    question:
      "What is the plan for implementing above for 1) AMRUT cities & towns, and 2) Other cities & Towns?  <i>(Upload relevant documents in Upload Documents section)</i>",
  },
  Implement_Date_UC_B: {
    number: "4.c)",
    question: "Date by which it will be completed",
  },
};

let userChargesForm: FormGroup;
const _fb = new FormBuilder();

const Existing_Status_Yes_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Relevant_Section_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const State_Approval_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Action_Date_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value) {
    return null;
  }

  return { required: true };
};

const Existing_Status_No_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Plan_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Date_UC_A_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Byelaws_UC_A;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value) {
    return null;
  }

  return { required: true };
};

// const Periodic_Increase_UC_B_Validator = (control: AbstractControl) => {
//   if (!userChargesForm) {
//     return null;
//   }

//   const dependentControl = userChargesForm.controls.Byelaws_UC_A;

//   if (!dependentControl || dependentControl.value !== "Yes") {
//     return null;
//   }
//   if (control.value && control.value.trim()) {
//     return null;
//   }

//   return { required: true };
// };

const Existing_Status_Yes_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Relevant_Section_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "Yes") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const State_Approval_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Action_Date_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value) {
    return null;
  }

  return { required: true };
};

const Existing_Status_No_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Plan_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value && control.value.trim()) {
    return null;
  }

  return { required: true };
};

const Implement_Date_UC_B_Validator = (control: AbstractControl) => {
  if (!userChargesForm) {
    return null;
  }

  const dependentControl = userChargesForm.controls.Periodic_Increase_UC_B;

  if (!dependentControl || dependentControl.value !== "No") {
    return null;
  }
  if (control.value) {
    return null;
  }

  return { required: true };
};

userChargesForm = _fb.group({
  Byelaws_UC_A: ["", [Validators.required]],
  Existing_Status_Yes_UC_A: ["", [Existing_Status_Yes_UC_A_Validator]],
  Relevant_Section_UC_A: ["", [Relevant_Section_UC_A_Validator]],
  State_Approval_UC_A: ["", [State_Approval_UC_A_Validator]],
  Action_Date_UC_A: [null, [Action_Date_UC_A_Validator]],
  Existing_Status_No_UC_A: ["", [Existing_Status_No_UC_A_Validator]],
  Implement_Plan_UC_A: ["", [Implement_Plan_UC_A_Validator]],
  Implement_Date_UC_A: [null, [Implement_Date_UC_A_Validator]],
  Periodic_Increase_UC_B: ["", [Validators.required]],
  Existing_Status_Yes_UC_B: ["", [Existing_Status_Yes_UC_B_Validator]],
  Relevant_Section_UC_B: ["", [Relevant_Section_UC_B_Validator]],
  State_Approval_UC_B: ["", [State_Approval_UC_B_Validator]],
  Action_Date_UC_B: [null, [Action_Date_UC_B_Validator]],
  Existing_Status_No_UC_B: ["", [Existing_Status_No_UC_B_Validator]],
  Implement_Plan_UC_B: ["", [Implement_Plan_UC_B_Validator]],
  Implement_Date_UC_B: [null, [Implement_Date_UC_B_Validator]],
});

export { userChargesForm, QuestionsIdMapping };
