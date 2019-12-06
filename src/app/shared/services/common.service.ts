import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { NewULBStructure, NewULBStructureResponse } from 'src/app/models/newULBStructure';
import { ULBsStatistics } from 'src/app/models/statistics/ulbsStatistics';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private stateArr = [];
  public states: Subject<any> = new Subject<any>();

  // private states: any = [];
  constructor(private http: HttpClient) {}

  // we are loading states while loading dashboard
  public loadStates(doLoadFromServer: boolean) {
    if (this.stateArr.length > 0 && !doLoadFromServer) {
      this.states.next(this.stateArr);
    }
    this.http.get(environment.api.url + "lookup/states").subscribe(res => {
      this.stateArr = res["data"];
      this.states.next(this.stateArr);
    });
  }

  getAllUlbs() {
    return this.http.get<IULBResponse>(environment.api.url + "lookup/ulbs");
  }

  // since ULB is based on state, query will happen on demand
  getUlbByState(stateCode) {
    return this.http.get(
      environment.api.url + "lookup/states/" + stateCode + "/ulbs"
    );
  }

  getULBsStatistics() {
    return this.http
      .post<NewULBStructureResponse>(
        `${environment.api.url}ledger/getAllLegders`,
        { year: [] }
      )
      .pipe(map(response => this.getCount(response.data)));
  }

  getNewULBByDate(dates: string[]) {
    // this.getNewULBData(dates).pipe(ulbList => {
    // });
  }

  // convertNewULBStructureToIULB(ulbList: NewULBStructure[]): IULBResponse['data'] {
  //   let newObject: IULBResponse['data'] = {};
  //   ulbList.forEach(ulb => {
  //     if(!ulb.state.code) return;
  //     newObject[ulb.state.code] = {
  //       state: ulb.state.name;

  //     }
  //   })
  // }

  getCount(ulbList: NewULBStructure[]): ULBsStatistics {
    const newObj: ULBsStatistics = {};
    ulbList.forEach(ulb => {
      // console.log(ulb.state.name, ulb.ulb.name,ulb.ulb.amrut);

      if (!ulb.state._id) {
        return;
      }
      if (!newObj[ulb.state._id]) {
        newObj[ulb.state._id] = {
          stateName: ulb.state.name,
          stateCode: ulb.state.code,
          _id: ulb.state._id,
          totalULBS: [ulb],
          ulbsByYears: {
            [ulb.financialYear]: {
              total: 1,
              amrut: ulb.ulb.amrut == 'Yes' ? 1 : 0,
              nonAmrut: ulb.ulb.amrut == 'No' ? 0 : 1,
            }
          }
        };
        return;
      }
      newObj[ulb.state._id].totalULBS.push(ulb);
      if (!newObj[ulb.state._id].ulbsByYears[ulb.financialYear]) {
        newObj[ulb.state._id].ulbsByYears[ulb.financialYear] = {
          total: 1,
          amrut: ulb.ulb.amrut == 'Yes' ? 1 : 0,
          nonAmrut: ulb.ulb.amrut == 'No' ? 1 : 0
        }
        return;
      }
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].total +=  1;
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].amrut += (ulb.ulb.amrut == 'Yes' ? 1 : 0);
      newObj[ulb.state._id].ulbsByYears[ulb.financialYear].nonAmrut += (ulb.ulb.amrut == 'No' ? 1 : 0);
      // newObj[ulb.state._id].ulbsByYears[ulb.financialYear].push({ ...ulb });
    });
    console.log(newObj);
    return { ...newObj };
  }

  loadStatesAgg(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardStateAggData.json");
  }

  loadHomeStatisticsData(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardData.json");
  }
}
