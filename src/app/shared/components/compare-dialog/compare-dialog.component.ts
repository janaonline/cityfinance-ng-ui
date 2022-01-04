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

  ulbListChip: { name: string; id: string }[] = [];

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

  selected(event: MatAutocompleteSelectedEvent): void {
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
    console.log("opption", option);
    document.getElementsByName("radioBtn").forEach((value) => {
      value["checked"] = false;
    });
    this.ulbListChip.push(option);
    this.searchField.setValue(null);
    this.valuesToEmit = this.ulbListChip;
  }

  remove(chips: { id: string; name: string }): void {
    const index = this.ulbListChip.indexOf(chips);
    if (index >= 0) {
      this.ulbListChip.splice(index, 1);
    }
  }

  emitValues() {
    this.compareValue.emit(this.valuesToEmit);
    this.close();
  }
}
