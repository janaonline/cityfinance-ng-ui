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
  private destroy$ = new Subject<void>();

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

  blogsPage() {
    window.open('https://blog.cityfinance.in/', '_blank');
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
    if (type == '15thFC') {
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
    } else {

    }
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

  getNationalPageUrl() {
    this.commonService.getNationalPageUrl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
