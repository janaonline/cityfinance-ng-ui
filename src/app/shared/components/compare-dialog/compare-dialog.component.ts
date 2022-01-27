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

  stateChipList: any = [];

  constructor(
    private commonService: CommonService,
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

  States = new FormControl();

  stateList = [];

  @Input()
  type = 1;

  filterList = [
    "State Average",
    "National Average",
    "Similar ULB Cities",
    "ULB Type Average",
    "ULB category Average",
    "Similar Population ULBs",
  ];

  @Input()
  parameters: string[] = [];

  ulbListChip: { name: string; _id: string }[] = [];

  ulbIds: any;

  valuesToEmit;

  lineItems = ["11001", "130", "140", "150", "180", "110"];

  noDataFound = false;
  filteredOptions = [];
  searchField = new FormControl();
  selectedParameter = new FormControl();

  selectedStateValue(event: any) {
    if (this.stateChipList.length == 10) {
      this.matSnackBar.open(`Max 10 states can be selected!`, null, {
        duration: 6600,
      });
      return;
    }
    event.value.map((element) => {
      this.stateChipList.push(element);
      this.stateChipList = [...new Set(this.stateChipList)];
    });
  }
  removeStateChips(chips: { _id: string; name: string }): void {
    const index = this.stateChipList.indexOf(chips);
    if (index >= 0) {
      this.stateChipList.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.searchField.valueChanges.subscribe((value) => {
      console.log(value);
      if (value) this.search(value);
    });

    if (this.type == 2) {
      this.commonService.getLineItems().subscribe(
        (res) => {
          console.log(res, "Lineitems");

          this.parameters = res["data"].filter((value) =>
            this.lineItems.includes(value.code)
          );
        },
        (err) => {}
      );
    }
  }

  close() {
    this.closeDialog.emit(true);
  }

  search(matchingWord) {
    let body = {
      matchingWord,
      onlyUlb: true,
    };
    this.commonService.searchUlb(body).subscribe(
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
    console.log(event.target.value);
    this.valuesToEmit = event.target.value;
    this.searchField.reset();
  }

  optionSelected(option) {
    console.log("opption", option);
    document.getElementsByName("radioBtn").forEach((value) => {
      value["checked"] = false;
    });

    if (!this.ulbListChip.find((value) => value.name === option.name)) {
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

  emitValues() {
    if (this.type == 2) {
      this.valuesToEmit = { stateIds: [], revenueId: "", revenueName: "" };
      this.valuesToEmit.stateIds = this.stateChipList.map((value) => value._id);
      this.valuesToEmit.revenueId = this.selectedParameter.value._id;
      this.valuesToEmit.revenueName = this.selectedParameter.value.name;
      this.ownRevenueCompValue.emit(this.valuesToEmit);
    } else {
      this.compareValue.emit(this.valuesToEmit);
      this.ulbValues.emit(this.ulbIds);
      this.ulbValueList.emit(this.ulbListChip);
    }
    this.close();
  }
}
