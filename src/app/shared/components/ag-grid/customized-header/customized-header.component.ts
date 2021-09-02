import { Component, OnInit } from "@angular/core";
import { IHeaderAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-customized-header",
  templateUrl: "./customized-header.component.html",
  styleUrls: ["./customized-header.component.scss"],
})
export class CustomizedHeaderComponent implements OnInit, IHeaderAngularComp {
  constructor() {}

  ngOnInit(): void {}

  header;

  agInit(params) {
    // console.log(params);
    this.header = params.displayName;
  }

  refresh(params): boolean {
    this.header = params.displayName;
    return true;
  }
}
