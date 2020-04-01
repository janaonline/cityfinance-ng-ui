import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ulbUploadList} from '../../shared/components/home-header/tableHeaders';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataEntryService} from '../../dashboard/data-entry/data-entry.service';
import {FinancialDataService} from '../services/financial-data.service';

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
    id: 'audited',
    itemName: 'Audited'
  }, {
    id: 'unaudited',
    itemName: 'Unaudited'
  }];
  auditReportFormControl = new FormControl();

  fileFormGroup: FormGroup;


  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public location: Location,
              public dataUploadService: DataEntryService,
              private financialDataService: FinancialDataService) {
    this.activatedRoute.params.subscribe(val => {
      const {id} = val;
      if (id) {
        this.id = id;
      }
    });
    this.fileFormGroup = new FormGroup({
      financialYear: new FormControl('', [Validators.required]),
      balanceSheet: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl(),
      }),
      schBalanceSheet: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl(),
      }),
      incomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl()
      }),
      scheduleIncomeAndExpenditure: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl()
      }),
      trialBalance: new FormGroup({
        file_pdf: new FormControl(),
        file_excel: new FormControl()
      }),
      auditReportFormControl: new FormGroup({
        file_pdf: new FormControl()
      }),
      auditStatus: new FormControl()
    });

  }

  ngOnInit() {
    this.getFinancialData();

  }

  getFinancialData() {
    this.financialDataService
      .fetchFinancialData()
      .subscribe(this.handleResponseSuccess, this.handleResponseFailure);
  }

  handleResponseSuccess(response) {
    console.log(response);
  }

  handleResponseFailure(error) {
    console.log(error);
  }

  async submitClickHandler() {
    for (let parentFormGroup in this.fileFormGroup.controls) {
      if (this.fileFormGroup.get(parentFormGroup) instanceof FormGroup || parentFormGroup === 'auditReportFormControl') {
        const formGroup = this.fileFormGroup.get(parentFormGroup);
        console.log(formGroup);
        const files = formGroup.value;
        for (let fileKey in files) {
          const formControl = formGroup.get(fileKey);
          if (files[fileKey]) {
            try {
              let {name, type} = files[fileKey];
              let urlResponse: any = await this.dataUploadService.getURLForFileUpload(name, type).toPromise();
              if (urlResponse.success) {
                const {url} = urlResponse.data[0];
                let fileUploadResponse = await this.dataUploadService.uploadFileToS3(files[fileKey], url).toPromise();
              }
            } catch (e) {
              formControl.setErrors(['File Upload Error']);
              console.log('some Error Occurred');
            }
          } else {
            formControl.setErrors(['Please select file']);
          }
        }
      }
    }
  }

  handleFileChange(strings: string[], file: File) {
    this.fileFormGroup.get(strings).setValue(file);
  }
}
