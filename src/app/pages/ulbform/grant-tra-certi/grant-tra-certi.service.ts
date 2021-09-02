import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class GTCertificateService {
    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get(`${environment.api.url}state/gtc/get/606aaf854dff55e6c075d219`);

    }



    getProcessStatus(id) {
        return this.http.get(`${environment.api.url}getProcessStatus/${id}`)
    }
}
