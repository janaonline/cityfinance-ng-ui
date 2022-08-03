import { Component, OnInit } from "@angular/core";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";

@Component({
  selector: "app-slbs28-form",
  templateUrl: "./slbs28-form.component.html",
  styleUrls: ["./slbs28-form.component.scss"],
})
export class Slbs28FormComponent implements OnInit {
  constructor(private newCommonService: NewCommonService) {}

  tableData;
  ngOnInit(): void {
    this.newCommonService.getTable().subscribe((res) => {
      console.log("table DATA", res);
      this.tableData = res;
    });
  }
}
