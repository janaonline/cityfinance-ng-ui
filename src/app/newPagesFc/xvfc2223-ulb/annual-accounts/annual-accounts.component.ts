import { HttpEventType } from "@angular/common/http";
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NavigationStart, Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { USER_TYPE } from "src/app/models/user/userType";
import { AnnualAccountsService } from "src/app/pages/ulbform/annual-accounts/annual-accounts.service";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { UserUtility } from "src/app/util/user/user";
import { AnnualPreviewComponent } from "./annual-preview/annual-preview.component";
import { SweetAlert } from "sweetalert/typings/core";
import { I } from "@angular/cdk/keycodes";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit, OnDestroy {
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
      tooltip: '',
      qusDis: true,
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: 'The sum of grants received from state for development, state specific schemes and central sponsored schemes (only state’s share).',
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: 'The sum of grants received from central sector schemes and central sponsored schemes (only center’s share).',
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      tooltip: '',
      qusDis: true,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      tooltip: '',
      qusDis: true,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      tooltip: '',
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "f_assets",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: 'The sum of grants received from state for development, state specific schemes and central sponsored schemes (only state’s share).',
      amount: {
        key: "s_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: 'The sum of grants received from central sector schemes and central sponsored schemes (only center’s share).',
      amount: {
        key: "c_grant",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      rejectReason_state: null,
      rejectReason_mohua: null,
      qusDis: true,
      tooltip: '',
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "revenue",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      amount: {
        key: "expense",
        value: "",
        error: false,
      },
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
      qusDis: true,
      tooltip: '',
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        url: '',
        name: '',
      },
      responseFile_mohua: {
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
          status: null,
          rejectReason: null,
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        name: '',
        url: ''
      },
      responseFile_mohua: {
        name: '',
        url: ''
      }
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
          rejectReason_state: null,
          rejectReason_mohua: null,
          responseFile_state: {
            url: '',
            name: '',
          },
          responseFile_mohua: {
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
      status: null,
      rejectReason: null,
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        name: '',
        url: ''
      },
      responseFile_mohua: {
        name: '',
        url: ''
      }
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
  overAllFormDis = true;
  ngOnInit(): void {
    sessionStorage.setItem("changeInAnnualAcc", "false");
    this.setRouter();
    this.clickedSave = false;
    this.onLoad();
  }
  setRouter() {
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
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
          this.checkIfIsDisabledTrueorFalse(resObj['isDraft'], resObj['canTakeAction'], this.loggedInUserType, resObj['status'])
          this.action = resObj?.action;
          this.url = resObj?.url;
          if (resObj?.canTakeAction) this.canTakeAction = resObj?.canTakeAction;
          if (!this.canTakeAction) {
            this.actionBtnDis = true;
          }
          if (resObj['status'] == 'REJECTED') {
            this.overAllFormDis = false;
          } else {
            this.overAllFormDis = true;
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
          if (this.userData?.role !== 'ULB') {
            this.isDisabled = true;
            this.tab1dis = true;
            this.tab2dis = true;
          }
          this.actionBtnDis = true;
          console.error(err.message);
        }
      );


  }

  checkIfIsDisabledTrueorFalse(isDraft, canTakeAct, loggedInUser, status) {
    if (loggedInUser !== "ULB") {
      this.isDisabled = true;
      this.tab1dis = true;
      this.tab2dis = true;
    } else if (loggedInUser == 'ULB' && canTakeAct == false && status == 'APPROVED') {
      this.isDisabled = true;
      this.tab1dis = true;
      this.tab2dis = true;
    } else if (loggedInUser == 'ULB' && isDraft == false && status == 'PENDING') {
      this.isDisabled = true;
      this.tab1dis = true;
      this.tab2dis = true;
    }

    else if (loggedInUser == 'ULB' && isDraft == false && status == 'REJECTED') {
      this.isDisabled = true;
      //audited status -- false
      if (this.data?.audited?.submit_annual_accounts == false) {
        if (this.data?.audited?.status == 'REJECTED' && this.data?.isDraft == false) {
          this.tab1dis = false;
        } else {
          this.tab1dis = true;
        }
      }
      //unaudited status -- false
      if (this.data?.unAudited?.submit_annual_accounts == false) {
        if (this.data?.unAudited?.status == 'REJECTED' && this.data?.isDraft == false) {
          this.tab2dis = false;
        } else {
          this.tab2dis = true;
        }
      }

    }
    else if (loggedInUser == 'ULB' && isDraft == true && canTakeAct == false) {
      this.isDisabled = false;
      this.tab1dis = false;
      this.tab2dis = false;
    } else if (loggedInUser == 'ULB' && isDraft == null) {
      this.isDisabled = false;
      this.tab1dis = false;
      this.tab2dis = false;
    } else {
      this.isDisabled = true;
      this.tab1dis = true;
      this.tab2dis = true;
    }
  // if(isDraft && actionTakenByRole == "ULB"){
  //   if(loggedInUser == "ULB"){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // } else if(!isDraft && actionTakenByRole == "ULB"){
  //   if(loggedInUser == "STATE"){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // } else if(!isDraft && actionTakenByRole == "STATE" && status == "APPROVED"){
  //   if(loggedInUser == "MoHUA"){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }  else if(!isDraft && actionTakenByRole == "STATE" && status == "REJECTED"){
  //   if(loggedInUser == "ULB"){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }   else if(!isDraft && actionTakenByRole == "MoHUA" && status == "APPROVED"){
  //  return true;
  // }   else if(!isDraft && actionTakenByRole == "MoHUA" && status == "REJECTED"){
  //   if(loggedInUser == "ULB"){
  //     return false;
  //   }else{
  //     return true;
  //   }
  // } else{
  //   return true;
  // }

}
  auditedActionResponse = {
    status: null,
    rejectReason: null,
    rejectReason_state: null,
    rejectReason_mohua: null,
    responseFile_state: {
      name: '',
      url: ''
    },
    responseFile_mohua: {
      name: '',
      url: ''
    }
  };
  unAuditedActionResponse = {
    status: null,
    rejectReason: null,
    rejectReason_state: null,
    rejectReason_mohua: null,
    responseFile_state: {
      name: '',
      url: ''
    },
    responseFile_mohua: {
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

    }
    sessionStorage.setItem("annualAccounts", JSON.stringify(toStoreResponse));
    this.unAuditedActionResponse.status = res?.status;
    this.unAuditedActionResponse.rejectReason = res?.rejectReason;
    this.unAuditedActionResponse.rejectReason_state = res?.rejectReason_state;
    this.unAuditedActionResponse.rejectReason_state = res?.rejectReason_mohua;
    this.auditedActionResponse.status = res?.status;
    this.auditedActionResponse.rejectReason = res?.rejectReason;
    this.auditedActionResponse.rejectReason_state = res?.rejectReason_state;
    this.auditedActionResponse.rejectReason_state = res?.rejectReason_mohua;
    //unaudited status -- true
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
      this.auditedActionResponse.responseFile_state = proviDataAu?.bal_sheet?.responseFile_state;
      this.auditedActionResponse.responseFile_mohua = proviDataAu?.bal_sheet?.responseFile_mohua;
    }
    //unaudited status -- false
    if (this.data?.audited?.submit_annual_accounts == false) {
      if (this.data?.audited?.status == 'REJECTED' && this.data?.isDraft == false) {
        this.tab1dis = false;
      }
    }
    //unaudited status -- true
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
      this.unAuditedActionResponse.responseFile_state = proviDataUn?.bal_sheet?.responseFile_state;
      this.unAuditedActionResponse.responseFile_mohua = proviDataUn?.bal_sheet?.responseFile_mohua;
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
      status: 'PENDING',
      rejectReason: '',
      rejectReason_state: null,
      rejectReason_mohua: null,
      responseFile_state: {
        name: '',
        url: ''
      },
      responseFile_mohua: {
        name: '',
        url: ''
      }
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
    if (this.data.audited.status != 'APPROVED') this.data.audited.status = "PENDING";
    if (this.data.unAudited.status != 'APPROVED') this.data.unAudited.status = "PENDING";
    this.newCommonService.postAnnualData(this.data).subscribe(
      (res) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        this.newCommonService.setFormStatus2223.next(true);
        swal("Saved", "Data saved as draft successfully", "success");
        this.onLoad();
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

    if (this.data.audited.status != 'APPROVED') {
      this.data.audited.status = "PENDING";
    }
    if (this.data.unAudited.status != 'APPROVED') {
      this.data.unAudited.status = "PENDING";
    }
    this.newCommonService.postAnnualData(this.data).subscribe(
      (res) => {
        this.clickedSave = false;
        sessionStorage.setItem("changeInAnnualAcc", "false");
        this.isDisabled = true;
        this.tab1dis = true;
        this.tab2dis = true;
        this.overAllFormDis = true;
        this.data.isDraft = false;
        this.setDisableField();
        this.newCommonService.setFormStatus2223.next(true);
        swal("Saved", "Data saved successfully", "success");
        this.onLoad();
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
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.bal_sheet['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.bal_sheet['rejectReason_mohua'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.bal_sheet['status'] = actRes;
        }
        break;
      case "bal_sheet_schedules":
        if (reason) {
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.bal_sheet_schedules['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.bal_sheet_schedules['rejectReason_mohua'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.bal_sheet_schedules['status'] = actRes;
        }
        break;
      case "expense":
        if (reason) {
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.inc_exp['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.inc_exp['rejectReason_mohua'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.inc_exp['status'] = actRes;
        }
        break;
      case "inc_exp_schedules":
        if (reason) {
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.inc_exp_schedules['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.inc_exp_schedules['rejectReason_mohua'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.inc_exp_schedules['status'] = actRes;
        }
        break;
      case "cash_flow":
        if (reason) {
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.cash_flow['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.cash_flow['rejectReason_mohua'] = this.actRemarks;
        } else {
          this.data[fileType].provisional_data.cash_flow['status'] = actRes;
        }
        break;
      case "auditor_report":
        if (reason) {
          if (this.loggedInUserType == USER_TYPE.STATE) this.data[fileType].provisional_data.auditor_report['rejectReason_state'] = this.actRemarks;
          if (this.loggedInUserType == USER_TYPE.MoHUA) this.data[fileType].provisional_data.auditor_report['rejectReason_mohua'] = this.actRemarks;
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
    if (this.data[type].submit_annual_accounts) {
      for (const key in this.data[type].provisional_data) {
        if (typeof (this.data[type].provisional_data[key]) == 'object') {
          let actionFile;
          if (this.userData?.role == 'STATE') {
            actionFile = {
              responseFile_state: {
                url: e?.pdf?.url,
                name: e?.pdf?.name
              }
            };
          } else {
            actionFile = {
              responseFile_mohua: {
                url: e?.pdf?.url,
                name: e?.pdf?.name
              }
            };
          }

          Object.assign(this.data[type].provisional_data[key], actionFile);
          // this.data[type].provisional_data[key]["responseFile_state"]["url"] = e?.pdf?.url;
          // this.data[type].provisional_data[key]["responseFile_state"]["name"] = e?.pdf?.name;
        }

      }
    } else {
      let actionFile;
      if (this.userData?.role == 'STATE') {
        actionFile = {
          responseFile_state: {
            url: e?.pdf?.url,
            name: e?.pdf?.name
          }
        };
      } else {
        actionFile = {
          responseFile_mohua: {
            url: e?.pdf?.url,
            name: e?.pdf?.name
          }
        };
      }
      Object.assign(this.data[type], actionFile);
    }

    console.log('this. data for action', this.data);

  }
  actionBtnDis = false;
  actionValidation = true;
  isAudActionVal = true;
  isUnAudActionVal = true;
  checkAudActValidation() {
    if (this.data.audited.submit_annual_accounts) {
      this.setStatusOnInputs('auditQues')
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
    } else if (this.data.audited.submit_annual_accounts == false) {
      if (this.data?.audited.status == 'PENDING' || this.data?.audited?.status == null) {
        this.isAudActionVal = false;
      } else if (this.data?.audited.status == 'REJECTED' && (this.data?.audited?.rejectReason == '' || this.data?.audited?.rejectReason == null)) {
        this.isAudActionVal = false;
      } else {
        this.isAudActionVal = true;
      }
    }
  }
  checkUnAudActValidation() {
    if (this.data.unAudited.submit_annual_accounts) {
      this.setStatusOnInputs('unAuditQues');
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
    } else if (this.data.unAudited.submit_annual_accounts == false) {
      if (this.data?.unAudited.status == 'PENDING' || this.data?.unAudited?.status == null) {
        this.isUnAudActionVal = false;
      } else if (this.data?.unAudited.status == 'REJECTED' && (this.data?.unAudited?.rejectReason == '' || this.data?.unAudited?.rejectReason == null)) {
        this.isUnAudActionVal = false;
      } else {
        this.isUnAudActionVal = true;
      }
    }
  }
  checkActionValidation() {
    this.checkUnAudActValidation()
    this.checkAudActValidation();
    //action validation for 4 cases
    if (this.data.audited.submit_annual_accounts && this.data.unAudited.submit_annual_accounts) {
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
    } else if (this.data.audited.submit_annual_accounts == true && this.data.unAudited.submit_annual_accounts == false) {
      for (let el of this.auditQues) {
        if (el?.actError == true) {
          this.actionValidation = false;
          break;
        } else {
          this.actionValidation = true;
        }
      }
      if (this.actionValidation && this.isAudActionVal) {
        this.actionValidation = true;
      } else {
        this.actionValidation = false;
      }
    } else if (this.data.audited.submit_annual_accounts == false && this.data.unAudited.submit_annual_accounts == true) {
      for (let el of this.unAuditQues) {
        if (el?.actError == true) {
          this.actionValidation = false;
          break;
        } else {
          this.actionValidation = true;
        }
      }
      if (this.actionValidation && this.isUnAudActionVal) {
        this.actionValidation = true;
      } else {
        this.actionValidation = false;
      }
    } else {
      if (this.isAudActionVal && this.isUnAudActionVal) {
        this.actionValidation = true;
      } else {
        this.actionValidation = false;
      }
    }
    console.log('audited', this.auditQues);
    console.log('unAuditQues', this.unAuditQues);

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
    this.setRouter();
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
        setTimeout(() => {
          this.onLoad();
        }, 300)

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
            rejectReason_state: this.auditQues[0]?.data?.rejectReason_state,
            rejectReason_mohua: this.auditQues[0]?.data?.rejectReason_mohua,
            responseFile_state: this.auditQues[0]?.data?.responseFile_state,
            responseFile_mohua: this.auditQues[0]?.data?.responseFile_mohua
          }
          this.auditQues[i]['data'] = stObj;
        }
        if (i > 6 && i < 9) {
          let stObj = {
            status: this.auditQues[6]?.data?.status,
            rejectReason: this.auditQues[6]?.data?.rejectReason,
            //-------------------
            rejectReason_state: this.auditQues[6]?.data?.rejectReason_state,
            rejectReason_mohua: this.auditQues[6]?.data?.rejectReason_mohua,
            responseFile_state: this.auditQues[6]?.data?.responseFile_state,
            responseFile_mohua: this.auditQues[6]?.data?.responseFile_mohua
          }
          this.auditQues[i]['data'] = stObj;
        }
      }
    }
    if (type == 'unAuditQues') {
      for (let i = 0; i < this.unAuditQues.length; i++) {
        if (i > 0 && i < 5) {
          let stObj = {
            status: this.unAuditQues[0]?.data?.status,
            rejectReason: this.unAuditQues[0]?.data?.rejectReason,
            //--------------
            rejectReason_state: this.unAuditQues[0]?.data?.rejectReason_state,
            rejectReason_mohua: this.unAuditQues[0]?.data?.rejectReason_mohua,
            responseFile_state: this.unAuditQues[0]?.data?.responseFile_state,
            responseFile_mohua: this.unAuditQues[0]?.data?.responseFile_mohua
          }
          this.unAuditQues[i]['data'] = stObj;
        }
        if (i > 6 && i < 9) {
          let stObj = {
            status: this.unAuditQues[6]?.data?.status,
            rejectReason: this.unAuditQues[6]?.data?.rejectReason,
            //-------
            rejectReason_state: this.unAuditQues[6]?.data?.rejectReason_state,
            rejectReason_mohua: this.unAuditQues[6]?.data?.rejectReason_mohua,
            responseFile_state: this.unAuditQues[6]?.data?.responseFile_state,
            responseFile_mohua: this.unAuditQues[6]?.data?.responseFile_mohua
          }
          this.unAuditQues[i]['data'] = stObj;
        }
      }
    }
    this.setDisableField();

  }
  tab1dis = false;
  tab2dis = false;
  setDisableField() {
    //audit disable
    console.log('data action.....', this.data);
    if (this.data?.audited?.submit_annual_accounts == true) {
      this.auditQues.forEach((el) => {
        if (this.userData?.role !== "ULB") {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.canTakeAction == false && el?.data?.status == 'APPROVED') {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == false && el?.data?.status == 'PENDING') {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == false && el?.data?.status == 'REJECTED') {
          el['qusDis'] = true;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == true && this.canTakeAction == false) {
          el['qusDis'] = true;
        } else {
          el['qusDis'] = true;
        }
        // if (el?.data?.status == 'REJECTED' && this.userData?.role == 'ULB') {
        //   el['qusDis'] = true;
        // }
        //  else {
        //   el['qusDis'] = false;
        // }
      });
    }

    //unaudit disable
    if (this.data?.unAudited?.submit_annual_accounts == true) {
      this.unAuditQues.forEach((el) => {
        console.log('data action ele.....', el);
        if (this.userData?.role !== "ULB") {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.canTakeAction == false && el?.data?.status == 'APPROVED') {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == false && el?.data?.status == 'PENDING') {
          el['qusDis'] = false;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == false && el?.data?.status == 'REJECTED') {
          el['qusDis'] = true;
        } else if (this.userData?.role == 'ULB' && this.data?.isDraft == true && this.canTakeAction == false) {
          el['qusDis'] = true;
        } else {
          el['qusDis'] = true;
        }
        // if (el?.data?.status == 'REJECTED' && this.userData?.role == 'ULB') {
        //   el['qusDis'] = true;
        // } else {
        //   el['qusDis'] = false;
        // }
      })
    }


    console.log('aud rejected case', this.auditQues);
    console.log('unA rejected case', this.unAuditQues);
  }

  formSubs = null;
  setFormIdRouter() {
    this.formSubs = this.newCommonService.setULBRouter.subscribe((res) => {
      if (res == true) {
        this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
        this.setRouter();
      }
    });
  }
  ngOnDestroy() {
    this.formSubs?.unsubscribe();
  }
  actionBtnNo(resType, fileType, val) {
    console.log('no no action', resType, fileType, val);
    if (resType !== 'returnRes') {
      this.data[fileType].status = resType
    }
    console.log('data...', this.data);
  }

  // setActionStatus(): void {
  //   this.formDataChange = this.formData;
  //   this.errorF = this.commonActionError;
  //   if (this.actionFor == 'ULBForm') {
  //     this.stateReview = true;
  //     if (
  //       this.formData?.status == "APPROVED" &&
  //       this.formData?.actionTakenByRole == "STATE"
  //     ) {
  //       this.finalStatus = "Under Review by MoHUA";
  //       this.state_status = 'APPROVED';

  //     } else if (
  //       this.formData?.status == "REJECTED" &&
  //       this.formData?.actionTakenByRole == "STATE"
  //     ) {
  //       this.finalStatus = "Returned by State";
  //       this.state_status = 'REJECTED';
  //     } else if (
  //       this.formData?.status == "APPROVED" &&
  //       this.formData?.actionTakenByRole == "MoHUA"
  //     ) {
  //       this.finalStatus = "Approved by MoHUA";
  //       this.mohuaReview = true;
  //       this.state_status = 'APPROVED';
  //       this.mohua_status = 'APPROVED';

  //     }
  //     else if (
  //       this.formData?.status == "REJECTED" &&
  //       this.formData?.actionTakenByRole == "MoHUA"
  //     ) {
  //       this.finalStatus = "Returned by MoHUA";
  //       this.mohuaReview = true;
  //       this.state_status = 'APPROVED';
  //       this.mohua_status = 'REJECTED';
  //     }
  //   }
  //   if (this.actionFor == 'StateForm') {
  //     this.stateReview = false;
  //     if (
  //       this.formData?.status == "APPROVED" &&
  //       this.formData?.actionTakenByRole == "MoHUA"
  //     ) {
  //       this.finalStatus = "Approved by MoHUA";
  //       this.mohuaReview = true;
  //       // this.state_status = 'APPROVED';
  //       this.mohua_status = 'APPROVED';

  //     }
  //     else if (
  //       this.formData?.status == "REJECTED" &&
  //       this.formData?.actionTakenByRole == "MoHUA"
  //     ) {
  //       this.finalStatus = "Returned by MoHUA";
  //       this.mohuaReview = true;
  //       // this.state_status = 'APPROVED';
  //       this.mohua_status = 'REJECTED';
  //     }
  //   }
  // }
}
