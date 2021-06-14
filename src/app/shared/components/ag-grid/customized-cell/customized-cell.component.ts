import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-customized-cell",
  templateUrl: "./customized-cell.component.html",
  styleUrls: ["./customized-cell.component.scss"],
})
export class CustomizedCellComponent
  implements OnInit, ICellRendererAngularComp
{
  cellvalue;
  constructor() {}

  ngOnInit(): void {}

  agInit(params) {
    console.log(params);

    this.cellvalue = params.value;
  }
  refresh(params): boolean {
    this.cellvalue = params.value;
    return true;
  }
}
