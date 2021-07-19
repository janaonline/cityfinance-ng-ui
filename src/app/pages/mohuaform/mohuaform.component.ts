import { Component, OnInit } from '@angular/core';
import { UserUtility } from 'src/app/util/user/user';
import { USER_TYPE } from 'src/app/models/user/userType';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mohuaform',
  templateUrl: './mohuaform.component.html',
  styleUrls: ['./mohuaform.component.scss']
})
export class MohuaformComponent implements OnInit {

  loggedInUserDetails = new UserUtility().getLoggedInUserDetails();
  USER_TYPE = USER_TYPE;
  loggedInUserType;
  constructor(
    private _router: Router
  ) {
    this.loggedInUserType =  this.loggedInUserDetails.role;
    if(!this.loggedInUserType){
      this._router.navigate(["/home"]);
    }
    switch (this.loggedInUserType) {
      case USER_TYPE.ULB:
           this._router.navigate(["/ulbform/overview"]);
         // this._router.navigate(["/home"]);
            break;
     case USER_TYPE.STATE:
          this._router.navigate(["/stateform/dashboard"]);
       //  this._router.navigate(["/home"]);
        break;
     case USER_TYPE.MoHUA:
      case USER_TYPE.PARTNER:
      case USER_TYPE.ADMIN:
      this._router.navigate(["/mohua/dashboard"]);
      break;
    //
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
  }

}
