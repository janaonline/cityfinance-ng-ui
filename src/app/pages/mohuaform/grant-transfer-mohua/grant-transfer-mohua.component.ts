import { Component, OnInit } from "@angular/core";
import { GtMohuaService } from "./gt-mohua.service";
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
import * as fileSaver from "file-saver";
@Component({
  selector: "app-grant-transfer-mohua",
  templateUrl: "./grant-transfer-mohua.component.html",
  styleUrls: ["./grant-transfer-mohua.component.scss"],
})
export class GrantTransferMohuaComponent implements OnInit {
  constructor(public gtMohuaService: GtMohuaService) {}

  quesName = "Please Upload Grant Transfer Excel Sheet ";
  requiredBtn = "excel";
  Years = JSON.parse(localStorage.getItem("Years"));
  loggedInUser = JSON.parse(localStorage.getItem("userData"));
  ngOnInit(): void {}

  excel;
  isDisabled = false;
  saveBtnText = "SAVE";
  showLoader = false;
  getTemplate() {
    this.gtMohuaService.getTemplate().subscribe(
      (res) => {
        let blob: any = new Blob([res], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "GrantTranferTemplate.xlsx");
        swal("upload downloaded template");
      },
      (err) => {}
    );
  }

  save() {
    this.showLoader = true;
    console.log(this.excel, "File url");
    if (!this.excel?.url) {
      return swal("Please upload file and save");
    }
    let body = {
      url: this.excel.url,
      design_year: "606aaf854dff55e6c075d219",
    };

    this.gtMohuaService.saveData(body).subscribe(
      (res) => {
        swal("data successfully saved.");
        this.saveBtnText = "FILE SAVED";
        this.showLoader = false;
      },
      (err) => {
        let blob: any = new Blob([err.error], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);

        fileSaver.saveAs(blob, "GrantTranfer_error.xlsx");
        swal("refer error file and upload again");
        this.showLoader = false;
      }
    );
  }

  uploadedFile(file) {
    this.excel = file.excel;
    this.saveBtnText = "SAVE";
  }
}
