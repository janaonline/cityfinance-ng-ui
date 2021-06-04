import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { UlbadminServiceService } from '../ulbadmin-service.service'
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-ulb-review',
  templateUrl: './ulb-review.component.html',
  styleUrls: ['./ulb-review.component.scss']
})
export class UlbReviewComponent extends BaseComponent implements OnInit {

tabelData: any;
state_name: any;

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
    private _router: Router,
    private modalService: BsModalService,
    private _profileService: ProfileService,
    private http: HttpClient,
    public ulbService : UlbadminServiceService,
    private _commonService: CommonService
  ) {

    super();

    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:

        this._router.navigate(["/ulbform/overview"]);
        break;
      // case USER_TYPE.STATE:
      // case USER_TYPE.PARTNER:
      // case USER_TYPE.MoHUA:
      // case USER_TYPE.ADMIN:
      //   this._router.navigate(["/user/xvform/list"]);
      //   break;
      // case undefined:
      // case null:
      //   return;
      // default:
      //   this._router.navigate(["/home"]);
      //   break;
    }
  }
  state_name_s = new FormControl('');
  ulb_name_s = new FormControl('');
  ulb_code_s = new FormControl('');
  ulb_type_s = new FormControl('');
  population_type_s = new FormControl('');
  ua_name_s = new FormControl('');
  status_s = new FormControl('');

  ngOnInit(): void {
     let lData = JSON.parse(localStorage.getItem('userData'));
     this.ulbService.getMasterTabel()
    .subscribe((res) => {
      console.log(res)
      let resData:any = res;
      this.tabelData = resData.data;
      console.log('tabelData',this.tabelData)
      });

      this.stateName();

  }
  viewUlbForm(resData){
     console.log('pk123456',resData);
     sessionStorage.setItem('isMillionPlus', resData.isMillionPlus);
     sessionStorage.setItem('isUA', resData.isUA);
     sessionStorage.setItem('stateName', resData.state);
     sessionStorage.setItem('ulbName', resData.ulbName);
  }
  stateName(){
    this.ulbService.getStateName()
    .subscribe((res) => {
      console.log(res)
      let resData:any = res;
      this.state_name = resData.data;
      console.log('state',this.state_name)
      });
  }

  setLIstFetchOptions(val, type) {
  //  const filterKeys = ["financialYear", "auditStatus"];
    this.filterObject = {
          filter: {
            state: this.state_name_s.value
            ? this.state_name_s.value.trim()
            : "",
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
    // if(type == 'state'){
    //   this.filterObject = {
    //     filter: {
    //       state: val,
    //     },
    //   };

    // }else{

    // }
    // if(type == 'ulbType'){
    //   this.filterObject = {
    //     filter: {
    //       ulbType: val
    //     }
    //   }
    // }
    // if(type == 'populationType'){
    //   this.filterObject = {
    //     filter: {
    //       populationType: val
    //     }
    //   }
    // }
    // if(type == 'ulbName'){
    //   this.filterObject = {
    //     filter: {
    //       ulbName: val,
    //     }
    //   }
    // }
    // if(type == 'ulbCode'){
    //   this.filterObject = {
    //     filter: {
    //       censusCode: val,
    //     }
    //   }
    // }
    // if(type == 'UA'){
    //   this.filterObject = {
    //     filter: {
    //       UA: val,
    //     }
    //   }
    // }
    // if(type == 'Status'){
    //   this.filterObject = {
    //     filter: {
    //       status: val,
    //     }
    //   }
    // }


    return {
      ...this.listFetchOption,
      ...this.filterObject,
    //  ...config,
    };



  }


  stateData(val, type){
   console.log(this.state_name_s)
    this.loading = true;
    this.listFetchOption.skip = 0;
    this.tableDefaultOptions.currentPage = 1;
    this.listFetchOption = this.setLIstFetchOptions(val, type);
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
          // this._snackBar.open(
          //   response.error.errors.message ||
          //     response.error.message ||
          //     "Some Error Occurred",
          //   null,
          //   { duration: 6600 }
          alert('Some Error Occurred')
          // );
        }
      );


  }



}
