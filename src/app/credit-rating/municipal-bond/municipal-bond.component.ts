import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ExcelService } from '../../dashboard/report/excel.service';
import { ICell, IIExcelInput } from '../../dashboard/report/models/excelFormat';
import { MunicipalBondsService } from '../../shared/services/municipal/municipal-bonds.service';
import { IBondIssuer } from './models/bondIssuerResponse';
import { IBondIssuerItem, IBondIssureItemResponse } from './models/bondIssureItemResponse';
import { IULBResponse } from './models/ulbsResponse';

// import {LinkConverterPipe } from '@angular/common'
@Component({
  selector: "app-municipal-bond",
  templateUrl: "./municipal-bond.component.html",
  styleUrls: ["./municipal-bond.component.scss"]
})
export class MunicipalBondComponent implements OnInit {
  filterForm: FormGroup;
  ulbFilteredByName: any[];
  originalULBList: IULBResponse["data"];
  yearsAvailable: { name: string }[] = [];
  yearsDropdownSettings = {
    singleSelection: false,
    text: "Select Year/s",
    enableSearchFilter: false,
    badgeShowLimit: 1,
    showCheckbox: true,
    labelKey: "name",
    primaryKey: "name"
  };

  ulbDropdownConfiguration = {
    primaryKey: "name",
    singleSelection: false,
    text: "Select ULB/s",
    enableSearchFilter: true,
    badgeShowLimit: 1,
    labelKey: "name",
    showCheckbox: true,
    noDataLabel: "No Data available",
    classes: "ulbDropdown"
  };

  mainRows: IBondIssuer;
  bondIssuerItemData: IBondIssuerItem[];

  accordianHeaderFormattedName: { [originalHeader: string]: string } = {};
  object = Object;

  formattedNamesMapping: { [nameIdentifier: string]: string } = {};
  private regexToSplitWordOnCapitalLetters = /([A-Z]+[^A-Z]*|[^A-Z]+)/;

  constructor(
    private _formBuilder: FormBuilder,
    private _bondService: MunicipalBondsService,
    private _excelService: ExcelService
  ) {
    this.initializeForm();
    this.initializeFormListeners();
    this._bondService
      .getBondIssuer()
      .subscribe(res => this.onGettingBondIssuerSuccess(res));
    this._bondService
      .getBondIssuerItem()
      .subscribe(res => this.onGettingBondIssuerItemSuccess(res));
    this._bondService
      .getULBS()
      .subscribe(res => this.onGettingULBResponseSuccess(res));
  }

  private onGettingBondIssuerSuccess(res: IBondIssuer) {
    Object.keys(res).forEach(name => {
      const capitalizedName = this.capitalizedName(name);
      this.formattedNamesMapping[name] = capitalizedName;
      res[name].forEach(name => {
        const formattedName = this.capitalizedName(name);
        this.formattedNamesMapping[name] = formattedName;
      });
    });
    this.mainRows = res;
  }

  private onGettingBondIssuerItemSuccess(
    data: IBondIssureItemResponse["data"]
  ) {
    this.bondIssuerItemData = data;
  }

  private onGettingULBResponseSuccess(response: IULBResponse) {
    this.originalULBList = response.data;
    this.ulbFilteredByName = response.data;
    this.yearsAvailable = this.getUniqueYearsFromULBS(
      response.data
    ).map(year => ({ name: year }));
  }

  private capitalizedName(originalName: string) {
    const formattedName = originalName
      .split(this.regexToSplitWordOnCapitalLetters)
      .join(" ")
      .trim();

    return formattedName[0].toUpperCase() + formattedName.substring(1);
    // formattedName.trim();
  }

  ngOnInit() {}

  onSubmittingFilterForm() {
    const params = this.createParamsForssuerItem(this.filterForm.value);
    this._bondService.getBondIssuerItem(params).subscribe(res => {
      this.onGettingBondIssuerItemSuccess(res);
    });
  }

  onClickDownload() {
    const firstRow = [this.createCSVFileHeaders()];
    const subHeaders = this.createSubHeader();
    const finalRow = firstRow.concat(subHeaders);
    const currentDate = new Date().toLocaleDateString();
    const obj: IIExcelInput = {
      rows: finalRow,
      fileName: `Municipal Bond ${currentDate}`,
      skipStartingColumns: 1,
      skipStartingRows: 3,
      fontSize: 10
    };
    console.log(finalRow);
    this._excelService.downloadJSONAs(obj);
  }

  private createCSVFileHeaders(): ICell[] {
    const ulbNames = this.bondIssuerItemData.map(ulb => ({
      text: ulb.ulb,
      bold: true
    }));
    return [{ text: "Issuer", bold: true }, ...ulbNames];
  }

  private createSubHeader() {
    let array = [];
    Object.keys(this.mainRows).forEach(key => {
      const config = {
        text: this.formattedNamesMapping[key],
        colorWholeRow: true,
        bold: true,
        backgroundColor: "F8CBAD"
      };

      const subHeaderRow = [config];

      array.push(subHeaderRow);
      const detailRows = this.mainRows[key].map(subRow => {
        const detailColumns = {
          text: this.formattedNamesMapping[subRow]
        };

        const ulbDataCoulmns = this.bondIssuerItemData.map(ulb => ({
          text: ulb[subRow]
        }));
        return [detailColumns, ...ulbDataCoulmns];
      });
      array = array.concat(detailRows);
    });
    return array;
  }

  private createParamsForssuerItem(obj: {
    ulbs: { name: string }[];
    years: { name: string }[];
  }) {
    return {
      ulbs: obj.ulbs ? obj.ulbs.map(ulb => ulb.name) : [],
      years: obj.years ? obj.years.map(year => year.name) : []
    };
  }

  onClickingULBAutoComplete(ulbClicked: any) {
    console.log(this.filterForm.value);
    console.log({ ulbClicked });
  }

  onDateSelectionClose() {
    console.log("date selection closed");
    console.log(this.filterForm.value);
  }

  unselectAllYears() {
    console.log("unselect all years");
    console.log(this.filterForm.value);
  }

  private initializeFormListeners() {
    this.filterForm.controls["ulbs"].valueChanges.subscribe(newValue => {
      const uniqueYears = this.getUniqueYearsFromULBS(newValue);
      this.yearsAvailable = uniqueYears.map(year => ({ name: year }));
    });

    this.filterForm.controls["years"].valueChanges.subscribe(yearList => {
      if (
        !this.filterForm.controls["ulbs"].value ||
        !this.filterForm.controls["ulbs"].value.length
      ) {
        if (!yearList.length) {
          this.ulbFilteredByName = this.originalULBList;
        } else {
          this.ulbFilteredByName = this.getULBHavingYears(
            yearList,
            this.originalULBList
          );
        }
        console.log(yearList, this.ulbFilteredByName, this.originalULBList);
        // console.log(this.ulbFilteredByName);
      }
    });
  }

  private getULBHavingYears(
    yearList: { name: string }[],
    ulbList: IULBResponse["data"]
  ) {
    return ulbList.filter(
      ulb =>
        ulb.years &&
        yearList.some(
          yearToFind => !!ulb.years.find(ulbYear => ulbYear === yearToFind.name)
        )
    );
  }

  private getUniqueYearsFromULBS(ulbs: IULBResponse["data"]) {
    const uniqueYears = new Set<string>();
    ulbs.forEach(ulb => {
      if (!ulb.years) {
        return;
      }
      ulb.years.forEach(year => uniqueYears.add(year));
    });
    return Array.from(uniqueYears);
  }

  private getULBFitleredBy(ulbName: string) {}

  private initializeForm() {
    this.filterForm = this._formBuilder.group({
      ulbs: [null],
      years: [null]
    });
  }
}
