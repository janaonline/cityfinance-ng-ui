import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-annual-accounts",
  templateUrl: "./annual-accounts.component.html",
  styleUrls: ["./annual-accounts.component.scss"],
})
export class AnnualAccountsComponent implements OnInit {
  constructor() {}
  dateShow: string = "2021-22";
  audit_status = "Unaudited";
  unAuditQues = [
    { name: "Balance Sheet", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Assets (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Fixed Assets (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of State Grants received (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Central Grants received (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    { name: "Balance Sheet Schedule", error: false, data: null, type: "file" },
    { name: "Income Expenditure", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Revenue (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Expenses (INR in lakhs)",
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
      name: "Please enter total amount of Assets (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Fixed Assets (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of State Grants received (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Central Grants received (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    { name: "Balance Sheet Schedule", error: false, data: null, type: "file" },
    { name: "Income Expenditure", error: false, data: null, type: "file" },
    {
      name: "Please enter total amount of Revenue (INR in lakhs)",
      error: false,
      data: null,
      type: "input",
    },
    {
      name: "Please enter total amount of Expenses (INR in lakhs)",
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
}
