import { ObjectID } from '../document.type';
import { USER_TYPE } from '../user/userType';

export interface IUserLoggedInDetails {
  email: string;
  isActive: boolean;
  name: string;
  role: USER_TYPE;
  state?: ObjectID;
  ulb?: ObjectID;
}
