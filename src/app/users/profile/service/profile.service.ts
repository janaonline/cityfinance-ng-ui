import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private _htttp: HttpClient) {}

  public getUserProfile(): UserProfile | void {}
}
