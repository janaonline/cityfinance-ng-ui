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
          console.log('getForm', mFormConverter('encode', response));
          return mFormConverter('encode', response);
        })
      );
  }
  getProjects(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}/getProjects?ulb=${ulb}&design_year=${design_year}&formId=4`)
      .pipe(
        map((response: any) => {
          console.log('projects :::', response);
          if (response.data?.length === 0) {
            response.data = defaultProject;
          }
          return response;
        })
      );
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/utilization-report`, mFormConverter('decode', body));
  }
}
