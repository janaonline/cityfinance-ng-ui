import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { queryParam } from 'src/app/fc-grant-2324-onwards/fc-shared/common-interface';

import { SweetAlert } from "sweetalert/typings/core";
import { isThisMinute } from 'date-fns';
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss']
})
export class CommonFormComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices: CommonServicesService
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
      formId: null,
      ulb: this.ulbId
    };
    this.checkRouterForApi();
  //  this.getLeftMenu();
  }
  ulbId = '';
  userData: object | any;
  designYearArray = [];
  getQuery: queryParam = {
    design_year: '606aafc14dff55e6c075d3ec',
    formId: null,
    ulb: null
  };
  endPoints: string = null
  postData = {
    // design_year : null,
    // data : [ ]
  };
  formName: string = '';
  isApiComplete: boolean = false;
  ratingMarksArray = [];
  questionResponse: any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {

          _id: '5f4656c92daa9921dc1173aa',
          formId: 2,
          "language": [
            // {
            //   "_id": "63fc56abd4434c05939ac5e9",
            //   "lng": "en",
            //   "question": [
            //     {
            //       "information": "",
            //       "_id": "63fc53dad4434c05939ac50c",
            //       "order": "1",
            //       "modelName": "Rating",
            //       "modelFilter": {
            //         "formName": "odf",
            //         "financialYear": ""
            //       },
            //       "answer_option": [
            //         {
            //           "name": "ODF",
            //           "did": [],
            //           "viewSequence": "1",
            //           "coordinates": [],
            //           "_id": "1"
            //         },
            //         {
            //           "name": "ODF+",
            //           "did": [],
            //           "viewSequence": "2",
            //           "coordinates": [],
            //           "_id": "2"
            //         },
            //         {
            //           "name": "ODF++",
            //           "did": [],
            //           "viewSequence": "3",
            //           "coordinates": [],
            //           "_id": "3"
            //         },
            //         {
            //           "name": "Non ODF",
            //           "did": [],
            //           "viewSequence": "4",
            //           "coordinates": [],
            //           "_id": "4"
            //         },
            //         {
            //           "name": "No Rating",
            //           "did": [],
            //           "viewSequence": "5",
            //           "coordinates": [],
            //           "_id": "5"
            //         }
            //       ],
            //       "title": "Open Defecation Free (ODF) Rating",
            //       "hint": "Single Select",
            //       "resource_urls": [],
            //       "label": "1",
            //       "shortKey": "odfRating",
            //       "viewSequence": "1",
            //       "child": [
            //         {
            //           "type": "11",
            //           "value": "^([1]|[2]|[3]|[4])$",
            //           "order": "3"
            //         },
            //         {
            //           "type": "14",
            //           "value": "^([1]|[2]|[3]|[4])$",
            //           "order": "6"
            //         },
            //         {
            //           "type": "11",
            //           "value": "^([5])$",
            //           "order": "2"
            //         }
            //       ],
            //       "parent": [],
            //       "validation": [
            //         {
            //           "_id": "1",
            //           "error_msg": ""
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "3",
            //       "weightage": [],
            //       "editable": false
            //     },
            //     {
            //       "information": "",
            //       "_id": "63fc5529d4434c05939ac521",
            //       "order": "2",
            //       "answer_option": [],
            //       "title": "Upload Declaration?",
            //       "hint": "Upload PDF",
            //       "resource_urls": [],
            //       "label": "2",
            //       "shortKey": "cert_declaration",
            //       "viewSequence": "2",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([5])$",
            //           "type": "3",
            //           "order": "1"
            //         }
            //       ],
            //       "min": null,
            //       "max": null,
            //       "minRange": null,
            //       "maxRange": null,
            //       "pattern": "",
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "83",
            //           "value": "application/pdf"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "81",
            //           "value": "5120"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "82",
            //           "value": "1"
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "11",
            //       "editable": false,
            //       "weightage": []
            //     },
            //     {
            //       "information": "",
            //       "_id": "63fc556dd4434c05939ac535",
            //       "order": "3",
            //       "answer_option": [],
            //       "title": "Upload ODF Certificate?",
            //       "hint": "Upload PDF",
            //       "resource_urls": [],
            //       "label": "3",
            //       "shortKey": "cert",
            //       "viewSequence": "3",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([1]|[2]|[3]|[4])$",
            //           "type": "3",
            //           "order": "1"
            //         }
            //       ],
            //       "min": null,
            //       "max": null,
            //       "minRange": null,
            //       "maxRange": null,
            //       "pattern": "",
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "83",
            //           "value": "application/pdf"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "81",
            //           "value": "5120"
            //         },
            //         {
            //           "error_msg": "",
            //           "_id": "82",
            //           "value": "1"
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "11",
            //       "editable": false,
            //       "weightage": []
            //     },
            //     {
            //       "information": "",
            //       "_id": "6405ee6e2638a6093d1b7123",
            //       "order": "6",
            //       "answer_option": [],
            //       "title": "Certification Issue Date",
            //       "hint": "Date",
            //       "resource_urls": [],
            //       "label": "4",
            //       "shortKey": "certDate",
            //       "viewSequence": "4",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([1]|[2]|[3]|[4])$",
            //           "type": "3",
            //           "order": "1"
            //         }
            //       ],
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         },
            //         {
            //           "_id": "26.4",
            //           "error_msg": "",
            //           "value": "2"
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "14",
            //       "editable": false,
            //       "weightage": []
            //     }
            //   ],
            //   "title": "Open Defecation Free (ODF)",
            //   "buttons": []
            // }
          ],
          groupOrder: 37,
          createDynamicOption: [],
          getDynamicOption: [],
        },


    ],
  };
  statusId: number = 1;
  odfJson = {

          "_id": "64219c9dd7bd0c129dfdc260",
          "lng": "en",
          "question": [
              {
                  "information": "",
                  "_id": "63fc53dad4434c05939ac50c",
                  "order": "1",
                  "answer_option": [
                      {
                          "name": "ODF",
                          "did": [],
                          "viewSequence": "1",
                          "coordinates": [],
                          "_id": "1"
                      },
                      {
                          "name": "ODF+",
                          "did": [],
                          "viewSequence": "2",
                          "coordinates": [],
                          "_id": "2"
                      },
                      {
                          "name": "ODF++",
                          "did": [],
                          "viewSequence": "3",
                          "coordinates": [],
                          "_id": "3"
                      },
                      {
                          "name": "Non ODF",
                          "did": [],
                          "viewSequence": "4",
                          "coordinates": [],
                          "_id": "4"
                      },
                      {
                          "name": "No Rating",
                          "did": [],
                          "viewSequence": "5",
                          "coordinates": [],
                          "_id": "5"
                      }
                  ],
                  "title": "Open Defecation Free (ODF) Rating",
                  "hint": "Single Select",
                  "resource_urls": [],
                  "label": "1",
                  "shortKey": "rating",
                  "viewSequence": "1",
                  "child": [
                      {
                          "type": "11",
                          "value": "^([1]|[2]|[3]|[4])$",
                          "order": "3"
                      },
                      {
                          "type": "14",
                          "value": "^([1]|[2]|[3]|[4])$",
                          "order": "6"
                      },
                      {
                          "type": "11",
                          "value": "^([5])$",
                          "order": "2"
                      }
                  ],
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
                  "editable": false
              },
              {
                  "information": "",
                  "_id": "63fc5529d4434c05939ac521",
                  "order": "2",
                  "answer_option": [],
                  "title": "Upload Declaration?",
                  "hint": "Upload PDF",
                  "resource_urls": [],
                  "label": "2",
                  "shortKey": "cert_declaration",
                  "viewSequence": "2",
                  "child": [],
                  "parent": [
                      {
                          "value": "^([5])$",
                          "type": "3",
                          "order": "1"
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
                  "editable": false,
                  "weightage": []
              },
              {
                  "information": "",
                  "_id": "63fc556dd4434c05939ac535",
                  "order": "3",
                  "answer_option": [],
                  "title": "Upload ODF Certificate?",
                  "hint": "Upload PDF",
                  "resource_urls": [],
                  "label": "3",
                  "shortKey": "cert",
                  "viewSequence": "3",
                  "child": [],
                  "parent": [
                      {
                          "value": "^([1]|[2]|[3]|[4])$",
                          "type": "3",
                          "order": "1"
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
                  "editable": false,
                  "weightage": []
              },
              {
                  "information": "",
                  "_id": "6405ee6e2638a6093d1b7123",
                  "order": "6",
                  "answer_option": [],
                  "title": "Certification Issue Date",
                  "hint": "Date",
                  "resource_urls": [],
                  "label": "4",
                  "shortKey": "certDate",
                  "viewSequence": "4",
                  "child": [],
                  "parent": [
                      {
                          "value": "^([1]|[2]|[3]|[4])$",
                          "type": "3",
                          "order": "1"
                      }
                  ],
                  "validation": [
                      {
                          "error_msg": "",
                          "_id": "1"
                      },
                      {
                          "_id": "26.4",
                          "error_msg": "",
                          "value": "2"
                      }
                  ],
                  "restrictions": [],
                  "input_type": "14",
                  "editable": false,
                  "weightage": []
              }
          ],
          "title": "Open Defecation Free (ODF)",
          "buttons": []
  };
  gfcJson = {
    "_id": "64096fa1235a2809db049260",
    "lng": "en",
    "question": [
      {
        "information": "",
        "_id": "63fde71b894068061927048d",
        "order": "1",
        "answer_option": [
          {
            "name": "No Star",
            "did": [],
            "viewSequence": "1",
            "coordinates": [],
            "_id": "1"
          },
          {
            "name": "1 Star",
            "did": [],
            "viewSequence": "2",
            "coordinates": [],
            "_id": "2"
          },
          {
            "name": "3 Star",
            "did": [],
            "viewSequence": "3",
            "coordinates": [],
            "_id": "3"
          },
          {
            "name": "5 Star",
            "did": [],
            "viewSequence": "4",
            "coordinates": [],
            "_id": "4"
          },
          {
            "name": "7 Star",
            "did": [],
            "viewSequence": "5",
            "coordinates": [],
            "_id": "5"
          },
          {
            "name": "No Rating",
            "did": [],
            "viewSequence": "6",
            "coordinates": [],
            "_id": "6"
          }
        ],
        "title": "Garbage Free City (GFC) Rating",
        "hint": "Single Select",
        "resource_urls": [],
        "label": "1",
        "shortKey": "rating",
        "viewSequence": "1",
        "child": [
          {
            "type": "11",
            "value": "^([1]|[2]|[3]|[4]|[5])$",
            "order": "2"
          },
          {
            "type": "11",
            "value": "^([6])$",
            "order": "4"
          },
          {
            "type": "14",
            "value": "^([1]|[2]|[3]|[4]|[5])$",
            "order": "3"
          }
        ],
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
        "editable": false
      },
      {
        "information": "",
        "_id": "63fde765894068061927049a",
        "order": "2",
        "answer_option": [],
        "title": "Upload GFC Certificate",
        "hint": "Upload PDF",
        "resource_urls": [],
        "label": "2",
        "shortKey": "cert",
        "viewSequence": "2",
        "child": [],
        "parent": [
          {
            "value": "^([1]|[2]|[3]|[4]|[5])$",
            "type": "3",
            "order": "1"
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
        "editable": false,
        "weightage": []
      },
      {
        "information": "",
        "_id": "63fde7ca89406806192704ad",
        "order": "3",
        "answer_option": [],
        "title": "Certification Issue Date",
        "hint": "Date ",
        "resource_urls": [],
        "label": "4",
        "shortKey": "certDate",
        "viewSequence": "4",
        "child": [],
        "parent": [
          {
            "value": "^([1]|[2]|[3]|[4]|[5])$",
            "type": "3",
            "order": "1"
          }
        ],
        "validation": [
          {
            "error_msg": "",
            "_id": "1"
          },
          {
            "_id": "26.4",
            "error_msg": "",
            "value": "2"
          }
        ],
        "restrictions": [],
        "input_type": "14",
        "editable": false,
        "weightage": []
      },
      {
        "information": "",
        "_id": "63fde84c89406806192704dc",
        "order": "4",
        "answer_option": [],
        "title": "Upload Declaration",
        "hint": "Upload PDF",
        "resource_urls": [],
        "label": "3",
        "shortKey": "cert_declaration",
        "viewSequence": "3",
        "child": [],
        "parent": [
          {
            "value": "^([6])$",
            "type": "3",
            "order": "1"
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
        "editable": false,
        "weightage": []
      }
    ],
    "title": "Garbage Free City (GFC)",
    "buttons": []
  }
  ptoJson = {
    "_id": "63ff042889406806192731be",
    "lng": "en",
    "question": [
      {
        "label": "1",
        "shortKey": "toCollect",
        "information": "",
        "viewSequence": "1",
        "child": [
          {
            "value": "^([1])$",
            "order": "2",
            "type": 5
          }
        ],
        "parent": [],
        "_id": "63fefd478940680619272f9b",
        "order": "1",
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
        "title": "Are you collecting Property Taxes in 2022-23?",
        "hint": "Single select",
        "resource_urls": [],
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
        "label": "2",
        "shortKey": "operationalize",
        "information": "i = \"Operationalization may include any or all of the following steps: 1) Notifying the property tax floor rate as per state notification, in the governing council/official gazette  2) Publishing the revised Property Tax rate card as per state notification, in the public domain 3) Updating the existing systems and processes, including training ULB revenue officials, running public awareness campaigns, updating IT systems, etc., to ensure collection under the new property tax rates/regime\"",
        "viewSequence": "2",
        "child": [
          {
            "type": "11",
            "value": "^([1])$",
            "order": "3"
          }
        ],
        "parent": [
          {
            "type": "5",
            "value": "^([1])$",
            "order": "1"
          }
        ],
        "_id": "63fefdd28940680619272fe4",
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
        "title": "Has the Property Tax collection process been operationalized as per the state notification?",
        "hint": "",
        "resource_urls": [],
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
        "label": "3",
        "shortKey": "proof",
        "information": "Upload copy of council resolution/gazette notification or any other proof",
        "viewSequence": "3",
        "child": [],
        "parent": [
          {
            "value": "^([1])$",
            "type": "5",
            "order": "2"
          }
        ],
        "_id": "63fefe748940680619272ff8",
        "order": "3",
        "answer_option": [],
        "title": "Proof of operationalization of Property Tax Collection Process as per state notification",
        "hint": "Upload Pdf",
        "resource_urls": [],
        "min": null,
        "max": null,
        "pattern": "",
        "validation": [
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
        "label": "4",
        "shortKey": "method",
        "information": "",
        "viewSequence": "4",
        "child": [
          {
            "value": "^([4])$",
            "order": "5",
            "type": 1
          }
        ],
        "parent": [],
        "_id": "63feff61894068061927300b",
        "order": "4",
        "answer_option": [
          {
            "name": "Unit Area Value(UAV) System",
            "did": [],
            "viewSequence": "1",
            "coordinates": [],
            "_id": "1"
          },
          {
            "name": "Annual Rental Value(ARV) System",
            "did": [],
            "viewSequence": "2",
            "coordinates": [],
            "_id": "2"
          },
          {
            "name": "Capital Value (CV) System",
            "did": [],
            "viewSequence": "3",
            "coordinates": [],
            "_id": "3"
          },
          {
            "name": "Other",
            "did": [],
            "viewSequence": "4",
            "coordinates": [],
            "_id": "4"
          }
        ],
        "title": "Property Tax Valuation Method",
        "hint": "",
        "resource_urls": [],
        "validation": [
          {
            "_id": "1",
            "error_msg": ""
          }
        ],
        "restrictions": [],
        "input_type": "3",
        "weightage": [],
        "editable": false
      },
      {
        "label": "5",
        "shortKey": "other_info",
        "information": "",
        "viewSequence": "5",
        "child": [],
        "parent": [
          {
            "type": "3",
            "value": "^([4])$",
            "order": "4"
          }
        ],
        "_id": "63feffe98940680619273024",
        "order": "5",
        "answer_option": [],
        "title": "Please specify, Others",
        "hint": "",
        "resource_urls": [],
        "pattern": "",
        "validation": [
          {
            "error_msg": "",
            "_id": "1"
          }
        ],
        "restrictions": [],
        "min": 1,
        "max": 400,
        "input_type": "1",
        "editable": false,
        "weightage": []
      },
      {
        "label": "6",
        "shortKey": "rateCard",
        "information": "",
        "viewSequence": "6",
        "child": [],
        "parent": [],
        "_id": "63ff006e894068061927306c",
        "order": "6",
        "answer_option": [],
        "title": "Upload a copy of Property Tax Rate Card",
        "hint": "Upload Pdf*",
        "resource_urls": [],
        "min": null,
        "max": null,
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
        "label": "7",
        "shortKey": "collection2019_20",
        "information": "\"Property Tax Collection should be sum of current and arrears collection as per Demand Collection Balance(DCB) Register",
        "viewSequence": "7",
        "child": [],
        "parent": [],
        "_id": "63ff021389406806192730d3",
        "order": "7",
        "answer_option": [],
        "title": "Property Tax Collection for 2019-20",
        "hint": "",
        "resource_urls": [],
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
        "min": 1,
        "max": 2,
        "pattern": "^((?:[0-9]|1[0-5]))$",
        "input_type": "2",
        "weightage": [],
        "editable": false
      },
      {
        "label": "8",
        "shortKey": "collection2020_21",
        "information": "Property Tax Collection should be sum of current and arrears collection as per Demand Collection Balance(DCB) Register",
        "viewSequence": "8",
        "child": [],
        "parent": [],
        "_id": "63ff027c89406806192730f0",
        "order": "8",
        "answer_option": [],
        "title": "Property Tax Collection for 2020-21",
        "hint": "",
        "resource_urls": [],
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
        "min": 1,
        "max": 2,
        "pattern": "^((?:[0-9]|1[0-5]))$",
        "input_type": "2",
        "weightage": [],
        "editable": false
      },
      {
        "label": "9",
        "shortKey": "collection2021_22",
        "information": "Property Tax Collection should be sum of current and arrears collection as per Demand Collection Balance(DCB) Register",
        "viewSequence": "9",
        "child": [],
        "parent": [],
        "_id": "63ff02dd8940680619273110",
        "order": "9",
        "answer_option": [],
        "title": "Property Tax Collection for 2021-22",
        "hint": "",
        "resource_urls": [],
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
        "min": 1,
        "max": 2,
        "pattern": "^((?:[0-9]|1[0-5]))$",
        "input_type": "2",
        "weightage": [],
        "editable": false
      },
      {
        "label": "10",
        "shortKey": "target2022_23",
        "information": "Property Tax Collection Target calculation should be based on Demand Collection Balance(DCB) Register",
        "viewSequence": "10",
        "child": [],
        "parent": [],
        "_id": "63ff03308940680619273131",
        "order": "10",
        "answer_option": [],
        "title": "Property Tax Collection Target for 2022-23",
        "hint": "",
        "resource_urls": [],
        "validation": [
          {
            "error_msg": "",
            "_id": "2"
          }
        ],
        "restrictions": [],
        "min": 1,
        "max": 2,
        "pattern": "^((?:[0-9]|1[0-5]))$",
        "input_type": "2",
        "weightage": [],
        "editable": false
      },
      {
        "label": "11",
        "shortKey": "ptCollection",
        "information": "Info - Please upload a copy of DCB",
        "viewSequence": "11",
        "child": [],
        "parent": [],
        "_id": "63ff03f38940680619273179",
        "order": "11",
        "answer_option": [],
        "title": "Upload proof for property tax collection for 2021-22",
        "hint": "Upload Pdf*",
        "resource_urls": [],
        "min": null,
        "max": null,
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
      }
    ],
    "title": "Property Tax Operationalisation",
    "buttons": []
  }

  fileFolderName: string = '';
  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`
  //  nextBtnUrl:string='../odf';
  //  backBtnUrl:string='#';
   routerSubs:any;
  ngOnInit(): void {

  }
  checkRouterForApi() {
  this.routerSubs = this.router.events.subscribe((event) => {
      let urlArray;
      if (event instanceof NavigationEnd) {
        urlArray = event.url.split("/");
        console.log('url....', event)
        this.isApiComplete = false;
        console.log('url.......', urlArray);
        this.questionResponse.data[0] = [];
        if (urlArray.includes("odf")) {
          this.endPoints = 'gfc-odf-form-collection';
          this.getQuery.isGfc = false;
          this.formName = 'odf';
          this.getQuery.formId = 1;
          this.getScroing('odf', this.getQuery.design_year);
          this.callGetApi(this.endPoints, this.getQuery);
        } else if (urlArray.includes("gfc")) {
          this.endPoints = 'gfc-odf-form-collection';
          this.getQuery.isGfc = true;
          this.formName = 'gfc';
          this.getQuery.formId = 2;
          this.getScroing('gfc', this.getQuery.design_year);
          this.callGetApi(this.endPoints, this.getQuery);
        } else if (urlArray.includes("ptax")) {
          this.endPoints = 'ptax';
          this.formName = 'ptax';
          this.callGetApi(this.endPoints, this.getQuery);
        } else {

        }
        //folder: "ULB/2022-23/odf/UK030"
        // this.nextBtnUrl = this.formName == 'odf' ? '../gfc' : '#';
        // this.backBtnUrl = this.formName == 'odf' ? '../annual_acc' : '../odf';
        this.fileFolderName = `${this.userData?.role}/2023-24/${this.formName}/${this.userData?.ulbCode}`
      }
    });
  }
  callGetApi(endPoints: string, queryParams: {}) {

    if (this.endPoints == 'ptax') {
      this.questionResponse.data[0] = {
        language: [
          this.ptoJson
        ]
      }
      this.isApiComplete = true;
    }
    this.commonServices.formGetMethod(endPoints, queryParams).subscribe((res: any) => {
      console.log('res.........', res);
      this.questionResponse.data = res.data;
      console.log('res.........', this.questionResponse);
      this.questionResponse = {
        ...JSON.parse(JSON.stringify(this.questionResponse))
      }

      this.isApiComplete = true;
      this.routerSubs.unsubscribe();
    },
      (error) => {
        console.log('error', error);
      })
  }

  resData(e) {
    console.log('ResData..................', e);
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
      "isGfc": this.getQuery.isGfc,
      "isDraft": draft,
      "status": this.statusId,
      data: finalData
    }
    this.commonServices.formPostMethod(this.postData, this.endPoints).subscribe((res) => {
      swal("Saved", `Data saved ${draft ? 'as draft' : ''} successfully`, "success");
      this.commonServices.setFormStatusUlb.next(true);
      if(draft == false){
        this.isApiComplete = false;
        this.callGetApi(this.endPoints, this.getQuery);
      }
      console.log(res);
    },
      (error) => {
        console.log('post error', error);

      }
    )
  }

  getScroing(formName, designYear) {
    this.commonServices.getScroing(formName, designYear).subscribe((res: any) => {
      console.log('scoring.........', res);
      this.ratingMarksArray = res?.data;
    })
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
      let url = e?.type == 'pre' ? 'annual_acc' : 'gfc'
      console.log('routes url', this.router.navigate([url]), url)
      this.router.navigate([ `/ulb-form/${url}`]);
    }else if(this.formName == 'gfc'){
      let url = e?.type == 'pre' ? 'odf' : 'annual_acc'
      console.log('routes url', url)
      this.router.navigate([ `/ulb-form/${url}`]);
    }

  }
  respon2 : any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {
        _id: '5f4656c92daa9921dc1173aa',
        formId: 466,
        language: [
          {
            "_id": "64212205cc09cd11d2152955",
            "lng": "en",
            "question": [
                {
                    "information": "",
                    "_id": "642120e6e6aa5311d3f5f8b9",
                    "order": "1",
                    "answer_option": [
                        {
                            "name": "Approve",
                            "did": [],
                            "viewSequence": "1",
                            "coordinates": [],
                            "_id": "1"
                        },
                        {
                            "name": "Return",
                            "did": [],
                            "viewSequence": "2",
                            "coordinates": [],
                            "_id": "2"
                        }
                    ],
                    "title": "Review Status",
                    "hint": "Status is mandatory",
                    "resource_urls": [],
                    "label": "1",
                    "shortKey": "status",
                    "viewSequence": "1",
                    "child": [
                        {
                            "type": "1",
                            "value": "^([2])$",
                            "order": "2"
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
                    "_id": "6421217ce6aa5311d3f5f90c",
                    "order": "2",
                    "answer_option": [],
                    "title": "Reject Reason",
                    "hint": "",
                    "resource_urls": [],
                    "label": "2",
                    "shortKey": "state_rejectReason",
                    "viewSequence": "2",
                    "child": [],
                    "parent": [
                        {
                            "value": "^([2])$",
                            "type": "5",
                            "order": "1"
                        }
                    ],
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
                    "weightage": []
                },
                {
                    "information": "",
                    "_id": "642121d2cc09cd11d2152918",
                    "order": "3",
                    "answer_option": [],
                    "title": "Remarks",
                    "hint": "",
                    "resource_urls": [],
                    "label": "3",
                    "shortKey": "remarks",
                    "viewSequence": "3",
                    "child": [],
                    "parent": [],
                    "pattern": "",
                    "validation": [],
                    "restrictions": [],
                    "min": 1,
                    "max": null,
                    "input_type": "1",
                    "editable": false,
                    "weightage": []
                },
                {
                    "information": "",
                    "_id": "64212205cc09cd11d2152953",
                    "answer_option": [],
                    "title": "Supporting Documents",
                    "hint": "",
                    "order": "4",
                    "resource_urls": [],
                    "label": "4",
                    "shortKey": "order4",
                    "viewSequence": "4",
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
                            "_id": "81",
                            "value": "10240"
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
            "title": "State Action",
            "buttons": []
        }
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  }

}
