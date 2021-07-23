import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewStateService } from './review-state.service'
import * as fileSaver from "file-saver";
import { CommonService } from '../../../shared/services/common.service'

@Component({
  selector: 'app-review-state',
  templateUrl: './review-state.component.html',
  styleUrls: ['./review-state.component.scss']
})
export class ReviewStateComponent implements OnInit {
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
    csv: false,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  errMessage = '';
  formData
  constructor(
    private reviewStateService: ReviewStateService,
    public dialog: MatDialog,
    public commonService: CommonService,
    public ulbService: UlbadminServiceService
  ) { }

  state_name = new FormControl("");
  status_type = new FormControl("");
  states;
  loggedInUser = JSON.parse(localStorage.getItem("userData"));
  ngOnInit(): void {
    this.states = JSON.parse(sessionStorage.getItem("statesData"))
    console.log(this.states)
    this.onLoad();
  }

  onLoad() {
    this.reviewStateService.getData().subscribe(
      (res) => {
        this.nodataFound = false;
        if (res['data'].length == 0) {
          this.nodataFound = true;
        }
        let resData: any = res
        this.tabelData = resData.data;
        console.log('tabelData', this.tabelData)
      },
      (err) => {
        console.log(err)
      })
  }



  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
  historyData
  noHistoryDataFound = false
  viewHistory(template, formId) {
    console.log(formId)
    this.noHistoryDataFound = false
    this.reviewStateService.getHistoryData(formId).subscribe(
      (res) => {
        this.historyData = res['data']
        if (this.historyData.length == 0) {
          this.noHistoryDataFound = true
        }
        this.historyData.reverse()
        console.log(this.historyData)
        this.openDialog(template)
      },
      (err) => {
        console.log(err.message)
      })

  }

  alertClose() {
    this.dialog.closeAll();
  }

  openDialog(template) {

    let dialogRef = this.dialog.open(template, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  takeMoHUAAction = 'false'
  viewStateForm(resData) {
    if ((resData.actionTakenByRole == 'STATE' && resData.isSubmit == true) ||
      (resData.actionTakenByRole == 'MoHUA' && resData.isSubmit == false)) {
      this.takeMoHUAAction = 'true'
    }
    localStorage.setItem('takeMoHUAAction', this.takeMoHUAAction)
  }

  setLIstFetchOptions() {

    let statusCode;



    if (this.status_type.value) {
      if (this.status_type.value == "Not Started") {
        statusCode = 1;
      } else if (this.status_type.value == "In Progess") {
        statusCode = 2;
      } else if (this.status_type.value == "Under Review By State") {
        statusCode = 3;
      } else if (this.status_type.value == "Approved By State") {
        statusCode = 4;
      } else if (this.status_type.value == "Rejected By State") {
        statusCode = 5;
      } else if (this.status_type.value == "Approved By MoHUA") {
        statusCode = 6;
      } else if (this.status_type.value == "Rejected By MoHUA") {
        statusCode = 7;
      }
    }

    //  const filterKeys = ["financialYear", "auditStatus"];
    this.filterObject = {
      filter: {
        state: this.state_name ? this.state_name : '',
        status: statusCode
          ? statusCode
          : "",

      }

    }

    return {
      ...this.listFetchOption,
      ...this.filterObject,
      //  ...config,
    };

  }
  stateData(csv) {
    this.loading = true;
    this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1;
    this.listFetchOption = this.setLIstFetchOptions();
    const { skip } = this.listFetchOption;
    if (this.fcFormListSubscription) {
      this.fcFormListSubscription.unsubscribe();
    }
    this.listFetchOption.csv = csv
    this.fcFormListSubscription = this.ulbService
      .fetchReviewStateList({ skip, limit: 10 }, this.listFetchOption)
      .subscribe(
        (result) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "Review State Status List.xlsx");
          }
          else {
            let res: any = result;
            this.tabelData = res.data;
            if (res.data.length == 0) {
              this.nodataFound = true;
            } else {
              this.nodataFound = false;
            }
            console.log(result);
          }
        },
        (response: HttpErrorResponse) => {
          this.loading = false;
          alert('Some Error Occurred')

        }
      );


  }


}
