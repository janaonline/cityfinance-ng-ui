import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor() { }
  stateInfo = {
    title: '',
    name: '',
    id: '',
    data: [
       {
            key: 'totalUlbs',
            label: 'Total ULBs',
            icon: '../../../../assets/dashboard-state/16-location.svg',
            tooltip: '',
            value: '4550'
          },
          {
            key: 'TotalofNMPCs ',
            label: 'Total no. of NMPCs ',
            icon: '../../../../assets/dashboard-state/XMLID_1248_.svg',
            tooltip: '',
            value: '50'
          },
          {
            key: 'TotalofMPCs',
            label: 'Total No: of MPCs ',
            icon: '../../../../assets/dashboard-state/sustainable.svg',
            tooltip: '',
            value: '20'
          },
          {
            key: 'TotalULBsUAs ',
            label: 'Total ULBs in UAs ',
            icon: '../../../../assets/dashboard-state/16-location.svg',
            tooltip: '',
            value: '40'
          },
      {
        key: 'totalDulyElectedNMPCs',
        label: 'Total Duly Elected NMPCs ',
        icon: '../../../../assets/dashboard-state/XMLID_1248_.svg',
        tooltip: '',
        value: '40',
        link: '',
        position: '2',
        isSubData: false,
        subData: []
      },
      {
        key: 'totalDulyElectedULBsUAs',
        label: 'Total Duly Elected ULBs in UAs',
        icon: '../../../../assets/dashboard-state/sustainable.svg',
        tooltip: '',
        value: '40',
        link: '',
        position: '3',
        isSubData: false,
        subData: []
      },
      {
        key: 'totalEligibleULBsOnPTaxGSDP',
        label: 'Total Eligible ULBs based on Property Tax GSDP',
        icon: '../../../../assets/dashboard-state/16-location.svg',
        tooltip: '',
        value: '40',
        link: '',
        position: '4',
        isSubData: false,
        subData: []
      },
      {
        key: 'totalUlbs',
        label: 'Testing card',
        icon: '../../../../assets/dashboard-state/16-location.svg',
        tooltip: '',
        value: '455'
      },


    ]
  };

  cityTypeInState = {
    title: '',
    name: '',
    id: '',
    data: [
      {
        title: 'NMPC - UnTied',
        viewMode: 'tab1',
        formType: 'nmpc_untied',
        isInstallmentAvailbe: true,
        installments: [
          {
            installment: '1',
            key: 'nmpc_untied_1',
            label: '1st Installment',
            isActive: true
          },
          {
            installment: '2',
            key: 'nmpc_untied_2',
            label: '2nd Installment',
            isActive: false
          }
        ]
      },
      {
        title: 'NMPC - Tied',
        viewMode: 'tab2',
        formType: 'nmpc_tied',
        isInstallmentAvailbe: true,
        installments: [
          {
            installment: '1',
            key: 'nmpc_tied_1',
            label: '1st Installment',
            isActive: true
          },
          {
            installment: '2',
            key: 'nmpc_tied_2',
            label: '2nd Installment',
            isActive: false
          }
        ]
      },
      {
        title: 'MPC',
        viewMode: 'tab3',
        formType: 'mpc_tied',
        isInstallmentAvailbe: false,
        installments: [],
        isActive: false
      }
    ]
  };

  formData = {
    ulbForm: {
      key: 'ulbForms',
      id: '',
      formHeader: 'ULB Forms',
      approvedColor: '#E67E15',
      submittedColor: '#E67E1566',
      formData: [
        {
          "formName": "Annual Accounts",
          "key": "annualaccountdatas",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 20,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 1,
          "totalForms": 5,
          "cutOff": 25,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/Annual%20Account_d37a8831-3563-45b0-a41e-078860cff9e0.svg",
          "link": "/review-ulb-form/62aa1b04729673217e5ca3aa",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        },
        {
          "formName": "Linking of PFMS Account",
          "key": "pfmsaccounts",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/Linking%20of%20PFMS%20Account_8bc2d868-306f-4632-acf3-be79f3ad9b01.svg",
          "link": "/review-ulb-form/62aa1cc9c9a98b2254632a8e",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        },
        {
          "formName": "Detailed Utilisation Report",
          "key": "utilizationreports",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 100,
          "approvedValue": 100,
          "totalApproved": 5,
          "totalSubmitted": 5,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/Detailed%20utilisation%20report_836af702-137f-415c-b778-e645672cd8dd.svg",
          "link": "/review-ulb-form/62aa1c96c9a98b2254632a8a",
          "border": "#E67E15",
          "status": "Eligible for Grant Claim"
        },
        {
          "formName": "28 SLBs",
          "key": "twentyeightslbforms",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/28%20SLBs_1fa3f749-910c-4d6f-9df0-3246db4dadbf.svg",
          "link": "/review-ulb-form/62f0dbbf596298da6d3f4076",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        },
        {
          "formName": "Open Defecation Free (ODF)",
          "key": "odfformcollections",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/ODF_e86d9b0c-d060-4182-84d5-b9bfccbeb528.svg",
          "link": "/review-ulb-form/62aa1d6ec9a98b2254632a9a",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        },
        {
          "formName": "Garbage Free City (GFC)",
          "key": "gfcformcollections",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/GFC_2129ba43-1050-415b-8a3b-eae9c02a14c5.svg",
          "link": "/review-ulb-form/62aa1d82c9a98b2254632a9e",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        },
        {
          "formName": "SLBs for Water Supply and Sanitation",
          "key": "xvfcgrantulbforms",
          formId: '',
          "approvedColor": "#E67E15",
          "submittedColor": "#E67E1566",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "totalForms": 5,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/CF_15FC_leftMenuIcons/2022-23/Sanitation_104215b8-f9ab-4583-b271-2215da483003.svg",
          "link": "/review-ulb-form/62aa1d4fc9a98b2254632a96",
          "border": "#E67E15",
          "status": "Not yet eligible for Grant Claim"
        }
      ]
    },
    stateForm: {
      key: 'stateForms',
      id: '',
      formHeader: 'State Forms',
      approvedColor: '#059B05',
      submittedColor: '#E67E1566',
      formData: [
        {
          "formName": "Grant Transfer Certificate",
          "key": "granttransfercertificates",
          "approvedColor": "#059B05",
          "submittedColor": "#E67E1599",
          "submittedValue": 100,
          "approvedValue": 100,
          "totalApproved": 1,
          "totalSubmitted": 1,
          "cutOff": 100,
          "icon": "https://democityfinance.s3.ap-south-1.amazonaws.com/files/svg/Grant%20Transfer%201_101b740c-e031-42d6-ad0f-197b897d29e6.svg",
          "link": "/grant-tra-certi",
          "border": "#059B05",
          "status": "Eligible for Grant Claim"
        },
        {
          "formName": "Property tax floor rate Notification",
          "key": "propertytaxfloorrates",
          "approvedColor": "#059B05",
          "submittedColor": "#E67E1599",
          "submittedValue": 100,
          "approvedValue": 100,
          "totalApproved": 1,
          "totalSubmitted": 1,
          "cutOff": 100,
          "icon": "https://jccd-cityfinance-staging2.s3.ap-south-1.amazonaws.com/files/svg/Property_Tax_3deaefc5-c4bf-11ed-97fa-7c507992a97d.svg",
          "link": "/property-tax",
          "border": "#059B05",
          "status": "Eligible for Grant Claim"
        },
        {
          "formName": "State Finance Commission Notification",
          "key": "statefinancecommissionformations",
          "approvedColor": "#059B05",
          "submittedColor": "#E67E1599",
          "submittedValue": 0,
          "approvedValue": 0,
          "totalApproved": 0,
          "totalSubmitted": 0,
          "cutOff": 100,
          "icon": "https://jccd-cityfinance-staging2.s3.ap-south-1.amazonaws.com/files/svg/State_Finance_Commission_3deaefec-c4bf-11ed-97fa-7c507992a97d.svg",
          "link": "/fc-formation",
          "border": "#059B05",
          "status": "Not yet eligible for Grant Claim"
        }
      ]
    }
  }
  ngOnInit(): void {
  }
  cityTabChange(e) {
    console.log('eeee', e);
  }


}
