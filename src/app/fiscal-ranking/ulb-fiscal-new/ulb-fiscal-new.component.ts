import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
const swal: SweetAlert = require("sweetalert");
const toWords = new ToWords();


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
  cantakeAction: boolean = false;
  ulbId: any;
  userData: any;
  ulbName: string;
  userTypes = USER_TYPE;
  fiscalForm: FormArray;

  formSubmitted = false;

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
    this.initializeForm();

    this.loggedInUserType = this.loggedInUserDetails?.role;
    if (!this.loggedInUserType) {
      this._router.navigateByUrl('fiscal/login')
      // this.showLoader = false;
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

  get canShowComment() {
    if (this.loggedInUserType == this.userTypes.ULB) return false;
    return true;
  }

  get isDisabled() {
    return false;
  }

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
      this.tabs = res?.tabs;

      this.fiscalForm = this.fb.array(this.tabs.map(tab => this.getTabFormGroup(tab)))

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
          obj[key] = this.getInnerFormGroup(item)
        }
        else if (tab.id == 's7') {
          obj[key] = this.fb.group({
            name: item.name,
            status: item.status,
            url: item.url,
          })
        }
        else {
          obj[key] = this.fb.group({
            key: item.key,
            label: [{value: item.label, disabled: true}],
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
      label: [{value: item.label, disabled: true}],
      placeholder: [{value: item.placeholder, disabled: true}],
      value: [item.value || item.amount,], // TODO: add validators
      status: item.status
    });
  }

  initializeForm() {

  }




  stepperContinue(item) {
    console.log(this.fiscalForm.getRawValue());
    this.stepper.next();
  }

  canShowFormSection() {
    return true;
  }


  onPreview() {
    // this.isDraft = true;
    // this.updateValueInForm();
    // this.getFullDataArray();
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      data: {
        // showData: this.stePreDataArray,
        // preData: this.postData
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
}
