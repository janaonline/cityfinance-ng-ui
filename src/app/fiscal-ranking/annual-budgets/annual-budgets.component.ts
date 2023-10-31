import { Component, OnInit } from '@angular/core';
import { BreadcrumbLink } from '../breadcrumb/breadcrumb.component';

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
      label: 'Annual Budgets',
      url: '/rankings/annual-budgets'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
