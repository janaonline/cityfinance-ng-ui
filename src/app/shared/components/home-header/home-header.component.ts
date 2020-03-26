import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';

interface User {
  _id?: string
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

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      this.isLoggedIn = this.authService.loggedIn();
      if (!this.user) {
        if (this.isLoggedIn) {
          this.user = this.authService.decodeToken().data;
        }
      }
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
