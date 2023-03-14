import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: 'app-ulb-fiscal-new',
  templateUrl: './ulb-fiscal-new.component.html',
  styleUrls: ['./ulb-fiscal-new.component.scss']
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

  financialYearTableHeader: { [key: number]: string[] } = {
    1: ['', 'SECTION A:  Details from Income & Expenditure Statement', '2021-22', '2020-21', '2019-20', '2018-19'],
    20: ['', 'SECTION B:  Other Details from Audited Annual Accounts', '2021-22', '2020-21', '2019-20', '2018-19'],
    25: ['', 'SECTION C:  Details from Receipts & Payments Statement', '2021-22', '2020-21', '2019-20', '2018-19'],
    26: ['', 'SECTION D:  Details from Approved Annual Budgets', '2021-22', '2020-21', '2019-20', '2018-19'],
    30: ['', 'SECTION E:  Self-reported Details for Fiscal Governance Parameters', '2021-22', '2020-21', '2019-20', '2018-19'],
  }


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
  userTypes = USER_TYPE;
  fiscalForm: FormArray;
  status: '' | 'PENDING' | 'REJECTED' | 'APPROVED' = '';

  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public fiscalService: FiscalRankingService,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
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
    return !this.isDraft;;
  }

  get uploadFolderName() {
    return `${this.userData?.role}/${this.design_year}/fiscalRanking/${this.userData?.ulbCode}`
  }

  get design_year() {
    return this.yearIdArr['2022-23'];
  }

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.design_year, this.ulbId).subscribe((res: any) => {
      this.formId = res?.data?._id;
      this.isDraft = res?.data?.isDraft;
      this.tabs = res?.data?.tabs;

      this.fiscalForm = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))
      this.addSkipLogics();
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
            name: [item.name, Validators.required],
            status: item.status,
            url: [item.url, Validators.required],
          })
        }
        else {
          obj[key] = this.fb.group({
            key: item.key,
            position: [{ value: +item.displayPriority || 1, disabled: true }], // TODO: need from backend
            isHeading: [{ value: Number.isInteger(item.displayPriority), disabled: true }], // TODO: need from backend
            canShow: [{ value: true, disabled: true }],
            label: [{ value: item.label, disabled: true }],
            info: [{ value: item.info, disabled: true }],
            yearData: this.fb.array(item.yearData.slice().reverse().map(yearItem => this.getInnerFormGroup(yearItem)))
          })
        }
        return obj;
      }, {}))
    })
  }

  getInnerFormGroup(item) {
    return this.fb.group({
      key: item.key,
      value: [item.value, this.getValidators(item, !['date', 'file'].includes(item.formFieldType))],
      year: item.year,
      type: item.type,
      _id: item._id,
      date: [item.date, item.date && item.required ? [Validators.required] : []],
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

  getValidators(item, canApplyRequired = false) {
    return [
      ...(item.required && canApplyRequired ? [Validators.required] : []),
      ...(item.formFieldType == 'url' ? [urlValidator] : []),
      ...(item.formFieldType == 'email' ? [customEmailValidator] : []),
      ...(item.min != '' ? [Validators[item.formFieldType == 'number' ? 'min' : 'minLength'](+item.min)] : []),
      ...(item.max != '' ? [Validators[item.formFieldType == 'number' ? 'max' : 'maxLength'](+item.max)] : []),
    ];
  }

  addSkipLogics() {
    const s3Control = this.fiscalForm.controls.find(control => control.value?.id == 's3') as FormGroup;
    const { registerGis, accountStwre }: { [key: string]: FormGroup } = (s3Control.controls?.data as FormGroup)?.controls as any;

    (registerGis?.controls?.yearData as FormArray)?.controls?.[0]?.valueChanges.subscribe(({ value }) => {
      s3Control.patchValue({ data: { registerGisProof: { canShow: value == 'Yes' } } })
    });
    (accountStwre?.controls?.yearData as FormArray)?.controls?.[3]?.valueChanges.subscribe(({ value }) => {
      s3Control.patchValue({ data: { accountStwreProof: { canShow: value == 'Yes' } } })
    });
  }

  stepperContinue(item) {
    console.log(this.fiscalForm);
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
    console.log(this.fiscalForm.getRawValue());
    const rowValues = this.fiscalForm.getRawValue();
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      data: {
        showData: rowValues.filter(item => item.id !== this.selfDeclarationTabId),
        additionalData: {
          date: new Date().toJSON().slice(0, 10),
          nameCmsnr: rowValues.find(row => row.id == 's1')?.data?.nameCmsnr?.value,
          auditorName: rowValues.find(row => row.id == 's1')?.data?.auditorName?.value,
          caMembershipNo: rowValues.find(row => row.id == 's1')?.data?.caMembershipNo?.value,
        }
      },
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }

  validateErrors() {
    this.fiscalForm.markAllAsTouched();
    if (this.fiscalForm.status === 'INVALID') {
      console.log(this.fiscalForm);
      const invalidIndex = this.fiscalForm.controls.findIndex(control => control.status === 'INVALID');
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
        if (!this.validateErrors()) return swal('Error', 'Please fill form correctly', 'error');;
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
      actions: this.fiscalForm.getRawValue()
    }
    this.fiscalService.postFiscalRankingData(payload).subscribe(res => {
      this.formSubmitted = !isDraft;
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
    }, (error) => {
      swal('Error', 'Something went wrong', 'error');
    })
  }
}
