import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UtilityService } from '../../services/utility.service';
import { EmailVerification } from '../user-info-dialog/user-info-dialog.component';

const TIMER = 60;

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
  email: string = '';

  constructor(
    private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private dialogRef: MatDialogRef<OtpDialogComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.startResendTimer();
    this.email = this.matDialogData.email;
  }

  get showOtpError(): boolean {
    return this.otp.invalid && (this.otp.dirty || this.otp.touched);
  }

  resendOtp() {
    this.authService.sendOtp(this.email).subscribe({
      next: () => {
        this.startResendTimer();
      },
      error: (error) => {
        const errMsg = error.error.message || 'Failed to send OTP';
        this.utilityService.swalPopup('Error', errMsg, 'error');
        console.error({ error })
      }
    });
  }

  verify() {
    if (this.otp.invalid) {
      this.otp.markAsTouched(); // trigger validation
      return;
    }

    this.authService.verifyOtp(this.email, this.otp.value).subscribe({
      next: (res: EmailVerification) => {
        // console.log({ res })
        this.dialogRef.close(res)
        this.utilityService.swalPopup('Success!', res.message, 'success');
      },
      error: (error: any) => {
        // console.error('error', error)
        const errMsg = error?.error?.message || 'Invalid OTP!';
        this.utilityService.swalPopup('Error', errMsg, 'error');
        this.showResendOtp = true
      }
    })
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
