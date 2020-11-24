import { USER_TYPE } from 'src/app/models/user/userType';

import { UserUtility } from '../user/user';

export class BaseComponent {
  public userUtil = new UserUtility();

  public loggedInUserType: USER_TYPE;

  public USER_TYPE = USER_TYPE;

  constructor() {
    this.loggedInUserType = this.userUtil.getUserType();
  }
}
