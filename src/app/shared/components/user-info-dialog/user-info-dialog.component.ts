import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from '../../services/utility.service';
import { DownloadUserInfoService } from './download-user-info.service';

interface Validator {
  name: string;
  validator: any;
  message: string;
}

interface FieldConfig {
  required?: any;
  label: string;
  key: string;
  formFieldType: string;
  data?: any[];
  value?: any;
  validations?: Validator[];
  showAsterisk?: boolean;
}

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private downloadUserService: DownloadUserInfoService,
    private dialogRef: MatDialogRef<UserInfoDialogComponent>,
    private utilityService: UtilityService
  ) { }

  isLoading: boolean = false;
  fields: FieldConfig[] = [];
  userInfo: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.getFields();
  }

  private getFields(): void {
    this.isLoading = true;
    this.downloadUserService.getUserInfoQuestions().subscribe((res: any) => {
      this.fields = res.data;
      this.userInfo = this.toFormGroup(this.fields);
      this.isLoading = false;
    });
  }

  public submitUserInfo(): void {

    if (this.userInfo.valid) {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value));
      const payload = { ...this.userInfo.value, ...this.matDialogData.downloadInfo };
      this.dialogRef.close(payload);
    } else {
      this.utilityService.swalPopup('Validation Failed!', 'Failed to download file!', 'error');
      console.error("Invalid user info.");
    }

  }

  private toFormGroup(questions: FieldConfig[]): FormGroup {
    const group: any = {};
    questions.forEach((question: FieldConfig) => {
      group[question.key] = new FormControl(question.value || '', this.bindValidations(question.validations))
    });
    return new FormGroup(group);
  }

  private bindValidations(validations: any) {
    if (validations && validations.length > 0) {
      const validators: any = [];
      validations.forEach((row: any) => {
        switch (row.name) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'nullValidator':
            validators.push(Validators.nullValidator);
            break;
          case 'pattern':
            validators.push(Validators.pattern(row.validator));
            break;
          case 'min':
            validators.push(Validators.min(row.validator));
            break;
          case 'max':
            validators.push(Validators.max(row.validator));
            break;
          case 'minlength':
            validators.push(Validators.minLength(row.validator));
            break;
          case 'maxlength':
            validators.push(Validators.maxLength(row.validator));
            break;
          case 'email':
            validators.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'));
            break;
        }
      });

      return Validators.compose(validators);
    }
    return null;
  }

  public hasError(key: string, name: string) {
    if (name === 'email') name = 'pattern';
    return (this.userInfo.get(key) as FormControl).hasError(name);
  }

}
