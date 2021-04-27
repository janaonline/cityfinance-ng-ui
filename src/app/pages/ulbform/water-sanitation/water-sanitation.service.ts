import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WaterSanitationService {

  constructor( private http: HttpClient) { }

  sendRequest(val){

    return  this.http.post('https://democityfinanceapi.dhwaniris.in/api/v1/plans', val)

  }
  getFiles(){
    // let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    // ulbRecord = ulbRecord.ulb;
    // console.log(ulbRecord)
    return this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/plans/5ea036c2d6f1c5ee2e702e9e')
  }
}
