import { USER_TYPE } from 'src/app/models/user/userType';

import { IBaseProfileData } from './base-profile';

export interface UserProfile extends IBaseProfileData {
  email: string;
  mobileNo: string;
  designation: string;
  organisation: string;
  role: USER_TYPE.USER;
}
