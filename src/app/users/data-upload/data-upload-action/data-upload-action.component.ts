import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FinancialDataService} from '../../services/financial-data.service';

@Component({
  selector: 'app-data-upload-action',
  templateUrl: './data-upload-action.component.html',
  styleUrls: ['./data-upload-action.component.scss']
})
export class DataUploadActionComponent implements OnInit {

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

  constructor(public financeDataService: FinancialDataService, public location: Location, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if (!this.financeDataService.selectedFinancialRequest) {
      this.location.back();
    }
    console.log(this.financeDataService.selectedFinancialRequest);
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
