import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IUserLoggedInDetails } from "../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../models/user/userType";
import { UserUtility } from "../../util/user/user";
import { ProfileService } from "../../users/profile/service/profile.service";
import { IState } from "../../models/state/state";

import { CommonService } from "src/app/shared/services/common.service";
import { ActivatedRoute, Router } from "@angular/router";

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
  validate = true
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
      console.log('vallllll', val)
      const { id } = val;
      if (id) {
        this.id = id;
        sessionStorage.setItem('row_id', id);
        return this._router.navigate(['/ulbform/overview',
        id]);
        console.log("pkstid", id);
      } else {
      }
    });
    this.accessGrant();
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    //  switch (this.userLoggedInDetails.role) {
    //    case USER_TYPE.ULB:

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
    annualAccounts: { isSubmit: null },
    pfmsAccount: { isSubmit: null },
    plans: { isSubmit: null },
    slbForWaterSupplyAndSanitation: { isSubmit: null },
    utilReport: { isSubmit: null },
  };

  async ngOnInit() {
    this.ulbformService.allStatus.subscribe((status) => {
      this.allStatus = status;
      sessionStorage.setItem("allStatus", JSON.stringify(this.allStatus));
    });
    this.ulbformService.allFormsData.subscribe((data) => {
      this.allFormsData = data;
      sessionStorage.setItem("allFormsData", JSON.stringify(data));
    });
    this.getStatus();
    this.getAllForm();
    this.checkValidationStatusOfAllForms();
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

  getAllForm() {
    let userData = JSON.parse(localStorage.getItem("userData"));

    this.ulbformService
      .getAllForms(
        userData.ulb,
        "606aaf854dff55e6c075d219",
        "606aadac4dff55e6c075c507"
      )
      .subscribe((res) => {
        this.ulbformService.allFormsData.next(res[0]);
      });
  }

  public accessGrant() {
    let ulbId = sessionStorage.getItem("ulb_id");
    console.log("pk12", ulbId);
    if (ulbId == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log("ifbl", this.isMillionPlus, this.isUA);
    }
    else {
      this.isMillionPlus = sessionStorage.getItem("isMillionPlus");
     if(this.isMillionPlus == null || this.isMillionPlus == undefined){

    }
      this.isUA = sessionStorage.getItem("isUA");
      console.log("pk_elseblock", this.isMillionPlus, this.isUA);
    }
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

  allFormsData;
  ulbPreview() {
    console.log("hello", this.allFormsData);
    const dialogRef = this.dialog.open(UlbformPreviewComponent, {
      data: this.allFormsData,
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
  finalSubmit() {
    this.checkValidationStatusOfAllForms();
    console.log(this.validate)

  }

  checkValidationStatusOfAllForms() {
    const allStatus = JSON.parse(sessionStorage.getItem("allStatus"));
    const eligibleForms = JSON.parse(sessionStorage.getItem("eligibleForms"));
    console.log(allStatus, eligibleForms)
    let requiredStatus = {}
    eligibleForms.forEach(element => {
      for (let key in allStatus) {
        if (element === 'PFMS' && key === 'pfmsAccount') {
          requiredStatus[key] = allStatus[key]['isSubmit']
        } else if (element === 'Utilization Report' && key === 'utilReport') {
          requiredStatus[key] = allStatus[key]['isSubmit']
        } else if (element === 'Annual Acconts' && key === 'annualAccounts') {
          requiredStatus[key] = allStatus[key]['isSubmit']
        } else if (element === 'slbs' && key === 'slbForWaterSupplyAndSanitation') {
          requiredStatus[key] = allStatus[key]['isSubmit']
        } else if (element === 'Plan water sanitation' && key === 'plans') {
          requiredStatus[key] = allStatus[key]['isSubmit']
        }
      }
    });
    for (let key in requiredStatus) {
      if (!requiredStatus[key]) {
        this.validate = false;
      }
    }
  }

}
