import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interval, merge } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { AuthService } from '../../../../app/auth/auth.service';
import { IULBResponse } from '../../../../app/models/IULBResponse';
import { IULB } from '../../../../app/models/ulb';
import { DialogComponent } from '../../../../app/shared/components/dialog/dialog.component';
import { IDialogConfiguration } from '../../../../app/shared/components/dialog/models/dialogConfiguration';
import { GlobalLoaderService } from '../../../../app/shared/services/loaders/global-loader.service';
import { CommonService } from '../../../shared/services/common.service';
import { ReportService } from '../report.service';
import { ulbType, ulbTypes } from './ulbTypes';

interface CustomArray<T> {
  flat(): Array<T>;

  flatMap(func: (x: T) => T): Array<T>;
}

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, OnDestroy {
  constructor(
    protected formBuilder: FormBuilder,
    protected _loaderService: GlobalLoaderService,
    protected commonService: CommonService,
    protected modalService: BsModalService,
    protected reportService: ReportService,
    protected router: Router,
    protected _dialog: MatDialog,
    protected authService: AuthService
  ) {
    this.reportForm = this.formBuilder.group({
      isComparative: [false, []],
      type: ["Summary", Validators.required],
      years: [[]],
      yearList: [[this.yearLookup[0]], [Validators.required]],
      reportGroup: ["Income & Expenditure Statement", Validators.required],
      ulbList: [this.selectedUlbs, [Validators.required]],
      ulbIds: [],
      valueType: ["absolute"],
    });
  }
  // get lf() {
  //   return this.reportForm.controls;
  // }

  alphabets = [];
  activeGroup: "IE" | "BS" = "IE";
  isMultiULB = false;

  states: any = [];
  ulbs: any = [];
  originalUlbList: IULBResponse;
  selectedUlbs = [];
  reportForm: FormGroup;
  ulbForm = {
    ulbFilter: "",
    ulbPopulationFilter: [],
    ulbTypeFilter: [],
  };
  submitted = false;
  isFormInvalid = false;

  yearLookup = [
    { id: "2015-16", itemName: "2015-16" },
    { id: "2016-17", itemName: "2016-17" },
    { id: "2017-18", itemName: "2017-18" },
    { id: "2018-19", itemName: "2018-19" },
    { id: "2019-20", itemName: "2019-20" },
  ];
  ulbTypeLookup = [
    { itemName: "All Municipal Corporation", id: "Municipal Corporation" },
    { itemName: "All Municipality", id: "Municipality" },
    { itemName: "All Town Panchayat", id: "Town Panchayat" },
  ];

  populationData = [];

  populationDropdownSettings = {};
  yearsDropdownSettings = {};
  ulbTypeDropdownSettings = {};

  modalRef: BsModalRef;

  ulbTypeSelected: "base" | "other" = "other";

  ULBTYPES = ulbTypes;

  currentStateInView: { key: string; value: { state: string; ulbs: IULB[] } };
  ulbTypeInView = ulbTypes[0];

  StateULBTypeMapping: {
    [stateCode: string]: { [ulbType: string]: { [ulbCode: string]: IULB } };
  } = {};

  baseULBSelected: IULB;

  searchByNameControl = new FormControl();

  isAlertForDifferentULBShown = false;

  ulbFilteredByName: IULB[];

  previousSearchedULB: IULB;

  filteredULBTypes;

  defaultDailogConfiuration: IDialogConfiguration = {
    message:
      "<p class='text-center'>You need to be Login to download the data.</p>",
    buttons: {
      signup: {
        text: "Signup",
      },
      confirm: {
        text: "Proceed to Login",
        callback: () => {
          const query = `backRoute=${window.location.pathname}`;
          sessionStorage.setItem(
            "postLoginNavigation",
            `/data-tracker?${query}`
          );
          this.router.navigate(["/", "login"]);
        },
      },
      cancel: { text: "Cancel" },
    },
  };

  clickedOnGenerateReport = false;

  modelOpenForType: "base" | "comparision" = "base";

  ngOnInit() {
    for (let i = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.populationData = [
      { id: 1, itemName: "Zero to 1 Lakh", min: 0, max: 100000 },
      { id: 2, itemName: "1 Lakh to 10 Lakhs", min: 100000, max: 1000000 },
      { id: 3, itemName: "10 Lakhs to 1 Crore", min: 1000000, max: 10000000 },
      { id: 4, itemName: "Above 1 Crore", min: 10000000, max: 100000000 },
    ];
    this.populationDropdownSettings = this.reportService.getMultiSelectDropdownSetting(
      "id",
      "itemName",
      "Select Population"
    );
    this.yearsDropdownSettings = this.reportService.getMultiSelectDropdownSetting(
      "id",
      "itemName",
      "Select Years"
    );
    this.ulbTypeDropdownSettings = this.reportService.getMultiSelectDropdownSetting(
      "id",
      "itemName",
      "Filter ULBs"
    );

    // HERE
    this._loaderService.showLoader();
    this.commonService.getULBSByYears([this.yearLookup[0].id]).subscribe(
      (response: IULBResponse) => {
        Object.values(response.data).forEach((state) => {
          state.ulbs = state.ulbs.sort((a, b) => (b.name > a.name ? -1 : 0));
        });
        this.originalUlbList = response;
        this.ulbs = JSON.parse(JSON.stringify(this.originalUlbList));

        this.setPopupDefaultView();

        this._loaderService.stopLoader();
      },
      () => {}
    );

    this.listenToFormGroups();
  }

  routerTo(url: string, downloadFilteredULBs = false) {
    const isUserLoggedIn = this.authService.loggedIn();
    const ulbIds = this.reportForm.value.ulbIds;
    const years = this.reportForm.value.years;
    if (!isUserLoggedIn) {
      const dailogboxx = this._dialog.open(DialogComponent, {
        data: this.defaultDailogConfiuration,
        width: "28vw",
      });
      return;
    }

    if (!downloadFilteredULBs) {
      return this.router.navigate([url], {
        queryParams: { backRoute: window.location.pathname },
      });
    }

    this.router.navigate([url], {
      queryParams: { ulbIds, years, backRoute: window.location.pathname },
    });
  }

  protected listenToFormGroups() {
    this.searchByNameControl.valueChanges
      .pipe(debounce(() => interval(400)))
      .subscribe((newText) => {
        this.ulbFilteredByName = [];
        const newULBS = this.filterULBByFilters("");
        Object.keys(newULBS.data).forEach((stateCode) => {
          const state = newULBS.data[stateCode];
          const filteredULBS = state.ulbs
            .filter((ulb) =>
              ulb.name.toLowerCase().includes(newText.toLowerCase())
            )
            .map((ulb) => ({ ...ulb, stateCode }));
          if (filteredULBS.length) {
            this.ulbFilteredByName = this.ulbFilteredByName.concat(
              filteredULBS
            );
          }
        });
      });

    /**
     *  IMPORTANT Do not remove debounce from here. the valueChanges is run before the actual
     *  value of the form is changed. So if you remove it, then the search function will be
     * executed with the previous type nad not the lastest type.
     */
    // forkJoin([
    // this.reportForm.controls["type"].valueChanges,
    // this.reportForm.controls["valueType"].valueChanges,
    // ])

    merge(
      this.reportForm.controls["type"].valueChanges,
      this.reportForm.controls["valueType"].valueChanges
    )
      .pipe(debounce(() => interval(400)))
      .subscribe((value: any[]) => {
        if (this.reportForm.valid) {
          this.search();
        }
      });

    this.reportForm.controls["isComparative"].valueChanges.subscribe(
      (isComparative) => {
        if (isComparative) {
          this.showAlertBoxForComparativeReport();
          this.clearPopupValues();
          this.ulbTypeInView = null;
        } else {
          this.clearPopupValues([this.yearLookup[0]]);
        }

        this.selectedUlbs = null;
        this.StateULBTypeMapping = {};
        this.baseULBSelected = null;
        this.ulbForm = {
          ulbFilter: "",
          ulbPopulationFilter: [],
          ulbTypeFilter: [],
        };

        this.searchByNameControl.setValue("");
        this.baseULBSelected = null;
        this.currentStateInView = null;
        // this.setULBTypeOfState(null);
        // // this.setPopupDefaultValues();
        // this.setULBType(
        //   isComparative ? null : "other",
        //   this.baseULBSelected ? true : false,
        //   this.reportForm.controls.isComparative.value
        // );
      }
    );

    this.reportForm.controls["yearList"].valueChanges.subscribe((list) => {
      this.getNewULBByDate(list.map((year) => year.id));

      if (
        list.length === 1 &&
        !this.ulbTypeSelected &&
        this.reportForm.controls["isComparative"].value
      ) {
        this.ulbTypeSelected = "base";
      }
    });

    this.reportForm.controls["ulbList"].valueChanges.subscribe(
      (newList: IULB[]) => {
        const ulbIds = newList.map((ulb) => ulb["_id"] || "");
        if (this.reportForm.controls.isComparative && this.baseULBSelected) {
          ulbIds.push(this.baseULBSelected._id);
        }
        this.reportForm.controls["ulbIds"].setValue(ulbIds);
      }
    );
  }

  getNewULBByDate(years: string[]) {
    this._loaderService.showLoader();
    this.commonService.getULBSByYears(years).subscribe((response) => {
      this.originalUlbList = response;
      const newULBS = this.filterULBByFilters("");
      this.ulbs = { ...newULBS };

      if (
        this.currentStateInView &&
        !response.data[this.currentStateInView.key]
      ) {
        this.currentStateInView = null;
      }

      if (!this.currentStateInView && !this.reportForm.value.isComparative) {
        const firstStateKey = Object.keys(this.originalUlbList.data).sort()[0];
        const firstState = this.originalUlbList.data[firstStateKey];
        this.currentStateInView = {
          key: firstStateKey,
          value: { ...firstState },
        };
      }

      if (!this.reportForm.value.isComparative) {
        this.showState({ ...this.currentStateInView });
        this.ulbTypeSelected = "other";
      }

      this.filterSelectedULBs();
      this._loaderService.stopLoader();
    });
  }

  /**
   * @description It will filter out the selected ulbs which
   * are not currently present in the List.
   */
  protected filterSelectedULBs() {
    if (!this.StateULBTypeMapping) return;
    const selectedULB = { ...this.StateULBTypeMapping };

    Object.keys(selectedULB).forEach((stateKey) => {
      const ulbsInState = Object.values(selectedULB[stateKey]);
      const ulbs = (<any>ulbsInState.map((ulb) => Object.values(ulb))).flat();

      ulbs.forEach((ulb) => {
        const exists = this.doesULBExistInState(stateKey, ulb);

        if (!exists) {
          this.onULBClick(stateKey, { type: ulb.type }, ulb);
        }
      });
    });
  }

  protected doesULBExistInState(stateCode: string, ulbToSearch: IULB) {
    const stateFound = this.originalUlbList.data[stateCode];
    if (!stateFound) return false;
    if (!stateFound.ulbs) return false;
    return !!stateFound.ulbs.find((ulb) => ulb._id === ulbToSearch._id);
  }

  /**
   * This method is executed whenever user is selecting report type to be
   * comparative.
   */
  showAlertBoxForComparativeReport() {
    const message = `You have selected comparative report. Please follow the following procedure:<br>
    <strong>Step 1 -</strong> Select Year(s) for which you want to compare.<br>
    <strong>Step 2 -</strong> Select Base ULB.<br>
    <strong>Step 3 -</strong> Select ULB(s) for comparison.<br>
`;
    return this._dialog.open(DialogComponent, {
      width: "40vw",
      data: { message },
    });
  }

  clearPreviousSearchedULB() {
    if (this.previousSearchedULB) {
      const element = document.getElementById(
        `${this.previousSearchedULB.code}`
      );
      if (element) {
        element.style.background = "white";
      }
    }
  }

  /**
   * This method is invoked whenever user click on a particular state.
   */
  setCurrentStateView(options: {
    stateCode: string;
    ulbType?: IULB["type"];
    ulb?: IULB;
  }) {
    this.clearPreviousSearchedULB();
    this.previousSearchedULB = options.ulb;
    const stateToSet = this.ulbs.data[options.stateCode];
    this.currentStateInView = {
      key: options.stateCode,
      value: { ...stateToSet },
    };
    this.setULBTypeOfState({ type: options.ulbType });
    if (options.ulb) {
      setTimeout(() => {
        const element = document.getElementById(`${options.ulb.code}`);
        if (element) {
          element.style.background = "yellow";
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    }

    // this.setULBTypeOfState({ type: options.ulbType });
  }

  filterULBByFilters(textToSeatch: string) {
    const newULBS: IULBResponse = {
      data: {},
      msg: this.originalUlbList.msg,
      success: this.originalUlbList.success,
    };
    Object.keys(this.originalUlbList.data).forEach((stateKey) => {
      let filteredULBS = (<IULB[]>(
        this.originalUlbList.data[stateKey].ulbs
      )).filter((ulb) =>
        textToSeatch && textToSeatch.trim()
          ? ulb.name.toLowerCase().includes(textToSeatch.toLowerCase())
          : true
      );
      if (stateKey === "AS") {
      }
      filteredULBS = this.filterULBByPopulation(filteredULBS);
      if (stateKey === "AS") {
      }
      if (filteredULBS.length) {
        newULBS.data[stateKey] = {
          state: this.originalUlbList.data[stateKey].state,
          ulbs: filteredULBS,
        };
      }
    });
    return newULBS;
  }

  /**
   * This method is used as Pipe to show the ulbs in alphabatic order.
   */
  valueAscOrder = (
    a: KeyValue<number, { name: string }>,
    b: KeyValue<number, { name: string }>
  ): number => {
    return a.value.name > b.value.name ? 1 : -1;
  };

  /**
   * This method is executed whenever user click on Base ULB Tab or ULB For Comparison Tab.
   */
  setULBType(
    type: "base" | "other" | null,
    baseULBSelected: boolean,
    isComparative: boolean = false
  ) {
    if (type === "other") {
      if (!isComparative || (isComparative && baseULBSelected)) {
        this.ulbTypeSelected = type;
      }
    } else if (
      type === "base" &&
      this.reportForm.controls.yearList.value.length
    ) {
      this.ulbTypeSelected = type;
    } else {
      this.ulbTypeSelected = null;
    }
  }

  /**
   * This methond is executed whenever user is clicking on the ULB Type (Municipality / Town Panchayat / Municipal Corporation)
   */
  setULBTypeOfState(type: { type: ulbType }) {
    console.log(`setULBTypeOfState`);
    this.ulbTypeInView = type;
    this.showState(this.currentStateInView);
  }

  showState(state: { key: string; value: { state: string; ulbs: IULB[] } }) {
    if (!state) {
      return (this.currentStateInView = null);
    }
    if (!this.ulbTypeInView) {
      console.log(`showState`);

      this.ulbTypeInView = { type: this.ULBTYPES[0].type };
    }

    const originalState = {
      ...this.originalUlbList.data[state.key],
    };

    const filteredByPopulation = this.filterULBByPopulation(originalState.ulbs);
    originalState.ulbs = filteredByPopulation;
    this.filteredULBTypes = this.filterEmptyULBForState(originalState);

    this.ulbTypeInView = this.filteredULBTypes.some(
      (uType) => uType.type === this.ulbTypeInView.type
    )
      ? this.ulbTypeInView
      : this.filteredULBTypes[0];
    const stateFound = this.ulbs.data[state.key];
    const newState = { key: state.key, value: { ...stateFound } };
    const fitlerULB = newState.value.ulbs
      ? newState.value.ulbs.filter((ulb) => {
          return ulb.type === this.ulbTypeInView.type;
        })
      : [];

    newState.value.ulbs = fitlerULB;

    if (this.ulbForm.ulbPopulationFilter.length) {
      newState.value.ulbs = newState.value.ulbs.filter((ulb) => {
        const canShowULB = this.ulbForm.ulbPopulationFilter.some(
          (option) =>
            option.min <= ulb.population && option.max >= ulb.population
        );
        return canShowULB;
      });
    }
    this.currentStateInView = newState;
  }

  filterEmptyULBForState(originalState: { state: string; ulbs: IULB[] }) {
    return this.ULBTYPES.filter((ulbType) =>
      originalState.ulbs.some((ulb) => ulb.type === ulbType.type)
    );
  }

  resetPopupValues(defaultYearSelect?: { id: string; itemName: string }) {
    this.clearPopupValues();
    this.setPopupDefaultView();
  }

  clearPopupValues(defaultYearSet?: { id: string; itemName: string }[]) {
    this.reportForm.patchValue({
      // yearList: [defaultYearSet ? defaultYearSet : []],
      ulbList: [],
      year: [],
    });
    console.log(`clearPopupValues`, defaultYearSet);
    const preSelectedYear: { id: string; itemName: string }[] = this.reportForm
      .controls.yearList.value;
    if (!defaultYearSet) {
      this.reportForm.controls.yearList.setValue([]);
    } else if (defaultYearSet.length !== preSelectedYear.length) {
      this.reportForm.controls.yearList.setValue([]);
    } else {
      const allAreEqual = defaultYearSet.every(
        (year) =>
          !!preSelectedYear.find((currentYear) => currentYear.id === year.id)
      );
      if (!allAreEqual) {
        this.reportForm.controls.yearList.setValue([]);
      }
    }

    this.selectedUlbs = null;
    this.StateULBTypeMapping = {};
    this.baseULBSelected = null;
    this.ulbForm = {
      ulbFilter: "",
      ulbPopulationFilter: [],
      ulbTypeFilter: [],
    };
    this.searchByNameControl.setValue("");
    this.baseULBSelected = null;
    this.currentStateInView = null;
    this.setULBTypeOfState(null);
  }

  setPopupDefaultView() {
    this.reportForm.controls["isComparative"].setValue(false);
    // if (this.reportForm.controls["isComparative"].value !== false) {
    //   this.reportForm.controls["isComparative"].setValue(false);
    // }
    if (
      this.originalUlbList &&
      this.originalUlbList.data &&
      Object.keys(this.originalUlbList.data).length
    ) {
      const firstStateKey = Object.keys(this.originalUlbList.data).sort()[0];
      const firstState = this.originalUlbList.data[firstStateKey];
      this.currentStateInView = {
        key: firstStateKey,
        value: { ...firstState },
      };
      this.ulbTypeSelected = "other";
      this.setULBTypeOfState(this.ULBTYPES[0]);
    } else {
      this.currentStateInView = null;
      this.ulbTypeSelected = null;
    }
  }

  resetPage() {
    // this.resetPopupValues();
    // this.reportForm.reset();
    this.reportForm.patchValue({
      type: "Summary",
      isComparative: false,
      yearList: [],
      ulbList: [],
      reportGroup: "Income & Expenditure Statement",
      valueType: "absolute",
    });
    this.baseULBSelected = null;
    this.activeGroup = "IE";
    this.StateULBTypeMapping = {};
    this.reportService.reportResponse.next(null);
    this.submitted = false;
  }

  /**
   * This method is executed whenever user is changing the type of report.
   * Either from Detailed to Summary or From Income & Expenditure to Balance Sheey.
   */
  toggleTab(val: "IE" | "BS") {
    this.activeGroup = val;
    if (!this.reportForm.invalid) {
      if (this.reportForm.valid) {
        this.search();
      }
    }
  }

  populateReportGroup() {
    if (this.activeGroup == "IE") {
      this.reportForm.value.reportGroup = "Income & Expenditure Statement";
    } else {
      this.reportForm.value.reportGroup = "Balance Sheet";
    }
  }

  /**
   * This method is executed when the date dropdown selection is closed.
   */
  onDateSelectionClose(event) {
    // We need to sort the selected year in ascending as user can select in any order.
    this.reportForm.value.yearList.sort(
      (A, B) => A.id.split("-")[0] - B.id.split("-")[0]
    );
  }

  onYearSelectionClose() {}

  /**
   * This method is executed whenever the report is needed to generate (generally when Generate Report button is clicked);
   */
  search() {
    this.reportForm.value.years = [];
    for (let i = 0; i < this.reportForm.value.yearList.length; i++) {
      const year = this.reportForm.value.yearList[i].id;
      this.reportForm.value.years.push(year);
    }
    let alertMessage = null;

    const isComparativeInvalid =
      this.reportForm.controls.isComparative.value && !this.baseULBSelected;
    const isULBSelected = !!this.reportForm.value.ulbList.length;
    const isYearSelected = !!this.reportForm.value.years.length;
    if (isComparativeInvalid || !isULBSelected || !isYearSelected) {
      alertMessage = `Select`;
      if (!isYearSelected) {
        alertMessage += `  Years(s)`;
      }
      if (isComparativeInvalid) {
        alertMessage += `${isYearSelected ? "" : ","} Base ULB`;
      }
      if (!isULBSelected) {
        alertMessage += `${
          isComparativeInvalid || !isYearSelected ? " and" : ""
        } ULB(s)${
          this.reportForm.controls.isComparative.value ? " for Comparison" : ""
        }.`;
      }

      return this._dialog.open(DialogComponent, {
        data: { message: alertMessage },
      });
    }

    if (this.reportForm.invalid) {
      this.isFormInvalid = true;
      return false;
    }

    this.isFormInvalid = false;

    // IMPORTANT ADD BaseULBSelected here for comparision;
    if (
      this.reportForm.value.isComparative &&
      this.reportForm.value.ulbList[0].code != this.baseULBSelected.code
    ) {
      this.reportForm.value.ulbList = [
        { ...this.baseULBSelected },
        ...this.reportForm.value.ulbList,
      ];
    }

    this.populateReportGroup();

    if (
      this.reportForm.value.ulbList[0] &&
      this.reportForm.value.ulbList[1] &&
      this.reportForm.value.ulbList[0] == this.reportForm.value.ulbList[1]
    ) {
      const message = "Please select different ULBs to compare";
      return this._dialog.open(DialogComponent, {
        data: { message },
      });
    } else if (
      this.reportForm.value.ulb &&
      [
        "Municipal Corporation",
        "Municipality",
        "Town Panchayat",
        "All",
      ].indexOf(this.reportForm.value.ulb.value) > -1
    ) {
      this.reportForm.value.ulbList = [];
      const ulbType = this.reportForm.value.ulb.value;
      this.ulbs.forEach((ulb) => {
        if (ulbType == "All" || ulb.type == ulbType) {
          this.reportForm.value.ulbList.push(ulb.code);
        }
      });

      if (this.reportForm.value.ulbList.length == 0) {
        const message = "No Ulbs available under current selection";
        return this._dialog.open(DialogComponent, {
          data: { message },
        });
        return false;
      }

      // this.reportForm.value.reportGroup = 'Income & Expenditure Statement';
      this.reportService.getAggregate(this.reportForm.value);
    } else if (this.activeGroup == "IE") {
      console.log(`final report value  `, this.reportForm.value);
      this.reportService.ieDetailed(this.reportForm.value);
    } else {
      this.reportService.BSDetailed(this.reportForm.value);
    }
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this._loaderService.showLoader();
    this.clickedOnGenerateReport = true;

    if (
      this.reportForm.value.ulbList.length == 1 &&
      !this.reportForm.value.isComparative
    ) {
      console.log("baisc");
      this.router.navigate(["/financial-statement/report/basic"]);
    } else if (
      this.reportForm.value.ulbList.length > 1 ||
      this.reportForm.value.yearList.length > 1
    ) {
      this.router.navigate(["/financial-statement/report/comparative-ulb"]);
    } else if (
      ["Common Size Detailed ULB", "Common Size Summary ULB"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/financial-statement/report/common-size-ulb"]);
    } else if (
      ["Common Size Detailed", "Common Size Summary"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/financial-statement/report/common-size"]);
    } else if (
      ["detailed", "summary"].indexOf(this.reportForm.value.type) > -1
    ) {
      this.router.navigate(["/financial-statement/report/basic"]);
    } else if (
      ["Comparative Detailed", "Comparative Summary"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/financial-statement/report/comparative"]);
    } else if (
      ["Comparative Detailed ULB", "Comparative Summary ULB"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/financial-statement/report/comparative-ulb"]);
    } else {
      alert("Something went wrong!");
    }
  }

  openUlbModal(
    template: TemplateRef<any>,
    type: "base" | "comparision" = "base"
  ) {
    this.modelOpenForType = type;
    if (this.reportForm.value.isComparative) {
      this.ulbTypeSelected = "base";
    } else {
      this.ulbTypeSelected = "other";
    }
    this.modalRef = this.modalService.show(template, {
      class: "modal-lg",
    });
  }

  // Click event on parent checkbox
  // selectStateCheckbox(selectedSate) {
  //   // for (var i = 0; i < selectedSate.value.ulbs.length; i++) {
  //   //   selectedSate.value.ulbs[i].isSelected = selectedSate.value.isSelected;
  //   // }
  // }

  /**
   * This method is executed on Clear Filter button click.
   */
  uncheckAllULBS() {
    this.reportForm.controls.ulbList.setValue([]);
    Object.values(this.ulbs.data).map(
      (state: { isSelected: boolean; ulbs: IULB[]; state: string }) => {
        state.isSelected = false;
        this.unselectStateULBS(state);
      }
    );
  }

  /**
   * This method is executed whenever the user want to unselect
   * all the selected ulb of a particular state.
   */
  unselectStateULBS(state: {
    isSelected: boolean;
    state: string;
    ulbs: IULB[];
  }) {
    this.selectedUlbs = this.selectedUlbs.filter(
      (ulb) => ulb.state !== state.state
    );

    this.reportForm.controls.ulbList.setValue([...this.selectedUlbs]);
    state.ulbs = state.ulbs.map((ulb) => ({ ...ulb, isSelected: false }));
  }

  // // Click event on child checkbox
  // selectUlbCheckbox(ulb, selectedState, ulbs) {
  //   selectedState.value.isSelected = ulbs.some(function(itemChild: any) {
  //     return itemChild.isSelected == true;
  //   });

  //   if (ulb.value.isSelected) {
  //     this.selectedUlbs.push(ulb.value);
  //   } else {
  //     for (let i = 0; i < this.selectedUlbs.length; i++) {
  //       if (this.selectedUlbs[i].code == ulb.value.code) {
  //         this.selectedUlbs.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.reportForm.controls.ulbList.setValue([...this.selectedUlbs]);
  // }

  /**
   * This method is executed whenver Clear All button is clicked on Population dropdown
   */
  unselectAllPopulation(event) {
    this.ulbForm.ulbPopulationFilter = [];
  }

  // unselectAllULBTypes(event) {
  //   this.ulbForm.ulbTypeFilter = [];
  //   this.filterUlbs(event);
  // }

  /**
   * This method is executed whenever poluation filter is changed.
   */
  filterUlbsOnPopulationChange(filterName) {
    const states = this.filterULBByFilters("");
    this.ulbs = { ...states };
    if (this.currentStateInView) {
      const stateToShow = states.data[this.currentStateInView.key]
        ? { ...states.data[this.currentStateInView.key] }
        : null;
      if (stateToShow) {
        this.filteredULBTypes = this.filterEmptyULBForState(stateToShow);
        this.ulbTypeInView = this.filteredULBTypes.some(
          (uType) => uType.type === this.ulbTypeInView.type
        )
          ? this.ulbTypeInView
          : this.filteredULBTypes[0];
        stateToShow.ulbs = stateToShow.ulbs.filter((ulb) =>
          this.ulbTypeInView ? ulb.type === this.ulbTypeInView.type : true
        );
        this.currentStateInView = {
          key: this.currentStateInView.key,
          value: { ...stateToShow },
        };
        const originalState = {
          ...this.originalUlbList.data[this.currentStateInView.key],
        };
      } else {
        this.currentStateInView = null;
      }
    }
  }

  filterULBByPopulation(ulbList: IULB[]) {
    return ulbList.filter((ulb) => {
      if (!this.ulbForm.ulbPopulationFilter.length) {
        return true;
      }
      const canShowULB = this.ulbForm.ulbPopulationFilter.some(
        (option) => option.min <= ulb.population && option.max >= ulb.population
      );
      return canShowULB;
    });
  }

  // filterUlbByLetter(char) {
  //   const resultData = {};
  //   const ulbList = JSON.parse(JSON.stringify(this.originalUlbList.data));

  //   const states = Object.keys(ulbList);
  //   for (let i = 0; i < states.length; i++) {
  //     const ulbs = ulbList[states[i]]["ulbs"];
  //     if (ulbs && ulbs.length > 0) {
  //       const filteredUlbs = [];
  //       for (let j = 0; j < ulbs.length; j++) {
  //         if (ulbs[j] && ulbs[j].name.toUpperCase().charAt(0) == char) {
  //           filteredUlbs.push(ulbs[j]);
  //         }
  //       }

  //       if (filteredUlbs.length > 0) {
  //         resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
  //         resultData[states[i]]["ulbs"] = filteredUlbs;
  //       }
  //     }
  //   }
  //   this.ulbs.data = resultData;
  // }

  // filterUlbByPopulation(ulbList) {
  //   const resultData = {};
  //   const populationFilter = this.ulbForm.ulbPopulationFilter;
  //   const states = Object.keys(ulbList);
  //   // var states = Object.keys(this.ulbs.data);
  //   for (let i = 0; i < states.length; i++) {
  //     const ulbs = ulbList[states[i]]['ulbs'];
  //     // var ulbs = this.ulbs.data[states[i]]['ulbs'];
  //     if (ulbs && ulbs.length > 0) {
  //       const filteredUlbs = [];
  //       for (let ulbIndex = 0; ulbIndex < ulbs.length; ulbIndex++) {
  //         for (let k = 0; k < populationFilter.length; k++) {
  //           if (
  //             ulbs[ulbIndex].population > populationFilter[k]['min'] &&
  //             ulbs[ulbIndex].population <= populationFilter[k]['max']
  //           ) {
  //             filteredUlbs.push(ulbs[ulbIndex]);
  //           }
  //         }
  //       }
  //       resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
  //       resultData[states[i]]['ulbs'] = filteredUlbs;
  //     }
  //   }

  //   return resultData;
  // }

  // filterUlbByType(ulbList) {
  //   const resultData = {};

  //   const ulbTypeFilter = this.ulbForm.ulbTypeFilter;
  //   const states = Object.keys(ulbList);
  //   for (let i = 0; i < states.length; i++) {
  //     const ulbs = ulbList[states[i]]['ulbs'];
  //     if (ulbs && ulbs.length > 0) {
  //       const filteredUlbs = [];
  //       for (let j = 0; j < ulbs.length; j++) {
  //         if (ulbTypeFilter.length == 0) {
  //           filteredUlbs.push(ulbs[j]);
  //           continue;
  //         }
  //         for (let k = 0; k < ulbTypeFilter.length; k++) {
  //           if (ulbs[j].type == ulbTypeFilter[k]['id']) {
  //             filteredUlbs.push(ulbs[j]);
  //           }
  //         }
  //       }
  //       resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
  //       resultData[states[i]]['ulbs'] = filteredUlbs;
  //     }
  //   }
  //   return resultData;
  // }

  // clearAllULBOf(stateCode: string) {
  //   delete this.StateULBTypeMapping[stateCode];
  // }

  onULBClick(stateCode: string, ulbType: { type: IULB["type"] }, ulb: IULB) {
    const ulbCode = ulb.code;

    if (!this.StateULBTypeMapping[stateCode]) {
      this.StateULBTypeMapping = {
        ...this.StateULBTypeMapping,
        [stateCode]: { [ulbType.type]: { [ulbCode]: ulb } },
      };
    } else if (!this.StateULBTypeMapping[stateCode][ulbType.type]) {
      this.StateULBTypeMapping[stateCode][ulbType.type] = { [ulb.code]: ulb };
    } else if (!this.StateULBTypeMapping[stateCode][ulbType.type][ulb.code]) {
      this.StateULBTypeMapping[stateCode][ulbType.type][ulbCode] = ulb;
    } else {
      // At this point of time, it means the ulb was already selected and now it needs to be removed.
      delete this.StateULBTypeMapping[stateCode][ulbType.type][ulbCode];
    }
    this.updateSelectedULBSFromMapping();
    const allULBAreSameType = this.reportForm.controls.ulbList.value.every(
      (formULB) =>
        this.reportForm.controls.ulbList.value.length
          ? formULB.type === this.reportForm.controls.ulbList.value[0].type
          : true
    );
    if (this.isAlertForDifferentULBShown && allULBAreSameType) {
      this.isAlertForDifferentULBShown = false;
    }
    this.checkAlertForDifferentULB(
      this.reportForm.controls.ulbList.value[
        this.reportForm.controls.ulbList.value.length - 1
      ]
    );
  }

  /**
   * If we are selecting 2 different types of ULB (for ex:  1 ULB from Municipality
   * and 2nd ULB from Town Panchayat), then we have to show the a popup message to warn the user.
   */
  checkAlertForDifferentULB(latestULB: IULB) {
    if (!this.isAlertForDifferentULBShown) {
      const allULBAreSameType = this.reportForm.controls.ulbList.value.every(
        (formULB) => formULB.type === latestULB.type
      );
      if (!allULBAreSameType) {
        const alreadySelectULB: IULB = this.reportForm.controls.ulbList
          .value[0];
        const message = `You are selecting a ULB of a different type. Earlier ULB selected are of ${alreadySelectULB.type} type, but now you are selecting from ${latestULB.type} type`;
        this.isAlertForDifferentULBShown = true;

        return this._dialog.open(DialogComponent, {
          data: { message },
        });
      }
    }
  }

  /**
   * This method is executed whenever a ulb is selected.
   */
  updateSelectedULBSFromMapping() {
    let myArray = [];

    Object.keys(this.StateULBTypeMapping).forEach((newStateCode) => {
      Object.values(this.StateULBTypeMapping[newStateCode]).forEach(
        (option) => {
          myArray.push(Object.values(option));
        }
      );
    });

    myArray = ((myArray as any) as CustomArray<IULB[]>).flat();

    if (myArray) {
      this.selectedUlbs = myArray;
      const areAllSameULBS = this.selectedUlbs.every(
        (ulb) => ulb.type === myArray[0].type
      );
      if (areAllSameULBS) {
        this.isAlertForDifferentULBShown = false;
      }
      this.reportForm.controls.ulbList.setValue(myArray);
    } else {
      this.selectedUlbs = [];
      this.reportForm.controls.ulbList.setValue([]);
    }
  }

  /**
   * This method is executed whenever user want to clear ULB of either a State or of a Type.
   * (Municipality/Town Panchayat/Municipal Corporation)
   */
  removeAllSelectedULB(
    stateCode: string,
    ulbType?: IULB["type"],
    checkboxElement?: HTMLElement
  ) {
    if (checkboxElement) {
      checkboxElement["checked"] = false;
    }
    if (!ulbType) {
      delete this.StateULBTypeMapping[stateCode];
    } else {
      delete this.StateULBTypeMapping[stateCode][ulbType];
    }

    this.updateSelectedULBSFromMapping();
  }

  /**
   * This method is executed on selecting Base ULB in comparative report.
   * If the selected bae ulb is already selected as ULB for comparison, then it has
   * to be removed from Comparison and then update the selected ULBs for Comparison.
   */
  onSelectingBaseULB(ulbToSelect: IULB, stateCode: string) {
    this.baseULBSelected = ulbToSelect;
    if (
      this.StateULBTypeMapping[stateCode] &&
      this.StateULBTypeMapping[stateCode][ulbToSelect.type] &&
      this.StateULBTypeMapping[stateCode][ulbToSelect.type][ulbToSelect.code]
    ) {
      delete this.StateULBTypeMapping[stateCode][ulbToSelect.type][
        ulbToSelect.code
      ];
      this.updateSelectedULBSFromMapping();
    }
  }

  /**
   * This method is used to show the number of selected ulb beside State Name / ULB Type Names
   */
  getTotalULBSelectedBy(
    stateCodeToSearch: string,
    ulbTypeToSearch?: { type: string }
  ) {
    let total = 0;
    if (!this.StateULBTypeMapping[stateCodeToSearch]) {
      return total;
    }

    if (!ulbTypeToSearch || !ulbTypeToSearch.type) {
      Object.values(this.StateULBTypeMapping[stateCodeToSearch]).forEach(
        (ulbType) => {
          Object.values(ulbType).forEach((ulb) => total++);
        }
      );
    } else {
      if (!this.StateULBTypeMapping[stateCodeToSearch][ulbTypeToSearch.type]) {
        return total;
      }
      total = Object.values(
        this.StateULBTypeMapping[stateCodeToSearch][ulbTypeToSearch.type]
      ).length;
    }
    return total;
  }

  /**
   * This method is executed whenever clear all button is clicked.
   */
  clearFilter() {
    this.selectedUlbs = [];

    this.ulbForm = {
      ulbFilter: "",
      ulbPopulationFilter: [],
      ulbTypeFilter: [],
    };

    // Object.assign(this.ulbs, this.originalUlbList);
    this.resetPage();
    this.clickedOnGenerateReport = false;
  }

  /**
   * This method is invoked whenever clear all button is click or comparative button is toggled.
   */
  resetSelectedULB() {
    this.selectedUlbs = [];
    this.uncheckAllULBS();
  }

  filterULBIfExists(ulbTypeToCheck: ulbType) {
    return this.currentStateInView.value.ulbs.some(
      (ulb) => ulb.type === ulbTypeToCheck
    );
  }

  ngOnDestroy() {
    this.resetPage();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
