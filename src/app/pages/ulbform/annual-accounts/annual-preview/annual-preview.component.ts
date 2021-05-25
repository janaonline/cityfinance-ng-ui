import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { QuestionnaireService } from '../../../questionnaires/service/questionnaire.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { defaultDailogConfiuration } from '../../../questionnaires/state/configs/common.config';
import { AnnualAccountsService } from '../annual-accounts.service'
import { UlbformService } from "../../ulbform.service";
import { SweetAlert } from "sweetalert/typings/core";
import { Router, Event } from "@angular/router";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: "app-annual-preview",
  templateUrl: "./annual-preview.component.html",
  styleUrls: ["./annual-preview.component.scss"],
})
export class AnnualPreviewComponent implements OnInit {

  @ViewChild("annualPreview") _html: ElementRef;
  @ViewChild("templateAnnual") template;
  showLoader;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _questionnaireService: QuestionnaireService,
    private annualAccountsService: AnnualAccountsService,
    public _ulbformService: UlbformService,
    public _router: Router,
    private _matDialog: MatDialog) { }
  styleForPDF = `<style>
  .header-p {
    background-color: #047474;
    height: 70px;
    text-align: center;
}
.heading-p {
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 1.5rem !important;
    font-weight: 700;

}

.card {
    padding: 5px 10px;
    background-color: #EBF5F5;
}

.qus-h-an {
    margin-bottom: .5rem;
    margin-top: 1rem;
    font-size: 10px;
}

.ans-h-an {
    margin-bottom: .5rem;
    margin-top: .5rem;
    font-size: 10px;
}
@media print {
  .page-break {
      page-break-before: always;
  }
}
.h-font {
  display: inline-block;
  font-size: 12px !important;
}
.f-r {
  margin-left: 30px;
}
.ans-h-an{
  margin-left : .5rem !important;
}
.ans-h-na{
  margin-left : 1rem !important;
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px !important;
}
.hi{
  display:none
}
.qus-h-an-ex {
  margin-bottom: .5rem;
  margin-top: .5rem;
  font-size: 10px;
  margin-left : .5rem !important;
}
.ans-h-an-b {
    margin-bottom: .5rem;
    margin-top: .5rem;
    margin-left : 1rem !important;
    font-size: 10px;
}
.form-status {
  font-size: 10px;
  margin-top: 10px;
}
  </style>`

  Years = JSON.parse(localStorage.getItem("Years"));
  @Input() parentData;

  fromParent = true
  year2021;
  year2019;
  auditResponse = {
    design_year: this.Years["2021-22"],
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
      declaration: null,
    },
  };

  unauditResponse = {
    design_year: this.Years["2021-22"],
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
      declaration: null,
    },
  };
  ngOnInit(): void {
    if (this.data) {
      this.parentData = this.data;
      this.fromParent = false
    }
    this.setData();
  }

  setData() {
    if (this.Years["2020-21"] == this.parentData[0].year) {
      this.year2021 = this.parentData[0];
      this.year2019 = this.parentData[1];
    } else {
      this.year2021 = this.parentData[1];
      this.year2019 = this.parentData[0];
    }
  }
  clickedDownloadAsPDF(template) {
    let changeHappen = sessionStorage.getItem("changeInAnnual");
    if (changeHappen === 'true') {
      this.openDialog(template);
    } else {
      this.downloadAsPDF();
    }
  }

  dialogRef
  openDialog(template) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this._matDialog.open(template, dialogConfig);
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    this.showLoader = true;
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(res.slice(0), "pdf", "annualAccounts.pdf");
        this.showLoader = false;
      },
      (err) => {
        this.showLoader = false;
        this.onGettingError(
          ' "Failed to download PDF. Please try after sometime."'
        );
      }
    );
  }
  private onGettingError(message: string) {
    const option = { ...defaultDailogConfiuration };
    option.buttons.cancel.text = "OK";
    option.message = message;
    this.showLoader = false;
    this._matDialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }
  errMessage = ''
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

  async proceed(uploadedFiles) {
    // await this.modalRef.hide();
    this._matDialog.closeAll();
    // this._matDialog.close(this.clicked);
    // this._matDialog.closeAll('Hello');
    // this._matDialog.ngOnDestroy()

    sessionStorage.setItem("changeInAnnual", "false");

    await this.submit()


  }


  async submit() {
    this.setData();
    console.log(this.year2021)
    console.log(this.year2019)
    await this.checkForm(this.year2021);
    await this.checkForm(this.year2019);
    await this.save(this.year2021);
    await this.save(this.year2019);
    sessionStorage.setItem("changeInAnnual", "false");

  }

  save(form) {
    return new Promise(async (resolve, reject) => {

      this.annualAccountsService.postData(form).subscribe(
        (res) => {
          const status = JSON.parse(sessionStorage.getItem("allStatus"));
          status.annualAccounts.isSubmit = res["isCompleted"];
          this._ulbformService.allStatus.next(status);
          swal("Record submitted successfully!");
          resolve("success");

        },
        (err) => {
          swal("Failed To Save", "", "error");
        }
      );
    });
  }
  checkForm(form) {
    return new Promise((res, rej) => {
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
                  key3 === "pdfError" ||
                  key3 === "rejectReason"
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
        form["isCompleted"] = false;
      } else {
        form["isCompleted"] = true;
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
    if (key2 == "auditor_registration") {
      form[key]["auditor_registration_error"] = "Field Empty";
    }
  }

  alertClose() {
    this.stay();
  }

  stay() {
    this.dialogRef.close();
  }
}
