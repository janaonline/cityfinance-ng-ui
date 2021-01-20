import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';

import { AuthService } from '../../../../app/auth/auth.service';
import { GlobalLoaderService } from '../../../../app/shared/services/loaders/global-loader.service';
import { CommonService } from '../../../shared/services/common.service';
import { IBasicLedgerData } from '../models/basicLedgerData.interface';
import { ReportService } from '../report.service';
import { ReportComponent } from '../report/report.component';

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

  ulbListForDropdown: IULBResponse["data"]["ss"]["ulbs"];

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

  formInvalidMessage: string;
  showReport = false;
  shiftFormToLeft = false;
  ngOnInit(): void {
    this.initializeFilterForm();
    this.fetchULBList();
  }

  protected initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      ulbList: [""],
      ulbIds: [],
      years: this.formBuilder.array([]),
      yearList: [],
      type: ["Summary"],
      valueType: ["absolute"],
      reportGroup: ["Income & Expenditure Statement"],
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
      this.NeworiginalUlbList = res.data;
      this._loaderService.stopLoader();
    });
    // this.commonService.getULBSByYears([]).subscribe(
    //   (response: IULBResponse) => {
    //     this.NeworiginalUlbList = [];
    //     Object.values(response.data).forEach((value) => {
    //       if (!value.ulbs) return;
    //       this.NeworiginalUlbList.push(...value.ulbs);
    //     });

    //     // this.ulbListForDropdown = [...this.NeworiginalUlbList];

    //   },
    //   () => {}
    // );
  }

  onClosingULBSelection() {
    this.commonYears = [];
    const ulbs: IULBResponse["data"]["ss"]["ulbs"] = this.filterForm.controls
      .ulbList.value;

    if (!ulbs || !ulbs.length) return;
    this.filterForm.controls.ulbIds.setValue(ulbs.map((ulb) => ulb._id));
    this.createYearCotnrols(ulbs, true);
  }

  createYearCotnrols(
    ulbs: IULBResponse["data"]["ss"]["ulbs"],
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

    ulbToCompare.allYears.forEach((yearToSearch) => {
      const yearExitsInAllULB = ulbs.every((ulb) =>
        ulb.allYears.length ? ulb.allYears.includes(yearToSearch) : true
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
      // (this.filterForm.controls.years as FormArray)
      //   .at(indexOfYearSelected)
      //   .setValue(null);
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
    // this.filterForm.controls.years.setValue(yearList);
    return errorMessage;
  }

  ngOnDestroy() {}
}
