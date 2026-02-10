import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { environment } from 'src/environments/environment';
import { DownloadUserInfoService } from '../../user-info-dialog/download-user-info.service';
import { BalanceTableComponent } from '../balance-table.component';

@Component({
  selector: "app-balance-tabledialog",
  templateUrl: "./balance-tabledialog.component.html",
  styleUrls: ["./balance-tabledialog.component.scss"],
})
export class BalanceTabledialogComponent implements OnInit {
  reports: any = [];
  fileType: string = "";
  ulbDetails: any = {};
  sourceMsg: string = "";
  infoMsg: string = "";
  DIGITIZED_EXCEL = "digitizedExcel";
  documentTypes = [
    { key: "bal_sheet", name: "Balance Sheet" },
    { key: "bal_sheet_schedules", name: "Balance Sheet Schedules" },
    { key: "inc_exp", name: "Income and Expenditure" },
    { key: "inc_exp_schedules", name: "Income and Expenditure Schedules" },
    { key: "cash_flow", name: "Cashflow Statement" },
    { key: "auditor_report", name: "Auditor's Report" },
  ];

  constructor(
    public dialogRef: MatDialogRef<BalanceTableComponent>,
    private userInfoService: DownloadUserInfoService,
    private utilityService: UtilityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.reports = data?.reportList;
    this.fileType = data?.fileType;
    this.ulbDetails = data?.ulbDetails;
  }

  ngOnInit(): void {
    this.sourceMsg = this.getSourceMsg(this.reports.type);
    this.infoMsg = this.getInfoMsg();
  }

  public openFile(fileInfo: any): void {
    let target_file_url = environment.STORAGE_BASEURL + fileInfo["url"];

    // User info popup.
    if (this.ulbDetails && ["resources"].includes(this.ulbDetails["module"])) {
      const fileName = `${this.ulbDetails["fileName"]}_${this.ulbDetails["type"]}_${fileInfo["name"]}.${this.fileType}`;

      this.userInfoService
        .openUserInfoDialog([{ fileName }], this.ulbDetails["module"])
        .then((isDialogConfirmed) => {
          if (isDialogConfirmed) {
            if (this.fileType === "pdf") window.open(target_file_url, "_blank");
            if (this.fileType === "excel")
              this.utilityService.fetchAndSaveFile(
                target_file_url,
                fileInfo["name"],
              );
          }
          return;
        });
    } else {
      if (this.fileType === "pdf") window.open(target_file_url, "_blank");
      if (this.fileType === "excel")
        this.utilityService.fetchAndSaveFile(target_file_url, fileInfo["name"]);
    }

    return;
  }

  public getSourceMsg(reportType) {
    let msg = `Source: ${reportType === "audited" ? "Audited" : "Provisional"} File(s) submitted by ULB`;
    if (
      this.data &&
      this.data.reportList &&
      this.data.reportList.source === this.DIGITIZED_EXCEL
    ) {
      msg = "Digitized from ULB submitted documents using OCR & AI";
    }
    return msg;
  }

  public getInfoMsg(): string {
    const reportList = this.reports;

    if (reportList?.source !== this.DIGITIZED_EXCEL) {
      return "";
    }

    const isUnAudited = this.reports?.type === "unAudited";

    const availableDocumentTypes = isUnAudited
      ? this.documentTypes.filter((d) => d.key !== "auditor_report")
      : this.documentTypes;

    const excludedNames = reportList.excel?.map(e => e.name) ?? [];

    const msg = availableDocumentTypes
      .filter((d) => !excludedNames.includes(d.name))
      .map((d) => d.name)
      .join(", ");

    return `Note: ${msg} could not be digitized due to source document-quality issues.`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

