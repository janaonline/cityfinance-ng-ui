import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UlbadminServiceService {

  constructor(private http: HttpClient) { }

  getMasterTabel(){
    let getFilesUrl = environment.api.url + 'masterForm/getAll/606aaf854dff55e6c075d219';
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
  getStateName(){
    let url = environment.api.url + 'state';
    return this.http.get(url).pipe(catchError(error => {
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
