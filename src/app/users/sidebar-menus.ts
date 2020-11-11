import { USER_TYPE } from '../models/user/userType';
import { ILink } from '../shared/side-menu/side-menu.component';
import { AccessChecker } from '../util/access/accessChecker';
import { ACTIONS } from '../util/access/actions';
import { MODULES_NAME } from '../util/access/modules';

const accessChecker = new AccessChecker();

export const defaultSideBarContents: { title: string; subMenus: ILink[] }[] = [
  {
    title:
      "<span>15<sup style='text-transform: capitalize'>th</sup> FC GRANTS</span>",
    subMenus: [
      {
        title: "ULB Data Upload Tracker",
        type: "link",
        route: ["/user/data-upload/list"],
      },
    ],
  },
  {
    title: "User Management",
    subMenus: [
      {
        title: "MoHUA",
        type: "link",
        route: [`/user/list/${USER_TYPE.MoHUA}`],
        condition: () => {
          return accessChecker.hasAccess({
            action: ACTIONS.VIEW,
            moduleName: MODULES_NAME.MoHUA,
          });
        },
      },
      {
        title: "Partners",
        type: "link",
        route: [`/user/list/${USER_TYPE.PARTNER}`],
        condition: () => {
          return accessChecker.hasAccess({
            action: ACTIONS.VIEW,
            moduleName: MODULES_NAME.PARTNER,
          });
        },
      },
      {
        title: "States",
        type: "link",
        route: [`/user/list/${USER_TYPE.STATE}`],
        condition: () => {
          return accessChecker.hasAccess({
            action: ACTIONS.VIEW,
            moduleName: MODULES_NAME.STATE,
          });
        },
      },
      {
        title: "ULBs",
        type: "link",
        route: [`/user/list/${USER_TYPE.ULB}`],
      },
      // {
      //   title: "ULBs",
      //   type: "other",
      //   subMenus: [
      //     {
      //       title: "Profile Update Request",
      //       type: "link",
      //       route: ["/user/profile/request"],
      //     },
      //     {
      //       title: "Sign Up Request",
      //       type: "link",
      //       route: [`/user/list/${USER_TYPE.ULB}`],
      //       condition: () => {
      //         return accessChecker.hasAccess({
      //           action: ACTIONS.VIEW,
      //           moduleName: MODULES_NAME.ULB,
      //         });
      //       },
      //     },
      //   ],
      // },

      {
        title: "Users",
        type: "link",
        route: [`/user/list/${USER_TYPE.USER}`],
        condition: () => {
          return accessChecker.hasAccess({
            action: ACTIONS.VIEW,
            moduleName: MODULES_NAME.USERLIST,
          });
        },
      },
    ],
  },
  // {
  //   title: "Reports",
  //   subMenus: [
  //     {
  //       title: "Overall Report",
  //       type: "link",
  //       route: ["/user/reports/overAll"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.OVERALL_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "State Wise Report",
  //       type: "link",
  //       route: ["/user/reports/state"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.STATE_WISE_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "ULB Type Wise Report",
  //       type: "link",
  //       route: ["/user/reports/ulb"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.ULB_TYPE_WISE_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "State and ULB Type Wise Report",
  //       type: "link",
  //       route: ["/user/reports/stateUlb"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.STATE_AND_ULB_TYPE_WISE_REPORT,
  //         });
  //       },
  //     },

  //     {
  //       title: "Usage Report",
  //       type: "link",
  //       route: ["/user/reports/usage"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.USAGE_REPORT,
  //         });
  //       },
  //     },
  //   ],
  // },
  // {
  //   title: "Temporary Links",
  //   subMenus: [
  //     {
  //       title: "ULB Bulk Upload",
  //       type: "link",
  //       route: ["/user/data-upload/bulk-upload"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.UPLOAD,
  //           moduleName: MODULES_NAME.ULBDataBULKEntry,
  //         });
  //       },
  //     },
  //     {
  //       title: "Annual Accounts",
  //       type: "link",
  //       route: ["/user/annual-accounts/view"],
  //     },
  //   ],
  // },
];

export const sideMenuForStateUser: { title: string; subMenus: ILink[] }[] = [
  {
    title:
      "<span>15<sup style='text-transform: capitalize'>th</sup> FC GRANTS</span>",
    subMenus: [
      {
        title: "ULB Data Upload Tracker",
        type: "link",
        route: ["/user/data-upload/list"],
      },
    ],
  },
  // {
  //   title: "State Profile",
  //   subMenus: [
  //     {
  //       title: "Update Profile",
  //       type: "link",
  //       route: ["/user/profile/view"],
  //     },
  //   ],
  // },
  {
    title: "User Management",
    subMenus: [
      // {
      //   title: "Profile Update",
      //   type: "link",
      //   route: ["/user/profile/request"],
      // },
      {
        title: "ULB Sign Up List",
        type: "link",
        route: [`/user/list/${USER_TYPE.ULB}`],
      },
    ],
  },

  // {
  //   title: "Reports",
  //   subMenus: [
  //     {
  //       title: "Overall Report",
  //       type: "link",
  //       route: ["/user/reports/overAll"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.OVERALL_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "State Wise Report",
  //       type: "link",
  //       route: ["/user/reports/state"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.STATE_WISE_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "ULB Type Wise Report",
  //       type: "link",
  //       route: ["/user/reports/ulb"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.ULB_TYPE_WISE_REPORT,
  //         });
  //       },
  //     },
  //     {
  //       title: "State and ULB Type Wise Report",
  //       type: "link",
  //       route: ["/user/reports/stateUlb"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.STATE_AND_ULB_TYPE_WISE_REPORT,
  //         });
  //       },
  //     },

  //     {
  //       title: "Usage Report",
  //       type: "link",
  //       route: ["/user/reports/usage"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.VIEW,
  //           moduleName: MODULES_NAME.USAGE_REPORT,
  //         });
  //       },
  //     },
  //   ],
  // },
  // {
  //   title: "Temporary Links",
  //   subMenus: [
  //     {
  //       title: "ULB Bulk Upload",
  //       type: "link",
  //       route: ["/user/data-upload/bulk-upload"],
  //       condition: () => {
  //         return accessChecker.hasAccess({
  //           action: ACTIONS.UPLOAD,
  //           moduleName: MODULES_NAME.ULBDataBULKEntry,
  //         });
  //       },
  //     },
  //     {
  //       title: "Annual Accounts",
  //       type: "link",
  //       route: ["/user/annual-accounts/view"],
  //     },
  //   ],
  // },
];

export const sideMenuForULBUser: { title: string; subMenus: ILink[] }[] = [
  // {
  //   title: "ULB DATA",
  //   subMenus: [
  //     {
  //       title: "XV Finance Commission Grants",
  //       type: "link",
  //       route: ["/user/data-upload/list"],
  //     },
  //   ],
  // },
  {
    title: "ULB Profile",
    subMenus: [
      { title: "Update Profile", route: ["/user/profile/view"], type: "link" },
      {
        title: "Profile Update Tracker",
        route: ["/user/profile/request"],
        type: "link",
      },
    ],
  },
];
