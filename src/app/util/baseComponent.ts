import { UserUtility } from './user/user';

export class BaseComponent {
  public isApiInProgress = false;
  public userUtil = new UserUtility();
}
