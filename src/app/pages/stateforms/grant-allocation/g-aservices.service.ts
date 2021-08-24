import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GAservicesService {
  OpenModalTrigger = new Subject<any>();
  constructor(private http: HttpClient) { }

  sendRequest(val) {
    let sendUrl = environment.api.url + 'grantDistribution/save';
    return this.http.post(sendUrl, val)

  }
  getFiles(state_id) {
    let getFilesUrl = environment.api.url + `grantDistribution/get/606aaf854dff55e6c075d219?state_id=${state_id}`
    return this.http.get(getFilesUrl).pipe(catchError(error => {
      let errMes = 'An error occured.'
      console.log(error);
      if (error.status == '404') {
        errMes = "No records found."
        return throwError(errMes)
      } else {
        return throwError(errMes)
      }
    }));
  }
  checkFile(val) {
    let url = environment.api.url + `grantDistribution/upload?url=${val}&&design_year=606aaf854dff55e6c075d219`
    return this.http.get(url, { responseType: 'blob' })
  }
  downloadFile(): Observable<any> {
    return this.http.get(environment.api.url + 'grantDistribution/template', { responseType: 'blob' });
  }
}
