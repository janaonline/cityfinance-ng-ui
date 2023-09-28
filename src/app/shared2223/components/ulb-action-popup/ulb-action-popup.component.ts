import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-ulb-action-popup',
  templateUrl: './ulb-action-popup.component.html',
  styleUrls: ['./ulb-action-popup.component.scss']
})
export class UlbActionPopupComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rejectReason: [this.data?.rejectReason || '', ],
      ulbRejectReason: ['', ],
      suggestedValue: [this.data?.suggestedValue || ''],
      isAgree: [null, Validators.required]
    })

    this.form.get('isAgree').valueChanges.subscribe(isAgree => {
      const ulbRejectReasonControl = this.form.get('ulbRejectReason');
      if (!isAgree) {
        ulbRejectReasonControl.setValidators(Validators.required);
      } else {
        ulbRejectReasonControl.clearValidators();
      }
      ulbRejectReasonControl.updateValueAndValidity();
    });
  }



  submit() {
    const paylaod = this.form.value;
    if(paylaod.isAgree) {
      delete paylaod.isAgree;
      paylaod.value = paylaod.suggestedValue;
      return this.dialogRef.close(paylaod);
    }
    this.close();
  }
  
  close() {
    this.dialogRef.close();
  }
}
