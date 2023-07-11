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

  get() {
    return this.http.get(`${environment.api.url}annual-accounts/datasets?year=2020-21&type=Raw%20Data%20PDF&category=income&state=&ulb=&globalName=`)
  }
}
