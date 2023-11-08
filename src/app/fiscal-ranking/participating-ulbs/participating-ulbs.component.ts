import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FrFilter } from '../participating-state/participating-state.component';

@Component({
  selector: 'app-participating-ulbs',
  templateUrl: './participating-ulbs.component.html',
  styleUrls: ['./participating-ulbs.component.scss']
})
export class ParticipatingUlbsComponent implements OnInit {

  constructor() { }
  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home',
      class: ''
    },
    {
      label: 'Participated States & UT ',
      url: '/rankings/participated-states-ut',
      class: ''
    },
    {
      label: 'Participated ULBs',
      url: '/rankings/participated-ulbs',
      class: 'disabled'
    },

  ];

  populationCategoryFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all'
    },
    {
      label: '4M+',
      id: '2',
      key: 'greaterThanFourM'
    },
    {
      label: '1M-4M',
      id: '3',
      key: 'OneToFourM'
    },
    {
      label: '100K-1M',
      id: '4',
      key: 'hundradKtoOneM'
    },
    {
      label: '<100K',
      id: '5',
      key: 'lessThan100K'
    },
  
  ]
  ulbParticipationFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all'
    },
    {
      label: 'Participated',
      id: '2',
      key: 'participated'
    },
    {
      label: 'Non Participated',
      id: '3',
      key: 'nonParticipated'
    },
  ];
  ulbRankingStatusFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all'
    },
    {
      label: 'Ranked',
      id: '2',
      key: 'ranked'
    },
    {
      label: 'Non Ranked',
      id: '3',
      key: 'nonRanked'
    },
  ];
  populationCategory;
  ulbParticipation;
  ulbRankingStatus;
  table = {
    response: {
      "status": true,
      "message": "Successfully saved data!",
      "columns": [
        {
          "label": "S.No",
          "key": "sNo",
          "sort": 0,
          "sortable": false,
          "class": "th-common-cls",
          "width": "3"
        },
        {
          "label": "ULB Name",
          "key": "ulbName",
          "sort": 1,
          "sortable": true,
          "subHeader" : 'A',
          "class": "th-color-cls",
          "width": "8"
        },
        {
          "label": "Population Category",
          "key": "populationCategory",
          "sortable": false,
          "subHeader" : 'B',
          "class": "th-common-cls",
          "width": "8"
        },
        {
          "label": "ULB Participated",
          "key": "participatedULBs",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "8"
        },
        {
          "label": "CFR Ranked",
          "key": "rankedULBs",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "8"
        },
        {
          "label": "Annual Financial Statement Available",
          "key": "annualFinancialStatementAvailable",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "8"
        },
        {
          "label": "Annual Budget Available",
          "key": "annualBudgetAvailable",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "8"
        },
        
      ],
      "name": "",
      "data": [
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          "stateType": 1,
          "totalULBs": 0,
          "participatedULBs": 0,
          "rankedULBs": 0,
          "nonRankedULBs": 1,
          "stateName": "Andaman and Nicobar Islands",
          "selected": false,
          "rankedtoTotal": ""
        },
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          "stateType": 1,
          "totalULBs": 0,
          "participatedULBs": 0,
          "rankedULBs": 0,
          "nonRankedULBs": 1,
          "stateName": "Andaman and Nicobar Islands",
          "selected": false,
          "rankedtoTotal": ""
        },
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          "stateType": 1,
          "totalULBs": 0,
          "participatedULBs": 0,
          "rankedULBs": 0,
          "nonRankedULBs": 1,
          "stateName": "Andaman and Nicobar Islands",
          "selected": false,
          "rankedtoTotal": ""
        },
     
      ],
      "lastRow": [
        "Total",
        "$sum",
        "$sum",
        "$sum",
      ],
    }
  }
  ngOnInit(): void {
  }
  populationCategoryChange(e){

  }
  ulbParticipationChange(e){

  }
  ulbRankingStatusFilterChange(e){

  }
}
