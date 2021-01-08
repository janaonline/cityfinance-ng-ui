import { USER_TYPE } from 'src/app/models/user/userType';

import { UserUtility } from '../user/user';
import { ACTIONS } from './actions';
import { MODULES, MODULES_NAME } from './modules';
import { Injectable } from "@angular/core";

@Injectable()
export class AccessChecker {
  private modules = MODULES;
  private userUtil = new UserUtility();

  get MODULES() {
    return this.modules;
  }

  public hasAccess(option: { moduleName: MODULES_NAME; action: ACTIONS }) {
    const moduleFound = this.modules[option.moduleName];
    if (!moduleFound) {
      return false;
    }

    const action = moduleFound.access[option.action];
    if (!action) {
      return false;
    }

    const logginUserType = this.userUtil.getUserType();
    if (!logginUserType) {
      return false;
    }
    return !!action.find((userType: USER_TYPE) => userType === logginUserType);
  }
}
