import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { COMMA, ENTER, T } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { CommonService } from "../../services/common.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { RevenuechartService } from "../revenuechart/revenuechart.service";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-compare-dialog",
  templateUrl: "./compare-dialog.component.html",
  styleUrls: ["./compare-dialog.component.scss"],
})
export class CompareDialogComponent implements OnInit {
  filteredFruits: Observable<string[]>;

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatSelect) matSelect: MatSelect;
  stateChipList: any = [];
  isSearching: boolean = false;
  showSearches: boolean;
    
  constructor(
    private commonService: CommonService,
    private revenuechartService:RevenuechartService,
    private matSnackBar: MatSnackBar
  ) {
    let ulbList = JSON.parse(localStorage.getItem("ulbList")).data;
    for (const key in ulbList) {
      const element = ulbList[key];
      this.stateList.push({ ...element });
    }
  }

  @Output()
  closeDialog = new EventEmitter();

  @Output()
  compareValue = new EventEmitter();

  @Output()
  ownRevenueCompValue = new EventEmitter();

  @Output()
  ulbValues = new EventEmitter();

  @Output()
  ulbValueList = new EventEmitter();

  @Output()
  SelectYearList = new EventEmitter();

  @Output()
  SelectYears = new EventEmitter();

  @Output()
  selectedParam = new EventEmitter();

  @Input()
  stateId = "";
  dropYears = new FormControl();

  States = new FormControl();
  toogle = new FormControl(false, []);
  selectedVal = new FormControl();
  globalFormControl = new FormControl();
  stateList = [];

  @Input()
  showDropDown;

  @Input()
  type = 1;

  @Input()
  own;

  @Input()
  selectedRadioBtn;

  @Input()
  preSelectedUlbList;

  @Input()
  preSelectedYears;

  @Input()
  preSelectedUlbIds;

  @Input()
  preSelectedStateList;

  @Input()
  balcnceTab;

  @Input()
  preSelectedOwnRevenueDbParameter: string = "";

  @Input()
  preSelectedOwnRevenueDbType: boolean = false;

  @Input()
  singleSelectUlb;

  filterList = [
    { val: "State Average", checked: false },
    { val: "National Average", checked: false },
    { val: "ULB Type Average", checked: false },
    { val: "ULB Population Category Average", checked: false },
  ];

  @Input()
  parameters: string[] = [];

  ulbListChip: { name: string; _id: string }[] = [];

  ulbIds: any;

  yearValue: any;
  years: any;

  valuesToEmit;

  lineItems = ["11001", "130", "140", "150", "180", "110"];

  noDataFound = false;
  filteredOptions = [];
  searchField = new FormControl();
  selectedParameter = new FormControl();

  selectedStateValue(event: any) {
    if (this.stateChipList.length == 10) {
      this.matSnackBar.open(`Max 10 can be selected!`, null, {
        duration: 6600,
      });
      return;
    }

    this.stateChipList.push(event);
    this.stateChipList = [...new Set(this.stateChipList)];
  }
  removeStateChips(chips: { _id: string; name: string }): void {
    const index = this.stateChipList.indexOf(chips);
    if (index >= 0) {
      this.stateChipList.splice(index, 1);
    }
  }

  yearsList: { id: string; itemName: string; isDataAvailable: boolean }[] = [];

  @Input() ulbYears = [];

  selectYearValue(event: any) {
    console.log("selectYearValue", event);
    this.years = event.value;
    this.yearValue = this.yearsList.filter((elem) => {
      if (this.years.includes(elem.itemName)) {
        return elem;
      }
    });

    console.log("yearValue", this.yearValue, this.years);
    // this.newUlbData = this.ulbListVal.map((elem) => {
    //   return {
    //     ...elem,
    //     financialYear: [...this.years],
    //     state: elem?.state.name,
    //     stateId: elem?.state._id,
    //     ulb: elem?.ulbType._id,
    //     ulbType: elem?.ulbType.name,
    //   };
    // });
    // console.log(this.years);
  }
  togglerValue: boolean = false;
  typeX = "";
  placeholder = "Search for States";
  selectedDropYears: any;
  ngOnInit(): void {
    console.log(
      "preSelectedUlbList",
      this.preSelectedUlbList,
      this.preSelectedStateList,
      this.balcnceTab
    );
    if (this.preSelectedUlbList) {
        this.ulbListChip = this.preSelectedUlbList;
    }

    this.getFinancialYearBasedOnData();
    
    if (this.preSelectedOwnRevenueDbParameter) {
      this.selectedVal.setValue(this.preSelectedOwnRevenueDbParameter);
    }
    this.toogle.setValue(this.preSelectedOwnRevenueDbType);
    this.togglerValue = this.preSelectedOwnRevenueDbType;

    if (this.preSelectedStateList) {
      this.stateChipList = this.preSelectedStateList;
    }
    this.filterList = this.filterList.map((value) => {
      if (this.selectedRadioBtn == value.val) {
        value.checked = true;
      }
      return value;
    });
    this.toogle.valueChanges.subscribe((newToogleValue) => {
      console.log("toogleValue", newToogleValue);
      this.reset();
      this.togglerValue = newToogleValue;
      if (!newToogleValue) this.placeholder = `Search for States`;
      else this.placeholder = `Search for ULBs`;
    });
    this.globalFormControl.valueChanges.subscribe((value) => {
      console.log("globalFormControl", value);
      if (this.togglerValue) {
        this.typeX = "ulb";
      } else {
        this.typeX = "state";
      }
      if (value.length >= 1) {
        this.commonService
          .postGlobalSearchData(value, this.typeX, "")
          .subscribe((res: any) => {
            console.log(res?.data);
            let emptyArr: any = [];
            this.filteredOptions = emptyArr;
            if (res?.data.length > 0) {
              this.filteredOptions = res?.data;
              this.noDataFound = false;
            } else {
              let emptyArr: any = [];
              this.filteredOptions = emptyArr;
              this.noDataFound = true;
              let noDataFoundObj = {
                name: "",
                id: "",
                type: "",
              };
              console.log("no data found");
            }
          });
      } else {
        return null;
      }
    });

    this.onSearchValueChange();

    if (this.type == 2) {
      if (this.own) {
        this.parameters = [
          "Own Revenue",
          "Own Revenue per Capita",
          "Own Revenue to Revenue Expenditure",
        ];
      } else {
        this.parameters = [
          "Property Tax",
          "Property Tax per Capita",
          "Property Tax to Revenue Expenditure",
        ];
      }
    }
  }
  getFinancialYearBasedOnData() {
    this.commonService.getFinancialYearBasedOnData().subscribe((resp:any) => {
      const financialYear = resp.data.sort((a, b) => (b.split("-")[0] - a.split("-")[0]));
      this.yearsList = financialYear.map((year) => {
        const isDataAvailable= this.ulbYears.includes(year);
        return { id: year, itemName: year,  isDataAvailable};
      });
      if (this.preSelectedYears) {
        this.dropYears.setValue(this.preSelectedYears);
        this.selectedDropYears = this.preSelectedYears;

        this.years = this.preSelectedYears;
        this.yearValue = this.yearsList.filter((elem) => {
          if (this.years.includes(elem.itemName)) {
            return elem;
          }
        });

      }
    })
  }
  ngAfterViewInit() {
    this.matSelect.openedChange.subscribe((opened) => {
      if (opened) {
        this.matSelect.panel.nativeElement.addEventListener(
          "mouseleave",
          () => {
            this.matSelect.close();
          }
        );
      }
    });
  }
  reset() {
    this.globalFormControl.setValue("");
    // if (this.preSelectedUlbList) {
    //   this.preSelectedUlbList = [];
    //   this.ulbListChip = this.preSelectedUlbList;
    // } else {
    //   this.ulbListChip = [];
    // }

    this.dropYears.patchValue([]);
    this.yearValue = [];

    this.stateChipList = [];
    this.ulbListChip = [];

    this.own
      ? this.selectedVal.setValue("Own Revenue per Capita")
      : this.selectedVal.setValue("Property Tax per Capita");

    // this.preSelectedUlbList = [];
    this.filterList = this.filterList.map((value) => {
      value.checked = false;
      return value;
    });
    
    console.log("cleared ulblist", this.ulbListChip);
    this.revenuechartService.updateUlbList([])
  }
  close() {
    this.closeDialog.emit(true);
  }
  checkType(searchValue) {
    let type = searchValue?.type;
    if (type == "ulb") {
    }
    if (type == "state") {
    }
    if (type == "searchKeyword") {
    }
  }
  dashboardNav(option, event) {
    console.log("option", option);
    this.checkType(option);
    this.selectedStateValue(option);
    this.globalFormControl.setValue("");
  }

  onSearchValueChange() {
    const search$ = this.searchField.valueChanges.pipe(
      map((value: any) => {
        return value
      }),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((term) => term ? this.search(term) : of<any>({ data: this.filteredOptions })),
      tap(() => {
        this.isSearching = false,
          this.showSearches = true;
      }));

    search$.subscribe(resp => {
      this.isSearching = false
      if (resp['data'].length > 0) {
        this.noDataFound = false;
      } else {
        this.noDataFound = true;
      }
      this.filteredOptions = resp["data"]
    });

  }
  search(matchingWord) {
    let body = {
      matchingWord,
      onlyUlb: true,
    };
    return this.commonService.searchUlb(body, "ulb", this.stateId);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.searchField.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filteredOptions.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
  radioSelected(event) {
    let val = this.filterList.find((value) => value.val == event.target?.value);
    if (val) val.checked = true;
    console.log(event.target.value, "radio value");
    this.valuesToEmit = event.target?.value || event;
    this.searchField.reset();
    this.ulbListChip = [];
    this.revenuechartService.updateUlbList([])
    
  }

  optionSelected(option) {
    option.state = option.state?.name;
    if (this.ulbListChip.length == 3) {
      this.searchField.setValue(null);
    }
    document.getElementsByName("radioBtn").forEach((value) => {
      value["checked"] = false;
    });

    if (!this.ulbListChip.find((value) => value.name === option.name)) {
      if (this.ulbListChip.length == 3) {
        this.searchField.setValue(null);
        return;
      }
      this.ulbListChip.push(option);
      if (this.singleSelectUlb == true && this.ulbListChip.length > 1) {
        this.ulbListChip = [option];
      }
    }

    this.ulbIds = this.ulbListChip.map((elem) => elem._id);

    console.log("ulbIds", this.ulbIds, this.ulbListChip);

    this.searchField.setValue(null);
    this.valuesToEmit = this.ulbListChip;

    console.log("this.valuesToEmit", this.ulbListChip);
  }

  remove(chips: { _id: string; name: string }): void {
    const index = this.ulbListChip.indexOf(chips);
    if (index >= 0) {
      this.ulbListChip.splice(index, 1);
    }
  }
  emptyField = true;
  emitValues() {
    console.log("emitValues", this.type);
    if (this.type == 2) {
      console.log("stateChipList", this.stateChipList);
      if (
        this.stateChipList.length > 1 &&
        (this.selectedVal.value != "None" || !this.selectedVal.value)
      ) {
        this.emptyField = false;
        this.valuesToEmit = {
          list: this.stateChipList,
          param: this.selectedVal.value,
          // type: this.typeX,
          type: this.togglerValue ? "ulb" : "state",
          typeTitle: this.typeX == "ulb" ? "ULBs" : "States",
        };
        this.ownRevenueCompValue.emit(this.valuesToEmit);
      } else {
        this.emptyField = true;
        this.valuesToEmit = {
          list: this.stateChipList,
          param: this.selectedVal.value,
          // type: this.typeX,
          type: this.togglerValue ? "ulb" : "state",
          typeTitle: this.typeX == "ulb" ? "ULBs" : "States",
        };
        this.ownRevenueCompValue.emit(this.valuesToEmit);
        // return;
      }
      this.close();
    } else {
      console.log(
        "emitting value",
        this.ulbListChip,
        this.dropYears.value,
        this.yearValue,
        this.ulbIds
      );
      if (this.balcnceTab) {
        if (this.ulbListChip.length > 0 && this.dropYears.value.length > 0) {
          console.log("this.yearValue", this.yearValue, this.years);
          if (this.preSelectedUlbIds) {
            this.ulbIds = this.preSelectedUlbIds;
          }
          // if (this.preSelectedYears) {
          //   this.years = this.preSelectedYears;
          // }
          this.compareValue.emit(this.valuesToEmit);
          this.ulbValues.emit(this.ulbIds);
          this.ulbValueList.emit(this.ulbListChip);
          this.SelectYearList.emit(this.yearValue);
          this.SelectYears.emit(this.years);
          this.close();
        }
        // else if (this.ulbListChip.length == 0 && this.yearValue.length == 0) {
        //   alert("please Select both ulb and year");
        //   this.close();
        // }
      } else {
        this.compareValue.emit(this.valuesToEmit);
        this.ulbValues.emit(this.ulbIds);
        this.ulbValueList.emit(this.ulbListChip);
        this.SelectYearList.emit(this.yearValue);
        this.SelectYears.emit(this.years);
        this.revenuechartService.updateUlbList(this.ulbListChip)
        this.close();
      }
    }
    // this.close();
  }
}
