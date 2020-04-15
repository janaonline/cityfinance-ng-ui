import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FinancialDataService} from '../../services/financial-data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UPLOAD_STATUS} from '../../../util/enums';

@Component({
  selector: 'app-data-upload-action',
  templateUrl: './data-upload-action.component.html',
  styleUrls: ['./data-upload-action.component.scss']
})
export class DataUploadActionComponent implements OnInit {

  fileFormGroupKeys = ['balanceSheet', 'schedulesToBalanceSheet', 'incomeAndExpenditure', 'schedulesToIncomeAndExpenditure', 'trialBalance', 'auditReport'];
  financialYearDropdown = [
    {id: '2015-16', itemName: '2015-16'},
    {id: '2016-17', itemName: '2016-17'},
    {id: '2018-19', itemName: '2018-19'},
    {id: '2019-20', itemName: '2019-2020'},
  ];
  auditStatusDropdown = [{
    id: 'audited',
    itemName: 'Audited'
  }, {
    id: 'unaudited',
    itemName: 'Unaudited'
  }];
  audited = new FormControl({value: null, disabled: true});
  financialYear = new FormControl({value: null, disabled: true});

  completenessFormGroup: FormGroup;
  correctnessFormGroup: FormGroup;
  completenessStatus: any = UPLOAD_STATUS.PENDING;
  id: string;
  correctnessStatus: string = UPLOAD_STATUS.PENDING;
  tabIndex = 0;

  constructor(public financeDataService: FinancialDataService,
              public location: Location,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.createForms();

  }

  private fetchFinancialYears() {
    this.financeDataService.getFinancialYears().subscribe(result => {
      if (result['success']) {
        this.financialYearDropdown = result['data'];
        this.financialYearDropdown = this.financialYearDropdown.map(year => {
          return {
            id: year['name'],
            itemName: year['name']
          };
        });
      }
    });
  }

  createForms() {
    this.completenessFormGroup = this.fb.group({});
    this.correctnessFormGroup = this.fb.group({});
    this.fileFormGroupKeys.forEach(formGroupKey => {
      this.completenessFormGroup.addControl(formGroupKey, new FormGroup({
        completeness: new FormControl(),
        message: new FormControl('')
      }));
      this.correctnessFormGroup.addControl(formGroupKey, new FormGroup({
        correctness: new FormControl(),
        message: new FormControl('')
      }));
    });
  }

  ngOnInit() {
    this.fetchFinancialYears();
    // if (!this.financeDataService.selectedFinancialRequest) {
    this.activatedRoute.params.subscribe(value => {
      const {id} = value;
      this.id = id;
      this.financeDataService.fetFinancialData(id).subscribe((response: any) => {
        if (response['success']) {
          this.financeDataService.selectedFinancialRequest = response.data;
          this.completenessStatus = this.financeDataService.selectedFinancialRequest['completeness'];
          this.correctnessStatus = this.financeDataService.selectedFinancialRequest['correctness'];
          this.updateFormControls(this.financeDataService.selectedFinancialRequest);
        }
      });
    });
  }

  getFormControl(formGroup: FormGroup, formGroupName: string, formControlName: string) {
    return formGroup.get([formGroupName, formControlName]);
  }

  updateFormControls(data) {
    this.updateTabIndex(data);
    const {financialYear, audited} = data;
    this.setFinancialYear(financialYear);
    this.setAuditStatus(audited);
    this.setFileFormControls();
  }

  setAuditStatus(value: boolean) {

    if (value) {
      this.audited.setValue([this.auditStatusDropdown[0]]);
    } else {
      this.fileFormGroupKeys.splice(this.fileFormGroupKeys.length - 1, 1);
      this.audited.setValue([this.auditStatusDropdown[1]]);
    }
  }

  fileButtonClickHandler(...args) {
    if (args.length === 1) {
      args = args[0];
    }
    let urlObject = this.financeDataService.selectedFinancialRequest;
    args.map(key => urlObject = urlObject[key]);
    if (urlObject) {
      if (typeof urlObject === 'string') {
        window.open(urlObject);
      }
    }
  }

  radioButtonClickHandler() {
  }

  completenessClickedHandler() {
    let responseObject = {...this.completenessFormGroup.getRawValue()};
    if (!this.financeDataService.selectedFinancialRequest.audited) {
      const {auditReport, ...rest} = this.completenessFormGroup.getRawValue();
      responseObject = {...rest};
    }
    this.financeDataService
      .updateCompletenessStatus(this.id, responseObject)
      .subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/user/data-upload']);
        }
      }, error => {
        console.log(error);
      });
  };

  private updateTabIndex(data) {
    const {completeness} = data;
    if (completeness === UPLOAD_STATUS.APPROVED) {
      this.tabIndex = 1;
    }
  }

  correctnessSubmitHandler() {
    this.financeDataService
      .updateCorrectnessStatus(this.id, this.correctnessFormGroup.value)
      .subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/user/data-upload']);
        }
      }, error => {
        console.log(error);
      });
  }

  private setFinancialYear(financialYear: string) {
    const selectedFinancialYearObject = this.financialYearDropdown.filter((item) => item.id === financialYear);
    if (selectedFinancialYearObject) {
      this.financialYear.setValue(selectedFinancialYearObject);
    }
  }

  private setFileFormControls() {
    this.fileFormGroupKeys.forEach(formGroupKey => {
      const formGroupDataItem = this.financeDataService.selectedFinancialRequest[formGroupKey];
      if (formGroupDataItem) {
        const {excelUrl, pdfUrl} = formGroupDataItem;
        let formControls = [
          this.getFormControl(this.completenessFormGroup, formGroupKey, 'completeness'),
          this.getFormControl(this.correctnessFormGroup, formGroupKey, 'correctness'),
          this.getFormControl(this.completenessFormGroup, formGroupKey, 'message'),
          this.getFormControl(this.correctnessFormGroup, formGroupKey, 'message'),
        ];
        let keys = ['completeness', 'correctness', 'message', 'message'];
        for (let i = 0; i < formControls.length; i++) {
          const formControl = formControls[i];
          switch (keys[i]) {
            case 'completeness':
            case 'correctness':
              if (excelUrl || pdfUrl) {
                if (formGroupDataItem[keys[i]] != UPLOAD_STATUS.PENDING) {
                  formControl.setValue(formGroupDataItem[keys[i]]);
                }
                formControl.setValidators(Validators.required);
                formControl.updateValueAndValidity();
                if ((i == 0 && formGroupDataItem[keys[i]] === UPLOAD_STATUS.PENDING) || (i == 1) && formGroupDataItem[keys[i]] === UPLOAD_STATUS.PENDING) {
                  continue;
                }
              }
              formControl.disable();
              formControl.updateValueAndValidity();
              break;
            case 'message':
              formControl.setValue(formGroupDataItem[keys[i]]);
              if (formControls[i - 2].disabled) {
                formControl.disable();
                formControl.updateValueAndValidity();
              }
              break;
          }
        }
      }
    });
  }
}
