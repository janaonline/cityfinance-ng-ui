import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grant-claims',
  templateUrl: './grant-claims.component.html',
  styleUrls: ['./grant-claims.component.scss']
})
export class GrantClaimsComponent implements OnInit {

  financial_year;
  constructor() {
    this.financial_year =JSON.parse(localStorage.getItem('Years'))
  }


  ngOnInit(): void {
    console.log('years1', this.financial_year)
    this.financial_year = Object.entries(this.financial_year);
    console.log('years2', this.financial_year)
  }

}
