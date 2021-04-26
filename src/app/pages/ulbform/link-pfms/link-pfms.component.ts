import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-pfms',
  templateUrl: './link-pfms.component.html',
  styleUrls: ['./link-pfms.component.scss']
})
export class LinkPFMSComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  tabHeadings = [
    'Provisional Accounts for 2020-21',
    'Audited Accounts for 2019-20'
  ]
  questions = [
    '(A) Do you wish to submit Provisional Accounts for 2020-21?',
    '(B) Do you wish to submit financials in Standardized format for 2020-21?',
    '(A) Do you wish to submit Provisional Accounts for 2019-20?',
    '(B) Do you wish to submit financials in Standardized format for 2019-20?',
  ]
}
