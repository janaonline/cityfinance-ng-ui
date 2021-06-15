import { Component, OnInit } from '@angular/core';
import { IUserLoggedInDetails } from "../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../models/user/userType";
import { UserUtility } from "../../util/user/user";
import { ProfileService } from "../../users/profile/service/profile.service";
import { IState } from "../../models/state/state";

import { CommonService } from "src/app/shared/services/common.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-stateforms',
  templateUrl: './stateforms.component.html',
  styleUrls: ['./stateforms.component.scss']
})
export class StateformsComponent implements OnInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  isCollapsed = true;
  isCollapsedSer = true;
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router
    ) {
      this.initializeUserType();
      this.fetchStateList();
      this.initializeLoggedInUserDataFetch();
    }

  ngOnInit(): void {
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      console.log(this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_name',this.states[this.userLoggedInDetails["state"]]?.name)
    });

  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("h123", data);
    });
    if (!this.userLoggedInDetails) {
      return this._router.navigate(["/login"]);
    }
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
 }
}
