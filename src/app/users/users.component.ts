import { Component, OnInit } from '@angular/core';

import { USER_TYPE } from '../models/user/userType';
import { ILink } from '../shared/side-menu/side-menu.component';
import { AccessChecker } from '../util/access/accessChecker';
import { ACTIONS } from '../util/access/actions';
import { MODULES_NAME } from '../util/access/modules';
import { ProfileService } from './profile/service/profile.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  accessChecker = new AccessChecker();
  sideMenuContent: ILink[] = [
    {
      title: "ULB Bulk Upload",
      type: "link",
      route: ["/user/data-upload/bulk-upload"],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.UPLOAD,
          moduleName: MODULES_NAME.ULBDataBULKEntry
        });
      }
    },
    { title: "ULB", type: "link", route: ["/user/data-upload"] },
    { title: "Links to User Module", type: "other", route: [] },
    // {
    //   title: "Admin",
    //   type: "link",
    //   route: [`/user/list/${USER_TYPE.ADMIN}`]
    //   // condition: () => {
    //   //   return this.accessChecker.hasAccess({
    //   //     action: ACTIONS.VIEW,
    //   //     moduleName: MODULES_NAME.ADMIN
    //   //   });
    //   // }
    // },
    {
      title: "MoHUA",
      type: "link",
      route: [`/user/list/${USER_TYPE.MoHUA}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.MoHUA
        });
      }
    },
    {
      title: "Partner",
      type: "link",
      route: [`/user/list/${USER_TYPE.PARTNER}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.PARTNER
        });
      }
    },
    {
      title: "State",
      type: "link",
      route: [`/user/list/${USER_TYPE.STATE}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.STATE
        });
      }
    },
    {
      title: "ULB Profile Edit",
      type: "link",
      route: ["/user/profile/request"]
    },
    {
      title: "ULB Signup List",
      type: "link",
      route: [`/user/list/${USER_TYPE.ULB}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.ULB_PROFILE
        });
      }
    },
    {
      title: "Users",
      type: "link",
      route: [`/user/list/${USER_TYPE.USER}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.USERLIST
        });
      }
    }
  ];

  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;

  constructor(private profileService: ProfileService) {
    this.initializeUSerType();
  }

  ngOnInit() {}

  private initializeUSerType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
}
