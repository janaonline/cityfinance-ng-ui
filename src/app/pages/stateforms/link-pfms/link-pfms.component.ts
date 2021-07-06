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

import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-link-pfms",
  templateUrl: "./link-pfms.component.html",
  styleUrls: ["./link-pfms.component.scss"],
})
export class LinkPFMSComponent extends BaseComponent implements OnInit {
  dialogRef;
  actionRes;
  constructor(
    private LinkPFMSAccount: LinkPFMSAccount,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private _router: Router,
    private _profileService: ProfileService
  ) {
    super();
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
    "Please upload Expenditure Advance Transfer(EAT) Module Implemention Report";
  requiredBtn = "excel";
  Years = JSON.parse(localStorage.getItem("Years"));
  data = {
    design_year: this.Years["2021-22"],
    isDraft: null,
    excel: null,
  };
  saveBtnTxt = "NEXT";

  ngOnInit() {
    sessionStorage.setItem("changeInPFMSAccountState", "false");
    let state_id = sessionStorage.getItem("state_id");
    if (state_id != null) {
      this.isDisabled = true;
    }
    this.onLoad(state_id);

  }

  saveAndNextValue(template1) {
    if (sessionStorage.getItem("changeInPFMSAccountState") == "true") {
      if (this.data.isDraft) {
        this.openModal(template1);
      } else {
        this.postData();
      }
    } else {
      this._router.navigate(["stateform/water-supply"]);
    }
  }

  async postData() {
    this.LinkPFMSAccount.postData(this.data).subscribe(
      (res) => {
        sessionStorage.setItem("changeInPFMSAccountState", "false");
        console.log(res);
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

  onLoad(state_id) {
    this.LinkPFMSAccount.getData(this.Years["2021-22"], state_id).subscribe(
      (res) => {
        console.log(res);
        this.data.excel = res['data'].excel
        sessionStorage.setItem("pfmsAccounts", JSON.stringify(res));
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
    this.checkDiff()
  }
  checkStatus(ev){
    console.log('state pfms action', ev)

  }
}
