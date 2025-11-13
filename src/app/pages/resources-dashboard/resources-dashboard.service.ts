import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";


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
}