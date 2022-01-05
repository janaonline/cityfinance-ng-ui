import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDetailedReportResponse } from '../../../app/models/detailedReport/detailedReportResponse';
import { ISummaryReport } from '../../../app/models/summaryReport/summaryReport';
import { environment } from '../../../environments/environment';
import { IReportType } from '../../models/reportType';
import { currencryConversionOptions, ICurrencryConversion } from './basic/conversionTypes';

@Injectable({
  providedIn: "root",
})
export class ReportService {
  public reportResponse: BehaviorSubject<
    | IDetailedReportResponse
    | IDetailedReportResponse["data"]
    | ISummaryReport["data"]
  > = new BehaviorSubject<
    | IDetailedReportResponse
    | IDetailedReportResponse["data"]
    | ISummaryReport["data"]
  >(null);

  reportRequestSubject = new BehaviorSubject<IReportType>(null);
  currencryConversionInUse: ICurrencryConversion =
    currencryConversionOptions[0];

  constructor(private http: HttpClient) {}

  getNewReportRequest() {
    return this.reportRequestSubject;
  }

  setReportRequest(criteria: IReportType) {
    this.reportRequestSubject.next(criteria);
  }

  ieDetailed(criteria: IReportType) {
    this.setReportRequest(criteria);

    return this.http.post<IDetailedReportResponse>(
      environment.api.url + "ledger/getIE",
      criteria
    );
    // .subscribe((res) => {
    //   if (res["success"]) {
    //     if (res["data2"]) {
    //       this.reportResponse.next(res);
    //     } else {
    //       this.reportResponse.next(res["data"]);
    //     }
    //   } else {
    //     alert("Year and ULB selection is mandatory");
    //   }
    // });
  }

  getFinancialYearBasedOnData() {
    return this.http
      .get(`${environment.api.url}dynamic-financial-year`)
      .pipe(
        map((res) => ({ ...res, data: this.sortFinancialYears(res["data"]) }))
      );
  }

  /**
   * @description Sort the Financial Years only.
   *
   * @example
   * list = ["2015-16", "2014-15", "2018-19"]
   * sorted = ["2014-15", "2015-16", "2018-19"]
   */
  private sortFinancialYears(years: string[]) {
    return years.sort(
      (yearA, yearB) => +yearA.split("-")[0] - +yearB.split("-")[0]
    );
  }

  BSDetailed(criteria: IReportType) {
    this.setReportRequest(criteria);

    this.http
      .post<ISummaryReport>(environment.api.url + "ledger/getBS", criteria)
      .subscribe((res) => {
        if (res["success"]) {
          if (res["data2"]) {
            localStorage.setItem("ulbData2", JSON.stringify(res["data2"]));
          }
          this.reportResponse.next(res["data"]);
        } else {
          alert("Year and ULB selection is mandatory");
        }
      });
  }

  getAggregate(criteria: IReportType) {
    this.setReportRequest(criteria);

    this.http
      .post(environment.api.url + "ledger/getAggregate", criteria)
      .subscribe((res) => {
        if (res["success"]) {
          if (res["data2"]) {
            localStorage.setItem("ulbData2", JSON.stringify(res["data2"]));
          }
          this.reportResponse.next(res["data"]);
        } else {
          alert("Failed");
        }
      });
  }

  addLogByToken(page) {
    this.http
      .post(environment.api.url + "download-log", { particular: page })
      .subscribe((res) => {
        if (res["success"]) {
          console.log("logged successfully");
        } else {
          console.log("failed to log");
        }
      });
  }

  getSingleSelectDropdownSetting(idField, textField) {
    return {
      singleSelection: true,
      idField: idField,
      textField: textField,
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      limitSelection: 1,
      allowSearchFilter: true,
      groupBy: "state",
    };
  }

  getMultiSelectDropdownSetting(
    idField: string,
    textField: string,
    caption: string
  ) {
    return {
      singleSelection: false,
      text: caption,
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: false,
      limitSelection: 4,
      badgeShowLimit: 1,
      classes: "myclass custom-class",
    };
  }

  loadDefaultLinks() {
    return {
      "120-150": {
        index: -1,
        title: "Non-Tax Revenue",
        minVal: 120,
        maxVal: 150,
        equals: 0,
      },
      "170-180": {
        index: -1,
        title: "Other Income",
        minVal: 170,
        maxVal: 180,
        equals: 0,
      },
      "250, 270-290": {
        index: -1,
        title: "Other Expenses",
        minVal: 270,
        maxVal: 290,
        equals: 250,
      },

      "310-312": {
        index: -1,
        title: "Reserves & Surplus",
        minVal: 310,
        maxVal: 312,
      },
      "330-331": { index: -1, title: "Loans", minVal: 330, maxVal: 331 },
      "340-360": {
        index: -1,
        title: "Current Liabilities and Provisions",
        minVal: 340,
        maxVal: 360,
      },
      "410-412": { index: -1, title: "Fixed Assets", minVal: 410, maxVal: 412 },
      "420-421": { index: -1, title: "Investments", minVal: 420, maxVal: 421 },
      "430-461": {
        index: -1,
        title: "Current Assets, Loans and Advances",
        minVal: 430,
        maxVal: 461,
      },
      "470-480": { index: -1, title: "Other Assets", minVal: 470, maxVal: 480 },
    };
  }
}
