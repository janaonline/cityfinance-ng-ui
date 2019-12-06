import { KeyValue } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IULBResponse } from 'src/app/models/IULBResponse';
import { IReportType } from 'src/app/models/reportType';
import { IULB } from 'src/app/models/ulb';

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
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
  // alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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
    ulbTypeFilter: []
  };
  submitted = false;
  isFormInvalid = false;

  yearLookup = [
    { id: "2015-16", itemName: "2015-16" },
    { id: "2016-17", itemName: "2016-17" },
    { id: "2017-18", itemName: "2017-18" }
  ];
  ulbTypeLookup = [
    { itemName: "All Municipal Corporation", id: "Municipal Corporation" },
    { itemName: "All Municipality", id: "Municipality" },
    { itemName: "All Town Panchayat", id: "Town Panchayat" }
  ];

  // ulbsToHide = ['AP008', 'AP018', 'AP019', 'AP025', 'AP053', 'AP081', 'AP083', 'KL012', 'TS033', 'UP010', 'AP010', 'AP011', 'AP012', 'AP023', 'AP035', 'AP062', 'AP082', 'CG005', 'CG006', 'JH002', 'JH004', 'JH005', 'JH008', 'JH009', 'JH015', 'JH018', 'JH020', 'JH021', 'JH022', 'JH023', 'JH024', 'JH025', 'JH029', 'JH036', 'JH037', 'KA012', 'KA013', 'KA021', 'KA028', 'KA041', 'KA050', 'KA051', 'KA053', 'KA082', 'KA095', 'KA128', 'KA139', 'KA165', 'KA174', 'KA179', 'KL003', 'MP001', 'MZ001', 'PB005', 'RJ003', 'RJ012', 'RJ018', 'RJ024', 'RJ031', 'RJ032', 'RJ035', 'RJ037', 'RJ039', 'RJ047', 'RJ048', 'RJ051', 'RJ052', 'RJ054', 'RJ060', 'RJ061', 'RJ062', 'RJ074', 'RJ080', 'RJ088', 'RJ090', 'RJ099', 'RJ111', 'RJ117', 'RJ118', 'RJ135', 'RJ138', 'RJ139', 'RJ146', 'RJ155', 'RJ157', 'RJ174', 'RJ177', 'RJ187', 'RJ192', 'TS016', 'TS019', 'TS031', 'UP001', 'UP002', 'UP003', 'UP005', 'UP006', 'UP008', 'CG001', 'CG002', 'CG003', 'GJ001', 'JH003', 'JH013', 'JH035', 'JH038', 'KA003', 'KA008', 'KA029', 'KA032', 'KA069', 'KA076', 'KA101', 'KA102', 'KA126', 'KA127', 'KA152', 'KA168', 'KA181', 'KL002', 'MP002', 'OD001', 'OD002', 'OD003', 'OD005', 'PB003', 'RJ020', 'RJ022', 'RJ025', 'RJ041', 'RJ070', 'RJ078', 'RJ079', 'RJ093', 'RJ101', 'RJ113', 'RJ115', 'RJ121', 'RJ150', 'RJ151', 'RJ154', 'RJ161', 'RJ163', 'RJ179', 'TN001', 'WB001'];
  // reportType = ["Summary", "Detailed", "Comparative Summary", "Comparative Detailed", "Comparative Summary ULB", "Comparative Detailed ULB", "Common Size Summary", "Common Size Detailed", "Common Size Summary ULB", "Common Size Detailed ULB"];

  populationData = [];
  selectedItems = [];
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

  Object = Object;

  baseULBSelected: IULB;

  searchByNameControl = new FormControl();

  isAlertForDifferentULBShown = false;

  ulbFilteredByName: IULB[];

  previousSearchedULB: IULB;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalService: BsModalService,
    private reportService: ReportService,
    private router: Router
  ) {
    this.commonService
      .getULBsStatistics(null)
      .subscribe(data => console.log(data));
  }

  get lf() {
    return this.reportForm.controls;
  }

  private listenToFormGroups() {
    this.searchByNameControl.valueChanges
      .pipe(debounce(() => interval(400)))
      .subscribe(newText => {
        this.ulbFilteredByName = [];
        const newULBS = this.filterULBByPopFilters("");
        Object.keys(newULBS.data).forEach(stateCode => {
          const state = newULBS.data[stateCode];
          const filteredULBS = state.ulbs
            .filter(ulb =>
              ulb.name.toLowerCase().includes(newText.toLowerCase())
            )
            .map(ulb => ({ ...ulb, stateCode }));
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
    this.reportForm.controls["type"].valueChanges
      .pipe(debounce(() => interval(400)))
      .subscribe((newType: IReportType["type"]) => {
        if (this.reportForm.valid) {
          this.search();
        }
      });

    this.reportForm.controls["isComparative"].valueChanges.subscribe(
      isComparative => {
        if (isComparative) {
          this.showAlertBoxForComparativeReport();
        }
        this.clearPopupValues();
        this.setULBType(
          isComparative ? null : "other",
          this.baseULBSelected ? true : false,
          this.reportForm.controls.isComparative.value
        );
      }
    );

    this.reportForm.controls["yearList"].valueChanges.subscribe(list => {
      this.getNewULBByDate(list);
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
        const ulbIds = newList.map(ulb => ulb["_id"] || "");
        this.reportForm.controls["ulbIds"].setValue(ulbIds);
      }
    );
  }

  getNewULBByDate(dates: string[]) {
    console.log(`getting new ulb by `, dates);
  }

  showAlertBoxForComparativeReport() {
    alert(`You have selected comparative report. Please follow the following procedure:
        Step 1 - Select year/s for which you want to compare.
        Step 2 - Select Base ULB.
        Step 3 - Select ULB/s for comparison.
    `);
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
      value: { ...stateToSet }
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

  filterULBByPopFilters(textToSeatch: string) {
    const newULBS: IULBResponse = {
      data: {},
      msg: this.originalUlbList.msg,
      success: this.originalUlbList.success
    };
    Object.keys(this.originalUlbList.data).forEach(stateKey => {
      let filteredULBS = (<IULB[]>(
        this.originalUlbList.data[stateKey].ulbs
      )).filter(ulb =>
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
          ulbs: filteredULBS
        };
      }
    });
    return newULBS;
  }

  setCurrentStateInView() {}

  valueAscOrder = (
    a: KeyValue<number, { name: string }>,
    b: KeyValue<number, { name: string }>
  ): number => {
    return a.value.name > b.value.name ? 1 : -1;
  };

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

  setULBTypeOfState(type: { type: ulbType }) {
    this.ulbTypeInView = type;
    this.showState(this.currentStateInView);
  }

  showState(state: { key: string; value: { state: string; ulbs: IULB[] } }) {
    if (!state) {
      return (this.currentStateInView = null);
    }
    if (!this.ulbTypeInView) {
      this.ulbTypeInView = { type: this.ULBTYPES[0].type };
    }
    const stateFound = this.ulbs.data[state.key];
    const newState = { key: state.key, value: { ...stateFound } };
    const fitlerULB = newState.value.ulbs
      ? newState.value.ulbs.filter(ulb => {
          return ulb.type === this.ulbTypeInView.type;
        })
      : [];

    newState.value.ulbs = fitlerULB;

    if (this.ulbForm.ulbPopulationFilter.length) {
      newState.value.ulbs = newState.value.ulbs.filter(ulb => {
        const canShowULB = this.ulbForm.ulbPopulationFilter.some(
          option => option.min <= ulb.population && option.max >= ulb.population
        );
        return canShowULB;
      });
    }
    this.currentStateInView = newState;
  }

  resetPopupValues() {
    console.log("resetting pop");
    this.clearPopupValues();
    this.setPopupDefaultValues();
  }

  clearPopupValues() {
    this.reportForm.patchValue({
      yearList: [],
      ulbList: [],
      year: []
    });
    this.reportForm.controls.yearList.setValue([]);
    this.selectedUlbs = null;
    this.StateULBTypeMapping = {};
    this.baseULBSelected = null;
    this.ulbForm = {
      ulbFilter: "",
      ulbPopulationFilter: [],
      ulbTypeFilter: []
    };
    this.searchByNameControl.setValue("");
    this.baseULBSelected = null;
    this.currentStateInView = null;
    this.setULBTypeOfState(null);
  }

  setPopupDefaultValues() {
    if (
      this.originalUlbList.data &&
      Object.keys(this.originalUlbList.data).length
    ) {
      const firstStateKey = Object.keys(this.originalUlbList.data)[0];
      const firstState = this.originalUlbList.data[firstStateKey];
      this.currentStateInView = {
        key: firstStateKey,
        value: { ...firstState }
      };
      this.ulbTypeSelected = null;
      this.setULBTypeOfState(this.ULBTYPES[0]);
    } else {
      this.currentStateInView = null;
      this.ulbTypeSelected = null;
    }
  }

  resetPage() {
    this.resetPopupValues();
    this.reportForm.reset();
    this.reportForm.patchValue({
      type: "Summary",
      isComparative: false,
      yearList: [],
      ulbList: [],
      reportGroup: "Income & Expenditure Statement"
    });
    this.baseULBSelected = null;
    this.activeGroup = "IE";
    this.StateULBTypeMapping = {};
    this.reportService.reportResponse.next(null);
    this.submitted = false;
  }

  ngOnInit() {
    for (let i = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.populationData = [
      { id: 1, itemName: "Zero to 1 Lakh", min: 0, max: 100000 },
      { id: 2, itemName: "1 Lakh to 10 Lakhs", min: 100000, max: 1000000 },
      { id: 3, itemName: "10 Lakhs to 1 Crore", min: 1000000, max: 10000000 },
      { id: 4, itemName: "Above 1 Crore", min: 10000000, max: 100000000 }
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

    this.reportForm = this.formBuilder.group({
      isComparative: [false, []],
      type: ["Summary", Validators.required],
      years: [[]],
      yearList: [[], [Validators.required]],
      reportGroup: ["Income & Expenditure Statement", Validators.required],
      ulbList: [this.selectedUlbs, [Validators.required]],
      ulbIds: []
    });

    this.commonService.getAllUlbs().subscribe((response: IULBResponse) => {
      Object.values(response.data).forEach(state => {
        state.ulbs = state.ulbs.sort((a, b) => (b.name > a.name ? -1 : 0));
      });
      this.originalUlbList = response;
      this.ulbs = JSON.parse(JSON.stringify(this.originalUlbList));
      this.resetPopupValues();
    });

    this.listenToFormGroups();
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  onStateSelect(selectedState: any) {
    if (selectedState && selectedState.code) {
      this.commonService.getUlbByState(selectedState.code).subscribe(res => {
        const unsortedUlbs = res["data"]["ulbs"];

        const sortedUlbs = unsortedUlbs.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.ulbs = [...this.ulbs, ...sortedUlbs];
      });
    }
  }

  onStateDeselect(deselectedState: any) {}

  loadUlbs() {
    if (this.reportForm.value.state && this.reportForm.value.state.code) {
      this.commonService
        .getUlbByState(this.reportForm.value.state.code)
        .subscribe(res => {
          const unsortedUlbs = res["data"]["ulbs"];
          this.ulbs = unsortedUlbs.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        });
    }
  }

  reportTypeChange() {
    if (
      [
        "Comparative Detailed ULB",
        "Comparative Summary ULB",
        "Common Size Detailed ULB",
        "Common Size Summary ULB"
      ].indexOf(this.reportForm.value.type) > -1
    ) {
      this.isMultiULB = true;
    } else {
      this.isMultiULB = false;
    }
  }

  toggleTab(val: "IE" | "BS") {
    this.activeGroup = val;
    if (!this.reportForm.invalid) {
      // this.populateReportGroup();
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

  onDateSelectionClose(event) {
    // We need to sort the selected year in ascending as user can select in any order.
    this.reportForm.value.yearList.sort(
      (A, B) => A.id.split("-")[0] - B.id.split("-")[0]
    );
  }

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
        alertMessage += ` atleast 1 Year`;
      }
      if (isComparativeInvalid) {
        alertMessage += `${isYearSelected ? "" : ","} a base ulb`;
      }
      if (!isULBSelected) {
        alertMessage += `${
          isComparativeInvalid || !isYearSelected ? " and" : ""
        } atleast 1 ulb.`;
      }

      return alert(alertMessage);
    }
    // if (isComparativeInvalid) {
    //   return alert(
    //     "You have opted for Comparision report but not selected base ULB. Please select any base ULB to proceed further."
    //   );
    // }

    // if (!isULBSelected) {
    //   alert("Select atleast one ULB to continue");
    //   this.isFormInvalid = true;
    //   return false;
    // }

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
        ...this.reportForm.value.ulbList
      ];
    }

    this.populateReportGroup();

    if (
      this.reportForm.value.ulbList[0] &&
      this.reportForm.value.ulbList[1] &&
      this.reportForm.value.ulbList[0] == this.reportForm.value.ulbList[1]
    ) {
      alert("Please select different ULBs to compare");
    } else if (
      this.reportForm.value.ulb &&
      [
        "Municipal Corporation",
        "Municipality",
        "Town Panchayat",
        "All"
      ].indexOf(this.reportForm.value.ulb.value) > -1
    ) {
      this.reportForm.value.ulbList = [];
      const ulbType = this.reportForm.value.ulb.value;
      this.ulbs.forEach(ulb => {
        if (ulbType == "All" || ulb.type == ulbType) {
          this.reportForm.value.ulbList.push(ulb.code);
        }
      });

      if (this.reportForm.value.ulbList.length == 0) {
        alert("No Ulbs available under current selection");
        return false;
      }

      // this.reportForm.value.reportGroup = 'Income & Expenditure Statement';
      this.reportService.getAggregate(this.reportForm.value);
    } else if (this.activeGroup == "IE") {
      this.reportService.ieDetailed(this.reportForm.value);
    } else {
      this.reportService.BSDetailed(this.reportForm.value);
    }

    this.modalRef.hide();

    if (
      this.reportForm.value.ulbList.length == 1 &&
      !this.reportForm.value.isComparative
    ) {
      this.router.navigate(["/dashboard/report/basic"]);
    } else if (
      this.reportForm.value.ulbList.length > 1 ||
      this.reportForm.value.yearList.length > 1
    ) {
      this.router.navigate(["/dashboard/report/comparative-ulb"]);
    } else if (
      ["Common Size Detailed ULB", "Common Size Summary ULB"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/dashboard/report/common-size-ulb"]);
    } else if (
      ["Common Size Detailed", "Common Size Summary"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/dashboard/report/common-size"]);
    } else if (
      ["detailed", "summary"].indexOf(this.reportForm.value.type) > -1
    ) {
      this.router.navigate(["/dashboard/report/basic"]);
    } else if (
      ["Comparative Detailed", "Comparative Summary"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/dashboard/report/comparative"]);
    } else if (
      ["Comparative Detailed ULB", "Comparative Summary ULB"].indexOf(
        this.reportForm.value.type
      ) > -1
    ) {
      this.router.navigate(["/dashboard/report/comparative-ulb"]);
    } else {
      alert("Something went wrong!");
    }
  }

  openUlbModal(template: TemplateRef<any>) {
    if (this.reportForm.value.isComparative) {
      this.ulbTypeSelected = "base";
    } else {
      this.ulbTypeSelected = "other";
    }
    this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  }

  // Click event on parent checkbox
  selectStateCheckbox(selectedSate) {
    // for (var i = 0; i < selectedSate.value.ulbs.length; i++) {
    //   selectedSate.value.ulbs[i].isSelected = selectedSate.value.isSelected;
    // }
  }

  uncheckAllULBS() {
    this.reportForm.controls.ulbList.setValue([]);
    Object.values(this.ulbs.data).map(
      (state: { isSelected: boolean; ulbs: IULB[]; state: string }) => {
        state.isSelected = false;
        this.unselectStateULBS(state);
      }
    );
  }

  unselectStateULBS(state: {
    isSelected: boolean;
    state: string;
    ulbs: IULB[];
  }) {
    this.selectedUlbs = this.selectedUlbs.filter(
      ulb => ulb.state !== state.state
    );

    this.reportForm.controls.ulbList.setValue([...this.selectedUlbs]);
    state.ulbs = state.ulbs.map(ulb => ({ ...ulb, isSelected: false }));
  }

  // Click event on child checkbox
  selectUlbCheckbox(ulb, selectedState, ulbs) {
    selectedState.value.isSelected = ulbs.some(function(itemChild: any) {
      return itemChild.isSelected == true;
    });

    if (ulb.value.isSelected) {
      this.selectedUlbs.push(ulb.value);
    } else {
      for (let i = 0; i < this.selectedUlbs.length; i++) {
        if (this.selectedUlbs[i].code == ulb.value.code) {
          this.selectedUlbs.splice(i, 1);
        }
      }
    }
    this.reportForm.controls.ulbList.setValue([...this.selectedUlbs]);
  }

  unselectAllPopulation(event) {
    this.ulbForm.ulbPopulationFilter = [];
    // this.filterUlbs(event);
  }

  unselectAllULBTypes(event) {
    this.ulbForm.ulbTypeFilter = [];
    this.filterUlbs(event);
  }

  filterUlbs(filterName) {
    const newULBS = this.filterULBByPopFilters("");
    this.ulbs = { ...newULBS };
    if (this.currentStateInView) {
      const stateToShow = newULBS.data[this.currentStateInView.key]
        ? { ...newULBS.data[this.currentStateInView.key] }
        : null;
      if (stateToShow) {
        stateToShow.ulbs = stateToShow.ulbs.filter(ulb =>
          this.ulbTypeInView ? ulb.type === this.ulbTypeInView.type : true
        );
      } else {
        this.currentStateInView = null;
      }

      // console.log({ stateToShow });
      // this.currentStateInView = {
      //   key: this.currentStateInView.key,
      //   value: {
      //     state: stateToShow
      //       ? stateToShow.state
      //       : this.currentStateInView.value.state,
      //     ulbs: stateToShow && stateToShow.ulbs ? [...stateToShow.ulbs] : []
      //   }
      // };
    }

    // const nameToFilterBy = this.searchByNameControl.value;
    // if (
    //   this.ulbForm.ulbPopulationFilter.length == 0 &&
    //   this.ulbForm.ulbTypeFilter.length == 0
    // ) {
    //   if (this.currentStateInView) {
    //     const state = {
    //       ...this.originalUlbList.data[this.currentStateInView.key]
    //     };
    //     state.ulbs = state.ulbs
    //       .filter(ulb =>
    //         nameToFilterBy ? ulb.name.includes(nameToFilterBy) : true
    //       )
    //       .filter(ulb =>
    //         this.ulbTypeInView!.type
    //           ? this.ulbTypeInView.type === ulb.type
    //           : true
    //       );

    //     this.currentStateInView = {
    //       key: this.currentStateInView.key,
    //       value: state
    //     };
    //   }
    //   return;
    // } else if (filterName == "ulbPopulationFilter" && this.currentStateInView) {
    //   const state = {
    //     ...this.originalUlbList.data[this.currentStateInView.key]
    //   };

    //   state.ulbs = this.filterULBByPopulation(state.ulbs)
    //     .filter(ulb =>
    //       nameToFilterBy ? ulb.name.includes(nameToFilterBy) : true
    //     )
    //     .filter(ulb =>
    //       this.ulbTypeInView!.type ? this.ulbTypeInView.type === ulb.type : true
    //     );

    //   this.currentStateInView = {
    //     key: this.currentStateInView.key,
    //     value: state
    //   };
    // } else if (filterName == "ulbTypeFilter") {
    //   this.ulbForm.ulbPopulationFilter = [];
    //   this.ulbs.data = this.filterUlbByType(this.originalUlbList.data);
    // }
  }

  filterULBByPopulation(ulbList: IULB[]) {
    return ulbList.filter(ulb => {
      if (!this.ulbForm.ulbPopulationFilter.length) {
        return true;
      }
      const canShowULB = this.ulbForm.ulbPopulationFilter.some(
        option => option.min <= ulb.population && option.max >= ulb.population
      );
      return canShowULB;
    });
  }

  filterUlbByLetter(char) {
    const resultData = {};
    const ulbList = JSON.parse(JSON.stringify(this.originalUlbList.data));

    const states = Object.keys(ulbList);
    for (let i = 0; i < states.length; i++) {
      const ulbs = ulbList[states[i]]["ulbs"];
      if (ulbs && ulbs.length > 0) {
        const filteredUlbs = [];
        for (let j = 0; j < ulbs.length; j++) {
          if (ulbs[j] && ulbs[j].name.toUpperCase().charAt(0) == char) {
            filteredUlbs.push(ulbs[j]);
          }
        }

        if (filteredUlbs.length > 0) {
          resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
          resultData[states[i]]["ulbs"] = filteredUlbs;
        }
      }
    }
    this.ulbs.data = resultData;
  }

  filterUlbByPopulation(ulbList) {
    const resultData = {};
    const populationFilter = this.ulbForm.ulbPopulationFilter;
    const states = Object.keys(ulbList);
    // var states = Object.keys(this.ulbs.data);
    for (let i = 0; i < states.length; i++) {
      const ulbs = ulbList[states[i]]["ulbs"];
      // var ulbs = this.ulbs.data[states[i]]['ulbs'];
      if (ulbs && ulbs.length > 0) {
        const filteredUlbs = [];
        for (let ulbIndex = 0; ulbIndex < ulbs.length; ulbIndex++) {
          for (let k = 0; k < populationFilter.length; k++) {
            if (
              ulbs[ulbIndex].population > populationFilter[k]["min"] &&
              ulbs[ulbIndex].population <= populationFilter[k]["max"]
            ) {
              filteredUlbs.push(ulbs[ulbIndex]);
            }
          }
        }
        resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
        resultData[states[i]]["ulbs"] = filteredUlbs;
      }
    }

    return resultData;
  }

  filterUlbByType(ulbList) {
    const resultData = {};

    const ulbTypeFilter = this.ulbForm.ulbTypeFilter;
    const states = Object.keys(ulbList);
    for (let i = 0; i < states.length; i++) {
      const ulbs = ulbList[states[i]]["ulbs"];
      if (ulbs && ulbs.length > 0) {
        const filteredUlbs = [];
        for (let j = 0; j < ulbs.length; j++) {
          if (ulbTypeFilter.length == 0) {
            filteredUlbs.push(ulbs[j]);
            continue;
          }
          for (let k = 0; k < ulbTypeFilter.length; k++) {
            if (ulbs[j].type == ulbTypeFilter[k]["id"]) {
              filteredUlbs.push(ulbs[j]);
            }
          }
        }
        resultData[states[i]] = { state: ulbList[states[i]].state, ulbs: [] };
        resultData[states[i]]["ulbs"] = filteredUlbs;
      }
    }
    return resultData;
  }

  clearAllULBOf(stateCode: string) {
    delete this.StateULBTypeMapping[stateCode];
  }

  onULBClick(stateCode: string, ulbType: { type: string }, ulb: IULB) {
    const ulbCode = ulb.code;
    if (!this.StateULBTypeMapping[stateCode]) {
      this.StateULBTypeMapping = {
        ...this.StateULBTypeMapping,
        [stateCode]: { [ulbType.type]: { [ulbCode]: ulb } }
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
      formULB =>
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

  checkAlertForDifferentULB(latestULB: IULB) {
    if (!this.isAlertForDifferentULBShown) {
      const allULBAreSameType = this.reportForm.controls.ulbList.value.every(
        formULB => formULB.type === latestULB.type
      );
      if (!allULBAreSameType) {
        const alreadySelectULB: IULB = this.reportForm.controls.ulbList
          .value[0];
        alert(
          `You are selecting a ULB of different type. Earlier ULB selected are of ${alreadySelectULB.type} type, but now selecting from ${latestULB.type} type`
        );
        this.isAlertForDifferentULBShown = true;
      }
    }
  }

  updateSelectedULBSFromMapping() {
    let myArray = [];

    Object.keys(this.StateULBTypeMapping).forEach(newStateCode => {
      Object.values(this.StateULBTypeMapping[newStateCode]).forEach(option => {
        myArray.push(Object.values(option));
      });
    });

    myArray = ((myArray as any) as CustomArray<IULB[]>).flat();

    if (myArray) {
      this.selectedUlbs = myArray;
      this.reportForm.controls.ulbList.setValue(myArray);
    } else {
      this.selectedUlbs = [];
      this.reportForm.controls.ulbList.setValue([]);
    }
  }

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

  selectedBaseULB(ulbToSelect: IULB, stateCode: string) {
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
        ulbType => {
          Object.values(ulbType).forEach(ulb => total++);
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

  clearFilter() {
    this.selectedUlbs = [];

    this.ulbForm = {
      ulbFilter: "",
      ulbPopulationFilter: [],
      ulbTypeFilter: []
    };

    Object.assign(this.ulbs, this.originalUlbList);
    this.resetPage();
  }

  resetSelectedULB() {
    this.selectedUlbs = [];
    this.uncheckAllULBS();
  }
}
