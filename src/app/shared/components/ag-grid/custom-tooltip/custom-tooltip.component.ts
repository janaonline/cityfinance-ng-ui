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
  lastValue;

  agInit(params): void {
    console.log(params);
    if (!params.colDef.editable) {
      this.noEditMsg = "nonEditable";
      this.type = "warning";
      this.showTootip = true;
    }
    this.checkError(params);
   this.showValue(params);
  }

  checkError(params) {
    let field = params.colDef.field;
    if (params.data[field].lastValidation != true) {
      this.type = "danger";
      this.noEditMsg = params.colDef.tooltipComponentParams?.errorMsg;
      this.showTootip = true;
      this.lastValue = params.data[field]?.lastValidation;
    }
  }

  showValue(params){
    let field = params.colDef.field;
    if (params.data[field].lastValidation == true) {
      this.type = "danger";
      this.noEditMsg = params.data[field].value;
      this.showTootip = true;
      this.lastValue = params.data[field]?.lastValidation;
    }
  }
}
