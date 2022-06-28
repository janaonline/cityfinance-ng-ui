import { HttpEventType } from "@angular/common/http";
import { Component, HostBinding, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { AnnualAccountsService } from "src/app/pages/ulbform/annual-accounts/annual-accounts.service";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { UserUtility } from "src/app/util/user/user";
import { SweetAlert } from "sweetalert/typings/core";
import { AnnualPreviewComponent } from "./annual-preview/annual-preview.component";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit {
  constructor(
    private dataEntryService: DataEntryService,
    private annualAccountsService: AnnualAccountsService,
    public dialog: MatDialog,
    //  public _ulbformService: UlbformService,
    public _router: Router,
    private newCommonService: NewCommonService
  ) {
    this.loggedInUserType = this.loggedInUserDetails.role;
  }
  dateShow: string = "2021-22";
  Years = JSON.parse(localStorage.getItem("Years"));
  userData = JSON.parse(localStorage.getItem("userData"));
  audit_status = "Unaudited";
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  unAuditQues = [
    {
      name: "Balance Sheet",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet",
    },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
      key: "assets",
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
      key: "f_assets",
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
      key: "s_grant",
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
      key: "c_grant",
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
    },
    {
      name: "Balance Sheet Schedule",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet_schedules",
    },
    {
      name: "Income Expenditure",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp",
    },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
      key: "revenue",
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
      key: "expense",
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp_schedules",
    },
    {
      name: "Cash flow Statement",
      error: false,
      data: null,
      type: "file",
      key: "cash_flow",
    },
  ];
  auditQues = [
    {
      name: "Balance Sheet",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet",
    },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
      key: "assets",
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
      key: "f_assets",
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
      key: "s_grant",
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
      key: "c_grant",
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
    },
    {
      name: "Balance Sheet Schedule",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet_schedules",
    },
    {
      name: "Income Expenditure",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp",
    },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
      key: "revenue",
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
      key: "expense",
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp_schedules",
    },
    {
      name: "Cash flow Statement",
      error: false,
      data: null,
      type: "file",
      key: "cash_flow",
    },
    {
      name: "Auditor Report",
      error: false,
      data: null,
      type: "file",
      key: "auditor_report",
    },
  ];
  data = {
    ulb: this.userData.ulb,
    design_year: this.Years["2022-23"],
    isDraft: false,
    status: null,
    audited: {
      provisional_data: {
        bal_sheet: {
          pdf: {
            url: null,
            name: null,
          },
          // excel: { url: null, name: null },
          // assets: { value: "", error: false },
          // f_assets: { value: "", error: false },
          // s_grant: { value: "", error: false },
          // c_grant: { value: "", error: false },
          status: null,
          rejectReason: null,
        },
        assets: "",
        f_assets: "",
        s_grant: "",
        c_grant: "",
        bal_sheet_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        inc_exp: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        revenue: "",
        expense: "",
        inc_exp_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        auditor_report: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
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
      year: this.Years["2020-21"],
    },
    unAudited: {
      provisional_data: {
        bal_sheet: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          // assets: { value: "", error: false },
          // f_assets: { value: "", error: false },
          // s_grant: { value: "", error: false },
          // c_grant: { value: "", error: false },
          status: null,
          rejectReason: null,
        },
        assets: "",
        f_assets: "",
        s_grant: "",
        c_grant: "",
        bal_sheet_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        inc_exp: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          // revenue: { value: "", error: false },
          // expense: { value: "", error: false },
          status: null,
          rejectReason: null,
        },
        revenue: "",
        expense: "",
        inc_exp_schedules: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
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
      year: this.Years["2019-20"],
    },
  };

  answerError = {
    audited: {
      submit_annual_accounts: false,
      submit_standardized_data: false,
    },
    unAudited: {
      submit_annual_accounts: false,
      submit_standardized_data: false,
    },
  };
  provisionDisable = true;
  auditedDisable = true;
  @HostBinding("")
  pdfError = "PDF Not Uploaded!";
  uploadErrors = {
    audited: {
      standardized_data: {
        error: null,
        progress: null,
        file: null,
      },
    },
    unAudited: {
      standardized_data: {
        error: null,
        progress: null,
        file: null,
      },
    },
  };
  ulbId = "";
  ngOnInit(): void {
    this.ulbId = sessionStorage.getItem("ulb_id");
    this.onLoad();
  }

  onLoad() {
    // let ulbId = sessionStorage.getItem("ulb_id");
    let ulbId = this.userData.ulb;

    // if (ulbId != null || this.finalSubmitUtiStatus == "true") {
    //   this.isDisabled = true;
    //   this.provisionDisable = true
    //   this.auditedDisable = true
    // }
    this.newCommonService
      .getAnnualData({
        design_year: this.Years["2022-23"],
        ulb: ulbId,
      })
      .subscribe(
        async (res) => {
          this.dataPopulate(res);
          // this.actionCheck = res['status'];
          // console.log("annual res---------------", res, this.actionCheck);
        },
        (err) => {
          const toStoreResponse = this.data;
          sessionStorage.setItem(
            "annualAccounts",
            JSON.stringify(toStoreResponse)
          );
          console.error(err.message);
        }
      );
  }

  dataPopulate(res) {
    delete res.modifiedAt;
    delete res.createdAt;
    delete res.isActive;
    delete res._id;
    delete res.__v;
    delete res.actionTakenBy;
    this.data = res;
    let index = 0;
    const toStoreResponse = this.data;

    if (
      !toStoreResponse.audited.submit_annual_accounts &&
      !toStoreResponse.unAudited.submit_annual_accounts &&
      this.loggedInUserType != USER_TYPE.ULB
    ) {
      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      //  status.annualAccounts.status = "N/A";
      // this._ulbformService.allStatus.next(status);
    }
    console.log("annnualREs", this.data["status"]);

    sessionStorage.setItem("annualAccounts", JSON.stringify(toStoreResponse));
    let proviDataAu = res?.audited?.provisional_data;
    this.auditQues.forEach((el) => {
      let key = el?.key;
      if (key && el.type == "file") {
        el["data"] = proviDataAu[key];
      } else if (key && el.type == "input") {
        el["amount"]["value"] = proviDataAu[key];
      }
    });

    let proviDataUn = res?.unAudited?.provisional_data;
    this.unAuditQues.forEach((el) => {
      let key = el?.key;
      if (key && el.type == "file") {
        el["data"] = proviDataUn[key];
      } else if (key && el.type == "input") {
        el["amount"]["value"] = proviDataUn[key];
      }
    });
    console.log("data", this.auditQues, this.unAuditQues);
  }
  changeAudit(audit) {
    this.audit_status = audit;
    switch (audit) {
      case "Audited":
        this.dateShow = "2020-21";
        break;
      default:
        this.dateShow = "2021-22";
        break;
    }
    //   if (this.loggedInUserDetails.role === this.USER_TYPE.ULB)
    //     this.checkDiff();
    // }
  }
  answer(question, val, isAudit = null, fromStart = false) {
    let status = isAudit ? "audited" : "unAudited";
    if (isAudit && this.loggedInUserType == USER_TYPE.ULB) {
      this.auditedDisable = false;
    } else if (!isAudit && this.loggedInUserType == USER_TYPE.ULB) {
      this.provisionDisable = false;
    }

    switch (question) {
      case "q1":
        this.answerError[status].submit_annual_accounts = false;
        if (val) {
          this.data[status].submit_annual_accounts = val;
        } else {
          this.data[status].submit_annual_accounts = val;
        }
        break;
      default:
        this.answerError[status].submit_standardized_data = false;
        if (val) {
          this.data[status].submit_standardized_data = val;
        } else {
          this.data[status].submit_standardized_data = val;
          // swal("ULB has the option to upload the standardised financial statement at a later stage")
        }
        break;
    }
    // this.checkDiff();
  }
  getUploadFileData(e, fileType, quesName, index) {
    console.log("eeeeeeeee", e, fileType, quesName, index);
    if (fileType == "audited") {
      this.auditQues.forEach((ele) => {
        if (ele.name === quesName) {
          ele.data = e;
          ele.error = false;
          return true;
        }
      });
    } else {
      this.unAuditQues.forEach((ele) => {
        if (ele.name === quesName) {
          ele.data = e;
          ele.error = false;
          return true;
        }
      });
    }
    let newData = {
      pdf: {
        url: e.pdf.url,
        name: e.pdf.name,
      },
      excel: { url: e.excel?.url, name: e.excel?.name },
    };
    // if(quesName === "Balance Sheet"){
    //   this.data[fileType].provisional_data.bal_sheet = newData;
    // }
    switch (quesName) {
      case "Balance Sheet":
        this.data[fileType].provisional_data.bal_sheet = newData;
        break;
      case "Balance Sheet Schedule":
        this.data[fileType].provisional_data.bal_sheet_schedules = newData;
        break;
      case "Income Expenditure":
        this.data[fileType].provisional_data.inc_exp = newData;
        break;
      case "Income Expenditure Schedule":
        this.data[fileType].provisional_data.inc_exp_schedules = newData;
        break;
      case "Cash flow Statement":
        this.data[fileType].provisional_data.cash_flow = newData;
        break;
      case "Auditor Report":
        this.data[fileType].provisional_data.auditor_report = newData;
        break;

      //
    }
    //  this.checkDiff();
  }
  async fileChangeEvent(event, fileType) {
    this.uploadErrors[fileType].standardized_data.progress = 10;
    let files;
    if (event?.target) files = event.target.files[0];
    else files = event;
    this.uploadFile(files, files.name, files.type, fileType);
  }

  uploadFile(file, name, type, fileType) {
    this.uploadErrors[fileType].standardized_data.progress = 20;
    this.dataEntryService.getURLForFileUpload(name, type).subscribe(
      (s3Response) => {
        this.uploadErrors[fileType].standardized_data.progress = 50;
        const res = s3Response.data[0];
        this.data[fileType].standardized_data.excel.name = name;

        this.uploadFileToS3(
          file,
          res["url"],
          res["file_alias"],
          name,
          fileType
        );
      },
      (err) => {
        console.log(err);
        this.uploadErrors[fileType].standardized_data.file = file;
        this.uploadErrors[fileType].standardized_data.error = err;
      }
    );
  }

  private uploadFileToS3(
    file: File,
    s3URL: string,
    fileAlias: string,
    name,
    fileType
  ) {
    this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
      (res) => {
        this.uploadErrors[fileType].standardized_data.progress = 60;
        if (res.type === HttpEventType.Response) {
          this.uploadErrors[fileType].standardized_data.progress = 80;
          this.uploadExcel(file, fileAlias, name, fileType);
        }
      },
      (err) => {
        this.uploadErrors[fileType].standardized_data.file = file;
        this.uploadErrors[fileType].standardized_data.error = err;
      }
    );
  }

  async uploadExcel(file: File, fileAlias: string, name, fileType) {
    return new Promise((resolve, rej) => {
      let newObj = {
        alias: fileAlias,
        financialYear: "",
        design_year: this.Years["2021-22"],
      };
      if (fileType === "audited") {
        newObj.financialYear = "2019-20";
      } else {
        newObj.financialYear = "2021-22";
      }
      this.annualAccountsService.processData(newObj).subscribe(
        async (res) => {
          try {
            await this.checkExcelStatus(res["data"]);
            this.uploadErrors[fileType].standardized_data.progress = 100;
            this.data[fileType].standardized_data.excel.url = fileAlias;

            this.uploadErrors[fileType].standardized_data.file = null;
            this.uploadErrors[fileType].standardized_data.error = null;
            //  this.checkDiff();
          } catch (error) {
            this.uploadErrors[fileType].standardized_data.file = file;
            this.uploadErrors[fileType].standardized_data.error =
              error?.data.message;
            this.data[fileType].standardized_data.excel.url = null;
            rej(error);
          }
          resolve("Success");
        },
        (err) => {
          this.uploadErrors[fileType].standardized_data.file = file;
          this.uploadErrors[fileType].standardized_data.error = err;
          rej(err);
        }
      );
    });
  }

  checkExcelStatus(res) {
    return new Promise((resolve, reject) => {
      const { _id } = res;
      this.annualAccountsService.getProcessStatus(_id.toString()).subscribe(
        (res) => {
          if (res["data"]["status"] === "FAILED") {
            reject(res);
          }
          resolve("Success");
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  declareCheck(data) {
    console.log(data);
    data.declaration = !data.declaration;
    //  this.checkDiff();
  }

  formSave(type) {
    console.log("anual acc form", this.data);
    if (type === "draft") {
      this.data.isDraft = true;
      this.postAnnualForm();
    } else {
      this.data.isDraft = false;
      this.checkValidation();
    }
  }
  checkValidation() {
    // autited
    if (this.data.audited.submit_annual_accounts == true) {
    } else if (this.data.audited.submit_annual_accounts == false) {
    } else {
    }
    // unAudited
    if (this.data.unAudited.submit_annual_accounts) {
      for (const key in this.data.unAudited.provisional_data) {
        if (this.data.unAudited.provisional_data[key].pdf == "") {
          // this.data.unAudited.provisional_data[key].
        }
      }
    } else if (this.data.unAudited.submit_annual_accounts == false) {
    } else {
    }
  }
  postAnnualForm() {
    this.newCommonService.postAnnualData(this.data).subscribe(
      (res) => {
        swal("Saved", "Data saved as draft successfully", "success");
      },
      (error) => {
        swal("Error", "Somthing went wrong.", "error");
        console.log("post error", error);
      }
    );
  }
  getAmountFromCommon(e, fileType, qusName, qusType) {
    console.log("emit", e, fileType, qusName, qusType);
    if (qusType == "input") {
      this.data[fileType].provisional_data[e?.key] = e?.value;
    }
  }
  preview() {
    let data = {
      unAudit: this.unAuditQues,
      audit: this.auditQues,
      body: this.data,
      // unAuditFullData : this.data.unAudited,
      // auditFullData : this.data.audited,
    };
    const dialogRef = this.dialog.open(AnnualPreviewComponent, {
      data: data,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    // this.hidden = false;
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      //   this.hidden = true;
    });
  }
}
