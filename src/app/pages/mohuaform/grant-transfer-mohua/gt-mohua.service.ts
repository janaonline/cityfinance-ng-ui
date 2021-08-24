import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class GtMohuaService {
  constructor(private http: HttpClient) {}

  getTemplate() {
    return this.http.get(
      `${environment.api.url}template?csv=true&design_year=606aaf854dff55e6c075d219`,
      { responseType: "blob" }
    );
  }

  saveData(body) {
    return this.http.post(`${environment.api.url}uploadTemplate`, body, {
      responseType: "blob",
    });
  }
}
