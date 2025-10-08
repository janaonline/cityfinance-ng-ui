import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { UtilityService } from '../../services/utility.service';

const TIMER = 5;

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss']
})
export class OtpDialogComponent implements OnInit {
  readonly: boolean = false;
  showResendOtp: boolean = false;
  counter: number = TIMER;
  countdownSub?: Subscription;
  otp: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(/^\d+$/)
  ]);

  constructor(
    private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    // private dialogRef: MatDialogRef<OtpDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.startResendTimer();
  }

  get showOtpError(): boolean {
    return this.otp.invalid && (this.otp.dirty || this.otp.touched);
  }

  resendOtp() {
    console.log("Resend code");
    this.startResendTimer();
  }

  verify() {
    if (this.otp.invalid) {
      this.otp.markAsTouched(); // trigger validation
      return;
    }

    this.showResendOtp = false;

    setTimeout(() => {
      if (Number(this.otp.value) === 123456) {
        this.utilityService.swalPopup('OTP Verified Successfully!', '', 'success');
      } else {
        this.utilityService.swalPopup('Incorrect OTP!', '', 'error');
        this.showResendOtp = true
      }
    }, 1000);
  }

  startResendTimer() {
    this.showResendOtp = true;
    this.counter = TIMER;

    // Clean up existing subscription if running
    this.countdownSub?.unsubscribe();

    this.countdownSub = timer(0, 1000).subscribe((sec) => {
      this.counter = TIMER - sec;

      if (this.counter <= 0) {
        this.countdownSub?.unsubscribe();
        // this.showResendOtp = false;
      }
    });
  }
}
