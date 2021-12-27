import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface Fruit {
  name: string;
}

@Component({
  selector: "app-compare-dialog",
  templateUrl: "./compare-dialog.component.html",
  styleUrls: ["./compare-dialog.component.scss"],
})
export class CompareDialogComponent implements OnInit {
  constructor() {}

  @Output()
  closeDialog = new EventEmitter();

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

  ngOnInit(): void {}

  close() {
    this.closeDialog.emit(true);
  }
}
