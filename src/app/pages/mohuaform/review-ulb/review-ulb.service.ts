
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ReviewUlbService {

  constructor(private http: HttpClient) { }

  getData(formId) {
    console.log(`${environment.api.url}masterForm/history/${formId}`)
    return this.http.get(`${environment.api.url}masterForm/history/${formId}`);
  }

  downloadData() {
    return this.http.get(`${environment.api.url}masterForm/getAll/606aaf854dff55e6c075d219?csv=true`,
      { responseType: 'blob' });

  }
}
