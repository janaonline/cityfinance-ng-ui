import { Component, Input, OnInit } from '@angular/core';
import { getPopulationCategory } from 'src/app/util/common';
import { FiscalRankingService } from '../../fiscal-ranking.service';
import { ColorDetails } from '../../india-map/india-map.component';

export interface Service {
  name: string;
  key: string;
  isApproved: boolean;
}

export interface Category {
  title: string;
  services: Service[];
}


@Component({
  selector: 'app-ulb-details-header',
  templateUrl: './ulb-details-header.component.html',
  styleUrls: ['./ulb-details-header.component.scss']
})
export class UlbDetailsHeaderComponent implements OnInit {


  @Input() data;

  colorCoding: any[];

  colorDetails: ColorDetails[] = [];
  markers = [];

  constructor(private fiscalRankingService: FiscalRankingService) { }

  ngOnInit(): void {
    this.getStateWiseForm();

  }

  get ulb() {
    return this.data?.ulb;
  }

  get fsData() {
    return this.data?.fsData;
  }

  get categories(): Category[] {
    return [
      {
        title: 'Service Handling',
        services: [
          { name: 'Water Supply Services', key: 'waterSupply' },
          { name: 'Sanitation Service Delivery', key: 'sanitationService' }
        ]
      },
      {
        title: 'Property Tax Details',
        services: [
          { name: 'Property Tax Includes Water Tax', key: 'propertyWaterTax' },
          { name: 'Property Tax Includes Sanitation/Sewerage Tax', key: 'sanitationService' },
          { name: 'Property Tax Register GIS-based', key: 'registerGis' }
        ]
      },
      {
        title: 'Technology Usage',
        services: [
          { name: 'Accounting Software Used', key: 'accountStwre' }
        ]
      }
    ].map(section => ({
      ...section,
      services: section.services.map(service => ({
        ...service,
        isApproved: this.data?.fsData?.[service.key]?.value?.toLowerCase() == 'yes'
      }))
    }));
  }

  get populationCategory() {
    return getPopulationCategory(this.ulb?.population)
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
        if (item.stateId == '5dcf9d7416a06aed41c748f0') {
          item.color = '#FFF0E0';
        }
      })
    });
  }


}
