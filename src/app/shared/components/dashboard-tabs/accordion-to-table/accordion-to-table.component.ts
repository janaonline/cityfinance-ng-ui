import { ThrowStmt } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";
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
import { CommonService } from "src/app/shared/services/common.service";
import { GeographicalService } from "src/app/shared/services/geographical/geographical.service";
// import { IULBResponse } from "src/app/models/IULBResponse";
import { MunicipalBondsService } from "src/app/shared/services/municipal/municipal-bonds.service";
import { DialogComponent } from "../../dialog/dialog.component";
import { IDialogConfiguration } from "../../dialog/models/dialogConfiguration";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  @Input() value;
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
  ulbList = JSON.parse(localStorage.getItem("ulbMapping"));
  ulbNameMapping;

  allUlbList = JSON.parse(localStorage.getItem("ulbList")).data;
  ulbStateMapping = JSON.parse(localStorage.getItem("ulbStateCodeMapping"));
  stateIdsMap = JSON.parse(localStorage.getItem("stateIdsMap"));
  cityId;
  stateId;
  notFound = false;
  stateUlbList: any;

  selectedUlbList: any = [];
  selectedYears: any = [];
  ulbType: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _bondService: MunicipalBondsService,
    // private _excelService: ExcelService,
    private authService: AuthService,
    private diaglog: MatDialog,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    protected _commonService: CommonService,
    protected _geoService: GeographicalService,
    private snackbar: MatSnackBar
  ) {
    this.loadMapGeoJson();
    this._activatedRoute.queryParams.subscribe((params) => {
      console.log("queryParams==>", params);
      this.queryParams = params;
      this.cityId = params?.cityId;
      this.stateId = params?.stateId;
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
    this.createUlbNameMap();
  }

  StatesJSONForMapCreation: any;
  loadMapGeoJson() {
    const prmsArr = [];

    const prms1 = this._geoService.loadConvertedIndiaGeoData().toPromise();
    prmsArr.push(prms1);

    prms1.then((data) => (this.StatesJSONForMapCreation = data));
    console.log("StatesJSONForMapCreation", this.StatesJSONForMapCreation);

    return Promise.all(prmsArr).then((value) => {
      console.log("value", value);
      // this.getFormValue();
    });
  }

  createUlbNameMap() {
    let obj = {};
    for (const key in this.ulbList) {
      const element = this.ulbList[key];
      obj[element.name] = element;
    }
    this.ulbNameMapping = obj;
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
    // debugger
    const yearList = this.filterForm.controls["years"].value
    console.log("mainRows", this.paginatedbondIssuerItem)
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
    this.onSubmittingFilterForm();
  }

  resetFilters() {
    this.filterForm.patchValue({ ulbs: [], years: [], states: [] });
    this.initializeStateList(this.originalULBList);
    this.initializeYearList(this.originalULBList);
    this.issueLength.patchValue("4");
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
    if (datas.data) {
      this.getFormValue();
    }
    console.log("newData", datas)
    this.bondIssuerItemData = datas.data;
    

    if (this.state) {
      this.filterdData = this.bondIssuerItemData.filter(
        (elem: any) => elem.state == this.stateId
      );
      this.newYearsList = new Set(
        this.filterdData.map((elem: any) => elem.yearOfBondIssued)
      );
      this.newYearsList = [...this.newYearsList].sort((a, b) => a - b);
      this.yearsList = this.newYearsList;
      console.log(
        "main years",
        typeof this.yearsList,
        this.yearsList,
        this.filterdData,
        this.newYearsList
      );
      this.makeDataForState(this.filterdData);
      // this.makeDataForState(datas.data);
    }
    this.paginatedbondIssuerItem = this.sliceDataForCurrentView(datas.data);

    let tempArr = []
    let tempIssueArr = []
    this.paginatedbondIssuerItem.forEach((elem) => {
      let bidValue = elem.bidsReceived
      let issueValue = elem.issueSize
      if(bidValue !== "Not Available" && bidValue) {
        if(bidValue.includes(",")) {
         let commaValue = bidValue.split(" ")[1].split(",");
         tempArr.push(commaValue[0] + commaValue[1])
        }else {
          tempArr.push(bidValue.split(" ")[1])
        }
      }

      if(issueValue) {
        tempIssueArr.push(issueValue.split(" ")[1])
      }
    })

    this.bidReceivedAmount = tempArr.reduce((prevValue, currentValue) => {
      return parseInt(prevValue) + parseInt(currentValue)
    }, 1)

    this.issueSize = tempIssueArr.reduce((prevValue, currentValue) => {
      return parseInt(prevValue) + parseInt(currentValue)
    }, 1)

    console.log("bidReceivedAmount", this.bidReceivedAmount, this.issueSize)
    this.totalCount = datas.total;

    console.log("currentData===>",this.bondIssuerItemData)
  }
  totalDataSource;
  filterdData: any;
  finalFileteredData: any;

  searchFilter() {
    console.log(
      "finalData",
      this.selectedUlbList,
      this.selectedYears,
      this.ulbType
    );
    let names = this.selectedUlbList.map((elem) => elem.name);
    let stringVal: string = "";

    if (this.tableDataSource.length == 0) {
      stringVal = "No data Present to filter";
    } else if (
      this.selectedUlbList.length == 0 &&
      this.selectedYears.length == 0
    ) {
      stringVal = "Please select a ulb and year";
    } else {
      
      stringVal = "Please select both ulb and year";
    }


    if (this.selectedUlbList.length > 0 && this.selectedYears.length > 0) {
     
      this.finalFileteredData = this.bondIssuerItemData.filter((elem) => {
        if (
          names.includes(elem.ulb) &&
          this.selectedYears.includes(elem.yearOfBondIssued)
        ) {
          return elem;
        }
      });
      console.log("this.finalFileteredData", this.finalFileteredData);
      this.makeDataForState(this.finalFileteredData);
    } else {
      this.snackbar.open(stringVal, null, {
        duration: 5000,
        verticalPosition: "bottom",
      });
      return;
    }
  }

  sortDirection = false;
  sortTableData(index) {
    this.sortDirection = !this.sortDirection;
    this.tableDataSource = this.tableDataSource.sort((a: any, b: any) => {
      return this.sortDirection
        ? a[index].localeCompare(b[index])
        : b[index].localeCompare(a[index]);
    });
  }

  makeDataForState(rawData) {
    this.tableDataSource = rawData.map((val) => {
      let temp = {
        municipality: val.ulb == "" ? "NA" : val.ulb,
        ulbType:
          this.ulbNameMapping[val.ulb]?.type == ""
            ? "NA"
            : this.ulbNameMapping[val.ulb]?.type,
        year: val.yearOfBondIssued == "" ? "NA" : val.yearOfBondIssued,
        rating: val.CRISIL == "" ? "NA" : val.CRISIL,
        amount: val.amountAccepted == "" ? "NA" : val.amountAccepted,
        couponRate: val.couponRate == "" ? "NA" : val.couponRate,
        _id: val._id == "" ? "NA" : val._id,
      };
      return temp;
    });
    // this.StatesJS
    this.tableDataSource = this.tableDataSource.sort(
      (a: any, b: any) => a.year - b.year
    );
    this.totalDataSource = this.tableDataSource;
    console.log(this.tableDataSource, "tableDataSource");
  }

  clearAllValue() {
    console.log("filteredData", this.filterdData);
    this.selectedUlbList = [];
    this.selectedYears = [];
    this.yearsList = this.newYearsList;
    this.makeDataForState(this.filterdData);
  }

  getFormValue() {
    let stateName = this.stateIdsMap[this.stateId];
    console.log("this.filterFomr", this.filterForm);
    console.log("StatesJSONForMapCreation", this.StatesJSONForMapCreation);
    let stateCode = this.StatesJSONForMapCreation?.features?.find(
      (code) => code.properties.ST_NM == stateName
    );
    console.log("stateCode", stateCode, this.tableDataSource);
    if (stateCode && this.tableDataSource.length > 0) {
      let ulbList = this.allUlbList[stateCode?.properties?.ST_CODE];
      console.log("ulbList", ulbList.ulbs);
      this.stateUlbList = ulbList?.ulbs;
      this.stateUlbList = this.originalULBList.filter((el) => {
        return this.stateUlbList.some((f) => {
          return f.name === el.name;
        });
      });
    } else {
      this.stateUlbList = [];
    }
    console.log("stateUlbList", this.stateUlbList);
  }

  ulbTypeList: any = [];
  yearsList: any = [];
  newYearsList: any = [];

  selectMultipleUlb(e: any) {
    this.selectedUlbList = e;

    this.ulbTypeList = new Set(this.selectedUlbList.map((elem) => elem.type));

    let myArrayFiltered: any = this.originalULBList
      .filter((el) => {
        return this.selectedUlbList.some((f) => {
          return f.name === el.name;
        });
      })
      .map((elem) => elem.years);

    let tempArr = myArrayFiltered.flat();
    this.yearsList = new Set(tempArr);
    this.yearsList = [...this.yearsList].sort((a, b) => a - b);

    console.log(
      "myArrayFiltered",
      myArrayFiltered,
      this.yearsList,
      this.newYearsList
    );
  }

  selectMultipleYear(e) {
    this.selectedYears = e;
    console.log("this.selectedYears", this.selectedYears);
  }

  selectUlbType(e) {
    console.log("new event", e.target.value);
    this.ulbType = e.target.value;
  }

  private onGettingULBResponseSuccess(response: IULBResponse) {
    if (this.state) {
      let foundState;
      foundState = response.data.filter(
        (value) => value.stateName === this.stateIdsMap[this.stateId]
      );
      if (!foundState) {
        this.notFound = true;
        return;
      } else {
        this.filterForm.controls["states"].patchValue([...foundState]);
        this.notFound = false;
      }
    } else {
      let foundUlb;
      foundUlb = response.data.find(
        (value) => value.name === this.ulbList[this.cityId].name
      );
      if (!foundUlb) {
        this.notFound = true;
        return;
      } else {
        this.filterForm.controls["ulbs"].patchValue([foundUlb]);
        this.notFound = false;
      }
    }
    this.originalULBList = response.data;
    this.ulbFilteredByName = response.data;
    this.initializeStateList(response.data);

    this.initializeYearList(response.data);

    // Auto select state from query Params
    this.setStateFromQueryParams(this.queryParams);
    this.onSubmittingFilterForm();
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
  city: boolean = false;
  state: boolean = false;

  ngOnInit() {
    console.log("selectedUlbList", this.selectedUlbList);
    this.emptyArray();
    console.log("valueeeeeeee" + this.value);
    if (this.value == "city") {
      this.city = true;
      this.state = false;
    }
    if (this.value == "state") {
      this.state = true;
      this.city = false;
    }
    console.log(this.filterForm);
  }
  issueLength: any = 4;
  issueSize: number = 0;
  bidReceivedAmount: any = "";
  tableHeading = [
    {
      title: "Municipality",
      keyToAccessValue: "municipality",
      class: "fa-sort sort-icon",
    },
    {
      title: "ULB Type",
      keyToAccessValue: "ulbType",
      class: "fa-sort sort-icon",
    },
    { title: "Year", keyToAccessValue: "year", class: "fa-sort sort-icon" },
    { title: "Rating", keyToAccessValue: "rating", class: "fa-sort sort-icon" },
    {
      title: "Amount (In Cr)",
      keyToAccessValue: "amount",
      class: "fa-sort sort-icon",
    },
    {
      title: "Coupon Rate",
      keyToAccessValue: "couponRate",
      class: "fa-sort sort-icon",
    },
  ];

  tableDataSource = [
    {
      municipality: "Ahmadnagar",
      ulbType: "Municipality",
      year: "1997",
      rating: "AA",
      amount: 100,
      couponRate: "14.0",
      _id: "1",
    },
  ];
  ulbListLatest: any;
  onSubmittingFilterForm() {
    const params = this.createParamsForssuerItem(this.filterForm.value);
    this._bondService.getBondIssuerItem(params).subscribe((res: any) => {
      console.log(res);
      this.issueLength = res.total ;
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
    console.log("pageNoClick", pageNoClick)
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
    console.log("this.filterForm", this.filterForm);
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
