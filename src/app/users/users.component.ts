import {Component, OnInit} from '@angular/core';
import {USER_TYPE} from '../models/user/userType';
import {ILink} from '../shared/side-menu/side-menu.component';
import {AccessChecker} from '../util/access/accessChecker';
import {ACTIONS} from '../util/access/actions';
import {MODULES_NAME} from '../util/access/modules';
import {ProfileService} from './profile/service/profile.service';
import {UserUtility} from '../util/user/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  accessChecker = new AccessChecker();
  sideMenuContent: ILink[] = [
    {
      title: 'ULB Bulk Upload',
      type: 'link',
      route: ['/user/data-upload/bulk-upload'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.UPLOAD,
          moduleName: MODULES_NAME.ULBDataBULKEntry
        });
      }
    },
    {title: 'ULB Data', type: 'link', route: ['/user/data-upload/list']},
    {title: 'Links to User Module', type: 'other', route: []},
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
      title: 'MoHUA',
      type: 'link',
      route: [`/user/list/${USER_TYPE.MoHUA}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.MoHUA
        });
      }
    },
    {
      title: 'Partner',
      type: 'link',
      route: [`/user/list/${USER_TYPE.PARTNER}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.PARTNER
        });
      }
    },
    {
      title: 'State',
      type: 'link',
      route: [`/user/list/${USER_TYPE.STATE}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.STATE
        });
      }
    },
    {
      title: 'ULB Profile Edit',
      type: 'link',
      route: ['/user/profile/request']
    },
    {
      title: 'ULB Signup',
      type: 'link',
      route: [`/user/list/${USER_TYPE.ULB}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.ULB_PROFILE
        });
      }
    },
    {
      title: 'Users',
      type: 'link',
      route: [`/user/list/${USER_TYPE.USER}`],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.USERLIST
        });
      }
    },
    {
      title: 'Reports',
      type: 'other',
      route: [],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        });
      }
    },
    {
      title: 'Overall Report',
      type: 'link',
      route: ['/user/reports/overAll'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        }) && ([USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.MoHUA].includes(this.userUtility.getUserType()));

      }
    },
    {
      title: 'State Wise Report',
      type: 'link',
      route: ['/user/reports/state'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        }) && ([USER_TYPE.STATE, USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.MoHUA].includes(this.userUtility.getUserType()));
      }
    },
    {
      title: 'ULB Type Wise Report',
      type: 'link',
      route: ['/user/reports/ulb'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        }) && ([USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.MoHUA].includes(this.userUtility.getUserType()));
      }
    },
    {
      title: 'State and ULB Type Wise Report',
      type: 'link',
      route: ['/user/reports/stateUlb'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        }) && ([USER_TYPE.STATE, USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.MoHUA].includes(this.userUtility.getUserType()));
      }
    },

    {
      title: 'Usage Report',
      type: 'link',
      route: ['/user/reports/usage'],
      condition: () => {
        return this.accessChecker.hasAccess({
          action: ACTIONS.VIEW,
          moduleName: MODULES_NAME.REPORTS
        }) && ([USER_TYPE.ADMIN, USER_TYPE.PARTNER, USER_TYPE.MoHUA].includes(this.userUtility.getUserType()));
      }
    }
  ];

  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;

  constructor(private profileService: ProfileService, private userUtility: UserUtility) {
    this.initializeUSerType();
  }

  ngOnInit() {
  }

  private initializeUSerType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
}
