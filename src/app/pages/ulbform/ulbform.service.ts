import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UlbformService {
  allStatus = new Subject<any>();

  getObservedStatus() {
    return this.allStatus;
  }

  constructor(private http: HttpClient) {}

  getStatus(design_year, rowId) {
    if(rowId != null){
      return this.http.get(`${environment.api.url}masterForm/get/${design_year}/${rowId}`);
    }else{
      return this.http.get(`${environment.api.url}masterForm/get/${design_year}`);
    }

  }
}
