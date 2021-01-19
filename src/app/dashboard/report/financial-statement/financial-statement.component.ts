import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IULBResponse } from 'src/app/models/IULBResponse';

import { AuthService } from '../../../../app/auth/auth.service';
import { GlobalLoaderService } from '../../../../app/shared/services/loaders/global-loader.service';
import { CommonService } from '../../../shared/services/common.service';
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

  NeworiginalUlbList: IULBResponse["data"]["ss"]["ulbs"];

  ulbListForDropdown: IULBResponse["data"]["ss"]["ulbs"];

  tempData = [];

  // These are the years that aare common to all selected ULBs
  commonYears: string[];

  /**
   * Flag to denote whether the year is update after selecting ulbs.
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
  }

  protected fetchULBList() {
    this._loaderService.showLoader();
    this.commonService.getULBSByYears([]).subscribe(
      (response: IULBResponse) => {
        this.NeworiginalUlbList = [];
        Object.values(response.data).forEach((value) => {
          if (!value.ulbs) return;
          value.ulbs.forEach((ulb) => {
            // console.log(ulb);
            if (ulb.name == "Kannivadi-Dindugal Town Panchayat") {
              console.log(ulb);
            }
          });
          this.NeworiginalUlbList.push(...value.ulbs);
        });

        this.ulbListForDropdown = [...this.NeworiginalUlbList];

        this._loaderService.stopLoader();
      },
      () => {}
    );
  }

  onClosingULBSelection() {
    this.commonYears = [];
    const ulbs: IULBResponse["data"]["ss"]["ulbs"] = this.filterForm.controls
      .ulbList.value;

    (this.filterForm.controls.years as FormArray).reset();
    if (!ulbs || !ulbs.length) return;
    const ulbToCompare = ulbs[0];
    this.filterForm.controls.ulbIds.setValue(ulbs.map((ulb) => ulb._id));

    ulbToCompare.allYears.forEach((yearToSearch) => {
      const yearExitsInAllULB = ulbs.every((ulb) =>
        ulb.allYears.length ? ulb.allYears.includes(yearToSearch) : true
      );

      if (yearExitsInAllULB) {
        this.commonYears.push(yearToSearch);
        (this.filterForm.controls.years as FormArray).push(
          this.formBuilder.control(null)
        );
      }
    });
    this.yearListUpdate = true;
  }

  removeSelectedULBAt(index: number) {
    const allULBs: IULBResponse["data"]["ss"]["ulbs"] = this.filterForm.value
      .ulbs;
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
      (this.filterForm.controls.yearList as FormArray)
        .at(indexOfYearSelected)
        .setValue(null);
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
    console.log(value);
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
