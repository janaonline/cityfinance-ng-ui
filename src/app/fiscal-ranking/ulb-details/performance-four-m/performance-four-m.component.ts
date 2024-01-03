import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { getPopulationCategory, PopulationCategory } from 'src/app/util/common';

type ActiveFilter = 'overAll' | 'resourceMobilization' | 'expenditurePerformance' | 'fiscalGovernance';

@Component({
  selector: 'app-performance-four-m',
  templateUrl: './performance-four-m.component.html',
  styleUrls: ['./performance-four-m.component.scss']
})
export class PerformanceFourMComponent implements OnInit {

  @Input() data;

  activeFilter: ActiveFilter  = 'overAll';
  populationCategory: PopulationCategory;

  ulb: any;
  selectedRank: string;


  get activeFilterName() {
    return {
      overAll: 'Over All',
      resourceMobilization: 'Resource Mobilization',
      expenditurePerformance: 'Expenditure Performance',
      fiscalGovernance: 'Fiscal Governance'
    }[this.activeFilter];
  }


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) this.updateInputDataDependencies();
  }

  updateInputDataDependencies() {
    this.ulb = this.data?.ulb;
    this.selectedRank = this.ulb?.[this.activeFilter]?.rank;
    this.populationCategory = getPopulationCategory(this.ulb?.population);
  }

}
