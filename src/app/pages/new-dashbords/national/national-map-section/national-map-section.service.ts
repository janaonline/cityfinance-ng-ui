import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NationalMapSectionService {
  constructor(private http: HttpClient) {}

  getNationalData(nationalInput) {
    return this.http.get(
      environment.api.url +
        `national-dashboard/data-availability?financialYear=${nationalInput.financialYear}&stateId=${nationalInput.stateId}&population=${nationalInput.populationCat}&ulbType=${nationalInput.ulbType}`
    );
  }
}
