import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FiscalRankingService {

cardApi : any="https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent";

  constructor(private http: HttpClient) { }


getHeroes() {
  return this.http.get ("https://democityfinanceapi.dhwaniris.in/api/v1/FRHomePageContent")
}
}