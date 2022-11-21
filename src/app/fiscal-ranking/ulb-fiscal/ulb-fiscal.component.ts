import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FiscalRankingService } from '../fiscal-ranking.service';

@Component({
  selector: 'app-ulb-fiscal',
  templateUrl: './ulb-fiscal.component.html',
  styleUrls: ['./ulb-fiscal.component.scss']
})
export class UlbFiscalComponent implements OnInit {

  constructor(private fb: FormBuilder, private fiscalService: FiscalRankingService) { }

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
  fiscalForm = this.fb.group({
    basicUlbDetails: this.fb.group({
      ulbName: ["", Validators.required],
      population11: [null, Validators.required],
      populationFr: [null, Validators.required],
      webLink: [null, Validators.required],
      nameCmsnr: [null, Validators.required],
    }),
    contactInfo: this.fb.group({
      nameOfNodalOfficer: ["", Validators.required],
      designationOftNodalOfficer: [null, Validators.required],
      mobile: [null, Validators.required],
      email: [null, Validators.required],
    }),
    revenueMob: this.fb.array([
      this.fb.group({
        totalRecActual: this.fb.array([

        ]),
        totalRecBudgetEst: this.fb.array([

        ]),
        totalOwnRevenues: this.fb.array([

        ]),
        totalPropTaxRevenue: this.fb.array([

        ]),

      }),

    ]),
    expPerf: this.fb.array([
      this.fb.group({
        totalGrossBlock: this.fb.array([

        ]),
        totalCWIP: this.fb.array([

        ]),
        estAdmExpenses: this.fb.array([

        ]),
        totalRevExp: this.fb.array([

        ]),

      }),

    ]),
    goverPar: this.fb.group({
      webUrlAnnual: ["", Validators.required],
      digitalRegtr: [null, Validators.required],
      registerGis: [null, Validators.required],
      accountStwre: [null, Validators.required],
      ownRevDetails: this.fb.group({
        totalOwnRevenArr_20: ["", Validators.required],
        fy_19_20_cash: [null, Validators.required],
        fy_19_20_online: [null, Validators.required],
      }),
      propertyDetails: this.fb.group({
        NoOfProlisted: ["", Validators.required],
        NoOfProExemtfromPayProTax: [null, Validators.required],
        NoOfProwhichProTaxPaid: [null, Validators.required],
      }),
    }),
    uploadFyDoc: this.fb.group({
      AppAnnualBudget: this.fb.group({
        budget_2017_18: [null, Validators.required],
        budget_2018_19: [null, Validators.required],
        budget_2019_20: [null, Validators.required],
      }),
      auditedAnnualFySt: this.fb.group({
        audited_2017_18: [null, Validators.required],
        audited_2018_19: [null, Validators.required],
        audited_2019_20: [null, Validators.required],
      })
    }),
    status: [""],
    rejectReason: '',
    isDraft: null
  });

  revenueMob = {
    totalRecActual: {
      key: 'totalRecActual',
      label: 'Total Receipts (Actual)',
      yearData: [
        {
          label: 'FY 2016-17',
          key: 'FY2016-17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: 'to be taken from approved Annual Budget of ',
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'FY2017-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: 'to be taken from approved Annual Budget of ',
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'FY2018-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'FY2019-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget `,
          placeHolder: ''
        }
      ]
    },
    totalRecBudgetEst: {
      key: 'totalRecBudgetEst',
      label: 'Total Receipts (Budget Estimate)',
      yearData: [
        {
          label: 'FY 2016-17',
          key: 'FY2016-17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'FY2017-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'FY2018-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'FY2019-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
    totalOwnRevenues: {
      key: 'totalOwnRevenues',
      label: 'Total Own Revenues ',
      yearData: [
        {
          label: 'FY 2016-17',
          key: 'FY2016-17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'FY2017-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'FY2018-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'FY2019-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
    totalPropTaxRevenue: {
      key: 'totalPropTaxRevenue',
      label: 'Total Property Tax Revenue ',
      yearData: [
        {
          label: 'FY 2016-17',
          key: 'FY2016-17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'FY2017-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'FY2018-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'FY2019-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
  };
  expPerf = {
    totalGrossBlock: {
      key: 'totalGrossBlock',
      label: 'Total Gross Block',
      yearData: [
        {
          label: 'As on 31st March 2017',
          key: 'totalGrossBlock_17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2018',
          key: 'totalGrossBlock_18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2019',
          key: 'totalGrossBlock_19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2020',
          key: 'totalGrossBlock_20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
    totalCWIP: {
      key: 'totalCWIP',
      label: 'Total Capital Work in Progress (CWIP)',
      yearData: [
        {
          label: 'As on 31st March 2017',
          key: 'totalCWIP_17',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2018',
          key: 'totalCWIP_18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2019',
          key: 'totalCWIP_19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'As on 31st March 2020',
          key: 'totalCWIP_20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
    estAdmExpenses: {
      key: 'estAdmExpenses',
      label: 'Establishment & Administrative Expenses',
      yearData: [
        {
          label: 'FY 2017-18',
          key: 'estAdmExpenses_17-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'estAdmExpenses_18-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'estAdmExpenses_19-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
    totalRevExp: {
      key: 'totalRevExp',
      label: 'Total Revenue Expenditure',
      yearData: [
        {
          label: 'FY 2017-18',
          key: 'totalRevExp_17-18',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'totalRevExp_18-19',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'totalRevExp_19-20',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `to be taken from approved Annual Budget of `,
          placeHolder: ''
        }
      ]
    },
  };
  uploadFyDoc = {
    guidanceNotes: {
      key: 'guidanceNotes',
      label: 'Guidance Notes:',
      yearData: [
        {
          title: '',
          pos: '1',
          desc: `Audited Annual Accounts should include: Income and Expenditure Statement, Balance Sheet, Schedules to IES and BS, and Auditor's Report.`
        },
        {
          title: '',
          pos: '2',
          desc: `Annual Budgets should be the detailed final approved version and should be in English language.`
        },
        {
          title: '',
          pos: '3',
          desc: `Files uploaded should be in PDF only and file size should not exceed 5MB.`
        }
      ]
    },
    appAnnualBudget: {
      key: 'appAnnualBudget',
      label: 'Copy of Detailed Approved Annual Budget of',
      yearData: [
        {
          label: 'FY 2017-18',
          key: 'appAnnualBudget_2017-18',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'appAnnualBudget_2018-19',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },
        {
          label: 'FY 2017-18',
          key: 'appAnnualBudget_2019-20',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },

      ]
    },
    auditedAnnualFySt: {
      key: 'auditedAnnualFySt',
      label: 'Copy of Detailed Audited Annual Accounts for',
      yearData: [
        {
          label: 'FY 2017-18',
          key: 'auditedAnnualFySt_2017-18',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },
        {
          label: 'FY 2018-19',
          key: 'auditedAnnualFySt_2018-19',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20',
          key: 'auditedAnnualFySt_2019-20',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: `Maximum Size  5MB (pdf files only)`,
          placeHolder: ''
        },

      ]
    },
  };
  goverPar = {
    normalData: {
      key: 'normalData',
      label: '',
      yearData: [
        {
          label: 'ULB website URL link where Copy of Audited Annual Accounts of FY 2017-18 to FY 2019-20 are available',
          key: 'webUrlAnnual',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'Do you maintain a Digital Property Tax Register?',
          key: 'digitalRegtr',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'Is the property tax register GIS-based?',
          key: 'registerGis',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'Do you use accounting software?',
          key: 'accountStwre',
          postion: '4',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        }
      ]
    },
    ownRevDetails: {
      key: 'ownRevDetails',
      label: 'Own Revenue Details',
      yearData: [
        {
          label: 'Total Own Revenue Arrears as on 31st March 2020',
          key: 'totalOwnRevenArr_20',
          postion: '1',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20 - by Cash/Cheque/DD',
          key: 'fy_19_20_cash',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'FY 2019-20 - by Online (UPI,Netbanking,Credit Card,Debit Card,others)',
          key: 'fy_19_20_online',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
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
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'Number of Properties exemt from paying Property Tax',
          key: 'NoOfProExemtfromPayProTax',
          postion: '2',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
        {
          label: 'Number of Properties for which Property Tax has been paid',
          key: 'NoOfProwhichProTaxPaid',
          postion: '3',
          value: '',
          min: '',
          max: '',
          required: true,
          type: '',
          bottomText: ``,
          placeHolder: ''
        },
      ]
    },
  }

  ngOnInit(): void {
    this.fiscalService.getfiscalUlbForm().subscribe((res) => {
      console.log('fiscal res', res);
      this.fiscalFormFeild = res;
      this.createForm();
    },
      (error) => {
        console.log(error);
      }
    )
  }
  createForm() {
    console.log('this form.....', this.fiscalForm);
    console.log('this form.....', this.fiscalForm.value);
    console.log('this form.....', JSON.stringify(this.fiscalForm.value))
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
    stepper.next();
  }

}
