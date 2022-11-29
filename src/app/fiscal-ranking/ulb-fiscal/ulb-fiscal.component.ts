import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UlbFisPreviewComponent } from './ulb-fis-preview/ulb-fis-preview.component';
import { MatDialog } from '@angular/material/dialog';
import {
  customEmailValidator,
  mobileNoValidator,
} from "src/app/util/reactiveFormValidators";
const swal: SweetAlert = require("sweetalert");
const toWords = new ToWords();
@Component({
  selector: 'app-ulb-fiscal',
  templateUrl: './ulb-fiscal.component.html',
  styleUrls: ['./ulb-fiscal.component.scss']
})
export class UlbFiscalComponent implements OnInit {

  userData;
  ulbName = '';
  stateName = '';
  yearIdArr;
  ulbId = "";
  isDraft = true;
  constructor(
    private fb: FormBuilder,
    private fiscalService: FiscalRankingService,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
    this.yearIdArr = JSON.parse(localStorage.getItem("Years"));
    this.initializeForm();
  }

  stepperArray = [
    {
      label: `Basic ULB Details`,
      key: 'basicDet',
      id: 's1',
      icon: '',
      text: ''
    },
    {
      label: `Revenue Mobilization Parameters`,
      key: 'revenueMob',
      id: 's2',
      icon: '',
      text: ''
    },
    {
      label: `Expenditure Performance Parameters`,
      key: 'expPerf',
      id: 's3',
      icon: '',
      text: ''
    },
    {
      label: `Fiscal Governance Parameters`,
      key: 'fisGov',
      id: 's4',
      icon: '',
      text: ''
    },
    {
      label: `Upload Financial Documents`,
      key: 'upFy',
      id: 's5',
      icon: '',
      text: ''
    },
    {
      label: `Contact Information`,
      key: 'conInfo',
      id: 's6',
      icon: '',
      text: ''
    },
    {
      label: `Self Declaration`,
      key: 'selDec',
      id: 's7',
      icon: '',
      text: ''
    },

  ];
  fiscalFormFeild;

  fiscalForm;
  revenueMob;
  expPerf;
  uploadFyDoc;
  totalOwnRevenueArea = null;
  fy_19_20_cash = null;
  fy_19_20_online = null;
  property_tax_register = null;
  paying_property_tax = null;
  paid_property_tax = null;
  // goverPar;
  // revenueMob = {
  //   totalRecActual: {
  //     key: 'totalRecActual',
  //     label: 'Total Receipts (Actual)',
  //     yearData: [
  //       {
  //         label: 'FY 2016-17',
  //         key: 'FY2016-17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: 'to be taken from approved Annual Budget of ',
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: 'to be taken from approved Annual Budget of ',
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   totalRecBudgetEst: {
  //     key: 'totalRecBudgetEst',
  //     label: 'Total Receipts (Budget Estimate)',
  //     yearData: [
  //       {
  //         label: 'FY 2016-17',
  //         key: 'FY2016-17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   totalOwnRevenues: {
  //     key: 'totalOwnRevenues',
  //     label: 'Total Own Revenues ',
  //     yearData: [
  //       {
  //         label: 'FY 2016-17',
  //         key: 'FY2016-17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   totalPropTaxRevenue: {
  //     key: 'totalPropTaxRevenue',
  //     label: 'Total Property Tax Revenue ',
  //     yearData: [
  //       {
  //         label: 'FY 2016-17',
  //         key: 'FY2016-17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  // };
  // expPerf = {
  //   totalGrossBlock: {
  //     key: 'totalGrossBlock',
  //     label: 'Total Gross Block',
  //     yearData: [
  //       {
  //         label: 'As on 31st March 2017',
  //         key: 'totalGrossBlock_17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2018',
  //         key: 'totalGrossBlock_18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2019',
  //         key: 'totalGrossBlock_19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2020',
  //         key: 'totalGrossBlock_20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   totalCWIP: {
  //     key: 'totalCWIP',
  //     label: 'Total Capital Work in Progress (CWIP)',
  //     yearData: [
  //       {
  //         label: 'As on 31st March 2017',
  //         key: 'totalCWIP_17',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2018',
  //         key: 'totalCWIP_18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2019',
  //         key: 'totalCWIP_19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'As on 31st March 2020',
  //         key: 'totalCWIP_20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   estAdmExpenses: {
  //     key: 'estAdmExpenses',
  //     label: 'Establishment & Administrative Expenses',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'estAdmExpenses_17-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'estAdmExpenses_18-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'estAdmExpenses_19-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  //   totalRevExp: {
  //     key: 'totalRevExp',
  //     label: 'Total Revenue Expenditure',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'totalRevExp_17-18',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'totalRevExp_18-19',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'totalRevExp_19-20',
  //         postion: '4',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `to be taken from approved Annual Budget of `,
  //         placeHolder: ''
  //       }
  //     ]
  //   },
  // };
  // uploadFyDoc = {
  //   guidanceNotes: {
  //     key: 'guidanceNotes',
  //     label: 'Guidance Notes:',
  //     yearData: [
  //       {
  //         title: '',
  //         pos: '1',
  //         desc: `Audited Annual Accounts should include: Income and Expenditure Statement, Balance Sheet, Schedules to IES and BS, and Auditor's Report.`
  //       },
  //       {
  //         title: '',
  //         pos: '2',
  //         desc: `Annual Budgets should be the detailed final approved version and should be in English language.`
  //       },
  //       {
  //         title: '',
  //         pos: '3',
  //         desc: `Files uploaded should be in PDF only and file size should not exceed 5MB.`
  //       }
  //     ]
  //   },
  //   appAnnualBudget: {
  //     key: 'appAnnualBudget',
  //     label: 'Copy of Detailed Approved Annual Budget of',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'appAnnualBudget_2017-18',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'appAnnualBudget_2018-19',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2017-18',
  //         key: 'appAnnualBudget_2019-20',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },

  //     ]
  //   },
  //   auditedAnnualFySt: {
  //     key: 'auditedAnnualFySt',
  //     label: 'Copy of Detailed Audited Annual Accounts for',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'auditedAnnualFySt_2017-18',
  //         postion: '1',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2018-19',
  //         key: 'auditedAnnualFySt_2018-19',
  //         postion: '2',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },
  //       {
  //         label: 'FY 2019-20',
  //         key: 'auditedAnnualFySt_2019-20',
  //         postion: '3',
  //         value: '',
  //         min: '',
  //         max: '',
  //         required: true,
  //         type: '',
  //         bottomText: `Maximum Size  5MB (pdf files only)`,
  //         placeHolder: ''
  //       },

  //     ]
  //   },
  // };
  goverPar = {
    ownRevDetails: {
      key: 'ownRevDetails',
      label: 'Own Revenue Details',
      yearData: [
        {
          label: 'Total Own Revenue Arrears as on 31st March 2020',
          key: 'totalOwnRevenArr_20',
          postion: '1',
          amount: this.totalOwnRevenueArea,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
        {
          label: 'FY 2019-20 - by Cash/Cheque/DD',
          key: 'fy_19_20_cash',
          postion: '2',
          amount: this.fy_19_20_cash,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
        {
          label: 'FY 2019-20 - by Online (UPI,Netbanking,Credit Card,Debit Card,others)',
          key: 'fy_19_20_online',
          postion: '3',
          amount: this.fy_19_20_online,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
      ]
    },
    propertyDetails: {
      key: 'propertyDetails',
      label: 'Property Details',
      yearData: [
        {
          label: 'Number of Properties assessed/listed as per Property Tax Register',
          key: 'NoOfProlisted',
          postion: '1',
          amount: this.property_tax_register,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
        {
          label: 'Number of Properties exemt from paying Property Tax',
          key: 'NoOfProExemtfromPayProTax',
          postion: '2',
          amount: this.paying_property_tax,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
        {
          label: 'Number of Properties for which Property Tax has been paid',
          key: 'NoOfProwhichProTaxPaid',
          postion: '3',
          amount: this.paid_property_tax,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'number',
          inWords: ''
        },
      ]
    },
  }
  goverParaNdata = {
    normalData: {
      key: 'normalData',
      label: '',
      yearData: {
        webUrlAnnual: {
          label: 'ULB website URL link where Copy of Audited Annual Accounts of FY 2017-18 to FY 2019-20 are available',
          key: 'webUrlAnnual',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'text',

        },
        digitalRegtr: {
          label: 'Do you maintain a Digital Property Tax Register?',
          key: 'digitalRegtr',
          postion: '2',
          value: null,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'radio',

        },
        registerGis: {
          label: 'Is the property tax register GIS-based?',
          key: 'registerGis',
          postion: '3',
          value: null,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'radio',
          show: false,

        },
        accountStwre: {
          label: 'Do you use accounting software?',
          key: 'accountStwre',
          postion: '4',
          value: null,
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: '',
          input: 'radio',
          show: false,
        },
      }
    },
  }
  signedFileName = '';
  signedFileUrl = '';
  formSubmitted = false;
  postData = {
    "ulb": "",
    "design_year": "",
    "population11": null,
    "populationFr": null,
    "webLink": null,
    "nameCmsnr": "",
    "nameOfNodalOfficer": "",
    "designationOftNodalOfficer": "",
    "email": "",
    "mobile": "",
    "webUrlAnnual": null,
    "digitalRegtr": null,
    "registerGis": null,
    "accountStwre": null,
    "totalOwnRevenueArea": null,
    "fy_19_20_cash": {
      "type": "Cash",
      "amount": null
    },
    "fy_19_20_online": {
      "type": "UPI",
      "amount": null
    },
    "fyData": [
      {
        "ulb": "5dd24729437ba31f7eb42eb8",
        "year": "606aadac4dff55e6c075c507",
        "amount": null,
        "type": "",
        "file": "",
        "typeofdata": "", /* Number, PDF,Excel    */
        "status": "PENDING" /* PENDING,APPROVED,REJECTED    */
      }

    ],
    "signedCopyOfFile": {
      "name": '',
      "url": ''
    },
    "property_tax_register": null,
    "paying_property_tax": null,
    "paid_property_tax": null,
    "status": "PENDING",
    "isDraft": this.isDraft
  };
  ngOnInit(): void {
    this.onLoad();
  }
  initializeForm() {
    this.fiscalForm = this.fb.group({
      basicUlbDetails: this.fb.group({
        ulbName: [{ value: this.ulbName, disabled: true }, Validators.required],
        population11: [null, Validators.required],
        populationFr: [null, Validators.required],
        webLink: [null],
        nameCmsnr: [null],
      }),
      contactInfo: this.fb.group({
        nameOfNodalOfficer: ["", Validators.required],
        designationOftNodalOfficer: [null, Validators.required],
        mobile: [null, Validators.required, mobileNoValidator],
        email: [null, Validators.required],
      }),
      // revenueMob: this.fb.array([
      //   this.fb.group({
      //     totalRecActual: this.fb.array([

      //     ]),
      //     totalRecBudgetEst: this.fb.array([

      //     ]),
      //     totalOwnRevenues: this.fb.array([

      //     ]),
      //     totalPropTaxRevenue: this.fb.array([

      //     ]),

      //   }),

      // ]),
      // expPerf: this.fb.array([
      //   this.fb.group({
      //     totalGrossBlock: this.fb.array([

      //     ]),
      //     totalCWIP: this.fb.array([

      //     ]),
      //     estAdmExpenses: this.fb.array([

      //     ]),
      //     totalRevExp: this.fb.array([

      //     ]),

      //   }),

      // ]),
      // goverPar: this.fb.group({
      //   webUrlAnnual: ["", Validators.required],
      //   digitalRegtr: [null, Validators.required],
      //   registerGis: [null, Validators.required],
      //   accountStwre: [null, Validators.required],
      //   ownRevDetails: this.fb.group({
      //     totalOwnRevenArr_20: ["", Validators.required],
      //     fy_19_20_cash: [null, Validators.required],
      //     fy_19_20_online: [null, Validators.required],
      //   }),
      //   propertyDetails: this.fb.group({
      //     NoOfProlisted: ["", Validators.required],
      //     NoOfProExemtfromPayProTax: [null, Validators.required],
      //     NoOfProwhichProTaxPaid: [null, Validators.required],
      //   }),
      // }),
      // uploadFyDoc: this.fb.group({
      //   AppAnnualBudget: this.fb.group({
      //     budget_2017_18: [null, Validators.required],
      //     budget_2018_19: [null, Validators.required],
      //     budget_2019_20: [null, Validators.required],
      //   }),
      //   auditedAnnualFySt: this.fb.group({
      //     audited_2017_18: [null, Validators.required],
      //     audited_2018_19: [null, Validators.required],
      //     audited_2019_20: [null, Validators.required],
      //   })
      // }),
      status: [""],
      rejectReason: '',

    });
  }
  onLoad() {
    this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
      console.log('fiscal res', res);
      this.fiscalFormFeild = res;
      let formObjKey = res?.fyDynemic;
      this.expPerf = formObjKey?.expPerf;
      this.revenueMob = formObjKey?.revenueMob;
      this.uploadFyDoc = formObjKey?.uploadFyDoc;
    //  this.goverPar = formObjKey?.goverPar;
      this.fillDataInForm(res?.data?.data);
      this.changeNumToWords();
      this.skipLogicForGov('onload');
    },
      (error) => {
        console.log(error);
      }
    )
  }
  fillDataInForm(data) {
    console.log('this form.....', this.fiscalForm);
    console.log('this form.....', data);
    console.log('this form.....', data?.nameCmsnr);
    this.signedFileUrl = data?.signedCopyOfFile?.url;
    this.signedFileName = data?.signedCopyOfFile?.name;
    this.goverParaNdata.normalData.yearData.webUrlAnnual.value = data?.webUrlAnnual;
    this.goverParaNdata.normalData.yearData.digitalRegtr.value = data?.digitalRegtr;
    this.goverParaNdata.normalData.yearData.registerGis.value = data?.registerGis;
    this.goverParaNdata.normalData.yearData.accountStwre.value = data?.accountStwre;
    this.totalOwnRevenueArea = data?.totalOwnRevenueArea;
    this.fy_19_20_cash = data?.fy_19_20_cash?.amount;
    this.fy_19_20_online = data?.fy_19_20_online?.amount;
    this.property_tax_register = data?.property_tax_register;
    this.paying_property_tax = data?.paying_property_tax;
    this.paid_property_tax = data?.paid_property_tax;
    this.isDraft = data?.isDraft;
    if (this.isDraft) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    this.fiscalForm.patchValue({
      basicUlbDetails: {
        population11: data?.population11,
        populationFr: data?.populationFr,
        webLink: data?.webLink,
        nameCmsnr: data?.nameCmsnr,
      },
      contactInfo: {
        nameOfNodalOfficer: data?.nameOfNodalOfficer,
        designationOftNodalOfficer: data?.designationOftNodalOfficer,
        mobile: data?.mobile,
        email: data?.email,
      },
    });

    this.goverPar = {
      ownRevDetails: {
        key: 'ownRevDetails',
        label: 'Own Revenue Details',
        yearData: [
          {
            label: 'Total Own Revenue Arrears as on 31st March 2020',
            key: 'totalOwnRevenArr_20',
            postion: '1',
            amount: this.totalOwnRevenueArea,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
          {
            label: 'FY 2019-20 - by Cash/Cheque/DD',
            key: 'fy_19_20_cash',
            postion: '2',
            amount: this.fy_19_20_cash,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
          {
            label: 'FY 2019-20 - by Online (UPI,Netbanking,Credit Card,Debit Card,others)',
            key: 'fy_19_20_online',
            postion: '3',
            amount: this.fy_19_20_online,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
        ]
      },
      propertyDetails: {
        key: 'propertyDetails',
        label: 'Property Details',
        yearData: [
          {
            label: 'Number of Properties assessed/listed as per Property Tax Register',
            key: 'NoOfProlisted',
            postion: '1',
            amount: this.property_tax_register,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
          {
            label: 'Number of Properties exemt from paying Property Tax',
            key: 'NoOfProExemtfromPayProTax',
            postion: '2',
            amount: this.paying_property_tax,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
          {
            label: 'Number of Properties for which Property Tax has been paid',
            key: 'NoOfProwhichProTaxPaid',
            postion: '3',
            amount: this.paid_property_tax,
            min: '',
            max: '',
            required: true,
            type: '',
            bottomText: ``,
            placeHolder: '',
            input: 'number',
            inWords: ''
          },
        ]
      },
    };
    this.changeNumToWords();
  }
  returnZero() {
    return 0;
  }

  stepperContinue(stepper: MatStepper, item) {
    console.log("stepper", stepper, item);
    // let lb: string = label;
    // switch (label) {
    //   case "enumeration": {
    //     this.lGreen.enum = true;
    //     this.lSelected.enum = false;
    //     console.log("enum", this.scorePerformanceForm);
    //     break;
    //   }
    //   case "valuation": {
    //     this.lGreen.valu = true;
    //     this.lSelected.valu = false;
    //     //  console.log('valu', this.scorePerformanceForm)
    //     break;
    //   }
    //   case "assessment": {
    //     this.lGreen.asse = true;
    //     this.lSelected.asse = false;
    //     break;
    //   }
    //   case "billing_collection": {
    //     //  console.log('bilii', this.scorePerformanceForm)
    //     this.lGreen.bAndC = true;
    //     this.lSelected.bAndC = false;
    //     break;
    //   }
    //   case "reporting": {
    //     this.lGreen.repo = true;
    //     this.lSelected.repo = false;
    //     //console.log('repo', this.scorePerformanceForm)
    //     break;
    //   }
    // }
    stepper.next();
  }
  stepperContinueSave(stepper: MatStepper, item) {
    console.log('this form.....', this.fiscalForm?.value);
    this.isDraft = true;
    this.updateValueInForm();
    // console.log('this form.....', JSON.stringify(this.fiscalForm.value));
    this.saveForm(stepper, item);

  }
  keyUpValidationNum(e, stepItem, yearItem) {
    console.log('validation', e, stepItem, yearItem)
  }
  skipLogicForGov(type) {

  }
  skipLogicRadio(type, val) {
    console.log('vvvvv', type, val);
    if (type == 'digitalRegtr' && val == 'Yes') {
      //  goverPar.normalData.yearData.digitalRegtr.value
    }
  }
  amountKeyUp(type, yearItem) {
    yearItem.inWords = toWords.convert(Number(yearItem?.amount), {
      currency: false,
      doNotAddOnly: true,
    });
  }
  amounttoWords(type, val) {
    return toWords.convert(Number(val), {
      currency: false,
      doNotAddOnly: true,
    });
  }
  changeNumToWords() {
    for (const key in this.revenueMob) {
      this.revenueMob[key].yearData.forEach((el) => {
        el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
    for (const key in this.expPerf) {
      this.expPerf[key].yearData.forEach((el) => {
        el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
    for (const key in this.goverPar) {
      this.goverPar[key].yearData.forEach((el) => {
        el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
  }
  fileUpLoader = false;
  async fileChangeEvent(event, fileType, inputType, yrItem, stepItem) {
    console.log(fileType, event);
    this.fileUpLoader = true;
    console.log("aaa", event.target.files[0].size);
    let files;
    let fileSize = event?.target?.files[0]?.size / 1048576; //size in mb
    console.log("aaa", fileSize);
    if (fileSize < 5) {
      if (typeof event != "boolean") files = event.target.files[0];
      //  else files = this.data[fileType].file;
      let fileExtension = files.name.split(".").pop();
      console.log(fileExtension, fileType);
      if (fileType == "excel") {
        if (fileExtension == "xls" || fileExtension == "xlsx") {
          this.uploadFile(files, files.name, files.type, inputType, yrItem, stepItem);
        } else {
          return swal("Error", "Only Excel File can be Uploaded.", "error");
        }
      } else if (fileType == "pdf") {
        if (fileExtension == "pdf") {
          this.uploadFile(files, files.name, files.type, inputType, yrItem, stepItem);
        } else {
          console.log("error type", event);
          swal("Error", "Only PDF File can be Uploaded.", "error");
          return;
        }
      } else {
        return;
      }
    } else {
      swal("File Limit Error", "Maximum 5 mb file can be allowed.", "error");
      return;
    }
  }

  uploadFile(file, name, type, inputType, yrItem, stepItem) {
    //  console.log("this.data", this.data);
    // this.data[fileType].progress = 20;
    this.dataEntryService.newGetURLForFileUpload(name, type).subscribe(
      (s3Response) => {
        console.log('dgffffffffff', s3Response.data[0])
        //  this.data[fileType].progress = 50;
        const res = s3Response.data[0];
        // this.data[fileType].name = name;
        this.uploadFileToS3(
          file,
          res["url"],
          res["file_url"],
          name,
          inputType,
          yrItem,
          stepItem
        );
      },
      (err) => {
        console.log(err);
        //  this.data[fileType].file = file;
        //  this.data[fileType].error = true;
      }
    );
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    name,
    inputType,
    yrItem, stepItem
  ) {
    //this.data[fileType].progress = 60;
    console.log('abc....', file, s3URL, fileAlias, name, inputType);

    this.dataEntryService.newUploadFileToS3(file, s3URL).subscribe(
      (res) => {
        console.log('s3Response upload res', res)
        //   this.data[fileType].progress = 70;
        if (res.type === HttpEventType.Response) {
          if (inputType == 'signed') {
            this.signedFileUrl = fileAlias;
            this.signedFileName = name;
          } else if (inputType == 'annualDoc') {
            yrItem.file.url = fileAlias;
            yrItem.file.name = name;
          }
          this.fileUpLoader = false;
          // this.data[fileType].progress = 100;
          // this.data[fileType].file = file;
          // this.data[fileType].url = fileAlias;
          //  if (this.compName == "AnnualAccount" && this.userData?.role == 'ULB')
          //  sessionStorage.setItem("changeInAnnualAcc", "true");
          //  this.getFileUploadResult.emit(this.data);
        }
      },
      (err) => {
        //this.data[fileType].file = file;
        //this.data[fileType].error = true;
      }
    );
  }

  saveForm(stepper: MatStepper, item) {

    console.log('post body', this.postData);
    this.fiscalService.postFiscalRankingData(this.postData).subscribe((res) => {
      console.log('post res', res);
      if (item?.id != 's7') {
        swal('Saved', "Data save as draft successfully!", 'success');
        stepper.next();
      } else {
        this.formSubmitted = true;
      }

    },
      (error) => {
        console.log('post error', error)
      }
    )
  }
  updateValueInForm() {
    this.setFYData();
    this.postData = {
      ulb: this.ulbId,
      "design_year": this.yearIdArr['2022-23'],
      ...this.fiscalForm?.value?.basicUlbDetails,
      ...this.fiscalForm?.value?.contactInfo,
      "webUrlAnnual": this.goverParaNdata?.normalData?.yearData?.webUrlAnnual?.value,
      "digitalRegtr": this.goverParaNdata?.normalData?.yearData?.digitalRegtr?.value,
      "registerGis": this.goverParaNdata?.normalData?.yearData?.registerGis?.value,
      "accountStwre": this.goverParaNdata?.normalData?.yearData?.accountStwre?.value,
      "totalOwnRevenueArea": this.totalOwnRevenueArea,
      "fy_19_20_cash": {
        "type": "Cash",
        "amount": this.fy_19_20_cash
      },
      "fy_19_20_online": {
        "type": "UPI",
        "amount": this.fy_19_20_online
      },
      "fyData": this.fyDataArr,
      "signedCopyOfFile": {
        "name": this.signedFileName,
        "url": this.signedFileUrl
      },
      "property_tax_register": this.property_tax_register,
      "paying_property_tax": this.paying_property_tax,
      "paid_property_tax": this.paid_property_tax,
      "status": "PENDING",
      "isDraft": this.isDraft
    };
  }

  fyDataArr = [];
  setFYData() {
    let revPostArr = [];
    let expPostArr = [];
    let annFyPostArr = [];
    for (const key in this.revenueMob) {
      let dataObj = {}
      this.revenueMob[key].yearData.forEach((el) => {
        if (el?.amount != '' && el?.amount != null && el?.amount != undefined) {
          dataObj = {
            "ulb": this.ulbId,
            "year": el?.year,
            "amount": el?.amount,
            "type": el?.type,
            "file": "",
            "typeofdata": 'Number', /* Number, PDF,Excel    */
            "status": "PENDING", /* PENDING,APPROVED,REJECTED    */
            key: el?.key
          }
          revPostArr.push(dataObj);
        }
      })
    }
    for (const key in this.expPerf) {
      let dataObj = {}
      this.expPerf[key].yearData.forEach((el) => {
        if (el?.amount != '' && el?.amount != null && el?.amount != undefined) {
          dataObj = {
            "ulb": this.ulbId,
            "year": el?.year,
            "amount": el?.amount,
            "type": el?.type,
            "file": "",
            "typeofdata": 'Number', /* Number, PDF,Excel    */
            "status": "PENDING", /* PENDING,APPROVED,REJECTED    */
            key: el?.key
          }
          expPostArr.push(dataObj);
        }
      })
    }
    for (const key in this.uploadFyDoc) {
      let dataObj = {}
      this.uploadFyDoc[key].yearData.forEach((el) => {
        if (el?.file?.url != '' && el?.file?.url != null && el?.file?.url != undefined) {
          dataObj = {
            "ulb": this.ulbId,
            "year": el?.year,
            "type": el?.type,
            "file": {
              name: el?.file?.name,
              url: el?.file?.url
            },
            "typeofdata": 'PDF', /* Number, PDF,Excel    */
            "status": "PENDING", /* PENDING,APPROVED,REJECTED    */
            key: el?.key
          }
          annFyPostArr.push(dataObj);
        }
      })
    }
    console.log('expPostArr', expPostArr);
    console.log('revPostArr', revPostArr);
    this.fyDataArr = revPostArr.concat(expPostArr);
    this.fyDataArr = this.fyDataArr.concat(annFyPostArr);
    console.log('whole', this.fyDataArr);


  }
  amountPushInFY(type, index, yItem, stItem) {
    console.log(type, index, yItem, stItem);
    let dType = '';
    let dataObj = {}
    if (stItem?.key == "revenueMob") {
      dType = 'Number';
      dataObj = {
        "ulb": this.ulbId,
        "year": yItem?.year,
        "amount": yItem?.amount,
        "type": "",
        "file": "",
        "typeofdata": dType, /* Number, PDF,Excel    */
        "status": "PENDING" /* PENDING,APPROVED,REJECTED    */
      }
    } else if (stItem?.key == "uploadFyDoc") {
      dType = 'PDF';
      dataObj = {
        "ulb": this.ulbId,
        "year": yItem?.year,
        "amount": null,
        "type": "",
        "file": {
          name: yItem?.file?.name,
          url: yItem?.file?.url
        },
        "typeofdata": dType, /* Number, PDF,Excel    */
        "status": "PENDING" /* PENDING,APPROVED,REJECTED    */
      }
    } else if (stItem?.key == "fisGov") {
      switch (yItem.key) {
        case "totalOwnRevenArr_20":
          this.totalOwnRevenueArea = yItem?.amount;
        case "fy_19_20_cash":
          this.fy_19_20_cash = yItem?.amount;
        case "fy_19_20_online":
          this.fy_19_20_online = yItem?.amount;
        case "NoOfProlisted":
          this.property_tax_register = yItem?.amount;
        case "NoOfProExemtfromPayProTax":
          this.paying_property_tax = yItem?.amount;
        case "NoOfProwhichProTaxPaid":
          this.paid_property_tax = yItem?.amount;
      }
    }


  }
  backTohome() {
    this._router.navigateByUrl('../home')
  }
  onPreview() {
    this.setFYData();
    let formdata = {
      ...this.fiscalForm?.value?.basicUlbDetails,
      ...this.fiscalForm?.value?.contactInfo,
      revMob: this.revenueMob,
      expPer: this.expPerf,
      fisGov: this.goverPar,
      upldDoc: this.uploadFyDoc,
      nrmlData: this.goverParaNdata,
      "signedCopyOfFile": {
        "name": this.signedFileName,
        "url": this.signedFileUrl
      },
      "webUrlAnnual": this.goverParaNdata?.normalData?.yearData?.webUrlAnnual?.value,
      "digitalRegtr": this.goverParaNdata?.normalData?.yearData?.digitalRegtr?.value,
      "registerGis": this.goverParaNdata?.normalData?.yearData?.registerGis?.value,
      "accountStwre": this.goverParaNdata?.normalData?.yearData?.accountStwre?.value,
      "totalOwnRevenueArea": 123546,
      "fy_19_20_cash": {
        "type": "Cash",
        "amount": 10000
      },
      "fy_19_20_online": {
        "type": "UPI",
        "amount": 99999
      },
    };
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      data: formdata,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
  formError = true;
  errorArr = [];
  checkValidation() {
    for (const key in this.revenueMob) {
      this.revenueMob[key].yearData.forEach((el) => {
        if (el?.amount == '' || el?.amount == null) {
          el['error'] = true;
        } else {
          el['error'] = false
        }
      })
    }
    for (const key in this.expPerf) {
      this.expPerf[key].yearData.forEach((el) => {
        if (el?.amount == '' || el?.amount == null) {
          if (el?.amount == '' || el?.amount == null) {
            el['error'] = true
          } else {
            el['error'] = false
          }
        }
      })
    }
    for (const key in this.goverPar) {
      this.goverPar[key].yearData.forEach((el) => {
        if (el?.amount == '' || el?.amount == null) {
          if (el?.amount == '' || el?.amount == null) {
            el['error'] = true
          } else {
            el['error'] = false
          }
        }
      })
      for (const key in this.uploadFyDoc) {
        this.uploadFyDoc[key].yearData.forEach((el) => {
          if (el?.file?.url == '' || el?.file?.url == null) {
            if (el?.file?.url == '' || el?.file?.url == null) {
              el['error'] = true
            } else {
              el['error'] = false
            }
          }
        })
      }
    }
    let totalObj = { ...this.revenueMob, ...this.expPerf, ...this.goverPar, ...this.uploadFyDoc }
    console.log('total obj', totalObj);
    this.checkFinalValidation(totalObj)
  }
  checkFinalValidation(data) {

    for (const key in data) {
      let arEl = data[key].yearData;
      for (let i = 0; i < arEl.length; i++) {
        let el = arEl[i];
        if (el?.error == true) {
          this.formError = false;
          return;
        }
      }
    }
  }
  isDisabled = false;
  errorMsg =
    "One or more required fields are empty or contains invalid data. Please check your input.";
  finalSubmit() {
    this.checkValidation();
    if (this.fiscalForm.status != "INVALID" && this.formError) {
      this.isDraft = false;
      console.log('post body', this.postData);
      this.fiscalService.postFiscalRankingData(this.postData).subscribe((res) => {
        console.log('post res', res);
        // swal('Saved', "Data save as draft successfully!", 'success')
        this.formSubmitted = true;
        this.isDisabled = true;
      },
        (error) => {
          console.log('post error', error);

        }
      )
    } else {
      swal("Missing Data !", `${this.errorMsg}`, "error");
    }
  }
  tenDigitMax = 9999999999;
  thrtnDigit = 9999999999999;
  numberLimitV(e, input, minV, maxV) {
    console.log("sss", e, input, minV, maxV);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];
    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }
    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (
      +newValue > maxV ||
      newValue.length > maxV?.length ||
      +newValue < minV ||
      e.key == " "
    ) {
      e.preventDefault();
    }
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;

    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
