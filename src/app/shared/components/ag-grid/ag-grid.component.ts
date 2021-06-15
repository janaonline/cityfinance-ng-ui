import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { EventEmitter } from "@angular/core";
import { CustomizedCellComponent } from "./customized-cell/customized-cell.component";
import { CustomTooltipComponent } from "./custom-tooltip/custom-tooltip.component";
import { CustomizedHeaderComponent } from "./customized-header/customized-header.component";
@Component({
  selector: "app-ag-grid",
  templateUrl: "./ag-grid.component.html",
  styleUrls: ["./ag-grid.component.scss"],
})
export class AgGridComponent implements OnInit, OnChanges {
  constructor() {}
  @ViewChild("agGrid1") agGrid1: AgGridAngular;
  @ViewChild("agGrid2") agGrid2: AgGridAngular;
  @ViewChild("agGrid3") agGrid3: AgGridAngular;
  @Input()
  columnDefs;
  @Input()
  rowData;
  @Input()
  dataTemplate;
  @Input()
  ulbList;

  frameworkComponents;
  ngOnInit(): void {
    console.log(this.columnDefs);
    this.ulbList.push("Parastatal Agency");

    this.columnDefs.project[5].cellEditorParams.values = this.ulbList;

    this.frameworkComponents = {
      customizedCell: CustomizedCellComponent,
      agColumnHeader: CustomizedHeaderComponent,
      customTooltip: CustomTooltipComponent,
    };
    // for (let index = 1; index <= this.rowData.length; index++) {
    //   this.rowData[index - 1]["index"] = index;
    // }
  }

  cellValueChanged(e) {
    console.log(e);
    if (e.colDef.field == "exAgency" && e.value == "Parastatal Agency") {
      let newEle = {
        cellRenderer: "customizedCell",
        headerName: "Name of Parastatal Agency",
        width: 190,
        editable: true,
        field: "paraAgency",
        cellEditor: "agTextCellEditor",
      };
      console.log(this.columnDefs);

      this.columnDefs.project.splice(6, 0, newEle);
      console.log(this.columnDefs);

      this.agGrid1.api.setColumnDefs(this.columnDefs.project);
    }

    if (e.colDef.field == "cost" || e.colDef.field == "name") {
      this.autoSetNames(e);
    }
  }

  autoSetNames(e) {
    this.rowData.sourceFund.forEach((element) => {
      element[e.colDef.field] = e.value;
    });
    this.agGrid2.api.applyTransaction({ update: this.rowData.sourceFund });

    this.rowData.yearOutlay.forEach((element) => {
      element[e.colDef.field] = e.value;
    });
    this.agGrid3.api.applyTransaction({ update: this.rowData.yearOutlay });
  }

  ngOnChanges() {}

  addRow() {
    let s = this.agGrid1.api.getDisplayedRowCount();
    let obj = JSON.parse(JSON.stringify(this.dataTemplate.projectExcute));
    obj.index = s + 1;
    obj.code = this.rowData.code + obj.index;
    this.agGrid1.api.applyTransaction({ add: [obj] });

    s = this.agGrid2.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(this.dataTemplate.sourceFund));
    obj.index = s + 1;
    obj.code = this.rowData.code + obj.index;

    this.agGrid2.api.applyTransaction({ add: [obj] });

    s = this.agGrid3.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(this.dataTemplate.yearOutlay));
    obj.index = s + 1;
    obj.code = this.rowData.code + obj.index;

    this.agGrid3.api.applyTransaction({ add: [obj] });
  }
}
