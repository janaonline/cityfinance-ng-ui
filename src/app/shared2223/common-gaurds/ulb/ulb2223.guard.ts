import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ulb2223Guard implements CanActivate {
  constructor(
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    let userType = ulbRecord?.role;
    if (userType == 'MoHUA' || userType == 'ADMIN' || userType == 'PARTNER' || userType == 'STATE' || userType == 'ULB') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
