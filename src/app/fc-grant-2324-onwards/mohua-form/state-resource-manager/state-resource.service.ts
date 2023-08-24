import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourceListResponse } from './model';

@Injectable({
  providedIn: 'root'
})
export class StateResourceService {

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<ResourceListResponse>(`${environment.api.url}state-resources/list`);
  }

  getResourceList(params = {}) {
    return this.http.get(`${environment.api.url}state-resources/getResourceList`, { params });
  }

  createOrUpdate(body) {
    return this.http.post(`${environment.api.url}state-resources/createOrUpdate`, body, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return { type: 'json', data: response.body };
        } else {
          return { type: 'blob', data: response.body };
        }
      }), catchError((error: HttpErrorResponse) => {
        return new Observable((observer) => {
          if (error.error instanceof Blob && error.error.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const errorText = JSON.parse(event.target.result);
              observer.error({error: errorText, type: 'blob'});
            };
            reader.readAsText(error.error);
          } else {
            observer.error({type: 'blob', error});
          }
        });
      })
    );
  }

  removeStateFromFiles(data) {
    return this.http.post(`${environment.api.url}state-resources/removeStateFromFiles`, data);
  }

  getTemplate(templateName: string, params) {
    return this.http.get(`${environment.api.url}state-resources/template/${templateName}`, {
      params,
      responseType: 'blob'
    });
  }
}
