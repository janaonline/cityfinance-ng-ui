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
  notValid = false;
  constructor() {}

  ngOnInit(): void {}
  noEditable = false;

  agInit(params) {
    // console.log(params);
    if (!params.colDef.editable && params.colDef.field != "index") {
      this.noEditable = true;
    }
    this.cellvalue = params.value;
    this.checkError(params);
  }

  refresh(params): boolean {
    this.checkError(params);
    this.cellvalue = params.value;
    return true;
  }

  checkError(params) {
    if (
      params.colDef?.cellEditor == "agTextCellEditor" &&
      params.value.length > 10
    ) {
      this.notValid = true;
      this.noEditable = false
    }
  }
}
