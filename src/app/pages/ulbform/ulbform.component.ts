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
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
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
  ulbId = null;
  backHeader;
  backLink;
  validate = true;
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
      console.log("vallllll", val);
      const { id } = val;
      if (id) {
        this.id = id;
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

  lastRoleInMasterForm;
  design_year = JSON.parse(localStorage.getItem("Years"))["2021-22"];
  allStatus = {
    annualAccounts: { isSubmit: null, status: null },
    pfmsAccount: { isSubmit: null, status: null },
    plans: { isSubmit: null, status: null },
    slbForWaterSupplyAndSanitation: { isSubmit: null, status: null },
    utilReport: { isSubmit: null, status: null },
  };

  async ngOnInit() {
    this.ulbformService.allStatus.subscribe((status) => {
      for (const key in status) {
        debugger
        this.allStatus[key] = status[key];
        if (this.lastRoleInMasterForm != this.userLoggedInDetails.role) {
          this.allStatus[key].isSubmit = false;
        }
        if(this.lastRoleInMasterForm != this.userLoggedInDetails.role && this.userLoggedInDetails.role == "ULB" ){
          this.allStatus[key].isSubmit = true;
        }
        if(this.lastRoleInMasterForm == "MoHUA" && this.userLoggedInDetails.role == "STATE" ){
          this.allStatus[key].isSubmit = true;
        }
      }
      sessionStorage.setItem("allStatus", JSON.stringify(this.allStatus));
      console.log("red this", this.allStatus);
      this.checkValidationStatusOfAllForms();
    });
    this.ulbformService.allFormsData.subscribe((data) => {
      this.allFormsData = data;
      sessionStorage.setItem("allFormsData", JSON.stringify(data));
    });
    this.getStatus();
    this.getAllForm();
    this.submitted = false;
    // let masterData = JSON.parse(sessionStorage.getItem("masterForm"))
    // if (masterData) {
    //   console.log(masterData)
    //   this.submitted = masterData['isSubmit']
    // }
    // console.log("submitted", this.submitted)
  }

  getStatus() {
    this.id = sessionStorage.getItem("row_id");
    this.ulbformService.getStatus(this.design_year, this.id).subscribe(
      (res) => {
        this.lastRoleInMasterForm = res["response"].actionTakenByRole;
        this.ulbformService.allStatus.next(res["response"]["steps"]);
        this.submitted = res["response"]["isSubmit"];
        localStorage.setItem("finalSubmitStatus", this.submitted.toString());
        console.log("here");
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
        userData.ulb ?? sessionStorage.getItem("row_id"),
        "606aaf854dff55e6c075d219",
        "606aadac4dff55e6c075c507"
      )
      .subscribe((res) => {
        this.ulbformService.allFormsData.next(res[0]);
      });
  }

  public accessGrant() {
    this.ulbId = sessionStorage.getItem("ulb_id");
    console.log("pk12", this.ulbId);
    if (this.ulbId == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log("ifbl", this.isMillionPlus, this.isUA);
      this.backHeader = "15FC Grants for 2021-22";
      this.backLink = "../fc-home-page";
    } else {
      this.backHeader = "State Dashboard";
      this.backLink = "../stateform/dashboard";
      this.isMillionPlus = sessionStorage.getItem("isMillionPlus");
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
  submitted = false;
  finalSubmit() {
    let data = {
      design_year: this.design_year,
      isSubmit: true,
      status: "PENDING",
      actionTakenByRole: "ULB",
    };
    this.checkValidationStatusOfAllForms();
    if (!this.validate) {
      swal("Kindly Fill All the Forms Completely Before Submitting");
    } else {
      this.ulbformService.postMasterForm(data).subscribe(
        (res) => {
          console.log(res);
          this.submitted = true;
          swal(
            "Forms Successfully Submitted to be Reviewed by State and MoHUA"
          );
        },
        (err) => {
          console.log(err);
          swal("Form Submission Failed!");
        }
      );
    }
  }

  checkValidationStatusOfAllForms() {
    const eligibleForms = JSON.parse(sessionStorage.getItem("eligibleForms"));
    this.validate = true;
    let requiredStatus = {};
    //checking the status of each form
    eligibleForms.forEach((element) => {
      for (let key in this.allStatus) {
        if (element === "PFMS" && key === "pfmsAccount") {
          let change = sessionStorage.getItem("changeInPFMSAccount");
          if (change === "true") {
            this.validate = false;
            return;
          }
          requiredStatus[key] = this.allStatus[key]["isSubmit"];
        } else if (element === "Utilization Report" && key === "utilReport") {
          let change = sessionStorage.getItem("canNavigate");
          if (change === "false") {
            this.validate = false;
            return;
          }
          requiredStatus[key] = this.allStatus[key]["isSubmit"];
        } else if (element === "Annual Acconts" && key === "annualAccounts") {
          let change = sessionStorage.getItem("changeInAnnual");
          if (change === "true") {
            this.validate = false;
            return;
          }
          requiredStatus[key] = this.allStatus[key]["isSubmit"];
        } else if (
          element === "slbs" &&
          key === "slbForWaterSupplyAndSanitation"
        ) {
          let change = sessionStorage.getItem("changeInSLB");
          if (change === "true") {
            this.validate = false;
            return;
          }
          requiredStatus[key] = this.allStatus[key]["isSubmit"];
        } else if (element === "Plan water sanitation" && key === "plans") {
          let change = sessionStorage.getItem("changeInPlans");
          if (change === "true") {
            this.validate = false;
            return;
          }
          requiredStatus[key] = this.allStatus[key]["isSubmit"];
        }
      }
    });

    for (let key in requiredStatus) {
      if (!requiredStatus[key]) {
        this.validate = false;
      }
    }
    console.log("validate", this.validate);
  }
  finalStateAction() {
    this.ulbformService.postFinalActionByState(this.ulbId).subscribe(
      (res) => {
        console.log(res);
        swal("Action Successfully Submitted");
      },
      (err) => {
        console.log(err);
        swal("Action Submission Failed!");
      }
    );
  }
}
