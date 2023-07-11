import { Component, OnInit } from '@angular/core';
import { FiscalRankingService, MapData } from 'src/app/fiscal-ranking/fiscal-ranking.service';

@Component({
  selector: 'app-municipality-budget',
  templateUrl: './municipality-budget.component.html',
  styleUrls: ['./municipality-budget.component.scss']
})
export class MunicipalityBudgetComponent implements OnInit {

  details: any[] = [];
  perPage: number = 10;
  mapData: MapData;

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.loadMapData();
  }

  onPerPageChange() {
    
  }

  loadMapData(params = {}) {
    this.fiscalRankingService.getStateWiseForm(params).subscribe(res => {
      console.log('map', res);
      this.mapData = res?.data;
    })
  }

}
