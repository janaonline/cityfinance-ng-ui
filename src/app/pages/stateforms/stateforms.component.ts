import { Component, OnInit } from '@angular/core';
import { IUserLoggedInDetails } from "../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../models/user/userType";
import { UserUtility } from "../../util/user/user";
import { ProfileService } from "../../users/profile/service/profile.service";
import { IState } from "../../models/state/state";
import { StateformsService } from './stateforms.service'
import { CommonService } from "src/app/shared/services/common.service";
import { Router } from '@angular/router';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-stateforms',
  templateUrl: './stateforms.component.html',
  styleUrls: ['./stateforms.component.scss']
})
export class StateformsComponent implements OnInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  isCollapsed = true;
  isCollapsedSer = true;
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    public stateformsService: StateformsService
  ) {


    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    console.log('login,usertype', this.loggedInUserType, this.userTypes);
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
        this._router.navigate(["/home"]);
        //  this._router.navigate(["/ulbform/overview"]);
        break;
      // case USER_TYPE.STATE:
      //   this._router.navigate(["/stateform/dashboard"]);
      // break;
      //  case USER_TYPE.MoHUA:
      //   this._router.navigate(["/mohua/dashboard"]);
      //   break;
      // case USER_TYPE.PARTNER:
      // case USER_TYPE.ADMIN:
      // case undefined:
      // case null:
      //   return;
      // default:
      //   this._router.navigate(["/home"]);
      //   break;
    }
  }
  allStatusStateForms = {
    linkPFMS: { isSubmit: null, status: null },
    GTCertificate: { isSubmit: null, status: null },
    waterRejuventation: { isSubmit: null, status: null },
    actionPlans: { isSubmit: null, status: null },
    grantAllocation: { isSubmit: null },
  };
  ngOnInit(): void {
    this.submitted = false;
    sessionStorage.setItem("StateFormFinalSubmitByState", "false")
    this.stateformsService.allStatusStateForms.subscribe((status) => {
      console.log('inside on init of state form')
      for (const key in status) {
        this.allStatusStateForms[key] = status[key];
      }
      sessionStorage.setItem("allStatusStateForms", JSON.stringify(this.allStatusStateForms));
      console.log('Status of ALl State Forms', this.allStatusStateForms)
      if (this.userLoggedInDetails.role === USER_TYPE.STATE) {
        this.checkValidationStatusOfAllForms();
      }
      // this.checkActionFinal();
    });

    this.getStatus();
  }
  id = '';
  design_year = '606aaf854dff55e6c075d219'
  lastRoleInMasterForm
  submitted = false
  getStatus() {
    this.id = sessionStorage.getItem("row_id");
    this.stateformsService.getStateForm(this.design_year, this.id).subscribe(
      (res) => {
        console.log('inside res of getStatus')
        this.lastRoleInMasterForm = res["response"]['actionTakenByRole'];
        this.stateformsService.allStatusStateForms.next(res["response"]["steps"]);
        this.submitted = res["response"]["isSubmit"];
        let finalSubmit = this.submitted;
        if (
          this.lastRoleInMasterForm != this.userLoggedInDetails.role &&
          this.userLoggedInDetails.role == "STATE"
        )
          this.submitted = !this.submitted;
        localStorage.setItem("finalSubmitStatus", this.submitted.toString());
        console.log("here");

      },
      (err) => {
        this.stateformsService.allStatusStateForms.next(this.allStatusStateForms);

        console.log(err);
      }
    );

  }
  validate
  checkValidationStatusOfAllForms() {
    this.validate = true;
    let requiredStatus = {};
    for (let key in this.allStatusStateForms) {
      if (key === "GTCertificate") {
        let change = sessionStorage.getItem("changeInGTC");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms[key]["isSubmit"];
      } else if (key === "actionPlans") {
        let change = sessionStorage.getItem("changeInActionPlans");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms[key]["isSubmit"];
      } else if (key === "grantAllocation") {
        let change = sessionStorage.getItem("ChangeInGrantAllocation");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms[key]["isSubmit"];
      } else if (key === "linkPFMS") {
        let change = sessionStorage.getItem("changeInPFMSAccount");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms[key]["isSubmit"];
      } else if (key === "waterRejuventation") {
        let change = sessionStorage.getItem("changeInWaterRejenuvation");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms[key]["isSubmit"];
      }
    }

    for (let key in requiredStatus) {
      if (!requiredStatus[key]) {
        this.validate = false;
      }
    }
    console.log(this.validate)
  }
  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      console.log(this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_name', this.states[this.userLoggedInDetails["state"]]?.name)
      localStorage.setItem('state_code', this.states[this.userLoggedInDetails["state"]]?.code)
    });

  }
  finalSubmit() {
    let data = {
      design_year: this.design_year,
      isSubmit: true,
      status: "PENDING",
      actionTakenByRole: "STATE",
    };
    this.checkValidationStatusOfAllForms();
    if (!this.validate) {
      swal("Kindly Fill All the Forms Completely Before Submitting");
    } else {
      this.stateformsService.finalSubmitbyState(data).subscribe(
        (res) => {
          console.log(res);
          this.submitted = true;
          this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(this.submitted)
          sessionStorage.setItem("StateFormFinalSubmitByState", "true")
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
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
      console.log("h123", data);
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
}
