import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UlbformService {
  constructor(private http: HttpClient) {}

  getStatus(design_year) {
    return this.http.get(`${environment.api.url}masterForm/get/${design_year}`);
  }
}
