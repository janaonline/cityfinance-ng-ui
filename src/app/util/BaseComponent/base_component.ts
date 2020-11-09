import { USER_TYPE } from 'src/app/models/user/userType';

import { UserUtility } from '../user/user';

export class BaseComponent {
  public userUtil = new UserUtility();

  public loggedInUser: USER_TYPE;

  public USER_TYPE = USER_TYPE;

  constructor() {
    this.loggedInUser = this.userUtil.getUserType();
  }
}
