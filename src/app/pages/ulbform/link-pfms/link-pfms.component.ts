import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LinkPFMSAccount } from "./link-pfms.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Router, NavigationStart, Event } from "@angular/router";

import { ProfileService } from "src/app/users/profile/service/profile.service";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { USER_TYPE } from "src/app/models/user/userType";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PfmsPreviewComponent } from "./pfms-preview/pfms-preview.component";
import { UlbformService } from "../ulbform.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");


@Component({
  selector: "app-link-pfms",
  templateUrl: "./link-pfms.component.html",
  styleUrls: ["./link-pfms.component.scss"],
})
export class LinkPFMSComponent extends BaseComponent implements OnInit {
  dialogRef;
  constructor(
    private LinkPFMSAccount: LinkPFMSAccount,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private _router: Router,
    private _profileService: ProfileService,
    private _ulbformService: UlbformService
  ) {
    super();
    // switch (this.loggedInUserType) {
    //   // case USER_TYPE.ULB:
    //   case USER_TYPE.STATE:
    //   case USER_TYPE.PARTNER:
    //   case USER_TYPE.MoHUA:
    //   case USER_TYPE.ADMIN:
    //  this._router.navigate(["/fc-home-page"]);
    //  break;

    this._router.events.subscribe(async (event: Event) => {
      if (!this.saveClicked && !this.backClicked) {
        if (event instanceof NavigationStart) {

          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInPFMSAccount", "false");
            return;
          }
          const change = sessionStorage.getItem("changeInPFMSAccount")
          if (change === "true" && this.routerNavigate === null) {
            this.routerNavigate = event
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
            this.openModal(this.template);
          }
        }
      }
    });
  }

  @ViewChild("template") template;
  @ViewChild("template1") template1;
  fromPreview = null;
  receivedData = {}
  saveClicked = false;
  previewClicked = false;
  account = '';
  linked = '';
  routerNavigate = null
  isDisabled = false;
  backClicked = false;


  ngOnInit() {
    sessionStorage.setItem("changeInPFMSAccount", "false");
    this.change = false;
    this.backClicked = false;
    this.saveClicked = false;
    let ulb_id = sessionStorage.getItem('ulb_id');
    if (ulb_id != null) {
      this.isDisabled = true;
    }
    this.onLoad(ulb_id);


  }
  Years = JSON.parse(localStorage.getItem("Years"));

  tabHeadings = [
    "Provisional Accounts for 2020-21",
    "Audited Accounts for 2019-20",
  ];
  questions = [
    '(A) Does the ULB have separate Account for 15th Finance Commission Grants?',
    '(B) Has the ULB Linked the account with PFMS?',

  ]

  showQuestion2 = false;
  // this.account === 'yes' ? true : false;
  design_year = this.Years["2021-22"]
  showQuestion1 = true;
  isClicked = false;
  prevState = '';



  changeHappen = 'false';

  clickedBack(template) {
    this.backClicked = true;
    let changeHappen = sessionStorage.getItem("changeInPFMSAccount")
    if (changeHappen === "true") {
      this.openModal(template)
    } else {
      return this._router.navigate(["ulbform/overview"]);
    }
  }

  saveAndNextValue(template1) {
    this.saveClicked = true;
    this.saveAndNext(template1);
  }

  onClickYes() {
    this.showQuestion2 = true
    this.account = 'yes';

    this.linked = '';
    this.checkDiff();
  }
  onClickNo() {

    this.showQuestion2 = false;
    this.isClicked = false;
    this.account = 'no';

    this.linked = 'no';
    // if (!this.change)
    this.checkDiff();
  }
  onClickYES() {

    this.isClicked = true
    this.linked = 'yes';
    // if (!this.change)
    this.checkDiff();
  }
  onClickNO() {

    this.isClicked = false
    this.linked = 'no'
    // if (!this.change)
    this.checkDiff();
  }

  fd = {
    "design_year": this.Years["2021-22"],
    "account": this.account,
    "linked": this.linked,
    "isDraft": false
  };
  errMessage = '';
  val
  postData() {

    if (this.account != '' && this.linked != '') {
      this.val = false;
    } else {
      this.val = true;
    }

    let data = {
      "design_year": this.Years["2021-22"],
      "account": this.account,
      "linked": this.linked,
      "isDraft": this.val
    };
    console.log((data));
    this.LinkPFMSAccount.postData(data)
      .subscribe((res) => {
        console.log(res);
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.pfmsAccount.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);
        swal("Record submitted successfully!")
      },
        error => {
          this.errMessage = error.message;
          console.log(error, this.errMessage);
        });
  }
  saveAndNext(template1) {
    this.fd = {
      "design_year": this.design_year,
      "account": this.account,
      "linked": this.linked,
      "isDraft": false
    }
    this.changeHappen = sessionStorage.getItem("changeInPFMSAccount")
    if (this.changeHappen === "false") {
      return this._router.navigate(["ulbform/grant-tra-certi"]);
    }
    console.log('account and linked values', this.account, this.linked)
    if (!this.change) {
      return this._router.navigate(["ulbform/grant-tra-certi"]);
    }
    if (this.account != '' && this.linked != '' && this.change == true) {
      this.postData();
      return this._router.navigate(["ulbform/grant-tra-certi"]);
    } else if (((this.account != '' && this.linked === '') || ((this.account === '' && this.linked != ''))) && this.change == true) {
      this.openModal(template1);
    } else {
      swal("Please select your answer");
    }

    console.log("clicked");
  }
  openModal(template: TemplateRef<any>, fromPreview = null) {
    this.fromPreview = fromPreview;

    if (fromPreview) {
      this.onPreview();
    }
    else {
      const dialogConfig = new MatDialogConfig();
      this.dialogRef = this.dialog.open(template, dialogConfig);
      this.dialogRef.afterClosed().subscribe((result) => {
        console.log('result', result)
        if (result === undefined) {
          if (this.routerNavigate) {
            this.routerNavigate = null;
          }
        }
      });
    }

  }

  async stay() {
    if (this.routerNavigate) {
      this.routerNavigate = null
    }
    await this.dialogRef.close(true);
  }

  onLoad(ulb_id) {
    this.LinkPFMSAccount.getData(this.Years["2021-22"], ulb_id)
      .subscribe((res) => {
        console.log(res);
        this.receivedData = res;
        this.account = (res['response']['account']);
        this.linked = (res['response']['linked']);
        if (this.account === 'yes') {
          this.showQuestion2 = true;
        }
        if (this.account === 'no') {
          this.linked = 'no';
        }
        sessionStorage.setItem(
          "pfmsAccounts",
          JSON.stringify(res)
        );
      },
        error => {
          this.errMessage = error.error;
          console.log(this.errMessage);
        });
  }

  pageData = {};
  gotData = {};
  change = false;
  checkDiff() {
    let pfmsAccounts = JSON.parse(sessionStorage.getItem("pfmsAccounts"));
    if (!pfmsAccounts) {
      sessionStorage.setItem("changeInPFMSAccount", "true");
      this.change = true;
      return;
    }
    console.log(this.fd);
    console.log(JSON.parse(sessionStorage.getItem("pfmsAccounts")))
    this.pageData = {
      "account": this.fd.account,
      "linked": this.fd.linked
    };
    this.gotData = {
      "account": pfmsAccounts.response.account,
      "linked": pfmsAccounts.response.linked
    }


    // const tempResponse = JSON.stringify(this.fd);
    // const tempResponseLast = JSON.stringify(pfmsAccounts);
    if (this.pageData != this.gotData) {
      sessionStorage.setItem("changeInPFMSAccount", "true");
      this.change = true;
      pfmsAccounts = (this.pageData);
      // sessionStorage.setItem(
      //   "pfmsAccounts",
      //   JSON.stringify(pfmsAccounts)
      // );
    } else {
      sessionStorage.setItem("changeInPFMSAccount", "false");
      this.change = false;
    }

  }

  async proceed(uploadedFiles) {
    await this.dialogRef.close(true);
    if (this.backClicked) {
      await this.postData();
      sessionStorage.setItem("changeInPFMSAccount", "false");
      this._router.navigate(["ulbform/overview"]);
      return
    }
    if (this.routerNavigate) {
      await this.postData();
      sessionStorage.setItem("changeInPFMSAccount", "false");
      this._router.navigate([this.routerNavigate.url]);
      return
    }
    if (this.fromPreview) {
      this.onPreview();
      return;
    }
    this.postData();
    sessionStorage.setItem("changeInPFMSAccount", "false");
    return this._router.navigate(["ulbform/grant-tra-certi"]);
  }
  alertClose() {
    this.stay();
  }

  value
  onPreview() {

    if (this.account != '' && this.linked != '') {
      this.value = false;
    } else {
      this.value = true;
    }
    let preData = {
      'account': this.account,
      'linked': this.linked,
      "design_year": this.design_year,
      "isDraft": this.value
    }
    console.log('preData', preData)
    const dialogRef = this.dialog.open(PfmsPreviewComponent,
      {
        data: preData,
        maxHeight: "95%",
        width: '85vw',
        panelClass: 'no-padding-dialog'
      });
    console.log('dialog ref')
    // this.hidden = false;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
}
