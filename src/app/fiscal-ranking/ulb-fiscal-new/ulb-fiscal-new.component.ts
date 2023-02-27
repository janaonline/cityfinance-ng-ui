import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UlbFisPreviewComponent } from './ulb-fis-preview/ulb-fis-preview.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
const toWords = new ToWords();

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

  linearTabs = ['s1', 's2'];

  tabs: Tab[];
  cantakeAction: boolean = true;
  formId: any;
  ulbId: any;
  userData: any;
  ulbName: string;
  userTypes = USER_TYPE;
  fiscalForm: FormArray;
  status: '' | 'PENDING' | 'REJECTED' | 'APPROVED' = '';

  formSubmitted = false;
  sortOrder = { // TODO: get from backend
    s3: {totalRecActual: 1, totalRcptWaterSupply: 2, totalRcptSanitation: 3, totalRecBudgetEst: 4, totalOwnRevenues: 5, totalPropTaxRevenue: 6, totalTaxRevWaterSupply: 7, totalTaxRevSanitation: 8, totalFeeChrgWaterSupply: 9, totalFeeChrgSanitation: 10},
    s4: {totalCaptlExp: 1, totalCaptlExpWaterSupply: 2, totalCaptlExpSanitation: 3, totalOmExp: 4, totalOMCaptlExpWaterSupply: 5, totalOMCaptlExpSanitation: 6, totalRevExp: 7},
    s5: {auditReprtDate: 1, normalData: 2, ownRevDetails: 3, ownRevenAmt: 4, propertyDetails: 5 },
    s6: {guidanceNotes: 1, appAnnualBudget: 2, auditedAnnualFySt: 3, },
  }

  constructor(
    private fb: FormBuilder,
    private fiscalService: FiscalRankingService,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
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
    if(this.status == '' || this.status === 'APPROVED') return false;
    if (this.loggedInUserType == this.userTypes.ULB && this.status === 'PENDING') return false;
    if (this.loggedInUserType == this.userTypes.STATE && this.status === 'PENDING') return false;
    return true;
  }

  get isDisabled() {
    return false;
  }

  get uploadFolderName() {
    return `${this.userData?.role}/${this.design_year}/fiscalRanking/${this.userData?.ulbCode}`
  }

  get design_year() {
    return this.yearIdArr['2022-23'];
  }

  sortPosition(itemA: KeyValue<number, FormGroup>, itemB: KeyValue<number, FormGroup>) {
    const a = +itemA.value.controls.position?.value;
    const b = +itemB.value.controls.position?.value;
    return a > b ? 1 : (b > a ? -1 : 0);;
  }

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.design_year, this.ulbId).subscribe((res: any) => {
      this.formId = res?.data?._id;
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
          obj[key] = this.getInnerFormGroup({...item, key})
        }
        else if (tab.id == 's7') {
          obj[key] = this.fb.group({
            uploading: [{ value: false, disabled: true }],
            name: item.name,
            status: item.status,
            url: item.url,
          })
        }
        else {
          obj[key] = this.fb.group({
            key: item.key,
            position: [{ value: this.sortOrder[tab.id]?.[item.key] || 1 , disabled: true}], // TODO: need from backend
            canShow: [{ value: true, disabled: true }],
            label: [{ value: item.label, disabled: true }],
            yearData: this.fb.array(item.yearData.map(yearItem => this.getInnerFormGroup(yearItem)))
          })
        }
        return obj;
      }, {}))
    })
  }

  getInnerFormGroup(item) {
    return this.fb.group({
      key: item.key,
      value: [item.value || item.amount, Validators.required], // TODO: add validators
      date: item.date,
      year: item.year,
      type: item.type,
      formFieldType: [{ value: this.getFormFieldType(item.key) || 'text', disabled: true}],
      status: item.status,
      bottomText: [{ value: item.bottomText, disabled: true }],
      label: [{ value: item.label, disabled: true }],
      placeholder: [{ value: item.placeholder, disabled: true }],
      desc: [{ value: item.desc, disabled: true}],
      position: [{value: item.postion, disabled: true}],
      pos: [{ value: item.pos, disabled: true}],
      readonly: [{ value: item.readonly, disabled: true }],
      ...(item.file && {
        file: this.fb.group({
          uploading: [{ value: false, disabled: true }],
          name: [item.file.name],
          url: [item.file.url]
        })
      })
    });
  }

  getFormFieldType(key) {
    return {
      waterSupply: 'radio-toggle',
      webLink: 'url',
      propertyWaterTax: 'radio-toggle',
      propertySanitationTax: 'radio-toggle',  
      sanitationService: 'radio-toggle',  
    }[key] || 'text';
  }

  addSkipLogics() {
    const s1Control = this.fiscalForm.controls.find(control => control.value?.id == 's1') as FormGroup;
    const s3Control = this.fiscalForm.controls.find(control => control.value?.id == 's3') as FormGroup;
    const { waterSupply, sanitationService }: { [key: string]: FormGroup } = (s1Control.controls?.data as FormGroup)?.controls as any;
    waterSupply.valueChanges.subscribe(({ value }) => {
      s3Control.patchValue({ data: { totalRcptWaterSupply: { canShow: value == 'Yes' } } })
    });
    sanitationService.valueChanges.subscribe(({ value }) => {
      s3Control.patchValue({ data: { totalRcptSanitation: { canShow: value == 'Yes' } } })
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

  uploadFile(event: { target: HTMLInputElement }, fileType: string, control: FormControl) {
    const maxFileSize = 5;
    const file: File = event.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split('.').pop();

    if ((file.size / 1024 / 1024) > maxFileSize) return swal("File Limit Error", `Maximum ${maxFileSize} mb file can be allowed.`, "error");
    if (fileType === 'excel' && !['xls', 'xlsx'].includes(fileExtension)) return swal("Error", "Only Excel File can be Uploaded.", "error");
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
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      data: {
        showData: this.fiscalForm.getRawValue().filter(item => item.id !== 's7')
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
  
  submit(isDraft = true) {
    const payload = {
      ulbId: this.ulbId,
      formId: this.formId,
      design_year: this.design_year,
      isDraft: isDraft,
      actions: this.fiscalForm.value
    }

    console.log(payload);

    this.fiscalService.actionByMohua(payload).subscribe(res => {
      swal('Saved', isDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
    }, (error) => {
      console.log('post error', error)
    })
  } 
}
