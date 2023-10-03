import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APPROVAL_TYPES } from 'src/app/fiscal-ranking/models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-ulb-action-popup',
  templateUrl: './ulb-action-popup.component.html',
  styleUrls: ['./ulb-action-popup.component.scss']
})
export class UlbActionPopupComponent implements OnInit {
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
      originalValue: [this.data?.originalValue || '',],
      date: [this.data?.date || '',],
      ulbValue: [this.data?.ulbValue || (
        this.data?.formFieldType == 'date' ? this.data?.date : this.data?.originalValue
      ) || '',],
      ulbComment: [this.data?.ulbComment || '',],
      suggestedValue: [this.data?.suggestedValue || ''],
      approvalType: [this.data?.approvalType || null, Validators.required]
    })

    this.form.get('approvalType').valueChanges.subscribe(approvalType => {
      const ulbCommentControl = this.form.get('ulbComment');
      if (approvalType === APPROVAL_TYPES.enteredPmuRejectUlb) {
        ulbCommentControl.setValidators(Validators.required);
      } else {
        ulbCommentControl.clearValidators();
      }
      ulbCommentControl.updateValueAndValidity();
    });
  }



  submit() {
    const payload = this.form.value;
    if (payload.approvalType == APPROVAL_TYPES.enteredPmuAcceptUlb) {
      if (this.data?.formFieldType == 'date') {
        payload.ulbValue = payload.date;
        payload.date = payload.suggestedValue;
      } else {
        payload.ulbValue = payload.originalValue;
        payload.value = payload.suggestedValue;
      }
    } else {
      if (payload.ulbValue) {
        if (this.data?.formFieldType == 'date') {
          payload.date = payload.ulbValue;
        } else {
          payload.value = payload.ulbValue;
        }
      }
    }
    return this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
