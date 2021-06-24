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
  .b-hide{
    display: none;
  }
  .header-p {
    background-color: #047474;
    height: 70px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1.5rem !important;
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

.m-h{
  text-align: center;
}
.cont {
  width: 794px;
  background-color: #FFFFFF;
  display: inline-block;
}

.container {
  padding-left: 0;
  padding-right: 0;
}
.header-p{
  word-break: break-all;
}

td, th{
  word-break: break-all;
  font-size: 9px !important;
  padding: 5px 1px !important;
}


.mat-dialog-content {
  padding: 0 0 0 0;
  max-width: 100vw;
  max-height: 100vw;
}



.h-ut{
  font-size: 10px !important;
  margin-top: 1rem !important;
  margin-bottom: .5rem !important;
  margin-left: 1rem !important;
}
.h-ut-t{
  font-size: 10px !important;
  margin-top: 1rem !important;
  margin-bottom: .5rem !important;
}
.qus-ut-s {
  font-size: 10px !important;
  margin-left: .9rem;
}
.qus-ut-u {
  font-size: 10px !important;
  margin-left: 1rem;
}
.qus-ut-t {
  font-size: 10px !important;
  margin-left: 1rem;
  margin-bottom: 1rem !important;
}
.pp {
  margin-top: .5rem !important;
}
.ans-ut-s {
  font-size: 10px !important;
  margin-left: 6rem;
}
.ans-ut-u {
  font-size: 10px !important;
  margin-left: 1.3rem;
}
.ans-ut-t {
  font-size: 10px !important;
  margin-left: 5.5rem;
  margin-bottom: 1rem !important;
}
.ans-ut-a {
  margin-left: 8rem;
}
.ans-ut-b {
  margin-left: 8.3rem;
}
.ans-ut-c {
  margin-left: 7.7rem;
}
.ans-ut-l{
  margin-left: 1rem;

}

.dnDiv {
  margin-top: 10px;
  margin-right: 5%;
}
.dnldBtn {
  background-color: #26A1A1;
  color: #FFFFFF;
  font-weight: normal;
}
.card2Div {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}
.mat-dialog-container {
  padding: 0;
}
.mat-card2 {
  padding: 5px 2px;
  margin-top: 10px;
  background-color: #EBF5F5;
  display: block;
}

.crd-ls-div {
  margin-bottom: 15px;
}
.c-2-d {
  margin-left: 1.7rem !important;
  margin-bottom: 1rem !important;
}
label {
  font-weight: normal;
}
.thHeader {
  background-color: #E9E9E9;
  color: #047474;
  font-size: 15px;
  font-weight: normal;
}
th {
  font-weight: normal;
  vertical-align: middle;
  text-align: center;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  vertical-align: middle;
  padding: 10px 6px;
}
.bor-in-l {
  word-break: break-all;
}
.tableFooterDiv {
  background-color: #E7E7E7;
  color: #000000;
  font-size: 16px;
}
.f-d-n {
  background-color: #CFCFCF;
  width: 235px;
  height: 35px;
  padding: 7px 8px;
  height: 15px !important;
}
.d-none {
  display: none;
}
label{
  font-size: 9px !important;
}
.font-9{
  font-size: 9px !important;
}
.pdf-hide{
  display: none;
}
.w-5{
width: 5% !important;
}
.w-10{
  width: 10% !important;
}
.w-11{
  width: 11% !important;
}
.w-12{
  width: 12% !important;
}
.w-15{
  width: 15% !important;
}
.form-status-ut {
  font-size: 10px !important;
  margin-top: 10px  !important;
  margin-bottom: 30px  !important;

}
.d-status{
  padding-left: 1% !important;
}

@media print {
  .page-break {page-break-before: always;}
}
:root {
  font-size: 14px;
}
table tbody tr {
  border: 100px solid black;
}
  table tbody tr:nth-child(even) {
  background: #d7ebeb;
}
 table tbody tr:nth-child(even) td {
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

  table thead th {
    font-size: .5rem
  }

  table tbody td, li {
    font-size: .5rem
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
.qus-slb {
  margin-left: 2%;
  font-weight: normal;
  font-size: 12px;
}

.ans-slb {
  margin-left: 1rem;
  font-weight: normal;
  font-size: 12px;
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

.ans-slb-a {
  margin-left: 5.8rem;
  font-weight: normal !important;
  font-size: 10px !important;
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
      this.showLoader = false;
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
      if (
        sessionStorage.getItem(element) == "true" ||
        (element === "canNavigate" &&
          sessionStorage.getItem(element) == "false")
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
    this.setLinkPfms(data.pfmsAccounts[0]);
    this.setDetailUtilData(data.utilizationReport[0]);
    this.setAnnualAccount(data.annualAccountData[0]);
    if (data.isUA == "Yes") this.setSlbData(data.SLBs[0]);
    if (data.isMillionPlus == "No") this.setWaterSanitation(data.plansData[0]);
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
        name: detailUtilData["name"],
        designation: detailUtilData["designation"],
        totalProCost: detailUtilData["projectCost"] ?? 0,
        totalExpCost: detailUtilData["projectExp"] ?? 0,
      };
      this.detailUtil = formdata;
      this.detailUtil.useData = detailUtilData;
      this.detailUtil.useData.projects.forEach((element) => {
        element.category = this.categories[element.category];
      });

    } else this.detailUtil = this.detailUtilError;
  }

  setSlbData(slbData) {
    this.slbWaterSanitaion = slbData;
    if (this.slbWaterSanitaion) {
      let tem =
        this.slbWaterSanitaion.waterPotability.documents
          ?.waterPotabilityPlan[0];
      if (tem) this.slbWaterSanitaion.waterPotability = tem;
      this.slbWaterSanitaion.fromParent = true;
    } else this.slbWaterSanitaion = this.slbWaterSanitaionError;
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
