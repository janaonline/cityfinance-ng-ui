import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  public badCredentials: Subject<boolean> = new Subject<boolean>();
  
  public helper = new JwtHelperService();
  // public decodedToken = this.helper.decodeToken(myRawToken);
  // public expirationDate = this.helper.getTokenExpirationDate(myRawToken);
  // public isExpired = this.helper.isTokenExpired(myRawToken);

  constructor(private http: HttpClient) {
  }

  authenticateUser(user) {
    this.http.post(environment.api.url + 'users/signin', user)
  }

  signin(user){
    return this.http.post(environment.api.url + 'users/signin', user);
  }

  signup(newUser){
    return this.http.post(environment.api.url + 'users/signup', newUser);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  loggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }

  logout() {
    localStorage.clear();
  }

}
