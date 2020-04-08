import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ExcelService} from '../../dashboard/report/excel.service';
import {ICell, IIExcelInput} from '../../dashboard/report/models/excelFormat';
import {MunicipalBondsService} from '../../shared/services/municipal/municipal-bonds.service';
import {IBondIssuer} from './models/bondIssuerResponse';
import {IBondIssuerItem, IBondIssureItemResponse} from './models/bondIssureItemResponse';
import {IULBResponse, ULB} from './models/ulbsResponse';

// import {LinkConverterPipe } from '@angular/common'
@Component({
  selector: 'app-municipal-bond',
  templateUrl: './municipal-bond.component.html',
  styleUrls: ['./municipal-bond.component.scss']
})
export class MunicipalBondComponent implements OnInit {
  filterForm: FormGroup;
  ulbFilteredByName: ULB[];
  originalULBList: IULBResponse['data'];
  yearsAvailable: { name: string }[] = [];
  statesAvailable = [];
  yearsDropdownSettings = {
    singleSelection: false,
    text: 'All Years',
    enableSearchFilter: false,
    badgeShowLimit: 1,
    showCheckbox: true,
    labelKey: 'name',
    primaryKey: 'name'
  };
  stateDropdownSettings = {
    ...this.yearsDropdownSettings,
    text: 'All States'
  };

  ulbDropdownConfiguration = {
    primaryKey: 'name',
    singleSelection: false,
    text: 'All ULBs',
    enableSearchFilter: true,
    badgeShowLimit: 1,
    labelKey: 'name',
    showCheckbox: true,
    noDataLabel: 'No Data available',
    classes: 'ulbDropdown'
  };

  mainRows: IBondIssuer;
  bondIssuerItemData: IBondIssuerItem[];
  paginatedbondIssuerItem: IBondIssuerItem[];

  accordianHeaderFormattedName: { [originalHeader: string]: string } = {};
  object = Object;

  formattedNamesMapping: { [nameIdentifier: string]: string } = {};

  ulbItemLimitPerPage = 4;
  defaultPageView = 1;
  currentPageInView = 1;
  totalCount;
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

  private onGettingBondIssuerItemSuccess(datas: {
    total: number;
    data: IBondIssureItemResponse['data'];
  }) {
    this.bondIssuerItemData = datas.data;
    this.paginatedbondIssuerItem = this.sliceDataForCurrentView(datas.data);
    this.totalCount = datas.total;
  }

  private onGettingULBResponseSuccess(response: IULBResponse) {
    this.originalULBList = response.data;
    this.ulbFilteredByName = response.data;
    this.yearsAvailable = this.getUniqueYearsFromULBS(response.data)
      .sort((a, b) => (+a > +b ? -1 : 1))
      .map(year => ({name: year}));
  }

  private capitalizedName(originalName: string) {
    const formattedName = originalName
      .split(this.regexToSplitWordOnCapitalLetters)
      .join(' ')
      .trim();

    return formattedName[0].toUpperCase() + formattedName.substring(1);
    // formattedName.trim();
  }

  ngOnInit() {
  }

  onSubmittingFilterForm() {
    const params = this.createParamsForssuerItem(this.filterForm.value);
    this._bondService.getBondIssuerItem(params).subscribe(res => {
      this.onGettingBondIssuerItemSuccess(res);
    });
    this.resetPagination();
  }

  private resetPagination() {
    this.currentPageInView = this.defaultPageView;
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
    this._excelService.downloadJSONAs(obj);
  }

  setPage(pageNoClick: number) {
    setTimeout(() => {
      this.currentPageInView = pageNoClick;
      this.paginatedbondIssuerItem = this.sliceDataForCurrentView(
        this.bondIssuerItemData
      );
    }, 500);
  }

  private sliceDataForCurrentView(list: any[]) {
    const from = (this.currentPageInView - 1) * this.ulbItemLimitPerPage;
    const till = from + this.ulbItemLimitPerPage;
    return list.slice(from, till);
  }

  sliceData(from: number, till: number, list: any[]) {
    return list.slice(from, till);
  }

  private createCSVFileHeaders(): ICell[] {
    const ulbNames = this.bondIssuerItemData.map(ulb => ({
      text: ulb.ulb,
      bold: true
    }));
    return [{text: 'Issuer', bold: true}, ...ulbNames];
  }

  private createSubHeader() {
    let array = [];
    Object.keys(this.mainRows).forEach(key => {
      const config = {
        text: this.formattedNamesMapping[key],
        colorWholeRow: true,
        bold: true,
        backgroundColor: 'F8CBAD'
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
  }

  private initializeFormListeners() {
    this.filterForm.controls['ulbs'].valueChanges.subscribe(newValue => {
      if (!newValue.length) {
        this.yearsAvailable = this.getUniqueYearsFromULBS(this.originalULBList)
          .sort((a, b) => (+a > +b ? -1 : 1))
          .map(year => ({name: year}));
        return;
      }
      const uniqueYears = this.getUniqueYearsFromULBS(newValue);
      let yearsSelected = this.filterForm.controls['years'].value;
      if (yearsSelected) {
        yearsSelected = yearsSelected.filter(yearAlreadySelected =>
          uniqueYears.some(
            yearToCheck => yearToCheck === yearAlreadySelected.name
          )
        );
        this.filterForm.controls['years'].setValue(yearsSelected);
      }
      this.yearsAvailable = uniqueYears
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map(year => ({name: year}));
    });
  }

  onyearSelected() {
    const yearList = this.filterForm.controls['years'].value;
    if (!yearList.length) {
      this.ulbFilteredByName = this.originalULBList;
    } else {
      this.ulbFilteredByName = this.getULBHavingYears(
        yearList,
        this.originalULBList
      );
    }

    const filteredSelectedULBS = (<ULB[]>(
      this.filterForm.controls['ulbs'].value
    )).filter(
      ulb =>
        !!this.ulbFilteredByName.find(
          ulbToCheck => ulbToCheck.name === ulb.name
        )
    );

    this.filterForm.controls['ulbs'].setValue(filteredSelectedULBS);
  }

  private getULBHavingYears(
    yearList: { name: string }[],
    ulbList: IULBResponse['data']
  ) {
    return ulbList.filter(
      ulb =>
        ulb.years &&
        yearList.some(yearToFind =>
          ulb.years.some(ulbYear => ulbYear === yearToFind.name)
        )
    );
  }

  private getUniqueYearsFromULBS(ulbs: IULBResponse['data']) {
    const uniqueYears = new Set<string>();
    ulbs.forEach(ulb => {
      if (!ulb.years) {
        return;
      }
      ulb.years.forEach(year => uniqueYears.add(year));
    });
    return Array.from(uniqueYears);
  }

  private getULBFitleredBy(ulbName: string) {
  }

  private initializeForm() {
    this.filterForm = this._formBuilder.group({
      ulbs: [[]],
      years: [[]],
      states: [[]]
    });
  }
}
