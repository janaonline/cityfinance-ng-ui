import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { IBondIssuer } from "src/app/credit-rating/municipal-bond/models/bondIssuerResponse";
import {
  IBondIssuerItem,
  IBondIssureItemResponse,
} from "src/app/credit-rating/municipal-bond/models/bondIssureItemResponse";
import {
  IULBResponse,
  ULB,
} from "src/app/credit-rating/municipal-bond/models/ulbsResponse";
// import { ExcelService } from "src/app/dashboard/report/excel.service";
import {
  ICell,
  IIExcelInput,
} from "src/app/dashboard/report/models/excelFormat";
// import { IULBResponse } from "src/app/models/IULBResponse";
import { MunicipalBondsService } from "src/app/shared/services/municipal/municipal-bonds.service";
import { DialogComponent } from "../../dialog/dialog.component";
import { IDialogConfiguration } from "../../dialog/models/dialogConfiguration";

@Component({
  selector: "app-accordion-to-table",
  templateUrl: "./accordion-to-table.component.html",
  styleUrls: ["./accordion-to-table.component.scss"],
})


  
export class AccordionToTableComponent implements OnInit {
  filterForm: FormGroup;
  ulbFilteredByName: ULB[];
  stateList: IULBResponse["data"];
  originalULBList: IULBResponse["data"];
  yearsAvailable: { name: string }[] = [];
  statesAvailable = [];
  yearsDropdownSettings = {
    singleSelection: false,
    text: "All Years",
    enableSearchFilter: false,
    badgeShowLimit: 1,
    showCheckbox: true,
    labelKey: "name",
    primaryKey: "name",
    classes: "dropdown-year",
  };
  stateDropdownSettings = {
    ...this.yearsDropdownSettings,
    text: "All States",
    classes: "dropdown-state",
  };

  ulbDropdownConfiguration = {
    primaryKey: "name",
    singleSelection: false,
    text: "All ULBs",
    enableSearchFilter: true,
    badgeShowLimit: 1,
    labelKey: "name",
    showCheckbox: true,
    noDataLabel: "No Data available",
    classes: "ulbDropdown",
  };

  stateDropdownConfiguration = {
    primaryKey: "state",
    singleSelection: false,
    text: "All States",
    enableSearchFilter: true,
    badgeShowLimit: 1,
    labelKey: "stateName",
    showCheckbox: true,
    noDataLabel: "No Data available",
    classes: "ulbDropdown state-dropdown",
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

  defaultDailogConfiuration: IDialogConfiguration = {
    message:
      "<p class='text-center'>You need to be Login to download the data.</p>",
    buttons: {
      confirm: {
        text: "Proceed to Login",
        callback: () => {
          sessionStorage.setItem("postLoginNavigation", this.router.url);
          this.router.navigate(["/", "login"]);
        },
      },
      signup: {
        text: "Signup",
        callback: () => {
          this.router.navigate(["/register/user"]);
        },
      },
      cancel: { text: "Cancel" },
    },
  };

  queryParams = {};
  window = window;
  constructor(
    private _formBuilder: FormBuilder,
    private _bondService: MunicipalBondsService,
    // private _excelService: ExcelService,
    private authService: AuthService,
    private diaglog: MatDialog,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.queryParams = params;
      this.initializeForm();
      this.initializeFormListeners();
      this._bondService
        .getBondIssuer()
        .subscribe((res) => this.onGettingBondIssuerSuccess(res));
      this._bondService
        .getBondIssuerItem()
        .subscribe((res) => this.onGettingBondIssuerItemSuccess(res));
      this._bondService
        .getULBS()
        .subscribe((res) => this.onGettingULBResponseSuccess(res));
    });
  }

  onStateDropdownClose() {
    const statesSelected: IULBResponse["data"] = this.filterForm.value.states;

    // Update the ulb list
    let newULBList: IULBResponse["data"];
    const yearsSelected = this.filterForm.value.years;
    if (statesSelected.length) {
      newULBList = this.getULBByState(
        statesSelected.map((state) => state.state),
        this.originalULBList
      );
    } else {
      if (yearsSelected.length) {
        newULBList = this.getULBHavingYears(
          yearsSelected,
          this.originalULBList
        );
      } else {
        newULBList = [...this.originalULBList];
      }
    }

    // Filter Out ULBs based on years if selected.
    if (yearsSelected.length) {
      newULBList = this.getULBHavingYears(yearsSelected, newULBList);
    }

    this.ulbFilteredByName = newULBList;
    this.updateSelectedULB();
  }

  onULBDropdownClose() {
    setTimeout(() => {
      const ulbSelected = this.filterForm.value.ulbs;
      const yearsSelected = this.filterForm.value.years;
      if (ulbSelected.length) {
        this.initializeStateList(ulbSelected);
      } else if (yearsSelected.length) {
        this.initializeStateList(this.ulbFilteredByName);
      } else {
        this.initializeStateList(this.originalULBList);
      }
    });
  }

  onyearSelected() {
    const yearList = this.filterForm.controls["years"].value;
    let newULBList: IULBResponse["data"];

    // Update the ULBs
    if (!yearList.length) {
      newULBList = this.originalULBList;
    } else {
      newULBList = this.getULBHavingYears(yearList, this.originalULBList);
    }
    // Check with state.
    const statesSelected = this.filterForm.value.states;
    if (statesSelected.length) {
      newULBList = this.getULBByState(
        statesSelected.map((state) => state.state),
        newULBList
      );
    }

    this.ulbFilteredByName = newULBList;
    this.updateSelectedULB();

    // Update the State List.
    const ulbsSelected = this.filterForm.value.ulbs;
    if (ulbsSelected.length) {
      this.initializeStateList(ulbsSelected);
    } else {
      if (yearList.length) {
        this.initializeStateList(newULBList);
      } else {
        this.initializeStateList(this.originalULBList);
      }
    }

    this.updateSelectedState();
  }

  resetFilters() {
    this.filterForm.patchValue({ ulbs: [], years: [], states: [] });
    this.initializeStateList(this.originalULBList);
    this.initializeYearList(this.originalULBList);
  }

  private onGettingBondIssuerSuccess(res: IBondIssuer) {
    Object.keys(res).forEach((name) => {
      const capitalizedName = this.capitalizedName(name);
      this.formattedNamesMapping[name] = capitalizedName;
      res[name].forEach((name) => {
        const formattedName = this.capitalizedName(name);
        this.formattedNamesMapping[name] = formattedName;
      });
    });
    this.mainRows = res;
  }

  private onGettingBondIssuerItemSuccess(datas: {
    total: number;
    data: IBondIssureItemResponse["data"];
  }) {
    this.bondIssuerItemData = datas.data;
    this.paginatedbondIssuerItem = this.sliceDataForCurrentView(datas.data);
    this.totalCount = datas.total;
  }

  private onGettingULBResponseSuccess(response: IULBResponse) {
    this.originalULBList = response.data;
    this.ulbFilteredByName = response.data;
    this.initializeStateList(response.data);

    this.initializeYearList(response.data);

    // Auto select state from query Params
    this.setStateFromQueryParams(this.queryParams);
  }

  private setStateFromQueryParams(queryParams: { [key: string]: string }) {
    if (queryParams["state"]) {
      const stateFound = this.stateList.find(
        (state) => state.state === queryParams["state"]
      );
      console.log(`state Found`, stateFound);
      if (!stateFound) return;
      this.filterForm.controls["states"].setValue([stateFound]);
      this.onStateDropdownClose();
      this.onSubmittingFilterForm();
    }
  }

  private initializeYearList(list: IULBResponse["data"]) {
    this.yearsAvailable = this.getUniqueYearsFromULBS(list)
      .sort((a, b) => (+a > +b ? -1 : 1))
      .map((year) => ({ name: year }));
  }

  private initializeStateList(response: IULBResponse["data"]) {
    if (!response) return false;
    const unqiueStates = {};
    this.stateList = [];
    response.forEach((state) => {
      if (unqiueStates[state.state]) return;

      this.stateList.push(state);
      unqiueStates[state.state] = state;
    });
  }

  private capitalizedName(originalName: string) {
    const formattedName = originalName
      .split(this.regexToSplitWordOnCapitalLetters)
      .join(" ")
      .trim();

    return formattedName[0].toUpperCase() + formattedName.substring(1);
    // formattedName.trim();
  }


empty;
emptyArray() {
  this.empty = new Array(10).fill(null);
}

  ngOnInit() {
  this.emptyArray();

  }

  onSubmittingFilterForm() {
    const params = this.createParamsForssuerItem(this.filterForm.value);
    this._bondService.getBondIssuerItem(params).subscribe((res) => {
      console.log(res);
      this.onGettingBondIssuerItemSuccess(res);
    });
    this.resetPagination();
  }

  onClickDownload() {
    const isUserLoggedIn = this.authService.loggedIn();
    if (!isUserLoggedIn) {
      const dailogboxx = this.diaglog.open(DialogComponent, {
        data: this.defaultDailogConfiuration,
        width: "28vw",
      });
      return;
    }

    const firstRow = [this.createCSVFileHeaders()];
    const subHeaders = this.createSubHeader();
    const finalRow = firstRow.concat(subHeaders);
    const currentDate = new Date().toLocaleDateString();
    const obj: IIExcelInput = {
      rows: finalRow,
      fileName: `Municipal Bond ${currentDate}`,
      skipStartingColumns: 1,
      skipStartingRows: 3,
      fontSize: 10,
    };
    // this._excelService.downloadJSONAs(obj);
  }

  setPage(pageNoClick: number) {
    setTimeout(() => {
      this.currentPageInView = pageNoClick;
      this.paginatedbondIssuerItem = this.sliceDataForCurrentView(
        this.bondIssuerItemData
      );
    }, 500);
  }

  private getULBByState(stateIds: string[], list: IULBResponse["data"]) {
    return list.filter((ulb) => stateIds.includes(ulb.state));
  }

  private updateSelectedULB() {
    const filteredSelectedULBS = (<ULB[]>(
      this.filterForm.controls["ulbs"].value
    )).filter(
      (ulb) =>
        !!this.ulbFilteredByName.find(
          (ulbToCheck) => ulbToCheck.name === ulb.name
        )
    );

    this.filterForm.controls["ulbs"].setValue(filteredSelectedULBS);
  }

  private updateSelectedState() {
    const filteredSelectedStates = (<ULB[]>(
      this.filterForm.controls["states"].value
    )).filter(
      (state) =>
        !!this.stateList.find(
          (stateToCheck) => stateToCheck.state === state.state
        )
    );

    this.filterForm.controls["states"].setValue(filteredSelectedStates);
  }

  private resetPagination() {
    this.currentPageInView = this.defaultPageView;
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
    const ulbNames = this.bondIssuerItemData.map((ulb) => ({
      text: ulb.ulb,
      bold: true,
    }));
    return [{ text: "Issuer", bold: true }, ...ulbNames];
  }

  private createSubHeader() {
    let array = [];
    Object.keys(this.mainRows).forEach((key) => {
      const config = {
        text: this.formattedNamesMapping[key],
        colorWholeRow: true,
        bold: true,
        backgroundColor: "F8CBAD",
      };

      const subHeaderRow = [config];

      array.push(subHeaderRow);
      const detailRows = this.mainRows[key].map((subRow) => {
        const detailColumns = {
          text: this.formattedNamesMapping[subRow],
        };

        const ulbDataCoulmns = this.bondIssuerItemData.map((ulb) => ({
          text: ulb[subRow],
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
    states?: { state: string }[];
  }) {
    return {
      ulbs: obj.ulbs ? obj.ulbs.map((ulb) => ulb.name) : [],
      years: obj.years ? obj.years.map((year) => year.name) : [],
      states: obj.states ? obj.states.map((state) => state.state) : [],
    };
  }

  onClickingULBAutoComplete(ulbClicked: any) {}

  private initializeFormListeners() {
    this.filterForm.controls["ulbs"].valueChanges.subscribe((ulbsSelected) => {
      if (!ulbsSelected.length) {
        this.yearsAvailable = this.getUniqueYearsFromULBS(
          this.ulbFilteredByName
        )
          .sort((a, b) => (+a > +b ? -1 : 1))
          .map((year) => ({ name: year }));
        return;
      }
      const uniqueYears = this.getUniqueYearsFromULBS(ulbsSelected);
      let yearsSelected = this.filterForm.controls["years"].value;
      if (yearsSelected) {
        yearsSelected = yearsSelected.filter((yearAlreadySelected) =>
          uniqueYears.some(
            (yearToCheck) => yearToCheck === yearAlreadySelected.name
          )
        );
        this.filterForm.controls["years"].setValue(yearsSelected);
      }
      this.yearsAvailable = uniqueYears
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map((year) => ({ name: year }));
    });
  }

  private getULBHavingYears(
    yearList: { name: string }[],
    ulbList: IULBResponse["data"]
  ) {
    return ulbList.filter(
      (ulb) =>
        ulb.years &&
        yearList.some((yearToFind) =>
          ulb.years.some((ulbYear) => ulbYear === yearToFind.name)
        )
    );
  }

  private getUniqueYearsFromULBS(ulbs: IULBResponse["data"]) {
    const uniqueYears = new Set<string>();
    ulbs.forEach((ulb) => {
      if (!ulb.years) {
        return;
      }
      ulb.years.forEach((year) => uniqueYears.add(year));
    });
    return Array.from(uniqueYears);
  }

  private getULBFitleredBy(ulbName: string) {}

  private initializeForm() {
    this.filterForm = this._formBuilder.group({
      ulbs: [[]],
      years: [[]],
      states: [[]],
    });
  }
}
