import { Component, Input, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-shared-compare-table",
  templateUrl: "./shared-compare-table.component.html",
  styleUrls: ["./shared-compare-table.component.scss"],
})
export class SharedCompareTableComponent implements OnInit {
  @Input() tableData: any;
  @Input() ulbListVal: any;
  @Input() years: any;
  @Input() selectedCurrency: any;

  fyList: [];
  finalData: any = [];
  tableShow = true;
  figurString = "Crores";

  constructor() {}

  ngOnInit(): void {
    this.getFyList();
    console.log(
      "all data",
      this.tableData,
      this.ulbListVal,
      this.years,
      this.fyList
    );
  }

  checkVal: any = false;

  lastTableData: [];

  changeVal() {
    this.checkVal = !this.checkVal;
    this.dataSlice(this.finalData);
  }

  dataSlice(val: any) {
    if (!this.checkVal) {
      this.lastTableData = val.slice(0, 10);
      // this.finalData = val.slice(0, 10);
    } else {
      this.lastTableData = val;
    }
    console.log("this.finalData", this.finalData, this.checkVal);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tableData && changes.tableData.currentValue) {
      this.tableData = changes.tableData.currentValue;
      console.log("changes", changes, this.tableData);

      this.getMultipleTableData();
    }
    if (changes && changes.selectedCurrency) {
      console.log("currencyChanges", changes);
      this.getMultipleTableData();
      this.getStringValue();
    }
  }

  getStringValue() {
    if (this.selectedCurrency == "10000000") {
      this.figurString = "Crores";
    } else if (this.selectedCurrency == "1000") {
      this.figurString = "Thousands";
    } else if (this.selectedCurrency == "100000") {
      this.figurString = "Lakhs";
    }

    console.log("this.figureString", this.figurString);
  }

  getFyList() {
    this.fyList = this.years.map((elem) => {
      let year = elem?.split("-")[0];
      let lastValue = year.split("").slice(2).join("");
      let finalYear = year + "-" + (parseInt(lastValue) + 1);
      console.log("year", finalYear);
      return finalYear;
    });
  }

  getMultipleTableData() {
    for (const item of this.tableData) {
      for (const budget of item.budget) {
        let newKey = `${item.ulb_code}${budget.year}`;
        let dividervalue: any;
        if (this.selectedCurrency) {
          // debugger;
          dividervalue = parseInt(this.selectedCurrency);
        } else {
          dividervalue = 10000000;
        }
        let newAmount = budget.amount / dividervalue;
        item[newKey] = newAmount;
      }
    }
    if (this.tableData?.length) {
      this.prepareFinalData();
    }
  }

  prepareFinalData() {
    let dataValue = [];
    for (const data of this.tableData) {
      let obj = {};
      let duplicateDataSource = this.tableData.filter(
        (item) => item.code == data.code
      );
      if (duplicateDataSource?.length) {
        for (const duplicate of duplicateDataSource) {
          obj = { ...obj, ...duplicate };
        }
      }
      dataValue.push(obj);
      console.log("duplicateDataSource", duplicateDataSource);
    }
    this.finalData = this.getUniqueData(JSON.parse(JSON.stringify(dataValue)));
    console.log("finalData", this.finalData);
  }

  getUniqueData(dataValue: any) {
    console.log("dataValue", dataValue);
    let map = new Map();
    let filterData = [];
    for (const item of dataValue) {
      if (!map.has(item.code)) {
        // set any value to Map
        map.set(item.code, true);
        filterData.push(item);
      }
    }
    return filterData;
  }
}
