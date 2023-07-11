import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-municipality-budget',
  templateUrl: './municipality-budget.component.html',
  styleUrls: ['./municipality-budget.component.scss']
})
export class MunicipalityBudgetComponent implements OnInit {

  details: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
