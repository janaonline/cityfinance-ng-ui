import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { merge } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { IULB } from 'src/app/models/ulb';
import { JSONUtility } from 'src/app/util/jsonUtil';

import { AuthService } from '../../../../app/auth/auth.service';
import { GlobalLoaderService } from '../../../../app/shared/services/loaders/global-loader.service';
import { CommonService } from '../../../shared/services/common.service';
import { IBasicLedgerData, LedgerState, LedgerULB, TSearchedULB } from '../models/basicLedgerData.interface';
import { ReportService } from '../report.service';
import { ReportComponent } from '../report/report.component';
import { ulbType } from '../report/ulbTypes';

@Component({
  selector: "app-report",
  templateUrl: "./financial-statement.component.html",
  styleUrls: ["./financial-statement.component.scss"],
})
export class FinancialStatementComponent
  extends ReportComponent
  implements OnInit, OnDestroy {
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
    super(
      formBuilder,
      _loaderService,
      commonService,
      modalService,
      reportService,
      router,
      _dialog,
      authService
    );
  }
  multiSelectStates: Partial<DropdownSettings> = {
    primaryKey: "_id",
    singleSelection: false,
    text: "Select ULBs",
    enableSearchFilter: true,
    labelKey: "name",
    showCheckbox: true,
    noDataLabel: "No Data available",
    groupBy: "state",
    badgeShowLimit: 1,
  };

  NeworiginalUlbList: IBasicLedgerData["data"];
  filteredULBList: IBasicLedgerData["data"];

  ulbListForDropdown: IULBResponse["data"]["ss"]["ulbs"];

  ulbListForPopup: IBasicLedgerData["data"][0]["ulbList"];

  tempData = [];

  /**
   * @description These are the years that are common to all selected ULBs
   */
  commonYears: string[];

  /**
   * @description Flag to denote whether the year is update after selecting ulbs.
   * It set to False if a new ulb is selected or removed, and set to true
   * when the year list is processed.
   */
  yearListUpdate = false;

  filterForm: FormGroup;
  ulbSearchControl: FormControl;
  stateSelectToFilterULB = new FormControl();

  formInvalidMessage: string;
  showReport = false;
  shiftFormToLeft = false;

  newULBTypes: ulbType[] = [
    ulbType.municipalCorporation,
    ulbType.municipality,
    ulbType.townPanchayat,
  ];

  isULBSearchingInProgress = false;

  @ViewChild("autoCompleteInput", { static: false })
  autoCompleteInput: MatInput;

  jsonUtil = new JSONUtility();
  @ViewChild("widgetsContent") widgetsContent: ElementRef;

  showArrow = false;

  allFinancialYears: {
    value: string;
    isSelectable: boolean;
    selected: boolean;
  }[];

  ulbListForComparision: LedgerState[];

  ngOnInit(): void {
    this.initializeFilterForm();
    this.fetchULBList();
    this.fetchAllFinancialYears();
    this.ulbTypeInView.type = this.newULBTypes[0];
  }

  private fetchAllFinancialYears() {
    this.reportService.getFinancialYearBasedOnData().subscribe((res) => {
      this.allFinancialYears = res["data"].map((value) => ({
        value,
        isSelectable: false,
        selected: false,
      }));
    });
  }

  protected initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      ulbList: [[]],
      ulbIds: [[]],
      years: [[]],
      yearList: [],
      type: ["Summary"],
      valueType: ["absolute"],
      reportGroup: ["Income & Expenditure Statement"],
    });
    this.ulbSearchControl = this.formBuilder.control("");
    this.initializeULBSearch();

    this.filterForm.controls.ulbList.valueChanges.subscribe((newValue) => {
      this.yearListUpdate = false;
      if (!this.shiftFormToLeft) return;
    });
    this.initializeReportTypeChangeDetection();
  }

  private initializeULBSearch() {
    this.ulbSearchControl.valueChanges
      .pipe(
        tap((data) => (this.formInvalidMessage = null)),
        filter((value) => (value ? value.length >= 2 : true)),
        debounceTime(300),
        tap((data) => (this.isULBSearchingInProgress = true))
      )
      .subscribe((textToSearch: string) => {
        this.filteredULBList = null;
        textToSearch = textToSearch ? textToSearch.trim() : null;

        if (!textToSearch) {
          this.isULBSearchingInProgress = false;

          return (this.filteredULBList = this.getDefaultAutocompleteList());
        }

        const newList: LedgerState[] = [];
        this.NeworiginalUlbList.forEach((state) => {
          const newULBList = state.ulbList
            .filter((ulb) => {
              return ulb.name.match(new RegExp(textToSearch, "gi"));
            })
            .map((oldULB: TSearchedULB) => {
              const ulb = { ...oldULB };
              const matchedText = ulb.name.match(
                new RegExp(textToSearch, "gi")
              );

              new Set(matchedText).forEach((text) => {
                ulb.searchedName = ulb.name.replace(
                  new RegExp(text + "(?!([^<]+)?>+)", "g"),
                  `<span class="search-text-matched">${text}</span>`
                );
              });

              return ulb;
            });
          if (!newList || !newULBList.length) return;
          newList.push({ ...state, ulbList: newULBList });
        });

        this.filteredULBList = [...newList];
        this.isULBSearchingInProgress = false;
      });
  }

  private initializeULBListForComparision() {
    const yearsAvailable = this.allFinancialYears
      .filter((year) => year.isSelectable)
      .map((year) => year.value);
    this.NeworiginalUlbList.forEach((state) => {
      const filteredULBs = state.ulbList.filter((ulb) =>
        ulb.financialYear?.some((year) => yearsAvailable.includes(year))
      );
      if (!filteredULBs.length) return;

      console.log(state._id.name, filteredULBs);
    });
  }

  /**
   * @description This List will be shown in auto-complete
   * ulb search.
   */
  private getDefaultAutocompleteList() {
    if (!this.NeworiginalUlbList || !this.NeworiginalUlbList.length) return [];
    return [...this.NeworiginalUlbList.slice(0, 2)];
  }

  /**
   * @description Whenever the value in these controls changes,
   * we need to re-calculate the values for table.
   */
  private initializeReportTypeChangeDetection() {
    merge(
      this.filterForm.controls.type.valueChanges,
      this.filterForm.controls.valueType.valueChanges,
      this.filterForm.controls.reportGroup.valueChanges
    )
      .pipe(debounceTime(200))
      .subscribe((newValues) => {
        this.showData();
      });
  }

  updateReportGroup(newValue: string) {
    this.filterForm.controls.reportGroup.setValue(newValue);
  }

  protected fetchULBList() {
    this._loaderService.showLoader();
    this.commonService.fetchBasicLedgerData().subscribe((res) => {
      this._loaderService.showLoader();

      this.NeworiginalUlbList = res.data;
      this.filteredULBList = this.getDefaultAutocompleteList();
      this._loaderService.stopLoader();
      this.stateSelectToFilterULB.setValue(
        this.NeworiginalUlbList[0]._id.state
      );
      this.showULBOfState(this.NeworiginalUlbList[0]._id.state);
    });
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft = -200;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft = 200;
  }

  showULBOfState(stateId: IBasicLedgerData["data"][0]["_id"]["state"]) {
    const stateFound = this.NeworiginalUlbList.find(
      (state) => state._id.state === stateId
    );
    if (!stateFound) return console.warn("State not Found");
    this.ulbListForPopup = stateFound.ulbList.filter(
      (ulb) => ulb.ulbType === this.ulbTypeInView.type
    );
  }

  onSelectingULBType(type: ulbType) {
    if (this.ulbTypeInView.type === type) return;
    this.ulbTypeInView.type = type;
    this.showULBOfState(this.stateSelectToFilterULB.value);
  }

  selectBaseULB(
    ulb: IBasicLedgerData["data"][0]["ulbList"][0],
    removeIfFound = false,
    stateId?: string
  ) {
    if (!ulb.financialYear) return;
    if (stateId) {
      this.onULBClick(stateId, { type: ulb.ulbType }, (ulb as any) as IULB);
    }

    const baseULB: IBasicLedgerData["data"][0]["ulbList"][0] = this.filterForm
      .controls.ulbList.value[0];

    /**
     * When user the typed in search box and select a ulb,
     * we need to unfocus the auto-complete input to show new
     * lists.
     */
    (document.activeElement as HTMLElement).blur();
    if (baseULB?.ulb === ulb.ulb) {
      this.formInvalidMessage = `${baseULB.name} is already selected.`;
      return;
    }

    this.filterForm.controls.ulbList.reset();

    this.filterForm.controls.ulbList.setValue([ulb]);
    this.filterForm.controls.ulbList.updateValueAndValidity();
    this.onClosingULBSelection();
    this.ulbSearchControl.setValue("");

    this.updateFinancialYearSelection();
    this.initializeULBListForComparision();
  }

  private updateFinancialYearSelection() {
    const baseULB: LedgerULB = this.filterForm.controls.ulbList.value[0];
    const preSelectedYears = [];
    this.allFinancialYears.forEach((year) => {
      if (baseULB.financialYear?.includes(year.value)) {
        year.isSelectable = true;
        if (year.selected) {
          preSelectedYears.push(year.value);
        }
        return;
      }

      year.isSelectable = false;
      year.selected = false;
    });
    this.filterForm.controls.years.setValue(preSelectedYears);
  }

  selectULB(
    ulb: IBasicLedgerData["data"][0]["ulbList"][0],
    removeIfFound = false,
    stateId?: string
  ) {
    if (!ulb.financialYear) return;
    if (stateId) {
      this.onULBClick(stateId, { type: ulb.ulbType }, (ulb as any) as IULB);
    }

    const oldULBS: IBasicLedgerData["data"][0]["ulbList"] = this.filterForm
      .controls.ulbList.value;
    const indexFound = oldULBS.findIndex((oldulb) => oldulb.ulb === ulb.ulb);
    this.ulbSearchControl.setValue("");
    /**
     * When user the typed in search box and select a ulb,
     * we need to unfocus the auto-complete input to show new
     * lists.
     */
    (document.activeElement as HTMLElement).blur();
    if (indexFound > -1) {
      if (removeIfFound) {
        oldULBS.splice(indexFound, 1);
      } else {
        this.formInvalidMessage = `${oldULBS[indexFound].name} is already selected.`;
        return;
      }
    }
    if (indexFound == -1) oldULBS.push(ulb);
    this.filterForm.controls.ulbList.setValue(oldULBS);
    this.filterForm.controls.ulbList.updateValueAndValidity();
    // this.onClosingULBSelection();
  }

  resetPage() {
    this.initializeFilterForm();
    this.shiftFormToLeft = false;
    this.showReport = false;
    this.commonYears = null;
    this.formInvalidMessage = null;
    this.showArrow = false;

    this.allFinancialYears.forEach((year) => {
      year.isSelectable = false;
      year.selected = false;
    });
  }

  onClosingULBSelection() {
    this.commonYears = [];
    const ulbs: IBasicLedgerData["data"][0]["ulbList"] = this.filterForm
      .controls.ulbList.value;

    if (!ulbs || !ulbs.length) {
      this.filterForm.controls.years.reset();
      this.showArrow = false;
      return;
    }
    this.filterForm.controls.ulbIds.setValue(ulbs.map((ulb) => ulb.ulb));
    // this.createYearControls(ulbs, true);
    if (!this.shiftFormToLeft) return;

    setTimeout(() => this.calculateArrowVisibility(), 0);
  }

  calculateArrowVisibility() {
    const elements = document.getElementsByClassName("year");
    if (!elements) {
      this.showArrow = false;
      return;
    }
    let widthOfAllYear = 0;
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      widthOfAllYear += element.clientWidth;
    }
    const container = document.getElementById("years-container");
    if (widthOfAllYear > container.clientWidth) {
      this.showArrow = true;
    } else this.showArrow = false;
  }

  createYearControls(
    ulbs: IBasicLedgerData["data"][0]["ulbList"],
    keepPreviousValues = false
  ) {
    const ulbToCompare = ulbs[0];

    ulbToCompare.financialYear.forEach((yearToSearch) => {
      const yearExitsInAllULB = ulbs.every((ulb) =>
        ulb.financialYear.length
          ? ulb.financialYear.includes(yearToSearch)
          : true
      );

      if (yearExitsInAllULB) {
        this.commonYears.push(yearToSearch);
      }
    });
    this.yearListUpdate = true;

    return;
    const yearsSelected = this.filterForm.controls.years.value.filter(
      (year) => year
    );
    const yearControl = this.filterForm.controls.years as FormArray;

    while (yearControl.controls.length) {
      yearControl.removeAt(0);
    }

    if (!keepPreviousValues) return;

    // Set the previous selected year if present in the new year list
    yearsSelected.forEach((year, index) => {
      if (!this.commonYears.includes(year)) return;
      yearControl.at(index).setValue(year);
    });
  }

  removeSelectedULBAt(index: number) {
    const allULBs: LedgerULB[] = this.filterForm.value.ulbList;
    return this.selectULB(allULBs[index], true, allULBs[index]["stateId"]);

    allULBs.splice(index, 1);

    this.filterForm.controls.ulbList.updateValueAndValidity();
    this.onClosingULBSelection();
  }

  /**
   * @description Toggle year selection. Index must be from common year list.
   */
  onClickingYear(indexOfYearSelected: number) {
    const yearClicked = this.allFinancialYears[indexOfYearSelected];
    if (!yearClicked || !yearClicked.isSelectable) {
      this.updateFinancialYearSelection();
      return;
    }
    yearClicked.selected = !yearClicked.selected;
    this.updateFinancialYearSelection();

    // const yearControl = (this.filterForm.controls.years as FormArray).at(
    //   indexOfYearSelected
    // );

    // if (yearControl.value) {
    //   return (this.filterForm.controls.years as FormArray)
    //     .at(indexOfYearSelected)
    //     .setValue(null);
    // }
    // (this.filterForm.controls.years as FormArray)
    //   .at(indexOfYearSelected)
    //   .setValue(this.commonYears[indexOfYearSelected]);

    // yearControl.setValue(this.commonYears[indexOfYearSelected]);
    // this.formInvalidMessage = null;
  }

  showData() {
    this.formInvalidMessage = this.validateFormError();

    if (this.formInvalidMessage) return;
    this.shiftFormToLeft = true;
    setTimeout(() => {
      this.showReport = true;
    }, 1000);
    const value = this.jsonUtil.deepCopy({ ...this.filterForm.value });
    value.years = value.years ? value.years.filter((year) => year) : null;
    this.reportForm.patchValue(value);

    this.search();
    setTimeout(() => {
      this.calculateArrowVisibility();
    }, 1500);
  }

  protected validateFormError() {
    let errorMessage;
    errorMessage = null;
    const ulbList = this.filterForm.value.ulbList;
    if (!ulbList || !ulbList.length) {
      errorMessage = "Atleat 1 ULB ";
    }
    const yearList = this.filterForm.value.years.filter((year) => year);
    if (!yearList || !yearList.length) {
      if (errorMessage) {
        errorMessage += "and 1 Year must be selected";
      } else {
        errorMessage = "Atleast 1 Year must be selected ";
      }
    }
    this.filterForm.controls.yearList.setValue(
      yearList.map((year) => ({ id: year, itemName: year }))
    );
    return errorMessage;
  }

  ngOnDestroy() {}
}
