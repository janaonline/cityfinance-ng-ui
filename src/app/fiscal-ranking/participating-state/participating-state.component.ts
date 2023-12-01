import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from 'src/app/fiscal-ranking/breadcrumb/breadcrumb.component';
import { ColorDetails } from 'src/app/fiscal-ranking/india-map/india-map.component';
import { FrFilter, Filter, FiscalRankingService, Table } from 'src/app/fiscal-ranking/fiscal-ranking.service';
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");


@Component({
  selector: 'app-participating-state',
  templateUrl: './participating-state.component.html',
  styleUrls: ['./participating-state.component.scss']
})

export class ParticipatingStateComponent implements OnInit {

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) {
    this.getFilters();
  }
  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Participated States and UT ',
      url: '/rankings/participated-states-ut',
      class: 'disabled'
    }
  ];

  stateTypeFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all',
      value: 'all'
    },
    {
      label: 'Large state',
      id: '2',
      key: 'largeState',
      value: 'Large'
    },
    {
      label: 'Small state',
      id: '3',
      key: 'smallState',
      value: 'Small'
    },
    {
      label: 'Union territory',
      id: '4',
      key: 'unionTerritory',
      value: 'UT'
    },

  ]
  ulbParticipationFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all',
      value: 'all'
    },
    {
      label: 'Participated',
      id: '2',
      key: 'participated',
      value: 'participated'
    },
    {
      label: 'Non Participated',
      id: '3',
      key: 'nonParticipated',
      value: 'nonParticipated'
    },
  ];
  ulbRankingStatusFilter: FrFilter[] = [
    {
      label: 'All',
      id: '1',
      key: 'all',
      value: 'all'
    },
    {
      label: 'Ranked',
      id: '2',
      key: 'ranked',
      value: 'ranked'
    },
    {
      label: 'Non Ranked',
      id: '3',
      key: 'nonRanked',
      value: 'nonRanked'
    },
  ];
  stateType: string = 'All';
  ulbParticipation: string = 'All';
  ulbRankingStatus: string = 'All';
  table:object | any = { response: null };
  isApiInProgress:boolean = true;
  // table = {
  //   response: {
      // "status": true,
      // "message": "Successfully saved data!",
      // "columns": [
      //   {
      //     "label": "S.No",
      //     "key": "sNo",
      //     "sort": 0,
      //     "sortable": false,
      //     "class": "th-common-cls",
      //     "width": "3"
      //   },
      //   {
      //     "label": "State Name",
      //     "key": "stateName",
      //     "sort": 1,
      //     "sortable": true,
      //     "class": "th-common-cls",
      //     "width": "8"
      //   },
      //   {
      //     "label": "State Type",
      //     "key": "stateType",
      //     "sortable": false,
      //     "sort": 1,
      //     "class": "th-common-cls",
      //     "width": "6"
      //   },
      //   {
      //     "label": "Total ULBs",
      //     "key": "totalULBs",
      //     "sortable": false,
      //     "sort": 0,
      //     "class": "th-common-cls",
      //     "width": "6"
      //   },
      //   {
      //     "label": "Participated ULBs",
      //     "key": "participatedULBs",
      //     "sortable": true,
      //     "sort": 1,
      //     "class": "th-common-cls",
      //     "width": "7"
      //   },
      //   {
      //     "label": "Ranked ULBs",
      //     "key": "rankedULBs",
      //     "sortable": true,
      //     "sort": 1,
      //     "class": "th-common-cls",
      //     "width": "6"
      //   },
      //   {
      //     "label": "Non Ranked ULBs",
      //     "key": "nonRankedULBs",
      //     "sortable": true,
      //     "sort": 1,
      //     "class": "th-common-cls",
      //     "width": "7"
      //   },
      //   {
      //     "label": "Ranked to Total(%)",
      //     "key": "rankedtoTotal",
      //     "sortable": true,
      //     "sort": 1,
      //     "class": "th-color-cls",
      //     "width": "7"
      //   },

      // ],
      // "name": "",
      // "data": [
      //   {
      //     "_id": "",
      //     "sNo" : "",
      //     "stateType": "",
      //     "totalULBs": "A",
      //     "participatedULBs": "B",
      //     "rankedULBs": "C",
      //     "nonRankedULBs": "D",
      //     "stateName": "",
      //     "selected": false,
      //     "rankedtoTotal": "E=C/A",
      //     "stateNameLink": ""
      //   },
      //   {
      //     "_id": "1",
      //     "sNo" : 1,
      //     "stateType": "Large",
      //     "totalULBs": 6,
      //     "participatedULBs": 0,
      //     "rankedULBs": 0,
      //     "nonRankedULBs": 3,
      //     "stateName": "Andhra Pradesh",
      //     "selected": false,
      //     "rankedtoTotal": 5,
      //     "stateNameLink": "/rankings/participated-ulbs"
      //   },
      //   {
      //     "_id": "2",
      //     "sNo" : 2,
      //     "stateType": "Large",
      //     "totalULBs": 9,
      //     "participatedULBs": 3,
      //     "rankedULBs": 4,
      //     "nonRankedULBs": 5,
      //     "stateName": "Uttar Pradesh",
      //     "selected": false,
      //     "rankedtoTotal": 5,
      //     "stateNameLink": "/rankings/participated-ulbs"
      //   },
      //   {
      //     "_id": "3",
      //     "sNo" : 3,
      //     "stateType": "Small",
      //     "totalULBs": 3,
      //     "participatedULBs": 3,
      //     "rankedULBs": 1,
      //     "nonRankedULBs": 2,
      //     "stateName": "Andaman and Nicobar Islands",
      //     "selected": false,
      //     "rankedtoTotal": 2,
      //     "stateNameLink": "/rankings/participated-ulbs"
      //   },

      // ],
      // "lastRow": [
      //   "",
      //   "",
      //   "Total",
      //   "$sum",
      //   "$sum",
      //   "$sum",
      //   "$sum",
      //   "$sum",
      // ],
  //   }
  // };
  colorCoding;

  colorDetails: ColorDetails[] = [
    { color: "#04DC00", text: "76%-100%", min: 76, max: 100 },
    { color: "#F8A70B", text: "51%-75%", min: 51, max: 75 },
    { color: "#FFDB5B", text: "26%-50%", min: 26, max: 50 },
    { color: "#FFF281", text: "1%-25%", min: 1, max: 15 },
    { color: "#E5E5E5", text: "0%", min: 0, max: 0 },
  ];

  ngOnInit(): void {
    //  this.getStateWiseForm();
    this.getTableData(this.table, '');
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
  getTableData(table:Table, queryParams:string) {
    this.colorCoding = [];
    this.isApiInProgress = true;
    //  https://staging.cityfinance.in/api/v1/scoring-fr/participated-state?stateType=all&ulbParticipationFilter=all&ulbRankingStatusFilter=nonRanked
    const filterObj = {
      stateType: this.stateType,
      ulbParticipationFilter: this.ulbParticipation,
      ulbRankingStatusFilter: this.ulbRankingStatus

    }
    this.fiscalRankingService.callGetMethod(`scoring-fr/participated-state?${queryParams}`, filterObj).subscribe((res: any) => {
      console.log('participated-state table responces', res);
      this.table["response"] = res?.data?.tableData;
      this.colorCoding = res?.data?.mapData;
      this.isApiInProgress = false;
    },
      (error) => {
        console.log('participated-state table error', error);
        this.isApiInProgress = false;
      }
    )
  }
  // getStateWiseForm() {
  //   this.fiscalRankingService.getStateWiseForm().subscribe(res => {
  //     this.colorCoding = res?.data.heatMaps;
  //   });
  // }
  // reset all filter
  resetFilter() {
    this.stateType = this.stateTypeFilter[0]?.value;
    this.ulbParticipation = this.ulbParticipationFilter[0]?.value;
    this.ulbRankingStatus = this.ulbRankingStatusFilter[0]?.value;
    this.getTableData(this.table, '');
  }

  // for all filters

  getFilters() {
    this.fiscalRankingService.callGetMethod('scoring-fr/filters', null).subscribe((res: any) => {
      console.log('scoring-fr/participated-state-filter', res);
      const filter: Filter = res?.data;
      this.stateTypeFilter = filter?.stateTypeFilter;
      this.ulbParticipationFilter = filter?.ulbParticipationFilter;
      this.ulbRankingStatusFilter = filter?.ulbRankingStatusFilter;

    },
      (error) => {
        swal('Error', error?.message ?? 'Something went wrong', 'error');
      }
    )
  }

  onUpdate(table:Table,  event) {
    this.getTableData(table, event?.queryParams);
   }
}
