import { Component, OnInit, ViewChild } from '@angular/core';
import { FiscalRankingService, MapData } from 'src/app/fiscal-ranking/fiscal-ranking.service';
import { GlobalLoaderService } from '../../services/loaders/global-loader.service';
import { MunicipalityBudgetService } from './municipality-budget.service';

interface Document {
  name: string;
  url: string;
  type: 'pdf';
  modifiedAt: string;
}

@Component({
  selector: 'app-municipality-budget',
  templateUrl: './municipality-budget.component.html',
  styleUrls: ['./municipality-budget.component.scss']
})
export class MunicipalityBudgetComponent implements OnInit {

  @ViewChild('heatMap') heatMapComponent;

  details: any[] = [];
  documents: Document[] = [];
  filters: any = {};

  categories = [
    { name: 'Municipal Corporation', _id: '5dcfa67543263a0e75c71697' },
    { name: 'Town Panchayat', _id: '5dcfa66b43263a0e75c71696' },
    { name: 'Municipality', _id: '5dcfa64e43263a0e75c71695' },
  ]
  perPage: number = 10;
  mapData: MapData;
  insight;

  state: string = '';
  category: string = '';

  constructor(
    private fiscalRankingService: FiscalRankingService,
    private globalLoaderService: GlobalLoaderService,
    private municipalityBudgetsService: MunicipalityBudgetService
  ) { }

  ngOnInit(): void {
    this.loadMapData();
    this.loadInsights();
    this.getDocuments();
  }


  get years() {
    return JSON.parse(localStorage.getItem("Years"));
  }

  onPerPageChange() {

  }

  loadMapData(params = {}) {
    this.fiscalRankingService.getStateWiseForm(params).subscribe(res => {
      console.log('map', res);
      this.mapData = res?.data;
    })
  }

  loadInsights(params = {}) {
    this.municipalityBudgetsService.getInsights(params).subscribe(({ data }: any) => {
      this.insight = data;
    })
  }

  getDocuments() {
    this.globalLoaderService.showLoader();
    this.municipalityBudgetsService.getDocuments({
      category: this.category,
      state: this.state,
      ...this.filters
    }).subscribe(({ data }: any) => {
      this.documents = data;
      this.globalLoaderService.stopLoader();
    }, err => {
      this.globalLoaderService.stopLoader();
    })
  }

  onFilterChanges(event) {
    this.filters = event;
    this.getDocuments();
  }

  onStateChange(e) {
    this.heatMapComponent?.getStateWiseForm({ category: e?.category });
    this.state = e?.state;
    this.category = e?.category;
    this.loadInsights(e);
    this.getDocuments();
  }
}
