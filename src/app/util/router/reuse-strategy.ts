import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, UrlSegment } from '@angular/router';

export class CustomRouteReuseStrategy extends RouteReuseStrategy {
  private readonly cachedRoute: { [key: string]: DetachedRouteHandle } = {};

  routesToCache = [
    "financial-statement/report/basic",
    "financial-statement/report/comparative-ulb",
  ];

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    let pathFromRoot: string;
    try {
      pathFromRoot = this.getPathFromRoot(route);
      return !!this.routesToCache.includes(pathFromRoot);
    } catch (error) {
      return false;
    }
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.cachedRoute[this.getPathFromRoot(route)] = handle;
    console.group(`Store: ${this.getPathFromRoot(route)}`);
    console.log(route, handle);
    console.groupEnd();
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cachedRoute[this.getPathFromRoot(route)];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // console.log("retreive", this.getPathFromRoot(route));
    // console.log(this.cachedRoute["financial-statement/report/basic"]);
    return this.cachedRoute[this.getPathFromRoot(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    /**
     * Due to how Financial Statement is structured, we cannot return false from here
     */

    return future.routeConfig === curr.routeConfig;
  }

  private getChildPath(route: ActivatedRouteSnapshot) {
    let child = route;
    let path = "";
    while (child) {
      path += child?.routeConfig?.path || "";
      if (child?.routeConfig?.path) {
        path += "/";
      }
      child = child.children[0];
    }
    return path;
  }

  private getPathFromRoot(route: ActivatedRouteSnapshot) {
    // return this.getChildPath(route);
    return (route["_urlSegment"]["segments"] as UrlSegment[])
      .map((seg) => seg.path)
      .join("/");
  }
}
