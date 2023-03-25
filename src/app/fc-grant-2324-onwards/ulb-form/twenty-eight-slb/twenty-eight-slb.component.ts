import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const swal: SweetAlert = require("sweetalert");

import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';

// import { DurPreviewComponent } from './dur-preview/dur-preview.component';
import { TwentyEightSlbService } from './twenty-eight-slb.service';

@Component({
  selector: 'app-twenty-eight-slb',
  templateUrl: './twenty-eight-slb.component.html',
  styleUrls: ['./twenty-eight-slb.component.scss']
})
export class TwentyEightSlbComponent implements OnInit {
  @ViewChild('webForm') webForm;

  isLoaded: boolean = false;
  isProjectLoaded: boolean = false;
  formId = '6';

  userData = JSON.parse(localStorage.getItem("userData"));

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
            "_id": "641eafb2cc09cd11d2104b54",
            "lng": "en",
            "question": [
              {
                "information": "",
                "_id": "641d81cf775541116f87c939",
                "order": "1",
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
                "title": "Water Supply",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_tableView",
                "viewSequence": "1",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": [],
                "isQuestionDisabled": false,
                "value": "2",
                "acceptableType": "",
                "acceptableFileType": "",
                "type": "20",
                "visibility": true,
                "childQuestions": [
                  {
                    "information": "",
                    "_id": "641eae1acc09cd11d2104974",
                    "order": "1.001",
                    "answer_option": [],
                    "title": "Question",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_question",
                    "viewSequence": "2",
                    "child": [],
                    "parent": [],
                    "validation": [],
                    "restrictions": [],
                    "input_type": "29",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "29",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 0,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641eae91e6aa5311d3f1e1d2",
                    "order": "1.002",
                    "answer_option": [],
                    "title": "Actual Indicator 2021-22",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_actualIndicator",
                    "viewSequence": "3",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 1,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641eaf0be6aa5311d3f1e285",
                    "order": "1.003",
                    "answer_option": [],
                    "title": "Target Indicator 2022-23",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_targetIndicator",
                    "viewSequence": "4",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "error_msg": "",
                        "_id": "1"
                      }
                    ],
                    "restrictions": [
                      {
                        "_id": "641eaf0ce6aa5311d3f1e2a6",
                        "orders": [
                          {
                            "_id": "641eaf0ce6aa5311d3f1e2a7",
                            "order": "1.002",
                            "value": ""
                          }
                        ],
                        "type": "3"
                      }
                    ],
                    "minRange": null,
                    "maxRange": null,
                    "min": 1,
                    "max": 3,
                    "pattern": "",
                    "input_type": "2",
                    "weightage": [],
                    "valueHolder": "",
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 2,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641eaf5de6aa5311d3f1e31a",
                    "order": "1.004",
                    "answer_option": [],
                    "title": "Indicator LineItem",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_indicatorLineItem",
                    "viewSequence": "5",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 3,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641eaf88e6aa5311d3f1e367",
                    "order": "1.005",
                    "answer_option": [],
                    "title": "Unit",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_unit",
                    "viewSequence": "6",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 4,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641eafb2cc09cd11d2104b52",
                    "answer_option": [],
                    "title": "Type",
                    "hint": "",
                    "order": "1.006",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "waterSupply_type",
                    "viewSequence": "7",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "1",
                      "index": 5,
                      "loopIndex": 0
                    }
                  }
                ],
                "nestedData": {},
                "required": false,
                "width": "50",
                "modelValue": "2",
                "isSelectValue": false,
                "previousValue": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641eae1acc09cd11d2104974",
                      "order": "1.001",
                      "answer_option": [],
                      "title": "Question",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_question",
                      "viewSequence": "2",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
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
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "1.001",
                        "shortKey": "waterSupply_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eae91e6aa5311d3f1e1d2",
                      "order": "1.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_actualIndicator",
                      "viewSequence": "3",
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
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "50",
                      "modelValue": "",
                      "selectedValue": [],
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
                        "order": "1.002",
                        "pattern": "",
                        "shortKey": "waterSupply_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf0be6aa5311d3f1e285",
                      "order": "1.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_targetIndicator",
                      "viewSequence": "4",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641eaf0ce6aa5311d3f1e2a6",
                          "orders": [
                            {
                              "_id": "641eaf0ce6aa5311d3f1e2a7",
                              "order": "1.002",
                              "value": ""
                            }
                          ],
                          "type": "3"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "42",
                      "modelValue": "",
                      "selectedValue": [],
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
                        "order": "1.003",
                        "pattern": "",
                        "shortKey": "waterSupply_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf5de6aa5311d3f1e31a",
                      "order": "1.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_indicatorLineItem",
                      "viewSequence": "5",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "some id",
                      "modelValue": "",
                      "selectedValue": [],
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
                        "order": "1.004",
                        "pattern": "",
                        "shortKey": "waterSupply_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf88e6aa5311d3f1e367",
                      "order": "1.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_unit",
                      "viewSequence": "6",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 1"
                      },
                      "forParentValue": 1,
                      "isSelectValue": false,
                      "previousValue": "%",
                      "modelValue": "",
                      "selectedValue": [],
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
                        "order": "1.005",
                        "pattern": "",
                        "shortKey": "waterSupply_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eafb2cc09cd11d2104b52",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "order": "1.006",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_type",
                      "viewSequence": "7",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 5,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "1.006",
                        "pattern": "",
                        "shortKey": "waterSupply_type"
                      }
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "641eae1acc09cd11d2104974",
                      "order": "1.001",
                      "answer_option": [],
                      "title": "Question",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_question",
                      "viewSequence": "2",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "1.001",
                        "shortKey": "waterSupply_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eae91e6aa5311d3f1e1d2",
                      "order": "1.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_actualIndicator",
                      "viewSequence": "3",
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
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "1.002",
                        "pattern": "",
                        "shortKey": "waterSupply_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf0be6aa5311d3f1e285",
                      "order": "1.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_targetIndicator",
                      "viewSequence": "4",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641eaf0ce6aa5311d3f1e2a6",
                          "orders": [
                            {
                              "_id": "641eaf0ce6aa5311d3f1e2a7",
                              "order": "1.002",
                              "value": ""
                            }
                          ],
                          "type": "3"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "1.003",
                        "pattern": "",
                        "shortKey": "waterSupply_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf5de6aa5311d3f1e31a",
                      "order": "1.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_indicatorLineItem",
                      "viewSequence": "5",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "1.004",
                        "pattern": "",
                        "shortKey": "waterSupply_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eaf88e6aa5311d3f1e367",
                      "order": "1.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_unit",
                      "viewSequence": "6",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "1.005",
                        "pattern": "",
                        "shortKey": "waterSupply_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641eafb2cc09cd11d2104b52",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "order": "1.006",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_type",
                      "viewSequence": "7",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "1",
                        "index": 5,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "1.006",
                        "pattern": "",
                        "shortKey": "waterSupply_type"
                      }
                    }
                  ]
                ],
                "errorMessage": ""
              },
              {
                "information": "",
                "_id": "641eae1acc09cd11d2104974",
                "order": "1.001",
                "answer_option": [],
                "title": "Question",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_question",
                "viewSequence": "2",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "29",
                "weightage": []
              },
              {
                "information": "",
                "_id": "641eae91e6aa5311d3f1e1d2",
                "order": "1.002",
                "answer_option": [],
                "title": "Actual Indicator 2021-22",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_actualIndicator",
                "viewSequence": "3",
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
                "_id": "641eaf0be6aa5311d3f1e285",
                "order": "1.003",
                "answer_option": [],
                "title": "Target Indicator 2022-23",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_targetIndicator",
                "viewSequence": "4",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641eaf0ce6aa5311d3f1e2a6",
                    "orders": [
                      {
                        "_id": "641eaf0ce6aa5311d3f1e2a7",
                        "order": "1.002",
                        "value": ""
                      }
                    ],
                    "type": "3"
                  }
                ],
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
                "_id": "641eaf5de6aa5311d3f1e31a",
                "order": "1.004",
                "answer_option": [],
                "title": "Indicator LineItem",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_indicatorLineItem",
                "viewSequence": "5",
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
                "information": "",
                "_id": "641eaf88e6aa5311d3f1e367",
                "order": "1.005",
                "answer_option": [],
                "title": "Unit",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_unit",
                "viewSequence": "6",
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
                "information": "",
                "_id": "641eafb2cc09cd11d2104b52",
                "answer_option": [],
                "title": "Type",
                "hint": "",
                "order": "1.006",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_type",
                "viewSequence": "7",
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
                "information": "",
                "_id": "641d98eee38c98116eb6197c",
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
                "title": "Sanitation",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_tableView",
                "viewSequence": "8",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": [],
                "isQuestionDisabled": false,
                "value": "2",
                "acceptableType": "",
                "acceptableFileType": "",
                "type": "20",
                "visibility": true,
                "childQuestions": [
                  {
                    "information": "",
                    "_id": "641d9a13775541116f87df02",
                    "order": "2.001",
                    "answer_option": [],
                    "title": "Sections/Indicators",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_question",
                    "viewSequence": "9",
                    "child": [],
                    "parent": [],
                    "validation": [],
                    "restrictions": [],
                    "input_type": "29",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "29",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 0,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641d9bcecc09cd11d20fe2d8",
                    "order": "2.002",
                    "answer_option": [],
                    "title": "Actual Indicator 2021-22",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_actualIndicator",
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
                    "minRange": null,
                    "maxRange": null,
                    "min": 1,
                    "max": 3,
                    "pattern": "",
                    "input_type": "2",
                    "weightage": [],
                    "valueHolder": "",
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 1,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641d9c1ccc09cd11d20fe399",
                    "order": "2.003",
                    "answer_option": [],
                    "title": "Target Indicator 2022-23",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_targetIndicator",
                    "viewSequence": "11",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "error_msg": "",
                        "_id": "1"
                      }
                    ],
                    "restrictions": [
                      {
                        "_id": "641e8a84e6aa5311d3f1b1a7",
                        "orders": [
                          {
                            "_id": "641e8a84e6aa5311d3f1b1a8",
                            "order": "2.002",
                            "value": ""
                          }
                        ],
                        "type": "4"
                      }
                    ],
                    "minRange": null,
                    "maxRange": null,
                    "min": 1,
                    "max": 3,
                    "pattern": "",
                    "input_type": "2",
                    "weightage": [],
                    "valueHolder": "",
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 2,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641d9c47cc09cd11d20fe3bf",
                    "order": "2.004",
                    "answer_option": [],
                    "title": "Indicator LineItem",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_indicatorLineItem",
                    "viewSequence": "12",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 3,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641d9c63cc09cd11d20fe3e6",
                    "order": "2.005",
                    "answer_option": [],
                    "title": "Unit",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_unit",
                    "viewSequence": "13",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 4,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641e83e6cc09cd11d2100c33",
                    "order": "2.006",
                    "answer_option": [],
                    "title": "Type",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "sanitation_type",
                    "viewSequence": "14",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "2",
                      "index": 5,
                      "loopIndex": 0
                    }
                  }
                ],
                "nestedData": {},
                "required": false,
                "width": "50",
                "modelValue": "2",
                "isSelectValue": false,
                "previousValue": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641d9a13775541116f87df02",
                      "order": "2.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_question",
                      "viewSequence": "9",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
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
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "2.001",
                        "shortKey": "sanitation_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9bcecc09cd11d20fe2d8",
                      "order": "2.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_actualIndicator",
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
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "order": "2.002",
                        "pattern": "",
                        "shortKey": "sanitation_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c1ccc09cd11d20fe399",
                      "order": "2.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_targetIndicator",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e8a84e6aa5311d3f1b1a7",
                          "orders": [
                            {
                              "_id": "641e8a84e6aa5311d3f1b1a8",
                              "order": "2.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "order": "2.003",
                        "pattern": "",
                        "shortKey": "sanitation_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c47cc09cd11d20fe3bf",
                      "order": "2.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_indicatorLineItem",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                        "order": "2.004",
                        "pattern": "",
                        "shortKey": "sanitation_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c63cc09cd11d20fe3e6",
                      "order": "2.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_unit",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 4,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "2.005",
                        "pattern": "",
                        "shortKey": "sanitation_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e83e6cc09cd11d2100c33",
                      "order": "2.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_type",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 5,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "2.006",
                        "pattern": "",
                        "shortKey": "sanitation_type"
                      }
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "641d9a13775541116f87df02",
                      "order": "2.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_question",
                      "viewSequence": "9",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "2.001",
                        "shortKey": "sanitation_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9bcecc09cd11d20fe2d8",
                      "order": "2.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_actualIndicator",
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
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "2.002",
                        "pattern": "",
                        "shortKey": "sanitation_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c1ccc09cd11d20fe399",
                      "order": "2.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_targetIndicator",
                      "viewSequence": "11",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e8a84e6aa5311d3f1b1a7",
                          "orders": [
                            {
                              "_id": "641e8a84e6aa5311d3f1b1a8",
                              "order": "2.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "2.003",
                        "pattern": "",
                        "shortKey": "sanitation_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c47cc09cd11d20fe3bf",
                      "order": "2.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_indicatorLineItem",
                      "viewSequence": "12",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "2.004",
                        "pattern": "",
                        "shortKey": "sanitation_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641d9c63cc09cd11d20fe3e6",
                      "order": "2.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_unit",
                      "viewSequence": "13",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "2.005",
                        "pattern": "",
                        "shortKey": "sanitation_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e83e6cc09cd11d2100c33",
                      "order": "2.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "sanitation_type",
                      "viewSequence": "14",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "2",
                        "index": 5,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "2.006",
                        "pattern": "",
                        "shortKey": "sanitation_type"
                      }
                    }
                  ]
                ],
                "errorMessage": ""
              },
              {
                "information": "",
                "_id": "641d9a13775541116f87df02",
                "order": "2.001",
                "answer_option": [],
                "title": "Sections/Indicators",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_question",
                "viewSequence": "9",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "29",
                "weightage": []
              },
              {
                "information": "",
                "_id": "641d9bcecc09cd11d20fe2d8",
                "order": "2.002",
                "answer_option": [],
                "title": "Actual Indicator 2021-22",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_actualIndicator",
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
                "_id": "641d9c1ccc09cd11d20fe399",
                "order": "2.003",
                "answer_option": [],
                "title": "Target Indicator 2022-23",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_targetIndicator",
                "viewSequence": "11",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641e8a84e6aa5311d3f1b1a7",
                    "orders": [
                      {
                        "_id": "641e8a84e6aa5311d3f1b1a8",
                        "order": "2.002",
                        "value": ""
                      }
                    ],
                    "type": "4"
                  }
                ],
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
                "_id": "641d9c47cc09cd11d20fe3bf",
                "order": "2.004",
                "answer_option": [],
                "title": "Indicator LineItem",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_indicatorLineItem",
                "viewSequence": "12",
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
                "information": "",
                "_id": "641d9c63cc09cd11d20fe3e6",
                "order": "2.005",
                "answer_option": [],
                "title": "Unit",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_unit",
                "viewSequence": "13",
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
                "information": "",
                "_id": "641e83e6cc09cd11d2100c33",
                "order": "2.006",
                "answer_option": [],
                "title": "Type",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "sanitation_type",
                "viewSequence": "14",
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
                "information": "",
                "_id": "641da28ecc09cd11d20feea6",
                "order": "3",
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
                "title": "Solid waste",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_tableView",
                "viewSequence": "15",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": [],
                "isQuestionDisabled": false,
                "value": "2",
                "acceptableType": "",
                "acceptableFileType": "",
                "type": "20",
                "visibility": true,
                "childQuestions": [
                  {
                    "information": "",
                    "_id": "641da2b3cc09cd11d20fef18",
                    "order": "3.001",
                    "answer_option": [],
                    "title": "Sections/Indicators",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_question",
                    "viewSequence": "16",
                    "child": [],
                    "parent": [],
                    "validation": [],
                    "restrictions": [],
                    "input_type": "29",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "29",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 0,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da332cc09cd11d20fef73",
                    "order": "3.002",
                    "answer_option": [],
                    "title": "Actual Indicator 2021-22",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_actualIndicator",
                    "viewSequence": "17",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 1,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da36fcc09cd11d20fefa3",
                    "order": "3.003",
                    "answer_option": [],
                    "title": "Target Indicator 2022-23",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_targetIndicator",
                    "viewSequence": "18",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "error_msg": "",
                        "_id": "1"
                      }
                    ],
                    "restrictions": [
                      {
                        "_id": "641e89b9cc09cd11d210111b",
                        "orders": [
                          {
                            "_id": "641e89b9cc09cd11d210111c",
                            "order": "3.002",
                            "value": ""
                          }
                        ],
                        "type": "4"
                      }
                    ],
                    "minRange": null,
                    "maxRange": null,
                    "min": 1,
                    "max": 3,
                    "pattern": "",
                    "input_type": "2",
                    "weightage": [],
                    "valueHolder": "",
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 2,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da3cacc09cd11d20fefd6",
                    "order": "3.004",
                    "answer_option": [],
                    "title": "Indicator LineItem",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_indicatorLineItem",
                    "viewSequence": "19",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 3,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da3f1cc09cd11d20ff009",
                    "order": "3.005",
                    "answer_option": [],
                    "title": "Unit",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_unit",
                    "viewSequence": "20",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 4,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641e8412cc09cd11d2100c79",
                    "order": "3.006",
                    "answer_option": [],
                    "title": "Type",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "solidWaste_type",
                    "viewSequence": "21",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "3",
                      "index": 5,
                      "loopIndex": 0
                    }
                  }
                ],
                "nestedData": {},
                "required": false,
                "width": "50",
                "modelValue": "2",
                "isSelectValue": false,
                "previousValue": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641da2b3cc09cd11d20fef18",
                      "order": "3.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_question",
                      "viewSequence": "16",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
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
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "3.001",
                        "shortKey": "solidWaste_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da332cc09cd11d20fef73",
                      "order": "3.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_actualIndicator",
                      "viewSequence": "17",
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
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
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
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.002",
                        "pattern": "",
                        "shortKey": "solidWaste_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da36fcc09cd11d20fefa3",
                      "order": "3.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_targetIndicator",
                      "viewSequence": "18",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e89b9cc09cd11d210111b",
                          "orders": [
                            {
                              "_id": "641e89b9cc09cd11d210111c",
                              "order": "3.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 2,
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
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.003",
                        "pattern": "",
                        "shortKey": "solidWaste_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da3cacc09cd11d20fefd6",
                      "order": "3.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_indicatorLineItem",
                      "viewSequence": "19",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 3,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "3.004",
                        "pattern": "",
                        "shortKey": "solidWaste_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da3f1cc09cd11d20ff009",
                      "order": "3.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_unit",
                      "viewSequence": "20",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 4,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "3.005",
                        "pattern": "",
                        "shortKey": "solidWaste_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e8412cc09cd11d2100c79",
                      "order": "3.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_type",
                      "viewSequence": "21",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 5,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "3.006",
                        "pattern": "",
                        "shortKey": "solidWaste_type"
                      }
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "641da2b3cc09cd11d20fef18",
                      "order": "3.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_question",
                      "viewSequence": "16",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 0,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "3.001",
                        "shortKey": "solidWaste_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da332cc09cd11d20fef73",
                      "order": "3.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_actualIndicator",
                      "viewSequence": "17",
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
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 1,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "3.002",
                        "pattern": "",
                        "shortKey": "solidWaste_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da36fcc09cd11d20fefa3",
                      "order": "3.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_targetIndicator",
                      "viewSequence": "18",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e89b9cc09cd11d210111b",
                          "orders": [
                            {
                              "_id": "641e89b9cc09cd11d210111c",
                              "order": "3.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "2",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 2,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "3.003",
                        "pattern": "",
                        "shortKey": "solidWaste_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da3cacc09cd11d20fefd6",
                      "order": "3.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_indicatorLineItem",
                      "viewSequence": "19",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 3,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "3.004",
                        "pattern": "",
                        "shortKey": "solidWaste_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da3f1cc09cd11d20ff009",
                      "order": "3.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_unit",
                      "viewSequence": "20",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "3.005",
                        "pattern": "",
                        "shortKey": "solidWaste_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e8412cc09cd11d2100c79",
                      "order": "3.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "solidWaste_type",
                      "viewSequence": "21",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "3",
                        "index": 5,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "3.006",
                        "pattern": "",
                        "shortKey": "solidWaste_type"
                      }
                    }
                  ]
                ],
                "errorMessage": ""
              },
              {
                "information": "",
                "_id": "641da2b3cc09cd11d20fef18",
                "order": "3.001",
                "answer_option": [],
                "title": "Sections/Indicators",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_question",
                "viewSequence": "16",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "29",
                "weightage": []
              },
              {
                "information": "",
                "_id": "641da332cc09cd11d20fef73",
                "order": "3.002",
                "answer_option": [],
                "title": "Actual Indicator 2021-22",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_actualIndicator",
                "viewSequence": "17",
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
                "_id": "641da36fcc09cd11d20fefa3",
                "order": "3.003",
                "answer_option": [],
                "title": "Target Indicator 2022-23",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_targetIndicator",
                "viewSequence": "18",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641e89b9cc09cd11d210111b",
                    "orders": [
                      {
                        "_id": "641e89b9cc09cd11d210111c",
                        "order": "3.002",
                        "value": ""
                      }
                    ],
                    "type": "4"
                  }
                ],
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
                "_id": "641da3cacc09cd11d20fefd6",
                "order": "3.004",
                "answer_option": [],
                "title": "Indicator LineItem",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_indicatorLineItem",
                "viewSequence": "19",
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
                "information": "",
                "_id": "641da3f1cc09cd11d20ff009",
                "order": "3.005",
                "answer_option": [],
                "title": "Unit",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_unit",
                "viewSequence": "20",
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
                "information": "",
                "_id": "641e8412cc09cd11d2100c79",
                "order": "3.006",
                "answer_option": [],
                "title": "Type",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_type",
                "viewSequence": "21",
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
                "information": "",
                "_id": "641da436cc09cd11d20ff0e0",
                "order": "4",
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
                "title": "Storm Water",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_tableView",
                "viewSequence": "22",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "20",
                "editable": false,
                "weightage": [],
                "isQuestionDisabled": false,
                "value": "2",
                "acceptableType": "",
                "acceptableFileType": "",
                "type": "20",
                "visibility": true,
                "childQuestions": [
                  {
                    "information": "",
                    "_id": "641da461cc09cd11d20ff158",
                    "order": "4.001",
                    "answer_option": [],
                    "title": "Sections/Indicators",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_question",
                    "viewSequence": "23",
                    "child": [],
                    "parent": [],
                    "validation": [],
                    "restrictions": [],
                    "input_type": "29",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "29",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 0,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da488cc09cd11d20ff1a3",
                    "order": "4.002",
                    "answer_option": [],
                    "title": "Actual Indicator 2021-22",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_actualIndicator",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 1,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da4b6cc09cd11d20ff1df",
                    "order": "4.003",
                    "answer_option": [],
                    "title": "Target Indicator 2022-23",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_targetIndicator",
                    "viewSequence": "25",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "error_msg": "",
                        "_id": "1"
                      }
                    ],
                    "restrictions": [
                      {
                        "_id": "641e8a3fcc09cd11d210122c",
                        "orders": [
                          {
                            "_id": "641e8a3fcc09cd11d210122d",
                            "order": "4.002",
                            "value": ""
                          }
                        ],
                        "type": "4"
                      }
                    ],
                    "minRange": null,
                    "maxRange": null,
                    "min": 1,
                    "max": 3,
                    "pattern": "",
                    "input_type": "2",
                    "weightage": [],
                    "valueHolder": "",
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 2,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da4e4e6aa5311d3f19a24",
                    "order": "4.004",
                    "answer_option": [],
                    "title": "Indicator LineItem",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_indicatorLineItem",
                    "viewSequence": "26",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 3,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641da4f6e6aa5311d3f19a6e",
                    "order": "4.005",
                    "answer_option": [],
                    "title": "Unit",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_unit",
                    "viewSequence": "27",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 4,
                      "loopIndex": 0
                    }
                  },
                  {
                    "information": "",
                    "_id": "641e842bcc09cd11d2100cc0",
                    "order": "4.006",
                    "answer_option": [],
                    "title": "Type",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "stormWater_type",
                    "viewSequence": "28",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "1",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "4",
                      "index": 5,
                      "loopIndex": 0
                    }
                  }
                ],
                "nestedData": {},
                "required": false,
                "width": "50",
                "modelValue": "2",
                "isSelectValue": false,
                "previousValue": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641da461cc09cd11d20ff158",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_question",
                      "viewSequence": "23",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
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
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "4.001",
                        "shortKey": "stormWater_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da488cc09cd11d20ff1a3",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_actualIndicator",
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
                      "isQuestionDisabled": false,
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
                        "order": "4.002",
                        "pattern": "",
                        "shortKey": "stormWater_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4b6cc09cd11d20ff1df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_targetIndicator",
                      "viewSequence": "25",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e8a3fcc09cd11d210122c",
                          "orders": [
                            {
                              "_id": "641e8a3fcc09cd11d210122d",
                              "order": "4.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "order": "4.003",
                        "pattern": "",
                        "shortKey": "stormWater_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4e4e6aa5311d3f19a24",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_indicatorLineItem",
                      "viewSequence": "26",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                        "order": "4.004",
                        "pattern": "",
                        "shortKey": "stormWater_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4f6e6aa5311d3f19a6e",
                      "order": "4.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_unit",
                      "viewSequence": "27",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 4,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "4.005",
                        "pattern": "",
                        "shortKey": "stormWater_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e842bcc09cd11d2100cc0",
                      "order": "4.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_type",
                      "viewSequence": "28",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 5,
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
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "4.006",
                        "pattern": "",
                        "shortKey": "stormWater_type"
                      }
                    }
                  ],
                  [
                    {
                      "information": "",
                      "_id": "641da461cc09cd11d20ff158",
                      "order": "4.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_question",
                      "viewSequence": "23",
                      "child": [],
                      "parent": [],
                      "validation": [],
                      "restrictions": [],
                      "input_type": "29",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "29",
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
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": ""
                          }
                        ],
                        "input_type": "29",
                        "nestedAnswer": [],
                        "order": "4.001",
                        "shortKey": "stormWater_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da488cc09cd11d20ff1a3",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2021-22",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_actualIndicator",
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
                      "isQuestionDisabled": false,
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
                        "order": "4.002",
                        "pattern": "",
                        "shortKey": "stormWater_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4b6cc09cd11d20ff1df",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Target Indicator 2022-23",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_targetIndicator",
                      "viewSequence": "25",
                      "child": [],
                      "parent": [],
                      "validation": [
                        {
                          "error_msg": "",
                          "_id": "1"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641e8a3fcc09cd11d210122c",
                          "orders": [
                            {
                              "_id": "641e8a3fcc09cd11d210122d",
                              "order": "4.002",
                              "value": ""
                            }
                          ],
                          "type": "4"
                        }
                      ],
                      "minRange": null,
                      "maxRange": null,
                      "min": 1,
                      "max": 3,
                      "pattern": "",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
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
                        "order": "4.003",
                        "pattern": "",
                        "shortKey": "stormWater_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4e4e6aa5311d3f19a24",
                      "order": "4.004",
                      "answer_option": [],
                      "title": "Indicator LineItem",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_indicatorLineItem",
                      "viewSequence": "26",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                        "order": "4.004",
                        "pattern": "",
                        "shortKey": "stormWater_indicatorLineItem"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641da4f6e6aa5311d3f19a6e",
                      "order": "4.005",
                      "answer_option": [],
                      "title": "Unit",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_unit",
                      "viewSequence": "27",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 4,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "4.005",
                        "pattern": "",
                        "shortKey": "stormWater_unit"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641e842bcc09cd11d2100cc0",
                      "order": "4.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "stormWater_type",
                      "viewSequence": "28",
                      "child": [],
                      "parent": [],
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
                      "visibility": true,
                      "nestedConfig": {
                        "parentOrder": "4",
                        "index": 5,
                        "loopIndex": 0
                      },
                      "selectedAnswerOption": {
                        "name": " 2"
                      },
                      "forParentValue": 2,
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
                        "order": "4.006",
                        "pattern": "",
                        "shortKey": "stormWater_type"
                      }
                    }
                  ]
                ],
                "errorMessage": ""
              },
              {
                "information": "",
                "_id": "641da461cc09cd11d20ff158",
                "order": "4.001",
                "answer_option": [],
                "title": "Sections/Indicators",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_question",
                "viewSequence": "23",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "29",
                "weightage": []
              },
              {
                "information": "",
                "_id": "641da488cc09cd11d20ff1a3",
                "order": "4.002",
                "answer_option": [],
                "title": "Actual Indicator 2021-22",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_actualIndicator",
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
                "information": "",
                "_id": "641da4b6cc09cd11d20ff1df",
                "order": "4.003",
                "answer_option": [],
                "title": "Target Indicator 2022-23",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_targetIndicator",
                "viewSequence": "25",
                "child": [],
                "parent": [],
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641e8a3fcc09cd11d210122c",
                    "orders": [
                      {
                        "_id": "641e8a3fcc09cd11d210122d",
                        "order": "4.002",
                        "value": ""
                      }
                    ],
                    "type": "4"
                  }
                ],
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
                "_id": "641da4e4e6aa5311d3f19a24",
                "order": "4.004",
                "answer_option": [],
                "title": "Indicator LineItem",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_indicatorLineItem",
                "viewSequence": "26",
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
                "information": "",
                "_id": "641da4f6e6aa5311d3f19a6e",
                "order": "4.005",
                "answer_option": [],
                "title": "Unit",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_unit",
                "viewSequence": "27",
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
                "information": "",
                "_id": "641e842bcc09cd11d2100cc0",
                "order": "4.006",
                "answer_option": [],
                "title": "Type",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "stormWater_type",
                "viewSequence": "28",
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
                "information": "",
                "_id": "641e87e0e6aa5311d3f1af85",
                "order": "5",
                "answer_option": [],
                "title": "Performance against the 4 SLBs",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "Link",
                "viewSequence": "29",
                "child": [],
                "parent": [],
                "validation": [],
                "restrictions": [],
                "input_type": "29",
                "editable": false,
                "weightage": []
              }
            ],
            "title": "28 SLB test",
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
    private twentyEightSlbService: TwentyEightSlbService,
    private loaderService: GlobalLoaderService
  ) { }

  ngOnInit(): void {
    this.isLoaded = true;
    // this.loadData();
  }

  get design_year() {
    const years = JSON.parse(localStorage.getItem("Years"));
    return years?.['2023-24'];
  }

  get ulbId() {
    return this.userData?.ulb;
  }





  onSubmitQuestion(data) {
    console.log(data)
  }

  loadData() {
    this.loaderService.showLoader();
    this.twentyEightSlbService.getForm(this.ulbId, this.design_year, this.formId).subscribe((res: any) => {
      console.log('loadData::', res);
      this.loaderService.stopLoader();
      console.log(res);
      this.isLoaded = true;
      this.questionresponse = res;
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }



  onPreview() {
    const data = this.webForm.questionData;
  }

  onSubmit(data) {
    console.log("submissingdata", data);
    // return;
    this.loaderService.showLoader();
    this.twentyEightSlbService.postForm({
      isDraft: data.isSaveAsDraft,
      isProjectLoaded: this.isProjectLoaded,
      financialYear: this.design_year,
      designYear: this.design_year,
      ulb: this.ulbId,
      formId: this.formId,
      data: data.finalData,
    }).subscribe(res => {
      this.loaderService.stopLoader();
      swal('Saved', data.isSaveAsDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success');
      console.log('data send');
    }, ({ error }) => {
      this.loaderService.stopLoader();
      if (Array.isArray(error?.message)) {
        error.message = error.message.join('\n\n');
      }
      swal('Error', error?.message ?? 'Something went wrong', 'error');
      console.log('error occured');
    })
  }
}
