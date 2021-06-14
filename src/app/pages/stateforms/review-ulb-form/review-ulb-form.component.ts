import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UlbadminServiceService } from '../../ulb-admin/ulbadmin-service.service';
import { StateformsService } from '../stateforms.service';

@Component({
  selector: 'app-review-ulb-form',
  templateUrl: './review-ulb-form.component.html',
  styleUrls: ['./review-ulb-form.component.scss']
})
export class ReviewUlbFormComponent implements OnInit {

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
  errMessage ='';
  constructor(
    public ulbService : UlbadminServiceService,
    public _stateformsService: StateformsService
  ) { }


  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_s = new FormControl('');

  ngOnInit() {
    this._stateformsService.getUlbReview()
    .subscribe((res) => {
      console.log('profile', res);
      let resData:any = res
      this.tabelData = resData.data;
     console.log('tabelData',this.tabelData)

    },
    error => {
      this.errMessage = error.message;
      console.log(error, this.errMessage);
    }
    )
  }
  setLIstFetchOptions() {
    //  const filterKeys = ["financialYear", "auditStatus"];
      this.filterObject = {
            filter: {
              state: '',
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
    viewUlbForm(resData){
      console.log('review',resData);
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
