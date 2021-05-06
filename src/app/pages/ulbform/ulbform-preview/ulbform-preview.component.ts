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
  slbWaterSanitaion = null

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    try {
      await this.detailUtilData();
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
          debugger;
          console.log(err);
          reject(err);
        }
      );
    });
  }
  
}
