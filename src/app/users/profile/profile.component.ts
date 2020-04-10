import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  profileData = null;
  showProfileComponent = false;

  constructor(
    private _profileService: ProfileService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      const param = { id: null };
      param.id = params.id
        ? params.id
        : this._profileService.getUserLoggedInId();
      console.log(params);
      this.fetchProfileData(param);
      this.setFormView();
    });
  }

  ngOnInit() {}

  fetchProfileData(params: {}) {
    this._profileService.getUserProfile(params).subscribe(res => {
      this.profileData = res["data"];
      console.log(res["data"]);
      this.userType = res["data"].role;
      this.showProfileComponent = true;

      // if (this.userType === USER_TYPE.ULB) {
      //   // this.showProfileComponent = true;
      // }
    });
  }

  private setFormView() {
    this.userType = this._profileService.getLoggedInUserType();
  }
}
