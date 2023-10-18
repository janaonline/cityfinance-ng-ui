import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService, StatusType } from '../fiscal-ranking.service';
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UlbFisPreviewComponent } from './ulb-fis-preview/ulb-fis-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { APPROVAL_TYPES, Tab } from '../models';
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
  hideForm: boolean;
  notice: string;
  pmuSubmissionDate: string;
  selfDeclarationTabId: string = 's5';
  guidanceNotesKey: string = 'guidanceNotes';
  incomeSectionBelowKey: number = 1;
  expenditureSectionBelowKey: number = 8;
  financialYearTableHeader: { [key: number]: string[] } = {};
  linearTabs: string[] = ['s1', 's2'];
  twoDTabs: string[] = ['s4', 's5', 's6'];
  textualFormFiledTypes: string[] = ['text', 'url', 'email', 'number'];
  tabs: Tab[];
  currentFormStatus: number;
  formId: string;
  ulbId: string;
  stateCode: string;
  isDraft: boolean;
  userData: any;
  ulbName: string;
  validators = {};
  userTypes = USER_TYPE;
  statusTypes = StatusType;
  form: FormArray;
  status: '' | 'PENDING' | 'REJECTED' | 'APPROVED' = '';
  formSubmitted = false;
  msgForLedgerUpdate: string[] = [];
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
    else if (this.loggedInUserType != this.userTypes.ULB) {
      this.ulbId = this.activatedRoute.snapshot.params.ulbId;
      if (!this.ulbId) {
        this._router.navigateByUrl('rankings/home')
      }
    }
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role == "ULB") {
      this.ulbId = this.userData?.ulb;
    }
  }

  ngOnInit(): void {
    this.onLoad();
    sessionStorage.setItem("changeInFR", "false");
  }

  get canSeeActions() {
    if (this.loggedInUserType == this.userTypes.PMU && [StatusType.verificationNotStarted, StatusType.verificationInProgress].includes(this.currentFormStatus)) return true;
    return [StatusType.inProgress, StatusType.returnedByPMU, StatusType.ackByPMU].includes(this.currentFormStatus);
  }

  get canTakeAction() {
    return this.loggedInUserType == this.userTypes.PMU && [StatusType.verificationNotStarted, StatusType.verificationInProgress].includes(this.currentFormStatus);
  }

  get isDisabled() {
    if (this.loggedInUserType == this.userTypes.ULB) return ![StatusType.notStarted, StatusType.inProgress, StatusType.returnedByPMU].includes(this.currentFormStatus);
    if (this.loggedInUserType == this.userTypes.PMU) return ![StatusType.verificationNotStarted, StatusType.verificationInProgress].includes(this.currentFormStatus);
    return true;
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

  get ulbSupportingDocControl() {
    return this.form.get('4.data.ulbSupportingDoc');
  }
  
  get signedCopyOfFileControl() {
    return this.form.get('4.data.signedCopyOfFile');
  }

  get formExpiryDate() {
    if (!this.pmuSubmissionDate) return null;
    const date = new Date(this.pmuSubmissionDate);
    date.setDate(date.getDate() + 10);
    return date;
  }

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.design_year, this.ulbId).subscribe((res: any) => {
      this.hideForm = res?.data?.hideForm;
      this.notice = res?.data?.notice;
      this.formId = res?.data?._id;
      this.isDraft = res?.data?.isDraft;
      this.ulbName = res?.data?.ulbName;
      this.stateCode = res?.data?.stateCode;
      this.currentFormStatus = res?.data?.currentFormStatus;
      this.tabs = res?.data?.tabs;
      this.financialYearTableHeader = res?.data?.financialYearTableHeader;
      this.pmuSubmissionDate = res?.data?.pmuSubmissionDate;

      this.form = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
      if (this.userData.role == this.userTypes.ULB) {
        this.addSumLogics();
      }
      this.addSubtractLogics();
      this.form.markAsPristine();
      this.isLoader = false;
      this.msgForLedgerUpdate = res?.data?.messages;
      if (this.msgForLedgerUpdate?.length) swal("Confirmation !", `${this.msgForLedgerUpdate?.join(', ')}`, "warning")
    });
  }

  getTabFormGroup(tab: Tab): any {
    const { data, feedback, ...rest } = tab;
    return this.fb.group({
      ...rest,
      // feedback: this.fb.group({
      //   comment: [feedback.comment,],
      //   status: feedback.status,
      //   _id: feedback._id,
      // }),
      data: this.fb.group(Object.entries(data).reduce((obj, [key, item]: any) => {
        if (this.linearTabs.includes(tab.id)) {
          obj[key] = this.getInnerFormGroup({ ...item, key })
        }
        else if (tab.id == this.selfDeclarationTabId) {
          obj[key] = this.fb.group({
            uploading: [{ value: false, disabled: true }],
            name: [item.name, this.userData?.role == USER_TYPE.ULB && item.required ? Validators.required : null],
            readonly: [{ value: item.readonly, disabled: true }],
            status: [item?.status, this.getStatusValidators(item, tab.id)],
            rejectReason: item?.rejectReason,
            url: [item.url, this.userData?.role == USER_TYPE.ULB && item.required ? Validators.required : null],
          });
          this.attactRequiredReasonToggler(obj[key]);
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
            yearData: this.fb.array(item.yearData.slice().reverse().map(yearItem => this.getInnerFormGroup(yearItem, item, tab?.id)))
          })
        }
        return obj;
      }, {}))
    })
  }

  isHeading(displayPriority): boolean {
    if (['5.1', '5.2', '7.1', '7.2'].includes(displayPriority)) return true;
    if (['24', '25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(displayPriority)) return false;
    return Number.isInteger(+displayPriority);
  }

  getApprovalTypeValidators(item) {
    if(this.userData?.role == USER_TYPE.ULB && item?.status == 'REJECTED' && item?.suggestedValue ) {
      return [
        Validators.required,
        (control) => [
          APPROVAL_TYPES.enteredPmuAcceptUlb,
          APPROVAL_TYPES.enteredPmuRejectUlb
        ].includes(control.value) ? null : { invalidApprovalType: true }
      ];
    } else if(this.userData?.role == USER_TYPE.PMU && item?.status == 'REJECTED' && item?.suggestedValue ) {
      return [
        Validators.required,
        (control) => control.value !== APPROVAL_TYPES.enteredPmuRejectUlb ? null : { invalidApprovalType: true }
      ];
    } else {
      return [];
    }
  }

  getInnerFormGroup(item, parent?, tabId?) {
    const innerFormGroup = this.fb.group({
      key: item.key,
      value: [item.value, this.getValidators(item, !['date', 'file'].includes(item.formFieldType), parent)],
      originalValue: item.value,
      year: item.year,
      type: item.type,
      _id: item._id,
      modelName: [{ value: item.modelName, disabled: true }],
      suggestedValue: [item?.suggestedValue],
      pmuSuggestedValue2: [item?.pmuSuggestedValue2],
      approvalType: [item?.approvalType,  this.getApprovalTypeValidators(item)],
      ulbValue: [item?.ulbValue],
      ulbComment: [item?.ulbComment],
      focused: [{ value: false, disabled: true }],
      required: [{ value: item.required, disabled: true }],
      isRupee: [{ value: item.isRupee, disabled: true }],
      code: [{ value: item.code, disabled: true }],
      previousYearCodes: [{ value: item.previousYearCodes, disabled: true }],
      min: [{ value: new Date(item?.min), disabled: true }],
      max: [{ value: new Date(item?.max), disabled: true }],
      date: [item.date, this.userData?.role == USER_TYPE.ULB && item.formFieldType == 'date' && item.required ? [Validators.required] : []],
      formFieldType: [{ value: item.formFieldType || 'text', disabled: true }],
      status: [item?.status, this.getStatusValidators(item, tabId)],
      rejectReason: [item?.rejectReason],
      rejectReason2: [item?.rejectReason2],
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
          name: [item.file.name, this.userData?.role == USER_TYPE.ULB && item.required ? [Validators.required] : []],
          url: [item.file.url, this.userData?.role == USER_TYPE.ULB && item.required ? [Validators.required] : []]
        })
      })
    });
    this.attactRequiredReasonToggler(innerFormGroup, tabId);
    return innerFormGroup;
  }

  getStatusValidators(item, tabId) {
    if(this.loggedInUserType == this.userTypes.PMU) {
      if(item?.status) {
        if(tabId != 's3' && this?.pmuSubmissionDate) {
          return Validators.pattern(/^(APPROVED)$/)
        }
        return Validators.pattern(/^(REJECTED|APPROVED)$/)
      }
      return null;
    }
    return null;
  }

  attactRequiredReasonToggler(innerFormGroup: FormGroup, tabId?) {
    const statusControl = innerFormGroup.get('status');
    statusControl?.valueChanges.subscribe(status => {
      const rejectReasonControl = innerFormGroup.get('rejectReason');
      const suggestedValueControl = innerFormGroup.get('suggestedValue');
      rejectReasonControl?.setValidators(status == 'REJECTED' ? [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ] : []);
      suggestedValueControl?.setValidators(status == 'REJECTED' && tabId == 's3' ? [
        Validators.required
      ] : []);
      rejectReasonControl?.updateValueAndValidity({ emitEvent: true });
      suggestedValueControl?.updateValueAndValidity({ emitEvent: true });
    });
    statusControl?.updateValueAndValidity({ emitEvent: true });
  }

  getValidators(item, canApplyRequired = false, parent?) {
    if (this.userData?.role != USER_TYPE.ULB) return [];
    return [
      ...(parent?.logic == 'sum' && item.modelName ? [Validators.pattern(new RegExp(item.value))] : []),
      ...(item.required && canApplyRequired ? [Validators.required] : []),
      ...(item.formFieldType == 'url' ? [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')] : []),
      ...(item.formFieldType == 'email' ? [Validators.email] : []),
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
        const selectorString = `data.${updatedable}.yearData.0`;
        const updatableControl = s3Control.get(selectorString) as FormGroup;
        if (!updatableControl) return;
        if (canShow && this.userData?.role == this.userTypes.ULB && this.currentFormStatus == StatusType.returnedByPMU) {
          updatableControl.patchValue({
            readonly: control?.get('status')?.value == 'APPROVED'
          });
        }
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
        // child.updateValueAndValidity({ emitEvent: true });
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

  updateControl(control: FormControl, value) {
    control.patchValue(value);
  }

  rowReview(controls: FormGroup[], status: 'PENDING' | 'APPROVED' | 'REJECTED') {
    controls.forEach(control => {
      control.patchValue({
        status,
        ...(status == 'REJECTED' && {
          rejectReason: ''
        })
      });
    });
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
      },
        (err) => {
          control.patchValue({ uploading: false });
          swal("Error", "File uploading failed, please try again!", "error")
        }
      );
    }, (err) => {
      console.log(err);
      control.patchValue({ uploading: false });
      swal("Error", "File uploading failed, please try again!", "error")

    });
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
        stateCode: this.stateCode,
        ulbName: this.ulbName,
        ulbId: this.ulbId,
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
    const ledgerValueControls = ['fixedAsset', 'CaptlExp'].map(key => this.form.get(`2.data.${key}`));
    console.log(this.form);

    ledgerValueControls.forEach(control => {
      const yearValues = control.value.yearData?.map(yearData => yearData.value);
      const sumable = control.get('calculatedFrom').value;

      const sumableControls = Object?.values((this.form.get('2.data') as FormGroup)?.controls)
        .filter(control => sumable?.includes('' + (control as FormGroup)?.controls?.position?.value))

      const sumableYearValues = sumableControls.map(control => control.value?.yearData?.reduce((sum, year) => sum + (+year.value || 0), 0))

      console.log({ control, sumable, yearValues, sumableYearValues });
    })

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
      this.loggedInUserType == this.userTypes.PMU ? `${this.msgForLedgerUpdate?.join(', ')}, Are you sure you want to submit this form?` :
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

  getCurrentFormStatus(isDraft: boolean) {
    if (this.userData.role == this.userTypes.ULB) return isDraft
      ? StatusType.inProgress
      : StatusType.verificationInProgress;
    if (this.userData.role == this.userTypes.PMU) return isDraft ? 9 : 11; // TODO: by backend set status 10 if rejected
  }

  canSeeAllActionButtons(items: any[]) {

    if (this.canTakeAction && items?.filter(item => item.key)?.length > 1) {
      return items?.every(item => item.status != "")
    }
    return false
  }

  onFocusChange(control: FormGroup, focused: boolean) {
    control.patchValue({ focused });
  }

  submit(isDraft = true) {
    const payload = {
      ulbId: this.ulbId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      currentFormStatus: this.getCurrentFormStatus(isDraft),
      actions: this.form.getRawValue()
    }
    this.loaderService.showLoader();
    this.fiscalService[this.userData.role == this.userTypes.PMU ? 'actionByMohua' : 'postFiscalRankingData'](payload).subscribe(res => {
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