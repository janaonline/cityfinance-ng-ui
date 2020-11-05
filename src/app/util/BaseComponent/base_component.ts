import { USER_TYPE } from 'src/app/models/user/userType';

import { UserUtility } from '../user/user';

export class BaseComponent {
  protected userUtil = new UserUtility();

  protected loggedInUser: USER_TYPE;

  protected USER_TYPE = USER_TYPE;

  constructor() {
    this.loggedInUser = this.userUtil.getUserType();
  }
}
