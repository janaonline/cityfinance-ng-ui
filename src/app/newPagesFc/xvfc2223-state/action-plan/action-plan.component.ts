import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUserLoggedInDetails } from 'src/app/models/login/userLoggedInDetails';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ActionplanserviceService } from 'src/app/pages/stateforms/action-plan-ua/actionplanservice.service';
// import { StateformsService } from 'src/app/pages/stateforms/stateforms.service';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { UserUtility } from 'src/app/util/user/user';
import { State2223Service } from '../state-services/state2223.service';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";
import { StateDashboardService } from 'src/app/pages/stateforms/state-dashboard/state-dashboard.service';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit {

  userLoggedInDetails: IUserLoggedInDetails;
  // loggedInUserType: USER_TYPE;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
  // uasData = JSON.parse(sessionStorage.getItem("UasList"));
  Year = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  data = null;
  yearCode = "2022-23";
  ulbNames = {};
  routerNavigate = null;
  uaCodes = {};
  showLoader = true;
  projectCategories = [];
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  dialogRefForNavigation;
  actionRes = [];
  stateId;
  uasData;
  constructor(
    public stateService: State2223Service,
    public actionplanserviceService: ActionplanserviceService,
    private _router: Router,
    private dialog: MatDialog,
    private profileService: ProfileService,
    public stateDashboardService: StateDashboardService,

  ) {
    this.initializeUserType();
    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("stateId");
    }
    this.getUAList();
  }
  disableAllForms = false;
  actionFormDisable = false;
  isStateSubmittedForms = "";
  allStatus;
  formDisable = false;
  backButtonClicked = false;
  body = {};
  stopFlag = 0;
  submitted = false;
  ngOnInit(): void {

  }
  getUlbNames() {
    this.actionplanserviceService.getUlbsByState(this.stateId).subscribe(
      (res) => {
        this.ulbNames = res["data"];
        this.getCategory();
        this.load();
        this.setCode()
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setCode() {
    for (const key in this.uasData) {
      let code = localStorage.getItem("state_code");
      code += "/" + this.uasData[key]?.UACode ?? "UA";
      code += "/" + this.yearCode;
      this.uaCodes[key] = code;
    }
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


  load() {
    console.log('state id', this.stateId);
    this.actionplanserviceService.getFormData(this.stateId).subscribe(
      (res) => {
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
      console.log('uas data new', this.uasData)
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
      state: this.stateId,
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
        temp.projectExecute[index - 1].Project_Code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.sourceFund.length; index++) {
        temp.sourceFund[index - 1].Project_Code.value = code + "/" + index;
      }
      for (let index = 1; index <= temp.yearOutlay.length; index++) {
        temp.yearOutlay[index - 1].Project_Code.value = code + "/" + index;
      }
      this.data.uaData.push(temp);
    }
    console.log('actin data', this.data)
  }

  foldCard(i) {
    this.data.uaData[i].fold = !this.data.uaData[i].fold;
    console.log('fold data', this.data)
  }



  submit(type) {
    let draftFlag;
    if (this.loggedInUserType === "STATE") {
      let data = this.makeApiData(true);
      if (type == 'isDraft') {
        data.isDraft = true
      } else {
        data.isDraft = false;
      }
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
          //  this.stateformsService.allStatusStateForms.next(form);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    //  else if (this.loggedInUserType === "MoHUA") {
    //   let changeHappen = sessionStorage.getItem("changeInActionPlans");
    //   if (changeHappen == "false") {
    //     this._router.navigate(["stateform/grant-allocation"]);
    //     return;
    //   } else {
    //     if (this.routerNavigate) {
    //       this.saveStateAction();
    //       sessionStorage.setItem("changeInActionPlans", "false")
    //       if (!this.stopFlag) {
    //         this._router.navigate([this.routerNavigate.url]);
    //       }
    //       return;
    //     } else if (this.submitted || this.backButtonClicked) {
    //       this.finalActionData['uaData'].forEach(el => {
    //         if (el['status'] != 'APPROVED' && el['status'] != 'REJECTED') {
    //           draftFlag = 1;
    //         }
    //       })
    //       if (draftFlag) {
    //         this.finalActionData['isDraft'] = true;
    //         this.openModal(this.template1)
    //         return;
    //       } else {
    //         this.finalActionData['isDraft'] = false;
    //       }
    //       this.saveStateAction();
    //       sessionStorage.setItem("changeInActionPlans", "false")
    //       if (!this.stopFlag && this.submitted) {
    //         this._router.navigate(["stateform/grant-allocation"]);
    //         return
    //       } else if (!this.stopFlag && this.backButtonClicked) {
    //         this._router.navigate(["stateform/action-plan"]);
    //         return
    //       }
    //       return;
    //     }
    //     this.saveStateAction();
    //     sessionStorage.setItem("changeInActionPlans", "false")
    //     if (!this.stopFlag) {
    //       this._router.navigate(["stateform/grant-allocation"]);
    //     }
    //     return;

    //   }
    // }
  }

  // saveStateAction() {
  //   let flag = 0;
  //   let draftFlag = 0;

  //   console.log(this.finalActionData);
  //   this.finalActionData['uaData'].forEach(el => {
  //     if (el.status != 'APPROVED' && el.status != 'REJECTED') {
  //       draftFlag = 1;
  //     }
  //   })
  //   if (draftFlag) {
  //     this.finalActionData['isDraft'] = true;
  //   } else {
  //     this.finalActionData['isDraft'] = false;
  //   }
  //   console.log(this.finalActionData['isDraft'])
  //   this.finalActionData.uaData.forEach((el) => {
  //     console.log(el.ua, el.status, el.rejectReason);

  //     if (
  //       el["status"] == "REJECTED" &&
  //       (!el["rejectReason"] || el["rejectReason"] == null)
  //     ) {
  //       flag = 1;
  //     }
  //   });
  //   if (flag) {
  //     swal('Providing Reason for Rejection is Mandatory for Rejecting a Form')
  //     this.stopFlag = 1;
  //     return
  //   }
  //   this.actionplanserviceService
  //     .postStateAction(this.finalActionData)
  //     .subscribe(
  //       (res) => {
  //         swal("Record submitted successfully!");
  //         const status = JSON.parse(
  //           sessionStorage.getItem("allStatusStateForms")
  //         );
  //       },
  //       (error) => {
  //         swal("An error occured!");
  //         console.log(error.message);
  //       }
  //     );
  // }

  saveButtonClicked(type) {
    this.submitted = true;
    this.submit(type)
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

  // finalActionData;
  // checkStatus(ev, ua_id, a, b) {
  //   sessionStorage.setItem("changeInActionPlans", "true");
  //   this.saveBtnText = "SAVE AND NEXT";
  //   console.log("action plan of UA", ev, ua_id);
  //   console.log("before", this.data.uaData);
  //   if (!this.finalActionData) {
  //     this.finalActionData = this.makeApiData();
  //     this.data['uaData'].forEach(el1 => {
  //       this.finalActionData['uaData'].forEach(el2 => {
  //         if (el1.ua == el2.ua) {
  //           el2.status = el1.status;
  //           el2.rejectReason = el1.rejectReason
  //         }
  //       })
  //     })
  //   }


  //   console.log(this.finalActionData);
  //   this.finalActionData.uaData.forEach((el) => {
  //     if (el.ua == ua_id) {
  //       el["status"] = ev.status;
  //       el["rejectReason"] = ev.rejectReason;
  //     }
  //   });

  //   this.finalActionData.uaData.forEach((element) => {
  //     if (element["status"] === "REJECTED") {
  //       this.finalActionData["status"] = "REJECTED";
  //     } else {
  //       this.finalActionData["status"] = "APPROVED";
  //     }
  //   });
  //   console.log("after", this.finalActionData);
  // }

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
  UANames = []
  getCardData() {
    this.stateDashboardService.getCardData(this.stateId).subscribe(
      (res: any) => {
        console.log(res);
        let data = res["data"];
        let newList = {};
        res["data"]["uaList"].forEach((element) => {
          this.UANames.push(element.name)
          newList[element._id] = element;
        });
        console.log(this.UANames)
        this.uasData = newList;
        sessionStorage.setItem("UasList", JSON.stringify(newList));
        this.getUlbNames();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getUAList() {
    this.stateService.getUAList(this.stateId).subscribe((res: any) => {
      console.log('ua list...', res);
      this.uasData = res?.data;
      this.getCardData();
    },
      (error) => {
        console.log('error', error);
      }
    )
  }

  getDataFromGrid(data, index) {
    console.log('data emit', data, index);
    let temp = sessionStorage.getItem("actionPlans");
    let allData = this.makeApiData();
    // console.log(JSON.stringify(allData), "xxxxxxxxxxx", temp);
    if (!deepEqual(allData, JSON.parse(temp))) {
      sessionStorage.setItem("changeInActionPlans", "true");
      // this.checkDiff();
      //  this.saveBtnText = "SAVE AND NEXT";
    } else {
      sessionStorage.setItem("changeInActionPlans", "false");
      //  this.saveBtnText = "NEXT";
    }

    if (this.loggedInUserType == "MoHUA") {
      if (sessionStorage.getItem("changeInActionPlans") == 'true') {
        //  this.saveBtnText = "SAVE AND NEXT";
      }
    }
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
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Details: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: "", isEmpty: null, lastValidation: true },
      Executing_Agency: { value: "", isEmpty: null, lastValidation: true },
      Parastatal_Agency: { value: "", isEmpty: null, lastValidation: true },
      Sector: { value: "", isEmpty: null, lastValidation: true },
      Type: { value: "", isEmpty: null, lastValidation: true },
      Estimated_Outcome: { value: "", isEmpty: null, lastValidation: true },
    },
  ],
  sourceFund: [
    {
      index: { value: 1, isEmpty: null, lastValidation: true },
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: "", isEmpty: null, lastValidation: true },
      XV_FC: { value: 0, isEmpty: null, lastValidation: true },
      Other: { value: 0, isEmpty: null, lastValidation: true },
      Total: { value: "", isEmpty: null, lastValidation: true },
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
      Project_Code: { value: "", isEmpty: null, lastValidation: true },
      Project_Name: { value: "", isEmpty: null, lastValidation: true },
      Cost: { value: 0, isEmpty: null, lastValidation: true },
      Funding: { value: 0, isEmpty: null, lastValidation: true },
      Amount: { value: 0, isEmpty: null, lastValidation: true },
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

      Project_Code: "",
      Project_Name: "",
      Details: "",
      Cost: "",
      Executing_Agency: "",
      Parastatal_Agency: "",
      Sector: "",
      Type: "",
      Estimated_Outcome: "",
    },
  ],
  sourceFund: [
    {
      Project_Code: "",
      Project_Name: "",
      Cost: "",
      XV_FC: "",
      Other: "",
      Total: "",
      "2021-22": "",
      "2022-23": "",
      "2023-24": "",
      "2024-25": "",
      "2025-26": "",
    },
  ],
  yearOutlay: [
    {
      Project_Code: "",
      Project_Name: "",
      Cost: "",
      Funding: "",
      Amount: "",
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
