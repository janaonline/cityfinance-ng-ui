import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ulbUploadList} from '../../shared/components/home-header/tableHeaders';
import {FormControl, Validators} from '@angular/forms';

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

  financialYearFormControl: FormControl = new FormControl('', [Validators.required]);
  auditStatusFormControl: FormControl = new FormControl('', [Validators.required]);

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public location: Location) {
    this.activatedRoute.params.subscribe(val => {
      const {id} = val;
      if (id) {
        this.id = id;
      }
    });
  }

  ngOnInit() {
  }

}
