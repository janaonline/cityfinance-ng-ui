import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private _router: Router,
    private modalService: BsModalService,
    private _profileService: ProfileService
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
      this.name = lData.name;
      this.role = lData.role;
  }

}
