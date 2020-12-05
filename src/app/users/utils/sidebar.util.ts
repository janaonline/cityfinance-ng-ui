import { BehaviorSubject } from 'rxjs';

/**
 * @description This Class is used to show/hide sidebar of user management part.
 */
export abstract class SidebarUtil {
  private static readonly _sidebarStatus = new BehaviorSubject(true);

  public static showSidebar() {
    SidebarUtil._sidebarStatus.next(true);
  }

  public static hideSidebar() {
    SidebarUtil._sidebarStatus.next(false);
  }

  public static getSidebarStatus() {
    return SidebarUtil._sidebarStatus;
  }
}
