import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ChangeDetectorRef } from "@angular/core";

import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { IUserLoggedInDetails } from "../../../models/login/userLoggedInDetails";
import { USER_TYPE } from "../../../models/user/userType";
import { UserUtility } from "../../../util/user/user";
import { ProfileService } from "../../../users/profile/service/profile.service";
import { IState } from "../../../models/state/state";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UtiReportService } from "./uti-report.service";
import { CommonService } from "src/app/shared/services/common.service";
import { Router, Event } from "@angular/router";
import { state } from "@angular/animations";
import { PreviewUtiFormComponent } from "./preview-uti-form/preview-uti-form.component";
//import { textChangeRangeIsUnchanged } from "typescript";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { HttpEventType, JsonpClientBackend } from "@angular/common/http";
import { delay, map, retryWhen } from "rxjs/operators";
import { ImagePreviewComponent } from "./image-preview/image-preview.component";
//import { url } from "inspector";
import { MapDialogComponent } from "../../../shared/components/map-dialog/map-dialog.component";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UlbformService } from "../ulbform.service";
import { NavigationStart } from "@angular/router";
import { SweetAlert } from "sweetalert/typings/core";
import { UtiNewPreComponent } from "./uti-new-pre/uti-new-pre.component";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-utilisation-report",
  templateUrl: "./utilisation-report.component.html",
  styleUrls: ["./utilisation-report.component.scss"],
})
export class UtilisationReportComponent implements OnInit {
  modalRef: BsModalRef;

  utilizationReport: FormGroup;
  utilizationForm: FormGroup;
  submitted = false;
  isSumEqual = false;
  draft = true;
  ulbFormStaus = "PENDING";
  ulbFormStatusMoHUA;
  ulbFormRejectR = null;
  finalSubmitUtiStatus;
  takeStateAction;
  compDis;
  mohuaActionComp;
  latLongRegex = '^-?([0-8]?[0-9]|[0-9]0)\\.{1}\\d{1,6}'
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _matDialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _commonService: CommonService,
    private profileService: ProfileService,
    private _router: Router,
    private UtiReportService: UtiReportService,
    private dataEntryService: DataEntryService,
    private modalService: BsModalService,
    private _ulbformService: UlbformService
  ) {
    let yearId = JSON.parse(localStorage.getItem("Years"));
    this.finalSubmitUtiStatus = localStorage.getItem("finalSubmitStatus");
    this.takeStateAction = localStorage.getItem("takeStateAction");
    this.compDis = localStorage.getItem("stateActionComDis");
    this.mohuaActionComp = localStorage.getItem("mohuaActionComDis ");
    this.lastRoleInMasterForm = localStorage.getItem("lastRoleInMasterForm");
    this.masterFormStatus = localStorage.getItem("masterFormStatus");
    console.log("finalSubmitStatus", typeof this.finalSubmitUtiStatus);

    this.designYear = yearId["2021-22"];
    this.financialYear = yearId["2020-21"];
    this.initializeUserType();
    this.fetchStateList();
    this.initializeLoggedInUserDataFetch();

    this.navigationCheck();
  }

  // tabularProject:any = [{
  //   id : 0
  // }];
  @ViewChild("templateUtil") template;
  @ViewChild("template1") template1;
  routerNavigate = null;
  totalclosingBal: Number = 0;
  projectCost = 0;
  projectExp = 0;
  selectedFile;
  categories;
  lastRoleInMasterForm;
  masterFormStatus;
  // editable;
  saveBtn = "NEXT"
  photoUrl: any = [];
  fd;
  formDataResponce;
  states: { [staeId: string]: IState };
  userLoggedInDetails: IUserLoggedInDetails;
  loggedInUserType: USER_TYPE;
  userTypes = USER_TYPE;
  errMessage;
  errorDisplay = false;
  setLocation;
  designYear;
  financialYear;
  fromPreview = null;
  isDisabled = false;
  isSubmitted = false;
  isDraft = null;
  ulbId = null;
  actionRes;

  private fetchStateList() {
    this._commonService.fetchStateList().subscribe((res) => {
      this.states = {};
      res.forEach((state) => (this.states[state._id] = state));
      this.initializeReport();
      if (
        this.finalSubmitUtiStatus == "true" &&
        this.lastRoleInMasterForm == this.userTypes.ULB
      ) {
        this.isDisabled = true;
        this.utilizationReport.disable();
        this.utilizationReport.controls.projects.disable();
      }
      if (
        this.finalSubmitUtiStatus == "true" &&
        this.lastRoleInMasterForm != this.userTypes.ULB &&
        this.masterFormStatus != "REJECTED"
      ) {
        this.isDisabled = true;
        this.utilizationReport.disable();
        this.utilizationReport.controls.projects.disable();
      }

      switch (this.userLoggedInDetails.role) {
        case USER_TYPE.STATE:
        case USER_TYPE.PARTNER:
        case USER_TYPE.MoHUA:
        case USER_TYPE.ADMIN:
          this.utilizationReport.disable();
          this.isDisabled = true;
          this.utilizationReport.controls.projects.disable();
      }

      this.getResponse();
    });
  }
  // errorShow(){
  //     this.errorDisplay = true;
  //     console.log('hello')
  // }

  ngOnInit() {
    this.clickedSave = false;
    sessionStorage.setItem("canNavigate", "true");
    this.UtiReportService.getCategory().subscribe((resdata) => {
      this.categories = resdata;
      //  console.log('res', resdata);
      this.categories = this.categories.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    let form_data = JSON.parse(sessionStorage.getItem("allStatus"));
    console.log("form-data", form_data.utilReport);
    let form_status = form_data.utilReport.isSubmit;
    console.log("stat", form_status);
    if (form_status == null) {
      this.submitted = false;
    } else if (form_status == false) {
      this.submitted = true;
      this.isSubmitted = true;
    }
    //   for state after final action
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

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe(async (event: Event) => {
        console.log("entered into router", this.routerNavigate);
        if (event instanceof NavigationStart) {
          const canNavigate = sessionStorage.getItem("canNavigate");
          console.log(canNavigate);
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("canNavigate", "true");
            return;
          }
          if (canNavigate === "false" && this.routerNavigate === null) {
            // this.dialogReference.close();

            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.openDialogBox(this.template);
            return;
          }
        }
      });
    }
  }

  currentChanges() {
    this.utilizationReport.valueChanges.subscribe((formChange) => {
      this.submitData(true);
      this.setFormDataToAllForms(this.fd, formChange);

      const oldForm = sessionStorage.getItem("utilReport");
      const change = JSON.stringify(formChange);
      if (change !== oldForm) {
        this.saveBtn = "SAVE AND NEXT"
        sessionStorage.setItem("canNavigate", "false");
      } else {
        sessionStorage.setItem("canNavigate", "true");
      }
    });
  }

  setFormDataToAllForms(data, formChange) {
    let allFormData = JSON.parse(sessionStorage.getItem("allFormsData"));
    if (allFormData) {
      allFormData.utilizationReport[0] = data;
      this._ulbformService.allFormsData.next(allFormData);
    }
  }
  analytics = []
  swm = []
  wm = []
  public getResponse() {
    this.ulbId = sessionStorage.getItem("ulb_id");
    this.UtiReportService.fetchPosts(
      this.designYear,
      this.financialYear,
      this.ulbId
    ).subscribe(
      (res) => {
        //  this.formDataResponce = res;
        console.log(res);
        this.analytics = res['analytics']
        this.analytics.forEach(el => {
          this.categories.forEach(element => {
            if (element._id == el['_id']) {
              el['categoryName'] = element.name
            }
          });
        })
        console.log(this.analytics)
        this.analytics.forEach(el => {
          if (el.categoryName == 'Solid Waste Management' || el.categoryName == 'Sanitation') {
            this.swm.push(el)
          } else {
            this.wm.push(el)
          }
        })
        if (!("_id" in res)) {

          this.utilizationReport.value["blankForm"] = true;
          console.log(this.utilizationReport, this.wm, this.swm);
          sessionStorage.setItem(
            "utilReport",
            JSON.stringify(this.utilizationReport.value)
          );

          this.currentChanges();
          this.isDraft = "fail";
          return;
        }
        this.preFilledData(res);
        const data = {
          designation: res["designation"],
          grantPosition: res["grantPosition"],
          name: res["name"],
          projects: res["projects"],
          grantType: res["grantType"],
        };


        sessionStorage.setItem("utilReport", JSON.stringify(data));
        setTimeout(() => {
          this.currentChanges();
        }, 1000);

        if (res["status"] == "APPROVED" &&
          this.lastRoleInMasterForm != this.userTypes.ULB
        ) {
          this.isDisabled = true;
          this.utilizationReport.disable();
          this.utilizationReport.controls.projects.disable();
        }

      },
      (error) => {
        this.utilizationReport.value["blankForm"] = true;
        console.log(this.utilizationReport);
        sessionStorage.setItem(
          "utilReport",
          JSON.stringify(this.utilizationReport.value)
        );
        console.log(error);
        this.currentChanges();
        this.isDraft = "fail";
      }
    );


  }

  private preFilledData(res) {
    // this.editable = res.isDraft;
    this.deleteRow(0);
    this.addPreFilledSimple(res);
    res.projects.forEach((project) => {
      this.addPreFilledRow(project);
    });
    switch (this.userLoggedInDetails.role) {
      case USER_TYPE.STATE:
      case USER_TYPE.PARTNER:
      case USER_TYPE.MoHUA:
      case USER_TYPE.ADMIN:
        this.utilizationReport.disable();
        this.isDisabled = true;
        this.utilizationReport.controls.projects.disable();
    }
    if ((this.finalSubmitUtiStatus == "true") &&
      (this.masterFormStatus != 'REJECTED')) {
      this.utilizationReport.controls.projects.disable();
    }
    if (
      this.ulbFormStaus == "REJECTED" &&
      this.userLoggedInDetails.role === USER_TYPE.ULB &&
      this.finalSubmitUtiStatus == "true" &&
      this.lastRoleInMasterForm != USER_TYPE.ULB
    ) {
      this.utilizationReport.enable();
      this.isDisabled = false;
      this.utilizationReport.controls.projects.enable();
    }
  }
  addPreFilledSimple(data) {
    let actRes = {
      st: data?.status,
      rRes: data?.rejectReason,
    };

    if (data?.status != "NA") {
      this.ulbFormStaus = data.status != "" ? data.status : "PENDING";
      if (data.actionTakenByRole == this.userTypes.STATE) {
        if (
          ((data?.status == "REJECTED" &&
            this.masterFormStatus != "REJECTED") ||
            (data?.status == "APPROVED" &&
              this.masterFormStatus != "APPROVED")) &&
          this.lastRoleInMasterForm == this.userTypes.ULB
        ) {
          this.ulbFormStaus = "PENDING";
        }
      }
      if (data.actionTakenByRole == this.userTypes.MoHUA) {
        this.ulbFormStaus = "APPROVED";
        if (
          ((data?.status == "REJECTED" &&
            this.masterFormStatus != "REJECTED") ||
            (data?.status == "APPROVED" &&
              this.masterFormStatus != "APPROVED")) &&
          this.lastRoleInMasterForm == this.userTypes.STATE
        ) {
          this.ulbFormStatusMoHUA = "PENDING";
        }
      }

      if (
        this.lastRoleInMasterForm === USER_TYPE.MoHUA &&
        this.finalSubmitUtiStatus == "true"
      ) {
        this.ulbFormStatusMoHUA = data.status;
        this.ulbFormStaus = "APPROVED";
      }
      if (
        this.lastRoleInMasterForm === USER_TYPE.STATE &&
        this.finalSubmitUtiStatus == "true" &&
        this.ulbFormStaus == "APPROVED"
      ) {
        this.ulbFormStatusMoHUA = "PENDING";
      }
    }

    this.ulbFormRejectR = data?.rejectReason;
    this.actionRes = actRes;
    console.log("asdfghj", actRes, this.actionRes);

    this.utilizationReport.patchValue({
      name: data.name,
      designation: data.designation,
      grantPosition: {
        unUtilizedPrevYr: data.grantPosition.unUtilizedPrevYr,
        receivedDuringYr: data.grantPosition.receivedDuringYr,
        expDuringYr: data.grantPosition.expDuringYr,
        closingBal: data.grantPosition.closingBal,
      },
      status: data.status,
    });
    this.totalclosingBal = data.grantPosition.closingBal;
    // if (!this.editable) this.utilizationReport.disable();
  }

  public initializeReport() {
    let stName = sessionStorage.getItem("stateName");
    let ulName = sessionStorage.getItem("ulbName");
    console.log("12345", this.userLoggedInDetails.role);
    if (this.userLoggedInDetails.role == "ULB") {
      this.utilizationForm = this.fb.group({
        stateName: new FormControl(
          this.states[this.userLoggedInDetails.state]?.name,
          Validators.required
        ),
        ulb: new FormControl(
          this.userLoggedInDetails.name,
          Validators.required
        ),
        grantType: new FormControl("Tied", Validators.required),
      });
    } else {
      this.utilizationForm = this.fb.group({
        stateName: new FormControl(stName, Validators.required),
        ulb: new FormControl(ulName, Validators.required),
        grantType: new FormControl("Tied", Validators.required),
      });
    }

    this.utilizationReport = this.fb.group({
      grantPosition: this.fb.group({
        unUtilizedPrevYr: ["", Validators.required],
        receivedDuringYr: ["", Validators.required],
        expDuringYr: ["", Validators.required],
        closingBal: [],
      }),
      projects: this.fb.array([
        this.fb.group({
          category: [null, Validators.required],
          name: ["", [Validators.maxLength(50), Validators.required]],
          // description: ["", [Validators.maxLength(200), Validators.required]],
          // // 'imgUpload' : new FormControl(''),
          // photos: this.fb.array([
          //   // this.fb.group({
          //   //   url: ['']
          //   // })
          // ]),
          // capacity: ["", Validators.required],
          location: this.fb.group({
            lat: ["", [Validators.required, Validators.pattern(this.latLongRegex)]],
            long: ["", [Validators.required, Validators.pattern(this.latLongRegex)]],
          }),

          cost: ["", Validators.required],
          expenditure: ["", Validators.required],
          // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        }),
      ]),
      status: [""],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      designation: ["", [Validators.required, Validators.maxLength(50)]],
    });
    // this.utilizationReport.disable();
    //   if(this.ulbId != null){
    //
    //     this.tabelRows.disable();
    //   }
  }

  get utiReportFormControl() {
    return this.utilizationReport.controls;
  }
  public whiteSpaceRem(controlName) {
    if (controlName == "name") {
      let name = this.utilizationReport.controls.name.value;
      name = name.trim();
      this.utilizationReport.controls.name.patchValue(name);
    }
    if (controlName == "designation") {
      let designation = this.utilizationReport.controls.designation.value;
      designation = designation.trim();
      this.utilizationReport.controls.designation.patchValue(designation);
    }
    // console.log('hi...2',(this.utilizationReport.controls.designation.value).trim());
  }

  private initializeUserType() {
    this.loggedInUserType = this.profileService.getLoggedInUserType();
  }
  get tabelRows() {
    return this.utilizationReport.get("projects") as FormArray;
  }
  calAmount(setFormControl) {
    let controlValue =
      +this.utilizationReport.value.grantPosition[setFormControl];
    if (controlValue < 0) {
      controlValue = 0;
    }
    if (!isNaN(controlValue) || controlValue != 0) {
      controlValue.toFixed(2);
    }
    if (
      this.projectExp !=
      this.utilizationReport.controls.grantPosition.value.expDuringYr
    ) {
      this.isSumEqual = true;
    } else {
      this.isSumEqual = false;
    }

    this.patchValue(controlValue, setFormControl);

    this.toatalSum();
  }
  toatalSum() {
    this.totalclosingBal =
      Number(this.utilizationReport.value.grantPosition.unUtilizedPrevYr) +
      Number(this.utilizationReport.value.grantPosition.receivedDuringYr) -
      Number(this.utilizationReport.value.grantPosition.expDuringYr);
  }

  patchValue(controlValue, setFormControl) {
    //console.log(controlValue);
    if (!isNaN(controlValue)) {
      if (controlValue == 0) {
        this.utilizationReport.controls["grantPosition"]["controls"][
          setFormControl
        ].patchValue("");
      } else {
        this.utilizationReport.controls["grantPosition"]["controls"][
          setFormControl
        ].patchValue(controlValue);
      }
    } else {
      this.utilizationReport.controls["grantPosition"]["controls"][
        setFormControl
      ].patchValue("");
    }

    //  this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].setValue(this.recValue);

    //  this.utilizationReport.controls['grantPosition']['controls']['receivedDuringYr'].setValue(this.recValue);
  }

  totalProCost(i) {
    console.log('uti form', this.utilizationReport);
    console.log('12222222--', i);
    //  if((this.utilizationReport.controls.projects.value[0].cost) > 0){
    this.projectCost = 0;
    for (let j = 0; j < this.tabelRows.length; j++) {
      console.log('val...........', this.utilizationReport.controls.projects.value[j].cost)
      if (!isNaN(this.utilizationReport.controls.projects.value[j].cost) &&
        (this.utilizationReport.controls.projects.value[j].cost) > 0) {
        this.projectCost =
          this.projectCost +
          +this.utilizationReport.controls.projects.value[j].cost;
      }
      else if (isNaN(this.utilizationReport.controls.projects.value[j].cost) ||
        (this.utilizationReport.controls.projects.value[j].cost) < 0) {
        this.utilizationReport.controls.projects["controls"][j]["controls"][
          "cost"
        ].patchValue("");
      }
      else {
        this.projectCost = this.projectCost + 0;
        console.log(this.utilizationReport);
      }
    }
    //  }else{
    //    this.utilizationReport.controls.projects["controls"][0]["controls"][
    //      "cost"
    //    ].patchValue("");
    //  }
  }
  totalExpCost(i) {
    this.projectExp = 0;
    for (let j = 0; j < this.tabelRows.length; j++) {
      //  this.projectExp = this.projectExp + Number(this.utilizationReport.controls.projects.value[j].expenditure);
      // console.log(this.projectExp);
      if (
        !isNaN(this.utilizationReport.controls.projects.value[j].expenditure)
        && (this.utilizationReport.controls.projects.value[j].expenditure)
      ) {
        this.projectExp =
          this.projectExp +
          Number(this.utilizationReport.controls.projects.value[j].expenditure);
      }
      else if (
        isNaN(this.utilizationReport.controls.projects.value[j].expenditure) ||
        (this.utilizationReport.controls.projects.value[j].expenditure) < 0
      ) {
        this.utilizationReport.controls.projects["controls"][j]["controls"][
          "expenditure"
        ].patchValue("");
      }
      else {
        this.projectExp = this.projectExp + 0;
      }
    }
    if (
      this.projectExp !=
      this.utilizationReport.controls.grantPosition.value.expDuringYr
    ) {
      this.isSumEqual = true;
    } else {
      this.isSumEqual = false;
    }
  }
  submitData(fromChange = null) {
    this.submitted = true;
    console.log(this.utilizationReport);
    //  console.log(this.utilizationReport.value);
    let user_data = JSON.parse(localStorage.getItem("userData"));

    this.fd = this.utilizationReport.value;
    this.fd.isDraft = true;
    this.fd.financialYear = this.financialYear;
    this.fd.designYear = this.designYear;
    this.fd.grantType = "Tied";
    this.fd.grantPosition.closingBal = this.totalclosingBal;
    this.fd.ulb = user_data.ulb;
    console.log(this.fd);
    let len = this.tabelRows.length;
    // for (let i = 0; i < len; i++) {
    //   const control = this.tabelRows.controls[i]["controls"]["photos"];
    //   console.log("prk", control.length);
    //   if (control.length == 0) {
    //     this.fd.isDraft = true;
    //     i = len;
    //   } else {
    //     this.fd.isDraft = false;
    //   }
    // }

    if (fromChange) return;

    if (
      this.utilizationReport.valid &&
      this.totalclosingBal >= 0 &&
      !this.isSumEqual
    ) {
      // this.fd.isDraft = false;
      console.log("if");
      console.log("api data", this.fd);
      this.apiCall(this.fd);
      sessionStorage.setItem("canNavigate", "true");
      console.log("form submitted", this.fd);
    } else {
      this.fd.isDraft = true;
      this.apiCall(this.fd);
      sessionStorage.setItem("canNavigate", "true");
    }
  }
  onSubmit() {
    alert("Submit and Next?");
  }
  onNewPre() {
    const dialogRef = this.dialog.open(UtiNewPreComponent, {
      //  height: "3508px",
      //  width: '2480px',
      width: '21cm',
      height: '100%',
      maxHeight: '90vh',
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

    });
  }
  helpData;
  onPreview() {
    if (
      this.utilizationReport.valid &&
      this.totalclosingBal >= 0 &&
      !this.isSumEqual
    ) {
      this.isDraft = false;
    } else if (this.isDraft == "fail") {
      this.isDraft = null;
    } else {
      this.isDraft = true;
    }
    let user_data = JSON.parse(localStorage.getItem("userData"));
    this.helpData = this.utilizationReport.value;
    this.helpData.isDraft = true;
    this.helpData.financialYear = this.financialYear;
    this.helpData.designYear = this.designYear;
    this.helpData.grantType = "Tied";
    this.helpData.grantPosition.closingBal = this.totalclosingBal;
    this.helpData.ulb = user_data.ulb;
    // this.helpData.utilForm = this.utilizationForm
    if (
      this.utilizationReport.valid &&
      this.totalclosingBal >= 0 &&
      !this.isSumEqual
    ) {
      // this.fd.isDraft = false;
      console.log(this.utilizationReport);
      let len = this.tabelRows.length;
      // for (let i = 0; i < len; i++) {
      //   const control = this.tabelRows.controls[i]["controls"]["photos"];
      //   console.log("prk", control.length);
      //   if (control.length == 0) {
      //     this.helpData.isDraft = true;
      //     i = len;
      //   } else {
      //     this.helpData.isDraft = false;
      //   }
      // }
    }
    console.log(this.utilizationForm);
    console.log(this.utilizationReport);
    // alert(this.utilizationForm.controls.stateName.value)
    let formdata = {
      useData: this.helpData,
      isDraft: this.isDraft,
      state_name: this.utilizationForm.controls.stateName.value,
      ulbName: this.utilizationForm.controls.ulb.value,
      grantType: this.utilizationForm.controls.grantType.value,
      grantPosition: {
        unUtilizedPrevYr:
          this.utilizationReport.controls["grantPosition"]["controls"][
            "unUtilizedPrevYr"
          ].value,
        receivedDuringYr:
          this.utilizationReport.controls["grantPosition"]["controls"][
            "receivedDuringYr"
          ].value,
        expDuringYr:
          this.utilizationReport.controls["grantPosition"]["controls"][
            "expDuringYr"
          ].value,
        closingBal: this.totalclosingBal,

        // isDraft: true,
      },
      projects: this.utilizationReport.getRawValue().projects,

      name: this.utilizationReport.controls.name.value,
      designation: this.utilizationReport.controls.designation.value,
      totalProCost: this.projectCost,
      totalExpCost: this.projectExp,
      analytics: this.analytics,
      categories: this.categories,
      // wm : this.wm,
      // swm : this.swm,
    };
    // console.log(formdata);
    for (let i = 0; i < formdata.projects.length; i++) {
      // console.log(formdata.projects[i].category);
      for (let j = 0; j < this.categories.length; j++) {
        if (this.categories[j]._id == formdata.projects[i].category) {
          formdata.projects[i].category = this.categories[j].name;
          //  console.log(formdata.projects[i].category);
        }
      }
    }

    const dialogRef = this.dialog.open(PreviewUtiFormComponent, {
      data: formdata,
      width: '85vw',
      height: '100%',
      maxHeight: '90vh',
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }

  addRow() {
    this.tabelRows.push(
      this.fb.group({
        category: [null, Validators.required],
        name: ["", [Validators.required, Validators.maxLength(50)]],
        // description: ["", [Validators.required, Validators.maxLength(200)]],
        // photos: this.fb.array([
        //   // this.fb.group({
        //   //   url: ['']
        //   // })
        // ]),
        // capacity: ["", Validators.required],
        location: this.fb.group({
          lat: ["", [Validators.required, Validators.pattern(this.latLongRegex)]],
          long: ["", [Validators.required, Validators.pattern(this.latLongRegex)]],
        }),
        cost: ["", Validators.required],
        expenditure: ["", Validators.required],
      })
    );
  }
  addPreFilledRow(data) {
    // console.log("data", data, data.photos)
    // console.log(this.tabelRows);
    this.tabelRows.push(
      this.fb.group({
        category: [data.category, Validators.required],
        name: [data.name, [Validators.required, Validators.maxLength(50)]],
        // description: [
        //   data.description,
        //   [Validators.required, Validators.maxLength(200)],
        // ],

        // photos: this.fb.array([]),
        // capacity: [data.capacity, Validators.required],
        location: this.fb.group({
          lat: [data.location.lat, [Validators.required, Validators.pattern(this.latLongRegex)]],
          long: [data.location.long, [Validators.required, Validators.pattern(this.latLongRegex)]],
        }),
        cost: [data.cost, Validators.required],
        expenditure: [data.expenditure, Validators.required],
      })
    );
    this.totalProCost(this.tabelRows.length);
    this.totalExpCost(this.tabelRows.length);
    // this.addPhotosUrl(data.photos, this.tabelRows.length - 1);

    //  if (!this.editable) this.tabelRows.disable();
  }
  setUrlGroup(url) {
    return this.fb.group({
      url: [url],
    });
  }

  addPhotosUrl(photos, i) {
    const control = <FormArray>this.tabelRows.controls[i]["controls"]["photos"];
    photos.forEach((element) => {
      let url = element.url;
      const urlObject = this.setUrlGroup(url);
      // control.push(urlObject);
    });
  }

  deleteRow(i) {
    this.tabelRows.removeAt(i);
    this.totalProCost(i);
    this.totalExpCost(i);
  }
  private initializeLoggedInUserDataFetch() {
    //  = this.profileService.getUserLoggedInDetails();
    UserUtility.getUserLoggedInData().subscribe((data) => {
      if (this.userLoggedInDetails) {
        return;
      }
      this.userLoggedInDetails = data;

      if (!this.userLoggedInDetails) {
        return this._router.navigate(["/login"]);
      }
      // switch (this.userLoggedInDetails.role) {
      //   case USER_TYPE.STATE:
      //   case USER_TYPE.ULB:
      //     return this.fetchStateList();
      // }
    });
  }

  // saveAsDraft(){
  //   console.log(this.utilizationReport);
  // }
  apiCall(fd) {
    console.log(fd);
    this.UtiReportService.createAndStorePost(fd).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.utilReport.isSubmit = res["isCompleted"];
        this._ulbformService.allStatus.next(status);
      },
      (error) => {
        swal("An error occured!");
        this.errMessage = error.message;
        console.log(this.errMessage);
      }
    );
  }
  clickedSave = false;
  clickedSaveAndNext(template1) {
    this.clickedSave = true;
    sessionStorage.setItem("canNavigate", "true");
    if (this.ulbId == null) {
      this.saveAndNext(template1);
    } else {
      if (this.ulbFormStaus != undefined || this.ulbFormStaus != null) {
        let canNavigate = sessionStorage.getItem("canNavigate");
        if (canNavigate === "true" && this.saveBtn === "NEXT") {
          return this._router.navigate(["ulbform/annual_acc"]);
        } else {
          this.stateActionSave();
          sessionStorage.setItem("canNavigate", "true");
        }

      }
    }
  }
  stateActionSave() {

    let stateData;
    stateData = this.utilizationReport.value;
    stateData.financialYear = this.financialYear;
    stateData.designYear = this.designYear;
    stateData.grantType = "Tied";
    stateData.grantPosition.closingBal = this.totalclosingBal;
    stateData.ulb = this.ulbId;
    stateData.status = this.ulbFormStaus;
    if ((this.ulbFormRejectR == null || this.ulbFormRejectR == undefined) && this.ulbFormStaus == "REJECTED") {
      swal('Providing Reason for Rejection is Mandatory for Rejecting a Form');
    } else {
      if (
        this.ulbFormStaus == "APPROVED" ||
        (this.ulbFormStaus == "REJECTED" && this.ulbFormRejectR != null)
      ) {
        stateData.isDraft = false;
      } else {
        stateData.isDraft = true;
      }
      stateData.rejectReason = this.ulbFormRejectR;

      this.UtiReportService.stateActionPost(stateData).subscribe(
        (res) => {
          swal("Record submitted successfully!");
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.utilReport.status = stateData.status;
          this._ulbformService.allStatus.next(status);
          // this._router.navigate(["ulbform/annual_acc"]);;
        },
        (error) => {
          swal("An error occured!");
          this.errMessage = error.message;
          console.log(this.errMessage);
        }
      );
    }

  }
  saveAndNext(template1) {
    let canNavigate = sessionStorage.getItem("canNavigate");
    if (canNavigate === "true" && this.saveBtn === "NEXT") {
      return this._router.navigate(["ulbform/annual_acc"]);;
    } else {
      this.submitted = true;
      console.log(this.utilizationReport);
      //  console.log(this.utilizationReport.value);
      let user_data = JSON.parse(localStorage.getItem("userData"));

      this.fd = this.utilizationReport.value;
      this.fd.isDraft = true;
      this.fd.financialYear = this.financialYear;
      this.fd.designYear = this.designYear;
      this.fd.grantType = "Tied";
      this.fd.grantPosition.closingBal = this.totalclosingBal;
      this.fd.ulb = user_data.ulb;
      if (
        this.utilizationReport.valid &&
        this.totalclosingBal >= 0 &&
        !this.isSumEqual
      ) {
        console.log("entered valid form");
        this.fd.isDraft = false;
        console.log(this.fd);
        let len = this.tabelRows.length;
        // for (let i = 0; i < len; i++) {
        //   const control = this.tabelRows.controls[i]["controls"]["photos"];
        //   console.log("prk", control.length);
        //   if (control.length == 0) {
        //     this.fd.isDraft = true;
        //     i = len;
        //   } else {
        //     this.fd.isDraft = false;
        //   }
        // }
        console.log("api data", this.fd);
        this.apiCall(this.fd);
        sessionStorage.setItem("canNavigate", "true");
        console.log("form submitted", this.fd);
        this._router.navigate(["ulbform/annual_acc"]);
        return;
      } else {
        console.log("entered invalid form");
        this.openDialogBox(template1);
        return;
      }
    }
  }

  previewClicked() {
    this.onPreview();
  }

  dialogReference;
  openDialogBox(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogReference = this._matDialog.open(template, dialogConfig);
  }

  stay() {
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  backButtonClicked = false;
  async proceed() {
    await this._matDialog.closeAll();
    let canNavigate = sessionStorage.getItem("canNavigate");
    if (this.clickedSave) {
      await this.submitData();
      sessionStorage.setItem("canNavigate", "true");
      this._router.navigate(["ulbform/annual_acc"]);
      return;
    }
    if (this.routerNavigate && canNavigate === "true") {
      this._router.navigate([this.routerNavigate.url]);
      return;
    } else if (this.routerNavigate && canNavigate === "false" && !this.actionTaken) {
      await this.submitData();
      this._router.navigate([this.routerNavigate.url]);
      return;
    } else if (this.routerNavigate && canNavigate === "false" && this.actionTaken) {

      await this.stateActionSave();
      if (this.backButtonClicked) {
        return this._router.navigate(["ulbform/grant-tra-certi"])
      } else {
        return this._router.navigate([this.routerNavigate.url]);
      }


    }
    if (this.fromPreview) {
      this.onPreview();
      return;
    }
    console.log(this.fd);
    console.log("form submitted", this.fd);
    this.apiCall(this.fd);
    sessionStorage.setItem("canNavigate", "true");
    return this._router.navigate(["ulbform/annual_acc"]);
  }
  alertClose() {
    this.stay();
  }
  // myFiles:string [] = [];
  filesToUpload: Array<File> = [];

  fileUploadTracker: {
    [fileIndex: number]: {
      alias?: string;
      percentage?: number;
      status: "in-process" | "FAILED" | "completed";
    };
  } = {};

  fileProcessingTracker: {
    [fileIndex: number]: {
      status: "in-process" | "completed" | "FAILED";
      message: string;
    };
  } = {};

  /* This is to keep track of which indexed which file is already either in data processing state
   * or in file Upload state
   */
  filesAlreadyInProcess: number[] = [];
  onFileChange(event, i, projectIndex) {
    this.resetFileTracker();
    const filesSelected = <Array<File>>event.target["files"];
    this.filesToUpload.push(...this.filterInvalidFilesForUpload(filesSelected));
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.filesToUpload.push(event.target.files[i]);

    // }
    // console.log(this.filesToUpload);
    // console.log(projectIndex, i)

    this.upload(projectIndex);
  }
  resetFileTracker() {
    this.filesToUpload = [];
    this.filesAlreadyInProcess = [];
    this.fileProcessingTracker = {};
    this.submitted = false;
    this.fileUploadTracker = {};
    this.photoUrl = [];
  }
  filterInvalidFilesForUpload(filesSelected: File[]) {
    const validFiles = [];
    for (let i = 0; i < filesSelected.length; i++) {
      const file = filesSelected[i];
      const fileExtension = file.name.split(`.`).pop();
      if (
        fileExtension === "pdf" ||
        fileExtension === "gif" ||
        fileExtension == "png" ||
        fileExtension == "jpg" ||
        fileExtension == "jpeg"
      ) {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  async upload(urlIndex) {
    // this.submitted = true;

    const formData: FormData = new FormData();
    const files: Array<File> = this.filesToUpload;
    // formData.append("year", this.bulkEntryForm.get("year").value);
    for (let i = 0; i < files.length; i++) {
      if (this.filesAlreadyInProcess.length > i) {
        continue;
      }
      console.log("pht", this.photoUrl);
      const control = <FormArray>(
        this.tabelRows.controls[urlIndex]["controls"]["photos"]
      );
      let fileLength = control.length + this.photoUrl.length;
      if (fileLength > 4 || files.length > 5) {
        swal("Maximum 5 files are allowed!");
        break;
      }
      this.filesAlreadyInProcess.push(i);
      await this.uploadFile(files[i], i, urlIndex);
    }
    // if (files.length) this.addPhotosUrl(this.photoUrl, urlIndex);
  }

  uploadFile(file: File, fileIndex: number, urlIndex) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.getURLForFileUpload(file.name, file.type).subscribe(
        (s3Response) => {
          const fileAlias = s3Response["data"][0]["file_alias"];
          //  this.photoUrl = this.tabelRows['controls'][urlIndex]['controls']['photos'].value;

          this.photoUrl.push({ url: fileAlias });

          //  this.tabelRows['controls'][urlIndex].patchValue({
          //    photos: photoUrl
          //  })
          const s3URL = s3Response["data"][0].url;
          this.uploadFileToS3(file, s3URL, fileAlias, fileIndex);
          resolve("success");
        },
        (err) => {
          if (!this.fileUploadTracker[fileIndex]) {
            this.fileUploadTracker[fileIndex] = {
              status: "FAILED",
            };
          } else {
            this.fileUploadTracker[fileIndex].status = "FAILED";
          }
        }
      );
    });
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    //  financialYear: string,
    fileIndex: number
  ) {
    this.dataEntryService
      .uploadFileToS3(file, s3URL)
      // Currently we are not tracking file upload progress. If it is need, uncomment the below code.
      // .pipe(
      //   map((response: HttpEvent<any>) =>
      //     this.logUploadProgess(response, file, fileAlias, fileIndex)
      //   )
      // )
      .subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            // this.dataEntryService
            //   .sendUploadFileForProcessing(fileAlias)
            // .subscribe((res) => {
            //   this.startFileProcessTracking(
            //     file,
            //     res["data"]["_id"],
            //     fileIndex
            //   );
            // });
            swal("Photo uploaded successfully.");
          }
        },
        (err) => {
          console.log(err);
          this.fileUploadTracker[fileIndex].status = "FAILED";
        }
      );
  }
  private startFileProcessTracking(
    file: File,
    fileId: string,
    _fileIndex: number
  ) {
    this.fileProcessingTracker[_fileIndex] = {
      status: "in-process",
      message: "Processing",
    };

    this.dataEntryService
      .getFileProcessingStatus(fileId)
      .pipe(
        map((response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          if (!response.completed && response.status !== "FAILED") {
            /**
             * We are throwing error because we need to call the api again
             * after some time (2s right now) to check if processing of
             * file is completed or not. Once it is completed or FAILED, then we stop
             * calling the api for that file.
             */
            observableThrowError("throw any error here");
          }
          return response;
        }),
        retryWhen((err) => err.pipe(delay(2000)))
      )
      .subscribe(
        (response) => {
          this.fileProcessingTracker[_fileIndex].message = response.message;
          this.fileProcessingTracker[_fileIndex].status =
            response.status === "FAILED" ? "FAILED" : "completed";
        },
        (err) => {
          if (!this.fileProcessingTracker[_fileIndex]) {
            this.fileProcessingTracker[fileId].status = "FAILED";
            this.fileProcessingTracker[fileId].message =
              "Server failed to process data.";
          }
        }
      );
  }

  imgPreview(index) {
    //  console.log(index, this.tabelRows);
    //  let photographs = this.tabelRows.value[index].photos;
    //  console.log("phoyos", photographs)
    let dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: this.tabelRows.value[index].photos,
      height: "400px",
      width: "500px",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  imgDelete(Index) {
    console.log(
      Index,
      this.tabelRows,
      this.tabelRows["controls"][Index]["controls"].photos
    );

    let mess = window.confirm("Do you want delete all photos");
    if (mess) {
      let removeUrl =
        this.tabelRows["controls"][Index]["controls"].photos.value;
      console.log(removeUrl);
      removeUrl.forEach((element, i) => {
        this.removePhotos(Index, i);
      });
    }
  }
  removePhotos(Index, i: number) {
    const control = <FormArray>(
      this.tabelRows.controls[Index]["controls"]["photos"]
    );
    control.clear();
  }

  openDialog(index): void {
    // console.log(this.tabelRows.value[index].location);
    if (
      this.tabelRows.value[index].location.lat !== "" &&
      this.tabelRows.value[index].location.long !== ""
    ) {
      this.UtiReportService.setLocation(this.tabelRows.value[index].location);
    }
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: "auto",
      height: "auto",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.setLocation = result;
      if (this.setLocation !== null) {
        this.tabelRows.controls[index][
          "controls"
        ].location.controls.lat.patchValue(this.setLocation.lat);
        this.tabelRows.controls[index][
          "controls"
        ].location.controls.long.patchValue(this.setLocation.long);
      }
    });
  }
  actionTaken = false;
  checkStatus(ev) {
    this.actionTaken = true;
    console.log("actionValues", ev);
    sessionStorage.setItem("canNavigate", "false");
    this.saveBtn = "SAVE AND NEXT";
    this.ulbFormStaus = ev.status;
    this.ulbFormRejectR = ev.rejectReason;
  }
}

function observableThrowError(arg0: string) {
  throw new Error("Function not implemented.");
}
