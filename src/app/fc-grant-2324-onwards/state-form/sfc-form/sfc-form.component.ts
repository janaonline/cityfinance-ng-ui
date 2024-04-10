import { Component, OnInit } from '@angular/core';
import { SfcFormService } from './sfc-form.service';

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';

import { KeyValue } from '@angular/common';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { PreviewComponent } from './preview/preview.component';
import { DateAdapter } from '@angular/material/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { MatRadioChange } from '@angular/material/radio';
const swal: SweetAlert = require("sweetalert");
const swal2 = require("sweetalert2");


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
  selector: 'app-sfc-form',
  templateUrl: './sfc-form.component.html',
  styleUrls: ['./sfc-form.component.scss']
})
export class SfcFormComponent implements OnInit {

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
  skipLogicDependencies: any = {};
  linearTabs: string[] = ['s1', 's2'];
  twoDTabs: string[] = ['s4', 's5', 's6'];
  textualFormFiledTypes: string[] = ['text', 'url', 'email', 'number'];
  tabs: Tab[];
  cantakeAction: boolean = true;
  formId: string;
  // isDraft: boolean;
  ulbName: string;
  status: string;
  userTypes = USER_TYPE;
  form: FormArray;
  statusId: number;
  currentDate = new Date();
  formSubmitted = false;
  specialHeaders: { [key: number]: string[] } = {};
  validators = {};

  isButtonAvail: boolean = false;
  nextPreUrl = {
    nextBtnRouter: '',
    backBtnRouter: ''
  }
  sideMenuItem: object | any;
  isFormFinalSubmit: boolean = false;
  canTakeAction: boolean = false;
  leftMenuSubs: any;
  question: any;
  constructor(
    private fb: FormBuilder,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loaderService: GlobalLoaderService,
    private dateAdapter: DateAdapter<Date>,
    private sfcFormService: SfcFormService,
    private commonServices: CommonServicesService,
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.getNextPreUrl();
  }

  ngOnInit(): void {
    this.leftMenuSubs = this.commonServices.ulbLeftMenuComplete.subscribe((res) => {
      if (res == true) {
        this.getNextPreUrl();
      }
    });
    this.loadData();
  }

  get uploadFolderName() {
    const years = JSON.parse(localStorage.getItem("Years"));
    const year = this.getKeyByValue(years, this.design_year);
    return `${this.userData?.role}/${year}/sfc/${this.userData?.stateCode}`
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  get design_year() {
    // const years = JSON.parse(localStorage.getItem("Years"));
    // console.log('this.years', years);
    return this.activatedRoute.parent.snapshot.paramMap.get('yearId');
    // return years?.['2023-24'];
  }

  get stateId() {
    if (this.userData?.role == 'STATE') return this.userData?.state;
    return localStorage.getItem("state_id");
  }

  get hasUnsavedChanges() {
    return !this.form.pristine;
  }

  loadData() {
    this.loaderService.showLoader();
    this.sfcFormService.getForm(this.stateId, this.design_year).subscribe((res: any) => {
      this.loaderService.stopLoader();
      console.log('response', res);
      this.question = res?.data;
      this.tabs = res?.data?.tabs;
      this.status = res?.data?.status;
      this.statusId = res?.data?.statusId;
      this.skipLogicDependencies = res?.data?.skipLogicDependencies;
      this.financialYearTableHeader = res?.data?.financialYearTableHeader;
      this.specialHeaders = res?.data?.specialHeaders;

      this.form = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
      this.isLoader = false;
      this.canTakeAction = res?.data?.canTakeAction;
      this.formDisable(res?.data);
    }, err => {
      this.loaderService.stopLoader();
    });
  }

  get buttonDissabled() {
    if (this.userData?.role != USER_TYPE.STATE) return true;
    return ![1, 2, 5, 7].includes(this.statusId);
  }

  formDisable(res) {
    if (!res) return;
    if (this.userData?.role != USER_TYPE.STATE) return false;
    this.isButtonAvail = [1, 2, 5, 7].includes(res?.statusId);
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

        obj[key] = this.fb.group({
          key: item.key,
          position: [{ value: item.displayPriority || 1, disabled: true }],
          isHeading: [{ value: Number.isInteger(+item.displayPriority), disabled: true }],
          modelName: [{ value: item.modelName, disabled: true }],
          required: [{ value: item.required, disabled: true }],
          calculatedFrom: [{ value: item.calculatedFrom, disabled: true }],
          logic: [{ value: item.logic, disabled: true }],
          canShow: [{ value: item.canShow !== undefined ? item.canShow : true, disabled: true }],
          downloadLink: [{ value: item.downloadLink, disabled: true }],
          label: [{ value: item.label, disabled: true }],
          info: [{ value: item.info, disabled: true }],
          yearData: this.fb.array(item.yearData.map(yearItem => this.getInnerFormGroup(yearItem, item)))
        })
        return obj;
      }, {}))
    })
  }

  getInnerFormGroup(item, parent?, replicaCount?) {
    return this.fb.group({
      key: item.key,
      value: [item.value, this.getValidators(item, !['date', 'file', 'link'].includes(item.formFieldType), parent)],
      originalValue: item.value,
      year: item.year,
      type: item.type,
      _id: item._id,
      replicaNumber: replicaCount,
      modelName: [{ value: item.modelName, disabled: true }],
      isRupee: [{ value: item.isRupee, disabled: true }],
      decimalLimit: [{ value: item.decimalLimit, disabled: true }],
      options: [{ value: item.options, disabled: true }],
      code: [{ value: item.code, disabled: true }],
      previousYearCodes: [{ value: item.previousYearCodes, disabled: true }],
      date: [item.date, item.formFieldType == 'date' && item.required ? [Validators.required] : []],
      formFieldType: [{ value: item.formFieldType || 'text', disabled: true }],
      max: [{ value: item.max, disabled: true }],
      min: [{ value: item.min, disabled: true }],
      status: item.status,
      bottomText: [{ value: item.bottomText, disabled: true }],
      label: [{ value: item.label, disabled: true }],
      placeholder: [{ value: item.placeholder, disabled: true }],
      desc: [{ value: item.desc, disabled: true }],
      position: [{ value: item.postion, disabled: true }],
      pos: [{ value: item.pos, disabled: true }],
      readonly: [{ value: item.readonly, disabled: true }],
      ...(item.formFieldType == 'file' && {
        allowedFileTypes: [{ value: item.allowedFileTypes, disabled: true }],
        file: this.fb.group({
          uploading: [{ value: false, disabled: true }],
          name: [item.file?.name || '', item.required ? [Validators.required] : []],
          url: [item.file?.url || '', item.required ? [Validators.required] : []]
        })
      })
    });
  }


  getValidators(item, canApplyRequired = false, parent?) {
    return [
      ...(parent?.logic == 'sum' && item.modelName ? [Validators.pattern(new RegExp(item.value))] : []),
      ...(item.required && canApplyRequired ? [Validators.required] : []),
      ...(item.formFieldType == 'url' ? [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')] : []),
      ...(item.formFieldType == 'email' ? [Validators.email] : []),
      ...(item.min !== '' ? [Validators[item.formFieldType == 'number' ? 'min' : 'minLength'](+item.min)] : []),
      ...(item.max !== '' ? [Validators[item.formFieldType == 'number' ? 'max' : 'maxLength'](+item.max)] : []),
    ];
  }

  sortPosition(itemA: KeyValue<number, FormGroup>, itemB: KeyValue<number, FormGroup>) {
    const [integerA, decimalA] = itemA.value.controls.position?.value?.split('.').map(i => +i);
    const [integerB, decimalB] = itemB.value.controls.position?.value?.split('.').map(i => +i);
    if (integerA != integerB) {
      return integerA > integerB ? 1 : (integerB > integerA ? -1 : 0);;
    }
    return decimalA > decimalB ? 1 : (decimalB > decimalA ? -1 : 0);;
  }

  /**
   * TODO: Check and remove function
   */
  addSkipLogics() {
    const s3Control = this.form.controls.find(control => control.value?.id == 's3') as FormGroup;
    Object.entries(this.skipLogicDependencies).forEach(([selector, skipLogicDependency]) => {
      (skipLogicDependency as any)?.updatables?.forEach(updatable => {
        const control = s3Control.get(selector);
        control.valueChanges.subscribe(({ value }) => {
          const updatableControl = s3Control?.get(updatable.target) as FormGroup;
          if (value === updatable?.on) {
            updatableControl.patchValue({
              value: updatable?.value
            });
          }
        });
        control.updateValueAndValidity({ emitEvent: true });
      })
      Object.entries(((skipLogicDependency as any).skippable as object)).forEach(([skippable, config]) => {
        const control = s3Control.get(selector)
        control.valueChanges.subscribe(({ value }) => {
          const canShow = (typeof config.value == 'string' ? [config.value] : config.value).includes(value);
          s3Control.patchValue({ data: { [skippable]: { canShow } } });
          const childSelectorString = `data.${skippable}.child`;
          const childControl = s3Control.get(childSelectorString);
          this.toggleValidations(childControl, childSelectorString, canShow, true);
          config.years?.forEach(yearIndex => {
            const selectorString = `data.${skippable}.yearData.${yearIndex}`;
            const updatableControl = s3Control?.get(selectorString) as FormGroup;
            if (!updatableControl) return;
            ['value', 'file.name', 'file.url', 'date'].forEach(innerSelectorString => {
              const control = updatableControl.get(innerSelectorString)
              this.toggleValidations(control, selectorString + '.' + innerSelectorString, canShow, false);
            });
          })
        });
        control.updateValueAndValidity({ emitEvent: true });
      })
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

  uploadFile(event: { target: HTMLInputElement }, control: FormControl, reset: boolean = false, allowedFileTypes = []) {
    console.log({ event, control })
    if (reset) return control.patchValue({ uploading: false, name: '', url: '' });
    const maxFileSize = 5;
    const file: File = event.target.files[0];
    if (!file) return;
    let isfileValid = this.dataEntryService.checkSpcialCharInFileName(event.target.files);
    if (isfileValid == false) {
      swal("Error", "File name has special characters ~`!#$%^&*+=[]\\\';,/{}|\":<>?@ \nThese are not allowed in file name,please edit file name then upload.\n", 'error');
      return;
    }
    const fileExtension = file.name.split('.').pop();
    if (!allowedFileTypes?.includes(fileExtension)) return swal("Error", `Allowed file extensions: ${allowedFileTypes?.join(', ')}`, "error");

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");

    control.patchValue({ uploading: true });
    this.dataEntryService.newGetURLForFileUpload(file.name, file.type, this.uploadFolderName).subscribe((s3Response: any) => {
      const { url, path } = s3Response.data[0];
      this.dataEntryService.newUploadFileToS3(file, url).subscribe(res => {
        if (res.type !== HttpEventType.Response) return;
        control.patchValue({ uploading: false, name: file.name, url: path });
      });
    }, err => console.log(err));
  }

  async onPreview() {
    if (!this.form.pristine) {
      const confirmed = await swal(
        "Unsaved Changes!",
        `You have some unsaved changes on this page. Please save the changes if you want to view the preview.`,
        "warning"
        , {
          buttons: {
            Leave: {
              text: "Cancel",
              className: 'btn-danger',
              value: false,
            },
            Stay: {
              text: "Save",
              className: 'btn-success',
              value: true,
            },
          },
        }
      );
      console.log({ confirmed });
      if (!confirmed) return
      else {
        await this.submit();
      }

    }
    const date = new Date();
    console.log(this.form.getRawValue());
    const rowValues = this.form.getRawValue();
    const dialogRef = this.dialog.open(PreviewComponent, {
      id: 'UlbFisPreviewComponent',
      data: {
        showData: this.form.getRawValue(),
        financialYearTableHeader: this.financialYearTableHeader,
        specialHeaders: this.specialHeaders,
        additionalData: {
          pristine: this.form.pristine,
          statusText: this.status,
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
     it will become uneditable and will be sent to State for Review.
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
        console.log('invalid', this.findInvalidControlsRecursive(this.form));
        if (!this.validateErrors()) return swal('Error', 'Please fill all mandatory fields', 'error');
        this.submit(false);
      }
      else if (value == 'draft') this.submit();
    })
  }

  findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    var invalidControls: any[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control.invalid) invalidControls.push({ field, control });
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }


  submit(isDraft = true) {
    console.log(this.form)
    const payload = {
      state: this.stateId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      currentFormStatus: isDraft ? 2 : 3,
      actions: this.form.getRawValue()
    }
    this.loaderService.showLoader();
    return new Promise((resolve, reject) => {
      this.sfcFormService.postData(payload).subscribe(res => {
        this.form.markAsPristine();
        this.loaderService.stopLoader();
        // this.commonServices.setFormStatusUlb.next(true);
        this.loadData();
        this.isFormFinalSubmit = true;
        this.formSubmitted = !isDraft;
        swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
        resolve(true);
      }, ({ error }) => {
        this.loaderService.stopLoader();
        swal('Error', error?.message ?? 'Something went wrong', 'error');
        reject();
      })
    })
  }

  actionFormChangeDetect(res) {
    if (res == true) {
      // this.commonServices.setFormStatusUlb.next(true);
      this.loadData();
    }
  }

  getNextPreUrl() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((ele) => {
        if (ele?.folderName == "pto") {
          this.nextPreUrl = { nextBtnRouter: ele?.nextUrl, backBtnRouter: ele?.prevUrl }
          this.formId = ele?.formId;
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.leftMenuSubs.unsubscribe();
  }

}
