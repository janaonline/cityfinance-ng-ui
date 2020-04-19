import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  public badCredentials: Subject<boolean> = new Subject<boolean>();

  public helper = new JwtHelperService();
  // public decodedToken = this.helper.decodeToken(myRawToken);
  // public expirationDate = this.helper.getTokenExpirationDate(myRawToken);
  // public isExpired = this.helper.isTokenExpired(myRawToken);

  constructor(private http: HttpClient) {}

  authenticateUser(user) {
    this.http.post(environment.api.url + "users/signin", user);
  }

  signin(user) {
    return this.http.post(environment.api.url + "login", user);
  }

  signup(newUser) {
    return this.http.post(environment.api.url + "register", newUser);
  }

  decodeToken() {
    return this.helper.decodeToken(this.getToken());
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  loggedIn() {
    console.log(`token`, this.getToken());

    console.log(
      `is token expired? `,
      this.helper.isTokenExpired(this.getToken())
    );

    return !this.helper.isTokenExpired(this.getToken());
  }

  logout() {
    localStorage.clear();
  }
}
