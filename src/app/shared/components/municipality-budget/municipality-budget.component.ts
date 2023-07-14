import { Component, OnInit } from '@angular/core';
import { FiscalRankingService, MapData } from 'src/app/fiscal-ranking/fiscal-ranking.service';
import { MunicipalityBudgetService } from './municipality-budget.service';

@Component({
  selector: 'app-municipality-budget',
  templateUrl: './municipality-budget.component.html',
  styleUrls: ['./municipality-budget.component.scss']
})
export class MunicipalityBudgetComponent implements OnInit {

  details: any[] = [];
  types = [
    { name: 'Municipal Corporation', _id: '5dcfa67543263a0e75c71697' },
    { name: 'Town Panchayat', _id: '5dcfa66b43263a0e75c71696' },
    { name: 'Municipality', _id: '5dcfa64e43263a0e75c71695' },
  ]
  perPage: number = 10;
  mapData: MapData;
  insight;

  constructor(
    private fiscalRankingService: FiscalRankingService,
    private municpalityBudgetService: MunicipalityBudgetService
  ) { }

  ngOnInit(): void {
    this.loadMapData();
    this.loadInsights();
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
    this.municpalityBudgetService.getInsights(params).subscribe(({ data }: any) => {
      this.insight = data;
    })
  }

  onStateChange(e) {
    this.loadInsights(e);
  }
}
