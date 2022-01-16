
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from "@angular/router";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, map, retryWhen } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GTCertificateService } from './gtcertificate.service'
import { StateformsService } from '../stateforms.service'
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { GtcertificatePreviewComponent } from './gtcertificate-preview/gtcertificate-preview.component';
import { ProfileService } from "src/app/users/profile/service/profile.service";

import { isNull } from '@angular/compiler/src/output/output_ast';
import { SweetAlert } from "sweetalert/typings/core";
import { TrusteeForTheBond } from 'src/app/credit-rating/municipal-bond/models/bondIssureItemResponse';
import { promise } from 'protractor';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-gtcertificate',
  templateUrl: './gtcertificate.component.html',
  styleUrls: ['./gtcertificate.component.scss']
})
export class GTCertificateComponent implements OnInit, OnDestroy {
  myObserver = null;
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;

  modalRef: BsModalRef;
  filesToUpload: Array<File> = [];
  gtCertificate: FormGroup;
  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};

  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};
  fileName = '';
  fileName_millionTied = '';
  fileName_nonMillionTied = '';
  fileName_nonMillionUntied = '';
  //2nd installment of 2020-21
  fileName_millionTied_2021 = '';
  fileName_nonMillionTied_2021 = '';
  fileName_nonMillionUntied_2021 = '';
  //
  fileName_millionTied_2122 = '';
  fileName_nonMillionTied_2122 = '';
  fileName_nonMillionUntied_2122 = '';

  millionTiedProgress;
  nonMillionTiedProgress;
  nonMillionUntiedProgress;

  millionTiedProgress_2021;
  nonMillionTiedProgress_2021;
  nonMillionUntiedProgress_2021;


  millionTiedProgress_2122;
  nonMillionTiedProgress_2122;
  nonMillionUntiedProgress_2122;
  err = '';
  submitted = false;
  routerDiff = {};
  isDisabled = false;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;

  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;

  actionRes;
  stateActionA = '';
  stateActionB = '';
  stateActionC = '';

  stateActionA_2021 = '';
  stateActionB_2021 = '';
  stateActionC_2021 = '';

  stateActionA_2122 = '';
  stateActionB_2122 = '';
  stateActionC_2122 = '';


  rejectReasonA = null;
  rejectReasonB = null;
  rejectReasonC = null;


  rejectReasonA_2021 = null;
  rejectReasonB_2021 = null;
  rejectReasonC_2021 = null;


  rejectReasonA_2122 = null;
  rejectReasonB_2122 = null;
  rejectReasonC_2122 = null;

  actionData1 = {};
  actionData2 = {};
  actionData3 = {};


  btnStyleA = false;
  btnStyleR = false;
  btnStyleB = false;
  btnStyleRB = false;
  btnStyleC = false;
  btnStyleRC = false;
  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];
  change = ''
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _router: Router,
    private dataEntryService: DataEntryService,
    private gtcService: GTCertificateService,
    private dialog: MatDialog,
    public _stateformsService: StateformsService,
    private profileService: ProfileService,
  ) {
    this.initializeUserType();
    this.navigationCheck();


  }
  @ViewChild("template1") template1;
  @ViewChild("template") template;

  uploadedFiles;
  millionTiedFileUrl = '';
  nonMillionTiedFileUrl = '';
  nonMillionUntiedFileUrl = '';

  millionTiedFileUrl_2021 = '';
  nonMillionTiedFileUrl_2021 = '';
  nonMillionUntiedFileUrl_2021 = '';

  millionTiedFileUrl_2122 = '';
  nonMillionTiedFileUrl_2122 = '';
  nonMillionUntiedFileUrl_2122 = '';
  routerNavigate = null
  ngOnDestroy() {
    this.myObserver.unsubscribe();
  }
  navigationCheck() {

    this.myObserver = this._router.events.subscribe(async (event: Event) => {

      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          sessionStorage.setItem("changeInGTC", "false");
          this.change = "false"
          return;
        }
        const changeHappen = sessionStorage.getItem("changeInGTC")
        if (changeHappen === "true" && this.routerNavigate == null) {

          this.change = "true"
          console.log('inside router')
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
          this.routerNavigate = event

          this.openModal(this.template);
        } else {
          this.change = "false"
        }
      }



    });

  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  disableAllForms = false;
  isStateSubmittedForms = '';
  state_id;

  allStatus;
  getStatus;
  formDisable = false;
  formDisableA = false;
  formDisableB = false;
  formDisableC = false;

  formDisableA_2021 = false;
  formDisableB_2021 = false;
  formDisableC_2021 = false;

  formDisableA_2122 = false;
  formDisableB_2122 = false;
  formDisableC_2122 = false;
  actionFormDisableA = false;
  actionFormDisableB = false;
  actionFormDisableC = false;
  showQ1 = false
  showQ2 = false
  showQ3 = false
  btnStyleA_A = false
  btnStyleR_A = false
  btnStyleA_B = false
  btnStyleR_B = false
  btnStyleA_C = false
  btnStyleR_C = false
  actionTakenByRoleOnForm = null
  ngOnInit(): void {

    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"))
    this.actionFormDisableA = sessionStorage.getItem("disableAllActionForm") == 'true'
    this.actionFormDisableB = sessionStorage.getItem("disableAllActionForm") == 'true'
    this.actionFormDisableC = sessionStorage.getItem("disableAllActionForm") == 'true'
    this._stateformsService.disableAllFormsAfterMoHUAReview.subscribe((disable) => {
      this.actionFormDisableA = disable;
      this.actionFormDisableB = disable;
      this.actionFormDisableC = disable;
      if (disable) {
        sessionStorage.setItem("disableAllActionForm", "true")
      }
    })
    this.formDisableA = sessionStorage.getItem("disableAllForms") == 'true'
    this.formDisableB = sessionStorage.getItem("disableAllForms") == 'true'
    this.formDisableC = sessionStorage.getItem("disableAllForms") == 'true'
    this.state_id = sessionStorage.getItem("state_id")
    if (this.loggedInUserType == 'MoHUA') {
      this.formDisable = true;
    } else if (this.loggedInUserType == 'STATE') {
      if (this.allStatus['latestFinalResponse']['role'] == 'STATE') {
        if (this.allStatus['steps']['GTCertificate']['isSubmit'] &&
          (this.allStatus['steps']['GTCertificate']['status'] == 'PENDING'
            || this.allStatus['steps']['GTCertificate']['status'] == 'APPROVED')) {
          this.formDisable = true;
        }
      } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
        if (this.allStatus['steps']['GTCertificate']['status'] == 'APPROVED') {
          this.formDisable = true
        }
      }
    }

    this.gtcService.getCondition(this.state_id).subscribe(
      (res) => {
        let data = res['data']
        this.showQ1 = data['showQ1']
        this.showQ2 = data['showQ2']
        this.showQ3 = data['showQ3']
        console.log(this.showQ1, this.showQ2, this.showQ3)
      },
      (err) => {
        console.log(err.message)
      })

    // this.gtcService.getFiles(this.state_id)
    //   .subscribe((res) => {
    //     console.log('gtc responce', res);
    //     this.actionTakenByRoleOnForm = res['data']['actionTakenByRole']
    //     console.log('roleForm', this.actionTakenByRoleOnForm)
    //     sessionStorage.setItem("StateGTC", JSON.stringify(res));
    //     if (res['data']['million_tied']['pdfUrl'] != '' && res['data']['million_tied']['pdfName'] != '') {
    //       this.fileName_millionTied = res['data']['million_tied']['pdfName'];
    //       this.millionTiedFileUrl = res['data']['million_tied']['pdfUrl'];
    //     }
    //     if (res['data']['nonmillion_tied']['pdfUrl'] != '' && res['data']['nonmillion_tied']['pdfName'] != '') {
    //       this.fileName_nonMillionTied = res['data']['nonmillion_tied']['pdfName'];
    //       this.nonMillionTiedFileUrl = res['data']['nonmillion_tied']['pdfUrl'];
    //     }
    //     if (res['data']['nonmillion_untied']['pdfUrl'] != '' && res['data']['nonmillion_untied']['pdfName'] != '') {
    //       this.fileName_nonMillionUntied = res['data']['nonmillion_untied']['pdfName'];
    //       this.nonMillionUntiedFileUrl = res['data']['nonmillion_untied']['pdfUrl'];
    //     }

    //     console.log(this.fileName_nonMillionUntied, this.fileName_nonMillionTied, this.fileName_millionTied)

    //     const masterForm = JSON.parse(sessionStorage.getItem("allStatusStateForms"))
    //     console.log(masterForm)

    //     this.stateActionA = res['data']['million_tied']['status']
    //     if (this.stateActionA == "APPROVED") {
    //       this.btnStyleA_A = true;
    //     } else if (this.stateActionA == "REJECTED") {
    //       this.btnStyleR_A = true;
    //     }
    //     this.stateActionB = res['data']['nonmillion_tied']['status']
    //     if (this.stateActionB == "APPROVED") {
    //       this.btnStyleA_B = true;
    //     } else if (this.stateActionB == "REJECTED") {
    //       this.btnStyleR_B = true;
    //     }
    //     this.stateActionC = res['data']['nonmillion_untied']['status']
    //     if (this.stateActionC == "APPROVED") {
    //       this.btnStyleA_C = true;
    //     } else if (this.stateActionC == "REJECTED") {
    //       this.btnStyleR_C = true;
    //     }
    //     this.getStatus = res['data']['status']
    //     if (res['data']['million_tied']['rejectReason']) {

    //       this.rejectReasonA = res['data']['million_tied']['rejectReason']
    //     }
    //     if (res['data']['nonmillion_tied']['rejectReason']) {
    //       this.rejectReasonB = res['data']['nonmillion_tied']['rejectReason']
    //     }
    //     if (res['data']['nonmillion_untied']['rejectReason']) {
    //       this.rejectReasonC = res['data']['nonmillion_untied']['rejectReason']
    //     }
    //     if (this.loggedInUserType === "MoHUA") {
    //       if (this.allStatus['latestFinalResponse']['role'] == 'STATE' && this.allStatus['actionTakenByRole'] === 'STATE') {
    //         if (this.stateActionA != 'PENDING' && this.stateActionA) {
    //           this.actionFormDisableA = true
    //         }
    //         if (this.stateActionB != 'PENDING' && this.stateActionB) {
    //           this.actionFormDisableB = true
    //         }
    //         if (this.stateActionC != 'PENDING' && this.stateActionC) {
    //           this.actionFormDisableC = true
    //         }
    //       } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
    //         this.actionFormDisableA = true
    //         this.actionFormDisableB = true
    //         this.actionFormDisableC = true
    //       }
    //     }

    //     if (this.loggedInUserType == 'MoHUA') {
    //       this.formDisableA = true;
    //       this.formDisableB = true;
    //       this.formDisableC = true;

    //     } else if (this.loggedInUserType == 'STATE') {
    //       if (this.allStatus['latestFinalResponse']['role'] == 'STATE') {
    //         this.formDisableA = true;
    //         this.formDisableB = true;
    //         this.formDisableC = true;
    //       } else if (this.allStatus['latestFinalResponse']['role'] == 'MoHUA') {
    //         if (this.stateActionA == 'APPROVED') {
    //           this.formDisableA = true
    //         } if (this.stateActionB == 'APPROVED') {
    //           this.formDisableB = true
    //         } if (this.stateActionC == 'APPROVED') {
    //           this.formDisableC = true
    //         }
    //       }
    //     }





    //   },
    //     errMes => {
    //       // alert(errMes)
    //       console.log(errMes);
    //     }
    //   );

    sessionStorage.setItem("changeInGTC", "false")
    this.change = "false"
    this.submitted = false;
    this._stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe((disable) => {
      this.formDisableA = disable
      this.formDisableB = disable
      this.formDisableC = disable
      if (disable) {
        sessionStorage.setItem("disableAllForms", "true")
      }

    });


  }

  uploadButtonClicked(formName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true";

  }

  dialogRef
  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      // console.log('result', result)
      // if (result === undefined) {
      //   if (this.routerNavigate) {
      //     this.routerNavigate = null;
      //   }
      // }
    });
  }

  async stay() {

    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null
    }

  }

  proceedClicked = false
  inDraftMode = true;
  proceed() {
    this.dialog.closeAll();
    if (this.loggedInUserType == 'STATE') {
      this.proceedClicked = true
      if (this.submitted) {
        this.saveForm(this.template1, this.yearInput, this.instInput, '1');
        sessionStorage.setItem("changeInGTC", "false")
        this._router.navigate(["stateform/water-supply"]);
        return;
      } else if (this.routerNavigate) {
        this.saveForm(this.template1,  this.yearInput, this.instInput, '1');
        sessionStorage.setItem("changeInGTC", "false")
        this._router.navigate([this.routerNavigate.url]);
        return
      }

    } else if (this.loggedInUserType == 'MoHUA') {
      if (this.routerNavigate) {
        this.saveStateAction();
        sessionStorage.setItem("changeInGTC", "false")
        if (!this.flag) {
          this._router.navigate([this.routerNavigate.url]);
        }
        return;
      } else if (this.actionSubmit) {
        this.saveStateAction();
        sessionStorage.setItem("changeInGTC", "false")
        if (!this.flag) {
          this._router.navigate(["stateform/water-supply"]);
        }
        return;
      }
      this.saveStateAction()
      sessionStorage.setItem("changeInGTC", "false")
      if (!this.flag) {
        this._router.navigate(["stateform/review-ulb-form"]);
      }
      return;

    }




  }

  postsDataCall() {

    // if (this.uploadedFiles.million_tied.status == 'REJECTED' && !this.uploadedFiles.million_tied.rejectReason ||
    //   this.uploadedFiles.nonmillion_tied.status == 'REJECTED' && !this.uploadedFiles.nonmillion_tied.rejectReason ||
    //   this.uploadedFiles.nonmillion_untied.status == 'REJECTED' && !this.uploadedFiles.nonmillion_untied.rejectReason) {
    //   swal("Providing Reason for Rejection in Mandatory for Rejecting a form.")
    //   return
    // }
    this.ngOnDestroy()
    return new Promise((resolve, reject) => {

      this.gtcService.sendRequest(this.uploadedFiles)
        .subscribe(async (res) => {
          // const status = JSON.parse(sessionStorage.getItem("allStatus"));
          // status.isCompleted = res['data']["isCompleted"];
          // this._stateformsService.allStatus.next(status);
          sessionStorage.setItem("changeInGTC", "false")
          this.change = "false"
          const form = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
          form.steps.GTCertificate.isSubmit = !this.uploadedFiles.isDraft;
          form.steps.GTCertificate.status = 'PENDING';
          form.actionTakenByRole = 'STATE'
          console.log(form)
          this._stateformsService.allStatusStateForms.next(form);
          swal('Record Submitted Successfully!')
          if (this.routerNavigate) {
            this._router.navigate([this.routerNavigate.url]);
          } else {
            this._router.navigate(["stateform/water-supply"]);
          }
          resolve(res)
        },
          error => {
            this.err = error.message;
            console.log(this.err);
            swal(`Error- ${this.err}`)
            resolve(error)
          });
    })

  }
  body = {};

  saveStateAction() {

    let data = JSON.parse(sessionStorage.getItem("StateGTC"))
    console.log(data)
    this.body['design_year'] = data.data['design_year']
    this.body['isDraft'] = true;

    if (
      (this.actionData1['status'] == 'APPROVED' ||
        this.actionData1['status'] == 'REJECTED' ||
        this.stateActionA == 'APPROVED' ||
        this.stateActionA == 'REJECTED') &&
      (this.actionData2['status'] == 'APPROVED' ||
        this.actionData2['status'] == 'REJECTED' ||
        this.stateActionB == 'APPROVED' ||
        this.stateActionB == 'REJECTED') &&
      (this.actionData3['status'] == 'APPROVED' ||
        this.actionData3['status'] == 'REJECTED' ||
        this.stateActionC == 'APPROVED' ||
        this.stateActionC == 'REJECTED')) {
      this.body['isDraft'] = false;
    }
    console.log(this.body['isDraft'])
    this.body['state'] = this.state_id
    this.body['million_tied'] = data.data['million_tied']
    this.body['nonmillion_tied'] = data.data['nonmillion_tied']
    this.body['nonmillion_untied'] = data.data['nonmillion_untied']
    this.body['million_tied']['status'] = this.actionData1['status'] ?? this.stateActionA
    this.body['million_tied']['rejectReason'] = this.actionData1['rejectReason'] ?? this.rejectReasonA
    this.body['nonmillion_tied']['status'] = this.actionData2['status'] ?? this.stateActionB
    this.body['nonmillion_tied']['rejectReason'] = this.actionData2['rejectReason'] ?? this.rejectReasonB
    this.body['nonmillion_untied']['status'] = this.actionData3['status'] ?? this.stateActionC
    this.body['nonmillion_untied']['rejectReason'] = this.actionData3['rejectReason'] ?? this.rejectReasonC
    if (this.actionData1['status'] === 'REJECTED' || this.actionData2['status'] === 'REJECTED'
      || this.actionData3['status'] === 'REJECTED') {
      this.body['status'] = 'REJECTED'

    } else {
      this.body['status'] = 'APPROVED'
    }
    if (this.actionData1['status'] == 'REJECTED' && !this.actionData1['rejectReason'] ||
      this.actionData2['status'] == 'REJECTED' && !this.actionData2['rejectReason'] ||
      this.actionData3['status'] == 'REJECTED' && !this.actionData3['rejectReason']) {
      swal("Providing Reason for Rejection in Mandatory for Rejecting a form.")
      this.flag = 1;
      return
    }
    this.gtcService.postStateAction(this.body).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        sessionStorage.setItem("changeInGTC", "false")
        const status = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
        status.steps.GTCertificate.status = this.body['status'];
        status.steps.GTCertificate.isSubmit = !this.body['isDraft'];
        status.actionTakenByRole = 'MoHUA'
        this._stateformsService.allStatusStateForms.next(status);
        if (this.submitted) {
          this._router.navigate(["stateform/water-supply"]);
          return;
        } else {
          this._router.navigate([this.routerNavigate.url]);
          return;
        }

      },
      (error) => {
        swal("An error occured!");
        console.log(error.message);
      }
    );
  }

  alertClose() {
    this.stay();
  }
  actionSubmit = false;
  instInput;
  yearInput;
  saveForm(template1, year, inst, isDraft) {
     this.inDraftMode = isDraft == '1'
this.instInput = inst;
this.yearInput = year
    console.log(this.loggedInUserType)
    if (this.loggedInUserType === "STATE") {
      this.submitted = true;
let millionUrl, millionName, actionA, rrA, nonMilTiedUrl, nonMilTiedName, actionB, rrB, nonMilUntiedUrl, nonMilUntiedName, actionc, rrC ;

      if(inst == '2' && year =='2020-21'){
        millionUrl = this.millionTiedFileUrl_2021;
        millionName = this.fileName_millionTied_2021;
        actionA = this.stateActionA_2021;
        rrA = this.rejectReasonA_2021;
        nonMilTiedUrl = this.nonMillionTiedFileUrl_2021
         nonMilTiedName = this.fileName_nonMillionTied_2021
          actionB = this.stateActionB_2021
           rrB = this.rejectReasonB_2021
           nonMilUntiedUrl = this.nonMillionUntiedFileUrl_2021
           nonMilUntiedName = this.fileName_nonMillionUntied_2021
             actionc = this.stateActionC_2021
              rrC  = this.rejectReasonC_2021
      }else if(inst == '1' && year =='2021-22'){
        millionUrl = this.millionTiedFileUrl;
        millionName = this.fileName_millionTied;
        actionA = this.stateActionA;
        rrA = this.rejectReasonA;
        nonMilTiedUrl = this.nonMillionTiedFileUrl
         nonMilTiedName = this.fileName_nonMillionTied
          actionB = this.stateActionB
           rrB = this.rejectReasonB
           nonMilUntiedUrl = this.nonMillionUntiedFileUrl
           nonMilUntiedName = this.fileName_nonMillionUntied
             actionc = this.stateActionC
              rrC  = this.rejectReasonC
      }else if(inst == '2' && year =='2021-22'){
        millionUrl = this.millionTiedFileUrl_2122;
        millionName = this.fileName_millionTied_2122;
        actionA = this.stateActionA_2122;
        rrA = this.rejectReasonA_2122;
        nonMilTiedUrl = this.nonMillionTiedFileUrl_2122
         nonMilTiedName = this.fileName_nonMillionTied_2122
          actionB = this.stateActionB_2122
           rrB = this.rejectReasonB_2122
           nonMilUntiedUrl = this.nonMillionUntiedFileUrl_2122
           nonMilUntiedName = this.fileName_nonMillionUntied_2122
             actionc = this.stateActionC_2122
              rrC  = this.rejectReasonC_2122

      }
      this.uploadedFiles = {
        installment:inst,
        design_year: year =='2020-21' ? "606aadac4dff55e6c075c507" : "606aaf854dff55e6c075d219",
        million_tied:
        {
          pdfUrl: millionUrl,
          pdfName: millionName,
          status: actionA ? actionA : 'PENDING',
          rejectReason: rrA ? rrA: null
        },
        nonmillion_tied:
        {
          pdfUrl: nonMilTiedUrl,
          pdfName: nonMilTiedName,
          status: actionB ? actionB : 'PENDING',
          rejectReason: rrB ? rrB : null
        },
        nonmillion_untied:
        {
          pdfUrl: nonMilUntiedUrl,
          pdfName: nonMilUntiedName,
          status: actionc ? actionc : 'PENDING',
          rejectReason: rrC ? rrC : null
        },
        isDraft: this.inDraftMode
      };
      let changeHappen = sessionStorage.getItem("changeInGTC")
      if (changeHappen == "false") {
        this._router.navigate(["stateform/water-supply"]);
        return;
      } else {

        if (
          this.uploadedFiles.million_tied.pdfUrl != '' &&
          this.uploadedFiles.nonmillion_tied.pdfUrl != '' &&
          this.uploadedFiles.nonmillion_untied.pdfUrl != ''
        ) {
      

          this.postsDataCall();

        } else if (this.routerNavigate || this.proceedClicked) {
          sessionStorage.setItem("changeInGTC", "false")
          this.postsDataCall();
        }
        else {
          this.openModal(template1);
        }
      }
    } else if (this.loggedInUserType === "MoHUA") {
      this.actionSubmit = true
      let changeHappen = sessionStorage.getItem("changeInGTC")
      if (changeHappen == "false") {
        this._router.navigate(["stateform/water-supply"]);
        return;
      } else {
        if (
          (this.actionData1['status'] == 'APPROVED' ||
            this.actionData1['status'] == 'REJECTED' ||
            this.stateActionA == 'APPROVED' ||
            this.stateActionA == 'REJECTED') &&
          (this.actionData2['status'] == 'APPROVED' ||
            this.actionData2['status'] == 'REJECTED' ||
            this.stateActionB == 'APPROVED' ||
            this.stateActionB == 'REJECTED') &&
          (this.actionData3['status'] == 'APPROVED' ||
            this.actionData3['status'] == 'REJECTED' ||
            this.stateActionC == 'APPROVED' ||
            this.stateActionC == 'REJECTED')) {
          this.saveStateAction()
        } else {
          this.openModal(template1)
        }

        // this.saveStateAction()
      }

    }
  }

  clearFiles(fileName) {
    sessionStorage.setItem("changeInGTC", "true")
    this.change = "true"
    if (fileName == 'fileName_millionTied') {
      this.millionTiedProgress = '';
      this.fileName_millionTied = '';
      this.millionTiedFileUrl = ''
    }else if(fileName == 'fileName_millionTied_2021'){
      this.millionTiedProgress_2021 = '';
      this.fileName_millionTied_2021 = '';
      this.millionTiedFileUrl_2021 = ''
    }else if(fileName == 'fileName_millionTied_2122'){
      this.millionTiedProgress_2122 = '';
      this.fileName_millionTied_2122 = '';
      this.millionTiedFileUrl_2122 = ''
    }
    if (fileName == 'fileName_nonMillionTied') {
      this.nonMillionTiedProgress = '';
      this.fileName_nonMillionTied = '';
      this.nonMillionTiedFileUrl = ''
    }else if(fileName == 'fileName_nonMillionTied_2021'){
      this.nonMillionTiedProgress_2021 = '';
      this.fileName_nonMillionTied_2021 = '';
      this.nonMillionTiedFileUrl_2021 = ''
    }else if(fileName == 'fileName_nonMillionTied_2122'){
      this.nonMillionTiedProgress_2122 = '';
      this.fileName_nonMillionTied_2122 = '';
      this.nonMillionTiedFileUrl_2122 = ''
    }
    if (fileName == 'fileName_nonMillionUntied') {
      this.nonMillionUntiedProgress = '';
      this.fileName_nonMillionUntied = '';
      this.nonMillionUntiedFileUrl = ''
    }else if(fileName == 'fileName_nonMillionUntied_2021'){
      this.nonMillionUntiedProgress_2021 = '';
      this.fileName_nonMillionUntied_2021 = '';
      this.nonMillionUntiedFileUrl_2021 = ''
    }else if(fileName == 'fileName_nonMillionUntied_2122'){
      this.nonMillionUntiedProgress_2122 = '';
      this.fileName_nonMillionUntied_2122 = '';
      this.nonMillionUntiedFileUrl_2122 = ''
    }
    this.checkDiff();
  }

  fileChangeEvent(event, progessType, fileName) {
    console.log(event, fileName)
    this.submitted = false;
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    this.upload(progessType, fileName);
  }

  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    this.fileUploadTracker = {};
  }

  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (fileExtension === "pdf") {
        validFiles.push(file);
      } else {
        swal("Only PDF File can be Uploaded.")
        return;
      }
    }
    return validFiles;
  }
apiData={}
  async upload(progessType, fileName) {
    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    this[fileName] = files[0].name;
    console.log(files[0].name)
    let fileExtension = files[0].name.split('.').pop();
    console.log(fileExtension)
    this[progessType] = 10;
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i, progessType, fileName);
    }


  }
  flag = 0
  uploadFile(file: File, fileIndex: number, progessType, fileName) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          this[progessType] = Math.floor(Math.random() * 90) + 10;
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(
            file,
            s3URL,
            fileAlias,
            fileIndex,
            progessType
          );
          resolve("success")
          console.log('file url', fileAlias)
          if (fileName === 'fileName_millionTied') {
            this.stateActionA = 'PENDING';
            this.rejectReasonA = null
          } else if (fileName === 'fileName_nonMillionTied') {
            this.stateActionB = 'PENDING';
            this.rejectReasonB = null
          } else if (fileName === 'fileName_nonMillionUntied') {
            this.stateActionC = 'PENDING';
            this.rejectReasonC = null
          } else if (fileName === 'fileName_millionTied_2021') {
            this.stateActionA_2021 = 'PENDING';
            this.rejectReasonA_2021 = null
          } else if (fileName === 'fileName_nonMillionTied_2021') {
            this.stateActionB_2021 = 'PENDING';
            this.rejectReasonB_2021 = null
          } else if (fileName === 'fileName_nonMillionUntied_2021') {
            this.stateActionC_2021 = 'PENDING';
            this.rejectReasonC_2021 = null
          } else if (fileName === 'fileName_millionTied_2122') {
            this.stateActionA_2122 = 'PENDING';
            this.rejectReasonA_2122 = null
          } else if (fileName === 'fileName_nonMillionTied_2122') {
            this.stateActionB_2122 = 'PENDING';
            this.rejectReasonB_2122 = null
          } else if (fileName === 'fileName_nonMillionUntied_2122') {
            this.stateActionC_2122 = 'PENDING';
            this.rejectReasonC_2122 = null
          }
        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
          }
        }
      );
    })
  }
 callGetAPI(year,inst){
   return new Promise((resolve, reject) => {
    let yearVal
    if(year == '2021-22'){
  yearVal = '606aaf854dff55e6c075d219'
    }else{
      yearVal   ='606aadac4dff55e6c075c507'
    }
  this.gtcService.getFiles(this.state_id, yearVal, inst).subscribe((res)=>{
  this.apiData = res['data'][0];
  if(year =='2021-22' && inst =='1'){
  
    if (res['data'][0]['million_tied']['pdfUrl'] != '' && res['data'][0]['million_tied']['pdfName'] != '') {
      this.fileName_millionTied = res['data'][0]['million_tied']['pdfName'];
      this.millionTiedFileUrl = res['data'][0]['million_tied']['pdfUrl'];
      this.formDisableA = !res['data'][0]['isDraft']
    }
    if (res['data'][0]['nonmillion_tied']['pdfUrl'] != '' && res['data'][0]['nonmillion_tied']['pdfName'] != '') {
      this.fileName_nonMillionTied = res['data'][0]['nonmillion_tied']['pdfName'];
      this.nonMillionTiedFileUrl = res['data'][0]['nonmillion_tied']['pdfUrl'];
      this.formDisableB = !res['data'][0]['isDraft']
  
    }
    if (res['data'][0]['nonmillion_untied']['pdfUrl'] != '' && res['data'][0]['nonmillion_untied']['pdfName'] != '') {
      this.fileName_nonMillionUntied = res['data'][0]['nonmillion_untied']['pdfName'];
      this.nonMillionUntiedFileUrl = res['data'][0]['nonmillion_untied']['pdfUrl'];
      this.formDisableC = !res['data'][0]['isDraft']
    }
  }else if(year =='2021-22' && inst =='2'){
    if (res['data'][0]['million_tied']['pdfUrl'] != '' && res['data'][0]['million_tied']['pdfName'] != '') {
      this.fileName_millionTied_2122 = res['data'][0]['million_tied']['pdfName'];
      this.millionTiedFileUrl_2122 = res['data'][0]['million_tied']['pdfUrl'];
      this.formDisableA_2122 = !res['data'][0]['isDraft']
    }
    if (res['data'][0]['nonmillion_tied']['pdfUrl'] != '' && res['data'][0]['nonmillion_tied']['pdfName'] != '') {
      this.fileName_nonMillionTied_2122 = res['data'][0]['nonmillion_tied']['pdfName'];
      this.nonMillionTiedFileUrl_2122 = res['data'][0]['nonmillion_tied']['pdfUrl'];
      this.formDisableB_2122 = !res['data'][0]['isDraft']
    }
    if (res['data'][0]['nonmillion_untied']['pdfUrl'] != '' && res['data'][0]['nonmillion_untied']['pdfName'] != '') {
      this.fileName_nonMillionUntied_2122 = res['data'][0]['nonmillion_untied']['pdfName'];
      this.nonMillionUntiedFileUrl_2122 = res['data'][0]['nonmillion_untied']['pdfUrl'];  
      this.formDisableC_2122 = !res['data'][0]['isDraft']
    }
  }else if(year =='2020-21' && inst =='2'){
    if (res['data'][0]['million_tied']['pdfUrl'] != '' && res['data'][0]['million_tied']['pdfName'] != '') {
      this.fileName_millionTied_2021 = res['data'][0]['million_tied']['pdfName'];
      this.millionTiedFileUrl_2021 = res['data'][0]['million_tied']['pdfUrl'];
      this.formDisableA_2021 = !res['data'][0]['isDraft']
    }
    if (res['data'][0]['nonmillion_tied']['pdfUrl'] != '' && res['data'][0]['nonmillion_tied']['pdfName'] != '') {
      this.fileName_nonMillionTied_2021 = res['data'][0]['nonmillion_tied']['pdfName'];
      this.nonMillionTiedFileUrl_2021 = res['data'][0]['nonmillion_tied']['pdfUrl'];
      this.formDisableB_2021 = !res['data'][0]['isDraft']
    }
    if (res['data'][0]['nonmillion_untied']['pdfUrl'] != '' && res['data'][0]['nonmillion_untied']['pdfName'] != '') {
      this.fileName_nonMillionUntied_2021 = res['data'][0]['nonmillion_untied']['pdfName'];
      this.nonMillionUntiedFileUrl_2021 = res['data'][0]['nonmillion_untied']['pdfUrl'];
      this.formDisableC_2021 = !res['data'][0]['isDraft']
    }
  }
    resolve(res['data'][0])
  })
   })
  
}
  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    fileIndex: number,
    progressType: string = ''
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
      // .pipe(
      //   map((response: HttpEvent<any>) =>
      //     this.logUploadProgess(response, file, fileAlias, fileIndex)
      //   )
      // )
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[progressType] = 100;
            if (progressType == 'millionTiedProgress') {
              this.millionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress') {
              this.nonMillionTiedFileUrl = fileAlias;
            } else if (progressType == 'nonMillionUntiedProgress') {
              this.nonMillionUntiedFileUrl = fileAlias;
            } else if (progressType == 'millionTiedProgress_2021') {
              this.millionTiedFileUrl_2021 = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress_2021') {
              this.nonMillionTiedFileUrl_2021 = fileAlias;
            } else if (progressType == 'nonMillionUntiedProgress_2021') {
              this.nonMillionUntiedFileUrl_2021 = fileAlias;
            }else if (progressType == 'millionTiedProgress_2122') {
              this.millionTiedFileUrl_2122 = fileAlias;
            } else if (progressType == 'nonMillionTiedProgress_2122') {
              this.nonMillionTiedFileUrl_2122 = fileAlias;
            } else if (progressType == 'nonMillionUntiedProgress_2122') {
              this.nonMillionUntiedFileUrl_2122 = fileAlias;
            }
            // console.log('Progress -', progressType, this.millionTiedFileUrl, this.nonMillionTiedFileUrl, this.nonMillionUntiedFileUrl)
            this.checkDiff();
          }
        },
        (err) => {
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }

  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing",
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map((response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            observableThrowError("throw any error here");
          }
          return response;
        }),
        retryWhen((err) => err.pipe(delay(2000)))
      )
      .subscribe(
        (response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        (err) => {
          if (!this.fileProcessingTracker[_fileIndex]) {
            this.fileProcessingTracker[fileId].status = "FAILED";
            this.fileProcessingTracker[fileId].message =
              "Server failed to process data.";
          }
        }
      );
  }
  checkDiff() {
    let preData = {
      million_tied:
      {
        pdfUrl: this.millionTiedFileUrl,
        pdfName: this.fileName_millionTied
      },
      nonmillion_tied:
      {
        pdfUrl: this.nonMillionTiedFileUrl,
        pdfName: this.fileName_nonMillionTied
      },
      nonmillion_untied:
      {
        pdfUrl: this.nonMillionUntiedFileUrl,
        pdfName: this.fileName_nonMillionUntied
      },
      isDraft: (this.millionTiedFileUrl != '' && this.nonMillionTiedFileUrl != '' && this.nonMillionUntiedFileUrl != '') ? false : true
    };

    let allFormData = JSON.parse(sessionStorage.getItem("allFormsPreData"))
    console.log('in grant all..', allFormData, preData);

    if (allFormData) {
      allFormData[0].stategtcertificates[0] = preData
      this._stateformsService.allFormsPreData.next(allFormData)
    }
  }
 async onPreview() {
    let PreviewFiles = {
      second_2021:{},
      first_2122:{},
      second_2122:{},
    };
 
PreviewFiles.second_2021 = await this.callGetAPI('2020-21','2');

// this.callGetAPI('2021-22','1');
PreviewFiles.first_2122 = await this.callGetAPI('2021-22','1');

// this.callGetAPI('2021-22','2');
PreviewFiles.second_2122 = await this.callGetAPI('2021-22','2');
    
  
    const dialogRef = this.dialog.open(GtcertificatePreviewComponent,
      {
        data: PreviewFiles,
        maxHeight: "100vh",
        width: '85vw',
        panelClass: 'no-padding-dialog',
        autoFocus:false
      });
    console.log('dialog ref')
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  mohuaAction = false
  checkStatusAp(qusCheck) {
    this.mohuaAction = true
    sessionStorage.setItem("changeInGTC", "true")
    if (qusCheck == 'millionTied') {

      this.actionData1 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_A = true;
      this.btnStyleR_A = false;
    }
    if (qusCheck == 'nonMillionTied') {
      this.actionData2['rejectReason'] = null;
      this.actionData2 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_B = true;
      this.btnStyleR_B = false;
    }
    if (qusCheck == 'nonMillionUntied') {
      this.actionData3['rejectReason'] = null;
      this.actionData3 = {
        status: "APPROVED",
        rejectReason: null
      }
      this.btnStyleA_C = true;
      this.btnStyleR_C = false;
    }



    console.log('stateAction', this.stateActionA)
    //  this.actionValues.emit(this.actionData);
  }
  checkStatus(qusCheck) {
    this.mohuaAction = true
    sessionStorage.setItem("changeInGTC", "true")
    if (qusCheck == 'millionTied') {
      this.actionData1 = {
        status: this.stateActionA,
        rejectReason: this.rejectReasonA
      }
      this.btnStyleA_A = false;
      this.btnStyleR_A = true;
    }
    if (qusCheck == 'nonMillionTied') {
      this.actionData2 = {
        status: this.stateActionB,
        rejectReason: this.rejectReasonB
      }
      this.btnStyleA_B = false;
      this.btnStyleR_B = true;
    }
    if (qusCheck == 'nonMillionUntied') {
      this.actionData3 = {
        status: this.stateActionC,
        rejectReason: this.rejectReasonC
      }
      this.btnStyleA_C = false;
      this.btnStyleR_C = true;
    }
    console.log('stateAction', this.stateActionA)
    //  this.actionValues.emit(this.actionData);
  }

}

function observableThrowError(arg0: string) {
  throw new Error('Function not implemented.');
}

//pending - green and red ticks (will be done after master form api made)
//2 times dialog box on routing alert
