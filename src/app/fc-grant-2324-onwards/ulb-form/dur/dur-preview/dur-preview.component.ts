import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';

@Component({
  selector: 'app-dur-preview',
  templateUrl: './dur-preview.component.html',
  styleUrls: ['./dur-preview.component.scss']
})
export class DurPreviewComponent implements OnInit {
  @Input() parentData: any;
  @ViewChild("previewUti") _html: ElementRef;
  @ViewChild("templateSave") template;
  showLoader;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  styleForPDF = `<style>

  .f-table {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 12px;
  }
  .header-p {
    background-color: #047474;
    text-align: center;
    padding: 10px;
}

.heading-p {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 1rem;
    font-weight: 700;
}

.header-u-p {
    background-color: #047474;
    text-align: center;
    padding: 10px;
}

.heading-u-p {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
    padding-top: .5rem;
}

.h-uti-p {
    font-size: 14px;
    font-weight: 700;
    margin-top: 1rem;
    color: #FFFFFF;
}

.s-h-uti {
    font-size: 13px;
    font-weight: 500;
    color: #FFFFFF;
}

.se-r {
    margin-top: 2%;
}

.st-n {
    font-size: 12px;
    font-weight: 600;
}

.m-top {
    margin-top: 1%;
    margin-bottom: 2%;
}

tr {
    text-align: center;
}


.f-text {
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    padding-top: 2rem;

}

.sig-text {
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}

.m-b {
    margin-top: .5rem !important;
    margin-bottom: 5%;
}

.pd-row {
    padding-left: 1% !important;
    padding-right: 2% !important;
}

.pd-row-n {
    padding-left: 2%;
    padding-right: 2%;
}
.name-row {
    margin-top: 4rem !important;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}
.pdf-hide{
  display : none;
}


.ff-table>table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
      padding: 4px 0px;
      line-height: 1.42857143;
      vertical-align: middle;


}
.pj-tb{
  margin-top: 3rem;
}
.pd-r {
  padding-left : 6px !important;
}
.se-tb{
  padding-top : 1rem !important;
}
.pd-th {
  padding-left: 2px !important;
  padding-right: 2px !important;
}
  </style>`;

  @Input()
  changeFromOutSide: any;

  subParentForModal;

  formStatusCheck = "";
  statusArray = [
    "Not Started",
    "Under Review By State",
    "Completed",
    "In Progress",
  ];
  totalStatus;
  analytics = [];
  swm = [];
  wm = [];
  categories;
  totalWmAmount = 0;
  totalSwmAmount = 0;
  USER_TYPES = USER_TYPE;
  userDetails = new UserUtility().getLoggedInUserDetails();
  userData = JSON.parse(localStorage.getItem("userData"));
  state;
  ulb;

  ngOnInit(): void {
  }

}
