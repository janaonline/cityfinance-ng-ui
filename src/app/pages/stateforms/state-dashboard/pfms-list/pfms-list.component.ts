import { PfmsListService } from './pfms-list.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../../ulb-admin/ulbadmin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fileSaver from "file-saver";
@Component({
  selector: 'app-pfms-list',
  templateUrl: './pfms-list.component.html',
  styleUrls: ['./pfms-list.component.scss']
})
export class PfmsListComponent implements OnInit {
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
  constructor(
    private pfmsListService: PfmsListService,
    public ulbService: UlbadminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_pfms = new FormControl('');



  ngOnInit(): void {

    this.pfmsListService.getData(this.data.state_id)
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

    let pfms_statusCode;



    if (this.status_pfms.value) {
      if (this.status_pfms.value == "Not Started") {
        pfms_statusCode = 9;
      } else if (this.status_pfms.value == "In Progess") {
        pfms_statusCode = 10;
      } else if (this.status_pfms.value == "Registered") {
        pfms_statusCode = 11;
      } else if (this.status_pfms.value == "Not Registered") {
        pfms_statusCode = 12;
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
        pfmsStatus: pfms_statusCode
          ? pfms_statusCode
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
      .fetchAllFormStatusList({ skip, limit: 10 }, this.listFetchOption, 'pfms')
      .subscribe(
        (result) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "PFMS Account Status List.xlsx");
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
