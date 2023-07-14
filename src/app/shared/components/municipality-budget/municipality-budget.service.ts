import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityBudgetService {

  constructor(
    private http: HttpClient
  ) { }

  getDocuments(params = {}) {
    return this.http.get(`${environment.api.url}municipality-budgets/documents`, { params })
  }


  getInsights(params = {}) {
    return this.http.get(`${environment.api.url}municipality-budgets/insights`, { params })
  }
}
