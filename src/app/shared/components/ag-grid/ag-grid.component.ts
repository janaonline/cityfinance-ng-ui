import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
@Component({
  selector: "app-ag-grid",
  templateUrl: "./ag-grid.component.html",
  styleUrls: ["./ag-grid.component.scss"],
})
export class AgGridComponent implements OnInit, OnChanges {
  constructor() {}
  @ViewChild("agGrid") agGrid: AgGridAngular;
  @Input()
  columnDefs;
  @Input()
  rowData;
  @Input()
  dataTemplate;
  @Input()
  addRow: boolean;

  ngOnInit(): void {
    for (let index = 1; index <= this.rowData.length; index++) {
      this.rowData[index - 1]["index"] = index;
    }
  }

  ngOnChanges() {
    if (this.addRow) {
      let s = this.agGrid.api.getDisplayedRowCount();
      let obj = JSON.parse(JSON.stringify(this.dataTemplate));
      obj.index = s + 1;
      this.agGrid.api.applyTransaction({ add: [obj] });
    }
  }
}
