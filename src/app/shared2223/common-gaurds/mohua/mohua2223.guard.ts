import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Mohua2223Guard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    let userType = ulbRecord?.role;
    if (userType == 'MoHUA' || userType == 'ADMIN' || userType == 'PARTNER') {
      return true;
    }
    return false;
  }
}
