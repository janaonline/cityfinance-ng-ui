import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { StateAllPreviewComponent } from './state-all-preview/state-all-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { StateDashboardService } from './state-dashboard/state-dashboard.service';

@Component({
  selector: 'app-stateforms',
  templateUrl: './stateforms.component.html',
  styleUrls: ['./stateforms.component.scss']
})
export class StateformsComponent implements OnInit, AfterViewInit {

  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  isCollapsed = true;
  isCollapsedSer = true;
  takeMoHUAAction = 'false';
  toolTipContentN = '';
  toolTipContentC = '';
  sticky: boolean = false;
  stiHieght: boolean = false;
  elementPosition: any;
  totalUas = true;
  backHead = '';
  backHeadStyle = false;
  public screenHeight: any;
  @ViewChild('stickyMenu') menuElement: ElementRef;

  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public stateformsService: StateformsService,
    public stateDashboardService: StateDashboardService,
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
        break;
      case USER_TYPE.STATE:
        this.toolTipContentC = 'Completed'
        this.toolTipContentN = 'Not Completed'
        this.backHead = 'Approve Claims for 2021-2022'
        this.backHeadStyle = true;
        break;
      case USER_TYPE.MoHUA:
      case USER_TYPE.PARTNER:
      case USER_TYPE.ADMIN:
        this.toolTipContentC = 'Reviewed'
        this.toolTipContentN = 'Not Reviewed'
        this.backHead = 'MoHUA Dashboard'

        //   this._router.navigate(["/mohua/dashboard"]);
        break;
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
      }

    },
    "actionTakenByRole": "",
    "status": "",
    "isSubmit": false,

  };
  allStateFormsData
  ngOnInit(): void {
    sessionStorage.setItem("disableAllForms", "false")
    sessionStorage.setItem("disableAllActionForm", "false")
    this.screenHeight = window.innerHeight;
    console.log('screennnnnHieght', this.screenHeight);

    this.submitted = false;
    this.checkValidationStatusOfAllForms();

    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe((flag) => {
      if (flag) {
        // sessionStorage.setItem("disableAllForms")
      }
    })
    this.stateformsService.allStatusStateForms.subscribe((res) => {
      console.log('triggered')

      this.allStatusStateForms = res;

      this.checkValidationStatusOfAllForms();
      console.log(this.validate)

      this.reviewSubmitted = false;
      if (this.allStatusStateForms['latestFinalResponse']['role'] === "MoHUA") {
        this.reviewSubmitted = true;
      }
      sessionStorage.setItem("allStatusStateForms", JSON.stringify(this.allStatusStateForms));
      console.log('Status of ALl State Forms', this.allStatusStateForms)

      this.res = res
      if (res['latestFinalResponse'].hasOwnProperty('role') && this.userLoggedInDetails.role === "STATE") {
        console.log('1')
        if (res['latestFinalResponse']['role'] === "MoHUA" && res['actionTakenByRole'] === "STATE") {
          console.log('inside state mohua')
          if ((res['steps']['linkPFMS']['isSubmit']
            && res['steps']['linkPFMS']['status'] === 'PENDING')
            || (res['steps']['linkPFMS']['status'] === 'APPROVED')) {
            this.pfms_greenTick = true;
          } else {
            this.pfms_greenTick = false;
          }
          if ((res['steps']['GTCertificate']['isSubmit'] &&
            res['steps']['GTCertificate']['status'] === 'PENDING')
            || (res['steps']['GTCertificate']['status'] === 'APPROVED')) {
            this.gtc_greenTick = true;
          } else {
            this.gtc_greenTick = false;
          }
          if ((res['steps']['waterRejuventation']['isSubmit'] &&
            res['steps']['waterRejuventation']['status'] === 'PENDING')
            || (res['steps']['waterRejuventation']['status'] === 'APPROVED')) {
            console.log('green tick')
            this.wr_greenTick = true;
          } else {

            this.wr_greenTick = false;
          }
          if ((res['steps']['actionPlans']['isSubmit'] &&
            res['steps']['actionPlans']['status'] === 'PENDING')
            || (res['steps']['actionPlans']['status'] === 'APPROVED')) {
            this.ap_greenTick = true;
          } else {
            this.ap_greenTick = false;
          }
          if (res['steps']['grantAllocation']['isSubmit']) {
            this.ga_greenTick = true;
          } else {
            this.ga_greenTick = false;
          }


        } else if ((res['latestFinalResponse']['role'] === "STATE" && res['actionTakenByRole'] === "STATE")
          || (res['latestFinalResponse']['role'] === "STATE" && res['actionTakenByRole'] === "MoHUA")
          || (res['latestFinalResponse']['role'] === "MoHUA" && res['actionTakenByRole'] === "MoHUA")
        ) {


          if ((res['latestFinalResponse']['linkPFMS']['isSubmit'] &&
            res['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
            || (res['latestFinalResponse']['linkPFMS']['status'] === 'APPROVED')) {
            this.pfms_greenTick = true;
          } else if ((!res['latestFinalResponse']['linkPFMS']['isSubmit'] &&
            res['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
            || (res['latestFinalResponse']['linkPFMS']['status'] === 'REJECTED')) {
            this.pfms_greenTick = false;
          }

          if ((res['latestFinalResponse']['GTCertificate']['isSubmit'] &&
            res['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
            || (res['latestFinalResponse']['GTCertificate']['status'] === 'APPROVED')) {
            this.gtc_greenTick = true;
          } else if ((!res['latestFinalResponse']['GTCertificate']['isSubmit'] &&
            res['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
            || (res['latestFinalResponse']['GTCertificate']['status'] === 'REJECTED')) {
            this.gtc_greenTick = false;
          }

          if ((res['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
            res['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
            || (res['latestFinalResponse']['waterRejuventation']['status'] === 'APPROVED')) {
            this.wr_greenTick = true;
          } else if ((!res['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
            res['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
            || (res['latestFinalResponse']['waterRejuventation']['status'] === 'REJECTED')) {
            this.wr_greenTick = false;
          }

          if ((res['latestFinalResponse']['actionPlans']['isSubmit'] &&
            res['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
            || (res['latestFinalResponse']['actionPlans']['status'] === 'APPROVED')) {
            this.ap_greenTick = true;
          } else if ((!res['latestFinalResponse']['actionPlans']['isSubmit'] &&
            res['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
            || (res['latestFinalResponse']['actionPlans']['status'] === 'REJECTED')) {
            this.ap_greenTick = false;
          }

          if (res['latestFinalResponse']['grantAllocation']['isSubmit']) {
            this.ga_greenTick = true;
          } else {
            this.ga_greenTick = false;
          }
        }
      } else if (res['latestFinalResponse'].hasOwnProperty('role') && this.userLoggedInDetails.role === "MoHUA") {
        console.log('2')
        if ((res['latestFinalResponse']['role'] === "STATE" && res['actionTakenByRole'] === "STATE")
          || (res['latestFinalResponse']['role'] === "STATE" && res['actionTakenByRole'] === "MoHUA")) {
          if (res['steps']['linkPFMS']['status'] === 'PENDING') {
            this.pfms_greenTick = false;
          } else {
            this.pfms_greenTick = true;
          }
          if (res['steps']['GTCertificate']['status'] === 'PENDING') {
            this.gtc_greenTick = false;
          } else {
            this.gtc_greenTick = true;
          }
          if (res['steps']['waterRejuventation']['status'] === 'PENDING') {
            this.wr_greenTick = false;
          } else {
            this.wr_greenTick = true;
          }
          if (res['steps']['actionPlans']['status'] === 'PENDING') {
            this.ap_greenTick = false;
          } else {
            this.ap_greenTick = true;
          }
          if (res['steps']['grantAllocation']['isSubmit']) {
            this.ga_greenTick = true;
          }


        } else if (
          (res['latestFinalResponse']['role'] === "MoHUA" && res['actionTakenByRole'] === "STATE" ||
            res['latestFinalResponse']['role'] === "MoHUA" && res['actionTakenByRole'] === "MoHUA"
          )

        ) {
          this.pfms_greenTick = this.res['latestFinalResponse']['linkPFMS']['isSubmit'];
          this.gtc_greenTick = this.res['latestFinalResponse']['GTCertificate']['isSubmit'];
          this.wr_greenTick = this.res['latestFinalResponse']['waterRejuventation']['isSubmit'];
          this.ap_greenTick = this.res['latestFinalResponse']['actionPlans']['isSubmit'];
          this.ga_greenTick = true;
          // if ((res['latestFinalResponse']['linkPFMS']['isSubmit'] &&
          //   res['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['linkPFMS']['status'] === 'APPROVED')) {
          //   this.pfms_greenTick = true;
          // } else if ((!res['latestFinalResponse']['linkPFMS']['isSubmit'] &&
          //   res['latestFinalResponse']['linkPFMS']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['linkPFMS']['status'] === 'REJECTED')) {
          //   this.pfms_greenTick = false;
          // }

          // if ((res['latestFinalResponse']['GTCertificate']['isSubmit'] &&
          //   res['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['GTCertificate']['status'] === 'APPROVED')) {
          //   this.gtc_greenTick = true;
          // } else if ((!res['latestFinalResponse']['GTCertificate']['isSubmit'] &&
          //   res['latestFinalResponse']['GTCertificate']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['GTCertificate']['status'] === 'REJECTED')) {
          //   this.gtc_greenTick = false;
          // }

          // if ((res['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
          //   res['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['waterRejuventation']['status'] === 'APPROVED')) {
          //   this.wr_greenTick = true;
          // } else if ((!res['latestFinalResponse']['waterRejuventation']['isSubmit'] &&
          //   res['latestFinalResponse']['waterRejuventation']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['waterRejuventation']['status'] === 'REJECTED')) {
          //   this.wr_greenTick = false;
          // }

          // if ((res['latestFinalResponse']['actionPlans']['isSubmit'] &&
          //   res['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['actionPlans']['status'] === 'APPROVED')) {
          //   this.ap_greenTick = true;
          // } else if ((!res['latestFinalResponse']['actionPlans']['isSubmit'] &&
          //   res['latestFinalResponse']['actionPlans']['status'] === 'PENDING')
          //   || (res['latestFinalResponse']['actionPlans']['status'] === 'REJECTED')) {
          //   this.ap_greenTick = false;
          // }

          // if (res['latestFinalResponse']['grantAllocation']['isSubmit']) {
          //   this.ga_greenTick = true;
          // } else {
          //   this.ga_greenTick = false;
          // }

        }

      } else if (!res['latestFinalResponse'].hasOwnProperty('role') || res['latestFinalResponse']['role'] == '') {
        console.log('3')
        if (res['steps']['linkPFMS']['isSubmit']) {
          this.pfms_greenTick = true;
        }
        if (res['steps']['GTCertificate']['isSubmit']) {
          this.gtc_greenTick = true;
        }
        if (res['steps']['waterRejuventation']['isSubmit']) {
          this.wr_greenTick = true;
        }
        if (res['steps']['actionPlans']['isSubmit']) {
          this.ap_greenTick = true;
        }
        if (res['steps']['grantAllocation']['isSubmit']) {
          this.ga_greenTick = true;
        }
      }


      // this.checkActionFinal();
    });
    this.stateformsService.allStateFormsData.subscribe((data) => {
      this.allStateFormsData = data;
      sessionStorage.setItem("allStateFormsData", JSON.stringify(data));
      console.log("allStateformStatus", data);
    });

    this.stateDashboardService.totalUaS.subscribe((data) => {
      console.log("total uasss", data);
      if (data == 0) {
        this.totalUas = false;
      }
    });

    this.stateformsService.allFormsPreData.subscribe((data) => {
      this.allStateFormsRes = data;
      sessionStorage.setItem("allFormsPreData", JSON.stringify(data));
      //   console.log('sesionnnnn data', sessionStorage.getItem("allFormsPreData"));
      //  console.log("allformdata.................", data);
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
    if (this.userLoggedInDetails.role === USER_TYPE.MoHUA) {
      this.id = sessionStorage.getItem("state_id");
    }

    this.stateformsService.getStateForm(this.design_year, this.id).subscribe(
      (res) => {
        console.log(this.userLoggedInDetails.role)
        console.log(res)
        console.log('inside res of getStatus')
        this.lastRoleInMasterForm = res["data"]['actionTakenByRole'];

        this.stateformsService.allStatusStateForms.next(res['data']);
        // this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(res['data']["latestFinalResponse"]['role'])
        this.role = res["data"]["latestFinalResponse"]['role'];
        if (this.role === "STATE") {
          this.submitted = true;
        } else {
          this.submitted = false;
        }
        let finalSubmit = this.submitted;
        // if (
        //   this.lastRoleInMasterForm != this.userLoggedInDetails.role &&
        //   this.userLoggedInDetails.role == "STATE"
        // )
        //   this.submitted = !this.submitted;
        // localStorage.setItem("finalSubmitStatus", this.submitted.toString());
        console.log("here");

      },
      (err) => {
        this.stateformsService.allStatusStateForms.next(this.allStatusStateForms);

        console.log(err);
      }
    );

  }
  finalActionDis = false;
  reviewSubmitted = false;

  finalMoHUAAction() {
    this.reviewSubmitted = true
    let data = {
      design_year: this.design_year,
      isSubmit: true,
      actionTakenByRole: "MoHUA",
    };
    this.checkValidationStatusOfAllForms();
    if (this.validate) {
      this.stateformsService.finalReviewSubmitByMoHUA(data, this.id).subscribe(
        (res) => {
          this.validate = false;
          this.stateformsService.disableAllFormsAfterMoHUAReview.next(true)
          swal(
            "Forms Successfully Submitted by MoHUA"
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
    if (this.userLoggedInDetails.role === USER_TYPE.MoHUA) {
      this.id = sessionStorage.getItem("state_id");
    } else {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.id = userData.state;
    }
    this.stateformsService
      .getAllStateForms(this.design_year, this.id)
      .subscribe((res) => {
        this.stateformsService.allStateFormsData.next(res['data']);
      });

    this.stateformsService
      .allStateFormData(this.id)
      .subscribe((res) => {
        console.log('inside next......', res);
        this.stateformsService.allFormsPreData.next(res['data']);
      });
  }
  validate = true
  checkValidationStatusOfAllForms() {

    this.validate = true;
    let requiredStatus = {
      "GTCertificate": {
        "isSubmit": false,
        "status": ''
      },
      "actionPlans": {
        "isSubmit": false,
        "status": ''
      },
      "grantAllocation": {
        "isSubmit": false
      },
      "linkPFMS": {
        "isSubmit": false,
        "status": ''
      },
      "waterRejuventation": {
        "isSubmit": false,
        "status": ''
      },


    };
    console.log(this.allStatusStateForms['steps'])
    for (let key in this.allStatusStateForms['steps']) {
      if (key === "GTCertificate") {
        let change = sessionStorage.getItem("changeInGTC");
        if (change && change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key]['isSubmit'] = this.allStatusStateForms['steps'][key]["isSubmit"];
        requiredStatus[key]['status'] = this.allStatusStateForms['steps'][key]["status"];
      } else if (key === "actionPlans") {
        let change = sessionStorage.getItem("changeInActionPlans");
        if (change && change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key]['isSubmit'] = this.allStatusStateForms['steps'][key]["isSubmit"];
        requiredStatus[key]['status'] = this.allStatusStateForms['steps'][key]["status"];
      } else if (key === "grantAllocation") {
        let change = sessionStorage.getItem("ChangeInGrantAllocation");
        if (change && change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key]['isSubmit'] = this.allStatusStateForms['steps'][key]["isSubmit"];
      } else if (key === "linkPFMS") {
        let change = sessionStorage.getItem("changeInPFMSAccountState");
        if (change && change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key]['isSubmit'] = this.allStatusStateForms['steps'][key]["isSubmit"];
        requiredStatus[key]['status'] = this.allStatusStateForms['steps'][key]["status"];
      } else if (key === "waterRejuventation") {
        let change = sessionStorage.getItem("changeInWaterRejenuvation");
        if (change && change === "true") {
          this.validate = false;
          return;
        }
        requiredStatus[key]['isSubmit'] = this.allStatusStateForms['steps'][key]["isSubmit"];
        requiredStatus[key]['status'] = this.allStatusStateForms['steps'][key]["status"];
      }
    }
    console.log(requiredStatus)
    for (let key in requiredStatus) {
      if (key == 'grantAllocation' && !requiredStatus[key]['isSubmit']) {
        this.validate = false;
        return
      }
      if (this.userLoggedInDetails.role === "STATE" && key != 'grantAllocation') {
        if (!(requiredStatus[key]['isSubmit'] && (requiredStatus[key]['status'] === 'PENDING' || requiredStatus[key]['status'] === 'APPROVED'))) {
          this.validate = false;
          return;
        }
      } else if (this.userLoggedInDetails.role === "MoHUA" && key != 'grantAllocation') {
        if (!(requiredStatus[key]['isSubmit'] && (requiredStatus[key]['status'] != 'PENDING' || requiredStatus[key]['status'] === 'APPROVED'))) {
          this.validate = false;
          return;
        }
      }
    }
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
          this.stateformsService.disableAllFormsAfterStateFinalSubmit.next(data.isSubmit)

          swal(
            "Forms Successfully Submitted by State "
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
  allStateFormsRes;
  statePreview() {
    // let userData = JSON.parse(localStorage.getItem("userData"));
    // let st_id = userData.state;
    console.log("hello", this.allStateFormsRes);
    const dialogRef = this.dialog.open(StateAllPreviewComponent, {
      data: this.allStateFormsRes,
      width: "85vw",
      height: "100%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
    // let userData = JSON.parse(localStorage.getItem("userData"));
    // let st_id = userData.state;
    // console.log('state user data',userData, st_id)
    // this.stateformsService.allStateFormData(st_id).subscribe((res) => {
    //     console.log('previewResPonce', res)
    //     this.allStateFormsRes = res['data'];
    //     console.log("hello", this.allStateFormsRes);
    //     const dialogRef = this.dialog.open(StateAllPreviewComponent, {
    //     data: this.allStateFormsRes,
    //     width: "85vw",
    //     height: "100%",
    //     panelClass: "no-padding-dialog",
    //    });
    // dialogRef.afterClosed().subscribe((result) => {});
    // },
    // (err) => {
    //     console.log(err);

    // })

  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    console.log('scrolllllll', windowScroll, this.elementPosition);

    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
      // if(windowScroll < 500) {
      //  this.stiHieght = true;
      //   this.sticky = false;
      // }else{
      //   this.sticky = true;
      //   this.stiHieght = false;
      // }
    } else {
      this.sticky = false;
      //this.stiHieght = false;
    }
  }

}
