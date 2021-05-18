import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/users/profile/service/profile.service';
import { BaseComponent } from 'src/app/util/BaseComponent/base_component';
import { USER_TYPE } from 'src/app/models/user/userType';
@Component({
  selector: 'app-fc-home-page',
  templateUrl: './fc-home-page.component.html',
  styleUrls: ['./fc-home-page.component.scss']
})
export class FcHomePageComponent extends BaseComponent implements OnInit {

  constructor(private _router: Router,private _profileService: ProfileService) {
    super();
    if(!this.loggedInUserType){
      this._router.navigate(["/fc_grant"]);
    }
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
      case USER_TYPE.STATE:
      case USER_TYPE.PARTNER:
      case USER_TYPE.MoHUA:
      case USER_TYPE.ADMIN:
        this._router.navigate(["/fc-home-page"]);
        break;
        case undefined:
          case null:
            return;
          default:
            this._router.navigate(["/home"]);
            break;
    }
  }

 ulbName ='';

  ngOnInit(): void {
     let ulbRecord = JSON.parse(localStorage.getItem('userData'));
    this.ulbName = ulbRecord?.name;
     console.log(ulbRecord)
  }

}
