import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { ColorDetails } from '../india-map/india-map.component';
import { FiscalRankingService } from '../fiscal-ranking.service';


export interface FrFilter {
  label: string;
  id: string;
  key?:string;
}
@Component({
  selector: 'app-participating-state',
  templateUrl: './participating-state.component.html',
  styleUrls: ['./participating-state.component.scss']
})

export class ParticipatingStateComponent implements OnInit {

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }
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
      key: 'all'
    },
    {
      label: 'Large state',
      id: '2',
      key: 'largeState'
    },
    {
      label: 'Small state',
      id: '3',
      key: 'smallState'
    },
    {
      label: 'Union territory',
      id: '4',
      key: 'unionTerritory'
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
  stateType;
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
          "label": "State Name",
          "key": "stateName",
          "sort": 1,
          "sortable": true,
          "class": "th-common-cls",
          "width": "8"
        },
        {
          "label": "State Type",
          "key": "stateType",
          "sortable": false,
          "sort": 1,
          "class": "th-common-cls",
          "width": "6"
        },
        {
          "label": "Total ULBs",
          "key": "totalULBs",
          "sortable": false,
          "sort": 0,
          "class": "th-common-cls",
          "width": "6"
        },
        {
          "label": "Participated ULBs",
          "key": "participatedULBs",
          "sortable": true,
          "sort": 1,
          "class": "th-common-cls",
          "width": "7"
        },
        {
          "label": "Ranked ULBs",
          "key": "rankedULBs",
          "sortable": true,
          "sort": 1,
          "class": "th-common-cls",
          "width": "6"
        },
        {
          "label": "Non Ranked ULBs",
          "key": "nonRankedULBs",
          "sortable": true,
          "sort": 1,
          "class": "th-common-cls",
          "width": "7"
        },
        {
          "label": "Ranked to Total(%)",
          "key": "rankedtoTotal",
          "sortable": true,
          "sort": 1,
          "class": "th-color-cls",
          "width": "7"
        },
        
      ],
      "name": "",
      "data": [
        {
          "_id": "",
          "sNo" : "",
          "stateType": "",
          "totalULBs": "A",
          "participatedULBs": "B",
          "rankedULBs": "C",
          "nonRankedULBs": "D",
          "stateName": "",
          "selected": false,
          "rankedtoTotal": "E=C/A",
          "stateNameLink": ""
        },
        {
          "_id": "1",
          "sNo" : 1,
          "stateType": "Large",
          "totalULBs": 6,
          "participatedULBs": 0,
          "rankedULBs": 0,
          "nonRankedULBs": 3,
          "stateName": "Andhra Pradesh",
          "selected": false,
          "rankedtoTotal": 5,
          "stateNameLink": "/rankings/participated-ulbs"
        },
        {
          "_id": "2",
          "sNo" : 2,
          "stateType": "Large",
          "totalULBs": 9,
          "participatedULBs": 3,
          "rankedULBs": 4,
          "nonRankedULBs": 5,
          "stateName": "Uttar Pradesh",
          "selected": false,
          "rankedtoTotal": 5,
          "stateNameLink": "/rankings/participated-ulbs"
        },
        {
          "_id": "3",
          "sNo" : 3,
          "stateType": "Small",
          "totalULBs": 3,
          "participatedULBs": 3,
          "rankedULBs": 1,
          "nonRankedULBs": 2,
          "stateName": "Andaman and Nicobar Islands",
          "selected": false,
          "rankedtoTotal": 2,
          "stateNameLink": "/rankings/participated-ulbs"
        },
     
      ],
      "lastRow": [
        "",
        "",
        "Total",
        "$sum",
        "$sum",
        "$sum",
        "$sum",
        "$sum",
      ],
    }
  };
  colorCoding;

  colorDetails: ColorDetails[] = [
    { color: "#04DC00", text: "76%-100%", min: 76, max: 100 },
    { color: "#F8A70B", text: "51%-75%", min: 51, max: 75 },
    { color: "#FFDB5B", text: "26%-50%", min: 26, max: 50 },
    { color: "#FFF281", text: "1%-25%", min: 1, max: 15 },
    { color: "#E5E5E5", text: "0%", min: 0, max: 0 },
  ];

  ngOnInit(): void {
    this.getStateWiseForm();
  }
  stateTypeChange(e){

  }
  ulbParticipationChange(e){

  }
  ulbRankingStatusFilterChange(e){

  }

  getStateWiseForm() {
    this.fiscalRankingService.getStateWiseForm().subscribe(res => {
      this.colorCoding = res?.data.heatMaps;
    });
  }
}
