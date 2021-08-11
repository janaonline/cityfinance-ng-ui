import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";
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
  finalActionDis = true;
  requiredActionStatus = {};
  currentActionStatus = {};
  takeStateAction;
  toolTipContentC = "";
  toolTipContentN = "";
  sticky: boolean = false;
  stiHieght: boolean = false;
  elementPosition: any;
  public screenHeight: any;
  @ViewChild('stickyMenu') menuElement: ElementRef;
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
    this.subscribeStatus();
    this.ulbformService.setForms.subscribe((value) => {
      this.ulbformService.allStatus.next(this.allStatus);
    });
    this.takeStateAction = localStorage.getItem("takeStateAction");
    this.accessGrant();
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.ULB:
        this.backHeader = "15FC Grants for 2021-22";
        this.backLink = "../fc-home-page";
        this.toolTipContentC = "Completed";
        this.toolTipContentN = "Not Completed";
        break;
      case USER_TYPE.STATE:
        this.backHeader = "State Dashboard";
        this.backLink = "../stateform/dashboard";
        this.toolTipContentC = "Reviewed";
        this.toolTipContentN = "Not Reviewed";
        break;
      case USER_TYPE.MoHUA:
        this.backHeader = "MoHUA Dashboard";
        this.backLink = "../mohua/dashboard";
        this.toolTipContentC = "Reviewed";
        this.toolTipContentN = "Not Reviewed";
        break;
      case USER_TYPE.ADMIN:
      case USER_TYPE.PARTNER:
        this.backHeader = "Admin Dashboard";
        this.backLink = "../ulbAdmin";
        this.toolTipContentC = "Reviewed";
        this.toolTipContentN = "Not Reviewed";
        break;

    }
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
    // pfmsAccount: { isSubmit: null, status: null },
    // plans: { isSubmit: null, status: null },
    slbForWaterSupplyAndSanitation: { isSubmit: null, status: null },
    utilReport: { isSubmit: null, status: null },
  };
  eligibleForms = {}
  async ngOnInit() {
    let id = sessionStorage.getItem("ulb_id");
    this.ulbformService.getEligibleULBForm(id).subscribe(
      (res) => {
        this.eligibleForms = res['data']
        console.log(this.eligibleForms)
      },
      (err) => { })
    this.ulbformService.allFormsData.subscribe((data) => {
      this.allFormsData = data;
      sessionStorage.setItem("allFormsData", JSON.stringify(data));
      // console.log('sesionnnnn data', sessionStorage.getItem("allFormsData"));
      // console.log("allformdata.................", data);
    });
    this.getStatus();
    this.getAllForm();
    this.submitted = false;
  }

  subscribeStatus() {
    this.ulbformService.allStatus.subscribe((status) => {
      this.checkGreenRedTick(status);
      sessionStorage.setItem("allStatus", JSON.stringify(status));
      console.log("red this", this.allStatus);
      if (this.userLoggedInDetails.role === USER_TYPE.ULB) {
        this.checkValidationStatusOfAllForms();
      }
      this.checkActionFinal();
    });
  }

  checkGreenRedTick(status) {
    const eligibleActionForms = JSON.parse(
      sessionStorage.getItem("eligibleActionForms")
    );

    if (eligibleActionForms == null) {
      for (const key in status) {
        this.allStatus[key] = status[key];
      }
      return;
    }

    for (const key in status) {
      this.allStatus[key] = status[key];
      if (
        this.userLoggedInDetails.role == this.userTypes.STATE ||
        this.userLoggedInDetails.role == this.userTypes.MoHUA
      ) {
        switch (key) {
          case "pfmsAccount":
            if (
              this.allStatus[key].status == "PENDING" &&
              eligibleActionForms.includes("PFMS")
            )
              this.allStatus[key].isSubmit = false;
            else this.allStatus[key].isSubmit = true;
            break;
          case "utilReport":
            if (
              this.allStatus[key].status == "PENDING" &&
              eligibleActionForms.includes("Utilization Report")
            )
              this.allStatus[key].isSubmit = false;
            else this.allStatus[key].isSubmit = true;
            break;
          case "annualAccounts":
            if (
              this.allStatus[key].status == "PENDING" &&
              eligibleActionForms.includes("Annual Acconts")
            )
              this.allStatus[key].isSubmit = false;
            else this.allStatus[key].isSubmit = true;
            break;
          case "slbForWaterSupplyAndSanitation":
            if (
              this.allStatus[key].status == "PENDING" &&
              eligibleActionForms.includes("slbs")
            )
              this.allStatus[key].isSubmit = false;
            else this.allStatus[key].isSubmit = true;
            break;
          case "plans":
            if (
              this.allStatus[key].status == "PENDING" &&
              eligibleActionForms.includes("Plan water sanitation")
            )
              this.allStatus[key].isSubmit = false;
            else this.allStatus[key].isSubmit = true;
            break;
        }
      }
    }
  }

  getStatus() {
    this.id = sessionStorage.getItem("row_id");
    this.ulbformService.getStatus(this.design_year, this.id).subscribe(
      (res) => {
        this.lastRoleInMasterForm = res["response"].actionTakenByRole;
        this.ulbformService.allStatus.next(res["response"]["steps"]);
        this.submitted = res["response"]["isSubmit"];
        localStorage.setItem("finalSubmitStatus", this.submitted.toString());
        console.log("here", res["response"]);
        if (res["response"].status != "PENDING") {
          this.finalActionDis = true;
        }
        let stActionCheck = "false";
        if (
          res["response"].actionTakenByRole === this.userTypes.STATE &&
          res["response"].isSubmit == true &&
          res["response"].status != "PENDING" &&
          this.loggedInUserType === this.userTypes.STATE
        ) {
          stActionCheck = "true";
          console.log("final action completed.....");
        }
        localStorage.setItem("lastRoleInMasterForm", this.lastRoleInMasterForm);
        localStorage.setItem("stateActionComDis", stActionCheck);
        localStorage.setItem("masterFormStatus", res["response"].status);
        if (
          this.lastRoleInMasterForm != USER_TYPE.ULB &&
          this.submitted &&
          res["response"].status == "REJECTED"
        ) {
          this.submitted = false;
        }
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
        console.log("allformdata aall.................", res);
        this.ulbformService.allFormsData.next(res[0]);
      });
  }
  checkActionFinal() {
    console.log(this.allStatus);
    let eligibleActionForms = JSON.parse(
      sessionStorage.getItem("eligibleActionForms")
    );

    if (eligibleActionForms == null) {
      return;
    }

    console.log("dcfe fvf", eligibleActionForms, this.allStatus);
    this.finalActionDis = true;
    eligibleActionForms.forEach((element) => {
      for (let key in this.allStatus) {
        console.log("keygbnm", this.allStatus[key]["status"]);
        if (element === "Utilization Report" && key === "utilReport") {
          if (
            this.allStatus["utilReport"]["isSubmit"] === true &&
            this.allStatus["utilReport"]["status"] != "PENDING"
          ) {
            console.log("0");
            this.currentActionStatus[key] = this.allStatus[key]["status"];
            this.finalActionDis = false;
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        } else if (element === "Annual Acconts" && key === "annualAccounts") {
          if (
            this.allStatus["annualAccounts"]["isSubmit"] === true &&
            this.allStatus["annualAccounts"]["status"] != "PENDING"
          ) {
            console.log("1");
            this.currentActionStatus[key] = this.allStatus[key]["status"];
            this.finalActionDis = false;
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        } else if (
          element === "slbs" &&
          key === "slbForWaterSupplyAndSanitation"
        ) {
          if (
            this.allStatus["slbForWaterSupplyAndSanitation"]["isSubmit"] ===
            true &&
            this.allStatus["slbForWaterSupplyAndSanitation"]["status"] !=
            "PENDING"
          ) {
            console.log("2");
            this.finalActionDis = false;
            this.currentActionStatus[key] = this.allStatus[key]["status"];
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        } else if (element === "Plan water sanitation" && key === "plans") {
          if (
            this.allStatus["slbForWaterSupplyAndSanitation"]["isSubmit"] ===
            true &&
            this.allStatus["slbForWaterSupplyAndSanitation"]["status"] !=
            "PENDING"
          ) {
            console.log("3");
            this.currentActionStatus[key] = this.allStatus[key]["status"];
            this.finalActionDis = false;
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        }
      }
    });
    console.log("reqdddstatus", this.requiredActionStatus);
    console.log("current st", this.currentActionStatus);

    for (let key in this.requiredActionStatus) {
      if (this.requiredActionStatus[key] == "PENDING") {
        console.log("con if", this.requiredActionStatus[key]);
        this.finalActionDis = true;
      }
    }
    console.log(this.requiredActionStatus);
  }
  public accessGrant() {
    this.ulbId = sessionStorage.getItem("ulb_id");
    console.log("pk12", this.ulbId);
    if (this.ulbId == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
      console.log("ifbl", this.isMillionPlus, this.isUA);
    } else {
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
      height: "100%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
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
          localStorage.setItem("finalSubmitStatus", 'true');
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
    if (eligibleForms == null) {
      return;
    }
    eligibleForms.forEach((element) => {
      for (let key in this.allStatus) {
        if (element === "Utilization Report" && key === "utilReport") {
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
    let actionStatus = "PENDING";
    for (let key in this.currentActionStatus) {
      if (this.currentActionStatus[key] == "REJECTED") {
        console.log("con if", this.currentActionStatus[key]);
        actionStatus = "REJECTED";
        break;
      } else {
        actionStatus = "APPROVED";
      }
    }

    let actionBody = {
      status: actionStatus,
      isSubmit: true,
      ulb: this.ulbId,
      design_year: this.design_year,
    };
    console.log("send", actionBody);

    this.ulbformService.postFinalActionByState(actionBody).subscribe(
      (res) => {
        console.log(res);
        swal("Action Successfully Submitted");
        this.finalActionDis = true;
      },
      (err) => {
        console.log(err);
        swal("Action Submission Failed!");
      }
    );
  }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // console.log('scrolllllll', windowScroll, this.elementPosition);

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
