import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService, Table } from '../fiscal-ranking.service';

@Component({
  selector: 'app-annual-financial-statements',
  templateUrl: './annual-financial-statements.component.html',
  styleUrls: ['./annual-financial-statements.component.scss']
})
export class AnnualFinancialStatementsComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: 'City Finance Ranking - Home',
      url: '/rankings/home'
    },
    {
      label: 'Annual financial statements',
      url: '/rankings/annual-financial-statements',
      class: 'disabled'
    }
  ];

  table = { response: null };

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.loadData(this.table);
  }


  onUpdate(table, event) {
    console.log({
      table, event
    })

    this.loadData(table, event?.queryParams);

  }

  loadData(table, queryParams: string = '') {
    this.fiscalRankingService.auditedAccounts(queryParams, table?.response?.columns).subscribe((res: any) => {
      this.table.response = res.data;
    })
  }

}
