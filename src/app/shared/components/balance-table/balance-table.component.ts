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
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/util/BaseComponent/base_component";
import { CommonService } from "../../services/common.service";
import { BalanceTableService } from "./balance-table.service";
import { resolve } from "dns";
import { ulbType } from "src/app/dashboard/report/report/ulbTypes";

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
export class BalanceTableComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  // stateUlbData = JSON.parse(localStorage.getItem("ulbList"));
  // // stateData: any = this.stateUlbData;
  yearValue: any;
  yearSingleList: any;
  Types = new FormControl();
  dropYears = new FormControl();
  currency = new FormControl();

  years: any[];
  response: any;
  report: any[];
  reqYear: any;
  selectedCurrency: any;

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
    { id: "2016-2017", itemName: "2016-2017" },
    { id: "2015-2016", itemName: "2015-2016" },
  ];
  currencyList: { id: string; value: number; name: string }[] = [
    // { id: "1", value: 10000000, name: "INR Crore" },
    { id: "2", value: 1000, name: "INR Thousand" },
    { id: "3", value: 100000, name: "INR Lakhs" },
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
  @Input() cityId: any;
  reportGroup: any;
  isComparative: any = false;
  @ViewChild("template") template;
  dialogRef;
  type: string = "Summary";
  id = null;
  ulbList: any;
  singleState: any;

  balanceInput: any = {};

  singleTableData: any;
  multipleTableData: any;

  ulbIdval: any;
  ulbListVal: any;

  isLoading: any = false;
  showtable: any = false;

  singleUlbList: any;

  stateCode = JSON.parse(localStorage.getItem("ulbList")).data;
  ulbStateMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));

  constructor(
    protected reportService: ReportService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private balanceTabeleService: BalanceTableService
  ) {
    super();
    this.activatedRoute.queryParams.subscribe((val) => {
      console.log("val", val);
      const { cityId } = val;
      if (cityId) {
        console.log("stid", this.id);
        // this.id = this.cityId;
        this.id = cityId;
        sessionStorage.setItem("row_id", this.id);
      } else {
        this.id = sessionStorage.getItem("row_id");
      }
    });
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "39rem";
    this.dialogRef = this.dialog.open(this.template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
    });
    this.isComparative = true;
  }

  newUlbData: any;

  selectYearValue(event: any) {
    this.yearValue = event.value;
    console.log("yearValue", this.yearValue);
    this.years = this.yearValue.map((ele) => ele.itemName);
    this.newUlbData = this.ulbListVal.map((elem) => {
      return {
        ...elem,
        financialYear: [...this.years],
        state: elem?.state.name,
        stateId: elem?.state._id,
        ulb: elem?.ulbType._id,
        ulbType: elem?.ulbType.name,
      };
    });
    console.log(this.years);
  }

  selectCurrencyValue(event) {
    this.selectedCurrency = event.target.value;
    console.log("currency event", this.selectedCurrency);
  }

  closeModal() {
    this.dialogRef.close();
  }

  ulbVal(val) {
    this.ulbIdval = val;
    console.log("ulbVal", this.ulbIdval);
  }

  ulbValList(val) {
    this.ulbListVal = val;
    console.log("ulbListVal", this.ulbListVal);
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

  searchEnable() {
    if (this.ulbListVal && this.yearValue) {
      return false;
    }
    return true;
  }

  // getUlbList() {
  //   return new Promise<void>((resolve, reject) => {
  //     this.commonService.fetchBasicLedgerData().subscribe(
  //       (res) => {
  //         console.log("ulbRes", res);
  //         this.ulbList = res.data;
  //         resolve();
  //       },
  //       (err) => {
  //         console.log(err);
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  createUpdateTable(cityId = null) {
    if (cityId) this.id = cityId.currentValue;
    this.balanceInput.ulbList =
      this.stateCode[this.ulbStateMapping[this.id]].ulbs;
    // .filter((elem) => {
    //   if (elem?._id === this.id) {
    //     return elem;
    //   }
    // });
    this.balanceInput.ulbIds = [this.id];
    this.getBalanceTableData(this.balanceInput, true);
  }

  ExistingValues() {
  
    this.ulbIdval.push(this.id);
    let currentUlb = this.stateCode[this.ulbStateMapping[this.id]].ulbs.filter(
      (elem) => {
        if (elem?._id === this.id) {
          return elem;
        }
      }
    );
    this.ulbListVal.push(...currentUlb);
  }

  createMultipleUpdateTable() {
    
    this.showtable = true;
    // this.balanceInput.ulbList = this.newUlbData;

    this.balanceInput.ulbList = this.ulbListVal;
    this.balanceInput.ulbIds = this.ulbIdval;
    this.balanceInput.yearList = this.yearValue;
    this.balanceInput.years = this.years;
    console.log("multipleTableData", this.balanceInput);
    this.getBalanceTableData(this.balanceInput);
  }

  getBalanceTableData(inputValue, fromSingle = false) {
    if (this.reportGroup == "Balance Sheet") {
      this.reportService.BSDetailed(inputValue).subscribe((res) => {
        if (fromSingle) this.singleTableData = res.data;
        else {
          this.multipleTableData = res.data;

          console.log("sigleTableData", this.multipleTableData);
        }
        this.isLoading = true;
      });
    }
    if (this.reportGroup == "Income & Expenditure Statement") {
      this.reportService.ieDetailed(inputValue).subscribe((res) => {
        if (fromSingle) this.singleTableData = res.data;
        else {
          this.multipleTableData = res.data;

          console.log("sigleTableData", this.multipleTableData);
        }
        // this.singleTableData = res.data;
        console.log("sigleTableData", this.singleTableData);
        this.isLoading = true;
      });
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.name == "Balance Sheet") {
      this.reportGroup = "Balance Sheet";
    } else {
      this.reportGroup = "Income & Expenditure Statement";
    }
    this.balanceInput.isComparative = this.isComparative;
    this.balanceInput.type = this.type;
    this.balanceInput.reportGroup = this.reportGroup;
    this.balanceInput.valueType = "absolute";
    if (this.years) {
      if (this.data.name) {
        this.createMultipleUpdateTable();
        console.log("Multple Changes", changes);
      }
    } else {
      if (!changes.cityId?.firstChange || this.data.name) {
        this.createUpdateTable(changes.cityId);
      }
    }
  }
}
