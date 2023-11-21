import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-annual-financial-statements',
  templateUrl: './annual-financial-statements.component.html',
  styleUrls: ['./annual-financial-statements.component.scss']
})
export class AnnualFinancialStatementsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Annual financial statements',
      url: '/rankings/annual-financial-statements',
      class: 'disabled'
    }
  ];

  table = {
    response: {
      "status": true,
      "message": "Successfully saved data!",
      "columns": [
        {
          "label": "S. No",
          "key": "sNo",
        },
        {
          "label": "State Name",
          "key": "stateName",
          "sort": 1,
          "sortable": true
        },
        {
          "label": "No of ulbs",
          "key": "noOfUlbs"
        },
        {
          "label": "Annual Budget Available",
          "key": "ab2021",
          "colspan": 4
        },
        {
          "label": "",
          "key": "ab2122",
          "hidden": true
        },
        {
          "label": "",
          "key": "ab2223",
          "hidden": true
        },
        {
          "label": "",
          "key": "ab2324",
          "hidden": true
        }
      ],
      "subHeaders": [
        "",
        "",
        "",
        "2020-21",
        "2021-22",
        "2022-23",
        "2023-24"
      ],
      "name": "",
      "data": [
        {
          "noOfUlbs": 1,
          "ab2021": 0,
          "ab2122": 0,
          "ab2223": 0,
          "ab2324": 1,
          "stateName": "Andaman and Nicobar Islands",
          "stateNameLink": "/rankings/participated-ulbs/5fa25a6e0fb1d349c0fdfbc7"
        },
        {
          "noOfUlbs": 123,
          "ab2021": 122,
          "ab2122": 1,
          "ab2223": 0,
          "ab2324": 0,
          "stateName": "Andhra Pradesh",
          "stateNameLink": "/rankings/participated-ulbs/5fa25a6e0fb1d349c0fdfbc7"
        },
        {
          "noOfUlbs": 31,
          "ab2021": 0,
          "ab2122": 0,
          "ab2223": 0,
          "ab2324": 31,
          "stateName": "Arunachal Pradesh",
          "stateNameLink": "/rankings/participated-ulbs/5fa25a6e0fb1d349c0fdfbc7"
        },
        {
          "noOfUlbs": 107,
          "ab2021": 25,
          "ab2122": 0,
          "ab2223": 37,
          "ab2324": 45,
          "stateName": "Assam",
          "stateNameLink": "/rankings/participated-ulbs/5fa25a6e0fb1d349c0fdfbc7"
        },
        {
          "noOfUlbs": 263,
          "ab2021": 4,
          "ab2122": 0,
          "ab2223": 26,
          "ab2324": 233,
          "stateName": "Bihar",
          "stateNameLink": "/rankings/participated-ulbs/5fa25a6e0fb1d349c0fdfbc7"
        }
      ]
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
