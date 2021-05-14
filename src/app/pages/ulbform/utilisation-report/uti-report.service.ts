import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UtiReportService {

  location:any = {
    lat: null,
    lng: null
  }
  constructor(private http: HttpClient) { }

  getCategory() {

   // let catUrl = 'https://democityfinanceapi.dhwaniris.in/api/v1/category';
     let catUrl = environment.api.url + 'category'
     //   return this.http.post(catUrl, fd)

     return  this.http.get(catUrl)
 }


 createAndStorePost( fd ){
     console.log(fd)
     let utUrl = environment.api.url + 'utilization-report'
     return this.http.post(utUrl, fd)
   // return  this.http.post('https://democityfinanceapi.dhwaniris.in/api/v1/utilization-report',
  //  fd
  //   );
 }
 fetchPosts(){
  let utFetchUrl = environment.api.url + 'utilization-report/5ea036c2d6f1c5ee2e702e9e/5ea036c2d6f1c5ee2e702e9e'
  return this.http.get(utFetchUrl);
 // return this.http.get('https://democityfinanceapi.dhwaniris.in/api/v1/utilization-report/5ea036c2d6f1c5ee2e702e9e');

}
setLocation(latLng){
  this.location.lat = latLng.lat;
  this.location.lng = latLng.long;
}
getLocation(){
  if(this.location.lat === null || this.location.lng === null)
    return null;
  return this.location;
}

}




