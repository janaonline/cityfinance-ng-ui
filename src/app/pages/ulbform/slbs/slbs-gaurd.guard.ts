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
      let ulbRecord = JSON.parse(localStorage.getItem('userData'));
          let ua = ulbRecord.isUA;
          if(ua == 'Yes'){
            return true;
          }
          console.log(ulbRecord)
          return false;
  }

}
