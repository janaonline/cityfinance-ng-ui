import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-common-action',
  templateUrl: './form-common-action.component.html',
  styleUrls: ['./form-common-action.component.scss']
})
export class FormCommonActionComponent implements OnInit {

  constructor() { }

  questionResponse: any = {
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
  ngOnInit(): void {
  }

}
