import { USER_TYPE } from 'src/app/models/user/userType';

export interface UserProfile {
  name: string;
  email: string;
  mobileNo: string;
  designation: string;
  organisation: string;
  role: USER_TYPE.USER;
  _id: string;
}
