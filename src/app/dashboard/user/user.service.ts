import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserProfile } from '../../users/profile/model/user-profile';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(environment.api.url + "users/profile");
  }

  update(userInfo) {
    return this.http.put(environment.api.url + "users/update", userInfo);
  }

  onboard(newUser) {
    return this.http.post(environment.api.url + "users/onboard", newUser);
  }

  getUsers(body: {}) {
    return this.http.post<UserProfile[]>(environment.api.url + "user", body);
  }
}
