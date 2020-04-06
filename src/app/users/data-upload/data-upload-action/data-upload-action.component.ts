import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FinancialDataService} from '../../services/financial-data.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-data-upload-action',
  templateUrl: './data-upload-action.component.html',
  styleUrls: ['./data-upload-action.component.scss']
})
export class DataUploadActionComponent implements OnInit {

  fileFormGroupKeys = ['balanceSheet', 'schedulesToBalanceSheet', 'incomeAndExpenditure', 'schedulesToIncomeAndExpenditure', 'trialBalance'];
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

  completenessFormControl: FormGroup;
  isCompeted: any = false;
  id: string;

  constructor(public financeDataService: FinancialDataService,
              public location: Location,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.completenessFormControl = this.fb.group({
      audited: new FormControl({value: null, disabled: true}),
      financialYear: new FormControl({value: null, disabled: true}),
      balanceSheet: new FormGroup({
        completeness: new FormControl(''),
      }),
      schedulesToBalanceSheet: new FormGroup({
        completeness: new FormControl(),
      }),
      incomeAndExpenditure: new FormGroup({
        completeness: new FormControl(),
      }),
      schedulesToIncomeAndExpenditure: new FormGroup({
        completeness: new FormControl(),
      }),
      trialBalance: new FormGroup({
        completeness: new FormControl(),
      })
    });

  }

  ngOnInit() {
    if (!this.financeDataService.selectedFinancialRequest) {
      this.activatedRoute.params.subscribe(value => {
        const {id} = value;
        this.id = id;
        this.financeDataService.fetchFinancialData({_id: id}).subscribe((response: any) => {
          if (response['success']) {
            this.financeDataService.selectedFinancialRequest = response.data;
            this.updateFormControls(this.financeDataService.selectedFinancialRequest);
          }
        });
      });
    } else {
      this.id = this.financeDataService.selectedFinancialRequest._id;
      this.updateFormControls(this.financeDataService.selectedFinancialRequest);

    }
  }

  updateFormControls(data) {
    const {financialYear, audited} = data
    const selectedFinancialYearObject = this.financialYearDropdown.filter((item) => item.id === financialYear);
    if (selectedFinancialYearObject) {
      this.completenessFormControl.controls['financialYear'].setValue(selectedFinancialYearObject);
    }
    if (audited) {
      this.completenessFormControl.controls['audited'].setValue([this.auditStatusDropdown[0]]);
    } else {
      this.completenessFormControl.controls['audited'].setValue([this.auditStatusDropdown[1]]);
    }
    this.fileFormGroupKeys.forEach(formGroupKey => {
      const formGroupItem = this.financeDataService.selectedFinancialRequest[formGroupKey];
      if (formGroupItem) {
        const {excelUrl, pdfUrl} = formGroupItem;
        if (excelUrl || pdfUrl) {
          let formControl = this.completenessFormControl.get([formGroupKey, 'completeness']);
          formControl.setValidators(Validators.required);
          formControl.updateValueAndValidity();
        }
      }
    });
  }

  fileButtonClickHandler(...args) {
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
      .updateCompletenessStatus(this.id, this.completenessFormControl.value)
      .subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
  };
}
