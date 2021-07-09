import { Component, OnInit } from '@angular/core';
import { IUserLoggedInDetails } from "../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../models/user/userType";
import { UserUtility } from "../../util/user/user";
import { ProfileService } from "../../users/profile/service/profile.service";
import { IState } from "../../models/state/state";
import { StateformsService } from './stateforms.service'
import { CommonService } from "src/app/shared/services/common.service";

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import { ActivatedRoute, Router } from '@angular/router';

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
  takeMoHUAAction = 'false';
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    public activatedRoute: ActivatedRoute,
    public stateformsService: StateformsService
  ) {
    this.activatedRoute.params.subscribe((val) => {
      console.log("vallllll", val);
      const { url } = val;
      console.log("vallllll", val, url);

    });
    this.takeMoHUAAction = localStorage.getItem('takeMoHUAAction');
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

    "steps": {
      "linkPFMS": {
        "rejectReason": null,
        "status": "",
        "isSubmit": false
      },
      "GTCertificate": {
        "rejectReason": null,
        "status": "",
        "isSubmit": false
      },
      "waterRejuventation": {
        "rejectReason": [],
        "status": "",
        "isSubmit": false
      },
      "actionPlans": {
        "rejectReason": [],
        "status": "",
        "isSubmit": false
      },
      "grantAllocation": {
        "isSubmit": false
      }
    },
    "latestFinalResponse": {
      "linkPFMS": {
        "rejectReason": null,
        "status": "",
        "isSubmit": false
      },
      "GTCertificate": {
        "rejectReason": null,
        "status": "",
        "isSubmit": false
      },
      "waterRejuventation": {
        "status": "",
        "rejectReason": [],
        "isSubmit": false
      },
      "actionPlans": {
        "status": "",
        "rejectReason": [],
        "isSubmit": false
      },
      "grantAllocation": {
        "isSubmit": false
      },
      "role": ""
    },
    "actionTakenByRole": "",
    "status": "",
    "isSubmit": false,

  };
  allStateFormsData
  ngOnInit(): void {
    this.submitted = false;

    sessionStorage.setItem("StateFormFinalSubmitByState", "false")
    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe((role) => {
      if (role === "STATE") {
        sessionStorage.setItem("StateFormFinalSubmitByState", "true")
      }
    })
    this.stateformsService.allStatusStateForms.subscribe((form) => {
      console.log('inside on init of state form')

      this.allStatusStateForms = form;

      sessionStorage.setItem("allStatusStateForms", JSON.stringify(this.allStatusStateForms));
      console.log('Status of ALl State Forms', this.allStatusStateForms)
      if (this.userLoggedInDetails.role === USER_TYPE.STATE) {
        this.checkValidationStatusOfAllForms();
      }
      // this.checkActionFinal();
    });
    this.stateformsService.allStateFormsData.subscribe((data) => {
      this.allStateFormsData = data;
      sessionStorage.setItem("allStateFormsData", JSON.stringify(data));
      console.log("allStateformStatus", data);
    });

    this.getStatus();
    this.getAllStateForms();
  }
  id = '';
  design_year = '606aaf854dff55e6c075d219'
  lastRoleInMasterForm
  submitted = false
  role = ''
  pfms_greenTick = false;
  gtc_greenTick = false;
  wr_greenTick = false;
  ap_greenTick = false;
  ga_greenTick = false;
  res;
  getStatus() {
    console.log('Please check user role', this.userLoggedInDetails.role)
    this.id = sessionStorage.getItem("state_id");
    this.stateformsService.getStateForm(this.design_year, this.id).subscribe(
      (res) => {
        console.log(this.userLoggedInDetails.role)
        console.log(res)
        this.res = res
        if (res['data']['latestFinalResponse'].hasOwnProperty('role') && this.userLoggedInDetails.role === "STATE") {
          if (res['data']['latestFinalResponse']['role'] === "MoHUA" && res['data']['actionTakenByRole'] === "STATE") {
            if (res['data']['steps']['linkPFMS']['isSubmit']) {
              this.pfms_greenTick = true;
            }
            if (res['data']['steps']['GTCertificate']['isSubmit']) {
              this.gtc_greenTick = true;
            }
            if (res['data']['steps']['waterRejuventation']['isSubmit']) {
              this.wr_greenTick = true;
            }
            if (res['data']['steps']['actionPlans']['isSubmit']) {
              this.ap_greenTick = true;
            }
            if (res['data']['steps']['grantAllocation']['isSubmit']) {
              this.ga_greenTick = true;
            }


          } else if ((res['data']['latestFinalResponse']['role'] === "STATE" && res['data']['actionTakenByRole'] === "STATE")
            || (res['data']['latestFinalResponse']['role'] === "STATE" && res['data']['actionTakenByRole'] === "MoHUA") ||
            (res['data']['latestFinalResponse']['role'] === "MoHUA" && res['data']['actionTakenByRole'] === "MoHUA")) {


            if ((res['data']['latestFinalResponse']['linkPFMS']['isSubmit'] &&
              res['data']['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['linkPFMS']['status'] === 'APPROVED')) {
              this.pfms_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['linkPFMS']['isSubmit'] &&
              res['data']['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['linkPFMS']['status'] === 'REJECTED')) {
              this.pfms_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['GTCertificate']['isSubmit'] &&
              res['data']['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['GTCertificate']['status'] === 'APPROVED')) {
              this.gtc_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['GTCertificate']['isSubmit'] &&
              res['data']['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['GTCertificate']['status'] === 'REJECTED')) {
              this.gtc_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
              res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'APPROVED')) {
              this.wr_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
              res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'REJECTED')) {
              this.wr_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['actionPlans']['isSubmit'] &&
              res['data']['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['actionPlans']['status'] === 'APPROVED')) {
              this.ap_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['actionPlans']['isSubmit'] &&
              res['data']['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['actionPlans']['status'] === 'REJECTED')) {
              this.ap_greenTick = false;
            }

            if (res['data']['latestFinalResponse']['grantAllocation']['isSubmit']) {
              this.ga_greenTick = true;
            } else {
              this.ga_greenTick = false;
            }
          }
        } else if (res['data']['latestFinalResponse'].hasOwnProperty('role') && this.userLoggedInDetails.role === "MoHUA") {
          if ((res['data']['latestFinalResponse']['role'] === "STATE" && res['data']['actionTakenByRole'] === "STATE")
            || (res['data']['latestFinalResponse']['role'] === "STATE" && res['data']['actionTakenByRole'] === "MoHUA")) {
            if (res['data']['steps']['linkPFMS']['isSubmit']) {
              this.pfms_greenTick = true;
            }
            if (res['data']['steps']['GTCertificate']['isSubmit']) {
              this.gtc_greenTick = true;
            }
            if (res['data']['steps']['waterRejuventation']['isSubmit']) {
              this.wr_greenTick = true;
            }
            if (res['data']['steps']['actionPlans']['isSubmit']) {
              this.ap_greenTick = true;
            }
            if (res['data']['steps']['grantAllocation']['isSubmit']) {
              this.ga_greenTick = true;
            }


          } else if (
            (res['data']['latestFinalResponse']['role'] === "MoHUA" && res['data']['actionTakenByRole'] === "STATE")
            || (res['data']['latestFinalResponse']['role'] === "MoHUA" && res['data']['actionTakenByRole'] === "MoHUA")
          ) {
            if ((res['data']['latestFinalResponse']['linkPFMS']['isSubmit'] &&
              res['data']['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['linkPFMS']['status'] === 'APPROVED')) {
              this.pfms_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['linkPFMS']['isSubmit'] &&
              res['data']['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['linkPFMS']['status'] === 'REJECTED')) {
              this.pfms_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['GTCertificate']['isSubmit'] &&
              res['data']['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['GTCertificate']['status'] === 'APPROVED')) {
              this.gtc_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['GTCertificate']['isSubmit'] &&
              res['data']['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['GTCertificate']['status'] === 'REJECTED')) {
              this.gtc_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
              res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'APPROVED')) {
              this.wr_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
              res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['waterRejuventation']['status'] === 'REJECTED')) {
              this.wr_greenTick = false;
            }

            if ((res['data']['latestFinalResponse']['actionPlans']['isSubmit'] &&
              res['data']['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['actionPlans']['status'] === 'APPROVED')) {
              this.ap_greenTick = true;
            } else if ((!res['data']['latestFinalResponse']['actionPlans']['isSubmit'] &&
              res['data']['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
              || (res['data']['latestFinalResponse']['actionPlans']['status'] === 'REJECTED')) {
              this.ap_greenTick = false;
            }

            if (res['data']['latestFinalResponse']['grantAllocation']['isSubmit']) {
              this.ga_greenTick = true;
            } else {
              this.ga_greenTick = false;
            }

          }

        }
        console.log('inside res of getStatus')
        this.lastRoleInMasterForm = res["data"]['actionTakenByRole'];

        this.stateformsService.allStatusStateForms.next(res["data"]);
        this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(res['data']["latestFinalResponse"]['role'])
        this.role = res["data"]["latestFinalResponse"]['role'];
        if (this.role === "STATE") {
          this.submitted = true;
        }
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
  finalActionDis = false;
  finalMoHUAAction() {
    let data = {
      design_year: this.design_year,
      isSubmit: true,
      actionTakenByRole: "MoHUA",
    };
    this.checkValidationStatusOfAllForms();
    if (this.validate) {
      this.stateformsService.finalReviewSubmitByMoHUA(data).subscribe(
        (res) => {
          this.finalActionDis = true;
          this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(data.actionTakenByRole)
          sessionStorage.setItem("StateFormFinalSubmitByState", "true")
          swal(
            "Forms Successfully Submitted to be Reviewed by State and MoHUA"
          );
        },
        (err) => {
          swal(
            "Form Submission Failed"
          );
        })
    }

  }

  getAllStateForms() {

    this.id = sessionStorage.getItem("state_id");
    this.stateformsService
      .getAllStateForms(this.design_year, this.id)
      .subscribe((res) => {
        this.stateformsService.allStateFormsData.next(res['data']);
      });
  }
  validate
  checkValidationStatusOfAllForms() {
    this.validate = true;
    let requiredStatus = {};
    for (let key in this.allStatusStateForms['steps']) {
      if (key === "GTCertificate") {
        let change = sessionStorage.getItem("changeInGTC");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms['steps'][key]["isSubmit"];
      } else if (key === "actionPlans") {
        let change = sessionStorage.getItem("changeInActionPlans");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms['steps'][key]["isSubmit"];
      } else if (key === "grantAllocation") {
        let change = sessionStorage.getItem("ChangeInGrantAllocation");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms['steps'][key]["isSubmit"];
      } else if (key === "linkPFMS") {
        let change = sessionStorage.getItem("changeInPFMSAccount");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms['steps'][key]["isSubmit"];
      } else if (key === "waterRejuventation") {
        let change = sessionStorage.getItem("changeInWaterRejenuvation");
        if (change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key] = this.allStatusStateForms['steps'][key]["isSubmit"];
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
          this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(data.actionTakenByRole)
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
