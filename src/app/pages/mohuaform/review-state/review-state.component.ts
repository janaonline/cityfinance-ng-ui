import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewStateService } from './review-state.service'

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
  ) { }
  loggedInUser = JSON.parse(localStorage.getItem("userData"));
  ngOnInit(): void {
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

}
