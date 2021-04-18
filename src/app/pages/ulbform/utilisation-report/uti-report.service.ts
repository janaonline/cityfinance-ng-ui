import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtiReportService {

  constructor(private http: HttpClient) { }

  getConfig() {

    let configUrl = 'https://democityfinanceapi.dhwaniris.in/api/v1/category';

     return  this.http.get(configUrl)
 }
}
