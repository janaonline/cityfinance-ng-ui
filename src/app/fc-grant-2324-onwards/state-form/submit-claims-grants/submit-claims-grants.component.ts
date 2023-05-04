import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-claims-grants',
  templateUrl: './submit-claims-grants.component.html',
  styleUrls: ['./submit-claims-grants.component.scss']
})
export class SubmitClaimsGrantsComponent implements OnInit {

  constructor() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuState"));
   }
  nextRouter;
  backRouter;
  sideMenuItem;
 sample = {
    "nmpc_untied_1": {
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
        "nmpc_untied_1_GrantData": {
            "submissionDate": null,
            "recommendationDate": null,
            "releaseDate": null,
            "amountReleased": null,
            "amountAssigned": null,
            "name": "Rajasthan",
            "year": "606aaf854dff55e6c075d219",
            "installment": 1,
            "GrantType": "60f6cdb468e143a9b134c337",
            "noOfUlb": 232,
            "status": "Eligibility Condition Pending."
        },
        "dashboardData": [
            {
                "formHeader": "ULB Forms",
                "formData": [
                    {
                        "formName": "Annual Accounts",
                        "key": "annualaccountdatas",
                        "submittedValue": 1,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 2,
                        "totalForms": 232,
                        "cutOff": 25,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Linking of PFMS Account",
                        "key": "pfmsaccounts",
                        "submittedValue": 10,
                        "approvedValue": 5,
                        "totalApproved": 12,
                        "totalSubmitted": 23,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            },
            {
                "formHeader": "State Forms",
                "formData": [
                    {
                        "formName": "Grant Transfer Certificate",
                        "key": "granttransfercertificates",
                        "submittedValue": 100,
                        "approvedValue": 100,
                        "totalApproved": 1,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Eligible for Grant Claim"
                    },
                    {
                        "formName": "Property tax floor rate Notification",
                        "key": "propertytaxfloorrates",
                        "submittedValue": 100,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "State Finance Commission Notification",
                        "key": "statefinancecommissionformations",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            }
        ],
        "conditionSuccess": false
    },
    "nmpc_untied_2": {
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
        "nmpc_untied_2_GrantData": {
            "submissionDate": null,
            "recommendationDate": null,
            "releaseDate": null,
            "amountReleased": null,
            "amountAssigned": null,
            "name": "Rajasthan",
            "year": "606aaf854dff55e6c075d219",
            "installment": 2,
            "GrantType": "60f6cdb468e143a9b134c337",
            "noOfUlb": 232,
            "status": "Eligibility Condition Pending."
        },
        "dashboardData": [
            {
                "formHeader": "ULB Forms",
                "formData": [
                    {
                        "formName": "Annual Accounts",
                        "key": "annualaccountdatas",
                        "submittedValue": 1,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 2,
                        "totalForms": 232,
                        "cutOff": 25,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Linking of PFMS Account",
                        "key": "pfmsaccounts",
                        "submittedValue": 10,
                        "approvedValue": 5,
                        "totalApproved": 12,
                        "totalSubmitted": 23,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            },
            {
                "formHeader": "State Forms",
                "formData": [
                    {
                        "formName": "Grant Transfer Certificate",
                        "key": "granttransfercertificates",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Property tax floor rate Notification",
                        "key": "propertytaxfloorrates",
                        "submittedValue": 100,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "State Finance Commission Notification",
                        "key": "statefinancecommissionformations",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            }
        ],
        "conditionSuccess": false
    },
    "nmpc_tied_1": {
        "conditions": [
            {
                "key": "utilizationreports",
                "text": "100% Detailed Utilisation Report form submitted, and Approved by State"
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
                "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Tied 2nd Instalment"
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
        "nmpc_tied_1_GrantData": {
            "submissionDate": null,
            "recommendationDate": null,
            "releaseDate": null,
            "amountReleased": null,
            "amountAssigned": null,
            "name": "Rajasthan",
            "year": "606aaf854dff55e6c075d219",
            "installment": 1,
            "GrantType": "60f6cdb468e143a9b134c339",
            "noOfUlb": 232,
            "status": "Eligibility Condition Pending."
        },
        "dashboardData": [
            {
                "formHeader": "ULB Forms",
                "formData": [
                    {
                        "formName": "Annual Accounts",
                        "key": "annualaccountdatas",
                        "submittedValue": 1,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 2,
                        "totalForms": 232,
                        "cutOff": 25,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Linking of PFMS Account",
                        "key": "pfmsaccounts",
                        "submittedValue": 10,
                        "approvedValue": 5,
                        "totalApproved": 12,
                        "totalSubmitted": 23,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Detailed Utilisation Report",
                        "key": "utilizationreports",
                        "submittedValue": 53,
                        "approvedValue": 34,
                        "totalApproved": 79,
                        "totalSubmitted": 122,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            },
            {
                "formHeader": "State Forms",
                "formData": [
                    {
                        "formName": "Grant Transfer Certificate",
                        "key": "granttransfercertificates",
                        "submittedValue": 100,
                        "approvedValue": 100,
                        "totalApproved": 1,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Eligible for Grant Claim"
                    },
                    {
                        "formName": "Property tax floor rate Notification",
                        "key": "propertytaxfloorrates",
                        "submittedValue": 100,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "State Finance Commission Notification",
                        "key": "statefinancecommissionformations",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            }
        ],
        "conditionSuccess": false
    },
    "nmpc_tied_2": {
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
        "nmpc_tied_2_GrantData": {
            "submissionDate": null,
            "recommendationDate": null,
            "releaseDate": null,
            "amountReleased": null,
            "amountAssigned": null,
            "name": "Rajasthan",
            "year": "606aaf854dff55e6c075d219",
            "installment": 2,
            "GrantType": "60f6cdb468e143a9b134c339",
            "noOfUlb": 232,
            "status": "Eligibility Condition Pending."
        },
        "dashboardData": [
            {
                "formHeader": "ULB Forms",
                "formData": [
                    {
                        "formName": "Annual Accounts",
                        "key": "annualaccountdatas",
                        "submittedValue": 1,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 2,
                        "totalForms": 232,
                        "cutOff": 25,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Linking of PFMS Account",
                        "key": "pfmsaccounts",
                        "submittedValue": 10,
                        "approvedValue": 5,
                        "totalApproved": 12,
                        "totalSubmitted": 23,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Detailed Utilisation Report",
                        "key": "utilizationreports",
                        "submittedValue": 53,
                        "approvedValue": 34,
                        "totalApproved": 79,
                        "totalSubmitted": 122,
                        "totalForms": 232,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            },
            {
                "formHeader": "State Forms",
                "formData": [
                    {
                        "formName": "Grant Transfer Certificate",
                        "key": "granttransfercertificates",
                        "submittedValue": 100,
                        "approvedValue": 100,
                        "totalApproved": 1,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Eligible for Grant Claim"
                    },
                    {
                        "formName": "Property tax floor rate Notification",
                        "key": "propertytaxfloorrates",
                        "submittedValue": 100,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "State Finance Commission Notification",
                        "key": "statefinancecommissionformations",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            }
        ],
        "conditionSuccess": false
    },
    "mpc_tied_1": {
        "conditions": [
            {
                "key": "utilizationreports",
                "text": "100% Detailed Utilization Report form Submitted, and Approved by State"
            },
            {
                "key": "annualaccountdatas",
                "text": "Minimum 25% Annual Account Form Submission of Unstandardized data by ULBs and Approved by State ULB having data in Both Years should be considered in 25%"
            },
            {
                "key": "pfmsaccounts",
                "text": "100% Linking of PFMS Account form Filled, Submitted, and Approved by State"
            },
            {
                "key": "twentyeightslbforms",
                "text": "100% 28 Slbs form  Submitted, and Approved by State"
            },
            {
                "key": "odfformcollections",
                "text": "100% Open Defecation Free Forms Submitted, and Approved by State"
            },
            {
                "key": "gfcformcollections",
                "text": "100% Garbage Free City Forms Submitted, and Approved by State"
            },
            {
                "key": "xvfcgrantulbforms",
                "text": "100% SLBs for Water Supply and Sanitation form Filled, Submitted, and Approved by State "
            },
            {
                "key": "granttransfercertificates",
                "text": "Grant Transfer Certificate Form Submission of Previous year document i.e. 2021-22"
            },
            {
                "key": "propertytaxfloorrates",
                "text": " Property Tax Floor Rate form Submission by State & Approval by MoHUA"
            },
            {
                "key": "statefinancecommissionformations",
                "text": "State Finance Commission Notication form Submission by State & Approval by MoHUA"
            }
        ],
        "mpc_tied_1_GrantData": {
            "submissionDate": null,
            "recommendationDate": null,
            "releaseDate": null,
            "amountReleased": null,
            "amountAssigned": null,
            "name": "Rajasthan",
            "year": "606aaf854dff55e6c075d219",
            "installment": 1,
            "GrantType": "60f6cdb368e143a9b134c335",
            "noOfUlb": 3,
            "status": "Eligibility Condition Pending."
        },
        "dashboardData": [
            {
                "formHeader": "ULB Forms",
                "formData": [
                    {
                        "formName": "Annual Accounts",
                        "key": "annualaccountdatas",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "totalForms": 3,
                        "cutOff": 25,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Linking of PFMS Account",
                        "key": "pfmsaccounts",
                        "submittedValue": 67,
                        "approvedValue": 33,
                        "totalApproved": 1,
                        "totalSubmitted": 2,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Detailed Utilisation Report",
                        "key": "utilizationreports",
                        "submittedValue": 100,
                        "approvedValue": 100,
                        "totalApproved": 3,
                        "totalSubmitted": 3,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Eligible for Grant Claim"
                    },
                    {
                        "formName": "28 SLBs",
                        "key": "twentyeightslbforms",
                        "submittedValue": 33,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Open Defecation Free (ODF)",
                        "key": "odfformcollections",
                        "submittedValue": 67,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 2,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "Garbage Free City (GFC)",
                        "key": "gfcformcollections",
                        "submittedValue": 33,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "SLBs for Water Supply and Sanitation",
                        "key": "xvfcgrantulbforms",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "totalForms": 3,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            },
            {
                "formHeader": "State Forms",
                "formData": [
                    {
                        "formName": "Grant Transfer Certificate",
                        "key": "granttransfercertificates",
                        "submittedValue": 100,
                        "approvedValue": 100,
                        "totalApproved": 1,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Eligible for Grant Claim"
                    },
                    {
                        "formName": "Property tax floor rate Notification",
                        "key": "propertytaxfloorrates",
                        "submittedValue": 100,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 1,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    },
                    {
                        "formName": "State Finance Commission Notification",
                        "key": "statefinancecommissionformations",
                        "submittedValue": 0,
                        "approvedValue": 0,
                        "totalApproved": 0,
                        "totalSubmitted": 0,
                        "cutOff": 100,
                        "status": "Not yet eligible for Grant Claim"
                    }
                ]
            }
        ],
        "conditionSuccess": false
    }
  }
  claimsGrantJson = {
      formId: '',
      formName: 'Final submission of claims for 15th FC Grants (FY 2022-23)',
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
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilisation Report form submitted, and Approved by State"
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
                    "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Tied 2nd Instalment"
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
            {
              key: '', //string
              title: '2nd Installment (FY 2023-24)',
              installment: 2, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
            ],
            },
          ]
         
      },
        nmpc_untied: {
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
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilisation Report form submitted, and Approved by State"
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
                    "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Tied 2nd Instalment"
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
            {
              key: '', //string
              title: '2nd Installment (FY 2023-24)',
              installment: 2, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
            ],
            },
          ]
        },
        mpc_tied: {
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
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
                {
                    "key": "utilizationreports",
                    "text": "100% Detailed Utilisation Report form submitted, and Approved by State"
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
                    "text": " Grant Transfer Certificate form submission of Previous installment document i.e. 2021-22 Tied 2nd Instalment"
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
            {
              key: '', //string
              title: '2nd Installment (FY 2023-24)',
              installment: 2, // number
              year: '', // string
              type: '', // string
              position: 1, //number
              conditionSuccess: false, //booolean
              buttonName: '', // number,
              amount: null, // number,
              info: '', // string
              isShow : true, //boolean
              "conditions": [         // array
            ],
            },
          ]
        },
        }
      
}   

  ngOnInit(): void {
    this.setRouter();
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

}
