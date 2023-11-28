import { Component, Input, OnInit } from '@angular/core';
import { getPopulationCategory } from 'src/app/util/common';
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

  colorDetails: ColorDetails[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  get ulb() {
    return this.data?.ulb;
  }

  get fsData() {
    return this.data?.fsData;
  }

  get markers() {
    const { lat, lng } = this.ulb?.location;
    return [{ lat, lng, name: this.ulb?.name }];
  }

  get colorCoding() {
    return [{
      "_id": this.ulb?.stateName,
      "stateId": this.ulb.state,
      "code": this.ulb?.stateCode,
      "color": "#FFF0E0"
    }];
  };

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
}
