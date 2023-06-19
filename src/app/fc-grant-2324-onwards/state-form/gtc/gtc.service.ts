import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GtcService {

  constructor(
    private http: HttpClient
  ) { }

  getBaseForm(state: string, design_year: string) {
    return this.http.get(`${environment.api.url}grant-transfer-certificate/installmentForm?design_year=${design_year}&state=${state}`);
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/grant-transfer-certificate/installmentForm`, body);
  }
  installmentAction(body) {
    return this.http.post(`${environment.api.url}/grant-transfer-certificate/installmentAction`, body);
  }
}
