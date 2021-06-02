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

  constructor( private http: HttpClient) { }

  OpenModalTrigger = new Subject<any>()

  sendRequest(val){
   let sendUrl = environment.api.url + 'plans';
    return  this.http.post(sendUrl, val)

  }
  getFiles(){
    let getFilesUrl = environment.api.url + 'plans/606aaf854dff55e6c075d219'
    return this.http.get(getFilesUrl);
  }

}
