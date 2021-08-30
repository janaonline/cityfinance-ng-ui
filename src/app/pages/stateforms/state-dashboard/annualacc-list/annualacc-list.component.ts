import { Component, OnInit, Inject } from '@angular/core';
import { AnnualaccListService } from './annualacc-list.service'
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UlbadminServiceService } from '../../../ulb-admin/ulbadmin-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fileSaver from "file-saver";
import { StateDashboardService } from '../state-dashboard.service'
import { USER_TYPE } from 'src/app/models/user/userType';
import { UserUtility } from 'src/app/util/user/user';
@Component({
  selector: 'app-annualacc-list',
  templateUrl: './annualacc-list.component.html',
  styleUrls: ['./annualacc-list.component.scss']
})
export class AnnualaccListComponent implements OnInit {
  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType = this.loggedInUserDetails.role;
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
    // limit: this.tableDefaultOptions.itemPerPage,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  errMessage = '';
  resData;
  showLoader = true;
  constructor(
    private annualaccListService: AnnualaccListService,
    public ulbService: UlbadminServiceService,
    public stateDashboardService: StateDashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  states = null
  closeDialog() {
    this.stateDashboardService.closeDialog.next('overall')
  }
  ngOnInit(): void {
    this.states = JSON.parse(sessionStorage.getItem("statesData"))
    this.annualaccListService.getData(this.data.state_id)
      .subscribe((res) => {

        let resData: any = res
        this.tabelData = resData.data;
        console.log('tabelData', this.tabelData)
        this.showLoader = false;
      },
        error => {
          this.errMessage = error.message;
          console.log(error, this.errMessage);
          this.showLoader = false;
        }
      )
  }
  ulb_name_s = new FormControl('');
  state_name = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_audited = new FormControl('');
  status_unaudited = new FormControl('');

  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }
  setLIstFetchOptions() {

    let audited_statusCode,
      unaudited_statusCode;



    if (this.status_audited.value) {
      if (this.status_audited.value == "Not Started") {
        audited_statusCode = 13;
      } else if (this.status_audited.value == "In Progess") {
        audited_statusCode = 14;
      } else if (this.status_audited.value == "Accounts Not Submitted") {
        audited_statusCode = 15;
      } else if (this.status_audited.value == "Accounts Submitted") {
        audited_statusCode = 16;
      }
    }
    if (this.status_unaudited.value) {
      if (this.status_unaudited.value == "Not Started") {
        unaudited_statusCode = 17;
      } else if (this.status_unaudited.value == "In Progess") {
        unaudited_statusCode = 18;
      } else if (this.status_unaudited.value == "Accounts Not Submitted") {
        unaudited_statusCode = 19;
      } else if (this.status_unaudited.value == "Accounts Submitted") {
        unaudited_statusCode = 20;
      }
    }

    //  const filterKeys = ["financialYear", "auditStatus"];
    this.filterObject = {
      filter: {
        state: this.state_name.value ?
          this.state_name.value :
          '',
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
        auditedStatus: audited_statusCode
          ? audited_statusCode
          : "",
        unauditedStatus: unaudited_statusCode
          ? unaudited_statusCode
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
    this.listFetchOption.csv = csv;
    this.fcFormListSubscription = this.ulbService
      .fetchAllFormStatusList({ skip }, this.listFetchOption, 'annualaccount', this.data.state_id)
      .subscribe(
        (result: any) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "Annual Accounts Status List.xlsx");
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
          alert('Some Error Occurred')

        }
      );


  }

}
