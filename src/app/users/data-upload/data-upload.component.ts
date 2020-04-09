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

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit {

  id = null;
  tableHeaders = ulbUploadList;
  financialYearDropdown = [
    {id: '2015-16', itemName: '2015-16'},
    {id: '2016-17', itemName: '2016-17'}
    // {id: '2017-18', itemName: '2017-18'}
  ];
  auditStatusDropdown = [{
    id: 'true',
    itemName: 'Audited'
  }, {
    id: 'false',
    itemName: 'Unaudited'
  }];
  auditReportFormControl = new FormControl();

  fileFormGroup: FormGroup;

  dataUploadList = [];
  isAccessible: boolean;


  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public location: Location,
              public dataUploadService: DataEntryService,
              private financialDataService: FinancialDataService,
              public accessUtil: AccessChecker) {

    this.isAccessible = accessUtil.hasAccess({moduleName: MODULES_NAME.ULB_DATA_UPLOAD, action: ACTIONS.UPLOAD});

    this.activatedRoute.params.subscribe(val => {
      const {id} = val;
      if (id) {
        this.id = id;
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
      auditReportFormControl: new FormGroup({
        file_pdf: new FormControl()
      }),
      auditStatus: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {
    if (!this.id) {
      this.getFinancialData();
    }

  }

  getFinancialData() {
    this.financialDataService
      .fetchFinancialData()
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  handleResponseSuccess = (response) => {
    this.dataUploadList = response.data;
  };

  handleResponseFailure = (error) => {
    console.log(error);
  };


  async submitClickHandler() {

    let urlObject = {};

    for (let parentFormGroup in this.fileFormGroup.controls) {
      if (this.fileFormGroup.get(parentFormGroup) instanceof FormGroup || parentFormGroup === 'auditReportFormControl') {
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
          } else {
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
}
