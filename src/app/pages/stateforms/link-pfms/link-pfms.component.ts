import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { LinkPFMSAccount } from "./link-pfms.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Router, NavigationStart, Event } from "@angular/router";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PfmsPreviewComponent } from "./pfms-preview/pfms-preview.component";
import { SweetAlert } from "sweetalert/typings/core";

import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { StateformsService } from "../stateforms.service";
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-link-pfms",
  templateUrl: "./link-pfms.component.html",
  styleUrls: ["./link-pfms.component.scss"],
})
export class LinkPFMSComponent extends BaseComponent implements OnInit {
  userLoggedInDetails: IUserLoggedInDetails;
  // loggedInUserType: USER_TYPE;

  dialogRef;
  actionRes;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
  constructor(
    private LinkPFMSAccount: LinkPFMSAccount,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private _router: Router,
    private profileService: ProfileService,
    public stateformsService: StateformsService
  ) {
    super();
    this.initializeUserType();
    this._router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          sessionStorage.setItem("changeInPFMSAccountState", "false");
          return;
        }
        const change = sessionStorage.getItem("changeInPFMSAccountState");
        if (change === "true" && this.routerNavigate === null) {
          this.routerNavigate = event;
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, {
            skipLocationChange: true,
          });
          this.openModal(this.template);
        }
      }
    });
  }

  @ViewChild("template") template;
  @ViewChild("template1") template1;
  routerNavigate = null;
  isDisabled = false;
  quesName =
    "Please upload Expenditure Advance Transfer (EAT) Module Implemention Report";
  requiredBtn = "excel";
  Years = JSON.parse(localStorage.getItem("Years"));
  data = {
    design_year: this.Years["2021-22"],
    isDraft: null,
    excel: null,
    status: "PENDING"
  };
  saveBtnTxt = "NEXT";
  disableAllForms = false;
  isStateSubmittedForms = "";
  userRole;
  excelDataOnLoad = null;
  state_id;
  formDisable = false;
  ngOnInit() {
    this.formDisable = sessionStorage.getItem("disableAllForms") == 'true'
    this.actionFormDisable = sessionStorage.getItem("disableAllActionForm") == 'true'
    this.stateformsService.disableAllFormsAfterMoHUAReview.subscribe((disable) => {
      this.actionFormDisable = disable;
      if (disable) {
        sessionStorage.setItem("disableAllActionForm", "true")
      }
    })
    sessionStorage.setItem("changeInPFMSAccountState", "false");
    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"));

    this.state_id = sessionStorage.getItem("state_id");

    if (this.loggedInUserType == "MoHUA") {
      this.formDisable = true;
    } else if (this.loggedInUserType == "STATE") {
      if (this.allStatus["latestFinalResponse"]["role"] == "STATE") {
        if (
          this.allStatus["steps"]["linkPFMS"]["isSubmit"] &&
          (this.allStatus["steps"]["linkPFMS"]["status"] == "PENDING" ||
            this.allStatus["steps"]["linkPFMS"]["status"] == "APPROVED")
        ) {
          this.formDisable = true;
        }
      } else if (this.allStatus["latestFinalResponse"]["role"] == "MoHUA") {
        if (this.allStatus["steps"]["linkPFMS"]["status"] == "APPROVED") {
          this.formDisable = true;
        }
      }
    }

    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe(
      (disable) => {
        console.log("link pfms Testing", disable);
        this.formDisable = disable
        if (disable) {
          sessionStorage.setItem("disableAllForms", "true")
        }
      }
    );

    this.onLoad();
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  saveAndNextValue(template1) {
    console.log(this.loggedInUserType);
    if (this.loggedInUserType === "STATE") {
      if (sessionStorage.getItem("changeInPFMSAccountState") == "true") {
        if (this.data.isDraft) {
          this.openModal(template1);
        } else {
          this.postData();
        }
      } else {
        this._router.navigate(["stateform/water-supply"]);
      }
    } else if (this.loggedInUserType === "MoHUA") {
      let changeHappen = sessionStorage.getItem("changeInPFMSAccountState");
      if (changeHappen == "false") {
        this._router.navigate(["stateform/water-supply"]);
        return;
      } else {
        this.saveStateAction();
      }
    }
  }
  body = {};
  allStatus;
  saveStateAction() {
    let data = JSON.parse(sessionStorage.getItem("pfmsAccounts"));
    console.log(data);
    this.body["design_year"] = data.data["design_year"];
    this.body["isDraft"] = data.data["isDraft"];
    this.body["excel"] = data.data["excel"];
    this.body["status"] = this.pfmsFormStatus;
    this.body["state"] = this.state_id;
    this.body["rejectReason"] = this.pfmsFormRejectReason;

    this.LinkPFMSAccount.postStateAction(this.body).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        const status = JSON.parse(
          sessionStorage.getItem("allStatusStateForms")
        );
        sessionStorage.setItem("changeInPFMSAccountState", "false");
        this.allStatus = status;
        status.steps.linkPFMS.status = this.body["status"];
        status.steps.linkPFMS.isSubmit = !this.body["isDraft"];
        status.actionTakenByRole = "MoHUA";
        this.stateformsService.allStatusStateForms.next(status);

        this._router.navigate(["stateform/water-supply"]);
      },
      (error) => {
        swal("An error occured!");
        console.log(error.message);
      }
    );
  }

  async postData() {
    this.LinkPFMSAccount.postData(this.data).subscribe(
      (res) => {
        sessionStorage.setItem("changeInPFMSAccountState", "false");
        console.log(res);
        const form = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
        form.steps.linkPFMS.isSubmit = !this.data.isDraft;
        form.steps.linkPFMS.status = "PENDING";
        form.actionTakenByRole = "STATE";
        console.log(form);
        this.stateformsService.allStatusStateForms.next(form);
        swal("Record submitted successfully!");
        this._router.navigate(["stateform/water-supply"]);
      },
      (error) => {
        console.log(error, error.message);
      }
    );
  }
  openModal(template: TemplateRef<any>, fromPreview = null) {
    if (fromPreview) {
      this.onPreview();
    } else {
      const dialogConfig = new MatDialogConfig();
      this.dialogRef = this.dialog.open(template, dialogConfig);
      this.dialogRef.afterClosed().subscribe((result) => {
        console.log("result", result);
        if (result === undefined) {
          if (this.routerNavigate) {
            this.routerNavigate = null;
          }
        }
      });
    }
  }

  async stay() {
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
    await this.dialogRef.close(true);
  }
  getStatus = null;
  getrejectReason = null;
  actionFormDisable = false;
  onLoad() {
    this.LinkPFMSAccount.getData(
      this.Years["2021-22"],
      this.state_id
    ).subscribe(
      (res) => {
        console.log(res);
        this.data.excel = res["data"].excel;
        this.data.isDraft = res["data"].isDraft;
        this.excelDataOnLoad = { excel: res["data"].excel };
        this.getStatus = res["data"]["status"];
        this.getrejectReason = res["data"]["rejectReason"];
        sessionStorage.setItem("pfmsAccounts", JSON.stringify(res));
        this.actionRes = {
          st: this.getStatus,
          rRes: this.getrejectReason
        };
        if (this.allStatus["latestFinalResponse"]["role"] == "STATE") {
          console.log(this.allStatus["latestFinalResponse"]["role"], this.getStatus)
          if (this.getStatus != "PENDING") {
            this.actionFormDisable = true;
          }
        } else if (this.allStatus["latestFinalResponse"]["role"] == "MoHUA") {
          this.actionFormDisable = true;
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  checkDiff() {
    this.saveBtnTxt = "SAVE AND NEXT";
    sessionStorage.setItem("changeInPFMSAccountState", "true");
  }

  async proceed(uploadedFiles) {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      await this.postData();
      sessionStorage.setItem("changeInPFMSAccountState", "false");
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    this.postData();
    sessionStorage.setItem("changeInPFMSAccountState", "false");
    return this._router.navigate(["ulbform/grant-tra-certi"]);
  }
  alertClose() {
    this.stay();
  }

  onPreview() {
    const dialogRef = this.dialog.open(PfmsPreviewComponent, {
      data: this.data,
      maxHeight: "95%",
      width: "85vw",
      panelClass: "no-padding-dialog",
    });
    console.log("dialog ref");
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  uploadedFile(file) {
    this.data.excel = file.excel;
    if (file.excel.name && file.excel.url) {
      this.data.isDraft = false;
    } else {
      this.data.isDraft = true;
    }
    this.checkDiff();
  }

  pfmsFormStatus = "PENDING";
  pfmsFormRejectReason = null;
  checkStatus(ev) {
    sessionStorage.setItem("changeInPFMSAccountState", "true");
    console.log("state pfms action", ev);
    this.pfmsFormStatus = ev.status;
    this.pfmsFormRejectReason = ev.rejectReason;
  }
}
