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
const swal: SweetAlert = require("sweetalert");
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
  actionRes;
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
  isStateSubmittedForms = "";
  ngOnInit(): void {
    sessionStorage.setItem("changeInActionPlans", "false");
    this.state_id = sessionStorage.getItem("state_id");
    this.getUlbNames();
    for (const key in this.uasData) {
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      this.uaCodes[key] = code;
    }
    this.stateformsService.disableAllFormsAfterStateFinalSubmit.subscribe(
      (role) => {
        console.log("Action Plan Testing", role);
        if (role === "STATE") {
          this.disableAllForms = true;
        }
      }
    );

    if (!this.disableAllForms) {
      this.isStateSubmittedForms = sessionStorage.getItem(
        "StateFormFinalSubmitByState"
      );
      if (this.isStateSubmittedForms == "true") {
        this.disableAllForms = true;
      }
    }
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
  load() {
    console.log(this.state_id);
    this.actionplanserviceService.getFormData(this.state_id).subscribe(
      (res) => {
        this.showLoader = false;
        console.log(res["data"], "sss");
        this.data = {
          state: res["data"].state,
          design_year: res["data"]["design_year"],
          uaData: res["data"]["uaData"],
          status: res["data"]["status"],
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
    if (this.loggedInUserType === "STATE") {
      if (this.data.isDraft && !fromPrev) {
        return this.openModal(this.template1);
      }
      let data = this.makeApiData();
      this.actionplanserviceService.postFormData(data).subscribe(
        (res) => {
          swal({
            title: "Submitted",
            text: "Record submitted successfully!",
            icon: "success",
          });
          sessionStorage.setItem("changeInActionPlans", "false");
          const form = JSON.parse(sessionStorage.getItem("allStatusStateForms"));
          form.steps.actionPlans.isSubmit = !this.data.isDraft;
          form.steps.actionPlans.status = 'PENDING';
          form.actionTakenByRole = 'STATE';
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
      let changeHappen = sessionStorage.getItem("changeInActionPlans")
      if (changeHappen == "false") {
        this._router.navigate(["stateform/grant-allocation"]);
        return;
      } else {
        this.saveStateAction()
      }

    }
  }
  body = {};
  saveStateAction() {
    this.actionplanserviceService.postStateAction(this.finalActionData).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        const status = JSON.parse(
          sessionStorage.getItem("allStatusStateForms")
        );
        // status.steps.actionPlans.status = this.body["status"];
        status.steps.actionPlans.isSubmit = true;
        status.steps.actionPlans.status = this.finalActionData['status'];
        status.actionTakenByRole = 'MoHUA'
        this.stateformsService.allStatusStateForms.next(status);
        sessionStorage.setItem("changeInActionPlans", "false")
        this._router.navigate(["stateform/grant-allocation"]);
      },
      (error) => {
        swal("An error occured!");
        console.log(error.message);
      }
    );
  }

  makeApiData() {
    let newUaData = [];
    this.data.uaData.forEach((element) => {
      let Uas = JSON.parse(JSON.stringify(output));
      Uas.ua = element.ua;
      let temp = [];
      element.projectExecute.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.projectExecute[0]));
        for (const key in e) {
          pro[key] = e[key]["value"];
          if (e[key]["lastValidation"] != true) {
            this.data.isDraft = true;
          }
        }
        temp.push(pro);
      });
      Uas.projectExecute = temp;
      temp = [];
      element.sourceFund.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.sourceFund[0]));
        for (const key in e) {
          pro[key] = e[key]["value"];
          if (e[key]["lastValidation"] != true) {
            this.data.isDraft = true;
          }
        }
        temp.push(pro);
      });
      Uas.sourceFund = temp;
      temp = [];
      element.yearOutlay.forEach((e) => {
        let pro = JSON.parse(JSON.stringify(Uas.yearOutlay[0]));
        for (const key in e) {
          pro[key] = e[key]["value"];
          if (e[key]["lastValidation"] != true) {
            this.data.isDraft = true;
          }
        }
        temp.push(pro);
      });
      Uas.yearOutlay = temp;
      newUaData.push(Uas);
    });
    let apiData = JSON.parse(JSON.stringify(this.data));
    apiData.uaData = newUaData;
    return apiData;
  }

  getDataFromGrid(data, index) {
    let temp = sessionStorage.getItem("actionPlans");
    let t = this.makeApiData();

    if (JSON.stringify(t) != temp) {
      sessionStorage.setItem("changeInActionPlans", "true");
    } else {
      sessionStorage.setItem("changeInActionPlans", "false");
    }
  }

  openModal(template: TemplateRef<any>) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRefForNavigation = this.dialog.open(template, dialogConfig);
    this.dialogRefForNavigation.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  stay() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  proceed() {
    this.dialogRefForNavigation.close(true);
    this.submit(true);
  }

  alertClose() {
    this.dialogRefForNavigation.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
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
  finalActionData
  checkStatus(ev, ua_id, a, b) {
    sessionStorage.setItem("changeInActionPlans", "true")
    console.log('action plan of UA', ev, ua_id);
    console.log('before', this.data.uaData)
    if (!this.finalActionData) {
      this.finalActionData = this.makeApiData()
    }

    console.log(this.finalActionData)
    this.finalActionData.uaData.forEach(el => {
      if (el.ua == ua_id) {
        el["status"] = ev.status;
        el["rejectReason"] = ev.rejectReason;
      }
    });

    this.finalActionData.uaData.forEach(element => {
      if (element['status'] === 'REJECTED') {
        this.finalActionData['status'] = 'REJECTED'
      } else {
        this.finalActionData['status'] = 'APPROVED'
      }
    });
    console.log("after", this.finalActionData);
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
      fc: { value: "", isEmpty: null, lastValidation: true },
      jjm: { value: "", isEmpty: null, lastValidation: true },
      sbm: { value: "", isEmpty: null, lastValidation: true },
      centalScheme: { value: "", isEmpty: null, lastValidation: true },
      stateScheme: { value: "", isEmpty: null, lastValidation: true },
      stateGrant: { value: "", isEmpty: null, lastValidation: true },
      ulb: { value: "", isEmpty: null, lastValidation: true },
      other: { value: "", isEmpty: null, lastValidation: true },
      total: { value: "", isEmpty: null, lastValidation: true },
      "2021-22": { value: "", isEmpty: null, lastValidation: true },
      "2022-23": { value: "", isEmpty: null, lastValidation: true },
      "2023-24": { value: "", isEmpty: null, lastValidation: true },
      "2024-25": { value: "", isEmpty: null, lastValidation: true },
      "2025-26": { value: "", isEmpty: null, lastValidation: true },
    },
  ],
  yearOutlay: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      code: { value: "", isEmpty: null, lastValidation: true },
      name: { value: "", isEmpty: null, lastValidation: true },
      cost: { value: "", isEmpty: null, lastValidation: true },
      funding: { value: "", isEmpty: null, lastValidation: true },
      amount: { value: "", isEmpty: null, lastValidation: true },
      "2021-22": { value: "", isEmpty: null, lastValidation: true },
      "2022-23": { value: "", isEmpty: null, lastValidation: true },
      "2023-24": { value: "", isEmpty: null, lastValidation: true },
      "2024-25": { value: "", isEmpty: null, lastValidation: true },
      "2025-26": { value: "", isEmpty: null, lastValidation: true },
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
