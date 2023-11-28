import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ulb-details-assessment-parameters',
  templateUrl: './ulb-details-assessment-parameters.component.html',
  styleUrls: ['./ulb-details-assessment-parameters.component.scss']
})
export class UlbDetailsAssessmentParametersComponent implements OnInit {

  @Input() tables;

  activeFilter: 'resourceMobilization' | 'expenditurePerformance' | 'fiscalGovernance' = 'resourceMobilization'

  constructor() { }

  ngOnInit(): void {
  }

  get table() {
    return {
      response: this.tables?.[this.activeFilter]
    }
  }

}
