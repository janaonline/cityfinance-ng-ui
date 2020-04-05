import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FinancialDataService} from '../../services/financial-data.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-data-upload-action',
    templateUrl: './data-upload-action.component.html',
    styleUrls: ['./data-upload-action.component.scss']
})
export class DataUploadActionComponent implements OnInit {

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

    financialUploadForm: FormGroup;

    constructor(public financeDataService: FinancialDataService,
                public location: Location,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute, private router: Router) {
        this.financialUploadForm = this.fb.group({
            audited: new FormControl({value: null, disabled: true}),
            financialYear: new FormControl(null)
        });

    }

    ngOnInit() {
        if (!this.financeDataService.selectedFinancialRequest) {
            this.location.back();
        } else {
            const {financialYear, audited} = this.financeDataService.selectedFinancialRequest;
            const selectedFinancialYearObject = this.financialYearDropdown.filter((item) => item.id === financialYear);
            if (selectedFinancialYearObject) {
                this.financialUploadForm.controls['financialYear'].setValue(selectedFinancialYearObject);
            }
            if (audited) {
                this.financialUploadForm.controls['audited'].setValue([this.auditStatusDropdown[0]]);
            } else {
                this.financialUploadForm.controls['audited'].setValue([this.auditStatusDropdown[1]]);
            }
            console.log(selectedFinancialYearObject);
        }
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
}
