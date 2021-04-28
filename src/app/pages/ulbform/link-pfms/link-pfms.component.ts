import { Component, OnInit } from '@angular/core';
import { LinkPFMSAccount } from './link-pfms.service'
@Component({
  selector: 'app-link-pfms',
  templateUrl: './link-pfms.component.html',
  styleUrls: ['./link-pfms.component.scss']
})
export class LinkPFMSComponent implements OnInit {

  constructor(private LinkPFMSAccount: LinkPFMSAccount) {

  }

  receivedData = {}
  account = 'no';
  linked = 'no';
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
  design_year = '2021-22'
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

  saveAndNext() {
    let fd = {
      "design_year": this.design_year,
      "account": this.account,
      "linked": this.linked,
    }
    console.log('clicked')
    this.LinkPFMSAccount.postData(fd)
      .subscribe((res) => {
        console.log(res);

      },
        error => {
          this.errMessage = error.message;
          console.log(error, this.errMessage);
        });
  }
}
