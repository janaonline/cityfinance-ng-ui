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

  ngOnInit(): void {
    for (let index = 1; index <= this.rowData.length; index++) {
      this.rowData[index - 1]["index"] = index;
    }
  }

  cellValueChanged(e) {
    if (
      e.colDef.field == "cost" ||
      e.colDef.field == "code" ||
      e.colDef.field == "name"
    ) {
    }
  }
  ngOnChanges() {}
  addRow() {
    let s = this.agGrid1.api.getDisplayedRowCount();
    let obj = JSON.parse(JSON.stringify(this.dataTemplate.projectExcute));
    obj.index = s + 1;
    this.agGrid1.api.applyTransaction({ add: [obj] });

    s = this.agGrid2.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(this.dataTemplate.sourceFund));
    obj.index = s + 1;
    this.agGrid2.api.applyTransaction({ add: [obj] });

    s = this.agGrid3.api.getDisplayedRowCount();
    obj = JSON.parse(JSON.stringify(this.dataTemplate.yearOutlay));
    obj.index = s + 1;
    this.agGrid3.api.applyTransaction({ add: [obj] });
  }
}
