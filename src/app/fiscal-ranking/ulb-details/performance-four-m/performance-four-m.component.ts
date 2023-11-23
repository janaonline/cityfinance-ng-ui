import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-four-m',
  templateUrl: './performance-four-m.component.html',
  styleUrls: ['./performance-four-m.component.scss']
})
export class PerformanceFourMComponent implements OnInit {

  @Input() data;

  activeFilter = 'overAll';

  
  constructor() { }

  get ulb() {
    return this.data?.ulb;
  }

  get selectedRank() {
    return this.ulb?.[this.activeFilter]?.rank;
  }

  get activeFilterName() {
    return {
      overAll: 'Over All',
      resourceMobilization: 'Resource Mobilization',
      expenditurePerformance: 'Expenditure Performance',
      fiscalGovernance: 'Fiscal Governance'
    }[this.activeFilter];
  }



  ngOnInit(): void {
  }

}
