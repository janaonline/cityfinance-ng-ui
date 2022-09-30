import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { waterWasteManagementForm } from "src/app/users/data-upload/components/configs/slb2223";
import { IFinancialData, WaterManagement } from "../../../users/data-upload/models/financial-data.interface";
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
import { UlbformService } from "../../../pages/ulbform/ulbform.service";
import { Router, NavigationStart, Event } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SweetAlert } from "sweetalert/typings/core";

const swal: SweetAlert = require("sweetalert");

import {
  services,
  targets,
  achieved,
  score
} from "src/app/users/data-upload/components/configs/slb2223";
import { Slbs2223PreviewComponent } from "./slbs2223-preview/slbs2223-preview.component";
@Component({
  selector: 'app-slbs2223',
  templateUrl: './slbs2223.component.html',
  styleUrls: ['./slbs2223.component.scss']
})
export class Slbs2223Component implements OnInit {
  nextRouter;
  backRouter;
  sideMenuItem:any;
  waterWasteManagementForm: FormGroup;
  loggedInUserType
  routerNavigate;
  USER_TYPE = USER_TYPE;
  targets = targets;
  achieved = achieved;
  score = score
  services: {
    key: keyof WaterManagement;
    name: string;
    benchmark: string;
  }[] = services;
  value;
  userData;
  @ViewChild("template") template;
  @ViewChild("template1") template1;
  @ViewChild("previewPopup") previewPopup: TemplateRef<any>;

  constructor(
    private _matDialog: MatDialog,
    private commonService: CommonService,
    private _router: Router,
    private modalService: BsModalService,
    public _ulbformService: UlbformService
  ) {
    console.log('printing waterWasteManagementForm------->',waterWasteManagementForm)

    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.loggedInUserType = this.loggedInUserDetails.role;
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
  }
  protected readonly formBuilder = new FormBuilder();
  async ngOnInit(): Promise<void> {
    this.isMillionPlusOrNot()
    this.setPreviousAndNextUrl();
    await this.getSlbData();
     this.createDataForms(this.preFilledWaterManagement)
  }
  dialogRef

  setPreviousAndNextUrl(){
    for (const key in this.sideMenuItem) {
      console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach(element => {
        console.log('name name', element);
        if(element?.name == 'SLBs for Water Supply and Sanitation'){
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
  }
  }
  isCompleted;
  previewData;
  preFilledWaterManagement;
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  clickAnswer;
  slbId;
  statePostData;
  finalSubmitStatus;
  ulbFormStaus;
  ulbFormRejectR;
  actionResSlb;
  ulbId;
  isMillionPlus;
  isUA;
  isPreviousData = false;
  isPreviousMsg;
  getSlbData() {
    // let ulbId = sessionStorage.getItem("ulb_id");
    return new Promise((resolve, reject) => {
      let designYear = "606aaf854dff55e6c075d219";
      let params = "design_year=" + designYear;
      params += "&from=2223"
      params += `&ulb=${this.ulbId}`
      this.commonService.fetchSlbData(params, this.ulbId).subscribe((res) => {
        res["data"][0].waterManagement.waterSuppliedPerDay.score['2122'] = parseFloat(res["data"][0].waterManagement.waterSuppliedPerDay.score['2122']).toFixed(2)
        this.preFilledWaterManagement =
          res["data"] && res["data"][0] ? res["data"][0] : {};
        this.preFilledWaterManagement.history = null;
        debugger
        if (res['data'].length > 0) {
          if (res['data'][0]['blank']) {
            this.clickAnswer = false
          } else {
            this.clickAnswer = true
          }
          this.isPreviousData = true;
          this.isPreviousMsg = ''
        }
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

        this.ulbFormRejectR = this.statePostData.data[0]?.waterManagement["rejectReason"];
        this.actionResSlb = actRes;
        console.log("asdfghj", actRes, this.actionResSlb);
        sessionStorage.setItem("slbData", JSON.stringify(res));
        console.log("slbsResppppppppp", res);
        console.log("important---> ", this.preFilledWaterManagement)
        resolve(res);
      },
        (error) => {
          this.isPreviousData = false;
          this.isPreviousMsg = error?.error?.message
        }
      );
    });

  }
  createDataForms(data?: IFinancialData) {
    this.waterWasteManagementForm = this.createWasteWaterUploadForm(data);
    this.waterWasteManagementForm.disable()
    console.log("check here--------> ", this.waterWasteManagementForm)
  }
  answer(ans) {
    this.clickAnswer = ans
    console.log(ans)
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

  isMillionPlusOrNot() {
   // this.ulbId = sessionStorage.getItem("ulb_id");
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

  // 5 functions checking if the data entered is as per the logic or not
  invalidWhole
  private emitValues(values: IFinancialData["waterManagement"], next = false, init = false) {
    this.invalidWhole = false;
    this.checkAutoValidCustom();
    let outputValues = {
      waterManagement: values,
      // waterPotabilityPlan: {
      //   name: fileName,
      //   url: fileUrl,
      // },
      saveData: next,
      // water_index: this.showPublishedUpload,
      isFormInvalid: this.invalidWhole,
    };

    this.onWaterWasteManagementEmitValue(outputValues);
  }
  data = "";
  res;
  clickedSave = false;

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
      // this.openModal(this.template1);
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
  Years = JSON.parse(localStorage.getItem("Years"));
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

  changeInData = false
  focusTargetKey: any = {};
  focusTargetKeyForErrorMessages: any = {};
  jsonUtil = new JSONUtility();
  benchmarks = [];
  onBlur(
    control: AbstractControl,
    formValue = "",
    currentControlKey = "",
    serviceKey = "",
    increase = true,
    init = false
  ) {
    this.changeInData = true;
    console.log('individual input field', control)
    console.log('individual service field', formValue)
    console.log('total form', this.waterWasteManagementForm)
    console.log('current Control Key', currentControlKey)
    console.log('service Key', serviceKey)
    console.log('increase', increase)

    let actualData = parseFloat(
      this.waterWasteManagementForm.controls[serviceKey]["controls"]["baseline"]?.controls["2021"]
        .value
    );
    // this.setFocusTarget()
    // console.log('focusTargetKey', this.focusTargetKey)
    // if (this.waterWasteManagementForm['controls'][serviceKey]['controls']['baseline']['controls']['2021'].touched === true) {
    //   // this.waterWasteManagementForm.controls[serviceKey]['controls']['target'].controls['2021'].status = "INVALID";
    //   this.emitValues(this.waterWasteManagementForm.getRawValue());
    // }

    this.services.forEach((data) => {
      this.focusTargetKey[data.key + "baseline"] = false;
      this.targets.forEach((item) => {
        this.focusTargetKey[data.key + item.key] = false;
      });
    });
    // console.log('previousvalue', this.previousValue)
    // console.log('aftervalue', this.afterValue)

    if (!control) return;

    const newValue = this.jsonUtil.convert(control.value);
    control.patchValue(newValue);
    let benchmarkValue;
    if (serviceKey == "waterSuppliedPerDay") {
      benchmarkValue = this.benchmarks[0];
    } else if (serviceKey == "reduction") {
      benchmarkValue = this.benchmarks[1];
    } else if (serviceKey == "houseHoldCoveredWithSewerage") {
      benchmarkValue = this.benchmarks[2];
    } else if (serviceKey == "houseHoldCoveredPipedSupply") {
      benchmarkValue = this.benchmarks[3];
    }
    // this.previousValue = this.waterWasteManagementForm.controls[serviceKey]['controls']['target']?.controls[String(parseInt(currentControlKey) - 101)]?.value ? this.waterWasteManagementForm.controls[serviceKey]['controls']['target'].controls[String(parseInt(currentControlKey) - 101)].value : null
    // this.afterValue = this.waterWasteManagementForm.controls[serviceKey]['controls']['target']?.controls[String(parseInt(currentControlKey) + 101)]?.value ? this.waterWasteManagementForm.controls[serviceKey]['controls']['target'].controls[String(parseInt(currentControlKey) + 101)].value : null
    if (formValue || currentControlKey == "actual") {
      // console.log('inside if FormValue')
      if (formValue) {
        if (
          (increase && control.value >= benchmarkValue) ||
          (!increase && control.value <= benchmarkValue)
        ) {
          this.checkAutoValidCustom();
          this.emitValues(this.waterWasteManagementForm.getRawValue());
          return;
        }
      }

      for (let el in this.waterWasteManagementForm?.controls[serviceKey]["controls"]["target"]
        ?.controls) {
        if (increase)
          // console.log(serviceKey + el)
          this.setFocusTarget(serviceKey + el);
        //console.log('focus target key after on blur', this.focusTargetKey)
        //console.log(el)
        //console.log(this.waterWasteManagementForm?.controls[serviceKey]['controls']['target']?.controls)
        let currentValue =
          this.waterWasteManagementForm?.controls[serviceKey]["controls"]["target"]?.controls[el];
        //  console.log('current Value', currentValue)
        this.onKeyUp(
          currentValue,
          formValue,
          el,
          serviceKey,
          increase,
          actualData

        );
        //currentValue is the details of that particular input field which is in focus
        //formValue is the details of entire service field
        //el - 2122,2223,2324,2425
      }
    }
    console.log("final Form after validations", this.waterWasteManagementForm);
    // this.checkAutoValidCustom();
    // this.waterWasteManagementForm['isFormInvalid'] = this.invalidWhole
    this.emitValues(this.waterWasteManagementForm.getRawValue());
  }
  setFocusTarget(focusTarget = "") {
    // this.focusTargetKey[focusTarget] =true
    // console.log('Focus target inside set focus target function', focusTarget)
    for (let obj in this.focusTargetKey) {
      if (obj == focusTarget) {
        //   console.log(obj)
        this.focusTargetKey[obj] = true;
      } else {
        this.focusTargetKey[obj] = false;
      }
    }
    // console.log('focusTargetKey', this.focusTargetKey)
  }
  setFocusTargetForErrorMessages(focusTarget = "") {
    // console.log('mouseover on', focusTarget)
    for (let obj in this.focusTargetKey) {
      if (obj == focusTarget) {
        // console.log(obj)
        this.focusTargetKeyForErrorMessages[obj] = true;
      } else {
        this.focusTargetKeyForErrorMessages[obj] = false;
      }
    }
    // console.log('focusTargetKey', this.focusTargetKey)
  }

  messages = [
    "Please Enter a Value",
    "Value must be Greater than Previous Year Target & Actual Figures",
    "Value must be Less than Previous Year Target & Actual Figures",
  ];
  onKeyUp(
    textValue,
    formValue,
    currentControlKey,
    serviceKey = "",
    increase = true,
    actualData

  ) {
    //textValue - info about the particular field
    //formvalue -> info about the particular service field
    //currentCOntrol Key - 2122,2223,2324,2425
    // console.log("estblished", textValue, formValue, currentControlKey, increase, actualData)
    let controlValue = this.waterWasteManagementForm?.value[serviceKey]?.target;
    //control value contains value filled in every input of the service yearwise
    //logic should be that whever a user enter a value, then all the input field of that service should be checked again

    if (
      this.checkIncreaseValidation(
        textValue.value,
        currentControlKey,
        controlValue,
        increase,
        serviceKey,
        actualData
      )
    ) {
      //true means the entered value is not as per the desired logic
      this.waterWasteManagementForm.controls[serviceKey]["controls"]["target"].controls[
        currentControlKey
      ].status = "INVALID";
    } else {
      this.waterWasteManagementForm.controls[serviceKey]["controls"]["target"].controls[
        currentControlKey
      ].status = "VALID";
    }
  }

  checkIncreaseValidation(
    value,
    controlKey,
    controlValue,
    increse = true,
    serviceKey,
    actualData
  ) {
    //value -> value entered in the input
    //controlKey ->2122,2223,2324,,2425
    //control value contains value filled in every input of the service yearwise
    //  console.log("increasevalidation called", value, controlKey, controlValue, increse)
    let before = true;
    let invalid = false;
    let upperLimit = 101;
    let benchmarkValue;
    if (serviceKey == "waterSuppliedPerDay") {
      benchmarkValue = this.benchmarks[0];
    } else if (serviceKey == "reduction") {
      benchmarkValue = this.benchmarks[1];
    } else if (serviceKey == "houseHoldCoveredWithSewerage") {
      benchmarkValue = this.benchmarks[2];
    } else if (serviceKey == "houseHoldCoveredPipedSupply") {
      benchmarkValue = this.benchmarks[3];
    }
    if (serviceKey === "waterSuppliedPerDay") {
      upperLimit = 1000000000000000;
    }
    if (
      (increse &&
        value >= benchmarkValue &&
        serviceKey === "waterSuppliedPerDay") ||
      (!increse && value <= benchmarkValue)
    ) {
      return false;
    }
    for (let obj in controlValue) {
      if (
        (increse && parseFloat(value) >= actualData && actualData) ||
        (!increse && parseFloat(value) <= actualData && actualData) ||
        !actualData
      ) {
        if (parseInt(obj) == parseInt(controlKey)) {
          before = false;
          return false;
        } else {
          if (before) {
            let otherValue = parseFloat(controlValue[obj]);
            let mainValue = parseFloat(value);

            if (controlValue[obj] != "") {
              // console.log(mainValue, actualData)
              invalid = increse
                ? !(
                  mainValue > 0 &&
                  mainValue < upperLimit &&
                  mainValue >= otherValue
                )
                : !(
                  mainValue > 0 &&
                  mainValue < upperLimit &&
                  mainValue <= otherValue
                );
              // console.log(value > controlValue[obj])
              // console.log("if", value, controlValue[obj], controlKey, obj)
              // console.log(invalid)
            }
            if (invalid) {
              return true;
            }
          }
        }
      } else {
        return true;
      }
    }
    return invalid;
  }

  checkAutoValidCustom() {
    for (let key in this.waterWasteManagementForm?.controls) {
      if (
        this.waterWasteManagementForm?.controls[key]["controls"]["baseline"]?.controls["2021"][
        "status"
        ] === "INVALID"
      ) {
        this.invalidWhole = true;
      }
    }

    for (let key in this.waterWasteManagementForm["controls"]) {
      for (let key2 in this.waterWasteManagementForm["controls"][key]["controls"]["target"][
        "controls"
      ]) {
        if (
          this.waterWasteManagementForm["controls"][key]["controls"]["target"]["controls"][key2][
          "status"
          ] === "INVALID"
        )
          this.invalidWhole = true;
      }
    }
    //  console.log(this.invalidWhole)
  }
  preview() {
    this.previewData = {
      ...this.preFilledWaterManagement,
      ulb: this.loggedInUserDetails.ulb,
      ulbName: this.preFilledWaterManagement
        ? this.preFilledWaterManagement.ulbName
        : null,
      waterManagement: this.waterWasteManagementForm.getRawValue(),
      isCompleted: this.isCompleted,
    };
    console.log(this.previewData)
    const dialogRef = this._matDialog.open(Slbs2223PreviewComponent, {
      data: this.previewData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
