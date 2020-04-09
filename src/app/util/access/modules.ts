import { USER_TYPE } from 'src/app/models/user/userType';

import { ACTIONS } from './actions';

export enum MODULES_NAME {
  TABLE_DOWNLOAD = "TABLE_DOWNLOAD",
  STATE = "STATE",
  USER = "USER",
  ULB_SIGNUP = "ULB_SIGNUP",
  ULB_PROFILE = "ULB_PROFILE",
  ULB_DATA_UPLOAD = "ULB_DATA_UPLOAD"
}

export interface IModules {
  name: MODULES_NAME;
  access: {
    [key in ACTIONS]?: USER_TYPE[];
  };
  subModules?: { [key in MODULES_NAME]: IModules };
}

export const MODULES: { [key in MODULES_NAME]: IModules } = {
  [MODULES_NAME.TABLE_DOWNLOAD]: {
    name: MODULES_NAME.TABLE_DOWNLOAD,
    access: {
      [ACTIONS.DOWNLOAD]: [
        USER_TYPE.USER,
        USER_TYPE.ULB,
        USER_TYPE.STATE,
        USER_TYPE.MoHUA,
        USER_TYPE.ADMIN
      ]
    }
  },

  [MODULES_NAME.ULB_DATA_UPLOAD]: {
    name: MODULES_NAME.ULB_DATA_UPLOAD,
    access: {
      [ACTIONS.VIEW]: [
        USER_TYPE.ULB,
        USER_TYPE.STATE,
        USER_TYPE.MoHUA,
        USER_TYPE.ADMIN
      ],
      [ACTIONS.UPLOAD]: [USER_TYPE.ULB],
      [ACTIONS.APPROVE]: [USER_TYPE.MoHUA, USER_TYPE.ADMIN],
      [ACTIONS.REJECT]: [USER_TYPE.MoHUA, USER_TYPE.ADMIN]
    }
  },

  [MODULES_NAME.ULB_SIGNUP]: {
    name: MODULES_NAME.ULB_SIGNUP,
    access: {
      [ACTIONS.VIEW]: [USER_TYPE.STATE, USER_TYPE.ADMIN],
      [ACTIONS.APPROVE]: [USER_TYPE.STATE, USER_TYPE.ADMIN],
      [ACTIONS.REJECT]: [USER_TYPE.STATE, USER_TYPE.ADMIN]
    }
  },

  [MODULES_NAME.ULB_PROFILE]: {
    name: MODULES_NAME.ULB_PROFILE,
    access: {
      [ACTIONS.VIEW]: [USER_TYPE.STATE, USER_TYPE.ADMIN],
      [ACTIONS.APPROVE]: [USER_TYPE.STATE, USER_TYPE.ADMIN],
      [ACTIONS.REJECT]: [USER_TYPE.STATE, USER_TYPE.ADMIN]
    }
  },

  [MODULES_NAME.USER]: {
    name: MODULES_NAME.USER,
    access: {
      [ACTIONS.VIEW]: [USER_TYPE.ADMIN],
      [ACTIONS.EDIT]: [USER_TYPE.ADMIN],
      [ACTIONS.DELETE]: [USER_TYPE.ADMIN]
    }
  },

  [MODULES_NAME.STATE]: {
    name: MODULES_NAME.STATE,
    access: {
      [ACTIONS.CREATE]: [USER_TYPE.ADMIN],
      [ACTIONS.VIEW]: [USER_TYPE.ADMIN],
      [ACTIONS.EDIT]: [USER_TYPE.ADMIN],
      [ACTIONS.DELETE]: [USER_TYPE.ADMIN]
    }
  }
};
