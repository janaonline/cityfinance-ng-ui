import { Component, OnInit, Inject } from '@angular/core';
import { SlbListService } from './slb-list.service'
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { UlbadminServiceService } from '../../../ulb-admin/ulbadmin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fileSaver from "file-saver";
@Component({
  selector: 'app-slb-list',
  templateUrl: './slb-list.component.html',
  styleUrls: ['./slb-list.component.scss']
})
export class SlbListComponent implements OnInit {
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
  constructor(
    private slbListService: SlbListService,
    public ulbService: UlbadminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ulb_name_s = new FormControl('');
  state_name = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_slb = new FormControl('');


  ngOnInit(): void {
    this.slbListService.getData(this.data.state_id)
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
  setPage(pageNoClick: number) {
    this.tableDefaultOptions.currentPage = pageNoClick;
    this.listFetchOption.skip =
      (pageNoClick - 1) * this.tableDefaultOptions.itemPerPage;
    // this.searchUsersBy(this.filterForm.value);
  }

  setLIstFetchOptions() {

    let slb_statusCode;


    if (this.status_slb) {
      if (this.status_slb.value == "Not Started") {
        slb_statusCode = 24;
      } else if (this.status_slb.value == "In Progess") {
        slb_statusCode = 25;
      } else if (this.status_slb.value == "Completed") {
        slb_statusCode = 26;
      } else if (this.status_slb.value == "Not Applicable") {
        slb_statusCode = 30;
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
        slbStatus: slb_statusCode
          ? slb_statusCode
          : ""

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
      .fetchAllFormStatusList({ skip }, this.listFetchOption, 'slb', this.data.state_id)
      .subscribe(
        (result: any) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "SLB Status List.xlsx");
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
