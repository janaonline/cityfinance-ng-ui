import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-sets',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.css']
})
export class DataSetsComponent implements OnInit {

  constructor() { }
  filterComponent;
  tabData = [
    {
       name: "Income Statement",
       filter: ["innerTab1", "innerTab2", "innerTab3"],
       link: 'income_statement'
      },
    {
       name: "Balance Sheet",
       filter: ["innerTab4", "innerTab5", "innerTab6"],
       link: 'balanceSheet' ,
    },
   

  ];
  ngOnInit(): void {
    this.filterComponent ={
      comp: 'dataSets'
    }
  }

  filterData(e){
    console.log('Data sets', e);

  }
}
