import { Component, OnInit } from "@angular/core";

export interface PeriodicElement {
  name: number;
  figures: string;
  weight: number;
  symbol: number;
  symbol1: number;
  symbol2: number;
  symbol3: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    figures: "Liabilities",
    name: 200000,
    weight: 1.0079,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Reserves & Surplus",
    name: 200000,
    weight: 4.0026,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Grants, Contribution For Specific Purposes",
    name: 200000,
    weight: 6.941,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Loans",
    name: 200000,
    weight: 9.0122,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Current Liabilities & Provisions",
    name: 200000,
    weight: 10.811,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Others",
    name: 200000,
    weight: 12.0107,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "Grants, Contribution For Specific Purposes",
    name: 200000,
    weight: 14.0067,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
  {
    figures: "others",
    name: 200000,
    weight: 15.9994,
    symbol: 200000,
    symbol1: 200000,
    symbol2: 200000,
    symbol3: 200000,
  },
];

@Component({
  selector: "app-shared-compare-table",
  templateUrl: "./shared-compare-table.component.html",
  styleUrls: ["./shared-compare-table.component.scss"],
})
export class SharedCompareTableComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [
    "figures",
    "name",
    "weight",
    "symbol",
    "symbol1",
    "symbol2",
    "symbol3",
  ];

  constructor() {}

  ngOnInit(): void {}
}
