import { Component, OnInit, Inject } from '@angular/core';
import { PlansListService } from './plans-list.service'
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { UlbadminServiceService } from '../../../ulb-admin/ulbadmin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fileSaver from "file-saver";
@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class PlansListComponent implements OnInit {
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
    private plansListService: PlansListService,
    public ulbService: UlbadminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_plans = new FormControl('');

  ngOnInit(): void {
    this.plansListService.getData(this.data.state_id)
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

    let plans_statusCode;


    if (this.status_plans) {
      if (this.status_plans.value == "Not Started") {
        plans_statusCode = 27;
      } else if (this.status_plans.value == "In Progess") {
        plans_statusCode = 28;
      } else if (this.status_plans.value == "Completed") {
        plans_statusCode = 29;
      } else if (this.status_plans.value == "Not Applicable") {
        plans_statusCode = 31;
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
        plansStatus: plans_statusCode
          ? plans_statusCode
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
      .fetchAllFormStatusList({ skip, limit: 10 }, this.listFetchOption, 'plans')
      .subscribe(
        (result) => {
          if (this.listFetchOption.csv) {
            let blob: any = new Blob([result], {
              type: "text/json; charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "Plans for Water & Sanitation Status List.xlsx");
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
