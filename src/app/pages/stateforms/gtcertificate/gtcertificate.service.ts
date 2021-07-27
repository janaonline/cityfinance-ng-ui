import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GTCertificateService {

    constructor(private http: HttpClient) { }
    postStateAction(data) {
        let utUrl = environment.api.url + 'state/gtc/action'
        return this.http.post(utUrl, data)
    }
    sendRequest(val) {
        let sendUrl = environment.api.url + 'state/gtc/create';
        return this.http.post(sendUrl, val)
    }
    getFiles(state_id) {

        let getFilesUrl = environment.api.url + `state/gtc/get/606aaf854dff55e6c075d219?state_id=${state_id}`
        return this.http.get(getFilesUrl).pipe(catchError(error => {
            let errMes = 'An error occured.'
            console.log(error);
            if (error.status == '404') {
                errMes = "No records found."
                return throwError(errMes)
            } else {
                return throwError(errMes)
            }
        }));
    }

    getCondition() {
        let sendUrl = environment.api.url + 'state/condition';
        return this.http.get(sendUrl)
    }

}
