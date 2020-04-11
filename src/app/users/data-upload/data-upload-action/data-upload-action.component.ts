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

  createForms() {
    this.completenessFormGroup = this.fb.group({});
    this.correctnessFormGroup = this.fb.group({});
    this.fileFormGroupKeys.forEach(formGroupKey => {
      this.completenessFormGroup.addControl(formGroupKey, new FormGroup({
        completeness: new FormControl(),
        message: new FormControl()
      }));
      this.correctnessFormGroup.addControl(formGroupKey, new FormGroup({
        correctness: new FormControl(),
        message: new FormControl()
      }));
    });
    console.log(this.correctnessFormGroup.value, this.completenessFormGroup.value);
  }

  ngOnInit() {
    if (!this.financeDataService.selectedFinancialRequest) {
      this.activatedRoute.params.subscribe(value => {
        const {id} = value;
        this.id = id;
        this.financeDataService.fetchFinancialData({_id: id}).subscribe((response: any) => {
          if (response['success']) {
            this.financeDataService.selectedFinancialRequest = response.data;
            this.completenessStatus = this.financeDataService.selectedFinancialRequest['completeness'];
            this.correctnessStatus = this.financeDataService.selectedFinancialRequest['correctness'];
            this.updateFormControls(this.financeDataService.selectedFinancialRequest);
          }
        });
      });
    } else {
      this.id = this.financeDataService.selectedFinancialRequest._id;
      this.completenessStatus = this.financeDataService.selectedFinancialRequest['completeness'];
      this.correctnessStatus = this.financeDataService.selectedFinancialRequest['correctness'];
      this.updateFormControls(this.financeDataService.selectedFinancialRequest);

    }
  }

  getCompletenessFormControl(formGroupKey) {
    return this.completenessFormGroup.get([formGroupKey, 'completeness']);
  }

  getCorrectnessFormControl(formGroupKey) {
    return this.correctnessFormGroup.get([formGroupKey, 'correctness']);
  }

  updateFormControls(data) {
    this.updateTabIndex(data);
    const {financialYear, audited} = data;
    const selectedFinancialYearObject = this.financialYearDropdown.filter((item) => item.id === financialYear);
    if (selectedFinancialYearObject) {
      this.financialYear.setValue(selectedFinancialYearObject);
    }
    this.setAuditStatus(audited);
    this.fileFormGroupKeys.forEach(formGroupKey => {
      const formGroupDataItem = this.financeDataService.selectedFinancialRequest[formGroupKey];
      if (formGroupDataItem) {
        const {excelUrl, pdfUrl} = formGroupDataItem;
        let formControls = [this.getCompletenessFormControl(formGroupKey), this.getCorrectnessFormControl(formGroupKey)];
        let keys = ['completeness', 'correctness'];
        for (let i = 0; i < formControls.length; i++) {
          const formControl = formControls[i];
          if (excelUrl || pdfUrl) {
            formControl.setValue(formGroupDataItem[keys[i]]);
            formControl.setValidators(Validators.required);
            formControl.updateValueAndValidity();
            if ((i == 0 && formGroupDataItem[keys[i]] === UPLOAD_STATUS.PENDING) || (i == 1) && formGroupDataItem[keys[i]] === UPLOAD_STATUS.PENDING) {
              continue;
            }
          }
          formControl.disable();
          formControl.updateValueAndValidity();
        }
      }
    });
    this.updateTabIndex(data);
  }

  setAuditStatus(value: boolean) {
    if (value) {
      this.fileFormGroupKeys.splice(this.fileFormGroupKeys.length - 1, 1);
      this.audited.setValue([this.auditStatusDropdown[0]]);
    } else {
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
    this.financeDataService
      .updateCompletenessStatus(this.id, this.completenessFormGroup.value)
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
}
