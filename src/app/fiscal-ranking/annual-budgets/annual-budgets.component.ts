import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService, Table } from '../fiscal-ranking.service';

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


  table: Table = {
    endpoint: 'scoring-fr/states/annualBudgets',
    response: null,
  };

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.loadData(this.table);
  }

  onUpdate(table, event) {
    this.loadData(table, event?.queryParams);
  }

  loadData(table: Table, queryParams: string = '') {
    this.fiscalRankingService.getTableResponse(table.endpoint, queryParams, table?.response?.columns, 'data', {}).subscribe(res => {
      this.table.response = res.data;
    })
  }
}
