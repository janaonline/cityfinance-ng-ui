import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(
    private http: HttpClient,

  ) { }
  setFormStatusUlb: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  ulbLeftMenuComplete: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  stateLeftMenuComplete: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  formPostMethod(body: any, endPoints:string) {
    return this.http.post(
      `${environment.api.url}${endPoints}`,
      body
    );
  }
  getScroing(formName, dYr) {
    // gfc-odf-form-collection
    return this.http.get(`${environment.api.url}ratings?formName=${formName}&financialYear=${dYr}`);
  }

  formGetMethod(endPoints:string, queryParam:any) {
    return this.http.get(
      `${environment.api.url}${endPoints}`,
       {
        params: queryParam
       }
    );
  }
}
