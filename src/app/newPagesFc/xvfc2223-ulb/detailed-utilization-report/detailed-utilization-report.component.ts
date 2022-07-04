import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
@Component({
  selector: "app-detailed-utilization-report",
  templateUrl: "./detailed-utilization-report.component.html",
  styleUrls: ["./detailed-utilization-report.component.scss"],
})
export class DetailedUtilizationReportComponent implements OnInit {
  constructor(
    private newCommonService: NewCommonService,
    private fb: FormBuilder) {}
  durForm;
  ulbName = "Nimbahera Municipality";
  grantType = "Tied";
  utilizationReportForm : FormGroup;
  postBody = {
    grantPosition: {
      unUtilizedPrevYr: 0,
      receivedDuringYr: 12,
      expDuringYr: 124,
      closingBal: -112,
    },
    categoryWiseData_swm: [
      {
        category_name: "Sanitation",
        grantUtilised: "3",
        numberOfProjects: "3",
        totalProjectCost: "3",
      },
      {
        category_name: "Solid Waste Management",
        grantUtilised: "3",
        numberOfProjects: "3",
        totalProjectCost: "3",
      },
    ],
    categoryWiseData_wm: [
      {
        category_name: "Rejuvenation of Water Bodies",
        grantUtilised: "1",
        numberOfProjects: "2",
        totalProjectCost: "3",
      },
      {
        category_name: "Drinking Water",
        grantUtilised: "3",
        numberOfProjects: "2",
        totalProjectCost: "1",
      },
      {
        category_name: "Rainwater Harvesting",
        grantUtilised: "23",
        numberOfProjects: "3",
        totalProjectCost: "3",
      },
      {
        category_name: "Water Recycling",
        grantUtilised: "12",
        numberOfProjects: "233",
        totalProjectCost: "3",
      },
    ],
    projects: [],
    status: "",
    name: "Aaaaa",
    designation: "abc",
    isDraft: false,
    financialYear: "606aaf854dff55e6c075d219",
    designYear: "606aafb14dff55e6c075d3ae",
    grantType: "Tied",
    ulb: "5dd24728437ba31f7eb42e89",
  };
  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.getUtiReport();
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
      projects: this.fb.array([

      ]),
      status: [""],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      designation: ["", [Validators.required, Validators.maxLength(50)]],
    });
  }

  get utiReportFormControl() {
    return this.utilizationReportForm.controls;
  }
  getUtiReport() {
    let ulbId = "5dd24729437ba31f7eb42f1b";
    this.newCommonService.getUtiData(ulbId).subscribe(
      (res) => {
        console.log("uti report", res);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  postUtiReport() {
    this.newCommonService.postUtiData(this.postBody).subscribe(
      (res) => {
        console.log("post uti mess", res);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
}
