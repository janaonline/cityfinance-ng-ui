
import { Component, OnInit } from '@angular/core';

import { SweetAlert } from "sweetalert/typings/core";
import { CommonServicesService } from '../../fc-shared/service/common-services.service';
const swal: SweetAlert = require("sweetalert");

export interface postBody  {
  financialYear: string;
  state: string;
  installment: string;
  amountClaimed: string;
  type: string;
}
@Component({
  selector: 'app-submit-claims-grants',
  templateUrl: './submit-claims-grants.component.html',
  styleUrls: ['./submit-claims-grants.component.scss']
})

export class SubmitClaimsGrantsComponent implements OnInit {

 
  constructor(
    private commonServices: CommonServicesService
    ){
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
   }
  nextRouter;
  backRouter;
  sideMenuItem;
  claimsGrantJson = {
      formId: '',
      formName: 'Final submission of claims for 15th FC Grants (FY 2023-24)',
      previousYrMsg: '',
      grantsType : ['nmpc_tied', 'nmpc_untied', 'mpc_tied'],
      data: {
        nmpc_tied: {
          title: '1. Claim Non-Million Plus Cities Tied Grants',
          yearData : [
            {
              key: '', //string
              title: '1st Installment (FY 2023-24):', //string
              installment: 1, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: 'Claim Grant - ',
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              status: 'Eligibility Condition Pending.',
              "conditions": [
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilisation Report form submitted, and Approved by State",
                    value: 5
                },
                {
                    "key": "annualaccountdatas",
                    "text": "Minimum 25% Annual Account form submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%",
                    value: 5
                },
                {
                    "key": "pfmsaccounts",
                    "text": "100% Linking of PFMS Account form Filled, Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "granttransfercertificates",
                    "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Tied 2nd Instalment",
                    value: 5
                },
                {
                    "key": "propertytaxfloorrates",
                    "text": "Property Tax Floor Rate form submission by State & Approval by MoHUA",
                    value: 5
                },
                {
                    "key": "statefinancecommissionformations",
                    "text": "State Finance Commission Notification form submission by State & Approval by MoHUA",
                    value: 5
                }
            ],
            },
            {
              key: '', //string
              title: '2nd Installment (FY 2023-24)',
              installment: 2, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: 'Claim Grant - ',
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              status: 'Eligibility Condition Pending.',
              "conditions": [
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilisation Report form Submitted, and Approved by State"
                },
                {
                    "key": "annualaccountdatas",
                    "text": "Minimum 25% Annual Account form submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%"
                },
                {
                    "key": "pfmsaccounts",
                    "text": "100% Linking of PFMS Account form Filled, Submitted, and Approved by State"
                },
                {
                    "key": "granttransfercertificates",
                    "text": "Grant Transfer Certificate form submission of Previous installment document i.e. 2022-23 Tied 1st Instalment"
                },
                {
                    "key": "propertytaxfloorrates",
                    "text": "Property Tax Floor Rate form submission by State & Approval by MoHUA"
                },
                {
                    "key": "statefinancecommissionformations",
                    "text": "State Finance Commission Notification form submission by State & Approval by MoHUA"
                }
            ],
            },
          ],
          isClose: true,
          id:1
         },
        nmpc_untied: {
          title: '2. Claim Non-Million Plus Cities Untied Grants',
          yearData : [
            {
              key: '', //string
              title: '1st Installment (FY 2023-24):', //string
              installment: 1, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: 'Claim Grant - ',
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              status: 'Eligibility Condition Pending.',
              "conditions": [
                {
                    "key": "annualaccountdatas",
                    "text": "Minimum 25% Annual Account form submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%"
                },
                {
                    "key": "pfmsaccounts",
                    "text": "100% Linking of PFMS Account forms Filled, Submitted, and Approved by State"
                },
                {
                    "key": "granttransfercertificates",
                    "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Untied 2nd Instalment"
                },
                {
                    "key": "propertytaxfloorrates",
                    "text": " Property Tax Floor Rate form submission by State & Approval by MoHUA"
                },
                {
                    "key": "statefinancecommissionformations",
                    "text": "State Finance Commission Notification form submission by State & Approval by MoHUA"
                }
            ],
            },
            {
              key: '', //string
              title: '2nd Installment (FY 2023-24)',
              installment: 2, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: 'Claim Grant - ',
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              status: 'Eligibility Condition Pending.',
              "conditions": [
                {
                    "key": "annualaccountdatas",
                    "text": "Minimum 25% Annual Account form submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%"
                },
                {
                    "key": "pfmsaccounts",
                    "text": "100% Linking of PFMS Account form Filled, Submitted, and Approved by State"
                },
                {
                    "key": "granttransfercertificates",
                    "text": "Grant Transfer Certificate form submission of Previous installment document i.e. 2022-23 Untied 1st Instalment"
                },
                {
                    "key": "propertytaxfloorrates",
                    "text": "Property Tax Floor Rate form submission by State & Approval by MoHUA"
                },
                {
                    "key": "statefinancecommissionformations",
                    "text": "State Finance Commission Notification form submission by State & Approval by MoHUA"
                }
            ],
            },
          ],
          isClose: true,
          id:2
        },
        mpc_tied: {
          title: '3. Claim Million Plus Cities Tied Grants',
          yearData : [
            {
              key: '', //string
              title: '1st Installment (FY 2023-24):', //string
              installment: 1, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: 'Claim Grant - ', 
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean,
              status: 'Eligibility Condition Pending.',
              "conditions": [
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilization Report form Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "annualaccountdatas",
                    "text": "Minimum 25% Annual Account Form Submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%",
                    value: 0
                },
                {
                    "key": "pfmsaccounts",
                    "text": "100% Linking of PFMS Account form Filled, Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "twentyeightslbforms",
                    "text": "100% 28 Slbs form  Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "odfformcollections",
                    "text": "100% Open Defecation Free Forms Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "gfcformcollections",
                    "text": "100% Garbage Free City Forms Submitted, and Approved by State",
                    value: 0
                },
                {
                    "key": "xvfcgrantulbforms",
                    "text": "100% SLBs for Water Supply and Sanitation form Filled, Submitted, and Approved by State ",
                    value: 0
                },
                {
                    "key": "granttransfercertificates",
                    "text": "Grant Transfer Certificate Form Submission of Previous year document i.e. 2021-22",
                    value: 0
                },
                {
                    "key": "propertytaxfloorrates",
                    "text": " Property Tax Floor Rate form Submission by State & Approval by MoHUA",
                    value: 0
                },
                {
                    "key": "statefinancecommissionformations",
                    "text": "State Finance Commission Notication form Submission by State & Approval by MoHUA",
                    value: 0
                }
            ],
            },
           
          ],
          isClose: true,
          id:3
        },
    } 
    }   
isCollapsed:boolean = true;
isApiInProgress:boolean = true;
postData:postBody;
userData = JSON.parse(localStorage.getItem("userData"));
Year = JSON.parse(localStorage.getItem("Years"));
stateId:string='';
  ngOnInit(): void {
    this.setRouter();
    this.onLoad();
  }

  onLoad(){
    this.isApiInProgress = false;

  }
  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.folderName == "submit_claims") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
  
  keepOriginalOrder = (a, b) => b.key - a.key;

  finalConfirm(grantItem, inst) {

    this.postData['financialYear'] = this.Year['2022-23']
    this.postData['amountClaimed'] = inst?.amount;
    this.postData['installment'] = inst?.installment;
    this.postData['type'] = inst?.type;
    this.postData['state'] = this.stateId;
    swal(
      "Confirmation !",
      `Are you sure you want to claim this grant?`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
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
          this.onSubmit();
          break;
        case "cancel":
          break;
      }
    });
    

  }
 
  onSubmit() {
  //  this.alertClose();
    this.commonServices.formPostMethod(this.postData, '').subscribe(
      (res) => {
        swal('Success', `Claim Request successfully generated. A confirmation email has been sent to the registered email address and a copy of submission has been emailed to MoHUA`, 'success');
        this.onLoad();
      },
      (err) => {
        swal('Error', `Claim Request could not be created successfully. Please try again later.`, 'error');
      })

  }
}
