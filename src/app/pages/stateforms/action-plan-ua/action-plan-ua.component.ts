import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { ActionplanserviceService } from "./actionplanservice.service";
import { StateformsService } from "../stateforms.service";
import { Router, NavigationStart, Event } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SweetAlert } from "sweetalert/typings/core";
import { ActionplanspreviewComponent } from "./actionplanspreview/actionplanspreview.component";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { ProfileService } from "src/app/users/profile/service/profile.service";
import { FasDirective } from "angular-bootstrap-md";
const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";

@Component({
  selector: "app-action-plan-ua",
  templateUrl: "./action-plan-ua.component.html",
  styleUrls: ["./action-plan-ua.component.scss"],
})
export class ActionPlanUAComponent implements OnInit {
  userLoggedInDetails: IUserLoggedInDetails;
  // loggedInUserType: USER_TYPE;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;

  uasData = JSON.parse(sessionStorage.getItem("UasList"));
  Year = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));

  data = null;
  yearCode = "2021-22";
  ulbNames = {};
  saveBtnText = "NEXT";
  routerNavigate = null;
  uaCodes = {};
  showLoader = true;
  projectCategories = [];
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  dialogRefForNavigation;
  actionRes = [];
  constructor(
    public stateformsService: StateformsService,
    public actionplanserviceService: ActionplanserviceService,
    private _router: Router,
    private dialog: MatDialog,
    private profileService: ProfileService
  ) {
    this.initializeUserType();
    this._router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          sessionStorage.setItem("changeInActionPlans", "false");
          return;
        }
        const change = sessionStorage.getItem("changeInActionPlans");
        if (change === "true" && this.routerNavigate === null) {
          this.dialog.closeAll();
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
  disableAllForms = false;
  actionFormDisable = false;
  isStateSubmittedForms = "";
  allStatus;
  formDisable = false;
  ngOnInit(): void {
    this.formDisable = sessionStorage.getItem("disableAllForms") == "true";
    this.actionFormDisable =
      sessionStorage.getItem("disableAllActionForm") == "true";
    this.stateformsService.disableAllFormsAfterMoHUAReview.subscribe(
      (disable) => {
        console.log("action plans speaking", disable);
        this.actionFormDisable = disable;
        if (disable) {
          sessionStorage.setItem("disableAllActionForm", "true");
        }
      }
    );
    sessionStorage.setItem("changeInActionPlans", "false");
    this.state_id = sessionStorage.getItem("state_id");
    this.allStatus = JSON.parse(sessionStorage.getItem("allStatusStateForms"));

    if (this.loggedInUserType == "MoHUA") {
      this.formDisable = true;
    } else if (this.loggedInUserType == "STATE") {
      if (this.allStatus["latestFinalResponse"]["role"] == "STATE") {
        this.formDisable = true;
      }
    }

    if (
      this.allStatus["latestFinalResponse"]["role"] == "STATE" &&
      this.allStatus["actionTakenByRole"] === "STATE"
    ) {
      if (
        this.allStatus["latestFinalResponse"]["actionPlans"]["status"] !=
        "PENDING"
      ) {
        this.actionFormDisable = true;
      }
    } else if (this.allStatus["latestFinalResponse"]["role"] == "MoHUA") {
      this.actionFormDisable = true;
    }

    this.getUlbNames();
    for (const key in this.uasData) {
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      this.uaCodes[key] = code;
    }
    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe(
      (disable) => {
        this.formDisable = disable;
        if (disable) {
          sessionStorage.setItem("disableAllForms", "true");
        }
      }
    );
  }
  getUlbNames() {
    this.actionplanserviceService.getUlbsByState(this.state_id).subscribe(
      (res) => {
        this.ulbNames = res["data"];
        this.getCategory();
        this.load();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategory() {
    this.actionplanserviceService.getCategory().subscribe(
      (res: Array<object>) => {
        res.forEach((element) => {
          this.projectCategories.push(element["name"]);
        });
        console.log(this.projectCategories);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  state_id;
  actionTakenByRoleOnForm = null

  load() {
    console.log(this.state_id);
    this.actionplanserviceService.getFormData(this.state_id).subscribe(
      (res) => {
        this.actionTakenByRoleOnForm = res["data"]["actionTakenByRole"];
        this.showLoader = false;
        console.log(res["data"], "sss");

        this.data = {
          state: res["data"].state,
          design_year: res["data"]["design_year"],
          uaData: res["data"]["uaData"],
          status: res["data"]["status"] ?? "PENDING",
          isDraft: res["data"]["isDraft"],
        };
        sessionStorage.setItem("actionPlans", JSON.stringify(this.data));

        this.addKeys(this.data);
      },
      (err) => {
        this.showLoader = false;
        this.onFail();
      }
    );
  }
  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
    console.log(this._router.url);
  }
  addKeys(data) {
    data.uaData.forEach((element) => {
      for (let i = 0; i < element.projectExecute.length; i++) {
        element.projectExecute[i].index = i + 1;
        element.sourceFund[i].index = i + 1;
        element.yearOutlay[i].index = i + 1;
      }
      element.name = this.uasData[element.ua]["name"];
      element.ulbList = this.uasData[element.ua]["ulb"];
      let newList = [];
      element.ulbList.forEach((e) => {
        newList.push(this.ulbNames[e]);
      });
      element.ulbList = newList;
      element.code = this.uaCodes[element.ua];
      this.actionRes.push({
        st: element.status,
        rRes: element.rejectReason
      })
    });

    data.uaData.forEach((element) => {
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.projectExecute[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.sourceFund[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(input.yearOutlay[0]));
        for (const key in e) {
          if (pro.hasOwnProperty(key)) pro[key]["value"] = e[key];
        }
        temp.push(pro);
      });
      element.yearOutlay = temp;
    });
  }

  onFail() {
    this.data = {
      state: this.userData.state,
      design_year: this.Year["2021-22"],
      uaData: [],
      status: null,
      isDraft: null,
    };
    for (const key in this.uasData) {
      let temp = JSON.parse(JSON.stringify(input));
      temp.ua = key;
      temp.name = this.uasData[key].name;
      let tempList = [];
      console.log(this.ulbNames, this.uasData[key].ulb);

      this.uasData[key].ulb.forEach((element) => {
        tempList.push(this.ulbNames[element]);
      });
      temp.ulbList = tempList;
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      temp.code = code;
      for (let index = 1; index <= temp.projectExecute.length; index++) {
        temp.projectExecute[index - 1].code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.sourceFund.length; index++) {
        temp.sourceFund[index - 1].code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.yearOutlay.length; index++) {
        temp.yearOutlay[index - 1].code.value = code + "/" + index;
      }
      this.data.uaData.push(temp);
    }
  }

  foldCard(i) {
    this.data.uaData[i].fold = !this.data.uaData[i].fold;
  }

  submit(fromPrev = null) {
    let draftFlag = 0;
    if (this.loggedInUserType === "STATE") {
      if (this.saveBtnText === "NEXT") {
        return this._router.navigate(["stateform/grant-allocation"]);
      }
      if (this.data.isDraft && !fromPrev) {
        return this.openModal(this.template1);
      }
      let data = this.makeApiData(true);
      this.actionplanserviceService.postFormData(data).subscribe(
        (res) => {
          swal("Record Submitted Successfully!");
          sessionStorage.setItem("changeInActionPlans", "false");
          const form = JSON.parse(
            sessionStorage.getItem("allStatusStateForms")
          );

          form.steps.actionPlans.isSubmit = !this.data.isDraft;
          form.steps.actionPlans.status = "PENDING";
          form.actionTakenByRole = "STATE";
          this.stateformsService.allStatusStateForms.next(form);
          if (this.routerNavigate) {
            this._router.navigate([this.routerNavigate.url]);
          } else {
            this._router.navigate(["stateform/grant-allocation"]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.loggedInUserType === "MoHUA") {
      let changeHappen = sessionStorage.getItem("changeInActionPlans");
      if (changeHappen == "false") {
        this._router.navigate(["stateform/grant-allocation"]);
        return;
      } else {
        if (this.routerNavigate) {
          this.saveStateAction();
          sessionStorage.setItem("changeInActionPlans", "false")
          if (!this.stopFlag) {
            this._router.navigate([this.routerNavigate.url]);
          }
          return;
        } else if (this.submitted) {
          this.finalActionData['uaData'].forEach(el => {
            if (el['status'] != 'APPROVED' && el['status'] != 'REJECTED') {
              draftFlag = 1;
            }
          })
          if (draftFlag) {
            this.finalActionData['isDraft'] = true;
            this.openModal(this.template1)
            return;
          } else {
            this.finalActionData['isDraft'] = false;
          }
          this.saveStateAction();
          sessionStorage.setItem("changeInActionPlans", "false")
          if (!this.stopFlag) {
            this._router.navigate(["stateform/grant-allocation"]);
          }
          return;
        }
        this.saveStateAction();
        sessionStorage.setItem("changeInActionPlans", "false")
        if (!this.stopFlag) {
          this._router.navigate(["stateform/grant-allocation"]);
        }
        return;

      }
    }
  }
  body = {};
  stopFlag = 0;
  saveStateAction() {
    let flag = 0;
    let draftFlag = 0;

    console.log(this.finalActionData);
    this.finalActionData['uaData'].forEach(el => {
      if (el.status != 'APPROVED' && el.status != 'REJECTED') {
        draftFlag = 1;
      }
    })
    if (draftFlag) {
      this.finalActionData['isDraft'] = true;
    } else {
      this.finalActionData['isDraft'] = false;
    }
    console.log(this.finalActionData['isDraft'])
    this.finalActionData.uaData.forEach((el) => {
      console.log(el.ua, el.status, el.rejectReason);

      if (
        el["status"] == "REJECTED" &&
        (!el["rejectReason"] || el["rejectReason"] == null)
      ) {
        flag = 1;
      }
    });
    if (flag) {
      swal('Providing Reason for Rejection is Mandatory for Rejecting a Form')
      this.stopFlag = 1;
      return
    }
    this.actionplanserviceService
      .postStateAction(this.finalActionData)
      .subscribe(
        (res) => {
          swal("Record submitted successfully!");
          const status = JSON.parse(
            sessionStorage.getItem("allStatusStateForms")
          );
          // status.steps.actionPlans.status = this.body["status"];
          sessionStorage.setItem("changeInActionPlans", "false");
          status.steps.actionPlans.isSubmit = !this.finalActionData["isDraft"];
          status.steps.actionPlans.status = this.finalActionData["status"];
          status.actionTakenByRole = "MoHUA";
          this.stateformsService.allStatusStateForms.next(status);

          this._router.navigate(["stateform/grant-allocation"]);
        },
        (error) => {
          swal("An error occured!");
          console.log(error.message);
        }
      );
  }
  submitted = false;
  saveButtonClicked() {
    this.submitted = true;
    this.submit()
  }
  makeApiData(fromSave = false) {
    let newUaData = [];
    this.data.uaData.forEach((element) => {
      let Uas = JSON.parse(JSON.stringify(output));
      Uas.ua = element.ua;
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.projectExecute[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.sourceFund[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.yearOutlay[0]));
        for (const key in e) {
          if (key == "index") continue;
          pro[key] = e[key]["value"];
        }
        temp.push(pro);
      });
      Uas.yearOutlay = temp;
      Uas.status = element?.status?.value ?? '';
      Uas.rejectReason = element?.rejectReason?.value ?? ''
      if (fromSave) {
        if (element.status === "REJECTED") {
          Uas.status = "PENDING";
          this.data.status = "PENDING";
        }
      }
      newUaData.push(Uas);
    });
    let apiData = JSON.parse(JSON.stringify(this.data));
    apiData.uaData = newUaData;
    this.data.uaData.forEach((uaData) => {
      for (const key in uaData) {
        if (key == "ulbList") continue;
        const uaPro = uaData[key];
        if (Array.isArray(uaPro)) {
          for (let index = 0; index < uaPro.length; index++) {
            const elements = uaPro[index];
            for (const key in elements) {
              const element = elements[key];
              if (key == "index") continue;
              if (
                element["lastValidation"] != true ||
                element["value"] === ""
              ) {
                this.data.isDraft = true;
                return apiData;
              } else {
                this.data.isDraft = false;
              }
            }
          }
        }
      }
    });
    return apiData;
  }

  getDataFromGrid(data, index) {
    let temp = sessionStorage.getItem("actionPlans");
    let allData = this.makeApiData();
    console.log(JSON.stringify(allData), "xxxxxxxxxxx", temp);

    if (!deepEqual(allData, JSON.parse(temp))) {
      sessionStorage.setItem("changeInActionPlans", "true");
      this.checkDiff();
      this.saveBtnText = "SAVE AND NEXT";
    } else {
      sessionStorage.setItem("changeInActionPlans", "false");
      this.saveBtnText = "NEXT";
    }

    if (this.loggedInUserType == "MoHUA") {
      if (sessionStorage.getItem("changeInActionPlans") == 'true') {
        this.saveBtnText = "SAVE AND NEXT";
      }
    }
  }

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      // if (result === undefined) {
      //   if (this.routerNavigate) {
      //     this.routerNavigate = null;
      //   }
      // }
    });
  }

  stay() {
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialog.closeAll();
    this.submitted = false
    this.submit(true);
  }

  alertClose() {
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  checkDiff() {
    let preData = this.makeApiData();
    let allFormData = JSON.parse(sessionStorage.getItem("allFormsPreData"));
    console.log("in actionPlan", allFormData, preData);
    if (allFormData) {
      allFormData[0].actionplans[0] = preData;
      this.stateformsService.allFormsPreData.next(allFormData);
    }
  }
  onPreview() {
    let data = this.makeApiData();
    let dialogRef = this.dialog.open(ActionplanspreviewComponent, {
      data: data,
      height: "80%",
      width: "90%",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  finalActionData;
  checkStatus(ev, ua_id, a, b) {
    sessionStorage.setItem("changeInActionPlans", "true");
    this.saveBtnText = "SAVE AND NEXT";
    console.log("action plan of UA", ev, ua_id);
    console.log("before", this.data.uaData);
    if (!this.finalActionData) {
      this.finalActionData = this.makeApiData();
      this.data['uaData'].forEach(el1 => {
        this.finalActionData['uaData'].forEach(el2 => {
          if (el1.ua == el2.ua) {
            el2.status = el1.status;
            el2.rejectReason = el1.rejectReason
          }
        })
      })
    }


    console.log(this.finalActionData);
    this.finalActionData.uaData.forEach((el) => {
      if (el.ua == ua_id) {
        el["status"] = ev.status;
        el["rejectReason"] = ev.rejectReason;
      }
    });

    this.finalActionData.uaData.forEach((element) => {
      if (element["status"] === "REJECTED") {
        this.finalActionData["status"] = "REJECTED";
      } else {
        this.finalActionData["status"] = "APPROVED";
      }
    });
    console.log("after", this.finalActionData);
  }

  getExcel() {
    let data = this.makeApiData();
    let body = {
      uaData: data.uaData,
      uaName: this.uasData,
    };

    this.actionplanserviceService.getExcel(body).subscribe(
      (res: any) => {
        let blob: any = new Blob([res], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "ActionPlanData.xlsx");
      },
      (error) => { }
    );
  }
}

const input = {
  ua: { value: "", isEmpty: null, lastValidation: true },
  status: { value: "PENDING" },
  rejectReason: { value: null },
  name: { value: "", isEmpty: null, lastValidation: true },
  projectExecute: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      code: { value: "", isEmpty: null, lastValidation: true },
      name: { value: "", isEmpty: null, lastValidation: true },
      details: { value: "", isEmpty: null, lastValidation: true },
      cost: { value: "", isEmpty: null, lastValidation: true },
      exAgency: { value: "", isEmpty: null, lastValidation: true },
      paraAgency: { value: "", isEmpty: null, lastValidation: true },
      sector: { value: "", isEmpty: null, lastValidation: true },
      type: { value: "", isEmpty: null, lastValidation: true },
      esOutcome: { value: "", isEmpty: null, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      code: { value: "", isEmpty: null, lastValidation: true },
      name: { value: "", isEmpty: null, lastValidation: true },
      cost: { value: "", isEmpty: null, lastValidation: true },
      fc: { value: 0, isEmpty: null, lastValidation: true },
      jjm: { value: 0, isEmpty: null, lastValidation: true },
      sbm: { value: 0, isEmpty: null, lastValidation: true },
      centalScheme: { value: 0, isEmpty: null, lastValidation: true },
      stateScheme: { value: 0, isEmpty: null, lastValidation: true },
      stateGrant: { value: 0, isEmpty: null, lastValidation: true },
      ulb: { value: 0, isEmpty: null, lastValidation: true },
      other: { value: 0, isEmpty: null, lastValidation: true },
      total: { value: "", isEmpty: null, lastValidation: true },
      "2021-22": { value: 0, isEmpty: null, lastValidation: true },
      "2022-23": { value: 0, isEmpty: null, lastValidation: true },
      "2023-24": { value: 0, isEmpty: null, lastValidation: true },
      "2024-25": { value: 0, isEmpty: null, lastValidation: true },
      "2025-26": { value: 0, isEmpty: null, lastValidation: true },
    },
  ],
  yearOutlay: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      code: { value: "", isEmpty: null, lastValidation: true },
      name: { value: "", isEmpty: null, lastValidation: true },
      cost: { value: 0, isEmpty: null, lastValidation: true },
      funding: { value: 0, isEmpty: null, lastValidation: true },
      amount: { value: 0, isEmpty: null, lastValidation: true },
      "2021-22": { value: 0, isEmpty: null, lastValidation: true },
      "2022-23": { value: 0, isEmpty: null, lastValidation: true },
      "2023-24": { value: 0, isEmpty: null, lastValidation: true },
      "2024-25": { value: 0, isEmpty: null, lastValidation: true },
      "2025-26": { value: 0, isEmpty: null, lastValidation: true },
    },
  ],
  fold: false,
  code: { value: "", isEmpty: null, lastValidation: true },
};

const output = {
  ua: "",
  status: "PENDING",
  rejectReason: "",
  projectExecute: [
    {
      code: "",
      name: "",
      details: "",
      cost: "",
      exAgency: "",
      paraAgency: "",
      sector: "",
      type: "",
      esOutcome: "",
    },
  ],
  sourceFund: [
    {
      code: "",
      name: "",
      cost: "",
      fc: "",
      jjm: "",
      sbm: "",
      centalScheme: "",
      stateScheme: "",
      stateGrant: "",
      ulb: "",
      other: "",
      total: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
  yearOutlay: [
    {
      code: "",
      name: "",
      cost: "",
      funding: "",
      amount: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
};

function deepEqual(x, y) {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
}
