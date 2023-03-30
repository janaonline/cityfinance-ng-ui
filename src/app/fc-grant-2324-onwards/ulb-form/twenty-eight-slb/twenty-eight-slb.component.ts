import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const swal: SweetAlert = require("sweetalert");

import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';
import { SweetAlert } from 'sweetalert/typings/core';
import { TwentyEightSlbPreviewComponent } from './twenty-eight-slb-preview/twenty-eight-slb-preview.component';

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
  successErrorMessage: string;
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
            "_id": "641fe70ccc09cd11d2108e54",
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
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641fdff0cc09cd11d21088c5",
                      "order": "1.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_question",
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
                      "isQuestionDisabled": false,
                      "value": "first water",
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
                      "previousValue": "first",
                      "modelValue": "first water",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "first water",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "first water",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "1.001",
                        "pattern": "",
                        "shortKey": "waterSupply_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe0dce6aa5311d3f21656",
                      "order": "1.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
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
                        "order": "1.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "waterSupply_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe17ee6aa5311d3f21688",
                      "order": "1.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe17ee6aa5311d3f2169e",
                          "orders": [
                            {
                              "_id": "641fe17ee6aa5311d3f2169f",
                              "order": "1.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "899",
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
                      "previousValue": "",
                      "modelValue": "899",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "899"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "899"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "1.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "waterSupply_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe1aee6aa5311d3f216c1",
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
                      "value": "98",
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
                      "previousValue": "",
                      "modelValue": "98",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "98",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "98",
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
                      "_id": "641fe1e1e6aa5311d3f21706",
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
                      "value": "%",
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
                      "previousValue": "40",
                      "modelValue": "%",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "%",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "%",
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
                      "_id": "641fe24fcc09cd11d21089b8",
                      "order": "1.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
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
                      "value": "water strom",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "water strom",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "water strom",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "water strom",
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
                      "_id": "641fdff0cc09cd11d21088c5",
                      "order": "1.001",
                      "answer_option": [],
                      "title": "Sections/Indicators",
                      "hint": "",
                      "resource_urls": [],
                      "label": "",
                      "shortKey": "waterSupply_question",
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
                      "isQuestionDisabled": false,
                      "value": "second water",
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
                        "name": " 2"
                      },
                      "forParentValue": 2,
                      "isSelectValue": false,
                      "previousValue": "second",
                      "modelValue": "second water",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "second water",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "second water",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "1.001",
                        "pattern": "",
                        "shortKey": "waterSupply_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe0dce6aa5311d3f21656",
                      "order": "1.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 24,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
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
                        "order": "1.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "waterSupply_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe17ee6aa5311d3f21688",
                      "order": "1.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe17ee6aa5311d3f2169e",
                          "orders": [
                            {
                              "_id": "641fe17ee6aa5311d3f2169f",
                              "order": "1.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "50",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "50",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "50"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "50"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "1.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "waterSupply_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe1aee6aa5311d3f216c1",
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
                      "value": "59885s",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "59885s",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "59885s",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "59885s",
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
                      "_id": "641fe1e1e6aa5311d3f21706",
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
                      "value": "Hour",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Hour",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Hour",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Hour",
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
                      "_id": "641fe24fcc09cd11d21089b8",
                      "order": "1.006",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
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
                      "value": "water strom",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "water strom",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "water strom",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "water strom",
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
                "tableHeaders": [
                  {
                    "label": "Sections/Indicators	"
                  },
                  {
                    "label": "Actual Indicator 2022-23",
                  },
                  {
                    "label": "Target Indicator 2023-24"
                  }
                ],
                "modelValue": "2",
                "value": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "viewSequence": "1",
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
                "_id": "641fdff0cc09cd11d21088c5",
                "order": "1.001",
                "answer_option": [],
                "title": "Sections/Indicators",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "waterSupply_question",
                "viewSequence": "2",
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
                "_id": "641fe0dce6aa5311d3f21656",
                "order": "1.002",
                "answer_option": [],
                "title": "Actual Indicator 2022-23",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe17ee6aa5311d3f21688",
                "order": "1.003",
                "answer_option": [],
                "title": "Target Indicator 2023-24",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641fe17ee6aa5311d3f2169e",
                    "orders": [
                      {
                        "_id": "641fe17ee6aa5311d3f2169f",
                        "order": "1.002",
                        "value": ""
                      }
                    ],
                    "type": "7"
                  }
                ],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe1aee6aa5311d3f216c1",
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
                "_id": "641fe1e1e6aa5311d3f21706",
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
                "_id": "641fe24fcc09cd11d21089b8",
                "order": "1.006",
                "answer_option": [],
                "title": "Type",
                "hint": "",
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
                "_id": "641fe32ecc09cd11d2108afc",
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
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641fe352cc09cd11d2108b17",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "first senitation",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                      "previousValue": "first",
                      "modelValue": "first senitation",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "first senitation",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "first senitation",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "2.001",
                        "pattern": "",
                        "shortKey": "sanitation_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe38bcc09cd11d2108b40",
                      "order": "2.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "65",
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
                      "modelValue": "65",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "65"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "65"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "2.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "sanitation_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe3d4cc09cd11d2108b84",
                      "order": "2.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe3d4cc09cd11d2108b9f",
                          "orders": [
                            {
                              "_id": "641fe3d4cc09cd11d2108ba0",
                              "order": "2.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "60",
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
                      "modelValue": "60",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "60"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "60"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "2.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "sanitation_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe401cc09cd11d2108bae",
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
                      "value": "fasdjlsfj",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "fasdjlsfj",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "fasdjlsfj",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "fasdjlsfj",
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
                      "_id": "641fe41ee6aa5311d3f21759",
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
                      "value": "Year",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Year",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Year",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Year",
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
                      "_id": "641fe42de6aa5311d3f21786",
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
                      "value": "sanitation",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "sanitation",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "sanitation",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "sanitation",
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
                      "_id": "641fe352cc09cd11d2108b17",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "2nd sanitation",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "2nd sanitation",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "2nd sanitation",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "2nd sanitation",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "2.001",
                        "pattern": "",
                        "shortKey": "sanitation_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe38bcc09cd11d2108b40",
                      "order": "2.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "40",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "40",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "40"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "40"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "2.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "sanitation_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe3d4cc09cd11d2108b84",
                      "order": "2.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe3d4cc09cd11d2108b9f",
                          "orders": [
                            {
                              "_id": "641fe3d4cc09cd11d2108ba0",
                              "order": "2.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "87",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "87",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "87"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "87"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "2.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "sanitation_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe401cc09cd11d2108bae",
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
                      "value": "fsalkjf",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "fsalkjf",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "fsalkjf",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "fsalkjf",
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
                      "_id": "641fe41ee6aa5311d3f21759",
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
                      "value": "%",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "%",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "%",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "%",
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
                      "_id": "641fe42de6aa5311d3f21786",
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
                      "value": "sanitation",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "sanitation",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "sanitation",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "sanitation",
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
                "modelValue": "2",
                "value": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "viewSequence": "8",
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
                "_id": "641fe352cc09cd11d2108b17",
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
                "_id": "641fe38bcc09cd11d2108b40",
                "order": "2.002",
                "answer_option": [],
                "title": "Actual Indicator 2022-23",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe3d4cc09cd11d2108b84",
                "order": "2.003",
                "answer_option": [],
                "title": "Target Indicator 2023-24",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641fe3d4cc09cd11d2108b9f",
                    "orders": [
                      {
                        "_id": "641fe3d4cc09cd11d2108ba0",
                        "order": "2.002",
                        "value": ""
                      }
                    ],
                    "type": "7"
                  }
                ],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe401cc09cd11d2108bae",
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
                "_id": "641fe41ee6aa5311d3f21759",
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
                "_id": "641fe42de6aa5311d3f21786",
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
                "_id": "641fe479e6aa5311d3f217b5",
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
                "title": "Solid Waste",
                "hint": "",
                "resource_urls": [],
                "label": "",
                "shortKey": "solidWaste_tableView",
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641fe499e6aa5311d3f217e0",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "first waste",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "first waste",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "first waste",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "first waste",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "3.001",
                        "pattern": "",
                        "shortKey": "solidWaste_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe4d0e6aa5311d3f21818",
                      "order": "3.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "40",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "40",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "40"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "40"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "solidWaste_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe5a5e6aa5311d3f2188e",
                      "order": "3.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe5a5e6aa5311d3f218b9",
                          "orders": [
                            {
                              "_id": "641fe5a5e6aa5311d3f218ba",
                              "order": "3.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "20",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "20",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "20"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "20"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "solidWaste_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe5c2e6aa5311d3f218d2",
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
                      "value": "sfkjlsdlf",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "sfkjlsdlf",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "sfkjlsdlf",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "sfkjlsdlf",
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
                      "_id": "641fe5d4e6aa5311d3f2190d",
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
                      "value": "%",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "%",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "%",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "%",
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
                      "_id": "641fe5e3cc09cd11d2108c19",
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
                      "value": "Solid Waste",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Solid Waste",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Solid Waste",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Solid Waste",
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
                      "_id": "641fe499e6aa5311d3f217e0",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "second waste",
                      "acceptableType": "",
                      "acceptableFileType": "",
                      "type": "1",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "second waste",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "second waste",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "second waste",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "3.001",
                        "pattern": "",
                        "shortKey": "solidWaste_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe4d0e6aa5311d3f21818",
                      "order": "3.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "24",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "24",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "24"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "24"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "solidWaste_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe5a5e6aa5311d3f2188e",
                      "order": "3.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe5a5e6aa5311d3f218b9",
                          "orders": [
                            {
                              "_id": "641fe5a5e6aa5311d3f218ba",
                              "order": "3.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "42",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "42",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "42"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "42"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "3.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "solidWaste_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe5c2e6aa5311d3f218d2",
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
                      "value": "lfksjdflk",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "lfksjdflk",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "lfksjdflk",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "lfksjdflk",
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
                      "_id": "641fe5d4e6aa5311d3f2190d",
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
                      "value": "Hour",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Hour",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Hour",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Hour",
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
                      "_id": "641fe5e3cc09cd11d2108c19",
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
                      "value": "Solid Waste",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Solid Waste",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Solid Waste",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Solid Waste",
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
                "modelValue": "2",
                "value": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "viewSequence": "15",
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
                "_id": "641fe499e6aa5311d3f217e0",
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
                "_id": "641fe4d0e6aa5311d3f21818",
                "order": "3.002",
                "answer_option": [],
                "title": "Actual Indicator 2022-23",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe5a5e6aa5311d3f2188e",
                "order": "3.003",
                "answer_option": [],
                "title": "Target Indicator 2023-24",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641fe5a5e6aa5311d3f218b9",
                    "orders": [
                      {
                        "_id": "641fe5a5e6aa5311d3f218ba",
                        "order": "3.002",
                        "value": ""
                      }
                    ],
                    "type": "7"
                  }
                ],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe5c2e6aa5311d3f218d2",
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
                "_id": "641fe5d4e6aa5311d3f2190d",
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
                "_id": "641fe5e3cc09cd11d2108c19",
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
                "_id": "641fe60ecc09cd11d2108c8d",
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
                "childQuestionData": [
                  [
                    {
                      "information": "",
                      "_id": "641fe634cc09cd11d2108cc9",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "first strom",
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
                      "modelValue": "first strom",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "first strom",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "first strom",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "4.001",
                        "pattern": "",
                        "shortKey": "stormWater_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe667cc09cd11d2108d11",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "53",
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
                      "modelValue": "53",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "53"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "53"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "4.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "stormWater_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe6c3cc09cd11d2108d70",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe6c3cc09cd11d2108dab",
                          "orders": [
                            {
                              "_id": "641fe6c3cc09cd11d2108dac",
                              "order": "4.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "9240",
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
                      "modelValue": "9240",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "9240"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "9240"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "4.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "stormWater_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe6ddcc09cd11d2108db9",
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
                      "value": "kfasdf",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "kfasdf",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "kfasdf",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "kfasdf",
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
                      "_id": "641fe6eecc09cd11d2108e05",
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
                      "value": "Hour",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Hour",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Hour",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Hour",
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
                      "_id": "641fe70ccc09cd11d2108e52",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "order": "4.006",
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
                      "value": "Storm Water",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Storm Water",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Storm Water",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Storm Water",
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
                      "_id": "641fe634cc09cd11d2108cc9",
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
                      "pattern": "",
                      "validation": [],
                      "restrictions": [],
                      "min": 1,
                      "max": null,
                      "input_type": "1",
                      "weightage": [],
                      "isQuestionDisabled": false,
                      "value": "second strom",
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
                      "modelValue": "second strom",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "second strom",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "second strom",
                            "value": ""
                          }
                        ],
                        "input_type": "1",
                        "nestedAnswer": [],
                        "order": "4.001",
                        "pattern": "",
                        "shortKey": "stormWater_question"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe667cc09cd11d2108d11",
                      "order": "4.002",
                      "answer_option": [],
                      "title": "Actual Indicator 2022-23",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "323",
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
                      "modelValue": "323",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "323"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "323"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "4.002",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "stormWater_actualIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe6c3cc09cd11d2108d70",
                      "order": "4.003",
                      "answer_option": [],
                      "title": "Target Indicator 2023-24",
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
                        },
                        {
                          "error_msg": "",
                          "_id": "2"
                        }
                      ],
                      "restrictions": [
                        {
                          "_id": "641fe6c3cc09cd11d2108dab",
                          "orders": [
                            {
                              "_id": "641fe6c3cc09cd11d2108dac",
                              "order": "4.002",
                              "value": ""
                            }
                          ],
                          "type": "7"
                        }
                      ],
                      "minRange": 0,
                      "maxRange": 9999,
                      "min": 1,
                      "max": 4,
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "input_type": "2",
                      "weightage": [],
                      "valueHolder": "",
                      "isQuestionDisabled": false,
                      "value": "23",
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
                      "modelValue": "23",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": "23"
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "",
                            "value": "23"
                          }
                        ],
                        "input_type": "2",
                        "nestedAnswer": [],
                        "order": "4.003",
                        "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                        "shortKey": "stormWater_targetIndicator"
                      }
                    },
                    {
                      "information": "",
                      "_id": "641fe6ddcc09cd11d2108db9",
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
                      "value": "fsladfj",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "fsladfj",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "fsladfj",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "fsladfj",
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
                      "_id": "641fe6eecc09cd11d2108e05",
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
                      "value": "year",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "year",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "year",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "year",
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
                      "_id": "641fe70ccc09cd11d2108e52",
                      "answer_option": [],
                      "title": "Type",
                      "hint": "",
                      "order": "4.006",
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
                      "value": "Storm Water",
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
                      "isSelectValue": false,
                      "previousValue": "",
                      "modelValue": "Storm Water",
                      "selectedValue": [
                        {
                          "label": "",
                          "textValue": "Storm Water",
                          "value": ""
                        }
                      ],
                      "answer": {
                        "answer": [
                          {
                            "label": "",
                            "textValue": "Storm Water",
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
                "modelValue": "2",
                "value": "2",
                "selectedValue": [
                  {
                    "label": "2",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "viewSequence": "22",
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
                "_id": "641fe634cc09cd11d2108cc9",
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
                "_id": "641fe667cc09cd11d2108d11",
                "order": "4.002",
                "answer_option": [],
                "title": "Actual Indicator 2022-23",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe6c3cc09cd11d2108d70",
                "order": "4.003",
                "answer_option": [],
                "title": "Target Indicator 2023-24",
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
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  }
                ],
                "restrictions": [
                  {
                    "_id": "641fe6c3cc09cd11d2108dab",
                    "orders": [
                      {
                        "_id": "641fe6c3cc09cd11d2108dac",
                        "order": "4.002",
                        "value": ""
                      }
                    ],
                    "type": "7"
                  }
                ],
                "minRange": 0,
                "maxRange": 9999,
                "min": 1,
                "max": 4,
                "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": ""
              },
              {
                "information": "",
                "_id": "641fe6ddcc09cd11d2108db9",
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
                "_id": "641fe6eecc09cd11d2108e05",
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
                "_id": "641fe70ccc09cd11d2108e52",
                "answer_option": [],
                "title": "Type",
                "hint": "",
                "order": "4.006",
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
    // this.isLoaded = true;
    this.loadData();
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
      if (res?.success == false && res?.message) {
        this.successErrorMessage = res?.message;
        return;
      }
      this.isLoaded = true;
      console.log(res);
      this.questionresponse = res;
    }, ({ error }) => {
      this.loaderService.stopLoader();
      swal('Error', error?.message ?? 'Something went wrong', 'error');
    })
  }



  onPreview() {
    const data = this.webForm.questionData;
    console.log(data);
    let slbPreData = {
      perData: {
        data: data.reduce((obj, item) => ({
          ...obj,
          [item?.title]: item?.childQuestionData?.map(questionsData => ({
            question: questionsData.find(question => question.shortKey?.endsWith("_question"))?.modelValue,
            actual: {
              value: questionsData.find(question => question.shortKey?.endsWith("_actualIndicator"))?.modelValue
            },
            target_1: {
              value: questionsData.find(question => question.shortKey?.endsWith("_targetIndicator"))?.modelValue
            },
            unit: "%"
          }))
        }), {}),
        isDraft: true,
        population: 233
      },
      ulbId: this.ulbId,
      isDraft: true,
      // saveDataJson: this.slbData
    };
    const dialogRef = this.dialog.open(TwentyEightSlbPreviewComponent, {
      data: slbPreData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  addDisableKeys = data => data?.finalData?.map((question, questionIndex) => ({
    ...question,
    nestedAnswer: question?.nestedAnswer?.map((innerNestedAnswer, innerNestedAnswerIndex) => ({
      ...innerNestedAnswer,
      answerNestedData: [
        ...innerNestedAnswer?.answerNestedData,
        ...['actual', 'target'].map((key) => ({
          input_type: "1",
          shortKey: `${key}Disable`,
          "answer": [
            {
              "label": "",
              "textValue": data?.question?.[questionIndex]?.childQuestionData[innerNestedAnswerIndex].find(item => item.shortKey.endsWith(`_${key}Indicator`))?.isQuestionDisabled,
              "value": ""
            }
          ],
        }),
        )
      ]
    }))
  }));

  onSubmit(data) {

    const finalData = this.addDisableKeys(data);

    this.loaderService.showLoader();
    this.twentyEightSlbService.postForm({
      isDraft: data.isSaveAsDraft,
      financialYear: this.design_year,
      design_year: this.design_year,
      status: data.isSaveAsDraft ? 2 : 3,
      actualYear: "606aafb14dff55e6c075d3ae",
      targetYear: "606aaf854dff55e6c075d219",
      ulb: this.ulbId,
      formId: this.formId,
      data: finalData,
    }).subscribe(res => {
      this.webForm.hasUnsavedChanges = false;
      this.loaderService.stopLoader();
      swal('Saved', data.isSaveAsDraft ? "Data save as draft successfully!" : "Data saved successfully!", 'success')
        .then(() => {
          if (!data.isSaveAsDraft) location.reload();
        });
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
