import { Component, Input, OnInit } from "@angular/core";
import { element } from "protractor";

@Component({
  selector: "app-mpc-reuse-table",
  templateUrl: "./mpc-reuse-table.component.html",
  styleUrls: ["./mpc-reuse-table.component.scss"],
})
export class MpcReuseTableComponent implements OnInit {
  @Input() items: any;

  constructor() {}

  ngOnInit(): void {}
}
