import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  constructor(private _http: HttpClient) {}

  fetchCreditRatingDetailedReport() {
    return this._http.get(`/assets/files/credit-rating-detailed.json`);
  }

  fetchCreditRatingReport() {
    return this._http.get(`/assets/files/credit-rating.json`);
  }
}
