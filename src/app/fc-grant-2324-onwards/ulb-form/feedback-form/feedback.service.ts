import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    constructor(private http: HttpClient) { }

    public getForm(designYear: string, ulbId: string) {
        return this.http.get(environment.api.url + `ulb-feedback/view?designYear=${designYear}&ulbId=${ulbId}`)
    }

    public submitForm(designYear: string, payload: any) {
        return this.http.post(environment.api.url + `ulb-feedback/submit-form?designYear=${designYear}`, payload)
    }
}