import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UlbFisPreviewComponent } from './ulb-fis-preview/ulb-fis-preview.component';
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
import { Tab } from '../models';
import { KeyValue } from '@angular/common';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { DateAdapter } from '@angular/material/core';
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-ulb-fiscal-new',
  templateUrl: './ulb-fiscal-new.component.html',
  styleUrls: ['./ulb-fiscal-new.component.scss'],
})
export class UlbFiscalNewComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

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
  ulbId: string;
  isDraft: boolean;
  userData: any;
  ulbName: string;
  validators = {};
  userTypes = USER_TYPE;
  form: FormArray;
  status: '' | 'PENDING' | 'REJECTED' | 'APPROVED' = '';
  formSubmitted = false;
  alreadyUploadedUrl = 'https://cityfinance.in/resources-dashboard/data-sets/income_statement';

  constructor(
    private fb: FormBuilder,
    public fiscalService: FiscalRankingService,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loaderService: GlobalLoaderService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.yearIdArr = JSON.parse(localStorage.getItem("Years"));

    this.loggedInUserType = this.loggedInUserDetails?.role;
    if (!this.loggedInUserType) {
      this._router.navigateByUrl('fiscal/login')
    }
    else if (this.loggedInUserType != 'ULB') {
      this.ulbId = this.activatedRoute.snapshot.params.ulbId;
      if (this.activatedRoute.snapshot.queryParams.cantakeAction) {
        this.cantakeAction = true;
      }
      if (!this.ulbId) {
        this._router.navigateByUrl('rankings/home')
      }
    }
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
  }

  ngOnInit(): void {
    this.onLoad();
    sessionStorage.setItem("changeInFR", "false");
  }

  get canSeeActions() {
    if (this.status == '' || this.status === 'APPROVED') return false;
    if (this.loggedInUserType == this.userTypes.ULB && this.status === 'PENDING') return false;
    if (this.loggedInUserType == this.userTypes.STATE && this.status === 'PENDING') return false;
    return true;
  }

  get isDisabled() {
    return this.isDraft == false;
  }

  get uploadFolderName() {
    return `${this.userData?.role}/2022-23/fiscalRanking/${this.userData?.ulbCode}`
  }

  get design_year() {
    return this.yearIdArr['2022-23'];
  }

  get otherUploadControl() {
    return this.form.get('4.data.otherUpload');
  }

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.design_year, this.ulbId).subscribe((res: any) => {
      this.formId = res?.data?._id;
      this.isDraft = res?.data?.isDraft;
      this.tabs = res?.data?.tabs;
      this.financialYearTableHeader = res?.data?.financialYearTableHeader;

      this.form = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
      this.addSumLogics();
      this.addSubtractLogics();
      this.navigationCheck();
      this.form.markAsPristine();
      this.isLoader = false;
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
        else if (tab.id == this.selfDeclarationTabId) {
          obj[key] = this.fb.group({
            uploading: [{ value: false, disabled: true }],
            name: [item.name, item.required ? Validators.required : null],
            status: item.status,
            url: [item.url, item.required ? Validators.required : null],
          })
        }
        else {
          obj[key] = this.fb.group({
            key: item.key,
            position: [{ value: +item.displayPriority || 1, disabled: true }],
            isHeading: [{ value: this.isHeading(item.displayPriority), disabled: true }],
            required: [{ value: item.required, disabled: true }],
            modelName: [{ value: item.modelName, disabled: true }],
            calculatedFrom: [{ value: item.calculatedFrom, disabled: true }],
            logic: [{ value: item.logic, disabled: true }],
            canShow: [{ value: true, disabled: true }],
            label: [{ value: item.label, disabled: true }],
            info: [{ value: item.info, disabled: true }],
            yearData: this.fb.array(item.yearData.slice().reverse().map(yearItem => this.getInnerFormGroup(yearItem, item)))
          })
        }
        return obj;
      }, {}))
    })
  }

  isHeading(displayPriority): boolean {
    if(['5.1', '5.2', '7.1', '7.2'].includes(displayPriority)) return true;
    if(['24','25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(displayPriority)) return false;
    return Number.isInteger(+displayPriority);
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
      required: [{ value: item.required, disabled: true }],
      isRupee: [{ value: item.isRupee, disabled: true }],
      code: [{ value: item.code, disabled: true }],
      previousYearCodes: [{ value: item.previousYearCodes, disabled: true }],
      min: [{ value: new Date(item?.min), disabled: true}],
      max: [{ value: new Date(item?.max), disabled: true}],
      date: [item.date, item.formFieldType == 'date' && item.required ? [Validators.required] : []],
      formFieldType: [{ value: item.formFieldType || 'text', disabled: true }],
      status: item.status,
      bottomText: [{ value: item.bottomText, disabled: true }],
      label: [{ value: item.label, disabled: true }],
      info: [{ value: item.info, disabled: true }],
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

  addSkipLogics() {
    const dependencies = {
      'data.registerGis.yearData.0': 'registerGisProof',
      'data.accountStwre.yearData.0': 'accountStwreProof'
    }
    const s3Control = this.form.controls.find(control => control.value?.id == 's3') as FormGroup;
    Object.entries(dependencies).forEach(([selector, updatedable]) => {
      const control = s3Control.get(selector)
      control.valueChanges.subscribe(({ value }) => {
        const canShow = value == 'Yes';
        s3Control.patchValue({ data: { [updatedable]: { canShow } } });
        const selectorString  = `data.${updatedable}.yearData.0`;
        const updatableControl = s3Control.get(selectorString) as FormGroup;
        if (!updatableControl) return;
        ['value', 'file.name', 'file.url'].forEach(innerSelectorString => {
          const control = updatableControl.get(innerSelectorString)
          this.toggleValidations(control, selectorString + '.' + innerSelectorString, canShow, false);
        });
      });
      control.updateValueAndValidity({ emitEvent: true });
    });
  }

  toggleValidations(control: FormGroup | FormArray | AbstractControl | FormControl, selector: string, canShow: boolean, isArray: boolean) {
    if (control) {
      if (!this.validators[selector]) {
        this.validators[selector] = control.validator;
      }
      if (!canShow) {
        if (isArray) {
          (control as FormArray).clear();
          control?.parent?.get('replicaCount')?.patchValue(0);
        } else {
          control?.patchValue('');
        }
      }
      control?.setValidators(canShow ? this.validators[selector] : []);
      control?.updateValueAndValidity({ emitEvent: true });
    }
  }

  addSumLogics() {
    const s3DataControl = Object.values((this.form.controls.find(control => control.value?.id == 's3') as any).controls?.data?.controls);
    const sumAbleContrls = s3DataControl?.filter((value: FormGroup) => value?.controls?.logic?.value == 'sum') as FormGroup[];
    sumAbleContrls?.forEach(parentControl => {
      const childControls = s3DataControl
        .filter((value: FormGroup) => parentControl?.controls?.calculatedFrom?.value?.includes('' + value.controls.position.value)) as FormGroup[];

      childControls.forEach((child) => {
        child.valueChanges.subscribe(updated => {
          const yearWiseAmount = childControls.map((innerChild) => innerChild.value.yearData.map(year => year.value));
          const columnWiseSum = this.getColumnWiseSum(yearWiseAmount);
          parentControl.patchValue({ yearData: columnWiseSum.map(col => ({ value: col })) });
          (parentControl.get('yearData') as any)?.controls.forEach(parentYearItemControl => {
            parentYearItemControl.markAllAsTouched();
            parentYearItemControl.markAsDirty();
          })
        })
        child.updateValueAndValidity({ emitEvent: true });
      });
    });
  }

  addSubtractLogics() {
    const s3DataControl = Object.values((this.form.controls.find(control => control.value?.id == 's3') as any).controls?.data?.controls);
    const subtractControls = s3DataControl?.filter((value: FormGroup) => value?.controls?.logic?.value?.startsWith('subtract')) as FormGroup[];
    subtractControls?.forEach(parentControl => {
      const childControls = s3DataControl
        .filter((value: FormGroup) => parentControl?.controls?.calculatedFrom?.value?.includes('' + value.controls.position.value)) as FormGroup[];

      childControls.forEach((child) => {
        child.valueChanges.subscribe(updated => {
          const yearWiseAmount = childControls.map((innerChild) => innerChild.value.yearData.map(year => +year.value || 0));
          const columnWiseSum = this.getMinusWiseSum(yearWiseAmount);
          parentControl.patchValue({ yearData: columnWiseSum.map(col => ({ value: col || '' })) });
        })
      })
    });
  }

  getColumnWiseSum(arr: number[][]): number[] {
    // console.log('aaaarrr', arr);
    return arr[0]?.map((_, colIndex) => {
      let retNull: boolean = true;
      let sum = arr.reduce((acc, curr) => {
        if (!isNaN(Number(curr[colIndex])) && (curr[colIndex]?.toString()?.trim() != "")) {
          retNull = false;
        }
        return acc + (curr[colIndex] * 1 || 0);
      }, 0);
      return retNull ? null : sum;
    });
  }

  getMinusWiseSum(arr: number[][]): number[] {
    const result = [0, 0, 0, 0];

    try {
      for (let i = 0; i < result.length; i++) {
        result[i] = arr[0][i] - arr[1][i];
      }
      return result;
    } catch {
      return [0, 0, 0, 0];
    }
  }

  stepperContinue(item) {
    console.log(this.form);
    this.stepper.next();
  }
  stepperContinueSave(item) {
    this.stepper.next();
    this.submit();
  }

  canShowFormSection() {
    return true;
  }

  uploadFile(event: { target: HTMLInputElement }, fileType: string, control: FormControl, reset: boolean = false) {
    console.log({ event, fileType, control })
    if (reset) return control.patchValue({ uploading: false, name: '', url: '' });
    const maxFileSize = 5;
    const excelFileExtensions = ['xls', 'xlsx'];
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if (isfileValid == false) {
      swal("Error", "File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
      return;
    }
    const fileExtension = file.name.split('.').pop();

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !excelFileExtensions.includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
    if (fileType === 'pdf' && fileExtension !== 'pdf') return swal("Error", "Only PDF File can be Uploaded.", "error");
    control.patchValue({ uploading: true });
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe(s3Response => {
      const { url, file_url } = s3Response.data[0];
      this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
        if (res.type !== HttpEventType.Response) return;
        control.patchValue({ uploading: false, name: file.name, url: file_url });
      });
    }, err => console.log(err));
  }

  onPreview() {
    if (!this.form.pristine) return swal('Unsaved changes', 'Please save form before preview', 'warning');
    const date = new Date();
    console.log(this.form.getRawValue());
    const rowValues = this.form.getRawValue();
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      id: 'UlbFisPreviewComponent',
      data: {
        showData: rowValues.filter(item => item.id !== this.selfDeclarationTabId),
        incomeSectionBelowKey: this.incomeSectionBelowKey,
        expenditureSectionBelowKey: this.expenditureSectionBelowKey,
        financialYearTableHeader: this.financialYearTableHeader,
        alreadyUploadedUrl: this.alreadyUploadedUrl,
        additionalData: {
          pristine: this.form.pristine,
          date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`,
          nameCmsnr: rowValues.find(row => row.id == 's1')?.data?.nameCmsnr?.value,
          auditorName: rowValues.find(row => row.id == 's1')?.data?.auditorName?.value,
          caMembershipNo: rowValues.find(row => row.id == 's1')?.data?.caMembershipNo?.value,
          otherFile: this.otherUploadControl?.value
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
      console.log(this.form);
      const invalidIndex = this.form.controls.findIndex(control => control.status === 'INVALID');
      console.log(invalidIndex);
      if (invalidIndex >= 0) {
        this.stepper.selectedIndex = invalidIndex;
      }
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

  navigationCheck() {
    this._router.events.subscribe((event: any) => {
      console.log(event?.url);
      if (event?.url == '/rankings/home') return this.form.markAsPristine();
      if (event instanceof NavigationStart && !this.form.pristine) {
        swal("Unsaved Changes", {
          buttons: {
            Draft: {
              text: "Save as draft",
              value: "draft",
            },
            Cancel: {
              text: "Cancel",
              value: "cancel",
            },
          },
        }).then((value) => {
          if (value == 'draft') this.submit();
          else this.form.markAsPristine();
        });
      }
    });
  }

  submit(isDraft = true) {
    const payload = {
      ulbId: this.ulbId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      actions: this.form.getRawValue()
    }
    this.loaderService.showLoader();
    this.fiscalService.postFiscalRankingData(payload).subscribe(res => {
      this.form.markAsPristine();
      this.loaderService.stopLoader();
      this.formSubmitted = !isDraft;
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }
}
