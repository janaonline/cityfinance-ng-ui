import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class StateformsService {
    allStatus = new Subject<any>();

    getObservedStatus() {
        return this.allStatus;
    }

    constructor(private http: HttpClient) { }

    getStatus(design_year) {
        return this.http.get(`${environment.api.url}masterForm/get/${design_year}`);
    }

    getulbProfile(){
      return this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/user/profile')
    //  return this.http.get(`${environment.api.url}user/all?role=ULB&filter=%7B%7D&sort=%7B%7D&skip=0&limit=10`);
    }
    getUlbReview(){
    //  this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/masterForm/getAll/606aaf854dff55e6c075d219');
      return this.http.get(`${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219`);
    }
    updateRequest(body){
      return this.http.post(`${environment.api.url}ulb-update-request`, body);

    }

}
