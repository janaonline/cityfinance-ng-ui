import { Component, OnDestroy, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { IUserLoggedInDetails } from "./models/login/userLoggedInDetails";
import { GlobalLoaderService } from "./shared/services/loaders/global-loader.service";
import { SessionService } from "./shared/services/session/session.service";
import { ProfileService } from "./users/profile/service/profile.service";
import { UserUtility } from "./util/user/user";
import { ConnectionService } from "ng-connection-service";
import { SweetAlert } from "sweetalert/typings/core";
import { CommonService } from "./shared/services/common.service";
const swal: SweetAlert = require("sweetalert");
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy, OnInit {
  title = "City Finance";
  googleTagId = environment.GoogleTagID;
  showLoader = false;
  sessionId: string;

  constructor(
    public globalLoader: GlobalLoaderService,
    private sessionService: SessionService,
    private profileService: ProfileService,
    private connectionService: ConnectionService,
    private commonService: CommonService,
    private matSnackBar: MatSnackBar
  ) {
    this.startSession();
    this.globalLoader
      .observerLoading()
      .pipe(delay(100))
      .subscribe((loadingStatus) => {
        this.showLoader = loadingStatus;
      });
    this.addCustomScripts();
    this.connectionService.monitor().subscribe((isConnected) => {
      if (!isConnected) {
        this.matSnackBar.open(
          `No Internet Connection!
        Please connect to internet`,
          null,
          {
            duration: 6600,
          }
        );
      }
    });
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
    // const id = environment.GoogleTagID;
    if (!this.googleTagId) return false;
    const scriptTag = document.createElement("script");
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${this.googleTagId}`;
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

    gtag("config", this.googleTagId);
  };

  private startSession() {
    this.sessionService.generateSessionID().subscribe((res) => {
      this.sessionId = res["data"]._id;
    });
  }

  ngOnInit(): void {
    this.commonService.getAllUlbs().subscribe(
      (res) => {
        localStorage.setItem("ulbList", JSON.stringify(res));
        let ulbStateCodeMapping = {},
          ulbCodeMapping = {},
          stateIdsMap = {},
          ulbMapping = {};
        for (const key in res.data) {
          const element = res.data[key];
          stateIdsMap[element["_id"]] = element.state;
          element.ulbs.map((value) => {
            ulbMapping[value._id] = value;
            ulbStateCodeMapping[value._id] = key;
            ulbCodeMapping[value._id] = value.code;
          });
        }
        localStorage.setItem(
          "ulbStateCodeMapping",
          JSON.stringify(ulbStateCodeMapping)
        );
        localStorage.setItem("ulbCodeMapping", JSON.stringify(ulbCodeMapping));
        localStorage.setItem("stateIdsMap", JSON.stringify(stateIdsMap));
        localStorage.setItem("ulbMapping", JSON.stringify(ulbMapping));
        console.log(res, "ULB LIST");
      },
      (error) => {}
    );
  }
  ngOnDestroy(): void {
    this.sessionService.endSession(this.sessionId).subscribe((res) => {});
  }
}
