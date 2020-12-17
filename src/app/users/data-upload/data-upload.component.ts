import 'chartjs-plugin-labels';

import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chart from 'chart.js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { JSONUtility } from 'src/app/util/jsonUtil';
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
import { SidebarUtil } from '../utils/sidebar.util';
import { IFinancialData } from './models/financial-data.interface';
import {
  APPROVAL_COMPLETED,
  REJECT_BY_MoHUA,
  REJECT_BY_STATE,
  SAVED_AS_DRAFT,
  UNDER_REVIEW_BY_MoHUA,
  UNDER_REVIEW_BY_STATE,
} from './util/request-status';
import { UploadDataUtility } from './util/upload-data.util';

@Component({
  selector: "app-data-upload",
  templateUrl: "./data-upload.component.html",
  styleUrls: ["./data-upload.component.scss"],
})
export class DataUploadComponent
  extends UploadDataUtility
  implements OnInit, OnDestroy {
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
    public _matDialog: MatDialog,
    private _commonService: CommonService
  ) {
    super();
    SidebarUtil.hideSidebar();

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
        this.getFinancialData();
      } else {
        this.fetchStateList();

        this.fetchULBList();
        this.fetchChartData();
        this.fetchCardData();
      }
    });

    this.createForms();
    this.setTableHeaderByUserType();
    this.modalService.onHide.subscribe(() => (this.isPopupOpen = false));
    this.initializeULBFormGroup();
    if (this.loggedInUserData.role !== USER_TYPE.STATE) {
    } else {
      this.tableHeaders = this.tableHeaders.filter(
        (header) => header.id !== "stateName"
      );
    }
  }
  questionForState = [
    {
      question:
        "Grant transfer certificate signed by Principal secretary/ secretary(UD)",
      key: "grantTransferCertificate",
    },
    {
      question:
        "Utilization report signed by Principal secretary/ secretary (UD)",
      key: "utilizationReport",
    },
    {
      question:
        "Letter signed by Principal secretary/ secretary (UD) confirming submission of service level benchmarks by all ULBs",
      key: "serviceLevelBenchmarks",
    },
  ];
  @ViewChild("updateWithoutChangeWarning")
  updateWithoutChangeWarning: TemplateRef<any>;

  Object = Object;

  ulbList: any[];

  uploadStatus = UPLOAD_STATUS;
  userTypes = USER_TYPE;
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
  dataUploadList: Array<IFinancialData & { canTakeAction?: boolean }> = [];
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

  UNDER_REVIEW_BY_STATE = UNDER_REVIEW_BY_STATE;
  UNDER_REVIEW_BY_MoHUA = UNDER_REVIEW_BY_MoHUA;

  uploadCheckStatusDropDown: any = [
    SAVED_AS_DRAFT,
    UNDER_REVIEW_BY_STATE,
    UNDER_REVIEW_BY_MoHUA,
    REJECT_BY_STATE,
    REJECT_BY_MoHUA,
    APPROVAL_COMPLETED,
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
  ulbTypeSearchFormControl: FormControl = new FormControl("");
  populationTypeSearchFormControl: FormControl = new FormControl("");
  ulbCodeSearchFormControl: FormControl = new FormControl();
  stateNameControl = new FormControl("");
  censusCode: FormControl = new FormControl();
  sbCode: FormControl = new FormControl();

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

  stateList = [];

  ulbtableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };

  stateDocumentstableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  ulbcurrentSort = 1;

  ulblistFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
  };

  cardData: any;

  defaultChartOptions = {
    responsive: true,
    legend: {
      display: false,
      position: "top",
      labels: {
        boxWidth: 2,
      },
    },

    scales: {
      yAxes: [
        {
          gridLines: {
            color: "white",
            drawBorder: false,
            display: true,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false,
            fontSize: 11,
            padding: 5,
          },
          barPercentage: 0.5,
          categoryPercentage: 1,
          gridLines: {
            color: "white",
            drawBorder: false,
            display: true,
            offsetGridLines: false,
          },
        },
      ],
    },
  };

  ulbFilter: FormGroup;

  showNotRegisteredULBsInChart = false;

  chartData;

  notRegisteredUlbBarData;

  currentChart;

  jsonUtil = new JSONUtility();

  loggedInUserData = new UserUtility().getLoggedInUserDetails();

  haveRequestToTakeAction = false;

  stateFcGrantDocuments = null;

  ngOnInit() {
    this.getStateFcDocments();

    if (this.loggedInUserData.role === USER_TYPE.STATE) {
      return;
    }
    if (!this.id) {
      this.getFinancialDataList(
        { skip: this.listFetchOption.skip, limit: 10 },
        this.listFetchOption
      );
    }

    if (this.uploadId) {
      this.getFinancialData();
    } else {
      if (this.userUtil.getUserType() === USER_TYPE.ULB) {
        this.gettingULBDats();
      }
    }
  }

  getStateFcDocments() {
    this.financialDataService.getStateFCDocuments().subscribe((res) => {
      if (this.loggedInUserData.role === this.userTypes.STATE) {
        if (res && res["data"] && res["data"].length) {
          this.stateFcGrantDocuments = {
            [this.questionForState[0].key]:
              res["data"][0][this.questionForState[0].key],
            [this.questionForState[1].key]:
              res["data"][0][this.questionForState[1].key],
            [this.questionForState[2].key]:
              res["data"][0][this.questionForState[2].key],
          };
        } else this.stateFcGrantDocuments = null;
      } else {
        if (res && res["data"] && res["data"].length) {
          this.stateFcGrantDocuments = res["data"];
        } else this.stateFcGrantDocuments = null;
      }
    });
  }

  filesToSaveForState(values) {
    let body = {
      [this.questionForState[0].key]: null,
      [this.questionForState[1].key]: null,
      [this.questionForState[2].key]: null,
    };
    body = { ...body, ...values };
    this.financialDataService.saveStateFCDocuments(body).subscribe((res) => {});
  }

  onChangingShowULBInChart(event: MatSlideToggleChange) {
    this.showNotRegisteredULBsInChart = event.checked;

    const indexOfNoRegisteredULB = this.chartData.labels.findIndex(
      (label) => label === "Not Registered"
    );

    const newChartData = this.jsonUtil.deepCopy(this.chartData);

    if (!event.checked) {
      newChartData.labels = this.chartData.labels.filter(
        (label, index) => index !== indexOfNoRegisteredULB
      );
      newChartData.datasets[0].data = this.chartData.datasets[0].data.filter(
        (label, index) => index !== indexOfNoRegisteredULB
      );
      newChartData.datasets[0].backgroundColor = this.chartData.datasets[0].backgroundColor.filter(
        (label, index) => index !== indexOfNoRegisteredULB
      );
    }

    this.createChart(newChartData);
  }

  onclickTotalNoOfULB() {
    const stateName =
      this.loggedInUserData.role === USER_TYPE.STATE
        ? this.ulbFilter.value.stateName
        : "";
    this.ulbFilter.reset({
      stateName,
      isMillionPlus: "",
      registration: "",
      ulbType: "",
    });
    this.scrollToElement("ulb-list");
  }

  onClickingOtherCards(body) {
    const stateName =
      this.loggedInUserData.role === USER_TYPE.STATE
        ? this.ulbFilter.value.stateName
        : "";
    if (!body) body = { stateName };
    body = {
      isMillionPlus: "",
      registration: "",
      ulbType: "",
      ...body,
      stateName,
    };
    this.ulbFilter.reset({ ...body });
    this.scrollToElement("ulb-list");
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(`${elementId}`);
    element.scrollIntoView({ behavior: "smooth" });
  }

  onClickCharTakeAction(something, isMillionPlus?: "Yes" | "No") {
    this.populationTypeSearchFormControl.setValue(isMillionPlus || "");
    this.uploadStatusFormControl.setValue(something);
    this.applyFilterClicked();
    this.scrollToElement("data-upload-tracker-list");
  }

  initializeULBFormGroup() {
    this.ulbFilter = this.formBuilder.group({
      ulbName: [],
      stateName: [""],
      ulbType: [""],
      censusCode: [],
      sbCode: [],
      email: [],
      mobile: [],
      isMillionPlus: [""],
      registration: [""],
    });

    this.ulbFilter.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.uploadId) return;
        this.ulblistFetchOption.skip = 0;
        this.ulbtableDefaultOptions.currentPage = 1;
        this.fetchULBList(newValue);
      });
  }

  fetchChartData() {
    this._commonService.fetchDashboardChartData().subscribe((res) => {
      this.chartData = res["data"];
      let textToTakeAction;
      switch (this.loggedInUserData.role) {
        case USER_TYPE.STATE: {
          textToTakeAction = "Under Review By State";
          break;
        }
        case USER_TYPE.MoHUA: {
          textToTakeAction = "Under Review By MoHUA";
          break;
        }
      }
      if (textToTakeAction) {
        const indexOfSearchText = this.chartData.labels.findIndex(
          (label) => label === textToTakeAction
        );
        this.haveRequestToTakeAction =
          this.chartData.datasets[0].data[indexOfSearchText] > 0;
        this.chartData.datasets[0].backgroundColor[indexOfSearchText] = "red";
      }
      this.chartData.labels = this.chartData.labels.map((text: string) =>
        !text.includes("By")
          ? text
          : [text.split("By")[0] + "By", text.split("By")[1]]
      );

      this.onChangingShowULBInChart({ checked: false, source: null });
    });
  }

  createChart(chartData) {
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    chartData.type = "bar";
    const canvasElement = document.getElementById(
      `canvas`
    ) as HTMLCanvasElement;

    if (!canvasElement) return;

    switch (this.loggedInUserData.role) {
      case USER_TYPE.STATE: {
        break;
      }
      case USER_TYPE.MoHUA: {
        break;
      }
    }

    const ctx = canvasElement.getContext("2d");
    let maxValue;
    chartData.datasets[0].data.forEach((value) => {
      if (maxValue === undefined || maxValue === null) maxValue = value;
      if (value > maxValue) maxValue = value;
    });

    if (maxValue < 10) maxValue = 10;
    this.defaultChartOptions.scales.yAxes[0].ticks["max"] = Number.parseInt(
      maxValue + maxValue / 20
    );
    if (maxValue > 5) {
      this.defaultChartOptions.scales.yAxes[0].ticks[
        "stepSize"
      ] = Number.parseInt((maxValue + maxValue / 20) / 5 + "");
    }

    this.currentChart = new Chart(ctx, {
      type: "bar",
      data: { ...chartData },
      options: {
        ...this.defaultChartOptions,

        plugins: {
          labels: {
            position: "border",
            fontColor: (data) => {
              return "grey";
            },
            render: (args) => {
              return args.value;
            },
          },
        },
      },
      plugins: [
        {
          beforeInit: function (chart) {
            chart.data.labels.forEach(function (e, i, a) {
              if (/\n/.test(e)) {
                a[i] = e.split(/\n/);
              }
            });
          },
        },
      ],
    });
  }

  hexToRgb(colorString) {
    const result = colorString
      .substring(colorString.indexOf("(") + 1, colorString.lastIndexOf(")"))
      .split(/,\s*/);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  fetchCardData() {
    this._commonService.fetchDashboardCardData().subscribe((res) => {
      this.cardData = res["data"];
      this.cardData.totalULB.sum =
        this.cardData.totalULB["Municipal Corporation"] +
        this.cardData.totalULB["Municipality"] +
        this.cardData.totalULB["Town Panchayat"];

      this.cardData.registeredMillionPlus.sum =
        this.cardData.registeredMillionPlus["Municipal Corporation"] +
        this.cardData.registeredMillionPlus["Municipality"] +
        this.cardData.registeredMillionPlus["Town Panchayat"];

      this.cardData.registeredNonMillionPlus.sum =
        this.cardData.registeredNonMillionPlus["Municipal Corporation"] +
        this.cardData.registeredNonMillionPlus["Municipality"] +
        this.cardData.registeredNonMillionPlus["Town Panchayat"];

      this.cardData.registeredUlb.sum =
        this.cardData.registeredUlb["Municipal Corporation"] +
        this.cardData.registeredUlb["Municipality"] +
        this.cardData.registeredUlb["Town Panchayat"];

      this.cardData.totalMillionPlus.sum =
        this.cardData.totalMillionPlus["Municipal Corporation"] +
        this.cardData.totalMillionPlus["Municipality"] +
        this.cardData.totalMillionPlus["Town Panchayat"];

      this.cardData.totalNonMillionPlus.sum =
        this.cardData.totalNonMillionPlus["Municipal Corporation"] +
        this.cardData.totalNonMillionPlus["Municipality"] +
        this.cardData.totalNonMillionPlus["Town Panchayat"];
    });
  }

  private fetchULBList(params = {}) {
    this.ulbList = undefined;
    const { skip } = this.ulblistFetchOption;
    const newParams = {
      skip,
      limit: 10,
      ...params,
    };
    this._commonService.fetchULBList(newParams).subscribe((res) => {
      this.ulbList = res["data"];
      if ("total" in res) {
        this.ulbtableDefaultOptions = {
          ...this.ulbtableDefaultOptions,
          totalCount: res["total"] || 0,
        };
      }
    });
  }

  private gettingULBDats(params = {}, body = {}) {
    this.loading = true;
    const { skip } = this.listFetchOption;
    const newParams = {
      skip,
      limit: 10,
      ...params,
    };
    this.financialDataService
      .fetchFinancialDataList(newParams, body)
      .subscribe((res) => {
        if (res["data"] && res["data"].length) {
          this.router.navigate([
            "/user/data-upload/upload-form",
            res["data"][0]._id,
          ]);
        }
      });
  }

  getFinancialData() {
    this.financialDataService
      .fetFinancialData(this.uploadId)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  private fetchStateList() {
    this._commonService.getStateUlbCovered().subscribe((res) => {
      if (this.loggedInUserData.role === USER_TYPE.STATE) {
        this.stateList = res.data.filter(
          (state) => state._id === this.loggedInUserData.state
        );
        this.ulbFilter.controls.stateName.patchValue(this.stateList[0].name);
        this.stateNameControl.patchValue(this.stateList[0].name);
        this.applyFilterClicked();
      } else this.stateList = res.data;
    });
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

  private formatResponse(req: IFinancialData, history = false) {
    if (!req.isCompleted) {
      return {
        ...req,
        customStatusText: SAVED_AS_DRAFT.itemName,
        canTakeAction: this.canTakeAction(req),
      };
    }

    let customStatusText;
    switch (req.actionTakenByUserRole) {
      case USER_TYPE.ULB:
        customStatusText = history
          ? "Submitted By ULB"
          : UNDER_REVIEW_BY_STATE.itemName;
        break;
      case USER_TYPE.STATE:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_STATE.itemName;
        } else {
          customStatusText = history
            ? "Approved by STATE"
            : UNDER_REVIEW_BY_MoHUA.itemName;
        }

        break;
      case USER_TYPE.MoHUA:
        if (req.status === UPLOAD_STATUS.REJECTED) {
          customStatusText = REJECT_BY_MoHUA.itemName;
        } else {
          customStatusText = APPROVAL_COMPLETED.itemName;
        }
        break;
      default:
        customStatusText = "N/A";
    }

    return {
      ...req,
      customStatusText,
      canTakeAction: this.canTakeAction(req),
    };
  }

  handleResponseSuccess = (response: any) => {
    this.canTakeAction();
    if (this.uploadId) {
      this.uploadObject = response.data;

      if (this.uploadObject) {
        this.setRejectedFields(this.uploadObject);

        this.updateFormControls();
      }
    } else {
      this.dataUploadList = response.data.map((req: IFinancialData) =>
        this.formatResponse(req)
      );
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
    // this.fileFormGroupKeys.forEach((formGroupKey) => {
    //   const formGroupDataObject = this.uploadObject[formGroupKey];
    //   const formGroupItem = this.fileFormGroup.get([formGroupKey]);
    //   formGroupItem.get("message").setValue(formGroupDataObject["message"]);
    //   const { excelUrl, pdfUrl } = formGroupDataObject;
    //   formGroupItem.get("pdfUrl").setValue(pdfUrl);
    //   formGroupItem.get("excelUrl").setValue(excelUrl);
    //   const { completeness, correctness } = formGroupDataObject;
    //   if (status === UPLOAD_STATUS.REJECTED) {
    //     if (
    //       completeness === UPLOAD_STATUS.REJECTED ||
    //       completeness === UPLOAD_STATUS.NA ||
    //       correctness === UPLOAD_STATUS.REJECTED ||
    //       correctness === UPLOAD_STATUS.NA
    //     ) {
    //       formGroupItem.enable();
    //     } else {
    //       this.disableFormGroups(formGroupItem, formGroupDataObject);
    //     }
    //   } else {
    //     this.disableFormGroups(formGroupItem, formGroupDataObject);
    //   }
    // });
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
        ulbName: this.ulbNameSearchFormControl.value
          ? this.ulbNameSearchFormControl.value.trim()
          : "",
        ulbCode: this.ulbCodeSearchFormControl.value
          ? this.ulbCodeSearchFormControl.value.trim()
          : "",
        audited: this.fileFormGroup.get(filterKeys[1]).value.length
          ? this.fileFormGroup.get(filterKeys[1]).value == "true"
          : "",
        censusCode: this.censusCode.value ? this.censusCode.value.trim() : "",
        sbCode: this.sbCode.value ? this.sbCode.value.trim() : "",
        status: this.uploadStatusFormControl.value,
        stateName: this.stateNameControl.value
          ? this.stateNameControl.value.trim()
          : "",
        ulbType: this.ulbTypeSearchFormControl.value,
        isMillionPlus: this.populationTypeSearchFormControl.value,
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
    this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1;
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

  ulbapplyFilterClicked() {
    this.ulbList = undefined;
    this.ulblistFetchOption = this.setLIstFetchOptions();
    const { skip } = this.ulblistFetchOption;
    this.financialDataService
      .fetchFinancialDataList({ skip, limit: 10 }, this.ulblistFetchOption)
      .subscribe(
        (result) => {
          this.handleResponseSuccess(result);
        },
        (response: HttpErrorResponse) => {
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

  setulbPage(pageNoClick: number) {
    this.ulbtableDefaultOptions.currentPage = pageNoClick;
    this.ulblistFetchOption.skip =
      (pageNoClick - 1) * this.ulbtableDefaultOptions.itemPerPage;
    const { skip } = this.ulblistFetchOption;
    this.fetchULBList({ ...this.ulbFilter.value });
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
          this.modalTableData = result["data"].map((data) =>
            this.formatResponse(data, true)
          );
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

  downloadULBList() {
    const filterOptions = { filter: { ...this.ulbFilter.value }, csv: true };
    const url = this._commonService.getULBListApi(filterOptions);
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
