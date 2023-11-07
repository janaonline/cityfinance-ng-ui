import { Component, OnInit } from '@angular/core';
import { FiscalRankingService } from '../../fiscal-ranking.service';
import { ColorDetails } from '../../india-map/india-map.component';

@Component({
  selector: 'app-ulb-details-header',
  templateUrl: './ulb-details-header.component.html',
  styleUrls: ['./ulb-details-header.component.scss']
})
export class UlbDetailsHeaderComponent implements OnInit {


  colorCoding: any[];

  colorDetails: ColorDetails[] = [];

  constructor(private fiscalRankingService: FiscalRankingService) { }

  ngOnInit(): void {
    this.getStateWiseForm();
  }

  getStateWiseForm() {
    this.fiscalRankingService.getStateWiseForm().subscribe(res => {
      this.colorCoding = res?.data.heatMaps;
      this.colorCoding?.forEach(item => {
        if(item.stateId == '5dcf9d7416a06aed41c748f0') {
          item.color = '#FFF0E0';
        }
      })
    });
  }


}
