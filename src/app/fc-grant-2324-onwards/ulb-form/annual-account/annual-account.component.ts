import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { queryParam } from 'src/app/fc-grant-2324-onwards/fc-shared/common-interface';
import { SweetAlert } from "sweetalert/typings/core";
import { Router } from '@angular/router';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-annual-account',
  templateUrl: './annual-account.component.html',
  styleUrls: ['./annual-account.component.scss']
})
export class AnnualAccountComponent implements OnInit {

  constructor(
    private commonServices : CommonServicesService,
    private router: Router,
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    // this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.ulbId = this.userData?.ulb;
    // if (!this.ulbId) {
    //   this.ulbId = localStorage.getItem("ulb_id");
    // }
    this.getQuery = {
      design_year: this.designYearArray["2023-24"],
      formId: 5,
      ulb: this.ulbId
    };
    this.fileFolderName = `${this.userData?.role}/2023-24/${this.formName}/${this.userData?.ulbCode}`
  }
  cf_ulb = true;
  // annual-accounts/get?ulb=5dd006d4ffbcc50cfd92c87c&design_year=606aafc14dff55e6c075d3ec&
  ulbId:string = '';
  userData: object | any;
  designYearArray = [];
  getQuery: queryParam = {
    design_year: null,
    formId: null,
    ulb: null
  };

  formName:string = 'annual_accounts';
  fileFolderName:string = '';
  postData ={
    // design_year : '606aafc14dff55e6c075d3ec',
    // data : [

    // ]
  };
  questionResponse: any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      // {
      //   _id: '5f4656c92daa9921dc1173aa',
      //   formId: 1,

      //   language:
      //   [
      //     {
      //         "_id": "64144d6538d5190d4dcd0dbb",
      //         "lng": "en",
      //         isDraft: false,
      //         "question": [
      //             {
      //                 "information": "PDFs are mandatory and Excels are Optional.",
      //                 "_id": "63f5f5e9f7f8a573d873057e",
      //                 "order": "2",
      //                 "answer_option": [
      //                     {
      //                         "name": "Yes",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "name": "No",
      //                         "did": [],
      //                         "viewSequence": "2",
      //                         "coordinates": [],
      //                         "_id": "2"
      //                     }
      //                 ],
      //                 "title": "(A) Do you wish to submit Audited Accounts for 2021-22?",
      //                 "hint": "Single Select",
      //                 "resource_urls": [],
      //                 "label": "1",
      //                 "shortKey": "audited.submit_annual_accounts",
      //                 "viewSequence": "1",
      //                 "child": [
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "4"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "5"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "6"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "7"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "8"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "9"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "10"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "11"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "12"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "13"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "14"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "15"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "16"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "17"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "18"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "19"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "26"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "21"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "23"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "48"
      //                     }
      //                 ],
      //                 "parent": [],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                       "error_msg": "",
      //                       "_id": "3"
      //                   }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5f746f7f8a573d87305b9",
      //                 "order": "4",
      //                 "answer_option": [],
      //                 "title": "Balance Sheet",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "2",
      //                 "shortKey": "audited.provisional_data.bal_sheet.pdf",
      //                 "viewSequence": "2",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                       "error_msg": "",
      //                       "_id": "3"
      //                   },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5f81ef7f8a573d87306ac",
      //                 "order": "5",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "3",
      //                 "shortKey": "audited.provisional_data.bal_sheet.excel",
      //                 "viewSequence": "3",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     },
      //                     {
      //                       "error_msg": "",
      //                       "_id": "83",
      //                       "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                   },
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5f935709f2a73d90b2aeb",
      //                 "order": "6",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Assets",
      //                 "hint": "Upto 15 Digits",
      //                 "resource_urls": [],
      //                 "label": "4",
      //                 "shortKey": "audited.provisional_data.bal_sheet.assets",
      //                 "viewSequence": "4",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fa5b709f2a73d90b2b17",
      //                 "order": "7",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Fixed Assets",
      //                 "hint": "Upto 15 Digits.",
      //                 "resource_urls": [],
      //                 "label": "5",
      //                 "shortKey": "audited.provisional_data.bal_sheet.f_assets",
      //                 "viewSequence": "5",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fb2e709f2a73d90b2b38",
      //                 "order": "8",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of State Grants received",
      //                 "hint": "Upto 15 Digits",
      //                 "resource_urls": [],
      //                 "label": "6",
      //                 "shortKey": "audited.provisional_data.bal_sheet.s_grant",
      //                 "viewSequence": "6",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fbb0709f2a73d90b2b5b",
      //                 "order": "9",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Central Grants received",
      //                 "hint": "Upto 15 Digits",
      //                 "resource_urls": [],
      //                 "label": "7",
      //                 "shortKey": "audited.provisional_data.bal_sheet.c_grant",
      //                 "viewSequence": "7",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fc84709f2a73d90b2b7b",
      //                 "order": "10",
      //                 "answer_option": [],
      //                 "title": "Balance Sheet Schedule",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "8",
      //                 "shortKey": "audited.provisional_data.bal_sheet_schedules.pdf",
      //                 "viewSequence": "8",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fd65709f2a73d90b2bce",
      //                 "order": "11",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "9",
      //                 "shortKey": "audited.provisional_data.bal_sheet_schedules.excel",
      //                 "viewSequence": "9",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     },
      //                     {
      //                       "error_msg": "",
      //                       "_id": "83",
      //                       "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                   },
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5fe35709f2a73d90b2c3a",
      //                 "order": "12",
      //                 "answer_option": [],
      //                 "title": "Income Expenditure",
      //                 "hint": "Upload PDF.",
      //                 "resource_urls": [],
      //                 "label": "10",
      //                 "shortKey": "audited.provisional_data.inc_exp.pdf",
      //                 "viewSequence": "10",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f5ff0d709f2a73d90b2c86",
      //                 "order": "13",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "11",
      //                 "shortKey": "audited.provisional_data.inc_exp.excel",
      //                 "viewSequence": "11",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f6004e709f2a73d90b2cdd",
      //                 "order": "14",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Revenue",
      //                 "hint": "Upto 15 Digits.",
      //                 "resource_urls": [],
      //                 "label": "12",
      //                 "shortKey": "audited.provisional_data.inc_exp.revenue",
      //                 "viewSequence": "12",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f6026cf7f8a573d873076d",
      //                 "order": "15",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Expenses",
      //                 "hint": "Upto 15 Digits.",
      //                 "resource_urls": [],
      //                 "label": "13",
      //                 "shortKey": "audited.provisional_data.inc_exp.expense",
      //                 "viewSequence": "13",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f605f6709f2a73d90b2e4a",
      //                 "order": "16",
      //                 "answer_option": [],
      //                 "title": "Income Expenditure Schedule",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "14",
      //                 "shortKey": "audited.provisional_data.inc_exp_schedules.pdf",
      //                 "viewSequence": "14",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f60674709f2a73d90b2e78",
      //                 "order": "17",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "15",
      //                 "shortKey": "audited.provisional_data.inc_exp_schedules.excel",
      //                 "viewSequence": "15",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f60e20709f2a73d90b2f0a",
      //                 "order": "18",
      //                 "answer_option": [],
      //                 "title": "Cash flow Statement",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "16",
      //                 "shortKey": "audited.provisional_data.cash_flow.pdf",
      //                 "viewSequence": "16",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f60f3a709f2a73d90b3026",
      //                 "order": "19",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel File",
      //                 "resource_urls": [],
      //                 "label": "17",
      //                 "shortKey": "audited.provisional_data.cash_flow.excel",
      //                 "viewSequence": "17",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f610cef7f8a573d8730d5c",
      //                 "order": "21",
      //                 "answer_option": [
      //                     {
      //                         "name": "Yes",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "name": "No",
      //                         "did": [],
      //                         "viewSequence": "2",
      //                         "coordinates": [],
      //                         "_id": "2"
      //                     }
      //                 ],
      //                 "title": "(B) Do you wish to submit financials in standardised format for 2021-22?",
      //                 "hint": "Single Select",
      //                 "resource_urls": [],
      //                 "label": "19",
      //                 "shortKey": "audited.submit_standardized_data",
      //                 "viewSequence": "19",
      //                 "child": [
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "23"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "48"
      //                     }
      //                 ],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63f611f7709f2a73d90b351d",
      //                 "order": "23",
      //                 "answer_option": [],
      //                 "title": "Please Upload EXCEL File",
      //                 "hint": "Upload File",
      //                 "resource_urls": [],
      //                 "label": "20",
      //                 "shortKey": "audited.standardized_data.excel",
      //                 "viewSequence": "20",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     },
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "21"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63fde2ba949838061af5e590",
      //                 "order": "26",
      //                 "answer_option": [],
      //                 "title": "Auditors Report",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "18",
      //                 "shortKey": "audited.provisional_data.auditor_report.pdf",
      //                 "viewSequence": "18",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "PDFs are mandatory and Excels are Optional.",
      //                 "_id": "63ff28cf949838061af6630a",
      //                 "order": "27",
      //                 "answer_option": [
      //                     {
      //                         "name": "Yes",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "name": "No",
      //                         "did": [],
      //                         "viewSequence": "2",
      //                         "coordinates": [],
      //                         "_id": "2"
      //                     }
      //                 ],
      //                 "title": "(A) Do you wish to submit Provisional Accounts for 2022-23?",
      //                 "hint": "Single Select.",
      //                 "resource_urls": [],
      //                 "label": "22",
      //                 "shortKey": "unAudited.submit_annual_accounts",
      //                 "viewSequence": "22",
      //                 "child": [
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "28"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "29"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "30"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "31"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "32"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "33"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "34"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "35"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "36"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "37"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "38"
      //                     },
      //                     {
      //                         "type": "2",
      //                         "value": "^([1])$",
      //                         "order": "39"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "40"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "41"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "42"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "43"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "45"
      //                     },
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "47"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "49"
      //                     }
      //                 ],
      //                 "parent": [],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff29eb949838061af66356",
      //                 "order": "28",
      //                 "answer_option": [],
      //                 "title": "Balance Sheet",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "23",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.pdf",
      //                 "viewSequence": "23",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2a61949838061af669bc",
      //                 "order": "29",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "24",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.excel",
      //                 "viewSequence": "24",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2abf949838061af66e9b",
      //                 "order": "30",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Assets",
      //                 "hint": "Numeric Upto 15 digits.",
      //                 "resource_urls": [],
      //                 "label": "25",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.assets",
      //                 "viewSequence": "25",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2c29949838061af67459",
      //                 "order": "31",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Fixed Assets",
      //                 "hint": "Numeric Upto 15 digits.",
      //                 "resource_urls": [],
      //                 "label": "26",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.f_assets",
      //                 "viewSequence": "26",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2cb9949838061af677c9",
      //                 "order": "32",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of State Grants received",
      //                 "hint": "Numeric Upto 15 digits.",
      //                 "resource_urls": [],
      //                 "label": "27",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.s_grant",
      //                 "viewSequence": "27",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2d04949838061af67b1e",
      //                 "order": "33",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Central Grants received",
      //                 "hint": "Numeric Upto 15 digits.",
      //                 "resource_urls": [],
      //                 "label": "28",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet.c_grant",
      //                 "viewSequence": "28",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2d96949838061af67e60",
      //                 "order": "34",
      //                 "answer_option": [],
      //                 "title": "Balance Sheet Schedule",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "29",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet_schedules.pdf",
      //                 "viewSequence": "29",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff2e50894068061927a35f",
      //                 "order": "35",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "30",
      //                 "shortKey": "unAudited.provisional_data.bal_sheet_schedules.excel",
      //                 "viewSequence": "30",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff300d949838061af688d3",
      //                 "order": "36",
      //                 "answer_option": [],
      //                 "title": "Income Expenditure",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "31",
      //                 "shortKey": "unAudited.provisional_data.inc_exp.pdf",
      //                 "viewSequence": "31",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff30f0949838061af68fd6",
      //                 "order": "37",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "32",
      //                 "shortKey": "unAudited.provisional_data.inc_exp.excel",
      //                 "viewSequence": "32",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff347d894068061927b5a9",
      //                 "order": "38",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Revenue",
      //                 "hint": "Numeric Upto 15 digits",
      //                 "resource_urls": [],
      //                 "label": "33",
      //                 "shortKey": "unAudited.provisional_data.inc_exp.revenue",
      //                 "viewSequence": "33",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff354c949838061af694c6",
      //                 "order": "39",
      //                 "answer_option": [],
      //                 "title": "Please enter total amount of Expenses",
      //                 "hint": "Numeric Upto 15 digits",
      //                 "resource_urls": [],
      //                 "label": "34",
      //                 "shortKey": "unAudited.provisional_data.inc_exp.expense",
      //                 "viewSequence": "34",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "2"
      //                     },
      //                     {
      //                         "_id": "14",
      //                         "error_msg": "",
      //                         "value": "0.00"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "minRange": 1,
      //                 "maxRange": 999999999999999,
      //                 "min": 1,
      //                 "max": 18,
      //                 "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
      //                 "input_type": "2",
      //                 "weightage": [],
      //                 "valueHolder": "",
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff35eb949838061af6951e",
      //                 "order": "40",
      //                 "answer_option": [],
      //                 "title": "Income Expenditure Schedule",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "35",
      //                 "shortKey": "unAudited.provisional_data.inc_exp_schedules.pdf",
      //                 "viewSequence": "35",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff3653949838061af69578",
      //                 "order": "41",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "36",
      //                 "shortKey": "unAudited.provisional_data.inc_exp_schedules.excel",
      //                 "viewSequence": "36",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff3f94949838061af6a694",
      //                 "order": "42",
      //                 "answer_option": [],
      //                 "title": "Cash flow Statement",
      //                 "hint": "Upload PDF",
      //                 "resource_urls": [],
      //                 "label": "37",
      //                 "shortKey": "unAudited.provisional_data.cash_flow.pdf",
      //                 "viewSequence": "37",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/pdf"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff4018949838061af6a734",
      //                 "order": "43",
      //                 "answer_option": [],
      //                 "title": "",
      //                 "hint": "Upload Excel Sheet",
      //                 "resource_urls": [],
      //                 "label": "38",
      //                 "shortKey": "unAudited.provisional_data.cash_flow.excel",
      //                 "viewSequence": "38",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "183"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff4222949838061af6a869",
      //                 "order": "45",
      //                 "answer_option": [
      //                     {
      //                         "name": "Yes",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "name": "No",
      //                         "did": [],
      //                         "viewSequence": "2",
      //                         "coordinates": [],
      //                         "_id": "2"
      //                     }
      //                 ],
      //                 "title": "(B) Do you wish to submit financials in standardised format for 2022-23?",
      //                 "hint": "Single Select",
      //                 "resource_urls": [],
      //                 "label": "39",
      //                 "shortKey": "unAudited.submit_standardized_data",
      //                 "viewSequence": "39",
      //                 "child": [
      //                     {
      //                         "type": "11",
      //                         "value": "^([1])$",
      //                         "order": "47"
      //                     },
      //                     {
      //                         "type": "5",
      //                         "value": "^([1])$",
      //                         "order": "49"
      //                     }
      //                 ],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "63ff4323894068061927c895",
      //                 "order": "47",
      //                 "answer_option": [],
      //                 "title": "Please Upload EXCEL File",
      //                 "hint": "Upload File",
      //                 "resource_urls": [],
      //                 "label": "40",
      //                 "shortKey": "unAudited.standardized_data.excel",
      //                 "viewSequence": "40",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     },
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "45"
      //                     }
      //                 ],
      //                 "min": null,
      //                 "max": null,
      //                 "minRange": null,
      //                 "maxRange": null,
      //                 "pattern": "",
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.ms-excel"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "83",
      //                         "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "81",
      //                         "value": "20480"
      //                     },
      //                     {
      //                         "error_msg": "",
      //                         "_id": "82",
      //                         "value": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "11",
      //                 "editable": false,
      //                 "weightage": []
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "6414143138d5190d4dccf21e",
      //                 "order": "48",
      //                 "answer_option": [
      //                     {
      //                         "name": "Agree",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "title": "\"Self declaration by the Executive officer/Municipal Commissioner of the ULB on the standardised financial statements uploaded above. I hereby confirm that I have verified the information uploaded in standardized template and it is true and correct. It is confirmed that this information can be made available for public consumption on the CityFinance portal.\"",
      //                 "hint": "",
      //                 "resource_urls": [],
      //                 "label": "21",
      //                 "shortKey": "audited.standardized_data.declaration",
      //                 "viewSequence": "21",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "2"
      //                     },
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "21"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             },
      //             {
      //                 "information": "",
      //                 "_id": "6414187838d5190d4dccf77d",
      //                 "order": "49",
      //                 "answer_option": [
      //                     {
      //                         "name": "Agree",
      //                         "did": [],
      //                         "viewSequence": "1",
      //                         "coordinates": [],
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "title": "\"Self declaration by the Executive officer/Municipal Commissioner of the ULB on the standardised financial statements uploaded above. I hereby confirm that I have verified the information uploaded in standardized template and it is true and correct. It is confirmed that this information can be made available for public consumption on the CityFinance portal.\"",
      //                 "hint": "",
      //                 "resource_urls": [],
      //                 "label": "41",
      //                 "shortKey": "unAudited.standardized_data.declaration",
      //                 "viewSequence": "41",
      //                 "child": [],
      //                 "parent": [
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "27"
      //                     },
      //                     {
      //                         "value": "^([1])$",
      //                         "type": "5",
      //                         "order": "45"
      //                     }
      //                 ],
      //                 "validation": [
      //                     {
      //                         "error_msg": "",
      //                         "_id": "1"
      //                     }
      //                 ],
      //                 "restrictions": [],
      //                 "input_type": "5",
      //                 "weightage": [],
      //                 "editable": false
      //             }
      //         ],
      //         "title": "Annual Accounts",
      //         "buttons": []
      //     }
      // ],
      //   groupOrder: 37,
      //   createDynamicOption: [],
      //   getDynamicOption: [],
      // },
    ],
  };
  endpoints:string = 'annual-accounts/get';
  isApiComplete:boolean = false;
  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`
   statusId: number = 1;
  //  nextBtnUrl:string='../odf';
  //  backBtnUrl:string='#'
 // resData : any;
  ngOnInit(): void {
   // console.log('ResData', this.resData)
  //  this.questionResponse = {
  //   ...JSON.parse(JSON.stringify(this.questionResponse))
  // }
   this.isApiComplete = false;
   this.onload();
  }
  onload(){
    this.commonServices.formGetMethod(this.endpoints, this.getQuery).subscribe((res: any)=>{
      console.log('res.........', res);
      this.questionResponse.data = res.data;
      console.log('res.........22', this.questionResponse);
      this.questionResponse = {
        ...JSON.parse(JSON.stringify(this.questionResponse))
      }
      this.isApiComplete = true;
    },
    (error)=> {
      console.log('error', error);

    }
    )
  }
  resData(e){
    console.log('ResData..................', e);
    //this.postData.data = e?.finalData;

    // this.onSave(this.postData);
    let finalData = e?.finalData;
    if (e?.isSaveAsDraft == false) {
      this.alertForFianlSubmit(finalData, e?.isSaveAsDraft)
    } else {
      this.onSave(finalData, e?.isSaveAsDraft);
    }
  }

  onSave(finalData, draft) {
    if (draft == false) {
      this.statusId = 3;
    } else {
      this.statusId = 2;
    }
      this.postData = {
        "design_year": this.designYearArray["2023-24"],
        "ulb": this.ulbId,
        "isDraft": draft,
        "formId": 5,
        "status": this.statusId,
        data: finalData
      }

    this.commonServices.formPostMethod(this.postData, 'annual-accounts/create').subscribe((res)=>{
      this.commonServices.setFormStatusUlb.next(true);
      if(draft == false){
        this.isApiComplete = false;
        this.onload();
      }
      swal("Saved", `Data saved ${draft ? 'as draft' : ''} successfully`, "success");
      console.log(res);

    },
    (error)=>{
      console.log('post error', error);

    }
    )
  }
  alertForFianlSubmit(finalData, draft) {
    swal(
      "Confirmation !",
      `${this.finalSubmitMsg}`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
          },
          Draft: {
            text: "Save as Draft",
            value: "draft",
          },
          Cancel: {
            text: "Cancel",
            value: "cancel",
          },
        },
      }
    ).then((value) => {
      switch (value) {
        case "submit":
          this.onSave(finalData, false);
          break;
        case "draft":
          this.onSave(finalData, true);
          break;
        case "cancel":
          break;
      }
    });
  }
  nextPreBtn(e){
    // temporay basic setting url
    console.log('eeee next pre btn', e);
    if(this.formName == 'odf'){
      let url = e?.type == 'pre' ? '#' : 'odf'
      console.log('routes url', this.router.navigate([url]), url)
      this.router.navigate([ `/ulb-form/${url}`]);
    }

  }
}
