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
import { NewCommonService } from 'src/app/shared2223/services/new-common.service';
import { CommonServicesService } from 'src/app/fc-grant-2324-onwards/fc-shared/service/common-services.service';



@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.scss']
})
export class ActionPlanComponent implements OnInit {

  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
  Year = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  data = null;
  yearCode = "2022-23";
  ulbNames = {};
  routerNavigate = null;
  uaCodes = {};
  showLoader = true;
  projectCategories = [];
 // dialogRefForNavigation;
  actionRes = [];
  stateId;
  uasData;
  isDisabled = false;
  body = {};
  stopFlag = 0;
  submitted = false;
  reqBody;
  finalError = false;
  isPreYear = false;
  preMess = '';
  backRouter = '';
  nextRouter = '';
  canTakeAction:boolean = false;
  actionError = false;
  actionBtnDis = false;
  errorMsg = "One or more required fields are empty or contains invalid data. Please check your input.";
  UANames = [];
  isApiInProgress = true;
  sideMenuItem;
  finalActionData;
  designYear = '';
  pendingStatus:string = "PENDING";
  formId:string = '';
  constructor(
    public actionplanserviceService: ActionplanserviceService,
    private _router: Router,
   // private dialog: MatDialog,
    private profileService: ProfileService,
    public stateDashboardService: StateDashboardService,
    public stateService: State2223Service,
    private newCommonService: NewCommonService,
    public fcCommonServices: CommonServicesService

  ) {
    this.initializeUserType();

    this.stateId = this.userData?.state;
    if (!this.stateId) {
      this.stateId = localStorage.getItem("state_id");
    }
    this.designYear = this.Year['2022-23'];
  }


  ngOnInit(): void {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftStateMenuRes"));
    this.getUAList();
    this.setRouter();
  }
  getUlbNames() {
    this.actionplanserviceService.getUlbsByState(this.stateId).subscribe(
      (res) => {
        this.ulbNames = res["data"];
        this.getCategory();
        this.load();
        this.setCode();
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
    let year = this.designYear;
    this.isApiInProgress = true;
    this.stateService.getFormDataAction(this.stateId, year).subscribe(
      (res: any) => {
        this.showLoader = false;
        this.isApiInProgress = false;
        console.log(res["data"], "sss");
        this.getDisabledLogic(res);
        this.data = {
          state: res["data"]?.state,
          design_year: this.designYear,
          uaData: res["data"]?.uaData,
          status: this.getStatus(res),
          isDraft: res["data"]?.isDraft,
          canTakeAction : res["data"]?.canTakeAction,
        };
        this.canTakeAction = res["data"]?.canTakeAction
        sessionStorage.setItem("actionPlans", JSON.stringify(this.data));
        this.addKeys(this.data);
        this.isPreYear = true;
      },
      (err) => {
        console.log('error msg', err);
        this.showLoader = false;
        this.preMess = err?.error?.message;
        this.isPreYear = false;
        this.isApiInProgress = false;
        //this.onFail();
      },
      ()=>{
        console.log('completed,,,,,', this.data);
        this.actionPayloadPrepare();
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
      design_year: this.designYear,
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
      if (type == 'isDraft') {
        this.reqBody = this.makeApiData(true);
        this.reqBody.isDraft = true;
        this.reqBody.status = 2;
        this.postData();
      } else {
        // this.reqBody.isDraft = false;

        this.reqBody = this.makeApiData(true);
        if (this.finalError) {
          swal("Missing Data !", `${this.errorMsg}`, "error");
          return;
        } else {
          swal(
            "Confirmation !",
            `Are you sure you want to submit this form? Once submitted,
             it will become uneditable and will be sent to MoHUA for Review.
              Alternatively, you can save as draft for now and submit it later.`,
            "warning",
            {
              buttons: {
                Submit: {
                  text: "Submit",
                  value: "submit",
                },
                Draft: {
                  text: "Save as Draft",
                  value: "draft",
                },
                Cancel: {
                  text: "Cancel",
                  value: "cancel",
                },
              },
            }
          ).then((value) => {
            switch (value) {
              case "submit":
                this.reqBody.isDraft = false;
                this.reqBody.status = this.yearCode == '2022-23' ? this.pendingStatus : 4
                this.postData();
                break;
              case "draft":
                this.reqBody.isDraft = true;
                this.reqBody.status = this.yearCode == '2022-23' ? this.pendingStatus : 2
                this.postData();
                break;
              case "cancel":
                break;
            }
          });
        }
      }

    }
  }

  postData() {
    this.actionplanserviceService.postFormData(this.reqBody).subscribe(
      (res) => {
        if (this.reqBody.isDraft == true) {
          swal("Saved", "Data saved as draft successfully.", "success");
        } else {
          swal("Saved", "Data saved successfully.", "success");
          this.isDisabled = true;
        }
        this.getUlbNames();
        sessionStorage.setItem("changeInActionPlans", "false");
        const form = JSON.parse(
          sessionStorage.getItem("allStatusStateForms")
        );
        if(this.yearCode == '2023-24') this.fcCommonServices.setFormStatusState.next(true);
        if(this.yearCode == '2022-23') this.newCommonService.setStateFormStatus2223.next(true);
        form.steps.actionPlans.isSubmit = !this.data.isDraft;
        // form.steps.actionPlans.status = "PENDING";
        // form.actionTakenByRole = "STATE";
        //  this.stateformsService.allStatusStateForms.next(form);
      },
      (err) => {
        console.log(err);
      }
    );
  }


 saveButtonClicked(type) {
    this.submitted = true;
    this.unfoldAllCard(type);
    setTimeout(() => {
      this.submit(type);
    }, 1000);

  }
  unfoldAllCard(type){
    if(type == 'save'){
      let len = this.data.uaData.length;
      for(let i=0; i < len; i++){
        if(this.data.uaData[i].fold == false) this.foldCard(i);
      }
    }
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
          Uas.status = this.pendingStatus;
          this.data.status = this.pendingStatus;
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
                this.finalError = true;
                return apiData;
              } else {
                this.data.isDraft = false;
                this.finalError = false;
              }
            }
          }
        }
      }
    });
    return apiData;
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

    // if (this.loggedInUserType == "MoHUA") {
    //   if (sessionStorage.getItem("changeInActionPlans") == 'true') {
    //     //  this.saveBtnText = "SAVE AND NEXT";
    //   }
    // }
  }

    saveAction() {
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
  // console.log('action payload.',this.finalActionData)

    this.actionplanserviceService
      .postStateAction(this.finalActionData)
      .subscribe(
        (res) => {
          console.log('res..', res)
          swal("Record submitted successfully!");
        },
        (error) => {
          swal("An error occured!");
          console.log(error.message);
        }
      );
   }
  actionData(e, pIndex) {
    // console.log('state action...action plan', e, pIndex);
    // console.log('this.data 1', this.finalActionData);

    this.finalActionData = this.makeApiData();
    this.finalActionData["uaData"][pIndex]["status"] = e?.status;
    this.finalActionData["uaData"][pIndex]["rejectReason"] = e?.reason;
   // console.log('this.data 3 ', this.finalActionData);

  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      this.sideMenuItem[key].forEach((element) => {
        if (element?.url == "action-plan") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          this.formId = element?._id;

        }
      });
    }
  }
  
    getDisabledLogic(res) {
      if (this.loggedInUserType !== "STATE") {
        this.isDisabled = true;
        return;
      }
    
      switch (this.yearCode) {
        case '2023-24':
          if ([4, 6].includes(res?.data.statusId)) {
            this.isDisabled = true;
            return;
          }
          break;
        default:
          if (res?.data?.isDraft === false) {
            this.isDisabled = true;
            return;
          }
          break;
      }
    
      this.isDisabled = false;
    }
  getStatus(res){
    if(this.yearCode == '2022-23'){
      return res["data"]?.status ?? this.pendingStatus;
    }
    if(this.yearCode == '2023-24'){
      return res["data"]?.statusId ?? this.pendingStatus;
    }
  }

  actionPayloadPrepare(){
    //console.log('');
    
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
