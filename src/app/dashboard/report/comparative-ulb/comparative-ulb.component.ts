import { Component, OnInit } from '@angular/core';
import { IReportType } from 'src/app/models/reportType';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';

import { ExcelService } from '../excel.service';
import { ReportHelperService } from '../report-helper.service';
import { ReportService } from '../report.service';

@Component({
  selector: "app-comparative-ulb",
  templateUrl: "./comparative-ulb.component.html",
  styleUrls: ["./comparative-ulb.component.scss"]
})
export class ComparativeUlbComponent implements OnInit {
  report: any = [];
  reportReq: IReportType;
  years: any = [];

  isProcessed = false;
  response: any = {};
  reportKeys: any = [];
  reqUlb: string;
  reqUlb2: string;
  reqYear: string;
  headerGroup = {
    yearColspan: 2,
    accRowspan: 2
  };

  constructor(
    private reportService: ReportService,
    private excelService: ExcelService,
    private reportHelper: ReportHelperService,
    private _loaderService: GlobalLoaderService
  ) {
    console.log(`instantiating comparitivve`);
  }

  ngOnInit() {
    // this.reportReq = this.reportService.getReportRequest();
    this.reportService.getNewReportRequest().subscribe(reportCriteria => {
      this._loaderService.showLoader();
      this.reportReq = reportCriteria;
      this.reportService.reportResponse.subscribe(
        res => {
          console.log(res);
          this._loaderService.stopLoader();
          if (res) {
            this.years = [];
            this.response = res;
            // this.reportReq = this.reportService.getReportRequest();

            if (this.reportReq.reportGroup == "Balance Sheet") {
              this.report = this.reportHelper.getBSReportLookup();
            } else {
              this.report = this.reportHelper.getIEReportLookup();
            }
            // this.reqUlb = this.reportReq.ulbList[0].code;
            // this.reqUlb2 = this.reportReq.ulbList[1].code;
            this.reqYear = this.reportReq.years[0];
            if (this.reportReq.ulbList.length > 1) {
              this.years = [];
              this.transformYears_UlbVSUlb();
            } else {
              this.years = [];
              this.transformYears_YrVSYr();
            }
            this.transformResult(res);
            this.headerGroup.yearColspan =
              this.years.length / this.reportReq.years.length;
          } else {
            this.isProcessed = true;
            this.reportKeys = [];
          }
          this._loaderService.stopLoader();

          // console.log(`at the end `, { ...this.report });
          console.log({ report: this.report });
          console.log({ years: this.years });
          console.log({ keys: this.reportKeys });
          this.setDataNotAvailable();
          console.log(`after set data to not available`, {
            report: this.report
          });
        },
        () => {
          this._loaderService.stopLoader();
        }
      );
    });
  }

  // { "code": 110, "head_of_account": "Revenue", "line_item": "Tax Revenue", "CG004_2015-16": 85497781, "CG004_2016-17": 109442436, "CG005_2015-16": 1015636583, "CG005_2016-17": 1788137186, "CG004_2015-16_2016-17": "28.01", "CG005_2015-16_2016-17": "76.06" }
  transformYears_YrVSYr() {
    // this.years.push({title: this.reportReq.ulbList[0].code, caption: this.reportReq.ulbList[0].name, isComparative: false });
    // this.years.push({title: this.reportReq.ulbList[1].code, caption: this.reportReq.ulbList[1].name, isComparative: false });
    // this.years.push({title: 'difference', caption: '%', isComparative: true });

    for (let i = 0; i < this.reportReq.ulbList.length; i++) {
      const ulb = this.reportReq.ulbList[i];
      // if(this.report[item.code] && item.ulb_code && item.budget.length > 0){
      for (let j = 0; j < this.reportReq.years.length; j++) {
        const key = ulb.code + "_" + this.reportReq.years[j];
        this.years.push({
          title: key,
          caption: ulb.name,
          state: ulb.state,
          isComparative: false
        });

        if (j > 0 && this.reportReq.isComparative) {
          const comparativeKey =
            ulb.code +
            "_" +
            this.reportReq.years[j - 1] +
            "_" +
            this.reportReq.years[j];
          this.years.push({
            title: comparativeKey,
            caption: "%",
            state: "Comparision",
            isComparative: true
          });
        }
      }
    }
  }

  transformYears_UlbVSUlb() {
    for (let i = 0; i < this.reportReq.years.length; i++) {
      const year = this.reportReq.years[i];
      for (let j = 0; j < this.reportReq.ulbList.length; j++) {
        const ulb1 = this.reportReq.ulbList[0];
        const ulb2 = this.reportReq.ulbList[j];
        // if(this.report[item.code] && item.ulb_code && item.budget.length > 0){
        const key = ulb2.code + "_" + year;
        this.years.push({
          title: key,
          caption: ulb2.name,
          state: ulb2.state,
          isComparative: false
        });

        if (j > 0 && this.reportReq.isComparative) {
          const comparativeKey = ulb1.code + "_" + ulb2.code + "_" + year;
          this.years.push({
            title: comparativeKey,
            caption: "%",
            state: "Comparision",
            isComparative: true
          });
        }
      }
      // }
    }
  }

  /**
   *
   * @param result
   *
   * @output
   */
  transformResult(result) {
    // Sample response format from server
    // [ {"ulb_code":"CG001","head_of_account":"Revenue","code":110,"groupCode":null,"line_item":"Tax Revenue","budget":[{"year":"2015-16","amount":30465128}]}, ...]

    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      if (this.report[item.code] && item.ulb_code && item.budget.length > 0) {
        for (let j = 0; j < item.budget.length; j++) {
          const key = item.ulb_code + "_" + item.budget[j].year;
          if (
            this.report[item.code][key] === undefined ||
            this.report[item.code][key] === null
          ) {
            this.report[item.code][key] = item.budget[j].amount;
          }
        }
      }
    }

    // this.transformToReportFormat(this.report);
    this.populateCalcFields(this.report, this.years);
  }

  /**
   *
   * @param result
   * @param years
   */
  populateCalcFields(result, years) {
    let calcFields = [];
    if (
      this.reportReq.reportGroup == "Balance Sheet" &&
      this.reportReq.type.indexOf("Summary") > -1
    ) {
      // BS Summary
      this.reportKeys = this.reportHelper.getBSSummaryReportMasterKeys();
      calcFields = this.reportHelper.getBSSummaryCalcFields();
    } else if (this.reportReq.reportGroup == "Balance Sheet") {
      // BS Detailed
      this.reportKeys = this.reportHelper.getBSReportMasterKeys();
      calcFields = this.reportHelper.getBSCalcFields();
    } else if (this.reportReq.type.indexOf("Summary") > -1) {
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
      result[keyName] = { line_item: calcFields[i].title, isBold: true };
      if (calcFields[i].code) {
        result[keyName]["code"] = calcFields[i].code;
        result[keyName].isBold = false;
      }
      if (calcFields[i].isCalc) {
        for (let j = 0; j < years.length; j++) {
          let sum = 0;

          // if(years[j].isComparative){

          //   // const ulbN1 = years[j-2].title;
          //   // const ulbN2 = years[j-1].title;

          //   // const ulbN1 = this.reportReq.years[j-2];
          //   // const ulbN2 = this.reportReq.years[j-1];

          //   // const keyCode = this.report[keyName]['code'] + '_' + this.reportReq.years[j-2] + '_' + this.reportReq.years[j-1];
          //   const keyCode = years[j-2].title+ '_' + this.reportReq.years[j-1];

          //   console.log('****keyCode : ' + keyCode);
          //   this.report[keyName][keyCode] = this.calculateDiff(this.report[keyName][years[j-2].title], this.report[keyName][years[j-1].title]);

          //   console.log('****this.report[keyName] : ' + this.report[keyName]);

          //   continue;
          // }
          const addFields = calcFields[i].addFields;
          const subtractFields = calcFields[i].subtractFields;

          /** loop through each result line item and add values for specific year */
          if (addFields) {
            for (let k = 0; k < addFields.length; k++) {
              if (
                result[addFields[k]] &&
                result[addFields[k]][years[j]["title"]]
              ) {
                // if amount available for specified year then add them
                sum = sum + parseFloat(result[addFields[k]][years[j]["title"]]);
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
            if (
              result[subtractFields[0]] &&
              result[subtractFields[0]][years[j]["title"]]
            ) {
              sum = sum - result[subtractFields[0]][years[j]["title"]];
            }
          }
          result[keyName][years[j]["title"]] = sum;
        }
      }
    }

    if (this.reportReq.ulbList.length > 1) {
      this.transformToReportFormat_UlbVSUlb(this.report);
    } else {
      this.transformToReportFormat_YrVSYr(this.report);
    }

    // this.isProcessed = true;
  }

  setDataNotAvailable() {
    this.years.forEach(year => {
      if (year.caption === "%") {
        return;
      }

      const canSetDataNotAvaliable = this.reportKeys.every(
        key => !this.report[key][year.title]
      );
      if (canSetDataNotAvaliable) {
        this.reportKeys.forEach(key => {
          const original = { ...this.report[key] };
          original[year.title] = null;
          if (!original["allNullYear"]) {
            original["allNullYear"] = { [year.title]: true };
          } else {
            original["allNullYear"][year.title] = true;
          }
          this.report[key] = { ...original };
        });
      }
    });
  }

  canSetDataNotAvailable(years) {}

  /** Comparision will be done between years of each ULB
   * Expectation:
   *    1. atleast 1 ulb
   *    2. atleast 2 years
   * @param result
   *
   * @output
   */
  transformToReportFormat_UlbVSUlb(result: any[]) {
    if (!result) {
      return false;
    }

    const resultKeys = Object.keys(result);
    for (let i = 0; i < resultKeys.length; i++) {
      if (["Debt", "Tax"].indexOf(result[resultKeys[i]].head_of_account) > -1) {
        // ignore Debt and Tax account types
        continue;
      }

      const item = result[resultKeys[i]];

      for (let j = 1; j < this.reportReq.ulbList.length; j++) {
        const ulb1 = this.reportReq.ulbList[0];
        const ulb2 = this.reportReq.ulbList[j];

        for (let k = 0; k < this.reportReq.years.length; k++) {
          const keyCode =
            ulb1.code + "_" + ulb2.code + "_" + this.reportReq.years[k];

          const ulbN1 = ulb1.code + "_" + this.reportReq.years[k];
          const ulbN2 = ulb2.code + "_" + this.reportReq.years[k];

          item[keyCode] = this.calculateDiff(item[ulbN1], item[ulbN2]);
        }
      }
    }

    // this.populateCalcFields(this.report, this.years);
    this.isProcessed = true;
  }

  /** Comparision will be done between years of each ULB
   * Expectation:
   *    1. atleast 1 ulb
   *    2. atleast 2 years
   * @param result
   *
   * @output
   */
  transformToReportFormat_YrVSYr(result: any[]) {
    if (!result) {
      return false;
    }

    const resultKeys = Object.keys(result);
    for (let i = 0; i < resultKeys.length; i++) {
      if (["Debt", "Tax"].indexOf(result[resultKeys[i]].head_of_account) > -1) {
        // ignore Debt and Tax account types
        continue;
      }

      const item = result[resultKeys[i]];

      for (let j = 0; j < this.reportReq.ulbList.length; j++) {
        const ulb = this.reportReq.ulbList[j];

        for (let k = 1; k < this.reportReq.years.length; k++) {
          const keyCode =
            ulb.code +
            "_" +
            this.reportReq.years[k - 1] +
            "_" +
            this.reportReq.years[k];

          const ulbN1 = ulb.code + "_" + this.reportReq.years[k - 1];
          const ulbN2 = ulb.code + "_" + this.reportReq.years[k];

          item[keyCode] = this.calculateDiff(item[ulbN1], item[ulbN2]);
        }
      }
    }

    // this.populateCalcFields(this.report, this.years);
    this.isProcessed = true;
  }

  calculateDiff(a: number, b: number) {
    if (a && b) {
      return (((b - a) / a) * 100).toFixed(2);
    } else {
      return 0;
    }
  }

  download() {
    const reportTable = document.querySelector("table").outerHTML;
    const title = this.reportReq.type + " " + this.reportReq.reportGroup;
    this.excelService.transformTableToExcelData(title, reportTable, "IE");

    this.reportService.addLogByToken("Income-Expenditure");
  }

  ngOnDestroy() {
    this._loaderService.stopLoader();
  }
}
