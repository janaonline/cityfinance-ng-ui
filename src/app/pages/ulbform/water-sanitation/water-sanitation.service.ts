import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WaterSanitationService {
  ulbId;
  constructor( private http: HttpClient) {

  }

  OpenModalTrigger = new Subject<any>()

  sendRequest(val){
   let sendUrl = environment.api.url + 'plans';
    return  this.http.post(sendUrl, val)

  }
  getFiles(ulbId){
    let getFilesUrl = environment.api.url + `plans/606aaf854dff55e6c075d219?ulb=${ulbId}`
    return this.http.get(getFilesUrl);
  }
  stateActionPost(st){
    let utUrl = environment.api.url + 'plans/action '
       return this.http.post(utUrl, st)
  }

}
