import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
import { queryParam } from 'src/app/fc-grant-2324-onwards/fc-shared/common-interface';

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss']
})
export class CommonFormComponent implements OnInit, OnDestroy {
  @ViewChild('webForm') webForm;

  constructor(
    private router: Router,
    private commonServices: CommonServicesService
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.designYearArray = JSON.parse(localStorage.getItem("Years"));
    // this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
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
            //   "_id": "64a51b585d378601dbe1e0fc",
            //   "lng": "en",
            //   "question": [
            //     {
            //       "information": "",
            //       "_id": "6400a139e27eee072479823c",
            //       "order": "1",
            //       "answer_option": [
            //         {
            //           "name": "YES",
            //           "did": [],
            //           "viewSequence": "1",
            //           "_id": "1"
            //         },
            //         {
            //           "name": "NO",
            //           "did": [],
            //           "viewSequence": "2",
            //           "_id": "2"
            //         }
            //       ],
            //       "title": "Do you wish to submit Details for PFMS Account ?",
            //       "hint": "Select",
            //       "resource_urls": [],
            //       "label": "1",
            //       "shortKey": "linkPFMS",
            //       "viewSequence": "1",
            //       "child": [
            //         {
            //           "type": "5",
            //           "value": "^([1])$",
            //           "order": "2"
            //         }
            //       ],
            //       "parent": [],
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "5",
            //       "weightage": [],
            //       "editable": false
            //     },
            //     {
            //       "information": "",
            //       "_id": "6400a175e27eee0724798247",
            //       "order": "2",
            //       "answer_option": [
            //         {
            //           "name": "YES",
            //           "did": [],
            //           "viewSequence": "1",
            //           "_id": "1"
            //         },
            //         {
            //           "name": "NO",
            //           "did": [],
            //           "viewSequence": "2",
            //           "_id": "2"
            //         }
            //       ],
            //       "title": "Has the ULB linked its bank account with PFMS?",
            //       "hint": "Select",
            //       "resource_urls": [],
            //       "label": "2",
            //       "shortKey": "isUlbLinkedWithPFMS",
            //       "viewSequence": "2",
            //       "child": [
            //         {
            //           "type": "2",
            //           "value": "^([1])$",
            //           "order": "3"
            //         },
            //         {
            //           "type": "11",
            //           "value": "^([1])$",
            //           "order": "4"
            //         },
            //         {
            //           "type": "11",
            //           "value": "^([1])$",
            //           "order": "5"
            //         }
            //       ],
            //       "parent": [
            //         {
            //           "value": "^([1])$",
            //           "type": "5",
            //           "order": "1"
            //         }
            //       ],
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         }
            //       ],
            //       "restrictions": [],
            //       "input_type": "5",
            //       "weightage": [],
            //       "editable": false
            //     },
            //     {
            //       "information": "",
            //       "_id": "6400a1e5e27eee0724798259",
            //       "order": "3",
            //       "answer_option": [],
            //       "title": "Bank account number linked to PFMS?",
            //       "hint": "Account Number",
            //       "resource_urls": [],
            //       "label": "3",
            //       "shortKey": "PFMSAccountNumber",
            //       "viewSequence": "3",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([1])$",
            //           "type": "5",
            //           "order": "2"
            //         }
            //       ],
            //       "validation": [
            //         {
            //           "error_msg": "",
            //           "_id": "1"
            //         }
            //       ],
            //       "restrictions": [],
            //       "minRange": 0,
            //       "maxRange": 20,
            //       "min": 1,
            //       "max": 20,
            //       "pattern": "",
            //       "input_type": "2",
            //       "weightage": [],
            //       "valueHolder": "",
            //       "editable": false
            //     },
            //     {
            //       "information": "",
            //       "_id": "6400a268e27eee0724798268",
            //       "order": "4",
            //       "answer_option": [],
            //       "title": "Upload proof of account linkage with PFMS such as Bank account details, Bank statement copy, etc",
            //       "hint": "Upload - PDF",
            //       "resource_urls": [],
            //       "label": "4",
            //       "shortKey": "cert",
            //       "viewSequence": "4",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([1])$",
            //           "type": "5",
            //           "order": "2"
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
            //       "_id": "6400a29ee27eee0724798279",
            //       "order": "5",
            //       "answer_option": [],
            //       "title": "Upload any other transaction doc from PFMS",
            //       "hint": "Upload - PDF",
            //       "resource_urls": [],
            //       "label": "5",
            //       "shortKey": "otherDocs",
            //       "viewSequence": "5",
            //       "child": [],
            //       "parent": [
            //         {
            //           "value": "^([1])$",
            //           "type": "5",
            //           "order": "2"
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
            //     }
            //   ],
            //   "title": "Linking of PFMS Account",
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
  fileFolderName: string = '';
  finalSubmitMsg: string = `Are you sure you want to submit this form? Once submitted,
  it will become uneditable and will be sent to State for Review.
   Alternatively, you can save as draft for now and submit it later.`
  //  nextBtnUrl:string='../odf';
  //  backBtnUrl:string='#';
   routerSubs:any;
   isButtonAvail : boolean = true;
   isFormDisable: boolean = false;
   canTakeAction:boolean = false; 
   isFormFinalSubmit:boolean = false;
  nextPreUrl = {
    nextBtnRouter: '',
    backBtnRouter: ''
  }
  sideMenuItem: object | any;
  leftMenuSubs:any;
  ngOnInit(): void {
    this.leftMenuSubs = this.commonServices.ulbLeftMenuComplete.subscribe((res) => {
      if (res == true) {
        this.getNextPreUrl(this.formName);
      }
    });
  }

  get hasUnsavedChanges() {
    return this.webForm?.hasUnsavedChanges;
  }
  checkRouterForApi() {
    this.routerSubs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlArray = event.url.split("/");
        this.isApiComplete = false;
        this.questionResponse.data[0] = [];
        if (urlArray.includes("odf")) {
          this.handleUrlForForm('odf');
        } else if (urlArray.includes("gfc")) {
          this.handleUrlForForm('gfc');
        }else if (urlArray.includes("pfms")) {
          this.handleUrlForForm('pfms');
        }
  
        this.fileFolderName = `${this.userData?.role}/2023-24/${this.formName}/${this.userData?.ulbCode}`;
      }
    });
  }
  handleUrlForForm(formName: string) {
    
    if(formName === 'gfc' || formName === 'odf'){
      this.endPoints = 'gfc-odf-form-collection';
      this.getQuery.isGfc = formName === 'gfc';
      this.formName = formName;
      this.getNextPreUrl(formName);
      this.getScoring(formName, this.getQuery.design_year);
    }else {
      this.callForDummyData()
    }
    
  }
  callForDummyData(){
    let data =  [{
      _id: '5f4656c92daa9921dc1173aa',
      formId: 2,
      "language": [
        {
          "_id": "64a51b585d378601dbe1e0fc",
          "lng": "en",
          "question": [
            {
              "information": "",
              "_id": "6400a139e27eee072479823c",
              "order": "1",
              "answer_option": [
                {
                  "name": "YES",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "NO",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Do you wish to submit Details for PFMS Account ?",
              "hint": "Select",
              "resource_urls": [],
              "label": "1",
              "shortKey": "linkPFMS",
              "viewSequence": "1",
              "child": [
                {
                  "type": "5",
                  "value": "^([1])$",
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
              "_id": "6400a175e27eee0724798247",
              "order": "2",
              "answer_option": [
                {
                  "name": "YES",
                  "did": [],
                  "viewSequence": "1",
                  "_id": "1"
                },
                {
                  "name": "NO",
                  "did": [],
                  "viewSequence": "2",
                  "_id": "2"
                }
              ],
              "title": "Has the ULB linked its bank account with PFMS?",
              "hint": "Select",
              "resource_urls": [],
              "label": "2",
              "shortKey": "isUlbLinkedWithPFMS",
              "viewSequence": "2",
              "child": [
                {
                  "type": "2",
                  "value": "^([1])$",
                  "order": "3"
                },
                {
                  "type": "11",
                  "value": "^([1])$",
                  "order": "4"
                },
                {
                  "type": "11",
                  "value": "^([1])$",
                  "order": "5"
                }
              ],
              "parent": [
                {
                  "value": "^([1])$",
                  "type": "5",
                  "order": "1"
                }
              ],
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
              "_id": "6400a1e5e27eee0724798259",
              "order": "3",
              "answer_option": [],
              "title": "Bank account number linked to PFMS?",
              "hint": "Account Number",
              "resource_urls": [],
              "label": "3",
              "shortKey": "PFMSAccountNumber",
              "viewSequence": "3",
              "child": [],
              "parent": [
                {
                  "value": "^([1])$",
                  "type": "5",
                  "order": "2"
                }
              ],
              "validation": [
                {
                  "error_msg": "",
                  "_id": "1"
                }
              ],
              "restrictions": [],
              "minRange": 0,
              "maxRange": 20,
              "min": 1,
              "max": 20,
              "pattern": "",
              "input_type": "2",
              "weightage": [],
              "valueHolder": "",
              "editable": false
            },
            {
              "information": "",
              "_id": "6400a268e27eee0724798268",
              "order": "4",
              "answer_option": [],
              "title": "Upload proof of account linkage with PFMS such as Bank account details, Bank statement copy, etc",
              "hint": "Upload PDF",
              "resource_urls": [],
              "label": "4",
              "shortKey": "cert",
              "viewSequence": "4",
              "child": [],
              "parent": [
                {
                  "value": "^([1])$",
                  "type": "5",
                  "order": "2"
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
              "_id": "6400a29ee27eee0724798279",
              "order": "5",
              "answer_option": [],
              "title": "Upload any other transaction doc from PFMS",
              "hint": "Upload PDF",
              "resource_urls": [],
              "label": "5",
              "shortKey": "otherDocs",
              "viewSequence": "5",
              "child": [],
              "parent": [
                {
                  "value": "^([1])$",
                  "type": "5",
                  "order": "2"
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
          "title": "Linking of PFMS Account",
          "buttons": []
        }
      ],
      groupOrder: 37,
      createDynamicOption: [],
      getDynamicOption: [],
    }];
    this.questionResponse = {
      ...JSON.parse(JSON.stringify(this.questionResponse))
    }
    this.questionResponse.data = data;
   
    this.isApiComplete = true;
  }
  callGetApi(endPoints: string, queryParams: {}) {
    
    this.commonServices.formGetMethod(endPoints, queryParams).subscribe((res: any) => {
      console.log('res.........', res);
      this.questionResponse.data = res.data; 
      this.canTakeAction =  res?.data[0]?.canTakeAction;
      // this.getActionRes();
      this.formDisable(res?.data[0]);
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
      this.alertForFinalSubmit(finalData, e?.isSaveAsDraft)
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
      this.webForm.hasUnsavedChanges = false;
      swal("Saved", `Data saved ${draft ? 'as draft' : ''} successfully`, "success");
      this.commonServices.setFormStatusUlb.next(true);
      this.isFormFinalSubmit = true;
        this.isApiComplete = false;
       // this.callGetApi(this.endPoints, this.getQuery);
        console.log(res);
    },
      (error) => {
        console.log('post error', error);
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    )
  }

  getScoring(formName, designYear) {
    this.commonServices.getScroing(formName, designYear).subscribe((res: any) => {
      console.log('scoring.........', res);
      this.ratingMarksArray = res?.data;
    })
  }
 
  alertForFinalSubmit(finalData, draft) {
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


 formDisable(res){
    if(!res) return;
    this.isButtonAvail = this.commonServices.formDisable(res, this.userData);
    this.isFormDisable = !this.isButtonAvail;
 }


nextPreBtn(e) {
  let url = e?.type == 'pre' ? this.nextPreUrl?.backBtnRouter : this.nextPreUrl?.nextBtnRouter
  this.router.navigate([`/ulb-form/${url.split('/')[1]}`]);
}
actionFormChangeDetect(res){
  if(res == true){
    this.commonServices.setFormStatusUlb.next(true);
    this.callGetApi(this.endPoints, this.getQuery);
  }
}

getNextPreUrl(form){
  this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuULB"));
  for (const key in this.sideMenuItem) {
    this.sideMenuItem[key].forEach((ele) => {
      if (ele?.folderName == form) {
        this.nextPreUrl = {nextBtnRouter : ele?.nextUrl, backBtnRouter : ele?.prevUrl}
        this.getQuery.formId = ele?.formId;
        this.callGetApi(this.endPoints, this.getQuery);
      }
    });
  }
}
ngOnDestroy() {
  this.leftMenuSubs.unsubscribe();
  this.routerSubs.unsubscribe();
}
}
