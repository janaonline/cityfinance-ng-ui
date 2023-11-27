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
          "class": "th-common-cls",
          "width": "2"
        },
        {
          "label": "ULB Name",
          "key": "ulbName",
          "sort": 1,
          "sortable": true,
          "class": "th-color-cls",
         
        },
        {
          "label": "Population Category",
          "key": "populationCategory",
          "class": "th-common-cls",
          
        },
        {
          "label": "ULB Participated",
          "key": "participatedULBs",
          "sortable": true,
          "class": "th-common-cls",
          
        },
        {
          "label": "CFR Ranked",
          "key": "rankedULBs",
          "sortable": true,
          "class": "th-common-cls",
         
        },
        {
          "label": "Annual Financial Statement Available",
          "key": "auditedAccounts1819",
          "colspan": 4,
          "class": "th-common-cls",
        },
        {
          "label": "",
          "key": "auditedAccounts1920",
          "hidden": true
        },
        {
          "label": "",
          "key": "auditedAccounts2021",
          "hidden": true
        },
        {
          "label": "",
          "key": "auditedAccounts2122",
          "hidden": true
        },
        {
          "label": "Annual Budget Available",
          "key": "annualBudget2021",
          "colspan": 4,
          "class": "th-common-cls",
         
        },
        {
          "label": "",
          "key": "annualBudget2122",
          "hidden": true
        },
        {
          "label": "",
          "key": "annualBudget2223",
          "hidden": true
        },
        {
          "label": "",
          "key": "annualBudget2324",
          "hidden": true
        },
        
      ],
      "subHeaders": [
        "",
        "",
        "",
        "",
        "",
        "2018-19",
        "2019-20",
        "2020-21",
        "2021-22",
        "2020-21",
        "2021-22",
        "2022-23",
        "2023-24"
      ],
      "name": "",
      "data": [
        {
          "_id": "5dcf9d7216a06aed41c748dc",
          'sNo' : 1,
          "stateName": "Andaman and Nicobar Islands",
          "ulbName": 'Abcd',
          "populationCategory": '4M',
          "participatedULBs": 23,
          "rankedULBs": 56,
          "annualBudget2021": 0,
          "annualBudget2122": 0,
          "annualBudget2223": 0,
          "annualBudget2324": 1,
          "auditedAccounts1819": 0,
          "auditedAccounts1920": 0,
          "auditedAccounts2021": 0,
          "auditedAccounts2122": 1,

        },
      ]
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
       this.selectedStateName = selectedState?.name;
       this.getTableData();
       
    });
  }
  resetFilter(){
    this.populationCategory = 'all';
    this.ulbParticipation = 'all';
    this.ulbRankingStatus = 'all';
   this.getTableData();
  }
  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }
  getTableData(){
    // https://staging.cityfinance.in/api/v1/scoring-fr/ulbs/5dcf9d7316a06aed41c748e7
   const filterObj = {
    populationCategory: this.populationCategory,
     ulbParticipationFilter : this.ulbParticipation,
     ulbRankingStatusFilter: this.ulbRankingStatus
 
   }
    this.fiscalRankingService.callGetMethod(`scoring-fr/ulbs/${this.selectedStateId}`, filterObj).subscribe((res: any)=>{
   //  console.log('participated-state table responces', res);
    // this.table["response"] = res?.data;
    },
    (error)=>{
     console.log('participated-state table error', error);
    }
    )
   }
 
}
