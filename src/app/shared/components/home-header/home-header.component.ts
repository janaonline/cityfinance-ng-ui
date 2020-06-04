import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/users/profile/model/user-profile';

import { ACTIONS } from '../../../../app/util/access/actions';
import { MODULES_NAME } from '../../../../app/util/access/modules';
import { AuthService } from '../../../auth/auth.service';
import { USER_TYPE } from '../../../models/user/userType';
import { AccessChecker } from '../../../util/access/accessChecker';
import { AnalyticsTabs, IAnalyticsTabs } from './tabs';

@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"],
})
export class HomeHeaderComponent implements OnInit {
  isProduction: boolean;

  isLoggedIn = false;
  user: UserProfile = null;

  canViewUploadData = false;
  canViewULBSingUpListing = false;
  canViewUserList = false;
  canViewStateList = false;
  canViewPartnerList = false;
  canViewMoHUAList = false;
  canEditOwnProfile = false;

  canViewQuestionnaireForm = false;
  canViewQuestionnaireList = false;

  tabs: IAnalyticsTabs[] = [];

  USER_TYPE = USER_TYPE;
  private accessChecker = new AccessChecker();

  constructor(
    private router: Router,
    private authService: AuthService,
    private _elementRef: ElementRef,
    private renderer: Renderer2,
    private _ngZone: NgZone
  ) {
    Object.values(AnalyticsTabs).forEach((tab) => {
      this.tabs.push(tab);
    });
    this.initializeAccessChecking();
    this.router.events.subscribe((event) => {
      this.isLoggedIn = this.authService.loggedIn();

      this.initializeAccessChecking();

      if (this.isLoggedIn) {
        this.user = this.authService.decodeToken();
      }
    });
  }

  private initializeAccessChecking() {
    this.canViewUploadData = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.VIEW,
    });

    this.canEditOwnProfile = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.SELF_PROFILE,
      action: ACTIONS.EDIT,
    });

    this.canViewMoHUAList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.MoHUA,
      action: ACTIONS.VIEW,
    });

    this.canViewPartnerList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.PARTNER,
      action: ACTIONS.VIEW,
    });

    this.canViewStateList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.STATE,
      action: ACTIONS.VIEW,
    });

    this.canViewULBSingUpListing = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB_SIGNUP_REQUEST,
      action: ACTIONS.VIEW,
    });

    this.canViewUserList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.USERLIST,
      action: ACTIONS.VIEW,
    });

    this.canViewQuestionnaireList = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE_LIST,
      action: ACTIONS.VIEW,
    });

    this.canViewQuestionnaireForm = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.PROPERTY_TAX_QUESTIONNAIRE,
      action: ACTIONS.VIEW,
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
    this.initializedIsProduction();
    this.setTopRowSticky();
    // setTimeout(() => {
    //   this.initializeTranparenceyHandler();
    // }, 1111);
  }

  initializedIsProduction() {
    this.isProduction = !(
      window.location.hostname.includes("demo") ||
      window.location.hostname.includes("staging") ||
      window.location.hostname.includes("localhost")
    );
  }

  goToReportPage() {
    if (!window.location.pathname.includes("/dashboard/report")) {
      this.router.navigate(["/dashboard", "report"]);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
    this.isLoggedIn = false;
  }

  /**
   * @description Why are we setting sticky position explicity here using js/ts and not just by using
   * css?. It is so because we need to set sticky only 2nd row of navbar, and by just setting position
   * sticky to 2nd row wont work as this element <code> HomeHeaderComponent </code> gets out of view after
   * scroll. So we need to manually set the sticky position on HomeHeaderComponent. This can be done from
   * its parent component also, but it would be better to keep this functionality here only as it is its part,
   * and not the parent's component part.
   */
  private setTopRowSticky() {
    const element = document.getElementById("1stNavbarRow");
    if (!element) {
      return;
    }
    const topPosition = -element.offsetHeight + "px";

    this.renderer.setStyle(this._elementRef.nativeElement, "top", topPosition);
  }

  private initializeTranparenceyHandler() {
    this._ngZone.runOutsideAngular(() => {
      const root = document.getElementsByTagName("body")[0];
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.25, 0.4, 0.75, 1],
      };
      const observer = new IntersectionObserver((event) => {}, options);
      const target = document.getElementById("carousel");
      observer.observe(target);
    });
  }
}
