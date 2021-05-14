import { Component, Input, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-annual-preview",
  templateUrl: "./annual-preview.component.html",
  styleUrls: ["./annual-preview.component.scss"],
})
export class AnnualPreviewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  years = JSON.parse(localStorage.getItem("Years"));
  @Input() parentData;

  year2021;
  year2019;
  ngOnInit(): void {
    if (this.data) {
      this.parentData = this.data;
    }
    this.setData();
  }

  setData() {
    if (this.years["2020-21"] == this.parentData[0].year) {
      this.year2021 = this.parentData[0];
      this.year2019 = this.parentData[1];
    } else {
      this.year2021 = this.parentData[1];
      this.year2019 = this.parentData[0];
    }
  }

  downloadAsPDF() {}
}
