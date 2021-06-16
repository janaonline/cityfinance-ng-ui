import { Component, OnInit } from "@angular/core";
import { IToolPanelAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-custom-tooltip",
  templateUrl: "./custom-tooltip.component.html",
  styleUrls: ["./custom-tooltip.component.scss"],
})
export class CustomTooltipComponent implements IToolPanelAngularComp {
  private params;
  private data: any[];
  private type: string = "primary";

  showTootip = false;
  noEditMsg;

  agInit(params): void {
    console.log(params);
    if (!params.colDef.editable) {
      this.noEditMsg = "nonEditable";
      this.type = "warning";
      this.showTootip = true;
    }
    this.checkError(params);
  }

  checkError(params) {
    if (
      params.colDef?.cellEditor == "agTextCellEditor" &&
      params.value.length > 10
    ) {
      this.type = "danger"
      this.noEditMsg = params.colDef.tooltipComponentParams.errorMsg
      this.showTootip = true;
    }
  }
}
