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
    return this.http.get(`${environment.api.url}xv-fc-form/state/606aaf854dff55e6c075d219`);

// https://democityfinanceapi.dhwaniris.in/api/v1/xv-fc-form/state/606aaf854dff55e6c075d219

    //  let url ='';
    //  return this.http.get(url);
    }
}
