import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ReviewUlbFormService {

  constructor(private http: HttpClient) { }

  getData(formId) {
    console.log(`${environment.api.url}masterForm/history/${formId}`)
    return this.http.get(`${environment.api.url}masterForm/history/${formId}`);
  }
}
