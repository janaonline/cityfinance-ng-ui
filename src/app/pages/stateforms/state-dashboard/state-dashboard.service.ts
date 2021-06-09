import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    sendRequest(val) {
        let sendUrl = environment.api.url + 'state/gtc/create';
        return this.http.post(sendUrl, val)

    }
    getCardData() {

        let apiUrl = 'https://60b5e300fe923b0017c84d35.mockapi.io/dashboard'
        return this.http.get(apiUrl).pipe(catchError(error => {
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

}
