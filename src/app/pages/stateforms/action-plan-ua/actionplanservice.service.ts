import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ActionplanserviceService {
  constructor(private http: HttpClient) {}

  getFormData() {
    return this.http.get(
      `${environment.api.url}ActionPlans/606aaf854dff55e6c075d219`
    );
  }
  postFormData(body) {
    return this.http.post(`${environment.api.url}ActionPlans`, body);
  }

  getCategory() {
    let catUrl = environment.api.url + "category";
    return this.http.get(catUrl);
  }

  getUlbsByState(state) {
    return this.http.get(`${environment.api.url}state/uas-ulb?state=${state}`);
  }
}
