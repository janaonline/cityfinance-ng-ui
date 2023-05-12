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
      columns: [
        {
          key: 'hello',
          label: "Hello",
          sort: 1,
          query: ''
        },
        {
          key: 'world',
          label: "world",
          sort: 1
        },
        {
          key: 'third',
          label: "third",
          sort: 1,
          query: ''
        }
      ],
      data: [
        {
          'hello': 'hello',
          'world': 'word'
        },
        {
          'hello': 'hello',
          'world': 'word'
        },
        {
          'hello': 'hello',
          'world': 'word'
        },
        {
          'hello': 'hello',
          'world': 'word'
        },
        {
          'third': 'wow third'
        }
      ],
      total: 1000
    },
    {
      name: 'Overview of ULB activities',
      getEndpoint: '',
      postEndpoint: '',
      columns: [
        {
          label: 'Label 1',
          key: 'key1'
        },
        {
          label: 'Label 2',
          key: 'key2'
        },
        {
          label: 'Label 3',
          key: 'key3'
        },
      ],
      data: []
    },
    {
      name: 'Overview of population-wise data',
      getEndpoint: '',
      postEndpoint: '',
      columns: [],
      data: []
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
