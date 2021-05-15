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
    public annualAccountsService: AnnualAccountsService
  ) {}

  detailUtil = null;
  slbWaterSanitaion = null;
  waterSanitation = null;
  pfms = null;
  annualAccount = null;

  userData = JSON.parse(localStorage.getItem("userData"));
  years = JSON.parse(localStorage.getItem("Years"));
  designYear;
  isMillionPlus;
  isUA;

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
    if (this.isMillionPlus == "No") await this.getWaterSanitation();
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
          this.detailUtil = res;
          resolve("Success");
        },
        (err) => {
          this.detailUtil = true;
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
          this.slbWaterSanitaion = true;
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
          this.pfms = true;
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
          this.waterSanitation = true;
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
          this.annualAccount = true;
          resolve("Success");
        }
      );
    });
  }
}
