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
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { environment } from "src/environments/environment";
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
  annualStatus;
  stActionCheck;
  public screenHeight: any;
  lastRoleInMasterForm;
  design_year = JSON.parse(localStorage.getItem("Years"))["2021-22"];
  allStatus = {
    annualAccounts: { isSubmit: null, status: null },
    // pfmsAccount: { isSubmit: null, status: null },
    // plans: { isSubmit: null, status: null },
    slbForWaterSupplyAndSanitation: { isSubmit: null, status: null },
    utilReport: { isSubmit: null, status: null },
  };
  eligibleForms = {};
  allFormsData;
  submitted = false;
  newSticky = false;
  cardsOverview = [
    {
      label: "Grant Transfer Certificate",
      link: "../grant-tra-certi",
      title: "Grant Transfer Certificate",
      tooltip: "tooltip",
      image: "../../../../assets//ulbform/gtc.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Utilisation Report",
      link: "../utilisation-report",
      title: "Detailed Utilisation Report",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/dur.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "Annual Acconts",
      link: "../annual_acc",
      title: "Annual Accounts",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/aa.svg",
      permittedAccounts: [""],
      display: [""],
    },
    {
      label: "slbs",
      link: "../slbs",
      // title: "Million Plus City Challenge Fund",
      tooltip: "tooltip",
      image: "../../../../assets/ulbform/mpccf.svg",
      permittedAccounts: [""],
      display: [""],
    },
  ];
  autoRejectInfo:string = `If this year's form is rejected, the next year's forms will be 
  "In Progress" because of their interdependency.`;
  autoReject:boolean = false;
  @ViewChild("stickyMenu") menuElement: ElementRef;

  @HostListener("window:scroll", ["$event"])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    //  console.log("scrolllllll", windowScroll, this.elementPosition);
    if (windowScroll < this.elementPosition) {
      this.sticky = false;
      this.stiHieght = false;
      this.newSticky = false;
    } else if (windowScroll > this.elementPosition) {
      this.sticky = true;
      this.stiHieght = false;
      this.newSticky = false;
      if (windowScroll >= 1220) {
        this.sticky = false;
        this.stiHieght = true;
        this.newSticky = true;
      }
    }
  }
  constructor(
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private wsService: WaterSanitationService,
    public dialog: MatDialog,
    public ulbformService: UlbformService,
    public activatedRoute: ActivatedRoute,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    this.activatedRoute.params.subscribe((val) => {
      const { id } = val;
      if (id) {
        this.id = id;
      }
    });
    this.takeStateAction = localStorage.getItem("takeStateAction");
    this.accessGrant();
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();
    this.getStatus();
    this.getAllForm();
    this.subscribeStatus();
    this.ulbformService.setForms.subscribe((value) => {
      this.ulbformService.allStatus.next(this.allStatus);
    });
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
        // if(environment?.isProduction === false)
         this.sequentialReview({onlyGet: true});
        break;
      case USER_TYPE.ADMIN:
      case USER_TYPE.PARTNER:
        this.backHeader = "Admin Dashboard";
        this.backLink = "../mohua/dashboard";
        this.toolTipContentC = "Reviewed";
        this.toolTipContentN = "Not Reviewed";
        break;
    }
  }

  async ngOnInit() {
    const s = this.renderer2.createElement("script");
    s.type = "text/javascript";

    s.text = `
      window.JOONBOT_WIDGET_ID = "f846bb00-1359-4196-9ecf-47094ddc04f7";
      window.JB_source = (JSON.parse(localStorage.getItem("userData"))).name;
      var n, o;
      o = document.createElement("script");
      o.src = "https://js.joonbot.com/init.js", o.defer = !0, o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous";
      n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
  `;
    this.renderer2.appendChild(this._document.body, s);

    let id = sessionStorage.getItem("ulb_id");
    this.ulbformService.getEligibleULBForm(id).subscribe(
      (res) => {
        this.eligibleForms = res["data"];
      },
      (err) => { }
    );
    this.ulbformService.allFormsData.subscribe((data) => {
      this.allFormsData = data;
      sessionStorage.setItem("allFormsData", JSON.stringify(data));
    });
    this.submitted = false;
  }

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
    });
  }
  subscribeStatus() {
    this.ulbformService.allStatus.subscribe((status) => {
      this.checkGreenRedTick(status);
      sessionStorage.setItem("allStatus", JSON.stringify(status));
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
          case "utilReport":
            if (
              this.allStatus[key].status != "PENDING" &&
              this.allStatus[key].status &&
              (eligibleActionForms.includes("Utilization Report") ||
                eligibleActionForms.includes("Utilisation Report"))
            ) {
              this.allStatus[key].isSubmit = true;
            } else this.allStatus[key].isSubmit = false;
            break;
          case "annualAccounts":
            if (
              this.allStatus[key].status != "PENDING" &&
              this.allStatus[key].status &&
              eligibleActionForms.includes("Annual Acconts")
            )
              this.allStatus[key].isSubmit = true;
            else this.allStatus[key].isSubmit = false;
            break;
          case "slbForWaterSupplyAndSanitation":
            if (
              this.allStatus[key].status != "PENDING" &&
              this.allStatus[key].status &&
              eligibleActionForms.includes("slbs")
            )
              this.allStatus[key].isSubmit = true;
            else this.allStatus[key].isSubmit = false;
            break;
        }
      }
    }
  }

  getStatus() {
    this.id = sessionStorage.getItem("row_id");
    if ((this.userLoggedInDetails.role == this.userTypes.STATE || this.userLoggedInDetails.role == this.userTypes.MoHUA) && !this.id) {
      location.reload();
    }
    this.ulbformService.getStatus(this.design_year, this.id).subscribe(
      (res) => {
        this.lastRoleInMasterForm = res["response"].actionTakenByRole;
        this.ulbformService.allStatus.next(res["response"]["steps"]);
        this.submitted = res["response"]["isSubmit"];
        this.annualStatus =
          res["response"]["steps"]["annualAccounts"]["status"];
        localStorage.setItem("finalSubmitStatus", this.submitted.toString());
        if (res["response"].status != "PENDING") {
          this.finalActionDis = true;
        }
        this.stActionCheck = "false";
        if (
          res["response"].actionTakenByRole === this.userTypes.STATE &&
          res["response"].isSubmit == true &&
          res["response"].status != "PENDING" &&
          this.loggedInUserType === this.userTypes.STATE
        ) {
          this.stActionCheck = "true";
        }
        if (
          res["response"].actionTakenByRole === this.userTypes.MoHUA &&
          this.loggedInUserType === this.userTypes.STATE
        ) {
          this.stActionCheck = "true";
        }
        let mohuaAction = "false";
        if (
          res["response"].actionTakenByRole === this.userTypes.MoHUA &&
          res["response"].isSubmit == true &&
          res["response"].status != "PENDING" &&
          this.loggedInUserType === this.userTypes.MoHUA
        ) {
          mohuaAction = "true";
          this.stActionCheck = "true";
        }
        localStorage.setItem("lastRoleInMasterForm", this.lastRoleInMasterForm);
        localStorage.setItem("stateActionComDis", this.stActionCheck);
        localStorage.setItem("mohuaActionComDis", mohuaAction);
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
        userData.ulb ?? sessionStorage.getItem("ulb_id"),
        "606aaf854dff55e6c075d219",
        "606aadac4dff55e6c075c507"
      )
      .subscribe((res) => {
        this.ulbformService.allFormsData.next(res[0]);
      });
  }
  checkActionFinal() {
    let eligibleActionForms = JSON.parse(
      sessionStorage.getItem("eligibleActionForms")
    );

    if (eligibleActionForms == null) {
      return;
    }
    this.finalActionDis = true;
    eligibleActionForms.forEach((element) => {
      for (let key in this.allStatus) {
        if (
          (element === "Utilisation Report" ||
            element === "Utilisation Report") &&
          key === "utilReport"
        ) {
          if (
            this.allStatus["utilReport"]["isSubmit"] === true &&
            this.allStatus["utilReport"]["status"] != "PENDING"
          ) {
            this.currentActionStatus[key] = this.allStatus[key]["status"];
            this.finalActionDis = false;
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        } else if (element === "Annual Acconts" && key === "annualAccounts") {
          if (
            this.allStatus["annualAccounts"]["isSubmit"] === true &&
            this.allStatus["annualAccounts"]["status"] != "PENDING"
          ) {
       
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
      
            this.currentActionStatus[key] = this.allStatus[key]["status"];
            this.finalActionDis = false;
          }
          this.requiredActionStatus[key] = this.allStatus[key]["status"];
        }
      }
    });


    for (let key in this.requiredActionStatus) {
      if (this.requiredActionStatus[key] == "PENDING") {
        this.finalActionDis = true;
      }
    }
 
  }
  public accessGrant() {
    this.ulbId = sessionStorage.getItem("ulb_id");
  
    if (this.ulbId == null) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.isMillionPlus = userData.isMillionPlus;
      this.isUA = userData.isUA;
    } else {
      this.isMillionPlus = sessionStorage.getItem("isMillionPlus");
      this.isUA = sessionStorage.getItem("isUA");
    }
  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  private initializeLoggedInUserDataFetch() {
    UserUtility.getUserLoggedInData().subscribe((data) => {
      this.userLoggedInDetails = data;
    });
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.ULB:
        return this.fetchStateList();
    }
  }

  openDialog(template) {
    const dialogRef = this.dialog.open(template);
    dialogRef.afterClosed().subscribe((result) => { });
  }
  ulbPreview() {
    const dialogRef = this.dialog.open(UlbformPreviewComponent, {
      data: this.allFormsData,
      width: "85vw",
      height: "100%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  finalSubmitClicked(finalSubmitAlert) {
    this.openDialog(finalSubmitAlert);
  }
  alertClose() {
    this.dialog.closeAll();
  }
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
          this.submitted = true;
          swal(
            "Forms Successfully Submitted to be Reviewed by State and MoHUA"
          );
          localStorage.setItem("finalSubmitStatus", "true");
          this._router.navigate(["ulbform/ulbform-overview"]);
          setTimeout(() => {
            location.reload();
          }, 200);
        },
        (err) => {
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
        if (
          (element === "Utilization Report" ||
            element === "Utilisation Report") &&
          key === "utilReport"
        ) {
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
  }
  proceed() {
    this.dialog.closeAll();
    this.finalSubmit();
  }
  finalStateAction() {
    let actionStatus = "PENDING";
    for (let key in this.currentActionStatus) {
      if (this.currentActionStatus[key] == "REJECTED") {
        actionStatus = "REJECTED";
        break;
      } else if (
        this.currentActionStatus[key] != "APPROVED" &&
        this.currentActionStatus[key] != "REJECTED"
      ) {
        continue;
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
    let confirmMessage = this.autoReject ? this.autoRejectInfo : '';
    swal("Confirmation !", `${confirmMessage} 
    Are you sure you want to submit this action?`, "warning", {
      buttons: {
        Submit: {
          text: "Submit",
          value: "submit",
        },
        Cancel: {
          text: "Cancel",
          value: "cancel",
        },
      },
    }).then((value) => {
      switch (value) {
        case "submit":
          this.saveAction(actionBody);
          break;
        case "cancel":
          break;
      }
    });
   // this.saveAction(actionBody);
   
  }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  saveAction(actionBody){
    this.ulbformService.postFinalActionByState(actionBody).subscribe(
      (res) => {
        swal("Action Successfully Submitted");
        if (this.loggedInUserType === this.userTypes.MoHUA) {
          this.ulbformService.disableAllFormsAfterMohuaReview.next(true);
      
        }
        if (this.loggedInUserType === this.userTypes.STATE) {
          this.ulbformService.disableAllFormsAfterStateReview.next(true);
       
        }
        //  commented for prods
        // if (environment?.isProduction === false) {
          if (actionBody?.status == "REJECTED" && this.loggedInUserType == this.userTypes.MoHUA && this.autoReject) this.sequentialReview({onlyGet: false}); // for sequncial rejection
       // }

        this.finalActionDis = true;
        this._router.navigate(["ulbform/ulbform-overview"]);
        setTimeout(() => {
          location.reload();
        }, 100);
      },
      (err) => {
        console.log(err);
        swal("Action Submission Failed!");
      }
    );
  }

  sequentialReview(actionBody) {
    const totalForm = [{ id: 4 }, { id: 6 }];
    let body = {
      "ulbs": [this.ulbId],
      "design_year": this.design_year,
      "status": "REJECTED",
      "formId": null,
      "multi": false,
      "getReview": actionBody?.onlyGet
    }
    for (let form of totalForm) {
      body.formId = form?.id;
      this.ulbformService.postSeqReview(body).subscribe((res:any) => {
        console.log('Sequential review', res);
        if(actionBody?.onlyGet && this.autoReject == false) this.autoReject = res?.data?.autoReject;
      },
        (error) => {
          //  swal('Error', 'Sequential review field.', 'error')
        }
      )
    }


  }
}
