import { Component, OnInit } from "@angular/core";

import { HttpEventType, HttpResponse } from "@angular/common/http";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { AnnualAccountsService } from "./annual-accounts.service";
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
    private annualAccountsService: AnnualAccountsService
  ) {}
  ngOnInit(): void {
    this.onLoad();
  }
  quesOneAnswer: boolean = false;
  quesTwoAnswer: boolean = false;
  audit_status: string = "Unaudited";
  dateShow: string = "2020-21";

  isPdf;
  fileSelected;
  progressArray;
  fileNameArray;
  responses = []

  response = {
    design_year: "606aadac4dff55e6c075c507",
    audit_status: null,
    isCompleted: true,
    year: null,
    submit_annual_accounts: {
      answer: null,
    },
    submit_standardized_data: {
      answer: null,
    },
    provisional_data: {
      bal_sheet: {
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        pdfName: null,
        excelUrl: null,
        excelName: null,
      },
      bal_sheet_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
      },
      inc_exp: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
      },
      inc_exp_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
      },
      cash_flow: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
      },
      auditor_report: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
      },
    },
    standardized_data: {
      upload: {
        excelUrl: null,
        excelName: null,
        progressExcel: null,
      },
      auditor_certificate: {
        pdfUrl: null,
        name: null,
        progress: null,
      },
      auditor_reg_no: null
    },
  };

  onLoad() {
    this.annualAccountsService
      .getData({
        year: "606aadac4dff55e6c075c507",
        design_year: "606aadac4dff55e6c075c507",
      })
      .subscribe(
        (res) => {
          for (let key in res["data"]) {
            let value = res["data"][key];
            if (typeof value === "object" && value !== null) {
              for (let key2 in value) {
                let value2 = value[key2];
                if (typeof value2 === "object" && value2 !== null) {
                  for (let key3 in value2) {
                    if (
                      this.response[key][key2][key3] ||
                      this.response[key][key2][key3] === null
                    ) {
                      this.response[key][key2][key3] =
                        res["data"][key][key2][key3];
                    }
                  }
                } else if (
                  this.response[key][key2] ||
                  this.response[key][key2] === null
                ) {
                  this.response[key][key2] = res["data"][key][key2];
                }
              }
            } else if (this.response[key] || this.response[key] === null) {
              this.response[key] = res["data"][key];
            }
          }
          this.changeAudit(res["data"]["audit_status"]);
          if (this.response.submit_annual_accounts.answer == "yes")
            this.answer("q1", true);
          if (this.response.submit_standardized_data.answer == "yes")
            this.answer("q2", true);
        },
        (err) => {
          console.error(err.message);
        }
      );
  }

  async submit() {
    const form = this.response;
    if (
      form.submit_annual_accounts.answer === "no" ||
      form.submit_annual_accounts.answer === null
    ) {
      delete form.provisional_data;
    }

    if (
      form.submit_standardized_data.answer === "no" ||
      form.submit_standardized_data.answer === null
    ) {
      delete form.standardized_data;
    }

    const errorMessage = this.checkForm(form);
    console.log(errorMessage);

    if (errorMessage !== undefined) {
      const willForward = await swal({
        title: errorMessage + ", Are you sure?",
        text: "Form Incomplete, Will Be Saved As Draft",
        icon: "warning",
        // buttons: true,
        dangerMode: true,
      });
      if (willForward) {
        form.isCompleted = !willForward;
      } else {
        return;
      }
    }
    this.annualAccountsService.postData(form).subscribe(
      (res) => {
        swal("Form Saved", "", "success");
      },
      (err) => {
        swal("Failed To Save", "", "error");
      }
    );
  }

  checkForm(form) {
    if (form.audit_status === null) {
      return "No Autdit Status";
    }
    if (
      form.submit_annual_accounts.answer === null ||
      form.submit_standardized_data.answer === null
    ) {
      return "Not All Questions Answered";
    }
    for (let key in form) {
      let value = form[key];
      if (typeof value === "object" && value !== null) {
        for (let key2 in value) {
          let value2 = value[key2];
          if (key2 === "auditor_report" && form.audit_status !== "Audited") {
            delete form.provisional_data.auditor_report;
            continue;
          }
          if (typeof value2 === "object" && value2 !== null) {
            for (let key3 in value2) {
              if (
                key3 === "progressExcel" ||
                key3 === "excelUrl" ||
                key3 === "excelName" ||
                key3 === "progress"
              ) {
                continue;
              }
              if (form[key][key2][key3] === null) {
                return this.returnErrName(key2) + " Not Uploaded";
              }
            }
          } else if (form[key][key2] === null) {
            return this.returnErrName(key) + " Not Uploaded";
          }
        }
      } else if (form[key] === null) {
        return this.returnErrName(key) + " Not Uploaded";
      }
    }
  }

  returnErrName(name) {
    switch (name) {
      case "bal_sheet":
        return "Balance Sheet";
      case "bal_sheet_schedules":
        return "Balance Sheet Schedules";
      case "inc_exp":
        return "Income Expenditure";
      case "inc_exp_schedules":
        return "Income Expenditure Schedule";
      case "cash_flow":
        return "Cash flow Statement";
      case "auditor_report":
        return "Auditor Report";
      case "upload":
        return "Financials Upload";
      case "auditor_certificate":
        return "Auditors’ Certificate ";
      case "auditor_reg_no":
      return "Auditors’ Registration Number"
    }
  }

  async save() {}

  changeAudit(audit) {
    this.audit_status = audit;
    switch (audit) {
      case "Audited":
        this.dateShow = "2019-20";
        this.response.audit_status = audit;
        this.response.year = "607697074dff55e6c0be33ba";
        break;
      default:
        this.dateShow = "2020-21";
        this.response.audit_status = audit;
        this.response.year = "606aadac4dff55e6c075c507";
        break;
    }
  }

  answer(question, val) {
    switch (question) {
      case "q1":
        this.quesOneAnswer = val;
        if (val) {
          this.response.submit_annual_accounts.answer = "yes";
        } else {
          this.response.submit_annual_accounts.answer = "no";
        }
        break;
      default:
        this.quesTwoAnswer = val;
        if (val) {
          this.response.submit_standardized_data.answer = "yes";
        } else {
          this.response.submit_standardized_data.answer = "no";
        }
        break;
    }
  }

  clearFile(path, type = null) {
    const clearPathArray = path.split(".");
    if (type) {
      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "pdfUrl"
      ] = null;

      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "progress"
      ] = null;

      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "pdfName"
      ] = null;
    } else {
      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "excelUrl"
      ] = null;

      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "progressExcel"
      ] = null;

      this[clearPathArray[0]][clearPathArray[1]][clearPathArray[2]][
        "excelName"
      ] = null;
    }
  }

  fileChangeEvent(event, progressType, fileName, type = null) {
    this.resetFileTracker();
    this.isPdf = type;
    this.progressArray = progressType.split(".");
    this.fileNameArray = fileName.split(".");
    this.fileSelected = <Array<File>>event.target["files"];
    this.upload();
  }
  resetFileTracker() {
    this.progressArray = null;
    this.fileNameArray = null;
  }

  async upload() {
    this[this.fileNameArray[0]][this.fileNameArray[1]][this.fileNameArray[2]][
      this.fileNameArray[3]
    ] = this.fileSelected[0].name;
    this[this.progressArray[0]][this.progressArray[1]][this.progressArray[2]][
      this.progressArray[3]
    ] = 10;
    try {
      await this.uploadFile();
    } catch (error) {
      swal("Upload Failed", error.message, "alert");
    }
  }

  async uploadFile() {
    return new Promise((resolve, reject) => {
      this.dataEntryService
        .getURLForFileUpload(
          this.fileSelected[0].name,
          this.fileSelected[0].type
        )
        .subscribe(
          (s3Response) => {
            const fileAlias = s3Response["data"][0]["file_alias"];
            this[this.progressArray[0]][this.progressArray[1]][
              this.progressArray[2]
            ][this.progressArray[3]] = Math.floor(Math.random() * 90) + 10;
            const s3URL = s3Response["data"][0].url;
            this.uploadFileToS3(this.fileSelected[0], s3URL, fileAlias);
            resolve("success");
          },
          (err) => {
            reject(err.message);
          }
        );
    });
  }

  private uploadFileToS3(file: File, s3URL: string, fileAlias: string) {
    return new Promise((resolve, reject) => {
      this.dataEntryService.uploadFileToS3(file, s3URL).subscribe(
        (res) => {
          if (res.type === HttpEventType.Response) {
            this[this.progressArray[0]][this.progressArray[1]][
              this.progressArray[2]
            ][this.progressArray[3]] = 100;

            if (this.isPdf) {
              this[this.progressArray[0]][this.progressArray[1]][
                this.progressArray[2]
              ]["pdfUrl"] = fileAlias;
            } else {
              this[this.progressArray[0]][this.progressArray[1]][
                this.progressArray[2]
              ]["excelUrl"] = fileAlias;
            }
            resolve("Success");
          }
        },
        (err) => {
          reject(err.message);
        }
      );
    });
  }
}
