import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlbsGaurdGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let ulbId = sessionStorage.getItem("ulb_id");
      console.log("pk12", ulbId);
      if (ulbId == null) {
        let ulbRecord = JSON.parse(localStorage.getItem('userData'));
        let isU = ulbRecord.isUA;
        if(isU == 'Yes'){
          return true;
        }
        return false;
      }
      else {
        let isUa = sessionStorage.getItem("isUA");
        if(isUa == 'Yes'){
          return true;
        }
        return false;
      }
      // let ulbId = sessionStorage.getItem('ulb_id');
      // let ua;
      // if(ulbId == null){
      //   let ulbRecord = JSON.parse(localStorage.getItem('userData'));
      //    ua = ulbRecord.isUA;
      //   console.log('gaurd', ulbRecord)
      //   if(ua == 'Yes'){
      //     return true;
      //   }
      // }else{
      //    ua = sessionStorage.getItem('isUA')
      //    if(ua == 'Yes'){
      //     return true;
      //   }
      // }
      //   return false;
  }

}
