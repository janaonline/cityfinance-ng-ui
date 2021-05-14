import { Component, OnInit, TemplateRef } from '@angular/core';
import { LinkPFMSAccount } from './link-pfms.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { USER_TYPE } from 'src/app/models/user/userType';
@Component({
  selector: 'app-link-pfms',
  templateUrl: './link-pfms.component.html',
  styleUrls: ['./link-pfms.component.scss']
})
export class LinkPFMSComponent extends BaseComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private LinkPFMSAccount: LinkPFMSAccount,
    private modalService: BsModalService, private _router: Router, private _profileService: ProfileService) {
    super();
    switch (this.loggedInUserType) {
      // case USER_TYPE.ULB:
      case USER_TYPE.STATE:
      case USER_TYPE.PARTNER:
      case USER_TYPE.MoHUA:
      case USER_TYPE.ADMIN:
      //  this._router.navigate(["/fc-home-page"]);
      //  break;

    }
  }

  receivedData = {}
  account = '';
  linked = '';

  ngOnInit() {
    this.onLoad();
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
    'Provisional Accounts for 2020-21',
    'Audited Accounts for 2019-20'
  ]
  questions = [
    '(A) Does the ULB have separate Account for 15th Finance Commission Grants?',
    '(B) Has the ULB Linked the account with PFMS?',

  ]

  showQuestion2 = this.account == 'yes' ? true : false;
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
    } else if (this.account != '' || this.linked != '') {
      this.openModal(template);
    } else {
      alert("Please select your answer");
    }

    console.log('clicked')

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });

  }

  stay() {
    this.modalRef.hide();

  }

  onLoad() {
    this.LinkPFMSAccount.getData(this.Years["2021-22"])
      .subscribe((res) => {
        console.log(res);
        this.receivedData = res;
        this.account = (res['response']['account']);
        this.linked = (res['response']['linked']);

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

    this.postData();
    this.modalRef.hide();
    // return this._router.navigate(["overview"]);
  }
  alertClose() {
    this.modalRef.hide();
  }


}
