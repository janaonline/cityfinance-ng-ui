import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Ulb2223Guard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let ulbRecord = JSON.parse(localStorage.getItem("userData"));
    let isUlb = ulbRecord.role;
    if (isUlb == "ULB" || isUlb == "STATE") {
      return true;
    }
    return false;
  }
}