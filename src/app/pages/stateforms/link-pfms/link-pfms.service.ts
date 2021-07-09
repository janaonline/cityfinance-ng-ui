import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LinkPFMSAccount {
  constructor(private http: HttpClient) { }

  OpenModalTrigger = new Subject<any>();

  postData(fd) {
    let catUrl = environment.api.url + "LinkPfmsState";
    return this.http.post(catUrl, fd);
  }

  postStateAction(data) {
    let utUrl = environment.api.url + 'LinkPfmsState/action'
    return this.http.post(utUrl, data)
  }

  getData(design_year, stateId) {
    let catUrl;
    catUrl =
      environment.api.url +
      `LinkPfmsState?design_year=${design_year}&state_id=${stateId}`;
    return this.http.get(catUrl);
  }
}
