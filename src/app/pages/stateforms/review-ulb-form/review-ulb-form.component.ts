import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';

@Component({
  selector: 'app-review-ulb-form',
  templateUrl: './review-ulb-form.component.html',
  styleUrls: ['./review-ulb-form.component.scss']
})
export class ReviewUlbFormComponent implements OnInit {

  tabelData: any;
  listFetchOption = {
    filter: null,
    sort: null,
    role: null,
    skip: 0,
  };
  tableDefaultOptions = {
    itemPerPage: 10,
    currentPage: 1,
    totalCount: null,
  };
  loading = false;
  filterObject;
  fcFormListSubscription: Subscription;
  nodataFound = false;
  constructor(
    public ulbService : UlbadminServiceService,
  ) { }


  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_s = new FormControl('');

  ngOnInit() {
     this.stateData();
  }
  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
      this.filterObject = {
            filter: {
              state: 'Maharashtra',
              ulbType : this.ulb_type_s.value
              ? this.ulb_type_s.value.trim()
              : "",
              populationType : this.population_type_s.value
              ? this.population_type_s.value.trim()
              : "",
              ulbName : this.ulb_name_s.value
              ? this.ulb_name_s.value.trim()
              : "",
              censusCode : this.ulb_code_s.value
              ? this.ulb_code_s.value.trim()
              : "",
              UA : this.ua_name_s.value
              ? this.ua_name_s.value.trim()
              : "",
              status : this.status_s.value
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


    stateData(){
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
            let res:any = result;
            this.tabelData = res.data;
            if(res.data.length == 0){
              this.nodataFound = true;
            }else{
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


}
