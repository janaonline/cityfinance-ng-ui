import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NewCommonService } from "src/app/shared2223/services/new-common.service";
import { Slbs28FormPreviewComponent } from "./slbs28-form-preview/slbs28-form-preview.component";
import { NavigationStart, Router } from '@angular/router';

// ES6 Modules or TypeScript
import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");

// CommonJS
// const swal = require('sweetalert2')
@Component({
  selector: "app-slbs28-form",
  templateUrl: "./slbs28-form.component.html",
  styleUrls: ["./slbs28-form.component.scss"],
})
export class Slbs28FormComponent implements OnInit {
  @ViewChild("templateSave") template;
  sideMenuItem: any;
  nextRouter;
  backRouter;
  constructor(
    private newCommonService: NewCommonService,
    public dialog: MatDialog,
    public _router: Router
  ) {
    this.ulbData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.ulbData);
    this.ulbId = this.ulbData.ulb;
    this.sideMenuItem = JSON.parse(localStorage.getItem("leftMenuRes"));
    this.navigationCheck();
  }
  ulbData;
  ulbId;
  tableData;
  population;
  routerNavigate = null;
  alertError =
    "You have some unsaved changes on this page. Do you wish to save your data as draft?";
  dialogRef;
  slbData = {
    population: 0,
  };
  formData = {};
  ngOnInit(): void {
    this.setRouter();
    this.onLoad();
    sessionStorage.setItem("changeIn28SLB", "false");
  }
  clickedSave;

  navigationCheck() {
    if (!this.clickedSave) {
      this._router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let changeInForm;
          this.alertError =
            "You have some unsaved changes on this page. Do you wish to save your data as draft?";

          changeInForm = sessionStorage.getItem("changeIn28SLB");

          // const changeInAnnual = sessionStorage.getItem("changeInAnnualAcc");
          if (event.url === "/" || event.url === "/login") {
            sessionStorage.setItem("changeIn28SLB", "false");

            return;
          }
          if (changeInForm === "true" && this.routerNavigate === null) {
            const currentRoute = this._router.routerState;
            this._router.navigateByUrl(currentRoute.snapshot.url, {
              skipLocationChange: true,
            });
            this.routerNavigate = event;
            this.dialog.closeAll();
            this.openDialog(this.template);
          }
        }
      });
    }
  }
  callSubmitFormAPI() {
    return this.newCommonService.post28SlbsData(this.slbData).subscribe(
      (res) => {
        console.log(res);
        swal("Saved", "Data saved successfully.", "success");
        sessionStorage.setItem("changeIn28SLB", "false");
      },
      (err) => {
        swal("Error", `${err.message}`, "error");
      }
    );
  }
  errmsg;
  save(asDraft) {
    this.slbData["design_year"] = "606aafb14dff55e6c075d3ae";
    this.slbData["ulb"] = this.ulbId;
    let arr = [];
    for (let key in this.formData) {
      arr.push(...this.formData[key]);
    }
    this.slbData["data"] = arr;
    delete this.slbData["obj"];
    console.log("data to be sent in POST API==>", this.slbData);

    if (this.validateData()) {
      if (!asDraft) {
        this.callSubmitFormAPI();
      } else {
        this.slbData["isDraft"] = true;
        this.callSubmitFormAPI();
      }
    } else {
      if (!asDraft) {
        this.errmsg = "";
        let msg1 = this.errorFieldIDs.length
          ? `<br>- Target Values are greater than Actual Figures for these questions :
  <b>${this.errorFieldIDs}<b>`
          : ``;
        let msg2 = this.errorFieldIDs_decrease.length
          ? `<br>- Target Values are Less than Actual Figures for these questions :
  <b>${this.errorFieldIDs_decrease}<b>`
          : ``;
        let msg3 = this.counter
          ? `<br>- ${this.counter} Fields are Blank.`
          : ``;
        this.errmsg = msg1 + msg2 + msg3;

        console.log(this.errmsg);

        swal(
          "Form cannot be submitted due to following Errors",
          `${this.errmsg}`,
          "warning"
        );

        return;
      } else {
        this.callSubmitFormAPI();
      }
      console.log(
        "Form is not complete. Save as Draft or show error if submit button is clicked"
      );
      console.log(
        "values error field->",
        this.errorFieldIDs,
        "required error->",
        this.requiredFieldIDs
      );
    }
    console.log(this.slbData);
  }
  errorFieldIDs = [];
  requiredFieldIDs = [];
  errorFieldIDs_decrease = [];
  error = 0;
  counter = 0;
  validateData() {
    //checks
    //1. actual should be smaller or equal to target
    //2. all values must be there
    //3. population must be entered
    this.errorFieldIDs = [];
    this.errorFieldIDs_decrease = [];
    this.requiredFieldIDs = [];
    this.error = 0;
    let errorType = "";
    let arrOfAllData = [];

    for (let key in this.formData) {
      arrOfAllData.push(...this.formData[key]);
    }
    this.counter = 0;
    arrOfAllData.forEach((el) => {
      if (
        el["_id"]?.toString() != "6284d6f65da0fa64b423b516" &&
        el["_id"]?.toString() != "6284d6f65da0fa64b423b540"
      ) {
        if (el["actual"]["value"] > el["target_1"]["value"]) {
          this.errorFieldIDs?.push(el["question"]);
          this.error = 1;
        }
      } else {
        if (el["actual"]["value"] < el["target_1"]["value"]) {
          this.errorFieldIDs_decrease.push(el["question"]);
          this.error = 1;
        }
      }

      if (!el["actual"]["value"] || !el["target_1"]["value"]) {
        this.counter++;
        this.requiredFieldIDs.push(el["question"]);
        this.error = 1;
      }
    });
    if (this.error) {
      this.slbData["isDraft"] = true;
      return false;
    }
    this.slbData["isDraft"] = false;
    return true;
  }
  onLoad() {
    this.newCommonService.get28SlbsData(this.ulbId).subscribe((res: any) => {
      console.log("28 slbs data DATA", res);
      this.slbData = res?.data;

      for (let key in this.slbData["data"]) {
        for (let el of this.slbData["data"][key]) {
          let rangeArr = el["range"].split("-");
          (el["min"] = Number(rangeArr[0])), (el["max"] = Number(rangeArr[1]));
        }
      }
      Object.assign(this.formData, this.slbData["data"]);
      console.log("After processing Range -", this.formData);
    });
  }
  setRouter() {
    for (const key in this.sideMenuItem) {
      //  console.log(`${key}: ${this.sideMenuItem[key]}`);
      this.sideMenuItem[key].forEach((element) => {
        //   console.log('name name', element);
        if (element?.name == "28 SLBs") {
          this.nextRouter = element?.nextUrl;
          this.backRouter = element?.prevUrl;
        }
      });
    }
  }
  returnZero() {
    return 0;
  }

  onPreview() {
    const dialogRef = this.dialog.open(Slbs28FormPreviewComponent, {
      data: this.slbData,
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openDialog(template) {
    if (template == undefined) return;
    const dialogConfig = new MatDialogConfig();
    this.dialogRef = this.dialog.open(template, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log("result", result);
      if (result === undefined) {
        if (this.routerNavigate) {
          // this.routerNavigate = null;
        }
      }
    });
  }
  async stay() {
    await this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      this.routerNavigate = null;
    }
  }
  async proceed() {
    this.dialogRef.close();
    this.dialog.closeAll();
    if (this.routerNavigate) {
      await this.save(true);
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
    //await this.save(true);
    // return this._router.navigate(["ulbform2223/slbs"]);
  }
  async discard() {
    sessionStorage.setItem("changeIn28SLB", "false");
    await this.dialogRef.close(true);
    if (this.routerNavigate) {
      this._router.navigate([this.routerNavigate.url]);
      return;
    }
  }
  alertClose() {
    this.stay();
  }
  numberLimitV(e, input, minV, maxV) {
    // console.log("sss", e, input);
    const functionalKeys = ["Backspace", "ArrowRight", "ArrowLeft", "Tab"];

    if (functionalKeys.indexOf(e.key) !== -1) {
      return;
    }

    const keyValue = +e.key;
    if (isNaN(keyValue)) {
      e.preventDefault();
      return;
    }

    const hasSelection =
      input?.selectionStart !== input?.selectionEnd &&
      input?.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(input, e.key);
    } else {
      newValue = input?.value + keyValue?.toString();
    }

    if (
      +newValue > maxV ||
      newValue.length > maxV?.length ||
      +newValue < minV
    ) {
      e.preventDefault();
    }
    sessionStorage.setItem("changeIn28SLB", "true");
  }

  private replaceSelection(input, key) {
    const inputValue = input?.value;
    const start = input?.selectionStart;
    const end = input?.selectionEnd || input?.selectionStart;

    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
