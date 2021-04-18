import { Component, OnInit } from '@angular/core';

import { IUserLoggedInDetails } from '../../models/login/userLoggedInDetails';
import { USER_TYPE } from '../../models/user/userType';
import { UserUtility } from '../../util/user/user';
import { ProfileService } from '../../users/profile/service/profile.service';
import { IState } from '../../models/state/state';

import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ulbform',
  templateUrl: './ulbform.component.html',
  styleUrls: ['./ulbform.component.scss']
})
export class UlbformComponent implements OnInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;

 constructor(private _commonService: CommonService,private profileService: ProfileService,private _router: Router) {

  this.initializeUserType();

   this.fetchStateList();
   this.initializeLoggedInUserDataFetch();

 }


 private fetchStateList() {
   this._commonService.fetchStateList().subscribe((res) => {
     this.states = {};
     res.forEach((state) => (this.states[state._id] = state));

   });
 }

  ngOnInit(): void {
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
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
