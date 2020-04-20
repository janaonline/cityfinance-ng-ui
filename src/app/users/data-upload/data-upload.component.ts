import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ulbUploadList} from '../../shared/components/home-header/tableHeaders';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataEntryService} from '../../dashboard/data-entry/data-entry.service';
import {FinancialDataService} from '../services/financial-data.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AccessChecker} from '../../util/access/accessChecker';
import {MODULES_NAME} from '../../util/access/modules';
import {ACTIONS} from '../../util/access/actions';
import {UserUtility} from '../../util/user/user';
import {MatSnackBar} from '@angular/material';
import swal from 'sweetalert';
import {USER_TYPE} from '../../models/user/userType';
import {BsModalService} from 'ngx-bootstrap/modal';
import {UPLOAD_STATUS} from '../../util/enums';
import FileUpload from '../../util/fileUpload';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit, OnDestroy {

  uploadStatus = UPLOAD_STATUS;
  id = null;
  uploadId = null;
  uploadObject = null;
  tableHeaders = ulbUploadList;
  financialYearDropdown = [];
  auditStatusDropdown = [{
    id: true,
    itemName: 'Audited'
  }, {
    id: false,
    itemName: 'Unaudited'
  }];
  fileFormGroupKeys = ['balanceSheet', 'schedulesToBalanceSheet', 'incomeAndExpenditure', 'schedulesToIncomeAndExpenditure', 'trialBalance', 'auditReport'];
  fileFormGroup: FormGroup;
  dataUploadList = [];
  isAccessible: boolean;
  financialYearDropdownSettings: any = {
    singleSelection: true,
    text: 'Select Year'
  };
  auditStatusDropdownSettings: any = {
    singleSelection: true,
    text: 'Audit Status'
  };
  uploadCheckStatusDropDownSettings: any = {
    singleSelection: true,
    text: 'Status'
  };
  uploadCheckStatusDropDown: any = [
    {
      id: UPLOAD_STATUS.PENDING,
      itemName: 'Pending'
    },
    {
      id: UPLOAD_STATUS.APPROVED,
      itemName: 'Approved'
    },
    {
      id: UPLOAD_STATUS.REJECTED,
      itemName: 'Rejected'
    }
  ];

  completenessStatus = UPLOAD_STATUS.PENDING;
  correctnessStatus = UPLOAD_STATUS.PENDING;
  @ViewChild('searchFinancialYear') searchFinancialYear: ElementRef;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null
  };
  currentSort = 1;

  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0
  };
  modalTableData: any[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public location: Location,
              public dataUploadService: DataEntryService,
              private financialDataService: FinancialDataService,
              private modalService: BsModalService,
              public accessUtil: AccessChecker,
              public userUtil: UserUtility,
              public fileUpload: FileUpload,
              private _snackBar: MatSnackBar) {
    this.isAccessible = accessUtil.hasAccess({moduleName: MODULES_NAME.ULB_DATA_UPLOAD, action: ACTIONS.UPLOAD});
    this.activatedRoute.params.subscribe(val => {
      const {id, uploadId} = val;
      if (id) {
        this.id = id;
      }
      if (uploadId) {
        this.uploadId = uploadId;
      }
    });
    this.createForms();
    this.setTableHeaderByUserType();
  }

  ngOnInit() {
    this.fetchFinancialYears();
    if (!this.id) {
      this.getFinancialDataList({skip: this.listFetchOption.skip, limit: 10}, this.listFetchOption);
    }
    if (this.uploadId) {
      this.getFinancialData();
    }
  }

  getFinancialData() {
    this.financialDataService.fetFinancialData(this.uploadId)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  getFinancialDataList(params = {}, body = {}) {
    const {skip} = this.listFetchOption;
    const newParams = {
      skip,
      limit: 10,
      ...params
    };
    this.financialDataService
      .fetchFinancialDataList(newParams, body)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    if (this.uploadId) {
      this.uploadObject = response.data;
      this.updateFormControls();
    } else {
      this.dataUploadList = response.data;
      if (!this.listFetchOption.sort) {
        this.dataUploadList = this.dataUploadList.sort((a, b) => {
          let c1 = a['status'][a['status'].length - 1];
          let c2 = b['status'][b['status'].length - 1];
          if (c1 > c2) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      if (response['total']) {
        this.tableDefaultOptions.totalCount = response['total'];
      }
    }
  };
  handleResponseFailure = (error) => {
    this.handlerError(error);
  };
  uploadStatusFormControl: FormControl = new FormControl('');
  ulbNameSearchFormControl: FormControl = new FormControl();
  ulbCodeSearchFormControl: FormControl = new FormControl();

  getAddedFilterCount() {
    let count = 0;
    for (let parentFormGroup of this.fileFormGroupKeys) {
      const formGroup = this.fileFormGroup.get(parentFormGroup);
      const files = formGroup.value;
      for (let fileKey in files) {
        let fileUrlKey = fileKey.includes('pdf') ? 'pdfUrl' : 'excelUrl';
        if (files[fileKey]) {
          count++;
        }
      }
    }
    return count;
  }

  async submitClickHandler(event) {
    event.disabled = true;
    let urlObject = {};
    this.fileUpload.totalFiles = this.getAddedFilterCount();
    this.fileUpload.uploading = true;
    for (let parentFormGroup of this.fileFormGroupKeys) {
      if (this.fileFormGroup.get(parentFormGroup) instanceof FormGroup || parentFormGroup === 'auditReport') {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        urlObject[parentFormGroup] = {};
        const files = formGroup.value;
        for (let fileKey in files) {
          let fileUrlKey = fileKey.includes('pdf') ? 'pdfUrl' : 'excelUrl';
          urlObject[parentFormGroup][fileUrlKey] = '';
          const formControl = formGroup.get(fileKey);
          if (files[fileKey]) {
            try {
              let {name, type} = files[fileKey];
              let urlResponse: any = await this.dataUploadService.getURLForFileUpload(name, type).toPromise();
              if (urlResponse.success) {
                let {url, file_alias} = urlResponse.data[0];
                urlObject[parentFormGroup][fileUrlKey] = file_alias;
                url = url.replace('admin/', '');
                let fileUploadResponse = await this.dataUploadService.uploadFileToS3(files[fileKey], url).toPromise();
                this.fileUpload.currentUploadedFiles++;
              }
            } catch (e) {
              event.disabled = false;
              this.fileUpload.reset();
              formControl.setErrors(['File Upload Error']);
            }
          } else if (formControl.validator) {
            event.disabled = false;
            this.fileUpload.reset();
            formControl.setErrors(['Please select file']);
          }
        }
      }
    }

    let responseObject = {
      ...urlObject,
      financialYear: this.fileFormGroup.controls['financialYear'].value[0].id,
      audited: this.fileFormGroup.controls['auditStatus'].value[0].id
    };
    this.financialDataService.uploadFinancialData(responseObject).subscribe((response: any) => {
        if (response.success) {
          swal({
            title: 'Successfully Uploaded',
            text: `Reference No: ${response['data']['referenceCode']}`,
            icon: 'success',
            // @ts-ignore
            button: 'Okay'
          }).then((result) => {
            if (result) {
              this.router.navigate(['/user/data-upload/list']);
            }
          });
        }
      }, (error: HttpErrorResponse) => {
        event.disabled = false;
        this.fileUpload.reset();
        this.handlerError(error);
      }
    );
    event.disabled = false;
    this.fileUpload.reset();

  }

  handleFileChange(strings: string[], file: File) {

    this.fileFormGroup.get(strings).setValue(file);
  }

  removeAuditReportFromFIleKeys() {
    this.fileFormGroupKeys = this.fileFormGroupKeys.filter(key => !['auditReport'].includes(key));

  }

  navigateTo(row: any) {
    //  this.financialDataService.selectedFinancialRequest = row;
  }

  private updateFormControls() {
    const {financialYear, audited, completeness: completenessOverAll, correctness: correctnessOverAll, status} = this.uploadObject;
    this.completenessStatus = completenessOverAll;
    this.correctnessStatus = correctnessOverAll;
    const selectedFinancialYearObject = this.financialYearDropdown.filter((item) => item.id === financialYear);
    if (selectedFinancialYearObject) {
      this.fileFormGroup.get('financialYear').setValue(selectedFinancialYearObject);
      this.fileFormGroup.get('financialYear').disable();
      this.financialYearDropdownSettings = {...this.financialYearDropdownSettings, disabled: true};
    }
    if (audited) {
      this.fileFormGroup.get(['auditStatus']).setValue([this.auditStatusDropdown[0]]);
    } else {
      this.removeAuditReportFromFIleKeys();
      this.fileFormGroup.get(['auditStatus']).setValue([this.auditStatusDropdown[1]]);
    }
    this.auditStatusDropdownSettings = {...this.auditStatusDropdownSettings, disabled: true};
    this.fileFormGroupKeys.forEach(formGroupKey => {
      let formGroupDataObject = this.uploadObject[formGroupKey];
      let formGroupItem = this.fileFormGroup.get([formGroupKey]);
      const {completeness, correctness} = formGroupDataObject;
      if (status === UPLOAD_STATUS.REJECTED) {
        if (completeness === UPLOAD_STATUS.REJECTED || completeness === UPLOAD_STATUS.NA || correctness === UPLOAD_STATUS.REJECTED || correctness === UPLOAD_STATUS.NA) {
          formGroupItem.enable();
        } else {
          formGroupItem.disable();
          formGroupItem.setErrors(null);
          formGroupItem.updateValueAndValidity();
        }
      } else {
        formGroupItem.disable();
        formGroupItem.setErrors(null);
        formGroupItem.updateValueAndValidity();
      }
    });
  }

  async updateClickHandler(updateButton: HTMLButtonElement) {
    updateButton.disabled = true;
    this.fileUpload.totalFiles = this.getAddedFilterCount();
    this.fileUpload.uploading = true;
    let urlObject = {};
    for (let parentFormGroup of this.fileFormGroupKeys) {
      if (this.fileFormGroup.get(parentFormGroup) instanceof FormGroup || parentFormGroup === 'auditReport') {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        if (!formGroup.disabled) {
          urlObject[parentFormGroup] = {};
          const files = formGroup.value;
          for (let fileKey in files) {
            let fileUrlKey = fileKey.includes('pdf') ? 'pdfUrl' : 'excelUrl';
            urlObject[parentFormGroup][fileUrlKey] = '';
            const formControl = formGroup.get(fileKey);
            if (files[fileKey]) {
              try {
                let {name, type} = files[fileKey];
                let urlResponse: any = await this.dataUploadService.getURLForFileUpload(name, type).toPromise();
                if (urlResponse.success) {
                  let {url, file_alias} = urlResponse.data[0];
                  urlObject[parentFormGroup][fileUrlKey] = file_alias;
                  url = url.replace('admin/', '');
                  let fileUploadResponse = await this.dataUploadService.uploadFileToS3(files[fileKey], url).toPromise();
                  this.fileUpload.currentUploadedFiles++;
                }
              } catch (e) {
                updateButton.disabled = false;
                this.fileUpload.reset();
                formControl.setErrors(['File Upload Error']);
              }
            } else if (formControl.validator) {
              updateButton.disabled = false;
              this.fileUpload.reset();
              formControl.setErrors(['Please select file']);
            }
          }
        }
      }
    }
    this.financialDataService.upDateFinancialData(this.uploadId, urlObject).subscribe((result) => {
      if (result['success']) {
        this.router.navigate(['/user/data-upload/list']);
      }
    }, error => {
      updateButton.disabled = false;
      this.fileUpload.reset();
      this.handlerError(error);
    });
    this.fileUpload.reset();
    updateButton.disabled = false;
  }

  private listenToSearchEvents() {
    // let fields = [this.searchFinancialYear.nativeElement];
    // fields.forEach(inputField => {
    //   let eventSubject = fromEvent(inputField, 'input').pipe(
    //     map((e: KeyboardEvent) => {
    //       console.log(e);
    //     })s
    //   );
    // });

  }

  private fetchFinancialYears() {
    this.financialDataService.getFinancialYears().subscribe(result => {
      if (result['success']) {
        this.financialYearDropdown = result['data'];
        this.financialYearDropdown = this.financialYearDropdown.map(year => {
          return {
            id: year.name,
            itemName: year.name
          };
        });
      }
    });
  }

  setLIstFetchOptions(config = {}) {
    let filterKeys = ['financialYear', 'auditStatus'];
    let filterObject = {
      filter: {
        [filterKeys[0]]: this.fileFormGroup.get(filterKeys[0]).value,
        'ulbName': this.ulbNameSearchFormControl.value,
        'ulbCode': this.ulbCodeSearchFormControl.value,
        'audited': this.fileFormGroup.get(filterKeys[1]).value.length ? this
          .fileFormGroup.get(filterKeys[1]).value == 'true' : '',
        'status': this.uploadStatusFormControl.value
      }
    };
    return {
      ...this.listFetchOption,
      ...filterObject,
      ...config
    };
  }

  applyFilterClicked() {
    this.listFetchOption = this.setLIstFetchOptions();
    const {skip} = this.listFetchOption;
    this.financialDataService.fetchFinancialDataList({skip, limit: 10}, this.listFetchOption).subscribe(result => {
      this.handleResponseSuccess(result);
    }, (response: HttpErrorResponse) => {
      this._snackBar.open(response.error.errors.message || response.error.message || 'Some Error Occurred', null, {duration: 1600});
    });
  }

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip = (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    const {skip} = this.listFetchOption;
    this.getFinancialDataList({skip, limit: 10}, this.listFetchOption);


  }

  sortById(id: string) {
    this.currentSort = this.currentSort > 0 ? -1 : 1;
    this.listFetchOption = {
      ...this.listFetchOption,
      sort: {[id]: this.currentSort},
    };
    this.getFinancialDataList({}, this.listFetchOption);
  }

  private createForms() {
    this.fileFormGroup = new FormGroup({
      financialYear: new FormControl('', [Validators.required]),
      balanceSheet: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required]),
      }),
      schedulesToBalanceSheet: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl(),
      }),
      incomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required])
      }),
      schedulesToIncomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl()
      }),
      trialBalance: new FormGroup({
        file_pdf: new FormControl(null, [Validators.required]),
        file_excel: new FormControl(null, [Validators.required])
      }),
      auditReport: new FormGroup({
        file_pdf: new FormControl()
      }),
      auditStatus: new FormControl('', [Validators.required])
    });

  }

  private setTableHeaderByUserType() {
    if (this.userUtil.getUserType() === USER_TYPE.ULB) {
      this.tableHeaders = this.tableHeaders.filter((header) => !['ulbName', 'ulbCode'].includes(header.id));
    }
  }

  openModal(row: any, historyModal: TemplateRef<any>) {
    this.modalTableData = [];
    this.financialDataService.fetchFinancialDataHistory(row._id).subscribe((result: HttpResponse<any>) => {
      if (result['success']) {
        this.modalTableData = result['data'];
        this.modalTableData = this.modalTableData.filter(row => typeof row['actionTakenBy'] != 'string').reverse();
        this.modalService.show(historyModal, {});
      }
    }, error => this.handlerError(error));

  }

  private handlerError(response: any) {
    let string = 'Some Error Occurred';
    const {message, error} = response;
    if (error) {
      let errorMessage = error.message;
      if (errorMessage) {
        string = errorMessage;
      } else {
        string = message;
      }
    }
    this._snackBar.open(string, null, {duration: 1600});
  }


  downloadList() {
    let filterOptions = this.setLIstFetchOptions({download: true});
    let url = this.financialDataService.getFinancialDataListApi(filterOptions);
    return window.open(url);

  }

  auditStatusDropdownHandler() {
    this.fileFormGroupKeys = ['balanceSheet', 'schedulesToBalanceSheet', 'incomeAndExpenditure', 'schedulesToIncomeAndExpenditure', 'trialBalance', 'auditReport'];
    if (this.fileFormGroup.get('auditStatus').value) {
      if (this.fileFormGroup.get('auditStatus').value.length) {
        if (this.fileFormGroup.get('auditStatus').value[0].id) {
          return this.fileFormGroup.get(['auditReport', 'file_pdf']).setValidators([Validators.required]);
        }
      }
    }
    this.removeAuditReportFromFIleKeys();
    this.fileFormGroup.get(['auditReport', 'file_pdf']).setValidators(null);
    this.fileFormGroup.get(['auditReport', 'file_pdf']).updateValueAndValidity();
  }

  ngOnDestroy(): void {

  }
}
