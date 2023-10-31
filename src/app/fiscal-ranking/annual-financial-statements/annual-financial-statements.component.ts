import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

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
      url: '/rankings/annual-financial-statements'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
