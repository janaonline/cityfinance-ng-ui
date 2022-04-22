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
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { CommonService } from "../../services/common.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";

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

  constructor(
    private commonService: CommonService,
    private matSnackBar: MatSnackBar,
    private _commonService: CommonService
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
  yearsList: { id: string; itemName: string }[] = [
    { id: "2020-2021", itemName: "2020-2021" },
    { id: "2019-2020", itemName: "2019-2020" },
    { id: "2018-2019", itemName: "2018-2019" },
    { id: "2017-2018", itemName: "2017-2018" },
    { id: "2016-2017", itemName: "2016-2017" },
    { id: "2015-2016", itemName: "2015-2016" },
  ];

  selectYearValue(event: any) {
    this.yearValue = event.value;
    this.years = this.yearValue.map((ele) => ele.itemName);
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
  togglerValue;
  typeX = "";
  placeholder = "Search for States";
  ngOnInit(): void {
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
    this.selectedVal.valueChanges.subscribe((val) => {
      console.log(val);
    });
    this.globalFormControl.valueChanges.subscribe((value) => {
      if (value.length >= 1) {
        if (this.togglerValue) {
          this.typeX = "ulb";
        } else {
          this.typeX = "state";
        }

        this._commonService
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
    this.searchField.valueChanges.subscribe((value) => {
      console.log(value);
      if (value) this.search(value);
    });

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

    this.own
      ? this.selectedVal.setValue("Own Revenue per Capita")
      : this.selectedVal.setValue("Property Tax per Capita");
    this.stateChipList = [];
    this.ulbListChip = [];
    debugger;
    this.filterList = this.filterList.map((value) => {
      value.checked = false;
      return value;
    });
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

  search(matchingWord) {
    let body = {
      matchingWord,
      onlyUlb: true,
    };
    this.commonService.searchUlb(body, "ulb", this.stateId).subscribe(
      (res) => {
        if (res["data"].length > 0) {
          this.noDataFound = false;
        } else {
          this.noDataFound = true;
        }
        this.filteredOptions = res["data"];
      },
      (err) => {}
    );
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
  }

  optionSelected(option) {
    document.getElementsByName("radioBtn").forEach((value) => {
      value["checked"] = false;
    });

    if (!this.ulbListChip.find((value) => value.name === option.name)) {
      if (this.ulbListChip.length == 3) return;
      this.ulbListChip.push(option);
    }

    this.ulbIds = this.ulbListChip.map((elem) => elem._id);

    console.log("ulbIds", this.ulbIds, this.ulbListChip);

    this.searchField.setValue(null);
    this.valuesToEmit = this.ulbListChip;
  }

  remove(chips: { _id: string; name: string }): void {
    const index = this.ulbListChip.indexOf(chips);
    if (index >= 0) {
      this.ulbListChip.splice(index, 1);
    }
  }
  emptyField = true;
  emitValues() {
    if (this.type == 2) {
      if (
        this.stateChipList.length > 1 &&
        (this.selectedVal.value != "None" || !this.selectedVal.value)
      ) {
        this.emptyField = false;
        this.valuesToEmit = {
          list: this.stateChipList,
          param: this.selectedVal.value,
          type: this.typeX,
        };
        this.ownRevenueCompValue.emit(this.valuesToEmit);
      } else {
        this.emptyField = true;
        return;
      }
    } else {
      this.compareValue.emit(this.valuesToEmit);
      this.ulbValues.emit(this.ulbIds);
      this.ulbValueList.emit(this.ulbListChip);
      this.SelectYearList.emit(this.yearValue);
      this.SelectYears.emit(this.years);
    }
    this.close();
  }
}
