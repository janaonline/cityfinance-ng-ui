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
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cachedRoute[this.getPathFromRoot(route)];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.cachedRoute[this.getPathFromRoot(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    /**
     * Due to how Financial Statement is structured, we cannot return false from here
     */

    this.navigatingWithinFinancialStatementModule(curr, future);

    return future.routeConfig === curr.routeConfig;
  }

  private getPathFromRoot(route: ActivatedRouteSnapshot) {
    return (route["_urlSegment"]["segments"] as UrlSegment[])
      .map((seg) => seg.path)
      .join("/");
  }

  private navigatingWithinFinancialStatementModule(
    current: ActivatedRouteSnapshot,
    future: ActivatedRouteSnapshot
  ) {
    const currentPath = this.getPathFromRoot(current);
    const futurePath = this.getPathFromRoot(future);
    if (!currentPath?.trim() && !futurePath.trim()) {
      return true;
    }
  }
}
