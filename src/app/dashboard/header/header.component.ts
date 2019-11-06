import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }

}
