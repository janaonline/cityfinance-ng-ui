import { Component, OnInit } from '@angular/core';
import { MunicipalityBudgetService } from '../municipality-budget.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {

  documents: {
    name: string;
    url: string;
    type: 'pdf';
    modifiedAt: string;
  }[] = [];

  constructor(
    private municipalityBudgetsService: MunicipalityBudgetService
  ) { }

  ngOnInit(): void {
    this.municipalityBudgetsService.getDocuments().subscribe(({ data }: any) => {
      this.documents = data;
    })
  }

}
