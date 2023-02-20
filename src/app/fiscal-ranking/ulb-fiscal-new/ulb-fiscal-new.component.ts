import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  tabs: any[];
  cantakeAction: boolean = false;
  ulbId: any;
  userData: any;
  ulbName: string;

  fiscalForm: FormGroup;

  formSubmitted: boolean = false;

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

  onLoad() {
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
      this.tabs = res?.tabs;

      // this.fiscalForm = this.fb.array(this.tabs.map(() => {

      // }))
      this.isLoader = false;
    });
  }

  initializeForm() {

  }


  stepperContinue(item) {
    console.log(this.tabs);
    this.stepper.next();
  }
}
