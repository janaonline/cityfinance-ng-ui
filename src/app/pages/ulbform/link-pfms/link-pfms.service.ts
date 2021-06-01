import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LinkPFMSAccount {
  constructor(private http: HttpClient) {}

  OpenModalTrigger = new Subject<any>();

  postData(fd) {
    console.log(fd);
    let catUrl = environment.api.url + "pfmsAccount/create";
    return this.http.post(catUrl, fd);
  }

  getData(design_year, ulbId) {
    console.log("Get API HIt");
    let catUrl;
    if (ulbId != null) {
      catUrl = environment.api.url + `pfmsAccount/get/${design_year}/${ulbId}`;
    } else {
      catUrl = environment.api.url + `pfmsAccount/get/${design_year}`;
    }

    return this.http.get(catUrl);
  }
}
