import { Component, Inject, OnInit } from '@angular/core';
import { PropertyTaxService } from './property-tax.service';

import { HttpEventType } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';
import { SweetAlert } from "sweetalert/typings/core";

import { KeyValue } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { PreviewComponent } from './preview/preview.component';
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
  // Growth rate will be calculated 24-25 onwards.
  stateGsdpGrowthRate: number;
  growthRatePercent: number = null;
  currentDate = new Date();
  minDate = new Date('01-01-1990');
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
  successErrorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loaderService: GlobalLoaderService,
    private dateAdapter: DateAdapter<Date>,
    private propertyTaxService: PropertyTaxService,
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
    return `${this.userData?.role}/${this.yearName}/pto/${this.userData?.ulbCode}`;
  }

  get design_year() {
    return this.activatedRoute.parent.snapshot.params?.yearId;
  }

  get yearName() {
    return this.commonServices.getYearName(this.design_year);
  }

  get ulbId() {
    if (this.userData?.role == 'ULB') return this.userData?.ulb;
    return localStorage.getItem("ulb_id");
  }

  get hasUnsavedChanges() {
    if (!this.form) return false;
    return !this.form.pristine;
  }

  loadData() {
    console.log("-----------load Data -----------")
    this.loaderService.showLoader();
    this.propertyTaxService.getForm(this.ulbId, this.design_year).subscribe((res: any) => {
      this.loaderService.stopLoader();
      console.log('response', res);
      this.tabs = res?.data?.tabs;
      this.status = res?.data?.status;
      this.statusId = res?.data?.statusId;
      this.stateGsdpGrowthRate = res?.data?.stateGsdpGrowthRate;
      this.skipLogicDependencies = res?.data?.skipLogicDependencies;
      this.financialYearTableHeader = res?.data?.financialYearTableHeader;
      this.specialHeaders = res?.data?.specialHeaders;

      this.form = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
      this.isLoader = false;
      this.canTakeAction = res?.data?.canTakeAction;
      this.formDisable(res?.data);
      console.log('form', this.form);
    }, ({ error }) => {
      this.loaderService.stopLoader();
      if (error?.success == true && error?.message) {
        this.successErrorMessage = error?.message;
      } else {
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    });
  }

  get buttonDissabled() {
    if (this.userData?.role != USER_TYPE.ULB) return true;
    return ![1, 2, 5, 7].includes(this.statusId);
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
            ...(item.child && {
              replicaCount: item.replicaCount,
              maxChild: [{ value: item.maxChild, disabled: true }],
              copyOptions: [{ value: item.copyOptions, disabled: true }],
              copyChildFrom: [{ value: item.copyChildFrom, disabled: true }],
              child: this.fb.array(item.child.map(childItem => this.fb.group({
                entryDesignYear: childItem?.entryDesignYear,
                key: childItem.key,
                value: [childItem.value, this.getValidators(childItem, !['date', 'file', 'link'].includes(childItem.formFieldType), parent)],
                _id: childItem._id,
                label: [{
                  value: item.copyChildFrom.find(copyChildItem => copyChildItem.key == childItem.key)?.label,
                  disabled: true
                }],
                replicaNumber: childItem.replicaNumber,
                readonly: [{ value: childItem.readonly, disabled: true }],
                formFieldType: [{ value: childItem.formFieldType || 'text', disabled: true }],
                position: [{ value: childItem.displayPriority || 1, disabled: true }],
                yearData: this.fb.array(childItem?.yearData?.map(yearItem => this.getInnerFormGroup(yearItem, item, childItem.replicaNumber)))
              })), item?.required ? [Validators.required] : []),
            }),
            yearData: this.fb.array(item.yearData.map(yearItem => this.getInnerFormGroup(yearItem, item)))
          })
        }
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
      notApplicable: item.notApplicable,
      modelName: [{ value: item.modelName, disabled: true }],
      isRupee: [{ value: item.isRupee, disabled: true }],
      decimalLimit: [{ value: item.decimalLimit, disabled: true }],
      options: [{ value: item.options, disabled: true }],
      code: [{ value: item.code, disabled: true }],
      previousYearCodes: [{ value: item.previousYearCodes, disabled: true }],
      date: [item.date, item.formFieldType == 'date' && item.required ? [Validators.required] : []],
      formFieldType: [{ value: item.formFieldType || 'text', disabled: true }],
      status: item.status,
      bottomText: [{ value: item.bottomText, disabled: true }],
      info: item.info,
      label: [{ value: item.label, disabled: true }],
      placeholder: [{ value: item.placeholder, disabled: true }],
      desc: [{ value: item.desc, disabled: true }],
      max: [{ value: item.max, disabled: true }],
      min: [{ value: item.min, disabled: true }],
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

  hideQuestion: string = '';
  addSkipLogics() {

    Object.entries(this.skipLogicDependencies).forEach(([selector, skipLogicDependency]) => {

      (skipLogicDependency as any)?.updatables?.forEach(updatable => {
        const control = this.s3Control.get(selector);
        control.valueChanges.subscribe(({ value }) => {
          const updatableControl = this.s3Control?.get(updatable.target) as FormGroup;

          if (value === updatable?.on) {
            updatableControl.patchValue({
              value: updatable?.value
            });
          }
        });
        control.updateValueAndValidity({ emitEvent: true });
      })

      Object.entries(((skipLogicDependency as any).skippable as object)).forEach(([skippable, config]) => {
        const control = this.s3Control.get(selector)

        control.valueChanges.subscribe(({ value }) => {
          this.hideQuestion = this.ulbCollectPtaxCtrl.value.value == 'Yes' ?
            'data.ulbPassedResolPtax.yearData.0' :
            'data.notificationPropertyTax.yearData.0';

          if (selector != this.hideQuestion) {
            const canShow = (typeof config.value == 'string' ? [config.value] : config.value).includes(value);

            this.s3Control.patchValue({ data: { [skippable]: { canShow } } });
            const childSelectorString = `data.${skippable}.child`;
            const childControl = this.s3Control.get(childSelectorString);

            this.toggleValidations(childControl, childSelectorString, canShow, true);
            config.years?.forEach(yearIndex => {
              const selectorString = `data.${skippable}.yearData.${yearIndex}`;
              const updatableControl = this.s3Control?.get(selectorString) as FormGroup;

              if (!updatableControl) return;
              ['value', 'file.name', 'file.url', 'date'].forEach(innerSelectorString => {
                const control = updatableControl.get(innerSelectorString)
                this.toggleValidations(control, selectorString + '.' + innerSelectorString, canShow, false);
              });

            })

          }
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
    if (!allowedFileTypes?.includes(fileExtension)) return swal("Error", `Please upload the document in ${allowedFileTypes?.join(', ').toUpperCase()} only`, "error");

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

  public isNotiPtaxOrUlbResAvailable() {
    // return this.notificationPropertyTaxCtrl.value.value == 'Yes' || this.ulbPassedResolPtaxCtrl.value.value == 'Yes';
    return true;
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

    // Will be applicable from 2025-26
    if (!['2023-24', '2024-25'].includes(this.yearName) && this.isNotiPtaxOrUlbResAvailable()) {
      if (!this.stateGsdpGrowthRate)
        return swal("Info", "State GSDP data is not available. You cannot preview the form at this time, please save it as draft", "info");
      if (this.growthRatePercent === undefined || this.growthRatePercent === null)
        return swal("Info", "Growth rate cannot be calculated, Please fill 'Total property tax collection (1.17)'", "info");
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
        stateGsdpGrowthRate: this.stateGsdpGrowthRate,
        yearName: this.yearName,
        growthRatePercentage: this.growthRatePercent,
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

  canDeleteLast(rows: any[]) {
    const lastRow = rows[rows.length - 1];
    return lastRow.entryDesignYear == this.design_year;
  }

  finalSubmitConfirmation() {
    if (!this.stateGsdpGrowthRate && this.yearName != '2023-24') {
      return swal("Info", "State GSDP data is not available. You cannot final submit the form at this time, please save it as draft", "info")
    }
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
        if (!this.validateErrors()) {
          swal('Error', 'Please fill all mandatory fields', 'error');
          // wait for rendering all the dynamic class
          setTimeout(() => {
            this.focusOnControl();
          }, 100)
          return;
        }
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

  //add scroll on error class input
  focusOnControl() {
    const inputElement = document.querySelector('small.text-danger.invalid, input.ng-invalid, div.ng-invalid, select.ng-invalid') as HTMLElement;
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputElement.focus();
    }
  }
  async editChildQuestions(item: FormGroup, replicaNumber: number, oldLabel: string) {
    const childrens = item.controls.child as FormArray;
    const { value: updatedLabel, isConfirmed, isDismissed } = await swal2.fire({
      title: item.controls?.copyOptions.value ? 'Select an option' : 'Enter a value',
      input: item.controls?.copyOptions.value ? 'select' : 'text',
      inputValue: oldLabel,
      inputOptions: item.controls?.copyOptions.value?.reduce((result, item) => ({ ...result, [item.id]: item.label }), {}),
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update',
    });
    if (isDismissed) return;
    if (!updatedLabel) {
      if (isConfirmed) swal('Warning', `Please enter a value`, 'warning');
      return;
    };
    if ((childrens?.value as any[])?.some(item => (item.value).toLowerCase() == (updatedLabel).toLowerCase())) {
      return swal('Warning', `${updatedLabel} already exists`, 'warning');
    }
    console.log(childrens.value);
    const updatableQuestions = childrens.controls.filter(control => control.value.replicaNumber == replicaNumber) as FormGroup[];

    updatableQuestions.forEach(control => {
      control.patchValue({
        value: updatedLabel,
      })
    });
  }


  async removeLastQuestion(item: FormGroup) {
    const childrens = item.controls.child as FormArray;
    const lastItemReplicaNumber = childrens.controls[childrens.controls.length - 1]?.value?.replicaNumber;
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Do you want to remove this question?",
      icon: "warning",
      dangerMode: true,
    });
    if (!willDelete) return;
    const removableIndexes = [];
    childrens.controls.forEach((control, index) => {
      if (control.value.replicaNumber == lastItemReplicaNumber) {
        removableIndexes.push(index);
      }
    });
    removableIndexes.reverse();
    removableIndexes.forEach(index => {
      childrens.removeAt(index);
    });
    let replicaCount = item.controls?.replicaCount?.value;
    replicaCount--;
    item.patchValue({
      replicaCount,
    });
  }
  async addChildQuestions(item: FormGroup) {
    const copyChildFrom = item.controls?.copyChildFrom.value as string[];
    const maxChild = item.controls?.maxChild?.value;
    let replicaCount = item.controls?.replicaCount?.value;
    console.log({ maxChild, replicaCount });
    const childrens = item.controls.child as FormArray;
    if (replicaCount >= maxChild) return swal('Warning', `Upto ${maxChild} items allowed`, 'warning');
    const { value, isConfirmed, isDismissed } = await swal2.fire({
      title: item.controls?.copyOptions.value ? 'Select an option' : 'Enter a value',
      input: item.controls?.copyOptions.value ? 'select' : 'text',
      inputOptions: item.controls?.copyOptions.value?.reduce((result, item) => ({ ...result, [item.id]: item.label }), {}),
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Add',
    })
    if (isDismissed) return;
    if (!value) {
      if (isConfirmed) swal('Warning', `Please enter a value`, 'warning');
      return;
    };
    if ((childrens?.value as any[])?.some(item => (item.value).toLowerCase() == (value).toLowerCase())) {
      return swal('Warning', `${value} already exists`, 'warning');
    }

    replicaCount++;
    item.patchValue({
      replicaCount,
    });
    copyChildFrom.forEach((targetQuestion: any) => {
      // const targetQuestion = this.tabs[0].data[key];
      console.log(targetQuestion);
      childrens.push(this.fb.group({
        key: targetQuestion.key,
        value: [value, this.getValidators(targetQuestion, !['date', 'file', 'link'].includes(targetQuestion.formFieldType), parent)],
        _id: targetQuestion._id,
        replicaNumber: replicaCount,
        entryDesignYear: this.design_year,
        label: [{ value: targetQuestion.label, disabled: true }],
        formFieldType: [{ value: targetQuestion.formFieldType || 'text', disabled: true }],
        position: [{ value: targetQuestion.displayPriority || 1, disabled: true }],
        readonly: true,
        yearData: this.fb.array(targetQuestion?.yearData?.map(yearItem => this.getInnerFormGroup({
          ...yearItem,
          label: targetQuestion.label,
          postion: targetQuestion.displayPriority
        }, item, replicaCount)))
      }))
    })
  }

  get s3Control() {
    return this.form?.controls.find(control => control.value?.id == 's3') as FormGroup;
  }

  get notificationWaterChargesCtrl() {
    return this.s3Control.get('data.notificationWaterCharges.yearData.0');
  }
  get doesColSewerageChargesCtrl() {
    return this.s3Control.get('data.doesColSewerageCharges.yearData.0');
  }
  get notificationPropertyTaxCtrl() {
    return this.s3Control.get('data.notificationPropertyTax.yearData.0');
  }
  get ulbPassedResolPtaxCtrl() {
    return this.s3Control.get('data.ulbPassedResolPtax.yearData.0');
  }
  get ulbCollectPtaxCtrl() {
    return this.s3Control.get('data.ulbCollectPtax.yearData.0')
  }

  /**
   * |------------------------------------------------------------------------------------|
   * |               |               Data points               |  Growth Rate Formula (%) |
   * | GROWTH RATE % | A. Ptax Collection 2022-23 (in lakhs)   |         (B - A) / A      |
   * |               | B. Ptax Collection 2023-24 (in lakhs)   |                          |
   * |------------------------------------------------------------------------------------|
   */
  // if design_year = 2024-25 (T) then B = 2023-24 (T-1), A = 2022-23 (T-2)
  get growthRatePercentage() {
    if (!this.stateGsdpGrowthRate) {
      return {
        msg: "The property tax growth rate will be determined once the state provides the GSDP growth rate.",
        class: 'text-danger'
      }
    }
    const collectIncludingCess = this.s3Control.get("data.collectIncludingCess.yearData").value;
    const bYr = this.commonServices.getPrevYear(this.yearName);   // T-1
    const aYr = this.commonServices.getPrevYear(bYr);             // T-2

    const B = collectIncludingCess?.find((year) => year.key == `FY${bYr}`)?.value;
    const A = collectIncludingCess?.find((year) => year.key == `FY${aYr}`)?.value;
    
    if (["", "0"].includes(A)) this.growthRatePercent = 0;
    if (B == "") this.growthRatePercent = null;
    
    if (["", "0"].includes(A) || B == "") {
      return {
        msg: `Property tax growth rate cannot be calculated for ${this.commonServices.getPrevYear(this.yearName)}`,
        class: ''
      }
    }
    this.growthRatePercent = ((B - A) / A) * 100;
    if (this.growthRatePercent < this.stateGsdpGrowthRate) {
      return {
        msg: `Property tax growth rate is less than State GSDP for ${this.commonServices.getPrevYear(this.yearName)}`,
        class: 'text-danger'
      }
    }
    else if (this.growthRatePercent >= this.stateGsdpGrowthRate) {
      return {
        msg: `Property tax growth rate is greater than State GSDP for ${this.commonServices.getPrevYear(this.yearName)}`,
        class: 'text-success'
      }
    }
  }

  canShowHeader(displayPriority: string) {
    const waterChargesHeaders = ['5.5', '5.11', '5.13', '5.17', '5.21', '5.25', '5.30', '5.31', '5.32'];
    const sewerageChargesHeaders = ['6.5', '6.11', '6.13', '6.17', '6.21', '6.25', '6.30', '6.31', '6.32'];
    // const pTaxHeaders = ['1.9', '1.17', '2.1', '2.5', '2.9', '2.13', '2.17', '2.21', '2.25', '3.1', '4.1'];

    if (waterChargesHeaders.includes(displayPriority) && this.notificationWaterChargesCtrl.value.value !== 'Yes') { return false; }
    if (sewerageChargesHeaders.includes(displayPriority) && this.doesColSewerageChargesCtrl.value.value !== 'Yes') { return false; }

    // if (pTaxHeaders.includes(displayPriority)) {
    //   if (this.isNotiPtaxOrUlbResAvailable()) { return true; }
    //   else return false;
    // }

    return true;
  }

  getErrorMessage(controlData: AbstractControl): string {
    if (controlData?.errors && "validationError" in controlData.errors)
      return controlData.errors.validationError;
    return '';
  }

  submit(isDraft = true) {
    if (!isDraft && !this.stateGsdpGrowthRate && this.yearName != '2023-24') {
      return swal("Info", "State GSDP data is not available. You cannot final submit the form at this time, please save it as draft", "info")
    }
    // console.log(this.form)
    const payload = {
      ulbId: this.ulbId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      currentFormStatus: isDraft ? 2 : 3,
      actions: this.form.getRawValue()
    }
    this.loaderService.showLoader();
    return new Promise((resolve, reject) => {
      this.propertyTaxService.postData(payload).subscribe(res => {
        this.form.markAsPristine();
        this.loaderService.stopLoader();
        this.commonServices.setFormStatusUlb.next(true);
        this.loadData();
        this.isFormFinalSubmit = true;
        this.formSubmitted = !isDraft;
        swal('Saved', isDraft ? "Data save as draft successfully!" : "Form submitted successfully!", 'success');
        resolve(true);
      }, ({ error }) => {
        this.loaderService.stopLoader();
        const errorMessage = error.message || {};
        const dialogRef = this.dialog.open(ErrorDialog, { data: errorMessage });

        dialogRef.afterClosed().subscribe(() => {
          const startYear = Number(this.yearName.slice(-2)) - 5; // Helper variable to find idx.

          for (let [key, value] of Object.entries(errorMessage)) {
            let replicaNo = null, childKey = null;
            if (key.includes('_')) [key, childKey, replicaNo] = key.split('_');

            const type = 'data.' + key;
            const control = this.s3Control.get(type);

            // Check if the control is a FormGroup or FormArray
            if (control instanceof FormGroup || control instanceof FormArray) {
              for (const yr of value["errorYears"]) {
                const idx = (Number(yr.slice(-2)) - startYear).toString();
                const yearDataControl = control instanceof FormGroup
                  ? control.get('yearData')?.get(idx)
                  : control.controls[idx];

                // Check if yearDataControl exists
                if (yearDataControl) {
                  yearDataControl.setErrors({ validationError: value["message"] });
                }

                // Child Data.
                if (control?.value?.child?.length > 0) {
                  const childIdx = control?.value?.child?.findIndex((c: any) => c['key'] == childKey && c['replicaNumber'] == replicaNo).toString();
                  const childControl = control?.get('child')?.get(childIdx);
                  const yearIdx = (Number(yr.slice(-2)) - startYear).toString();
                  const yearDataChildControl = childControl?.get('yearData')?.get(yearIdx);
                  yearDataChildControl?.setErrors({ validationError: value["message"] });
                }
              }
            } else console.warn(`Control ${type} is not a FormGroup or FormArray`);
          }
        });
        reject(error);
      })
    })
  }

  actionFormChangeDetect(res) {
    if (res == true) {
      this.commonServices.setFormStatusUlb.next(true);
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

  formDisable(res) {
    if (!res) return;
    this.isButtonAvail = this.commonServices.formDisable(res, this.userData);
  }

  ngOnDestroy(): void {
    this.leftMenuSubs.unsubscribe();
  }

}

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'error-dialog',
  template: `
    <h1 mat-dialog-title>Errors:</h1>
    <mat-dialog-content>
    	<ul>
    		<li *ngFor='let error of errors'>{{error}}</li>
    	</ul>
    </mat-dialog-content>
    <div mat-dialog-actions>
    	<button class="btn btn-primary" (click)="closeDialog()">Close</button>
    </div>`

})
export class ErrorDialog {
  errors = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private dialogRef: MatDialogRef<ErrorDialog>
  ) {
    for (const errObj of Object.values(data)) {
      errObj['errorYears'].forEach((yr: string) => this.errors.push(`${errObj['message']} for the year: ${yr}`));
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

