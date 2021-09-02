import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditServicesService {

  constructor(private http: HttpClient) { }

  // sendRequest(val) {
  //     let sendUrl = environment.api.url + 'grantDistribution/save';
  //     return this.http.post(sendUrl, val)

  // }
  viewProfie(id) {
  //  https://democityfinanceapi.dhwaniris.in/api/v1/user/profile?_id=5fcb9f3c6e7a0139dc6b6298&role=ULB
      let getFilesUrl = environment.api.url + `/user/profile?_id=${id}&role=ULB`
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
  editProfie(id) {
   // http://localhost:4200/user/profile/view?id=5fcb9f3c6e7a0139dc6b6299&role=ULB&edit=true
        let getFilesUrl = environment.api.url + `/user/profile?_id=${id}&role=ULB&edit=true`
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
}
