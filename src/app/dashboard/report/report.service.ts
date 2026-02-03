import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDetailedReportResponse } from '../../../app/models/detailedReport/detailedReportResponse';
import { ISummaryReport } from '../../../app/models/summaryReport/summaryReport';
import { environment } from '../../../environments/environment';
import { IReportType } from '../../models/reportType';
import { currencryConversionOptions, ICurrencryConversion } from './basic/conversionTypes';
import { GlobalLoaderService } from "../../shared/services/loaders/global-loader.service";
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
  selectedConversionType = new BehaviorSubject<any>({});
  currencryConversionInUse: ICurrencryConversion =
    currencryConversionOptions[0];

  constructor(private http: HttpClient,
    public _loaderService : GlobalLoaderService) {}

  getNewReportRequest() {
    return this.reportRequestSubject;
  }

  setReportRequest(criteria) {
    this.reportRequestSubject.next(criteria);
  }

  ieDetailed(criteria) {
    // this.setReportRequest(criteria);

    // return this.http.post<IDetailedReportResponse>(
    //   environment.api.url + "ledger/getIE",
    //   criteria
    // );
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
this._loaderService.showLoader()

    this.setReportRequest(criteria);

    this.http
      .post<IDetailedReportResponse>(
        environment.api.url + "ledger/getIE",
        criteria
      )
      .subscribe((res) => {
        if (res["success"]) {
          this._loaderService.stopLoader()
          if (res["data2"]) {
            this.reportResponse.next(res);
          } else {
            this.reportResponse.next(res["data"]);
          }
        } else {
          alert("Year and ULB selection is mandatory");
        }
      });
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

  BSDetailed(criteria) {
  //   this.setReportRequest(criteria);

  //  return this.http
  //    .post<ISummaryReport>(environment.api.url + "ledger/getBS", criteria)
    //  .subscribe((res) => {
    //    if (res["success"]) {
    //      if (res["data2"]) {
    //        localStorage.setItem("ulbData2", JSON.stringify(res["data2"]));
    //      }
    //      this.reportResponse.next(res["data"]);
    //    } else {
    //      alert("Year and ULB selection is mandatory");
    //    }
    //  });
this._loaderService.showLoader()
    this.setReportRequest(criteria);

    this.http
      .post<ISummaryReport>(environment.api.url + "ledger/getBS", criteria)
      .subscribe((res) => {

        if (res["success"]) {
          this._loaderService.stopLoader()
          if (res["data2"]) {

            localStorage.setItem("ulbData2", JSON.stringify(res["data2"]));
          }
          this.reportResponse.next(res["data"]);
        } else {
          alert("Year and ULB selection is mandatory");
        }
      },
      (error)=>{
        this._loaderService.stopLoader()
      }
      );
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

  getReports(ulbId: string, financialYear: string, auditType: string = "") {
    return this.http.get(`${environment.api.url}ledger/ulb-financial-data/files/${ulbId}?financialYear=${financialYear}&auditType=${auditType}`);
  }

  /**
   * Get Digitized Excel Reports/ Data.
   * List of excel URLs digitized under AFS Digitization Project.
   */
  getDigitizedExcelReports(ulbId: string, financialYear: string, auditType = "audited") {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          "timestamp": 1770104186,
          "success": true,
          "msg": "Success.",
          "message": "Success.",
          "data": {
            // "pdf": [
            //   {
            //     "name": "Balance Sheet",
            //     "url": "/ULB/2023-24/annual_accounts/AP008/BS_2022-23_b3c4245b-b1ad-4a47-8708-b02c4b067635.pdf"
            //   },
            //   {
            //     "name": "Schedules To Balance Sheet",
            //     "url": "/ULB/2023-24/annual_accounts/AP008/Balance_sheet_schedule_22-23_2b3ae0d5-0c5b-483b-9973-5469b0ad1868.pdf"
            //   },
            //   {
            //     "name": "Income And Expenditure",
            //     "url": "/ULB/2023-24/annual_accounts/AP008/Income_and_Expenditure_Statement_22-23_07067070-b1d8-4904-bfea-0048066e5419.pdf"
            //   },
            //   {
            //     "name": "Schedules To Income And Expenditure",
            //     "url": "/ULB/2023-24/annual_accounts/AP008/Income_and_Expenditure_schedule_22-23_507e6c8c-6d0c-4312-aaf2-8ad277e5af9b.pdf"
            //   },
            //   {
            //     "name": "Cash Flow Statement",
            //     "url": "/ULB/2023-24/annual_accounts/AP008/CF_2022-23_7e7fd30b-7800-4386-90f2-eafbd46bb861.pdf"
            //   }
            // ],
            "excel": [
              {
                "name": "Balance Sheet",
                "url": "/ULB/2023-24/annual_accounts/AP008/BS_2022-23_2d1f9702-b996-4e68-a851-b8206cb8479d.xlsx"
              },
              {
                "name": "Schedules To Balance Sheet",
                "url": "/ULB/2023-24/annual_accounts/AP008/BS_SHEDULES_2022-23_67c25673-1d80-477a-802a-4610d737e5b7.xlsx"
              },
              {
                "name": "Income And Expenditure",
                "url": "/ULB/2023-24/annual_accounts/AP008/IE_2022-23_59920b7f-eea9-439b-b514-a07c799d0cc1.xlsx"
              },
              {
                "name": "Schedules To Income And Expenditure",
                "url": "/ULB/2023-24/annual_accounts/AP008/IE_SHEDULES_2022-23_9872fb36-21f5-432e-9324-cb3edf4f08d6.xlsx"
              },
              {
                "name": "Cash Flow Statement",
                "url": "/ULB/2023-24/annual_accounts/AP008/CASH_FLOW_2022-23_NEW_85ca4f45-b959-4690-8ee1-3a3f0c7bd110.xlsx"
              }
            ],
            "type": "audited"
          }
        });
        observer.complete();
      }, 500);
    });
    // let params = new HttpParams();
    // if (auditType) params = params.set('auditType', auditType);
    // if (financialYear) params = params.set('financialYear', financialYear);
    // if (ulbId) params = params.set('ulbId', ulbId);
    // return this.http.get(`${environment.api.urlV2}afs-digitization/afs-excel`, { params });
  }
}
