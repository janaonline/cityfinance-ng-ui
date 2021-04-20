import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtiReportService {

  constructor(private http: HttpClient) { }

  getCategory() {

    let catUrl = 'https://democityfinanceapi.dhwaniris.in/api/v1/category';

     return  this.http.get(catUrl)
 }


 createAndStorePost( fd ){
     console.log(fd)

    return  this.http.post('https://democityfinanceapi.dhwaniris.in/api/v1/utilization-report',
    fd
     );
 }
 fetchPosts(){

  return this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/utilization-report/5ea036c2d6f1c5ee2e702e9e');

}

}




