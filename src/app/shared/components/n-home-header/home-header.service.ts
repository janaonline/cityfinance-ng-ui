import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UtilityService } from "../../services/utility.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeHeaderService {
  constructor(
    private http: HttpClient,
    public utilityService: UtilityService
  ) {}

  public submitDemoData(payload: any): Observable<Object> {
    return this.http.post(
      environment.api.url + "request-demo/postDemoData",
      payload
    );
  }
}
