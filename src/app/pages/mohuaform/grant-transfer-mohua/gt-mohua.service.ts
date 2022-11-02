import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class GtMohuaService {
  constructor(private http: HttpClient) {}

  getTemplate(yr) {
    return this.http.get(
      `${environment.api.url}template?csv=true&design_year=${yr}`,
      { responseType: "blob" }
    );
  }

  saveData(body) {
    return this.http.post(`${environment.api.url}uploadTemplate`, body, {
      responseType: "blob",
    });
  }
}
