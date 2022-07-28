import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-gtc-preview",
  templateUrl: "./gtc-preview.component.html",
  styleUrls: ["./gtc-preview.component.scss"],
})
export class GtcPreviewComponent implements OnInit {
  constructor(
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.stateName = this.userData["stateName"];
  }
  stateName = "";
  userData = "";
  formStatus = "";
  ngOnInit(): void {
    console.log("preview data", this.data);
  }

  clickedDownloadAsPDF(template) {}
  closeMat() {
    this._matDialog.closeAll();
  }
}
