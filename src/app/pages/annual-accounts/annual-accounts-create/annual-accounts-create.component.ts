import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { DataEntryService } from "src/app/dashboard/data-entry/data-entry.service";
import { IStateULBCovered } from "src/app/shared/models/stateUlbConvered";
import { CommonService } from "src/app/shared/services/common.service";
import { QuestionnaireService } from "src/app/pages/questionnaires/service/questionnaire.service";

import { AnnualAccountsService } from "../annual-accounts.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { defaultDailogConfiuration } from "../../questionnaires/state/configs/common.config";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
@Component({
  selector: "app-annual-accounts-create",
  templateUrl: "./annual-accounts-create.component.html",
  styleUrls: ["./annual-accounts-create.component.scss"],
})
export class AnnualAccountsCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private annualAccountsService: AnnualAccountsService,
    private dataEntryService: DataEntryService,
    private _commonService: CommonService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _questionnaireService: QuestionnaireService
  ) {
    this.fetchStateList();
  }
  @Input() viewData;
  @ViewChild("pdf15_16") pdf15_16: ElementRef;
  @ViewChild("excel15_16") excel15_16: ElementRef;
  @ViewChild("pdf16_17") pdf16_17: ElementRef;
  @ViewChild("excel16_17") excel16_17: ElementRef;
  @ViewChild("pdf17_18") pdf17_18: ElementRef;
  @ViewChild("excel17_18") excel17_18: ElementRef;
  @ViewChild("pdf18_19") pdf18_19: ElementRef;
  @ViewChild("excel18_19") excel18_19: ElementRef;
  @ViewChild("template") template: TemplateRef<any>;
  @ViewChild("saveTemplate") saveTemplate: TemplateRef<any>;
  @ViewChild("fileTemplate") fileTemplate: TemplateRef<any>;
  @ViewChild("prev2") _html: ElementRef;

  styleForPDF = `<style>
  .container {
    width: 100% !important;
  font-size: 10px !important;
  }
  .mr{
    margin-left: 1em;
  }
  </style>`;

  date;
  validateForm!: FormGroup;
  stateList: IStateULBCovered[] = [];
  stateListName = {};
  ulbList: any[] = [];
  ulbListName = {};
  documents = {
    financial_year_2015_16: {
      pdf: [],
      excel: [],
    },
    financial_year_2016_17: {
      pdf: [],
      excel: [],
    },
    financial_year_2017_18: {
      pdf: [],
      excel: [],
    },
    financial_year_2018_19: {
      pdf: [],
      excel: [],
    },
  };
  viewMode = false;
  ulb: any;
  disableSubmit = false;
  loader = {
    financial_year_2015_16: {
      pdf: false,
      excel: false,
      name: { pdf: null, excel: null },
    },
    financial_year_2016_17: {
      pdf: false,
      excel: false,
      name: { pdf: null, excel: null },
    },
    financial_year_2017_18: {
      pdf: false,
      excel: false,
      name: { pdf: null, excel: null },
    },
    financial_year_2018_19: {
      pdf: false,
      excel: false,
      name: { pdf: null, excel: null },
    },
  };

  historyYear;
  yearInHistory;
  typeInHistory;
  anyDocumentUploaded = false;
  dialogRefForAlert;
  totalFiles = 8;
  ngOnInit() {
    this.date = new Date();
    if (this.viewData != undefined) {
      this.viewMode = true;
    }

    this.validateForm = this.fb.group({
      state: [{ value: null, disabled: this.viewMode }, [Validators.required]],
      bodyType: [
        { value: "ulb", disabled: this.viewMode },
        [Validators.required],
      ],
      ulb: [{ value: null, disabled: this.viewMode }],
      ulbType: [{ value: null, disabled: "true" }],
      parastatalName: [
        { value: null, disabled: this.viewMode },
        [Validators.pattern(".*?[a-zA-Z]+.*")],
      ],
      person: [
        { value: null, disabled: this.viewMode },
        [Validators.required, Validators.pattern(".*?[a-zA-Z]+.*")],
      ],
      designation: [
        { value: null, disabled: this.viewMode },
        [Validators.required, Validators.pattern(".*?[a-zA-Z]+.*")],
      ],
      email: [
        { value: null, disabled: this.viewMode },
        [
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          Validators.required,
        ],
      ],
    });
    if (this.viewMode) {
      this.setSelectedData();
      this.fetchUlbList(this.viewData.state);
    }
  }

  setSelectedData() {
    this.validateForm.patchValue({
      state: this.viewData.state,
      bodyType: this.viewData.bodyType,
      ulb: this.viewData.ulb,
      ulbType: this.viewData.ulbType,
      parastatalName: this.viewData.parastatalName,
      person: this.viewData.person,
      designation: this.viewData.designation,
      email: this.viewData.email,
    });
    this.anyDocumentUploaded = this.hasUserUploadedAnyDocumnet();
  }

  hasUserUploadedAnyDocumnet() {
    const documents = { ...this.viewData.documents };
    return Object.keys(documents).some((FinancialYear) => {
      const pdf = documents[FinancialYear].pdf || [];
      const excel = documents[FinancialYear].excel || [];
      if (pdf.length || excel.length) return true;
      return false;
    });
  }

  fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      this.stateList = res.data;
      res.data.forEach((element) => {
        this.stateListName[element._id] = element.name;
      });
    });
  }

  fetchUlbList(stateId) {
    this.ulbList = [];
    this._commonService.getULBByStateCode(stateId).subscribe((res) => {
      if (res["data"]) {
        res["data"] = res["data"].sort((stateA, stateB) =>
          stateA.name > stateB.name ? 1 : -1
        );
      }
      this.ulbList = res["data"];
      res["data"].forEach((element) => {
        this.ulbListName[element._id] = element;
      });
    });
  }

  loadUlb(event) {
    this.fetchUlbList(event.target.value);
    this.validateForm.patchValue({
      ulbType: null,
      ulb: null,
    });
  }

  updateUlbType(event) {
    this.ulb = this.ulbList.find((item) => item._id == event.target.value);
    this.validateForm.patchValue({ ulbType: this.ulb.ulbType.name });
  }

  resetBodyValues() {
    this.validateForm.patchValue({
      ulbType: null,
      ulb: null,
      parastatalName: null,
    });
  }
  checkDocuments() {
    let isValid = false;
    for (const key in this.documents) {
      if (this.documents[key].pdf.length > 0) {
        isValid = true;
        this.totalFiles--;
      }
      if (this.documents[key].excel.length > 0) {
        isValid = true;
        this.totalFiles--;
      }
    }
    return isValid;
  }
  async submitForm() {
    if (!this.checkDocuments()) {
      this.snackBar.open(`Please Upload at least One File to Save!`, "Error", {
        duration: 3000,
      });
      return;
    }
    if (this.totalFiles > 0) {
      let answer = await this.openModal(this.fileTemplate, true);
      if (!answer) {
        this.totalFiles = 8;
        return;
      }
    }
    this.disableSubmit = true;
    this.validateForm.value["documents"] = this.documents;

    this.annualAccountsService
      .createAnnualAccounts(this.validateForm.value)
      .subscribe(
        async (response) => {
          await this.openModal(this.saveTemplate, true);
          this.validateForm.reset();
        },
        (error) => {
          this.disableSubmit = false;
          console.error(error);
        }
      );
  }

  isFileValid(file: File) {
    const fileName = file.name;
    const fileType = file.type;
    const fileExtension = fileName.split(".").pop();
    if (fileExtension === "csv") return false;

    if (
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) ||
      fileType.includes("application/vnd.ms-excel") ||
      fileExtension === "pdf"
    ) {
      return true;
    }

    return false;
  }

  upload(event, type, year) {
    const fileName = event.target.files[0].name;
    const fileType = event.target.files[0].type;
    console.log(`fileType `, fileType);

    if (this.isFileValid(event.target.files[0])) {
      const selectedType = fileType == "application/pdf" ? "pdf" : "excel";

      const size = event.target.files[0].size / (1024 * 1024);

      if (selectedType == type && size < 50) {
        this.loader[year][type] = true;
        this.loader[year]["name"][type] = fileName;

        this.dataEntryService.getURLForFileUpload(fileName, fileType).subscribe(
          (response) => {
            const s3Url = response["data"][0].url;
            const finalUrl = response["data"][0].file_alias;
            this.dataEntryService
              .uploadFileToS3(event.target.files[0], s3Url)
              .subscribe(
                (response) => {
                  if (response["body"]) {
                    let params = {
                      ulb: this.validateForm.value.ulb,
                      bodyType: "ulb",
                      year,
                      type,
                    };
                    this.annualAccountsService.getYearHistory(params).subscribe(
                      async (res) => {
                        this.loader[year][type] = false;
                        if (res["data"].haveHistory) {
                          this.historyYear = res["data"].historyData;
                          this.yearInHistory = year;
                          this.typeInHistory = type;
                          let store = await this.openModal(this.template);
                          if (!store) return;
                        }
                        this.documents[year][type] = [
                          { name: fileName, url: finalUrl },
                        ];
                      },
                      (err) => {
                        console.error(err);
                        this.loader[year][type] = false;
                      }
                    );
                  }
                },
                (error) => {
                  console.error(error);
                  this.loader[year][type] = false;
                }
              );
          },
          (error) => {
            console.error(error);
            this.loader[year][type] = false;
          }
        );
      } else {
        this.snackBar.open(
          `Please select ${type} file and size should be less than 50mb`,
          "Error",
          {
            duration: 3000,
          }
        );
        this.updateSelecteFile(year, type);
      }
    } else {
      this.snackBar.open("Invalid File type", "Error", {
        duration: 3000,
      });
      this.updateSelecteFile(year, type);
    }
  }

  remove(year, type) {
    if (year == "year_15_16") {
      type == "pdf"
        ? ((this.documents.financial_year_2015_16.pdf = []),
          (this.pdf15_16.nativeElement.value = ""))
        : ((this.documents.financial_year_2015_16.excel = []),
          (this.excel15_16.nativeElement.value = ""));
    }
    if (year == "year_16_17") {
      type == "pdf"
        ? ((this.documents.financial_year_2016_17.pdf = []),
          (this.pdf16_17.nativeElement.value = ""))
        : ((this.documents.financial_year_2016_17.excel = []),
          (this.excel16_17.nativeElement.value = ""));
    }
    if (year == "year_17_18") {
      type == "pdf"
        ? ((this.documents.financial_year_2017_18.pdf = []),
          (this.pdf17_18.nativeElement.value = ""))
        : ((this.documents.financial_year_2017_18.excel = []),
          (this.excel17_18.nativeElement.value = ""));
    }
    if (year == "year_18_19") {
      type == "pdf"
        ? ((this.documents.financial_year_2018_19.pdf = []),
          (this.pdf18_19.nativeElement.value = ""))
        : ((this.documents.financial_year_2018_19.excel = []),
          (this.excel18_19.nativeElement.value = ""));
    }
  }

  updateSelecteFile(year, type) {
    if (year == "financial_year_2015_16") {
      type == "pdf"
        ? (this.pdf15_16.nativeElement.value = "")
        : (this.excel15_16.nativeElement.value = "");
    }
    if (year == "financial_year_2016_17") {
      type == "pdf"
        ? (this.pdf16_17.nativeElement.value = "")
        : (this.excel16_17.nativeElement.value = "");
    }
    if (year == "financial_year_2017_18") {
      type == "pdf"
        ? (this.pdf17_18.nativeElement.value = "")
        : (this.excel17_18.nativeElement.value = "");
    }
    if (year == "financial_year_2018_19") {
      type == "pdf"
        ? (this.pdf18_19.nativeElement.value = "")
        : (this.excel18_19.nativeElement.value = "");
    }
  }

  openModal(template: TemplateRef<any>, disableOutSideClick = null) {
    return new Promise((resolve, reject) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = disableOutSideClick ? true : false;
      this.dialogRefForAlert = this.dialog.open(template, dialogConfig);
      this.dialogRefForAlert.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }

  stay() {
    this.dialogRefForAlert.close(false);
  }

  proceed() {
    this.dialogRefForAlert.close(true);
  }

  alertClose() {
    this.dialogRefForAlert.close(false);
  }

  getName(item) {
    return item[this.yearInHistory][this.typeInHistory][0].name;
  }
  getUrl(item) {
    return item[this.yearInHistory][this.typeInHistory][0].url;
  }

  downloadAsPDF() {
    const elementToAddPDFInString = this._html.nativeElement.outerHTML;
    const html = this.styleForPDF + elementToAddPDFInString;
    console.log(JSON.stringify(html));
    this._questionnaireService.downloadPDF({ html }).subscribe(
      (res) => {
        this.downloadFile(
          res.slice(0),
          "pdf",
          "Acknowledgement_Annual Accounts.pdf"
        );
      },
      (err) => {
        console.log(err);

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
    this.dialog.open(DialogComponent, { data: option });
  }
  private downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  formatChange(yearInHistory) {
    let temp = yearInHistory.split("_");
    return `${temp[temp.length - 2]}-${temp[temp.length - 1]}`;
  }
}
