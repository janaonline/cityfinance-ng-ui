import { Component, OnInit } from '@angular/core';

import { ExcelService } from '../excel.service';
import { ReportHelperService } from '../report-helper.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  report: any = {};
  reportReq: any = {};
  years: any = [];

  links: any = {};
  isProcessed = false;

  reportKeys: any = [];

  constructor(
    private reportService: ReportService,
    private excelService: ExcelService,
    private reportHelper: ReportHelperService
  ) {
    console.log(`instantiating basic`);
  }

  ngOnInit() {
    this.reportReq = this.reportService.getReportRequest();

    this.reportService.reportResponse.subscribe(res => {
      if (res && res.length > 0) {
        this.reportReq = this.reportService.getReportRequest();
        this.years = [];
        this.transformYears();
        this.links = this.reportService.loadDefaultLinks();
        this.transformResult(res);
      } else {
        this.isProcessed = true;
        this.reportKeys = [];
      }

      // if(this.reportReq.reportGroup == 'Balance Sheet'){
      //   this.reportKeys = this.reportHelper.getBSReportMasterKeys();
      // }else {
      //   this.reportKeys = this.reportHelper.getIEReportMasterKeys();
      // }
    });
  }

  transformYears() {
    const arr = this.reportReq.years;
    for (let i = 0; i < arr.length; i++) {
      this.years.push({ title: arr[i], isComparative: false });
    }
  }

  // { "_id": "5c11811913568869f16fcf73", "ulb_code": "CG002", "head_of_account": "Revenue", "code": 110, "groupCode": null, "line_item": "Tax Revenue", "budget": [ { "year": "2015-16", "amount": 410345457 }, { "_id": "5c11812613568869f16fcfc0", "year": "2016-17", "amount": 401343956 } ] }

  transformResult(result) {
    if (!result) {
      return false;
    }
    this.report = {};

    for (let i = 0; i < result.length; i++) {
      if (['Debt', 'Tax'].indexOf(result[i].head_of_account) > -1) {
        // ignore Debt and Tax account types
        continue;
      }

      const keyCode = result[i].code;
      this.report[keyCode] = {
        code: result[i].code,
        line_item: result[i].line_item,
        head_of_account: result[i].head_of_account
      };

      // converting budget array to object key value pair
      const budgets = result[i]['budget'];
      for (let j = 0; j < budgets.length; j++) {
        this.report[keyCode][budgets[j].year] = budgets[j].amount;
      }
    }

    this.populateCalcFields(this.report, this.years);

    // if(this.reportReq.reportGroup == 'Balance Sheet'){
    //   this.generateBSCalculationFields();
    // }else if(this.reportReq.type && this.reportReq.type=='Summary' ){
    //   this.transformToSummary();
    // }
  }

  populateCalcFields(result, years) {
    let calcFields = [];

    if (
      this.reportReq.reportGroup == 'Balance Sheet' &&
      this.reportReq.type == 'Summary'
    ) {
      // BS Summary
      this.reportKeys = this.reportHelper.getBSSummaryReportMasterKeys();
      calcFields = this.reportHelper.getBSSummaryCalcFields();
    } else if (this.reportReq.reportGroup == 'Balance Sheet') {
      // BS Detailed
      this.reportKeys = this.reportHelper.getBSReportMasterKeys();
      calcFields = this.reportHelper.getBSCalcFields();
    } else if (this.reportReq.type == 'Summary') {
      // IE Summary
      this.reportKeys = this.reportHelper.getIESummaryMasterKeys();
      calcFields = this.reportHelper.getIESummaryCalcFields();
    } else {
      // IE Detailed
      this.reportKeys = this.reportHelper.getIEReportMasterKeys();

      calcFields = this.reportHelper.getIECalcFields();
    }

    for (let i = 0; i < calcFields.length; i++) {
      const keyName = calcFields[i].keyName;
      // console.log({ keyName });
      result[keyName] = { line_item: calcFields[i].title, isBold: true };
      if (calcFields[i].code) {
        result[keyName]['code'] = calcFields[i].code;
        result[keyName].isBold = false;
      }
      if (calcFields[i].isCalc) {
        for (let j = 0; j < years.length; j++) {
          let sum = 0;
          const addFields = calcFields[i].addFields;
          const subtractFields = calcFields[i].subtractFields;
          // console.log({ addFields });
          /** loop through each result line item and add values for specific year */
          if (addFields) {
            for (let k = 0; k < addFields.length; k++) {
              if (
                result[addFields[k]] &&
                result[addFields[k]][years[j]['title']]
              ) {
                // if amount available for specified year then add them
                sum = sum + result[addFields[k]][years[j]['title']];
              }

              if (
                calcFields[i].delFields &&
                calcFields[i].delFields.indexOf(result[addFields[k]]) > -1
              ) {
                // if the line item comes under delete fields then delete them
                delete result[addFields[k]];
              }
            }
          }

          if (subtractFields && subtractFields.length > 0) {
            for (let x = 0; x < subtractFields.length; x++) {
              // const element = array[x];
              if (
                result[subtractFields[x]] &&
                result[subtractFields[x]][years[j]['title']]
              ) {
                sum = sum - result[subtractFields[x]][years[j]['title']];
              }
            }
          }

          // if (keyName === "Others") {
          //   console.log(sum);
          // }
          result[keyName][years[j]['title']] = sum;
        }
      }
    }

    this.isProcessed = true;
  }

  download() {
    const reportTable = document.querySelector('table').outerHTML;
    const title = this.reportReq.type + ' ' + this.reportReq.reportGroup;
    this.excelService.transformTableToExcelData(title, reportTable, 'IE');

    this.reportService.addLogByToken('Income-Expenditure');
  }
}
