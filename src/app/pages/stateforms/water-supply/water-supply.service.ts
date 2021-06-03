import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WaterSupplyService {

  constructor(private http: HttpClient) { }


  getslbsData(){
     // return this.http.get(`${environment.api.url}xv-fc-form/state/606aaf854dff55e6c075d219`);
     let url ='https://60b5e300fe923b0017c84d35.mockapi.io/slbdataUAWise';
     return this.http.get(url);
    }
}
