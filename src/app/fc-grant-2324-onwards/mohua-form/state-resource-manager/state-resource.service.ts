import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateResourceService {

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${environment.api.url}state-resources/list`);
  }

  getResourceList(params = {}) {
    return this.http.get(`${environment.api.url}state-resources/getResourceList`, { params });
  }

  createOrUpdate(body) {
    return this.http.post(`${environment.api.url}state-resources/createOrUpdate`, body);
  }

  removeStateFromFiles(data) {
    return this.http.post(`${environment.api.url}state-resources/removeStateFromFiles`, data);
  }
  
  getTemplate(templateName: string) {
    return this.http.get(`${environment.api.url}state-resources/template/${templateName}`, {
      responseType: 'blob'
    });
  }
}
