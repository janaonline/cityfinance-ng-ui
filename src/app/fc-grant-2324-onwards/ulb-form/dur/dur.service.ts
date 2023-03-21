import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DurService {

  constructor(
    private http: HttpClient
  ) { }

  getForm(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}/utilReport?ulb=${ulb}&design_year=${design_year}&formId=4`);
  }
  getProjects(ulb: string, design_year: string) {
    return this.http.get(`${environment.api.url}/getProjects?ulb=${ulb}&design_year=${design_year}&formId=4`);
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/utilReport/create`, body);
  }
}
