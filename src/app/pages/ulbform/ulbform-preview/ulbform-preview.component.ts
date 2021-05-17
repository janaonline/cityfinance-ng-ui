import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { PreviewSlbComponentComponent } from "../preview-slb-component/preview-slb-component.component";
import { UtiReportService } from "../utilisation-report/uti-report.service";
import { LinkPFMSAccount } from "../link-pfms/link-pfms.service";
import { WaterSanitationService } from "../water-sanitation/water-sanitation.service";
import { AnnualAccountsService } from "../annual-accounts/annual-accounts.service";
import { QuestionnaireService } from '../../questionnaires/service/questionnaire.service';
import { defaultDailogConfiuration } from "../../questionnaires/ulb/configs/common.config";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
@Component({
  selector: "app-ulbform-preview",
  templateUrl: "./ulbform-preview.component.html",
  styleUrls: ["./ulbform-preview.component.scss"],
})
export class UlbformPreviewComponent implements OnInit {
  @ViewChild("ulbformPre") _html: ElementRef;
  showLoader;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    public utiReportService: UtiReportService,
    public linkPFMSAccount: LinkPFMSAccount,
    public waterSanitationService: WaterSanitationService,
    public annualAccountsService: AnnualAccountsService,
    private UtiReportService: UtiReportService,
    private _questionnaireService: QuestionnaireService,private _matDialog: MatDialog
  ) {

      this.UtiReportService.getCategory().subscribe((res) => {
        let obj = {};
        for (const key in res) {
          let id=res[key]["_id"]
          obj[id] = res[key]["name"]
        }
        this.categories = obj
      });

  }
  styleForPDF=`<style>
  .b-hide{
    display: none;
  }
  .h-cls{
    display: none;
  }
  .header-p {
    background-color: #047474;
    height: 70px;
    text-align: center;
}

.heading-p {
    color: #FFFFFF;
    font-size: 22px;
    padding: 2rem;
    margin: 2rem auto;
}

.card {
    padding: 5px 10px;
    // margin: 10px 40px;
    background-color: #EBF5F5;
}

.qus-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.ans-h {
    margin-bottom: 2rem;
    margin-top: 2rem;
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

.header {
  height: 90px;
  text-align: center;
  background-color: #047474;
}
.header{
word-break: break-all;
}

td, th{
word-break: break-all;
font-size: 9px !important;
padding: 5px 1px !important;
}

.header {
background-color: #047474;
height: 50px;
display: inline-block;
color: #FFFFFF;
text-align: center;
font-weight:
}
.mat-dialog-content {
padding: 0 0 0 0;
max-width: 100vw;
max-height: 100vw;
}
.listitem_head {
padding: 2px 2px;
font-size: 12px !important;
font-family: Roboto;
font-weight: normal;
display: inline-block;
}
.listitem_grantYear {
display: inline-block;
font-weight: normal;
width: 50px !important;
height: 10px !important;
color: #3D3D3D;
margin-left: 10px;
background-color: #E5E6E6;
border-radius: 3px;
padding: 4px;
}
.listitem_subHead {
margin-top: 5px;
font-size: 16px;
font-weight: normal;
font-family: Roboto;
padding: 2px 2px;
display: inline-block;
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
margin-top: 5px;
padding: 2px 2px;
}
.mat-dialog-container {
padding: 0;
}
.mat-card2 {
padding: 5px 2px;
margin-top: 10px;
// margin: 10px 40px;
background-color: #EBF5F5;
display: block;
}
.card2 {
width: 50%;
font-weight: normal;
padding: 2px 5px;
}
.crd-ls-div {
margin-bottom: 15px;
}
.c-2-d {
margin-left: 15px;
}
.card3 {
width: 50%;
font-weight: 500;
padding: 2px 5px;
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
color: #51504F;
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
@media print {
  .page-break {page-break-before: always;}
}

  </style>`



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
        code: null
      }
    },
    document: {
      message: null
    },
    millionPlusCities: {
      documents: {
        cityPlan: [],
        serviceLevelPlan: [],
        solidWastePlan: [],
        waterBalancePlan: []
      }
    },
    solidWasteManagement: {
      documents: {
        garbageFreeCities: [],
        waterSupplyCoverage: []
      }
    },
    status: null,
    waterManagement: {
      serviceLevel: {
        status: null,
        rejectReason: null
      },
      houseHoldCoveredPipedSupply: {
        baseline: {
          2021: null
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null
        },
        status: null,
        rejectReason: null
      },
      waterSuppliedPerDay: {
        baseline: {
          2021: null
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null
        },
        status: null ,
        rejectReason: null
      },
      reduction: {
        baseline: {
          2021: null
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null
        },
        status: null,
        rejectReason: null
      },
      houseHoldCoveredWithSewerage: {
        baseline: {
          2021: null
        },
        target: {
          2122: null,
          2223: null,
          2324: null,
          2425: null
        },
        status: null,
        rejectReason: null
      },
      status: null ,
      rejectReason:null ,

    },
    waterPotability: {
      documents: {
        waterPotabilityPlan: [{

          name: null,
          url: null
        }]
      }
    },
    water_index: null,
    fromParent: null
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

  categories
  slbWaterSanitaion = null;
  detailUtil = null
  pfms = null
  annualAccount = null
  userData = JSON.parse(localStorage.getItem("userData"));
  years = JSON.parse(localStorage.getItem("Years"));
  designYear;
  financialYear;
  isMillionPlus;
  isUA;

  ngOnInit(): void {
    this.designYear = this.years["2021-22"];
    this.financialYear = this.years["2021-22"];
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
      this.utiReportService.fetchPosts(this.designYear, this.financialYear, '').subscribe(
        (res) => {
          this.detailUtil = res;
          this.detailUtil["projects"].forEach(element => {
            element.category = this.categories[element.category]
          });
          resolve("Success");
        },
        (err) => {
          this.detailUtil = this.detailUtilError
          resolve("Success");
        }
      );
    });
  }

  getSlbData() {
    return new Promise((resolve, reject) => {
      let params = "design_year=" + this.designYear;
      this.commonService.fetchSlbData(params, '').subscribe(
        (res) => {
          this.slbWaterSanitaion =
            res["data"] && res["data"][0] ? res["data"][0] : {};
          this.slbWaterSanitaion.fromParent = true;
          resolve(res);
        },
        (err) => {
          this.slbWaterSanitaion = this.slbWaterSanitaionError
          resolve("Success");
        }
      );
    });
  }

  getLinkPfms() {
    return new Promise((resolve, reject) => {
      this.linkPFMSAccount.getData(this.designYear, '').subscribe(
        (res) => {
          this.pfms = res["response"];
          resolve("Success");
        },
        (err) => {
          this.pfms = this.pfmsError
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
      this.annualAccountsService.getData(param, '').subscribe(
        (res) => {
          this.annualAccount = res["data"];
          resolve("Sucess");
        },
        (err) => {
          this.annualAccount = this.annualAccountError
          resolve("Success");
        }
      );
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

}
