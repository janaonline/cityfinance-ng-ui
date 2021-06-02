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
      return this.http.get('https://60b5e300fe923b0017c84d35.mockapi.io/users')
    }
    getUlbReview(){
      return this.http.get('https://60b5e300fe923b0017c84d35.mockapi.io/masterForm');
    }

    getWaterSupplyD(){
      return
    }
}
