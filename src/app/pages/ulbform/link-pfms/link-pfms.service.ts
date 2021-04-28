import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class LinkPFMSAccount {

    constructor(private http: HttpClient) { }

    postData(fd) {
        console.log(fd)
        let catUrl = environment.api.url + 'pfmsAccount/create'
        return this.http.post(catUrl, fd)
    }

    getData(design_year) {
        console.log('Get API HIt')
        let catUrl = environment.api.url + `pfmsAccount/get/${design_year}`;
        return this.http.get(catUrl)
    }


}




