import { Component, ErrorHandler, OnInit } from "@angular/core";

import { HttpEventType, HttpResponse } from "@angular/common/http";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { AnnualAccountsService } from "./annual-accounts.service";
import { SweetAlert } from "sweetalert/typings/core";
import { MatDialog } from "@angular/material/dialog";
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
    private annualAccountsService: AnnualAccountsService, public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.changeAudit("Unaudited");
    this.onLoad();
  }
  quesOneAnswer: boolean = false;
  quesTwoAnswer: boolean = false;

  quesOneAnswer1: boolean = false;
  quesTwoAnswer1: boolean = false;
  audit_status;
  Years = JSON.parse(localStorage.getItem("Years"));
  dateShow: string = "2020-21";

  isPdf;
  fileSelected;
  progressArray;
  fileNameArray;
  response;

  pdfError = "PDF Not Uploaded!";
  answerError = {
    Audited: {
      submit_annual_accounts: false,
      submit_standardized_data: false,
    },
    Unaudited: {
      submit_annual_accounts: false,
      submit_standardized_data: false,
    },
  };

  auditResponse = {
    design_year: this.Years["2020-21"],
    audit_status: "Audited",
    isCompleted: false,
    year: this.Years["2019-20"],
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
        excelError: null,
        pdfError: null,
        excelName: null,
        rejectReason: null,
      },
      bal_sheet_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      inc_exp: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      inc_exp_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      cash_flow: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      auditor_report: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
    },
    standardized_data: {
      upload: {
        excelUrl: null,
        excelName: null,
        progressExcel: null,
        excelError: null,
      },
      auditor_certificate: {
        pdfUrl: null,
        pdfError: null,
        name: null,
        progress: null,
      },
      auditor_registration: null,
      auditor_registration_error:null
    },
  };

  unauditResponse = {
    design_year: this.Years["2020-21"],
    audit_status: "Unaudited",
    isCompleted: false,
    year: this.Years["2020-21"],
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
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      bal_sheet_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      inc_exp: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      inc_exp_schedules: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      cash_flow: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
      auditor_report: {
        pdfName: null,
        pdfUrl: null,
        progress: null,
        progressExcel: null,
        excelUrl: null,
        excelName: null,
        excelError: null,
        pdfError: null,
        rejectReason: null,
      },
    },
    standardized_data: {
      upload: {
        excelUrl: null,
        excelName: null,
        progressExcel: null,
        excelError: null,
      },
      auditor_certificate: {
        pdfError: null,
        pdfUrl: null,
        name: null,
        progress: null,
      },
      auditor_registration: null,
      auditor_registration_error:null
    },
  };
  onPreview(){
    let preData = {
      'unaudit': this.unauditResponse,
     'audit': this.auditResponse
    }
    console.log('preData', preData)
    const dialogRef = this.dialog.open(AnnualPreviewComponent,
      {data: preData,
     height: '95%', width: '85vw',
     panelClass: 'no-padding-dialog' } );
   // this.hidden = false;
    dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result: ${result}`);
  //   this.hidden = true;

   });
  }

  onLoad() {
    this.annualAccountsService
      .getData({
        design_year: this.Years["2020-21"],
      })
      .subscribe(
        async (res) => {
          const responseType =
            res["data"][0]["audit_status"] === "Audited"
              ? "auditResponse"
              : "unauditResponse";
          await this.dataPopulate(res["data"][0], responseType);
          await this.dataPopulate(
            res["data"][1],
            responseType === "auditResponse"
              ? "unauditResponse"
              : "auditResponse"
          );
        },
        (err) => {
          console.error(err.message);
        }
      );
  }

  dataPopulate(res, type) {
    return new Promise((resolve, rej) => {
      for (let key in res) {
        let value = res[key];
        if (typeof value === "object" && value !== null) {
          for (let key2 in value) {
            let value2 = value[key2];
            if (typeof value2 === "object" && value2 !== null) {
              for (let key3 in value2) {
                if (
                  this[type][key][key2][key3] ||
                  this[type][key][key2][key3] === null
                ) {
                  this[type][key][key2][key3] = res[key][key2][key3];
                }
              }
            } else if (
              this[type][key][key2] ||
              this[type][key][key2] === null
            ) {
              this[type][key][key2] = res[key][key2];
            }
          }
        } else if (this[type][key] || this[type][key] === null) {
          this[type][key] = res[key];
        }
      }
      const isAudit = type === "auditResponse" ? true : null;
      if (this[type].submit_annual_accounts.answer == "yes")
        this.answer("q1", true, isAudit);
      if (this[type].submit_standardized_data.answer == "yes")
        this.answer("q2", true, isAudit);
      resolve("success");
    });
  }

  submit() {
    this.save(this.unauditResponse);
    this.save(this.auditResponse);
  }

  async save(form) {
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

    await this.checkForm(form);

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
    return new Promise((res, rej) => {
      let flag = false;
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
                  key3 === "progress" ||
                  key3 === "excelError" ||
                  key3 === "progress" ||
                  key3 === "pdfName" ||
                  key3 === "pdfError"
                ) {
                  continue;
                }
                if (form[key][key2][key3] === null) {
                  this.errorHandler(form, key, key2, key3);
                  flag = true;
                }
              }
            } else if (form[key][key2] === null) {
                this.errorHandler(form, key, key2);
                flag = true;
            }
          }
        } else if (form[key] === null) {
          flag = true;
        }
      }
      if (flag) {
        form["isCompleted"] = true;
      } else {
        form["isCompleted"] = false;
      }
      res("sucess");
    });
  }

  errorHandler(form, key, key2, key3 = null) {
    if (key3 == "pdfUrl") {
      form[key][key2]["pdfError"] = this.pdfError;
    }
    if (key2 === "answer") {
      this.answerError[form["audit_status"]][key] = true;
      setTimeout(() => {
        this.answerError[form["audit_status"]][key] = false;
      }, 4000);
    }
    if(key2 == "auditor_registration"){
      form[key]["auditor_registration_error"] = "Field Empty"
    }
  }

  changeAudit(audit) {
    this.audit_status = audit;
    switch (audit) {
      case "Audited":
        this.dateShow = "2019-20";
        this.response = "auditResponse";
        this[this.response].audit_status = audit;
        this[this.response].year = "607697074dff55e6c0be33ba";
        break;
      default:
        this.dateShow = "2020-21";
        this.response = "unauditResponse";
        this[this.response].audit_status = audit;
        this[this.response].year = "606aadac4dff55e6c075c507";
        break;
    }
  }

  answer(question, val, isAudit = null) {
    switch (question) {
      case "q1":
        if (isAudit) this.quesOneAnswer1 = val;
        else this.quesOneAnswer = val;
        if (val) {
          this[this.response].submit_annual_accounts.answer = "yes";
        } else {
          this[this.response].submit_annual_accounts.answer = "no";
        }
        break;
      default:
        if (isAudit) {
          this.quesTwoAnswer1 = val;
        } else {
          this.quesTwoAnswer = val;
        }
        if (val) {
          this[this.response].submit_standardized_data.answer = "yes";
        } else {
          this[this.response].submit_standardized_data.answer = "no";
        }
        break;
    }
  }

  clearFile(path, type = null, fromUploadExcel = null) {
    const clearPathArray = fromUploadExcel ? path : path.split(".");
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

  fileChangeEvent(
    event,
    progressType,
    fileName,
    type = null,
    isUploadExcel = null
  ) {
    this.resetFileTracker();
    this.isPdf = type;
    this.progressArray = progressType.split(".");
    this.fileNameArray = fileName.split(".");
    this.fileSelected = <Array<File>>event.target["files"];
    this.upload(this.progressArray, this.fileNameArray, type, isUploadExcel);
  }

  resetFileTracker() {
    this.progressArray = null;
    this.fileNameArray = null;
  }

  async upload(progressArray, fileNameArray, isPdf, isUploadExcel) {
    this[fileNameArray[0]][fileNameArray[1]][fileNameArray[2]][
      fileNameArray[3]
    ] = this.fileSelected[0].name;
    this[progressArray[0]][progressArray[1]][progressArray[2]][
      progressArray[3]
    ] = 10;
    try {
      await this.uploadFile();
      if (isUploadExcel) {
        await this.uploadExcel(progressArray);
        this[fileNameArray[0]][fileNameArray[1]][fileNameArray[2]][
          "excelError"
        ] = null;
      }
    } catch (error) {
      if (isUploadExcel) {
        this[fileNameArray[0]][fileNameArray[1]][fileNameArray[2]][
          "excelError"
        ] = error?.data?.message || "Upload Error";
        this.clearFile(fileNameArray, false, true);
      } else this.clearFile(fileNameArray, isPdf);
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
          async (s3Response) => {
            const fileAlias = s3Response["data"][0]["file_alias"];
            this[this.progressArray[0]][this.progressArray[1]][
              this.progressArray[2]
            ][this.progressArray[3]] = Math.floor(Math.random() * 90) + 10;
            const s3URL = s3Response["data"][0].url;
            try {
              await this.uploadFileToS3(this.fileSelected[0], s3URL, fileAlias);
              resolve("success");
            } catch (error) {
              reject(error);
            }
          },
          (err) => {
            reject(err);
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
              this[this.progressArray[0]][this.progressArray[1]][
                this.progressArray[2]
              ]["pdfError"] = null;
            } else {
              this[this.progressArray[0]][this.progressArray[1]][
                this.progressArray[2]
              ]["excelUrl"] = fileAlias;
            }
            resolve("Success");
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async uploadExcel(progressArray) {
    return new Promise((resolve, rej) => {
      let newObj = {
        alias: this[progressArray[0]][progressArray[1]][this.progressArray[2]][
          "excelUrl"
        ],
        financialYear: "",
        design_year: this[progressArray[0]]["design_year"],
      };
      if (this[progressArray[0]]["audit_status"] === "Audited") {
        newObj.financialYear = "2019-20";
      } else {
        newObj.financialYear = "2020-21";
      }
      this.annualAccountsService.processData(newObj).subscribe(
        async (res) => {
          try {
            await this.checkExcelStatus(res["data"]);
          } catch (error) {
            rej(error);
          }
          resolve("Success");
        },
        (err) => {
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
}
