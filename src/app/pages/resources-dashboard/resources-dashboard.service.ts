import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";


import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ResourcesDashboardService {
  showCard = new Subject<any>();
  resourceCount: BehaviorSubject<any> = new BehaviorSubject([]);
  castCount = this.resourceCount.asObservable()
  hideSearchedData: BehaviorSubject<any> = new BehaviorSubject([]);
  castSearchedData = this.hideSearchedData.asObservable()
  constructor(private https: HttpClient) { }
  getShowCardValue() {
    return this.showCard;
  }
  setShowCardValue(val) {
    this.showCard.next(val);
    return;
  }
  getDataSets(year: string, type: string, category: string, state: string, ulb: string, ulbId = '', globalName = '', skip: number = 0, auditType: string) {
    return this.https.get(
      `${environment.api.url}annual-accounts/datasets?year=${year}&type=${type}&category=${category}&state=${state}&ulb=${ulb}&ulbId=${ulbId}&globalName=${globalName}&skip=${skip}&fileType=${auditType}`
    );
  }
  getSearchedData(filter) {
    return this.https.get(
      `${environment.api.url}?search=${filter}`
    );
  }
  updateResouceCount(resourceCount) {
    this.resourceCount.next(resourceCount);
  }
  updateSearchedData(hideSearchedData) {
    this.hideSearchedData.next(hideSearchedData);
  }

  GlobalSearch(input) {
    return this.https.get(
      `${environment.api.url}resourceDashboard/search?name=${input}`
    );
  }

  getPdfData(pdfInput) {
    return this.https.get(
      `${environment.api.url}resourceDashboard/?toolKitVisible=${pdfInput?.toolKitVisible}&type=PDF&header=${pdfInput?.header}&subHeader=${pdfInput?.subHeader}&globalName=${pdfInput?.globalName}&state=${pdfInput?.state}&ulb=${pdfInput?.ulb}&year=${pdfInput?.year}`
    )
  }

  getStandardizedExcel(body) {
    return this.https.post(
      `${environment.api.url}annual-accounts/datasets`, body, { responseType: "blob" }
    )
  }

  getYearsList(header = 'learning_center', distinctValue = 'publishedYear') {
    return this.https.get(`${environment.api.url}resourceDashboard/allYears/?header=${encodeURIComponent(header)}&distinctValue=${distinctValue}`);
  }

  getMunicipalityBondsRepositoryCategories() {
    return this.https.get(`${environment.api.url}main_category/list`);
  }
  getMunicipalityBondsRepositorySubCategories(categoryId) {
    return this.https.get(`${environment.api.url}sub_category/list?categoryId=` + categoryId);
  }
  getMunicipalityBondsRepositoryList(params) {
    return this.https.get(`${environment.api.url}municipalBondRepository/list`, { params });
  }

  getAnnualAccountsYear(auditType: string = 'unAudited') {
    return this.https.get(`${environment.api.url}common/get-latest-aa-year/?auditType=${auditType}`);
  }

  initiateStateBundleZipDownload(
    state: string,
    year: string,
    ulb: string = '',
    downloadType: string = 'rawPdf',
    auditType: string = 'audited',
    email: string,
    userName: string = 'User',
  ) {
    if (!email) throw new Error("Email is required");

    let params = new HttpParams();
    if (ulb) params = params.set('ulb', ulb);
    if (state) params = params.set('state', state);
    if (year) params = params.set('year', year);
    if (auditType) params = params.set('auditType', auditType);
    if (downloadType) params = params.set('downloadType', downloadType);
    if (email) params = params.set('email', email);
    if (userName) params = params.set('userName', userName);

    return this.https.get(`${environment.api.urlV2}resources-section/data-sets/zip`, { params });
  }

  getLedgerDump(stateCode: string, year: string, module: string) {
    let params = new HttpParams();
    if (!stateCode) throw new Error("stateCode is required");
    if (!year) throw new Error("year is required");
    if (!module) throw new Error("module is required");

    params = params.set('financialData', true);
    params = params.set('isStandardizable', true);
    params = params.set('financialData', true);
    params = params.set('stateCode', stateCode);
    params = params.set('year', year);
    params = params.set('module', module);
    return this.https.get(`${environment.api.url}ledger/getLedgerDump?`, { params, responseType: 'blob' });
  }

  /**
   * Get Digitized Excel List.
   * List of excel digitized under AFS Digitization Project.
   */
  getDigitizedExcelList(): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          "success": true,
          "data": [
            {
              "_id": "5dd24729437ba31f7eb42e94",
              "auditType": "unAudited",
              "fileName": "Andhra Pradesh_Chittoor Municipal Corporation_2022-23_ocr_unAudited",
              "fileUrl": null,
              "modifiedAt": "2023-05-15T06:12:04.513Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e94",
              "ulbName": "Chittoor Municipal Corporation",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e94",
              "auditType": "audited",
              "fileName": "Andhra Pradesh_Chittoor Municipal Corporation_2022-23_ocr_outsourced",
              "fileUrl": null,
              "modifiedAt": "2024-09-21T11:33:23.857Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e94",
              "ulbName": "Chittoor Municipal Corporation",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e98",
              "auditType": "unAudited",
              "fileName": "Rajasthan_Taranagar Municipality_2022-23_ocr_unAudited",
              "fileUrl": null,
              "modifiedAt": "2024-01-17T07:33:07.764Z",
              "state": "Rajasthan",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e98",
              "ulbName": "Taranagar Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e98",
              "auditType": "audited",
              "fileName": "Rajasthan_Taranagar Municipality_2022-23_ocr_outsourced",
              "fileUrl": null,
              "modifiedAt": "2025-01-18T08:59:48.176Z",
              "state": "Rajasthan",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e98",
              "ulbName": "Taranagar Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e99",
              "auditType": "unAudited",
              "fileName": "Andhra Pradesh_Narasarao Peta Municipality_2022-23_ocr_unAudited",
              "fileUrl": null,
              "modifiedAt": "2023-05-13T15:27:02.305Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e99",
              "ulbName": "Narasarao Peta Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e99",
              "auditType": "audited",
              "fileName": "Andhra Pradesh_Narasarao Peta Municipality_2022-23_ocr_audited",
              "fileUrl": null,
              "modifiedAt": "2024-06-28T11:42:49.920Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e99",
              "ulbName": "Narasarao Peta Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e9c",
              "auditType": "unAudited",
              "fileName": "Andhra Pradesh_Hindupur Municipality_2022-23_ocr_unAudited",
              "fileUrl": null,
              "modifiedAt": "2023-05-13T10:10:17.401Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e9c",
              "ulbName": "Hindupur Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e9c",
              "auditType": "audited",
              "fileName": "Andhra Pradesh_Hindupur Municipality_2022-23_ocr_audited",
              "fileUrl": null,
              "modifiedAt": "2024-09-17T12:43:54.731Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e9c",
              "ulbName": "Hindupur Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e9d",
              "auditType": "unAudited",
              "fileName": "Andhra Pradesh_Narsipatnam Municipality_2022-23_ocr_unAudited",
              "fileUrl": null,
              "modifiedAt": "2023-05-15T11:13:04.584Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e9d",
              "ulbName": "Narsipatnam Municipality",
              "year": "2022-23"
            },
            {
              "_id": "5dd24729437ba31f7eb42e9d",
              "auditType": "audited",
              "fileName": "Andhra Pradesh_Narsipatnam Municipality_2022-23_ocr_audited",
              "fileUrl": null,
              "modifiedAt": "2024-05-15T14:53:13.060Z",
              "state": "Andhra Pradesh",
              "type": "excel",
              "ulbId": "5dd24729437ba31f7eb42e9d",
              "ulbName": "Narsipatnam Municipality",
              "year": "2022-23"
            }
          ]
        });
        observer.complete();
      }, 500);
    });

    // let params = new HttpParams();
    // return this.https.get(`${environment.api.urlV2}afs-digitization/afs-list`, { params });
  }
}