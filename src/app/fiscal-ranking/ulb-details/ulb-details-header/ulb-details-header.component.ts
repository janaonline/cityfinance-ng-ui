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
  markers = [];

  constructor(private fiscalRankingService: FiscalRankingService) { }

  ngOnInit(): void {
    this.getStateWiseForm();
  }

  getStateWiseForm() {
    this.fiscalRankingService.getStateWiseForm().subscribe(res => {
      this.markers = [
        {
          x: 28.6139, 
          y: 77.2090,
          text: 'hi'
        }
      ];

      for (let i = 0; i < 10; i++) {
        this.markers.push({
          x: Math.random() * 20 + 10, 
          y: Math.random() * 40 + 50,
          text: 'hardcoded'
        });
      }

      this.colorCoding = res?.data.heatMaps;
      this.colorCoding?.forEach(item => {
        if(item.stateId == '5dcf9d7416a06aed41c748f0') {
          item.color = '#FFF0E0';
        }
      })
    });
  }


}
