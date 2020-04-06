import { USER_TYPE } from 'src/app/models/user/userType';

import { ACTIONS } from './actions';

export enum MODULES_NAME {
  ULB = "ULB",
  SELF_PROFILE_UPDATE = "selfProfileUpdate",
  MoHUA = "MoHUA",
  ULB_DATA_UPLOAD = "ULB_DATA_UPLOAD",
  TABLE_DOWNLOAD = "TABLE_DOWNLOAD"
}

export interface IModules {
  name: MODULES_NAME;
  access: {
    [key in ACTIONS]?: USER_TYPE[];
  };
  subModules?: { [key in MODULES_NAME]: IModules };
}

export const MODULES: { [key in MODULES_NAME]?: IModules } = {
  [MODULES_NAME.ULB_DATA_UPLOAD]: {
    name: MODULES_NAME.ULB_DATA_UPLOAD,
    access: {
      [ACTIONS.VIEW]: [USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN],
      [ACTIONS.CREATE]: [USER_TYPE.ULB],
      [ACTIONS.APPROVE]: [USER_TYPE.MoHUA, USER_TYPE.ADMIN],
      [ACTIONS.REJECT]: [USER_TYPE.MoHUA, USER_TYPE.ADMIN]
    }
  }
};
