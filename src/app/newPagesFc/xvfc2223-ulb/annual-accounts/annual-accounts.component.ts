import { Component, OnInit } from '@angular/core';
import { USER_TYPE } from "src/app/models/user/userType";
import { UserUtility } from "src/app/util/user/user";

@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit {
  constructor() {
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
    { name: "Balance Sheet", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
    },
    { name: "Balance Sheet Schedule", error: false, data: null, type: "file" },
    { name: "Income Expenditure", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
    },
    { name: "Cash flow Statement", error: false, data: null, type: "file" },
  ];
  auditQues = [
    { name: "Balance Sheet", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Assets",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Fixed Assets",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of State Grants received",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Central Grants received",
      error: false,
      data: null,
      type: "input",
    },
    { name: "Balance Sheet Schedule", error: false, data: null, type: "file" },
    { name: "Income Expenditure", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Revenue",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Expenses",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Income Expenditure Schedule",
      error: false,
      data: null,
      type: "file",
    },
    { name: "Cash flow Statement", error: false, data: null, type: "file" },
    { name: "Auditor Report", error: false, data: null, type: "file" },
  ];
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
  provisionDisable = true;
  auditedDisable = true;
  ngOnInit(): void {}
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
    //  this.checkDiff();
  }
}
