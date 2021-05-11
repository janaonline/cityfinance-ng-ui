import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-water-sanitation-preview",
  templateUrl: "./water-sanitation-preview.component.html",
  styleUrls: ["./water-sanitation-preview.component.scss"],
})
export class WaterSanitationPreviewComponent implements OnInit {
  @Input() parentData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.parentData) {
      this.data = this.parentData;
    }
  }
  downloadAsPDF() {}
}