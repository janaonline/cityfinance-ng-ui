import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourcesServicesService {

  constructor(
    private http: HttpClient
  ) { }

  getScorePerValue() {
    return this.http.get(
      `${environment.api.url}scorePerformance`
    );
  }
}
