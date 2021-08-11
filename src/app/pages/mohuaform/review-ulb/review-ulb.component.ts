import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { UlbadminServiceService } from "../../ulb-admin/ulbadmin-service.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReviewUlbService } from "./review-ulb.service";
import { StateformsService } from "../../stateforms/stateforms.service";
import { USER_TYPE } from "src/app/models/user/userType";
import * as fileSaver from "file-saver";
@Component({
  selector: "app-review-ulb",
  templateUrl: "./review-ulb.component.html",
  styleUrls: ["./review-ulb.component.scss"],
})
export class ReviewUlbComponent implements OnInit {
  tabelData: any;
  currentSort = 1;
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  takeStateAction = "false";
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  errMessage = "";
  constructor(
    public reviewUlbService: ReviewUlbService,
    public ulbService: UlbadminServiceService,
    public dialog: MatDialog,
    public _stateformsService: StateformsService
  ) { }
  ulb_name_s = new FormControl("");
  ulb_code_s = new FormControl("");
  ulb_type_s = new FormControl("");
  population_type_s = new FormControl("");
  ua_name_s = new FormControl("");
  status_s = new FormControl("");
  historyData;
  loggedInUser = JSON.parse(localStorage.getItem("userData"));
  ngOnInit() {
    this.loadData();
    console.log('user', this.loggedInUser);

  }
  viewHistory(template, formId) {
    console.log(formId);

    this.reviewUlbService.getData(formId).subscribe(
      (res) => {
        this.historyData = res["data"].length == 0 ? null : res["data"];
        this.historyData.reverse();
        console.log(this.historyData);
        this.openDialog(template);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  openDialog(template) {
    let dialogRef = this.dialog.open(template, {
      height: "auto",
      width: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  alertClose() {
    this.dialog.closeAll();
  }
  loadData() {
    this._stateformsService.getUlbReview().subscribe(
      (res) => {
        console.log("profile", res);
        let resData: any = res;
        this.tabelData = resData.data;
        console.log("tabelData", this.tabelData);
      },
      (error) => {
        this.errMessage = error.message;
        console.log(error, this.errMessage);
      }
    );
  }

  downloadFile() {
    this.reviewUlbService.downloadData().subscribe(
      (result) => {
        let blob: any = new Blob([result], {
          type: "text/json; charset=utf-8",
        });
        const url = window.URL.createObjectURL(blob);
        fileSaver.saveAs(blob, "Review ULB Data.xlsx");
      },
      (err) => {
        console.log(err.message)
      }
    )
  }

  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
    this.filterObject = {
      filter: {
        state: "",
        ulbType: this.ulb_type_s.value ? this.ulb_type_s.value.trim() : "",
        populationType: this.population_type_s.value
          ? this.population_type_s.value.trim()
          : "",
        ulbName: this.ulb_name_s.value ? this.ulb_name_s.value.trim() : "",
        censusCode: this.ulb_code_s.value ? this.ulb_code_s.value.trim() : "",
        UA: this.ua_name_s.value ? this.ua_name_s.value.trim() : "",
        status: this.status_s.value ? this.status_s.value.trim() : "",
      },
    };

    return {
      ...this.listFetchOption,
      ...this.filterObject,
      //  ...config,
    };
  }

  stateData() {
    this.loading = true;
    this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1;
    this.listFetchOption = this.setLIstFetchOptions();
    const { skip } = this.listFetchOption;
    if (this.fcFormListSubscription) {
      this.fcFormListSubscription.unsubscribe();
    }

    this.fcFormListSubscription = this.ulbService
      .fetchXVFormDataList({ skip, limit: 10 }, this.listFetchOption)
      .subscribe(
        (result) => {
          let res: any = result;
          this.tabelData = res.data;
          if (res.data.length == 0) {
            this.nodataFound = true;
          } else {
            this.nodataFound = false;
          }
          console.log(result);
        },
        (response: HttpErrorResponse) => {
          this.loading = false;
          alert("Some Error Occurred");
        }
      );
  }

  setActionBtnIcon(resData, type) {    
    if (
      resData.actionTakenByUserRole == USER_TYPE.MoHUA &&
      !resData.isSubmit &&
      type == "action"
    ) {
      return true;
    }
    if (
      resData.actionTakenByUserRole == USER_TYPE.MoHUA &&
      !resData.isSubmit &&
      type == "eye"
    ) {
      return false;
    }
    if (
      resData.actionTakenByUserRole == USER_TYPE.STATE &&
      resData.isSubmit &&
      resData.status == "APPROVED" &&
      type == "action"
    ) {
      return true;
    }
    if (
      resData.actionTakenByUserRole == USER_TYPE.STATE &&
      resData.isSubmit &&
      resData.status == "APPROVED" &&
      type == "eye"
    ) {
      return false;
    }
    if (
      resData.actionTakenByUserRole == USER_TYPE.MoHUA &&
      resData.isSubmit &&
      type == "eye" &&
      resData.status != "PENDING"
    ) {
      return true;
    }
    if (type == "eye") return true;
  }

  viewUlbForm(resData) {
    console.log("review", resData);
    sessionStorage.setItem("ulb_id", resData?.ulb);
    sessionStorage.setItem("isMillionPlus", resData.isMillionPlus);
    sessionStorage.setItem("isUA", resData.isUA);
    sessionStorage.setItem("stateName", resData.state);
    sessionStorage.setItem("ulbName", resData.ulbName);

    if (
      resData.actionTakenByUserRole == USER_TYPE.STATE &&
      resData.isSubmit == true &&
      resData.status == "APPROVED"
    ) {
      this.takeStateAction = "true";
    }

    if (
      resData.actionTakenByUserRole == USER_TYPE.MoHUA &&
      resData.isSubmit == false
    ) {
      this.takeStateAction = "true";
    }

    if (
      resData.actionTakenByUserRole == "MoHUA" &&
      resData.isSubmit == true &&
      resData.status != "PENDING"
    ) {
      this.takeStateAction = "false";
    }

    localStorage.setItem("takeStateAction", this.takeStateAction);
    let stActionCheck = "false";
    if (
      resData.actionTakenByUserRole == "MoHUA" &&
      resData.isSubmit == true &&
      resData.status != "PENDING"
    ) {
      stActionCheck = "true";
    }
    localStorage.setItem("stateActionComDis", stActionCheck);
  }
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
}
