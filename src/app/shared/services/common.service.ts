import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { a } from '@angular/core/src/render3';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { NewULBStructure, NewULBStructureResponse } from 'src/app/models/newULBStructure';
import { IStateListResponse } from 'src/app/models/state/state-response';
import { ULBsStatistics } from 'src/app/models/statistics/ulbsStatistics';
import { IULB } from 'src/app/models/ulb';
import { USER_TYPE } from 'src/app/models/user/userType';
import { HttpUtility } from 'src/app/util/httpUtil';

import { IStateULBCoveredResponse } from '../models/stateUlbConvered';
import { IULBWithPopulationResponse } from '../models/ulbsForMapResponse';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private stateArr = [];
  public states: Subject<any> = new Subject<any>();
  private httpUtil = new HttpUtility();

  private NewULBStructureResponseCache: {
    [datesAsString: string]: IULBResponse;
  } = {};

  // private states: any = [];
  constructor(private http: HttpClient) {}

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
      .get(environment.api.url + `report/dashboard/home-page-data/`, { params })
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
          const formattedResponse = this.convertULBStaticticsToIULBResponse(
            response
          );
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
      if (
        newObj.data[ulb.state.code].ulbs.every(
          (ulb) => ulb.code !== convertedULB.code
        )
      ) {
        newObj.data[ulb.state.code].ulbs.push({
          ...this.convertNewULBStructureToIULB(ulb),
          state: ulb.state.name,
        });
      }
    });
    return newObj;
  }

  convertNewULBStructureToIULB(ulb: NewULBStructure): IULB {
    return { ...ulb.ulb, type: ulb.ulbtypes.name };
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

    return this.http.get(
      `${environment.api.url}ulb-financial-data/fc-grant/ulbList`,
      { params }
    );
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
    return `${environment.api.url}ulb-financial-data/fc-grant/ulbList?${params}`;
  }

  fetchDashboardCardData() {
    return this.http.get(
      `${environment.api.url}/ulb-financial-data/fc-grant/dashboard-card`
    );
  }

  fetchDashboardChartData() {
    return this.http.get(
      `${environment.api.url}/ulb-financial-data/fc-grant/dashboard-chart`
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
      // if (ulb.ulb.amrut == undefined) {
      //   console.log(ulb.ulb.name);
      // }

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
    // console.log('newObj',newObj);

    return { ...newObj };
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
        `${environment.api.url}/states-with-ulb-count`,
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
      .post<IULBWithPopulationResponse>(`${environment.api.url}/ulb-list`, body)
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
        if (obj[key]) {
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
}
