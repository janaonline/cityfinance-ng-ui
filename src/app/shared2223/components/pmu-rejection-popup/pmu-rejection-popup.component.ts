import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APPROVAL_TYPES } from 'src/app/fiscal-ranking/models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-pmu-rejection-popup',
  templateUrl: './pmu-rejection-popup.component.html',
  styleUrls: ['./pmu-rejection-popup.component.scss']
})
export class PmuRejectionPopupComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rejectReason: [this.data?.rejectReason || '', [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(500)
      ]],
      suggestedValue: [this.data?.suggestedValue || '', this.data?.canSuggestValue ? Validators.required : null],
      approvalType: [APPROVAL_TYPES.ulbEnteredPmuReject || ''],
      status: 'REJECTED'
    })
  }


  submit() {
    this.dialogRef.close(this.form.value);
  }
  
  close() {
    this.dialogRef.close();
  }
}
