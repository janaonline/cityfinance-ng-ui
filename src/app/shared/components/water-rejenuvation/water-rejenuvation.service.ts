import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class WaterRejenuvationService {
  constructor(private http: HttpClient) {}

  postData(body) {
    return this.http.post(`${environment.api.url}WaterRejenuvation`,body);
  }

  getData(design_year){
    return this.http.get(`${environment.api.url}WaterRejenuvation/${design_year}`)
  }
}
