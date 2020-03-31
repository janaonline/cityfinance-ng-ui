import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

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

  constructor(public location: Location) {
  }

  ngOnInit() {
  }

}
