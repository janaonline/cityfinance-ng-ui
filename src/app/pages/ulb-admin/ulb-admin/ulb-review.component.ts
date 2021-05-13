import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { UlbadminServiceService } from '../ulbadmin-service.service'


@Component({
  selector: 'app-ulb-review',
  templateUrl: './ulb-review.component.html',
  styleUrls: ['./ulb-review.component.scss']
})
export class UlbReviewComponent extends BaseComponent implements OnInit {

tabelData: any;
state_name: any;

  constructor(
    private _router: Router,
    private modalService: BsModalService,
    private _profileService: ProfileService,
    private http: HttpClient,
    public ulbService : UlbadminServiceService
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
  stateData(name){
   console.log(name)
  }

}
