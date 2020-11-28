import { Subject } from 'rxjs';

export class Login_Logout {
  private static logoutEvent = new Subject<{
    redirectLink?: string;
  }>();

  static getListenToLogoutEvent() {
    return Login_Logout.logoutEvent;
  }

  public static logout(option?: { redirectLink: string }) {
    Login_Logout.logoutEvent.next(option);
  }
}
