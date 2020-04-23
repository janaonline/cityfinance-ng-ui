import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ACTIONS } from '../../../../app/util/access/actions';
import { MODULES_NAME } from '../../../../app/util/access/modules';
import { AuthService } from '../../../auth/auth.service';
import { USER_TYPE } from '../../../models/user/userType';
import { AccessChecker } from '../../../util/access/accessChecker';

interface User {
  _id?: string;
}

@Component({
  selector: "app-home-header",
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"],
})
export class HomeHeaderComponent implements OnInit {
  isProduction: boolean;

  isLoggedIn = false;
  user: User = null;

  canViewUploadData = false;
  canViewULBSingUpListing = false;
  canViewUserList = false;
  canViewStateList = false;
  canViewPartnerList = false;
  canViewMoHUAList = false;
  canEditOwnProfile = false;

  USER_TYPE = USER_TYPE;
  private accessChecker = new AccessChecker();

  constructor(private router: Router, private authService: AuthService) {
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
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
    this.initializedIsProduction();
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
}
