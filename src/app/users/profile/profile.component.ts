import { Component, OnInit } from '@angular/core';

import { USER_TYPE } from '../../models/user/userType';
import { ProfileService } from './service/profile.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  USER_TYPE = USER_TYPE;
  userType;

  constructor(private _profileService: ProfileService) {
    this.setFormView();
  }

  ngOnInit() {}

  private setFormView() {
    this.userType = this._profileService.getUserType();
    console.log(this.userType, this.userType === USER_TYPE.USER);
  }
}
