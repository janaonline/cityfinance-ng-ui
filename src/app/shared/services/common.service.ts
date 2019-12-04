import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IULBResponse } from 'src/app/models/IULBResponse';

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

  loadStatesAgg(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardStateAggData.json");
  }

  loadHomeStatisticsData(): Observable<any> {
    return this.http.get("/assets/files/homeDashboardData.json");
  }
}
