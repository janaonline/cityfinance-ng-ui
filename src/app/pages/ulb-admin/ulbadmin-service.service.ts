import { HttpClient, HttpParams} from '@angular/common/http';
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
  // sortByState(name){

  //   let url = `${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219?${name}`;
  // //  `${environment.api.url}/report/dashboard/own-revenue-dependency?years=${year}`
  //   return this.http.get(url).pipe(catchError(error => {
  //     let errMes = 'An error occured.'
  //     console.log(error);
  //     if(error.status =='404'){
  //       errMes ="No records found."
  //       return throwError(errMes)
  //     }else{
  //       return throwError(errMes)
  //     }
  //   }));
  // }
  fetchXVFormDataList(params = {}, body = {}) {
    let queryParams = new HttpParams();
    for (const key in params) {
      queryParams = queryParams.set(
        key,
        typeof params[key] === "string" ? params[key].trim() : params[key]
      );
    }
    for (const key in body) {
      queryParams = queryParams.set(
        key,
        JSON.stringify(
          typeof body[key] === "string" ? body[key].trim() : body[key]
        )
      );
    }

    return this.http.get(`${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219`, {
      params: queryParams,
    });
}
fetchAllFormStatusList(params = {}, body = {}) {
  let queryParams = new HttpParams();
  for (const key in params) {
    queryParams = queryParams.set(
      key,
      typeof params[key] === "string" ? params[key].trim() : params[key]
    );
  }
  for (const key in body) {
    queryParams = queryParams.set(
      key,
      JSON.stringify(
        typeof body[key] === "string" ? body[key].trim() : body[key]
      )
    );
  }

  return this.http.get(`${environment.api.url}masterForm/dashboard-viewList/606aaf854dff55e6c075d219`, {
    params: queryParams,
  });
}
fetchEditDataList(params = {}, body = {}) {
  let queryParams = new HttpParams();
  for (const key in params) {
    queryParams = queryParams.set(
      key,
      typeof params[key] === "string" ? params[key].trim() : params[key]
    );
  }
  for (const key in body) {
    queryParams = queryParams.set(
      key,
      JSON.stringify(
        typeof body[key] === "string" ? body[key].trim() : body[key]
      )
    );
  }

  return this.http.get(`${environment.api.url}user/all?role=ULB`, {
    params: queryParams,
  });
}
}
