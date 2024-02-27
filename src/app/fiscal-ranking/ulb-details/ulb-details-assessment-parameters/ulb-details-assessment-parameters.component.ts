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

  get footnotes() {
    return this.activeFilter == 'fiscalGovernance' ? `
      Note:  <br />
      For 10a &b, 'Yes' means the average time taken for the ULB to close their audit is less than 12 months in a financial year. If yes, the marks allotted are 25. 
      <br />
      For 11a & b, if the answer to this question is 'Yes', the ULB will be awarded 25 marks.
    `: '';
  }

  get table() {
    return {
      response: this.tables?.[this.activeFilter]
    }
  }

}
