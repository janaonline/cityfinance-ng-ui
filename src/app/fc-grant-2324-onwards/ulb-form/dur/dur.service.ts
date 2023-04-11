import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const nestedKeys = {
  'grantPosition.unUtilizedPrevYr': 'grantPosition___unUtilizedPrevYr',
  'grantPosition.receivedDuringYr': 'grantPosition___receivedDuringYr',
  'grantPosition.expDuringYr': 'grantPosition___expDuringYr',
  'grantPosition.closingBal': 'grantPosition___closingBal',
}

const defaultProject = [
  [
    {
      "information": "",
      "_id": "64097dfb3b2eb509dc61e581",
      "order": "6.001",
      "answer_option": [],
      "title": "Name of the Project",
      "hint": "",
      "resource_urls": [],
      "label": "1",
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
      "forParentValue": 1,
      "isSelectValue": false,
      "previousValue": "",
      "modelValue": "",
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": ""
          }
        ],
        "input_type": "1",
        "nestedAnswer": [],
        "order": "6.001",
        "pattern": "",
        "shortKey": "name"
      }
    },
    {
      "information": "",
      "_id": "64097e1e3b2eb509dc61e5ba",
      "order": "6.002",
      "answer_option": [
        {
          "name": "Rejuvination of Water Bodies",
          "did": [],
          "viewSequence": "1",
          "_id": "1"
        },
        {
          "name": "Drinking Water",
          "did": [],
          "viewSequence": "2",
          "_id": "2"
        },
        {
          "name": "Rainwater Harvesting",
          "did": [],
          "viewSequence": "3",
          "_id": "3"
        },
        {
          "name": "Water Recycling",
          "did": [],
          "viewSequence": "4",
          "_id": "4"
        },
        {
          "name": "Sanitation",
          "did": [],
          "viewSequence": "5",
          "_id": "5"
        },
        {
          "name": "Solid Waste Management",
          "did": [],
          "viewSequence": "6",
          "_id": "6"
        }
      ],
      "title": "Sector",
      "hint": "",
      "resource_urls": [],
      "label": "2",
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
      "value": "2",
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
      "forParentValue": 1,
      "modelValue": "2",
      "isSelectValue": true,
      "previousValue": "2",
      "selectedValue": [
        {
          "label": "Drinking Water",
          "textValue": "",
          "value": "2"
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "Drinking Water",
            "textValue": "",
            "value": "2"
          }
        ],
        "input_type": "3",
        "nestedAnswer": [],
        "order": "6.002",
        "shortKey": "category"
      }
    },
    {
      "information": "",
      "_id": "6409b860235a2809db04c501",
      "order": "6.008",
      "answer_option": [],
      "title": "Project Start Date",
      "hint": "",
      "resource_urls": [],
      "label": "3",
      "shortKey": "startDate",
      "max": new Date().toISOString().slice(0, 10),
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
      "input_type": "14",
      "weightage": [],
      "value": "",
      "acceptableType": "",
      "acceptableFileType": "",
      "type": "14",
      "visibility": true,
      "nestedConfig": {
        "parentOrder": "6",
        "index": 2,
        "loopIndex": 0
      },
      "selectedAnswerOption": {
        "name": " 1"
      },
      "forParentValue": 1,
      "modelValue": "",
      "isSelectValue": false,
      "previousValue": "",
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": ""
          }
        ],
        "input_type": "14",
        "nestedAnswer": [],
        "order": "6.008",
        "shortKey": "startDate"
      }
    },
    {
      "information": "",
      "_id": "6409b8cb235a2809db04c550",
      "order": "6.009",
      "answer_option": [],
      "title": "Project Completion Date",
      "hint": "",
      "resource_urls": [],
      "label": "4",
      "shortKey": "completionDate",
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
      "input_type": "14",
      "weightage": [],
      "value": "",
      "acceptableType": "",
      "acceptableFileType": "",
      "type": "14",
      "visibility": true,
      "nestedConfig": {
        "parentOrder": "6",
        "index": 3,
        "loopIndex": 0
      },
      "selectedAnswerOption": {
        "name": " 1"
      },
      "forParentValue": 1,
      "modelValue": "",
      "isSelectValue": false,
      "previousValue": "",
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": ""
          }
        ],
        "input_type": "14",
        "nestedAnswer": [],
        "order": "6.009",
        "shortKey": "completionDate"
      }
    },
    {
      "information": "",
      "_id": "64194d9138d5190d4dcda08d",
      "order": "6.010",
      "answer_option": [],
      "title": "Location",
      "hint": "",
      "resource_urls": [],
      "label": "5",
      "shortKey": "location",
      "viewSequence": "25",
      "child": [],
      "parent": [],
      "min": null,
      "max": null,
      "minRange": null,
      "maxRange": null,
      "pattern": "",
      "validation": [],
      "restrictions": [],
      "input_type": "19",
      "weightage": [],
      "value": "",
      "acceptableType": "",
      "acceptableFileType": "",
      "type": "19",
      "visibility": true,
      "nestedConfig": {
        "parentOrder": "6",
        "index": 4,
        "loopIndex": 0
      },
      "selectedAnswerOption": {
        "name": " 1"
      },
      "forParentValue": 1,
      "isSelectValue": false,
      "previousValue": "",
      "modelValue": "0,0",
      "selectedValue": [
        {
          "label": "",
          "textValue": "0,0",
          "value": ""
        }
      ],
      "answer": {
        "answer": [],
        "input_type": "19",
        "nestedAnswer": [],
        "order": "6.010",
        "pattern": "",
        "shortKey": "location"
      }
    },
    {
      "information": "i = The total project cost is as per the DPR.",
      "_id": "64097e763b2eb509dc61e671",
      "order": "6.005",
      "answer_option": [],
      "title": "Total Project Cost (INR in lakhs)",
      "hint": "",
      "resource_urls": [],
      "label": "6",
      "shortKey": "cost",
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
      "maxRange": 999999,
      "min": 1,
      "max": 9,
      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
      "input_type": "2",
      "weightage": [],
      "valueHolder": "",
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
      "forParentValue": 1,
      "isSelectValue": false,
      "previousValue": "",
      "modelValue": "",
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": ""
          }
        ],
        "input_type": "2",
        "nestedAnswer": [],
        "order": "6.005",
        "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
        "shortKey": "cost"
      }
    },
    {
      "information": "i = This is the outlay from 15th FC grant out of the total project cost. For Ex: If project total cost is 100 Cr, out of which 80 Cr is sourced from AMRUT 2.0, rest 20 Cr is sourced from 15th FC tied grants, then 20 Cr should be entered here. Please do not enter the expenditure incurred.",
      "_id": "64097e903b2eb509dc61e6b2",
      "order": "6.006",
      "answer_option": [],
      "title": "Amount of 15th FC Grants in Total Project Cost (INR in lakhs)",
      "hint": "",
      "resource_urls": [],
      "label": "7",
      "shortKey": "expenditure",
      "viewSequence": "27",
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
      "maxRange": 999999,
      "min": 1,
      "max": 9,
      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
      "input_type": "2",
      "weightage": [],
      "valueHolder": "",
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
      "forParentValue": 1,
      "isSelectValue": false,
      "previousValue": "",
      "modelValue": "",
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": ""
          }
        ],
        "input_type": "2",
        "nestedAnswer": [],
        "order": "6.006",
        "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
        "shortKey": "expenditure"
      }
    },
    {
      "information": "",
      "_id": "64097eb23b2eb509dc61e6f5",
      "order": "6.007",
      "answer_option": [],
      "title": "% of 15th FC Grants in Total Project Cost",
      "hint": "",
      "resource_urls": [],
      "label": "8",
      "shortKey": "percProjectCost",
      "viewSequence": "28",
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
          "value": "((expenditure/cost)*100)"
        },
        {
          "error_msg": "",
          "_id": "2"
        }
      ],
      "restrictions": [],
      "isQuestionDisabled": true,
      "minRange": 0,
      "maxRange": 100,
      "min": 1,
      "max": 3,
      "pattern": "^((?:[0-9]|[1-9][0-9]|100))$",
      "input_type": "2",
      "weightage": [],
      "valueHolder": "",
      "value": "",
      "acceptableType": "",
      "acceptableFileType": "",
      "type": "2",
      "visibility": true,
      "nestedConfig": {
        "parentOrder": "6",
        "index": 7,
        "loopIndex": 0
      },
      "selectedAnswerOption": {
        "name": " 1"
      },
      "forParentValue": 1,
      "selectedValue": [
        {
          "label": "",
          "textValue": "",
          "value": ""
        }
      ],
      "modelValue": "",
      "answer": {
        "answer": [
          {
            "label": "",
            "textValue": "",
            "value": 0
          }
        ],
        "input_type": "2",
        "nestedAnswer": [],
        "order": "6.007",
        "pattern": "^((?:[0-9]|[1-9][0-9]|100))$",
        "shortKey": "percProjectCost"
      }
    }
  ]
];

const staticResponse = {
  "success": true,
  "data": [
      {
          "_id": "64339cc47135c256abbe9555",
          "formId": "4",
          "language": [
              {
                  "_id": "",
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
                          "title": "General",
                          "hint": "",
                          "resource_urls": [],
                          "label": "1",
                          "shortKey": "general",
                          "value": "1",
                          "modelValue": "1",
                          "childQuestionData": [
                              [
                                  {
                                      "information": "",
                                      "_id": "6405de27927e4f093c8acc63",
                                      "order": "1.001",
                                      "answer_option": [],
                                      "title": "Name of MPC/UA/NMPC*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "ulbName",
                                      "viewSequence": "2",
                                      "isQuestionDisabled": true,
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
                                      "weightage": [],
                                      "value": "Moga Municipal Corporation",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "Moga Municipal Corporation",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Moga Municipal Corporation",
                                              "value": "Moga Municipal Corporation"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Moga Municipal Corporation",
                                                  "value": "Moga Municipal Corporation"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "6405deda927e4f093c8acca1",
                                      "order": "1.002",
                                      "isQuestionDisabled": true,
                                      "answer_option": [],
                                      "title": "Type of Grant*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
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
                                      "input_type": "1",
                                      "weightage": [],
                                      "value": "Tied",
                                      "acceptableType": "",
                                      "acceptableFileType": "",
                                      "type": "1",
                                      "visibility": true,
                                      "nestedConfig": {
                                          "parentOrder": "1",
                                          "index": 1,
                                          "loopIndex": 0
                                      },
                                      "selectedAnswerOption": {
                                          "name": "1"
                                      },
                                      "forParentValue": 1,
                                      "modelValue": "Tied",
                                      "isSelectValue": false,
                                      "previousValue": "Tied",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Tied",
                                              "value": "Tied"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Tied",
                                                  "value": "Tied"
                                              }
                                          ]
                                      }
                                  }
                              ]
                          ],
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
                          "weightage": [],
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "6405de27927e4f093c8acc63",
                          "order": "1.001",
                          "answer_option": [],
                          "title": "Name of MPC/UA/NMPC*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "1",
                          "shortKey": "ulbName",
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
                          "weightage": [],
                          "modelValue": "Moga Municipal Corporation",
                          "value": "Moga Municipal Corporation",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "Moga Municipal Corporation",
                                  "value": "Moga Municipal Corporation"
                              }
                          ]
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
                          "title": "Type of Grant*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
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
                          "weightage": [],
                          "modelValue": "1",
                          "value": "1",
                          "selectedAnswerOption": {
                              "name": "1"
                          },
                          "selectedValue": [
                              {
                                  "label": "Tied",
                                  "textValue": "",
                                  "value": "1"
                              }
                          ]
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
                              }
                          ],
                          "title": "15th FC Tied Grant Status for the Financial Year 2022-23*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
                          "shortKey": "grantPosition",
                          "viewSequence": "4",
                          "child": [],
                          "parent": [],
                          "validation": [],
                          "restrictions": [],
                          "input_type": "20",
                          "editable": false,
                          "weightage": [],
                          "value": "1",
                          "modelValue": "1",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ],
                          "childQuestionData": [
                              [
                                  {
                                      "information": "i = Please enter the balance amount brought forward from the previous instalment.",
                                      "_id": "64097a583b2eb509dc61e2a7",
                                      "order": "2.005",
                                      "answer_option": [],
                                      "title": "i. Unutilised Tied Grants from previous installment (in lakhs)*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "isQuestionDisabled": true,
                                      "shortKey": "grantPosition.unUtilizedPrevYr",
                                      "viewSequence": "5",
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
                                              "error_msg": "",
                                              "_id": "2"
                                          },
                                          {
                                              "_id": "14",
                                              "error_msg": "",
                                              "value": "0.000"
                                          }
                                      ],
                                      "restrictions": [],
                                      "minRange": 0,
                                      "maxRange": 999999999999999,
                                      "min": 1,
                                      "max": 19,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
                                      "value": "206.14",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "206.14",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "206.14",
                                              "value": "206.14"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "206.14",
                                                  "value": "206.14"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "i = In case, the second installment for FY 2022-23 is received in the next financial year, ie. FY 2023-24, please write the full amount with respect to allocated grant for FY 2022-23.",
                                      "_id": "6405e01b927e4f093c8acd05",
                                      "order": "2.002",
                                      "answer_option": [],
                                      "title": "ii. 15th F.C. Tied grant received for the year (1st & 2nd installment taken together) (in lakhs)*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "grantPosition.receivedDuringYr",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "i = The total expenditure in the component wise grants must not exceed the amount of expenditure incurred during the year",
                                      "_id": "6405e03f927e4f093c8acd20",
                                      "order": "2.003",
                                      "answer_option": [],
                                      "title": "iii. Expenditure incurred during the year i.e. as on 31st march 2023 from Tied grant (in lakhs)*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "grantPosition.expDuringYr",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "i = Closing balance is negative because Expenditure amount is greater than total tied grants amount available. Please recheck the amounts entered.",
                                      "_id": "640979f13b2eb509dc61e1bd",
                                      "order": "2.004",
                                      "answer_option": [],
                                      "title": "Closing balance at the end of year (in lakhs)( i + ii - iii )*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "grantPosition.closingBal",
                                      "isQuestionDisabled": true,
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
                                              "error_msg": "",
                                              "_id": "2"
                                          },
                                          {
                                              "_id": "5",
                                              "error_msg": "",
                                              "value": "(grantPosition.unUtilizedPrevYr+grantPosition.receivedDuringYr-grantPosition.expDuringYr)"
                                          },
                                          {
                                              "_id": "14",
                                              "error_msg": "",
                                              "value": "0.00"
                                          }
                                      ],
                                      "restrictions": [],
                                      "minRange": 0,
                                      "maxRange": 999999999999999,
                                      "min": 1,
                                      "max": 18,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
                                      "value": "206.14",
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
                                      "forParentValue": 1,
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "206.14",
                                              "value": "206.14"
                                          }
                                      ],
                                      "modelValue": "206.14",
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "206.14",
                                                  "value": "206.14"
                                              }
                                          ]
                                      }
                                  }
                              ]
                          ]
                      },
                      {
                          "information": "i = In case, the second installment for FY 2022-23 is received in the next financial year, ie. FY 2023-24, please write the full amount with respect to allocated grant for FY 2022-23.",
                          "_id": "6405e01b927e4f093c8acd05",
                          "order": "2.002",
                          "answer_option": [],
                          "title": "ii. 15th F.C. Tied grant received for the year (1st & 2nd installment taken together) (in lakhs)*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
                          "shortKey": "grantPosition.receivedDuringYr",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "i = The total expenditure in the component wise grants must not exceed the amount of expenditure incurred during the year",
                          "_id": "6405e03f927e4f093c8acd20",
                          "order": "2.003",
                          "answer_option": [],
                          "title": "iii. Expenditure incurred during the year i.e. as on 31st march 2023 from Tied grant (in lakhs)*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "3",
                          "shortKey": "grantPosition.expDuringYr",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "i = Closing balance is negative because Expenditure amount is greater than total tied grants amount available. Please recheck the amounts entered.",
                          "_id": "640979f13b2eb509dc61e1bd",
                          "order": "2.004",
                          "answer_option": [],
                          "title": "Closing balance at the end of year (in lakhs)( i + ii - iii )*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "4",
                          "shortKey": "grantPosition.closingBal",
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
                                  "error_msg": "",
                                  "_id": "2"
                              },
                              {
                                  "_id": "5",
                                  "error_msg": "",
                                  "value": "(grantPosition.unUtilizedPrevYr+grantPosition.receivedDuringYr-grantPosition.expDuringYr)"
                              },
                              {
                                  "_id": "14",
                                  "error_msg": "",
                                  "value": "0.00"
                              }
                          ],
                          "restrictions": [],
                          "minRange": 0,
                          "maxRange": 999999999999999,
                          "min": 1,
                          "max": 18,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "206.14",
                          "value": "206.14",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "206.14",
                                  "value": "206.14"
                              }
                          ]
                      },
                      {
                          "information": "i = Please enter the balance amount brought forward from the previous instalment.",
                          "_id": "64097a583b2eb509dc61e2a7",
                          "order": "2.005",
                          "answer_option": [],
                          "title": "i. Unutilised Tied Grants from previous installment (in lakhs)*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "1",
                          "shortKey": "grantPosition.unUtilizedPrevYr",
                          "viewSequence": "5",
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
                                  "error_msg": "",
                                  "_id": "2"
                              },
                              {
                                  "_id": "14",
                                  "error_msg": "",
                                  "value": "0.000"
                              }
                          ],
                          "restrictions": [],
                          "minRange": 0,
                          "maxRange": 999999999999999,
                          "min": 1,
                          "max": 19,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,13}|[1-8][0-9]{14}|9[0-8][0-9]{13}|99[0-8][0-9]{12}|999[0-8][0-9]{11}|9999[0-8][0-9]{10}|99999[0-8][0-9]{9}|999999[0-8][0-9]{8}|9999999[0-8][0-9]{7}|99999999[0-8][0-9]{6}|999999999[0-8][0-9]{5}|9999999999[0-8][0-9]{4}|99999999999[0-8][0-9]{3}|999999999999[0-8][0-9]{2}|9999999999999[0-8][0-9]|99999999999999[0-8]))(?:\\.\\d{1,3})?|999999999999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "206.14",
                          "value": "206.14",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "206.14",
                                  "value": "206.14"
                              }
                          ]
                      },
                      {
                          "information": "i = Information regarding utilization of the tied grants during the year, i.e. on 31st March 2023 has to be filled.",
                          "_id": "6405e151927e4f093c8acd96",
                          "order": "3",
                          "answer_option": [],
                          "title": "Component Wise Utilisation of Tied grants as on 31st march 2023*",
                          "hint": "",
                          "resource_urls": [],
                          "label": "",
                          "shortKey": "grantUtilizedHeader",
                          "viewSequence": "9",
                          "child": [],
                          "parent": [],
                          "validation": [],
                          "restrictions": [],
                          "input_type": "10",
                          "editable": false,
                          "weightage": [],
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "6405e188927e4f093c8acdb2",
                          "order": "4",
                          "answer_option": [
                              {
                                  "name": "4",
                                  "did": [],
                                  "viewSequence": "1",
                                  "_id": "4"
                              }
                          ],
                          "title": "Water Management (WM)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "3",
                          "shortKey": "waterManagement_tableView",
                          "lastRow": [
                              "Total",
                              "$sum",
                              "$sum",
                              "$sum"
                          ],
                          "tableHeaders": [
                              {
                                  "label": "Sector"
                              },
                              {
                                  "label": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                                  "information": "i = Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled."
                              },
                              {
                                  "label": "Number of Projects Undertaken"
                              },
                              {
                                  "label": "Total Project Cost Involved(INR in lakhs)",
                                  "information": "i = The Total Project cost for all projects combined, As per DPR, to be metioned. For Ex: If there are two projects. one for 100 Cr and another for 50 Cr, then combined cost i.e. will be entered in the total project cost."
                              }
                          ],
                          "value": "4",
                          "modelValue": "4",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ],
                          "childQuestionData": [
                              [
                                  {
                                      "information": "",
                                      "_id": "64199971a3236a0d4e38da61",
                                      "order": "4.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "wm_category_name",
                                      "isQuestionDisabled": true,
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
                                      "previousValue": "water",
                                      "modelValue": "Rejuvenation of Water Bodies",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Rejuvenation of Water Bodies",
                                              "value": "Rejuvenation of Water Bodies"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Rejuvenation of Water Bodies",
                                                  "value": "Rejuvenation of Water Bodies"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b293b2eb509dc61e3b0",
                                      "order": "4.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2022",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "wm_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b4b3b2eb509dc61e3df",
                                      "order": "4.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "wm_numberOfProjects",
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
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b783b2eb509dc61e410",
                                      "order": "4.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "wm_totalProjectCost",
                                      "viewSequence": "14",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  }
                              ],
                              [
                                  {
                                      "information": "",
                                      "_id": "64199971a3236a0d4e38da61",
                                      "order": "4.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "wm_category_name",
                                      "isQuestionDisabled": true,
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
                                      "previousValue": "satasion",
                                      "modelValue": "Drinking Water",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Drinking Water",
                                              "value": "Drinking Water"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Drinking Water",
                                                  "value": "Drinking Water"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b293b2eb509dc61e3b0",
                                      "order": "4.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "wm_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b4b3b2eb509dc61e3df",
                                      "order": "4.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "wm_numberOfProjects",
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
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b783b2eb509dc61e410",
                                      "order": "4.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "wm_totalProjectCost",
                                      "viewSequence": "14",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  }
                              ],
                              [
                                  {
                                      "information": "",
                                      "_id": "64199971a3236a0d4e38da61",
                                      "order": "4.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "wm_category_name",
                                      "isQuestionDisabled": true,
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
                                      "modelValue": "Rainwater Harvesting",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Rainwater Harvesting",
                                              "value": "Rainwater Harvesting"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Rainwater Harvesting",
                                                  "value": "Rainwater Harvesting"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b293b2eb509dc61e3b0",
                                      "order": "4.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "wm_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 3,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b4b3b2eb509dc61e3df",
                                      "order": "4.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "wm_numberOfProjects",
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
                                      "valueHolder": "",
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
                                      "forParentValue": 3,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b783b2eb509dc61e410",
                                      "order": "4.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "wm_totalProjectCost",
                                      "viewSequence": "14",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 3,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  }
                              ],
                              [
                                  {
                                      "information": "",
                                      "_id": "64199971a3236a0d4e38da61",
                                      "order": "4.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "wm_category_name",
                                      "isQuestionDisabled": true,
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
                                      "modelValue": "Water Recycling",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Water Recycling",
                                              "value": "Water Recycling"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Water Recycling",
                                                  "value": "Water Recycling"
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b293b2eb509dc61e3b0",
                                      "order": "4.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "wm_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 4,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b4b3b2eb509dc61e3df",
                                      "order": "4.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "wm_numberOfProjects",
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
                                      "valueHolder": "",
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
                                      "forParentValue": 4,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097b783b2eb509dc61e410",
                                      "order": "4.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "wm_totalProjectCost",
                                      "viewSequence": "14",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 4,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      }
                                  }
                              ]
                          ],
                          "viewSequence": "10",
                          "child": [],
                          "parent": [],
                          "validation": [
                              {
                                  "error_msg": "",
                                  "_id": "1"
                              }
                          ],
                          "restrictions": [],
                          "input_type": "20",
                          "editable": false,
                          "weightage": []
                      },
                      {
                          "information": "",
                          "_id": "64097b293b2eb509dc61e3b0",
                          "order": "4.002",
                          "answer_option": [],
                          "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
                          "shortKey": "wm_grantUtilised",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097b4b3b2eb509dc61e3df",
                          "order": "4.003",
                          "answer_option": [],
                          "title": "Number of Projects Undertaken",
                          "hint": "",
                          "resource_urls": [],
                          "label": "3",
                          "shortKey": "wm_numberOfProjects",
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
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097b783b2eb509dc61e410",
                          "order": "4.004",
                          "answer_option": [],
                          "title": "Total Project Cost Involved(INR in lakhs)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "4",
                          "shortKey": "wm_totalProjectCost",
                          "viewSequence": "14",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64199971a3236a0d4e38da61",
                          "order": "4.005",
                          "answer_option": [],
                          "title": "Sector",
                          "hint": "",
                          "resource_urls": [],
                          "label": "1",
                          "shortKey": "wm_category_name",
                          "isQuestionDisabled": true,
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
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "6405e3442638a6093d1b696d",
                          "order": "5",
                          "answer_option": [
                              {
                                  "name": "2",
                                  "did": [],
                                  "viewSequence": "1",
                                  "_id": "2"
                              }
                          ],
                          "title": "Solid Waste Management (SWM)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "",
                          "shortKey": "solidWasteManagement_tableView",
                          "lastRow": [
                              "Total",
                              "$sum",
                              "$sum",
                              "$sum"
                          ],
                          "tableHeaders": [
                              {
                                  "label": "Sector"
                              },
                              {
                                  "label": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                                  "information": "i = Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled."
                              },
                              {
                                  "label": "Number of Projects Undertaken"
                              },
                              {
                                  "label": "Total Project Cost Involved(INR in lakhs)",
                                  "information": "i = The Total Project cost for all projects combined, As per DPR, to be metioned. For Ex: If there are two projects. one for 100 Cr and another for 50 Cr, then combined cost i.e. will be entered in the total project cost."
                              }
                          ],
                          "value": "2",
                          "modelValue": "2",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ],
                          "childQuestionData": [
                              [
                                  {
                                      "information": "",
                                      "_id": "641999a8a3236a0d4e38db4d",
                                      "order": "5.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "sw_category_name",
                                      "isQuestionDisabled": true,
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
                                      "value": "Sanitation",
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
                                      "modelValue": "Sanitation",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Sanitation",
                                              "value": "Sanitation"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Sanitation",
                                                  "value": "Sanitation"
                                              }
                                          ],
                                          "input_type": "1",
                                          "nestedAnswer": [],
                                          "order": "5.005",
                                          "pattern": "",
                                          "shortKey": "sw_category_name"
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097bd43b2eb509dc61e495",
                                      "order": "5.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "sw_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.002",
                                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                          "shortKey": "sw_grantUtilised"
                                      },
                                      "isQuestionDisabled": false
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097be53b2eb509dc61e4c6",
                                      "order": "5.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "sw_numberOfProjects",
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
                                      "maxRange": 999,
                                      "min": 1,
                                      "max": 3,
                                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.003",
                                          "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                                          "shortKey": "sw_numberOfProjects"
                                      },
                                      "isQuestionDisabled": false
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097bf83b2eb509dc61e4f9",
                                      "order": "5.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "sw_totalProjectCost",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 1,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.004",
                                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                          "shortKey": "sw_totalProjectCost"
                                      },
                                      "isQuestionDisabled": false
                                  }
                              ],
                              [
                                  {
                                      "information": "",
                                      "_id": "641999a8a3236a0d4e38db4d",
                                      "order": "5.005",
                                      "answer_option": [],
                                      "title": "Sector",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "sw_category_name",
                                      "isQuestionDisabled": true,
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
                                      "value": "Solid Waste Management",
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
                                      "modelValue": "Solid Waste Management",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "Solid Waste Management",
                                              "value": "Solid Waste Management"
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "Solid Waste Management",
                                                  "value": "Solid Waste Management"
                                              }
                                          ],
                                          "input_type": "1",
                                          "nestedAnswer": [],
                                          "order": "5.005",
                                          "pattern": "",
                                          "shortKey": "sw_category_name"
                                      }
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097bd43b2eb509dc61e495",
                                      "order": "5.002",
                                      "answer_option": [],
                                      "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "sw_grantUtilised",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.002",
                                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                          "shortKey": "sw_grantUtilised"
                                      },
                                      "isQuestionDisabled": false
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097be53b2eb509dc61e4c6",
                                      "order": "5.003",
                                      "answer_option": [],
                                      "title": "Number of Projects Undertaken",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "3",
                                      "shortKey": "sw_numberOfProjects",
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
                                      "maxRange": 999,
                                      "min": 1,
                                      "max": 3,
                                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.003",
                                          "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                                          "shortKey": "sw_numberOfProjects"
                                      },
                                      "isQuestionDisabled": false
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097bf83b2eb509dc61e4f9",
                                      "order": "5.004",
                                      "answer_option": [],
                                      "title": "Total Project Cost Involved(INR in lakhs)",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "4",
                                      "shortKey": "sw_totalProjectCost",
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
                                      "maxRange": 999999,
                                      "min": 1,
                                      "max": 9,
                                      "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                      "input_type": "2",
                                      "weightage": [],
                                      "valueHolder": "",
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
                                      "forParentValue": 2,
                                      "isSelectValue": false,
                                      "previousValue": "",
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ],
                                          "input_type": "2",
                                          "nestedAnswer": [],
                                          "order": "5.004",
                                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                                          "shortKey": "sw_totalProjectCost"
                                      },
                                      "isQuestionDisabled": false
                                  }
                              ]
                          ],
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
                          "_id": "64097bd43b2eb509dc61e495",
                          "order": "5.002",
                          "answer_option": [],
                          "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2022",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
                          "shortKey": "sw_grantUtilised",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097be53b2eb509dc61e4c6",
                          "order": "5.003",
                          "answer_option": [],
                          "title": "Number of Projects Undertaken",
                          "hint": "",
                          "resource_urls": [],
                          "label": "3",
                          "shortKey": "sw_numberOfProjects",
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
                          "maxRange": 999,
                          "min": 1,
                          "max": 3,
                          "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097bf83b2eb509dc61e4f9",
                          "order": "5.004",
                          "answer_option": [],
                          "title": "Total Project Cost Involved(INR in lakhs)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "4",
                          "shortKey": "sw_totalProjectCost",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "641999a8a3236a0d4e38db4d",
                          "order": "5.005",
                          "answer_option": [],
                          "title": "Sector",
                          "hint": "",
                          "resource_urls": [],
                          "label": "1",
                          "shortKey": "sw_category_name",
                          "isQuestionDisabled": true,
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
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "i = In the below table, the project details have to be filled in by the ULBs as on 31st March 2023.",
                          "_id": "64097dcc3b2eb509dc61e550",
                          "order": "6",
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
                          "title": "Project Details as on 31st March 2023",
                          "hint": "",
                          "resource_urls": [],
                          "label": "4",
                          "shortKey": "projectDetails_tableView_addButton",
                          "lastRow": [
                              "Total",
                              "",
                              "",
                              "",
                              "",
                              "$sum",
                              "$sum",
                              "",
                              ""
                          ],
                          "tableHeaders": [
                              {
                                  "label": "Name of the Project"
                              },
                              {
                                  "label": "Sector"
                              },
                              {
                                  "label": "Project Start Date"
                              },
                              {
                                  "label": "Project Completion Date"
                              },
                              {
                                  "label": "Location"
                              },
                              {
                                  "label": "Total Project Cost (INR in lakhs)",
                                  "information": "i = The total project cost is as per the DPR."
                              },
                              {
                                  "label": "Amount of 15th FC Grants in Total Project Cost (INR in lakhs)",
                                  "information": "i = This is the outlay from 15th FC grant out of the total project cost. For Ex: If project total cost is 100 Cr, out of which 80 Cr is sourced from AMRUT 2.0, rest 20 Cr is sourced from 15th FC tied grants, then 20 Cr should be entered here. Please do not enter the expenditure incurred."
                              },
                              {
                                  "label": "% of 15th FC Grants in Total Project Cost"
                              }
                          ],
                          "viewSequence": "20",
                          "child": [],
                          "childQuestionData": [],
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ],
                          "value": "2",
                          "modelValue": "2",
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
                          "label": "1",
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
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097e1e3b2eb509dc61e5ba",
                          "order": "6.002",
                          "answer_option": [
                              {
                                  "name": "Rejuvination of Water Bodies",
                                  "did": [],
                                  "viewSequence": "1",
                                  "_id": "1"
                              },
                              {
                                  "name": "Drinking Water",
                                  "did": [],
                                  "viewSequence": "2",
                                  "_id": "2"
                              },
                              {
                                  "name": "Rainwater Harvesting",
                                  "did": [],
                                  "viewSequence": "3",
                                  "_id": "3"
                              },
                              {
                                  "name": "Water Recycling",
                                  "did": [],
                                  "viewSequence": "4",
                                  "_id": "4"
                              },
                              {
                                  "name": "Sanitation",
                                  "did": [],
                                  "viewSequence": "5",
                                  "_id": "5"
                              },
                              {
                                  "name": "Solid Waste Management",
                                  "did": [],
                                  "viewSequence": "6",
                                  "_id": "6"
                              }
                          ],
                          "title": "Sector",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
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
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097e763b2eb509dc61e671",
                          "order": "6.005",
                          "answer_option": [],
                          "title": "Total Project Cost (INR in lakhs)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "6",
                          "shortKey": "cost",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097e903b2eb509dc61e6b2",
                          "order": "6.006",
                          "answer_option": [],
                          "title": "Amount of 15th FC Grants in Total Project Cost (INR in lakhs)",
                          "hint": "",
                          "resource_urls": [],
                          "label": "7",
                          "shortKey": "expenditure",
                          "viewSequence": "27",
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
                          "maxRange": 999999,
                          "min": 1,
                          "max": 9,
                          "pattern": "^((?:^((?:[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097eb23b2eb509dc61e6f5",
                          "order": "6.007",
                          "answer_option": [],
                          "title": "% of 15th FC Grants in Total Project Cost",
                          "hint": "",
                          "resource_urls": [],
                          "label": "8",
                          "shortKey": "percProjectCost",
                          "viewSequence": "28",
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
                                  "value": "((expenditure/cost)*100)"
                              },
                              {
                                  "error_msg": "",
                                  "_id": "2"
                              }
                          ],
                          "restrictions": [],
                          "minRange": 0,
                          "maxRange": 100,
                          "min": 1,
                          "max": 3,
                          "pattern": "^((?:[0-9]|[1-9][0-9]|100))$",
                          "input_type": "2",
                          "weightage": [],
                          "valueHolder": "",
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "6409b860235a2809db04c501",
                          "order": "6.008",
                          "answer_option": [],
                          "title": "Project Start Date",
                          "hint": "",
                          "resource_urls": [],
                          "label": "3",
                          "shortKey": "startDate",
                          "viewSequence": "23",
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
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "6409b8cb235a2809db04c550",
                          "order": "6.009",
                          "answer_option": [],
                          "title": "Project Completion Date",
                          "hint": "",
                          "resource_urls": [],
                          "label": "4",
                          "shortKey": "completionDate",
                          "viewSequence": "24",
                          "child": [],
                          "parent": [],
                          "validation": [
                              {
                                  "error_msg": "",
                                  "_id": "1"
                              },
                              {
                                  "_id": "24",
                                  "error_msg": "",
                                  "value": ""
                              }
                          ],
                          "restrictions": [],
                          "input_type": "14",
                          "weightage": [],
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64194d9138d5190d4dcda08d",
                          "order": "6.010",
                          "answer_option": [],
                          "title": "Location",
                          "hint": "",
                          "resource_urls": [],
                          "label": "5",
                          "shortKey": "location",
                          "viewSequence": "25",
                          "child": [],
                          "parent": [],
                          "min": null,
                          "max": null,
                          "minRange": null,
                          "maxRange": null,
                          "pattern": "",
                          "validation": [],
                          "restrictions": [],
                          "input_type": "19",
                          "weightage": [],
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
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
                          "title": "Self Declaration",
                          "hint": "",
                          "resource_urls": [],
                          "label": "5",
                          "shortKey": "selfDec",
                          "value": "1",
                          "modelValue": "1",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ],
                          "childQuestionData": [
                              [
                                  {
                                      "information": "",
                                      "_id": "64097f8f3b2eb509dc61e797",
                                      "order": "7.001",
                                      "answer_option": [],
                                      "title": "Name*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "1",
                                      "shortKey": "name_",
                                      "viewSequence": "30",
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
                                      "forParentValue": 1,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      },
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false
                                  },
                                  {
                                      "information": "",
                                      "_id": "64097fdc235a2809db049a34",
                                      "order": "7.002",
                                      "answer_option": [],
                                      "title": "Designation*",
                                      "hint": "",
                                      "resource_urls": [],
                                      "label": "2",
                                      "shortKey": "designation",
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
                                      "forParentValue": 1,
                                      "answer": {
                                          "answer": [
                                              {
                                                  "label": "",
                                                  "textValue": "",
                                                  "value": ""
                                              }
                                          ]
                                      },
                                      "modelValue": "",
                                      "selectedValue": [
                                          {
                                              "label": "",
                                              "textValue": "",
                                              "value": ""
                                          }
                                      ],
                                      "isQuestionDisabled": false
                                  }
                              ]
                          ],
                          "viewSequence": "29",
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
                          "label": "1",
                          "shortKey": "name_",
                          "viewSequence": "30",
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
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
                      },
                      {
                          "information": "",
                          "_id": "64097fdc235a2809db049a34",
                          "order": "7.002",
                          "answer_option": [],
                          "title": "",
                          "hint": "",
                          "resource_urls": [],
                          "label": "2",
                          "shortKey": "designation",
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
                          "modelValue": "",
                          "value": "",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "",
                                  "value": ""
                              }
                          ]
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
                          "title": " \"Certified that above information has been extracted from the relevent records being maintained with the ULB and is true to to best of my knowledge and belief\"",
                          "hint": "",
                          "resource_urls": [
                              {
                                  "download": true,
                                  "_id": "6409bc56235a2809db04c803",
                                  "label": "",
                                  "url": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/consent_70744cd4-922c-4a3a-bcdd-e03aa09786b9.txt"
                              }
                          ],
                          "label": "6",
                          "shortKey": "declaration",
                          "viewSequence": "32",
                          "child": [],
                          "parent": [],
                          "validation": [],
                          "restrictions": [],
                          "input_type": "22",
                          "editable": false,
                          "weightage": [],
                          "modelValue": "2",
                          "value": "2",
                          "selectedValue": [
                              {
                                  "label": "",
                                  "textValue": "Disagree",
                                  "value": "2"
                              }
                          ]
                      }
                  ],
                  "title": "DUR",
                  "buttons": [],
                  "createdAt": "",
                  "modifiedAt": "",
                  "actionTakenByRole": null,
                  "actionTakenBy": "",
                  "ulb": "",
                  "design_year": "",
                  "isDraft": true
              }
          ],
          "canTakeAction": false,
          "isDraft": true,
          "status": "Not Started"
      }
  ],
  "message": "Form Questionare!"
};

const mFormConverter = (type: 'encode' | 'decode', json: any) => {
  let stringifyReponse: string = JSON.stringify(json);
  Object.entries(nestedKeys).forEach(([key, value]) => {
    stringifyReponse = stringifyReponse
      .replaceAll(type === 'encode' ? key : value, type === 'encode' ? value : key);
  })
  return JSON.parse(stringifyReponse);
}
@Injectable({
  providedIn: 'root'
})
export class DurService {


  constructor(
    private http: HttpClient
  ) { }

  getForm(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}/utilReport?ulb=${ulb}&design_year=${design_year}&formId=4`)
      .pipe(
        map((response: any) => {
          console.log('orignalResponse', response)
          return mFormConverter('encode', response);
        })
      );
  }
  getProjects(ulb: string, design_year: string, isDraft) {
    return this.http.get(`${environment.api.url}/getProjects?ulb=${ulb}&design_year=${design_year}&formId=4`)
      .pipe(
        map((response: any) => {
          if (response.data?.length === 0 && isDraft != false) {
            response.data = [...defaultProject];
          }
          return response;
        })
      );
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/utilization-report`, mFormConverter('decode', body));
  }
}
