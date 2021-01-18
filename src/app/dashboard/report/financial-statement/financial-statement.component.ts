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

interface CustomArray<T> {
  flat(): Array<T>;

  flatMap(func: (x: T) => T): Array<T>;
}

@Component({
  selector: "app-report",
  templateUrl: "./financial-statement.component.html",
  styleUrls: ["./financial-statement.component.scss"],
})
export class FinancialStatementComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private _loaderService: GlobalLoaderService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private reportService: ReportService,
    private router: Router,
    private _dialog: MatDialog,
    private authService: AuthService
  ) {}
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

  originalUlbList: IULBResponse["data"]["ss"]["ulbs"];

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
  ngOnInit(): void {
    this.initializeFilterForm();
    this.fetchULBList();
  }

  private initializeFilterForm() {
    this.filterForm = this.formBuilder.group({
      ulbs: [""],
      years: this.formBuilder.array([]),
    });

    console.log(this.filterForm);

    this.filterForm.controls.ulbs.valueChanges.subscribe(
      (newValue) => (this.yearListUpdate = false)
    );
  }

  private fetchULBList() {
    this._loaderService.showLoader();
    this.commonService.getULBSByYears([]).subscribe(
      (response: IULBResponse) => {
        this.originalUlbList = [];
        Object.values(response.data).forEach((value) => {
          if (!value.ulbs) return;
          this.originalUlbList.push(...value.ulbs);
        });

        this.ulbListForDropdown = [...this.originalUlbList];

        this._loaderService.stopLoader();
      },
      () => {}
    );
  }

  onClosingULBSelection() {
    this.commonYears = [];
    const ulbs: IULBResponse["data"]["ss"]["ulbs"] = this.filterForm.controls
      .ulbs.value;
    const ulbToCompare = ulbs[0];

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
      return (this.filterForm.controls.years as FormArray)
        .at(indexOfYearSelected)
        .setValue(null);
    }

    yearControl.setValue(this.commonYears[indexOfYearSelected]);
  }

  showData() {
    this.formInvalidMessage = this.validateFormError();

    if (this.formInvalidMessage) return;
    this.showReport = true;
  }

  private validateFormError() {
    let errorMessage;
    errorMessage = null;
    const ulbList = this.filterForm.value.ulbs;
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
    return errorMessage;
  }

  ngOnDestroy() {}
}
