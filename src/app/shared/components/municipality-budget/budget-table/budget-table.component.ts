import { Component, OnInit } from '@angular/core';
import { MunicipalityBudgetService } from '../municipality-budget.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {

  budgetData: any[] = [];

  constructor(
    private municipalityBudgetsService: MunicipalityBudgetService
  ) { }

  ngOnInit(): void {
    this.municipalityBudgetsService.get().subscribe(({ data }: any) => {
      this.budgetData = data.slice(0, 10);
    })
  }

}
