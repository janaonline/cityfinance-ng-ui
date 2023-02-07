import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ToWords } from "to-words";
import { SweetAlert } from "sweetalert/typings/core";
import { DataEntryService } from 'src/app/dashboard/data-entry/data-entry.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UlbFisPreviewComponent } from './ulb-fis-preview/ulb-fis-preview.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  customEmailValidator,
  mobileNoValidator,
} from "src/app/util/reactiveFormValidators";
import { UserUtility } from 'src/app/util/user/user';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
const swal: SweetAlert = require("sweetalert");
const toWords = new ToWords();
@Component({
  selector: 'app-ulb-fiscal',
  templateUrl: './ulb-fiscal.component.html',
  styleUrls: ['./ulb-fiscal.component.scss']
})
export class UlbFiscalComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  abs = Math.abs;
  errorPageIndex: number;
  isLoader = false;
  userData;
  ulbName = '';
  stateName = '';
  yearIdArr;
  ulbId = "";
  isDraft = true;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  stepperArray = [
    {
      label: `Basic ULB Details`,
      key: 'basicDet',
      id: 's1',
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
      label: `Self Declaration`,
      key: 'selDec',
      id: 's7',
      icon: '',
      text: ''
    },

  ];
  fiscalFormFeild;
  fiscalForm;
  fisc
  revenueMob;
  expPerf;
  uploadFyDoc;
  totalOwnRevenueArea = null;
  property_tax_register = null;
  paying_property_tax = null;
  paid_property_tax = null;
  fy_21_22_cash = null;
  fy_21_22_online = null;
  isPopAvl11 = false;
  isPopAvlFr = false;
  fileUpLoader = false;
  fyDataArr = [];

  value = 'APPROVED';

  cantakeAction = false;

  stePreDataArray;
  formError = true;
  errorArr = [];
  isDisabled = false;
  errorMsg =
    "One or more required fields are empty or contains invalid data. Please check your input.";
  tenDigitMax = 9999999999;
  thrtnDigit = 9999999999999;
  routerNavigate = null;
  response;
  alertError = "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  @ViewChild("templateSaveChange") template;
  // goverPar;
  // revenueMob = {
  //   totalRecActual: {
  //     key: 'totalRecActual',
  //     label: 'Total Receipts (Actual)',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
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
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
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
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
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
  //         label: 'FY 2020-21',
  //         key: 'FY2020-21',
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
  //   totalRcptWaterSupply: {
  //     key: 'totalRcptWaterSupply',
  //     label: 'Total Receipts (Actual) for Water Supply',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
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
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
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
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
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
  //         label: 'FY 2020-21',
  //         key: 'FY2020-21',
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
  //   totalRcptSanitation: {
  //     key: 'totalRcptSanitation',
  //     label: 'Total Receipts (Actual) for Sanitation/Sewerage',
  //     yearData: [
  //       {
  //         label: 'FY 2017-18',
  //         key: 'FY2017-18',
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
  //         label: 'FY 2018-19',
  //         key: 'FY2018-19',
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
  //         label: 'FY 2019-20',
  //         key: 'FY2019-20',
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
  //         label: 'FY 2020-21',
  //         key: 'FY2020-21',
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
      ]
    },
    ownRevenAmt: {
      key: "ownRevenAmt",
      label: "Own Revenue Collection Amount",
      yearData: [
        {
          label: "FY 2021-22 - by Cash/Cheque/DD",
          key: "fy_21_22_cash",
          postion: "2",
          amount: this.fy_21_22_cash,
          min: "",
          max: "",
          required: true,
          type: "",
          bottomText: "",
          placeHolder: "",
          input: "number",
          isWords: ''
        },
        {
          label: "FY 2021-22 - by Online (UPI,Netbanking,Credit Card,Debit Card,others)",
          key: "fy_21_22_online",
          postion: "3",
          amount: this.fy_21_22_online,
          min: "",
          max: "",
          required: true,
          type: "",
          bottomText: "",
          placeHolder: "",
          input: "number",
          isWords: ''
        }
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
    auditReprtDate: {
      label: 'Date of Audit Report for audited financial statements',
      key: 'auditReprtDate',
      yearData: []
    },
    normalData: {
      key: 'normalData',
      label: '',
      yearData: {
        webUrlAnnual: {
          label: 'ULB website URL link where Copy of Audited Annual Accounts of FY 2019-20  to FY 2020-21 are available',
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
    "webUrlAnnual": {
      status: "",
      value: null
    },
    "digitalRegtr": {
      status: "",
      value: null
    },
    "registerGis": {
      status: "",
      value: null
    },
    "accountStwre": {
      status: "",
      value: null
    },
    "totalOwnRevenueArea": {
      status: "",
      value: null
    },
    "fy_20_21_cash": {
      "type": "Cash",
      value: null,
      status: "",
    },
    "fy_20_21_online": {
      "type": "UPI",
      value: null,
      status: "",
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
      "url": '',
      status: 'PENDING'
    },
    "property_tax_register": {
      status: "",
      value: null
    },
    "paying_property_tax": {
      status: "",
      value: null
    },
    "paid_property_tax": {
      status: "",
      value: null
    },
    "status": "PENDING",
    "isDraft": this.isDraft
  };
  constructor(
    private fb: FormBuilder,
    private fiscalService: FiscalRankingService,
    private dataEntryService: DataEntryService,
    private _router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.initializeUserType();
    this.initializeLoggedInUserDataFetch();
    this.loggedInUserType = this.loggedInUserDetails?.role;
    if (!this.loggedInUserType) {
      this._router.navigateByUrl('fiscal/login')
      // this.showLoader = false;
    }
    else if (this.loggedInUserType != 'ULB') {
      this.ulbId = this.activatedRoute.snapshot.params.ulbId;
      if(this.activatedRoute.snapshot.queryParams.cantakeAction) {
        this.cantakeAction = true;
      }
      if(!this.ulbId) {
        this._router.navigateByUrl('rankings/home')
      }
    }
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.userData?.role == "ULB") {
      this.ulbName = this.userData?.name;
      this.ulbId = this.userData?.ulb;
    }
    this.yearIdArr = JSON.parse(localStorage.getItem("Years"));
    this.initializeForm();
    this.navigationCheck();
  }


  ngOnInit(): void {
    this.onLoad();
    sessionStorage.setItem("changeInFR", "false");

  }
  initializeForm() {
    this.fiscalForm = this.fb.group({
      basicUlbDetails: this.fb.group({
        ulbName: [this.ulbName],
        population11: ['', Validators.required],
        populationFr: [''],
        webLink: [''],
        nameCmsnr: ['', Validators.required],
        waterSupply: ['', Validators.required],
        sanitationService: ['', Validators.required],
        propertyWaterTax: ['', Validators.required],
        propertySanitationTax: ['', Validators.required],
      }),
      contactInfo: this.fb.group({
        nameOfNodalOfficer: ["", Validators.required],
        designationOftNodalOfficer: [null, Validators.required],
        mobile: [null, [Validators.required, mobileNoValidator]],
        email: [null, [Validators.required, Validators.email, customEmailValidator]],
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
    this.isLoader = true;
    this.fiscalService.getfiscalUlbForm(this.yearIdArr['2022-23'], this.ulbId).subscribe((res: any) => {
      console.log('fiscal res', res);
      this.fiscalFormFeild = res;
      let formObjKey = res?.fyDynemic;
      this.expPerf = formObjKey?.expPerf;
      this.revenueMob = formObjKey?.revenueMob;
      this.uploadFyDoc = formObjKey?.uploadFyDoc;
      this.goverParaNdata.auditReprtDate.yearData = formObjKey?.goverPar?.auditReprtDate?.yearData?.map(year => ({
        ...year,
        max: new Date(),
        min: new Date(+`20${year.key.split('-')[1]}`, 3, 1)
      }))
      this.fillDataInForm(res?.data);
      this.changeNumToWords();
      this.skipLogicForGov('onload');
      console.log('revenueMob', this.revenueMob);
      this.isLoader = false;
    },
      (err) => {
        console.log(err);
        swal("Something went wrong", err?.error?.message || 'Please try again after some time', "error")
        this.isLoader = false;
      }
    );
  }
  changeDecInForm() {
    // this.fiscalForm?.controls.contactInfo.valueChanges.subscribe((el) => {
    //  console.log("changes form", el);
    console.log('form', this.fiscalForm);
    sessionStorage.setItem("changeInFR", "true");
    // });
  }
  fillDataInForm(data) {
    console.log('this form.....', this.fiscalForm);
    this.signedFileUrl = data?.signedCopyOfFile?.url;
    this.signedFileName = data?.signedCopyOfFile?.name;
    this.goverParaNdata.normalData.yearData.webUrlAnnual.value = data?.webUrlAnnual?.value ? data?.webUrlAnnual?.value : null;
    this.goverParaNdata.normalData.yearData.registerGis.value = data?.registerGis?.value ? data?.registerGis?.value : null;
    this.goverParaNdata.normalData.yearData.accountStwre.value = data?.accountStwre?.value ? data?.accountStwre?.value : null;
    this.totalOwnRevenueArea = data?.totalOwnRevenueArea?.value ? data?.totalOwnRevenueArea?.value : null;
    this.property_tax_register = data?.property_tax_register?.value ? data?.property_tax_register?.value : null;
    this.fy_21_22_online = data?.fy_21_22_online?.amount ? data?.fy_21_22_online?.amount : null;
    this.fy_21_22_cash = data?.fy_21_22_cash?.amount ? data?.fy_21_22_cash?.amount : null;
    this.paying_property_tax = data?.paying_property_tax?.value ? data?.paying_property_tax?.value : null;
    this.paid_property_tax = data?.paid_property_tax?.value ? data?.paid_property_tax?.value : null;
    this.isDraft = data?.isDraft;

    this.isPopAvl11 = data?.population11?.readonly;
    this.isPopAvlFr = data?.populationFr?.readonly;
    this.fiscalForm.patchValue({
      basicUlbDetails: {
        population11: data?.population11?.value,
        populationFr: data?.populationFr?.value,
        webLink: data?.webLink,
        nameCmsnr: data?.nameCmsnr,
        waterSupply: data?.waterSupply.value,
        sanitationService: data?.sanitationService.value,
        propertyWaterTax: data?.propertyWaterTax.value,
        propertySanitationTax: data?.propertySanitationTax.value
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
            label: 'Total Own Revenue Arrears as on 31st March 2022',
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
        ]
      },
      ownRevenAmt: {
        key: "ownRevenAmt",
        label: "Own Revenue Collection Amount",
        yearData: [
          {
            label: "FY 2021-22 - by Cash/Cheque/DD",
            key: "fy_21_22_cash",
            postion: "2",
            amount: this.fy_21_22_cash,
            min: "",
            max: "",
            required: true,
            type: "",
            bottomText: "",
            placeHolder: "",
            input: "number",
            isWords: ''
          },
          {
            label: "FY 2021-22 - by Online (UPI,Netbanking,Credit Card,Debit Card,others)",
            key: "fy_21_22_online",
            postion: "3",
            amount: this.fy_21_22_online,
            min: "",
            max: "",
            required: true,
            type: "",
            bottomText: "",
            placeHolder: "",
            input: "number",
            isWords: ''
          }
        ]
      },
      propertyDetails: {
        key: 'propertyDetails',
        label: 'Property Details',
        yearData: [
          {
            label: 'Number of Properties assessed/listed as per Property Tax Register (as on 1st April 2022)',
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
            label: 'Number of Properties exemt from paying Property Tax (as on 1st April 2022)',
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
            label: 'Number of Properties for which Property Tax has been paid  (for FY 2021-22)',
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
    if (this.isDraft == false) {
      this.isDisabled = true;
      this.fiscalForm.disable();
    } else {
      this.isDisabled = false;
      this.fiscalForm.enable();
    }
    if (this.userData?.role != 'ULB') {
      this.isDisabled = true;
      this.fiscalForm.disable();
    }
    console.log('fiscal form.....', this.fiscalForm);
    if (this.isPopAvl11) {
      this.fiscalForm.controls.basicUlbDetails.controls.population11.disable();
    }
    if (this.isPopAvlFr) {
      this.fiscalForm.controls.basicUlbDetails.controls.populationFr.disable();
    }
    this.fiscalForm.controls.basicUlbDetails.controls.ulbName.disable();
    // this.changeNumToWords();
    this.addSomeKey();

  }
  returnZero() {
    return 0;
  }

  addSomeKey() {
    for (const key in this.uploadFyDoc) {
      if (key != 'guidanceNotes') {
        this.uploadFyDoc[key].yearData.forEach((el) => {
          el['fileProcess'] = false;
          el['error'] = false;
        })
      }
    }
    for (const key in this.expPerf) {
      this.expPerf[key].yearData.forEach((el) => {
        //  el['error'] = false;
        if (Object.keys(el).length > 0) {
          el['error'] = false;
        }
      })
    }
    for (const key in this.revenueMob) {
      this.revenueMob[key].yearData.forEach((el) => {
        // console.log('Object.keys(el).length', Object.keys(el).length);
        if (Object.keys(el).length > 0) {
          el['error'] = false;
        }


      })
    }
    for (const key in this.goverPar) {
      this.goverPar[key].yearData.forEach((el) => {
        el['error'] = false;
      })
    }
  }
  stepperContinue(item) {
    console.log(this.revenueMob);
    // console.log("stepper", stepper, item);
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
    this.stepper.next();
  }
  stepperContinueSave(item) {
    console.log('this form.....', this.fiscalForm?.value);
    this.isDraft = true;
    this.updateValueInForm();
    // console.log('this form.....', JSON.stringify(this.fiscalForm.value));
    this.saveForm(item);

  }
  keyUpValidationNum(e, stepItem, yearItem) {
    console.log('validation', e, stepItem, yearItem)
  }
  skipLogicForGov(type) {

  }
  skipLogicRadio(type, val) {
    //  console.log('vvvvv', type, val);
    if (!this.isDisabled) {
      sessionStorage.setItem("changeInFR", "true");
      if (type == 'digitalRegtr' && val == 'Yes') {
        //  goverPar.normalData.yearData.digitalRegtr.value
      }
    }
  }
  amountKeyUp(type, yearItem) {
    if (yearItem?.amount != '') {
      yearItem.inWords = toWords.convert(Number(yearItem?.amount), {
        currency: false,
        doNotAddOnly: true,
      });

    }
    console.log('revenueMob', this.revenueMob, yearItem);
  }

  getPercentIncrement(currentYear, previewYear) {
    const b = +previewYear.amount;
    const a = +currentYear.amount;
    return Math.floor((a - b) / b * 100);
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
        if (el?.amount || el?.amount === 0)
          el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
    for (const key in this.expPerf) {
      this.expPerf[key].yearData.forEach((el) => {
        if (el?.amount || el?.amount === 0)
          el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
    for (const key in this.goverPar) {
      this.goverPar[key].yearData.forEach((el) => {
        if (el?.amount || el?.amount === 0)
          el.inWords = this.amounttoWords('onLoad', el?.amount)
      })
    }
  }
  async fileChangeEvent(event, fileType, inputType, yrItem, stepItem) {
    console.log(fileType, event);
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
    if (inputType == 'signed') {
      this.fileUpLoader = true;
    } else if (inputType == 'annualDoc') {
      yrItem.fileProcess = true;
    }
  }

  uploadFile(file, name, type, inputType, yrItem, stepItem) {
    //  console.log("this.data", this.data);
    // this.data[fileType].progress = 20;
    let folderName = `${this.userData?.role}/${this.yearIdArr['2022-23']}/fiscalRanking/${this.userData?.ulb}`
    this.dataEntryService.newGetURLForFileUpload(name, type, folderName).subscribe(
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
            this.fileUpLoader = false;
            this.signedFileUrl = fileAlias;
            this.signedFileName = name;

          } else if (inputType == 'annualDoc') {
            yrItem.file.url = fileAlias;
            yrItem.file.name = name;
            yrItem.fileProcess = false;
          }
          sessionStorage.setItem("changeInFR", "true");
        }
      },
      (err) => {
        //this.data[fileType].file = file;
        //this.data[fileType].error = true;
      }
    );
  }

  saveForm(item) {
    console.log('goverParaNdata', this.goverParaNdata);
    this.fiscalService.postFiscalRankingData(this.postData).subscribe((res) => {
      console.log('post res', res);
      if (item?.id != 's7') {
        swal('Saved', "Data save as draft successfully!", 'success');
        this.stepper.next();
      } else {
        this.formSubmitted = true;

      }
      sessionStorage.setItem("changeInFR", "false");
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
      // ...this.fiscalForm?.value?.basicUlbDetails,
      ...this.fiscalForm?.value?.contactInfo,
      webLink: this.fiscalForm?.value?.basicUlbDetails?.webLink,
      nameCmsnr: this.fiscalForm?.value?.basicUlbDetails?.nameCmsnr,
      ulbName: this.ulbName,
      waterSupply: {
        value: this.fiscalForm?.value?.basicUlbDetails?.waterSupply,
        status: "PENDING"
      },
      sanitationService: {
        value: this.fiscalForm?.value?.basicUlbDetails?.sanitationService,
        status: "PENDING",
      },
      propertyWaterTax: {
        value: this.fiscalForm?.value?.basicUlbDetails?.propertyWaterTax,
        status: "PENDING"
      },
      propertySanitationTax: {
        value: this.fiscalForm?.value?.basicUlbDetails?.propertySanitationTax,
        status: "PENDING"
      },
      population11: {
        value: this.fiscalForm.controls.basicUlbDetails.controls.population11.value,
        readonly: this.isPopAvl11
      },
      populationFr: {
        value: this.fiscalForm.controls.basicUlbDetails.controls.populationFr.value,
        readonly: this.isPopAvl11
      },
      "webUrlAnnual": {
        value: this.goverParaNdata?.normalData?.yearData?.webUrlAnnual?.value,
        status: 'PENDING',
      },
      // "auditReprtDate": {
      //   value: this.goverParaNdata?.auditReprtDate?.yearData,
      //   status: 'PENDING',
      // },
      "registerGis": {
        value: this.goverParaNdata?.normalData?.yearData?.registerGis?.value,
        status: 'PENDING',
      },
      "accountStwre": {
        value: this.goverParaNdata?.normalData?.yearData?.accountStwre?.value,
        status: 'PENDING',
      },
      "totalOwnRevenueArea": {
        value: this.totalOwnRevenueArea,
        status: 'PENDING',
      },
      "fyData": this.fyDataArr,
      "signedCopyOfFile": {
        "name": this.signedFileName ? this.signedFileName : null,
        "url": this.signedFileUrl ? this.signedFileUrl : null,
        status: 'PENDING'
      },
      "property_tax_register": {
        status: "PENDING",
        value: this.property_tax_register
      },
      "fy_21_22_cash": {
        status: "PENDING",
        amount: this.fy_21_22_cash
      },
      "fy_21_22_online": {
        status: "PENDING",
        amount: this.fy_21_22_online
      },
      "paying_property_tax": {
        status: "PENDING",
        value: this.paying_property_tax
      },
      "paid_property_tax": {
        status: "PENDING",
        value: this.paid_property_tax
      },
      "status": "PENDING",
      "isDraft": this.isDraft
    };
    // this.isPopAvl11 = data?.populationFr?.readonly;
    // this.isPopAvlFr = data?.populationFr?.readonly;
    // delete this.postData.population11;
    // delete this.postData.populationFr;
  }

  setFYData() {
    let revPostArr = [];
    let expPostArr = [];
    let annFyPostArr = [];
    let goverParaNPostArray = [];
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
            "status": el?.status ? el?.status : 'PENDING', /* PENDING,APPROVED,REJECTED    */
            key: el?.key,
            readonly: el?.readonly
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
            "status": el?.status ? el?.status : 'PENDING', /* PENDING,APPROVED,REJECTED    */
            key: el?.key,
            readonly: el?.readonly
          }
          expPostArr.push(dataObj);
        }
      })
    }
    for (const key in this.uploadFyDoc) {
      let dataObj = {}
      if (key != 'guidanceNotes') {
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
              "status": el?.status ? el?.status : 'PENDING', /* PENDING,APPROVED,REJECTED    */
              key: el?.key,
              readonly: el?.readonly
            }
            annFyPostArr.push(dataObj);
          }
        })
      }
    }
    for (const key in this.goverParaNdata) {
      let dataObj = {}
      if (key == 'auditReprtDate') {
        this.goverParaNdata[key].yearData.forEach((el) => {
          if (el?.date != '' && el?.date != null && el?.date != undefined) {
            dataObj = {
              "ulb": this.ulbId,
              "year": el?.year,
              "type": el?.type,
              "date": el.date,
              "status": el?.status ? el?.status : 'PENDING', /* PENDING,APPROVED,REJECTED    */
              "typeofdata": 'Number',
              key: el?.key,
              readonly: el?.readonly
            }
            goverParaNPostArray.push(dataObj);
          }
        })
      }
    }
    console.log({ goverParaNPostArray });
    console.log('expPostArr', expPostArr);
    console.log('revPostArr', revPostArr);
    this.fyDataArr = revPostArr.concat(expPostArr);
    this.fyDataArr = this.fyDataArr.concat(goverParaNPostArray);
    this.fyDataArr = this.fyDataArr.concat(annFyPostArr);
    console.log('whole', this.fyDataArr);


  }
  amountPushInFY(type, index, yItem, stItem) {
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
          break;
        case "NoOfProlisted":
          this.property_tax_register = yItem?.amount;
          break;
        case "fy_21_22_cash":
          this.fy_21_22_cash = yItem?.amount;
          break;
        case "fy_21_22_online":
          this.fy_21_22_online = yItem?.amount;
          break;
        case "NoOfProExemtfromPayProTax":
          this.paying_property_tax = yItem?.amount;
          break;
        case "NoOfProwhichProTaxPaid":
          this.paid_property_tax = yItem?.amount;
          break;
      }
    }


    console.log({ log: 'amountPushInFY', type, index, yItem, stItem, paying_property_tax: this.paying_property_tax });
  }
  backTohome() {
    this._router.navigateByUrl('../home')
  }

  getFullDataArray() {
    this.stePreDataArray = [
      {
        label: `Basic ULB Details`,
        key: 'basicDet',
        id: 's1',
        icon: '',
        text: '',
        value: {
          basicUlbDetails: {
            key: 'basicUlbDetails',
            label: '',
            yearData: [
              {
                label: 'Name of ULB',
                value: this.ulbName,
                status: 'PENDING'
              },
              {
                label: 'Population as per 2011 Census',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.population11?.value,
                status: 'PENDING'
              },
              {
                label: 'Population as on 1st April 2022',
                value: this.fiscalForm?.controls.basicUlbDetails?.controls?.populationFr?.value,
                // value: this.fiscalForm?.value?.basicUlbDetails?.populationFr,
                status: 'PENDING'
              },
              {
                label: 'ULB website URL link',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.webLink?.value,
                // value: this.fiscalForm?.value?.basicUlbDetails?.webLink,
                status: 'PENDING'
              },
              {
                label: 'Name of Commissioner / Executive Officer',
                // value: this.fiscalForm?.value?.basicUlbDetails?.nameCmsnr,
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.nameCmsnr?.value,
                status: 'PENDING'
              },
              {
                label: 'Does the ULB handle water supply services?',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.waterSupply?.value,
                status: 'PENDING'
              },
              {
                label: 'Does the ULB handle sanitation service delivery?',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.sanitationService?.value,
                status: 'PENDING'
              },
              {
                label: 'Does your Property Tax include Water Tax?',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.propertyWaterTax?.value,
                status: 'PENDING'
              },
              {
                label: 'Does your Property Tax include Sanitation/Sewerage Tax?',
                value: this.fiscalForm?.controls?.basicUlbDetails?.controls?.propertySanitationTax?.value,
                status: 'PENDING'
              },
            ]
          },
        },
      },
      {
        label: `Revenue Mobilization Parameters`,
        key: 'revenueMob',
        id: 's2',
        icon: '',
        text: '',
        value: this.revenueMob
      },
      {
        label: `Expenditure Performance Parameters`,
        key: 'expPerf',
        id: 's3',
        icon: '',
        text: '',
        value: this.expPerf
      },
      {
        label: `Fiscal Governance Parameters`,
        key: 'fisGov',
        id: 's4',
        icon: '',
        text: '',
        value: {
          "auditReprtDate": {
            label: 'Date of Audit Report for audited financial statements',
            key: 'auditReprtDate',
            yearData: this.goverParaNdata.auditReprtDate.yearData.map(year => ({ ...year, value: year.date ? year.date : 'N/A' }))
          },
          "normalData": {
            "key": "normalData",
            "label": "",
            "yearData": [{
              "label": "ULB website URL link where Copy of Audited Annual Accounts of FY 2019-20  to FY 2020-21 are available",
              "key": "webUrlAnnual",
              "value": this.goverParaNdata.normalData.yearData.webUrlAnnual.value,
            }, {
              "label": "Is the property tax register GIS-based?",
              "key": "registerGis",
              "value": this.goverParaNdata.normalData.yearData.registerGis.value ? this.goverParaNdata.normalData.yearData.registerGis.value : 'N/A',
            }, {
              "label": "Do you use accounting software?",
              "key": "accountStwre",
              "value": this.goverParaNdata.normalData.yearData.accountStwre.value ? this.goverParaNdata.normalData.yearData.accountStwre.value : 'N/A',
            }]
          },
          ownRevDetails: {
            key: 'ownRevDetails',
            label: 'Own Revenue Details',
            yearData: [
              {
                label: 'Total Own Revenue Arrears as on 31st March 2020',
                key: 'totalOwnRevenArr_20',
                amount: this.totalOwnRevenueArea,
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
                amount: this.property_tax_register,
              },
              {
                label: 'Number of Properties exemt from paying Property Tax',
                key: 'NoOfProExemtfromPayProTax',
                amount: this.paying_property_tax,
              },
              {
                label: 'Number of Properties for which Property Tax has been paid',
                key: 'NoOfProwhichProTaxPaid',
                amount: this.paid_property_tax,
              },
            ]
          },
        },
      },
      {
        label: `Upload Financial Documents`,
        key: 'upFy',
        id: 's5',
        icon: '',
        text: '',
        value: this.uploadFyDoc
      },
      {
        label: `Contact Information`,
        key: 'conInfo',
        id: 's6',
        icon: '',
        text: '',
        value: {
          contactInfo: {
            key: 'contactInfo',
            label: '',
            yearData: [
              {
                label: 'Name of the Nodal Officer',
                // value: this.fiscalForm?.value?.contactInfo?.designationOftNodalOfficer,
                value: this.fiscalForm?.controls?.contactInfo?.controls?.designationOftNodalOfficer?.value,
                status: 'PENDING'
              },
              {
                label: 'Designation of the Nodal Officer',
                //value: this.fiscalForm?.value?.contactInfo?.nameOfNodalOfficer,
                value: this.fiscalForm?.controls?.contactInfo?.controls?.nameOfNodalOfficer?.value,
                status: 'PENDING'
              },
              {
                label: 'Email ID',
                value: this.fiscalForm?.controls?.contactInfo?.controls?.email?.value,
                // value: this.fiscalForm?.value?.contactInfo?.email,
                status: 'PENDING'
              },
              {
                label: 'Mobile number',
                value: this.fiscalForm?.controls?.contactInfo?.controls?.mobile?.value,
                // value: this.fiscalForm?.value?.contactInfo?.mobile,
                status: 'PENDING'
              }
            ]
          },
        },
      },
      // {
      //   label: `Self Declaration`,
      //   key: 'selDec',
      //   id: 's7',
      //   icon: '',
      //   text: '',
      //   value: {
      //     "signedCopyOfFile": {
      //       lebel: '',
      //       key: 'signedCopyOfFile',
      //       yearData: [
      //        {
      //         lebel: 'Signed Copy Of File',
      //         "name": this.signedFileName,
      //         "url": this.signedFileUrl,
      //          status: 'PENDING'
      //        }
      //       ]
      //     },
      //   }
      // },

    ];

  }
  onPreview() {
    this.isDraft = true;
    this.updateValueInForm();
    this.getFullDataArray();
    // let formdata = {
    //   ...this.fiscalForm?.value?.basicUlbDetails,
    //   ...this.fiscalForm?.value?.contactInfo,
    //   revMob: this.revenueMob,
    //   expPer: this.expPerf,
    //   fisGov: this.goverPar,
    //   upldDoc: this.uploadFyDoc,
    //   nrmlData: this.goverParaNdata,
    //   "signedCopyOfFile": {
    //     "name": this.signedFileName,
    //     "url": this.signedFileUrl
    //   },
    //   "webUrlAnnual": this.goverParaNdata?.normalData?.yearData?.webUrlAnnual?.value,
    //   "digitalRegtr": this.goverParaNdata?.normalData?.yearData?.digitalRegtr?.value,
    //   "registerGis": this.goverParaNdata?.normalData?.yearData?.registerGis?.value,
    //   "accountStwre": this.goverParaNdata?.normalData?.yearData?.accountStwre?.value,
    //   "totalOwnRevenueArea": 123546,
    //   "fy_19_20_cash": {
    //     "type": "Cash",
    //     "amount": 10000
    //   },
    //   "fy_19_20_online": {
    //     "type": "UPI",
    //     "amount": 99999
    //   },
    // };
    const dialogRef = this.dialog.open(UlbFisPreviewComponent, {
      data: {
        showData: this.stePreDataArray,
        preData: this.postData
      },
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
  checkValidation() {
    this.fiscalForm.markAllAsTouched();
    this.errorPageIndex = null;
    if (this.fiscalForm.controls.basicUlbDetails.status == 'INVALID') {
      if (this.errorPageIndex == null) this.errorPageIndex = 0;
    }

    if (this.fiscalForm.controls.contactInfo.status == 'INVALID') {
      if (this.errorPageIndex == null) this.errorPageIndex = 1;
    }
    for (const key in this.revenueMob) {
      console.log('keyyyyyyyy', key);
      if (!this.canShowFormSection(key)) continue;
      this.revenueMob[key].yearData.forEach((el) => {
        if (Object.keys(el).length > 0) {
          if (el?.amount === '' || el?.amount === null || el?.amount === undefined) {
            el['error'] = true;
            if (this.errorPageIndex == null) this.errorPageIndex = 2;
          } else {
            el['error'] = false
          }
        }
      })
    }
    for (const key in this.expPerf) {
      this.expPerf[key].yearData.forEach((el) => {
        if (Object.keys(el).length > 0) {
          if (el?.amount === '' || el?.amount === null || el?.amount === undefined) {
            el['error'] = true;
            if (this.errorPageIndex == null) this.errorPageIndex = 3;
          } else {
            el['error'] = false
          }
        }
      })
    }

    for (const key in this.goverParaNdata) {
      const tabErrorIndex = 4;

      if (key == 'normalData') {
        if (!this.goverParaNdata[key].yearData.webUrlAnnual.value) {
          this.goverParaNdata[key].yearData.webUrlAnnual['error'] = true;
          if (this.errorPageIndex == null) this.errorPageIndex = tabErrorIndex;
        } else {
          this.goverParaNdata[key].yearData.webUrlAnnual['error'] = false;
        }
        if (!this.goverParaNdata[key].yearData.accountStwre.value) {
          this.goverParaNdata[key].yearData.accountStwre['error'] = true;
          if (this.errorPageIndex == null) this.errorPageIndex = tabErrorIndex;
        } else {
          this.goverParaNdata[key].yearData.accountStwre['error'] = false;
        }
        if (!this.goverParaNdata[key].yearData.registerGis.value) {
          this.goverParaNdata[key].yearData.registerGis['error'] = true;
          if (this.errorPageIndex == null) this.errorPageIndex = tabErrorIndex;
        } else {
          this.goverParaNdata[key].yearData.registerGis['error'] = false;
        }
      } else {
        this.goverParaNdata[key].yearData.forEach((el) => {
          if (Object.keys(el).length > 0) {
            if (key == 'auditReprtDate') {
              if ((el?.date === '' || el?.date === null || el?.date === undefined)) {
                el['error'] = true;
                if (this.errorPageIndex == null) this.errorPageIndex = tabErrorIndex;
              } else {
                el['error'] = false;
              }
            } else {
              if ((el?.amount === '' || el?.amount === null || el?.amount === undefined)) {
                el['error'] = true;
                if (this.errorPageIndex == null) this.errorPageIndex = tabErrorIndex;
              } else {
                el['error'] = false;
              }
            }
          }
        })
      }
    }
    for (const key in this.goverPar) {
      this.goverPar[key].yearData.forEach((el) => {
        if (Object.keys(el).length > 0) {
          if (el?.amount === '' || el?.amount === null || el?.amount === undefined) {
            el['error'] = true;
            if (this.errorPageIndex == null) this.errorPageIndex = 5;
          } else {
            el['error'] = false;
          }
        }
      })
      for (const key in this.uploadFyDoc) {
        if (key != 'guidanceNotes') {
          this.uploadFyDoc[key].yearData.forEach((el) => {
            if (el?.readonly == false) {
              // if (el?.file?.url == '' || el?.file?.url == null) {
              if (el?.file?.url === '' || el?.file?.url === null || el?.file?.url === undefined) {
                el['error'] = true;
                if (this.errorPageIndex == null) this.errorPageIndex = 5;
              } else {
                el['error'] = false;
              }
              // }
            } else {
              el['error'] = false;
            }

          })
        }

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
  finalSubmit() {
    console.log({ Ndata: this.goverParaNdata });
    if (this.fiscalForm.status != "INVALID" && this.formError) {
      console.log('post body', this.postData);
      this.fiscalService.postFiscalRankingData(this.postData).subscribe((res) => {
        console.log('post res', res);
        // swal('Saved', "Data save as draft successfully!", 'success')
        this.formSubmitted = true;
        this.isDisabled = true;
        sessionStorage.setItem("changeInFR", "false");
      },
        (error) => {
          console.log('post error', error);

        }
      )
    }
  }

  finalSubmitAlert() {
    this.isDraft = false;
    this.formError = true;
    this.updateValueInForm();
    this.checkValidation();

    console.log(this.errorPageIndex, this.revenueMob);


    if (this.postData.signedCopyOfFile.url == null || this.postData.signedCopyOfFile.url == '') {
      swal('Error', "Please upload a signed copy of this form", 'error');
      return
    }
    if (this.fiscalForm.status != "INVALID" && this.formError) {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
       it will become uneditable and will be sent to MoHUA for Review.
        Alternatively, you can save as draft for now and submit it later.`,
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
            this.finalSubmit();
            break;
          case "draft":
            this.isDraft = true;
            this.updateValueInForm();
            this.saveFormAsDraft();
            break;
          case "cancel":
            break;
        }
      })

    } else {
      swal("Missing Data !", `${this.errorMsg}`, "error").then(() => {
        console.log({ erroIndex: this.errorPageIndex });
        this.stepper.selectedIndex = this.errorPageIndex;
      });
    }
  }
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
    sessionStorage.setItem("changeInFR", "true");
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;

    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();

    // console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;

      console.log("hi", data);
    });
  }
  clearFile(type, yrItem, stpItem) {
    yrItem.file.url = '';
    yrItem.file.name = '';
    sessionStorage.setItem("changeInFR", "true");
  }

  navigationCheck() {
    // if (!this.clickedSave) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertError =
          "You have some unsaved changes on this page. Do you wish to save your data as draft?";
        const changeInFr = sessionStorage.getItem("changeInFR");
        if (event.url === "/" || event.url === "rankings/login") {
          sessionStorage.setItem("changeInFR", "false");
          return;
        }
        if (changeInFr === "true" && this.routerNavigate === null) {
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, {
            skipLocationChange: true,
          });
          this.routerNavigate = event;
          this.dialog.closeAll();
          this.openDialog(this.template);
        }
      }
    });
    // }
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
  }
  async stay() {
    // await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.isDraft = true;
      this.updateValueInForm();
      this.saveFormAsDraft()
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    // await this.formSave("draft");
    //return this._router.navigate(["ulbform2223/slbs"]);
  }
  saveFormAsDraft() {
    this.fiscalService.postFiscalRankingData(this.postData).subscribe((res) => {
      console.log('post res', res);
      swal('Saved', "Data save as draft successfully!", 'success');
      sessionStorage.setItem("changeInFR", "false");
    },
      (error) => {
        console.log('post error', error)
      }
    )
  }
  async discard() {
    sessionStorage.setItem("changeInFR", "false");
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  canShowFormSection(formKey: string, year?: string) {
    if (formKey === 'totalRcptWaterSupply' && this.fiscalForm?.controls?.basicUlbDetails?.controls?.waterSupply?.value != 'Yes') return false;
    if (formKey === 'totalRcptSanitation' && this.fiscalForm?.controls?.basicUlbDetails?.controls?.sanitationService?.value != 'Yes') return false;

    return true;
  }
}
