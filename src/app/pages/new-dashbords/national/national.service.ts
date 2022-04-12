import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NationalService {
  constructor(private http: HttpClient) {}

  getNationalRevenueData(nationalInput) {
    return this.http.get(
      environment.api.url +
        `national-dashboard/revenue?financialYear=${nationalInput.financialYear}&type=${nationalInput.type}&formType=${nationalInput.formType}&stateId=${nationalInput.stateId}
      `
    );
  }

  getNationalRevenueMixData(RevenueMixInput) {
    return this.http.get(
      environment.api.url +
        `national-dashboard/revenue?financialYear=${RevenueMixInput?.financialYear}&formType=${RevenueMixInput?.formType}&stateId=${RevenueMixInput?.stateId}&type=${RevenueMixInput?.type} `
    );
  }
}
