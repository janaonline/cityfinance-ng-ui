import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanGuardGuard  implements CanActivate, CanActivateChild {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let ulbId = sessionStorage.getItem("ulb_id");
      console.log("pk12", ulbId);
      if (ulbId == null) {
        let ulbRecord = JSON.parse(localStorage.getItem('userData'));
        let isM = ulbRecord.isMillionPlus;
        if(isM == 'No'){
          return true;
        }
        console.log(ulbRecord)
        return false;

      }
      else {
        let isMplus = sessionStorage.getItem("isMillionPlus");
        if(isMplus == 'No'){
          return true;
        }
        return false;
      }

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
