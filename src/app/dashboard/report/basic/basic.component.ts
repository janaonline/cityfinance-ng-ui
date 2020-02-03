import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalLoaderService } from 'src/app/shared/services/loaders/global-loader.service';

import { ExcelService } from '../excel.service';
import { ReportHelperService } from '../report-helper.service';
import { ReportService } from '../report.service';
import { currencryConversionOptions, currencryConversionType, ICurrencryConversion } from './conversionTypes';

@Component({
  selector: "app-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.scss"]
})
export class BasicComponent implements OnInit, OnDestroy {
  report: any = {};
  reportReq: any = {};
  years: { title: string; isComparative: boolean }[] = [];

  links: any = {};
  isProcessed = false;

  reportKeys: string[] = [];

  currencyConversionList = currencryConversionOptions;

  conversionDropdownConfig = {
    primaryKey: "type",
    singleSelection: true,
    text: "Select conversion",
    enableSearchFilter: false,
    badgeShowLimit: 1,
    labelKey: "name",
    showCheckbox: true,
    classes: "noCrossSymbol"
  };

  currenyConversionForm: FormGroup;

  currencyTypeInUser: currencryConversionType = this.reportService
    .currencryConversionInUse.type;

  constructor(
    private reportService: ReportService,
    private excelService: ExcelService,
    private reportHelper: ReportHelperService,
    private loaderService: GlobalLoaderService,
    private _formBuilder: FormBuilder
  ) {
    this.initializeCurrencyConversion();
    this.initializeForm();
  }

  private initializeCurrencyConversion() {
    this.currencyTypeInUser = this.reportService.currencryConversionInUse.type;
  }

  private initializeForm() {
    this.currenyConversionForm = this._formBuilder.group({
      type: [[this.reportService.currencryConversionInUse]]
    });
  }

  ngOnInit() {
    this.reportService.getNewReportRequest().subscribe(reportCriteria => {
      this.loaderService.showLoader();

      this.reportReq = reportCriteria;
      this.reportService.reportResponse.subscribe(
        res => {
          this.loaderService.showLoader();

          if (res && (res as any[]).length > 0) {
            this.years = [];
            this.transformYears();
            this.links = this.reportService.loadDefaultLinks();
            this.transformResult(res);
          } else if (!res) {
            this.isProcessed = false;
          } else {
            this.isProcessed = true;
            this.reportKeys = [];
          }

          this.loaderService.stopLoader();
          this.setDataNotAvailable();
        },
        err => {
          this.loaderService.stopLoader();
          console.error(err);
        }
      );
    });
  }

  /**
   *
   * IMPORTANT
   * you may be wondering why here we are manually setting value on currenyConversionForm on null value?
   * It is so because currently, angular multi-select dropdown does not provide any option
   * to limit the minimum selection to 1. User can deselect all the values. But we have to provide
   * a way to keep 1 value selected. This can be achieved by setting the value
   * of the form control linked to it. Thus, we are doing so.
   */
  onSelectingConversionType(type: ICurrencryConversion | null) {
    if (!type) {
      this.currenyConversionForm.controls["type"].setValue([
        this.reportService.currencryConversionInUse
      ]);
      return;
    }
    this.reportService.currencryConversionInUse = type;
    this.currencyTypeInUser = type.type;
  }

  setDataNotAvailable() {
    this.years.forEach(year => {
      if (year["caption"] === "%") {
        return;
      }

      const canSetDataNotAvaliable = this.reportKeys.every(
        key => !this.report[key] || !this.report[key][year.title]
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
      if (["Debt", "Tax"].indexOf(result[i].head_of_account) > -1) {
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
      const budgets = result[i]["budget"];
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
      this.reportReq.reportGroup == "Balance Sheet" &&
      this.reportReq.type == "Summary"
    ) {
      // BS Summary
      this.reportKeys = this.reportHelper.getBSSummaryReportMasterKeys();
      calcFields = this.reportHelper.getBSSummaryCalcFields();
    } else if (this.reportReq.reportGroup == "Balance Sheet") {
      // BS Detailed
      this.reportKeys = this.reportHelper.getBSReportMasterKeys();
      calcFields = this.reportHelper.getBSCalcFields();
    } else if (this.reportReq.type == "Summary") {
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
                sum = sum + result[addFields[k]][years[j]["title"]];
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
                result[subtractFields[x]][years[j]["title"]]
              ) {
                sum = sum - result[subtractFields[x]][years[j]["title"]];
              }
            }
          }

          // if (keyName === "Others") {
          // }
          result[keyName][years[j]["title"]] = sum;
        }
      }
    }

    this.isProcessed = true;
  }

  download() {
    const reportTable = document.querySelector("table").outerHTML;
    const title = this.reportReq.type + " " + this.reportReq.reportGroup;
    let currencyConversionName =
      this.currenyConversionForm.value.type &&
      this.currenyConversionForm.value.type[0] &&
      this.currenyConversionForm.value.type[0].type
        ? this.currenyConversionForm.value.type[0].name
        : null;
    if (currencyConversionName) {
      currencyConversionName = document.getElementById("currencyWarning")
        .textContent;
    }
    this.excelService.transformTableToExcelData(title, reportTable, "IE", {
      currencyConversionName
    });

    this.reportService.addLogByToken("Income-Expenditure");
  }

  ngOnDestroy() {
    this.loaderService.stopLoader();
  }
}
