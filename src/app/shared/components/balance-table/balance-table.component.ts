import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReportHelperService } from "src/app/dashboard/report/report-helper.service";
import { IReportType } from "src/app/models/reportType";
import { ReportService } from "../../../dashboard/report/report.service";
import { GlobalLoaderService } from "../../services/loaders/global-loader.service";
export interface PeriodicElement {
  name: number;
  figures: string;
  weight: number;
  symbol: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { figures: "Liabilities", name: 200000, weight: 1.0079, symbol: 200000 },
  {
    figures: "Reserves & Surplus",
    name: 200000,
    weight: 4.0026,
    symbol: 200000,
  },
  {
    figures: "Grants, Contribution For Specific Purposes",
    name: 200000,
    weight: 6.941,
    symbol: 200000,
  },
  { figures: "Loans", name: 200000, weight: 9.0122, symbol: 200000 },
  {
    figures: "Current Liabilities & Provisions",
    name: 200000,
    weight: 10.811,
    symbol: 200000,
  },
  { figures: "Others", name: 200000, weight: 12.0107, symbol: 200000 },
  {
    figures: "Grants, Contribution For Specific Purposes",
    name: 200000,
    weight: 14.0067,
    symbol: 200000,
  },
  { figures: "others", name: 200000, weight: 15.9994, symbol: 200000 },
];

@Component({
  selector: "app-balance-table",
  templateUrl: "./balance-table.component.html",
  styleUrls: ["./balance-table.component.scss"],
})
export class BalanceTableComponent implements OnInit, OnChanges {
  // stateUlbData = JSON.parse(localStorage.getItem("ulbList"));
  // // stateData: any = this.stateUlbData;
  yearValue: any;
  yearSingleList: any;
  Types = new FormControl();
  dropYears = new FormControl();
  currency = new FormControl();

  years: any;
  response: any;
  report: any[];
  reqYear: any;

  typeList: { id: string; name: string }[] = [
    { id: "1", name: "One" },
    { id: "2", name: "two" },
    { id: "3", name: "three" },
    { id: "4", name: "Four" },
  ];
  yearsList: { id: string; itemName: string }[] = [
    { id: "2020-2021", itemName: "2020-2021" },
    { id: "2019-2020", itemName: "2019-2020" },
    { id: "2018-2019", itemName: "2018-2019" },
    { id: "2017-2018", itemName: "2017-2018" },
  ];
  currencyList: { id: string; name: string }[] = [
    { id: "1", name: "INR" },
    { id: "2", name: "INR Thousand" },
    { id: "3", name: "INR Lakhs" },
    { id: "4", name: "INR Thousand" },
  ];

  balanceTableHead: string[] = [
    "*Figures mentioned are in Rs. Crores",
    "2015-2016",
    "2016-2017",
    "2017-2018",
    "2018-2019",
    "2019-2020",
  ];
  displayedColumns: string[] = ["figures", "name", "weight", "symbol"];
  dataSource = ELEMENT_DATA;
  reportReq: IReportType;
  @Input() data: any;
  reportGroup: any;
  isComparative: any = false;
  @ViewChild("template") template;
  dialogRef;
  type: string = "Summary";
  constructor(
    protected reportService: ReportService,
    public dialog: MatDialog,
    private _loaderService: GlobalLoaderService,
    private reportHelper: ReportHelperService
  ) {}
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "39rem";
    this.dialogRef = this.dialog.open(this.template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
    this.isComparative = true;
  }

  selectYearValue(event: any) {
    this.yearValue = event.value;
    console.log("yearValue", this.yearValue);
    this.years = this.yearValue.map((ele) => ele.id);
    console.log(this.years);
  }

  closeModal() {
    this.dialogRef.close();
  }

  inputVal: any = {
    isComparative: false,
    type: "Summary",
    years: ["2015-16", "2016-17"],
    yearList: [
      { id: "2015-16", itemName: "2015-16" },
      { id: "2016-17", itemName: "2016-17" },
    ],
    reportGroup: "Income & Expenditure Statement",
    ulbList: [
      {
        population: 50151,
        ulbType: "Municipality",
        code: "AP105",
        financialYear: ["2016-17", "2015-16"],
        ulb: "5e4643c247cb2749e5a56b3f",
        name: "Allagadda Municipality",
        _id: "5e4643c247cb2749e5a56b3f",
        state: "Andhra Pradesh",
        stateId: "5dcf9d7216a06aed41c748dd",
      },
      {
        population: 263898,
        ulbType: "Municipal Corporation",
        code: "AP004",
        financialYear: ["2018-19", "2017-18", "2016-17", "2015-16"],
        ulb: "5e4643c247cb2749e5a56b39",
        name: "Anantapur Municipal Corporation",
        _id: "5e4643c247cb2749e5a56b39",
        state: "Andhra Pradesh",
        stateId: "5dcf9d7216a06aed41c748dd",
      },
      {
        population: 33000,
        ulbType: "Municipality",
        code: "AP005",
        financialYear: ["2016-17", "2015-16"],
        ulb: "5dd24729437ba31f7eb42ea6",
        name: "Atmakur Municipality",
        _id: "5dd24729437ba31f7eb42ea6",
        state: "Andhra Pradesh",
        stateId: "5dcf9d7216a06aed41c748dd",
      },
    ],
    ulbIds: [
      "5e4643c247cb2749e5a56b3f",
      "5e4643c247cb2749e5a56b39",
      "5dd24729437ba31f7eb42ea6",
    ],
    valueType: "absolute",
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.name == "Balance Sheet") {
      this.reportGroup = "Balance Sheet";
    } else {
      this.reportGroup = "Income & Expenditure Statement";
    }
    console.log("this.data", this.reportGroup, this.isComparative);
  }

  ngOnInit() {
    this.reportService
      .ieDetailed(this.inputVal)
      .subscribe((res) => console.log("res", res));
  }
}
