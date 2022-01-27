import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { StateformsService } from '../stateforms.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewUlbFormService } from './review-ulb-form.service'
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import * as fileSaver from "file-saver";

import { SweetAlert } from "sweetalert/typings/core";
const swal: SweetAlert = require("sweetalert");
@Component({
  selector: 'app-review-ulb-form',
  templateUrl: './review-ulb-form.component.html',
  styleUrls: ['./review-ulb-form.component.scss']
})
export class ReviewUlbFormComponent implements OnInit {

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
  tabelData: any;
  currentSort = 1;
  state_id;
  takeStateAction = 'false';
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  listFetchOption = {
    filter: null,
    sort: null,
    // role: null,
    csv: false,
    skip: 0,
    limit: this.tableDefaultOptions.itemPerPage,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  errMessage = '';
  showLoader = false;
  actBtn = false;
  
  constructor(
    public ulbService: UlbadminServiceService,
    public _stateformsService: StateformsService,
    public dialog: MatDialog,
    private reviewUlbFormService: ReviewUlbFormService
  ) { }


  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_s = new FormControl('');
  historyData;
  ngOnInit() {
 this.state_id = sessionStorage.getItem("state_id")
    this.showLoader = true;
    this.loadData();
    if (this.loggedInUserType !== USER_TYPE.STATE) {
      this.actBtn = true;
    }
  }
  noHistorydataFound = false
  viewHistory(template, formId) {
    console.log(formId)
    this.noHistorydataFound = false
    this.reviewUlbFormService.getData(formId).subscribe(
      (res) => {
        this.historyData = res['data']
        this.historyData.reverse()
        if (this.historyData.length == 0) {
          this.noHistorydataFound = true
        }
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
  loadData() {
    this.ulb_name_s.patchValue("")
    this.ulb_code_s.patchValue("")
    this.ulb_type_s.patchValue("")
    this.population_type_s.patchValue("")
    this.ua_name_s.patchValue("")
    this.status_s.patchValue("")

    this._stateformsService.getUlbReview(this.state_id)
      .subscribe((res) => {
        console.log('profile', res);
        let resData: any = res
        this.tabelData = resData.data;
        console.log('tabelData', this.tabelData)
        this.showLoader = false;

      },
        error => {
          this.errMessage = error.message;

          console.log(error, this.errMessage);
          this.showLoader = false;
          swal(this.errMessage);
        }
      )
  }
  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
    this.filterObject = {
      filter: {
        state: '',
        ulbType: this.ulb_type_s.value
          ? this.ulb_type_s.value.trim()
          : "",
        populationType: this.population_type_s.value
          ? this.population_type_s.value.trim()
          : "",
        ulbName: this.ulb_name_s.value
          ? this.ulb_name_s.value.trim()
          : "",
        censusCode: this.ulb_code_s.value
          ? this.ulb_code_s.value.trim()
          : "",
        UA: this.ua_name_s.value
          ? this.ua_name_s.value.trim()
          : "",
        status: this.status_s.value
          ? this.status_s.value.trim()
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
      .fetchXVFormDataList({ skip, limit: 10 }, this.listFetchOption)
      .subscribe(
        (result: any) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "Review Grant Application List.xlsx");
          } else {
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
          console.log(response.error);

          alert('Some Error Occurred')

        }
      );


  }
  viewUlbForm(resData) {
    console.log('review', resData);
    sessionStorage.setItem('ulb_id', resData?.ulb)
    sessionStorage.setItem('isMillionPlus', resData.isMillionPlus);
    sessionStorage.setItem('isUA', resData.isUA);
    sessionStorage.setItem('stateName', resData.state);
    sessionStorage.setItem('ulbName', resData.ulbName);
    if ((resData.actionTakenByUserRole == 'ULB' && resData.isSubmit == true) ||
      (resData.actionTakenByUserRole == 'STATE' && resData.isSubmit == false)) {
      this.takeStateAction = 'true'
    }
    localStorage.setItem('takeStateAction', this.takeStateAction)
    let stActionCheck = 'false'
    if (
      (resData.actionTakenByUserRole == "STATE") &&
      (resData.isSubmit == true) && (resData.status != 'PENDING')
    ) {
      stActionCheck = 'true'
    }
    if (resData.actionTakenByUserRole == "MoHUA") {
      stActionCheck = 'true';
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
