import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { PreviewSlbComponentComponent } from "../preview-slb-component/preview-slb-component.component";
import { UtiReportService } from "../utilisation-report/uti-report.service";
import { LinkPFMSAccount } from "../link-pfms/link-pfms.service";
import { WaterSanitationService } from "../water-sanitation/water-sanitation.service";
import { AnnualAccountsService } from "../annual-accounts/annual-accounts.service";
import { QuestionnaireService } from "../../questionnaires/service/questionnaire.service";
import { defaultDailogConfiuration } from "../../questionnaires/ulb/configs/common.config";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { templateJitUrl } from "@angular/compiler";
import { UlbformService } from "../ulbform.service";
@Component({
  selector: "app-ulbform-preview",
  templateUrl: "./ulbform-preview.component.html",
  styleUrls: ["./ulbform-preview.component.scss"],
})
export class UlbformPreviewComponent implements OnInit, OnDestroy {
  @ViewChild("ulbformPre") _html: ElementRef;
  showLoader = true;
  changeTrigger: any = {
    changeInPFMSAccount: false,
    changeInSLB: false,
    canNavigate: false,
    changeInPlans: false,
    changeInAnnual: false,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    public utiReportService: UtiReportService,
    public linkPFMSAccount: LinkPFMSAccount,
    public waterSanitationService: WaterSanitationService,
    public annualAccountsService: AnnualAccountsService,

    private UtiReportService: UtiReportService,
    private _questionnaireService: QuestionnaireService,
    private _matDialog: MatDialog,
    public ulbformService: UlbformService
  ) {}

  styleForPDF = `<style>
  .b-hide {
    display: none;
  }
  .m-h {
    font-size: 20px;
    margin-top: 5px;
    font-weight: 700;
}
.m-h-mr {
  padding-bottom: 1rem !important;
}
.sub-m-h{
    font-size: 17px;
    font-weight: 600;
    text-align: center;
}
.header-u-p {
  background-color: #047474;
  text-align: center;
  height: 60px;
}

.heading-u-p {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
  padding-top: 1.3rem !important;
}
.slb-pd-t {
  background-color: #047474;
  text-align: center;
  height: 60px;
}
.slb-h{
  font-size: 18px;
  padding-top: 1.3rem !important;
  font-weight: 700;
}
.card {
    padding: 5px 10px;
    background-color: #EBF5F5;
}
.qus-h {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px !important;
}

.ans-h {
    margin-bottom: .5rem;
    margin-left: 1.2rem;
    margin-top: .5rem;
    font-size: 10px !important;
}

.h-cls{
      display: none;
    }

    .qus-h-an {
      margin-bottom: .5rem;
      margin-top: 1rem;
      font-size: 10px;
  }

  .ans-h-an {
      margin-bottom: .5rem;
      margin-top: .5rem;
      font-size: 10px;
  }
  @media print {
    .page-break {
        page-break-before: always;
    }
  }
  .h-font {
    display: inline-block;
    font-size: 12px !important;
  }
  .f-r {
    margin-left: 30px;
  }
  .ans-h-an{
    margin-left : .5rem !important;
  }
  .ans-h-na{
    margin-left : 1rem !important;
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px !important;
  }
  .hi{
    display:none
  }
  .qus-h-an-ex {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px;
    margin-left : .5rem !important;
  }
  .ans-h-an-b {
      margin-bottom: .5rem;
      margin-top: .5rem;
      margin-left : 1rem !important;
      font-size: 10px;
  }
  .form-status {
    font-size: 10px;
    margin-top: 10px;
  }
  .header-ut-p {
    background-color: #047474;
    text-align: center;
  }

  .heading-ut-p {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    padding: 1%;
  }


  .f-table {
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 12px;
  }


.h-uti-p {
    font-size: 16px;
    font-weight: 700;
    margin-top: 1rem;
    color: #FFFFFF;
}

.s-h-uti {
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    padding-bottom: 1%;
}

.se-r {
    margin-top: 2%;
}

.st-n {
    font-size: 12px;
    font-weight: 600;
}

.m-top {
    margin-top: 1%;
    margin-bottom: 2%;
}

tr {
    text-align: center;
}


.f-text {
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    padding-top: 2rem;

}

.sig-text {
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}

.m-b {
    margin-top: .5rem !important;
    margin-bottom: 5%;
}

.pd-row {
    padding-left: 4%;
    padding-right: 4%;
}

.pd-row-n {
    padding-left: 2%;
    padding-right: 2%;
}
.name-row {
    margin-top: 4rem !important;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
}
.pdf-hide{
  display : none;
}


.ff-table>table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>tfoot>tr>td,
  .table>tfoot>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
      padding: 2px 0px;
      line-height: 1.42857143;
      vertical-align: middle;
}
.pj-tb{
  margin-top: 3rem;
}
.pd-r {
  padding-left : 6px !important;
}
.se-tb{
  padding-top : 1rem !important;
}
.pd-th {
  padding-left: 2px !important;
  padding-right: 2px !important;
}
.p-tb {
  padding-left: 3px !important;
  padding-right: 3px !important;
}
:root {
  font-size: 14px;
}
.sub-h-font{
  font-size: 14px !important;
  font-weight: 600;
}
.heading-font{
  font-size: 18px !important;
  font-weight: 700;

}
.slb-pd {
  padding: 2% 0% 2.5% 0%;
}
.t-tb-tr {
  border: 100px solid black;
}
t-tb-tr:nth-child(even) {
  background: #d7ebeb;
}
t-tb-tr:nth-child(even) td {
  border:1px solid #d7ebeb;
}
  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: .9rem;
  }

   h4 {
    font-size: .7rem;
  }
     h5 {
    font-size: .5rem;
  }

  .tb-th-s {
    font-size: .6rem
  }

  .tb-th-s, li {
    font-size: .6rem
  }

  .td-width {
    width: 25%;
  }

  button {
    display: none;
  }
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.form-status {
  font-size: 10px;
  margin-top: 10px;
}
.fa-times {
  display: none;
}

  </style>`;

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
    analytics : []
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
      name: null,
      url: null,
    },
    water_index: null,
    fromParent: null,
  };

  pfmsError = {
    response: {
      account: "",
      linked: "",
    },
  };

  annualAccountError = {
    isDraft: false,
    audited: {
      provisional_data: {
        bal_sheet: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        bal_sheet_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        inc_exp: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        inc_exp_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        auditor_report: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
      },
      standardized_data: {
        excel: {
          url: null,
          name: null,
        },
        declaration: null,
      },
      audit_status: "Audited",
      submit_annual_accounts: null,
      submit_standardized_data: null,
    },
    unAudited: {
      provisional_data: {
        bal_sheet: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        bal_sheet_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        inc_exp: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        inc_exp_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
        },
      },
      standardized_data: {
        excel: {
          url: null,
          name: null,
        },
        declaration: null,
      },
      audit_status: "Unaudited",
      submit_annual_accounts: null,
      submit_standardized_data: null,
    },
  };

  waterSanitationError = {
    water: {
      name: null,
      component: null,
      serviceLevel: {
        indicator: null,
        existing: null,
        after: null,
      },
      cost: null,
    },
    sanitation: {
      name: null,
      component: null,
      serviceLevel: {
        indicator: null,
        existing: null,
        after: null,
      },
      cost: null,
    },
  };

  categories;
  slbWaterSanitaion = null;
  detailUtil = null;
  pfms = null;
  annualAccount = null;
  waterSanitation = null;
  userData = JSON.parse(localStorage.getItem("userData"));
  years = JSON.parse(localStorage.getItem("Years"));
  designYear;
  financialYear;
  stateName;

  canDownload = true;
  downloadSub;

  ngOnInit(): void {
    this.downloadSub = this.ulbformService.initiateDownload.subscribe(
      (proceedSelected) => {
        if (proceedSelected) {
          this.downloadAsPDF();
        }
      }
    );
    this.designYear = this.years["2021-22"];
    this.financialYear = this.years["2020-21"];
    this.onLoad();
  }

  ngOnDestroy() {
    this.downloadSub.unsubscribe();
  }

  async onLoad() {
    await this.getCat();
    await this.getsState();
    this.checkDataChange();
    if (this.data) {
      this.setAllData(this.data);
    } else this.getAllForm();
  }

  checkDataChange() {
    const status = [
      "changeInAnnual",
      "changeInPFMSAccount",
      "changeInPlans",
      "changeInSLB",
      "canNavigate",
    ];
    status.forEach((element) => {
      let change = sessionStorage.getItem(element);
      if (
        element == "canNavigate"
      ) {
        if(change == 'false')
        {
          this.changeTrigger[element] = true;
          this.canDownload = false;
        }
        return
      }
      if (
        change == "true"
      ) {
        this.changeTrigger[element] = true;
        this.canDownload = false;
      }
    });
  }

  getAllForm() {
    this.ulbformService
      .getAllForms(this.userData.ulb, this.designYear, this.financialYear)
      .subscribe((res) => {
        this.showLoader = false;
        this.setAllData(res[0]);
      });
  }

  setAllData(data) {
    //this.setLinkPfms(data.pfmsAccounts[0]);
    this.setDetailUtilData(data.utilizationReport[0]);
    this.setAnnualAccount(data.annualAccountData[0]);
  //  if (data.isUA == "Yes")
    this.setSlbData(data.SLBs[0]);
  //  if (data.isMillionPlus == "No") this.setWaterSanitation(data.plansData[0]);
    this.showLoader = false;
  }

  setDetailUtilData(detailUtilData) {
    if (detailUtilData) {
      detailUtilData["projects"].forEach((element) => {
        element.category = this.categories[element.category];
      });
      let formdata = {
        state_name: this.stateName,
        ulbName: JSON.parse(localStorage.getItem("userData"))["name"],
        grantType: detailUtilData["grantType"] ?? "Tied",
        grantPosition: detailUtilData["grantPosition"],
        projects: detailUtilData["projects"],
        analytics :detailUtilData['analytics'],
        name: detailUtilData["name"],
        designation: detailUtilData["designation"],
        totalProCost: detailUtilData["projectCost"] ?? 0,
        totalExpCost: detailUtilData["projectExp"] ?? 0,
      };
      this.detailUtil = formdata;
      this.detailUtil.useData = detailUtilData;
      this.detailUtil.useData.projects.forEach((element) => {
        element.category_id = this.categories[element.category];
      });
    } else this.detailUtil = this.detailUtilError;
  }

  setSlbData(slbData) {
    if (!slbData) {
      this.slbWaterSanitaion = this.slbWaterSanitaionError;
      return
    }
    this.slbWaterSanitaion = slbData;
    if (this.slbWaterSanitaion) {
      // let tem =
      //   this.slbWaterSanitaion.waterPotability.documents
      //     ?.waterPotabilityPlan[0];
      // if (tem) this.slbWaterSanitaion.waterPotability = tem;
     this.slbWaterSanitaion.fromParent = true;
    }
  }

  setLinkPfms(pfmsData) {
    if (pfmsData) this.pfms = pfmsData;
    else this.pfms = this.pfmsError;
  }

  setWaterSanitation(plans) {
    if (plans) {
      this.waterSanitation = plans["plans"];
      this.waterSanitation.isDraft = plans["isDraft"];
    } else this.waterSanitation = this.waterSanitationError;
  }

  setAnnualAccount(annualAccountData) {
    if (annualAccountData) this.annualAccount = annualAccountData;
    else this.annualAccount = this.annualAccountError;
  }

  openModal() {
    if (this.canDownload) this.downloadAsPDF();
    const status = [
      "changeInAnnual",
      "changeInPFMSAccount",
      "changeInPlans",
      "changeInSLB",
      "canNavigate",
    ];
    status.forEach((element) => {
      if (sessionStorage.getItem(element) == "true") {
        switch (element) {
          case "changeInAnnual":
            this.annualAccountsService.OpenModalTrigger.next(true);
            break;
          case "changeInPlans":
            this.waterSanitationService.OpenModalTrigger.next(true);
            break;
          case "changeInPFMSAccount":
            this.linkPFMSAccount.OpenModalTrigger.next(true);
            break;
          case "changeInSLB":
            this.commonService.OpenModalTrigger.next(true);
            break;
        }
      } else if (element == "canNavigate") {
        this.utiReportService.OpenModalTrigger.next(true);
      }
    });
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "ulbform.pdf");
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    this._matDialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  getCat() {
    return new Promise((resolve, reject) => {
      this.UtiReportService.getCategory().subscribe((res) => {
        let obj = {};
        for (const key in res) {
          let id = res[key]["_id"];
          obj[id] = res[key]["name"];
          obj[res[key]["name"]] = id;
        }
        this.categories = obj;
        resolve("success");
      });
    });
  }

  getsState() {
    return new Promise((resolve, reject) => {
      this.commonService.fetchStateList().subscribe((res) => {
        let stateId = JSON.parse(localStorage.getItem("userData"))["state"];
        for (const it of res) {
          if (it._id == stateId) {
            this.stateName = it.name;
            break;
          }
        }
        resolve("success");
      });
    });
  }
}
