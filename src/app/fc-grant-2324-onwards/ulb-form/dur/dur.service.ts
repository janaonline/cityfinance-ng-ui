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

  getForm() {
    return this.http.get(`${environment.api.url}/utilReport?ulb=5dd24b8f91344e2300876ca9&design_year=606aafc14dff55e6c075d3ec&formId=4`);
  }
  getProjects() {
    return this.http.get(`${environment.api.url}/getProjects?ulb=5dd24b8f91344e2300876ca9&design_year=606aafc14dff55e6c075d3ec&formId=4`);
  }
  postForm(body) {
    return this.http.post(`${environment.api.url}/utilReport/create`, body);
  }
}
