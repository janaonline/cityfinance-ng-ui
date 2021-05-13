import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { UlbadminServiceService } from '../ulbadmin-service.service'
import { CommonService } from 'src/app/shared/services/common.service';


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
     console.log(resData);
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
  setLIstFetchOptions(config = {}) {
    const filterKeys = ["financialYear", "auditStatus"];
    const filterObject = {
      filter: {
        ulbName: '',
        ulbCode: '',
        audited: '',
        censusCode: '',
        sbCode: '',
        status: '',
        stateName: '',
        ulbType: '',
        isMillionPlus: '',
      },
    };
    return {
      ...this.listFetchOption,
      ...filterObject,
      ...config,
    };

  }


  stateData(name){

    // this.loading = true;
    // this.listFetchOption.skip = 0;
    // this.tableDefaultOptions.currentPage = 1;
    // this.listFetchOption = this.setLIstFetchOptions();
    // const { skip } = this.listFetchOption;
    // if (this.fcFormListSubscription) {
    //   this.fcFormListSubscription.unsubscribe();
    // }

    // this.fcFormListSubscription = this.financialDataService
    //   .fetchXVFormDataList({ skip, limit: 10 }, this.listFetchOption)
    //   .subscribe(
    //     (result) => this.handleResponseSuccess(result),
    //     (response: HttpErrorResponse) => {
    //       this.loading = false;
    //       this._snackBar.open(
    //         response.error.errors.message ||
    //           response.error.message ||
    //           "Some Error Occurred",
    //         null,
    //         { duration: 6600 }
    //       );
    //     }
    //   );


  }



}
