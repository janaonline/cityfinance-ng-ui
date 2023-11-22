import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService } from '../fiscal-ranking.service';

@Component({
  selector: 'app-annual-budgets',
  templateUrl: './annual-budgets.component.html',
  styleUrls: ['./annual-budgets.component.scss']
})
export class AnnualBudgetsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Annual budgets',
      url: '/rankings/annual-budgets',
      class: 'disabled'
    }
  ];

  table = {
    response: {}
  };

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.fiscalRankingService.annualBudgets().subscribe((res: any) => {
      this.table.response = res.data;
    })
  }

}
