import { Component, OnInit } from '@angular/core';

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
            _id: '6062bab22593ae5edeab92d7',
            lng: 'en',
            title: 'Harsh Test',
            question: [
              {
                "label": "1",
                "shortKey": "design_year",
                "viewSequence": "1",
                "child": [],
                "parent": [],
                "_id": "63fee91d949838061af5f20b",
                "order": "1",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "2023-24",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Year of 15th FC Module Design",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "2",
                "shortKey": "financialYear",
                "viewSequence": "2",
                "child": [],
                "parent": [],
                "_id": "63feebf5949838061af5f29f",
                "order": "5",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "2022-23",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Detailed Utilisation report in respect of 15th finance commission tied grants for year",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "3",
                "shortKey": "ulb",
                "viewSequence": "3",
                "child": [],
                "parent": [],
                "_id": "63fee9cb949838061af5f223",
                "order": "3",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Name of MPC/UA/NMPC",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "4",
                "shortKey": "grantType",
                "viewSequence": "4",
                "child": [],
                "parent": [],
                "_id": "63feeb3d949838061af5f268",
                "order": "4",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Type of Grant",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "",
                "shortKey": "Section",
                "viewSequence": "5",
                "child": [],
                "parent": [],
                "_id": "63feeef4949838061af5f2c6",
                "order": "6",
                "validation": [
                  {
                    "_id": "54",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "10",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "15th FC Tied Grant Status for the Financial Year 2022-23*",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "5",
                "shortKey": "unUtilizedPrevYr",
                "viewSequence": "6",
                "child": [],
                "parent": [],
                "_id": "63feefa9949838061af5f2d9",
                "order": "7",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "i. Unutilised Tied Grants from previous installment (INR in lakhs)",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "6",
                "shortKey": "receivedDuringYr",
                "viewSequence": "7",
                "child": [],
                "parent": [],
                "_id": "63fef111949838061af5f2f7",
                "order": "8",
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
                "maxRange": 6,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-5])(?:\\.\\d{1,3})?|6))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": "",
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "ii. 15th F.C. Tied grant received for the year (1st & 2nd installment taken together) (INR in lakhs)",
                "hint": "In case, the second installment for FY 2022-23 is received in the next financial year, ie. FY 2023-24, please write the full amount with respect to allocated grant for FY 2022-23.",
                "resource_urls": []
              },
              {
                "label": "7",
                "shortKey": "expDuringYr",
                "viewSequence": "8",
                "child": [],
                "parent": [],
                "_id": "63fef1e7949838061af5f519",
                "order": "9",
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
                "maxRange": 6,
                "min": 1,
                "max": 4,
                "pattern": "^((?:^([0-5])(?:\\.\\d{1,3})?|6))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": "",
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "iii. Expenditure incurred during the year i.e. as on 31st March 2023 from Tied grant (INR in lakhs)",
                "hint": "Show if expDuringYr Not Equal to Sum of (wmTotalUtilized + swmTotalUtilized)",
                "resource_urls": []
              },
              {
                "label": "8",
                "shortKey": "closingBal",
                "viewSequence": "9",
                "child": [],
                "parent": [],
                "_id": "63fef5d6949838061af5f5f7",
                "order": "10",
                "validation": [
                  {
                    "_id": "3",
                    "error_msg": ""
                  },
                  {
                    "error_msg": "",
                    "_id": "1"
                  },
                  {
                    "_id": "15",
                    "error_msg": ""
                  },
                  {
                    "error_msg": "",
                    "_id": "2"
                  },
                  {
                    "_id": "14",
                    "error_msg": "",
                    "value": "0.00"
                  },
                  {
                    "_id": "5",
                    "error_msg": "",
                    "value": "(receivedDuringYr+expDuringYr)"
                  },
                  {
                    "_id": "5.1",
                    "error_msg": "",
                    "value": "(receivedDuringYr+expDuringYr)"
                  }
                ],
                "restrictions": [],
                "minRange": -999999,
                "maxRange": 999999,
                "min": 7,
                "max": 9,
                "pattern": "^((?:^((?:-[1-9]|-[1-9][0-9]{1,5}|[0-9]|[1-9][0-9]{1,4}|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-8]))(?:\\.\\d{1,3})?|999999))$",
                "input_type": "2",
                "weightage": [],
                "valueHolder": "",
                "formula": "(receivedDuringYr+expDuringYr)",
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "Closing balance at the end of year (INR in lakhs)( i + ii - iii )",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "",
                "shortKey": "order11",
                "viewSequence": "10",
                "child": [],
                "parent": [],
                "_id": "63fef7e28940680619271c7e",
                "order": "11",
                "validation": [
                  {
                    "_id": "54",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "10",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Component Wise Utilisation of Tied grants as on 31st March 2023 *",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "",
                "shortKey": "order12",
                "viewSequence": "11",
                "child": [],
                "parent": [],
                "_id": "63fef7f78940680619271c9c",
                "order": "12",
                "validation": [
                  {
                    "_id": "54",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "10",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Water Management (WM)",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "9",
                "shortKey": "order13",
                "viewSequence": "12",
                "child": [],
                "parent": [],
                "_id": "63fef8168940680619271cd3",
                "order": "13",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Sector",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "10",
                "shortKey": "wmTiedGrantUtilized",
                "viewSequence": "13",
                "child": [],
                "parent": [],
                "_id": "63fef8b6949838061af5fdd6",
                "order": "14",
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
                "editable": false,
                "information": "Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled.",
                "answer_option": [],
                "title": "Total Tied Grant Utilised on WM(INR in lakhs) As of 31st March 2023",
                "hint": "Number",
                "resource_urls": []
              },
              {
                "label": "11",
                "shortKey": "order15",
                "viewSequence": "14",
                "child": [],
                "parent": [],
                "_id": "63fef9888940680619272327",
                "order": "15",
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
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "Number of Projects Undertaken",
                "hint": "Number",
                "resource_urls": []
              },
              {
                "label": "12",
                "shortKey": "order16",
                "viewSequence": "15",
                "child": [],
                "parent": [],
                "_id": "63fef9f3894068061927238e",
                "order": "16",
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
                "editable": false,
                "information": "i = The Total Project cost for all projects combined, As per DPR, to be metioned. For Ex: If there are two projects. one for 100 Cr and another for 50 Cr, then combined cost i.e. will be entered in the total project cost.  ",
                "answer_option": [],
                "title": "Total Project Cost Involved(INR in lakhs)",
                "hint": "Numeric",
                "resource_urls": []
              },
              {
                "label": "",
                "shortKey": "Sub Section",
                "viewSequence": "16",
                "child": [],
                "parent": [],
                "_id": "63fefbb5949838061af60580",
                "order": "17",
                "validation": [
                  {
                    "_id": "54",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "10",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Solid Waste Management (SWM)",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "13",
                "shortKey": "order18",
                "viewSequence": "17",
                "child": [],
                "parent": [],
                "_id": "63fefbe2949838061af605a9",
                "order": "18",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Sector",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "14",
                "shortKey": "swmTiedGrantUtilized",
                "viewSequence": "18",
                "child": [],
                "parent": [],
                "_id": "63fefc3b8940680619272ae8",
                "order": "19",
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
                "editable": false,
                "information": "i = Total 15th FC tied grant utilized during the year as on 31st march 2023. The Outlay of the of the tied grant in the total project cost may be different. Only the amount spent out of the envisioned XV FC tied grant has to be filled.",
                "answer_option": [],
                "title": "Total Tied Grant Utilised on SWM(INR in lakhs) As of 31st March 2023",
                "hint": "Number",
                "resource_urls": []
              },
              {
                "label": "15",
                "shortKey": "order20",
                "viewSequence": "19",
                "child": [],
                "parent": [],
                "_id": "63fefcce8940680619272ea5",
                "order": "20",
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
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "Number of Projects Undertaken",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "16",
                "shortKey": "order21",
                "viewSequence": "20",
                "child": [],
                "parent": [],
                "_id": "63fefd708940680619272fac",
                "order": "21",
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
                "editable": false,
                "information": "i = The Total Project cost for all projects combined, As per DPR, to be mentioned. For Ex: If there are two projects. one for 100 Cr and another for 50 Cr, then combined cost i.e. will be entered in the total project cost.  ",
                "answer_option": [],
                "title": "Total Project Cost Involved(INR in lakhs)",
                "hint": "Number",
                "resource_urls": []
              },
              {
                "label": "",
                "shortKey": "order22",
                "viewSequence": "21",
                "child": [],
                "parent": [],
                "_id": "63ff09d289406806192732a6",
                "order": "22",
                "validation": [
                  {
                    "_id": "54",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "10",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Project Details as on 31st March 2023",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "17",
                "shortKey": "order23",
                "viewSequence": "22",
                "child": [],
                "parent": [],
                "_id": "63ff09fe89406806192732da",
                "order": "23",
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
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Name of the Project",
                "hint": "Text",
                "resource_urls": []
              },
              {
                "label": "18",
                "shortKey": "order24",
                "viewSequence": "23",
                "child": [],
                "parent": [],
                "_id": "63ff0a33894068061927330f",
                "order": "24",
                "validation": [
                  {
                    "_id": "1",
                    "error_msg": ""
                  }
                ],
                "restrictions": [],
                "input_type": "3",
                "weightage": [],
                "editable": false,
                "information": "",
                "answer_option": [
                  {
                    "name": "Yes",
                    "did": [],
                    "viewSequence": "1",
                    "coordinates": [],
                    "_id": "1"
                  }
                ],
                "title": "Sector",
                "hint": "Dropdown",
                "resource_urls": []
              },
              {
                "label": "19",
                "shortKey": "startDate",
                "viewSequence": "24",
                "child": [],
                "parent": [],
                "_id": "63ff0b42894068061927334b",
                "order": "25",
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
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Project Start Date",
                "hint": "Past or Present Date ",
                "resource_urls": []
              },
              {
                "label": "20",
                "shortKey": "completionDate",
                "viewSequence": "25",
                "child": [],
                "parent": [],
                "_id": "63ff1165894068061927339e",
                "order": "26",
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
                "restrictions": [
                  {
                    "_id": "63ff116589406806192733d3",
                    "orders": [
                      {
                        "_id": "63ff116589406806192733d4",
                        "order": "25",
                        "value": ""
                      }
                    ],
                    "type": "3"
                  }
                ],
                "input_type": "14",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Project Completion Date",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "21",
                "shortKey": "order27",
                "viewSequence": "26",
                "child": [],
                "parent": [],
                "_id": "63ff12f38940680619273468",
                "order": "27",
                "min": null,
                "max": null,
                "minRange": null,
                "maxRange": null,
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "input_type": "19",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Geo-Coordinates - Latitude",
                "hint": "Latitude",
                "resource_urls": []
              },
              {
                "label": "22",
                "shortKey": "order28",
                "viewSequence": "27",
                "child": [],
                "parent": [],
                "_id": "63ff1314949838061af60ddd",
                "order": "28",
                "min": null,
                "max": null,
                "minRange": null,
                "maxRange": null,
                "pattern": "",
                "validation": [
                  {
                    "error_msg": "",
                    "_id": "1"
                  }
                ],
                "restrictions": [],
                "input_type": "19",
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Geo-Coordinates - Longitude",
                "hint": "Longitude",
                "resource_urls": []
              },
              {
                "label": "23",
                "shortKey": "cost",
                "viewSequence": "28",
                "child": [],
                "parent": [],
                "_id": "63ff13718940680619273556",
                "order": "29",
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
                "editable": false,
                "information": "i = The total project cost is as per the DPR.",
                "answer_option": [],
                "title": "\"Total Project Cost (INR in lakhs)\"",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "24",
                "shortKey": "expenditure",
                "viewSequence": "29",
                "child": [],
                "parent": [],
                "_id": "63ff13e88940680619273631",
                "order": "30",
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
                "editable": false,
                "information": "i = This is the outlay from 15th FC grant out of the total project cost. For Ex: If project total cost is 100 Cr, out of which 80 Cr is sourced from AMRUT 2.0, rest 20 Cr is sourced from 15th FC tied grants, then 20 Cr should be entered here. Please do not enter the expenditure incurred.",
                "answer_option": [],
                "title": "\"Amount of 15th FC Grants in Total Project Cost (INR in lakhs)\"",
                "hint": "Number",
                "resource_urls": []
              },
              {
                "label": "25",
                "shortKey": "order31",
                "viewSequence": "30",
                "child": [],
                "parent": [],
                "_id": "63ff14ee8940680619273776",
                "order": "31",
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
                "formula": "((expenditure/cost)*100)",
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "% of 15th FC Grants in Total Project Cost",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "26",
                "shortKey": "order32",
                "viewSequence": "31",
                "child": [],
                "parent": [],
                "_id": "63ff1d6e894068061927556d",
                "order": "32",
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
                "editable": false,
                "information": "",
                "answer_option": [],
                "title": "Total (INR in lakhs)",
                "hint": "",
                "resource_urls": []
              },
              {
                "label": "27",
                "shortKey": "name",
                "viewSequence": "32",
                "child": [],
                "parent": [],
                "_id": "63ff1dbd949838061af6337e",
                "order": "33",
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
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Name",
                "hint": "Text",
                "resource_urls": []
              },
              {
                "label": "28",
                "shortKey": "designation",
                "viewSequence": "33",
                "child": [],
                "parent": [],
                "_id": "63ff1ddf894068061927580b",
                "order": "34",
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
                "editable": false,
                "weightage": [],
                "information": "",
                "answer_option": [],
                "title": "Designation",
                "hint": "Text",
                "resource_urls": []
              },
              {
                "label": "29",
                "shortKey": "order35",
                "viewSequence": "34",
                "child": [],
                "parent": [],
                "_id": "63ff1e5a894068061927585f",
                "order": "35",
                "validation": [],
                "restrictions": [],
                "input_type": "22",
                "editable": false,
                "weightage": [],
                "information": "",
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
                    "viewSequence": "2",
                    "coordinates": [],
                    "_id": "2"
                  }
                ],
                "title": "Declaration",
                "hint": "",
                "resource_urls": [
                  {
                    "download": true,
                    "_id": "63ff1e5a8940680619275884",
                    "label": "",
                    "url": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/consent_8e3f447e-4f34-4fd0-8ef1-a65a74340ac3.txt"
                  }
                ]
              }
            ],
            buttons: [],
          },
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  }

  constructor() { }

  ngOnInit(): void {
  }

}
