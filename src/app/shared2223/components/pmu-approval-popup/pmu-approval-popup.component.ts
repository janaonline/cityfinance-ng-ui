import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APPROVAL_TYPES } from 'src/app/fiscal-ranking/models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


@Component({
  selector: 'app-pmu-approval-popup',
  templateUrl: './pmu-approval-popup.component.html',
  styleUrls: ['./pmu-approval-popup.component.scss']
})
export class PmuApprovalPopupComponent implements OnInit {
  form: FormGroup;
  approvalTypes = APPROVAL_TYPES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rejectReason: [this.data?.rejectReason || '',],
      rejectReason2: [this.data?.rejectReason2 || '',],
      originalValue: [this.data?.originalValue || '',],
      date: [this.data?.date || '',],
      ulbValue: [this.data?.ulbValue || (
        this.data?.formFieldType == 'date' ? this.data?.date : this.data?.originalValue
      ) || '',],
      ulbComment: [this.data?.ulbComment || '',],
      suggestedValue: [this.data?.suggestedValue || ''],
      pmuSuggestedValue2: [this.data?.pmuSuggestedValue2 || ''],
      approvalType: [this.data?.approvalType || null, [
        Validators.required,
        (control) => control.value !== APPROVAL_TYPES.enteredPmuRejectUlb ? null : { invalidApprovalType: true }
      ]]
    })

    this.form.get('approvalType').valueChanges.subscribe(approvalType => {
      const pmuSuggestedValue2Control = this.form.get('pmuSuggestedValue2');
      const rejectReason2Control = this.form.get('rejectReason2');
      if (approvalType === APPROVAL_TYPES.enteredPmuSecondAcceptPmu) {
        pmuSuggestedValue2Control.setValidators(Validators.required);
        rejectReason2Control.setValidators(Validators.required);
      } else {
        pmuSuggestedValue2Control.clearValidators();
        rejectReason2Control.clearValidators();
      }
      pmuSuggestedValue2Control.updateValueAndValidity();
      rejectReason2Control.updateValueAndValidity();
    });
  }



  submit() {
    const payload = this.form.value;
    delete payload.rejectReason;
    delete payload.ulbComment;
    delete payload.suggestedValue;
    // if (payload.approvalType == APPROVAL_TYPES.enteredPmuAcceptUlb) {
    //   if (this.data?.formFieldType == 'date') {
    //     payload.ulbValue = payload.date;
    //     payload.date = payload.suggestedValue;
    //   } else {
    //     payload.ulbValue = payload.originalValue;
    //     payload.value = payload.suggestedValue;
    //   }
    // } else {
    //   if (payload.ulbValue) {
    //     if (this.data?.formFieldType == 'date') {
    //       payload.date = payload.ulbValue;
    //     } else {
    //       payload.value = payload.ulbValue;
    //     }
    //   }
    // }

    console.log('payload', payload);
    return this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
