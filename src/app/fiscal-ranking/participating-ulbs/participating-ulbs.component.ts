import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FrFilter } from '../participating-state/participating-state.component';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-participating-ulbs',
  templateUrl: './participating-ulbs.component.html',
  styleUrls: ['./participating-ulbs.component.scss']
})
export class ParticipatingUlbsComponent implements OnInit {

  constructor(
    private fiscalRankingService: FiscalRankingService,
    private router: Router
  ) { 
    this.fetchStateList();
    this.checkRouterForApi();
  }
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
  populationCategory: string;
  ulbParticipation : string;
  ulbRankingStatus: string;
  stateList = [];
  routerSubs:any;
  selectedStateId: string = '';
  selectedStateName:string = '';
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
          "width": "2"
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
          "width": "7"
        },
        {
          "label": "ULB Participated",
          "key": "participatedULBs",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "7"
        },
        {
          "label": "CFR Ranked",
          "key": "rankedULBs",
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "6"
        },
        {
          "label": "Annual Financial Statement Available",
          "key": "annualFinancialStatementAvailable",
           "subHeaderData": [
            {
              "key": "1819",
              "label": "2018-19"
            },
            {
              "key": "1920",
              "label": "2019-20"
            },
            {
              "key": "2021",
              "label": "2020-21"
            },
            {
              "key": "2122",
              "label": "2021-22"
            },
           ],
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "10"
        },
        {
          "label": "Annual Budget Available",
          "key": "annualBudgetAvailable",
          "subHeaderData": [
            {
              "key": "2122",
              "label": "2021-22"
            },
            {
              "key": "2223",
              "label": "2022-23"
            },
            {
              "key": "2324",
              "label": "2023-24"
            },
            {
              "key": "2425",
              "label": "2024-25"
            },
         ],
          "sortable": true,
          "subHeader" : 'c',
          "class": "th-common-cls",
          "width": "10"
        },
        
      ],
      "name": "",
      "data": [
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          "stateName": "Andaman and Nicobar Islands",
          "ulbName": '',
          "populationCategory": 1,
          "participatedULBs": 0,
          "rankedULBs": 0,
          "annualFinancialStatementAvailable": {
            "1819": {
              url: '',
              name: 'abc9'
            },
            "1920": {
              url: '',
              name: 'abc8'
            },
            "2021": {
              url: '',
              name: 'abc7'
            },
            "2122": {
              url: '',
              name: 'abc6'
            }
          },
          "annualBudgetAvailable": {
            "2122": {
              url: '',
              name: 'abc1'
            },
            "2223": {
              url: '',
              name: 'abc2'
            },
            "2324": {
              url: '',
              name: 'abc3'
            },
            "2425": {
              url: '',
              name: 'abc4'
            }
          }
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
  checkRouterForApi() {
    this.routerSubs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlArray = event.url.split("/");
        console.log('abcdef',urlArray);
        this.selectedStateId = urlArray[3];
      }
    });
  }
  private fetchStateList() {
    this.fiscalRankingService.callGetMethod('scoring-fr/states', null).subscribe((res:any) => {
      console.log('1234', res);
       this.stateList = res?.data;
       const selectedState = this.stateList.find(({ _id }) => _id === this.selectedStateId);
       console.log('selectedState', selectedState);
       this.selectedStateName = selectedState?.name
       
    });
  }
  resetFilter(){
    this.populationCategory = 'all';
    this.ulbParticipation = 'all';
    this.ulbRankingStatus = 'all';
  //  this.getTableData();
  }
  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }
}
