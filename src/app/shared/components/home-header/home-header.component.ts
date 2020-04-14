import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ACTIONS} from 'src/app/util/access/actions';
import {MODULES_NAME} from 'src/app/util/access/modules';

import {AuthService} from '../../../auth/auth.service';
import {AccessChecker} from '../../../util/access/accessChecker';

interface User {
  _id?: string;
}

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  isProduction: boolean;

  isLoggedIn = false;
  user: User = null;

  canViewUploadData = false;
  canEditOwnProfile = false;
  private accessChecker = new AccessChecker();

  constructor(private router: Router, private authService: AuthService) {
    this.initializeAccessChecking();
    this.router.events.subscribe(event => {
      this.isLoggedIn = this.authService.loggedIn();
      this.initializeAccessChecking();
      if (!this.user) {
        if (this.isLoggedIn) {
          this.user = this.authService.decodeToken();
        }
      }
    });
  }

  private initializeAccessChecking() {
    this.canViewUploadData = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.VIEW
    });

    this.canEditOwnProfile = this.accessChecker.hasAccess({
      moduleName: MODULES_NAME.SELF_PROFILE,
      action: ACTIONS.EDIT
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
    this.initializedIsProduction();
  }

  initializedIsProduction() {
    this.isProduction = !(
      window.location.hostname.includes('demo') ||
      window.location.hostname.includes('staging') ||
      window.location.hostname.includes('localhost')
    );
  }

  goToReportPage() {
    if (!window.location.pathname.includes('/dashboard/report')) {
      this.router.navigate(['/dashboard', 'report']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }
}
