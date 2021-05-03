import { Component, OnInit,TemplateRef  } from '@angular/core';
import { LinkPFMSAccount } from './link-pfms.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
@Component({
  selector: 'app-link-pfms',
  templateUrl: './link-pfms.component.html',
  styleUrls: ['./link-pfms.component.scss']
})
export class LinkPFMSComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private LinkPFMSAccount: LinkPFMSAccount, private modalService: BsModalService,private _router: Router,) {

  }

  receivedData = {}
  account = '';
  linked = '';
  fd ={};
  ngOnInit() {
    this.LinkPFMSAccount.getData('606aaf854dff55e6c075d219')
      .subscribe((res) => {
        console.log(res);
        this.receivedData = res;
        this.account = (res['response']['account'])
        this.linked = (res['response']['linked'])
        console.log(this.account, this.linked)
      },
        error => {
          this.errMessage = error.error;
          console.log(this.errMessage);
        });

    // this.account = this.receivedData['response']['account'];
    // this.linked = this.receivedData['response']['linked'];

  }
  tabHeadings = [
    'Provisional Accounts for 2020-21',
    'Audited Accounts for 2019-20'
  ]
  questions = [
    '(A) Does the ULB have separate Account for 15th Finance Commission Grants?',
    '(B) Has the ULB Linked the account with PFMS?',

  ]
  showQuestion2 = false;
  design_year = '606aaf854dff55e6c075d219'
  showQuestion1 = true;
  isClicked = false;

  onClickYes() {
    this.showQuestion2 = true
    this.account = 'yes';
  }
  onClickNo() {
    this.showQuestion2 = false;
    this.isClicked = false;
    this.account = 'no';
    this.linked = 'no';
  }
  onClickYES() {
    this.isClicked = true
    this.linked = 'yes';
  }
  onClickNO() {
    this.isClicked = false
    this.linked = 'no'
  }


  errMessage = '';
  postData(){
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
      "isDraft": true
    }
    if(this.account != '' && this.linked != ''){
      this.postData();
    }else if(this.account != '' || this.linked != ''){
    this.openModal(template);
    }else{
      alert("Please select your answer");
    }

    console.log('clicked')

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});

  }

  stay(){
    this.modalRef.hide();

  }

  proceed(uploadedFiles) {

    this.postData();
    this.modalRef.hide();
   // return this._router.navigate(["overview"]);
  }
  alertClose(){
    this.modalRef.hide();
  }


}
