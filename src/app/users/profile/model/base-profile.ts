import { USER_TYPE } from 'src/app/models/user/userType';

export interface IBaseProfileData {
  _id: string;
  name: string;
  role: USER_TYPE;
}
