import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    let getFilesUrl = environment.api.url + 'plans/606aaf854dff55e6c075d219'
    return this.http.get(getFilesUrl).pipe(catchError(error => {
      let errMes = 'An error occured.'
      console.log(error);
      if(error.status =='404'){
        errMes ="No records found."
        return throwError(errMes)
      }else{
        return throwError(errMes)
      }
    }));
  }

}
