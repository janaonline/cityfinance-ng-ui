import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FieldConfig, UtilityService } from 'src/app/shared/services/utility.service';
import { UserUtility } from 'src/app/util/user/user';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  loggedInUserDetails = UserUtility.getUserLoggedInData().value;
  isLoading: boolean = false;
  isDataAvailable: boolean = false;
  isSubmitted: boolean = false;
  ulbFeedback: FormGroup = new FormGroup({});
  fields: FieldConfig[] = [];
  ulbId: string = this.loggedInUserDetails.role === 'ULB' ? this.loggedInUserDetails.ulb : '';
  designYear: string = '';
  currentFormStatus: number = -1;

  constructor(
    private utilityService: UtilityService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
  ) {
    this.designYear = this.route.parent.snapshot.paramMap.get('yearId');
  }

  ngOnInit(): void {
    this.getFields();
  }

  private getFields(): void {
    this.isLoading = true;
    this.feedbackService.getForm(this.designYear, this.ulbId).subscribe({
      next: (res: any) => {
        this.currentFormStatus = res.data.currentFormStatus;
        this.fields = res.data.data;
        this.ulbFeedback = this.utilityService.toFormGroup(this.fields);
      },
      error: (error) => {
        console.error("Error in getFields(): ", error.message);
        this.utilityService.swalPopup('Error!', 'getFields(): Unable to fetch form.', 'error');
      },
      complete: () => {
        this.isDataAvailable = true;
        this.isLoading = false;
        
        if (this.currentFormStatus = -1) {
          // this.isSubmitted = false; 
        this.isSubmitted = true;
      }
      }
    });
  }

  public hasError(key: string, name: string): boolean {
    const control = this.ulbFeedback.get(key) as FormControl;
    return control.hasError(name) && (control.dirty || control.touched);
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.ulbFeedback.controls).forEach((field: string) => {
      const control = this.ulbFeedback.get(field);
      if (control) control.markAsTouched();
    });
  }

  public submitForm(): void {
    if (this.loggedInUserDetails.role !== 'ULB') {
      // this.utilityService.swalPopup('Error!', `submitForm(): user role must be ULB`, 'error');
      return;
    }

    this.isLoading = true;
    if (this.ulbFeedback.valid) {
      this.feedbackService.submitForm(this.designYear, this.ulbFeedback.value).subscribe({
        next: (res: any) => { },
        error: (error) => {
          this.isLoading = false;
          console.error("Error in submitForm(): ", error);
          this.utilityService.swalPopup('Error!', `submitForm(): ${error?.error?.message}`, 'error');
        },
        complete: () => {
          this.isLoading = false;
          this.utilityService.swalPopup('Success!', `Form Submitted successfully!`, 'success');
          this.getFields();
          this.isSubmitted = true;
        }
      })
    } else {
      this.markAllFieldsAsTouched();
      this.utilityService.swalPopup('Validation Failed!', 'Please fill required fields!', 'error');
      this.isLoading = false;
    }
  }
}
