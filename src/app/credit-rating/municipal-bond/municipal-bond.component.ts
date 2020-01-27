import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { MunicipalBondsService } from '../../shared/services/municipal/municipal-bonds.service';
import { IBondIssuer } from './models/bondIssuerResponse';
import { IBondIssuerItem, IBondIssureItemResponse } from './models/bondIssureItemResponse';

// import {LinkConverterPipe } from '@angular/common'
@Component({
  selector: "app-municipal-bond",
  templateUrl: "./municipal-bond.component.html",
  styleUrls: ["./municipal-bond.component.scss"]
})
export class MunicipalBondComponent implements OnInit {
  filterForm: FormGroup;
  ulbFilteredByName: any[] = [{ _id: "12", name: "testing" }];
  originalULBList: any[];
  yearsAvailable: any[] = [{ _id: "12", name: "testing" }];
  yearsDropdownSettings = {
    singleSelection: false,
    text: "Select Year/s",
    selectAllText: "Select All Years",
    unSelectAllText: "UnSelect All Years",
    enableSearchFilter: false,
    limitSelection: 4,
    badgeShowLimit: 1,
    classes: "myclass custom-class",
    primaryKey: "_id",
    labelKey: "name"
  };

  ulbDropdownConfiguration = {
    primaryKey: "_id",
    singleSelection: false,
    text: "Select ULB/s",
    selectAllText: "Select All ULB",
    unSelectAllText: "UnSelect All ULB",
    enableSearchFilter: false,
    limitSelection: 4,
    badgeShowLimit: 1,
    classes: "myclass custom-class",
    labelKey: "name"
  };

  mainRows: IBondIssuer;
  bondIssuerItemData: IBondIssuerItem[];

  accordianHeaderFormattedName: { [originalHeader: string]: string } = {};
  object = Object;

  formattedNamesMapping: { [nameIdentifier: string]: string } = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _bondService: MunicipalBondsService
  ) {
    this.initializeForm();
    this.initializeFormListeners();
    this._bondService
      .getBondIssuer()
      .subscribe(res => this.onGettingBondIssuerSuccess(res));
    this._bondService
      .getBondIssuerItem()
      .subscribe(res => this.onGettingBondIssuerItemSuccess(res));
    this._bondService.getULBS().subscribe(res => console.log(res));
  }

  private regexToSplitWordOnCapitalLetters = /([A-Z]+[^A-Z]*|[^A-Z]+)/;

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

  private onGettingBondIssuerItemSuccess(res: IBondIssureItemResponse) {
    console.log("bond issuer item ", res.data);
    this.bondIssuerItemData = res.data;
  }

  private capitalizedName(originalName: string) {
    return originalName.split(this.regexToSplitWordOnCapitalLetters).join(" ");
  }

  ngOnInit() {}

  onSubmittingFilterForm() {
    console.log(this.filterForm.value);
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
    this.filterForm.controls["ulbs"].valueChanges
      .pipe(map(newValue => (newValue ? newValue.trim() : null)))
      .subscribe(newValue => {
        console.log("new ulb types: ", newValue);
      });
  }

  private getULBFitleredBy(ulbName: string) {}

  private initializeForm() {
    this.filterForm = this._formBuilder.group({
      ulbs: [null],
      years: [null]
    });
  }
}
