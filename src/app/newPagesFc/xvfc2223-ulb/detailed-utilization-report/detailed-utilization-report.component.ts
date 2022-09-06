import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MapDialogComponent } from "src/app/shared/components/map-dialog/map-dialog.component";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

import { UtiReportService } from "../../../../app/pages/ulbform/utilisation-report/uti-report.service";

import { DurPreviewComponent } from "./dur-preview/dur-preview.component";
import { NavigationStart, Router } from "@angular/router";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-detailed-utilization-report",
  templateUrl: "./detailed-utilization-report.component.html",
  styleUrls: ["./detailed-utilization-report.component.scss"],
})
export class DetailedUtilizationReportComponent implements OnInit {
  constructor(
    private newCommonService: NewCommonService,
    private fb: FormBuilder,
    private UtiReportService: UtiReportService,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.navigationCheck();
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
    this.initializeReport();
  }
  durForm;
  ulbId;
  ulbName = "";
  userData;
  sideMenuItem: any;
  grantType = "Tied";
  utilizationReportForm: FormGroup;
  latLongRegex = "^-?([0-9]?[0-9]|[0-9]0)\\.{1}\\d{1,6}";
  amtRegex = "^[0-9]{1,4}(?:[.][0-9]{1,2})?$";
  ptrErr = "Two digit upto six decimals point are allowed. eg - 28.123456";
  ptrErr2 =
    "Maximum four digit upto two decimals point are allowed. eg - 9999.99";
  // amtRegex = "^(([0-9]{1,4})(.[0-9]{1,2})?)$";
  // amtRegex = `^\d{0,4}\.?\d{0,2}$`;

  postBody;
  wm_categories;
  swm_categories;
  categories;
  analytics = [];
  swm = [];
  wm = [];
  wmTotalTiedGrantUti;
  wmTotalProjectCost;
  wmTotalProjectNum;
  swmTotalTiedGrantUti;
  swmTotalProjectCost;
  swmTotalProjectNum;
  closingBal;
  totalProjectCost = 0;
  totalProjectExp = 0;
  grantsError = false;
  closingError = false;
  expDuringYear;
  isDisabled = false;
  nextRouter;
  backRouter;
  clickedSave = false;
  routerNavigate = null;
  dialogRef;
  modalRef;
  alertError = "";
  action = "";
  url = "";
  setLocation;
  isSubmitted = false;
  showPrevious = false;
  totalPExpErr = false;
  decError = false;
  errorMsg =
    "One or more required fields are empty or contains invalid data. Please check your input.";
  @ViewChild("changeTemplate") template;
  ngOnInit(): void {
    this.ulbName = this.userData?.name;
    if (!this.ulbName) {
      this.ulbName = sessionStorage.getItem("ulbName");
    }
    this.setRouter();
    this.onLoad();
  }
  formId = "";
  setRouter() {
    for (const key in this.sideMenuItem) {
      // console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        //   console.log("name name", element);
        if (element?.name == "Detailed Utilisation Report") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
          this.formId = element?._id;
        }
      });
    }
  }
  onLoad() {
    this.UtiReportService.getCategory().subscribe((resdata) => {
      this.categories = resdata;
      this.categories = this.categories.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
    this.getUtiReport();
    this.formValueChangeSubs();
    this.grantPosValueChangeSubs();
    this.wmPosValueChangeSubs();
    this.swmPosValueChangeSubs();
    this.pojectPosValueChangeSubs();
    sessionStorage.setItem("changeInUti", "false");
  }
  public initializeReport() {
    this.utilizationReportForm = this.fb.group({
      grantPosition: this.fb.group({
        unUtilizedPrevYr: [0, Validators.required],
        receivedDuringYr: [
          "",
          [Validators.required, Validators.pattern(this.amtRegex)],
        ],
        expDuringYr: [
          "",
          [Validators.required, Validators.pattern(this.amtRegex)],
        ],
        closingBal: [],
      }),
      categoryWiseData_swm: this.fb.array([
        // this.fb.group({
        //   category_name: ["", Validators.required],
        //   grantUtilised: ["", Validators.required],
        //   numberOfProjects: ["", Validators.required],
        //   totalProjectCost: ["", Validators.required],
        // }),
      ]),
      categoryWiseData_wm: this.fb.array([
        // this.fb.group({
        //   category_name: ["", Validators.required],
        //   grantUtilised: ["", Validators.required],
        //   numberOfProjects: ["", Validators.required],
        //   totalProjectCost: ["", Validators.required],
        // }),
      ]),
      projects: this.fb.array([]),
      status: [""],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      designation: ["", [Validators.required, Validators.maxLength(50)]],
      declaration: [false, Validators.required],
    });
  }

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          const canNavigate = sessionStorage.getItem("changeInUti");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInUti", "false");
            return;
          }
          if (canNavigate === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.dialog.closeAll();
            this.openDialogBox(this.template);
          }
        }
      });
    }
  }

  dialogReference;
  openDialogBox(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogReference = this.dialog.open(template, dialogConfig);
  }

  stay() {
    this.dialog.closeAll();
    this.dialogReference.close();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }

  async proceed() {
    await this.dialogReference.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.saveUtiReport("draft");
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    // if (this.routerNavigate && !this.clickedBack) {
    //  await this.saveStateActionData();
    //   sessionStorage.setItem("changeInAnnual", "false");
    //   this._router.navigate([this.routerNavigate.url]);
    //   return;
    // }
    // if (this.clickedBack && this.actionTaken) {
    //   await this.saveStateActionData();
    //   sessionStorage.setItem("changeInAnnual", "false");
    //   this._router.navigate(['/ulbform/utilisation-report']);
    //   return;
    // }
    await this.saveUtiReport("draft");
    return this._router.navigate(["ulbform2223/annual-acc"]);
  }
  async discard() {
    sessionStorage.setItem("changeInUti", "false");
    await this.dialogReference.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  get utiControls() {
    return this.utilizationReportForm.controls;
  }
  get grantPosCon() {
    return this.utilizationReportForm.controls.grantPosition["controls"];
  }
  get tabelRows() {
    return this.utilizationReportForm.get("projects") as FormArray;
  }
  get swmProject() {
    return this.utilizationReportForm.get("categoryWiseData_swm") as FormArray;
  }
  get wmProject() {
    return this.utilizationReportForm.get("categoryWiseData_wm") as FormArray;
  }
  utiData;
  canTakeAction = false;
  getUtiReport() {
    this.newCommonService.getUtiData(this.ulbId).subscribe(
      (res: any) => {
        console.log("uti report", res);
        this.utiData = res?.data;
        this.analytics = res["analytics"];
        this.action = res?.data["action"];
        this.url = res?.data["url"];
        if (this.action && this.url && this.action == "note") {
          this.showPrevious = true;
        }
        this.setcategoryData(res?.data);
        this.preFilledData(res?.data);
        if (res?.data.isDraft == false || this.userData.role != "ULB") {
          this.disableFormInputs();
        } else {
          this.isDisabled = false;
        }
        if (res?.data?.status !== "PENDING") {
          this.actionBtnDis = true;
        }
        if (res?.data?.status === "REJECTED" && this.userData?.role == "ULB") {
          this.isDisabled = true;
         this.utilizationReportForm.enable();

        }
        sessionStorage.setItem("changeInUti", "false");
        if (this.userData?.role !== "ULB") {
          let action = 'false';
          if (this.utiData?.canTakeAction) {
            action = 'true';
            this.canTakeAction = true;
          } else {
            action = 'false';
          }
          sessionStorage.setItem("canTakeAction", action);
        }

      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  patchSimpleValue(data) {
    this.utilizationReportForm.patchValue({
      name: data?.name,
      designation: data?.designation,
      declaration: data?.declaration,
      grantPosition: {
        unUtilizedPrevYr: data?.grantPosition?.unUtilizedPrevYr
          ? data?.grantPosition?.unUtilizedPrevYr
          : 0,
        receivedDuringYr: data?.grantPosition?.receivedDuringYr
          ? data?.grantPosition?.receivedDuringYr
          : null,
        expDuringYr: data?.grantPosition?.expDuringYr
          ? data?.grantPosition?.expDuringYr
          : null,
        closingBal: data?.grantPosition?.closingBal
          ? data?.grantPosition?.closingBal
          : null,
      },
      status: data?.status,
    });
    console.log(
      "data?.grantPosition?.closingBal",
      data?.grantPosition?.closingBal
    );
  }
  setcategoryData(res) {
    console.log("select", res);
    //  this.patchSimpleValue(res);

    if (res?.categoryWiseData_swm) {
      res.categoryWiseData_swm.forEach((swm_project) => {
        this.addSwmRow(swm_project, "swm_category");
      });
    } else {
      this.swm?.forEach((swmData) => {
        this.addSwmRow(swmData, "analytics_swm");
      });
    }

    if (res?.categoryWiseData_wm) {
      res?.categoryWiseData_wm.forEach((wm_project) => {
        this.addWmRow(wm_project, "wm_category");
      });
    } else {
      this.wm?.forEach((wmData) => {
        this.addWmRow(wmData, "analytics_wm");
      });
    }
    console.log("select 11", res);
  }

  addRow() {
    this.tabelRows.push(
      this.fb.group({
        category: [null, Validators.required],
        name: ["", [Validators.required, Validators.maxLength(200)]],
        // description: ["", [Validators.required, Validators.maxLength(200)]],
        // photos: this.fb.array([
        //   // this.fb.group({
        //   //   url: ['']
        //   // })
        // ]),
        // capacity: ["", Validators.required],
        location: this.fb.group({
          lat: [
            "",
            [Validators.required, Validators.pattern(this.latLongRegex)],
          ],
          long: [
            "",
            [Validators.required, Validators.pattern(this.latLongRegex)],
          ],
        }),
        cost: ["", [Validators.required, Validators.pattern(this.amtRegex)]],
        expenditure: [
          "",
          [Validators.required, Validators.pattern(this.amtRegex)],
        ],
        // engineerName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]{1,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$")]],
        // engineerContact: ["", [Validators.required, Validators.pattern("[0-9 ]{10}")]]
      })
    );
  }
  preFilledData(res) {
    // this.editable = res.isDraft;
    //this.deleteRow(0);
    this.patchSimpleValue(res);
    res?.projects.forEach((project) => {
      this.addPreFilledRow(project);
    });
  }
  addPreFilledRow(data) {
    console.log("data data", data);

    this.tabelRows.push(
      this.fb.group({
        category: [data?.category, Validators.required],
        name: [data?.name, [Validators.required, Validators.maxLength(200)]],
        // description: [
        //   data.description,
        //   [Validators.required, Validators.maxLength(200)],
        // ],

        // photos: this.fb.array([]),
        // capacity: [data.capacity, Validators.required],
        location: this.fb.group({
          lat: [
            data?.location?.lat,
            [Validators.required, Validators.pattern(this.latLongRegex)],
          ],
          long: [
            data?.location?.long,
            [Validators.required, Validators.pattern(this.latLongRegex)],
          ],
        }),
        cost: [
          data?.cost,
          [Validators.required, Validators.pattern(this.amtRegex)],
        ],
        expenditure: [
          data?.expenditure,
          [Validators.required, Validators.pattern(this.amtRegex)],
        ],
      })
    );
    // this.totalProCost(this.tabelRows.length);
    // this.totalExpCost(this.tabelRows.length);
    console.log("form 111", this.utilizationReportForm);
  }
  addSwmRow(data, type) {
    if (type == "swm_category") {
      this.swmProject.push(
        this.fb.group({
          category_name: [data?.category_name, Validators.required],
          grantUtilised: [
            data?.grantUtilised,
            [Validators.required, Validators.pattern(this.amtRegex)],
          ],
          numberOfProjects: [data?.numberOfProjects, Validators.required],
          totalProjectCost: [
            data?.totalProjectCost,
            [Validators.required, Validators.pattern(this.amtRegex)],
          ],
        })
      );
    } else {
      this.swmProject.push(
        this.fb.group({
          category_name: [data?.categoryName, Validators.required],
          grantUtilised: [
            data?.amount,
            [Validators.required, Validators.pattern(this.amtRegex)],
          ],
          numberOfProjects: [data?.count, Validators.required],
          totalProjectCost: [
            data?.totalProjectCost,
            [Validators.required, Validators.pattern(this.amtRegex)],
          ],
        })
      );
    }
  }

  addWmRow(data, type) {
    console.log("ddd", this.utilizationReportForm, this.wmProject);

    if (type == "wm_category") {
      this.wmProject.push(
        this.fb.group({
          category_name: [data?.category_name, Validators.required],
          grantUtilised: [data?.grantUtilised, Validators.required],
          numberOfProjects: [data?.numberOfProjects, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    } else {
      this.wmProject.push(
        this.fb.group({
          category_name: [data?.categoryName, Validators.required],
          grantUtilised: [data?.amount, Validators.required],
          numberOfProjects: [data?.count, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    }
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
  deleteRow(i) {
    this.tabelRows.removeAt(i);
    // this.totalProCost(i);
    // this.totalExpCost(i);
  }

  formValueChangeSubs() {
    this.utilizationReportForm?.valueChanges.subscribe((el) => {
      console.log("changes form", el);
      sessionStorage.setItem("changeInUti", "true");
    });
  }

  grantPosValueChangeSubs() {
    this.utilizationReportForm?.controls?.grantPosition?.valueChanges.subscribe(
      (el) => {
        console.log("changes grants", el);
        this.closingBal =
          Number(el?.unUtilizedPrevYr) +
          Number(el?.receivedDuringYr) -
          Number(el?.expDuringYr);
        this.expDuringYear = el?.expDuringYr;
        if (this.closingBal) {
          this.closingBal = Number(this.closingBal.toFixed(2));
        }

        // if(this.closingBal == undefined || !isNaN(this.closingBal)){
        //   this.closingBal = 0;
        // }
      }
    );
  }
  wmPosValueChangeSubs() {
    this.utilizationReportForm?.controls?.categoryWiseData_wm?.valueChanges.subscribe(
      (el) => {
        console.log("changes wm", el);
        this.wmTotalTiedGrantUti = 0;
        this.wmTotalProjectCost = 0;
        this.wmTotalProjectNum = 0;
        el?.forEach((item) => {
          this.wmTotalTiedGrantUti =
            Number(this.wmTotalTiedGrantUti) + Number(item?.grantUtilised);
          this.wmTotalProjectCost =
            Number(this.wmTotalProjectCost) + Number(item?.numberOfProjects);
          this.wmTotalProjectNum =
            Number(this.wmTotalProjectNum) + Number(item?.totalProjectCost);
        });
      }
    );
  }
  swmPosValueChangeSubs() {
    this.utilizationReportForm?.controls?.categoryWiseData_swm?.valueChanges.subscribe(
      (el) => {
        console.log("changes swm", el);
        this.swmTotalTiedGrantUti = 0;
        this.swmTotalProjectCost = 0;
        this.swmTotalProjectNum = 0;
        el?.forEach((item) => {
          this.swmTotalTiedGrantUti =
            Number(this.swmTotalTiedGrantUti) + Number(item?.grantUtilised);
          this.swmTotalProjectCost =
            Number(this.swmTotalProjectCost) + Number(item?.numberOfProjects);
          this.swmTotalProjectNum =
            Number(this.swmTotalProjectNum) + Number(item?.totalProjectCost);
        });
      }
    );
  }
  pojectPosValueChangeSubs() {
    this.utilizationReportForm?.controls?.projects?.valueChanges.subscribe(
      (el) => {
        console.log("changes grants", el);
        this.totalProjectCost = 0;
        this.totalProjectExp = 0;
        el?.forEach((item) => {
          this.totalProjectCost =
            Number(this.totalProjectCost) + Number(item?.cost);
          this.totalProjectExp =
            Number(this.totalProjectExp) + Number(item?.expenditure);
        });
      }
    );
  }

  changeInTotalPExp() {
    console.log("expDuringYear", this.expDuringYear);
    if (Math.round(Number(this.expDuringYear)) != Math.round(Number(this.totalProjectExp))) {
      // swal(
      //   "Alert",
      //   `Sum of all project wise expenditure amount does not match total expenditure amount provided in the XVFC summary section. Kindly recheck the amounts.`,
      //   "error"
      // );
      this.totalPExpErr = true;
    } else {
      this.totalPExpErr = false;
    }
  }

  changeInGrant(type) {
    this.utilizationReportForm["controls"]["grantPosition"]["controls"][
      "closingBal"
    ].patchValue(Number(this.closingBal.toFixed(2)));
    if (type == "exp") {
      let grantsExp = this.expDuringYear;
      // this.utilizationReportForm?.value?.grantPosition?.expDuringYr;
      console.log("expe error", grantsExp);
      let totalUtilised =
        Number(this.wmTotalTiedGrantUti) + Number(this.swmTotalTiedGrantUti);
      console.log("to", totalUtilised, grantsExp);
      if (totalUtilised != grantsExp && grantsExp != "") {
        // swal(
        //   "Alert",
        //   "The total expenditure in the component wise grants must not exceed the amounts of grant received.",
        //   "error"
        // );
        this.grantsError = true;
      } else {
        this.grantsError = false;
      }
    }
    if (this.closingBal < 0) {
      // swal(
      //   "Alert",
      //   `Closing balance is negative because Expenditure
      //   amount is greater than total tied grants amount available. Please recheck the amounts entered.`,
      //   "error"
      // );
      this.closingError = true;
    } else {
      this.closingError = false;
    }
  }

  saveUtiReport(type) {
    // this.utilizationReportForm["controls"]["grantPosition"]["controls"][
    //   "closingBal"
    // ].patchValue(this.closingBal);
    this.utilizationReportForm["controls"]["grantPosition"]["controls"][
      "closingBal"
    ].patchValue(Number(this.closingBal.toFixed(2)));
    this.postBody = {
      status: "",
      isDraft: true,
      financialYear: "606aaf854dff55e6c075d219",
      designYear: "606aafb14dff55e6c075d3ae",
      grantType: "Tied",
      ulb: this.ulbId,
      ...this.utilizationReportForm?.value,
    };
    console.log("form", this.utilizationReportForm);
    console.log("body", this.postBody);
    if (type == "draft") {
      this.postBody.isDraft = true;
      console.log("body draft", this.postBody);
      this.newCommonService.postUtiData(this.postBody).subscribe(
        (res) => {
          swal("Saved", "Data save as draft successfully.", "success");
          console.log("post uti mess", res);
          sessionStorage.setItem("changeInUti", "false");
          this.isSubmitted = false;
          this.newCommonService.setFormStatus2223.next(true);
        },
        (error) => {
          console.log("error", error);
          sessionStorage.setItem("changeInUti", "false");
        }
      );
    } else {
      this.isSubmitted = true;
      this.changeFormInput("dec");
      this.changeInGrant("exp");
      this.changeInTotalPExp();
      if (
        this.utilizationReportForm["controls"]["projects"]["controls"].length ==
          0 &&
        this.totalPExpErr
      ) {
        this.addRow();
      }
      this.checkValidation();
    }
  }

  checkValidation() {
    console.log("validation", this.utilizationReportForm);
    console.log(
      "error",
      this.closingError,
      this.decError,
      this.totalPExpErr,
      this.grantsError
    );
    this.postBody.isDraft = false;
    if (
      this.utilizationReportForm.invalid ||
      this.decError ||
      this.closingError ||
      this.totalPExpErr ||
      this.grantsError
    ) {
      swal("Missing Data !", `${this.errorMsg}`, "error");
      //  return true;
    } else {
      console.log("final submit", this.utilizationReportForm);
      swal(
        "Confirmation !",
        `Are you sure you want to submit this form? Once submitted,
         it will become uneditable and will be sent to State for Review.
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
            this.finalSubmit();
            break;
          case "draft":
            this.saveUtiReport("draft");
            break;
          case "cancel":
            break;
        }
      });
    }
    console.log("body draft", this.postBody);
  }
  finalSubmit() {
    this.newCommonService.postUtiData(this.postBody).subscribe(
      (res) => {
        swal("Saved", "Data save successfully.", "success");
        this.isDisabled = true;
        this.utilizationReportForm.disable();
        console.log("post uti mess", res);
        this.isSubmitted = false;
        sessionStorage.setItem("changeInUti", "false");
        this.newCommonService.setFormStatus2223.next(true);
      },
      (error) => {
        console.log("error", error);
        sessionStorage.setItem("changeInUti", "false");
      }
    );
  }
  onPreview() {
    let formdata = {
      status: "",
      isDraft: true,
      financialYear: "606aaf854dff55e6c075d219",
      designYear: "606aafb14dff55e6c075d3ae",
      grantType: "Tied",
      ulb: this.userData?.ulb,
      ...this.utilizationReportForm?.value,
      categories: this.categories,
    };
    const dialogRef = this.dialog.open(DurPreviewComponent, {
      data: formdata,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
  changeFormInput(type) {
    let formdata = {
      ...this.utilizationReportForm?.value,
    };
    console.log("utiRControls", this.utiControls);

    switch (type) {
      case "dec":
        if (
          formdata?.declaration == false ||
          formdata?.declaration == null ||
          formdata?.declaration == ""
        ) {
          // swal("Error", "Accepting the declaration is mandatory.", "error");
          this.decError = true;
        } else {
          this.decError = false;
        }
        break;
    }
  }
  numberLimitV(e, input) {
    // console.log("sss", e, input);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (+newValue > 1000 || newValue.length > 3) {
      e.preventDefault();
    }
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }

  disableFormInputs() {
    this.utilizationReportForm.disable();
    this.isDisabled = true;
  }
  actionRes;
  actionBtnDis = false;

  actionData(e) {
    console.log("action data..", e);
    this.actionRes = e;
  }
  saveAction() {
    let actionBody = {
      formId: this.formId,
      design_year: "606aafb14dff55e6c075d3ae",
      status: this.actionRes?.status,
      ulb: [this.ulbId],
      rejectReason: this.actionRes?.reason,
      responseFile: {
        url: this.actionRes?.document?.url,
        name: this.actionRes?.document?.name,
      },
    };
    if(actionBody?.rejectReason == "" &&  actionBody?.status == "REJECTED"){
       swal("Alert!", "Return reason is mandatory in case of Returned a file", "error");
       return;
    }
    swal(
      "Confirmation !",
      `Are you sure you want to submit this action? Once submitted,
      it will become uneditable and will be sent to MoHUA for Review.`,
      "warning",
      {
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
      }
    ).then((value) => {
      switch (value) {
        case "submit":
          this.finalActionSave(actionBody);
          break;
        case "cancel":
          break;
      }
    });

  }
  finalActionSave(actionBody){
    this.newCommonService.postCommonAction(actionBody).subscribe(
      (res) => {
        console.log("action respon", res);
        this.actionBtnDis = true;
        swal("Saved", "Action saved successfully.", "success");
      },
      (error) => {
        swal("Error", error?.message ? error?.message : "Error", "error");
      }
    );
  }
}
