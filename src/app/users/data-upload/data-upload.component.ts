import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import swal from 'sweetalert';

import { DataEntryService } from '../../dashboard/data-entry/data-entry.service';
import { USER_TYPE } from '../../models/user/userType';
import { ulbUploadList } from '../../shared/components/home-header/tableHeaders';
import { AccessChecker } from '../../util/access/accessChecker';
import { ACTIONS } from '../../util/access/actions';
import { MODULES_NAME } from '../../util/access/modules';
import { UPLOAD_STATUS } from '../../util/enums';
import { FileUpload } from '../../util/fileUpload';
import { UserUtility } from '../../util/user/user';
import { FinancialDataService } from '../services/financial-data.service';

@Component({
  selector: "app-data-upload",
  templateUrl: "./data-upload.component.html",
  styleUrls: ["./data-upload.component.scss"],
})
export class DataUploadComponent implements OnInit, OnDestroy {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
    public dataUploadService: DataEntryService,
    private financialDataService: FinancialDataService,
    private modalService: BsModalService,
    public accessUtil: AccessChecker,
    public userUtil: UserUtility,
    public fileUpload: FileUpload,
    private _snackBar: MatSnackBar,
    public _matDialog: MatDialog
  ) {
    this.isAccessible = accessUtil.hasAccess({
      moduleName: MODULES_NAME.ULB_DATA_UPLOAD,
      action: ACTIONS.UPLOAD,
    });
    this.activatedRoute.params.subscribe((val) => {
      const { id, uploadId } = val;
      if (id) {
        this.id = id;
      }
      if (uploadId) {
        this.uploadId = uploadId;
      }
    });
    this.createForms();
    this.setTableHeaderByUserType();
    this.modalService.onHide.subscribe(() => (this.isPopupOpen = false));
  }
  @ViewChild("updateWithoutChangeWarning")
  updateWithoutChangeWarning: TemplateRef<any>;

  Object = Object;

  uploadStatus = UPLOAD_STATUS;
  id = null;
  uploadId = null;
  uploadObject = null;
  tableHeaders = ulbUploadList;
  financialYearDropdown = [];
  auditStatusDropdown = [
    {
      id: true,
      itemName: "Audited",
    },
    {
      id: false,
      itemName: "Unaudited",
    },
  ];
  fileFormGroupKeys = [
    "balanceSheet",
    "schedulesToBalanceSheet",
    "incomeAndExpenditure",
    "schedulesToIncomeAndExpenditure",
    "trialBalance",
    "auditReport",
  ];
  fileFormGroup: FormGroup;
  dataUploadList = [];
  isAccessible: boolean;
  financialYearDropdownSettings: any = {
    singleSelection: true,
    text: "Select Year",
  };
  auditStatusDropdownSettings: any = {
    singleSelection: true,
    text: "Audit Status",
  };
  uploadCheckStatusDropDownSettings: any = {
    singleSelection: true,
    text: "Status",
  };
  uploadCheckStatusDropDown: any = [
    {
      id: UPLOAD_STATUS.PENDING,
      itemName: "Pending",
    },
    {
      id: UPLOAD_STATUS.APPROVED,
      itemName: "Approved",
    },
    {
      id: UPLOAD_STATUS.REJECTED,
      itemName: "Rejected",
    },
  ];

  completenessStatus = UPLOAD_STATUS.PENDING;
  correctnessStatus = UPLOAD_STATUS.PENDING;
  @ViewChild("searchFinancialYear") searchFinancialYear: ElementRef;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  currentSort = 1;

  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
  };
  modalTableData: any[] = [];
  loading = false;
  uploadStatusFormControl: FormControl = new FormControl("");
  ulbNameSearchFormControl: FormControl = new FormControl();
  ulbCodeSearchFormControl: FormControl = new FormControl();

  rejectFields = {};

  isApiInProgress = false;

  FieldsKeyAndText = {
    auditReport: "Audit Report",
    incomeAndExpenditure: "Income and Expenditure",
    trialBalance: "Trial Balance",
    balanceSheet: "Balance Sheet",
    schedulesToBalanceSheet: "Schedules To Balance Sheet",
    schedulesToIncomeAndExpenditure: "Schedules To Income and Expenditure",
  };

  isPopupOpen = false;

  ngOnInit() {
    this.fetchFinancialYears();
    if (!this.id) {
      this.getFinancialDataList(
        { skip: this.listFetchOption.skip, limit: 10 },
        this.listFetchOption
      );
    }
    if (this.uploadId) {
      this.getFinancialData();
    }
  }

  getFinancialData() {
    this.financialDataService
      .fetFinancialData(this.uploadId)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  getFinancialDataList(params = {}, body = {}) {
    this.loading = true;
    const { skip } = this.listFetchOption;
    const newParams = {
      skip,
      limit: 10,
      ...params,
    };
    this.financialDataService
      .fetchFinancialDataList(newParams, body)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    if (this.uploadId) {
      this.uploadObject = response.data;

      this.setRejectedFields(this.uploadObject);

      this.updateFormControls();
    } else {
      this.dataUploadList = response.data;
      if ("total" in response) {
        this.tableDefaultOptions = {
          ...this.tableDefaultOptions,
          totalCount: response["total"] || 0,
        };
      }
      if (!this.listFetchOption.sort) {
        // this.dataUploadList = this.dataUploadList.sort((a, b) => {
        //   const c1 = a["status"][2];
        //   const c2 = b["status"][2];
        //   if (c1 > c2) {
        //     return 1;
        //   } else {
        //     return -1;
        //   }
        // });
      }
    }
    this.loading = false;
  };

  setRejectedFields = (uploadObject) => {
    if (
      uploadObject.auditReport &&
      (uploadObject.auditReport.completeness === "REJECTED" ||
        uploadObject.auditReport.correctness === "REJECTED")
    ) {
      this.rejectFields = { ...this.rejectFields, auditReport: `Audit Report` };
    }

    if (
      uploadObject.incomeAndExpenditure &&
      (uploadObject.incomeAndExpenditure.completeness === "REJECTED" ||
        uploadObject.incomeAndExpenditure.correctness === "REJECTED")
    ) {
      this.rejectFields = {
        ...this.rejectFields,
        incomeAndExpenditure: "Income and Expenditure",
      };
    }

    if (
      uploadObject.trialBalance &&
      (uploadObject.trialBalance.completeness === "REJECTED" ||
        uploadObject.trialBalance.correctness === "REJECTED")
    ) {
      this.rejectFields = {
        ...this.rejectFields,
        trialBalance: "Trial Balance",
      };
    }

    if (
      uploadObject.balanceSheet &&
      (uploadObject.balanceSheet.completeness === "REJECTED" ||
        uploadObject.balanceSheet.correctness === "REJECTED")
    ) {
      this.rejectFields = {
        ...this.rejectFields,
        balanceSheet: "Balance Sheet",
      };
    }

    if (
      uploadObject.schedulesToBalanceSheet &&
      (uploadObject.schedulesToBalanceSheet.completeness === "REJECTED" ||
        uploadObject.schedulesToBalanceSheet.correctness === "REJECTED")
    ) {
      this.rejectFields = {
        ...this.rejectFields,
        schedulesToBalanceSheet: "Schedules To Balance Sheet",
      };
    }

    if (
      uploadObject.schedulesToIncomeAndExpenditure &&
      (uploadObject.schedulesToIncomeAndExpenditure.completeness ===
        "REJECTED" ||
        uploadObject.schedulesToIncomeAndExpenditure.correctness === "REJECTED")
    ) {
      this.rejectFields = {
        ...this.rejectFields,
        schedulesToIncomeAndExpenditure: "Schedules To Income and Expenditure",
      };
    }
  };

  handleResponseFailure = (error) => {
    this.loading = false;
    this.handlerError(error);
  };

  getAddedFilterCount() {
    let count = 0;
    for (const parentFormGroup of this.fileFormGroupKeys) {
      const formGroup = this.fileFormGroup.get(parentFormGroup);
      const files = formGroup.value;
      for (const fileKey in files) {
        const fileUrlKey = fileKey.includes("pdf") ? "pdfUrl" : "excelUrl";
        if (files[fileKey]) {
          count++;
        }
      }
    }
    return count;
  }

  async submitClickHandler(event) {
    if (this.isApiInProgress) return;
    this.fileFormGroup.disable();
    event.disabled = true;
    const urlObject = {};
    this.isApiInProgress = true;
    this.fileUpload.totalFiles = this.getAddedFilterCount();
    this.fileUpload.uploading = true;
    for (const parentFormGroup of this.fileFormGroupKeys) {
      if (
        this.fileFormGroup.get(parentFormGroup) instanceof FormGroup ||
        parentFormGroup === "auditReport"
      ) {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        urlObject[parentFormGroup] = {};
        const files = formGroup.value;
        for (const fileKey of ["file_pdf", "file_excel"]) {
          const fileUrlKey = fileKey.includes("pdf") ? "pdfUrl" : "excelUrl";
          urlObject[parentFormGroup][fileUrlKey] = "";
          const formControl = formGroup.get(fileKey);
          if (files[fileKey]) {
            try {
              const { name, type } = files[fileKey];
              const urlResponse: any = await this.dataUploadService
                .getURLForFileUpload(name, type)
                .toPromise();
              if (urlResponse.success) {
                let { url, file_alias } = urlResponse.data[0];
                urlObject[parentFormGroup][fileUrlKey] =
                  urlResponse.data[0].file_alias;
                url = url.replace("admin/", "");
                const fileUploadResponse = await this.dataUploadService
                  .uploadFileToS3(files[fileKey], url)
                  .toPromise();
                this.fileUpload.currentUploadedFiles++;
              }
            } catch (e) {
              event.disabled = false;
              this.fileFormGroup.enable();
              this.fileUpload.reset();
              formControl.setErrors(["File Upload Error"]);
            }
          } else if (formControl && formControl.validator) {
            event.disabled = false;
            this.fileFormGroup.enable();
            this.fileUpload.reset();
            formControl.setErrors(["Please select file"]);
          }
        }
      }
    }
    const responseObject = {
      ...urlObject,
      financialYear: this.fileFormGroup.controls["financialYear"].value[0].id,
      audited: this.fileFormGroup.controls["auditStatus"].value[0].id,
    };
    this.financialDataService.uploadFinancialData(responseObject).subscribe(
      (response: any) => {
        this.fileUpload.uploading = false;
        if (response.success) {
          event.disabled = false;
          this.fileFormGroup.enable();
          this.fileUpload.reset();

          swal({
            title: "Successfully Uploaded",
            text: `Reference No: ${response["data"]["referenceCode"]}`,
            icon: "success",
            // @ts-ignore
            button: "Okay",
          }).then((result) => {
            if (result) {
              this.router.navigate(["/user/data-upload/list"]);
            }
          });
        }
        this.isApiInProgress = false;
      },
      (error: HttpErrorResponse) => {
        event.disabled = false;
        this.fileUpload.uploading = false;
        this.fileUpload.reset();
        this.fileFormGroup.enable();
        this.handlerError(error);
        this.isApiInProgress = false;
      }
    );
  }

  removeAuditReportFromFIleKeys() {
    this.fileFormGroupKeys = this.fileFormGroupKeys.filter(
      (key) => !["auditReport"].includes(key)
    );
  }

  navigateTo(row: any) {
    //  this.financialDataService.selectedFinancialRequest = row;
  }

  private updateFormControls() {
    const {
      financialYear,
      audited,
      completeness: completenessOverAll,
      correctness: correctnessOverAll,
      status,
    } = this.uploadObject;
    this.completenessStatus = completenessOverAll;
    this.correctnessStatus = correctnessOverAll;
    const selectedFinancialYearObject = this.financialYearDropdown.filter(
      (item) => item.id === financialYear
    );
    if (selectedFinancialYearObject) {
      this.fileFormGroup
        .get("financialYear")
        .setValue(selectedFinancialYearObject);
      this.fileFormGroup.get("financialYear").disable();
      this.financialYearDropdownSettings = {
        ...this.financialYearDropdownSettings,
        disabled: true,
      };
    }
    if (audited) {
      this.fileFormGroup
        .get(["auditStatus"])
        .setValue([this.auditStatusDropdown[0]]);
    } else {
      this.removeAuditReportFromFIleKeys();
      this.fileFormGroup
        .get(["auditStatus"])
        .setValue([this.auditStatusDropdown[1]]);
    }
    this.auditStatusDropdownSettings = {
      ...this.auditStatusDropdownSettings,
      disabled: true,
    };
    this.fileFormGroupKeys.forEach((formGroupKey) => {
      const formGroupDataObject = this.uploadObject[formGroupKey];
      const formGroupItem = this.fileFormGroup.get([formGroupKey]);
      formGroupItem.get("message").setValue(formGroupDataObject["message"]);
      const { excelUrl, pdfUrl } = formGroupDataObject;
      formGroupItem.get("pdfUrl").setValue(pdfUrl);
      formGroupItem.get("excelUrl").setValue(excelUrl);
      const { completeness, correctness } = formGroupDataObject;
      if (status === UPLOAD_STATUS.REJECTED) {
        if (
          completeness === UPLOAD_STATUS.REJECTED ||
          completeness === UPLOAD_STATUS.NA ||
          correctness === UPLOAD_STATUS.REJECTED ||
          correctness === UPLOAD_STATUS.NA
        ) {
          formGroupItem.enable();
        } else {
          this.disableFormGroups(formGroupItem, formGroupDataObject);
        }
      } else {
        this.disableFormGroups(formGroupItem, formGroupDataObject);
      }
    });
  }

  disableFormGroups(formGroupItem, formGroupDataObject) {
    formGroupItem.disable();
    formGroupItem.setErrors(null);
    formGroupItem.updateValueAndValidity();
  }

  getFileName(url) {
    return url.split("/").reverse()[0];
  }

  updateRejectedFields() {
    const values = this.fileFormGroup.value;

    Object.keys(this.FieldsKeyAndText).forEach((key) => {
      if (!this.uploadObject[key]) {
        return false;
      }

      const isFieldREJECTED =
        this.uploadObject[key] &&
        (this.uploadObject[key].completeness === "REJECTED" ||
          this.uploadObject[key].correctness === "REJECTED")
          ? true
          : false;

      if (
        isFieldREJECTED &&
        (values[key].file_pdf ||
          values[key].file_excel ||
          this.uploadObject[key].excelUrl !== values[key].excelUrl ||
          this.uploadObject[key].pdfUrl !== values[key].pdfUrl)
      ) {
        delete this.rejectFields[key];
      } else {
        if (isFieldREJECTED) {
          this.rejectFields[key] = this.FieldsKeyAndText[key];
        }
      }
    });
  }

  checkRejectFields(updateButton: HTMLButtonElement) {
    this.updateRejectedFields();
    if (Object.keys(this.rejectFields).length) {
      this._matDialog.open(this.updateWithoutChangeWarning, {
        width: "31vw",
        height: "fit-content",
      });
      return;
    }
    this.updateClickHandler(updateButton);
  }

  async updateClickHandler(updateButton: HTMLButtonElement) {
    updateButton.disabled = true;
    this.fileUpload.totalFiles = this.getAddedFilterCount();
    this.fileUpload.uploading = true;
    const urlObject = {};
    this.isApiInProgress = true;
    let total = 0;
    for (const parentFormGroup of this.fileFormGroupKeys) {
      if (
        this.fileFormGroup.get(parentFormGroup) instanceof FormGroup ||
        parentFormGroup === "auditReport"
      ) {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        if (!formGroup.disabled) {
          if (formGroup.value.file_excel) total++;
          if (formGroup.value.file_pdf) total++;
        }
      }
    }
    this.fileUpload.totalFiles = total;
    for (const parentFormGroup of this.fileFormGroupKeys) {
      if (
        this.fileFormGroup.get(parentFormGroup) instanceof FormGroup ||
        parentFormGroup === "auditReport"
      ) {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        if (!formGroup.disabled) {
          urlObject[parentFormGroup] = {};

          const files = formGroup.value;
          for (const fileKey of ["file_pdf", "file_excel"]) {
            const fileUrlKey = fileKey.includes("pdf") ? "pdfUrl" : "excelUrl";
            urlObject[parentFormGroup][fileUrlKey] = "";
            const formControl = formGroup.get(fileKey);
            if (files[fileKey]) {
              try {
                const { name, type } = files[fileKey];
                const urlResponse: any = await this.dataUploadService
                  .getURLForFileUpload(name, type)
                  .toPromise();
                if (urlResponse.success) {
                  let { url, file_alias } = urlResponse.data[0];
                  urlObject[parentFormGroup][fileUrlKey] = file_alias;
                  url = url.replace("admin/", "");
                  const fileUploadResponse = await this.dataUploadService
                    .uploadFileToS3(files[fileKey], url)
                    .toPromise();
                  this.fileUpload.currentUploadedFiles++;
                }
              } catch (e) {
                this.fileFormGroup.enable();
                updateButton.disabled = false;
                this.fileUpload.reset();
                formControl.setErrors(["File Upload Error"]);
              }
            } else if (formControl && formControl.validator) {
              this.fileFormGroup.enable();
              updateButton.disabled = false;
              this.fileUpload.reset();
              formControl.setErrors(["Please select file"]);
            }
          }
        }
      }
    }

    Object.keys(urlObject).forEach((key) => {
      urlObject[key].pdfUrl = urlObject[key].pdfUrl
        ? urlObject[key].pdfUrl
        : this.uploadObject[key].pdfUrl;
      urlObject[key].excelUrl = urlObject[key].excelUrl
        ? urlObject[key].excelUrl
        : this.uploadObject[key].excelUrl;
    });

    console.log({ urlObject });
    return;
    this.financialDataService
      .upDateFinancialData(this.uploadId, urlObject)
      .subscribe(
        (result) => {
          this.fileUpload.uploading = false;
          this.isApiInProgress = false;
          if (result["success"]) {
            this.router.navigate(["/user/data-upload/list"]);
          }
        },
        (error) => {
          updateButton.disabled = false;
          this.fileUpload.reset();
          this.fileUpload.uploading = false;
          this.isApiInProgress = false;
          this.handlerError(error);
        }
      );
  }

  private listenToSearchEvents() {
    // let fields = [this.searchFinancialYear.nativeElement];
    // fields.forEach(inputField => {
    //   let eventSubject = fromEvent(inputField, 'input').pipe(
    //     map((e: KeyboardEvent) => {
    //     })s
    //   );
    // });
  }

  private fetchFinancialYears() {
    this.financialDataService.getFinancialYears().subscribe((result) => {
      if (result["success"]) {
        this.financialYearDropdown = result["data"];
        this.financialYearDropdown = this.financialYearDropdown.map((year) => {
          return {
            id: year.name,
            itemName: year.name,
          };
        });
        this.financialYearDropdown = this.financialYearDropdown.filter(
          (year) => !["2014-15", "2020-21"].includes(year.itemName)
        );
      }
    });
  }

  setLIstFetchOptions(config = {}) {
    const filterKeys = ["financialYear", "auditStatus"];
    const filterObject = {
      filter: {
        [filterKeys[0]]: this.fileFormGroup.get(filterKeys[0]).value,
        ulbName: this.ulbNameSearchFormControl.value,
        ulbCode: this.ulbCodeSearchFormControl.value,
        audited: this.fileFormGroup.get(filterKeys[1]).value.length
          ? this.fileFormGroup.get(filterKeys[1]).value == "true"
          : "",
        status: this.uploadStatusFormControl.value,
      },
    };
    return {
      ...this.listFetchOption,
      ...filterObject,
      ...config,
    };
  }

  applyFilterClicked() {
    this.loading = true;
    this.listFetchOption = this.setLIstFetchOptions();
    const { skip } = this.listFetchOption;
    this.financialDataService
      .fetchFinancialDataList({ skip, limit: 10 }, this.listFetchOption)
      .subscribe(
        (result) => {
          this.handleResponseSuccess(result);
        },
        (response: HttpErrorResponse) => {
          this.loading = false;
          this._snackBar.open(
            response.error.errors.message ||
              response.error.message ||
              "Some Error Occurred",
            null,
            { duration: 6600 }
          );
        }
      );
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    const { skip } = this.listFetchOption;
    this.getFinancialDataList({ skip, limit: 10 }, this.listFetchOption);
  }

  sortById(id: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;
    this.listFetchOption = {
      ...this.listFetchOption,
      sort: { [id]: this.currentSort },
    };
    this.getFinancialDataList({}, this.listFetchOption);
  }

  private createForms() {
    this.fileFormGroup = new FormGroup({
      financialYear: new FormControl("", [Validators.required]),
      balanceSheet: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required]),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
        message: new FormControl(""),
      }),
      schedulesToBalanceSheet: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl(),
        message: new FormControl(""),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
      }),
      incomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required]),
        message: new FormControl(""),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
      }),
      schedulesToIncomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl(),
        message: new FormControl(""),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
      }),
      trialBalance: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required]),
        message: new FormControl(""),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
      }),
      auditReport: new FormGroup({
        file_pdf: new FormControl(),
        message: new FormControl(""),
        excelUrl: new FormControl(""),
        pdfUrl: new FormControl(""),
      }),
      auditStatus: new FormControl("", [Validators.required]),
    });
  }

  private setTableHeaderByUserType() {
    if (this.userUtil.getUserType() === USER_TYPE.ULB) {
      this.tableHeaders = this.tableHeaders.filter(
        (header) => !["ulbName", "ulbCode"].includes(header.id)
      );
    }
  }
  openModal(row: any, historyModal: TemplateRef<any>) {
    if (this.isPopupOpen) return;
    this.modalTableData = [];
    this.isPopupOpen = true;
    this.financialDataService.fetchFinancialDataHistory(row._id).subscribe(
      (result: HttpResponse<any>) => {
        if (result["success"]) {
          this.modalTableData = result["data"];
          this.modalTableData = this.modalTableData
            .filter((row) => typeof row["actionTakenBy"] != "string")
            .reverse();
          this.modalService.show(historyModal, {});
        }
      },
      (error) => this.handlerError(error)
    );
  }

  private handlerError(response: any) {
    let string = "Some Error Occurred";
    const { message, error } = response;
    if (error) {
      const errorMessage = error.message;
      if (errorMessage) {
        string = errorMessage;
      } else {
        string = message;
      }
    }
    this._snackBar.open(string, null, { duration: 6600 });
  }

  downloadList() {
    const filterOptions = this.setLIstFetchOptions({ download: true });
    const url = this.financialDataService.getFinancialDataListApi(
      filterOptions
    );
    return window.open(url);
  }

  auditStatusDropdownHandler() {
    this.fileFormGroupKeys = [
      "balanceSheet",
      "schedulesToBalanceSheet",
      "incomeAndExpenditure",
      "schedulesToIncomeAndExpenditure",
      "trialBalance",
      "auditReport",
    ];
    if (this.fileFormGroup.get("auditStatus").value) {
      if (this.fileFormGroup.get("auditStatus").value.length) {
        if (this.fileFormGroup.get("auditStatus").value[0].id) {
          return this.fileFormGroup
            .get(["auditReport", "file_pdf"])
            .setValidators([Validators.required]);
        }
      }
    }
    this.removeAuditReportFromFIleKeys();
    this.fileFormGroup.get(["auditReport", "file_pdf"]).setValidators(null);
    this.fileFormGroup
      .get(["auditReport", "file_pdf"])
      .updateValueAndValidity();
  }

  ngOnDestroy(): void {}
}
