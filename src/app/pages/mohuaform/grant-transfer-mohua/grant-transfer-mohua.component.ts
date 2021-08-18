import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { GtMohuaService } from "./gt-mohua.service";
import { SweetAlert } from "sweetalert/typings/core";
import { Router, NavigationStart, Event } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";
@Component({
  selector: "app-grant-transfer-mohua",
  templateUrl: "./grant-transfer-mohua.component.html",
  styleUrls: ["./grant-transfer-mohua.component.scss"],
})
export class GrantTransferMohuaComponent implements OnInit {
  constructor(
    public gtMohuaService: GtMohuaService,
    private _router: Router,
    public dialog: MatDialog
  ) {
    this._router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/" || event.url === "/login") {
          this.changeInGtMohua = false;
          return;
        }
        if (this.changeInGtMohua && this.routerNavigate === null) {
          this.routerNavigate = event;
          const currentRoute = this._router.routerState;
          this._router.navigateByUrl(currentRoute.snapshot.url, {
            skipLocationChange: true,
          });
          this.openModal(this.template);
        }
      }
    });
  }

  @ViewChild("template") template;
  routerNavigate = null;
  dialogRef;

  quesName = "Please Upload Grant Transfer Excel Sheet ";
  requiredBtn = "excel";
  Years = JSON.parse(localStorage.getItem("Years"));
  loggedInUser = JSON.parse(localStorage.getItem("userData"));
  ngOnInit(): void {}

  excel;
  isDisabled = false;
  saveBtnText = "SAVE";
  showLoader = false;
  changeInGtMohua = false;
  getTemplate() {
    this.gtMohuaService.getTemplate().subscribe(
      (res) => {
        let blob: any = new Blob([res], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "GrantTransferTemplate.xlsx");
        swal("Upload downloaded template");
      },
      (err) => {}
    );
  }

  save() {
    this.showLoader = true;
    this.changeInGtMohua = false;
    if (!this.excel?.url) {
      return swal("Please upload file and save");
    }
    let body = {
      url: this.excel.url,
      design_year: "606aaf854dff55e6c075d219",
    };

    this.gtMohuaService.saveData(body).subscribe(
      (res) => {
        swal("Record submitted successfully!");
        this.saveBtnText = "FILE SAVED";
        this.showLoader = false;
        if (this.routerNavigate)
          this._router.navigate([this.routerNavigate.url]);
      },
      (err) => {
        let blob: any = new Blob([err.error], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "GrantTranfer_error.xlsx");
        swal("Refer error file and upload again");
        this.showLoader = false;
        if (this.routerNavigate)
          this._router.navigate([this.routerNavigate.url]);
      }
    );
  }

  uploadedFile(file) {
    this.excel = file.excel;
    this.saveBtnText = "SAVE";
    if (this.excel.url) this.changeInGtMohua = true;
    else this.changeInGtMohua = false;
  }

  openModal(template: TemplateRef<any>, fromPreview = null) {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        if (this.routerNavigate) {
          this.routerNavigate = null;
        }
      }
    });
  }

  stay() {
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
    this.dialogRef.close(true);
  }

  proceed(uploadedFiles) {
    this.dialogRef.close(true);
    this.save();
  }
}
