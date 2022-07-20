import { HttpEventType } from "@angular/common/http";
import { Component, HostBinding, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { AnnualAccountsService } from "src/app/pages/ulbform/annual-accounts/annual-accounts.service";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { UserUtility } from "src/app/util/user/user";
import { AnnualPreviewComponent } from "./annual-preview/annual-preview.component";
import { SweetAlert } from "sweetalert/typings/core";
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
    this.navigationCheck();
    this.loggedInUserType = this.loggedInUserDetails.role;
  }
  errorMsg =
    "One or more required fields are empty or contains invalid data. Please check your input.";
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
      name: "Auditors Report",
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
  inputNumberError = "Fields can not be blank!";
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
  manadUploadErrors = {
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
  isDisabled = false;
  clickedSave;
  routerNavigate = null;
  response;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  modalRef;
  @ViewChild("templateAnnual") template;
  @ViewChild("template1") template1;
  compName = "AnnualAccount";
  ngOnInit(): void {
    this.ulbId = sessionStorage.getItem("ulb_id");
    sessionStorage.setItem("changeInAnnualAcc", "false");
    this.clickedSave = false;
    this.onLoad();
  }

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";
          const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInAnnualAcc", "false");
            return;
          }
          if (changeInAnnual === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.dialog.closeAll();
            this.openDialog(this.template);
          }
        }
      });
    }
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    // await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    await this.dialogRef.close(true);
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.formSave("draft");
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    // if (this.routerNavigate && !this.clickedBack) {
    //  await this.saveStateActionData();
    //   sessionStorage.setItem("changeInAnnual", "false");
    //   this._router.navigate([this.routerNavigate.url]);
    //   return;
    // }
    // if (this.clickedBack && this.actionTaken) {
    //   await this.saveStateActionData();
    //   sessionStorage.setItem("changeInAnnual", "false");
    //   this._router.navigate(['/ulbform/utilisation-report']);
    //   return;
    // }
    await this.formSave("draft");
    return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    sessionStorage.setItem("changeInAnnualAcc", "false");
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
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
          let resObj: any = res;
          console.log("resss", resObj);
          if (resObj?.isDraft == false) {
            this.isDisabled = true;
          } else {
            this.isDisabled = false;
          }

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
      !toStoreResponse?.audited?.submit_annual_accounts &&
      !toStoreResponse?.unAudited?.submit_annual_accounts &&
      this.loggedInUserType != USER_TYPE.ULB
    ) {
      const status = JSON.parse(sessionStorage.getItem("allStatus"));
      //  status.annualAccounts.status = "N/A";
      // this._ulbformService.allStatus.next(status);
    }
    console.log("annnualREs", this.data["status"]);

    sessionStorage.setItem("annualAccounts", JSON.stringify(toStoreResponse));
    let proviDataAu = res?.audited?.provisional_data;
    this.auditQues?.forEach((el) => {
      let key = el?.key;
      if (key && el.type == "file") {
        el["data"] = proviDataAu[key];
      } else if (key && el.type == "input") {
        el["amount"]["value"] = proviDataAu[key];
      }
    });

    let proviDataUn = res?.unAudited?.provisional_data;
    this.unAuditQues?.forEach((el) => {
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
    sessionStorage.setItem("changeInAnnualAcc", "true");
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
            this.manadUploadErrors[fileType].standardized_data.error = false;
            //  this.checkDiff();
          } catch (error) {
            this.uploadErrors[fileType].standardized_data.file = file;
            this.uploadErrors[fileType].standardized_data.error =
              error?.data.message;
            this.data[fileType].standardized_data.excel.url = null;
            this.manadUploadErrors[fileType].standardized_data.error = null;
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
    sessionStorage.setItem("changeInAnnualAcc", "true");
    //  this.checkDiff();
  }

  clearFile(fileType) {
    if (this.isDisabled) {
      return;
    }
    let temp = this.data[fileType].standardized_data?.excel;
    for (const key in temp) {
      temp[key] = null;
    }
    temp = this.uploadErrors[fileType].standardized_data;
    for (const key in temp) {
      temp[key] = null;
    }
    sessionStorage.setItem("changeInAnnualAcc", "true");
    // this.checkDiff();
  }
  formSave(type) {
    console.log("anual acc form", this.data);
    this.patchPostData();
    if (type === "draft") {
      this.data.isDraft = true;
      this.postAnnualFormDraft();
    } else {
      this.data.isDraft = false;
      this.checkValidation();
    }
  }
  patchPostData() {
    if (this.data?.audited?.submit_annual_accounts == false) {
      for (const key in this.data.audited.provisional_data) {
        let obj = this.data?.audited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          console.log(objKeysE);
        }
        if (
          objLength > 0 &&
          (this.data?.audited?.provisional_data[key]?.pdf?.name != "" ||
            this.data?.audited?.provisional_data[key]?.pdf?.name != null)
        ) {
          //this.data.unAudited.provisional_data[key].
          if (key != "auditor_report") {
            this.data.audited.provisional_data[key].excel.name = null;
            this.data.audited.provisional_data[key].excel.url = null;
          }
          this.data.audited.provisional_data[key].pdf.name = null;
          this.data.audited.provisional_data[key].pdf.url = null;

          this.auditQues.forEach((el) => {
            if (key == el?.key && el?.type == "file") {
              el.error = false;
            }
          });
        } else if (
          (this.data?.audited?.provisional_data[key] != "" ||
            this.data?.audited?.provisional_data[key] != null) &&
          objLength == 0
        ) {
          this.data.audited.provisional_data[key] = "";
          this.auditQues.forEach((el) => {
            if (key == el?.key && el?.type == "input") {
              el.error = false;
            }
          });
        }
      }
      this.data.audited.submit_standardized_data = null;
      this.data.audited.standardized_data.declaration = null;
      this.data.audited.standardized_data.excel.url = null;
      this.data.audited.standardized_data.excel.name = null;
    }
    if (this.data?.unAudited?.submit_annual_accounts == false) {
      for (const key in this.data.unAudited.provisional_data) {
        let obj = this.data?.unAudited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          console.log(objKeysE);
        }
        if (
          objLength > 0 &&
          (this.data?.unAudited?.provisional_data[key]?.pdf?.name != "" ||
            this.data?.unAudited?.provisional_data[key]?.pdf?.name != null)
        ) {
          //this.data.unAudited.provisional_data[key].
          this.data.unAudited.provisional_data[key].pdf.name = null;
          this.data.unAudited.provisional_data[key].pdf.url = null;
          this.data.unAudited.provisional_data[key].excel.name = null;
          this.data.unAudited.provisional_data[key].excel.url = null;
          this.unAuditQues.forEach((el) => {
            if (key == el?.key && el?.type == "file") {
              el.error = false;
            }
          });
        } else if (
          (this.data?.unAudited?.provisional_data[key] != "" ||
            this.data?.unAudited?.provisional_data[key] != null) &&
          objLength == 0
        ) {
          this.data.unAudited.provisional_data[key] = "";
          this.unAuditQues.forEach((el) => {
            if (key == el?.key && el?.type == "input") {
              el.error = false;
            }
          });
        }
      }
      this.data.unAudited.submit_standardized_data = null;
      this.data.unAudited.standardized_data.declaration = null;
      this.data.unAudited.standardized_data.excel.url = null;
      this.data.unAudited.standardized_data.excel.name = null;
    }
  }
  annualError = false;
  isSubmit = false;
  checkValidation() {
    this.isSubmit = true;
    // autited
    if (this.data.audited.submit_annual_accounts) {
      for (const key in this.data.audited.provisional_data) {
        console.log(
          typeof this.data?.audited?.provisional_data[key] == "object"
        );
        let obj = this.data?.audited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          console.log(objKeysE);
        }
        if (
          objLength > 0 &&
          (this.data?.audited?.provisional_data[key]?.pdf?.name == "" ||
            this.data?.audited?.provisional_data[key]?.pdf?.name == null)
        ) {
          //this.data.unAudited.provisional_data[key].
          console.log("elel key", key);
          this.auditQues.forEach((el) => {
            console.log("elel 1", el);
            if (key == el?.key && el?.type == "file") {
              console.log("elel", el);
              el.error = true;
            }
          });
          //  this.annualError = true;
        } else if (
          (this.data?.audited?.provisional_data[key] == "" ||
            this.data?.audited?.provisional_data[key] == null) &&
          objLength == 0
        ) {
          this.auditQues.forEach((el) => {
            if (key == el?.key && el?.type == "input") {
              el.error = true;
            }
          });

          // this.annualError = true;
        } else {
          console.log("else", key, objLength, this.auditQues);
          if (objLength > 0) {
            this.auditQues.forEach((el) => {
              // console.log("elel 2", el);
              if (key == el?.key && el?.type == "file") {
                //  console.log("elel 2", el);
                el.error = false;
              }
            });
          } else {
            this.auditQues.forEach((el) => {
              if (key == el?.key && el?.type == "input") {
                el.error = false;
              }
            });
          }
          this.annualError = false;
        }
      }
      this.answerError.audited.submit_annual_accounts = false;
      // audit st
      if (this.data.audited.submit_standardized_data == true) {
        this.answerError.audited.submit_standardized_data = false;
        if (
          this.data?.audited?.standardized_data?.declaration == false ||
          this.data?.audited?.standardized_data?.declaration == null ||
          this.data?.audited?.standardized_data?.excel?.url == null ||
          this.data?.audited?.standardized_data?.excel?.url == ""
        ) {
          this.manadUploadErrors.audited.standardized_data.error = true;
        } else {
          this.manadUploadErrors.audited.standardized_data.error = false;
        }
      } else if (this.data.audited.submit_standardized_data == false) {
        this.answerError.audited.submit_standardized_data = false;
        this.manadUploadErrors.audited.standardized_data.error = false;
        //  this.uploadErrors.audited.standardized_data.error = false;
        this.annualError = false;
      } else {
        this.answerError.audited.submit_standardized_data = true;
        //  this.annualError = true;
      }
    } else if (this.data.audited.submit_annual_accounts == false) {
      this.auditQues.forEach((el) => {
        el.error = false;
      });
      this.answerError.audited.submit_annual_accounts = false;
      this.manadUploadErrors.audited.standardized_data.error = false;
      this.uploadErrors.audited.standardized_data.error = false;
      this.answerError.audited.submit_standardized_data = false;
      this.annualError = false;
    } else {
      this.auditQues.forEach((el) => {
        el.error = false;
      });
      // this.annualError = true;
      this.answerError.audited.submit_annual_accounts = true;
      this.answerError.audited.submit_standardized_data = true;
    }
    // autited st

    // unAudited
    if (this.data.unAudited.submit_annual_accounts) {
      console.log(
        "this.data.unAudited.provisional_data",
        this.data.unAudited.provisional_data
      );

      for (const key in this.data.unAudited.provisional_data) {
        console.log("keys", this.data?.unAudited?.provisional_data[key]);
        let obj = this.data?.unAudited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          console.log(objKeysE);
        }

        if (
          objLength > 0 &&
          (this.data?.unAudited?.provisional_data[key]?.pdf?.name == "" ||
            this.data?.unAudited?.provisional_data[key]?.pdf?.name == null)
        ) {
          this.unAuditQues.forEach((el) => {
            console.log("un a file", el);

            if (key == el?.key && el?.type == "file") {
              el.error = true;
            }
          });
          // this.annualError = true;
        } else if (
          objLength == 0 &&
          (this.data?.unAudited?.provisional_data[key] == "" ||
            this.data?.unAudited?.provisional_data[key] == null)
        ) {
          this.unAuditQues.forEach((el) => {
            console.log("un a input", el);
            if (key == el?.key && el?.type == "input") {
              el.error = true;
            }
          });
          // this.annualError = true;
        } else {
          // console.log("else 2", key, objLength, this.unAuditQues);
          if (objLength > 0) {
            //   console.log("elel key 2", key);
            this.unAuditQues.forEach((el) => {
              if (key == el?.key && el?.type == "file") {
                el.error = false;
              }
            });
          } else {
            this.unAuditQues.forEach((el) => {
              if (key == el?.key && el?.type == "input") {
                el.error = false;
              }
            });
          }
          this.annualError = false;
        }
      }
      this.answerError.unAudited.submit_annual_accounts = false;
      // unaudtided st
      if (this.data.unAudited.submit_standardized_data == true) {
        this.answerError.unAudited.submit_standardized_data = false;
        if (
          this.data?.unAudited?.standardized_data?.declaration == false ||
          this.data?.unAudited?.standardized_data?.declaration == null ||
          this.data?.unAudited?.standardized_data?.excel?.url == null ||
          this.data?.unAudited?.standardized_data?.excel?.url == ""
        ) {
          this.manadUploadErrors.unAudited.standardized_data.error = true;
        } else {
          this.manadUploadErrors.unAudited.standardized_data.error = false;
        }
      } else if (this.data.unAudited.submit_standardized_data == false) {
        this.answerError.unAudited.submit_standardized_data = false;
        this.manadUploadErrors.unAudited.standardized_data.error = false;
        this.uploadErrors.unAudited.standardized_data.error = false;
        this.annualError = false;
      } else {
        this.answerError.unAudited.submit_standardized_data = true;
        //  this.annualError = true;
      }
    } else if (this.data.unAudited.submit_annual_accounts == false) {
      this.unAuditQues.forEach((el) => {
        el.error = false;
      });
      this.answerError.unAudited.submit_annual_accounts = false;
      this.answerError.unAudited.submit_standardized_data = false;
      this.manadUploadErrors.audited.standardized_data.error = false;
      this.uploadErrors.unAudited.standardized_data.error = false;
      this.annualError = false;
    } else {
      this.unAuditQues.forEach((el) => {
        el.error = false;
      });
      // this.annualError = true;
      this.answerError.unAudited.submit_annual_accounts = true;
      this.answerError.unAudited.submit_standardized_data = true;
    }

    this.checkFinalError();
    console.log(
      this.unAuditQues,
      this.auditQues,
      "this.annual error",
      this.annualError,
      this.answerError,
      this.uploadErrors,
      this.manadUploadErrors
    );
    console.log("this. error", this.answerError);
    if (this.annualError) {
      swal("Missing Data !", `${this.errorMsg}`, "error");
    } else {
      this.validFormSubmit();
    }
  }
  checkFinalError() {
    console.log('aaaaaaaaa error', this.annualError);

    this.unAuditQues.forEach((el) => {
      if (el.error == true || el.error == null) {
        this.annualError = true;
        return;
      }
    });
    this.auditQues.forEach((el) => {
      if (el.error == true || el.error == null) {
        this.annualError = true;
        return;
      }
    });
    if (
      this.answerError.audited.submit_annual_accounts == true ||
      this.answerError.audited.submit_annual_accounts == null
    ) {
      this.annualError = true;
      return;
    }
    if (
      this.answerError.unAudited.submit_annual_accounts == true ||
      this.answerError.unAudited.submit_annual_accounts == null
    ) {
      this.annualError = true;
      return;
    }
    if (
      this.answerError.unAudited.submit_standardized_data == true ||
      this.answerError.unAudited.submit_standardized_data == null
    ) {
      this.annualError = true;
      return;
    }
    if (
      this.answerError.audited.submit_standardized_data == true ||
      this.answerError.audited.submit_standardized_data == null
    ) {
      this.annualError = true;
      return;
    }
    if (
      this.manadUploadErrors.unAudited.standardized_data.error == true ||
      this.manadUploadErrors.unAudited.standardized_data.error == null
    ) {
      this.annualError = true;
      return;
    }
    if (
      this.manadUploadErrors.audited.standardized_data.error == true ||
      this.manadUploadErrors.audited.standardized_data.error == null
    ) {
      this.annualError = true;
      return;
    }
  }
  validFormSubmit() {
    swal(
      "Confirmation !",
      `Are you sure you want to submit this form? Once submitted,
       it will become uneditable and will be sent to State for Review.
        Alternatively, you can save as draft for now and submit it later.`,
      "warning",
      {
        buttons: {
          Submit: {
            text: "Submit",
            value: "submit",
          },
          Draft: {
            text: "Save as Draft",
            value: "draft",
          },
          Cancel: {
            text: "Cancel",
            value: "cancel",
          },
        },
      }
    ).then((value) => {
      switch (value) {
        case "submit":
          this.postApiForSubmit();
          break;
        case "draft":
          this.postAnnualFormDraft();
          break;
        case "cancel":
          break;
      }
    });
  }
  postAnnualFormDraft() {
    this.newCommonService.postAnnualData(this.data).subscribe(
      (res) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        swal("Saved", "Data saved as draft successfully", "success");
      },
      (error) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        swal("Error", "Somthing went wrong.", "error");
        console.log("post error", error);
      }
    );
  }
  postApiForSubmit() {
    this.newCommonService.postAnnualData(this.data).subscribe(
      (res) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        this.isDisabled = true;
        swal("Saved", "Data saved successfully", "success");
      },
      (error) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        swal("Error", "Somthing went wrong.", "error");
        console.log("post error", error);
      }
    );
  }
  getAmountFromCommon(e, fileType, qusName, qusType) {
    let value = Number(e?.value)
    console.log("emit", e, fileType, qusName, qusType);
    if (qusType == "input") {
      this.data[fileType].provisional_data[e?.key] = value;
    }
    //  sessionStorage.setItem("changeInAnnualAcc", "true");
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
