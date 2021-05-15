import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IUserLoggedInDetails } from "../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../models/user/userType";
import { UserUtility } from "../../util/user/user";
import { ProfileService } from "../../users/profile/service/profile.service";
import { IState } from "../../models/state/state";

import { CommonService } from "src/app/shared/services/common.service";
import { ActivatedRoute, Router } from '@angular/router';

import { UlbformPreviewComponent } from "./ulbform-preview/ulbform-preview.component";
import { WaterSanitationService } from "./water-sanitation/water-sanitation.service";
import { UlbformService } from "./ulbform.service";
@Component({
  selector: "app-ulbform",
  templateUrl: "./ulbform.component.html",
  styleUrls: ["./ulbform.component.scss"],
})
export class UlbformComponent implements OnInit {
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  isMillionPlus;
  isUA;
  id = null;

  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private wsService: WaterSanitationService,
    public dialog: MatDialog,
    public ulbformService: UlbformService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((val) => {
      const { id } = val;
      if (id) {
        this.id = id;
        console.log('stid',id)
      }
    else {

          }
    });
    this.accessGrant();
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    //  switch (this.userLoggedInDetails.role) {
    //     case USER_TYPE.PARTNER:
    //     case USER_TYPE.MoHUA:
    //     case USER_TYPE.ADMIN:
    //       this._router.navigate(["/fc-home-page"]);
    // }
  }

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
    });
  }

  design_year = JSON.parse(localStorage.getItem("Years"))["2021-22"];
  allStatus = {
    annualAccounts: { isSubmit: false },
    pfmsAccount: { isSubmit: false },
    plans: { isSubmit: false },
    slbForWaterSupplyAndSanitation: { isSubmit: false },
    utilReport: { isSubmit: false },
  };
  async ngOnInit() {
    this.ulbformService.allStatus.subscribe((status) => {
      this.allStatus = status;
      sessionStorage.setItem("allStatus", JSON.stringify(this.allStatus));
    });
    this.getStatus();
  }

  getStatus() {
    this.ulbformService.getStatus(this.design_year, this.id).subscribe(
      (res) => {
        this.ulbformService.allStatus.next(res["response"]["steps"]);
      },
      (err) => {
        this.ulbformService.allStatus.next(this.allStatus);
        console.log(err);
      }
    );
  }

  public accessGrant(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.isMillionPlus =  userData.isMillionPlus;
    this.isUA = userData.isUA;

  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("hi", data);
    });
    if (!this.userLoggedInDetails) {
      return this._router.navigate(["/login"]);
    }
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
  }
  dialogData;
  ulbPreview() {
    console.log("hello", this.dialogData);
    const dialogRef = this.dialog.open(UlbformPreviewComponent, {
      data: this.dialogData,
      width: "85vw",
      //   maxHeight: "95vh",
      height: "100%",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
  // this._matDialog.open(this.previewPopup, {
  //   width: "85vw",
  //   maxHeight: "95vh",
  //   height: "fit-content",
  //   panelClass: "XVfc-preview",
  //   disableClose: false,
  // });
}
