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
          "label": "State Name",
          "key": "stateName",
          "sort": 1,
          "sortable": true,
          "class": "th-common-cls"
        },
        {
          "label": "State Type",
          "key": "stateType",
          "sortable": false,
          "class": "th-common-cls"
        },
        {
          "label": "Total ULBs",
          "key": "totalULBs",
          "sortable": false,
          "class": "th-common-cls"
        },
        {
          "label": "Participated ULBs",
          "key": "participatedULBs",
          "sortable": true,
          "class": "th-common-cls"
        },
        {
          "label": "Participated ULBs",
          "key": "participatedULBs",
          "sortable": true,
          "class": "th-common-cls"
        },
        {
          "label": "Ranked ULBs",
          "key": "rankedULBs",
          "sortable": true,
          "class": "th-common-cls"
        },
        {
          "label": "Non Ranked ULBs",
          "key": "nonRankedULBs",
          "sortable": true,
          "class": "th-common-cls"
        },
        {
          "label": "Ranked to Total(%)",
          "key": "rankedtoTotal",
          "sortable": true,
          "class": "th-color-cls"
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
