import { Component, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IUserLoggedInDetails } from './models/login/userLoggedInDetails';
import { GlobalLoaderService } from './shared/services/loaders/global-loader.service';
import { SessionService } from './shared/services/session/session.service';
import { ProfileService } from './users/profile/service/profile.service';
import { UserUtility } from './util/user/user';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  title = "City Finance";

  showLoader = false;
  sessionId: string;

  constructor(
    public globalLoader: GlobalLoaderService,
    private sessionService: SessionService,
    private profileService: ProfileService
  ) {
    this.startSession();
    this.globalLoader
      .observerLoading()
      .pipe(delay(100))
      .subscribe((loadingStatus) => {
        this.showLoader = loadingStatus;
      });
    this.addCustomScripts();
    let userData: any = localStorage.getItem("userData");
    if (!userData) return;
    try {
      userData = JSON.parse(userData) as IUserLoggedInDetails;
      this.profileService.getUserProfile({}).subscribe((response) => {
        const name = response["data"]["name"];
        userData["name"] = name;
        new UserUtility().updateUserDataInRealTime(userData);
      });
    } catch (error) {}
  }

  /**
   * @description Why we are adding script like this instead off adding
   * it in the index.html?
   *
   * It is because the GoogleTagId is different for developement and
   * production use, and we cannot writing dynamic values in index.html
   * as of now.
   */
  private addCustomScripts() {
    const id = environment.GoogleTagID;
    if (!id) return false;
    const scriptTag = document.createElement("script");
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    scriptTag.async = true;
    scriptTag.onload = this.onGoogleTagLoad;
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  }

  onGoogleTagLoad = () => {
    const dataLayer = (<any>window).dataLayer || [];
    function gtag(...args: any[]) {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-171288029-1");
  };

  private startSession() {
    this.sessionService.generateSessionID().subscribe((res) => {
      this.sessionId = res["data"]._id;
    });
  }

  ngOnDestroy(): void {
    this.sessionService.endSession(this.sessionId).subscribe((res) => {});
  }
}
