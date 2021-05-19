import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class Overview {

    constructor(private http: HttpClient) {

    }



    getData(design_year, rowId) {
      let catUrl;
      if(rowId != ''){
        console.log('rid', rowId)
         catUrl = environment.api.url + `masterForm/get/${design_year}/${rowId}`;
      }else{
        console.log('deignyr' , rowId)
        catUrl = environment.api.url + `masterForm/get/${design_year}`;
      }
        console.log('Get API HIt')
        // let catUrl = 'http://localhost:8080/api/v1/' + `masterForm/get/${design_year}`;

        return this.http.get(catUrl)
    }


}




