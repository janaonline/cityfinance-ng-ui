import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapDialogComponent } from "src/app/shared/components/map-dialog/map-dialog.component";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

import { UtiReportService } from "../../../../app/pages/ulbform/utilisation-report/uti-report.service";
import { SweetAlert } from "sweetalert/typings/core";
import { DurPreviewComponent } from "./dur-preview/dur-preview.component";
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
    private dialog: MatDialog
  ) {
    this.initializeReport();
  }
  durForm;
  ulbName = "";
  userData;
  grantType = "Tied";
  utilizationReportForm: FormGroup;
  latLongRegex = "^-?([0-9]?[0-9]|[0-9]0)\\.{1}\\d{1,6}";
  // postBody = {
  //   grantPosition: {
  //     unUtilizedPrevYr: 0,
  //     receivedDuringYr: 12,
  //     expDuringYr: 124,
  //     closingBal: -112,
  //   },
  //   categoryWiseData_swm: [
  //     {
  //       category_name: "Sanitation",
  //       grantUtilised: "3",
  //       numberOfProjects: "3",
  //       totalProjectCost: "3",
  //     },
  //     {
  //       category_name: "Solid Waste Management",
  //       grantUtilised: "3",
  //       numberOfProjects: "3",
  //       totalProjectCost: "3",
  //     },
  //   ],
  //   categoryWiseData_wm: [
  //     {
  //       category_name: "Rejuvenation of Water Bodies",
  //       grantUtilised: "1",
  //       numberOfProjects: "2",
  //       totalProjectCost: "3",
  //     },
  //     {
  //       category_name: "Drinking Water",
  //       grantUtilised: "3",
  //       numberOfProjects: "2",
  //       totalProjectCost: "1",
  //     },
  //     {
  //       category_name: "Rainwater Harvesting",
  //       grantUtilised: "23",
  //       numberOfProjects: "3",
  //       totalProjectCost: "3",
  //     },
  //     {
  //       category_name: "Water Recycling",
  //       grantUtilised: "12",
  //       numberOfProjects: "233",
  //       totalProjectCost: "3",
  //     },
  //   ],
  //   projects: [],
  //   status: "",
  //   name: "Aaaaa",
  //   designation: "abc",
  //   isDraft: false,
  //   financialYear: "606aaf854dff55e6c075d219",
  //   designYear: "606aafb14dff55e6c075d3ae",
  //   grantType: "Tied",
  //   ulb: "5dd24728437ba31f7eb42e89",
  // };
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
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData"))
      : localStorage.getItem("userData")
      ? localStorage.getItem("userData")
      : "";
    this.ulbName = this.userData?.name;
    this.onLoad();
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
  }
  public initializeReport() {
    let stName = sessionStorage.getItem("stateName");
    let ulName = sessionStorage.getItem("ulbName");
    //  console.log("12345", this.userLoggedInDetails.role);
    // if (this.userLoggedInDetails.role == "ULB") {
    //   this.utilizationForm = this.fb.group({
    //     stateName: new FormControl(
    //       this.states[this.userLoggedInDetails.state]?.name,
    //       Validators.required
    //     ),
    //     ulb: new FormControl(
    //       this.userLoggedInDetails.name,
    //       Validators.required
    //     ),
    //     grantType: new FormControl("Tied", Validators.required),
    //   });
    // } else {
    //   this.utilizationForm = this.fb.group({
    //     stateName: new FormControl(stName, Validators.required),
    //     ulb: new FormControl(ulName, Validators.required),
    //     grantType: new FormControl("Tied", Validators.required),
    //   });
    // }

    this.utilizationReportForm = this.fb.group({
      grantPosition: this.fb.group({
        unUtilizedPrevYr: new FormControl(0, Validators.required),
        receivedDuringYr: new FormControl(0, Validators.required),
        expDuringYr: new FormControl(0, Validators.required),
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

  get utiRControls() {
    return this.utilizationReportForm.controls;
  }
  get tabelRows() {
    return this.utilizationReportForm.get("projects") as FormArray;
  }
  get tabelRows_SWMcategory() {
    return this.utilizationReportForm.get("categoryWiseData_swm") as FormArray;
  }
  get tabelRows_WMcategory() {
    return this.utilizationReportForm.get("categoryWiseData_wm") as FormArray;
  }
  getUtiReport() {
    let ulbId = this.userData?.ulb;
    this.newCommonService.getUtiData(ulbId).subscribe(
      (res: any) => {
        console.log("uti report", res);
        this.analytics = res["analytics"];
        // this.analytics?.forEach((el) => {
        //   this.categories?.forEach((element) => {
        //     if (element._id == el["_id"]) {
        //       el["categoryName"] = element.name;
        //     }
        //   });
        // });
        // console.log(this.analytics);
        // this.analytics.forEach((el) => {
        //   if (
        //     el.categoryName == "Solid Waste Management" ||
        //     el.categoryName == "Sanitation"
        //   ) {
        //     this.swm.push(el);
        //   } else {
        //     this.wm.push(el);
        //   }
        // });
        this.setcategoryData(res?.data);
        this.preFilledData(res?.data);
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
        unUtilizedPrevYr: data?.grantPosition?.unUtilizedPrevYr,
        receivedDuringYr: data?.grantPosition?.receivedDuringYr,
        expDuringYr: data?.grantPosition?.expDuringYr,
        closingBal: data?.grantPosition?.closingBal,
      },
      status: data?.status,
    });
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
        cost: ["", Validators.required],
        expenditure: ["", Validators.required],
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
        cost: [data?.cost, Validators.required],
        expenditure: [data?.expenditure, Validators.required],
      })
    );
    // this.totalProCost(this.tabelRows.length);
    // this.totalExpCost(this.tabelRows.length);
    console.log("form 111", this.utilizationReportForm);
  }
  addSwmRow(data, type) {
    if (type == "swm_category") {
      this.tabelRows_SWMcategory.push(
        this.fb.group({
          category_name: [data?.category_name, Validators.required],
          grantUtilised: [data?.grantUtilised, Validators.required],
          numberOfProjects: [data?.numberOfProjects, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    } else {
      this.tabelRows_SWMcategory.push(
        this.fb.group({
          category_name: [data?.categoryName, Validators.required],
          grantUtilised: [data?.amount, Validators.required],
          numberOfProjects: [data?.count, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    }
  }

  addWmRow(data, type) {
    console.log("ddd", this.utilizationReportForm, this.tabelRows_WMcategory);

    if (type == "wm_category") {
      this.tabelRows_WMcategory.push(
        this.fb.group({
          category_name: [data?.category_name, Validators.required],
          grantUtilised: [data?.grantUtilised, Validators.required],
          numberOfProjects: [data?.numberOfProjects, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    } else {
      this.tabelRows_WMcategory.push(
        this.fb.group({
          category_name: [data?.categoryName, Validators.required],
          grantUtilised: [data?.amount, Validators.required],
          numberOfProjects: [data?.count, Validators.required],
          totalProjectCost: [data?.totalProjectCost, Validators.required],
        })
      );
    }
  }
  setLocation;
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
  isSubmitted = false;
  formValueChangeSubs() {
    this.utilizationReportForm?.valueChanges.subscribe((el) => {
      console.log("changes form", el);
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
  totalPExpErr = false;
  changeInTotalPExp() {
    if (this.expDuringYear != this.totalProjectExp) {
      swal(
        "Alert",
        `Sum of all project wise expenditure amount does not match total expenditure amount provided in the XVFC summary section. Kindly recheck the amounts.`,
        "error"
      );
      this.totalPExpErr = true;
    } else {
      this.totalPExpErr = false;
    }
  }

  changeInGrant(type) {
    if (type == "exp") {
      let grantsExp = this.expDuringYear;
      // this.utilizationReportForm?.value?.grantPosition?.expDuringYr;
      console.log("expe error", grantsExp);
      let totalUtilised =
        Number(this.wmTotalTiedGrantUti) + Number(this.swmTotalTiedGrantUti);
      console.log("to", totalUtilised);

      if (totalUtilised != grantsExp) {
        swal(
          "Alert",
          "The total expenditure in the component wise grants must not exceed the amounts of grant received.",
          "error"
        );
        this.grantsError = true;
      } else {
        this.grantsError = false;
      }
    }
    if (this.closingBal < 0) {
      swal(
        "Alert",
        `Closing balance is negative because Expenditure
        amount is greater than total tied grants amount available. Please recheck the amounts entered.`,
        "error"
      );
      this.closingError = true;
    } else {
      this.closingError = false;
    }
  }

  saveUtiReport(type) {
    this.utilizationReportForm["controls"]["grantPosition"]["controls"][
      "closingBal"
    ].patchValue(this.closingBal);
    this.postBody = {
      status: "",
      isDraft: true,
      financialYear: "606aaf854dff55e6c075d219",
      designYear: "606aafb14dff55e6c075d3ae",
      grantType: "Tied",
      ulb: this.userData?.ulb,
      ...this.utilizationReportForm?.value,
    };
    console.log("body", this.postBody);
    if (type == "draft") {
      this.postBody.isDraft = true;
      console.log("body draft", this.postBody);
      this.newCommonService.postUtiData(this.postBody).subscribe(
        (res) => {
          swal("Saved", "Data save as draft successfully.", "success");
          console.log("post uti mess", res);
        },
        (error) => {
          console.log("error", error);
        }
      );
    } else {
      this.isSubmitted = true;
      this.checkValidation();
    }
  }
  decError = false;
  checkValidation() {
    console.log("validation", this.utilizationReportForm);
    this.postBody.isDraft = false;
    if (
      this.postBody?.declaration == false ||
      this.postBody?.declaration == null ||
      this.postBody?.declaration == ""
    ) {
      swal("Error", "Accepting the declaration is mandatory.", "error");
      this.decError = true;
    } else {
      this.decError = false;
    }
    console.log("body draft", this.postBody);
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
    console.log('utiRControls', this.utiRControls);
    
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
}
