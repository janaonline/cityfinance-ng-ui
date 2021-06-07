import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UtiReportService } from "../../../pages/ulbform/utilisation-report/uti-report.service";

@Component({
  selector: "app-map-dialog",
  templateUrl: "./map-dialog.component.html",
  styleUrls: ["./map-dialog.component.scss"],
})
export class MapDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    private UtiReportService: UtiReportService
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  getLocation(e) {
    this.dialogRef.close(e);
  }
}
