import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const staticResponse = {
  "success": true,
  "data": [
    {
      "_id": "64339cc47135c256abbe9555",
      "formId": "4",
      "isQuestionDisabled": false,
      "language": [
        {
          "_id": "648426f6d0de6828e7c54186",
          "lng": "en",
          "question": [
            {
              "information": "",
              "_id": "6437f8541a51164651cac2a9",
              "order": "1",
              "answer_option": [
                {
                  "name": "1",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                }
              ],
              "title": "GTC Digitalization Form (For each of the 5 tabs of 2023-24)",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "basic",
              "viewSequence": "1",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "64842637d0de6828e7c540aa",
                    "order": "1.008",
                    "answer_option": [
                      {
                        "name": "2022-23",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "2023-24",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Year",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "year",
                    "viewSequence": "2",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "_id": "3",
                        "error_msg": ""
                      },
                      {
                        "_id": "184",
                        "error_msg": ""
                      }
                    ],
                    "restrictions": [],
                    "input_type": "3",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "3",
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
                      "input_type": "3",
                      "nestedAnswer": [],
                      "order": "1.008",
                      "shortKey": "year"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fa5a10d7a646562ea14e",
                    "order": "1.002",
                    "answer_option": [
                      {
                        "name": "MPC",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "NMPC",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Type of ULB",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "ulbType",
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
                    "isQuestionDisabled": false,
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
                    "forParentValue": 1,
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "3",
                      "nestedAnswer": [],
                      "order": "1.002",
                      "shortKey": "ulbType"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fae029e2ab464aea8777",
                    "order": "1.003",
                    "answer_option": [
                      {
                        "name": " Tied",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "Untied",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Type of Grant Received (Tied/Untied)",
                    "hint": "",
                    "resource_urls": [],
                    "label": "3",
                    "shortKey": "grantType",
                    "viewSequence": "4",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "3",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "3",
                      "nestedAnswer": [],
                      "order": "1.003",
                      "shortKey": "grantType"
                    }
                  },
                  {
                    "information": "",
                    "_id": "648426bcd8374d28f31b6486",
                    "order": "1.009",
                    "answer_option": [
                      {
                        "name": "1st Installment",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "2nd Installment",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Installment type",
                    "hint": "",
                    "resource_urls": [],
                    "label": "",
                    "shortKey": "installmenttype",
                    "viewSequence": "5",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "_id": "184",
                        "error_msg": ""
                      },
                      {
                        "_id": "1",
                        "error_msg": ""
                      }
                    ],
                    "restrictions": [],
                    "input_type": "3",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "3",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "3",
                      "nestedAnswer": [],
                      "order": "1.009",
                      "shortKey": "installmenttype"
                    }
                  }
                ]
              ],
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
              "_id": "6437fa5a10d7a646562ea14e",
              "order": "1.002",
              "answer_option": [
                {
                  "name": "MPC",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "NMPC",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Type of ULB",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "ulbType",
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
              "_id": "6437fae029e2ab464aea8777",
              "order": "1.003",
              "answer_option": [
                {
                  "name": " Tied",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "Untied",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Type of Grant Received (Tied/Untied)",
              "hint": "",
              "resource_urls": [],
              "label": "3",
              "shortKey": "grantType",
              "viewSequence": "4",
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
              "_id": "64842637d0de6828e7c540aa",
              "order": "1.008",
              "answer_option": [
                {
                  "name": "2022-23",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "2023-24",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Year",
              "hint": "",
              "resource_urls": [],
              "label": "",
              "shortKey": "year",
              "viewSequence": "2",
              "child": [],
              "parent": [],
              "validation": [
                {
                  "_id": "3",
                  "error_msg": ""
                },
                {
                  "_id": "184",
                  "error_msg": ""
                }
              ],
              "restrictions": [],
              "input_type": "3",
              "weightage": []
            },
            {
              "information": "",
              "_id": "648426bcd8374d28f31b6486",
              "order": "1.009",
              "answer_option": [
                {
                  "name": "1st Installment",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "2nd Installment",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Installment type",
              "hint": "",
              "resource_urls": [],
              "label": "",
              "shortKey": "installmenttype",
              "viewSequence": "5",
              "child": [],
              "parent": [],
              "validation": [
                {
                  "_id": "184",
                  "error_msg": ""
                },
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
              "_id": "6437fcacbae92b4649191a92",
              "order": "2",
              "answer_option": [
                {
                  "name": "1",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                }
              ],
              "title": "State Details",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "6437fce71a51164651cac53b",
                    "order": "2.001",
                    "answer_option": [],
                    "title": "Total No: Of MPCs",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "totalMpc",
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
                      }
                    ],
                    "restrictions": [],
                    "minRange": 0,
                    "maxRange": 1000,
                    "min": 1,
                    "max": 4,
                    "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "2.001",
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
                      "shortKey": "totalMpc"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fd371a51164651cac569",
                    "order": "2.002",
                    "answer_option": [],
                    "title": "Total No: Of NMPCs",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "totalNmpc",
                    "viewSequence": "8",
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
                    "maxRange": 1000,
                    "min": 1,
                    "max": 4,
                    "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
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
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
                      "shortKey": "totalNmpc"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fd71bae92b4649191b28",
                    "order": "2.003",
                    "answer_option": [],
                    "title": "Total No: Of Duly elected MPCs",
                    "hint": "",
                    "resource_urls": [],
                    "label": "3",
                    "shortKey": "totalElectedMpc",
                    "viewSequence": "9",
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
                    "maxRange": 1000,
                    "min": 1,
                    "max": 4,
                    "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
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
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
                      "shortKey": "totalElectedMpc"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fd9e10d7a646562ea35f",
                    "order": "2.004",
                    "answer_option": [],
                    "title": "Total No: Of Duly elected NMPCs",
                    "hint": "",
                    "resource_urls": [],
                    "label": "4",
                    "shortKey": "totalElectedNmpc",
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
                    "maxRange": 1000,
                    "min": 1,
                    "max": 4,
                    "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "2.004",
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
                      "shortKey": "totalElectedNmpc"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "statedetails",
              "viewSequence": "6",
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
              "_id": "6437fce71a51164651cac53b",
              "order": "2.001",
              "answer_option": [],
              "title": "Total No: Of MPCs",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "totalMpc",
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
                }
              ],
              "restrictions": [],
              "minRange": 0,
              "maxRange": 1000,
              "min": 1,
              "max": 4,
              "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437fd371a51164651cac569",
              "order": "2.002",
              "answer_option": [],
              "title": "Total No: Of NMPCs",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "totalNmpc",
              "viewSequence": "8",
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
              "maxRange": 1000,
              "min": 1,
              "max": 4,
              "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437fd71bae92b4649191b28",
              "order": "2.003",
              "answer_option": [],
              "title": "Total No: Of Duly elected MPCs",
              "hint": "",
              "resource_urls": [],
              "label": "3",
              "shortKey": "totalElectedMpc",
              "viewSequence": "9",
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
              "maxRange": 1000,
              "min": 1,
              "max": 4,
              "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437fd9e10d7a646562ea35f",
              "order": "2.004",
              "answer_option": [],
              "title": "Total No: Of Duly elected NMPCs",
              "hint": "",
              "resource_urls": [],
              "label": "4",
              "shortKey": "totalElectedNmpc",
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
              "maxRange": 1000,
              "min": 1,
              "max": 4,
              "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}|1000))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437fe13bae92b4649191bb5",
              "order": "3",
              "answer_option": [
                {
                  "name": "1",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                }
              ],
              "title": "Details of Grant (Tied/Untied) Received",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "6437fe5810d7a646562ea3b5",
                    "order": "3.001",
                    "answer_option": [],
                    "title": "Amount Received (In lakhs)",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "recAmount",
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
                      }
                    ],
                    "restrictions": [],
                    "minRange": 1,
                    "maxRange": 999999,
                    "min": 1,
                    "max": 6,
                    "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "3.001",
                      "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
                      "shortKey": "recAmount"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437fee610d7a646562ea3e1",
                    "order": "3.002",
                    "answer_option": [],
                    "title": "Date of Receipt",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "receiptDate",
                    "viewSequence": "13",
                    "child": [],
                    "parent": [],
                    "validation": [
                      {
                        "_id": "204",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "14",
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
                      "input_type": "14",
                      "nestedAnswer": [],
                      "order": "3.002",
                      "shortKey": "receiptDate"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "3",
              "shortKey": "recgrandtetail",
              "viewSequence": "11",
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
              "_id": "6437fe5810d7a646562ea3b5",
              "order": "3.001",
              "answer_option": [],
              "title": "Amount Received (In lakhs)",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "recAmount",
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
                }
              ],
              "restrictions": [],
              "minRange": 1,
              "maxRange": 999999,
              "min": 1,
              "max": 6,
              "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437fee610d7a646562ea3e1",
              "order": "3.002",
              "answer_option": [],
              "title": "Date of Receipt",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "receiptDate",
              "viewSequence": "13",
              "child": [],
              "parent": [],
              "validation": [
                {
                  "_id": "204",
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
              "_id": "6437ff0510d7a646562ea40a",
              "order": "4",
              "answer_option": [
                {
                  "name": "1",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                }
              ],
              "title": "Details of Grant (Tied/Untied) Transferred",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "6437ff67bae92b4649191c63",
                    "order": "4.001",
                    "answer_option": [],
                    "title": "Amount Transferred, excluding interest (in lakhs)",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "transAmount",
                    "viewSequence": "15",
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
                    "minRange": 1,
                    "maxRange": 999999,
                    "min": 1,
                    "max": 6,
                    "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "4.001",
                      "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
                      "shortKey": "transAmount"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6437ffd11a51164651cac69b",
                    "order": "4.002",
                    "answer_option": [],
                    "title": "Date of Transfer",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "transDate",
                    "viewSequence": "16",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "14",
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
                      "input_type": "14",
                      "nestedAnswer": [],
                      "order": "4.002",
                      "shortKey": "transDate"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6438005010d7a646562ea4bf",
                    "order": "4.003",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Was there any delay in transfer?",
                    "hint": "",
                    "resource_urls": [],
                    "label": "3",
                    "shortKey": "transDelay",
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
                    "input_type": "5",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "4.003",
                      "shortKey": "transDelay"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6438009129e2ab464aea897f",
                    "order": "4.004",
                    "answer_option": [],
                    "title": "No. of working days delayed",
                    "hint": "",
                    "resource_urls": [],
                    "label": "4",
                    "shortKey": "daysDelay",
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
                    "isQuestionDisabled": false,
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
                      "order": "4.004",
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,2}))$",
                      "shortKey": "daysDelay"
                    }
                  },
                  {
                    "information": "",
                    "_id": "643800f110d7a646562ea59b",
                    "order": "4.005",
                    "answer_option": [],
                    "title": "Rate of interest (annual rate)",
                    "hint": "",
                    "resource_urls": [],
                    "label": "5",
                    "shortKey": "interest",
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "4.005",
                      "pattern": "^((?:[0-9]|[1-9][0-9]|100))$",
                      "shortKey": "interest"
                    }
                  },
                  {
                    "information": "",
                    "_id": "643802e229e2ab464aea8af9",
                    "order": "4.006",
                    "answer_option": [],
                    "title": "Amount of interest transferred, If there's any delay (in lakhs)",
                    "hint": "Numeric - Amount",
                    "resource_urls": [],
                    "label": "6",
                    "shortKey": "intTransfer",
                    "viewSequence": "20",
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
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "2",
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
                      "input_type": "2",
                      "nestedAnswer": [],
                      "order": "4.006",
                      "pattern": "^((?:[0-9]|[1-9][0-9]{1,3}))$",
                      "shortKey": "intTransfer"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "4",
              "shortKey": "transrantdetail_tableview_addbutton",
              "tableHeaders": [
                {
                  "label": "Amount Transferred, excluding interest (in lakhs)"
                },
                {
                  "label": "Date of Transfer"
                },
                {
                  "label": "Was there any delay in transfer?"
                },
                {
                  "label": "No. of working days delayed"
                },
                {
                  "label": "Rate of interest (annual rate)"
                },
                {
                  "label": "Amount of interest transferred, If there's any delay (in lakhs)"
                }, 
              ],
              "viewSequence": "14",
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
              "_id": "6437ff67bae92b4649191c63",
              "order": "4.001",
              "answer_option": [],
              "title": "Amount Transferred, excluding interest (in lakhs)",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "transAmount",
              "viewSequence": "15",
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
              "minRange": 1,
              "maxRange": 999999,
              "min": 1,
              "max": 6,
              "pattern": "^((?:[1-9]|[1-9][0-9]{1,5}))$",
              "input_type": "2",
              "weightage": [],
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "6437ffd11a51164651cac69b",
              "order": "4.002",
              "answer_option": [],
              "title": "Date of Transfer",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "transDate",
              "viewSequence": "16",
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
              "weightage": []
            },
            {
              "information": "",
              "_id": "6438005010d7a646562ea4bf",
              "order": "4.003",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Was there any delay in transfer?",
              "hint": "",
              "resource_urls": [],
              "label": "3",
              "shortKey": "transDelay",
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
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "6438009129e2ab464aea897f",
              "order": "4.004",
              "answer_option": [],
              "title": "No. of working days delayed",
              "hint": "",
              "resource_urls": [],
              "label": "4",
              "shortKey": "daysDelay",
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
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "643800f110d7a646562ea59b",
              "order": "4.005",
              "answer_option": [],
              "title": "Rate of interest (annual rate)",
              "hint": "",
              "resource_urls": [],
              "label": "5",
              "shortKey": "interest",
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
              "valueHolder": ""
            },
            {
              "information": "",
              "_id": "643802e229e2ab464aea8af9",
              "order": "4.006",
              "answer_option": [],
              "title": "Amount of interest transferred, If there's any delay (in lakhs)",
              "hint": "Numeric - Amount",
              "resource_urls": [],
              "label": "6",
              "shortKey": "intTransfer",
              "viewSequence": "20",
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
              "_id": "643803bcbae92b4649191f43",
              "order": "5",
              "answer_option": [
                {
                  "name": "1",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                }
              ],
              "title": "SFC Details",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "643804541a51164651cac975",
                    "order": "5.001",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Whether State Finance Commission recommendations available?",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "recomAvail",
                    "viewSequence": "22",
                    "child": [],
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "5.001",
                      "shortKey": "recomAvail"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6438048c29e2ab464aea8c00",
                    "order": "5.002",
                    "answer_option": [
                      {
                        "name": " As per Census 2011",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "As per SFC Recommendations",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Whether Grants distributed as per Census 2011 or as per SFC recommendations?",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "grantDistribute",
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
                    "input_type": "5",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "5.002",
                      "shortKey": "grantDistribute"
                    }
                  },
                  {
                    "information": "",
                    "_id": "643804ff10d7a646562ea7f3",
                    "order": "5.003",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "\"If No, whether notification for constitution of SFC issued\"",
                    "hint": "",
                    "resource_urls": [],
                    "label": "3",
                    "shortKey": "sfcNotification",
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
                    "input_type": "5",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "5.003",
                      "shortKey": "sfcNotification"
                    }
                  },
                  {
                    "information": "",
                    "_id": "643805561a51164651caca53",
                    "order": "5.004",
                    "answer_option": [],
                    "title": "If yes - attach a copy of notification",
                    "hint": "",
                    "resource_urls": [],
                    "label": "4",
                    "shortKey": "sfcNotificationCopy",
                    "viewSequence": "25",
                    "child": [],
                    "parent": [],
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
                        "value": "5120"
                      },
                      {
                        "error_msg": "",
                        "_id": "82",
                        "value": "1"
                      }
                    ],
                    "restrictions": [],
                    "input_type": "11",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "application/pdf, 5120, 1",
                    "acceptableFileType": [
                      "application/pdf",
                      "5120",
                      "1"
                    ],
                    "type": "11",
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
                    "answer": {
                      "answer": [
                        {
                          "textValue": "",
                          "label": "",
                          "value": ""
                        }
                      ],
                      "input_type": "11",
                      "nestedAnswer": [],
                      "order": "5.004",
                      "pattern": "",
                      "shortKey": "sfcNotificationCopy"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "5",
              "shortKey": "sfcDetail",
              "viewSequence": "21",
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
              "_id": "643804541a51164651cac975",
              "order": "5.001",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Whether State Finance Commission recommendations available?",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "recomAvail",
              "viewSequence": "22",
              "child": [],
              "parent": [],
              "validation": [
                {
                  "error_msg": "",
                  "_id": "1"
                }
              ],
              "restrictions": [],
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "6438048c29e2ab464aea8c00",
              "order": "5.002",
              "answer_option": [
                {
                  "name": " As per Census 2011",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "As per SFC Recommendations",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Whether Grants distributed as per Census 2011 or as per SFC recommendations?",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "grantDistribute",
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
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "643804ff10d7a646562ea7f3",
              "order": "5.003",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "\"If No, whether notification for constitution of SFC issued\"",
              "hint": "",
              "resource_urls": [],
              "label": "3",
              "shortKey": "sfcNotification",
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
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "643805561a51164651caca53",
              "order": "5.004",
              "answer_option": [],
              "title": "If yes - attach a copy of notification",
              "hint": "",
              "resource_urls": [],
              "label": "4",
              "shortKey": "sfcNotificationCopy",
              "viewSequence": "25",
              "child": [],
              "parent": [],
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
                  "value": "5120"
                },
                {
                  "error_msg": "",
                  "_id": "82",
                  "value": "1"
                }
              ],
              "restrictions": [],
              "input_type": "11",
              "weightage": []
            },
            {
              "information": "",
              "_id": "6438057e1a51164651cacab7",
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
              "title": "Project Details",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "643805b610d7a646562ea84e",
                    "order": "6.001",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Whether Project works undertaken are uploaded on the website",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "projectUndtkn",
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
                    "input_type": "5",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                    "answer": {
                      "answer": [
                        {
                          "label": "",
                          "textValue": "",
                          "value": ""
                        }
                      ],
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "6.001",
                      "shortKey": "projectUndtkn"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "6",
              "shortKey": "projectDetail",
              "viewSequence": "26",
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
              "_id": "643805b610d7a646562ea84e",
              "order": "6.001",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Whether Project works undertaken are uploaded on the website",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "projectUndtkn",
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
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "643805f010d7a646562ea891",
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
              "title": "Property Tax Notification Details",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "64380637bae92b464919201d",
                    "order": "7.001",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "Whether Property Tax Notification issued (if not already in force)?",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "propertyTaxNotif",
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
                    "input_type": "5",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
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
                      ],
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "7.001",
                      "shortKey": "propertyTaxNotif"
                    }
                  },
                  {
                    "information": "",
                    "_id": "6438067529e2ab464aea8d5c",
                    "order": "7.002",
                    "answer_option": [],
                    "title": "Attach a copy of Notification",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "propertyTaxNotifCopy",
                    "viewSequence": "30",
                    "child": [],
                    "parent": [],
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
                        "value": "5120"
                      },
                      {
                        "error_msg": "",
                        "_id": "82",
                        "value": "1"
                      }
                    ],
                    "restrictions": [],
                    "input_type": "11",
                    "weightage": [],
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "application/pdf, 5120, 1",
                    "acceptableFileType": [
                      "application/pdf",
                      "5120",
                      "1"
                    ],
                    "type": "11",
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
                          "textValue": "",
                          "label": "",
                          "value": ""
                        }
                      ],
                      "input_type": "11",
                      "nestedAnswer": [],
                      "order": "7.002",
                      "pattern": "",
                      "shortKey": "propertyTaxNotifCopy"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "7",
              "shortKey": "propertyTaxDetails",
              "viewSequence": "28",
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
              "_id": "64380637bae92b464919201d",
              "order": "7.001",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Whether Property Tax Notification issued (if not already in force)?",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "propertyTaxNotif",
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
              "input_type": "5",
              "weightage": []
            },
            {
              "information": "",
              "_id": "6438067529e2ab464aea8d5c",
              "order": "7.002",
              "answer_option": [],
              "title": "Attach a copy of Notification",
              "hint": "",
              "resource_urls": [],
              "label": "2",
              "shortKey": "propertyTaxNotifCopy",
              "viewSequence": "30",
              "child": [],
              "parent": [{value: "^([1])$", type: "5", order: "7.001"}],
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
                  "value": "5120"
                },
                {
                  "error_msg": "",
                  "_id": "82",
                  "value": "1"
                }
              ],
              "restrictions": [],
              "input_type": "11",
              "weightage": []
            },
            {
              "information": "",
              "_id": "643806a229e2ab464aea8da5",
              "order": "8",
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
              "title": "Linking to PFMS Details",
              "modelValue": "1",
              "selectedValue": [
                {
                  "label": "1",
                  "textValue": "",
                  "value": "1"
                }
              ],
              "childQuestionData": [
                [
                  {
                    "information": "",
                    "_id": "643806ccbae92b46491920ae",
                    "order": "8.001",
                    "answer_option": [
                      {
                        "name": "Yes",
                        "did": [],
                        "viewSequence": "1",
                        "_id": "1"
                      },
                      {
                        "name": "No",
                        "did": [],
                        "viewSequence": "2",
                        "_id": "2"
                      }
                    ],
                    "title": "\"Whether ULB account for 15th FC Grants linked to PFMS for all transactions \"",
                    "hint": "",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "accountLinked",
                    "viewSequence": "32",
                    "child": [],
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
                    "isQuestionDisabled": false,
                    "value": "",
                    "acceptableType": "",
                    "acceptableFileType": "",
                    "type": "5",
                    "visibility": true,
                    "nestedConfig": {
                      "parentOrder": "8",
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
                      "input_type": "5",
                      "nestedAnswer": [],
                      "order": "8.001",
                      "shortKey": "accountLinked"
                    }
                  }
                ]
              ],
              "hint": "",
              "resource_urls": [],
              "label": "8",
              "shortKey": "pfmsDetails",
              "viewSequence": "31",
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
              "_id": "643806ccbae92b46491920ae",
              "order": "8.001",
              "answer_option": [
                {
                  "name": "Yes",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "No",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "\"Whether ULB account for 15th FC Grants linked to PFMS for all transactions \"",
              "hint": "",
              "resource_urls": [],
              "label": "1",
              "shortKey": "accountLinked",
              "viewSequence": "32",
              "child": [],
              "parent": [],
              "validation": [
                {
                  "error_msg": "",
                  "_id": "1"
                }
              ],
              "restrictions": [],
              "input_type": "5",
              "weightage": []
            }
          ],
          "title": "GTC 1",
          "buttons": []
        }
      ],
      "canTakeAction": false,
      "isDraft": true,
      "status": "Not Started"
    }
  ],
  "message": "Form Questionare!"
};

const baseForm = {
  data: [
    {
      label: "1. GTCs for Non-Million Plus Cities Tied Grants",
      isDisabled: false,
      error: false,
      icon: "",
      questions: [
        {
          installment: 1,
          year: '606aadac4dff55e6c075c507',
          type: "nonmillion_tied",
          instlText: "1st Installment (2023-24)",
          quesText: "Upload Signed Grant Transfer Certificate",
          isDisableQues: false,
          disableMsg: "",
          key: "nonmillion_tied_2021-22_2",
          question: "(A) Upload Signed Grant Transfer Certificate - 1st Installment (2022-23)",
          questionresponse: staticResponse,
          qusType: "",
          isDraft: null,
          status: null,
          rejectReason_mohua: null,
          canTakeAction: false
        },
        {
          installment: 2,
          year: '606aafb14dff55e6c075d3ae',
          type: "nonmillion_tied",
          instlText: "2nd Installment (2023-24)",
          quesText: "Upload Signed Grant Transfer Certificate",
          isDisableQues: true,
          disableMsg: `1st Installment (2023-24) GTC has to be uploaded first before uploading 2nd Installment (2023-24) GTC`,
          question: "(B) Upload Signed Grant Transfer Certificate - 2nd Installment (2023-24)",
          questionresponse: staticResponse,
          key: "nonmillion_tied_2022-23_1",
          qusType: "",
          isDraft: null,
          status: null,
          rejectReason_mohua: null,
          canTakeAction: false
        }
      ],
    },
    {
      label: "2. GTCs for Non-Million Plus Cities Untied Grants",
      isDisabled: false,
      error: false,
      icon: "",
      questions: [
        {
          installment: 1,
          year: '606aafc14dff55e6c075d3ec',
          type: "nonmillion_untied",
          instlText: "1st Installment (2023-24)",
          quesText: "Upload Signed Grant Transfer Certificate",
          isDisableQues: false,
          disableMsg: "",
          question: "(A) Upload Signed Grant Transfer Certificate - 1st Installment (2023-24)",
          questionresponse: staticResponse,
          key: "nonmillion_untied_2021-22_2",
          qusType: "",
          isDraft: null,
          status: null,
          rejectReason_mohua: null,
          canTakeAction: false
        },
        {
          installment: 2,
          year: '606aafb14dff55e6c075d3ae',
          type: "nonmillion_untied",
          instlText: "2nd Installment (2023-24)",
          quesText: "Upload Signed Grant Transfer Certificate",
          isDisableQues: true,
          disableMsg: `1st Installment (2023-24) GTC has to be uploaded first before uploading 2nd Installment (2023-24) GTC`,
          question: "(B) Upload Signed Grant Transfer Certificate - 2nd Installment (2023-24)",
          questionresponse: staticResponse,
          key: "nonmillion_untied_2022-23_1",
          qusType: "",
          isDraft: null,
          status: null,
          rejectReason_mohua: null,
          responseFile_mohua: {
            name: '',
            url: '',
            progress: null
          },
          canTakeAction: false
        }
      ],
    },
    {
      label: "3. GTC for Million Plus Cities Tied Grants for Water Supply and SWM",
      isDisabled: false,
      error: false,
      icon: "",
      questions: [
        {
          installment: 1,
          year: '606aaf854dff55e6c075d219',
          type: "million_tied",
          instlText: "FY 2023-24",
          isDisableQues: false,
          quesText:
            "Upload Signed Grant Transfer Certificate for Water Supply and SWM",
          question:
            "(A) Upload Signed Grant Transfer Certificate for Water Supply and SWM - FY ( 2021-22)",
          questionresponse: staticResponse,
          key: "million_tied_2021-22_1",
          qusType: "",
          isDraft: null,
          status: null,
          rejectReason_mohua: null,
          canTakeAction: false
        }
      ],
    },
  ]
}


@Injectable({
  providedIn: 'root'
})
export class GtcService {

  constructor(
    private http: HttpClient
  ) { }

  getBaseForm(state: string, design_year: string) {
    return this.http.get(`${environment.api.url}grant-transfer-certificate/installmentForm?design_year=${design_year}&state=${state}`)
      .pipe(
        map((res: any) => {
          // return res;
          return baseForm;
        })
      );
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/grant-transfer-certificate/installmentForm`, body);
  }
}
