
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ReviewStateService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${environment.api.url}stateMasterForm/getAll/606aaf854dff55e6c075d219`);
  }
  getHistoryData(formId) {
    return this.http.get(`${environment.api.url}stateMasterForm/history/${formId}`);
  }

}
