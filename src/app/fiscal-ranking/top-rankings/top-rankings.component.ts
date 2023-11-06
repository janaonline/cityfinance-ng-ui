import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService } from '../fiscal-ranking.service';
import { ColorDetails } from '../india-map/india-map.component';
import { SearchPopupComponent } from '../ulb-details/search-popup/search-popup.component';

@Component({
  selector: 'app-top-rankings',
  templateUrl: './top-rankings.component.html',
  styleUrls: ['./top-rankings.component.scss']
})
export class TopRankingsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Top rankings',
      url: '/rankings/top-rankings'
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
          "stateNameLink": "/rankings/ulb/456789"
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
          "stateNameLink": "/rankings/ulb/456789"
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
          "stateNameLink": "/rankings/ulb/456789"
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
          "stateNameLink": "/rankings/ulb/456789"
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
          "stateNameLink": "/rankings/ulb/456789"
        }
      ],
      "lastRow": [
        "Total",
        "$sum",
        "$sum",
        "$sum",
      ],
    }
  }

  stateList = [
    {
      "code": "AP",
      "name": "Andhra Pradesh",
      "_id": "5dcf9d7216a06aed41c748dd",
      "totalUlbs": 107,
      "coveredUlbCount": 0,
      "audited": 0,
      "unaudited": 0,
      "auditNA": 0,
      "coveredUlbPercentage": 0
    },
    {
      "code": "AR",
      "name": "Arunachal Pradesh",
      "_id": "5dcf9d7216a06aed41c748de",
      "totalUlbs": 19,
      "coveredUlbCount": 0,
      "audited": 0,
      "unaudited": 0,
      "auditNA": 0,
      "coveredUlbPercentage": 0
    },
    {
      "code": "AS",
      "name": "Assam",
      "_id": "5dcf9d7216a06aed41c748df",
      "totalUlbs": 98,
      "coveredUlbCount": 0,
      "audited": 0,
      "unaudited": 0,
      "auditNA": 0,
      "coveredUlbPercentage": 0
    },
    {
      "code": "BR",
      "name": "Bihar",
      "_id": "5dcf9d7216a06aed41c748e0",
      "totalUlbs": 144,
      "coveredUlbCount": 0,
      "audited": 0,
      "unaudited": 0,
      "auditNA": 0,
      "coveredUlbPercentage": 0
    }
  ];


  populationCategories = [
    { _id: '1', name: '4M+' },
    { _id: '2', name: '1M to 4M' },
    { _id: '3', name: '100K to 1M' },
    { _id: '4', name: '<100K' }
  ];

  dropdownSettings = {
    singleSelection: true,
    text: "India",
    enableSearchFilter: true,
    labelKey: "name",
    primaryKey: "_id",
    showCheckbox: false,
    classes: "homepage-stateList custom-class",
  };

  colorCoding;

  colorDetails: ColorDetails[] = [
    { color: "#04DC00", text: "76%-100%", min: 76, max: 100 },
    { color: "#F8A70B", text: "51%-75%", min: 51, max: 75 },
    { color: "#FFDB5B", text: "26%-50%", min: 26, max: 50 },
    { color: "#FFF281", text: "1%-25%", min: 1, max: 15 },
    { color: "#E5E5E5", text: "0%", min: 0, max: 0 },
  ];

  constructor(
    private matDialog: MatDialog,
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.getStateWiseForm();
  }

  getStateWiseForm() {
    this.fiscalRankingService.getStateWiseForm().subscribe(res => {
      this.colorCoding = res?.data.heatMaps;
    });
  }

  openSearch() {
    console.log('wfh');
    this.matDialog.open(SearchPopupComponent, {
      width: '100vw',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'search-page',
    })
  }
}
