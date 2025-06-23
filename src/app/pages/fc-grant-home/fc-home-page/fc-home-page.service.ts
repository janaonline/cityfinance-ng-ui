import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FcHomePageService {
    constructor(private http: HttpClient) { }

    getYearsData(ulb: string) {
        return this.http.get(environment.api.url + `budget-documents/getYearsData?ulb=${ulb}`)
    }
 
}