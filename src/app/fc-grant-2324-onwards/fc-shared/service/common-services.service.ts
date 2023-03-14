import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(
    private http: HttpClient,

  ) { }


  formPostMethod(body: any) {
    return this.http.post(
      `${environment.api.url}gfc-odf-form-collection`,
      body
    );
  }

  // formGetMethod(params) {
  //   // gfc-odf-form-collection
  //   return this.http.get(
  //     `${environment.api.url}${params?.endPoints}?ulb=${params.ulb}&design_year=${params.design_year}&isGfc=${params.isGfc}&formId=${params.formId}`
  //   );
  // }
  getScroing(formName, dYr) {
    // gfc-odf-form-collection
    return this.http.get(`${environment.api.url}ratings?formName=${formName}&financialYear=${dYr}`);
  }
  formGetMethod(endPoints, queryParam) {
    return this.http.get(
      `${environment.api.url}${endPoints}`,
       {
        params: queryParam
       }
    );
  }
}
