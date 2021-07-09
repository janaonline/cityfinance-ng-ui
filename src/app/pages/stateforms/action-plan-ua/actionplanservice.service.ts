import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ActionplanserviceService {
  constructor(private http: HttpClient) { }

  getFormData(state_id) {
    return this.http.get(
      `${environment.api.url}ActionPlans/606aaf854dff55e6c075d219?state_id=${state_id}`
    );
  }
  postFormData(body) {
    return this.http.post(`${environment.api.url}ActionPlans`, body);
  }

  getCategory() {
    let catUrl = environment.api.url + "category";
    return this.http.get(catUrl);
  }

  getUlbsByState(state_id) {
    return this.http.get(`${environment.api.url}state/uas-ulb?state_id=${state_id}`);
  }

  postStateAction(data) {
    let utUrl = environment.api.url + 'ActionPlans/action'
    return this.http.post(utUrl, data)
  }
}
