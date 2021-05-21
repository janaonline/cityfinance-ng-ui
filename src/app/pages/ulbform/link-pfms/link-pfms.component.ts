import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LinkPFMSAccount } from "./link-pfms.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router, NavigationStart, Event } from "@angular/router";

import { ProfileService } from "src/app/users/profile/service/profile.service";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { USER_TYPE } from "src/app/models/user/userType";
import { MatDialog } from "@angular/material/dialog";
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
  modalRef: BsModalRef;
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
      if (event instanceof NavigationStart) {
        const change = sessionStorage.getItem("changeInPFMSAccount")
        if (change === "true" && this.routerNavigate === null) {
          this.routerNavigate = event
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, { skipLocationChange: true });
          this.openModal(this.template);
        }
      }
    });
  }

  @ViewChild("template") template;

  receivedData = {}
  account = '';
  linked = '';
  routerNavigate = null
  isDisabled = false;
  ngOnInit() {
    let ulb_id = sessionStorage.getItem('ulb_id');
    if (ulb_id != null) {
      this.isDisabled = true;
    }
    this.onLoad(ulb_id);

    sessionStorage.setItem("changeInPFMSAccount", "false");
  }
  Years = JSON.parse(localStorage.getItem("Years"));
  fd = {
    "design_year": this.Years["2021-22"],
    "account": this.account,
    "linked": this.linked,
    "isDraft": false
  };
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

  onClickYes() {
    this.showQuestion2 = true
    this.account = 'yes';
    this.checkDiff();
  }
  onClickNo() {
    this.showQuestion2 = false;
    this.isClicked = false;
    this.account = 'no';
    this.linked = '';
    this.checkDiff();
  }
  onClickYES() {
    this.isClicked = true
    this.linked = 'yes';
    this.checkDiff();
  }
  onClickNO() {
    this.isClicked = false
    this.linked = 'no'
    this.checkDiff();
  }


  errMessage = '';
  postData() {
    this.LinkPFMSAccount.postData(this.fd)
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
  saveAndNext(template) {
    this.fd = {
      "design_year": this.design_year,
      "account": this.account,
      "linked": this.linked,
      "isDraft": false
    }
    if (this.account != '' && this.linked != '') {
      this.postData();
      return this._router.navigate(["ulbform/grant-tra-certi"]);
    }else if(this.account != '' || this.linked != ''){
    this.openModal(template);
    }else{
      swal("Please select your answer");
    }

    console.log("clicked");
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }

  stay() {
    if (this.routerNavigate) {
      this.routerNavigate = null
    }
    this.modalRef.hide();

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


  checkDiff() {
    let pfmsAccounts = JSON.parse(sessionStorage.getItem("pfmsAccounts"));
    const tempResponse = JSON.stringify(this.fd);
    const tempResponseLast = JSON.stringify(pfmsAccounts);
    if (tempResponse != tempResponseLast) {
      sessionStorage.setItem("changeInPFMSAccount", "true");
      pfmsAccounts = JSON.parse(tempResponse);
      sessionStorage.setItem(
        "annualAccounts",
        JSON.stringify(pfmsAccounts)
      );
    } else {
      sessionStorage.setItem("changeInPFMSAccount", "false");
    }

  }

  proceed(uploadedFiles) {
    this.modalRef.hide();
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return
    }
    this.postData();


    return this._router.navigate(["ulbform/grant-tra-certi"]);
  }
  alertClose() {
    this.stay();
  }
  onPreview() {
    let preData = {
      'account': this.account,
      'linked': this.linked
    }
    console.log('preData', preData)
    const dialogRef = this.dialog.open(PfmsPreviewComponent,
      {
        data: preData,
        maxHeight: "95vh",
        height: "fit-content",
        width: '85vw',
        panelClass: 'no-padding-dialog'
      });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;

    });
  }
}
