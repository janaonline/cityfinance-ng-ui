import { USER_TYPE } from '../../models/user/userType';

export class UserUtility {
  getUserType(): USER_TYPE {
    let userData = localStorage.getItem("userData");
    if (!userData) {
      return null;
    }
    userData = JSON.parse(userData);

    return userData["role"] ? userData["role"] : null;
  }
}
