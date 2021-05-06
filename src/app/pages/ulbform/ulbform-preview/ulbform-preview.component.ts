import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonService } from "src/app/shared/services/common.service";
import { PreviewSlbComponentComponent } from "../preview-slb-component/preview-slb-component.component";
import { UtiReportService } from "../utilisation-report/uti-report.service";

@Component({
  selector: "app-ulbform-preview",
  templateUrl: "./ulbform-preview.component.html",
  styleUrls: ["./ulbform-preview.component.scss"],
})
export class UlbformPreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    public utiReportService: UtiReportService
  ) {}
  ulbName = "";
  detailUtil = null;
  slbWaterSanitaion = null;

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    try {
      await this.detailUtilData();
      await this.getSlbData();
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
          reject(err);
        }
      );
    });
  }

  getSlbData() {
    return new Promise((resolve, reject) => {
      let designYear = "606aaf854dff55e6c075d219";
      let params = "design_year=" + designYear;
      this.commonService.fetchSlbData(params).subscribe((res) => {
        this.slbWaterSanitaion =
          res["data"] && res["data"][0] ? res["data"][0] : {};
        resolve(res);
      });
    });
  }
}
