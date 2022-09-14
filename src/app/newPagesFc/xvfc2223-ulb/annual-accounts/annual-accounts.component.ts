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
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.navigationCheck();
    this.loggedInUserType = this.loggedInUserDetails.role;
    this.ulbId = this.userData?.ulb;
    if (!this.ulbId) {
      this.ulbId = localStorage.getItem("ulb_id");
    }
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
  sideMenuItem: any;
  unAuditQues = [
    {
      name: "Balance Sheet",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet",
      action: false,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }

    },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
      key: "assets",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
      key: "f_assets",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
      key: "s_grant",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
      key: "c_grant",
      action: true,
      actError: false,
      qusDis: false,
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Balance Sheet Schedule",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet_schedules",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Income Expenditure",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp",
      action: false,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
      key: "revenue",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
      key: "expense",
      action: true,
      actError: false,
      qusDis: false,
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp_schedules",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Cash flow Statement",
      error: false,
      data: null,
      type: "file",
      key: "cash_flow",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
  ];
  auditQues = [
    {
      name: "Balance Sheet",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet",
      action: false,
      status: null,
      actError: false,
      qusDis: false,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
      key: "assets",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
      key: "f_assets",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
      key: "s_grant",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
      key: "c_grant",
      action: true,
      actError: false,
      qusDis: false,
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Balance Sheet Schedule",
      error: false,
      data: null,
      type: "file",
      key: "bal_sheet_schedules",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Income Expenditure",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp",
      action: false,
      status: null,
      actError: false,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
      key: "revenue",
      action: false,
      actError: false,
      qusDis: false,
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
      key: "expense",
      action: true,
      actError: false,
      qusDis: false,
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
      key: "inc_exp_schedules",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Cash flow Statement",
      error: false,
      data: null,
      type: "file",
      key: "cash_flow",
      actError: false,
      action: true,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
    {
      name: "Auditor Report",
      error: false,
      data: null,
      type: "file",
      key: "auditor_report",
      action: true,
      actError: false,
      status: null,
      rejectReason: null,
      qusDis: false,
      responseFile: {
        url: '',
        name: '',
      }
    },
  ];
  data = {
    ulb: this.userData.ulb,
    design_year: this.Years["2022-23"],
    isDraft: null,
    status: "PENDING",
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
          responseFile: {
            url: '',
            name: '',
          }
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
          responseFile: {
            url: '',
            name: '',
          }
        },
        inc_exp: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
          responseFile: {
            url: '',
            name: '',
          }
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
          responseFile: {
            url: '',
            name: '',
          }
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
          responseFile: {
            url: '',
            name: '',
          }
        },
        auditor_report: {
          pdf: {
            url: null,
            name: null,
          },
          status: null,
          rejectReason: null,
          responseFile: {
            url: '',
            name: '',
          }
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
      year: this.Years["2021-22"],
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
          responseFile: {
            url: '',
            name: '',
          }
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
          responseFile: {
            url: '',
            name: '',
          }
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
          responseFile: {
            url: '',
            name: '',
          }
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
          responseFile: {
            url: '',
            name: '',
          }
        },
        cash_flow: {
          pdf: {
            url: null,
            name: null,
          },
          excel: { url: null, name: null },
          status: null,
          rejectReason: null,
          responseFile: {
            url: '',
            name: '',
          }
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
      year: this.Years["2020-21"],
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
  nextRouter;
  backRouter;

  ngOnInit(): void {

    sessionStorage.setItem("changeInAnnualAcc", "false");
    this.setRouter();
    this.clickedSave = false;
    this.onLoad();
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      //  console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        //    console.log("name name", element);
        if (element?.name == "Annual Accounts") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
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
          // this.routerNavigate = null;
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
  action = "";
  url = "";
  canTakeAction = false;
  onLoad() {
    // let ulbId = sessionStorage.getItem("ulb_id");
    // if (ulbId != null || this.finalSubmitUtiStatus == "true") {
    //   this.isDisabled = true;
    //   this.provisionDisable = true
    //   this.auditedDisable = true
    // }
    this.newCommonService
      .getAnnualData({
        design_year: this.Years["2022-23"],
        ulb: this.ulbId,
      })
      .subscribe(
        async (res) => {
          this.dataPopulate(res);
          let resObj: any = res;
          console.log("resss", resObj);
          this.isDisabled = this.checkIfIsDisabledTrueorFalse(resObj['isDraft'], resObj['actionTakenByRole'], this.loggedInUserType, resObj['status'])
          if (resObj['isDraft'] == false) {
            this.isDisabled = true;
          } else {
            this.isDisabled = true;
          }

          this.action = resObj?.action;
          this.url = resObj?.url;
          if (resObj?.canTakeAction) this.canTakeAction = resObj?.canTakeAction;
          if (!this.canTakeAction) {
            this.actionBtnDis = true;
          }
          // this.actionCheck = res['status'];
          console.log("annual res---------------", this.canTakeAction);
        },
        (err) => {
          this.action = err.error?.action;
          this.url = err.error?.url;
          const toStoreResponse = this.data;
          sessionStorage.setItem(
            "annualAccounts",
            JSON.stringify(toStoreResponse)
          );
          console.error(err.message);
        }
      );

    if (this.userData?.role != "ULB") {
      this.isDisabled = true;
    }
  }

checkIfIsDisabledTrueorFalse(isDraft, actionTakenByRole, loggedInUser, status){
  if(isDraft && actionTakenByRole == "ULB"){
    if(loggedInUser == "ULB"){
      return false;
    }else{
      return true;
    }
  } else if(!isDraft && actionTakenByRole == "ULB"){
    if(loggedInUser == "STATE"){
      return false;
    }else{
      return true;
    }
  } else if(!isDraft && actionTakenByRole == "STATE" && status == "APPROVED"){
    if(loggedInUser == "MoHUA"){
      return false;
    }else{
      return true;
    }
  }  else if(!isDraft && actionTakenByRole == "STATE" && status == "REJECTED"){
    if(loggedInUser == "ULB"){
      return false;
    }else{
      return true;
    }
  }   else if(!isDraft && actionTakenByRole == "MoHUA" && status == "APPROVED"){
   return true;
  }   else if(!isDraft && actionTakenByRole == "MoHUA" && status == "REJECTED"){
    if(loggedInUser == "ULB"){
      return false;
    }else{
      return true;
    }
  } else{
    return true;
  }

}
  auditedActionResponse = {
    status: null,
    rejectReason: null,
    responseFile: {
      name: '',
      url: ''
    }
  };
  unAuditedActionResponse = {
    status: null,
    rejectReason: null,
    responseFile: {
      name: '',
      url: ''
    }
  };
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
    //   console.log("annnualREs", this.data["status"]);

    sessionStorage.setItem("annualAccounts", JSON.stringify(toStoreResponse));
    this.unAuditedActionResponse.status = res?.status;
    this.unAuditedActionResponse.rejectReason = res?.rejectReason;
    this.auditedActionResponse.status = res?.status;
    this.auditedActionResponse.rejectReason = res?.rejectReason;

    if (res?.audited?.submit_annual_accounts == true) {
      let proviDataAu = res?.audited?.provisional_data;
      this.auditQues?.forEach((el) => {
        let key = el?.key;
        if (key && el.type == "file") {
          el["data"] = proviDataAu[key];

        } else if (key && el.type == "input") {
          el["amount"]["value"] = proviDataAu[key];

        }
      });
      this.setStatusOnInputs('auditQues')
      this.auditedActionResponse.responseFile = proviDataAu?.bal_sheet?.responseFile;
    }
    if (res?.unAudited?.submit_annual_accounts == true) {

      let proviDataUn = res?.unAudited?.provisional_data;
      this.unAuditQues?.forEach((el) => {
        let key = el?.key;
        if (key && el.type == "file") {
          el["data"] = proviDataUn[key];
        } else if (key && el.type == "input") {
          el["amount"]["value"] = proviDataUn[key];
        }
      });
      this.setStatusOnInputs('unAuditQues')
      this.unAuditedActionResponse.responseFile = proviDataUn?.bal_sheet?.responseFile;
    }


    console.log("pop data", this.auditQues, this.unAuditQues);
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
    //  console.log("eeeeeeeee", e, fileType, quesName, index);
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
            console.log(
              "error?.data.message upload error",
              error?.data.message
            );

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
          //  console.log(objKeysE);
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
          //  console.log(objKeysE);
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
        // console.log(
        //   typeof this.data?.audited?.provisional_data[key] == "object"
        // );
        let obj = this.data?.audited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          //   console.log("AAAA", objKeysE, objLength);
        }
        if (
          objLength > 0 &&
          (this.data?.audited?.provisional_data[key]?.pdf?.name == "" ||
            this.data?.audited?.provisional_data[key]?.pdf?.name == null)
        ) {
          //this.data.unAudited.provisional_data[key].
          //  console.log("elel key", key);
          this.auditQues.forEach((el) => {
            //  console.log("elel 1", el);
            if (key == el?.key && el?.type == "file") {
              //  console.log("elel", el);
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
          //  console.log("else", key, objLength, this.auditQues);
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
      // console.log(
      //   "this.data.unAudited.provisional_data",
      //   this.data.unAudited.provisional_data
      // );
      for (const key in this.data.unAudited.provisional_data) {
        //  console.log("keys", this.data?.unAudited?.provisional_data[key]);
        let obj = this.data?.unAudited?.provisional_data[key];
        let objLength = 0;
        if (obj != null && obj != "" && obj != undefined) {
          let objKeysE = Object.keys(obj);
          objLength = objKeysE?.length;
          //   console.log(objKeysE);
        }

        if (
          objLength > 0 &&
          (this.data?.unAudited?.provisional_data[key]?.pdf?.name == "" ||
            this.data?.unAudited?.provisional_data[key]?.pdf?.name == null)
        ) {
          this.unAuditQues.forEach((el) => {
            //  console.log("un a file", el);

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
            //  console.log("un a input", el);
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
      this.manadUploadErrors.unAudited.standardized_data.error = false;
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
    console.log("this. answer error", this.answerError);
    console.log("this. upload error", this.uploadErrors);
    if (this.annualError) {
      swal("Missing Data !", `${this.errorMsg}`, "error");
    } else {
      this.validFormSubmit();
    }
  }
  checkFinalError() {
    console.log("aaaaaaaaa error", this.annualError);
    this.unAuditQues.forEach((el) => {
      if (el.error == true || el.error == null) {
        this.annualError = true;
        return;
      }
    });
    this.auditQues.forEach((el) => {
      if (
        el?.key == "auditor_report" &&
        (el?.data?.url == "" || el?.data?.url == null)
      ) {
        if (el.error == true || el.error == null) {
          this.annualError = true;
          return;
        }
      } else if (el?.key !== "auditor_report") {
        if (el.error == true || el.error == null) {
          this.annualError = true;
          return;
        }
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
        this.newCommonService.setFormStatus2223.next(true);
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
        this.newCommonService.setFormStatus2223.next(true);
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
    let value = Number(e?.value);
    console.log("emit", e, fileType, qusName, qusType);
    if (qusType == "input") {
      this.data[fileType].provisional_data[e?.key] = value;
    }
    console.log(
      "emit value patch",
      this.data[fileType].provisional_data[e?.key]
    );
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
  actReturn = false;
  actRemarks = ''
  actionFileData = {
    audited: null,
    unAudited: null

  };
  actionBtnClick(actType, fileType, item, quesIndex, value) {
    console.log('action parts', actType, fileType, item, quesIndex, value);
    let actRes = '';
    let reason = false;
    this.actRemarks = value;
    if (actType == 'Approve') {
      actRes = "APPROVED";
      this.actReturn = false;
      item.actError = false;
      item['status'] = actRes;
    } else if (actType == 'Return') {
      actRes = "REJECTED"
      // item.actError = false;
      item['status'] = actRes;
      this.actReturn = true;
    } else if (actType == 'returnRes') {
      reason = true;
      item.actError = false;
    }


    switch (item?.key) {
      case "c_grant":
        if (reason) {
          this.data[fileType].provisional_data.bal_sheet['rejectReason'] = this.actRemarks
        } else {
          this.data[fileType].provisional_data.bal_sheet['status'] = actRes;
        }
        break;
      case "bal_sheet_schedules":
        if (reason) {
          this.data[fileType].provisional_data.bal_sheet_schedules['rejectReason'] = this.actRemarks
        } else {
          this.data[fileType].provisional_data.bal_sheet_schedules['status'] = actRes;
        }
        break;
      case "expense":
        if (reason) {
          this.data[fileType].provisional_data.inc_exp['rejectReason'] = this.actRemarks
        } else {
          this.data[fileType].provisional_data.inc_exp['status'] = actRes;
        }
        break;
      case "inc_exp_schedules":
        if (reason) {
          this.data[fileType].provisional_data.inc_exp_schedules['rejectReason'] = this.actRemarks
        } else {
          this.data[fileType].provisional_data.inc_exp_schedules['status'] = actRes;
        }
        break;
      case "cash_flow":
        if (reason) {
          this.data[fileType].provisional_data.cash_flow['rejectReason'] = this.actRemarks
        } else {
          this.data[fileType].provisional_data.cash_flow['status'] = actRes;
        }
        break;
      case "auditor_report":
        if (reason) {
          this.data[fileType].provisional_data.auditor_report['rejectReason'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.auditor_report['status'] = actRes;
        }
        break;

      //
    }
    console.log('after action...', this.unAuditQues, this.auditQues);
    console.log('after action data...', this.data);
  }

  getUploadActionFileData(e, type) {
    console.log('action......file', e, type);
    this.actionFileData[type] = e;
    // this.data[type].provisional_data.auditor_report['returnReason'] = this.actRemarks;
    for (const key in this.data[type].provisional_data) {

      if (typeof (this.data[type].provisional_data[key]) == 'object') {
        let actionFile = {
          responseFile: {
            url: e?.pdf?.url,
            name: e?.pdf?.name
          }
        };
        Object.assign(this.data[type].provisional_data[key], actionFile);
        // this.data[type].provisional_data[key]["responseFile"]["url"] = e?.pdf?.url;
        // this.data[type].provisional_data[key]["responseFile"]["name"] = e?.pdf?.name;
      }

    }
    console.log('this. data for action', this.data);

  }
  actionBtnDis = false;
  actionValidation = true;
  checkActionValidation() {

    if (this.data.audited.submit_annual_accounts) {
      this.auditQues.forEach((item) => {
        // if (item?.type == 'file')
        if (item?.data?.status == 'PENDING' || item?.data?.status == null) {
          item.actError = true;
        } else if (item?.data?.status == 'REJECTED' && (item?.data?.rejectReason == '' || item?.data?.rejectReason == null)) {
          item.actError = true;
        } else {
          item.actError = false;
        }
      })
    }
    if (this.data.unAudited.submit_annual_accounts) {
      this.unAuditQues.forEach((item) => {
        // if (item?.type == 'file')

        if (item?.data?.status == 'PENDING' || item?.data?.status == null) {
          item.actError = true;
        } else if (item?.data?.status == 'REJECTED' && (item?.data?.rejectReason == '' || item?.data?.rejectReason == null)) {
          item.actError = true;
        } else {
          item.actError = false;
        }
      })
    }
    console.log('audited', this.auditQues);
    console.log('unAuditQues', this.unAuditQues);
    let commArray = this.unAuditQues.concat(this.auditQues);
    console.log('commArray', commArray);
    for (let el of commArray) {
      if (el?.actError == true) {
        this.actionValidation = false;
        break;
      } else {
        this.actionValidation = true;
      }
    }
    // this.unAuditQues.forEach((el) => {
    //   if (el?.actError == true) {
    //     this.actionValidation = false;
    //     return;
    //   } else {
    //     this.actionValidation = true;
    //   }
    // })
    // this.auditQues.forEach((el) => {
    //   if (el?.actError == true) {
    //     this.actionValidation = false;
    //     return;
    //   } else {
    //     this.actionValidation = true;
    //   }
    // })

  }
  saveAction() {
    this.setStatusOnInputs('unAuditQues');
    this.setStatusOnInputs('auditQues')
    this.checkActionValidation();
    if (this.actionValidation) {
      swal(
        "Confirmation !",
        `Are you sure you want to submit this action? Once submitted,
        it will become uneditable and will be sent to MoHUA for Review.`,
        "warning",
        {
          buttons: {
            Submit: {
              text: "Submit",
              value: "submit",
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
            this.finalActionSave(this.data);
            break;
          case "cancel":
            break;
        }
      });
    } else {
      swal('Error', "One or more required fields are empty. Please check your input.", 'error');
      return;
    }



  }
  finalActionSave(actionBody) {

    this.newCommonService.postActionDataAA(actionBody).subscribe(
      (res) => {
        console.log("action respon", res);
        this.actionBtnDis = true;
        swal("Saved", "Action saved successfully.", "success");
        this.newCommonService.setFormStatus2223.next(true);
      },
      (error) => {
        swal("Error", error?.message ? error?.message : "Error", "error");
      }
    );
  }
  setStatusOnInputs(type) {
    if (type == 'auditQues') {
      for (let i = 0; i < this.auditQues.length; i++) {
        if (i > 0 && i < 5) {
          let stObj = {
            status: this.auditQues[0]?.data?.status,
            rejectReason: this.auditQues[0]?.data?.rejectReason,
            responseFile: this.auditQues[0]?.data?.responseFile
          }
          this.auditQues[i]['data'] = stObj;
          // this.auditQues[i]['data'].status = this.auditQues[0]?.data?.status;
          // this.auditQues[i]['data'].rejectReason = this.auditQues[0]?.data?.rejectReason;
          // this.auditQues[i]['data'].responseFile = this.auditQues[0]?.data?.responseFile;
        }
        if (i > 6 && i < 9) {
          let stObj = {
            status: this.auditQues[6]?.data?.status,
            rejectReason: this.auditQues[6]?.data?.rejectReason,
            responseFile: this.auditQues[6]?.data?.responseFile
          }
          this.auditQues[i]['data'] = stObj;
          // this.auditQues[i]['data'].status = this.auditQues[6]?.data?.status;
          // this.auditQues[i]['data'].rejectReason = this.auditQues[6]?.data?.rejectReason;
          // this.auditQues[i]['data'].responseFile = this.auditQues[6]?.data?.responseFile;
        }
      }
    }
    if (type == 'unAuditQues') {
      for (let i = 0; i < this.unAuditQues.length; i++) {
        if (i > 0 && i < 5) {
          let stObj = {
            status: this.unAuditQues[0]?.data?.status,
            rejectReason: this.unAuditQues[0]?.data?.rejectReason,
            responseFile: this.unAuditQues[0]?.data?.responseFile
          }
          this.unAuditQues[i]['data'] = stObj;
        }
        if (i > 6 && i < 9) {
          let stObj = {
            status: this.unAuditQues[6]?.data?.status,
            rejectReason: this.unAuditQues[6]?.data?.rejectReason,
            responseFile: this.unAuditQues[6]?.data?.responseFile
          }
          this.unAuditQues[i]['data'] = stObj;
        }
      }
    }

  }
}
