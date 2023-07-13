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

  loadInsights() {
    this.municpalityBudgetService.getInsights().subscribe(({ data }: any) => {
      this.insight = data;
    })
  }

}
