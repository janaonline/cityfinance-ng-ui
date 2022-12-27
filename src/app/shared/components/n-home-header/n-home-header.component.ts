import { Component, OnInit, HostListener, ViewChild, ElementRef } from "@angular/core";
import { NavigationEnd, Router, Event } from "@angular/router";
import { UserUtility } from "src/app/util/user/user";
import { Login_Logout } from "src/app/util/logout.util";
import { IUserLoggedInDetails } from "src/app/models/login/userLoggedInDetails";
import { AuthService } from "src/app/auth/auth.service";
import { MODULES_NAME } from "src/app/util/access/modules";
import { ACTIONS } from "src/app/util/access/actions";
import { AccessChecker } from '../../../util/access/accessChecker';
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
@Component({
  selector: "app-n-home-header",
  templateUrl: "./n-home-header.component.html",
  styleUrls: ["./n-home-header.component.scss"],
})
export class NHomeHeaderComponent implements OnInit {
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
  constructor(public _router: Router, private authService: AuthService,
    private newCommonService: NewCommonService) {
    this.initializeAccessChecking();
    this._router.events.subscribe((event) => {

      this.isLoggedIn = this.authService.loggedIn();
      this.user = this.isLoggedIn ? this.user : null;

      this.initializeAccessChecking();

      if (this.isLoggedIn) {
        UserUtility.getUserLoggedInData().subscribe((value) => {
          this.user = value;
        });
      }
      if (this.isLoggedIn) {
        this.btnName = "Logout";
      } else {
        this.btnName = "Login for 15th FC Grants";
      }
    });

    // if (this.isLoggedIn) {
    //   UserUtility.getUserLoggedInData().subscribe((value) => {
    //     this.user = value;
    //   });
    // }


  }
  private accessChecker = new AccessChecker();
  ngOnInit(): void {
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
  initializeAccessChecking(){
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
    if(type == '15th_Fc'){
      this._router.navigateByUrl("/fc-home-page");
    }else if(type == 'ranking'){
      this._router.navigateByUrl("/fiscal/login");
    }else if(type == 'logout'){
      this.authService.loginLogoutCheck.next(false);
      // this.newCommonService.setFormStatus2223.next(false);
      localStorage.clear();
      this.removeSessionItem();
      this.isLoggedIn = false;
      this._router.navigateByUrl("fiscal/home");
    }else {

    }
    // if (this.btnName == "Login for 15th FC Grants") {
    //   this._router.navigateByUrl("/fc-home-page");
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
    }else{
      this.isSticky = false;
    }

  }
}
