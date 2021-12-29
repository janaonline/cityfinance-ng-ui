import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { CommonService } from "../../services/common.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-compare-dialog",
  templateUrl: "./compare-dialog.component.html",
  styleUrls: ["./compare-dialog.component.scss"],
})
export class CompareDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ulbListChips: string[] = [];
  filteredFruits: Observable<string[]>;

  @ViewChild("chipInput") chipInput: ElementRef<HTMLInputElement>;
  constructor(private commonService: CommonService) {}

  @Output()
  closeDialog = new EventEmitter();

  @Output()
  compareValue = new EventEmitter();

  States = new FormControl();
  stateList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato",
  ];

  type = 1;

  filterList = [
    "State Average",
    "Normal Average",
    "Similar ULB Cities",
    "ULB Type Average",
    "ULB category Average",
    "Similar Population ULBs",
  ];

  parameters: string[] = ["one", "two", "three"];

  ngOnInit(): void {
    this.searchField.valueChanges.subscribe((value) => {
      console.log(value);
      if (value) this.search(value);
    });
  }

  noDataFound = false;
  filteredOptions = [];

  close() {
    this.closeDialog.emit(true);
  }

  searchField = new FormControl();

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

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.ulbListChips.push(value);
    }

    console.log("ulbListChips", this.ulbListChips);

    // Clear the input value
    // event.chipInput!.clear();

    this.searchField.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.ulbListChips.indexOf(fruit);

    if (index >= 0) {
      this.ulbListChips.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ulbListChips.push(event.option.viewValue);
    this.chipInput.nativeElement.value = "";
    this.searchField.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.filteredOptions.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  valuesToEmit;

  radioSelected(event) {
    console.log(event.target.value);
    this.valuesToEmit = event.target.value;
    this.searchField.reset();
  }

  optionSelected(option) {
    console.log(option);
    this.valuesToEmit = option;
    document.getElementsByName("radioBtn").forEach((value) => {
      value["checked"] = false;
    });
  }

  emitValues() {
    console.log(this.valuesToEmit);
    console.log("filteredOptions", this.filteredOptions, this.ulbListChips);

    this.compareValue.emit(this.valuesToEmit);
    this.close();
  }
}
