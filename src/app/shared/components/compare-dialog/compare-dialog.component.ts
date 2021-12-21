import { Component, OnInit } from "@angular/core";
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

  parameters: string[] = ["one", "two", "three"];

  ngOnInit(): void {}
}

