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
      console.log('login,usertype',this.loggedInUserType, this.userTypes);
      switch (this.loggedInUserType) {
        case USER_TYPE.ULB:
          this._router.navigate(["/home"]);
        //  this._router.navigate(["/ulbform/overview"]);
              break;
       // case USER_TYPE.STATE:
          //   this._router.navigate(["/stateform/dashboard"]);
          // break;
      //  case USER_TYPE.MoHUA:
      //   this._router.navigate(["/mohua/dashboard"]);
      //   break;
        // case USER_TYPE.PARTNER:
        // case USER_TYPE.ADMIN:
        // case undefined:
        // case null:
        //   return;
        // default:
        //   this._router.navigate(["/home"]);
        //   break;
      }
    }

  ngOnInit(): void {
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      console.log(this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_name',this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_code',this.states[this.userLoggedInDetails["state"]]?.code)
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
