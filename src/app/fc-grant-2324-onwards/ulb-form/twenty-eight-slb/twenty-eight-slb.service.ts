import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwentyEightSlbService {

  constructor(
    private http: HttpClient
  ) { }

  getForm(ulb: string, design_year: string, formId: string) {
    return this.http.get(`${environment.api.url}/28-slbs?ulb=${ulb}&design_year=${design_year}&formId=${formId}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/28-slbs`, body);
  }
}
