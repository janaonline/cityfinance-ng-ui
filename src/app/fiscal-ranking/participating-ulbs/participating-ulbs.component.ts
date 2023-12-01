import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from 'src/app/fiscal-ranking/breadcrumb/breadcrumb.component';
import { FrFilter, Filter, FiscalRankingService, Table } from 'src/app/fiscal-ranking/fiscal-ranking.service';
import { NavigationEnd, Router } from '@angular/router';

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
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

  populationCategoryFilter: FrFilter[] = [];
  ulbParticipationFilter: FrFilter[]= [];
  ulbRankingStatusFilter: FrFilter[]= [];
  populationCategory: string = 'All';
  ulbParticipation: string = 'All';
  ulbRankingStatus: string = 'All';
  stateList = [];
  routerSubs: any;
  selectedStateId: string = '';
  selectedStateName: string = '';
  allowedExtensions: string[] = ['pdf', 'excel'];
  targetExtension:string = 'pdf';
  table: Table = { response: null };
  // table = {
  //   response: {
  //     "status": true,
  //     "message": "Successfully saved data!",
  //     "columns": [
  //       {
  //         "label": "S.No",
  //         "key": "sNo",
  //         "class": "th-common-cls",
  //         "width": "2"
  //       },
  //       {
  //         "label": "ULB Name",
  //         "key": "ulbName",
  //         "sort": 1,
  //         "sortable": true,
  //         "class": "th-color-cls",

  //       },
  //       {
  //         "label": "Population Category",
  //         "key": "populationCategory",
  //         "sortable": true,
  //         "sort": 1,
  //         "class": "th-common-cls",

  //       },
  //       {
  //         "label": "ULB Participated",
  //         "key": "participatedULBs",
  //         "sortable": true,
  //         "sort": 1,
  //         "class": "th-common-cls",

  //       },
  //       {
  //         "label": "CFR Ranked",
  //         "key": "rankedULBs",
  //         "sortable": true,
  //         "sort": 1,
  //         "class": "th-common-cls",

  //       },
  //       {
  //         "label": "Annual Financial Statement Available",
  //         "key": "auditedAccounts1819",
  //         "colspan": 4,
  //         "class": "th-common-cls",
  //       },
  //       {
  //         "label": "",
  //         "key": "auditedAccounts1920",
  //         "hidden": true
  //       },
  //       {
  //         "label": "",
  //         "key": "auditedAccounts2021",
  //         "hidden": true
  //       },
  //       {
  //         "label": "",
  //         "key": "auditedAccounts2122",
  //         "hidden": true
  //       },
  //       {
  //         "label": "Annual Budget Available",
  //         "key": "annualBudget2021",
  //         "colspan": 4,
  //         "class": "th-common-cls",

  //       },
  //       {
  //         "label": "",
  //         "key": "annualBudget2122",
  //         "hidden": true
  //       },
  //       {
  //         "label": "",
  //         "key": "annualBudget2223",
  //         "hidden": true
  //       },
  //       {
  //         "label": "",
  //         "key": "annualBudget2324",
  //         "hidden": true
  //       },

  //     ],
  //     "subHeaders": [
  //       "",
  //       "",
  //       "",
  //       "",
  //       "",
  //       "2018-19",
  //       "2019-20",
  //       "2020-21",
  //       "2021-22",
  //       "2020-21",
  //       "2021-22",
  //       "2022-23",
  //       "2023-24"
  //     ],
  //     "name": "",
  //     "data": [
  //       {
  //         "_id": "5dcf9d7216a06aed41c748dc",
  //         'sNo': 1,
  //         "stateName": "Andaman and Nicobar Islands",
  //         "ulbName": 'Abcd',
  //         "populationCategory": '4M',
  //         "participatedULBs": 23,
  //         "rankedULBs": 56,
  //         "annualBudget2021": 'werwr.pdf',
  //         "annualBudget2122": 'efeqrg.pdf',
  //         "annualBudget2223": 'vrftgwr.pdf',
  //         "annualBudget2324": '',
  //         "auditedAccounts1819": '',
  //         "auditedAccounts1920": 'gegwe.pdf',
  //         "auditedAccounts2021": '',
  //         "auditedAccounts2122": 'vwegwer.pdf',

  //       },
  //     ]
  //   }
  // }
  ngOnInit(): void {
    this.getFilters();
  }
  dropDownValueChanges(e) {
    this.getTableData(this.table, '');
  }
  // ulbParticipationChange(e) {
  //   this.getTableData();
  // }
  // ulbRankingStatusFilterChange(e) {
  //   this.getTableData();
  // }

  // get the state Id from routes
  checkRouterForApi() {
    this.routerSubs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlArray = event.url.split("/");
        console.log('abcdef', urlArray);
        this.selectedStateId = urlArray[3];
      }
    });
  };

  // find the state from state list and call the api for data
  private fetchStateList() {
    this.fiscalRankingService.callGetMethod('scoring-fr/states', null).subscribe((res: any) => {
      console.log('1234', res);
      this.stateList = res?.data;
      const selectedState = this.stateList.find(({ _id }) => _id === this.selectedStateId);
      console.log('selectedState', selectedState);
      this.selectedStateName = selectedState?.name;
      this.getTableData(this.table, '');

    });
  }
  resetFilter() {
    this.populationCategory = this.populationCategoryFilter[0]?.value;
    this.ulbParticipation = this.ulbParticipationFilter[0]?.value;
    this.ulbRankingStatus = this.ulbRankingStatusFilter[0]?.value;
    this.getTableData(this.table, '');
  }
  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  };

  // get the ulbs data 
  getTableData(table: Table, queryParams: string = '') {
    const filterObj = {
      populationCategory: this.populationCategory,
      ulbParticipationFilter: this.ulbParticipation,
      ulbRankingStatusFilter: this.ulbRankingStatus,
    }
    
    this.fiscalRankingService.callGetMethod(`scoring-fr/ulbs/${this.selectedStateId}?${queryParams}`, filterObj).subscribe((res: any) => {
       console.log('participated-state table responces', res);
       this.table["response"] = res?.data;
    },
      (error) => {
        console.log('participated-state table error', error);
      }
    )
  }

  // for all filters
  getFilters() {
    this.fiscalRankingService.callGetMethod('scoring-fr/filters', null).subscribe((res: any) => {
      console.log('scoring-fr/participated-state-filter', res);
      const filter: Filter = res?.data;
      this.populationCategoryFilter = filter?.populationBucketFilter;
      this.ulbParticipationFilter = filter?.ulbParticipationFilter;
      this.ulbRankingStatusFilter = filter?.ulbRankingStatusFilter;

    },
      (error) => {
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    )
  }

  onUpdate(table,  event) {
    console.log('table......', table);
    console.log('123 event', event);
   this.getTableData(table, event?.queryParams);
  }
}
