import { Component, OnInit } from '@angular/core';
import { PropertyTaxService } from './property-tax.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  customEmailValidator,
  mobileNoValidator,
  urlValidator,
  validateOnlyText
} from "src/app/util/reactiveFormValidators";
import { UserUtility } from 'src/app/util/user/user';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';

import { KeyValue } from '@angular/common';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { PreviewComponent } from './preview/preview.component';
// import { DateAdapter } from '@angular/material/core';
const swal: SweetAlert = require("sweetalert");


export interface Feedback {
  _id: string;
  status: 'PENDING' | 'REJECTED' | 'APPROVED';
  comment: string;
}

export interface Tab {
  _id: string;
  key: string;
  icon: string;
  text: string;
  label: string;
  data: any;
  id: string;
  displayPriority: number;
  __v: number;
  feedback: Feedback;
}

@Component({
  selector: 'app-property-tax',
  templateUrl: './property-tax.component.html',
  styleUrls: ['./property-tax.component.scss']
})
export class PropertyTaxComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem("userData"));

  yearIdArr: string[] = [];
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  isLoader: boolean = false;
  loggedInUserType: any;
  selfDeclarationTabId: string = 's5';
  guidanceNotesKey: string = 'guidanceNotes';
  incomeSectionBelowKey: number = 1;
  expenditureSectionBelowKey: number = 8;
  financialYearTableHeader: { [key: number]: string[] } = {};
  linearTabs: string[] = ['s1', 's2'];
  twoDTabs: string[] = ['s4', 's5', 's6'];
  textualFormFiledTypes: string[] = ['text', 'url', 'email', 'number'];
  tabs: Tab[];
  cantakeAction: boolean = true;
  formId: string;
  isDraft: boolean;
  ulbName: string;
  userTypes = USER_TYPE;
  form: FormArray;
  status: '' | 'PENDING' | 'REJECTED' | 'APPROVED' = '';
  currentDate = new Date();
  formSubmitted = false;
  specialHeaders = {
    "6.1": "Property Tax Demand and Collection Figures by Property Type (Amount in INR Lakhs)",
    "23.1": "Water Charges Demand and Collection Details",
    "29.1": "Sewerage Charges Details by household/property type",
  }

  constructor(
    private fb: FormBuilder,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loaderService: GlobalLoaderService,
    // private dateAdapter: DateAdapter<Date>,
    private propertyTaxService: PropertyTaxService
  ) { }

  ngOnInit(): void {

    this.loadData();
  }

  get uploadFolderName() {
    return `${this.userData?.role}/2022-23/property-tax/${this.userData?.ulbCode}`
  }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get ulbId() {
    return this.userData?.ulb;
  }


  loadData() {
    this.loaderService.showLoader();
    this.propertyTaxService.getForm(this.ulbId, this.design_year).subscribe((res: any) => {
      this.loaderService.stopLoader();
      console.log('response', res);
      // this.formId = res?.data?._id;
      this.isDraft = res?.data?.isDraft;
      this.tabs = res?.data?.tabs;
      this.financialYearTableHeader = res?.data?.financialYearTableHeader;

      this.form = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
      // this.addSumLogics();
      // this.addSubtractLogics();
      // this.navigationCheck();
      this.isLoader = false;
      console.log('response', res);
    }, err => {
      this.loaderService.stopLoader();
    });
  }


  getTabFormGroup(tab: Tab): any {
    const { data, feedback, ...rest } = tab;
    return this.fb.group({
      ...rest,
      feedback: this.fb.group({
        comment: [feedback.comment,],
        status: feedback.status,
        _id: feedback._id,
      }),
      data: this.fb.group(Object.entries(data).reduce((obj, [key, item]: any) => {
        if (this.linearTabs.includes(tab.id)) {
          obj[key] = this.getInnerFormGroup({ ...item, key })
        }
        else {
          obj[key] = this.fb.group({
            key: item.key,
            position: [{ value: +item.displayPriority || 1, disabled: true }],
            isHeading: [{ value: Number.isInteger(+item.displayPriority), disabled: true }],
            modelName: [{ value: item.modelName, disabled: true }],
            calculatedFrom: [{ value: item.calculatedFrom, disabled: true }],
            logic: [{ value: item.logic, disabled: true }],
            canShow: [{ value: true, disabled: true }],
            label: [{ value: item.label, disabled: true }],
            info: [{ value: item.info, disabled: true }],
            yearData: this.fb.array(item.yearData.map(yearItem => this.getInnerFormGroup(yearItem, item)))
          })
        }
        return obj;
      }, {}))
    })
  }

  getInnerFormGroup(item, parent?) {
    return this.fb.group({
      key: item.key,
      value: [item.value, this.getValidators(item, !['date', 'file'].includes(item.formFieldType), parent)],
      originalValue: item.value,
      year: item.year,
      type: item.type,
      _id: item._id,
      modelName: [{ value: item.modelName, disabled: true }],
      code: [{ value: item.code, disabled: true }],
      previousYearCodes: [{ value: item.previousYearCodes, disabled: true }],
      date: [item.date, item.formFieldType == 'date' && item.required ? [Validators.required] : []],
      formFieldType: [{ value: item.formFieldType || 'text', disabled: true }],
      status: item.status,
      bottomText: [{ value: item.bottomText, disabled: true }],
      label: [{ value: item.label, disabled: true }],
      placeholder: [{ value: item.placeholder, disabled: true }],
      desc: [{ value: item.desc, disabled: true }],
      position: [{ value: item.postion, disabled: true }],
      pos: [{ value: item.pos, disabled: true }],
      readonly: [{ value: item.readonly, disabled: true }],
      ...(item.file && {
        file: this.fb.group({
          uploading: [{ value: false, disabled: true }],
          name: [item.file.name, item.required ? [Validators.required] : []],
          url: [item.file.url, item.required ? [Validators.required] : []]
        })
      })
    });
  }


  getValidators(item, canApplyRequired = false, parent?) {
    return [
      ...(parent?.logic == 'sum' && item.modelName ? [Validators.pattern(new RegExp(item.value))] : []),
      ...(item.required && canApplyRequired ? [Validators.required] : []),
      ...(item.formFieldType == 'url' ? [urlValidator] : []),
      ...(item.formFieldType == 'email' ? [customEmailValidator] : []),
      ...(item.min !== '' ? [Validators[item.formFieldType == 'number' ? 'min' : 'minLength'](+item.min)] : []),
      ...(item.max !== '' ? [Validators[item.formFieldType == 'number' ? 'max' : 'maxLength'](+item.max)] : []),
    ];
  }

  sortPosition(itemA: KeyValue<number, FormGroup>, itemB: KeyValue<number, FormGroup>) {
    const a = +itemA.value.controls.position?.value;
    const b = +itemB.value.controls.position?.value;
    return a > b ? 1 : (b > a ? -1 : 0);;
  }

  addSkipLogics() {
    const dependencies = {
      'data.notificationPropertyTax.yearData.0': 'notificationAdoptionDate',
      'data.notificationIssuedBy.yearData.0': 'notificationFile'
    }
    const s3Control = this.form.controls.find(control => control.value?.id == 's3') as FormGroup;
    Object.entries(dependencies).forEach(([selector, updatedable]) => {
      const control = s3Control.get(selector)
      control.valueChanges.subscribe(({ value }) => {
        const canShow = value == 'Yes';
        s3Control.patchValue({ data: { [updatedable]: { canShow } } });
        const updatableControl = s3Control.get(`data.${updatedable}.yearData.0`) as FormGroup;
        const nameControl = updatableControl.get('file.name');
        const urlControl = updatableControl.get('file.url');
        [nameControl, urlControl].forEach(fileControl => {
          fileControl?.setValidators(canShow ? [Validators.required] : [])
          fileControl?.updateValueAndValidity({ emitEvent: true });
        }) 
      });
      control.updateValueAndValidity({ emitEvent: true });
    });
  }

  uploadFile(event: { target: HTMLInputElement }, fileType: string, control: FormControl, reset: boolean = false) {
    console.log({ event, fileType, control })
    if (reset) return control.patchValue({ uploading: false, name: '', url: '' });
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split('.').pop();

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");

    control.patchValue({ uploading: true });
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe((s3Response: any) => {
      const { url, file_url } = s3Response.data[0];
      this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
        if (res.type !== HttpEventType.Response) return;
        control.patchValue({ uploading: false, name: file.name, url: file_url });
      });
    }, err => console.log(err));
  }

  onPreview() {
    const date = new Date();
    console.log(this.form.getRawValue());
    const rowValues = this.form.getRawValue();
    const dialogRef = this.dialog.open(PreviewComponent, {
      id: 'UlbFisPreviewComponent',
      data: {
        showData: rowValues.filter(item => item.id !== this.selfDeclarationTabId),
        additionalData: {
          pristine: this.form.pristine,
          date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`,
          // otherFile: this.otherUploadControl?.value
        }
      },
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });

    dialogRef.componentInstance.saveForm.subscribe((data: any) => {
      this.submit();
    });
  }

  validateErrors() {
    this.form.markAllAsTouched();
    if (this.form.status === 'INVALID') {
      return false;
    }
    return true;
  }

  finalSubmitConfirmation() {
    swal(
      "Confirmation !",
      `Are you sure you want to submit this form? Once submitted,
     it will become uneditable and will be sent to MoHUA for Review.
      Alternatively, you can save as draft for now and submit it later.`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
          },
          Draft: {
            text: "Save as Draft",
            value: "draft",
          },
          Cancel: {
            text: "Cancel",
            value: "cancel",
          },
        },
      }
    ).then((value) => {
      if (value == 'submit') {
        if (!this.validateErrors()) return swal('Error', 'Please fill all mandatory fields', 'error');;
        this.submit(false);
      }
      else if (value == 'draft') this.submit();
    })
  }

  submit(isDraft = true) {
    const payload = {
      ulbId: this.ulbId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      status: isDraft ? 2 : 3,
      actions: this.form.getRawValue()
    }
    this.loaderService.showLoader();
    this.propertyTaxService.postData(payload).subscribe(res => {
      this.form.markAsPristine();
      this.loaderService.stopLoader();
      this.formSubmitted = !isDraft;
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success').then(() => {
        if(!isDraft) location.reload();
      });
    }, ({error}) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }

}
