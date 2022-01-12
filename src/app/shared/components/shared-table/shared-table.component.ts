import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";


const ELEMENT_DATA = [
  {
    figures: "Liabilities",
    "2015-16": 200000,
    "2016-17": 1.0079,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Reserves & Surplus",
    "2015-16": 200000,
    "2016-17": 4.0026,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Grants, Contribution For Specific Purposes",
    "2015-16": 200000,
    "2016-17": 6.941,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Loans",
    "2015-16": 200000,
    "2016-17": 9.0122,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Current Liabilities & Provisions",
    "2015-16": 200000,
    "2016-17": 10.811,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Others",
    "2015-16": 200000,
    "2016-17": 12.0107,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "Grants, Contribution For Specific Purposes",
    "2015-16": 200000,
    "2016-17": 14.0067,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
  {
    figures: "others",
    "2015-16": 200000,
    "2016-17": 15.9994,
    "2017-18": 200000,
    "2018-19": 200000,
    "2019-20": 200000,
  },
];

@Component({
  selector: "app-shared-table",
  templateUrl: "./shared-table.component.html",
  styleUrls: ["./shared-table.component.scss"],
})
export class SharedTableComponent implements OnInit, OnChanges {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [
    "figures",
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
  ];

  @Input() tableData: any = ELEMENT_DATA;

  checkVal: any = false;

  changeVal() {
    this.checkVal = !this.checkVal;
    this.dataSlice(this.tableData);
  }

  finalData: any = [];

  dataSlice(val: any) {
    if (!this.checkVal) {
      this.finalData = val.slice(0, 10);
    } else {
      this.finalData = val;
    }
    console.log("this.finalData", this.finalData, this.checkVal);
  }

  isSticky(column: string): boolean {
    return column === "figures" ? true : false;
  }

  constructor() {}

  getAmountVal() {
    this.tableData = this.tableData?.map((element) => {
      let temp = {
        "2015-16": "N/A",
        "2016-17": "N/A",
        "2017-18": "N/A",
        "2018-19": "N/A",
        "2019-20": "N/A",
      };
      element.budget.map((value) => {
        temp[value.year] = value.amount || "N/A";
      });
      return (element = { ...element, ...temp });
    });
    this.dataSlice(this.tableData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAmountVal();
    // if (!changes.finalData.firstChange) this.dataSlice(this.tableData);
    console.log("uniquetableData", this.tableData, this.finalData);
  }

  ngOnInit(): void {
    // console.log("uniquetableData", this.tableData);
  }
}
