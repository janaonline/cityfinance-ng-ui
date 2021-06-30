import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OverallListService } from './overall-list.service'
import { UlbadminServiceService } from '../../../ulb-admin/ulbadmin-service.service';
@Component({
  selector: 'app-overall-list',
  templateUrl: './overall-list.component.html',
  styleUrls: ['./overall-list.component.scss']
})
export class OverallListComponent implements OnInit {

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
  constructor(
    private overallListService: OverallListService,
    public ulbService: UlbadminServiceService,
  ) { }


  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_s = new FormControl('');

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.overallListService.getData()
      .subscribe((res) => {

        let resData: any = res
        this.tabelData = resData.data;
        console.log('tabelData', this.tabelData)

      },
        error => {
          this.errMessage = error.message;
          console.log(error, this.errMessage);
        }
      )
  }
  setLIstFetchOptions() {
    console.log(this.status_s.value)
    let overall_statusCode;
    if (this.status_s.value) {

      if (this.status_s.value == "Not Started") {
        overall_statusCode = 1;
      } else if (this.status_s.value == "In Progess") {
        overall_statusCode = 2;
      } else if (this.status_s.value == "Completed but not Submitted") {
        overall_statusCode = 3;
      }
      else if (this.status_s.value == "Under Review by State") {
        overall_statusCode = 4;
      } else if (this.status_s.value == "Under Review by MoHUA") {
        overall_statusCode = 5;
      } else if (this.status_s.value == "Approval Completed") {
        overall_statusCode = 6;
      } else if (this.status_s.value == "Rejected by State") {
        overall_statusCode = 7;
      } else if (this.status_s.value == "Rejected by MoHUA") {
        overall_statusCode = 8;
      }
    }
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
        status: overall_statusCode
          ? overall_statusCode
          : "",
      }

    }

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
      .fetchAllFormStatusList({ skip, limit: 10 }, this.listFetchOption)
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
  }
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }

}







