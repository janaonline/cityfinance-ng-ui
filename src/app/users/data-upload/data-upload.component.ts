import {Component, OnInit} from '@angular/core';
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
  financialYearDropdown = [
    {id: '2015-16', itemName: '2015-16'},
    {id: '2016-17', itemName: '2016-17'},
    {id: '2017-18', itemName: '2017-18'}
  ];
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
  financialYearDropdownSettings: any = {singleSelection: true, text: 'Select Year'};
  auditStatusDropdownSettings: any = {singleSelection: true, text: 'Select Year'};
  completenessStatus = 'PENDING';


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

  async submitClickHandler() {
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
              formControl.setErrors(['File Upload Error']);
            }
          } else if (formControl.validator) {
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
        const {message} = error;
        this._snackBar.open(message, null, {duration: 1600});
        console.log(error);
      }
    );
  }

  handleFileChange(strings: string[], file: File) {

    this.fileFormGroup.get(strings).setValue(file);
  }

  navigateTo(row: any) {
    this.financialDataService.selectedFinancialRequest = row;
  }

  private updateFormControls() {
    const {financialYear, audited, completeness} = this.uploadObject;
    this.completenessStatus = completeness;
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
      const {completeness} = formGroupDataObject;
      if (completeness === 'APPROVED') {
        formGroupItem.disable();
        formGroupItem.setErrors(null);
        formGroupItem.updateValueAndValidity();
      }
    });

  }

  async updateClickHandler() {
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
                formControl.setErrors(['File Upload Error']);
              }
            } else if (formControl.validator) {
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
  }
}
