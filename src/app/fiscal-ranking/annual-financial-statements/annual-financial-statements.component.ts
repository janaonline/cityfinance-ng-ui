import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';
import { FiscalRankingService } from '../fiscal-ranking.service';

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

  table = {
    response: {  }
  };

  constructor(
    private fiscalRankingService: FiscalRankingService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.fiscalRankingService.auditedAccounts().subscribe((res: any) => {
      this.table.response = res.data;
    })
  }

}
