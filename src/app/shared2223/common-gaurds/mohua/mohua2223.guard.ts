import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_TYPE } from 'src/app/models/user/userType';

@Injectable({
  providedIn: 'root'
})
export class Mohua2223Guard implements CanActivate {
  constructor(
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    let userType = ulbRecord?.role;
    if ([USER_TYPE.MoHUA, USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.PMU].includes(userType)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
