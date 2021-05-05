import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class WaterSanitationService {

  constructor( private http: HttpClient) { }

  sendRequest(val){
   let sendUrl = environment.api.url + 'plans';
    return  this.http.post(sendUrl, val)

  }
  getFiles(){
    // let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    // ulbRecord = ulbRecord.ulb;
    // console.log(ulbRecord)
    let getFilesUrl = environment.api.url + 'plans/5ea036c2d6f1c5ee2e702e9e'
    return this.http.get(getFilesUrl)
  }
}
