import { Component, OnInit, HostBinding, ViewChild } from "@angular/core";

import { HttpEventType, HttpResponse } from "@angular/common/http";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { AnnualAccountsService } from "./annual-accounts.service";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AnnualPreviewComponent } from "./annual-preview/annual-preview.component";
import { UlbformService } from "../ulbform.service";
import { Router, Event } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { SweetAlert } from "sweetalert/typings/core";
import { UserUtility } from "src/app/util/user/user";
import { USER_TYPE } from "src/app/models/user/userType";
const swal: SweetAlert = require("sweetalert");

@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit {
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  constructor(
    private dataEntryService: DataEntryService,
    private annualAccountsService: AnnualAccountsService,
    public dialog: MatDialog,
    public _ulbformService: UlbformService,
    public _router: Router,
    private _matDialog: MatDialog
  ) {
    this.navigationCheck();
    this.finalSubmitUtiStatus = localStorage.getItem("finalSubmitStatus");
    this.lastRoleInMasterForm = localStorage.getItem("lastRoleInMasterForm");
    this.masterFormStatus = localStorage.getItem("masterFormStatus");
    this.loggedInUserType = this.loggedInUserDetails.role;
  }
  lastRoleInMasterForm;
  masterFormStatus;
  @ViewChild("templateAnnual") template;
  @ViewChild("template1") template1;
  fromPreview = null;
  finalSubmitUtiStatus;
  anFormStaus = "PENDING";
  ulbFormStatusMoHUA;
  ulbFormRejectR = null;
  actionCheck;
  unAuditQues = [
    { name: "Balance Sheet", error: false, data: null },
    { name: "Balance Sheet Schedule", error: false, data: null },
    { name: "Income Expenditure", error: false, data: null },
    { name: "Income Expenditure Schedule", error: false, data: null },
    { name: "Cash flow Statement", error: false, data: null },
  ];
  auditQues = [
    { name: "Balance Sheet", error: false, data: null },
    { name: "Balance Sheet Schedule", error: false, data: null },
    { name: "Income Expenditure", error: false, data: null },
    { name: "Income Expenditure Schedule", error: false, data: null },
    { name: "Cash flow Statement", error: false, data: null },
    { name: "Auditor Report", error: false, data: null },
  ];
  audit_status = "Unaudited";
  unAuditAct = [
    {
      status: null,
      rejectReason: null,
    },
  ];
  AuditAct = [
    {
      status: null,
      rejectReason: null,
    },
  ];
  Years = JSON.parse(localStorage.getItem("Years"));
  dateShow: string = "2020-21";
  userData = JSON.parse(localStorage.getItem("userData"));
  childComp = false;
  routerNavigate = null;
  response;
  isDisabled = false;
  clickedSave;
  alertError = "Are you sure you want to proceed further?";
  dialogRef;
  modalRef;
  actionResAn;
  saveBtn = "NEXT";
  // actionResAu;
  ulbId = null;
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

  data = {
    ulb: this.userData.ulb,
    design_year: this.Years["2021-22"],
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
          status: null,
          rejectReason: null,
        },
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
          status: null,
          rejectReason: null,
        },
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

  ngOnInit(): void {
    this.ulbId = sessionStorage.getItem("ulb_id");
    this.clickedSave = false;
    this.onLoad();
    sessionStorage.setItem("changeInAnnual", "false");
  }
  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe(async (event: Event) => {
        if (event instanceof NavigationStart) {
          this.alertError = "Are you sure you want to proceed further?";
          const changeInAnnual = sessionStorage.getItem("changeInAnnual");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeInAnnual", "false");
            return;
          }
          if (changeInAnnual === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this._matDialog.closeAll();
            this.openDialog(this.template);
          }
        }
      });
    }
  }

  clickedPreview(template) {
    this.onPreview();
  }

  prevData() {
    let prevData = JSON.parse(JSON.stringify(this.data));
    if (!prevData.audited.submit_annual_accounts) {
      delete prevData.audited.standardized_data;
      delete prevData.audited.provisional_data;
      prevData.audited.submit_standardized_data = undefined;
    }
    if (!prevData.audited.submit_standardized_data) {
      delete prevData.audited.standardized_data;
    }

    if (!prevData.unAudited.submit_annual_accounts) {
      delete prevData.unAudited.standardized_data;
      delete prevData.unAudited.provisional_data;
      prevData.unAudited.submit_standardized_data = undefined;
    }
    if (!prevData.unAudited.submit_standardized_data) {
      delete prevData.unAudited.standardized_data;
    }
    return prevData;
  }

  onPreview() {
    let temp = JSON.parse(JSON.stringify(this.prevData()));
    console.log(temp);
    const dialogRef = this.dialog.open(AnnualPreviewComponent, {
      data: temp,
      height: "95%",
      width: "85vw",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => "");
  }

  onLoad() {
    let ulbId = sessionStorage.getItem("ulb_id"),
      takeStateAction = localStorage.getItem("takeStateAction");
    if (ulbId != null || this.finalSubmitUtiStatus == "true") {
      this.isDisabled = true;
    }
    this.annualAccountsService
      .getData({
        design_year: this.Years["2021-22"],
        ulb: ulbId,
      })
      .subscribe(
        async (res) => {
          this.dataPopulate(res);
          this.actionCheck = res['status'];
          console.log("annual res---------------", res, this.actionCheck);
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
      status.annualAccounts.status = "N/A";
      this._ulbformService.allStatus.next(status);
    }
    console.log("annnualREs", this.data["status"]);

    sessionStorage.setItem("annualAccounts", JSON.stringify(toStoreResponse));
    for (const key in res.audited.provisional_data) {
      this.auditQues[index].data = res.audited.provisional_data[key];
      index++;
    }
    index = 0;
    for (const key in res.unAudited.provisional_data) {
      this.unAuditQues[index].data = res.unAudited.provisional_data[key];
      index++;
    }
    // for action status
    index = 0;
    for (const key in res.unAudited.provisional_data) {
      this.unAuditAct[index] = res.unAudited.provisional_data[key];
      // console.log('ssssssssss', res.unAudited.provisional_data[key]);

      index++;
    }
    index = 0;
    for (const key in res.audited.provisional_data) {
      this.AuditAct[index] = res.audited.provisional_data[key];

      index++;
    }
    //  this.actionResAn = this.unAuditAct.concat(this.AuditAct);
    // this.actionResAu = this.AuditAct;
    console.log("action status both", this.actionResAn);

    // let actRes = {
    //   st : data?.status,
    //   rRes : data?.rejectReason
    // }
    if (this.data["status"] != "NA") {
      this.anFormStaus = this.data["status"] ? this.data["status"] : "PENDING";

      if (this.data["actionTakenByRole"] == USER_TYPE.STATE) {
        if (
          ((this.data?.status == "REJECTED" &&
            this.masterFormStatus != "REJECTED") ||
            (this.data?.status == "APPROVED" &&
              this.masterFormStatus != "APPROVED")) &&
          this.lastRoleInMasterForm == USER_TYPE.ULB
        ) {
          this.anFormStaus = "PENDING";
        }
      }
      if (this.data["actionTakenByRole"] == USER_TYPE.MoHUA) {
        this.anFormStaus = "APPROVED";
        if (
          ((this.data?.status == "REJECTED" &&
            this.masterFormStatus != "REJECTED") ||
            (this.data?.status == "APPROVED" &&
              this.masterFormStatus != "APPROVED")) &&
          this.lastRoleInMasterForm == USER_TYPE.STATE
        ) {
          this.ulbFormStatusMoHUA = "PENDING";
        }
      }

      if (
        this.lastRoleInMasterForm === USER_TYPE.MoHUA &&
        this.finalSubmitUtiStatus == "true"
      ) {
        this.ulbFormStatusMoHUA = this.data["status"];
        this.anFormStaus = this.data["status"];
      }
      if (
        this.lastRoleInMasterForm === USER_TYPE.STATE &&
        this.finalSubmitUtiStatus == "true" &&
        this.anFormStaus == "APPROVED"
      ) {
        this.ulbFormStatusMoHUA = "PENDING";
      }
    }

    // this.ulbFormRejectR = data?.rejectReason;
    //  this.actionRes = actRes;
    //  console.log('asdfghj', actRes, this.actionRes);
    this.checkForm();
  }
  checkDisabled(quesIndex) { }

  async submit(template = null) {
    if (template && this.data.isDraft) {
      this.openDialog(template);
    } else {
      await this.save(this.data);
      return this._router.navigate(["ulbform/slbs"]);
    }
  }

  save(form) {
    if (
      !form.audited.submit_annual_accounts ||
      form.audited.submit_annual_accounts == null
    ) {
      for (const key in form.audited.provisional_data) {
        if (key == undefined || key == "auditor_report") break;
        form.audited.provisional_data[key].excel.name = null;
        form.audited.provisional_data[key].excel.url = null;
        form.audited.provisional_data[key].pdf.url = null;
        form.audited.provisional_data[key].pdf.name = null;
      }
    }
    if (
      !form.unAudited.submit_annual_accounts ||
      form.unAudited.submit_annual_accounts == null
    ) {
      for (const key in form.unAudited.provisional_data) {
        if (key == undefined) break;
        form.unAudited.provisional_data[key].excel.name = null;
        form.unAudited.provisional_data[key].excel.url = null;
        form.unAudited.provisional_data[key].pdf.url = null;
        form.unAudited.provisional_data[key].pdf.name = null;
      }
    }
    if (
      !form.audited.submit_standardized_data ||
      form.audited.submit_standardized_data == null ||
      this.uploadErrors.audited.standardized_data.error
    ) {
      form.audited.standardized_data.excel.name = null;
      form.audited.standardized_data.excel.url = null;
      form.audited.standardized_data.declaration = null;
    }
    if (
      !form.unAudited.submit_standardized_data ||
      form.unAudited.submit_standardized_data == null ||
      this.uploadErrors.unAudited.standardized_data.error
    ) {
      form.unAudited.standardized_data.excel.name = null;
      form.unAudited.standardized_data.excel.url = null;
      form.unAudited.standardized_data.declaration = null;
    }
    console.log(JSON.stringify(form), "saved form.........");

    return new Promise((resolve, rej) => {
      this.annualAccountsService.postData(form).subscribe(
        (res) => {
          sessionStorage.setItem("changeInAnnual", "false");
          console.log(res);
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.annualAccounts.isSubmit = res["isCompleted"];
          this._ulbformService.allStatus.next(status);
          swal("Record submitted successfully!");
          resolve("sucess");
        },
        (err) => {
          swal("Failed To Save");
          resolve(err);
        }
      );
    });
  }

  checkForm() {
    if (
      this.data.audited.submit_annual_accounts == false &&
      this.data.unAudited.submit_annual_accounts == false
    ) {
      this.data.isDraft = false;
      return;
    }
    this.checkForAudit();
    if (!this.data.isDraft) this.checkForUnAudit();
  }

  checkForAudit() {
    let index = 0;
    if (this.data.audited.submit_annual_accounts == null) {
      this.data.isDraft = true;
    } else {
      if (this.data.audited.submit_annual_accounts) {
        for (const key in this.data.audited.provisional_data) {
          if (
            this.data.audited.provisional_data[key].pdf.url == null ||
            this.data.audited.provisional_data[key].pdf.name == null
          ) {
            this.auditQues[index].error = true;
            this.data.isDraft = true;
            return;
          } else {
            this.auditQues[index].error = false;
          }
          index++;
        }
        this.data.isDraft = false;
        if (this.data.audited.submit_standardized_data == null) {
          this.data.isDraft = true;
        } else {
          if (this.data.audited.submit_standardized_data) {
            if (
              this.data.audited.standardized_data.declaration != null &&
              this.data.audited.standardized_data.declaration == true
            ) {
              this.data.isDraft = false;
            } else {
              this.data.isDraft = true;
              return;
            }
            if (
              this.data.audited.standardized_data.excel.url == null ||
              this.data.audited.standardized_data.excel.name == null
            ) {
              this.data.isDraft = true;
            } else {
              this.data.isDraft = false;
            }
          } else {
            this.data.isDraft = false;
          }
        }
      } else {
        this.data.isDraft = false;
      }
    }
  }
  checkForUnAudit() {
    let index = 0;
    if (this.data.unAudited.submit_annual_accounts == null) {
      this.data.isDraft = true;
    } else {
      if (this.data.unAudited.submit_annual_accounts) {
        for (const key in this.data.unAudited.provisional_data) {
          if (
            this.data.unAudited.provisional_data[key].pdf.url == null ||
            this.data.unAudited.provisional_data[key].pdf.name == null
          ) {
            this.unAuditQues[index].error = true;
            this.data.isDraft = true;
            return;
          } else {
            this.unAuditQues[index].error = false;
          }
          index++;
        }
        this.data.isDraft = false;
        if (this.data.unAudited.submit_standardized_data == null) {
          this.data.isDraft = true;
        } else {
          if (this.data.unAudited.submit_standardized_data) {
            if (
              this.data.unAudited.standardized_data.declaration != null &&
              this.data.unAudited.standardized_data.declaration == true
            ) {
              this.data.isDraft = false;
            } else {
              this.data.isDraft = true;
              return;
            }
            if (
              this.data.unAudited.standardized_data.excel.url == null ||
              this.data.unAudited.standardized_data.excel.name == null
            ) {
              this.data.isDraft = true;
            } else {
              this.data.isDraft = false;
            }
          } else {
            this.data.isDraft = false;
          }
        }
      } else {
        this.data.isDraft = false;
      }
    }
  }

  changeAudit(audit) {
    this.audit_status = audit;
    switch (audit) {
      case "Audited":
        this.dateShow = "2019-20";
        break;
      default:
        this.dateShow = "2020-21";
        break;
    }
    if (this.loggedInUserDetails.role === this.USER_TYPE.ULB)
      this.checkDiff();
  }

  declareCheck(data) {
    console.log(data);
    data.declaration = !data.declaration;
    this.checkDiff();
  }

  async clickedSaveAndNext(template) {
    let rejectReasonCheck = true;
    if (this.ulbId == null) {
      console.log(JSON.stringify(this.data));
      this.clickedSave = true;
      let changeHappen = sessionStorage.getItem("changeInAnnual");
      if (changeHappen === "true") {
        this.submit(template);
      } else {
        return this._router.navigate(["ulbform/slbs"]);
      }
    } else {
      if (this.saveBtn == 'SAVE AND NEXT') {
        console.log('unAudit Report', this.unAuditAct);
        console.log('audit Report', this.AuditAct);
        this.unAuditAct.forEach((item) => {
          if ((item.rejectReason == null || item.rejectReason == '') && item.status == 'REJECTED') {
            rejectReasonCheck = false;
            swal('Providing Reason for Rejection is Mandatory for Rejecting a Form');
            return;
          }
        })
        this.AuditAct.forEach((item) => {
          if ((item.rejectReason == null || item.rejectReason == '') && item.status == 'REJECTED') {
            rejectReasonCheck = false;
            swal('Providing Reason for Rejection is Mandatory for Rejecting a Form');
            return;
          }
        })
        let totalQus = [];
        totalQus = this.unAuditQues.concat(this.auditQues);
        console.log('total ques', totalQus);
        totalQus.forEach((item) => {

          if (item.data?.pdf?.url != null && (item.data.status == undefined || item.data.status == "PENDING")) {
            rejectReasonCheck = false;
            swal('Action for all the question is mandatory');
            return;
          }
        })
        if (rejectReasonCheck) {
          this.saveStateActionData();
          console.log('unAutited', this.unAuditQues)
          console.log('unAutited', this.auditQues)
        }

      } else {
        return this._router.navigate(["ulbform/service-level"]);
      }
    }
  }
  answer(question, val, isAudit = null, fromStart = false) {
    let status = isAudit ? "audited" : "unAudited";
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
          swal("ULB has the option to upload the standardised financial statement at a later stage")
        }
        break;
    }
    this.checkDiff();
  }

  clearFile(fileType) {
    if(this.isDisabled){
      return
    }
    let temp = this.data[fileType].standardized_data.excel;
    for (const key in temp) {
      temp[key] = null;
    }
    temp = this.uploadErrors[fileType].standardized_data;
    for (const key in temp) {
      temp[key] = null;
    }
    this.checkDiff();
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
            this.checkDiff();
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

  checkDiff() {
    let storedData = sessionStorage.getItem("annualAccounts");
    let toCompData = JSON.stringify(this.data);
    if (storedData != toCompData) {
      sessionStorage.setItem("changeInAnnual", "true");
      this.saveBtn = "SAVE AND NEXT";
      this.checkForm();
      let allFormData = JSON.parse(sessionStorage.getItem("allFormsData"));
      if (allFormData) {
        allFormData.annualAccountData = [
          JSON.parse(JSON.stringify(this.prevData())),
        ];
        this._ulbformService.allFormsData.next(allFormData);
      }
    } else {
      this.saveBtn = "NEXT";
      sessionStorage.setItem("changeInAnnual", "false");
    }
  }

  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      await this.submit();
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    await this.submit();
    return this._router.navigate(["ulbform/slbs"]);
  }
  alertClose() {
    this.stay();
  }

  getUploadFileData(e, fileType, quesName, index) {
    console.log(e, fileType, quesName, index);
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
    }
    this.checkDiff();
  }

  checkStatusUnA(e, index) {
    this.saveBtn = "SAVE AND NEXT";
    console.log("eeeeeeeeee", index, e);
    this.unAuditAct[index] = e;
    console.log('array unaudited 1', this.unAuditQues);
    // this.unAuditQues[index].data = { ...e }
    this.unAuditQues[index].data.status = e.status;
    this.unAuditQues[index].data.rejectReason = e.rejectReason;
    //  console.log('array unaudited 2', this.unAuditQues);


    // console.log(this.actionResAn);

  }
  checkStatusAu(e, index) {
    this.saveBtn = "SAVE AND NEXT";
    console.log("eeeeeeeeee", index, e);
    this.AuditAct[index] = e;
    //  console.log('array audited', this.AuditAct);
    //  this.actionResAn = this.unAuditAct.concat(this.AuditAct);
    //   this.auditQues[index].data = {...e}
    this.auditQues[index].data.status = e.status;
    this.auditQues[index].data.rejectReason = e.rejectReason;
    console.log(this.actionResAn);
  }
  checkAuditReport(item) {
    if (item.name == "Auditor Report") {
      return "pdf";
    } else {
      return null;
    }
  }

  saveStateActionData() {
    console.log("this data....", this.data);
    let stateData = this.data;
    stateData.unAudited.provisional_data.bal_sheet.status =
      this.unAuditAct[0]?.status;
    stateData.unAudited.provisional_data.bal_sheet.rejectReason =
      this.unAuditAct[0]?.rejectReason;
    stateData.unAudited.provisional_data.bal_sheet_schedules.status =
      this.unAuditAct[1]?.status;
    stateData.unAudited.provisional_data.bal_sheet_schedules.rejectReason =
      this.unAuditAct[1]?.rejectReason;
    stateData.unAudited.provisional_data.inc_exp.status =
      this.unAuditAct[2]?.status;
    stateData.unAudited.provisional_data.inc_exp.rejectReason =
      this.unAuditAct[2]?.rejectReason;
    stateData.unAudited.provisional_data.inc_exp_schedules.status =
      this.unAuditAct[3]?.status;
    stateData.unAudited.provisional_data.inc_exp_schedules.rejectReason =
      this.unAuditAct[3]?.rejectReason;
    stateData.unAudited.provisional_data.cash_flow.status =
      this.unAuditAct[4]?.status;
    stateData.unAudited.provisional_data.cash_flow.rejectReason =
      this.unAuditAct[4]?.rejectReason;

    stateData.audited.provisional_data.bal_sheet.status =
      this.AuditAct[0]?.status;
    stateData.audited.provisional_data.bal_sheet.rejectReason =
      this.AuditAct[0]?.rejectReason;
    stateData.audited.provisional_data.bal_sheet_schedules.status =
      this.AuditAct[1]?.status;
    stateData.audited.provisional_data.bal_sheet_schedules.rejectReason =
      this.AuditAct[1]?.rejectReason;
    stateData.audited.provisional_data.inc_exp.status =
      this.AuditAct[2]?.status;
    stateData.audited.provisional_data.inc_exp.rejectReason =
      this.AuditAct[2]?.rejectReason;
    stateData.audited.provisional_data.inc_exp_schedules.status =
      this.AuditAct[3]?.status;
    stateData.audited.provisional_data.inc_exp_schedules.rejectReason =
      this.AuditAct[3]?.rejectReason;
    stateData.audited.provisional_data.cash_flow.status =
      this.AuditAct[4]?.status;
    stateData.audited.provisional_data.cash_flow.rejectReason =
      this.AuditAct[4]?.rejectReason;
    stateData.audited.provisional_data.auditor_report.status =
      this.AuditAct[4]?.status;
    stateData.audited.provisional_data.auditor_report.rejectReason =
      this.AuditAct[4]?.rejectReason;

    console.log(stateData, "yvugbhijnok");
    this.annualAccountsService.postActionData(stateData).subscribe(
      (res) => {
        swal("Action submitted successfully.");
        const status = JSON.parse(sessionStorage.getItem("allStatus"));
        status.annualAccounts.status = res["newAnnualAccountData"].status;
        this._ulbformService.allStatus.next(status);
        this._router.navigate(["ulbform/service-level"]);
      },
      (err) => {
        swal("Failed To Save Action");
      }
    );
  }
}
