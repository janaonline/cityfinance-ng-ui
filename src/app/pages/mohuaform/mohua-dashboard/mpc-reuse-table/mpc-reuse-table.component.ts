import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-mpc-reuse-table",
  templateUrl: "./mpc-reuse-table.component.html",
  styleUrls: ["./mpc-reuse-table.component.scss"],
})
export class MpcReuseTableComponent implements OnInit {
  @Input() headerData: any;
  @Input() mpctableData: any;
  constructor() {}

  ngOnInit(): void {
    console.log("tableData", this.mpctableData);
  }
}
