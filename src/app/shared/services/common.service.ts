import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IBasicLedgerData } from "src/app/dashboard/report/models/basicLedgerData.interface";
import { IULBResponse } from "src/app/models/IULBResponse";
import {
  NewULBStructure,
  NewULBStructureResponse,
} from "src/app/models/newULBStructure";
import { IStateListResponse } from "src/app/models/state/state-response";
import { ULBsStatistics } from "src/app/models/statistics/ulbsStatistics";
import { IULB } from "src/app/models/ulb";
import { USER_TYPE } from "src/app/models/user/userType";
import { HttpUtility } from "src/app/util/httpUtil";

import { IStateULBCoveredResponse } from "../models/stateUlbConvered";
import { IULBWithPopulationResponse } from "../models/ulbsForMapResponse";
import { environment } from "./../../../environments/environment";
import { JSONUtility } from "src/app/util/jsonUtil";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as fileSaver from "file-saver";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  userType: string;
  private stateArr = [];
  public states: Subject<any> = new Subject<any>();
  OpenModalTrigger = new Subject<any>();
  state_name_data = new Subject<any>();
  lastUpdatedYear = new BehaviorSubject<any>("");
  dataForVisualizationCount = new BehaviorSubject<any>("");
  private httpUtil = new HttpUtility();
  jsonUtil = new JSONUtility();

  private NewULBStructureResponseCache: {
    [datesAsString: string]: IULBResponse;
  } = {};

  // private states: any = [];
  isEmbedModeEnable: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar
  ) {}

  private searchItem : BehaviorSubject<any> = new BehaviorSubject([]);
  castSearchItem = this.searchItem.asObservable();
  private selectedFinancialYear : BehaviorSubject<any> = new BehaviorSubject([]);
  getSelectedYear = this.selectedFinancialYear.asObservable();

  updateSearchItem(searchItem){
     this.searchItem.next(searchItem)
  }

  setSelectedFinancialYear( selectedYear){
    this.selectedFinancialYear.next(selectedYear)
 }

  setDataForVisualizationCount(VisualizationCountObject){
    this.dataForVisualizationCount.next(VisualizationCountObject)
 }
 
  searchUlb(body, type, state = "") {
    return this.http.post(
      `${environment.api.url}recentSearchKeyword/search?type=${type}&state=${state}`,
      body
    );
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

  public getWebsiteVisitCount() {
    return this.http
      .get(`${environment.api.url}visit_count`)
      .pipe(map((res) => (res && res["data"] ? res["data"] : 0)));
  }

  // we are loading states while loading dashboard
  public loadStates(doLoadFromServer: boolean) {
    if (this.stateArr.length > 0 && !doLoadFromServer) {
      this.states.next(this.stateArr);
    }
    this.http.get(environment.api.url + "/state").subscribe((res) => {
      this.stateArr = res["data"];
      this.states.next(this.stateArr);
    });
  }

  public getBondIssuerItemAmount(state?: string) {
    const params = this.httpUtil.convertToHttpParams({ state });
    return this.http.get(`${environment.api.url}BondIssuerItem/amount`, {
      params,
    });
  }

  public fetchStateList() {
    return this.http
      .get<IStateListResponse>(environment.api.url + "state")
      .pipe(map((res) => res["data"]));
  }

  public fetchDataForHomepageMap(stateId?: string) {
    const params = this.httpUtil.convertToHttpParams({ state: stateId });
    return this.http
      .get(environment.api.url + `report/dashboard/home-page-data`, { params })
      .pipe(map((res) => res["data"]));
  }

  public verifyULBCodeAndName(body: { name: string; code: string }) {
    if (!body.name.trim() || !body.code.trim()) {
      return of({ isValid: false, ulb: null });
    }

    return this.getULBByCode(body.code).pipe(
      map((res) => res["data"]),
      switchMap((data) => {
        let isValid = true;
        if (!data || data["code"] !== body.code || data["name"] !== body.name) {
          isValid = false;
        }

        return of({ isValid, ulb: data });
      })
    );

    //
    // return of(false);
  }

  getULBByCode(code: string) {
    return this.http.get(`${environment.api.url}ulb-by-code?code=${code}`);
  }

  getULBByStateCode(stateID: string) {
    const params = this.httpUtil.convertToHttpParams({ state: stateID });
    return this.http.get(`${environment.api.url}ulb`, { params });
  }

  getAllUlbs() {
    return this.http.get<IULBResponse>(environment.api.url + "ulbs");
  }

  // since ULB is based on state, query will happen on demand
  getUlbByState(stateCode) {
    return this.http.get(
      environment.api.url + "/states/" + stateCode + "/ulbs"
    );
  }

  getCachedResponse(years: string[]) {
    if (!years.length) {
      return this.NewULBStructureResponseCache["NoYear"];
    }

    const yearsAsString = years.reduce((a, b) => a + b);
    return this.NewULBStructureResponseCache[yearsAsString];
  }

  getNewULBLegdersList(years: string[] = []) {
    // const cachedResponse = this.getCachedResponse(years);
    // if (cachedResponse) {
    //   return of(cachedResponse);
    // }

    return this.http.post<NewULBStructureResponse>(
      `${environment.api.url}/ledger/getAllLegders`,
      { year: years }
    );
  }

  fetchBasicLedgerData() {
    return this.http
      .get<IBasicLedgerData>(
        `${environment.api.url}/ledger/getOverAllUlbLegders`
      )
      .pipe(
        map((res) => ({
          ...res,
          data: res.data.map((state) => ({
            ...state,
            ulbList: state.ulbList.map((ulb) => ({
              ...ulb,
              _id: ulb.ulb,
              financialYear:
                !ulb.financialYear ||
                !ulb.financialYear.length ||
                !ulb.financialYear[0]
                  ? null
                  : ulb.financialYear,
            })),
          })),
        })),
        map((res) => ({ ...res, data: this.sortLedgeData(res) }))
      );
  }

  /**
   * @description Sort the data:
   * 1. State - Alphabetic
   * 2. ULBs - Alphabetic
   * 3. Year - Descreasing (Latest year first).
   */
  private sortLedgeData(res: IBasicLedgerData) {
    return res.data.sort((stateA, stateB) => {
      stateA.ulbList = stateA.ulbList
        .sort((ulbA, ulbB) => ulbA.name.localeCompare(ulbB.name))
        .map((ulb) => ({
          ...ulb,
          state: stateA._id.name,
          stateId: stateA._id.state,
          financialYear: this.sortFinancialYear(ulb.financialYear),
        }));
      stateB.ulbList = stateB.ulbList
        .sort((ulbA, ulbB) => ulbA.name.localeCompare(ulbB.name))
        .map((ulb) => ({
          ...ulb,
          state: stateB._id.name,
          stateId: stateB._id.state,
          financialYear: this.sortFinancialYear(ulb.financialYear),
        }));
      return stateA._id.name.localeCompare(stateB._id.name);
    });
  }

  /**
   * @description Sort the financial years of ulbs in descending order.
   * @example
   * years = ['2016-17', '2017-18'];
   * sortedYear = ['2017-18', '2016-17']
   */
  private sortFinancialYear(years: string[]) {
    return years?.sort((A, B) => +B.split("-")[0] - +A.split("-")[0]);
  }

  getULBSByYears(years: string[] = []) {
    const cachedResponse = this.getCachedResponse(years);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http
      .post<NewULBStructureResponse>(
        `${environment.api.url}/ledger/getAllLegders`,
        { year: years }
      )
      .pipe(
        map((response) => {
          const formattedResponse =
            this.convertULBStaticticsToIULBResponse(response);

          const yearsAsString = !years.length
            ? "NoYear"
            : years.reduce((a, b) => a + b);
          this.NewULBStructureResponseCache[yearsAsString] = {
            ...formattedResponse,
          };
          return formattedResponse;
        })
      );
  }

  convertULBStaticticsToIULBResponse(
    originalResponse: NewULBStructureResponse
  ): IULBResponse {
    const newObj: IULBResponse = {
      msg: originalResponse.msg,
      success: originalResponse.success,
      data: {},
    };
    originalResponse.data.forEach((ulb) => {
      if (!ulb.state.code) {
        return;
      }
      if (!newObj.data[ulb.state.code]) {
        newObj.data[ulb.state.code] = {
          state: ulb.state.name,
          ulbs: [
            {
              ...this.convertNewULBStructureToIULB(ulb),
              state: ulb.state.name,
            },
          ],
        };
        return;
      }

      const convertedULB = this.convertNewULBStructureToIULB(ulb);
      const index = newObj.data[ulb.state.code].ulbs.findIndex(
        (newULB) => newULB.code === convertedULB.code
      );

      if (index === -1) {
        newObj.data[ulb.state.code].ulbs.push({
          ...this.convertNewULBStructureToIULB(ulb),
          state: ulb.state.name,
        });
      } else {
        if (!newObj.data[ulb.state.code].ulbs[index].allYears) {
          newObj.data[ulb.state.code].ulbs[index].allYears = [];
        }
        newObj.data[ulb.state.code].ulbs[index].allYears.push(
          convertedULB.financialYear
        );
      }
    });
    return newObj;
  }

  convertNewULBStructureToIULB(ulb: NewULBStructure): IULB {
    return {
      ...ulb.ulb,
      type: ulb.ulbtypes.name,
      financialYear: ulb.financialYear,
    };
  }

  fetchULBList(body, sort?: {}) {
    if (body.registration === "Yes") {
      body.role = USER_TYPE.ULB;
    }
    const skip = body.skip;
    const limit = body.limit;
    delete body.skip;
    delete body.limit;
    if (body) {
      Object.keys(body).forEach((key) => {
        if (typeof body[key] === "string") body[key] = body[key].trim();
      });
    }

    let params = this.httpUtil.convertToHttpParams({
      filter: JSON.stringify(body),
      skip,
      limit,
    });
    if (sort) {
      params = params.append("sort", JSON.stringify(sort));
    }

    return this.http.get(`${environment.api.url}xv-fc-form/fc-grant/ulbList`, {
      params,
    });
  }

  getULBListApi(body) {
    body["token"] = localStorage
      .getItem("id_token")
      .replace('"', "")
      .replace('"', "");
    body["csv"] = true;
    let params = new HttpParams();
    if (body.registration === "Yes") {
      body.role = USER_TYPE.ULB;
    }
    const skip = body.skip;
    const limit = body.limit;
    delete body.skip;
    delete body.limit;
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "object") {
        const value = JSON.stringify(body[key]);
        params = params.append(key, value);
      } else {
        params = params.append(key, body[key]);
      }
    });
    return `${environment.api.url}xv-fc-form/fc-grant/ulbList?${params}`;
  }

  fetchDashboardCardData() {
    return this.http.get(
      `${environment.api.url}xv-fc-form/fc-grant/dashboard-card`
    );
  }

  fetchDashboardChartData(queryParams) {
    const params = this.httpUtil.convertToHttpParams(queryParams);
    return this.http.get(
      `${environment.api.url}xv-fc-form/fc-grant/dashboard-chart`,
      { params }
    );
  }

  getULBsStatistics() {
    return this.http
      .post<NewULBStructureResponse>(
        `${environment.api.url}/ledger/getAllLegders`,
        { year: [] }
      )
      .pipe(map((response) => this.getCount(response.data)));
  }

  getCount(ulbList: NewULBStructure[]): ULBsStatistics {
    const newObj: ULBsStatistics = {};
    ulbList.forEach((ulb) => {
      if (!ulb.state._id) {
        return;
      }
      if (!newObj[ulb.state._id]) {
        newObj[ulb.state._id] = {
          stateName: ulb.state.name,
          stateCode: ulb.state.code,
          _id: ulb.state._id,
          totalULBS: [ulb],
          uniqueULBS: [ulb],
          ulbsByYears: {
            [ulb.financialYear]: {
              total: 1,
              amrut: ulb.ulb.amrut == "Yes" ? 1 : 0,
              nonAmrut:
                ulb.ulb.amrut == "No" || ulb.ulb.amrut == undefined ? 1 : 0,
            },
          },
        };
        return;
      }
      newObj[ulb.state._id].totalULBS.push(ulb);
      const doesULBAlreadyExist = newObj[ulb.state._id].uniqueULBS.find(
        (ulbToSearch) => ulbToSearch.ulb.code === ulb.ulb.code
      );
      if (!doesULBAlreadyExist) {
        newObj[ulb.state._id].uniqueULBS.push(ulb);
      }

      if (!newObj[ulb.state._id].ulbsByYears[ulb.financialYear]) {
        newObj[ulb.state._id].ulbsByYears[ulb.financialYear] = {
          total: 1,
          amrut: ulb.ulb.amrut == "Yes" ? 1 : 0,
          nonAmrut: ulb.ulb.amrut == "No" || ulb.ulb.amrut == undefined ? 1 : 0,
        };
        return;
      }
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].total += 1;
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].amrut +=
        ulb.ulb.amrut == "Yes" ? 1 : 0;
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].nonAmrut +=
        ulb.ulb.amrut == "No" || ulb.ulb.amrut == undefined ? 1 : 0;
      // newObj[ulb.state._id].ulbsByYears[ulb.financialYear].push({ ...ulb });
    });

    return { ...newObj };
  }
  stateRegister: any = {};
  setGetStateRegister(set, data = null): Observable<any> {
    if (set) {
      this.stateRegister = data;
    } else {
      return this.stateRegister;
    }
  }

  loadStatesAgg(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardStateAggData.json");
  }

  loadHomeStatisticsData(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardData.json");
  }

  getStateUlbCovered(body?: { year: string[] }) {
    // let queryParams: HttpParams;
    // if (params) {
    //   queryParams = this.getHttpClientParams(params);
    // }
    return this.http
      .post<IStateULBCoveredResponse>(
        `${environment.api.url}states-with-ulb-count`,
        body
      )
      .pipe(
        map((res) => {
          res.data = res.data.sort((stateA, stateB) =>
            stateA.name > stateB.name ? 1 : -1
          );
          return res;
        })
      );
  }

  getULBSWithPopulationAndCoordinates(body?: {
    year: string[];
    [key: string]: any;
  }) {
    return this.http
      .post<IULBWithPopulationResponse>(`${environment.api.url}ulb-list`, body)
      .pipe(
        map((res) => {
          res.data = res.data.sort((ulbA, ulbB) =>
            ulbA.name > ulbB.name ? 1 : -1
          );
          return res;
        })
      );
  }

  public getHttpClientParams(obj: {}) {
    let params = new HttpParams();
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (obj[key] || obj[key] === 0) {
          params = params.set(key, obj[key]);
        }
      });
    }
    return params;
  }

  getUniqueArrayByKey(array = [], key) {
    if (!Array.isArray(array)) {
      return [];
    }
    return Array.from(new Set(array.map((item) => item[key])));
  }

  getPublicFileList() {
    return this.http
      .get(`${environment.api.url}resource/all`)
      .pipe(map((res) => res["data"]["data"]));
  }

  getNodalOfficer(state) {
    return this.http.get(`${environment.api.url}user/nodal/${state}`);
  }

  fetchSlbData(params, ulbId) {
    // let data = {design_year: '606aaf854dff55e6c075d219'}
    // const newData = this.jsonUtil.convert(data);
    if (ulbId != null) {
      return this.http.get(
        `${environment.api.url}xv-fc-form/admin/${ulbId}?${params}`
      );
    } else {
      return this.http.get(`${environment.api.url}xv-fc-form?${params}`);
    }
  }

  postSlbData(data: any) {
    const newData = this.jsonUtil.convert(data);
    return this.http.post(
      `${environment.api.url}xv-fc-form`,
      JSON.stringify(newData)
    );
  }

  updateSlbData(data: any, id) {
    const newData = this.jsonUtil.convert(data);
    return this.http.put(
      `${environment.api.url}xv-fc-form/${id}`,
      JSON.stringify(newData)
    );
  }
  setUser(get, user = null) {
    if (get) {
      return this.userType;
    }
    this.userType = user;
  }
  postGlobalSearchData(data: any, type='ulb', state='') {
    let dataString = {
      matchingWord: data,
    };
    let stateData = "";
    if (state) {
      stateData = `&state=${state}`;
    }
    return this.http.post(
      `${environment.api.url}recentSearchKeyword/search?type=${type}${stateData}`,
      dataString
    );
  }
  postRecentSearchValue(data: any) {
    // let searchObj = {
    //      type: data.type,
    //      searchKeyword: data._id
    //   }
    return this.http.post(`${environment.api.url}recentSearchKeyword`, data);
  }
  getRecentSearchValue() {
    return this.http.get(`${environment.api.url}recentSearchKeyword?limit=2`);
  }

  getChartDataByIndicator(body) {
    return this.http.post(`${environment.api.url}indicator`, body);
  }

  getLineItems() {
    return this.http.get(`${environment.api.url}LineItem`);
  }

  formatNumber(num) {
    return new Intl.NumberFormat("en-IN").format(num);
  }

  changeCountFormat(
    value: any,
    chartAnimation: string = "defaultBarChartOptions"
  ) {
    let formattedValue: any;
    if (chartAnimation == "croreBarChartOptions") {
      formattedValue = Math.round(value / 10000000);
    } else if (chartAnimation == "lakhBarChartOptions") {
      formattedValue = Math.round(value / 100000);
    } else {
      formattedValue = Math.round(value);
    }
    // return chartAnimation == "defaultBarChartOptions" ? value : formattedValue;
    return formattedValue;
  }

  toTitleCase(phrase: string) {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getStateWiseFYs(paramContent: any) {
    let bodyParams: any;
    bodyParams = this.getHttpClientParams(paramContent);
    return this.http.get(`${environment.api.url}get-FYs-with-specification`, {
      params: bodyParams,
    });
  }

  /**
   * It takes a URL query string and returns a URL with the query string appended to it.
   * @param {any} paramContent - {
   * @returns
   * http://localhost:4200/revenuchart?widgetMode=true&startDate=2019-01-01&endDate=2019-01-31&chartType=line&chartTitle=Revenue%20Chart&chartSubtitle=Revenue%20Chart%20Subtitle&chartXAxisTitle=Revenue%20Chart
   */
  createEmbedUrl(paramContent: any, embeddedRoute: string = '') {
    let queryString = new URLSearchParams(paramContent).toString();
    // let embeddedRoute = "revenuchart";
    console.log("queryString", queryString);
    let finalURL = `${window.location.origin}/${embeddedRoute}?widgetMode=true&${queryString}`;
    // let finalURL = `${window.location.origin}/${embeddedRoute}?widgetMode=true&data=${btoa(queryString)}`;
    return finalURL;
  }

  showSnackbarMessage(message: string) {
    this.snackbar.open(message, "", {
      duration: 1500,
      verticalPosition: "bottom",
    });
  }

  copyToClipboard(copyHTMLElement: any, copyMessage: string = "") {
    this.showSnackbarMessage(copyMessage);

    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = copyHTMLElement;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  decodeIframeUrl(dataUrl: any) {
    console.log("decodeIframeUrl", dataUrl);
    let decodedUrl = atob(dataUrl);
    return decodedUrl;
  }

  /**
   * It takes a string of query parameters and returns an object with the key/value pairs.
   * @param {any} queryParamContent - "code=4%2FvQH4XcQ7Zq-Y7Yc9Q8QqQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
   * @returns {
   *   "access_token":
   * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiw
   */
  paramsToObject(queryParamContent: any) {
    console.log("queryParamContent", queryParamContent);
    var paramObject = {};
    var pairs = queryParamContent.split("&");
    for (let key in pairs) {
      var split = pairs[key].split("=");
      paramObject[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
    }
    console.log("paramObject", paramObject);
    return paramObject;
  }

  openWindowToDownloadCsv(
    paramContent: any,
    apiEndPoint: any,
    stateServiceLabel: boolean = false
  ) {
    // console.log(
    //   "openWindowToDownloadCsv",
    //   paramContent,
    //   apiEndPoint,
    //   stateServiceLabel
    // );
    let queryString = new URLSearchParams(paramContent).toString();
    if (!stateServiceLabel) {
      // console.log("queryString", queryString);

      let prepareDownloadURL = `${environment.api.url}${apiEndPoint}?csv=true&${queryString}`;

      // console.log("1-->",environment.api.url);
      // console.log("2-->",apiEndPoint);
      // console.log("3-->",queryString);
      // console.log("3-->", paramContent);

      let pTaxApi = "";
      if (prepareDownloadURL) {
        if (paramContent?.formId === '3') {
          pTaxApi = paramContent.state ?
            `${environment.api.url}ptax-dump?design_year=${paramContent.design_year}&state=${paramContent.state}&token=${paramContent.token}` :
            `${environment.api.url}ptax-dump?design_year=${paramContent.design_year}&token=${paramContent.token}`
          window.open(pTaxApi);
        } else window.open(prepareDownloadURL);
      }
    }
    if (stateServiceLabel) {
      paramContent["csv"] = true;
      this.http
        .post(`${environment.api.url}${apiEndPoint}`, paramContent, {
          responseType: "blob",
        })
        .subscribe((res) => {
          let blob: any = new Blob([res], {
            type: "text/json; charset=utf-8",
          });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, `Service-Level-Benchmark-Data.xlsx`);
        });
    }
  }

  downloadCsvApi(csvType,payload) {
    const params = this.httpUtil.convertToHttpParams(payload);
    return this.http.get(`${environment.api.url}fiscal-ranking/${csvType}`,{ params: params as any,responseType: 'blob' })
  }

  createCsv(result, fileName) {
    let blob:Blob = new Blob([result], { type: 'text/csv;charset=utf-8;' });
    let url:string = URL.createObjectURL(blob);
    this.autoDownload(url, fileName);
  }

  autoDownload(url:string, file:string) {
    let element:HTMLAnchorElement = document.createElement('a');
    element.href = url;
    element.target = '_blank';
    element.download = file;
    element.click();
  }

  sortDataSource(dataset: any, sortKey: string) {
    let sortedData: any = [];
    // sortedData = dataset.sort((a, b) => a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1);
    sortedData = dataset.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    return sortedData;
  }

  createCityTooltip(markerDataPoint: any) {
    const tooltipStyle = {
      color: "#000000",
      fontWeight: 600,
      fontSize: "0.7rem",
    };
    if (markerDataPoint && markerDataPoint.name) {
      return `<p style="color: ${tooltipStyle?.color}; font-weight: ${tooltipStyle?.fontWeight}; font-size: ${tooltipStyle?.fontSize};">
        ${markerDataPoint.name}
        </p>`;
    }
  }

  roundOffValue(data: any) {
    data ? Math.round(data) : "---";
  }

  getSLBdashboardForntData() {
    return this.http.get(`${environment.api.url}slb-specific-metrics`);
  }

  getCallMethod(endPoints:string, queryParam:any) {
    return this.http.get(
      `${environment.api.url}${endPoints}`,
       {
        params: queryParam
       }
    );
  }
}
