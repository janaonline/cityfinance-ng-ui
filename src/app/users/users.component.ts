import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUserLoggedInDetails } from '../models/login/userLoggedInDetails';
import { IState } from '../models/state/state';
import { USER_TYPE } from '../models/user/userType';
import { CommonService } from '../shared/services/common.service';
import { ILink } from '../shared/side-menu/side-menu.component';
import { AccessChecker } from '../util/access/accessChecker';
import { ProfileService } from './profile/service/profile.service';
import { defaultSideBarContents, sideMenuForStateUser, sideMenuForULBUser } from './sidebar-menus';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private _commonService: CommonService,
    private _router: Router
  ) {
    this.initializeUserType();
    this.initializeSidebarContents();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
  }

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  accessChecker = new AccessChecker();

  SideBarContents: { title: string; subMenus: ILink[] }[] = [];

  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
    });
  }

  ngOnInit() {}

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }

  private initializeSidebarContents() {
    switch (this.loggedInUserType) {
      case USER_TYPE.ADMIN:
      case USER_TYPE.MoHUA:
      case USER_TYPE.PARTNER:
        this.SideBarContents = [...defaultSideBarContents];
        console.log(defaultSideBarContents);
        return;
      case USER_TYPE.STATE:
        this.SideBarContents = <any>sideMenuForStateUser;
        return;
      case USER_TYPE.ULB:
        this.SideBarContents = <any>sideMenuForULBUser;
    }
  }

  private initializeLoggedInUserDataFetch() {
    this.userLoggedInDetails = this.profileService.getUserLoggedInDetails();
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
