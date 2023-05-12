import { Component, OnInit } from '@angular/core';
import { TableResponse } from '../common-table/common-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tableResponses: TableResponse[] = [
    {
      name: 'Overview of ULB activities',
      getEndpoint: '',
      postEndpoint: '',
      columns: ['first', 'second', 'third'],
      data: ['one', 'two', 'three', 'for', 'five']
    },
    {
      name: 'Overview of ULB activities',
      getEndpoint: '',
      postEndpoint: '',
      columns: ['first', 'second', 'third'],
      data: ['one', 'two', 'three', 'for', 'five']
    },
    {
      name: 'Overview of population-wise data',
      getEndpoint: '',
      postEndpoint: '',
      columns: ['first', 'second', 'third'],
      data: ['one', 'two', 'three', 'for', 'five']
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
