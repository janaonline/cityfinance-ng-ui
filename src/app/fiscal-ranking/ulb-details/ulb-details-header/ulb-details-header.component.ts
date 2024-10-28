import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getPopulationCategory, PopulationCategory } from 'src/app/util/common';
import { ColorDetails, Marker } from '../../india-map/india-map.component';

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
export class UlbDetailsHeaderComponent implements OnInit, OnChanges {
  @Input() data;

  colorDetails: ColorDetails[] = [];
  markers: Marker[] = [];
  categories: Category[] = [];
  populationCategory: PopulationCategory;
  fsData: any;
  ulb: any;
  colorCoding: any[] = [];

  categoryMappersData = [
    {
      title: 'Service Handling',
      services: [
        { name: '1. Water Supply Services', key: 'waterSupply' },
        { name: '2. Sanitation Service Delivery', key: 'sanitationService' }
      ]
    },
    {
      title: 'Property Tax Details',
      services: [
        { name: '3. Property Tax Includes Water Tax', key: 'propertyWaterTax' },
        { name: '4. Property Tax Includes Sanitation/Sewerage Tax', key: 'sanitationService' },
        { name: '5. Property Tax Register GIS-based', key: 'registerGis' }
      ]
    },
    {
      title: 'Technology Usage',
      services: [
        { name: '6. Accounting Software Used', key: 'accountStwre' }
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) this.updateInputDataDependencies();
  }

  private updateInputDataDependencies() {
    console.log('data updated', this.data)
    this.ulb = this.data?.ulb;
    this.fsData = this.data?.fsData;
    this.colorCoding = [{
      "_id": this.ulb?.stateName,
      "stateId": this.ulb.state,
      "code": this.ulb?.stateCode,
      "color": "#FFF0E0"
    }];

    const { lat, lng } = this.ulb?.location;
    this.markers = [{ lat, lng, name: this.ulb?.name }];
    this.populationCategory = getPopulationCategory(this.ulb?.population);
    this.categories = this.getCategories();
  }

  private getCategories(): Category[] {
    return this.categoryMappersData.map(section => ({
      ...section,
      services: section.services.map(service => ({
        ...service,
        isApproved: this.data?.fsData?.[service.key]?.value?.toLowerCase() == 'yes'
      }))
    }));
  }
}
