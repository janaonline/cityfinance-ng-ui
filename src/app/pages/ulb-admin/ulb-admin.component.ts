import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { USER_TYPE } from 'src/app/models/user/userType';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';

@Component({
  selector: 'app-ulb-admin',
  templateUrl: './ulb-admin.component.html',
  styleUrls: ['./ulb-admin.component.scss']
})
export class UlbAdminComponent extends BaseComponent implements OnInit {

  name ='';
  role='';
  ds_icon='../../../assets/ulbform/dh.png'
  ulb_icon ='../../../assets/ulbform/blue-ulb.png';
  constructor(
    private _router: Router,
    private modalService: BsModalService,
    private _profileService: ProfileService,
    public ActivateRoute: ActivatedRoute
  ) {
    super();
  if(ActivateRoute){
    this.ulb_icon='../../../assets/ulbform/blue-ulb.png'
  }else{
    this.ulb_icon='../../../assets/ulbform/blue-ulb.png'
  }
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
        this._router.navigate(["/ulbform/overview"]);
        break;
      case USER_TYPE.STATE:
          this._router.navigate(["/stateform/dashboard"]);
        break;
     case USER_TYPE.MoHUA:
      this._router.navigate(["/mohua/dashboard"]);
      break;
      // case USER_TYPE.PARTNER:

      // case USER_TYPE.ADMIN:
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
      this.name = lData.name;
      this.role = lData.role;
  }
  changeIcon(){
    console.log('pramod');
    this.ds_icon ='../../../assets/ulbform/blue-dh.png'
  }
  remIcon(){
    this.ds_icon ='../../../assets/ulbform/dh.png'
  }

}
