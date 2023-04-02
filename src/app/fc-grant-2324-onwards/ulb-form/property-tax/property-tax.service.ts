import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PropertyTaxService {

  constructor(
    private http: HttpClient,
  ) { }

  getForm(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}propTaxOp/view?ulb=${ulb}&design_year=${design_year}`);
  }

  postData(body) {
    return this.http.post(`${environment.api.url}propTaxOp/create-form`, body);
  }
}
