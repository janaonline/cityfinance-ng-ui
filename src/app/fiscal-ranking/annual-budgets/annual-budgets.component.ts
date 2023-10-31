import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-annual-budgets',
  templateUrl: './annual-budgets.component.html',
  styleUrls: ['./annual-budgets.component.scss']
})
export class AnnualBudgetsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Annual Budgets',
      url: '/rankings/annual-budgets'
    }
  ];

  table = {
    response: {
      "status": true,
      "message": "Successfully saved data!",
      "columns": [
        {
          "label": "State Name",
          "key": "stateName",
          "query": "",
          "sort": 1,
          "sortable": true
        },
        {
          "label": "Total ULBs",
          "key": "totalUlbs",
          "sortable": true
        },
        {
          "label": "Under Review by PMU",
          "key": "underReviewByPMU",
          "sortable": true
        },
        {
          "label": "Returned by PMU",
          "key": "returnedByPMU",
          "sortable": true
        },
        {
          "label": "In Progress",
          "key": "inProgress",
          "sortable": true
        },
        {
          "label": "Not Started",
          "key": "notStarted",
          "sortable": true
        }
      ],
      "name": "",
      "data": [
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          "totalUlbs": 1,
          "underReviewByPMU": 0,
          "returnedByPMU": 0,
          "inProgress": 0,
          "notStarted": 1,
          "stateName": "Andaman and Nicobar Islands",
          "selected": false,
          "stateNameLink": "/rankings/populationWise/5dcf9d7216a06aed41c748dc?stateName=Andaman and Nicobar Islands"
        },
        {
          "_id": "5dcf9d7216a06aed41c748dd",
          "totalUlbs": 123,
          "underReviewByPMU": 122,
          "returnedByPMU": 1,
          "inProgress": 0,
          "notStarted": 0,
          "stateName": "Andhra Pradesh",
          "selected": false,
          "stateNameLink": "/rankings/populationWise/5dcf9d7216a06aed41c748dd?stateName=Andhra Pradesh"
        },
        {
          "_id": "5dcf9d7216a06aed41c748de",
          "totalUlbs": 31,
          "underReviewByPMU": 0,
          "returnedByPMU": 0,
          "inProgress": 0,
          "notStarted": 31,
          "stateName": "Arunachal Pradesh",
          "selected": false,
          "stateNameLink": "/rankings/populationWise/5dcf9d7216a06aed41c748de?stateName=Arunachal Pradesh"
        },
        {
          "_id": "5dcf9d7216a06aed41c748df",
          "totalUlbs": 107,
          "underReviewByPMU": 25,
          "returnedByPMU": 0,
          "inProgress": 37,
          "notStarted": 45,
          "stateName": "Assam",
          "selected": false,
          "stateNameLink": "/rankings/populationWise/5dcf9d7216a06aed41c748df?stateName=Assam"
        },
        {
          "_id": "5dcf9d7216a06aed41c748e0",
          "totalUlbs": 263,
          "underReviewByPMU": 4,
          "returnedByPMU": 0,
          "inProgress": 26,
          "notStarted": 233,
          "stateName": "Bihar",
          "selected": false,
          "stateNameLink": "/rankings/populationWise/5dcf9d7216a06aed41c748e0?stateName=Bihar"
        }
      ],
      "lastRow": [
        "Total",
        "$sum",
        "$sum",
        "$sum",
        "$sum",
        "$sum"
      ],
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
