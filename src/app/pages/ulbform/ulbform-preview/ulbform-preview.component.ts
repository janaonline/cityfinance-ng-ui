import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { PreviewSlbComponentComponent } from "../preview-slb-component/preview-slb-component.component";
import { UtiReportService } from "../utilisation-report/uti-report.service";
import { LinkPFMSAccount } from "../link-pfms/link-pfms.service";
import { WaterSanitationService } from "../water-sanitation/water-sanitation.service";
import { AnnualAccountsService } from "../annual-accounts/annual-accounts.service";
@Component({
  selector: "app-ulbform-preview",
  templateUrl: "./ulbform-preview.component.html",
  styleUrls: ["./ulbform-preview.component.scss"],
})
export class UlbformPreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    public utiReportService: UtiReportService,
    public linkPFMSAccount: LinkPFMSAccount,
    public waterSanitationService: WaterSanitationService,
    public annualAccountsService: AnnualAccountsService,
    private UtiReportService: UtiReportService
  ) {
    this.UtiReportService.getCategory().subscribe((res) => {
      let obj = {};
      for (const key in res) {
        let id = res[key]["_id"];
        obj[id] = res[key]["name"];
      }
      this.categories = obj;
    });
    this.commonService.fetchStateList().subscribe((res) => {
      let stateId = JSON.parse(localStorage.getItem("userData"))["state"];
      for (const it of res) {
        if (it._id == stateId) {
          this.stateName = it.name;
          break;
        }
      }
    });
  }

  detailUtilError = {
    grantPosition: {
      unUtilizedPrevYr: null,
      receivedDuringYr: null,
      expDuringYr: null,
      closingBal: null,
    },
    status: null,
    remarks: null,
    modifiedAt: null,
    createdAt: null,
    isActive: null,
    isDraft: null,
    designYear: null,
    financialYear: null,
    ulb: null,
    actionTakenBy: null,
    designation: null,
    grantType: null,
    name: null,
    projects: [
      {
        location: {
          lat: null,
          long: null,
        },
        modifiedAt: null,
        createdAt: null,
        category: null,
        name: null,
        description: null,
        photos: [],
        capacity: null,
        cost: null,
        expenditure: null,
      },
    ],
  };
  slbWaterSanitaionError = {
    ulb: {
      code: null,
      name: null,
      state: {
        name: null,
        code: null,
      },
    },
    document: {
      message: null,
    },
    millionPlusCities: {
      documents: {
        cityPlan: [],
        serviceLevelPlan: [],
        solidWastePlan: [],
        waterBalancePlan: [],
      },
    },
    solidWasteManagement: {
      documents: {
        garbageFreeCities: [],
        waterSupplyCoverage: [],
      },
    },
    status: null,
    waterManagement: {
      serviceLevel: {
        status: null,
        rejectReason: null,
      },
      houseHoldCoveredPipedSupply: {
        baseline: {
          2021: null,
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null,
        },
        status: null,
        rejectReason: null,
      },
      waterSuppliedPerDay: {
        baseline: {
          2021: null,
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null,
        },
        status: null,
        rejectReason: null,
      },
      reduction: {
        baseline: {
          2021: null,
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null,
        },
        status: null,
        rejectReason: null,
      },
      houseHoldCoveredWithSewerage: {
        baseline: {
          2021: null,
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null,
        },
        status: null,
        rejectReason: null,
      },
      status: null,
      rejectReason: null,
    },
    waterPotability: {
      documents: {
        waterPotabilityPlan: [
          {
            name: null,
            url: null,
          },
        ],
      },
    },
    water_index: null,
    fromParent: null,
  };
  waterSanitation = null;
  pfmsError = {
    response: {
      account: null,
      linked: null,
    },
  };
  annualAccountError = [
    {
      design_year: null,
      audit_status: null,
      isCompleted: false,
      year: null,
      submit_annual_accounts: {
        answer: null,
      },
      submit_standardized_data: {
        answer: null,
      },
      provisional_data: {
        bal_sheet: {
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          pdfName: null,
          excelUrl: null,
          excelError: null,
          pdfError: null,
          excelName: null,
          rejectReason: null,
        },
        bal_sheet_schedules: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        inc_exp: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        inc_exp_schedules: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        cash_flow: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        auditor_report: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
      },
      standardized_data: {
        upload: {
          excelUrl: null,
          excelName: null,
          progressExcel: null,
          excelError: null,
        },
        declaration: null,
      },
    },
    {
      design_year: null,
      audit_status: null,
      isCompleted: false,
      year: null,
      submit_annual_accounts: {
        answer: null,
      },
      submit_standardized_data: {
        answer: null,
      },
      provisional_data: {
        bal_sheet: {
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          pdfName: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        bal_sheet_schedules: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        inc_exp: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        inc_exp_schedules: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        cash_flow: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
        auditor_report: {
          pdfName: null,
          pdfUrl: null,
          progress: null,
          progressExcel: null,
          excelUrl: null,
          excelName: null,
          excelError: null,
          pdfError: null,
          rejectReason: null,
        },
      },
      standardized_data: {
        upload: {
          excelUrl: null,
          excelName: null,
          progressExcel: null,
          excelError: null,
        },
        declaration: null,
      },
    },
  ];

  categories;
  slbWaterSanitaion = null;
  detailUtil = null;
  pfms = null;
  annualAccount = null;
  userData = JSON.parse(localStorage.getItem("userData"));
  years = JSON.parse(localStorage.getItem("Years"));
  designYear;
  isMillionPlus;
  isUA;
  stateName;

  ngOnInit(): void {
    this.designYear = this.years["2021-22"];
    this.onLoad();
  }

  async onLoad() {
    this.accessGrant();
    await this.getLinkPfms();
    await this.detailUtilData();
    await this.getAnnualAccount();
    if (this.isUA == "Yes") await this.getSlbData();
    // if (this.isMillionPlus == "No") await this.getWaterSanitation();
  }

  public accessGrant() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.isMillionPlus = userData.isMillionPlus;
    this.isUA = userData.isUA;
  }

  detailUtilData() {
    return new Promise((resolve, reject) => {
      this.utiReportService.fetchPosts().subscribe(
        (res) => {
          res["projects"].forEach((element) => {
            element.category = this.categories[element.category];
          });
          let formdata = {
            state_name: this.stateName,
            ulbName: JSON.parse(localStorage.getItem("userData"))["name"],
            grntType: res["grantType"],
            grantPosition: res["grantPosition"],
            projects: res["projects"],
            name: res["name"],
            designation: res["designation"],
            totalProCost: res["projectCost"],
            totalExpCost: res["projectExp"],
          };
          this.detailUtil = formdata
          resolve("Success");
        },
        (err) => {
          this.detailUtil = this.detailUtilError;
          resolve("Success");
        }
      );
    });
  }

  getSlbData() {
    return new Promise((resolve, reject) => {
      let params = "design_year=" + this.designYear;
      this.commonService.fetchSlbData(params).subscribe(
        (res) => {
          this.slbWaterSanitaion =
            res["data"] && res["data"][0] ? res["data"][0] : {};
          this.slbWaterSanitaion.fromParent = true;
          resolve(res);
        },
        (err) => {
          this.slbWaterSanitaion = this.slbWaterSanitaionError;
          resolve("Success");
        }
      );
    });
  }

  getLinkPfms() {
    return new Promise((resolve, reject) => {
      this.linkPFMSAccount.getData(this.designYear).subscribe(
        (res) => {
          this.pfms = res["response"];
          resolve("Success");
        },
        (err) => {
          this.pfms = this.pfmsError;
          resolve("Success");
        }
      );
    });
  }

  getWaterSanitation() {
    return new Promise((resolve, reject) => {
      this.waterSanitationService.getFiles().subscribe(
        (res) => {
          this.waterSanitation = res["plans"];
          resolve("Success");
        },
        (err) => {
          resolve("Success");
        }
      );
    });
  }

  getAnnualAccount() {
    return new Promise((resolve, reject) => {
      const param = {
        design_year: this.designYear,
      };
      this.annualAccountsService.getData(param).subscribe(
        (res) => {
          this.annualAccount = res["data"];
          resolve("Sucess");
        },
        (err) => {
          this.annualAccount = this.annualAccountError;
          resolve("Success");
        }
      );
    });
  }
}
