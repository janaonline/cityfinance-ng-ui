import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Chart } from "chart.js";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ResourcesDashboardService {
  showCard = new Subject<any>();
  constructor(private https: HttpClient) {}
  getShowCardValue() {
    return this.showCard;
  }
  setShowCardValue(val) {
    this.showCard.next(val);
    return;
  }
  getDataSets(year, type, category, state, ulb) {
    return this.https.get(
      `${environment.api.url}annual-accounts/datasets?year=${year}&type=${type}&category=${category}&state=${state}&ulb=${ulb}`
    );
  }
}
