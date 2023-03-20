import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DurPreviewComponent } from './dur-preview/dur-preview.component';

@Component({
  selector: 'app-dur',
  templateUrl: './dur.component.html',
  styleUrls: ['./dur.component.scss']
})
export class DurComponent implements OnInit {
  questionresponse = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {
        _id: '5f4656c92daa9921dc1173aa',
        formId: 466,
        language: [
          {
            "_id": "6409bf2a235a2809db04cb14",
            "lng": "en",
            "question": [
              {
                "information": "",
                "_id": "6405dd63927e4f093c8acbf6",
                "order": "1",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  }
                ],
                'childQuestionData': [
                  [
                    {
                      "information": "",
                      "_id": "6405de27927e4f093c8acc63",
                      "order": "1.001",
                      "answer_option": [],
                      "title": "Name of MPC/UA/NMPC",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "name",
                      "viewSequence": "2",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "6405deda927e4f093c8acca1",
                      "order": "1.002",
                      "answer_option": [
                        {
                          "name": "Tied",
                          "did": [],
                          "viewSequence": "1",
                          "_id": "1"
                        },
                        {
                          "name": "UnTied",
                          "did": [],
                          "viewSequence": "2",
                          "_id": "2"
                        }
                      ],
                      "title": "Type of Grant",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order1_002",
                      "viewSequence": "3",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "3",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "3",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ]
                ],
                "title": "General",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "general",
                "viewSequence": "1",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "183"
                  }
                ],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405de27927e4f093c8acc63",
                "order": "1.001",
                "answer_option": [],
                "title": "Name of MPC/UA/NMPC",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "ulb",
                "viewSequence": "2",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "min": 1,
                "max": null,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405deda927e4f093c8acca1",
                "order": "1.002",
                "answer_option": [
                  {
                    "name": "Tied",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "UnTied",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  }
                ],
                "title": "Type of Grant",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "grantType",
                "viewSequence": "3",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405dfde927e4f093c8accda",
                "order": "2",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "2",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  }
                ],

                'childQuestionData': [
                  [
                    {
                      "information": "",
                      "_id": "64097a583b2eb509dc61e2a7",
                      "order": "2.005",
                      "answer_option": [],
                      "title": "i. Unutilised Tied Grants from previous installment (in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "unutilised",
                      "viewSequence": "5",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "6405e01b927e4f093c8acd05",
                      "order": "2.002",
                      "answer_option": [],
                      "title": "ii. 15th F.C. Tied grant received for the year (1st & 2nd installment taken together) (in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "grantRecieved",
                      "viewSequence": "6",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "6405e03f927e4f093c8acd20",
                      "order": "2.003",
                      "answer_option": [],
                      "title": "iii. Expenditure incurred during the year i.e. as on 31st March 2022 from Tied grant (in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "expenditure",
                      "viewSequence": "7",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "640979f13b2eb509dc61e1bd",
                      "order": "2.004",
                      "answer_option": [],
                      "title": "Closing balance at the end of year (in lakhs)( i + ii - iii )",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order2_004",
                      "viewSequence": "8",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ]
                ],
                "title": "15th FC Tied Grant Status for the Financial Year 2021-22*",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "tiedGrant",
                "viewSequence": "4",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405e01b927e4f093c8acd05",
                "order": "2.002",
                "answer_option": [],
                "title": "ii. 15th F.C. Tied grant received for the year (1st & 2nd installment taken together) (in lakhs)",
                "hint": "Number",
                "resource_urls": [],
                "label": "",
                "shortKey": "receivedDuringYr",
                "viewSequence": "6",
                "child": [],
                "parent": [],
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
                "maxRange": 8,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-7])(?:\\.\\d{1,3})?|8))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "6405e03f927e4f093c8acd20",
                "order": "2.003",
                "answer_option": [],
                "title": "iii. Expenditure incurred during the year i.e. as on 31st March 2022 from Tied grant (in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "expDuringYr",
                "viewSequence": "7",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "640979f13b2eb509dc61e1bd",
                "order": "2.004",
                "answer_option": [],
                "title": "Closing balance at the end of year (in lakhs)( i + ii - iii )",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "closingBal",
                "viewSequence": "8",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  },
                  {
                    "_id": "3",
                    "error_msg": ""
                  },
                  {
                    "_id": "5",
                    "error_msg": "",
                    "value": "(unUtilizedPrevYr+receivedDuringYr-expDuringYr)"
                  }
                ],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": "",
                "formula": "(unUtilizedPrevYr+receivedDuringYr-expDuringYr)"
              },
              {
                "information": "",
                "_id": "64097a583b2eb509dc61e2a7",
                "order": "2.005",
                "answer_option": [],
                "title": "i. Unutilised Tied Grants from previous installment (in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "unUtilizedPrevYr",
                "viewSequence": "5",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "6405e151927e4f093c8acd96",
                "order": "3",
                "answer_option": [],
                "title": "Component Wise Utilisation of Tied grants as on 31st March 2022*",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "order3",
                "viewSequence": "9",
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
                "information": "",
                "_id": "6405e188927e4f093c8acdb2",
                "order": "4",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "4",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "4"
                  }
                ],
                "title": "Water Management (WM)",
                'childQuestionData': [
                  [
                    {
                      "information": "",
                      "_id": "6405e2682638a6093d1b68c0",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_001",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "isQuestionDisabled": true,
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Rejuvenation of Water Bodies",
                          "value": ""
                        }
                      ],
                      "value": "Rejuvenation of Water Bodies",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Rejuvenation of Water Bodies"
                    },
                    {
                      "information": "",
                      "_id": "64097b293b2eb509dc61e3b0",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "totalGrantUtilization",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097b4b3b2eb509dc61e3df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "noOfProjects",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097b783b2eb509dc61e410",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_004",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "6405e2682638a6093d1b68c0",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_001",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Drinking Water",
                          "value": ""
                        }
                      ],
                      "isQuestionDisabled": true,
                      "value": "Drinking Water",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Drinking Water"
                    },
                    {
                      "information": "",
                      "_id": "64097b293b2eb509dc61e3b0",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "totalGrantUtilization",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    },
                    {
                      "information": "",
                      "_id": "64097b4b3b2eb509dc61e3df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "noOfProjects",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    },
                    {
                      "information": "",
                      "_id": "64097b783b2eb509dc61e410",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_004",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "6405e2682638a6093d1b68c0",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_001",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "isQuestionDisabled": true,
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Rainwater Harvesting",
                          "value": ""
                        }
                      ],
                      "value": "Rainwater Harvesting",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 3"
                      },
                      "forParentValue": 3,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Rainwater Harvesting"
                    },
                    {
                      "information": "",
                      "_id": "64097b293b2eb509dc61e3b0",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "totalGrantUtilization",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 3"
                      },
                      "forParentValue": 3
                    },
                    {
                      "information": "",
                      "_id": "64097b4b3b2eb509dc61e3df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "noOfProjects",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 3"
                      },
                      "forParentValue": 3
                    },
                    {
                      "information": "",
                      "_id": "64097b783b2eb509dc61e410",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_004",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 3"
                      },
                      "forParentValue": 3
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "6405e2682638a6093d1b68c0",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_001",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "isQuestionDisabled": true,
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Water Recycling",
                          "value": ""
                        }
                      ],
                      "value": "Water Recycling",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 4"
                      },
                      "forParentValue": 4,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Water Recycling"
                    },
                    {
                      "information": "",
                      "_id": "64097b293b2eb509dc61e3b0",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "totalGrantUtilization",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 4"
                      },
                      "forParentValue": 4
                    },
                    {
                      "information": "",
                      "_id": "64097b4b3b2eb509dc61e3df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "noOfProjects",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 4"
                      },
                      "forParentValue": 4
                    },
                    {
                      "information": "",
                      "_id": "64097b783b2eb509dc61e410",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order4_004",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 4"
                      },
                      "forParentValue": 4
                    }
                  ]
                ],
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterManagement_tableView",
                "viewSequence": "10",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405e2682638a6093d1b68c0",
                "order": "4.001",
                "answer_option": [],
                "title": "Sector",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "wmSector",
                "viewSequence": "11",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  },
                  {
                    "_id": "3",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "min": 1,
                "max": null,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "i = Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled.",
                "_id": "64097b293b2eb509dc61e3b0",
                "order": "4.002",
                "answer_option": [],
                "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "wmTiedGrantUtilized",
                "viewSequence": "12",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097b4b3b2eb509dc61e3df",
                "order": "4.003",
                "answer_option": [],
                "title": "Number of Projects Undertaken",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "wmProjectCount",
                "viewSequence": "13",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 999,
                "min": 1,
                "max": 3,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097b783b2eb509dc61e410",
                "order": "4.004",
                "answer_option": [],
                "title": "Total Project Cost Involved(INR in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "order4_004",
                "viewSequence": "14",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "6405e3442638a6093d1b696d",
                "order": "5",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "2",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  }
                ],
                'childQuestionData': [
                  [
                    {
                      "information": "",
                      "_id": "6405e35c2638a6093d1b6994",
                      "order": "5.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_001",
                      "viewSequence": "16",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Sanitation",
                          "value": ""
                        }
                      ],
                      "value": "Sanitation",
                      "isQuestionDisabled": true,
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Sanitation"
                    },
                    {
                      "information": "",
                      "_id": "64097bd43b2eb509dc61e495",
                      "order": "5.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_002",
                      "viewSequence": "17",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097be53b2eb509dc61e4c6",
                      "order": "5.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_003",
                      "viewSequence": "18",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097bf83b2eb509dc61e4f9",
                      "order": "5.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_004",
                      "viewSequence": "19",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "6405e35c2638a6093d1b6994",
                      "order": "5.001",
                      "answer_option": [],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_001",
                      "viewSequence": "16",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Solid Waste Management",
                          "value": ""
                        }
                      ],
                      "value": "Solid Waste Management",
                      "isQuestionDisabled": true,
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Solid Waste Management"
                    },
                    {
                      "information": "",
                      "_id": "64097bd43b2eb509dc61e495",
                      "order": "5.002",
                      "answer_option": [],
                      "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_002",
                      "viewSequence": "17",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    },
                    {
                      "information": "",
                      "_id": "64097be53b2eb509dc61e4c6",
                      "order": "5.003",
                      "answer_option": [],
                      "title": "Number of Projects Undertaken",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_003",
                      "viewSequence": "18",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    },
                    {
                      "information": "",
                      "_id": "64097bf83b2eb509dc61e4f9",
                      "order": "5.004",
                      "answer_option": [],
                      "title": "Total Project Cost Involved(INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "order5_004",
                      "viewSequence": "19",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "5",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2
                    }
                  ]
                ],
                "title": "Solid Waste Management (SWM)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWasteManagement_tableView",
                "viewSequence": "15",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "_id": "96",
                    "error_msg": ""
                  },
                  {
                    "error_msg": "",
                    "_id": "183"
                  }
                ],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "6405e35c2638a6093d1b6994",
                "order": "5.001",
                "answer_option": [],
                "title": "Sector",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "swmSector",
                "viewSequence": "16",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [],
                "restrictions": [],
                "min": 1,
                "max": null,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "i = Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled.",
                "_id": "64097bd43b2eb509dc61e495",
                "order": "5.002",
                "answer_option": [],
                "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "swmTiedGrantUtilized",
                "viewSequence": "17",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097be53b2eb509dc61e4c6",
                "order": "5.003",
                "answer_option": [],
                "title": "Number of Projects Undertaken",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "swmProjectCount",
                "viewSequence": "18",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 3,
                "min": 1,
                "max": 1,
                "pattern": "^([0-3])$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "\"i = The Total Project cost for all projects combined, As per DPR, to be mentioned. For Ex: If there are two projects. one for 100 Cr and another for 50 Cr, then combined cost i.e. will be entered in the total project cost.  \"",
                "_id": "64097bf83b2eb509dc61e4f9",
                "order": "5.004",
                "answer_option": [],
                "title": "Total Project Cost Involved(INR in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "swmProjectCost",
                "viewSequence": "19",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097dcc3b2eb509dc61e550",
                "order": "6",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  }
                ],
                'childQuestionData': [
                  [
                    {
                      "information": "",
                      "_id": "64097dfb3b2eb509dc61e581",
                      "order": "6.001",
                      "answer_option": [],
                      "title": "Name of the Project",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "name",
                      "viewSequence": "21",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "min": 1,
                      "max": 50,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097e1e3b2eb509dc61e5ba",
                      "order": "6.002",
                      "answer_option": [
                        {
                          "name": "Yes",
                          "did": [],
                          "viewSequence": "1",
                          "_id": "1"
                        }
                      ],
                      "title": "Sector",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "category",
                      "viewSequence": "22",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "_id": "1",
                          "error_msg": ""
                        }
                      ],
                      "restrictions": [],
                      "input_type": "3",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "3",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097e4f3b2eb509dc61e5f5",
                      "order": "6.003",
                      "answer_option": [],
                      "title": "Latitude",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "lat",
                      "viewSequence": "23",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097e5f3b2eb509dc61e632",
                      "order": "6.004",
                      "answer_option": [],
                      "title": "Longitude",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "long",
                      "viewSequence": "24",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "i = The total project cost is as per the DPR.",
                      "_id": "64097e763b2eb509dc61e671",
                      "order": "6.005",
                      "answer_option": [],
                      "title": "Total Project Cost (INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "cost",
                      "viewSequence": "25",
                      "child": [],
                      "parent": [],
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
                      "maxRange": 9,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "i = This is the outlay from 15th FC grant out of the total project cost. For Ex: If project total cost is 100 Cr, out of which 80 Cr is sourced from AMRUT 2.0, rest 20 Cr is sourced from 15th FC tied grants, then 20 Cr should be entered here. Please do not enter the expenditure incurred.",
                      "_id": "64097e903b2eb509dc61e6b2",
                      "order": "6.006",
                      "answer_option": [],
                      "title": "Amount of 15th FC Grants in Total Project Cost (INR in lakhs)",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "expenditure",
                      "viewSequence": "26",
                      "child": [],
                      "parent": [],
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
                      "maxRange": 9,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 5,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097eb23b2eb509dc61e6f5",
                      "order": "6.007",
                      "answer_option": [],
                      "title": "% of 15th FC Grants in Total Project Cost",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "percProjectCost",
                      "viewSequence": "27",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 6,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "6409b860235a2809db04c501",
                      "order": "6.008",
                      "answer_option": [],
                      "title": "Project Start Date",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "startDate",
                      "viewSequence": "28",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "_id": "24",
                          "error_msg": "",
                          "value": ""
                        },
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "input_type": "14",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "14",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 7,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "6409b8cb235a2809db04c550",
                      "order": "6.009",
                      "answer_option": [],
                      "title": "Project Completion Date",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "completionDate",
                      "viewSequence": "29",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "input_type": "14",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "14",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "6",
                        "index": 8,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ]
                ],
                "title": "Project Details as on 31st March 2022",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "projectDetails_tableView_addButton",
                "viewSequence": "20",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097dfb3b2eb509dc61e581",
                "order": "6.001",
                "answer_option": [],
                "title": "Name of the Project",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "name",
                "viewSequence": "21",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "min": 1,
                "max": 50,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097e1e3b2eb509dc61e5ba",
                "order": "6.002",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  }
                ],
                "title": "Sector",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "category",
                "viewSequence": "22",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097e4f3b2eb509dc61e5f5",
                "order": "6.003",
                "answer_option": [],
                "title": "Latitude",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "lat",
                "viewSequence": "23",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097e5f3b2eb509dc61e632",
                "order": "6.004",
                "answer_option": [],
                "title": "Longitude",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "long",
                "viewSequence": "24",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "i = The total project cost is as per the DPR.",
                "_id": "64097e763b2eb509dc61e671",
                "order": "6.005",
                "answer_option": [],
                "title": "Total Project Cost (INR in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "cost",
                "viewSequence": "25",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "i = This is the outlay from 15th FC grant out of the total project cost. For Ex: If project total cost is 100 Cr, out of which 80 Cr is sourced from AMRUT 2.0, rest 20 Cr is sourced from 15th FC tied grants, then 20 Cr should be entered here. Please do not enter the expenditure incurred.",
                "_id": "64097e903b2eb509dc61e6b2",
                "order": "6.006",
                "answer_option": [],
                "title": "Amount of 15th FC Grants in Total Project Cost (INR in lakhs)",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "expenditure",
                "viewSequence": "26",
                "child": [],
                "parent": [],
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
                "maxRange": 9,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-8])(?:\\.\\d{1,3})?|9))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "64097eb23b2eb509dc61e6f5",
                "order": "6.007",
                "answer_option": [],
                "title": "% of 15th FC Grants in Total Project Cost",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "percProjectCost",
                "viewSequence": "27",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "minRange": null,
                "maxRange": null,
                "min": 1,
                "max": 3,
                "pattern": "",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "6409b860235a2809db04c501",
                "order": "6.008",
                "answer_option": [],
                "title": "Project Start Date",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "startDate",
                "viewSequence": "28",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "_id": "24",
                    "error_msg": "",
                    "value": ""
                  },
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "input_type": "14",
                "weightage": []
              },
              {
                "information": "",
                "_id": "6409b8cb235a2809db04c550",
                "order": "6.009",
                "answer_option": [],
                "title": "Project Completion Date",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "completionDate",
                "viewSequence": "29",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "input_type": "14",
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097f433b2eb509dc61e748",
                "order": "7",
                "answer_option": [
                  {
                    "name": "1",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "2",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  }
                ],
                childQuestionData: [
                  [
                    {
                      "information": "",
                      "_id": "64097f8f3b2eb509dc61e797",
                      "order": "7.001",
                      "answer_option": [],
                      "title": "Name",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "name_",
                      "viewSequence": "31",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "min": 1,
                      "max": 50,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "7",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    },
                    {
                      "information": "",
                      "_id": "64097fdc235a2809db049a34",
                      "order": "7.002",
                      "answer_option": [],
                      "title": "Designation",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "designation",
                      "viewSequence": "32",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [],
                      "min": 1,
                      "max": 50,
                      "input_type": "1",
                      "weightage": [],
                      "selectedValue": "",
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "7",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1
                    }
                  ]
                ],
                "title": "Self Declaration",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "selfDeclaration",
                "viewSequence": "30",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097f8f3b2eb509dc61e797",
                "order": "7.001",
                "answer_option": [],
                "title": "Name",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "name_",
                "viewSequence": "31",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "min": 1,
                "max": 50,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "",
                "_id": "64097fdc235a2809db049a34",
                "order": "7.002",
                "answer_option": [],
                "title": "Designation",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "designation",
                "viewSequence": "32",
                "child": [],
                "parent": [],
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "min": 1,
                "max": 50,
                "input_type": "1",
                "weightage": []
              },
              {
                "information": "",
                "_id": "6409bc56235a2809db04c7df",
                "order": "8",
                "answer_option": [
                  {
                    "name": "Agree",
                    "did": [],
                    "viewSequence": "1",
                    "_id": "1"
                  },
                  {
                    "name": "Disagree",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  }
                ],
                "title": "Certified that above information has been extracted from the relevent records being maintained with the ULB and is true to to best of my knowledge and belief",
                "hint": "",
                "resource_urls": [
                  {
                    "download": true,
                    "_id": "6409bc56235a2809db04c803",
                    "label": "",
                    "url": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/consent_70744cd4-922c-4a3a-bcdd-e03aa09786b9.txt"
                  }
                ],
                "label": "",
                "shortKey": "declaration",
                "viewSequence": "33",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "22",
                "editable": false,
                "weightage": []
              }
            ],
            "title": "DUR test",
            "buttons": []
          }
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  }

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onSubmitQuestion(data) {
    console.log(data)
  }


  onPreview(data) {
    let formdata = {
      status: "",
      isDraft: true,
      financialYear: "606aaf854dff55e6c075d219",
      designYear: "606aafb14dff55e6c075d3ae",
      grantType: "Tied",
      // ulb: this.userData?.ulb,
      // ...this.utilizationReportForm?.value,
      // categories: this.categories,
      grantPosition: {
        unUtilizedPrevYr: 10,
        receivedDuringYr: 10,
        expDuringYr: 10,
        closingBal: 10
      },
      name: 'nisahnt',
      designation: 'designation',
      categoryWiseData_wm: [
        {
          category_name: 'First wm',
          grantUtilised: '23',
          numberOfProjects: 30,
          totalProjectCost: 40
        },
        {
          category_name: 'second wm',
          grantUtilised: '40',
          numberOfProjects: 30,
          totalProjectCost: 40
        },
      ],
      categoryWiseData_swm: [
        {
          category_name: 'First swm',
          grantUtilised: '23',
          numberOfProjects: 30,
          totalProjectCost: 40
        },
        {
          category_name: 'second solid waste',
          grantUtilised: '40',
          numberOfProjects: 30,
          totalProjectCost: 40
        },
      ],
      projects: [
        {
          name: 'first',
          categoryName: 'category',
          location: {
            lat: '104',
            long: '20.23'
          },
          cost: 20,
          expenditure: 4
        }
      ]
    };
    const dialogRef = this.dialog.open(DurPreviewComponent, {
      data: formdata,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
}
