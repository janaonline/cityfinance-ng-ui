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
      url: '/rankings/top-rankings',
      class: 'disabled'
    }
  ];


  table = { response: null };

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
    this.loadData();
  }

  loadData() {
    this.getStateWiseForm();
    this.loadStates();
    this.loadTopRankedUlbs();
  }

  loadTopRankedUlbs() {
    this.fiscalRankingService.topRankedUlbs().subscribe((res: any) => {
      this.table.response = res;
    })
  }

  loadStates() {
    this.fiscalRankingService.states().subscribe((res: any) => {
      this.stateList = res.data;
    });
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
