import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';

@Component({
  selector: 'app-annual-account',
  templateUrl: './annual-account.component.html',
  styleUrls: ['./annual-account.component.scss']
})
export class AnnualAccountComponent implements OnInit {

  constructor(
    private commonServices : CommonServicesService
  ) { }
  cf_ulb = true;
  getQuery = {
    design_year : '606aafc14dff55e6c075d3ec',
    isGfc : false,
    formId : 1,
    ulb: '5f5610b3aab0f778b2d2cab0'
  };
  postData ={
    design_year : '606aafc14dff55e6c075d3ec',
    data : [

    ]
  };
  questionResponse: any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {
        _id: '5f4656c92daa9921dc1173aa',
        formId: 1,
        language:[
          {
              "_id": "641020367c14770bbbcf7274",
              "lng": "en",
              "question": [
                  {
                      "information": "",
                      "_id": "63f5f557f7f8a573d8730561",
                      "order": "1",
                      "answer_option": [],
                      "title": "Audited Accounts for 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "tab",
                      "viewSequence": "1",
                      "child": [],
                      "parent": [],
                      "validation": [
                          {
                              "_id": "54",
                              "error_msg": ""
                          }
                      ],
                      "restrictions": [],
                      "input_type": "10",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "PDFs are mandatory and Excels are Optional.",
                      "_id": "63f5f5e9f7f8a573d873057e",
                      "order": "2",
                      "answer_option": [
                          {
                              "name": "Yes",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "1"
                          },
                          {
                              "name": "No",
                              "did": [],
                              "viewSequence": "2",
                              "coordinates": [],
                              "_id": "2"
                          }
                      ],
                      "title": "(A) Do you wish to submit Audited Accounts for 2021-22?",
                      "hint": "Single Select",
                      "resource_urls": [],
                      "label": "1",
                      "shortKey": "audit#auditUnstandAccount",
                      "viewSequence": "2",
                      "child": [
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "4"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "6"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "7"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "8"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "9"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "10"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "12"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "14"
                          },
                          {
                              "type": "2",
                              "value": "^([1])$",
                              "order": "15"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "16"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "18"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "26"
                          },
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "21"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "5"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "11"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "13"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "17"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "19"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "23"
                          }
                      ],
                      "parent": [],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "5",
                      "weightage": [],
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f5f746f7f8a573d87305b9",
                      "order": "4",
                      "answer_option": [],
                      "title": "Balance Sheet",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "2",
                      "shortKey": "audit#bal_sheet",
                      "viewSequence": "3",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f5f81ef7f8a573d87306ac",
                      "order": "5",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "3",
                      "shortKey": "audit#bal_sheet#excel",
                      "viewSequence": "4",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f5f935709f2a73d90b2aeb",
                      "order": "6",
                      "answer_option": [],
                      "title": "Please enter total amount of Assets",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "4",
                      "shortKey": "audit#bal_sheet#assets",
                      "viewSequence": "5",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f5fa5b709f2a73d90b2b17",
                      "order": "7",
                      "answer_option": [],
                      "title": "Please enter total amount of Fixed Assets",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "5",
                      "shortKey": "audit#bal_sheet#f_assets",
                      "viewSequence": "6",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f5fb2e709f2a73d90b2b38",
                      "order": "8",
                      "answer_option": [],
                      "title": "Please enter total amount of State Grants received",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "6",
                      "shortKey": "s_grant",
                      "viewSequence": "7",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f5fbb0709f2a73d90b2b5b",
                      "order": "9",
                      "answer_option": [],
                      "title": "Please enter total amount of Central Grants received",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "7",
                      "shortKey": "c_grant",
                      "viewSequence": "8",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f5fc84709f2a73d90b2b7b",
                      "order": "10",
                      "answer_option": [],
                      "title": "Balance Sheet Schedule",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "8",
                      "shortKey": "audit#bal_sheet_schedules",
                      "viewSequence": "9",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f5fd65709f2a73d90b2bce",
                      "order": "11",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "9",
                      "shortKey": "audit#bal_sheet_schedules#excel",
                      "viewSequence": "10",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f5fe35709f2a73d90b2c3a",
                      "order": "12",
                      "answer_option": [],
                      "title": "Income Expenditure",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "10",
                      "shortKey": "inc_exp",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f5ff0d709f2a73d90b2c86",
                      "order": "13",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "11",
                      "shortKey": "order13",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f6004e709f2a73d90b2cdd",
                      "order": "14",
                      "answer_option": [],
                      "title": "Please enter total amount of Revenue",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "12",
                      "shortKey": "revenue",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f6026cf7f8a573d873076d",
                      "order": "15",
                      "answer_option": [],
                      "title": "Please enter total amount of Expenses",
                      "hint": "Upto 15 Digits",
                      "resource_urls": [],
                      "label": "13",
                      "shortKey": "expense",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 1,
                      "maxRange": 999999999999999,
                      "min": 1,
                      "max": 18,
                      "pattern": "^((?:^((?:[1-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f605f6709f2a73d90b2e4a",
                      "order": "16",
                      "answer_option": [],
                      "title": "Income Expenditure Schedule",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "14",
                      "shortKey": "inc_exp_schedules",
                      "viewSequence": "15",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f60674709f2a73d90b2e78",
                      "order": "17",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "15",
                      "shortKey": "order17",
                      "viewSequence": "16",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f60e20709f2a73d90b2f0a",
                      "order": "18",
                      "answer_option": [],
                      "title": "Cash flow Statement",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "16",
                      "shortKey": "cash_flow",
                      "viewSequence": "17",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f60f3a709f2a73d90b3026",
                      "order": "19",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel File",
                      "resource_urls": [],
                      "label": "17",
                      "shortKey": "order19",
                      "viewSequence": "18",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f610cef7f8a573d8730d5c",
                      "order": "21",
                      "answer_option": [
                          {
                              "name": "Yes",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "1"
                          },
                          {
                              "name": "No",
                              "did": [],
                              "viewSequence": "2",
                              "coordinates": [],
                              "_id": "2"
                          }
                      ],
                      "title": "(B) Do you wish to submit financials in standardised format for 2021-22?",
                      "hint": "Single Select",
                      "resource_urls": [],
                      "label": "19",
                      "shortKey": "auditStandAccount",
                      "viewSequence": "20",
                      "child": [
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "23"
                          }
                      ],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "5",
                      "weightage": [],
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63f611f7709f2a73d90b351d",
                      "order": "23",
                      "answer_option": [],
                      "title": "Please Upload EXCEL File",
                      "hint": "Upload File",
                      "resource_urls": [],
                      "label": "20",
                      "shortKey": "standardized_data",
                      "viewSequence": "21",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "2"
                          },
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "21"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63f61310f7f8a573d8731053",
                      "order": "24",
                      "answer_option": [
                          {
                              "name": "Agree",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "1"
                          },
                          {
                              "name": "Disagree",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "2"
                          }
                      ],
                      "title": "Self Declaration",
                      "hint": "",
                      "resource_urls": [
                          {
                              "download": true,
                              "_id": "640033fb949838061af6ebab",
                              "label": "",
                              "url": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/consent_6d2be93f-bc7e-4c32-8491-765454613673.txt"
                          }
                      ],
                      "label": "41",
                      "shortKey": "undertaking",
                      "viewSequence": "42",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          },
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "45"
                          }
                      ],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "22",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63fde2ba949838061af5e590",
                      "order": "26",
                      "answer_option": [],
                      "title": "Auditors Report",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "18",
                      "shortKey": "auditor_report",
                      "viewSequence": "19",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "2"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "i =  PDFs are mandatory and Excels are Optional.",
                      "_id": "63ff28cf949838061af6630a",
                      "order": "27",
                      "answer_option": [
                          {
                              "name": "Yes",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "1"
                          },
                          {
                              "name": "No",
                              "did": [],
                              "viewSequence": "2",
                              "coordinates": [],
                              "_id": "2"
                          }
                      ],
                      "title": "(A) Do you wish to submit Provisional Accounts for 2022-23?",
                      "hint": "Single Select",
                      "resource_urls": [],
                      "label": "21",
                      "shortKey": "unauditUnstandAccount",
                      "viewSequence": "22",
                      "child": [
                          {
                              "value": "^([1])$",
                              "order": "28",
                              "type": 11
                          },
                          {
                              "value": "^([1])$",
                              "order": "30",
                              "type": 2
                          },
                          {
                              "value": "^([1])$",
                              "order": "31",
                              "type": 2
                          },
                          {
                              "value": "^([1])$",
                              "order": "32",
                              "type": 2
                          },
                          {
                              "value": "^([1])$",
                              "order": "33",
                              "type": 2
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "34"
                          },
                          {
                              "value": "^([1])$",
                              "order": "36",
                              "type": 11
                          },
                          {
                              "value": "^([1])$",
                              "order": "38",
                              "type": 2
                          },
                          {
                              "value": "^([1])$",
                              "order": "39",
                              "type": 2
                          },
                          {
                              "value": "^([1])$",
                              "order": "40",
                              "type": 11
                          },
                          {
                              "value": "^([1])$",
                              "order": "42",
                              "type": 11
                          },
                          {
                              "value": "^([1])$",
                              "order": "44",
                              "type": 11
                          },
                          {
                              "value": "^([1])$",
                              "order": "45",
                              "type": 5
                          },
                          {
                              "type": "22",
                              "value": "^([1])$",
                              "order": "24"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "29"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "35"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "37"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "41"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "43"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "47"
                          }
                      ],
                      "parent": [],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "5",
                      "weightage": [],
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff29eb949838061af66356",
                      "order": "28",
                      "answer_option": [],
                      "title": "Balance Sheet",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "22",
                      "shortKey": "order28",
                      "viewSequence": "23",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff2a61949838061af669bc",
                      "order": "29",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "23",
                      "shortKey": "order29",
                      "viewSequence": "24",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff2abf949838061af66e9b",
                      "order": "30",
                      "answer_option": [],
                      "title": "Please enter total amount of Assets",
                      "hint": "Numeric Upto 15 digits",
                      "resource_urls": [],
                      "label": "24",
                      "shortKey": "order30",
                      "viewSequence": "25",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff2c29949838061af67459",
                      "order": "31",
                      "answer_option": [],
                      "title": "Please enter total amount of Fixed Assets",
                      "hint": "Numeric Upto 15 digits",
                      "resource_urls": [],
                      "label": "25",
                      "shortKey": "order31",
                      "viewSequence": "26",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff2cb9949838061af677c9",
                      "order": "32",
                      "answer_option": [],
                      "title": "Please enter total amount of State Grants received",
                      "hint": "Numeric Upto 15 digits",
                      "resource_urls": [],
                      "label": "26",
                      "shortKey": "order32",
                      "viewSequence": "27",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff2d04949838061af67b1e",
                      "order": "33",
                      "answer_option": [],
                      "title": "Please enter total amount of Central Grants received",
                      "hint": "Numeric Upto 15 digits",
                      "resource_urls": [],
                      "label": "27",
                      "shortKey": "order33",
                      "viewSequence": "28",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff2d96949838061af67e60",
                      "order": "34",
                      "answer_option": [],
                      "title": "Balance Sheet Schedule",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "28",
                      "shortKey": "order34",
                      "viewSequence": "29",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff2e50894068061927a35f",
                      "order": "35",
                      "answer_option": [],
                      "title": "Balance Sheet Schedule",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "29",
                      "shortKey": "order35",
                      "viewSequence": "30",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff300d949838061af688d3",
                      "order": "36",
                      "answer_option": [],
                      "title": "Income Expenditure ",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "30",
                      "shortKey": "order36",
                      "viewSequence": "31",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff30f0949838061af68fd6",
                      "order": "37",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "31",
                      "shortKey": "order37",
                      "viewSequence": "32",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff347d894068061927b5a9",
                      "order": "38",
                      "answer_option": [],
                      "title": "Please enter total amount of Revenue",
                      "hint": "Numeric Upto 15digits",
                      "resource_urls": [],
                      "label": "32",
                      "shortKey": "order38",
                      "viewSequence": "33",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff354c949838061af694c6",
                      "order": "39",
                      "answer_option": [],
                      "title": "Please enter total amount of Expenses",
                      "hint": "Numeric Upto 15 digits",
                      "resource_urls": [],
                      "label": "33",
                      "shortKey": "order39",
                      "viewSequence": "34",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "2"
                          },
                          {
                              "_id": "14",
                              "error_msg": "",
                              "value": "0.00"
                          }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 15,
                      "min": 1,
                      "max": 5,
                      "pattern": "^((?:^((?:[0-9]|1[0-4]))(?:\\.\\d{1,3})?|15))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff35eb949838061af6951e",
                      "order": "40",
                      "answer_option": [],
                      "title": "Please Upload Income Expenditure Schedule",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "34",
                      "shortKey": "order40",
                      "viewSequence": "35",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff3653949838061af69578",
                      "order": "41",
                      "answer_option": [],
                      "title": "",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "35",
                      "shortKey": "order41",
                      "viewSequence": "36",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff3f94949838061af6a694",
                      "order": "42",
                      "answer_option": [],
                      "title": "Cash flow Statement",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "36",
                      "shortKey": "order42",
                      "viewSequence": "37",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff4018949838061af6a734",
                      "order": "43",
                      "answer_option": [],
                      "title": "Cash flow Statement",
                      "hint": "Upload Excel Sheet",
                      "resource_urls": [],
                      "label": "37",
                      "shortKey": "order43",
                      "viewSequence": "38",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "183"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff4126949838061af6a7d3",
                      "order": "44",
                      "answer_option": [],
                      "title": "Auditors Report",
                      "hint": "Upload PDF",
                      "resource_urls": [],
                      "label": "38",
                      "shortKey": "order44",
                      "viewSequence": "39",
                      "child": [],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/pdf"
                          },
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  },
                  {
                      "information": "",
                      "_id": "63ff4222949838061af6a869",
                      "order": "45",
                      "answer_option": [
                          {
                              "name": "Yes",
                              "did": [],
                              "viewSequence": "1",
                              "coordinates": [],
                              "_id": "1"
                          },
                          {
                              "name": "No",
                              "did": [],
                              "viewSequence": "2",
                              "coordinates": [],
                              "_id": "2"
                          }
                      ],
                      "title": "(B) Do you wish to submit financials in standardised format for 2022-23?",
                      "hint": "Single Select",
                      "resource_urls": [],
                      "label": "39",
                      "shortKey": "order45",
                      "viewSequence": "40",
                      "child": [
                          {
                              "type": "22",
                              "value": "^([1])$",
                              "order": "24"
                          },
                          {
                              "type": "11",
                              "value": "^([1])$",
                              "order": "47"
                          }
                      ],
                      "parent": [
                          {
                              "type": "5",
                              "value": "^([1])$",
                              "order": "27"
                          }
                      ],
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "5",
                      "weightage": [],
                      "editable": false
                  },
                  {
                      "information": "",
                      "_id": "63ff4323894068061927c895",
                      "order": "47",
                      "answer_option": [],
                      "title": "Please Upload EXCEL File",
                      "hint": "Upload File",
                      "resource_urls": [],
                      "label": "40",
                      "shortKey": "order47",
                      "viewSequence": "41",
                      "child": [],
                      "parent": [
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "27"
                          },
                          {
                              "value": "^([1])$",
                              "type": "5",
                              "order": "45"
                          }
                      ],
                      "min": null,
                      "max": null,
                      "minRange": null,
                      "maxRange": null,
                      "pattern": "",
                      "validation": [
                          {
                              "error_msg": "",
                              "_id": "1"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.ms-excel"
                          },
                          {
                              "error_msg": "",
                              "_id": "83",
                              "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          },
                          {
                              "error_msg": "",
                              "_id": "81",
                              "value": "20480"
                          },
                          {
                              "error_msg": "",
                              "_id": "82",
                              "value": "1"
                          }
                      ],
                      "restrictions": [],
                      "input_type": "11",
                      "editable": false,
                      "weightage": []
                  }
              ],
              "title": "Annual Accounts",
              "buttons": []
          }
      ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  };
  endpoints:string = '';
  isApiComplete:boolean = false;
 // resData : any;
  ngOnInit(): void {
   // console.log('ResData', this.resData)
   this.questionResponse = {
    ...JSON.parse(JSON.stringify(this.questionResponse))
  }
  this.isApiComplete = true;
   this.onload();
  }
  onload(){
    this.commonServices.formGetMethod(this.endpoints, this.getQuery).subscribe((res)=>{
      console.log('res.........', res);
    },
    (error)=> {
      console.log('error', error);

    }
    )
  }
  resData(e){
    console.log('ResData..................', e);
    this.postData.data = e?.finalData;
    this.onSave(this.postData);
  }

  onSave(postdata){
    let designObj = {
            "answer": [
              {
                "label": "",
                "textValue": "",
                "value": "606aafc14dff55e6c075d3ec"
              }
            ],
            "input_type": "3",
            "nestedAnswer": [],
            "order": "5",
            "shortKey": "design_year",
          };
      postdata?.data.push(designObj);
    this.commonServices.formPostMethod(postdata).subscribe((res)=>{
      alert('data saved successfully.....');
      console.log(res);

    },
    (error)=>{
      console.log('post error', error);

    }
    )
  }

}
