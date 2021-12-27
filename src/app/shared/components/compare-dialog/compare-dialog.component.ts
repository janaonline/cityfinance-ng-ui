import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CommonService } from "../../services/common.service";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-compare-dialog",
  templateUrl: "./compare-dialog.component.html",
  styleUrls: ["./compare-dialog.component.scss"],
})
export class CompareDialogComponent implements OnInit {
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
        console.log(res);
        this.filteredOptions = res["data"];
      },
      (err) => {}
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

    this.compareValue.emit(this.valuesToEmit);
    this.close();
  }
}
