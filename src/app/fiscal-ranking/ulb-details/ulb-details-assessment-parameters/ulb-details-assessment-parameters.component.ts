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
      For 10a &b, 'Yes' means Timely Audit Closure & Publication of Audited Annual Accounts in public domain (on Cityfinance.in / ULB’s own website), for 3 years. If yes, the marks allotted are 25.
      <br />
      For 11a & b, 'Yes' means Property Tax & Accounting System followed - Manual vs IT-based? If yes, the marks allotted are 25.
    `: '';
  }

  get table() {
    return {
      response: this.tables?.[this.activeFilter]
    }
  }

}
