import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrbanReformsIvService {

  constructor(private http: HttpClient) {}

  getStates() {
    return this.http.get(environment.api.url + "state");
  }

  getDocumentsByState(params = {}) {
    return this.http.get(`${environment.api.url}urban-reforms-iv/list`, { params });
  }
}
