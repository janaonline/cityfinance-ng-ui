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
    private _questionnaireService: QuestionnaireService,private _matDialog: MatDialog
  ) {}
  styleForPDF=`<style>
  .b-hide{
    display: none;
  }
  .h-cls{
    display: none;
  }
  .header {
    background-color: #047474;
    height: 70px;
    text-align: center;
}

.heading {
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
  </style>`

  detailUtil = null;
  slbWaterSanitaion = null;
  waterSanitation = null;
  pfms = null;
  annualAccount = null;

  userData = JSON.parse(localStorage.getItem("userData"));
  years = JSON.parse(localStorage.getItem("Years"));
  designYear;

  ngOnInit(): void {
    this.designYear = this.years["2021-22"];
    this.onLoad();
  }

  async onLoad() {
    try {
      this.getLinkPfms();
      this.detailUtilData();
      this.getAnnualAccount();
      this.getSlbData();
      this.getWaterSanitation();
    } catch (error) {
      console.log(error);
    }
  }
  detailUtilData() {
    return new Promise((resolve, reject) => {
      this.utiReportService.fetchPosts().subscribe(
        (res) => {
          this.detailUtil = res;
          resolve("Success");
        },
        (err) => {
          console.log(err);
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
        (err) => {}
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
        (err) => {}
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
        (err) => {}
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
        (err) => {}
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
