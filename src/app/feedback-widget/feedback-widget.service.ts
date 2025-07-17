import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FeedbackWidgetService {
  private EXCLUDED_URLS = [
    "^/fc-home-page$",
    "^/profile-update$",
    "^/fc_grant(/.*)?$",        
    "^/login(/.*)?$",
    "^/mohua(/.*)?$",
    "^/mohua-form(/.*)?$",
    "^/mohua2223(/.*)?$",
    "^/stateform(/.*)?$",
    "^/state-form(/.*)?$",
    "^/stateform2223(/.*)?$",
    "^/ulbform(/.*)?$",
    "^/ulbform2223(/.*)?$",
    "^/ulb-form(/.*)?$",
    "^/user(/.*)?$",
    "^\/rankings\/(?!home($|\/)).*$"
  ];

  constructor(private router: Router) {
    this.trackRouteChanges();
  }

  private routerChange$ = new BehaviorSubject<boolean>(false);

  get onRouteChange() {
    return this.routerChange$.asObservable();
  }

  private trackRouteChanges() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url) => {
        if (!this.isExcludedRoute(url)) this.routerChange$.next(true);
        else this.routerChange$.next(false);
      });
  }

  private isExcludedRoute(url: string): boolean {
    return this.EXCLUDED_URLS.some((pattern) => new RegExp(pattern).test(url));
  }
}
