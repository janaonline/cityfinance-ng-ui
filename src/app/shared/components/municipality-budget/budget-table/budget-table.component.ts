import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {

  budgetData: any[] = [
    {
      name: "First",
      updatedAt: "20-06-2023"
    },
    {
      name: "Second",
      updatedAt: "20-06-2023"
    },
    {
      name: "Third",
      updatedAt: "20-06-2023"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
