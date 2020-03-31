import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { NewULBStructure, NewULBStructureResponse } from 'src/app/models/newULBStructure';
import { ULBsStatistics } from 'src/app/models/statistics/ulbsStatistics';
import { IULB } from 'src/app/models/ulb';

import { IStateULBCoveredResponse } from '../models/stateUlbConvered';
import { IULBWithPopulationResponse } from '../models/ulbsForMapResponse';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private stateArr = [];
  public states: Subject<any> = new Subject<any>();

  private NewULBStructureResponseCache: {
    [datesAsString: string]: IULBResponse;
  } = {};

  // private states: any = [];
  constructor(private http: HttpClient) {}

  // we are loading states while loading dashboard
  public loadStates(doLoadFromServer: boolean) {
    if (this.stateArr.length > 0 && !doLoadFromServer) {
      this.states.next(this.stateArr);
    }
    this.http.get(environment.api.url + "/state").subscribe(res => {
      this.stateArr = res["data"];
      this.states.next(this.stateArr);
    });
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
        map(response => {
          const formattedResponse = this.convertULBStaticticsToIULBResponse(
            response
          );
          const yearsAsString = !years.length
            ? "NoYear"
            : years.reduce((a, b) => a + b);
          this.NewULBStructureResponseCache[yearsAsString] = {
            ...formattedResponse
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
      data: {}
    };
    originalResponse.data.forEach(ulb => {
      if (!ulb.state.code) {
        return;
      }
      if (!newObj.data[ulb.state.code]) {
        newObj.data[ulb.state.code] = {
          state: ulb.state.name,
          ulbs: [
            { ...this.convertNewULBStructureToIULB(ulb), state: ulb.state.name }
          ]
        };
        return;
      }

      const convertedULB = this.convertNewULBStructureToIULB(ulb);
      if (
        newObj.data[ulb.state.code].ulbs.every(
          ulb => ulb.code !== convertedULB.code
        )
      ) {
        newObj.data[ulb.state.code].ulbs.push({
          ...this.convertNewULBStructureToIULB(ulb),
          state: ulb.state.name
        });
      }
    });
    return newObj;
  }

  convertNewULBStructureToIULB(ulb: NewULBStructure): IULB {
    return { ...ulb.ulb, type: ulb.ulbtypes.name };
  }

  getULBsStatistics() {
    return this.http
      .post<NewULBStructureResponse>(
        `${environment.api.url}/ledger/getAllLegders`,
        { year: [] }
      )
      .pipe(map(response => this.getCount(response.data)));
  }

  getCount(ulbList: NewULBStructure[]): ULBsStatistics {
    const newObj: ULBsStatistics = {};
    ulbList.forEach(ulb => {
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
                ulb.ulb.amrut == "No" || ulb.ulb.amrut == undefined ? 1 : 0
            }
          }
        };
        return;
      }
      newObj[ulb.state._id].totalULBS.push(ulb);
      const doesULBAlreadyExist = newObj[ulb.state._id].uniqueULBS.find(
        ulbToSearch => ulbToSearch.ulb.code === ulb.ulb.code
      );
      if (!doesULBAlreadyExist) {
        newObj[ulb.state._id].uniqueULBS.push(ulb);
      }

      if (!newObj[ulb.state._id].ulbsByYears[ulb.financialYear]) {
        newObj[ulb.state._id].ulbsByYears[ulb.financialYear] = {
          total: 1,
          amrut: ulb.ulb.amrut == "Yes" ? 1 : 0,
          nonAmrut: ulb.ulb.amrut == "No" || ulb.ulb.amrut == undefined ? 1 : 0
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
        `${environment.api.url}/lookup/states-with-ulb-count`,
        body
      )
      .pipe(
        map(res => {
          res.data = res.data.sort((stateA, stateB) =>
            stateA.name > stateB.name ? 1 : -1
          );
          return res;
        })
      );
  }

  getULBSWithPopulationAndCoordinates(body?: { year: string[] }) {
    return this.http
      .post<IULBWithPopulationResponse>(`${environment.api.url}/ulb-list`, body)
      .pipe(
        map(res => {
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
      Object.keys(obj).forEach(key => {
        if (obj[key]) {
          params = params.set(key, obj[key]);
        }
      });
    }
    return params;
  }
}
