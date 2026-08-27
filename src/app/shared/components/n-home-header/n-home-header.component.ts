import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { IUserLoggedInDetails } from "src/app/models/login/userLoggedInDetails";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { ACTIONS } from "src/app/util/access/actions";
import { MODULES_NAME } from "src/app/util/access/modules";
import { environment } from "src/environments/environment";
import { AccessChecker } from '../../../util/access/accessChecker';
import { CommonService } from "../../services/common.service";
import { GlobalLoaderService } from "../../services/loaders/global-loader.service";
import { UtilityService } from "../../services/utility.service";
import { UserInfoDialogComponent } from "../user-info-dialog/user-info-dialog.component";
import { HomeHeaderService } from "./home-header.service";
import { ROUTE_PAGES } from "./login-menu.constant";
import { NAV_MENU_ITEMS, NavMenuItem, matchesAnyRoutePrefix, resolveMenus } from "./nav-menu.config";

@Component({
  selector: "app-n-home-header",
  templateUrl: "./n-home-header.component.html",
  styleUrls: ["./n-home-header.component.scss"],
})
export class NHomeHeaderComponent implements OnInit, OnDestroy {
  loggedInUserDetails;
  loggedInUserType;
  btnName = "Login for 15th FC Grants";
  isLoggedIn = false;
  user: IUserLoggedInDetails = null;

  sticky: boolean = false;
  size;

  textSize = ["sm", "rg", "lg"];
  currentTextSize: any;
  canViewUserList = false;
  canViewULBSingUpListing = false;
  menus: NavMenuItem[] = [];
  showMobileNav = false;
  // Note: this branch predates the ROUTE_PAGES/login-menu.constant.ts array-driven
  // Login dropdown that exists on `development` — that file doesn't exist here, so
  // the Login dropdown below stays on its own pre-existing hardcoded markup/handlers
  // (loginLogout(...)), untouched, same as before this nav-bar-unification pass.
  /** UI's existing blog URL (previously only inline in blogsPage()/footer). No environment.blogUrl exists today. */
  private readonly blogUrl = 'https://blog.cityfinance.in/';
  private destroy$ = new Subject<void>();
  routePages = ROUTE_PAGES.filter(page => page.isMenu).map(page => {
    // environment.ts here predates `ui: { urlV2 }` (see loginLogout()'s '16thFC' branch and
    // resolveLinks()'s 'v2' case below) — same '/fc/' fallback used everywhere else in this file.
    const v2Base = ((environment as any)?.ui?.urlV2 as string | undefined) ?? '/fc/';
    return {
      ...page,
      href: v2Base.replace(/\/$/, '') + '/auth/login/' + page.type
    }
  });

  constructor(
    public _router: Router,
    private authService: AuthService,
    private newCommonService: NewCommonService,
    private dialog: MatDialog,
    private homeHeaderService: HomeHeaderService,
    private utilityService: UtilityService,
    private globalLoaderService: GlobalLoaderService,
    private commonService: CommonService
  ) {
    this.initializeAccessChecking();
    this._router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializeAccessChecking();
        this.refreshMenus();
      }
    });

    // Subscribe to session state for reactive UI updates
    this.authService.sessionState$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((sessionState) => {
      this.isLoggedIn = sessionState.isAuthenticated;
      this.user = sessionState.user;

      if (this.isLoggedIn) {
        this.btnName = "Logout";
      } else {
        this.btnName = "Login for 15th FC Grants";
      }

      this.refreshMenus();
    });
  }
  private accessChecker = new AccessChecker();
  isProd: boolean = false;
  ngOnInit(): void {
    this.isProd = environment?.isProduction;
    // this.authService.loginLogoutCheck.subscribe((res) => {
    //   console.log("loginLogoutCheck", res);
    //   if (res) {
    //     this.btnName = "Logout";
    //   }
    //   if (!res) {
    //     this.btnName = "Login for 15th FC Grants";
    //   }
    // });

    let getTextSize = JSON.parse(localStorage.getItem("myLSkey"));
    if (getTextSize) this.setFontSize(getTextSize.currentTextSize);

    this.refreshMenus();
  }
  initializeAccessChecking() {
    this.canViewUserList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.USERLIST,
      action: ACTIONS.VIEW,
    });
    this.canViewULBSingUpListing = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB_SIGNUP_REQUEST,
      action: ACTIONS.VIEW,
    });
  }

  setFontSize(size) {
    console.log('setFontSize', size)
    // this.size= size;
    let elem = document.documentElement;

    this.textSize.forEach((item) => elem.classList.remove(item));
    elem.classList.add(size);
    this.currentTextSize = size;
    localStorage.setItem(
      "myLSkey",
      JSON.stringify({
        currentTextSize: size,
      })
    );
  }

  @HostListener("window:scroll", ["$event"])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 50) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  removeSessionItem() {
    let postLoginNavigation = sessionStorage.getItem("postLoginNavigation"),
      sessionID = sessionStorage.getItem("sessionID");
    sessionStorage.clear();
    sessionStorage.setItem("sessionID", sessionID);
    if (postLoginNavigation)
      sessionStorage.setItem("postLoginNavigation", postLoginNavigation);
  }
  scroll() {
    window.scrollTo({
      top: 1000,

      behavior: "smooth",
    });
  }
  // routerLink="/fc-home-page";
  loginLogout(type) {
    localStorage.setItem('loginType', type);
    if (type == '16thFC') {
      // Real 16th FC login — cross-app into V2. environment.ts here predates `ui: { urlV2 }`
      // (see routePages above / resolveLinks()'s 'v2' case below), so fall back to '/fc/'.
      const v2Base = ((environment as any)?.ui?.urlV2 as string | undefined) ?? '/fc/';
      window.location.href = v2Base.replace(/\/$/, '') + '/auth/login/' + type;
    } else if (type == '15thFC') {
      this._router.navigateByUrl("/fc_grant");
    } else if (type == 'XVIFC') {
      this._router.navigateByUrl("/login/xvi-fc");
    } else if (type == 'state-dashboard') {
      this._router.navigateByUrl("/login/state-dashboard");
    } else if (type == 'ranking') {
      this._router.navigateByUrl("/rankings/login");
    } else if (type == 'logout') {
      this.authService.loginLogoutCheck.next(false);
      this.authService.logout().subscribe(() => {
        this.removeSessionItem();
        this.isLoggedIn = false;
        window.location.href = '/home';
      });
    } else if (type == 'XVIFC_coming_soon') {
      // XVIFC_PROD_CUTOVER: delete this branch (and its row in the .html) once the real
      // 16th FC login is ready for production.
      window.location.href = '/auth/login/16thfc';
    } else {
      const v2Base = ((environment as any)?.ui?.urlV2 as string | undefined) ?? '/fc/';
      window.location.href = v2Base.replace(/\/$/, '') + '/auth/login/' + type;
    }
    // if (type == '15thFC') {
    //   // this._router.navigateByUrl("/fc_grant");      
    // } else if (type == 'XVIFC') {
    //   this._router.navigateByUrl("/login/xvi-fc");
    // } else if (type == 'state-dashboard') {
    //   this._router.navigateByUrl("/login/state-dashboard");
    // } else if (type == 'ranking') {
    //   this._router.navigateByUrl("/rankings/login");
    // } else if (type == 'logout') {
    //   this.authService.loginLogoutCheck.next(false);
    //   this.authService.logout().subscribe(() => {
    //     this.removeSessionItem();
    //     this.isLoggedIn = false;
    //     window.location.href = '/home';
    //   });
    // } else {

    // }
    // if (this.btnName == "Login for 15th FC Grants") {
    //   this._router.navigateByUrl("/fc_grant");
    // }
    // if (this.btnName == "Logout") {
    //   this.btnName = "Login for 15th FC Grants";
    //   this.authService.loginLogoutCheck.next(false);
    //   // this.newCommonService.setFormStatus2223.next(false);
    //   localStorage.clear();
    //   this.removeSessionItem();
    //   this._router.navigateByUrl("/home");
    // }
  }

  public showRequestDemoPopup(): void {
    // Frontend config flags for handling the module.
    const moduleInfo = {
      saveToLocalStorage: false,
      endPoint: "request-demo/getDemoForm",
    };
    const downloadInfo = { module: "requestDemo" }; // Info about the file download for backend payload.
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      data: { downloadInfo, moduleInfo },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.globalLoaderService.showLoader();
        this.homeHeaderService.submitDemoData(data).subscribe({
          next: () => {
            this.utilityService.swalPopup("Sucess!", "We'll get back to you shortly!", "success");
            this.globalLoaderService.stopLoader();
          },
          error: (error) => {
            this.globalLoaderService.stopLoader();
            console.error("Error in updating request demo data: ", error)
            this.utilityService.swalPopup("Failed to submit data!", error?.error?.message, "error");
          },
        });
      }
    });
  }

  readonly readonlyEmails = ['doe@cityfinance.in', 'cca-mohua@gov.in', 'cag@cityfinance.in'];
  isReadonlyUser(): boolean {
    return !this.readonlyEmails.includes(this.user?.email);
  }

  isSticky = false;
  public screenHeight: any;
  elementPosition;
  @ViewChild('stickyMenu') menuElement: ElementRef;
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScrollTop() {
    const windowScroll = window.pageYOffset;
    // console.log('topppppp', );
    if (window.pageYOffset >= this.elementPosition) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }

  }

  /** Rebuilds `menus` from the shared NAV_MENU_ITEMS config — see ./CLAUDE.md, "Resolution pipeline". */
  private refreshMenus(): void {
    const resolved = resolveMenus(
      NAV_MENU_ITEMS,
      (item) => this.isMenuItemVisible(item),
      (item) => this.isActiveGroupChild(item),
    );
    this.menus = resolved.map((item) => this.resolveLinks(item));
  }

  /** True when `item` is this app's own route and the current URL is on/under it — see ./CLAUDE.md, "Active-route highlighting". */
  private isActiveGroupChild(item: NavMenuItem): boolean {
    if (item.hostApp !== 'ui') return false;
    const prefix = item.activePathPrefix ?? item.path;
    if (!prefix) return false;
    return matchesAnyRoutePrefix(this._router.url, [prefix]);
  }

  private inRole(roles: string[]): boolean {
    return roles.includes(this.user?.role ?? '');
  }

  private notInRole(roles: string[]): boolean {
    return !this.inRole(roles);
  }

  private isMenuItemVisible(item: NavMenuItem): boolean {
    if (item.isDisabled) return false;
    if (!item.apps.includes('ui')) return false;

    const v = item.visibility;
    if (!v) return true;

    if (v.requiresAuth && !this.isLoggedIn) return false;
    if (v.loggedOutOnly && this.isLoggedIn) return false;
    if (v.roles && !this.inRole(v.roles)) return false;
    if (v.excludeRoles && !this.notInRole(v.excludeRoles)) return false;
    if (v.isHiddenInProd && this.isProd) return false;
    if (v.readonlyGated && !this.isReadonlyUser()) return false;
    // Route-based gating — see ./CLAUDE.md, "How the three role/route dimensions actually combine".
    if (v.showOnlyOnRoutePrefixes && !matchesAnyRoutePrefix(this._router.url, v.showOnlyOnRoutePrefixes)) {
      return false;
    }
    if (v.hideOnRoutePrefixes && matchesAnyRoutePrefix(this._router.url, v.hideOnRoutePrefixes)) {
      return false;
    }
    if (
      v.hideWhenRoleOnRoute &&
      this.inRole(v.hideWhenRoleOnRoute.roles) &&
      matchesAnyRoutePrefix(this._router.url, v.hideWhenRoleOnRoute.routePrefixes)
    ) {
      return false;
    }
    if (
      v.moduleAccess &&
      !v.moduleAccess.some((ma) =>
        this.accessChecker.hasAccess({
          moduleName: ma.moduleName as MODULES_NAME,
          action: ma.action as ACTIONS,
        }),
      )
    ) {
      return false;
    }
    // `showMobileNav` doubles as "is the drawer open right now".
    if (v.showOnMobileOnly && !this.showMobileNav) return false;

    return true;
  }

  /** Turns hostApp/path into a concrete routerLink or href for THIS app (UI). */
  private resolveLinks(item: NavMenuItem): NavMenuItem {
    const resolved: NavMenuItem = { ...item };

    if (item.children?.length) {
      resolved.children = item.children.map((child) => this.resolveLinks(child));
    }

    switch (item.hostApp) {
      case 'ui':
        resolved.resolvedLink = item.path;
        break;
      case 'ssr':
        // SSR occupies the site root, so a plain relative path resolves
        // there via the shared-domain setup — same as today's
        // CommonService.getNationalPageUrl() (window.location.href = '/municipal-data/national').
        resolved.resolvedHref = item.path;
        break;
      case 'v2': {
        // This branch's environment.ts predates the `ui: { urlV1, urlV2 }`
        // structure that exists on `development` — fall back to the same
        // relative '/fc' prefix this app already hardcoded for V2 links
        // (e.g. the old literal href="/fc/xvifc-form") when it's absent.
        const v2Base = (environment as any)?.ui?.urlV2 as string | undefined;
        resolved.resolvedHref = item.path
          ? (v2Base ?? '/fc/').replace(/\/$/, '') + item.path
          : undefined;
        break;
      }
      case 'external':
        resolved.resolvedHref = item.id === 'blog' ? this.blogUrl : item.absoluteHref;
        break;
      default:
        break;
    }

    return resolved;
  }

  trackByMenuId(_index: number, menu: NavMenuItem): string {
    return menu.id;
  }

  toggleMobileNav(): void {
    this.showMobileNav = !this.showMobileNav;
    this.refreshMenus();
  }

  closeMobileNav(): void {
    if (this.showMobileNav) {
      this.showMobileNav = false;
      this.refreshMenus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
