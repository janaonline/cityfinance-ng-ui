import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-credit-rating',
  templateUrl: './credit-rating.component.html',
  styleUrls: ['./credit-rating.component.scss']
})
export class CreditRatingComponent implements OnInit {

  isLoggedIn = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
