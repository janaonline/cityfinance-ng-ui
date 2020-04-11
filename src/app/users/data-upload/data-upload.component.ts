import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ulbUploadList} from '../../shared/components/home-header/tableHeaders';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataEntryService} from '../../dashboard/data-entry/data-entry.service';
import {FinancialDataService} from '../services/financial-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AccessChecker} from '../../util/access/accessChecker';
import {MODULES_NAME} from '../../util/access/modules';
import {ACTIONS} from '../../util/access/actions';
import {UserUtility} from '../../util/user/user';
import {MatSnackBar} from '@angular/material';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {DropdownSettings} from 'angular2-multiselect-dropdown/lib/multiselect.interface';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit {

  id = null;
  uploadId = null;
  uploadObject = null;
  tableHeaders = ulbUploadList;
  financialYearDropdown = [];
  auditStatusDropdown = [{
    id: 'true',
    itemName: 'Audited'
  }, {
    id: 'false',
    itemName: 'Unaudited'
  }];
  fileFormGroupKeys = ['balanceSheet', 'schedulesToBalanceSheet', 'incomeAndExpenditure', 'schedulesToIncomeAndExpenditure', 'trialBalance'];
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
  completenessStatus = 'PENDING';
  correctnessStatus = 'PENDING';
  @ViewChild('searchFinancialYear') searchFinancialYear: ElementRef;

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public location: Location,
              public dataUploadService: DataEntryService,
              private financialDataService: FinancialDataService,
              public accessUtil: AccessChecker,
              public userUtil: UserUtility,
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

  ngOnInit() {
    this.fetchFinancialYears();
    if (!this.id) {
      this.getFinancialData();
    }
    if (this.uploadId) {
      this.getFinancialData({_id: this.uploadId});
    }
  }

  getFinancialData(params = {}) {
    this.financialDataService
      .fetchFinancialData(params)
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    if (this.uploadId) {
      this.uploadObject = response.data;
      this.updateFormControls();
    } else {
      this.dataUploadList = response.data;

    }
  };

  handleResponseFailure = (error) => {
  };

  async submitClickHandler(event) {
    event.disabled = true;
    let urlObject = {};
    for (let parentFormGroup in this.fileFormGroup.controls) {
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
              }
            } catch (e) {
              event.disabled = false;
              formControl.setErrors(['File Upload Error']);
            }
          } else if (formControl.validator) {
            event.disabled = false;
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
          this.router.navigate(['/users/data-upload']);
        }
      }, (error: HttpErrorResponse) => {
        event.disabled = false;
        const {message} = error;
        this._snackBar.open(message, null, {duration: 1600});
      }
    );
    event.disabled = false;
  }

  handleFileChange(strings: string[], file: File) {

    this.fileFormGroup.get(strings).setValue(file);
  }

  navigateTo(row: any) {
    this.financialDataService.selectedFinancialRequest = row;
  }

  private updateFormControls() {
    const {financialYear, audited, completeness: completenessOverAll, correctness: correctnessOverAll} = this.uploadObject;
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
      this.fileFormGroup.get(['auditStatus']).setValue([this.auditStatusDropdown[1]]);
    }
    this.auditStatusDropdownSettings = {...this.auditStatusDropdownSettings, disabled: true};
    this.fileFormGroupKeys.forEach(formGroupKey => {
      let formGroupDataObject = this.uploadObject[formGroupKey];
      let formGroupItem = this.fileFormGroup.get([formGroupKey]);
      const {completeness, correctness} = formGroupDataObject;
      if (correctnessOverAll === 'REJECTED' || completenessOverAll === 'REJECTED') {
        if (completeness === 'REJECTED' || correctness === 'REJECTED') {
          console.log('here', formGroupItem, formGroupKey);
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
      console.log(this.fileFormGroup);
    });

  }

  async updateClickHandler(updateButton: HTMLButtonElement) {
    updateButton.disabled = true;
    let urlObject = {};
    for (let parentFormGroup in this.fileFormGroup.controls) {
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
                }
              } catch (e) {
                updateButton.disabled = false;
                formControl.setErrors(['File Upload Error']);
              }
            } else if (formControl.validator) {
              updateButton.disabled = false;
              formControl.setErrors(['Please select file']);
            }
          }
        }
      }
    }
    this.financialDataService.upDateFinancialData(this.uploadId, urlObject).subscribe((result) => {
      console.log(result);
      if (result['success']) {
        this.router.navigate(['/user/data-upload']);
      }
    }, error => {
      console.log(error);
    });
    updateButton.disabled = false;
  }

  private listenToSearchEvents() {
    // let fields = [this.searchFinancialYear.nativeElement];
    // fields.forEach(inputField => {
    //   let eventSubject = fromEvent(inputField, 'input').pipe(
    //     map((e: KeyboardEvent) => {
    //       console.log(e);
    //     })
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

  applyFilterClicked() {
    let filterKeys = ['financialYear', 'auditStatus'];
    let filterObject = {
      filter: {
        [filterKeys[0]]: this.fileFormGroup.get(filterKeys[0]).value.length ? this
          .fileFormGroup.get(filterKeys[0]).value[0].id : '',
        'audited': this.fileFormGroup.get(filterKeys[1]).value.length ? this
          .fileFormGroup.get(filterKeys[1]).value[0].id == 'true' : '',
      }
    };
    this.financialDataService.fetchFinancialData({}, filterObject).subscribe(result => {
      this.handleResponseSuccess(result);
    }, (response: HttpErrorResponse) => {
      this._snackBar.open(response.error.errors.message || response.error.message || 'Some Error Occurred', null, {duration: 1600});
    });
  }
}
