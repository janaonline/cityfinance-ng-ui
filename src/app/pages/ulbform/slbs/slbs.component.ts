import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { waterWasteManagementForm } from "../../../users/data-upload/components/configs/water-waste-management";
import { IFinancialData } from "../../../users/data-upload/models/financial-data.interface";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { JSONUtility } from "src/app/util/jsonUtil";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { UlbformService } from "../ulbform.service";
import { Router, NavigationStart, Event } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-slbs",
  templateUrl: "./slbs.component.html",
  styleUrls: ["./slbs.component.scss"],
})
export class SlbsComponent implements OnInit, OnDestroy {
  dialogRef;
  waterWasteManagementForm: FormGroup;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  previewData: any;
  loggedInUserType;
  jsonUtil = new JSONUtility();
  slbTitleText: string = "SLBs for Water Supply and Sanitation";
  preFilledWaterManagement: any = {};
  slbId: string = "";
  ulbId = null;
  ulbFormStaus = "PENDING";
  ulbFormRejectR = null;
  finalSubmitStatus;
  takeStateAction;
  actionResSlb;
  compDis;
  mohuaActionComp;
  btnSave = 'NEXT'
  constructor(
    private _matDialog: MatDialog,
    private commonService: CommonService,
    private _router: Router,
    private modalService: BsModalService,
    public _ulbformService: UlbformService
  ) {
    this.loggedInUserType = this.loggedInUserDetails.role;
    this.ulbId = sessionStorage.getItem("ulb_id");
    this.finalSubmitStatus = localStorage.getItem("finalSubmitStatus");
    this.takeStateAction = localStorage.getItem("takeStateAction");
    this.compDis = localStorage.getItem("stateActionComDis");
    this._router.events.subscribe(async (event: Event) => {
      if (!this.value?.saveData) {
        if (event instanceof NavigationStart) {
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInSLB", "false");
            return;
          }
          const change = sessionStorage.getItem("changeInSLB");
          if (change === "true" && this.routerNavigate === null) {
            this.routerNavigate = event;

            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            console.log("inside router");
            this.openModal(this.template);
          }
        }
      }
    });
  }
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  routerNavigate = null;
  protected readonly formBuilder = new FormBuilder();
  @ViewChild("previewPopup") previewPopup: TemplateRef<any>;
  waterPotability: any = { name: "", url: "" };
  async ngOnInit() {
    this.isMillionPlusOrNot()
    console.log("usertype....", this.loggedInUserDetails, USER_TYPE);
    this.clickedSave = false;

    await this.getSlbData();

    this.createDataForms(this.preFilledWaterManagement);
    this.checkFinalAction();
    // if (this.preFilledWaterManagement) this.waterWasteManagementForm =this.createWasteWaterUploadForm(this.preFilledWaterManagement);
    sessionStorage.setItem("changeInSLB", "false");

  }
  ngOnDestroy() {
    waterWasteManagementForm.reset();
  }

  isMillionPlus;
  isUA;

  isMillionPlusOrNot() {
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
  checkFinalAction() {
    this._ulbformService.disableAllFormsAfterStateReview.subscribe(
      (disable) => {
        console.log("utilization speaking", disable);
        this.compDis = 'true';
        if (disable) {
          localStorage.setItem("stateActionComDis", 'true');
        }
      }
    );
    this._ulbformService.disableAllFormsAfterMohuaReview.subscribe(
      (disable) => {
        console.log("utilization speaking", disable);
        this.mohuaActionComp = 'true';
        if (disable) {
          localStorage.setItem("mohuaActionComDis", 'true');
        }
      }
    );
  }
  Years = JSON.parse(localStorage.getItem("Years"));
  createDataForms(data?: IFinancialData) {
    this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);
  }
  createWasteWaterUploadForm(data?: IFinancialData) {
    const newForm = this.formBuilder.group({
      ...waterWasteManagementForm.controls,
    });

    console.log("new form p", newForm, data);

    if (!data) return newForm;

    newForm.patchValue({ ...data.waterManagement });

    return newForm;
  }
  statePostData;

  getSlbData() {
    let ulbId = sessionStorage.getItem("ulb_id");

    return new Promise((resolve, reject) => {
      let designYear = "606aaf854dff55e6c075d219";
      let params = "design_year=" + designYear;
      this.commonService.fetchSlbData(params, ulbId).subscribe((res) => {

        this.preFilledWaterManagement =
          res["data"] && res["data"][0] ? res["data"][0] : {};
        this.preFilledWaterManagement.history = null;
        if (res['data'].length > 0) {
          if (res['data'][0]['blank']) {
            this.clickAnswer = false
          } else {
            this.clickAnswer = true
          }
        }
        let waterPotability =
          res["data"] &&
            res["data"][0] &&
            res["data"][0]["waterPotability"]["documents"]["waterPotabilityPlan"]
            ? res["data"][0]["waterPotability"]["documents"][
            "waterPotabilityPlan"
            ][0]
            : {};

        this.waterPotability =
          waterPotability && waterPotability.hasOwnProperty("url")
            ? waterPotability
            : { name: "", url: "" };

        this.slbId = res["data"] && res["data"][0] ? res["data"][0]._id : "";
        console.log("slbsResppppppppp", res);
        console.log("slbResponse", res["data"]);
        this.statePostData = res;
        let actRes = {
          st:
            this.statePostData.data[0]?.waterManagement["status"] != ""
              ? this.statePostData.data[0]?.waterManagement["status"]
              : "PENDING",
          rRes: this.statePostData.data[0]?.waterManagement["rejectReason"],
          actionTakenByRole: res["data"][0]?.actionTakenByRole,
          finalSubmitStatus: this.finalSubmitStatus,
        };
        if (this.statePostData.data[0]?.waterManagement["status"] != "NA") {
          this.ulbFormStaus =
            this.statePostData.data[0]?.waterManagement["status"] != ""
              ? this.statePostData.data[0]?.waterManagement["status"]
              : "PENDING";
          console.log("slb Status", this.ulbFormStaus);
        }

        this.ulbFormRejectR =
          this.statePostData.data[0]?.waterManagement["rejectReason"];
        this.actionResSlb = actRes;
        console.log("asdfghj", actRes, this.actionResSlb);
        sessionStorage.setItem("slbData", JSON.stringify(res));
        console.log("slbsResppppppppp", res);

        resolve(res);
      });
    });

  }

  value;
  postSlbData(value) {
    console.log(value);
    console.log("slb check........", value);
    this.value = value;
    let data = {
      design_year: this.Years["2021-22"],
      isCompleted: value.isCompleted,
      blank: false,
      waterManagement: { ...value.waterManagement },
      // water_index: value.water_index,
      // waterPotability: {
      //   documents: {
      //     waterPotabilityPlan: [value.waterPotabilityPlan],
      //   },
      // },
      // completeness: 'APPROVED', correctness: 'APPROVED',
    };
    if (this.slbId) {
      this.commonService.postSlbData(data).subscribe((res) => {
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.slbForWaterSupplyAndSanitation.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);

        swal("Record submitted successfully!");
      });
      return true;
    }
    this.commonService.postSlbData(data).subscribe((res) => {
      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      status.slbForWaterSupplyAndSanitation.isSubmit = res["isCompleted"];
      this._ulbformService.allStatus.next(status);

      swal("Record submitted successfully!");
    },
      (err) => {
        swal(err.message)
      });
  }
  data = "";
  res;
  clickedSave = false;
  isCompleted;
  initi;
  detectInit = 0

  onWaterWasteManagementEmitValue(value) {
    console.log('ENTERED ON WASTER MANAGEMENT EMIT VALUE')
    this.detectInit++;
    console.log(this.detectInit)
    if (this.preFilledWaterManagement.waterManagement) {
      if (this.detectInit > 20) {
        sessionStorage.setItem("changeInSLB", "true");
      } else {
        sessionStorage.setItem("changeInSLB", "false");
        this._ulbformService.slbFormChange.next(false)
      }
    } else {
      sessionStorage.setItem("changeInSLB", "true");
    }

    console.log("value which came from fc-slb component", value);

    let changeHappen = sessionStorage.getItem("changeInSLB");
    if (changeHappen == "false" && value.saveData) {
      // this._router.navigate(["ulbform/service-level"]);
      return

    }

    let completed = this.checkIfCompletedOrNot(value);

    if (value.isFormInvalid || !completed) {
      this.isCompleted = false;
    } else {
      this.isCompleted = true;
    }

    console.log("isCompleted", this.isCompleted);
    value["isCompleted"] = this.isCompleted;
    this.data = value;
    this.saveDataInAllForm(value);
    if (this.routerNavigate && value.saveData) {
      console.log("1");
      console.log(value);
      this.postSlbData(value);
      sessionStorage.setItem("changeInSLB", "false");
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    if (!this.isCompleted && value.saveData) {
      console.log("2");
      this.clickedSave = true;
      this.openModal(this.template1);
      return;
    }
    if (value.saveData) {
      console.log("3");
      this.postSlbData(value);
      sessionStorage.setItem("changeInSLB", "false");
      // this._router.navigate(["ulbform/service-level"]);
      return

    }

  }

  submitBlank() {
    let payload = {
      "design_year": "606aaf854dff55e6c075d219",
      "isCompleted": true,
      "blank": true,
      "waterManagement": {
        "waterSuppliedPerDay": {
          "target": {
            "2122": "",
            "2223": "",
            "2324": "",
            "2425": ""
          },
          "baseline": {
            "2021": ""
          }
        },
        "reduction": {
          "target": {
            "2122": "",
            "2223": "",
            "2324": "",
            "2425": ""
          },
          "baseline": {
            "2021": ""
          }
        },
        "houseHoldCoveredWithSewerage": {
          "target": {
            "2122": "",
            "2223": "",
            "2324": "",
            "2425": ""
          },
          "baseline": {
            "2021": ""
          }
        },
        "houseHoldCoveredPipedSupply": {
          "target": {
            "2122": "",
            "2223": "",
            "2324": "",
            "2425": ""
          },
          "baseline": {
            "2021": ""
          }
        }
      }
    }
    this.commonService.postSlbData(payload).subscribe((res) => {
      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      status.slbForWaterSupplyAndSanitation.isSubmit = true;
      status.slbForWaterSupplyAndSanitation.status = 'NA';
      this._ulbformService.allStatus.next(status);

      swal("Record submitted successfully!");
    });
  }

  saveDataInAllForm(value) {
    let data = {
      design_year: this.Years["2021-22"],
      isCompleted: value.isCompleted,
      waterManagement: { ...value.waterManagement },
      // water_index: value.water_index,
      // waterPotability: {
      //   documents: {
      //     waterPotabilityPlan: [value.waterPotabilityPlan],
      //   },
      // },
    };
    let allFormData = JSON.parse(sessionStorage.getItem("allFormsData"));
    if (allFormData) {
      allFormData.SLBs[0] = data;
      this._ulbformService.allFormsData.next(allFormData);
    }
  }
  clickAnswer;
  answer(ans) {
    this.clickAnswer = ans
    console.log(ans)
  }
  checkIfCompletedOrNot(value) {
    //checking targets values
    for (let key in value["waterManagement"]) {
      let counter = 0;
      for (let key2 in value["waterManagement"][key]["target"]) {
        if (value["waterManagement"][key]["target"][key2]) counter++;
      }
      console.log(counter);
      if (counter != 4) {
        return false;
      }
    }

    //checking baseline values
    for (let key in value["waterManagement"]) {
      if (value["waterManagement"][key]["baseline"]["2021"] == undefined)
        return false;
    }

    //checking water potability plan values


    return true;
  }
  onSendEmitValue(value) {
    if (value.next) this.postSlbData(value);
  }

  showPreview() {
    let waterValue = {
      plan: this.data["waterPotabilityPlan"],
      index: this.data["water_index"],
    };

    console.log("isCompleted", this.isCompleted);
    this.previewData = {
      ...this.preFilledWaterManagement,
      ulb: this.loggedInUserDetails.ulb,
      ulbName: this.preFilledWaterManagement
        ? this.preFilledWaterManagement.ulbName
        : null,
      waterManagement: this.waterWasteManagementForm.getRawValue(),
      waterPotability: this.waterPotability,
      preWater: waterValue,
      isCompleted: this.isCompleted,
    };
    console.log(this.previewData);
    this._matDialog.open(this.previewPopup, {
      width: "85vw",
      maxHeight: "95vh",
      height: "fit-content",
      panelClass: "XVfc-preview",

      disableClose: false,
    });
  }

  openModal(template: TemplateRef<any>, formPreview = false) {
    if (formPreview == true) {
      this.showPreview();
      return;
    }
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }
  backButtonClicked = false
  async proceed() {
    await this._matDialog.closeAll();
    if (this.loggedInUserDetails.role == USER_TYPE.ULB) {

      // await this.dialogRef.close(true);
      let changeHappen = sessionStorage.getItem("changeInSLB");
      if (this.clickedSave) {
        this.postSlbData(this.data);
        sessionStorage.setItem("changeInSLB", "false");
        // this._router.navigate(["ulbform/service-level"]);
        return

      } else if (this.routerNavigate && changeHappen === "true") {
        console.log("this data is going in POST API", this.data);
        this.data["saveData"] = true;
        this.onWaterWasteManagementEmitValue(this.data);
        sessionStorage.setItem("changeInSLB", "false");
        this._router.navigate([this.routerNavigate.url]);
        return;
      } else if (this.routerNavigate == null && changeHappen === "false") {
        return

      }

    } else {
      if (this.backButtonClicked || this.routerNavigate) {
        this.saveSlbStateAction();
        sessionStorage.setItem("changeInSLB", "false")
        if (this.backButtonClicked) {
          return this._router.navigate(["ulbform/annual_acc"]);
        } else {
          return this._router.navigate([this.routerNavigate.url]);
        }

      }
    }
    // this.onWaterWasteManagementEmitValue(this.data);
  }
  alertClose() {
    this.stay();
  }

  async stay() {
    await this._matDialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  checkStatus(ev) {
    this.btnSave = 'SAVE'
    sessionStorage.setItem("changeInSLB", "true");
    console.log("actionValues", ev);
    this.ulbFormStaus = ev.status;
    this.ulbFormRejectR = ev.rejectReason;
  }
  clickActionButton() {
    if (this.btnSave == 'SAVE') {
      this.saveSlbStateAction();
      sessionStorage.setItem("changeInSLB", "false");
    } else {
      return this._router.navigate(["ulbform/overview"]);;
    }
  }
  saveSlbStateAction() {
    console.log("satAction", this.statePostData.data[0], "szfdg");
    let data = {
      ulb: this.ulbId,
      design_year: this.Years["2021-22"],
      isCompleted: this.statePostData.data[0].isCompleted,

      waterManagement: {
        ...this.statePostData.data[0].waterManagement,
        status: this.ulbFormStaus,
        rejectReason: this.ulbFormRejectR,
      },

      water_index: this.statePostData.data[0].water_index,
      waterPotability: {
        documents: {
          waterPotabilityPlan: [
            this.statePostData.data[0].waterPotability.documents
              .waterPotabilityPlan[0],
          ],
        },
      },
      // completeness: 'APPROVED', correctness: 'APPROVED',
    };
    if ((this.ulbFormRejectR == null || this.ulbFormRejectR == undefined) && this.ulbFormStaus == "REJECTED") {
      swal('Providing Reason for Rejection is Mandatory for Rejecting a Form');
    }
    else {
      console.log("actionData.....", data);
      this._ulbformService.postStateSlbActionSlb(data).subscribe(
        (res) => {
          swal("Record submitted successfully!");
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.slbForWaterSupplyAndSanitation.status =
            data["waterManagement"].status;
          this._ulbformService.allStatus.next(status);
        },
        (error) => {
          swal("An error occured!");
        }
      );
    }

  }
}
