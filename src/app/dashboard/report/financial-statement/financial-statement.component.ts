import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { merge } from 'rxjs';
import { debounceTime, distinct } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { IULB } from 'src/app/models/ulb';

import { AuthService } from '../../../../app/auth/auth.service';
import { GlobalLoaderService } from '../../../../app/shared/services/loaders/global-loader.service';
import { CommonService } from '../../../shared/services/common.service';
import { Datum, IBasicLedgerData } from '../models/basicLedgerData.interface';
import { ReportService } from '../report.service';
import { ReportComponent } from '../report/report.component';
import { ulbType } from '../report/ulbTypes';

interface CustomArray<T> {
  flat(): Array<T>;

  flatMap(func: (x: T) => T): Array<T>;
}

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
  ulbFilterControl: FormControl;
  stateSelectToFilterULB = new FormControl();

  formInvalidMessage: string;
  showReport = false;
  shiftFormToLeft = false;

  newULBTypes: ulbType[] = [
    ulbType.municipalCorporation,
    ulbType.municipality,
    ulbType.townPanchayat,
  ];
  ngOnInit(): void {
    this.initializeFilterForm();
    this.fetchULBList();
    this.ulbTypeInView.type = this.newULBTypes[0];
  }

  protected initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      ulbList: [[]],
      ulbIds: [[]],
      years: this.formBuilder.array([]),
      yearList: [],
      type: ["Summary"],
      valueType: ["absolute"],
      reportGroup: ["Income & Expenditure Statement"],
    });
    this.ulbFilterControl = this.formBuilder.control("");
    this.ulbFilterControl.valueChanges
      .pipe(debounceTime(100), distinct())
      .subscribe((textToSearch: string) => {
        if (!textToSearch || !textToSearch.trim()) {
          return (this.filteredULBList = [...this.NeworiginalUlbList]);
        }

        const newList: Datum[] = [];
        this.NeworiginalUlbList.forEach((state) => {
          const newULBList = state.ulbList.filter((ulb) =>
            ulb.name.toLowerCase().includes(textToSearch.toLowerCase())
          );
          if (!newList || !newULBList.length) return;
          newList.push({ ...state, ulbList: newULBList });
        });

        this.filteredULBList = [...newList];
        console.log(this.filteredULBList);
      });

    this.filterForm.controls.ulbList.valueChanges.subscribe(
      (newValue) => (this.yearListUpdate = false)
    );

    merge(
      this.filterForm.controls.type.valueChanges,
      this.filterForm.controls.valueType.valueChanges,
      this.filterForm.controls.reportGroup.valueChanges
    )
      .pipe(debounceTime(1000))
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
      this.NeworiginalUlbList = res.data.sort((stateA, stateB) => {
        stateA.ulbList = stateA.ulbList.sort((ulbA, ulbB) =>
          ulbA.name.localeCompare(ulbB.name)
        );
        stateB.ulbList = stateB.ulbList.sort((ulbA, ulbB) =>
          ulbA.name.localeCompare(ulbB.name)
        );
        return stateA._id.name.localeCompare(stateB._id.name);
      });
      this.filteredULBList = res.data;
      this._loaderService.stopLoader();
      this.stateSelectToFilterULB.setValue(
        this.NeworiginalUlbList[0]._id.state
      );
      this.showULBOfState(this.NeworiginalUlbList[0]._id.state);
    });
    // this.commonService.getULBSByYears([this.yearLookup[0].id]).subscribe(
    //   (response: IULBResponse) => {
    //     Object.values(response.data).forEach((state) => {
    //       state.ulbs = state.ulbs.sort((a, b) => (b.name > a.name ? -1 : 0));
    //     });
    //     this.originalUlbList = response;
    //     this.ulbs = JSON.parse(JSON.stringify(this.originalUlbList));

    //     this.setPopupDefaultView();

    //     this._loaderService.stopLoader();
    //   },
    //   () => {}
    // );
  }

  showULBOfState(stateId: IBasicLedgerData["data"][0]["_id"]["state"]) {
    console.log(`new state selected: `, stateId);
    const stateFound = this.NeworiginalUlbList.find(
      (state) => state._id.state === stateId
    );
    if (!stateFound) return console.warn("State not Found");
    this.ulbListForPopup = stateFound.ulbList.filter(
      (ulb) => ulb.ulbType === this.ulbTypeInView.type
    );

    console.log(`new ULB List: `, this.ulbListForPopup);
  }

  onSelectingULBType(type: ulbType) {
    if (this.ulbTypeInView.type === type) return;
    this.ulbTypeInView.type = type;
    this.showULBOfState(this.stateSelectToFilterULB.value);
  }

  selectULB(
    ulb: IBasicLedgerData["data"][0]["ulbList"][0],
    removeIfFound = false,
    stateId?: string
  ) {
    if (stateId) {
      this.onULBClick(stateId, { type: ulb.ulbType }, (ulb as any) as IULB);
    }

    const oldULBS: IBasicLedgerData["data"][0]["ulbList"] = this.filterForm
      .controls.ulbList.value;
    const indexFound = oldULBS.findIndex((oldulb) => oldulb.ulb === ulb.ulb);
    if (indexFound > -1) {
      console.log(`removeIfFound: ${removeIfFound}`);
      console.log(`indexFound: ${indexFound}`);

      if (removeIfFound) {
        oldULBS.splice(indexFound, 1);
      } else return;
    }
    oldULBS.push(ulb);
    this.filterForm.controls.ulbList.setValue(oldULBS);
    console.log(this.filterForm.controls.ulbList.value);
    this.onClosingULBSelection();

    // console.log(`mapping: \n`, this.StateULBTypeMapping);
  }

  onClosingULBSelection() {
    this.commonYears = [];
    const ulbs: IBasicLedgerData["data"][0]["ulbList"] = this.filterForm
      .controls.ulbList.value;

    if (!ulbs || !ulbs.length) return;
    this.filterForm.controls.ulbIds.setValue(ulbs.map((ulb) => ulb.ulb));
    this.createYearCotnrols(ulbs, true);
  }

  createYearCotnrols(
    ulbs: IBasicLedgerData["data"][0]["ulbList"],
    keepPreviousValues = false
  ) {
    const yearsSelected = this.filterForm.controls.years.value.filter(
      (year) => year
    );
    const yearControl = this.filterForm.controls.years as FormArray;

    while (yearControl.controls.length) {
      yearControl.removeAt(0);
    }

    const ulbToCompare = ulbs[0];

    ulbToCompare.financialYear.forEach((yearToSearch) => {
      const yearExitsInAllULB = ulbs.every((ulb) =>
        ulb.financialYear.length
          ? ulb.financialYear.includes(yearToSearch)
          : true
      );

      if (yearExitsInAllULB) {
        this.commonYears.push(yearToSearch);
        yearControl.push(this.formBuilder.control(null));
      }
    });
    this.yearListUpdate = true;

    if (!keepPreviousValues) return;

    // Set the previous selected year if present in the new year list
    yearsSelected.forEach((year, index) => {
      if (!this.commonYears.includes(year)) return;
      yearControl.at(index).setValue(year);
    });
  }

  removeSelectedULBAt(index: number) {
    const allULBs: IULBResponse["data"]["ss"]["ulbs"] = this.filterForm.value
      .ulbList;
    allULBs.splice(index, 1);

    this.onClosingULBSelection();
  }

  /**
   * @description Toggle year selection. Index must be from common year list.
   */
  onClickingYear(indexOfYearSelected: number) {
    const yearControl = (this.filterForm.controls.years as FormArray).at(
      indexOfYearSelected
    );

    if (yearControl.value) {
      return (this.filterForm.controls.years as FormArray)
        .at(indexOfYearSelected)
        .setValue(null);
    }
    (this.filterForm.controls.years as FormArray)
      .at(indexOfYearSelected)
      .setValue(this.commonYears[indexOfYearSelected]);

    yearControl.setValue(this.commonYears[indexOfYearSelected]);
  }

  showData() {
    this.formInvalidMessage = this.validateFormError();

    if (this.formInvalidMessage) return;
    this.shiftFormToLeft = true;
    setTimeout(() => {
      this.showReport = true;
    }, 1000);
    const value = { ...this.filterForm.value };

    value.years = value.years ? value.years.filter((year) => year) : null;
    this.reportForm.patchValue(value);

    this.search();
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
