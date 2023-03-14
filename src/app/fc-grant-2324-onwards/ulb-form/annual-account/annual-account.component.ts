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
        language: [
          {
            "_id": "63fc56abd4434c05939ac5e9",
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
                    "_id": "1"
                  },
                  {
                    "name": "ODF+",
                    "did": [],
                    "viewSequence": "2",
                    "_id": "2"
                  },
                  {
                    "name": "ODF++",
                    "did": [],
                    "viewSequence": "3",
                    "_id": "3"
                  },
                  {
                    "name": "Non ODF",
                    "did": [],
                    "viewSequence": "4",
                    "_id": "4"
                  },
                  {
                    "name": "No Rating",
                    "did": [],
                    "viewSequence": "5",
                    "_id": "5"
                  }
                ],
                'modelValue': "2",
                "value": "2",
                "selectedValue" : [
                  {
                    "label": "ODF+",
                    "textValue": "",
                    "value": "2"
                  }
                ],
                "title": "Open Defecation Free (ODF) Rating",
                "hint": "Single Select",
                "resource_urls": [],
                "label": "",
                "shortKey": "ratings",
                "viewSequence": "1",
                "child": [
                  {
                    "type": "11",
                    "value": "^([5])$",
                    "order": "2"
                  },
                  {
                    "type": "11",
                    "value": "^([1]|[2]|[3]|[4])$",
                    "order": "3"
                  },
                  {
                    "type": "14",
                    "value": "^([1]|[2]|[3]|[4])$",
                    "order": "4"
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
                "label": "",
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
                "weightage": [],
              },
              {
                "information": "",
                "_id": "63fc556dd4434c05939ac535",
                "order": "3",
                "answer_option": [],
                "title": "Upload ODF Certificate?",
                "hint": "Upload PDF",
                "resource_urls": [],
                "label": "",
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
                "weightage": [],
                'modelValue': "https://staging-dhwani.s3.ap-south-1.amazonaws.com/posh_certi_35df4bc5-445b-4167-bea1-08bf07be7353.pdf",
                 "value": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/posh_certi_35df4bc5-445b-4167-bea1-08bf07be7353.pdf",
                "selectedValue" : [
                    {
                          "textValue": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/posh_certi_35df4bc5-445b-4167-bea1-08bf07be7353.pdf",
                           "label": "posh_certi.pdf",
                           "value": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/posh_certi_35df4bc5-445b-4167-bea1-08bf07be7353.pdf"
                     }
                ]
              },
              {
                "information": "",
                "_id": "63fc55a7d4434c05939ac54a",
                "order": "4",
                "answer_option": [],
                "title": "Certificate Issue Date?",
                "hint": "Date",
                "resource_urls": [],
                "label": "",
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
                    "_id": "24",
                    "error_msg": "",
                    "value": ""
                  }
                ],
                "restrictions": [],
                "input_type": "14",
                "editable": false,
                "weightage": [],
                "value": "2023-03-02",
                'modelValue': "2023-03-02",
                "selectedValue": [
                  {
                    "label": "",
                    "textValue": "2023-03-02",
                    "value": "2023-03-02"
                 }
                ]
              },
              // {
              //   "information": "",
              //   "_id": "63fc563ad4434c05939ac573",
              //   "order": "5",
              //   "answer_option": [
              //     {
              //       "name": "Approved",
              //       "did": [],
              //       "viewSequence": "1",
              //       "_id": "1"
              //     },
              //     {
              //       "name": "Rejected",
              //       "did": [],
              //       "viewSequence": "2",
              //       "_id": "2"
              //     }
              //   ],
              //   "title": "State Review",
              //   "hint": "",
              //   "resource_urls": [],
              //   "label": "",
              //   "shortKey": "StateReview",
              //   "viewSequence": "5",
              //   "child": [],
              //   "parent": [],
              //   "validation": [
              //     {
              //       "error_msg": "",
              //       "_id": "1"
              //     },
              //     {
              //       "error_msg": "",
              //       "_id": "182",
              //       "value": "2"
              //     }
              //   ],
              //   "restrictions": [],
              //   "input_type": "5",
              //   "weightage": [],
              //   "editable": false
              // }
            ],
            "title": "Open Defecation Free (ODF)",
            "buttons": []
          },
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  };
  endpoints:string = '';
 // resData : any;
  ngOnInit(): void {
   // console.log('ResData', this.resData)
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
